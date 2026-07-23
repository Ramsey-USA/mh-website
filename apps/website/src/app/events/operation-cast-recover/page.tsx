import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

import { OperationCastRecoverPageClient } from "./OperationCastRecoverPageClient";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const EVENT_URL = `${SITE_URL}/events/operation-cast-recover`;
const operationCastRecoverSeoTitle = buildDualSeoTitle(
  "events",
  "Operation: Cast & Recover",
);

export const metadata: Metadata = withGeoMetadata({
  title: operationCastRecoverSeoTitle,
  description:
    "Register as a veteran participant or volunteer boat captain for MH Construction's annual hosted community fishing event in Richland, Washington on September 26, 2026.",
  keywords: [
    "veteran fishing event Richland WA",
    "Operation Cast and Recover",
    "Columbia River veteran fishing",
    "Tri-Cities veteran events",
    "volunteer fishing captain Richland",
    "MH Construction community events",
  ],
  alternates: { canonical: EVENT_URL },
  openGraph: {
    title: operationCastRecoverSeoTitle,
    description:
      "An annual hosted community fishing event connecting veteran participants and volunteer captains on the Columbia River.",
    url: EVENT_URL,
    type: "website",
    images: [
      {
        url: "/images/events/operation-cast-recover/columbia-point-marina.jpg",
        width: 1920,
        height: 1080,
        alt: "Columbia Point Marina Park in Richland, Washington",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: operationCastRecoverSeoTitle,
    description:
      "Veteran and volunteer captain registration for September 26, 2026.",
    images: ["/images/events/operation-cast-recover/columbia-point-marina.jpg"],
  },
});

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Operation: Cast & Recover",
  description:
    "MH Construction's annual hosted community fishing event for veteran participants and volunteer boat captains.",
  startDate: "2026-09-26T05:00:00-07:00",
  endDate: "2026-09-26T15:00:00-07:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  url: EVENT_URL,
  image: `${SITE_URL}/images/events/operation-cast-recover/columbia-point-marina.jpg`,
  location: {
    "@type": "Place",
    name: "Columbia Point Marina Park",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Columbia Point at the Riverfront Trail",
      addressLocality: "Richland",
      addressRegion: "WA",
      postalCode: "99352",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: SITE_URL,
  },
};

export default function OperationCastRecoverPage() {
  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Events", url: `${SITE_URL}/events` },
          { name: "Operation: Cast & Recover", url: EVENT_URL },
        ])}
      />
      <StructuredData data={eventSchema} />
      <OperationCastRecoverPageClient />
    </>
  );
}
