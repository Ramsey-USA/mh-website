import type { MetadataRoute } from "next";
import { ALL_CLUSTER_SLUGS } from "@/lib/data/safety-manual-clusters";
import { getFAQCategorySlugs } from "@/lib/data/faq-data";
import { getLocationSlugs } from "@/lib/data/locations";
import { getPublishedProjectCaseStudySlugs } from "@/lib/data/project-case-studies";

export const dynamic = "force-static";

/**
 * Dynamic Sitemap - Auto-adapts to new pages
 * To add a new page: just add it to ACTIVE_PAGES array below
 */

// ============================================================================
// ACTIVE PAGES REGISTRY - Ordered by SEO priority (highest to lowest)
// ============================================================================

const ACTIVE_PAGES = [
  // Priority 1.0 - Homepage (highest priority)
  { path: "/", priority: 1, changeFreq: "monthly" as const },

  // Priority 0.9 - Core business pages
  { path: "/about", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/jeremy-thamert", priority: 0.9, changeFreq: "monthly" as const },

  // Priority 0.85 - Veteran focus
  { path: "/veterans", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/faq", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/locations", priority: 0.82, changeFreq: "monthly" as const },

  // Priority 0.8 - Important secondary pages
  { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/services", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/public-sector", priority: 0.8, changeFreq: "monthly" as const },
  {
    path: "/veterans/public-sector-construction",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "/public-sector/veteran-led-compliance",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "/public-sector/tri-state-government-construction",
    priority: 0.78,
    changeFreq: "monthly" as const,
  },
  { path: "/testimonials", priority: 0.8, changeFreq: "weekly" as const },
  {
    path: "/cool-desert-nights",
    priority: 0.82,
    changeFreq: "weekly" as const,
  },
  { path: "/qr-codes", priority: 0.7, changeFreq: "monthly" as const },

  // Priority 0.7 - Supporting pages
  { path: "/team", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/careers", priority: 0.7, changeFreq: "weekly" as const },
  { path: "/allies", priority: 0.8, changeFreq: "monthly" as const },

  // Priority 0.75 - Resources hub
  { path: "/resources", priority: 0.75, changeFreq: "monthly" as const },

  // Priority 0.72 - Safety manual index pages
  {
    path: "/resources/safety-manual/contents",
    priority: 0.72,
    changeFreq: "monthly" as const,
  },
  {
    path: "/resources/safety-manual/forms",
    priority: 0.7,
    changeFreq: "monthly" as const,
  },

  // Priority 0.8 - Safety pages (MISH program documentation)
  { path: "/safety", priority: 0.8, changeFreq: "monthly" as const },

  // Priority 0.5 - Legal & informational pages
  { path: "/accessibility", priority: 0.5, changeFreq: "yearly" as const },
  { path: "/privacy", priority: 0.5, changeFreq: "yearly" as const },
  { path: "/terms", priority: 0.5, changeFreq: "yearly" as const },
];

const SAFETY_CLUSTER_PAGES = ALL_CLUSTER_SLUGS.map((clusterSlug) => ({
  path: `/resources/safety-manual/${clusterSlug}`,
  priority: 0.68,
  changeFreq: "monthly" as const,
}));

const LOCATION_PAGES = getLocationSlugs().map((city) => ({
  path: `/locations/${city}`,
  priority: 0.8,
  changeFreq: "monthly" as const,
}));

const X_DEFAULT = "x-default";
const LANG_EN_US = "en-US";
const LANG_ES_US = "es-US";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com"
  ).replace(/\/$/, "");
  const currentDate = new Date();

  // Auto-generate sitemap entries from registry
  const pageEntries = [
    ...ACTIVE_PAGES,
    ...LOCATION_PAGES,
    ...SAFETY_CLUSTER_PAGES,
  ].flatMap(({ path, priority, changeFreq }) =>
    buildLocaleEntries(path, baseUrl, currentDate, priority, changeFreq),
  );

  const projectEntries = buildDataRouteEntries(
    getPublishedProjectCaseStudySlugs().map((slug) => `/projects/${slug}`),
    baseUrl,
    currentDate,
    0.8,
  );

  const faqEntries = buildDataRouteEntries(
    getFAQCategorySlugs().map((slug) => `/faq/${slug}`),
    baseUrl,
    currentDate,
    0.75,
  );

  const entries = [...pageEntries, ...projectEntries, ...faqEntries];
  const uniqueByUrl = new Map(entries.map((entry) => [entry.url, entry]));

  return [...uniqueByUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
}

function buildDataRouteEntries(
  paths: string[],
  baseUrl: string,
  lastModified: Date,
  priority: number,
): MetadataRoute.Sitemap {
  const uniquePaths = [...new Set(paths)];

  return uniquePaths.flatMap((path) =>
    buildLocaleEntries(path, baseUrl, lastModified, priority, "monthly"),
  );
}

function buildLocaleEntries(
  path: string,
  baseUrl: string,
  lastModified: Date,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
): MetadataRoute.Sitemap {
  const normalizedPath = normalizePath(path);
  const enUrl = `${baseUrl}${normalizedPath}`;
  const enLocalizedUrl = `${baseUrl}${toLocalePath(normalizedPath, "en")}`;
  const esUrl = `${baseUrl}${toLocalePath(normalizedPath, "es")}`;
  const alternates = {
    languages: {
      [X_DEFAULT]: enUrl,
      [LANG_EN_US]: enLocalizedUrl,
      [LANG_ES_US]: esUrl,
    },
  };

  return [
    {
      url: enUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    },
    {
      url: enLocalizedUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    },
    {
      url: esUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates,
    },
  ];
}

function normalizePath(path: string): string {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

function toLocalePath(path: string, locale: "en" | "es"): string {
  const normalizedPath = normalizePath(path);
  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}
