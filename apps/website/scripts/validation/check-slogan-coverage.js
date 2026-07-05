#!/usr/bin/env node

/**
 * Slogan Coverage Check
 *
 * Enforces MH branding coverage for page-level hero surfaces.
 * Each listed file must contain:
 * - one primary slogan signal
 * - one supporting slogan signal
 *
 * Usage:
 *   node scripts/validation/check-slogan-coverage.js
 */

const fs = require("fs");
const path = require("path");
const { SLOGAN_RULES } = require("./branding-rules.cjs");

const ROOT = process.cwd();
const HERO_SLOGAN_SOURCE_PATH = path.resolve(
  ROOT,
  "src/content/hero-page-slogans.md",
);

const HERO_FILES = SLOGAN_RULES.heroFiles;
const HERO_FILE_PAGE_KEY_MAP = SLOGAN_RULES.heroFilePageKeyMap || {};
const HERO_TYPOGRAPHY_TOKENS = SLOGAN_RULES.heroTypographyTokens || [];

const PRIMARY_SIGNAL = new RegExp(
  `${SLOGAN_RULES.primaryRegex.source}|COMPANY_INFO\\.slogan\\.primary|hero\\.mission|copy\\.mission`,
);

const SUPPORTING_SIGNAL = new RegExp(
  `${SLOGAN_RULES.supportingRegex.source}|COMPANY_INFO\\.slogan\\.(secondary|tertiary|quaternary|quinary)|sectionTagline|copy\\.tagline|heroSlogan|getHeroPageSlogan\\(`,
);

function readFileSafe(absPath) {
  try {
    return fs.readFileSync(absPath, "utf8");
  } catch {
    return null;
  }
}

