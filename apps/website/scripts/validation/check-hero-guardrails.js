#!/usr/bin/env node

/**
 * Hero Section Guardrails Validation Script
 * Enforces MH Branding Standards v7.2.0 compliance across all pages
 *
 * Standards enforced:
 * - Canonical hero class: "hero-section relative flex items-end justify-end text-white overflow-hidden"
 * - Height: "calc(100vh - var(--mh-nav-offset, 6.5rem))"
 * - Bottom-right text positioning
 * - PageNavigation component at absolute bottom
 * - Dual naming format (Military → Civilian)
 * - Page-specific mantra
 * - No CTA buttons or stats in hero
 *
 * @typedef {Object} HeroValidationResult
 * @property {string} file - The file path being validated
 * @property {boolean} isValid - Whether the hero section is compliant
 * @property {string[]} errors - Critical compliance errors
 * @property {string[]} warnings - Non-critical warnings
 */

const fs = require("fs");
const path = require("path");
const { HERO_SECTION_RULES } = require("./branding-rules.cjs");

/**
 * Validate that a hero section meets all MH Branding standards
 * @param {string} filePath - The file path being validated
 * @param {string} content - The file content to validate
 * @returns {HeroValidationResult}
 */
function validateHeroSection(filePath, content) {
  const errors = [];
  const warnings = [];

  // Check 1: Canonical hero class structure
  const hasCanonicalClass =
    HERO_SECTION_RULES.canonicalClassRegex.test(content) ||
    HERO_SECTION_RULES.canonicalClassRegexFlexible.test(content);

  if (!hasCanonicalClass) {
    errors.push(
      `Missing canonical hero class: "${HERO_SECTION_RULES.canonicalClass}"`,
    );
  }

  // Check 2: Proper height property
  const hasProperHeight = HERO_SECTION_RULES.heightRegex.test(content);

  if (!hasProperHeight) {
    errors.push(
      'Missing proper height: "calc(100vh - var(--mh-nav-offset, 6.5rem))"',
    );
  }

  // Check 3: PageNavigation component
  const hasPageNavigation = HERO_SECTION_RULES.hasPageNavigation.test(content);

  if (!hasPageNavigation) {
    errors.push("Missing PageNavigation component");
  }

  // Check 4: Dual naming format (Military → Civilian)
  const hasDualNaming = HERO_SECTION_RULES.hasDualNaming.test(content);

  if (!hasDualNaming) {
    warnings.push(
      'Missing dual naming format. Should include "Military → Civilian" pattern',
    );
  }

  // Check 5: Bottom-right positioning (ml-auto required)
  const hasBottomRightPositioning =
    HERO_SECTION_RULES.hasBottomRightPositioning.test(content);

  if (!hasBottomRightPositioning) {
    warnings.push("Missing bottom-right text positioning (ml-auto not found)");
  }

  // Check 6: No CTA buttons in hero section (look for suspicious patterns)
  const hasSuspiciousCTA =
    HERO_SECTION_RULES.suspiciousCTA.test(content) && /hero/.test(content);

  if (hasSuspiciousCTA) {
    warnings.push("Possible CTA buttons detected in hero section");
  }

  const isValid = errors.length === 0;

  return {
    file: filePath,
    isValid,
    errors,
    warnings,
  };
}

/**
 * Recursively scan the app directory for page files to validate
 * @returns {Promise<HeroValidationResult[]>}
 */
function scanPagesForCompliance() {
  const appDir = path.join(__dirname, "../../src/app");
  const results = [];
  const heroSectionClassRegex =
    /className\s*=\s*["'][^"']*hero-section[^"']*["']/;

  function scanDirectory(dir) {
    try {
      const entries = fs.readdirSync(dir);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Look for page.tsx or page.jsx in this directory
          const pageTsxPath = path.join(fullPath, "page.tsx");
          const pageJsxPath = path.join(fullPath, "page.jsx");

          if (fs.existsSync(pageTsxPath)) {
            const content = fs.readFileSync(pageTsxPath, "utf-8");
            if (heroSectionClassRegex.test(content)) {
              results.push(
                validateHeroSection(
                  path.relative(appDir, pageTsxPath),
                  content,
                ),
              );
            }
          } else if (fs.existsSync(pageJsxPath)) {
            const content = fs.readFileSync(pageJsxPath, "utf-8");
            if (heroSectionClassRegex.test(content)) {
              results.push(
                validateHeroSection(
                  path.relative(appDir, pageJsxPath),
                  content,
                ),
              );
            }
          }

          // Recurse into subdirectories (but not node_modules or hidden dirs)
          if (
            !entry.startsWith(".") &&
            !entry.startsWith("node_modules") &&
            entry !== "__pycache__"
          ) {
            scanDirectory(fullPath);
          }
        }
      }
    } catch (err) {
      console.error(`Error scanning ${dir}:`, err.message);
    }
  }

  scanDirectory(appDir);
  return results;
}

/**
 * Generate a formatted report of validation results
 * @param {HeroValidationResult[]} results
 */
function generateReport(results) {
  const compliant = results.filter((r) => r.isValid);
  const nonCompliant = results.filter((r) => !r.isValid);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);

  // Header
  console.log(
    "\n╔════════════════════════════════════════════════════════════════╗",
  );
  console.log(
    "║           MH BRANDING HERO SECTION GUARDRAILS REPORT            ║",
  );
  console.log(
    "╚════════════════════════════════════════════════════════════════╝\n",
  );

  // Summary
  console.log("📊 SUMMARY");
  console.log(`   Total Pages: ${results.length}`);
  console.log(`   ✅ Compliant: ${compliant.length}`);
  console.log(`   ❌ Non-Compliant: ${nonCompliant.length}`);
  console.log(`   ⚠️  Warnings: ${totalWarnings}\n`);

  // Errors
  if (nonCompliant.length > 0) {
    console.log("❌ COMPLIANCE ERRORS:");
    for (const result of nonCompliant) {
      console.log(`   \n   File: ${result.file}`);
      for (const error of result.errors) {
        console.log(`     • ${error}`);
      }
    }
    console.log();
  }

  // Warnings
  const withWarnings = results.filter((r) => r.warnings.length > 0);
  if (withWarnings.length > 0) {
    console.log("⚠️  WARNINGS:");
    for (const result of withWarnings) {
      console.log(`   \n   File: ${result.file}`);
      for (const warning of result.warnings) {
        console.log(`     • ${warning}`);
      }
    }
    console.log();
  }

  // Compliant pages list
  if (compliant.length > 0) {
    console.log(`✅ COMPLIANT PAGES (${compliant.length}):`);
    for (const result of compliant) {
      console.log(`   ${result.file}`);
    }
    console.log();
  }

  // Exit code
  const exitCode = nonCompliant.length > 0 ? 1 : 0;
  console.log(
    `Exit code: ${exitCode} ${
      exitCode === 0
        ? "(All pages compliant ✅)"
        : "(Fix errors and re-run validation ❌)"
    }\n`,
  );

  return exitCode;
}

// Main execution
async function main() {
  try {
    const results = scanPagesForCompliance();
    const exitCode = generateReport(results);
    process.exit(exitCode);
  } catch (error) {
    console.error("Fatal error during validation:", error.message);
    process.exit(1);
  }
}

main();
