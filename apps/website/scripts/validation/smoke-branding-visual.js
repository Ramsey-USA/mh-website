#!/usr/bin/env node

/**
 * Branding visual smoke test (baseline + compare).
 *
 * Usage:
 *   npm run smoke:branding:visual:baseline
 *   npm run smoke:branding:visual
 *
 * Optional env vars:
 *   VISUAL_SMOKE_BASE_URL=http://localhost:3000
 *   VISUAL_SMOKE_MODE=baseline|compare
 *   VISUAL_SMOKE_THRESHOLD_PERCENT=0.30
 *   VISUAL_SMOKE_FULLPAGE=1
 *   VISUAL_SMOKE_TIMEOUT_MS=120000
 *   VISUAL_SMOKE_PROTOCOL_TIMEOUT_MS=240000
 *   VISUAL_SMOKE_ROUTE_RETRIES=2
 *   VISUAL_SMOKE_ROUTES=/,/about
 *   VISUAL_SMOKE_AUTO_BASELINE=1
 *   VISUAL_SMOKE_MANAGED_DEV=1
 *   VISUAL_SMOKE_DEV_COMMAND="npm run dev"
 *   VISUAL_SMOKE_DEV_STARTUP_TIMEOUT_MS=240000
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { PNG } = require("pngjs");
const puppeteer = require("puppeteer");

const ROOT = path.resolve(__dirname, "..", "..");
const baseUrl = (process.env.VISUAL_SMOKE_BASE_URL || "http://localhost:3000")
  .trim()
  .replace(/\/$/, "");
const mode = (process.env.VISUAL_SMOKE_MODE || "compare").trim();
const thresholdPercent = Number(
  process.env.VISUAL_SMOKE_THRESHOLD_PERCENT || 0.3,
);
const timeoutMs = Number(process.env.VISUAL_SMOKE_TIMEOUT_MS || 120000);
const routeRetries = Math.max(
  1,
  Number(process.env.VISUAL_SMOKE_ROUTE_RETRIES || 2),
);
const autoBaseline = !/^(0|false|no)$/i.test(
  (process.env.VISUAL_SMOKE_AUTO_BASELINE || "1").trim(),
);
const protocolTimeoutMs = Number(
  process.env.VISUAL_SMOKE_PROTOCOL_TIMEOUT_MS || 240000,
);
const fullPage = !/^(0|false|no)$/i.test(
  process.env.VISUAL_SMOKE_FULLPAGE || "0",
);
const managedDevEnabled = !/^(0|false|no)$/i.test(
  (
    process.env.VISUAL_SMOKE_MANAGED_DEV ??
    process.env.VISUAL_SMOKE_MANAGED_SERVER ??
    "1"
  ).trim(),
);
const managedDevCommand = process.env.VISUAL_SMOKE_DEV_COMMAND || "npm run dev";
const managedDevStartupTimeoutMs = Number(
  process.env.VISUAL_SMOKE_DEV_STARTUP_TIMEOUT_MS || 240000,
);

const ARTIFACT_ROOT = path.join(ROOT, ".tmp", "branding-visual-smoke");

function getProfileKey() {
  let hostLabel = "unknown-host";
  try {
    const parsed = new URL(baseUrl);
    hostLabel = `${parsed.hostname}-${parsed.port || "default"}`;
  } catch {
    hostLabel = "invalid-base-url";
  }

  const modeLabel = managedDevEnabled ? "managed-dev" : "external-server";
  return `${hostLabel}--${modeLabel}`.replace(/[^a-zA-Z0-9._-]/g, "_");
}

const ARTIFACT_PROFILE_DIR = path.join(ARTIFACT_ROOT, getProfileKey());
const BASELINE_DIR = path.join(ARTIFACT_PROFILE_DIR, "baseline");
const CURRENT_DIR = path.join(ARTIFACT_PROFILE_DIR, "current");
const DIFF_DIR = path.join(ARTIFACT_PROFILE_DIR, "diff");
const REPORT_FILE = path.join(ARTIFACT_PROFILE_DIR, "report.json");
const LATEST_REPORT_FILE = path.join(ARTIFACT_ROOT, "report.json");

const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/projects",
  "/public-sector",
  "/veterans",
  "/allies",
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 2200 },
  { name: "mobile", width: 390, height: 844 },
];

const configuredRoutes = (() => {
  const raw = (process.env.VISUAL_SMOKE_ROUTES || "").trim();
  if (!raw) {
    return ROUTES;
  }

  const normalized = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => (entry.startsWith("/") ? entry : `/${entry}`));

  if (normalized.length === 0) {
    return ROUTES;
  }

  return ROUTES.filter((route) => normalized.includes(route));
})();

let managedDevProcess = null;

function sanitizeRoute(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isLocalBaseUrl() {
  try {
    const parsed = new URL(baseUrl);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1"
    );
  } catch {
    return false;
  }
}

function startManagedDevServer() {
  if (managedDevProcess) {
    return;
  }

  console.log(`Starting managed dev server: ${managedDevCommand}`);
  managedDevProcess = spawn("bash", ["-lc", managedDevCommand], {
    cwd: ROOT,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function stopManagedDevServer() {
  if (!managedDevProcess) {
    return;
  }

  const proc = managedDevProcess;
  managedDevProcess = null;

  await new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };

    proc.once("exit", finish);
    proc.kill("SIGTERM");

    setTimeout(() => {
      proc.kill("SIGKILL");
      finish();
    }, 5000);
  });
}

function fileFor(dirPath, route, viewportName) {
  return path.join(dirPath, `${sanitizeRoute(route)}--${viewportName}.png`);
}

async function waitForIdle(page) {
  await page.waitForFunction(
    () =>
      document.fonts?.status === "loaded" || document.readyState === "complete",
    { timeout: Math.min(15000, timeoutMs) },
  );
}

async function captureScreenshot(page, route, viewport, outputPath) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  page.setDefaultNavigationTimeout(timeoutMs);
  page.setDefaultTimeout(timeoutMs);
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  );
  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9",
  });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
    { name: "prefers-color-scheme", value: "light" },
  ]);
  await page.goto(`${baseUrl}${route}`, {
    // In Next.js dev, networkidle can stall due to HMR/websocket activity.
    waitUntil: "domcontentloaded",
    timeout: timeoutMs,
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      html { scroll-behavior: auto !important; }

      /* Hide framework/dev overlays that are not part of page branding */
      nextjs-portal,
      [data-nextjs-dialog-overlay],
      [data-nextjs-dialog],
      [data-nextjs-toast],
      [data-nextjs-dev-tools-button],
      [data-nextjs-dev-overlay-root],
      [id^="nextjs"],
      [class*="nextjs"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `,
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(120);
  await waitForIdle(page);

  await page.screenshot({
    path: outputPath,
    fullPage,
    type: "png",
    captureBeyondViewport: true,
  });
}

async function captureScreenshotWithRetry(page, route, viewport, outputPath) {
  let lastError = null;

  for (let attempt = 1; attempt <= routeRetries; attempt += 1) {
    try {
      await captureScreenshot(page, route, viewport, outputPath);
      return;
    } catch (error) {
      lastError = error;
      if (attempt < routeRetries) {
        await sleep(1200);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error(String(lastError || "unknown screenshot capture error"));
}

function compareImages(baselinePath, currentPath, diffPath) {
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(fs.readFileSync(currentPath));

  if (baseline.width !== current.width || baseline.height !== current.height) {
    return {
      ok: false,
      reason: `dimension mismatch baseline=${baseline.width}x${baseline.height} current=${current.width}x${current.height}`,
      changedPixels: Number.POSITIVE_INFINITY,
      diffPercent: 100,
    };
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  let changedPixels = 0;
  const tolerance = 26;

  for (let y = 0; y < baseline.height; y += 1) {
    for (let x = 0; x < baseline.width; x += 1) {
      const idx = (baseline.width * y + x) << 2;
      const rA = baseline.data[idx];
      const gA = baseline.data[idx + 1];
      const bA = baseline.data[idx + 2];
      const aA = baseline.data[idx + 3];

      const rB = current.data[idx];
      const gB = current.data[idx + 1];
      const bB = current.data[idx + 2];
      const aB = current.data[idx + 3];

      const dr = Math.abs(rA - rB);
      const dg = Math.abs(gA - gB);
      const db = Math.abs(bA - bB);
      const da = Math.abs(aA - aB);
      const delta = dr + dg + db + da;

      if (delta > tolerance) {
        changedPixels += 1;
        diff.data[idx] = 255;
        diff.data[idx + 1] = 0;
        diff.data[idx + 2] = 0;
        diff.data[idx + 3] = 180;
      } else {
        diff.data[idx] = Math.floor((rB + rA) / 2);
        diff.data[idx + 1] = Math.floor((gB + gA) / 2);
        diff.data[idx + 2] = Math.floor((bB + bA) / 2);
        diff.data[idx + 3] = 120;
      }
    }
  }

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = baseline.width * baseline.height;
  const diffPercent = (changedPixels / totalPixels) * 100;

  return {
    ok: diffPercent <= thresholdPercent,
    reason:
      diffPercent <= thresholdPercent
        ? "within-threshold"
        : `diff ${diffPercent.toFixed(3)}% exceeds threshold ${thresholdPercent}%`,
    changedPixels,
    diffPercent,
  };
}

async function assertBaseUrlReachable() {
  const response = await fetch(baseUrl, {
    method: "GET",
    redirect: "follow",
  });

  if (response.status < 100 || response.status > 599) {
    throw new Error(
      `Base URL not reachable: ${baseUrl} (status ${response.status})`,
    );
  }
}

async function waitForBaseUrlReachable(maxWaitMs) {
  const startedAt = Date.now();
  let lastError = "unknown error";

  while (Date.now() - startedAt < maxWaitMs) {
    try {
      await assertBaseUrlReachable();
      return;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      await sleep(1000);
    }
  }

  throw new Error(
    `Timed out waiting for ${baseUrl} after ${Math.round(maxWaitMs / 1000)}s. Last error: ${lastError}`,
  );
}

async function main() {
  if (!globalThis.fetch) {
    throw new Error("Global fetch is unavailable. Use Node.js 18+.");
  }

  if (!["baseline", "compare"].includes(mode)) {
    throw new Error(`Invalid VISUAL_SMOKE_MODE: ${mode}`);
  }

  ensureDir(ARTIFACT_ROOT);
  ensureDir(BASELINE_DIR);
  ensureDir(CURRENT_DIR);
  ensureDir(DIFF_DIR);

  try {
    await assertBaseUrlReachable();
  } catch (error) {
    if (!managedDevEnabled || !isLocalBaseUrl()) {
      throw error;
    }

    startManagedDevServer();
    await waitForBaseUrlReachable(managedDevStartupTimeoutMs);
    console.log("Managed dev server is reachable.");
  }

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: protocolTimeoutMs,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const report = {
    mode,
    baseUrl,
    artifactProfile: path.basename(ARTIFACT_PROFILE_DIR),
    autoBaseline,
    routes: configuredRoutes,
    thresholdPercent,
    fullPage,
    startedAt: new Date().toISOString(),
    checks: [],
    failures: [],
  };

  try {
    for (const route of configuredRoutes) {
      for (const viewport of VIEWPORTS) {
        const page = await browser.newPage();
        const baselinePath = fileFor(BASELINE_DIR, route, viewport.name);
        const currentPath = fileFor(CURRENT_DIR, route, viewport.name);
        const diffPath = fileFor(DIFF_DIR, route, viewport.name);

        try {
          await captureScreenshotWithRetry(page, route, viewport, currentPath);
        } finally {
          await page.close();
        }

        if (mode === "baseline") {
          fs.copyFileSync(currentPath, baselinePath);
          report.checks.push({
            route,
            viewport: viewport.name,
            status: "baseline-updated",
            baselinePath,
          });
          console.log(`BASELINE ${route} [${viewport.name}]`);
          continue;
        }

        if (!fs.existsSync(baselinePath)) {
          if (autoBaseline) {
            fs.copyFileSync(currentPath, baselinePath);
            report.checks.push({
              route,
              viewport: viewport.name,
              status: "baseline-created",
              reason: "missing baseline auto-created",
              baselinePath,
            });
            console.log(
              `BASELINE-CREATED ${route} [${viewport.name}] (missing baseline)`,
            );
            continue;
          }

          report.failures.push({
            route,
            viewport: viewport.name,
            reason: "missing baseline",
            baselinePath,
          });
          report.checks.push({
            route,
            viewport: viewport.name,
            status: "failed",
            reason: "missing baseline",
          });
          console.log(`FAIL ${route} [${viewport.name}] missing baseline`);
          continue;
        }

        const result = compareImages(baselinePath, currentPath, diffPath);
        report.checks.push({
          route,
          viewport: viewport.name,
          status: result.ok ? "passed" : "failed",
          reason: result.reason,
          diffPercent: Number.isFinite(result.diffPercent)
            ? Number(result.diffPercent.toFixed(4))
            : result.diffPercent,
          changedPixels: result.changedPixels,
          baselinePath,
          currentPath,
          diffPath,
        });

        if (!result.ok) {
          report.failures.push({
            route,
            viewport: viewport.name,
            reason: result.reason,
            diffPercent: result.diffPercent,
            changedPixels: result.changedPixels,
            diffPath,
          });
          console.log(`FAIL ${route} [${viewport.name}] ${result.reason}`);
        } else {
          console.log(
            `PASS ${route} [${viewport.name}] diff=${result.diffPercent.toFixed(4)}%`,
          );
        }
      }
    }
  } finally {
    await browser.close();
  }

  report.finishedAt = new Date().toISOString();
  report.totalChecks = report.checks.length;
  report.failedChecks = report.failures.length;

  const reportBody = `${JSON.stringify(report, null, 2)}\n`;
  fs.writeFileSync(REPORT_FILE, reportBody, "utf8");
  fs.writeFileSync(LATEST_REPORT_FILE, reportBody, "utf8");
  console.log(`Report written: ${REPORT_FILE}`);

  if (mode === "compare" && report.failures.length > 0) {
    throw new Error(
      `Branding visual smoke failed for ${report.failures.length} checks.`,
    );
  }

  console.log(
    mode === "baseline"
      ? "Branding visual smoke baseline updated."
      : "Branding visual smoke compare passed.",
  );
}

main()
  .catch((error) => {
    console.error(`Branding visual smoke runner failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await stopManagedDevServer();
  });
