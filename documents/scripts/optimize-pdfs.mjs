#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * PDF Optimizer — shrinks generated PDFs without touching branded layout.
 *
 * The Puppeteer HTML→PDF pipeline embeds the MH Construction color logo at
 * 3320×1892 px and re-embeds it per page as separate image objects (Chrome
 * does not deduplicate identical images across pages). A three-page form ends
 * up carrying ~1.1 MB of redundant, oversized raster data.
 *
 * This post-processing pass runs Ghostscript to:
 *   - downsample oversized raster images to a print-safe resolution,
 *   - recompress image streams,
 *   - merge duplicate image objects (-dDetectDuplicateImages).
 *
 * Vector text, fonts, and page geometry are preserved exactly, so branding
 * (logo, accreditation seals, QR codes, colors, typography) is unchanged.
 *
 * Usage:
 *   node documents/scripts/optimize-pdfs.mjs                 # default dir
 *   node documents/scripts/optimize-pdfs.mjs <dir-or-file>…  # explicit targets
 *   node documents/scripts/optimize-pdfs.mjs --ci            # quiet output
 */

import { spawnSync } from "node:child_process";
import { readdirSync, statSync, existsSync, renameSync, rmSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";
import { readFile } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const DEFAULT_DIR = join(ROOT, "documents/generated-pdfs");

const CI_MODE = process.argv.includes("--ci");
const targets = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

// Print-safe downsampling thresholds. 200 dpi for photo/logo raster keeps
// letterhead and accreditation seals crisp on screen and in print; 300 dpi for
// mono (1-bit) art preserves line/edge fidelity.
const COLOR_IMAGE_RESOLUTION = 200;
const GRAY_IMAGE_RESOLUTION = 200;
const MONO_IMAGE_RESOLUTION = 300;

// Only replace the original when the optimized file is at least this much
// smaller; avoids needless rewrites of already-lean PDFs.
const MIN_SAVINGS_RATIO = 0.02;

function log(message) {
  if (!CI_MODE) {
    console.log(message);
  }
}

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function checkGhostscript() {
  const result = spawnSync("gs", ["--version"], { stdio: "ignore" });
  if (result.status !== 0) {
    console.error("❌ Ghostscript (gs) not found. Please install it:");
    console.error("   macOS:   brew install ghostscript");
    console.error("   Ubuntu:  sudo apt install ghostscript");
    console.error(
      "   Windows: https://www.ghostscript.com/releases/gsdnld.html",
    );
    process.exit(1);
  }
}

function collectPdfs(target) {
  if (!existsSync(target)) {
    return [];
  }

  const stat = statSync(target);
  if (stat.isFile()) {
    return extname(target).toLowerCase() === ".pdf" ? [target] : [];
  }

  const pdfs = [];
  for (const entry of readdirSync(target, { withFileTypes: true })) {
    const fullPath = join(target, entry.name);
    if (entry.isDirectory()) {
      pdfs.push(...collectPdfs(fullPath));
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".pdf") {
      pdfs.push(fullPath);
    }
  }
  return pdfs;
}

async function countPages(filePath) {
  try {
    const bytes = await readFile(filePath);
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    return doc.getPageCount();
  } catch {
    return null;
  }
}

function runGhostscript(inputPath, outputPath) {
  const result = spawnSync(
    "gs",
    [
      "-q",
      "-dNOPAUSE",
      "-dBATCH",
      "-dSAFER",
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.7",
      "-dDetectDuplicateImages=true",
      "-dDownsampleColorImages=true",
      `-dColorImageResolution=${COLOR_IMAGE_RESOLUTION}`,
      "-dColorImageDownsampleType=/Bicubic",
      "-dDownsampleGrayImages=true",
      `-dGrayImageResolution=${GRAY_IMAGE_RESOLUTION}`,
      "-dGrayImageDownsampleType=/Bicubic",
      "-dDownsampleMonoImages=true",
      `-dMonoImageResolution=${MONO_IMAGE_RESOLUTION}`,
      "-dAutoRotatePages=/None",
      `-sOutputFile=${outputPath}`,
      inputPath,
    ],
    { stdio: CI_MODE ? "ignore" : "inherit" },
  );
  return result.status === 0;
}

async function optimizeOne(filePath) {
  const originalSize = statSync(filePath).size;
  // Keep the temp file on the same filesystem as the target so the final
  // rename is atomic (avoids EXDEV across /tmp and the workspace volume).
  const tmpPath = `${filePath}.optimize-${process.pid}-${Math.random()
    .toString(36)
    .slice(2)}.tmp`;

  try {
    if (!runGhostscript(filePath, tmpPath)) {
      log(`  ✗ Ghostscript failed, keeping original: ${filePath}`);
      return { originalSize, newSize: originalSize, changed: false };
    }

    if (!existsSync(tmpPath)) {
      return { originalSize, newSize: originalSize, changed: false };
    }

    const [originalPages, newPages] = await Promise.all([
      countPages(filePath),
      countPages(tmpPath),
    ]);

    if (
      originalPages === null ||
      newPages === null ||
      originalPages !== newPages
    ) {
      log(
        `  ✗ Page-count mismatch (${originalPages} → ${newPages}), keeping original: ${filePath}`,
      );
      return { originalSize, newSize: originalSize, changed: false };
    }

    const newSize = statSync(tmpPath).size;
    const savings = (originalSize - newSize) / originalSize;

    if (savings < MIN_SAVINGS_RATIO) {
      return { originalSize, newSize: originalSize, changed: false };
    }

    renameSync(tmpPath, filePath);
    return { originalSize, newSize, changed: true };
  } finally {
    if (existsSync(tmpPath)) {
      rmSync(tmpPath, { force: true });
    }
  }
}

async function run() {
  checkGhostscript();

  const searchTargets = targets.length > 0 ? targets : [DEFAULT_DIR];
  const pdfs = [
    ...new Set(searchTargets.flatMap((t) => collectPdfs(t))),
  ].sort();

  if (pdfs.length === 0) {
    log("No PDF files found to optimize.");
    return;
  }

  log(`Optimizing ${pdfs.length} PDF file(s)…`);

  let totalBefore = 0;
  let totalAfter = 0;
  let changedCount = 0;

  for (const pdf of pdfs) {
    const { originalSize, newSize, changed } = await optimizeOne(pdf);
    totalBefore += originalSize;
    totalAfter += newSize;
    if (changed) {
      changedCount += 1;
      log(
        `  ✓ ${formatMB(originalSize)} → ${formatMB(newSize)}  ${pdf.replace(`${ROOT}/`, "")}`,
      );
    }
  }

  const saved = totalBefore - totalAfter;
  const pct =
    totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : "0.0";
  console.log(
    `PDF optimization complete: ${changedCount}/${pdfs.length} optimized, ${formatMB(
      totalBefore,
    )} → ${formatMB(totalAfter)} (saved ${formatMB(saved)}, ${pct}%).`,
  );
}

run().catch((error) => {
  console.error("PDF optimization failed:", error);
  process.exit(1);
});
