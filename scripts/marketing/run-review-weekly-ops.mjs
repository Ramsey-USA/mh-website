#!/usr/bin/env node

import { spawnSync } from "node:child_process";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function runStep(label, command, args) {
  console.log(`\n[${label}]`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const inputPath = getArg(
  "--input",
  "docs/marketing/templates/review-recognition-tracker-template.csv",
);
const closeoutInputPath = getArg(
  "--closeout-input",
  "docs/marketing/templates/review-closeout-input-template.csv",
);
const staleDays = getArg("--stale-days", "7");
const outputDir = getArg("--output-dir", "tmp/review-outreach");
const month = getArg("--month", "");

runStep("Validate closeout input", "node", [
  "scripts/marketing/validate-review-closeout-input.mjs",
  "--input",
  closeoutInputPath,
]);

runStep("Validate tracker", "node", [
  "scripts/marketing/validate-review-recognition-tracker.mjs",
  "--input",
  inputPath,
]);

runStep("Generate weekly summary", "node", [
  "scripts/marketing/review-recognition-weekly-summary.mjs",
  "--input",
  inputPath,
  "--stale-days",
  staleDays,
  "--output",
  `${outputDir}/review-weekly-summary.md`,
]);

runStep("Generate dashboard export", "node", [
  "scripts/marketing/review-recognition-dashboard-export.mjs",
  "--input",
  inputPath,
  "--output",
  `${outputDir}/review-recognition-dashboard-import.csv`,
]);

const leaderboardArgs = [
  "scripts/marketing/review-recognition-monthly-leaderboard.mjs",
  "--input",
  inputPath,
  "--output",
  `${outputDir}/review-monthly-leaderboard.md`,
];
if (month) {
  leaderboardArgs.push("--month", month);
}
runStep("Generate monthly leaderboard", "node", leaderboardArgs);

const kpiArgs = [
  "scripts/marketing/review-recognition-monthly-kpi.mjs",
  "--input",
  inputPath,
  "--output",
  `${outputDir}/review-monthly-kpi.json`,
];
if (month) {
  kpiArgs.push("--month", month);
}
runStep("Generate monthly KPI JSON", "node", kpiArgs);

console.log("\nReview weekly operations completed successfully.");
