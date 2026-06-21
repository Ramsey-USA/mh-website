#!/usr/bin/env node

/**
 * Website route smoke checks.
 *
 * Usage:
 *   npm run smoke:routes
 *
 * Optional env vars:
 *   ROUTE_SMOKE_BASE_URL=http://localhost:3000
 *   ROUTE_SMOKE_TIMEOUT_MS=90000
 *   ROUTE_SMOKE_RETRIES=2
 *   ROUTE_SMOKE_EXPECTED_STATUSES=200,301,302,307,308
 *   ROUTE_SMOKE_MANAGED_DEV=1
 *   ROUTE_SMOKE_DEV_COMMAND="npm run dev"
 *   ROUTE_SMOKE_DEV_STARTUP_TIMEOUT_MS=240000
 *   ROUTE_SMOKE_ROUTE_BACKOFF_MS=100
 *   ROUTE_SMOKE_FAIL_BACKOFF_MS=1000
 *   ROUTE_SMOKE_MAX_RECOVERIES=3
 *   ROUTE_SMOKE_REPORT_FILE=.tmp/route-smoke-report.json
 */

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..", "..");
const APP_DIR = path.join(ROOT, "src", "app");

const baseUrl = (process.env.ROUTE_SMOKE_BASE_URL || "http://localhost:3000")
  .trim()
  .replace(/\/$/, "");

const timeoutMs = Number(process.env.ROUTE_SMOKE_TIMEOUT_MS || 90000);
const retries = Math.max(1, Number(process.env.ROUTE_SMOKE_RETRIES || 2));
const expectedStatuses = new Set(
  (process.env.ROUTE_SMOKE_EXPECTED_STATUSES || "200,301,302,307,308")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value)),
);
const managedDevEnabled = /^(1|true|yes)$/i.test(
  process.env.ROUTE_SMOKE_MANAGED_DEV || "1",
);
const managedDevCommand = process.env.ROUTE_SMOKE_DEV_COMMAND || "npm run dev";
const managedDevStartupTimeoutMs = Number(
  process.env.ROUTE_SMOKE_DEV_STARTUP_TIMEOUT_MS || 240000,
);
const routeBackoffMs = Math.max(
  0,
  Number(process.env.ROUTE_SMOKE_ROUTE_BACKOFF_MS || 100),
);
const failBackoffMs = Math.max(
  0,
  Number(process.env.ROUTE_SMOKE_FAIL_BACKOFF_MS || 1000),
);
const maxRecoveries = Math.max(
  0,
  Number(process.env.ROUTE_SMOKE_MAX_RECOVERIES || 3),
);
const reportFilePath = path.isAbsolute(
  process.env.ROUTE_SMOKE_REPORT_FILE || "",
)
  ? process.env.ROUTE_SMOKE_REPORT_FILE
  : path.join(
      ROOT,
      process.env.ROUTE_SMOKE_REPORT_FILE || ".tmp/route-smoke-report.json",
    );

const DYNAMIC_ROUTE_SAMPLES = {
  "/faq/[category]": [
    "/faq/general",
    "/faq/process",
    "/faq/safety",
    "/faq/technical",
  ],
  "/locations/[city]": [
    "/locations/kennewick",
    "/locations/pasco",
    "/locations/spokane",
  ],
  "/projects/[slug]": [
    "/projects/kennewick-commercial-office-renovation",
    "/projects/pasco-industrial-warehouse-build-out",
    "/projects/richland-corporate-office-tenant-improvement",
  ],
  "/services/[slug]": [
    "/services/commercial-construction",
    "/services/municipal-government",
    "/services/drywall-interiors",
    "/services/restoration-remodeling",
  ],
  "/resources/safety-manual/[cluster]": [
    "/resources/safety-manual/program-foundation",
    "/resources/safety-manual/field-onboarding-and-communication",
    "/resources/safety-manual/tools-and-materials",
    "/resources/safety-manual/program-compliance-and-continuity",
  ],
};

