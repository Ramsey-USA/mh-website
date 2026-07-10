#!/usr/bin/env node

"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

const scriptPath = path.join(
  __dirname,
  "..",
  "apps",
  "website",
  "scripts",
  "test-basic-performance.js",
);
const result = spawnSync(
  process.execPath,
  [scriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
