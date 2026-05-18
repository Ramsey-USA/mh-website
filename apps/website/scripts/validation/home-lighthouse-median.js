#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const RUNS = Number(process.env.LH_HOME_MEDIAN_RUNS || 3);
const MAX_ATTEMPTS = Number(process.env.LH_HOME_MEDIAN_MAX_ATTEMPTS || 3);
const RUN_TIMEOUT_MS = Number(
  process.env.LH_HOME_MEDIAN_RUN_TIMEOUT_MS || 10 * 60 * 1000,
);
const REPORT_PATH = path.join(
  __dirname,
  "../../lighthouse-results/home-latest.report.json",
);
const OUTPUT_PATH = path.join(
  __dirname,
  "../../lighthouse-results/home-median-latest.json",
);

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
}

function runAudit(iteration, total) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    console.log(
      `\\n[home-median] Run ${iteration}/${total} (attempt ${attempt}/${MAX_ATTEMPTS})`,
    );

    const result = spawnSync(
      "bash",
      [
        "-lc",
        "CHROME_PATH=/usr/bin/chromium npm run lighthouse:home:local >/tmp/mh-home-median-run.log 2>&1",
      ],
      {
        cwd: path.join(__dirname, "../.."),
        stdio: "inherit",
        timeout: RUN_TIMEOUT_MS,
      },
    );

    if (result.status === 0) {
      if (!fs.existsSync(REPORT_PATH)) {
        throw new Error(`Missing report at ${REPORT_PATH}`);
      }

      const report = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
      const categories = report.categories || {};
      const audits = report.audits || {};

      return {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round(
          (categories["best-practices"]?.score || 0) * 100,
        ),
        seo: Math.round((categories.seo?.score || 0) * 100),
        lcpMs: Number(audits["largest-contentful-paint"]?.numericValue || 0),
        tbtMs: Number(audits["total-blocking-time"]?.numericValue || 0),
        cls: Number(audits["cumulative-layout-shift"]?.numericValue || 0),
      };
    }

    if (attempt < MAX_ATTEMPTS) {
      console.warn(
        `[home-median] Run ${iteration} attempt ${attempt} failed${result.signal ? ` (signal ${result.signal})` : ""}${result.status !== null ? ` (exit code ${result.status})` : ""}. Retrying...`,
      );
    } else {
      throw new Error(
        `Lighthouse run ${iteration} failed after ${MAX_ATTEMPTS} attempts${result.signal ? ` (signal ${result.signal})` : ""}${result.status !== null ? ` (last exit code ${result.status})` : ""}`,
      );
    }
  }

  throw new Error(`Unexpected retry flow for run ${iteration}`);
}

function formatMs(value) {
  return `${Math.round(value)} ms`;
}

function formatLcp(value) {
  return `${(value / 1000).toFixed(1)} s`;
}

function main() {
  if (!Number.isInteger(RUNS) || RUNS < 1) {
    throw new Error("LH_HOME_MEDIAN_RUNS must be an integer >= 1");
  }
  if (!Number.isInteger(MAX_ATTEMPTS) || MAX_ATTEMPTS < 1) {
    throw new Error("LH_HOME_MEDIAN_MAX_ATTEMPTS must be an integer >= 1");
  }
  if (!Number.isInteger(RUN_TIMEOUT_MS) || RUN_TIMEOUT_MS < 1) {
    throw new Error("LH_HOME_MEDIAN_RUN_TIMEOUT_MS must be an integer >= 1");
  }

  const runs = [];
  for (let i = 1; i <= RUNS; i += 1) {
    runs.push(runAudit(i, RUNS));
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    runs,
    median: {
      performance: median(runs.map((r) => r.performance)),
      accessibility: median(runs.map((r) => r.accessibility)),
      bestPractices: median(runs.map((r) => r.bestPractices)),
      seo: median(runs.map((r) => r.seo)),
      lcpMs: median(runs.map((r) => r.lcpMs)),
      tbtMs: median(runs.map((r) => r.tbtMs)),
      cls: median(runs.map((r) => r.cls)),
    },
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(summary, null, 2));

  console.log("\\n[home-median] Summary");
  console.log(`  Runs: ${RUNS}`);
  console.log(`  Performance (median): ${summary.median.performance}`);
  console.log(`  Accessibility (median): ${summary.median.accessibility}`);
  console.log(`  Best Practices (median): ${summary.median.bestPractices}`);
  console.log(`  SEO (median): ${summary.median.seo}`);
  console.log(`  TBT (median): ${formatMs(summary.median.tbtMs)}`);
  console.log(`  LCP (median): ${formatLcp(summary.median.lcpMs)}`);
  console.log(`  CLS (median): ${summary.median.cls.toFixed(3)}`);
  console.log(`  Output: ${OUTPUT_PATH}`);
}

try {
  main();
} catch (error) {
  console.error(`\\n[home-median] Failed: ${error.message}`);
  process.exit(1);
}
