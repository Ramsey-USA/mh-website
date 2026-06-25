#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const ffprobePath = require("ffprobe-static").path;

const PUBLIC_DIR = path.join(__dirname, "../../public");
const HERO_DIR = path.join(PUBLIC_DIR, "videos/hero-commercials");
const MANIFEST_PATH = path.join(
  __dirname,
  "../../config/hero-commercials.json",
);

const MAX_WORKERS_BYTES = 25 * 1024 * 1024;
const WARN_LARGE_BYTES = 20 * 1024 * 1024;
const DURATION_TOLERANCE_SEC = 0.75;
const FILE_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(mp4|webm)$/;

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function fail(errors) {
  console.error("Hero Commercial Guardrails: FAIL");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

function warn(messages) {
  for (const message of messages) {
    console.warn(`WARN: ${message}`);
  }
}

function probeMedia(fullPath) {
  const result = spawnSync(
    ffprobePath,
    [
      "-v",
      "error",
      "-show_streams",
      "-show_format",
      "-print_format",
      "json",
      fullPath,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    return {
      ok: false,
      error: (result.stderr || result.stdout || "ffprobe failed").trim(),
    };
  }

  try {
    const parsed = JSON.parse(result.stdout || "{}");
    return { ok: true, data: parsed };
  } catch (error) {
    return {
      ok: false,
      error: `Unable to parse ffprobe JSON: ${error.message}`,
    };
  }
}

function collectMediaFiles(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return [];
  }

  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMediaFiles(fullPath));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!entry.name.endsWith(".mp4") && !entry.name.endsWith(".webm")) {
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function run() {
  const errors = [];
  const warnings = [];

  if (!fs.existsSync(MANIFEST_PATH)) {
    errors.push(`Missing manifest: ${MANIFEST_PATH}`);
    fail(errors);
  }

  if (!fs.existsSync(HERO_DIR)) {
    errors.push(`Missing hero video directory: ${HERO_DIR}`);
    fail(errors);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  } catch (error) {
    errors.push(`Invalid JSON in ${MANIFEST_PATH}: ${error.message}`);
    fail(errors);
  }

  if (!Array.isArray(manifest) || manifest.length === 0) {
    errors.push("Hero commercial manifest must contain at least one entry.");
    fail(errors);
  }

  const registered = new Set();

  for (const entry of manifest) {
    const id = entry.id || "(missing-id)";

    if (typeof entry.id !== "string" || !entry.id.trim()) {
      errors.push("Manifest entry is missing a non-empty id.");
    }

    if (typeof entry.mp4 !== "string" || !entry.mp4.endsWith(".mp4")) {
      errors.push(`[${id}] mp4 must be a .mp4 path.`);
      continue;
    }

    const mp4Path = path.join(PUBLIC_DIR, entry.mp4);
    registered.add(path.normalize(mp4Path));

    if (!fs.existsSync(mp4Path)) {
      errors.push(`[${id}] Missing mp4 file: ${entry.mp4}`);
      continue;
    }

    const mp4Name = path.basename(mp4Path);
    if (!FILE_NAME_RE.test(mp4Name)) {
      errors.push(
        `[${id}] MP4 filename must be lowercase kebab-case: ${mp4Name}`,
      );
    }

    const mp4Size = fs.statSync(mp4Path).size;
    if (mp4Size > MAX_WORKERS_BYTES) {
      errors.push(
        `[${id}] MP4 exceeds Workers 25 MiB limit (${formatMB(mp4Size)}): ${entry.mp4}`,
      );
    } else if (mp4Size > WARN_LARGE_BYTES) {
      warnings.push(
        `[${id}] MP4 is large (${formatMB(mp4Size)}). Keep hero media under ${formatMB(
          WARN_LARGE_BYTES,
        )} when practical.`,
      );
    }

    const probe = probeMedia(mp4Path);
    if (!probe.ok) {
      errors.push(`[${id}] ffprobe failed for ${entry.mp4}: ${probe.error}`);
      continue;
    }

    const streams = probe.data.streams || [];
    const hasVideo = streams.some((stream) => stream.codec_type === "video");
    const hasAudio = streams.some((stream) => stream.codec_type === "audio");

    if (!hasVideo) {
      errors.push(`[${id}] MP4 has no video stream: ${entry.mp4}`);
    }

    if (entry.audioRequired !== false && !hasAudio) {
      errors.push(`[${id}] MP4 has no audio stream: ${entry.mp4}`);
    }

    if (typeof entry.expectedDurationSec === "number") {
      const actual = Number(probe.data.format?.duration || 0);
      if (!Number.isFinite(actual) || actual <= 0) {
        errors.push(`[${id}] Unable to determine MP4 duration: ${entry.mp4}`);
      } else if (
        Math.abs(actual - entry.expectedDurationSec) > DURATION_TOLERANCE_SEC
      ) {
        errors.push(
          `[${id}] Duration mismatch for ${entry.mp4}. Expected ${entry.expectedDurationSec.toFixed(
            2,
          )}s, got ${actual.toFixed(2)}s.`,
        );
      }
    } else {
      errors.push(`[${id}] expectedDurationSec must be a number.`);
    }

    if (typeof entry.webm === "string" && entry.webm.endsWith(".webm")) {
      const webmPath = path.join(PUBLIC_DIR, entry.webm);
      registered.add(path.normalize(webmPath));

      if (!fs.existsSync(webmPath)) {
        errors.push(`[${id}] Missing webm file: ${entry.webm}`);
      } else {
        const webmName = path.basename(webmPath);
        if (!FILE_NAME_RE.test(webmName)) {
          errors.push(
            `[${id}] WebM filename must be lowercase kebab-case: ${webmName}`,
          );
        }

        const webmSize = fs.statSync(webmPath).size;
        if (webmSize > MAX_WORKERS_BYTES) {
          errors.push(
            `[${id}] WebM exceeds Workers 25 MiB limit (${formatMB(webmSize)}): ${entry.webm}`,
          );
        }
      }
    }
  }

  const presentMedia = collectMediaFiles(HERO_DIR).map((filePath) =>
    path.normalize(filePath),
  );

  for (const fullPath of presentMedia) {
    if (!registered.has(fullPath)) {
      const relative = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, "/");
      errors.push(
        `Unregistered hero media file: ${relative}. Add it to config/hero-commercials.json.`,
      );
    }
  }

  if (warnings.length > 0) {
    warn(warnings);
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(
    `Hero Commercial Guardrails: PASS (${manifest.length} manifest entr${
      manifest.length === 1 ? "y" : "ies"
    }, ${presentMedia.length} media files)`,
  );
}

run();
