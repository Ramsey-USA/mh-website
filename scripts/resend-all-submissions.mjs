#!/usr/bin/env node

import path from "node:path";
import { spawnSync } from "node:child_process";

const scriptPath = path.join(
  import.meta.dirname,
  "..",
  "apps",
  "website",
  "scripts",
  "resend-all-submissions.mjs",
);
const result = spawnSync(
  process.execPath,
  [scriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