const SKIPPED_DYNAMIC_ROUTES = new Set([
  "/resources/safety-manual/section/[slug]",
  "/safety/print/[id]",
]);

let managedDevProcess = null;
let managedDevLogTail = [];
let recoveryAttempts = 0;
let recoverySuccesses = 0;

function listPageFiles(currentDir, result = []) {
  const entries = fs.readdirSync(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      listPageFiles(fullPath, result);
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      result.push(fullPath);
    }
  }

  return result;
}

function routeFromPageFile(filePath) {
  const relative = path.relative(APP_DIR, filePath).split(path.sep).join("/");

  if (relative === "page.tsx") {
    return "/";
  }

  return `/${relative.replace(/\/page\.tsx$/, "")}`;
}

function isDynamicRoute(route) {
  return route.includes("[") && route.includes("]");
}

function buildRouteList() {
  const pageFiles = listPageFiles(APP_DIR);
  const routes = pageFiles
    .map(routeFromPageFile)
    .sort((left, right) => left.localeCompare(right));

  const finalRoutes = [];
  const skippedDynamic = [];

  for (const route of routes) {
    if (!isDynamicRoute(route)) {
      finalRoutes.push(route);
      continue;
    }

    if (SKIPPED_DYNAMIC_ROUTES.has(route)) {
      skippedDynamic.push(`${route} (intentionally skipped)`);
      continue;
    }

    const samples = DYNAMIC_ROUTE_SAMPLES[route];
    if (!samples || samples.length === 0) {
      skippedDynamic.push(`${route} (no sample mapping)`);
      continue;
    }

    finalRoutes.push(...samples);
  }

  const deduped = Array.from(new Set(finalRoutes));

  if (deduped.includes("/")) {
    deduped.splice(deduped.indexOf("/"), 1);
    deduped.unshift("/");
  }

  return { routes: deduped, skippedDynamic };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatMs(ms) {
  return `${(ms / 1000).toFixed(2)}s`;
}

function formatExpectedStatuses() {
  return Array.from(expectedStatuses)
    .sort((a, b) => a - b)
    .join(", ");
}

function getErrorMessage(error) {
  if (!error || typeof error !== "object") {
    return String(error);
  }

  const message = "message" in error ? String(error.message) : String(error);
  const cause = "cause" in error ? error.cause : null;

  if (cause && typeof cause === "object" && "message" in cause) {
    return `${message}; cause: ${String(cause.message)}`;
  }

  return message;
}

function isLocalBaseUrl() {
  let parsed;
  try {
    parsed = new URL(baseUrl);
  } catch {
    return false;
  }

  return (
    parsed.hostname === "localhost" ||
    parsed.hostname === "127.0.0.1" ||
    parsed.hostname === "::1"
  );
}

function appendManagedLog(chunk) {
  const lines = String(chunk)
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  if (lines.length === 0) {
    return;
  }

  managedDevLogTail.push(...lines);
  if (managedDevLogTail.length > 120) {
    managedDevLogTail = managedDevLogTail.slice(-120);
  }
}

function writeReport(report) {
  const outputPath = reportFilePath;
  const outputDir = path.dirname(outputPath);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  return outputPath;
}

function startManagedDevServer() {
  if (managedDevProcess) {
    return;
  }

  console.log(`Starting managed dev server: ${managedDevCommand}`);

  const proc = spawn("bash", ["-lc", managedDevCommand], {
    cwd: ROOT,
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  proc.stdout.on("data", appendManagedLog);
  proc.stderr.on("data", appendManagedLog);
  managedDevProcess = proc;
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

async function assertBaseUrlReachable() {
  const preflightTimeoutMs = Math.max(30000, Math.min(timeoutMs, 120000));
  const maxAttempts = 2;
  let lastDetails = "unknown error";

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), preflightTimeoutMs);

    try {
      const response = await fetch(baseUrl, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
        },
      });

      clearTimeout(timeout);

      if (!Number.isFinite(response.status) || response.status <= 0) {
        throw new Error(`unexpected preflight status: ${response.status}`);
      }

      return;
    } catch (error) {
      clearTimeout(timeout);
      lastDetails = getErrorMessage(error);
      if (attempt < maxAttempts) {
        await sleep(1000);
      }
    }
  }

  throw new Error(
    `Cannot reach ${baseUrl}. Start the website dev server first (for example: npm run dev). Details: ${lastDetails}`,
  );
}

