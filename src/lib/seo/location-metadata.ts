import { type Metadata } from "next";
import { type LocationData } from "@/lib/data/locations";
import { COMPANY_INFO } from "@/lib/constants/company";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

/**
 * Generate standardized metadata for location pages
 * Eliminates duplication across all location pages
 *
 * @param location - Location data object containing SEO information
 * @returns Next.js Metadata object for the location page
 */
export function generateLocationMetadata(location: LocationData): Metadata {
  const siteUrl = COMPANY_INFO.urls.getSiteUrl();
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

  return withGeoMetadata(
    {
      title: location.seo.title,
      description: location.seo.metaDescription,
      keywords: [
        ...location.seo.keywords,
        ...priorityKeywords,
        ...nearbyAreaKeywords,
        ...projectKeywords,
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
      },
      twitter: {
        card: "summary_large_image",
        title: `General Contractor ${location.city} ${location.state} | MH Construction`,
        description: location.seo.twitterDescription,
        creator: "@mhc_gc",
      },
      robots: {
        index: true,
        follow: true,
      },
    },
    {
      placename: location.city,
      region: `US-${location.state}`,
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
  );
}
