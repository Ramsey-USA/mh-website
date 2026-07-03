#!/usr/bin/env node

/**
 * Primary Slogan Support Check
 *
 * Rule:
 * If a file contains the primary slogan, it must also contain at least one
 * approved supporting slogan from the current MH slogan family.
 *
 * Scope:
 * - apps/website/src
 * - messages/ (repo root)
 *
 * Usage:
 *   node scripts/validation/check-primary-slogan-support.js
 */

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = process.cwd();
const REPO_ROOT = path.resolve(APP_ROOT, "..", "..");

const SCAN_DIRS = [
  path.join(APP_ROOT, "src"),
  path.join(REPO_ROOT, "messages"),
];

const ALLOWED_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json"]);

const PRIMARY_RE = /Built on Quality, Backed by Trust\./;
const SUPPORTING_RE =
  /Squared away from start to finish\.|From Handshake to Handoff, we got your 'six\.'|Professional on the line\. Thorough in the details\.|No gaps\. No guesswork\. Just accountable follow-through\.|Clear facts\. No spin\. No surprises\.|Commitments kept under pressure\.|Standards high on every site, every day\.|Measure twice, document always, close out clean\./;

const IGNORE_PATH_SEGMENTS = new Set([
  "node_modules",
  ".next",
  ".open-next",
  ".wrangler",
  "coverage",
  "lighthouse-results",
  "documents",
]);

function shouldSkipPath(absPath) {
  const normalized = absPath.replace(/\\/g, "/");
  return [...IGNORE_PATH_SEGMENTS].some(
    (segment) =>
      normalized.includes(`/${segment}/`) || normalized.endsWith(`/${segment}`),
  );
}

function walkFiles(dirPath, found = []) {
  if (!fs.existsSync(dirPath)) {
    return found;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dirPath, entry.name);
    if (shouldSkipPath(abs)) continue;

    if (entry.isDirectory()) {
      walkFiles(abs, found);
      continue;
    }

    const ext = path.extname(entry.name);
    if (ALLOWED_EXTENSIONS.has(ext)) {
      found.push(abs);
    }
  }

  return found;
}

function toRepoRelative(absPath) {
  return path.relative(REPO_ROOT, absPath).replace(/\\/g, "/");
}

function main() {
  const files = SCAN_DIRS.flatMap((dir) => walkFiles(dir));
  const failures = [];

  for (const absPath of files) {
    const source = fs.readFileSync(absPath, "utf8");

    if (!PRIMARY_RE.test(source)) {
      continue;
    }

    if (!SUPPORTING_RE.test(source)) {
      failures.push(toRepoRelative(absPath));
    }
  }

  if (failures.length > 0) {
    console.error("FAIL: Primary slogan found without supporting slogan in:");
    for (const file of failures) {
      console.error(`  - ${file}`);
    }
    process.exit(1);
  }

  console.log(
    "PASS: Every primary slogan occurrence includes supporting slogan coverage.",
  );
}

main();
