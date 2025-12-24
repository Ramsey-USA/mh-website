#!/usr/bin/env node

/**
 * QR Code Verification Script
 *
 * Verifies all QR codes are:
 * 1. Present in the file system
 * 2. Properly formatted and readable
 * 3. Pointing to correct URLs
 * 4. Match the manifest
 *
 * Usage: node scripts/test-qr-codes.js
 */

const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const jsQR = require("jsqr");

// Paths
const QR_DIR = path.join(__dirname, "../public/images/qr-codes");
const MANIFEST_PATH = path.join(QR_DIR, "qr-codes-manifest.json");

// Color codes for output
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

/**
 * Decode a QR code image and return the data
 */
async function decodeQRCode(imagePath) {
  return new Promise((resolve, reject) => {
    try {
      const stream = fs.createReadStream(imagePath).pipe(new PNG());

      stream.on("parsed", function () {
        const decoded = jsQR(this.data, this.width, this.height);

        if (decoded) {
          resolve(decoded.data);
        } else {
          resolve(null);
        }
      });

      stream.on("error", (error) => {
        reject(new Error(`Failed to decode QR code: ${error.message}`));
      });
    } catch (error) {
      reject(new Error(`Failed to decode QR code: ${error.message}`));
    }
  });
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Verify all QR codes
 */
async function verifyQRCodes() {
  console.log(
    `${BLUE}═══════════════════════════════════════════════════════════${RESET}`,
  );
  console.log(
    `${BLUE}       QR Code Verification for MH Construction Website       ${RESET}`,
  );
  console.log(
    `${BLUE}═══════════════════════════════════════════════════════════${RESET}\n`,
  );

  // Load manifest
  if (!fileExists(MANIFEST_PATH)) {
    console.error(`${RED}✗ Manifest file not found: ${MANIFEST_PATH}${RESET}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  console.log(`${GREEN}✓ Loaded manifest${RESET}`);
  console.log(`  Generated: ${manifest.generatedAt}`);
  console.log(`  Base URL: ${manifest.baseUrl}`);
  console.log(`  Total QR Codes in Manifest: ${manifest.qrCodes.length}\n`);

  let totalTests = 0;
  let passed = 0;
  let failed = 0;
  let warnings = 0;

  const errors = [];
  const warningsList = [];

  // Test each QR code from manifest
  console.log(`${BLUE}Testing QR Codes:${RESET}\n`);

  for (const qrCode of manifest.qrCodes) {
    totalTests++;
    const filePath = path.join(QR_DIR, qrCode.filename);
    const testName = `${qrCode.name} (${qrCode.variant})`;

    process.stdout.write(`  Testing ${testName}... `);

    try {
      // Check if file exists
      if (!fileExists(filePath)) {
        failed++;
        errors.push(`${testName}: File not found - ${qrCode.filename}`);
        console.log(`${RED}✗ FILE NOT FOUND${RESET}`);
        continue;
      }

      // Get file size
      const fileSize = getFileSize(filePath);

      // Decode QR code
      const decodedUrl = await decodeQRCode(filePath);

      if (!decodedUrl) {
        failed++;
        errors.push(`${testName}: Failed to decode QR code`);
        console.log(`${RED}✗ DECODE FAILED${RESET}`);
        continue;
      }

      // Verify URL matches expected
      if (decodedUrl !== qrCode.url) {
        failed++;
        errors.push(
          `${testName}: URL mismatch\n` +
            `  Expected: ${qrCode.url}\n` +
            `  Got: ${decodedUrl}`,
        );
        console.log(`${RED}✗ URL MISMATCH${RESET}`);
        continue;
      }

      // Check file size (warning if > 100KB)
      if (parseFloat(fileSize) > 100) {
        warnings++;
        warningsList.push(`${testName}: Large file size (${fileSize} KB)`);
        console.log(`${YELLOW}✓ OK (⚠ large: ${fileSize} KB)${RESET}`);
      } else {
        passed++;
        console.log(`${GREEN}✓ OK (${fileSize} KB)${RESET}`);
      }
    } catch (error) {
      failed++;
      errors.push(`${testName}: ${error.message}`);
      console.log(`${RED}✗ ERROR: ${error.message}${RESET}`);
    }
  }

  // Check for orphan files (files not in manifest)
  console.log(`\n${BLUE}Checking for orphan files:${RESET}\n`);

  const files = fs.readdirSync(QR_DIR);
  const qrFiles = files.filter(
    (f) => f.startsWith("qr-") && f.endsWith(".png"),
  );
  const manifestFiles = manifest.qrCodes.map((qr) => qr.filename);
  const orphans = qrFiles.filter((f) => !manifestFiles.includes(f));

  if (orphans.length > 0) {
    warnings++;
    console.log(`${YELLOW}⚠ Found ${orphans.length} orphan file(s):${RESET}`);
    orphans.forEach((file) => {
      console.log(`  - ${file}`);
      warningsList.push(`Orphan file: ${file}`);
    });
  } else {
    console.log(`${GREEN}✓ No orphan files found${RESET}`);
  }

  // Print summary
  console.log(
    `\n${BLUE}═══════════════════════════════════════════════════════════${RESET}`,
  );
  console.log(
    `${BLUE}                          SUMMARY                             ${RESET}`,
  );
  console.log(
    `${BLUE}═══════════════════════════════════════════════════════════${RESET}\n`,
  );

  console.log(`  Total Tests: ${totalTests}`);
  console.log(`  ${GREEN}✓ Passed: ${passed}${RESET}`);
  console.log(`  ${RED}✗ Failed: ${failed}${RESET}`);
  console.log(`  ${YELLOW}⚠ Warnings: ${warnings}${RESET}\n`);

  // Print errors
  if (errors.length > 0) {
    console.log(`${RED}ERRORS:${RESET}\n`);
    errors.forEach((error) => {
      console.log(`  ${RED}✗${RESET} ${error}\n`);
    });
  }

  // Print warnings
  if (warningsList.length > 0) {
    console.log(`${YELLOW}WARNINGS:${RESET}\n`);
    warningsList.forEach((warning) => {
      console.log(`  ${YELLOW}⚠${RESET} ${warning}`);
    });
    console.log("");
  }

  // Final verdict
  if (failed === 0) {
    console.log(`${GREEN}✅ All QR codes are working properly!${RESET}\n`);
    process.exit(0);
  } else {
    console.log(
      `${RED}❌ Some QR codes have issues. Please review the errors above.${RESET}\n`,
    );
    process.exit(1);
  }
}

// Check dependencies
try {
  require.resolve("pngjs");
  require.resolve("jsqr");
} catch (error) {
  console.error(`${RED}Missing required dependencies!${RESET}`);
  console.log("\nPlease install them by running:");
  console.log("  npm install --save-dev pngjs jsqr\n");
  process.exit(1);
}

// Run the verification
verifyQRCodes().catch((error) => {
  console.error(`${RED}Fatal error: ${error.message}${RESET}`);
  process.exit(1);
});
