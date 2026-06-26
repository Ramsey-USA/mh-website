#!/usr/bin/env node

/**
 * One-command local chat smoke runner.
 *
 * Behavior:
 * - If CHAT_SMOKE_BASE_URL is already reachable, run smoke check directly.
 * - Otherwise, start local dev server, wait for readiness, run smoke check,
 *   then stop the server.
 *
 * Usage:
 *   npm run chat
 */

const { spawn } = require("node:child_process");
const process = require("node:process");

const appRoot = process.cwd();
const baseUrl = (process.env.CHAT_SMOKE_BASE_URL || "http://localhost:3000")
  .trim()
  .replace(/\/$/, "");
const readyTimeoutMs = Number(
  process.env.CHAT_SMOKE_READY_TIMEOUT_MS || 120000,
);

const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function canReachBaseUrl() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      signal: controller.signal,
    });
    return res.ok || res.status === 403 || res.status === 404;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function runSmoke() {
  return new Promise((resolve, reject) => {
    const child = spawn(npmCmd, ["run", "smoke:chat:es"], {
      cwd: appRoot,
      env: process.env,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}

function startDevServer() {
  const child = spawn(npmCmd, ["run", "dev"], {
    cwd: appRoot,
    env: process.env,
    stdio: "ignore",
    detached: true,
  });

  child.unref();
  return child;
}

function stopDevServer(child) {
  if (!child || !child.pid) return;

  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    return;
  }

  setTimeout(() => {
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      // Already stopped.
    }
  }, 1500);
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

async function main() {
  let devChild = null;
  let startedByScript = false;

  try {
    const alreadyUp = await canReachBaseUrl();
    if (!alreadyUp) {
      console.log(
        `Starting local dev server for chat smoke check at ${baseUrl} ...`,
      );
      devChild = startDevServer();
      startedByScript = true;

      const ready = await waitForServerReady(readyTimeoutMs);
      if (!ready) {
        console.error(`FAIL: Timed out waiting for ${baseUrl}`);
        process.exit(1);
      }
    }

    const code = await runSmoke();
    process.exit(code);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error(`FAIL: ${detail}`);
    process.exit(1);
  } finally {
    if (startedByScript) {
      stopDevServer(devChild);
    }
  }
}

main();
