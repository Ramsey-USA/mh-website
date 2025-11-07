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
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
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
  booking: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Book Consultation", url: "https://www.mhc-gc.com/booking" },
  ],
  careers: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Careers", url: "https://www.mhc-gc.com/careers" },
  ],
  estimator: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "AI Estimator", url: "https://www.mhc-gc.com/estimator" },
  ],
  government: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Government Projects", url: "https://www.mhc-gc.com/government" },
  ],
  tradePartners: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Trade Partners", url: "https://www.mhc-gc.com/trade-partners" },
  ],
  urgent: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Urgent Support", url: "https://www.mhc-gc.com/urgent" },
  ],
};
