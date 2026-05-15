import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import {
  breadcrumbPatterns,
  generateBreadcrumbSchema,
} from "@/lib/seo/breadcrumb-schema";
import { CoolDesertNightsPageClient } from "./CoolDesertNightsPageClient";

export const metadata: Metadata = withGeoMetadata({
  title:
    "Base HQ - Events | Cool Desert Nights 2026 Briefing | MH Construction",
  description:
    "Base HQ - Events briefing for Cool Desert Nights 2026: official schedule links, leadership coordination, and relationship-first pathways backed by MH Construction's service-earned values.",
  alternates: {
    canonical: "https://www.mhc-gc.com/cool-desert-nights",
  },
  openGraph: {
    title:
      "Base HQ - Events | Cool Desert Nights 2026 Briefing | MH Construction",
    description:
      "Base HQ - Events briefing for Cool Desert Nights 2026 with official schedule links, leadership coordination, and relationship-first pathways.",
    url: "https://www.mhc-gc.com/cool-desert-nights",
    images: [
      {
        url: "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
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
    title:
      "Base HQ - Events | Cool Desert Nights 2026 Briefing | MH Construction",
    description:
      "Base HQ - Events briefing for Cool Desert Nights 2026 with official schedule links, leadership coordination, and relationship-first pathways.",
    images: [
      "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
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
