#!/usr/bin/env node

/**
 * Utility route smoke runner.
 *
 * Validates key public route behavior:
 * - /sitemap returns HTML sitemap page
 * - /sitemap.xml returns XML
 * - /qr-codes returns 200
 * - unknown locale path returns 404
 * - unknown slug path returns 404
 *
 * Usage:
 *   npm run smoke:utility-routes
 */

const { spawn } = require("node:child_process");
const process = require("node:process");

const appRoot = process.cwd();
const baseUrl = (
  process.env.ROUTE_UTILITY_SMOKE_BASE_URL || "http://localhost:3000"
)
  .trim()
  .replace(/\/$/, "");
const readyTimeoutMs = Number(
  process.env.ROUTE_UTILITY_SMOKE_READY_TIMEOUT_MS || 120000,
);
const devCommand = process.env.ROUTE_UTILITY_SMOKE_DEV_COMMAND || "npm run dev";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function canReachBaseUrl() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      signal: controller.signal,
      redirect: "manual",
    });
    return res.status >= 200 && res.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function startDevServer() {
  const child = spawn("bash", ["-lc", devCommand], {
    cwd: appRoot,
    env: process.env,
    stdio: "ignore",
    detached: true,
  });

  child.unref();
  return child;
}

function stopDevServer(child) {
  if (!child?.pid) return;

  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    return;
  }

  setTimeout(() => {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      // already stopped
    }
  }, 2000);
}

async function waitForServerReady(timeoutMs) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (await canReachBaseUrl()) {
      return true;
    }
    await sleep(1000);
  }

  return false;
}

async function request(pathname, init = {}) {
  return fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    ...init,
  });
}

function expectStatus(actual, expected, label) {
  if (actual !== expected) {
    fail(`${label}: expected status ${expected}, received ${actual}`);
  }
}

function expectContentTypeContains(actualType, expectedFragment, label) {
  if (!actualType.toLowerCase().includes(expectedFragment.toLowerCase())) {
    fail(
      `${label}: expected content-type containing "${expectedFragment}", got "${actualType}"`,
    );
  }
}

async function runChecks() {
  const sitemapPage = await request("/sitemap");
  expectStatus(sitemapPage.status, 200, "/sitemap");
  expectContentTypeContains(
    sitemapPage.headers.get("content-type") || "",
    "text/html",
    "/sitemap",
  );

  const sitemapXml = await request("/sitemap.xml");
  expectStatus(sitemapXml.status, 200, "/sitemap.xml");
  expectContentTypeContains(
    sitemapXml.headers.get("content-type") || "",
    "xml",
    "/sitemap.xml",
  );

  const qrCodes = await request("/qr-codes");
  expectStatus(qrCodes.status, 200, "/qr-codes");

  const unknownLocale = await request("/fr/services");
  expectStatus(unknownLocale.status, 404, "/fr/services");

  const unknownSlug = await request("/route-does-not-exist");
  expectStatus(unknownSlug.status, 404, "/route-does-not-exist");

  console.log("PASS: utility route smoke checks passed");
}

async function main() {
  let managedServer = null;
  let startedByScript = false;

  try {
    const alreadyReachable = await canReachBaseUrl();
    if (!alreadyReachable) {
      console.log(`Starting managed dev server using: ${devCommand}`);
      managedServer = startDevServer();
      startedByScript = true;

      const ready = await waitForServerReady(readyTimeoutMs);
      if (!ready) {
        fail(`Timed out waiting for ${baseUrl}`);
      }
    }

    await runChecks();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(detail);
  } finally {
    if (startedByScript) {
      stopDevServer(managedServer);
    }
  }
}

void main();
