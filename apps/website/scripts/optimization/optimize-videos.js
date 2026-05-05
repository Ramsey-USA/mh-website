#!/usr/bin/env node

/**
 * Video Optimization Script
 *
 * Converts raw video uploads (MP4/MOV/AVI/MKV) to web-optimized WebM (VP9) and
 * MP4 (H.264) formats, and generates poster images. Output files are written
 * directly into public/videos/ alongside sources — the same directory pattern
 * used by optimize-images.js.
 *
 * Re-encoding rules (mirrors optimize-images.js re-pack logic):
 *  - Existing .webm files exceeding MAX_WEBM_SIZE_BYTES (10 MB) are re-encoded.
 *  - Existing .mp4 files exceeding MAX_MP4_SIZE_BYTES (15 MB) are re-encoded.
 *  - Use --force to re-process all files regardless of size or prior conversion.
 *
 * Poster images are named poster-{name}.jpg (matches the CI git-add pattern).
 *
 * Usage:
 *   npm run optimize:videos              # skip already-converted; re-encodes oversized files
 *   npm run optimize:videos -- --force   # re-process ALL video files
 *   npm run optimize:videos -- --ci      # suppress ffmpeg stderr (CI output)
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const CI_MODE = process.argv.includes("--ci");
const FORCE = process.argv.includes("--force");

const VIDEO_DIR = path.join(__dirname, "../../public/videos");

/** Raw source extensions that always need conversion. */
const RAW_SOURCE_FORMATS = [".mov", ".avi", ".mkv"];

/** Hard limit for a production WebM file; files over this are re-encoded. */
const MAX_WEBM_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

/** Hard limit for a production MP4 file; files over this are re-encoded. */
const MAX_MP4_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB

/**
 * Category-based encoding presets keyed by the immediate subdirectory name.
 * Mirrors the MAX_WIDTH_BY_CATEGORY pattern in optimize-images.js.
 *
 * resolution: FFmpeg scale filter value (width:-2 preserves aspect ratio).
 * crf:        VP9 / H.264 CRF quality (lower = better quality, larger file).
 * audioBitrate: null means strip audio (for muted background loops).
 */
const CATEGORY_PRESETS = {
  // Muted looping hero / culture backgrounds — 1080p, high quality
  culture: { resolution: "1920:-2", crf: 33, audioBitrate: null },
  // Project showcase clips — 720p, balanced
  projects: { resolution: "1280:-2", crf: 28, audioBitrate: "128k" },
  // Interview-style testimonials — 720p, balanced
  testimonials: { resolution: "1280:-2", crf: 28, audioBitrate: "128k" },
  // Default fallback for any unrecognised category
  default: { resolution: "1280:-2", crf: 28, audioBitrate: "128k" },
};

const stats = { success: 0, skipped: 0, failed: 0 };
const savings = { before: 0, after: 0 };

function log(message) {
  console.log(message);
}

/**
 * Verify FFmpeg is available and exit with a helpful message if not.
 */
function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
  } catch {
    console.error("❌ FFmpeg not found. Please install FFmpeg:");
    console.error("   macOS:   brew install ffmpeg");
    console.error("   Ubuntu:  sudo apt install ffmpeg");
    console.error("   Windows: https://ffmpeg.org/download.html");
    process.exit(1);
  }
}

function getPreset(relPath) {
  const category = relPath.split(path.sep)[0];
  return CATEGORY_PRESETS[category] ?? CATEGORY_PRESETS.default;
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(1) + " " + sizes[i];
}

/**
 * Encode a video to WebM (VP9 + Opus / silent).
 * Returns true on success, false on failure.
 */
function encodeWebM(inputPath, outputPath, preset) {
  const audioArgs = preset.audioBitrate
    ? `-c:a libopus -b:a ${preset.audioBitrate}`
    : "-an";
  const cmd = [
    "ffmpeg",
    `-i "${inputPath}"`,
    `-c:v libvpx-vp9`,
    `-crf ${preset.crf}`,
    `-b:v 0`,
    `-vf scale=${preset.resolution}`,
    audioArgs,
    `-deadline good`,
    `-cpu-used 2`,
    `-y`,
    `"${outputPath}"`,
  ].join(" ");

  try {
    execSync(cmd, { stdio: CI_MODE ? "ignore" : "inherit" });
    return true;
  } catch {
    log(`  ✗ WebM encode failed: ${path.basename(inputPath)}`);
    return false;
  }
}

/**
 * Encode a video to MP4 (H.264 + AAC / silent).
 * Returns true on success, false on failure.
 */
