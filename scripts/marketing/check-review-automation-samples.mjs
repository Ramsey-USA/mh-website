#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function runStep(label, command, args) {
  console.log(`\n[${label}]`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/\r\n/g, "\n");
}

function normalizeMarkdown(content) {
  return content
    .replace(/^Generated:\s+.*$/gm, "Generated: <normalized>")
    .trimEnd();
}

function normalizeJson(content) {
  const parsed = JSON.parse(content);
  if (Object.hasOwn(parsed, "generatedAt")) {
    parsed.generatedAt = "<normalized>";
  }
  return `${JSON.stringify(parsed, null, 2)}\n`;
}

function normalizeCsv(content) {
  return content.trimEnd() + "\n";
}

function assertEqualFile(actualPath, expectedPath) {
  const ext = path.extname(actualPath).toLowerCase();
  const actualRaw = readText(actualPath);
  const expectedRaw = readText(expectedPath);

  let actual = actualRaw;
  let expected = expectedRaw;

  if (ext === ".md") {
    actual = normalizeMarkdown(actualRaw);
    expected = normalizeMarkdown(expectedRaw);
  } else if (ext === ".json") {
    actual = normalizeJson(actualRaw);
    expected = normalizeJson(expectedRaw);
  } else if (ext === ".csv") {
    actual = normalizeCsv(actualRaw);
    expected = normalizeCsv(expectedRaw);
  }

  if (actual !== expected) {
    throw new Error(
      `Regression mismatch: ${path.basename(actualPath)}\nExpected: ${expectedPath}\nActual: ${actualPath}`,
    );
  }
}

const expectedDir = "docs/marketing/templates/samples/expected-output";
const outputDir = "tmp/review-outreach/sample-regression";
const closeoutSample =
  "docs/marketing/templates/samples/review-closeout-sample.csv";
const trackerSample =
  "docs/marketing/templates/samples/review-recognition-tracker-sample.csv";

if (!fs.existsSync(expectedDir)) {
  console.error(`Expected output directory not found: ${expectedDir}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

runStep("Generate outreach sample outputs", "node", [
  "scripts/marketing/generate-review-outreach.mjs",
  "--input",
  closeoutSample,
  "--output-dir",
  outputDir,
]);

runStep("Run weekly ops sample workflow", "node", [
  "scripts/marketing/run-review-weekly-ops.mjs",
  "--closeout-input",
  closeoutSample,
  "--input",
  trackerSample,
  "--stale-days",
  "7",
  "--output-dir",
  outputDir,
  "--month",
  "2026-07",
]);

const filesToCompare = [
  "review-outreach-email.csv",
  "review-outreach-sms.csv",
  "review-recognition-dashboard-import.csv",
  "review-weekly-summary.md",
  "review-monthly-leaderboard.md",
  "review-monthly-kpi.json",
];

for (const fileName of filesToCompare) {
  const actualPath = path.join(outputDir, fileName);
  const expectedPath = path.join(expectedDir, fileName);

  if (!fs.existsSync(actualPath)) {
    throw new Error(`Missing generated file: ${actualPath}`);
  }
  if (!fs.existsSync(expectedPath)) {
    throw new Error(`Missing expected file: ${expectedPath}`);
  }

  assertEqualFile(actualPath, expectedPath);
  console.log(`[OK] ${fileName}`);
}

console.log("\nReview automation sample regression check passed.");
