#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { resolve } = require("node:path");
const fs = require("node:fs");

function findRepoRoot(startDir) {
  let currentDir = resolve(startDir);

  while (true) {
    if (
      fs.existsSync(resolve(currentDir, "pnpm-workspace.yaml")) ||
      fs.existsSync(resolve(currentDir, ".git"))
    ) {
      return currentDir;
    }

    const parentDir = resolve(currentDir, "..");
    if (parentDir === currentDir) {
      return currentDir;
    }

    currentDir = parentDir;
  }
}

const repoRoot = findRepoRoot(__dirname);
const target = resolve(
  repoRoot,
  "apps/website/scripts/optimization/build-monitor.js",
);
const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
