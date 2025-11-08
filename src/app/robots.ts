import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/_next/",
          "/private/",
          "/security/",
          "*.json",
          "/logs/",
          "/monitoring/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
      {
        userAgent: "Edgebot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
