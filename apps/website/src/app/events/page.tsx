import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import {
  breadcrumbPatterns,
  generateBreadcrumbSchema,
} from "@/lib/seo/breadcrumb-schema";
import { StructuredData } from "@/components/seo/SeoMeta";
import { EventsLandingPageClient } from "./EventsLandingPageClient";
import { getServerLocale } from "@/lib/i18n/locale.server";

const eventsSeoTitle = buildDualSeoTitle(
  "events",
  "Sponsored and Hosted Community Events",
);

const eventsHubStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.mhc-gc.com/events#collection",
  name: "MH Construction Events Hub",
  description:
    "Sponsored and hosted community events across Tri-Cities and the Pacific Northwest, including archive placements, highlights, and upcoming event sections.",
  url: "https://www.mhc-gc.com/events",
  isPartOf: {
    "@type": "WebSite",
    name: "MH Construction",
    url: "https://www.mhc-gc.com",
  },
  provider: {
    "@id": "https://www.mhc-gc.com/#organization",
  },
  about: [
    "Community sponsorships",
    "Hosted events",
    "Local business partnerships",
    "Tri-Cities community engagement",
  ],
  mainEntity: {
    "@type": "ItemList",
    "@id": "https://www.mhc-gc.com/events#sections",
    name: "Events Hub Sections",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Smoke n Shine Team Placements",
        item: { "@id": "https://www.mhc-gc.com/events#featured-events" },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Event Photo Carousel",
        item: { "@id": "https://www.mhc-gc.com/events#event-gallery" },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Future Event Pipeline",
        item: { "@id": "https://www.mhc-gc.com/events#upcoming-events" },
      },
    ],
  },
};

export const metadata: Metadata = withGeoMetadata({
  title: eventsSeoTitle,
  description:
    "Explore MH Construction sponsored and hosted events in Pasco, Richland, and Kennewick, including archived Smoke n Shine placements, event media, and upcoming community engagements across WA, OR, and ID.",
  keywords: [
    "MH Construction events",
    "Tri-Cities community events",
    "Pasco sponsored events",
    "Richland hosted events",
    "Kennewick construction community",
    "Benton County contractor events",
    "Franklin County contractor events",
    "Washington Oregon Idaho construction events",
    "construction community sponsorships",
    "construction hosted events",
    "local business event partnerships",
  ],
  alternates: {
    canonical: "https://www.mhc-gc.com/events",
  },
  openGraph: {
    title: eventsSeoTitle,
    description:
      "Archived Smoke n Shine placements, event photos, and upcoming MH Construction community events across Tri-Cities and the Pacific Northwest.",
    url: "https://www.mhc-gc.com/events",
    images: [
      {
        url: "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction Smoke n Shine event highlights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: eventsSeoTitle,
    description:
      "See event recaps, gallery highlights, and upcoming MH Construction community engagements across Tri-Cities and the Pacific Northwest.",
    images: [
      "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
    ],
  },
});

export default async function EventsPage() {
  const isEs = (await getServerLocale()) === "es";

  const localizedCollectionSchema = {
    ...eventsHubStructuredData,
    name: isEs
      ? "Centro de Eventos de MH Construction"
      : eventsHubStructuredData.name,
    description: isEs
      ? "Eventos patrocinados y organizados en Tri-Cities y el Noroeste del Pacífico, con historial, destacados y próximos eventos comunitarios."
      : eventsHubStructuredData.description,
  };

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(breadcrumbPatterns.events)}
      />
      <StructuredData data={localizedCollectionSchema} />
      <EventsLandingPageClient locale={isEs ? "es" : "en"} />
    </>
  );
}
