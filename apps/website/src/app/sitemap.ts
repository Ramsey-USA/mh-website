import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { ALL_CLUSTER_SLUGS } from "@/lib/data/safety-manual-clusters";
import { getFAQCategorySlugs } from "@/lib/data/faq-data";
import { getLocationSlugs } from "@/lib/data/locations";
import { getProjectCaseStudySlugs } from "@/lib/data/project-case-studies";
import { getServiceRouteSlugs } from "@/lib/data/service-routes";

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
  { path: "/services", priority: 0.9, changeFreq: "monthly" as const },

  // Priority 0.85 - Veteran focus
  { path: "/veterans", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/faq", priority: 0.85, changeFreq: "monthly" as const },
  { path: "/locations", priority: 0.82, changeFreq: "monthly" as const },

  // Priority 0.8 - Important secondary pages
  { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/projects", priority: 0.8, changeFreq: "weekly" as const },
  { path: "/public-sector", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/testimonials", priority: 0.8, changeFreq: "weekly" as const },

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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com";
  const currentDate = new Date();

  // Auto-generate sitemap entries from registry
  const pageEntries = [
    ...ACTIVE_PAGES,
    ...LOCATION_PAGES,
    ...SAFETY_CLUSTER_PAGES,
  ].map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));

  const serviceEntries = buildDataRouteEntries(
    getServiceRouteSlugs().map((slug) => `/services/${slug}`),
    baseUrl,
    currentDate,
    0.85,
  );

  const projectEntries = buildDataRouteEntries(
    getProjectCaseStudySlugs().map((slug) => `/projects/${slug}`),
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

  const mediaEntries = getMediaUrls().map((mediaUrl) => ({
    url: `${baseUrl}${mediaUrl}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: getMediaPriority(mediaUrl),
  }));

  return [
    ...pageEntries,
    ...serviceEntries,
    ...projectEntries,
    ...faqEntries,
    ...mediaEntries,
  ];
}

function buildDataRouteEntries(
  paths: string[],
  baseUrl: string,
  lastModified: Date,
  priority: number,
): MetadataRoute.Sitemap {
  const uniquePaths = [...new Set(paths)];

  return uniquePaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}

function getMediaUrls(): string[] {
  const publicDir = path.join(process.cwd(), "public");
  const targets = ["images", "videos"];
  const allowedExt = new Set([
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".gif",
    ".svg",
    ".mp4",
    ".webm",
    ".mov",
  ]);
  const urls: string[] = [];

  for (const target of targets) {
    const targetPath = path.join(publicDir, target);
    if (!fs.existsSync(targetPath)) {
      continue;
    }
    collectMediaUrls(targetPath, publicDir, allowedExt, urls);
  }

  return urls;
}

function collectMediaUrls(
  currentPath: string,
  publicDir: string,
  allowedExt: Set<string>,
  urls: string[],
) {
  const items = fs.readdirSync(currentPath, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(currentPath, item.name);
    if (item.isDirectory()) {
      collectMediaUrls(fullPath, publicDir, allowedExt, urls);
      continue;
    }

    const ext = path.extname(item.name).toLowerCase();
    if (!allowedExt.has(ext)) {
      continue;
    }

    const relative = fullPath.replace(publicDir, "").split(path.sep).join("/");
    urls.push(relative.startsWith("/") ? relative : `/${relative}`);
  }
}

function getMediaPriority(mediaUrl: string): number {
  const importantPatterns = [
    "zoom",
    "boom",
    "forklift",
    "safety",
    "job-site",
    "jobsite",
    "industrial",
  ];

  const lowered = mediaUrl.toLowerCase();
  return importantPatterns.some((pattern) => lowered.includes(pattern))
    ? 0.7
    : 0.4;
}
