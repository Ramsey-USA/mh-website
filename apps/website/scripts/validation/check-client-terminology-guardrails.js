#!/usr/bin/env node

/**
 * Client Terminology Guardrails Check
 *
 * Prevents client-detouring language from re-entering user-facing copy.
 * Focuses on website page/component string literals + locale JSON values.
 */

const fs = require("node:fs");
const path = require("node:path");
const { CLIENT_TERMINOLOGY_GUARDRAIL_RULES } = require("./branding-rules.cjs");
const {
  collectFilesByPatterns,
  findRepoRoot,
} = require("../lib/local-file-collection.js");

const APP_ROOT = process.cwd();
const REPO_ROOT = findRepoRoot(APP_ROOT);
const TERMINOLOGY_LIBRARY_FILE = process.env.TERMINOLOGY_LIBRARY_FILE
  ? path.resolve(process.env.TERMINOLOGY_LIBRARY_FILE)
  : path.join(REPO_ROOT, "documents", "content", "terminology-library.json");
const PAGE_NAMES_FILE = process.env.PAGE_NAMES_FILE
  ? path.resolve(process.env.PAGE_NAMES_FILE)
  : path.join(APP_ROOT, "src", "lib", "branding", "page-names.ts");

const TARGET_GLOBS = [
  "src/app/**/*.tsx",
  "src/components/**/*.tsx",
  "messages/**/*.json",
  "../../messages/**/*.json",
];

const EXCLUDED_PATH_PATTERNS = [
  /__tests__\//,
  /\/test\//,
  /scripts\//,
  /docs\//,
  /node_modules\//,
  /src\/components\/seo\//,
  /src\/lib\/seo\//,
  /src\/lib\/services\//,
];

const RULES = CLIENT_TERMINOLOGY_GUARDRAIL_RULES;

const REQUIRED_CATEGORY_KEYS = [
  "commandStructure",
  "programAndProcess",
  "qualityAndAccountability",
  "safetyAndTechnicalExecution",
  "leadershipAndCulture",
  "enterpriseAdditionsV2",
];

const REQUIRED_REQUIRED_PAIR_CONCEPTS = [
  "Safety Program",
  "Employee Operations",
  "External Audience",
];

const REQUIRED_PROTECTED_TERMS = [
  "Competent Person",
  "Qualified Person",
  "Authorized Person",
  "Hazard Communication",
  "Personal Protective Equipment (PPE)",
  "Stop Work Authority",
  "Incident",
];

const STANDARD_TERM_EQUIVALENTS = {
  "Project Site / Jobsite": ["Project Site / Jobsite", "Project Site"],
};

function shouldSkipPath(filePath) {
  return EXCLUDED_PATH_PATTERNS.some((pattern) => pattern.test(filePath));
}

function collectStringValuesFromJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const values = [];

  function walk(node, keyPath) {
    if (typeof node === "string") {
      values.push({ text: node, keyPath });
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((entry, idx) => walk(entry, `${keyPath}[${idx}]`));
      return;
    }

    if (node && typeof node === "object") {
      Object.entries(node).forEach(([key, value]) => {
        const nextPath = keyPath ? `${keyPath}.${key}` : key;
        walk(value, nextPath);
      });
    }
  }

  walk(parsed, "");
  return values;
}

function collectStringLiteralsFromSource(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const values = [];
  const regex = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;

  let match;
  while ((match = regex.exec(raw)) !== null) {
    const text = match[2];
    if (!text || text.trim().length < 3) continue;
    if (!/\s/.test(text)) continue;

    // Skip imports/paths/obvious code identifiers and utility class blobs.
    if (/^[@./A-Za-z0-9_-]+$/.test(text) && /[./@]/.test(text)) continue;
    if (
      /^(bg-|text-|dark:|sm:|md:|lg:|xl:|rounded|border|px-|py-|mt-|mb-|grid|flex)/.test(
        text,
      )
    ) {
      continue;
    }

    const before = raw.slice(0, match.index);
    const line = before.split("\n").length;
    values.push({ text, line });
  }

  return values;
}

function checkTextValue(text, rules) {
  const findings = [];

  for (const rule of rules) {
    rule.pattern.lastIndex = 0;

    let found;
    while ((found = rule.pattern.exec(text)) !== null) {
      const hit = found[0];

      if (
        Array.isArray(rule.allowIfMatch) &&
        rule.allowIfMatch.some((allowPattern) => allowPattern.test(text))
      ) {
        continue;
      }

      findings.push({
        ruleId: rule.id,
        message: rule.message,
        prefer: rule.prefer,
        hit,
      });
    }
  }

  return findings;
}

function fail(message) {
  throw new Error(message);
}

