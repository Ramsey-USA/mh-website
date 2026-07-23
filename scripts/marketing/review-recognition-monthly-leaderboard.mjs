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
  "tmp/review-outreach/review-monthly-leaderboard.md",
);

if (!fs.existsSync(inputPath)) {
  console.error(`Tracker file not found: ${inputPath}`);
  process.exit(1);
}

try {
  const { headers, rows } = readCsvFileWithHeaders(inputPath);
  assertValidTracker(headers, rows, inputPath);

  const window = resolveMonthWindow(monthArg);
  const leaderboard = new Map();

  for (const row of rows) {
    if (!isYes(row["qualified_yes_no"])) {
      continue;
    }

    const date =
      parseDate(row["review_date"]) ?? parseDate(row["verification_date"]);
    if (!date || date < window.start || date >= window.end) {
      continue;
    }

    const employee =
      String(row["named_employee"] || "Unassigned").trim() || "Unassigned";
    const record = leaderboard.get(employee) ?? {
      employee,
      qualifiedReviews: 0,
      fulfilledRewards: 0,
      ratings: [],
      payoutIssued: 0,
      payoutPending: 0,
    };

    record.qualifiedReviews += 1;
    const ratingValue = Number.parseFloat(String(row["rating"] || ""));
    if (!Number.isNaN(ratingValue)) {
      record.ratings.push(ratingValue);
    }

    const amount = Number.parseFloat(
      String(row["gift_card_amount_usd"] || "25"),
    );
    const rewardAmount = Number.isNaN(amount) ? 25 : amount;

    if (isYes(row["fulfilled_yes_no"])) {
      record.fulfilledRewards += 1;
      record.payoutIssued += rewardAmount;
    } else {
      record.payoutPending += rewardAmount;
    }

    leaderboard.set(employee, record);
  }

  const ranked = Array.from(leaderboard.values()).sort(
    (a, b) =>
      b.qualifiedReviews - a.qualifiedReviews ||
      a.employee.localeCompare(b.employee),
  );

  const totalQualified = ranked.reduce(
    (sum, row) => sum + row.qualifiedReviews,
    0,
  );
  const totalIssued = ranked.reduce((sum, row) => sum + row.payoutIssued, 0);
  const totalPending = ranked.reduce((sum, row) => sum + row.payoutPending, 0);

  const lines = [
    "# Monthly Review Recognition Leaderboard",
    "",
    `Month: ${window.label}`,
    `Generated: ${new Date().toISOString()}`,
    `Source: ${inputPath}`,
    "",
    "## Snapshot",
    "",
    `- Qualified reviews: ${totalQualified}`,
    `- Reward payout issued: $${totalIssued.toFixed(2)}`,
    `- Reward payout pending: $${totalPending.toFixed(2)}`,
    `- Employees recognized: ${ranked.length}`,
    "",
    "## Leaderboard",
    "",
  ];

  if (ranked.length === 0) {
    lines.push("No qualified reviews found for the selected month.");
  } else {
    lines.push(
      "| Rank | Employee | Qualified Reviews | Fulfilled Rewards | Avg Rating | Issued | Pending |",
      "| --- | --- | ---: | ---: | ---: | ---: | ---: |",
    );
    ranked.forEach((row, index) => {
      const avgRating =
        row.ratings.length === 0
          ? "-"
          : (
              row.ratings.reduce((sum, value) => sum + value, 0) /
              row.ratings.length
            ).toFixed(2);
      lines.push(
        `| ${index + 1} | ${row.employee} | ${row.qualifiedReviews} | ${row.fulfilledRewards} | ${avgRating} | $${row.payoutIssued.toFixed(2)} | $${row.payoutPending.toFixed(2)} |`,
      );
    });
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${lines.join("\n")}\n`, "utf8");

  console.log("Monthly leaderboard generated:");
  console.log(`- ${outputPath}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
