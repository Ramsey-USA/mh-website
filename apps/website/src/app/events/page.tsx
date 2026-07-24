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
    "Sponsored and hosted community events across Tri-Cities and the Pacific Northwest, including the annual Operation: Cast & Recover hosted event, archive placements, highlights, and upcoming event sections.",
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
        name: "Dedicated Event Pages (4)",
        item: { "@id": "https://www.mhc-gc.com/events#event-pages" },
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Annual Operation: Cast & Recover",
        item: { "@id": "https://www.mhc-gc.com/events#yearly-hosted-event" },
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Operation: Cast & Recover Fishing Event Ribbon",
        item: { "@id": "https://www.mhc-gc.com/events#fishing-event-ribbon" },
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Event Photo Carousel",
        item: { "@id": "https://www.mhc-gc.com/events#event-gallery" },
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Future Event Pipeline",
        item: { "@id": "https://www.mhc-gc.com/events#upcoming-events" },
      },
    ],
  },
};

export const metadata: Metadata = withGeoMetadata({
  title: eventsSeoTitle,
  description:
    "Explore MH Construction sponsored and hosted events in Pasco, Richland, and Kennewick, including dedicated pages for Operation: Cast & Recover, Cool Desert Nights, the upcoming BBQ contest route, and the annual IRONMAN 70.3 volunteer process page.",
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
      "Dedicated event pages for Operation: Cast & Recover, Cool Desert Nights, MH Construction's upcoming BBQ contest route, and the annual IRONMAN 70.3 volunteer process page.",
    url: "https://www.mhc-gc.com/events",
    images: [
      {
        url: "/images/events/operation-cast-recover/columbia-point-marina.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction Operation Cast & Recover fishing event highlights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: eventsSeoTitle,
    description:
      "See dedicated event pages for Operation: Cast & Recover, Cool Desert Nights, the upcoming BBQ contest route, and the annual IRONMAN 70.3 volunteer process page.",
    images: ["/images/events/operation-cast-recover/columbia-point-marina.jpg"],
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
      ? "Eventos patrocinados y organizados en Tri-Cities y el Noroeste del Pacífico, incluido el evento anual Operation: Cast & Recover, con historial, destacados y proximos eventos comunitarios."
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
