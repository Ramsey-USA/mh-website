#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { normalizeKey, readCsvFileWithHeaders } from "./csv-utils.mjs";
import { assertValidTracker } from "./tracker-validation.mjs";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function parseIsoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function daysBetween(a, b) {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

const inputPath = getArg(
  "--input",
  "docs/marketing/templates/review-recognition-tracker-template.csv",
);
const staleDays = Number.parseInt(getArg("--stale-days", "7"), 10);
const outputPath = getArg(
  "--output",
  "tmp/review-outreach/review-weekly-summary.md",
);

if (!fs.existsSync(inputPath)) {
  console.error(`Tracker file not found: ${inputPath}`);
  process.exit(1);
}

const { headers, rows } = readCsvFileWithHeaders(inputPath);
assertValidTracker(headers, rows, inputPath);
const now = new Date();

const duplicates = [];
const unfulfilled = [];
const seenKeys = new Map();
let qualifiedCount = 0;
let fulfilledCount = 0;

for (const row of rows) {
  const qualified = (row["qualified_yes_no"] || "").toLowerCase() === "yes";
  const fulfilled = (row["fulfilled_yes_no"] || "").toLowerCase() === "yes";

  if (qualified) qualifiedCount += 1;
  if (fulfilled) fulfilledCount += 1;

  const dedupeKey =
    row["duplicate_check_key"] ||
    normalizeKey(
      row["reviewer_name"],
      row["project_slug"] || row["project_name"],
    );

  if (dedupeKey) {
    const prior = seenKeys.get(dedupeKey);
    if (prior) {
      duplicates.push({
        key: dedupeKey,
        current: row,
        previous: prior,
      });
    } else {
      seenKeys.set(dedupeKey, row);
    }
  }

  const verificationDate = parseIsoDate(row["verification_date"]);
  if (qualified && !fulfilled && verificationDate) {
    const ageDays = daysBetween(verificationDate, now);
    if (ageDays >= staleDays) {
      unfulfilled.push({ row, ageDays });
    }
  }
}

const payoutPending = unfulfilled.length;
const estimatedPendingCost = payoutPending * 25;

const lines = [
  "# Weekly Review Recognition Summary",
  "",
  `Generated: ${now.toISOString()}`,
  `Source: ${inputPath}`,
  "",
  "## Snapshot",
  "",
  `- Total rows: ${rows.length}`,
  `- Qualified reviews: ${qualifiedCount}`,
  `- Fulfilled rewards: ${fulfilledCount}`,
  `- Pending rewards (${staleDays}+ days): ${payoutPending}`,
  `- Estimated pending reward cost: $${estimatedPendingCost}`,
  `- Potential duplicate flags: ${duplicates.length}`,
  "",
  "## Pending Rewards",
  "",
];

if (unfulfilled.length === 0) {
  lines.push("No pending qualified rewards beyond the stale threshold.");
} else {
  for (const item of unfulfilled) {
    lines.push(
      `- ${item.row["named_employee"] || "Unassigned"} | ${item.row["reviewer_name"] || "Unknown reviewer"} | ${item.row["project_name"] || "Unknown project"} | ${item.ageDays} days pending`,
    );
  }
}

lines.push("", "## Duplicate Flags", "");
if (duplicates.length === 0) {
  lines.push("No duplicate reviewer/project keys detected.");
} else {
  for (const item of duplicates) {
    lines.push(
      `- Key: ${item.key} | previous date: ${item.previous["review_date"] || "n/a"} | current date: ${item.current["review_date"] || "n/a"}`,
    );
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

console.log("Weekly summary generated:");
console.log(`- ${outputPath}`);
