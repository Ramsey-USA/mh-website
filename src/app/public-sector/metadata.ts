/**
 * DEAD FILE — Next.js App Router does NOT consume metadata exports from metadata.ts.
 * Active metadata is exported from layout.tsx (which calls getGovernmentSEO() from page-seo-utils.ts).
 * This file is kept for reference only.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Public Sector → Government | Veteran-Owned Excellence for Government Construction",
  description:
    "Veteran-owned Tri-Cities contractor for government & public sector construction. Federal compliance, grant support, bonding capacity. Pasco, WA.",
  keywords: [
    "Public Sector Government construction missions",
    "mission-ready construction operations",
    "federal compliance-driven standards",
    "veteran-owned government contractor",
    "dual-label public sector construction",
    "service-earned government values",
    "government construction",
    "federal construction services",
    "government contractor",
    "veteran-owned federal contractor",
    "military facility construction",
    "government project compliance",
    "federal contracting",
    "government building construction",
    "veteran federal contractor",
    "Tri-Cities government contractor",
    "Richland federal contractor",
    "Pasco government construction",
    "Hanford contractor services",
    "Benton County government projects",
    "Franklin County federal contractor",
  ],
  openGraph: {
    title:
      "Public Sector → Government | Veteran-Owned Excellence - MH Construction",
    description:
      "Veteran-owned Tri-Cities contractor for government & public sector construction. Federal compliance, grant support, bonding capacity. Pasco, WA.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/public-sector",
    siteName: "MH Construction",
    images: [
      {
        url: "https://www.mhc-gc.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction — Government & Public Sector",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title:
      "Public Sector → Government | Veteran-Owned Excellence - MH Construction",
    description:
      "Veteran-owned Tri-Cities contractor for government & public sector construction. Federal compliance, grant support, bonding capacity. Pasco, WA.",
    images: ["https://www.mhc-gc.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/public-sector",
  },
  robots: {
    index: true,
    follow: true,
  },
};
