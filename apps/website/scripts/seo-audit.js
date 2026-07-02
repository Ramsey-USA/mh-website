#!/usr/bin/env node

/**
 * SEO Audit Script
 *
 * Run this script to audit all pages and generate an SEO report
 * Usage: node scripts/seo-audit.js
 */

const fs = require("fs");
const path = require("path");

const SEO_RULES = {
  title: { minLength: 30, maxLength: 60, optimal: 50 },
  description: { minLength: 120, maxLength: 160, optimal: 150 },
  keywords: { min: 3, max: 15, optimal: 7 },
};

// Keep this list aligned with src/lib/seo/geo-metadata.ts route strategy.
const COMPLIANCE_ROUTE_PREFIXES = [
  "/privacy",
  "/terms",
  "/accessibility",
  "/offline",
  "/not-found",
];

function generateSEOAudit() {
  const activePages = buildActivePages();

  console.log("\n🔍 SEO AUDIT REPORT");
  console.log("=".repeat(80));
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(`Total Pages: ${activePages.length}\n`);

  const results = {
    totalPages: activePages.length,
    passing: 0,
    warnings: 0,
    errors: 0,
    pages: [],
    routeInventory: [],
    keywordProfileSummary: {
      commercial: 0,
      foundational: 0,
    },
  };

  activePages.forEach((page) => {
    const pageResults = auditPage(page);
    results.pages.push(pageResults);
    results.routeInventory.push({
      pathname: pageResults.pathname,
      sourceType: pageResults.routeSource.sourceType,
      sourceRegistry: pageResults.routeSource.sourceRegistry,
      sourceFile: pageResults.routeSource.sourceFile,
    });
    results.keywordProfileSummary[pageResults.keywordProfile]++;

    if (pageResults.score >= 90) results.passing++;
    else if (pageResults.score >= 70) results.warnings++;
    else results.errors++;

    console.log(`\n📄 ${page}`);
    console.log(`   Keyword Profile: ${pageResults.keywordProfile}`);
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

  console.log("\nKEYWORD PROFILE DISTRIBUTION");
  console.log("-".repeat(80));
  console.log(
    `🧭 Commercial Profile: ${results.keywordProfileSummary.commercial} pages`,
  );
  console.log(
    `📘 Foundational Profile: ${results.keywordProfileSummary.foundational} pages`,
  );

  const profileRows = results.pages
    .map((page) => ({ pathname: page.pathname, profile: page.keywordProfile }))
    .sort((a, b) => a.pathname.localeCompare(b.pathname));

  profileRows.forEach((row) => {
    console.log(`   ${row.profile.padEnd(13)} ${row.pathname}`);
  });

  console.log("\nROUTE INVENTORY");
  console.log("-".repeat(80));
  results.routeInventory.forEach((route) => {
    const sourceLabel = route.sourceRegistry
      ? `${route.sourceType} · ${route.sourceRegistry}`
      : route.sourceType;

    console.log(`   ${sourceLabel.padEnd(34)} ${route.pathname}`);
    if (route.sourceFile) {
      console.log(`      ${route.sourceFile}`);
    }
  });

  console.log("\n");

  // Write JSON report
  const reportPath = path.join(__dirname, "..", "seo-audit-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📝 Detailed report saved to: ${reportPath}\n`);

  return results;
}

function buildActivePages() {
  const pages = new Set([
    "/",
    "/about",
    "/projects",
    "/team",
    "/contact",
    "/veterans",
    "/faq",
    "/public-sector",
    "/testimonials",
    "/allies",
    "/careers",
    "/privacy",
    "/terms",
    "/accessibility",
    "/locations",
  ]);

  const sitemapPath = path.join(__dirname, "..", "src", "app", "sitemap.ts");
  addPathsFromSourceFile(sitemapPath, /path:\s*"([^"]+)"/g, pages);

  const locationDataPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "data",
    "locations.ts",
  );
  addPrefixedSlugsFromSourceFile(
    locationDataPath,
    /slug:\s*"([^"]+)"/g,
    "/locations",
    pages,
  );

  const projectCaseStudiesPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "data",
    "project-case-studies.ts",
  );
  addPrefixedSlugsFromSourceFile(
    projectCaseStudiesPath,
    /slug:\s*"([^"]+)"/g,
    "/projects",
    pages,
  );

  const faqDataPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "data",
    "faq-data.ts",
  );
  addPrefixedSlugsFromSourceFile(
    faqDataPath,
    /id:\s*"([^"]+)"/g,
    "/faq",
    pages,
  );

  const safetyClustersPath = path.join(
    __dirname,
    "..",
    "src",
    "lib",
    "data",
    "safety-manual-clusters.ts",
  );
  addPrefixedSlugsFromSourceFile(
    safetyClustersPath,
    /slug:\s*"([^"]+)"/g,
    "/resources/safety-manual",
    pages,
  );

  return Array.from(pages).sort((a, b) => a.localeCompare(b));
}

