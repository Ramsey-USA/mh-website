/**
 * NOTE: This file is not consumed by Next.js App Router.
 * The active metadata for /projects is exported from layout.tsx via getProjectsSEO().
 * Kept for reference only.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Missions → Projects | Mission Success: 650+ Completed Operations | MH Construction",
  description:
    "650+ completed commercial, industrial & government projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla. Veteran-owned since 2025. 70% referral rate. Licensed WA, OR, ID.",
  keywords: [
    "construction portfolio Tri-Cities WA",
    "650 completed construction projects",
    "commercial construction projects Pacific Northwest",
    "light industrial construction portfolio",
    "government construction projects veteran-owned",
    "tenant improvement portfolio",
    "Richland construction projects",
    "Pasco construction portfolio",
    "Kennewick construction work",
    "Benton County construction portfolio",
    "Franklin County construction projects",
    "general contractor projects Tri-Cities",
    "Pacific Northwest construction",
  ],
  openGraph: {
    title: "Missions → Projects | 650+ Completed Projects - MH Construction",
    description:
      "650+ completed commercial, industrial & government projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla. Veteran-owned since 2025. 70% referral rate.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/projects",
    siteName: "MH Construction",
    images: [
      {
        url: "https://www.mhc-gc.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction Project Portfolio - 650+ Completed Projects Pacific Northwest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Missions → Projects | 650+ Completed - MH Construction",
    description:
      "650+ completed commercial, industrial & government projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla. Veteran-owned since 2025.",
    images: ["https://www.mhc-gc.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/projects",
  },
  robots: {
    index: true,
    follow: true,
  },
};
