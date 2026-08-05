#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const ALLOWED_FILES = new Set(["apps/website/src/lib/data/team-profiles.ts"]);

const ALLOWED_SYMBOL_FILES = new Set([
  "scripts/validation/check-no-legacy-vintage-team-imports.mjs",
]);

const CODE_EXT_RE = /\.(ts|tsx|js|jsx|mjs|cjs)$/;
const LEGACY_IMPORT_RE =
  /(from\s+["'][^"']*vintage-team["'])|(require\(\s*["'][^"']*vintage-team["']\s*\))|(jest\.mock\(\s*["'][^"']*vintage-team["'])/;
const LEGACY_SYMBOL_RE =
  /\b(VintageTeamMember|vintageTeamMembers|getPublicVintageTeamMembers)\b/;

function walkFiles(dir) {
  const results = [];
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") {
        continue;
      }
      results.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile() && CODE_EXT_RE.test(entry.name)) {
      results.push(fullPath);
    }
  }

  return results;
}

function getTrackedFiles() {
  const repoRoot = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "../..",
  );
  return walkFiles(repoRoot).map((filePath) =>
    path.relative(repoRoot, filePath).replace(/\\/g, "/"),
  );
}

function collectViolations(files) {
  const violations = [];

  for (const file of files) {
    if (ALLOWED_FILES.has(file)) {
      continue;
    }

    const content = readFileSync(file, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (LEGACY_IMPORT_RE.test(line)) {
        violations.push({
          file,
          line: index + 1,
          type: "legacy-import",
          snippet: line.trim(),
        });
      }

      if (!ALLOWED_SYMBOL_FILES.has(file) && LEGACY_SYMBOL_RE.test(line)) {
        violations.push({
          file,
          line: index + 1,
          type: "legacy-symbol",
          snippet: line.trim(),
        });
      }
    });
  }

  return violations;
}

function main() {
  const files = getTrackedFiles();
  const violations = collectViolations(files);

  if (violations.length === 0) {
    console.log(
      "PASS: no legacy vintage-team imports found outside migration bridge modules.",
    );
    return;
  }

  console.error(
    "FAIL: legacy vintage-team imports or symbols detected. Use team-profiles names instead.",
  );
  for (const violation of violations) {
    console.error(
      `- [${violation.type}] ${violation.file}:${violation.line} :: ${violation.snippet}`,
    );
  }
  process.exit(1);
}

main();
