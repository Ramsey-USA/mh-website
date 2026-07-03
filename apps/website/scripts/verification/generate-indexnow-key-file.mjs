#!/usr/bin/env node

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const INDEXNOW_KEY = (process.env.INDEXNOW_KEY || "").trim();
const PUBLIC_DIR = join(process.cwd(), "public");

if (!INDEXNOW_KEY) {
  console.log(
    "[indexnow] INDEXNOW_KEY is not set; skipping key file generation.",
  );
  process.exit(0);
}

if (!/^[A-Za-z0-9]{8,128}$/.test(INDEXNOW_KEY)) {
  console.error(
    "[indexnow] INDEXNOW_KEY must be 8-128 alphanumeric characters.",
  );
  process.exit(1);
}

mkdirSync(PUBLIC_DIR, { recursive: true });

const targetFileName = `${INDEXNOW_KEY}.txt`;
const targetPath = join(PUBLIC_DIR, targetFileName);

cleanupStaleIndexNowFiles(PUBLIC_DIR, targetFileName);

let shouldWrite = true;
try {
  const existing = readFileSync(targetPath, "utf8").trim();
  shouldWrite = existing !== INDEXNOW_KEY;
} catch {
  shouldWrite = true;
}

if (shouldWrite) {
  writeFileSync(targetPath, `${INDEXNOW_KEY}\n`, "utf8");
  console.log(`[indexnow] Wrote ${targetFileName}`);
} else {
  console.log(`[indexnow] Key file is current: ${targetFileName}`);
}

function cleanupStaleIndexNowFiles(publicDir, keepFileName) {
  const files = readdirSync(publicDir, { withFileTypes: true });

  for (const file of files) {
    if (!file.isFile()) {
      continue;
    }

    if (!file.name.endsWith(".txt") || file.name === keepFileName) {
      continue;
    }

    const basename = file.name.slice(0, -4);
    if (!/^[A-Za-z0-9]{8,128}$/.test(basename)) {
      continue;
    }

    const fullPath = join(publicDir, file.name);
    let content = "";
    try {
      content = readFileSync(fullPath, "utf8").trim();
    } catch {
      continue;
    }

    // IndexNow proof files conventionally contain the exact key.
    if (content === basename) {
      rmSync(fullPath, { force: true });
      console.log(`[indexnow] Removed stale key file: ${file.name}`);
    }
  }
}