async function waitForBaseUrlReachable(maxWaitMs) {
  const startedAt = Date.now();
  let lastError = "unknown error";

  while (Date.now() - startedAt < maxWaitMs) {
    try {
      await assertBaseUrlReachable();
      return;
    } catch (error) {
      lastError = getErrorMessage(error);

      if (managedDevProcess && managedDevProcess.exitCode !== null) {
        const tail = managedDevLogTail.slice(-20).join("\n");
        throw new Error(
          `Managed dev server exited early with code ${managedDevProcess.exitCode}.${tail ? `\n${tail}` : ""}`,
        );
      }

      await sleep(1000);
    }
  }

  const tail = managedDevLogTail.slice(-20).join("\n");
  throw new Error(
    `Timed out waiting for ${baseUrl} after ${formatMs(maxWaitMs)}. Last error: ${lastError}${tail ? `\n${tail}` : ""}`,
  );
}

async function isBaseUrlReachableQuick(timeout = 4000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timer);
    return Number.isFinite(response.status) && response.status > 0;
  } catch {
    clearTimeout(timer);
    return false;
  }
}

async function recoverServerIfNeeded(reason) {
  if (!managedDevEnabled || !isLocalBaseUrl()) {
    return false;
  }

  const healthy = await isBaseUrlReachableQuick();
  if (healthy) {
    return false;
  }

  if (recoveryAttempts >= maxRecoveries) {
    console.log(
      `Recovery skipped for ${reason}: max recoveries (${maxRecoveries}) reached.`,
    );
    return false;
  }

  recoveryAttempts += 1;
  console.log(
    `Recovering dev server (${recoveryAttempts}/${maxRecoveries}) due to ${reason}...`,
  );

  await stopManagedDevServer();
  startManagedDevServer();
  await waitForBaseUrlReachable(managedDevStartupTimeoutMs);

  recoverySuccesses += 1;
  console.log("Recovery complete: dev server reachable again.");
  return true;
}

async function checkRoute(route) {
  const url = `${baseUrl}${route}`;
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const startedAt = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
        },
      });

      const elapsedMs = Date.now() - startedAt;
      clearTimeout(timeout);

      if (expectedStatuses.has(response.status)) {
        return {
          ok: true,
          route,
          url,
          finalUrl: response.url,
          status: response.status,
          elapsedMs,
          attempt,
          error: null,
        };
      }

      lastError = {
        kind: "status",
        message: `unexpected status ${response.status}`,
      };
    } catch (error) {
      const elapsedMs = Date.now() - startedAt;
      const message = getErrorMessage(error);

      lastError = {
        kind: "request",
        message: `request failed after ${formatMs(elapsedMs)} (${message})`,
      };
    } finally {
      clearTimeout(timeout);
    }

    if (attempt < retries) {
      await sleep(500);
    }
  }

  return {
    ok: false,
    route,
    url,
    finalUrl: url,
    status: 0,
    elapsedMs: timeoutMs,
    attempt: retries,
    error: lastError,
  };
}

