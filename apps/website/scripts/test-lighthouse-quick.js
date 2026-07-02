#!/usr/bin/env node

/**
 * Quick Lighthouse Test - Tests a few key pages
 */

const { default: lighthouse } = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { getChromePath } = require("./utilities/get-chrome-path");

// Test just a few key pages
const pages = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Projects", url: "/projects" },
];

const args = process.argv.slice(2);
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const outputFileFlagIndex = args.findIndex((arg) => arg === "--output");
const outputFile =
  outputFileFlagIndex >= 0 ? args[outputFileFlagIndex + 1] : null;
const auditTimeoutMs = Number(process.env.LH_AUDIT_TIMEOUT_MS || 120000);
const transientFailurePatterns = [
  /TARGET_CRASHED/i,
  /unexpectedly crashed/i,
  /chrome[- ]error/i,
  /execution context was destroyed/i,
  /navigating frame was detached/i,
  /ERR_CONNECTION_RESET/i,
  /ERR_CONNECTION_REFUSED/i,
  /Network\.getResponseBody/i,
  /Debugger\.getScriptSource/i,
  /No resource with given identifier found/i,
  /Missing Lighthouse category scores/i,
  /interstitial/i,
];
const lighthouseAuditKey = process.env.LIGHTHOUSE_AUDIT_KEY || "";
const emulatedUserAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Chrome-Lighthouse";

function withAuditQuery(url) {
  const parsed = new URL(url);
  parsed.searchParams.set("__lh", "1");
  return parsed.toString();
}

const config = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    formFactor: "desktop",
    emulatedUserAgent,
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
  const chromePath = getChromePath();
  if (!chromePath) {
    return {
      name,
      url,
      error:
        "No Chrome/Chromium executable found. Install a browser or set CHROME_PATH.",
      success: false,
    };
  }

  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: [
      "--headless",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      `--user-agent=${emulatedUserAgent}`,
    ],
  });

  const options = {
    logLevel: "error",
    output: "json",
    port: chrome.port,
    ...(lighthouseAuditKey
      ? { extraHeaders: { "x-mh-lighthouse-key": lighthouseAuditKey } }
      : {}),
  };

  try {
    console.log(`  Running Lighthouse on ${url}...`);
    const timeoutToken = Symbol("lh-timeout");
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(timeoutToken), auditTimeoutMs);
    });

    const lighthousePromise = lighthouse(url, options, config).catch(
      (error) => ({ __lighthouseError: error }),
    );

    const runnerResult = await Promise.race([
      lighthousePromise,
      timeoutPromise,
    ]);

    if (runnerResult === timeoutToken) {
      return {
        name,
        url,
        error: `Lighthouse timed out after ${auditTimeoutMs}ms`,
        success: false,
      };
    }

    if (runnerResult && runnerResult.__lighthouseError) {
      return {
        name,
        url,
        error: runnerResult.__lighthouseError.message,
        success: false,
      };
    }

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
      const warningDetails = Array.isArray(lhr.runWarnings)
        ? lhr.runWarnings.join(" | ")
        : "";
      return {
        name,
        url,
        error: warningDetails
          ? `Missing Lighthouse category scores in report (${warningDetails})`
          : "Missing Lighthouse category scores in report",
        success: false,
      };
    }

    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories["best-practices"].score * 100),
      seo: Math.round(categories.seo.score * 100),
    };

    const allZero =
      scores.performance === 0 &&
      scores.accessibility === 0 &&
      scores.bestPractices === 0 &&
      scores.seo === 0;
    if (allZero) {
      return {
        name,
        url,
        error:
          "Invalid Lighthouse report: all category scores are 0 (likely headless/runtime failure)",
        success: false,
      };
    }

    return { name, url, scores, success: true };
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return { name, url, error: error.message, success: false };
  } finally {
    await chrome.kill();
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientFailure(message) {
  return transientFailurePatterns.some((pattern) => pattern.test(message));
}

function warmUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "user-agent": emulatedUserAgent,
          ...(lighthouseAuditKey
            ? { "x-mh-lighthouse-key": lighthouseAuditKey }
            : {}),
        },
      },
      (res) => {
        res.resume();

        if (res.statusCode && res.statusCode >= 400) {
          reject(
            new Error(`Warmup request failed with status ${res.statusCode}`),
          );
          return;
        }

        res.on("end", resolve);
      },
    );

    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy(new Error("Warmup request timed out"));
    });
  });
}

async function runAuditWithWarmup(url, name) {
  console.log(`  Warming ${url}...`);

  try {
    await warmUrl(url);
    await delay(1500);
  } catch (error) {
    console.log(`  Warmup warning: ${error.message}`);
  }

  let result = await runLighthouse(url, name);
  if (result.success || !result.error || !isTransientFailure(result.error)) {
    return result;
  }

  console.log("  Retrying after transient Lighthouse failure...");
  await delay(3000);

  try {
    await warmUrl(url);
    await delay(1500);
  } catch (error) {
    console.log(`  Warmup warning: ${error.message}`);
  }

  result = await runLighthouse(url, name);
  if (!result.success && result.error) {
    result.error = `${result.error} (after retry)`;
  }

  return result;
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
  const results = [];

  for (const page of pages) {
    const fullUrl = withAuditQuery(`${baseUrl}${page.url}`);
    console.log(`📊 Testing: ${page.name} (${page.url})`);

    const result = await runAuditWithWarmup(fullUrl, page.name);
    results.push(result);

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
    await delay(3000);
  }

  console.log("\n✅ Quick test complete!\n");

  if (outputFile) {
    const outputPath = path.resolve(process.cwd(), outputFile);
    const payload = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      totalPages: pages.length,
      failedAudits: failedCount,
      results,
    };
    fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
    console.log(`📄 Quick summary saved to: ${outputPath}`);
  }

  if (failedCount > 0) {
    console.error(
      `❌ ${failedCount} audit(s) failed. Do not use these results as optimization proof.`,
    );
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
