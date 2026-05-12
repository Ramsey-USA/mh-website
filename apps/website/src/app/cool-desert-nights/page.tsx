import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import {
  breadcrumbPatterns,
  generateBreadcrumbSchema,
} from "@/lib/seo/breadcrumb-schema";
import { CoolDesertNightsPageClient } from "./CoolDesertNightsPageClient";

export const metadata: Metadata = withGeoMetadata({
  title: "MHC Cool Desert Nights 2026 Hub | Smoke & Shine BBQ Showdown",
  description:
    "MHC Cool Desert Nights 2026 hub for the Smoke & Shine BBQ Showdown, fleet showcase, local leadership highlights, and event briefing and debrief updates.",
  alternates: {
    canonical: "https://www.mhc-gc.com/cool-desert-nights",
  },
  openGraph: {
    title: "MHC Cool Desert Nights 2026 Hub | Smoke & Shine BBQ Showdown",
    description:
      "MHC Cool Desert Nights 2026 hub for the Smoke & Shine BBQ Showdown, fleet showcase, local leadership highlights, and event briefing and debrief updates.",
    url: "https://www.mhc-gc.com/cool-desert-nights",
    images: [
      {
        url: "/images/events/cool-desert-nights/og-smoke-boss-2026.webp",
        width: 1200,
        height: 630,
        alt: "MHC Cool Desert Nights 2026 Smoke Boss event hub",
      },
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "MHC at Cool Desert Nights 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHC Cool Desert Nights 2026 Hub | Smoke & Shine BBQ Showdown",
    description:
      "MHC Cool Desert Nights 2026 hub for the Smoke & Shine BBQ Showdown, fleet showcase, local leadership highlights, and event briefing and debrief updates.",
    images: [
      "/images/events/cool-desert-nights/og-smoke-boss-2026.webp",
      "/images/og-default.webp",
    ],
  },
});

export default function CoolDesertNightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.coolDesertNights),
          ),
        }}
      />
      <CoolDesertNightsPageClient />
    </>
  );
}
