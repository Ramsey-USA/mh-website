import { type Metadata } from "next";
import {
  getLocationEvidenceProfile,
  type LocationData,
} from "@/lib/data/locations";
import { COMPANY_INFO } from "@/lib/constants/company";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { createOgImageUrl } from "@/lib/seo/og-image";

/**
 * Generate standardized metadata for location pages
 * Eliminates duplication across all location pages
 *
 * @param location - Location data object containing SEO information
 * @returns Next.js Metadata object for the location page
 */
export function generateLocationMetadata(location: LocationData): Metadata {
  const siteUrl = COMPANY_INFO.urls.getSiteUrl();
  const ogImageUrl = createOgImageUrl("location", location.slug);
  const profile = getLocationEvidenceProfile(location.slug);
  const priorityKeywords = (location.servicePriorities || []).map(
    (service) => `${service} ${location.city} ${location.state}`,
  );
  const nearbyAreaKeywords = (location.nearbyAreas || []).map(
    (area) => `general contractor ${area}`,
  );
  // Project-name keywords surface verified completed work for geo-targeted searches.
  // Each project contributes both a named-project keyword and a category+city keyword
  // so search engines can match both specific project lookups and broader "who built X
  // type of thing in this city" queries.
  const projectKeywords = (location.recentProjects || []).flatMap((project) => [
    `${project.name} ${location.city}`,
    `${project.category} contractor ${location.city} ${location.state}`,
  ]);
  const zipKeywords = (location.serviceZipCodes || []).map(
    (zip) => `general contractor ${zip}`,
  );
  const missionPartnerKeywords = [
    `${location.city} facilities construction support`,
    `${location.city} municipal project planning`,
    `${location.city} mission-ready fit-outs contractor`,
    `${location.city} owner representative construction support`,
    `${location.city} mission-partner-aligned construction delivery`,
  ];

  const baseMetadata: Metadata = {
    title: location.seo.title,
    description: location.seo.metaDescription,
    keywords: [
      ...location.seo.keywords,
      ...priorityKeywords,
      ...nearbyAreaKeywords,
      ...projectKeywords,
      ...zipKeywords,
      ...missionPartnerKeywords,
    ],
    alternates: {
      canonical: `${siteUrl}/locations/${location.slug}`,
    },
    openGraph: {
      title: location.seo.title,
      description: location.seo.openGraphDescription,
      url: `${siteUrl}/locations/${location.slug}`,
      siteName: "MH Construction",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt:
            profile.presenceType === "office"
              ? `MH Construction office in ${location.city}, ${location.state}`
              : `MH Construction service area in ${location.city}, ${location.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `General Contractor ${location.city}, ${location.state} | MH Construction`,
      description: location.seo.twitterDescription,
      creator: "@mhc_gc",
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  if (profile.presenceType !== "office") {
    return baseMetadata;
  }

  return withGeoMetadata(baseMetadata, {
    placename: location.city,
    region: `US-${location.state}`,
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
  });
}
