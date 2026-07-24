import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";
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
    "Dedicated event page for MH Construction's annual hosted community fishing event in Richland, Washington, with veteran and volunteer captain registration, roster status visibility, and confirmed schedule details.",
  keywords: [
    "veteran fishing event Richland WA",
    "Operation Cast and Recover",
    "Operation Cast and Recover event status",
    "Operation Cast and Recover confirmed schedule",
    "Operation Cast and Recover registration path",
    "veteran challenge coin event",
    "Columbia River veteran fishing",
    "Tri-Cities veteran events",
    "volunteer fishing captain Richland",
    "MH Construction community events",
    "Columbia Point Marina event",
    "Richland Washington fishing event",
    "veteran community partnership event",
  ],
  alternates: { canonical: EVENT_URL },
  openGraph: {
    title: operationCastRecoverSeoTitle,
    description:
      "Track Operation: Cast & Recover event status, confirmed timeline, and registration paths for veteran participants and volunteer captains on the Columbia River.",
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
      "View the Operation: Cast & Recover registration route with roster status, schedule clarity, and Challenge Coin presentation highlights.",
    images: ["/images/events/operation-cast-recover/columbia-point-marina.jpg"],
  },
});

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Operation: Cast & Recover",
  description:
    "MH Construction's annual hosted community fishing event with veteran and volunteer captain registration, a confirmed operational schedule, and commemorative Challenge Coin recognition.",
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

export default async function OperationCastRecoverPage() {
  const isEs = (await getServerLocale()) === "es";

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: isEs ? "Inicio" : "Home", url: SITE_URL },
          { name: isEs ? "Eventos" : "Events", url: `${SITE_URL}/events` },
          {
            name: isEs
              ? "Operación: Lanza y Regresa"
              : "Operation: Cast & Recover",
            url: EVENT_URL,
          },
        ])}
      />
      <StructuredData data={eventSchema} />
      <OperationCastRecoverPageClient isEs={isEs} />
    </>
  );
}
