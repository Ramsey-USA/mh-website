/**
 * Company Information Constants
 *
 * Centralized source of truth for all MH Construction company information.
 * Import these constants instead of hardcoding values throughout the application.
 *
 * @example
 * import { COMPANY_INFO } from '@/lib/constants/company';
 *
 * <a href={`tel:${COMPANY_INFO.phone.tel}`}>{COMPANY_INFO.phone.display}</a>
 */

export const COMPANY_INFO = {
  // Company Identity
  name: "MH Construction",
  legalName: "MH Construction Incorporated - Veteran-Owned",

  // Contact Information
  phone: {
    display: "(509) 308-6489",
    tel: "+15093086489", // For tel: links
    raw: "5093086489", // For tracking/analytics
  },

  email: {
    main: "office@mhc-gc.com",
    owner: "matt@mhc-gc.com",
  },

  // Physical Address
  address: {
    street: "3111 N. Capitol Ave.",
    city: "Pasco",
    state: "WA",
    stateCode: "WA",
    zip: "99301",
    country: "US",
    // Convenience formats
    full: "3111 N. Capitol Ave., Pasco, WA 99301",
    cityState: "Pasco, WA",
    cityStateZip: "Pasco, WA 99301",
  },

  // Geographic Coordinates
  coordinates: {
    latitude: 46.2396,
    longitude: -119.1006,
  },

  // Business Hours
  hours: {
    weekday: {
      open: "07:00",
      close: "16:00",
      display: "7:00 AM - 4:00 PM",
    },
    weekend: {
      open: null,
      close: null,
      display: "Closed",
    },
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61575511773974",
    instagram: "https://www.instagram.com/mh_construction_inc/reels/",
    linkedin: "https://linkedin.com/company/mhconstruction",
    youtube: "https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j",
    twitter: "https://x.com/mhc_gc",
    twitterHandle: "@mhc_gc",
  },

  // Company Details
  details: {
    foundingYear: 2010,
    veteranOwned: true,
    veteranOwnedSince: 2025, // January 2025
    licenses: ["WA", "OR", "ID"],
    serviceArea: "Pacific Northwest",
    primaryRegion: "Tri-Cities",
  },

  // Website URLs
  urls: {
    // Use environment variable with fallback
    site: process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
    // Convenience getters
    getSiteUrl: () =>
      process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  },
} as const;

/**
 * Schema.org formatted company information
 * Ready to use in structured data
 */
export const COMPANY_SCHEMA = {
  "@type": "GeneralContractor",
  name: COMPANY_INFO.name,
  legalName: COMPANY_INFO.legalName,
  telephone: COMPANY_INFO.phone.display,
  email: COMPANY_INFO.email.main,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.stateCode,
    postalCode: COMPANY_INFO.address.zip,
    addressCountry: COMPANY_INFO.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY_INFO.coordinates.latitude,
    longitude: COMPANY_INFO.coordinates.longitude,
  },
} as const;

/**
 * Email recipient lists for different purposes
 */
export const EMAIL_RECIPIENTS: {
  general: string[];
  contact: string[];
  careers: string[];
  urgent: string[];
} = {
  general: [COMPANY_INFO.email.main, COMPANY_INFO.email.owner],
  contact: [COMPANY_INFO.email.main, COMPANY_INFO.email.owner],
  careers: [COMPANY_INFO.email.main],
  urgent: [COMPANY_INFO.email.main, COMPANY_INFO.email.owner],
};
