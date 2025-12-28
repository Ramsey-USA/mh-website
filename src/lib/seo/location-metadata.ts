import { type Metadata } from "next";
import { type LocationData } from "@/lib/data/locations";
import { COMPANY_INFO } from "@/lib/constants/company";

/**
 * Generate standardized metadata for location pages
 * Eliminates duplication across all location pages
 *
 * @param location - Location data object containing SEO information
 * @returns Next.js Metadata object for the location page
 */
export function generateLocationMetadata(location: LocationData): Metadata {
  const siteUrl = COMPANY_INFO.urls.getSiteUrl();

  return {
    title: location.seo.title,
    description: location.seo.metaDescription,
    keywords: location.seo.keywords,
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
  };
}
