#!/usr/bin/env node

/**
 * Lighthouse Test Runner for All Pages
 * Tests each page's performance, accessibility, best practices, SEO, and PWA scores
 */

const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const fs = require("fs");
const path = require("path");

// Define all pages to test
const pages = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Services", url: "/services" },
  { name: "Projects", url: "/projects" },
  { name: "Team", url: "/team" },
  { name: "Careers", url: "/careers" },
  { name: "Contact", url: "/contact" },
  { name: "FAQ", url: "/faq" },
  { name: "Privacy", url: "/privacy" },
  { name: "Terms", url: "/terms" },
  { name: "Accessibility", url: "/accessibility" },
  { name: "Testimonials", url: "/testimonials" },
  { name: "Veterans", url: "/veterans" },
  { name: "Public Sector", url: "/public-sector" },
  { name: "Allies", url: "/allies" },
  // Location pages
  { name: "Pasco", url: "/locations/pasco" },
  { name: "Richland", url: "/locations/richland" },
  { name: "Kennewick", url: "/locations/kennewick" },
  { name: "West Richland", url: "/locations/west-richland" },
  { name: "Yakima", url: "/locations/yakima" },
  { name: "Walla Walla", url: "/locations/walla-walla" },
  { name: "Spokane", url: "/locations/spokane" },
];

const baseUrl = "http://localhost:3000";
const resultsDir = path.join(__dirname, "../lighthouse-results");

// Ensure results directory exists
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Lighthouse configuration
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
  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-software-rasterizer",
    ],
  });
  const options = {
    logLevel: "error",
    output: "json",
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(url, options, config);
    const { lhr } = runnerResult;

    if (lhr.runtimeError) {
      return {
        name,
        url,
        error: `${lhr.runtimeError.code}: ${lhr.runtimeError.message}`,
        success: false,
      };
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

    // Extract scores
    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    // Save detailed report
    const reportPath = path.join(
      resultsDir,
      `${name.toLowerCase().replace(/\s+/g, "-")}.json`,
    );
    fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));

    return { name, url, scores, success: true };
  } catch (error) {
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
  console.log("🚀 Starting Lighthouse tests for all pages...\n");
  console.log(`Testing ${pages.length} pages at ${baseUrl}\n`);
  console.log("═".repeat(100));

  const results = [];
  let totalTests = 0;
  let passedTests = 0;

  for (const page of pages) {
    const fullUrl = `${baseUrl}${page.url}`;
    console.log(`\n📊 Testing: ${page.name} (${page.url})`);

    const result = await runLighthouse(fullUrl, page.name);
    results.push(result);
    totalTests++;

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

      if (avgScore >= 80) passedTests++;
    } else {
      console.log(`  ❌ Error: ${result.error}`);
    }

    // Add delay between tests to avoid overloading
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("\n" + "═".repeat(100));
  console.log("\n📈 SUMMARY REPORT\n");

  // Create summary table
  console.log(
    "┌─────────────────────────┬──────┬─────────────┬──────────┬───────┐",
  );
  console.log(
    "│ Page                    │ Perf │ Accessibility│ Best Pr. │  SEO  │",
  );
  console.log(
    "├─────────────────────────┼──────┼─────────────┼──────────┼───────┤",
  );

  for (const result of results) {
    if (result.success) {
      const name = result.name.padEnd(23);
      const perf =
        `${getScoreEmoji(result.scores.performance)} ${String(result.scores.performance).padStart(2)}`.padEnd(
          4,
        );
      const a11y =
        `${getScoreEmoji(result.scores.accessibility)} ${String(result.scores.accessibility).padStart(2)}`.padEnd(
          11,
        );
      const bp =
        `${getScoreEmoji(result.scores.bestPractices)} ${String(result.scores.bestPractices).padStart(2)}`.padEnd(
          8,
        );
      const seo =
        `${getScoreEmoji(result.scores.seo)} ${String(result.scores.seo).padStart(2)}`.padEnd(
          5,
        );

      console.log(`│ ${name} │ ${perf} │ ${a11y} │ ${bp} │ ${seo} │`);
    } else {
      const name = result.name.padEnd(23);
      console.log(
        `│ ${name} │ ❌ ERROR                                      │`,
      );
    }
  }

  console.log(
    "└─────────────────────────┴──────┴─────────────┴──────────┴───────┘",
  );

  // Calculate averages
  const successfulResults = results.filter((r) => r.success);
  if (successfulResults.length > 0) {
    const avgPerf = Math.round(
      successfulResults.reduce((sum, r) => sum + r.scores.performance, 0) /
        successfulResults.length,
    );
    const avgA11y = Math.round(
      successfulResults.reduce((sum, r) => sum + r.scores.accessibility, 0) /
        successfulResults.length,
    );
    const avgBp = Math.round(
      successfulResults.reduce((sum, r) => sum + r.scores.bestPractices, 0) /
        successfulResults.length,
    );
    const avgSeo = Math.round(
      successfulResults.reduce((sum, r) => sum + r.scores.seo, 0) /
        successfulResults.length,
    );

    console.log("\n📊 Average Scores Across All Pages:");
    console.log(`  Performance: ${avgPerf}`);
    console.log(`  Accessibility: ${avgA11y}`);
    console.log(`  Best Practices: ${avgBp}`);
    console.log(`  SEO: ${avgSeo}`);
    console.log(
      `  Overall Average: ${Math.round((avgPerf + avgA11y + avgBp + avgSeo) / 4)}`,
    );
  }

  const failedResults = results.filter((r) => !r.success);
  const successfulCount = totalTests - failedResults.length;

  console.log(
    `\n✅ Completed: ${successfulCount}/${totalTests} successful audits`,
  );
  console.log(`❌ Failed audits: ${failedResults.length}`);
  console.log(`⭐ Pages with 80+ average score: ${passedTests}/${totalTests}`);
  console.log(`📁 Detailed reports saved to: ${resultsDir}`);

  // Save summary to file
  const summaryPath = path.join(resultsDir, "summary.json");
  const summaryPayload = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    totalPages: totalTests,
    successfulAudits: successfulCount,
    failedAudits: failedResults.length,
    results,
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summaryPayload, null, 2));
  console.log(`📄 Summary saved to: ${summaryPath}\n`);

  if (failedResults.length > 0) {
    console.error(
      "❌ Lighthouse completed with failed audits. Fix failures before trusting summary metrics.",
    );
    process.exitCode = 1;
  }
}

main().catch(console.error);
