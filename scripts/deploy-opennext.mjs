#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from "node:fs";
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

run("wrangler", ["deploy"], {
  WRANGLER_SEND_METRICS: "false",
});
