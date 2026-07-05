#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const LEVELS = ["info", "low", "moderate", "high", "critical"];

function parseArg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || index + 1 >= process.argv.length) {
    return fallback;
  }
  return process.argv[index + 1];
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function normalizeLevel(level) {
  const normalized = String(level || "").toLowerCase();
  if (!LEVELS.includes(normalized)) {
    return null;
  }
  return normalized;
}

function extractJson(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    throw new Error("pnpm audit returned empty output");
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const firstBrace = trimmed.indexOf("{");
    const lastBrace = trimmed.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1 || firstBrace >= lastBrace) {
      throw new Error("Unable to parse pnpm audit JSON output");
    }
    return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
  }
}

function getCounts(report) {
  const vulnerabilities = report?.metadata?.vulnerabilities;
  return {
    info: Number(vulnerabilities?.info || 0),
    low: Number(vulnerabilities?.low || 0),
    moderate: Number(vulnerabilities?.moderate || 0),
    high: Number(vulnerabilities?.high || 0),
    critical: Number(vulnerabilities?.critical || 0),
  };
}

function countAtOrAboveLevel(counts, level) {
  const threshold = LEVELS.indexOf(level);
  return LEVELS.slice(threshold).reduce(
    (sum, severity) => sum + counts[severity],
    0,
  );
}

const levelArg = parseArg(
  "--level",
  process.env.SECURITY_AUDIT_LEVEL || "high",
);
const level = normalizeLevel(levelArg);
if (!level) {
  console.error(
    `Invalid --level value \"${levelArg}\". Use one of: ${LEVELS.join(", ")}`,
  );
  process.exit(2);
}

const prodOnly =
  hasFlag("--prod") || process.env.SECURITY_AUDIT_PROD === "true";
const args = ["audit", "--json", ...(prodOnly ? ["--prod"] : [])];

const run = spawnSync("pnpm", args, {
  encoding: "utf8",
  env: process.env,
});

if (run.error) {
  console.error(`Failed to run pnpm audit: ${run.error.message}`);
  process.exit(2);
}

const combinedOutput = `${run.stdout || ""}${run.stderr || ""}`;
let report;
try {
  report = extractJson(combinedOutput);
} catch (error) {
  console.error("Failed to parse pnpm audit output.");
  if (combinedOutput.trim()) {
    console.error(combinedOutput.trim());
  }
  console.error(error.message);
  process.exit(2);
}

const counts = getCounts(report);
const total = LEVELS.reduce((sum, severity) => sum + counts[severity], 0);
const violations = countAtOrAboveLevel(counts, level);

console.log("Dependency Security Audit");
console.log(
  `Mode: ${prodOnly ? "production dependencies" : "all dependencies"}`,
);
console.log(`Fail threshold: ${level}`);
console.log(
  `Counts: info=${counts.info} low=${counts.low} moderate=${counts.moderate} high=${counts.high} critical=${counts.critical}`,
);

if (violations > 0) {
  console.error(
    `Security gate failed: found ${violations} vulnerabilities at or above ${level} severity (${total} total).`,
  );
  process.exit(1);
}

console.log(
  `Security gate passed: 0 vulnerabilities at or above ${level} severity (${total} total).`,
);
