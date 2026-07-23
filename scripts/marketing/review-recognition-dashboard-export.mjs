#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { readCsvFileWithHeaders, writeCsvFile } from "./csv-utils.mjs";
import { assertValidTracker } from "./tracker-validation.mjs";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

const inputPath = getArg(
  "--input",
  "docs/marketing/templates/review-recognition-tracker-template.csv",
);
const outputPath = getArg(
  "--output",
  "tmp/review-outreach/review-recognition-dashboard-import.csv",
);

if (!fs.existsSync(inputPath)) {
  console.error(`Tracker file not found: ${inputPath}`);
  process.exit(1);
}

const { headers, rows: trackerRows } = readCsvFileWithHeaders(inputPath);
assertValidTracker(headers, trackerRows, inputPath);

const dashboardRows = trackerRows.map((row) => ({
  review_date: row["review_date"] || "",
  reviewer_name: row["reviewer_name"] || "",
  project_name: row["project_name"] || "",
  named_employee: row["named_employee"] || "",
  rating: row["rating"] || "",
  qualified: row["qualified_yes_no"] || "",
  fulfilled: row["fulfilled_yes_no"] || "",
  verification_date: row["verification_date"] || "",
  fulfillment_date: row["fulfillment_date"] || "",
  gift_card_amount_usd: row["gift_card_amount_usd"] || "25",
  review_url: row["review_url"] || "",
  duplicate_check_key: row["duplicate_check_key"] || "",
  notes: row["notes"] || "",
}));

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
writeCsvFile(
  outputPath,
  [
    "review_date",
    "reviewer_name",
    "project_name",
    "named_employee",
    "rating",
    "qualified",
    "fulfilled",
    "verification_date",
    "fulfillment_date",
    "gift_card_amount_usd",
    "review_url",
    "duplicate_check_key",
    "notes",
  ],
  dashboardRows,
);

console.log(`Dashboard import CSV generated: ${outputPath}`);
console.log(`Rows exported: ${dashboardRows.length}`);
