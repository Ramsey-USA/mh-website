#!/usr/bin/env node

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(scriptDir, "..", "..");
const workspaceRoot = resolve(appRoot, "..", "..");
const isCI = process.env.CI === "true";
const requireIndexNowKey = ["1", "true", "yes", "on"].includes(
  (process.env.INDEXNOW_REQUIRED || "").toLowerCase(),
);
const logMissingIndexNow =
  !isCI ||
  ["1", "true", "yes", "on"].includes(
    (process.env.INDEXNOW_VERBOSE_MISSING || "").toLowerCase(),
  );

const INDEXNOW_KEY = (
  process.env.INDEXNOW_KEY ||
  readEnvValue("INDEXNOW_KEY", [
    join(appRoot, ".env.local"),
    join(appRoot, ".env"),
    join(workspaceRoot, ".env.local"),
    join(workspaceRoot, ".env"),
  ]) ||
  ""
).trim();
const PUBLIC_DIR = join(process.cwd(), "public");

if (!INDEXNOW_KEY) {
  if (requireIndexNowKey) {
    console.error(
      "[indexnow] INDEXNOW_KEY is required in this environment but not set.",
    );
    process.exit(1);
  }

  if (logMissingIndexNow) {
    console.log(
      "[indexnow] INDEXNOW_KEY is not set; skipping key file generation.",
    );
  }

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
const maskedKey = maskKey(INDEXNOW_KEY);

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
  console.log(`[indexnow] Wrote key file for ${maskedKey}`);
} else {
  console.log(`[indexnow] Key file is current for ${maskedKey}`);
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
      console.log(`[indexnow] Removed stale key file for ${maskKey(basename)}`);
    }
  }
}

function maskKey(key) {
  if (!key) {
    return "(missing)";
  }

  if (key.length <= 8) {
    return `${key[0]}***${key[key.length - 1]}`;
  }

  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

function readEnvValue(name, filePaths) {
  for (const filePath of filePaths) {
    let content = "";
    try {
      content = readFileSync(filePath, "utf8");
    } catch {
      continue;
    }

    const lines = content.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }

      const separatorIndex = trimmed.indexOf("=");
      if (separatorIndex === -1) {
        continue;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      if (key !== name) {
        continue;
      }

      let value = trimmed.slice(separatorIndex + 1).trim();
      value = value.replace(/^['\"]|['\"]$/g, "");
      return value;
    }
  }

  return "";
}
