import type { MetadataRoute } from "next";
import { getCanonicalSiteOrigin } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const normalizedBaseUrl = getCanonicalSiteOrigin();
  const host = new URL(normalizedBaseUrl).hostname;
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "Claude-Web",
    "PerplexityBot",
    "Perplexity-User",
    "CCBot",
    "Applebot",
    "Bytespider",
  ];
  const disallow = [
    "/api/",
    "/admin/",
    "/dashboard/",
    "/private/",
    "/security/",
    "/logs/",
    "/monitoring/",
  ];

  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow,
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow,
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow,
        crawlDelay: 1,
      },
    ],
    sitemap: [
      `${normalizedBaseUrl}/sitemap.xml`,
      `${normalizedBaseUrl}/sitemap-index.xml`,
    ],
    host,
  };
}