function readAndValidateTerminologyLibrary() {
  if (!fs.existsSync(TERMINOLOGY_LIBRARY_FILE)) {
    fail(
      `Missing terminology library file: ${path.relative(REPO_ROOT, TERMINOLOGY_LIBRARY_FILE)}`,
    );
  }

  const raw = fs.readFileSync(TERMINOLOGY_LIBRARY_FILE, "utf8").trim();
  if (!raw) {
    fail(
      `Terminology library is empty: ${path.relative(REPO_ROOT, TERMINOLOGY_LIBRARY_FILE)}`,
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(
      `Terminology library is not valid JSON (${path.relative(REPO_ROOT, TERMINOLOGY_LIBRARY_FILE)}): ${error.message}`,
    );
  }

  if (!parsed?.library || typeof parsed.library !== "object") {
    fail("Terminology library missing top-level 'library' object.");
  }

  if (!parsed?.categories || typeof parsed.categories !== "object") {
    fail("Terminology library missing top-level 'categories' object.");
  }

  for (const categoryKey of REQUIRED_CATEGORY_KEYS) {
    const value = parsed.categories[categoryKey];
    if (!Array.isArray(value) || value.length === 0) {
      fail(
        `Terminology library category '${categoryKey}' is missing or empty.`,
      );
    }
  }

  const requiredPairs = Array.isArray(parsed.requiredPairs)
    ? parsed.requiredPairs
    : [];
  for (const concept of REQUIRED_REQUIRED_PAIR_CONCEPTS) {
    const hasConcept = requiredPairs.some(
      (entry) => entry?.concept === concept,
    );
    if (!hasConcept) {
      fail(`Terminology library requiredPairs missing concept '${concept}'.`);
    }
  }

  const protectedTerms = parsed?.regulatoryProtectionRules?.protectedTerms;
  if (!Array.isArray(protectedTerms) || protectedTerms.length === 0) {
    fail(
      "Terminology library regulatoryProtectionRules.protectedTerms is missing or empty.",
    );
  }

  for (const term of REQUIRED_PROTECTED_TERMS) {
    if (!protectedTerms.includes(term)) {
      fail(
        `Terminology library is missing protected regulatory term '${term}'.`,
      );
    }
  }

  return parsed;
}

function getNormalizedAliasCandidates(brandTerm) {
  const normalized = brandTerm.toLowerCase().trim();
  const parenthetical = normalized.match(/\(([^)]+)\)/)?.[1]?.trim();
  const withoutParenthetical = normalized
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .trim();

  const candidates = [normalized, withoutParenthetical].filter(Boolean);
  if (parenthetical) {
    candidates.push(parenthetical);
  }

  return [...new Set(candidates)];
}

function validatePageNamesTerminologyParity(terminologyLibrary) {
  if (!fs.existsSync(PAGE_NAMES_FILE)) {
    fail(
      `Missing page terminology dictionary: ${path.relative(REPO_ROOT, PAGE_NAMES_FILE)}`,
    );
  }

  const pageNamesSource = fs.readFileSync(PAGE_NAMES_FILE, "utf8");
  const additions = terminologyLibrary?.categories?.enterpriseAdditionsV2;
  if (!Array.isArray(additions) || additions.length === 0) {
    fail(
      "Terminology library categories.enterpriseAdditionsV2 is missing or empty.",
    );
  }

  for (const entry of additions) {
    const brandTerm = entry?.brandTerm;
    const standardTerm = entry?.standardTerm;

    if (!brandTerm || !standardTerm) {
      fail(
        "Each enterpriseAdditionsV2 entry must include brandTerm and standardTerm.",
      );
    }

    const aliasCandidates = getNormalizedAliasCandidates(brandTerm);
    const hasAlias = aliasCandidates.some((candidate) =>
      pageNamesSource.includes(`\"${candidate}\":`),
    );

    if (!hasAlias) {
      fail(
        `Page terminology aliases are missing enterprise term '${brandTerm}' (expected alias candidates: ${aliasCandidates.join(", ")}).`,
      );
    }

    const brandWithoutParenthetical = brandTerm
      .replace(/\s*\([^)]*\)\s*/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!pageNamesSource.includes(brandWithoutParenthetical)) {
      fail(
        `Page terminology regex mappings are missing enterprise term '${brandWithoutParenthetical}'.`,
      );
    }

    const acceptedTerms = STANDARD_TERM_EQUIVALENTS[standardTerm] ?? [
      standardTerm,
    ];
    const hasStandardTerm = acceptedTerms.some((term) =>
      pageNamesSource.includes(term),
    );

    if (!hasStandardTerm) {
      fail(
        `Page terminology normalization is missing enterprise standard term '${standardTerm}' (accepted: ${acceptedTerms.join(", ")}).`,
      );
    }
  }
}

function main() {
  const terminologyLibrary = readAndValidateTerminologyLibrary();
  validatePageNamesTerminologyParity(terminologyLibrary);

  let files = collectFilesByPatterns(
    APP_ROOT,
    TARGET_GLOBS,
    EXCLUDED_PATH_PATTERNS,
  );

  files = files.filter((absPath) => !shouldSkipPath(absPath));

  const allFindings = [];

  for (const absPath of files) {
    const relToRepo = path.relative(REPO_ROOT, absPath).replace(/\\/g, "/");

    if (relToRepo.endsWith(".json")) {
      const values = collectStringValuesFromJson(absPath);
      for (const entry of values) {
        const findings = checkTextValue(entry.text, RULES);
        for (const finding of findings) {
          allFindings.push({
            file: relToRepo,
            location: entry.keyPath || "(root)",
            ...finding,
          });
        }
      }
      continue;
    }

    const literals = collectStringLiteralsFromSource(absPath);
    for (const literal of literals) {
      const findings = checkTextValue(literal.text, RULES);
      for (const finding of findings) {
        allFindings.push({
          file: relToRepo,
          location: `line ${literal.line}`,
          ...finding,
        });
      }
    }
  }

  if (allFindings.length > 0) {
    console.error("FAIL: Client terminology guardrails violations detected.\n");

    for (const finding of allFindings) {
      console.error(
        `- [${finding.ruleId}] ${finding.file} (${finding.location})\n  Found: \"${finding.hit}\"\n  Why: ${finding.message}\n  Preferred: ${finding.prefer}\n`,
      );
    }

    process.exit(1);
  }

  console.log(
    "PASS: Client terminology guardrails check (no detour-risk phrasing found).",
  );
}

main();
