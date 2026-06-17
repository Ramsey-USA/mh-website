#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const appRoot = process.cwd();
const repoRoot = resolve(appRoot, "../..");
const openNextRoot = join(appRoot, ".open-next");
const openNextWorker = join(openNextRoot, "worker.js");
const openNextAssets = join(openNextRoot, "assets");

const SOURCE_PATHS = [
  "package.json",
  "pnpm-lock.yaml",
  "tsconfig.json",
  "next.config.js",
  "tailwind.config.ts",
  "postcss.config.js",
  "open-next.config.ts",
  "middleware.ts",
  "src",
  "app",
  "components",
  "lib",
  "config",
  "documents",
  "messages",
  "public",
  "packages/shared/src",
];

const EXCLUDED_DIRS = new Set([
  ".git",
  ".next",
  ".open-next",
  "coverage",
  "dist",
  "build",
  "out",
  "node_modules",
]);

const TEMP_ASSET_BASENAMES = new Set([
  "tmp-form03d.html",
  "tmp-form03d-pdf.png",
  "tmp-form03d-pdf-wait.png",
]);

const wranglerConfigPath = join(repoRoot, "wrangler.toml");

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}

function runPreflightChecks() {
  const hasApiToken =
    Boolean(process.env.CLOUDFLARE_API_TOKEN) ||
    Boolean(process.env.CF_API_TOKEN);
  const hasLegacyAuth =
    Boolean(process.env.CLOUDFLARE_API_KEY) &&
    Boolean(process.env.CLOUDFLARE_EMAIL);

  if (!hasApiToken && !hasLegacyAuth) {
    fail(
      "Missing Cloudflare auth. Set CLOUDFLARE_API_TOKEN (recommended) or CLOUDFLARE_API_KEY + CLOUDFLARE_EMAIL before deploy.",
    );
  }

  if (!existsSync(wranglerConfigPath)) {
    fail(`Missing wrangler config at ${wranglerConfigPath}.`);
  }

  const wranglerToml = readFileSync(wranglerConfigPath, "utf8");
  const hasZoneConfig = /\bzone_name\s*=\s*"[^"]+"/.test(wranglerToml);
  const hasZoneEnv =
    Boolean(process.env.CLOUDFLARE_ZONE_ID) || Boolean(process.env.CF_ZONE_ID);

  if (!hasZoneConfig && !hasZoneEnv) {
    fail(
      "Missing zone context. Define zone_name routes in wrangler.toml or set CLOUDFLARE_ZONE_ID.",
    );
  }

  const hasAccountEnv =
    Boolean(process.env.CLOUDFLARE_ACCOUNT_ID) ||
    Boolean(process.env.CF_ACCOUNT_ID);
  if (!hasAccountEnv && !hasApiToken) {
    fail(
      "Missing account context. Set CLOUDFLARE_ACCOUNT_ID or use an account-scoped CLOUDFLARE_API_TOKEN.",
    );
  }
}

function pruneTempAssets() {
  if (!existsSync(openNextAssets)) {
    return;
  }

  const entries = readdirSync(openNextAssets, { withFileTypes: true });
  let removed = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !TEMP_ASSET_BASENAMES.has(entry.name)) {
      continue;
    }

    rmSync(join(openNextAssets, entry.name), { force: true });
    removed += 1;
  }

  if (removed > 0) {
    console.log(`🧹 Removed ${removed} temporary form asset(s) from deploy bundle.`);
  }
}

function latestMtimeForPath(targetPath) {
  if (!existsSync(targetPath)) {
    return 0;
  }

  const stats = statSync(targetPath);
  if (stats.isFile()) {
    return stats.mtimeMs;
  }

  if (!stats.isDirectory()) {
    return stats.mtimeMs;
  }

  let newest = stats.mtimeMs;
  const entries = readdirSync(targetPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) {
      continue;
    }

    newest = Math.max(newest, latestMtimeForPath(join(targetPath, entry.name)));
  }

  return newest;
}

function latestSourceMtime() {
  let newest = 0;
  for (const relativePath of SOURCE_PATHS) {
    newest = Math.max(newest, latestMtimeForPath(join(appRoot, relativePath)));
    newest = Math.max(newest, latestMtimeForPath(join(repoRoot, relativePath)));
  }
  return newest;
}

function run(command, args, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd: appRoot,
    env: {
      ...process.env,
      ...extraEnv,
    },
    stdio: "inherit",
  });

  if (result.error) {
    console.error(`✖ Failed to run ${command}:`, result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const buildCurrent =
  existsSync(openNextWorker) &&
  existsSync(openNextAssets) &&
  latestMtimeForPath(openNextRoot) >= latestSourceMtime();

if (buildCurrent) {
  console.log("♻ Reusing current OpenNext build artifacts in .open-next/");
} else {
  console.log("🏗️  No current OpenNext artifacts found; building first.");
  run("npm", ["run", "build:lowmem"], {
    LOW_MEMORY_BUILD: "true",
    NODE_OPTIONS: "--max-old-space-size=4096",
  });
}

runPreflightChecks();
pruneTempAssets();

run("pnpm", ["exec", "wrangler", "deploy", "--yes"], {
  WRANGLER_SEND_METRICS: "false",
  CLOUDFLARE_API_TOKEN:
    process.env.CLOUDFLARE_API_TOKEN ?? process.env.CF_API_TOKEN,
});
