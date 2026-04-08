#!/usr/bin/env node

/**
 * Quick Lighthouse Test - Tests a few key pages
 */

const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

// Test just a few key pages
const pages = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
];

const baseUrl = "http://localhost:3000";

const config = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "desktop",
    throttling: {
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: {
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false,
    },
  },
};

async function runLighthouse(url, name) {
  console.log(`\n  Launching Chrome for ${name}...`);
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const options = {
    logLevel: "info",
    output: "json",
    port: chrome.port,
  };

  try {
    console.log(`  Running Lighthouse on ${url}...`);
    const runnerResult = await lighthouse(url, options, config);

    const { lhr } = runnerResult;

    if (lhr.runtimeError) {
      console.log(`  ❌ Runtime error: ${lhr.runtimeError.message}`);
      return { name, url, error: lhr.runtimeError.message, success: false };
    }

    const categories = lhr.categories ?? {};
    if (
      categories.performance?.score == null ||
      categories.accessibility?.score == null ||
      categories["best-practices"]?.score == null ||
      categories.seo?.score == null
    ) {
      return {
        name,
        url,
        error: "Missing Lighthouse category scores in report",
        success: false,
      };
    }

    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    return { name, url, scores, success: true };
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return { name, url, error: error.message, success: false };
  } finally {
    await chrome.kill();
  }
}

function getScoreEmoji(score) {
  if (score >= 90) return "🟢";
  if (score >= 50) return "🟠";
  return "🔴";
}

async function main() {
  console.log("🚀 Quick Lighthouse Test\n");
  console.log(`Testing ${pages.length} pages at ${baseUrl}\n`);

  let failedCount = 0;

  for (const page of pages) {
    const fullUrl = `${baseUrl}${page.url}`;
    console.log(`📊 Testing: ${page.name} (${page.url})`);

    const result = await runLighthouse(fullUrl, page.name);

    if (result.success) {
      console.log(
        `  ${getScoreEmoji(result.scores.performance)} Performance: ${result.scores.performance}`,
      );
      console.log(
        `  ${getScoreEmoji(result.scores.accessibility)} Accessibility: ${result.scores.accessibility}`,
      );
      console.log(
        `  ${getScoreEmoji(result.scores.bestPractices)} Best Practices: ${result.scores.bestPractices}`,
      );
      console.log(
        `  ${getScoreEmoji(result.scores.seo)} SEO: ${result.scores.seo}`,
      );

      const avgScore = Math.round(
        (result.scores.performance +
          result.scores.accessibility +
          result.scores.bestPractices +
          result.scores.seo) /
          4,
      );
      console.log(`  ⭐ Average: ${avgScore}`);
    } else {
      console.log(`  ❌ Failed: ${result.error}`);
      failedCount++;
    }

    // Wait between tests
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  console.log("\n✅ Quick test complete!\n");

  if (failedCount > 0) {
    console.error(
      `❌ ${failedCount} audit(s) failed. Do not use these results as optimization proof.`,
    );
    process.exitCode = 1;
  }
}

main().catch(console.error);
