#!/usr/bin/env node
/**
 * Image Optimization Script
 * Auto-optimizes images using sharp
 *
 * Usage:
 *   npm run optimize:images
 *   npm run optimize:images -- --ci
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// CI mode flag
const CI_MODE = process.argv.includes("--ci");

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
    // Simplified output for CI
    console.log(message);
  }
}

const imageDir = path.join(__dirname, "../../public/images");
const optimizedCount = { success: 0, skipped: 0, failed: 0 };
const savings = { before: 0, after: 0 };

async function optimizeImage(filePath, outputPath, options = {}) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    const beforeSize = fs.statSync(filePath).size;
    let image = sharp(filePath);

    // Get metadata
    const metadata = await image.metadata();

    // Apply quality settings based on file type
    if (ext === ".png" || ext === ".png") {
      await image
        .webp({ quality: options.quality || 85, effort: 6 })
        .toFile(outputPath);
    } else if (ext === ".jpg" || ext === ".jpeg") {
      await image
        .jpeg({
          quality: options.quality || 80,
          progressive: true,
          mozjpeg: true,
        })
        .toFile(outputPath.replace(".webp", ".jpg"));

      // Also create WebP version
      await sharp(filePath)
        .webp({ quality: options.quality || 85, effort: 6 })
        .toFile(outputPath);
    }

    const afterSize = fs.statSync(outputPath).size;
    savings.before += beforeSize;
    savings.after += afterSize;

    const savedKB = Math.round((beforeSize - afterSize) / 1024);
    const savedPercent = Math.round(
      ((beforeSize - afterSize) / beforeSize) * 100,
    );

    if (savedPercent > 0) {
      log(
        `  ✓ ${path.basename(filePath)} → ${savedKB}KB saved (${savedPercent}%)`,
        "green",
      );
      optimizedCount.success++;
    } else {
      log(`  - ${path.basename(filePath)} (already optimal)`, "yellow");
      optimizedCount.skipped++;
    }
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
          entry.name.replace(/\.(jpg|jpeg|png)$/, ".webp"),
        );
        await optimizeImage(fullPath, outputPath);
      }
    }
  }
}

async function main() {
  log("\n=== Image Optimization ===", "cyan");
  log("Optimizing images to WebP format...\n", "blue");

  // Check if sharp is installed
  try {
    require.resolve("sharp");
  } catch (e) {
    log("Error: sharp not installed", "yellow");
    log("Run: npm install --save-dev sharp", "yellow");
    process.exit(1);
  }

  const outputDir = path.join(__dirname, "../../public/images-optimized");

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await processDirectory(imageDir, outputDir);

  log("\n=== Optimization Complete ===", "cyan");
  log(`✓ Success: ${optimizedCount.success}`, "green");
  log(`- Skipped: ${optimizedCount.skipped}`, "yellow");
  log(`✗ Failed: ${optimizedCount.failed}`, "yellow");

  const totalSavedKB = Math.round((savings.before - savings.after) / 1024);
  const totalSavedPercent = Math.round(
    ((savings.before - savings.after) / savings.before) * 100,
  );
  log(`\n💾 Total Savings: ${totalSavedKB}KB (${totalSavedPercent}%)`, "green");
  log(`\nOptimized images saved to: public/images-optimized/`, "blue");
  log("Review and replace originals when ready.", "blue");
}

main().catch(console.error);