async function main() {
  const startedAt = new Date().toISOString();

  if (typeof fetch !== "function") {
    throw new Error("Global fetch is unavailable. Use Node.js 18+.");
  }

  const { routes, skippedDynamic } = buildRouteList();

  console.log(`Route smoke test target: ${baseUrl}`);
  console.log(`Routes to test: ${routes.length}`);
  console.log(`Retries per route: ${retries}`);
  console.log(`Timeout per request: ${timeoutMs}ms`);
  console.log(`Accepted statuses: ${formatExpectedStatuses()}`);
  console.log(`JSON report: ${reportFilePath}`);

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

  if (skippedDynamic.length > 0) {
    console.log("Skipped dynamic routes:");
    for (const skipped of skippedDynamic) {
      console.log(`- ${skipped}`);
    }
  }

  const results = [];
  for (const route of routes) {
    // Sequential checks are easier on local dev servers during first compile.
    // This reduces false negatives from startup load spikes.
    // eslint-disable-next-line no-await-in-loop
    let result = await checkRoute(route);

    if (!result.ok && result.error?.kind === "request") {
      if (failBackoffMs > 0) {
        await sleep(failBackoffMs);
      }

      const recovered = await recoverServerIfNeeded(route);
      if (recovered) {
        result = await checkRoute(route);
      }
    }

    results.push(result);

    if (result.ok) {
      console.log(
        `PASS ${route} -> ${result.status} (${formatMs(result.elapsedMs)})`,
      );
    } else {
      console.log(
        `FAIL ${route} -> ${result.error ? result.error.message : "unknown error"}`,
      );
    }

    if (routeBackoffMs > 0) {
      await sleep(routeBackoffMs);
    }
  }

  const passed = results.filter((result) => result.ok);
  const failed = results.filter((result) => !result.ok);

  console.log("\nRoute smoke summary:");
  console.log(`- Passed: ${passed.length}`);
  console.log(`- Failed: ${failed.length}`);
  console.log(`- Recovery attempts: ${recoveryAttempts}`);
  console.log(`- Recovery successes: ${recoverySuccesses}`);

  const report = {
    startedAt,
    finishedAt: new Date().toISOString(),
    baseUrl,
    config: {
      timeoutMs,
      retries,
      expectedStatuses: Array.from(expectedStatuses).sort((a, b) => a - b),
      managedDevEnabled,
      managedDevCommand,
      managedDevStartupTimeoutMs,
      routeBackoffMs,
      failBackoffMs,
      maxRecoveries,
      reportFilePath,
    },
    totals: {
      routes: routes.length,
      passed: passed.length,
      failed: failed.length,
      recoveryAttempts,
      recoverySuccesses,
      skippedDynamicCount: skippedDynamic.length,
    },
    skippedDynamic,
    failures: failed.map((failure) => ({
      route: failure.route,
      message: failure.error ? failure.error.message : "unknown",
    })),
    results,
  };

  const writtenPath = writeReport(report);
  console.log(`Report written: ${writtenPath}`);

  if (failed.length > 0) {
    console.log("\nFailures:");
    for (const failure of failed) {
      const details = failure.error ? failure.error.message : "unknown";
      console.log(`- ${failure.route}: ${details}`);
    }
    throw new Error(`Route smoke check failed for ${failed.length} routes.`);
  }

  console.log("All route checks passed.");
}

main()
  .catch((error) => {
    const message = getErrorMessage(error);
    console.error(`Route smoke runner failed: ${message}`);

    try {
      const writtenPath = writeReport({
        startedAt: null,
        finishedAt: new Date().toISOString(),
        baseUrl,
        status: "error",
        error: message,
        config: {
          timeoutMs,
          retries,
          managedDevEnabled,
          managedDevCommand,
          managedDevStartupTimeoutMs,
          routeBackoffMs,
          failBackoffMs,
          maxRecoveries,
          reportFilePath,
        },
        totals: {
          recoveryAttempts,
          recoverySuccesses,
        },
      });
      console.error(`Report written: ${writtenPath}`);
    } catch (reportError) {
      console.error(`Failed to write report: ${getErrorMessage(reportError)}`);
    }

    process.exitCode = 1;
  })
  .finally(async () => {
    await stopManagedDevServer();
  });
