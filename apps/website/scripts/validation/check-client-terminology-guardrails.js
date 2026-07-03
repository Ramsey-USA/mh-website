#!/usr/bin/env node

/**
 * Client Terminology Guardrails Check
 *
 * Prevents client-detouring language from re-entering user-facing copy.
 * Focuses on website page/component string literals + locale JSON values.
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

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

const RULES = [
  {
    id: "hard-dollar-amount",
    pattern: /\$\s?\d[\d.,]*(?:\s?[KMBkmb])?\+?/g,
    message: "Avoid hard dollar amounts in client-facing copy.",
    prefer:
      "Use trust-safe phrasing like 'robust bonding capacity' or 'defined approval controls'.",
  },
  {
    id: "choose-market",
    pattern: /\b(?:choose|pick)\s+(?:your\s+)?market\b/gi,
    message: "Avoid market-trader journey framing.",
    prefer: "Use 'project type', 'delivery path', or 'scope fit'.",
  },
  {
    id: "market-by-market",
    pattern: /\bmarket[-\s]by[-\s]market\b/gi,
    message: "Avoid market-by-market phrasing.",
    prefer: "Use 'location-by-location' or 'project-type'.",
  },
  {
    id: "service-market-label",
    pattern:
      /\b(?:service|delivery|planning|regional|local|technical|public-sector|municipal|partner)\s+market\b/gi,
    message: "Avoid market labels in user-facing navigation/copy.",
    prefer: "Use 'service area', 'project path', or 'project type'.",
  },
  {
    id: "market-page-label",
    pattern: /\bmarket\s+page\b/gi,
    message: "Avoid market page phrasing.",
    prefer: "Use 'service area page' or route by project type.",
  },
  {
    id: "approval-threshold-label",
    pattern: /\bapproval\s+thresholds?\b/gi,
    message: "Avoid threshold-heavy terminology in client-facing copy.",
    prefer: "Use 'approval controls'.",
  },
  {
    id: "generic-market-noun",
    pattern: /\bmarket\b/gi,
    message: "Avoid generic market wording in client-facing copy.",
    prefer: "Use 'project type', 'service area', or 'delivery lane'.",
    // Keep this rule low-noise by allowing common non-detouring contexts.
    allowIfMatch: [
      /marketing/i,
      /remarketing/i,
      /benchmark/i,
      /marketplace/i,
      /google business profile/i,
    ],
  },
];

function runGitLsFiles(cwd, globs) {
  const result = spawnSync("git", ["ls-files", ...globs], {
    cwd,
    encoding: "utf8",
  });

  if (result.status !== 0) {
    throw new Error(
      (result.stderr || result.stdout || "git ls-files failed").trim(),
    );
  }

  return (result.stdout || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

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
    )
      continue;

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

function main() {
  let files = runGitLsFiles(APP_ROOT, TARGET_GLOBS);

  files = files
    .map((relative) => path.resolve(APP_ROOT, relative))
    .filter((absPath) => !shouldSkipPath(absPath));

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