function addPathsFromSourceFile(filePath, regex, pages) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const match of content.matchAll(regex)) {
      const routePath = match[1];
      if (routePath) {
        pages.add(routePath);
      }
    }
  } catch {
    // ignore missing source files in audit generation
  }
}

function addPrefixedSlugsFromSourceFile(filePath, regex, prefix, pages) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    for (const match of content.matchAll(regex)) {
      const slug = match[1];
      if (slug) {
        pages.add(`${prefix}/${slug}`);
      }
    }
  } catch {
    // ignore missing source files in audit generation
  }
}

function auditPage(pathname) {
  const issues = [];
  let score = 100;
  const keywordProfile = getKeywordProfileForPath(pathname);
  const dynamicRoute = getDynamicRouteInfo(pathname);
  const routeSource = getRouteSourceInfo(pathname, dynamicRoute);

  // Check if page has metadata file or uses layout metadata
  const hasMetadata = checkMetadataExists(pathname, dynamicRoute);
  if (!hasMetadata) {
    issues.push({
      type: "warning",
      message:
        "Using default layout metadata - consider adding page-specific metadata",
    });
    score -= 10;
  }

  // Check sitemap inclusion
  const inSitemap = checkSitemapInclusion(pathname, dynamicRoute);
  if (!inSitemap) {
    issues.push({
      type: "error",
      message: "Page not found in sitemap.ts",
    });
    score -= 30;
  }

  // Check page file exists
  const pageExists = checkPageExists(pathname, dynamicRoute);
  if (!pageExists) {
    issues.push({
      type: "error",
      message: "Page file does not exist",
    });
    score -= 50;
  }

  return {
    pathname,
    keywordProfile,
    routeSource,
    score: Math.max(0, score),
    issues,
    hasMetadata,
    inSitemap,
    pageExists,
  };
}

function getKeywordProfileForPath(pathname) {
  const isComplianceRoute = COMPLIANCE_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return isComplianceRoute ? "foundational" : "commercial";
}

