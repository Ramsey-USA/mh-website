import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";

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
  {
    path: "/locations/walla-walla",
    priority: 0.8,
    changeFreq: "monthly" as const,
  },
  {
    path: "/locations/west-richland",
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
  const baseUrl = "https://www.mhc-gc.com";
  const currentDate = new Date();

  // Auto-generate sitemap entries from registry
  const pageEntries = ACTIVE_PAGES.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: changeFreq,
    priority,
  }));

  const mediaEntries = getMediaUrls().map((mediaUrl) => ({
    url: `${baseUrl}${mediaUrl}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: getMediaPriority(mediaUrl),
  }));

  return [...pageEntries, ...mediaEntries];
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
