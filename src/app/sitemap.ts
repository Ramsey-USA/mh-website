import type { MetadataRoute } from "next";

/**
 * Dynamic Sitemap - Auto-adapts to new pages
 * To add a new page: just add it to ACTIVE_PAGES array below
 */

// ============================================================================
// ACTIVE PAGES REGISTRY - Ordered by SEO priority (highest to lowest)
// ============================================================================

const ACTIVE_PAGES = [
  // Priority 1.0 - Homepage (highest priority)
  { path: "/", priority: 1.0, changeFreq: "monthly" as const },

  // Priority 0.9 - Core business pages
  { path: "/about", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/services", priority: 0.9, changeFreq: "monthly" as const },

  // Priority 0.85 - Veteran focus & urgent needs
  { path: "/veterans", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/urgent", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/faq", priority: 0.85, changeFreq: "monthly" as const },

  // Priority 0.8 - Important secondary pages
  { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/public-sector", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/testimonials", priority: 0.8, changeFreq: "weekly" as const },

  // Priority 0.8 - Location landing pages (SEO)
  {
    path: "/locations/richland",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "/locations/kennewick",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  { path: "/locations/pasco", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/locations/yakima", priority: 0.8, changeFreq: "monthly" as const },
  {
    path: "/locations/spokane",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },

  // Priority 0.7 - Supporting pages
  { path: "/team", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/careers", priority: 0.7, changeFreq: "weekly" as const },
  { path: "/allies", priority: 0.7, changeFreq: "monthly" as const },

  // Priority 0.5 - Legal & informational pages
  { path: "/accessibility", priority: 0.5, changeFreq: "yearly" as const },
  { path: "/privacy", priority: 0.5, changeFreq: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFreq: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com";
  const currentDate = new Date();

  // Auto-generate sitemap entries from registry
  return ACTIVE_PAGES.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));
}