function checkMetadataExists(pathname, dynamicRoute) {
  if (dynamicRoute) {
    if (
      !dynamicRoute.existsInRegistry ||
      !fs.existsSync(dynamicRoute.pageFile)
    ) {
      return false;
    }

    const content = fs.readFileSync(dynamicRoute.pageFile, "utf-8");
    return (
      content.includes("export const metadata") ||
      content.includes("export function generateMetadata") ||
      content.includes("export async function generateMetadata")
    );
  }

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

function checkSitemapInclusion(pathname, dynamicRoute) {
  try {
    const sitemapPath = path.join(__dirname, "..", "src", "app", "sitemap.ts");
    const content = fs.readFileSync(sitemapPath, "utf-8");

    if (dynamicRoute) {
      return (
        dynamicRoute.existsInRegistry &&
        content.includes(dynamicRoute.registryMarker)
      );
    }

    return content.includes(`"${pathname}"`);
  } catch {
    return false;
  }
}

function checkPageExists(pathname, dynamicRoute) {
  if (dynamicRoute) {
    return (
      dynamicRoute.existsInRegistry && fs.existsSync(dynamicRoute.pageFile)
    );
  }

  const pagePath = path.join(
    __dirname,
    "..",
    "src",
    "app",
    pathname === "/" ? "page.tsx" : `${pathname}/page.tsx`,
  );
  return fs.existsSync(pagePath);
}

function getDynamicRouteInfo(pathname) {
  const staticSafetyManualPaths = new Set([
    "/resources/safety-manual/contents",
    "/resources/safety-manual/forms",
  ]);

  if (staticSafetyManualPaths.has(pathname)) {
    return null;
  }

  const routeConfigs = [
    {
      prefix: "/locations/",
      pageFile: path.join(
        __dirname,
        "..",
        "src",
        "app",
        "locations",
        "[city]",
        "page.tsx",
      ),
      dataFile: path.join(
        __dirname,
        "..",
        "src",
        "lib",
        "data",
        "locations.ts",
      ),
      registryMarker: "getLocationSlugs",
    },
    {
      prefix: "/projects/",
      pageFile: path.join(
        __dirname,
        "..",
        "src",
        "app",
        "projects",
        "[slug]",
        "page.tsx",
      ),
      dataFile: path.join(
        __dirname,
        "..",
        "src",
        "lib",
        "data",
        "project-case-studies.ts",
      ),
      registryMarker: "getProjectCaseStudySlugs",
    },
    {
      prefix: "/faq/",
      pageFile: path.join(
        __dirname,
        "..",
        "src",
        "app",
        "faq",
        "[category]",
        "page.tsx",
      ),
      dataFile: path.join(__dirname, "..", "src", "lib", "data", "faq-data.ts"),
      registryMarker: "getFAQCategorySlugs",
    },
    {
      prefix: "/resources/safety-manual/",
      pageFile: path.join(
        __dirname,
        "..",
        "src",
        "app",
        "resources",
        "safety-manual",
        "[cluster]",
        "page.tsx",
      ),
      dataFile: path.join(
        __dirname,
        "..",
        "src",
        "lib",
        "data",
        "safety-manual-clusters.ts",
      ),
      registryMarker: "ALL_CLUSTER_SLUGS",
    },
  ];

  for (const config of routeConfigs) {
    if (!pathname.startsWith(config.prefix)) {
      continue;
    }

    const slug = pathname.slice(config.prefix.length);
    if (!slug || slug.includes("/")) {
      continue;
    }

    const existsInRegistry = hasSlugInSourceFile(config.dataFile, slug);
    return {
      pageFile: config.pageFile,
      existsInRegistry,
      registryMarker: config.registryMarker,
    };
  }

  return null;
}

function getRouteSourceInfo(pathname, dynamicRoute) {
  if (dynamicRoute) {
    return {
      sourceType: "dynamic route",
      sourceRegistry: dynamicRoute.registryMarker,
      sourceFile: dynamicRoute.pageFile,
    };
  }

  const staticRouteSource = getStaticRouteSourceInfo(pathname);
  return staticRouteSource;
}

function getStaticRouteSourceInfo(pathname) {
  const staticRouteFiles = {
    "/": "src/app/page.tsx",
    "/about": "src/app/about/layout.tsx",
    "/projects": "src/app/projects/layout.tsx",
    "/team": "src/app/team/layout.tsx",
    "/contact": "src/app/contact/layout.tsx",
    "/veterans": "src/app/veterans/layout.tsx",
    "/faq": "src/app/faq/layout.tsx",
    "/public-sector": "src/app/public-sector/layout.tsx",
    "/testimonials": "src/app/testimonials/layout.tsx",
    "/allies": "src/app/allies/layout.tsx",
    "/careers": "src/app/careers/layout.tsx",
    "/privacy": "src/app/privacy/layout.tsx",
    "/terms": "src/app/terms/layout.tsx",
    "/accessibility": "src/app/accessibility/layout.tsx",
    "/locations": "src/app/locations/page.tsx",
    "/safety": "src/app/safety/layout.tsx",
    "/resources": "src/app/resources/page.tsx",
    "/cool-desert-nights": "src/app/cool-desert-nights/page.tsx",
  };

  const sourceFile = staticRouteFiles[pathname];
  return {
    sourceType: "static route",
    sourceRegistry: sourceFile ? "src/app" : null,
    sourceFile: sourceFile ? sourceFile : null,
  };
}

function hasSlugInSourceFile(filePath, slug) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return (
      content.includes(`slug: "${slug}"`) || content.includes(`id: "${slug}"`)
    );
  } catch {
    return false;
  }
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

module.exports = { generateSEOAudit, auditPage, getKeywordProfileForPath };
