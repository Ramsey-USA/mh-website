import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import {
  breadcrumbPatterns,
  generateBreadcrumbSchema,
} from "@/lib/seo/breadcrumb-schema";
import { CoolDesertNightsPageClient } from "./CoolDesertNightsPageClient";

export const metadata: Metadata = withGeoMetadata({
  title: "MH Construction at Cool Desert Nights 2026 | Event Briefing",
  description:
    "MH Construction event briefing for Cool Desert Nights 2026, including schedule links, booth details, leadership collaboration, and event updates.",
  alternates: {
    canonical: "https://www.mhc-gc.com/cool-desert-nights",
  },
  openGraph: {
    title: "MH Construction at Cool Desert Nights 2026 | Event Briefing",
    description:
      "MH Construction event briefing for Cool Desert Nights 2026, including schedule links, booth details, leadership collaboration, and event updates.",
    url: "https://www.mhc-gc.com/cool-desert-nights",
    images: [
      {
        url: "/images/events/cool-desert-nights/og-smoke-boss-2026.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction Cool Desert Nights 2026 event briefing",
      },
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction at Cool Desert Nights 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MH Construction at Cool Desert Nights 2026 | Event Briefing",
    description:
      "MH Construction event briefing for Cool Desert Nights 2026, including schedule links, booth details, leadership collaboration, and event updates.",
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
