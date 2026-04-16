#!/usr/bin/env node

/**
 * Performance Gate
 *
 * Validates committed Lighthouse summary artifacts and fails on invalid
 * successful audits (for example: all category scores equal 0).
 *
 * Usage:
 *   node scripts/validation/performance-gate.js
 *   node scripts/validation/performance-gate.js --strict
 *   node scripts/validation/performance-gate.js --file lighthouse-results/summary.json --strict
 */

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const strict = args.includes("--strict");

const fileFlagIndex = args.findIndex((arg) => arg === "--file");
const fileArg = fileFlagIndex >= 0 ? args[fileFlagIndex + 1] : null;
const summaryPath = path.resolve(
  process.cwd(),
  fileArg || "lighthouse-results/summary.json",
);

const KEY_ROUTE_PATHS = new Set([
  "/",
  "/careers",
  "/veterans",
  "/services",
  "/dashboard",
]);

const STRICT_MIN_PERFORMANCE_BY_PATH = {
  "/": 70,
  "/careers": 65,
  "/veterans": 65,
  "/services": 70,
  "/dashboard": 60,
};

function getPathname(url) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url;
  }
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`⚠️  ${message}`);
}

function parseSummary(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.results)) return raw.results;
  return null;
}

function isNumericScore(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function validateEntry(entry) {
  const scores = entry.scores || {};
  const p = scores.performance;
  const a = scores.accessibility;
  const b = scores.bestPractices;
  const s = scores.seo;

  if (
    !isNumericScore(p) ||
    !isNumericScore(a) ||
    !isNumericScore(b) ||
    !isNumericScore(s)
  ) {
    return "Missing numeric Lighthouse category scores";
  }

  if ([p, a, b, s].some((score) => score < 0 || score > 100)) {
    return "Category score out of bounds (expected 0-100)";
  }

  // In this repo, all-0 + success has historically indicated invalid artifacts.
  if (p === 0 && a === 0 && b === 0 && s === 0) {
    return "Invalid successful audit: all category scores are 0";
  }

  return null;
}

function main() {
  console.log(`🔎 Performance gate: ${summaryPath}`);

  if (!fs.existsSync(summaryPath)) {
    const message = "Lighthouse summary file not found";
    if (strict) {
      fail(message);
      return;
    }
    warn(`${message} (non-strict mode, skipping)`);
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(summaryPath, "utf8"));
  } catch (error) {
    fail(`Failed to parse summary JSON: ${error.message}`);
    return;
  }

  const results = parseSummary(parsed);
  if (!results) {
    fail("Unsupported summary format (expected array or { results: [] })");
    return;
  }

  if (results.length === 0) {
    const message = "Summary contains no page results";
    if (strict) {
      fail(message);
      return;
    }
    warn(`${message} (non-strict mode, skipping)`);
    return;
  }

  let invalidCount = 0;
  let successfulCount = 0;
  let keyRouteSuccessCount = 0;
  let budgetFailures = 0;

  for (const entry of results) {
    if (!entry || !entry.url) continue;
    const pathname = getPathname(entry.url);

    if (entry.success === true) {
      successfulCount++;
      if (KEY_ROUTE_PATHS.has(pathname)) keyRouteSuccessCount++;

      const reason = validateEntry(entry);
      if (reason) {
        invalidCount++;
        console.error(`   • ${entry.url}: ${reason}`);
        continue;
      }

      const routeBudget = STRICT_MIN_PERFORMANCE_BY_PATH[pathname];
      if (
        strict &&
        typeof routeBudget === "number" &&
        entry.scores.performance < routeBudget
      ) {
        budgetFailures++;
        console.error(
          `   • ${entry.url} (${pathname}): performance ${entry.scores.performance} is below budget ${routeBudget}`,
        );
      }
    }
  }

  if (invalidCount > 0) {
    fail(
      `Performance gate failed with ${invalidCount} invalid successful audit(s).`,
    );
    return;
  }

  if (budgetFailures > 0) {
    fail(
      `Performance gate failed with ${budgetFailures} strict budget violation(s).`,
    );
    return;
  }

  if (successfulCount === 0) {
    const message = "No successful audits found in summary";
    if (strict) {
      fail(message);
      return;
    }
    warn(`${message} (non-strict mode, skipping)`);
    return;
  }

  if (keyRouteSuccessCount === 0) {
    const message =
      "No successful audits for key routes (/, /careers, /veterans, /services, /dashboard)";
    if (strict) {
      fail(message);
      return;
    }
    warn(`${message} (non-strict mode)`);
  }

  console.log(
    `✅ Performance gate passed (${successfulCount} successful audit(s), ${keyRouteSuccessCount} key-route audit(s)).`,
  );
}

main();
