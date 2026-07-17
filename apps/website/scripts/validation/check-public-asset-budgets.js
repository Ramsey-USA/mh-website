#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const PUBLIC_DIR = path.join(__dirname, "../../public");
const TOTAL_LIMIT_MB = Number(process.env.PUBLIC_TOTAL_BUDGET_MB || 75);
const FILE_LIMIT_MB = Number(process.env.PUBLIC_MAX_FILE_MB || 8);
const HERO_MEDIA_PREFIX = "videos/hero-commercials/";
const EXCLUDE_HERO_FROM_PUBLIC_BUDGET =
  process.env.PUBLIC_BUDGET_EXCLUDE_HERO !== "0";

const TOTAL_LIMIT_BYTES = TOTAL_LIMIT_MB * 1024 * 1024;
const FILE_LIMIT_BYTES = FILE_LIMIT_MB * 1024 * 1024;

function walk(dir, root = dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, root, acc);
      continue;
    }
    if (entry.isFile()) {
      const size = fs.statSync(fullPath).size;
      acc.push({
        fullPath,
        relativePath: path.relative(root, fullPath).replace(/\\/g, "/"),
        size,
      });
    }
  }
  return acc;
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function isHeroCommercial(relativePath) {
  return relativePath.startsWith(HERO_MEDIA_PREFIX);
}

function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`Public directory not found: ${PUBLIC_DIR}`);
    process.exit(1);
  }

  const files = walk(PUBLIC_DIR);
  const budgetFiles = EXCLUDE_HERO_FROM_PUBLIC_BUDGET
    ? files.filter((f) => !isHeroCommercial(f.relativePath))
    : files;
  const excludedBytes = files
    .filter((f) => !budgetFiles.includes(f))
    .reduce((sum, f) => sum + f.size, 0);
  const totalBytes = budgetFiles.reduce((sum, f) => sum + f.size, 0);

  // Hero commercial files are managed by separate guardrails check
  // and are allowed to exceed the per-file budget
  const oversizedFiles = budgetFiles
    .filter((f) => {
      return f.size > FILE_LIMIT_BYTES;
    })
    .sort((a, b) => b.size - a.size);

  const topFiles = [...budgetFiles]
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  console.log("Public Asset Budget Check");
  console.log(`- Total files scanned: ${files.length}`);
  console.log(`- Files in budget scope: ${budgetFiles.length}`);
  if (EXCLUDE_HERO_FROM_PUBLIC_BUDGET) {
    console.log(
      `- Excluded hero-commercials: ${formatMB(excludedBytes)} (${HERO_MEDIA_PREFIX})`,
    );
  }
  console.log(
    `- Total size: ${formatMB(totalBytes)} (budget ${TOTAL_LIMIT_MB} MB)`,
  );
  console.log(`- Per-file budget: ${FILE_LIMIT_MB} MB`);

  if (topFiles.length > 0) {
    console.log("- Top 10 largest files:");
    for (const file of topFiles) {
      console.log(`  ${formatMB(file.size)}  ${file.relativePath}`);
    }
  }

  let hasError = false;

  if (totalBytes > TOTAL_LIMIT_BYTES) {
    hasError = true;
    console.error(
      `\nFAIL: public/ total ${formatMB(totalBytes)} exceeds ${TOTAL_LIMIT_MB} MB budget.`,
    );
  }

  if (oversizedFiles.length > 0) {
    hasError = true;
    console.error(
      `\nFAIL: ${oversizedFiles.length} file(s) exceed ${FILE_LIMIT_MB} MB:`,
    );
    for (const file of oversizedFiles) {
      console.error(`  ${formatMB(file.size)}  ${file.relativePath}`);
    }
  }

  if (hasError) {
    process.exit(1);
  }

  console.log("\nPASS: public asset budgets are within limits.");
}

run();
