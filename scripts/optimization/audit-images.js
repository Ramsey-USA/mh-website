#!/usr/bin/env node
/**
 * Image Optimization Audit Script
 * Analyzes images and provides optimization recommendations
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

log("\n=== Image Optimization Audit ===", "cyan");
log("Analyzing images in public/images/\n", "blue");

// Find all images
const imageDir = path.join(__dirname, "../../public/images");
const results = {
  totalImages: 0,
  totalSize: 0,
  byFormat: {},
  bySize: [],
  largeImages: [],
  unoptimized: [],
};

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024);
}

function analyzeDirectory(dir, relativePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      analyzeDirectory(fullPath, relPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"].includes(ext)) {
        results.totalImages++;

        const sizeKB = getFileSizeInKB(fullPath);
        results.totalSize += sizeKB;

        // Count by format
        const format = ext.substring(1);
        results.byFormat[format] = (results.byFormat[format] || 0) + 1;

        // Store image info
        const imageInfo = {
          path: relPath,
          format,
          sizeKB,
          fullPath,
        };
        results.bySize.push(imageInfo);

        // Flag large images
        if (sizeKB > 100) {
          results.largeImages.push(imageInfo);
        }

        // Flag unoptimized images
        if (
          (ext === ".jpg" || ext === ".jpeg" || ext === ".png") &&
          sizeKB > 50
        ) {
          results.unoptimized.push(imageInfo);
        }
      }
    }
  }
}

analyzeDirectory(imageDir);

// Sort by size
results.bySize.sort((a, b) => b.sizeKB - a.sizeKB);

// === REPORT ===

log("📊 Overall Statistics", "cyan");
log(`Total Images: ${results.totalImages}`, "blue");
log(`Total Size: ${(results.totalSize / 1024).toFixed(2)} MB`, "blue");
log(
  `Average Size: ${Math.round(results.totalSize / results.totalImages)} KB`,
  "blue",
);

log("\n📁 By Format", "cyan");
Object.entries(results.byFormat)
  .sort((a, b) => b[1] - a[1])
  .forEach(([format, count]) => {
    const percentage = ((count / results.totalImages) * 100).toFixed(1);
    log(`  ${format.toUpperCase()}: ${count} (${percentage}%)`, "blue");
  });

log("\n🔝 Top 10 Largest Images", "cyan");
results.bySize.slice(0, 10).forEach((img, i) => {
  const color =
    img.sizeKB > 200 ? "red" : img.sizeKB > 100 ? "yellow" : "green";
  log(`  ${i + 1}. ${img.path} - ${img.sizeKB} KB [${img.format}]`, color);
});

log("\n⚠️  Large Images (>100KB)", "yellow");
log(`Found ${results.largeImages.length} large images`, "blue");
if (results.largeImages.length > 0) {
  results.largeImages.slice(0, 10).forEach((img) => {
    log(`  • ${img.path} - ${img.sizeKB} KB`, "yellow");
  });
  if (results.largeImages.length > 10) {
    log(`  ... and ${results.largeImages.length - 10} more`, "yellow");
  }
}

log("\n🎯 Optimization Opportunities", "cyan");

// PNG to WebP candidates
const pngImages = results.bySize.filter(
  (img) => img.format === "png" && img.sizeKB > 20,
);
if (pngImages.length > 0) {
  log(`\n1. Convert PNG to WebP/AVIF (${pngImages.length} images)`, "magenta");
  log("   Expected savings: 30-50% file size reduction", "blue");
  pngImages.slice(0, 5).forEach((img) => {
    const estimatedSavings = Math.round(img.sizeKB * 0.4);
    log(
      `   • ${img.path}: ${img.sizeKB}KB → ~${img.sizeKB - estimatedSavings}KB (-${estimatedSavings}KB)`,
      "blue",
    );
  });
  if (pngImages.length > 5) {
    log(`   ... and ${pngImages.length - 5} more`, "blue");
  }
}

// JPG optimization candidates
const jpgImages = results.bySize.filter(
  (img) => ["jpg", "jpeg"].includes(img.format) && img.sizeKB > 50,
);
if (jpgImages.length > 0) {
  log(`\n2. Optimize JPG Quality (${jpgImages.length} images)`, "magenta");
  log("   Expected savings: 20-40% file size reduction", "blue");
  jpgImages.slice(0, 5).forEach((img) => {
    const estimatedSavings = Math.round(img.sizeKB * 0.3);
    log(
      `   • ${img.path}: ${img.sizeKB}KB → ~${img.sizeKB - estimatedSavings}KB (-${estimatedSavings}KB)`,
      "blue",
    );
  });
  if (jpgImages.length > 5) {
    log(`   ... and ${jpgImages.length - 5} more`, "blue");
  }
}

// QR codes
const qrImages = results.bySize.filter((img) => img.path.includes("qr-codes"));
if (qrImages.length > 0) {
  const qrTotalSize = qrImages.reduce((sum, img) => sum + img.sizeKB, 0);
  log(
    `\n3. Optimize QR Codes (${qrImages.length} images, ${qrTotalSize}KB total)`,
    "magenta",
  );
  log("   QR codes can be heavily compressed or converted to SVG", "blue");
  log("   Expected savings: 40-60% file size reduction", "blue");
}

// Logo optimization
const logoImages = results.bySize.filter((img) => img.path.includes("logo"));
if (logoImages.length > 0) {
  const logoTotalSize = logoImages.reduce((sum, img) => sum + img.sizeKB, 0);
  log(
    `\n4. Logo Optimization (${logoImages.length} images, ${logoTotalSize}KB total)`,
    "magenta",
  );
  log("   Logos should be SVG or optimized PNG with transparency", "blue");
  const largePngLogos = logoImages.filter(
    (img) => img.format === "png" && img.sizeKB > 50,
  );
  if (largePngLogos.length > 0) {
    log(
      `   Found ${largePngLogos.length} large PNG logos to optimize:`,
      "blue",
    );
    largePngLogos.forEach((img) => {
      log(`   • ${img.path}: ${img.sizeKB}KB`, "yellow");
    });
  }
}

// Calculate potential savings
const pngSavings = pngImages.reduce(
  (sum, img) => sum + Math.round(img.sizeKB * 0.4),
  0,
);
const jpgSavings = jpgImages.reduce(
  (sum, img) => sum + Math.round(img.sizeKB * 0.3),
  0,
);
const qrSavings = qrImages.reduce(
  (sum, img) => sum + Math.round(img.sizeKB * 0.5),
  0,
);
const totalPotentialSavings = pngSavings + jpgSavings + qrSavings;

log("\n💰 Potential Savings Summary", "cyan");
log(`Current Total: ${(results.totalSize / 1024).toFixed(2)} MB`, "blue");
log(
  `Potential Savings: ${(totalPotentialSavings / 1024).toFixed(2)} MB`,
  "green",
);
log(
  `After Optimization: ${((results.totalSize - totalPotentialSavings) / 1024).toFixed(2)} MB`,
  "green",
);
log(
  `Reduction: ${((totalPotentialSavings / results.totalSize) * 100).toFixed(1)}%`,
  "green",
);

log("\n📝 Recommendations", "cyan");
log("1. ✅ Next.js Image component already configured for WebP/AVIF", "green");
log("2. ⚠️  Convert large PNG files to WebP for static serving", "yellow");
log("3. ⚠️  Optimize placeholder images (currently 71KB each)", "yellow");
log("4. ⚠️  Consider lazy loading for below-the-fold images", "yellow");
log("5. ⚠️  Implement responsive images with srcset", "yellow");
log("6. ✅ QR codes could use SVG format for smaller size", "yellow");

log("\n🚀 Next Steps", "cyan");
log("Run optimization commands:", "blue");
log("  npm run optimize:images      # Auto-optimize all images", "blue");
log("  npm run convert:webp         # Convert to WebP format", "blue");
log(
  "  npm run audit:images:usage   # Check which images are actually used",
  "blue",
);

log("\n" + "=".repeat(50), "cyan");
