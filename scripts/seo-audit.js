#!/usr/bin/env node

/**
 * SEO Audit Script
 *
 * Run this script to audit all pages and generate an SEO report
 * Usage: node scripts/seo-audit.js
 */

const fs = require("fs");
const path = require("path");

// Import SEO utilities (would need proper setup in real implementation)
const ACTIVE_PAGES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/team",
  "/contact",
  "/booking",
  "/careers",
  "/government",
  "/trade-partners",
  "/estimator",
  "/urgent",
  "/3d-explorer",
];

const SEO_RULES = {
  title: { minLength: 30, maxLength: 60, optimal: 50 },
  description: { minLength: 120, maxLength: 160, optimal: 150 },
  keywords: { min: 3, max: 15, optimal: 7 },
};

function generateSEOAudit() {
  console.log("\n🔍 SEO AUDIT REPORT");
  console.log("=".repeat(80));
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(`Total Pages: ${ACTIVE_PAGES.length}\n`);

  const results = {
    totalPages: ACTIVE_PAGES.length,
    passing: 0,
    warnings: 0,
    errors: 0,
    pages: [],
  };

  ACTIVE_PAGES.forEach((page) => {
    const pageResults = auditPage(page);
    results.pages.push(pageResults);

    if (pageResults.score >= 90) results.passing++;
    else if (pageResults.score >= 70) results.warnings++;
    else results.errors++;

    console.log(`\n📄 ${page}`);
    console.log(
      `   Score: ${pageResults.score}/100 ${getScoreEmoji(pageResults.score)}`,
    );

    if (pageResults.issues.length > 0) {
      pageResults.issues.forEach((issue) => {
        console.log(
          `   ${issue.type === "error" ? "❌" : "⚠️"}  ${issue.message}`,
        );
      });
    } else {
      console.log("   ✅ All checks passed");
    }
  });

  console.log("\n" + "=".repeat(80));
  console.log("SUMMARY");
  console.log("=".repeat(80));
  console.log(`✅ Passing: ${results.passing} pages (≥90)`);
  console.log(`⚠️  Warnings: ${results.warnings} pages (70-89)`);
  console.log(`❌ Errors: ${results.errors} pages (<70)`);

  const avgScore =
    results.pages.reduce((sum, p) => sum + p.score, 0) / results.pages.length;
  console.log(
    `\n📊 Average Score: ${Math.round(avgScore)}/100 ${getScoreEmoji(avgScore)}`,
  );

  if (avgScore >= 90)
    console.log("🎉 Status: EXCELLENT - Site SEO is optimized!");
  else if (avgScore >= 80)
    console.log("✅ Status: GOOD - Minor improvements recommended");
  else if (avgScore >= 70)
    console.log("⚠️  Status: NEEDS IMPROVEMENT - Action recommended");
  else console.log("❌ Status: POOR - Immediate action required");

  console.log("\n");

  // Write JSON report
  const reportPath = path.join(__dirname, "..", "seo-audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📝 Detailed report saved to: ${reportPath}\n`);

  return results;
}

function auditPage(pathname) {
  const issues = [];
  let score = 100;

  // Check if page has metadata file or uses layout metadata
  const hasMetadata = checkMetadataExists(pathname);
  if (!hasMetadata) {
    issues.push({
      type: "warning",
      message:
        "Using default layout metadata - consider adding page-specific metadata",
    });
    score -= 10;
  }

  // Check sitemap inclusion
  const inSitemap = checkSitemapInclusion(pathname);
  if (!inSitemap) {
    issues.push({
      type: "error",
      message: "Page not found in sitemap.ts",
    });
    score -= 30;
  }

  // Check page file exists
  const pageExists = checkPageExists(pathname);
  if (!pageExists) {
    issues.push({
      type: "error",
      message: "Page file does not exist",
    });
    score -= 50;
  }

  return {
    pathname,
    score: Math.max(0, score),
    issues,
    hasMetadata,
    inSitemap,
    pageExists,
  };
}

function checkMetadataExists(pathname) {
  // Check for page-specific metadata in page.tsx
  const pagePath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    pathname === "/" ? "page.tsx" : `${pathname}/page.tsx`,
  );

  // Check for layout-specific metadata in layout.tsx
  const layoutPath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    pathname === "/" ? "layout.tsx" : `${pathname}/layout.tsx`,
  );

  try {
    // Check page.tsx first
    if (fs.existsSync(pagePath)) {
      const pageContent = fs.readFileSync(pagePath, "utf-8");
      if (
        pageContent.includes("export const metadata") ||
        pageContent.includes("export function generateMetadata")
      ) {
        return true;
      }
    }

    // Check layout.tsx
    if (fs.existsSync(layoutPath)) {
      const layoutContent = fs.readFileSync(layoutPath, "utf-8");
      if (
        layoutContent.includes("export const metadata") ||
        layoutContent.includes("export function generateMetadata")
      ) {
        return true;
      }
    }

    return false;
  } catch {
    return false;
  }
}

function checkSitemapInclusion(pathname) {
  try {
    const sitemapPath = path.join(__dirname, "..", "src", "app", "sitemap.ts");
    const content = fs.readFileSync(sitemapPath, "utf-8");
    return content.includes(`"${pathname}"`);
  } catch {
    return false;
  }
}

function checkPageExists(pathname) {
  const pagePath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    pathname === "/" ? "page.tsx" : `${pathname}/page.tsx`,
  );
  return fs.existsSync(pagePath);
}

function getScoreEmoji(score) {
  if (score >= 90) return "🟢";
  if (score >= 80) return "🟡";
  if (score >= 70) return "🟠";
  return "🔴";
}

// Run audit
if (require.main === module) {
  try {
    const results = generateSEOAudit();

    // Exit with error code if there are critical issues
    const criticalIssues = results.pages.filter((p) => p.score < 70).length;
    if (criticalIssues > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error running SEO audit:", error.message);
    process.exit(1);
  }
}

module.exports = { generateSEOAudit, auditPage };
