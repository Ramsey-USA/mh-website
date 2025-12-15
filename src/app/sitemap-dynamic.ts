/**
 * Dynamic Sitemap Generator
 *
 * Automatically discovers and includes all pages in the application
 * Adapts to new routes without manual updates
 */

import type { MetadataRoute } from "next";
import { detectPageType, PAGE_CATEGORIES } from "@/lib/seo/auto-seo-manager";

// ============================================================================
// ACTIVE PAGES REGISTRY
// ============================================================================

/**
 * Register all active pages here
 * When you add a new page, just add it to this array
 */
export const ACTIVE_PAGES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/team",
  "/contact",
  // Removed: /booking (feature deprecated)
  "/careers",
  "/public-sector",
  "/allies",
  // Removed: /estimator (feature deprecated)
  "/urgent",
  // Removed: /3d-explorer (feature deprecated)
] as const;

/**
 * Pages to exclude from sitemap (admin, API routes, etc.)
 */
export const EXCLUDED_PATTERNS = [
  "/api/",
  "/admin/",
  "/dashboard/",
  "/_next/",
  "/private/",
  "/security/",
  "/monitoring/",
] as const;

// ============================================================================
// DYNAMIC SITEMAP GENERATION
// ============================================================================

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com";
  const currentDate = new Date();

  // Generate sitemap entries using auto-detection
  const entries = ACTIVE_PAGES.map((pathname) => {
    const pageType = detectPageType(pathname);
    const category = pageType ? PAGE_CATEGORIES[pageType] : null;

    return {
      url: `${baseUrl}${pathname}`,
      lastModified: currentDate,
      changeFrequency: (category?.changeFrequency ||
        "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: category?.priority || 0.5,
    };
  });

  return entries;
}

// ============================================================================
// SITEMAP UTILITIES
// ============================================================================

/**
 * Get all pages with their SEO data
 */
export function getAllPages() {
  return ACTIVE_PAGES.map((path) => ({
    path,
    type: detectPageType(path),
    url: `${process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com"}${path}`,
  }));
}

/**
 * Check if a path should be included in sitemap
 */
export function shouldIncludeInSitemap(pathname: string): boolean {
  // Check if path matches any exclusion pattern
  if (EXCLUDED_PATTERNS.some((pattern) => pathname.startsWith(pattern))) {
    return false;
  }

  // Must be in active pages list
  // ACTIVE_PAGES is a readonly tuple; narrow to string[] for runtime includes check
  return (ACTIVE_PAGES as readonly string[]).includes(pathname);
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats() {
  const pages = getAllPages();
  const byType = pages.reduce(
    (acc, page) => {
      const type = page.type || "unknown";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    totalPages: pages.length,
    byType,
    lastGenerated: new Date().toISOString(),
  };
}
