import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || COMPANY_INFO.urls.getSiteUrl();
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");
  const host = new URL(normalizedBaseUrl).hostname;
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
