/**
 * DEAD FILE — Next.js App Router does NOT consume metadata exports from metadata.ts.
 * Active metadata is exported from layout.tsx (which calls getTradePartnersSEO() from page-seo-utils.ts).
 * This file is kept for reference only.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Allies \u2192 Partners | Strategic Partnerships Built on Trust & Mutual Success",
  description:
    "Join MH Construction's trade partner network. Subcontractor opportunities with a veteran-owned Tri-Cities GC. Fair pay, consistent project flow, mutual success.",
  keywords: [
    "Allies Partners strategic partnerships",
    "ROI is the relationship",
    "elite trade partner network",
    "trusted construction alliances",
    "dual-label partnership approach",
    "service-earned partner values",
    "allies",
    "trade partners",
    "subcontractor opportunities",
    "construction partnerships",
    "subcontractor network",
    "trade contractor opportunities",
    "construction vendor",
    "partner with contractor",
    "Tri-Cities subcontractors",
    "Richland trade partner network",
    "Pasco subcontractor work",
    "Kennewick construction partnerships",
    "Benton County subcontractors",
    "Franklin County trade partners",
    "veteran-owned partnerships",
  ],
  openGraph: {
    title: "Allies → Partners | Strategic Partnerships - MH Construction",
    description:
      "Join MH Construction's trade partner network. Subcontractor opportunities with a veteran-owned Tri-Cities GC. Fair pay, consistent project flow, mutual success.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/allies",
    siteName: "MH Construction",
    images: [
      {
        url: "https://www.mhc-gc.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction \u2014 Trade Partners & Allies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Allies \u2192 Partners | Strategic Partnerships - MH Construction",
    description:
      "Join MH Construction's trade partner network. Subcontractor opportunities with a veteran-owned Tri-Cities GC. Fair pay, consistent project flow, mutual success.",
    images: ["https://www.mhc-gc.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/allies",
  },
  robots: {
    index: true,
    follow: true,
  },
};
