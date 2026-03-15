/**
 * NOTE: This file is not consumed by Next.js App Router.
 * The active metadata for /team is exported from layout.tsx via getTeamSEO().
 * Kept for reference only.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Chain of Command → Our Team | 150+ Years Combined Military-Grade Expertise | MH Construction",
  description:
    "Meet MH Construction's veteran-led team: 150+ years combined expertise across all service branches. Jeremy Thamert (Army), Arnold Garcia VP. Serving Tri-Cities WA. Licensed WA, OR, ID.",
  keywords: [
    "MH Construction team leadership",
    "veteran-owned construction team Tri-Cities WA",
    "Jeremy Thamert Army veteran owner",
    "Arnold Garcia VP construction",
    "150 years combined construction experience",
    "all-branch veteran leadership",
    "construction project managers Tri-Cities",
    "veteran construction professionals",
    "Richland contractor team",
    "Pasco construction leadership",
    "Kennewick general contractor team",
    "Benton County construction experts",
    "Franklin County veteran leadership",
    "Pacific Northwest construction team",
    "Eastern Washington construction professionals",
    "veteran hiring construction company",
  ],
  openGraph: {
    title:
      "Chain of Command → Our Team | 150+ Years Military-Grade Expertise - MH Construction",
    description:
      "Meet MH Construction's veteran-led team: 150+ years combined expertise across all service branches. Jeremy Thamert (Army), Arnold Garcia VP. Serving Tri-Cities WA.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/team",
    siteName: "MH Construction",
    images: [
      {
        url: "https://www.mhc-gc.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction Team - Veteran-Led Construction Professionals Pacific Northwest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title:
      "Chain of Command → Our Team | 150+ Years Expertise - MH Construction",
    description:
      "Meet MH Construction's veteran-led team: 150+ years combined expertise. Jeremy Thamert (Army), Arnold Garcia VP. Serving Tri-Cities WA.",
    images: ["https://www.mhc-gc.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/team",
  },
  robots: {
    index: true,
    follow: true,
  },
};
