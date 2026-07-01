#!/usr/bin/env node

const baseUrl = (
  process.env.DASHBOARD_SMOKE_BASE_URL || "http://localhost:3001"
)
  .trim()
  .replace(/\/$/, "");

const timeoutMs = Number(process.env.DASHBOARD_SMOKE_TIMEOUT_MS || 20000);
const startupTimeoutMs = Number(
  process.env.DASHBOARD_SMOKE_STARTUP_TIMEOUT_MS || 180000,
);
const initialProbeTimeoutMs = Number(
  process.env.DASHBOARD_SMOKE_INITIAL_PROBE_TIMEOUT_MS || 45000,
);
const expectedStatuses = new Set(
  (process.env.DASHBOARD_SMOKE_EXPECTED_STATUSES || "200,301,302,307,308")
    .split(",")
    .map((value) => Number(value.trim()))
    .filter((value) => Number.isFinite(value)),
);
const managedDevEnabled = /^(1|true|yes)$/i.test(
  process.env.DASHBOARD_SMOKE_MANAGED_DEV || "false",
);
const managedDevCommand =
  process.env.DASHBOARD_SMOKE_DEV_COMMAND || "npm run dev";

const routes = [
  "/",
  "/hub",
  "/dashboard",
  "/hub/profile",
  "/hub/profile/review",
];

let managedDevProcess = null;

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

function isReachableStatus(status) {
  return (
    expectedStatuses.has(status) ||
    status === 401 ||
    status === 403 ||
    status === 404
  );
}

async function waitForServerReady() {
  const startedAt = Date.now();

  while (Date.now() - startedAt < startupTimeoutMs) {
    const result = await checkRoute("/");
    if (result.status > 0 && isReachableStatus(result.status)) {
      return;
    }
    await sleep(1000);
  }

  throw new Error(
    `Dashboard dev server did not become reachable within ${startupTimeoutMs}ms`,
  );
}

async function startManagedDevServerIfNeeded() {
  if (!managedDevEnabled || !isLocalBaseUrl()) {
    return;
  }

  const probe = await checkRouteWithTimeout("/", initialProbeTimeoutMs);
  if (probe.status > 0 && isReachableStatus(probe.status)) {
    console.log("Detected existing dashboard server; using current process.");
    return;
  }

  console.log(`Starting managed dashboard dev server: ${managedDevCommand}`);

  managedDevProcess = require("node:child_process").spawn(
    "bash",
    ["-lc", managedDevCommand],
    {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    },
  );

  await waitForServerReady();
}

function stopManagedDevServer() {
  if (!managedDevProcess) {
    return;
  }

  try {
    managedDevProcess.kill("SIGTERM");
  } catch {
    // no-op
  }
  managedDevProcess = null;
}

async function checkRoute(route) {
  return checkRouteWithTimeout(route, timeoutMs);
}

async function checkRouteWithTimeout(route, routeTimeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), routeTimeoutMs);
  const url = `${baseUrl}${route}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "User-Agent": "dashboard-smoke-check/1.0",
      },
    });

    clearTimeout(timeoutId);

    if (!expectedStatuses.has(response.status)) {
      return {
        ok: false,
        route,
        status: response.status,
        location: response.headers.get("location") || "",
      };
    }

    return {
      ok: true,
      route,
      status: response.status,
      location: response.headers.get("location") || "",
    };
  } catch (error) {
    clearTimeout(timeoutId);
    return {
      ok: false,
      route,
      status: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  console.log(`Dashboard smoke base URL: ${baseUrl}`);
  console.log(
    `Expected statuses: ${Array.from(expectedStatuses)
      .sort((a, b) => a - b)
      .join(", ")}`,
  );

  const failures = [];

  await startManagedDevServerIfNeeded();

  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.ok) {
      const suffix = result.location ? ` -> ${result.location}` : "";
      console.log(`PASS ${route} (${result.status})${suffix}`);
    } else {
      if (result.status > 0) {
        console.error(`FAIL ${route} (${result.status})`);
      } else {
        console.error(`FAIL ${route} (${result.error || "unknown error"})`);
      }
      failures.push(result);
    }
    await sleep(80);
  }

  if (failures.length > 0) {
    console.error(
      `\nDashboard smoke check failed with ${failures.length} route issue(s).`,
    );
    process.exit(1);
  }

  console.log("\nDashboard smoke check passed.");
}

void main()
  .catch((error) => {
    console.error(
      `Dashboard smoke check execution failed: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
    process.exitCode = 1;
  })
  .finally(() => {
    stopManagedDevServer();
  });
