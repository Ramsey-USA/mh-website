import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import {
  breadcrumbPatterns,
  generateBreadcrumbSchema,
} from "@/lib/seo/breadcrumb-schema";
import { CoolDesertNightsPageClient } from "./CoolDesertNightsPageClient";

const coolDesertNightsSeoTitle = buildDualSeoTitle(
  "coolDesertNights",
  "2026 Archive and Smoke n Shine Placements",
);

export const metadata: Metadata = withGeoMetadata({
  title: coolDesertNightsSeoTitle,
  description:
    "Archive page for MH Construction's Cool Desert Nights 2026 participation, including Smoke n Shine placement highlights and event recap. For current and upcoming sponsored or hosted activities, visit the MH Construction Events hub.",
  keywords: [
    "Cool Desert Nights 2026",
    "Smoke n Shine placements",
    "MH Construction event archive",
    "Tri-Cities community event recap",
    "Pasco Richland Kennewick events",
    "construction community events",
  ],
  alternates: {
    canonical: "https://www.mhc-gc.com/cool-desert-nights",
  },
  openGraph: {
    title: coolDesertNightsSeoTitle,
    description:
      "Archive recap of Cool Desert Nights 2026 and Smoke n Shine placements from MH Construction. For current and upcoming events, visit the Events hub.",
    url: "https://www.mhc-gc.com/cool-desert-nights",
    images: [
      {
        url: "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction Cool Desert Nights 2026 archive highlights",
      },
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction community event archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: coolDesertNightsSeoTitle,
    description:
      "Review 2026 Cool Desert Nights highlights and Smoke n Shine results from MH Construction.",
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
