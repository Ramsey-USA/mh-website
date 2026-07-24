/**
 * Breadcrumb Schema Generator
 * Helps search engines understand site hierarchy
 */

import { getDualPageName } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { normalizeBreadcrumbTaxonomyLabel } from "@/lib/navigation/breadcrumb-taxonomy";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

function toDualSchemaLabel(name: string): string {
  return getDualPageName(name);
}

function toAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  const siteUrl = COMPANY_INFO.urls.getSiteUrl().replace(/\/$/, "");
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${siteUrl}${normalizedPath}`;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const normalizedItems = items
    .map((item, index) => {
      const url = toAbsoluteUrl(item.url);
      const name = toDualSchemaLabel(
        normalizeBreadcrumbTaxonomyLabel(item.name, {
          href: item.url,
          index,
        }),
      );
      return { name, url };
    })
    .filter((item) => item.name.length > 0 && item.url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((item, _index) => ({
      "@type": "ListItem",
      position: _index + 1,
      "@id": `${item.url}#breadcrumb-${_index + 1}`,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Common breadcrumb patterns for MH Construction pages
 */
export const breadcrumbPatterns = {
  services: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
  ],
  about: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "About", url: "https://www.mhc-gc.com/about" },
  ],
  projects: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Projects", url: "https://www.mhc-gc.com/projects" },
  ],
  team: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Team", url: "https://www.mhc-gc.com/team" },
  ],
  contact: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Contact", url: "https://www.mhc-gc.com/contact" },
  ],
  events: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Events", url: "https://www.mhc-gc.com/events" },
  ],
  // Removed: booking breadcrumb (feature deprecated Dec 2025)
  careers: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Careers", url: "https://www.mhc-gc.com/careers" },
  ],
  // Removed: estimator breadcrumb (feature deprecated Dec 2025)
  government: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    {
      name: "Government",
      url: "https://www.mhc-gc.com/public-sector",
    },
  ],
  publicSector: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Public Sector", url: "https://www.mhc-gc.com/public-sector" },
  ],
  allies: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Allies", url: "https://www.mhc-gc.com/allies" },
  ],
  tradePartners: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Trade Partners", url: "https://www.mhc-gc.com/allies" },
  ],
  veterans: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Veterans", url: "https://www.mhc-gc.com/veterans" },
  ],
  faq: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "FAQ", url: "https://www.mhc-gc.com/faq" },
  ],
  locations: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
  ],
  safety: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Safety Program", url: "https://www.mhc-gc.com/safety" },
  ],
  accessibility: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Accessibility", url: "https://www.mhc-gc.com/accessibility" },
  ],
  privacy: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Privacy Policy", url: "https://www.mhc-gc.com/privacy" },
  ],
  terms: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    {
      name: "Terms of Service",
      url: "https://www.mhc-gc.com/terms",
    },
  ],
  coolDesertNights: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    {
      name: "Events - Cool Desert Nights 2026",
      url: "https://www.mhc-gc.com/events/cool-desert-nights",
    },
  ],
  // Location pages
  locationRichland: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Richland, WA",
      url: "https://www.mhc-gc.com/locations/richland",
    },
  ],
  locationKennewick: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Kennewick, WA",
      url: "https://www.mhc-gc.com/locations/kennewick",
    },
  ],
  locationPasco: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    { name: "Pasco, WA", url: "https://www.mhc-gc.com/locations/pasco" },
  ],
  locationYakima: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    { name: "Yakima, WA", url: "https://www.mhc-gc.com/locations/yakima" },
  ],
  locationSpokane: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    { name: "Spokane, WA", url: "https://www.mhc-gc.com/locations/spokane" },
  ],
  locationTacoma: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    { name: "Tacoma, WA", url: "https://www.mhc-gc.com/locations/tacoma" },
  ],
  locationWestRichland: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "West Richland, WA",
      url: "https://www.mhc-gc.com/locations/west-richland",
    },
  ],
  locationWallaWalla: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Walla Walla, WA",
      url: "https://www.mhc-gc.com/locations/walla-walla",
    },
  ],
  locationHermiston: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Hermiston, OR",
      url: "https://www.mhc-gc.com/locations/hermiston",
    },
  ],
  locationPendleton: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Pendleton, OR",
      url: "https://www.mhc-gc.com/locations/pendleton",
    },
  ],
  locationCoeurDAlene: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Coeur d'Alene, ID",
      url: "https://www.mhc-gc.com/locations/coeur-d-alene",
    },
  ],
  locationOmak: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Locations", url: "https://www.mhc-gc.com/locations" },
    {
      name: "Omak, WA",
      url: "https://www.mhc-gc.com/locations/omak",
    },
  ],
  // Removed: 3dExplorer breadcrumb (feature deprecated)
};
