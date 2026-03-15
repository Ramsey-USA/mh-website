/**
 * Breadcrumb Schema Generator
 * Helps search engines understand site hierarchy
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, _index) => ({
      "@type": "ListItem",
      position: _index + 1,
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
    { name: "Our Team", url: "https://www.mhc-gc.com/team" },
  ],
  contact: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Contact", url: "https://www.mhc-gc.com/contact" },
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
      name: "Government Projects",
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
  // Location pages
  locationRichland: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Richland, WA",
      url: "https://www.mhc-gc.com/locations/richland",
    },
  ],
  locationKennewick: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Kennewick, WA",
      url: "https://www.mhc-gc.com/locations/kennewick",
    },
  ],
  locationPasco: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    { name: "Pasco, WA", url: "https://www.mhc-gc.com/locations/pasco" },
  ],
  locationYakima: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    { name: "Yakima, WA", url: "https://www.mhc-gc.com/locations/yakima" },
  ],
  locationSpokane: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    { name: "Spokane, WA", url: "https://www.mhc-gc.com/locations/spokane" },
  ],
  locationWestRichland: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "West Richland, WA",
      url: "https://www.mhc-gc.com/locations/west-richland",
    },
  ],
  locationWallaWalla: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Walla Walla, WA",
      url: "https://www.mhc-gc.com/locations/walla-walla",
    },
  ],
  locationHermiston: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Hermiston, OR",
      url: "https://www.mhc-gc.com/locations/hermiston",
    },
  ],
  locationPendleton: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Pendleton, OR",
      url: "https://www.mhc-gc.com/locations/pendleton",
    },
  ],
  locationCoeurDAlene: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Coeur d'Alene, ID",
      url: "https://www.mhc-gc.com/locations/coeur-d-alene",
    },
  ],
  locationOmak: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Services", url: "https://www.mhc-gc.com/services" },
    {
      name: "Omak, WA",
      url: "https://www.mhc-gc.com/locations/omak",
    },
  ],
  // Removed: 3dExplorer breadcrumb (feature deprecated)
};