function parseHeroSlogansFromSource(markdownSource) {
  const sections = markdownSource.split(/^##\s+/m).slice(1);
  const entries = [];

  for (const section of sections) {
    const [rawTitle = "", ...rest] = section.split("\n");
    const pageKey = rawTitle.trim();
    if (!pageKey) {
      continue;
    }

    const body = rest.join("\n");
    const sloganMatch = body.match(/^slogan:\s*(.+)$/m);
    const slogan = sloganMatch?.[1]?.trim();

    if (!slogan) {
      continue;
    }

    entries.push({ pageKey, slogan });
  }

  return entries;
}

function findDuplicateSlogans(entries) {
  const bySlogan = new Map();

  for (const entry of entries) {
    const key = entry.slogan.trim().toLowerCase();
    if (!bySlogan.has(key)) {
      bySlogan.set(key, []);
    }
    bySlogan.get(key).push(entry.pageKey);
  }

  const duplicates = [];
  for (const [normalizedSlogan, pageKeys] of bySlogan.entries()) {
    if (pageKeys.length > 1) {
      duplicates.push({ normalizedSlogan, pageKeys });
    }
  }

  return duplicates;
}

function parsePageSloganMatrixAsMap(entries) {
  const pageKeyToSlogan = new Map();

  for (const entry of entries) {
    if (!pageKeyToSlogan.has(entry.pageKey)) {
      pageKeyToSlogan.set(entry.pageKey, entry.slogan);
    }
  }

  return pageKeyToSlogan;
}

function main() {
  const missingFiles = [];
  const gaps = [];
  const sourceViolations = [];
  const heroMappingViolations = [];
  const heroTypographyViolations = [];
  const heroTerminologyViolations = [];
  const heroAssignedSlogans = [];

  const heroFilesSet = new Set(HERO_FILES);
  const mappingFilesSet = new Set(Object.keys(HERO_FILE_PAGE_KEY_MAP));

  for (const heroFile of HERO_FILES) {
    if (!mappingFilesSet.has(heroFile)) {
      heroMappingViolations.push(
        `Missing hero file page-key mapping for ${heroFile}`,
      );
    }
  }

  for (const mappedFile of mappingFilesSet) {
    if (!heroFilesSet.has(mappedFile)) {
      heroMappingViolations.push(
        `Mapped hero file is not in SLOGAN_RULES.heroFiles: ${mappedFile}`,
      );
    }
  }

  for (const relPath of HERO_FILES) {
    const absPath = path.resolve(ROOT, relPath);
    const source = readFileSafe(absPath);

    if (source == null) {
      missingFiles.push(relPath);
      continue;
    }

    const hasPrimary = PRIMARY_SIGNAL.test(source);
    const hasSupporting = SUPPORTING_SIGNAL.test(source);
    const hasDualTerminologySignal =
      source.includes("→") || source.includes("-&gt;") || source.includes("->");

    const missingTypographyTokens = HERO_TYPOGRAPHY_TOKENS.filter(
      (token) => !source.includes(token),
    );

    if (missingTypographyTokens.length > 0) {
      heroTypographyViolations.push(
        `${relPath} missing hero typography token(s): ${missingTypographyTokens.join(", ")}`,
      );
    }

    if (!hasDualTerminologySignal) {
      heroTerminologyViolations.push(
        `${relPath} missing dual-terminology signal (expected '→' in hero content)`,
      );
    }

    const mappedPageKey = HERO_FILE_PAGE_KEY_MAP[relPath];
    if (mappedPageKey) {
      heroAssignedSlogans.push({ relPath, pageKey: mappedPageKey });
    }

    if (!hasPrimary || !hasSupporting) {
      gaps.push({
        file: relPath,
        hasPrimary,
        hasSupporting,
      });
    }
  }

  const sloganSource = readFileSafe(HERO_SLOGAN_SOURCE_PATH);
  if (sloganSource == null) {
    sourceViolations.push(
      `Missing canonical hero slogan source: ${HERO_SLOGAN_SOURCE_PATH}`,
    );
  } else {
    const matrixEntries = parseHeroSlogansFromSource(sloganSource);
    const pageKeyToSlogan = parsePageSloganMatrixAsMap(matrixEntries);

    if (matrixEntries.length === 0) {
      sourceViolations.push(
        "No hero slogans were parsed from src/content/hero-page-slogans.md",
      );
    }

    const duplicateSlogans = findDuplicateSlogans(matrixEntries);
    for (const duplicate of duplicateSlogans) {
      sourceViolations.push(
        `Duplicate hero page slogan in source for page keys [${duplicate.pageKeys.join(", ")}]: ${duplicate.normalizedSlogan}`,
      );
    }

    for (const assignment of heroAssignedSlogans) {
      if (!pageKeyToSlogan.has(assignment.pageKey)) {
        heroMappingViolations.push(
          `${assignment.relPath} maps to missing page key in hero-page-slogans source: ${assignment.pageKey}`,
        );
      }
    }

    const bySloganForHeroAssignments = new Map();
    for (const assignment of heroAssignedSlogans) {
      const slogan = pageKeyToSlogan.get(assignment.pageKey);
      if (!slogan) {
        continue;
      }
      const normalized = slogan.trim().toLowerCase();
      if (!bySloganForHeroAssignments.has(normalized)) {
        bySloganForHeroAssignments.set(normalized, []);
      }
      bySloganForHeroAssignments
        .get(normalized)
        .push(`${assignment.relPath} (${assignment.pageKey})`);
    }

    for (const [
      normalizedSlogan,
      assignments,
    ] of bySloganForHeroAssignments.entries()) {
      if (assignments.length > 1) {
        heroMappingViolations.push(
          `Hero slogan assignment is not unique across hero surfaces: ${normalizedSlogan} -> ${assignments.join("; ")}`,
        );
      }
    }
  }

  if (missingFiles.length > 0) {
    console.error("\nMissing slogan-coverage files:");
    for (const file of missingFiles) {
      console.error(`  - ${file}`);
    }
  }

  if (gaps.length > 0) {
    console.error("\nSlogan coverage gaps detected:");
    for (const gap of gaps) {
      console.error(
        `  - ${gap.file} | primary=${gap.hasPrimary ? "yes" : "no"} supporting=${gap.hasSupporting ? "yes" : "no"}`,
      );
    }
  }

  if (sourceViolations.length > 0) {
    console.error("\nHero slogan source violations detected:");
    for (const violation of sourceViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (heroMappingViolations.length > 0) {
    console.error("\nHero slogan mapping violations detected:");
    for (const violation of heroMappingViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (heroTypographyViolations.length > 0) {
    console.error("\nHero typography consistency violations:");
    for (const violation of heroTypographyViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (heroTerminologyViolations.length > 0) {
    console.error("\nHero dual-terminology violations:");
    for (const violation of heroTerminologyViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (
    missingFiles.length > 0 ||
    gaps.length > 0 ||
    sourceViolations.length > 0 ||
    heroMappingViolations.length > 0 ||
    heroTypographyViolations.length > 0 ||
    heroTerminologyViolations.length > 0
  ) {
    console.error("\nFAIL: Slogan coverage check failed.");
    process.exit(1);
  }

  console.log("PASS: Slogan coverage check passed for all hero surfaces.");
}

main();
