import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/SeoMeta";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { IronmanVolunteerPageClient } from "./IronmanVolunteerPageClient";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const EVENT_URL = `${SITE_URL}/events/ironman-volunteer`;
const ironmanVolunteerSeoTitle = buildDualSeoTitle(
  "events",
  "IRONMAN 70.3 Volunteer Process",
);

export const metadata: Metadata = withGeoMetadata({
  title: ironmanVolunteerSeoTitle,
  description:
    "Dedicated event page for MH Construction's yearly volunteer process supporting Cuisine Solutions IRONMAN 70.3 Washington Tri-Cities, including event status, confirmed race date, official signup access, and local coordination pathways.",
  keywords: [
    "IRONMAN 70.3 Washington Tri-Cities volunteer",
    "Cuisine Solutions IRONMAN 70.3",
    "IRONMAN volunteer signup",
    "IRONMAN event status",
    "IRONMAN confirmed event date",
    "IRONMAN registration and participation path",
    "Tri-Cities triathlon volunteer process",
    "Richland triathlon volunteers",
    "Kennewick Pasco volunteer event",
    "community chamber partnerships",
    "MH Construction community volunteering",
    "September 20 2026 triathlon",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: EVENT_URL },
  openGraph: {
    title: ironmanVolunteerSeoTitle,
    description:
      "Track MH Construction's annual IRONMAN 70.3 volunteer process with current event status, confirmed race date, official signup routing, and local chamber coordination support.",
    url: EVENT_URL,
    type: "website",
    images: [
      {
        url: "/images/og-default.webp",
        width: 1200,
        height: 630,
        alt: "MH Construction IRONMAN 70.3 volunteer process page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ironmanVolunteerSeoTitle,
    description:
      "See the annual IRONMAN 70.3 volunteer process from MH Construction with event status, date confirmation, official signup guidance, and community coordination updates.",
    images: ["/images/og-default.webp"],
  },
});

export default async function IronmanVolunteerPage() {
  const isEs = (await getServerLocale()) === "es";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${EVENT_URL}#webpage`,
    name: isEs
      ? "Proceso de voluntariado IRONMAN 70.3"
      : "IRONMAN 70.3 Volunteer Process",
    description: isEs
      ? "Pagina dedicada al proceso anual de voluntariado de MH Construction para Cuisine Solutions IRONMAN 70.3 Washington Tri-Cities, con estado del evento, fecha confirmada, acceso al registro oficial y coordinacion local."
      : "Dedicated page for MH Construction's yearly volunteer process for Cuisine Solutions IRONMAN 70.3 Washington Tri-Cities, including event status, confirmed date, official signup access, and local coordination pathways.",
    url: EVENT_URL,
    isPartOf: {
      "@id": `${SITE_URL}/events#collection`,
    },
    inLanguage: isEs ? "es-US" : "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/og-default.webp`,
    },
    about: [
      "Cuisine Solutions IRONMAN 70.3 Washington Tri-Cities",
      isEs ? "Proceso anual de voluntariado" : "Annual volunteer process",
      "MH Construction",
    ],
  };

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: isEs ? "Inicio" : "Home", url: SITE_URL },
          { name: isEs ? "Eventos" : "Events", url: `${SITE_URL}/events` },
          {
            name: isEs
              ? "Voluntariado IRONMAN 70.3"
              : "IRONMAN 70.3 Volunteer Process",
            url: EVENT_URL,
          },
        ])}
      />
      <StructuredData data={pageSchema} />
      <IronmanVolunteerPageClient isEs={isEs} />
    </>
  );
}
