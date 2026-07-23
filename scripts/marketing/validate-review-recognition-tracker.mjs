#!/usr/bin/env node

import fs from "node:fs";
import { readCsvFileWithHeaders } from "./csv-utils.mjs";
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

if (!fs.existsSync(inputPath)) {
  console.error(`Tracker file not found: ${inputPath}`);
  process.exit(1);
}

try {
  const { headers, rows } = readCsvFileWithHeaders(inputPath);
  assertValidTracker(headers, rows, inputPath);
  console.log(`Tracker validation passed: ${inputPath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
