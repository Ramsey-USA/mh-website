#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
});

if (root.status !== 0) {
  process.stderr.write(root.stderr || "Failed to resolve repository root.\n");
  process.exit(root.status ?? 1);
}

const target = resolve(root.stdout.trim(), "apps/website/scripts/resend-all-submissions.mjs");
const result = spawnSync(process.execPath, [target, ...process.argv.slice(2)], {
  stdio: "inherit",
});

process.exit(result.status ?? 1);
