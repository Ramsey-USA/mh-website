import { MetadataRoute } from "next";

/**
 * Dynamic Sitemap - Auto-adapts to new pages
 * To add a new page: just add it to ACTIVE_PAGES array below
 */

// ============================================================================
// ACTIVE PAGES REGISTRY - Add new pages here
// ============================================================================

const ACTIVE_PAGES = [
  { path: "/", priority: 1.0, changeFreq: "monthly" as const },
  { path: "/about", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/services", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/team", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/booking", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/careers", priority: 0.7, changeFreq: "weekly" as const },
  { path: "/government", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/trade-partners", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/estimator", priority: 0.95, changeFreq: "monthly" as const },
  { path: "/urgent", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/3d-explorer", priority: 0.5, changeFreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mhc-gc.com";
  const currentDate = new Date();

  // Auto-generate sitemap entries from registry
  return ACTIVE_PAGES.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));
}