function encodeMP4(inputPath, outputPath, preset) {
  const audioArgs = preset.audioBitrate
    ? `-c:a aac -b:a ${preset.audioBitrate}`
    : "-an";
  const cmd = [
    "ffmpeg",
    `-i "${inputPath}"`,
    `-c:v libx264`,
    `-preset slow`,
    `-crf ${preset.crf}`,
    `-vf scale=${preset.resolution}`,
    audioArgs,
    `-movflags +faststart`,
    `-y`,
    `"${outputPath}"`,
  ].join(" ");

  try {
    execSync(cmd, { stdio: CI_MODE ? "ignore" : "inherit" });
    return true;
  } catch {
    log(`  ✗ MP4 encode failed: ${path.basename(inputPath)}`);
    return false;
  }
}

/**
 * Extract a poster image from the first second of a video.
 * Named poster-{name}.jpg to match the CI git-add pattern for poster-*.jpg.
 */
function generatePoster(inputPath, posterPath) {
  const cmd = `ffmpeg -i "${inputPath}" -ss 00:00:01 -vframes 1 -vf scale=1280:-2 -q:v 2 -y "${posterPath}"`;
  try {
    execSync(cmd, { stdio: "ignore" });
    return true;
  } catch {
    log(`  ✗ Poster generation failed: ${path.basename(inputPath)}`);
    return false;
  }
}

/**
 * Convert a raw source video (MOV/AVI/MKV or unoptimised MP4) to WebM + MP4
 * + poster image, all written into the same directory as the source.
 *
 * When the source itself is an .mp4 the file is re-encoded in-place (via a
 * sibling .tmp file) rather than generating a second .mp4 alongside it.
 */
function processSourceVideo(filePath, relPath) {
  const dir = path.dirname(filePath);
  const sourceExt = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath, sourceExt);
  const webmOut = path.join(dir, `${name}.webm`);
  const posterOut = path.join(dir, `poster-${name}.jpg`);
  const preset = getPreset(relPath);
  const originalSize = getFileSize(filePath);

  let converted = false;

  // --- WebM ---
  if (FORCE || !fs.existsSync(webmOut)) {
    log(`  → WebM ...`);
    if (encodeWebM(filePath, webmOut, preset)) {
      const sz = getFileSize(webmOut);
      savings.before += originalSize;
      savings.after += sz;
      log(`  ✓ WebM: ${formatBytes(sz)} (from ${formatBytes(originalSize)})`);
      converted = true;
    } else {
      stats.failed++;
      return;
    }
  } else {
    log(`  - WebM already exists (use --force to re-encode)`);
  }

  // --- MP4 ---
  if (sourceExt === ".mp4") {
    // Source IS an MP4: re-encode in-place only when oversized or --force
    if (FORCE || originalSize > MAX_MP4_SIZE_BYTES) {
      const tmpPath = `${filePath}.tmp.mp4`;
      log(`  → Re-encoding MP4 source ...`);
      if (encodeMP4(filePath, tmpPath, preset)) {
        const afterSize = getFileSize(tmpPath);
        if (afterSize < originalSize) {
          fs.renameSync(tmpPath, filePath);
          log(
            `  ✓ MP4 re-encoded: ${formatBytes(afterSize)} (was ${formatBytes(originalSize)})`,
          );
          converted = true;
        } else {
          fs.unlinkSync(tmpPath);
          log(`  - MP4 source is already optimal`);
        }
      }
    } else {
      log(`  - MP4 source is within the size budget`);
    }
  } else {
    // Source is MOV/AVI/MKV: generate an MP4 companion
    const mp4Out = path.join(dir, `${name}.mp4`);
    if (FORCE || !fs.existsSync(mp4Out)) {
      log(`  → MP4 ...`);
      if (encodeMP4(filePath, mp4Out, preset)) {
        log(`  ✓ MP4: ${formatBytes(getFileSize(mp4Out))}`);
        converted = true;
      }
    } else {
      log(`  - MP4 already exists (use --force to re-encode)`);
    }
  }

  // --- Poster ---
  if (FORCE || !fs.existsSync(posterOut)) {
    if (generatePoster(filePath, posterOut)) {
      log(`  ✓ Poster: poster-${name}.jpg`);
      converted = true;
    }
  } else {
    log(`  - Poster already exists (use --force to re-generate)`);
  }

  if (converted) {
    stats.success++;
  } else {
    stats.skipped++;
  }
}

/**
 * Re-encode an existing .webm that exceeds MAX_WEBM_SIZE_BYTES in-place
 * (atomic write via a sibling .tmp file — same pattern as repackWebp in
 * optimize-images.js). Only replaces the original when the re-encoded file
 * is actually smaller.
 */
