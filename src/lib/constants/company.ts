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
    admin: "matt@mhc-gc.com",
    superintendent: "arnold@mhc-gc.com",
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
    linkedin:
      "https://www.linkedin.com/company/mh-construction-general-contractor/",
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
    bbbAccredited: true,
    bbbAccreditedSince: "2026-04-07", // April 7, 2026
    bbbRating: "A+",
  },

  // Better Business Bureau
  bbb: {
    profileUrl:
      "https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036",
    sealClickUrl:
      "https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036/#sealclick",
    // Horizontal seals (200x42)
    sealHorizontal:
      "https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-200-42-bbb-1000191036.png",
    sealHorizontalWhite:
      "https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-200-42-whitetxt-bbb-1000191036.png",
    // Vertical seals (187x130)
    sealVertical:
      "https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-187-130-bbb-1000191036.png",
    sealVerticalWhite:
      "https://seal-alaskaoregonwesternwashington.bbb.org/seals/blue-seal-187-130-whitetxt-bbb-1000191036.png",
    rating: "A+",
    accreditedSince: "April 7, 2026",
  },

  // Travelers Insurance Partner
  travelers: {
    name: "Travelers Insurance",
    description: "Auto & Bonding Insurance Partner",
    website: "https://www.travelers.com",
    // Full logo with TRAVELERS text (black text - use on light backgrounds)
    logo: "/images/logo/travelers-logo.png",
    // Full logo with TRAVELERS text (white text - use on dark backgrounds)
    logoWhite: "/images/logo/travelers-logo-white.png",
    // Red umbrella only (icon-only contexts, works on any background)
    umbrellaLogo: "/images/logo/travelers-umbrella.png",
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
 * Email recipient lists for different purposes
 */
export const EMAIL_RECIPIENTS: {
  general: string[];
  contact: string[];
  careers: string[];
} = {
  general: [
    COMPANY_INFO.email.main,
    COMPANY_INFO.email.admin,
    COMPANY_INFO.email.superintendent,
  ],
  contact: [
    COMPANY_INFO.email.main,
    COMPANY_INFO.email.admin,
    COMPANY_INFO.email.superintendent,
  ],
  careers: [
    COMPANY_INFO.email.main,
    COMPANY_INFO.email.admin,
    COMPANY_INFO.email.superintendent,
  ],
};
