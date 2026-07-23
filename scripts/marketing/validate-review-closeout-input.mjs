#!/usr/bin/env node

import fs from "node:fs";
import { readCsvFileWithHeaders } from "./csv-utils.mjs";
import { assertValidCloseout } from "./closeout-validation.mjs";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

const inputPath = getArg(
  "--input",
  "docs/marketing/templates/review-closeout-input-template.csv",
);

if (!fs.existsSync(inputPath)) {
  console.error(`Closeout input file not found: ${inputPath}`);
  process.exit(1);
}

try {
  const { headers, rows } = readCsvFileWithHeaders(inputPath);
  assertValidCloseout(headers, rows, inputPath);
  console.log(`Closeout input validation passed: ${inputPath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
