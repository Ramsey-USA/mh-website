#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts JPG/PNG → WebP and resizes oversized images.
 *
 * NOTE: This project uses `unoptimized: true` in next.config.js (required for
 * Cloudflare Workers — no sharp at runtime). That means the browser downloads
 * the exact file stored on disk, so pre-sizing here is critical.
 *
 * Usage:
 *   npm run optimize:images                # skip files that already have WebP
 *   npm run optimize:images -- --force     # re-process all images
 *   npm run optimize:images -- --ci        # simplified CI output
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const CI_MODE = process.argv.includes("--ci");
const FORCE = process.argv.includes("--force");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  if (!CI_MODE) {
    console.log(`${colors[color]}${message}${colors.reset}`);
  } else {
    console.log(message);
  }
}

const imageDir = path.join(__dirname, "../../public/images");
const optimizedCount = { success: 0, skipped: 0, failed: 0 };
const savings = { before: 0, after: 0 };

/**
 * Max width per directory category.
 * With unoptimized:true the browser gets the exact file — so we pre-size here.
 * QR codes are excluded from resizing (must stay sharp for scanning).
 */
const MAX_WIDTH_BY_CATEGORY = {
  "qr-codes": null, // never resize — QR codes must be full-res
  logo: 1920, // logos; kept large enough for retina hero use
  team: 800, // team cards displayed ~300-400px × 2x retina
  projects: 1200, // project cards displayed ~600px × 2x retina
  culture: 1200,
  compliance: 1200,
  credentials: 800, // badge/logo images
  bbb: 800,
  blog: 1200,
  news: 1200,
  safety: 1920, // may be used as full-width section backgrounds
  vendors: 1200,
  testimonials: 800, // client/site photos shown in testimonial cards
  social: 1080, // social share cards (square 1080×1080 or landscape 1200×630)
  og: 1200, // Open Graph images — must be exactly 1200×630
  default: 1920, // fallback for any other category
};

function getMaxWidth(relPath) {
  // relPath is like "team/matt-ramsey.jpg" or "projects/foo.jpg"
  const category = relPath.split(path.sep)[0];
  if (category in MAX_WIDTH_BY_CATEGORY) return MAX_WIDTH_BY_CATEGORY[category];
  return MAX_WIDTH_BY_CATEGORY.default;
}

async function optimizeImage(filePath, outputPath, relPath) {
  const ext = path.extname(filePath).toLowerCase();

  // Skip if the WebP already exists and --force was not passed
  if (!FORCE && fs.existsSync(outputPath)) {
    optimizedCount.skipped++;
    return;
  }

  try {
    const beforeSize = fs.statSync(filePath).size;
    const maxWidth = getMaxWidth(relPath);

    let pipeline = sharp(filePath);

    // Resize if the image exceeds the category max width
    if (maxWidth !== null) {
      const meta = await pipeline.metadata();
      if (meta.width && meta.width > maxWidth) {
        pipeline = pipeline.resize({
          width: maxWidth,
          withoutEnlargement: true,
        });
      }
    }

    // Convert to WebP
    await pipeline.webp({ quality: 85, effort: 6 }).toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    savings.before += beforeSize;
    savings.after += afterSize;

    const savedKB = Math.round((beforeSize - afterSize) / 1024);
    const savedPercent =
      beforeSize > 0
        ? Math.round(((beforeSize - afterSize) / beforeSize) * 100)
        : 0;

    log(
      `  ✓ ${path.basename(filePath)} → ${path.basename(outputPath)} | ${savedKB >= 0 ? "-" : "+"}${Math.abs(savedKB)}KB (${savedPercent}%)`,
      "green",
    );
    optimizedCount.success++;
  } catch (error) {
    log(`  ✗ ${path.basename(filePath)} - ${error.message}`, "yellow");
    optimizedCount.failed++;
  }
}

async function processDirectory(dir, outputDir, relativePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      const newOutputDir = path.join(outputDir, entry.name);
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir, { recursive: true });
      }
      await processDirectory(fullPath, newOutputDir, relPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const outputPath = path.join(
          outputDir,
          entry.name.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
        );
        await optimizeImage(fullPath, outputPath, relPath);
      }
    }
  }
}

async function main() {
  log("\n=== Image Optimization ===", "cyan");
  if (FORCE) {
    log("Force mode: re-processing all images\n", "yellow");
  } else {
    log(
      "Skipping images that already have a .webp counterpart (use --force to re-process)\n",
      "blue",
    );
  }

  try {
    require.resolve("sharp");
  } catch (e) {
    log(
      "Error: sharp not installed. Run: npm install --save-dev sharp",
      "yellow",
    );
    process.exit(1);
  }

  await processDirectory(imageDir, imageDir);

  log("\n=== Optimization Complete ===", "cyan");
  log(`✓ Success: ${optimizedCount.success}`, "green");
  log(`- Skipped (already have WebP): ${optimizedCount.skipped}`, "yellow");
  log(`✗ Failed: ${optimizedCount.failed}`, "yellow");

  if (savings.before > 0) {
    const totalSavedKB = Math.round((savings.before - savings.after) / 1024);
    const totalSavedPercent = Math.round(
      ((savings.before - savings.after) / savings.before) * 100,
    );
    log(
      `\n💾 Total Savings: ${totalSavedKB}KB (${totalSavedPercent}%)`,
      "green",
    );
  }
  log(`\nWebP files written to: public/images/ (alongside originals)`, "blue");
}

main().catch(console.error);