function repackWebM(filePath, relPath) {
  const beforeSize = getFileSize(filePath);
  if (!FORCE && beforeSize <= MAX_WEBM_SIZE_BYTES) {
    stats.skipped++;
    return;
  }

  const preset = getPreset(relPath);
  // Re-encode at a higher CRF (lower quality) to bring the file within budget
  const repackPreset = { ...preset, crf: Math.min(preset.crf + 6, 63) };
  const tmpPath = `${filePath}.tmp.webm`;

  log(
    `  → Re-packing WebM (${formatBytes(beforeSize)} → budget ${formatBytes(MAX_WEBM_SIZE_BYTES)}) ...`,
  );

  if (!encodeWebM(filePath, tmpPath, repackPreset)) {
    stats.failed++;
    return;
  }

  const afterSize = getFileSize(tmpPath);
  if (afterSize < beforeSize) {
    fs.renameSync(tmpPath, filePath);
    savings.before += beforeSize;
    savings.after += afterSize;
    const savedMB = ((beforeSize - afterSize) / (1024 * 1024)).toFixed(1);
    log(`  ✓ Re-packed: -${savedMB} MB → ${formatBytes(afterSize)}`);
    stats.success++;
  } else {
    fs.unlinkSync(tmpPath);
    log(`  - Already optimal`);
    stats.skipped++;
  }
}

/**
 * Re-encode an existing .mp4 that exceeds MAX_MP4_SIZE_BYTES in-place.
 */
function repackMP4(filePath, relPath) {
  const beforeSize = getFileSize(filePath);
  if (!FORCE && beforeSize <= MAX_MP4_SIZE_BYTES) {
    stats.skipped++;
    return;
  }

  const preset = getPreset(relPath);
  const repackPreset = { ...preset, crf: Math.min(preset.crf + 6, 51) };
  const tmpPath = `${filePath}.tmp.mp4`;

  log(`  → Re-packing MP4 (${formatBytes(beforeSize)}) ...`);

  if (!encodeMP4(filePath, tmpPath, repackPreset)) {
    stats.failed++;
    return;
  }

  const afterSize = getFileSize(tmpPath);
  if (afterSize < beforeSize) {
    fs.renameSync(tmpPath, filePath);
    savings.before += beforeSize;
    savings.after += afterSize;
    log(`  ✓ Re-packed MP4: ${formatBytes(afterSize)}`);
    stats.success++;
  } else {
    fs.unlinkSync(tmpPath);
    log(`  - Already optimal`);
    stats.skipped++;
  }
}

/**
 * Walk public/videos/ and process every video file.
 *
 * Decision table:
 *  .mov / .avi / .mkv          → processSourceVideo (always raw)
 *  .mp4 with no .webm sibling  → processSourceVideo (treat as raw source)
 *  .mp4 with .webm sibling     → repackMP4 (already converted; check budget)
 *  .webm                       → repackWebM (check budget)
 *  anything else (.jpg, etc.)  → skip
 */
function processDirectory(dir, relBase = "") {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === ".gitkeep") continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = relBase ? path.join(relBase, entry.name) : entry.name;

    if (entry.isDirectory()) {
      processDirectory(fullPath, relPath);
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    const name = path.basename(entry.name, ext);

    if (RAW_SOURCE_FORMATS.includes(ext)) {
      log(`\nProcessing source: ${relPath}`);
      processSourceVideo(fullPath, relPath);
    } else if (ext === ".mp4") {
      const webmSibling = path.join(dir, `${name}.webm`);
      if (FORCE || !fs.existsSync(webmSibling)) {
        log(`\nProcessing MP4 source: ${relPath}`);
        processSourceVideo(fullPath, relPath);
      } else {
        repackMP4(fullPath, relPath);
      }
    } else if (ext === ".webm") {
      repackWebM(fullPath, relPath);
    }
    // .jpg poster images, .gitkeep, etc. — intentionally skipped
  }
}

function main() {
  log("\n=== Video Optimization ===");
  if (FORCE) {
    log("Force mode: re-processing all video files\n");
  } else {
    log(
      "Skipping already-converted files (use --force to re-process).\n" +
        `Existing WebM > ${formatBytes(MAX_WEBM_SIZE_BYTES)} or MP4 > ${formatBytes(MAX_MP4_SIZE_BYTES)} are always re-packed.\n`,
    );
  }

  checkFFmpeg();
  processDirectory(VIDEO_DIR);

  log("\n=== Optimization Complete ===");
  log(`✓ Success: ${stats.success}`);
  log(`- Skipped: ${stats.skipped}`);
  log(`✗ Failed:  ${stats.failed}`);

  if (savings.before > 0) {
    const savedMB = ((savings.before - savings.after) / (1024 * 1024)).toFixed(
      1,
    );
    const pct = Math.round(
      ((savings.before - savings.after) / savings.before) * 100,
    );
    log(`\n💾 Total Savings: ${savedMB} MB (${pct}%)`);
  }

  log(`\nOptimized video files written to: public/videos/\n`);

  if (stats.failed > 0) {
    process.exit(1);
  }
}

main();
