#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { readCsvFileWithHeaders } from "./csv-utils.mjs";
import { assertValidTracker } from "./tracker-validation.mjs";

function getArg(flag, fallback = "") {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  return process.argv[index + 1] ?? fallback;
}

function isYes(value) {
  return (
    String(value ?? "")
      .trim()
      .toLowerCase() === "yes"
  );
}

function parseDate(value) {
  const date = new Date(String(value ?? ""));
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

function resolveMonthWindow(monthArg) {
  const now = new Date();
  const monthText =
    monthArg ||
    `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const [yearRaw, monthRaw] = monthText.split("-");
  const year = Number.parseInt(yearRaw, 10);
  const month = Number.parseInt(monthRaw, 10);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12
  ) {
    throw new Error("Invalid --month value. Use YYYY-MM format.");
  }

  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 1));
  return { label: monthText, start, end };
}

const inputPath = getArg(
  "--input",
  "docs/marketing/templates/review-recognition-tracker-template.csv",
);
const monthArg = getArg("--month", "");
const outputPath = getArg(
  "--output",
  "tmp/review-outreach/review-monthly-kpi.json",
);

if (!fs.existsSync(inputPath)) {
  console.error(`Tracker file not found: ${inputPath}`);
  process.exit(1);
}

try {
  const { headers, rows } = readCsvFileWithHeaders(inputPath);
  assertValidTracker(headers, rows, inputPath);

  const window = resolveMonthWindow(monthArg);
  const perEmployee = new Map();

  let qualifiedReviews = 0;
  let fulfilledRewards = 0;
  let payoutIssued = 0;
  let payoutPending = 0;
  let ratingTotal = 0;
  let ratingCount = 0;

  for (const row of rows) {
    if (!isYes(row["qualified_yes_no"])) {
      continue;
    }

    const rowDate =
      parseDate(row["review_date"]) ?? parseDate(row["verification_date"]);
    if (!rowDate || rowDate < window.start || rowDate >= window.end) {
      continue;
    }

    qualifiedReviews += 1;
    const employee =
      String(row["named_employee"] || "Unassigned").trim() || "Unassigned";

    const employeeRecord = perEmployee.get(employee) ?? {
      employee,
      qualifiedReviews: 0,
      fulfilledRewards: 0,
      payoutIssued: 0,
      payoutPending: 0,
      ratings: [],
    };

    employeeRecord.qualifiedReviews += 1;

    const ratingValue = Number.parseFloat(String(row["rating"] || ""));
    if (!Number.isNaN(ratingValue)) {
      ratingTotal += ratingValue;
      ratingCount += 1;
      employeeRecord.ratings.push(ratingValue);
    }

    const amount = Number.parseFloat(
      String(row["gift_card_amount_usd"] || "25"),
    );
    const rewardAmount = Number.isNaN(amount) ? 25 : amount;

    if (isYes(row["fulfilled_yes_no"])) {
      fulfilledRewards += 1;
      payoutIssued += rewardAmount;
      employeeRecord.fulfilledRewards += 1;
      employeeRecord.payoutIssued += rewardAmount;
    } else {
      payoutPending += rewardAmount;
      employeeRecord.payoutPending += rewardAmount;
    }

    perEmployee.set(employee, employeeRecord);
  }

  const topEmployees = Array.from(perEmployee.values())
    .sort(
      (a, b) =>
        b.qualifiedReviews - a.qualifiedReviews ||
        a.employee.localeCompare(b.employee),
    )
    .slice(0, 10)
    .map((entry) => ({
      employee: entry.employee,
      qualifiedReviews: entry.qualifiedReviews,
      fulfilledRewards: entry.fulfilledRewards,
      avgRating:
        entry.ratings.length === 0
          ? null
          : Number(
              (
                entry.ratings.reduce((sum, value) => sum + value, 0) /
                entry.ratings.length
              ).toFixed(2),
            ),
      payoutIssued: Number(entry.payoutIssued.toFixed(2)),
      payoutPending: Number(entry.payoutPending.toFixed(2)),
    }));

  const payload = {
    generatedAt: new Date().toISOString(),
    month: window.label,
    source: inputPath,
    metrics: {
      qualifiedReviews,
      fulfilledRewards,
      payoutIssued: Number(payoutIssued.toFixed(2)),
      payoutPending: Number(payoutPending.toFixed(2)),
      averageRating:
        ratingCount === 0
          ? null
          : Number((ratingTotal / ratingCount).toFixed(2)),
      employeeCount: perEmployee.size,
    },
    topEmployees,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log("Monthly KPI JSON generated:");
  console.log(`- ${outputPath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
