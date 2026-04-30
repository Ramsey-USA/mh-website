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
  legalName: "MH Construction, Inc.",

  // Brand Messaging
  slogan: {
    primary: "Building projects for the Client, NOT the Dollar",
    secondary: "THE ROI IS THE RELATIONSHIP",
  },
  tagline:
    "Founded 2010, Veteran-Owned Since January 2025 • BABAA (Build America, Buy America Act) Supporter",

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
    hr: "brittney@mhc-gc.com",
  },

  // Physical Address
  address: {
    street: "3111 N Capitol Ave",
    city: "Pasco",
    state: "WA",
    stateCode: "WA",
    zip: "99301",
    country: "US",
    // Convenience formats
    full: "3111 N Capitol Ave, Pasco, WA 99301",
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
    veteranOwnedSince: "January 2025",
    veteranOwnedSinceYear: 2025,
    licenses: ["WA", "OR", "ID"],
    serviceArea: "Tri-State Pacific Northwest (WA, OR, ID)",
    primaryRegion: "Tri-Cities (Pasco, Richland, Kennewick)",
    expansionRegion: "Montana (coming soon)",
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

  // Chamber of Commerce Memberships
  chambers: {
    pasco: {
      name: "Pasco Chamber of Commerce",
      memberDirectoryUrl:
        "https://pascochamber.org/construction-equipment-contractors/",
      // Color logo (use on light backgrounds)
      logo: "/images/credentials/Pasco-Chamber-logo-color-transparent.webp",
      // White logo (use on dark backgrounds)
      logoWhite: "/images/credentials/Pasco-Chamber-logo-white-fullsize.webp",
    },
    richland: {
      name: "Richland Chamber of Commerce",
      memberDirectoryUrl: "https://www.richlandchamber.org/member-directory",
      // Full color logo (works on light backgrounds)
      logo: "/images/credentials/Richland-Chamber-logo-full-color.webp",
      logoWhite: "/images/credentials/Richland-Chamber-logo-full-color.webp",
    },
    triCityRegional: {
      name: "Tri-City Regional Chamber of Commerce",
      memberDirectoryUrl:
        "https://web.tricityregionalchamber.com/Contractor-General/MH-Construction,-Inc-6318",
      // Horizontal logo (use on light backgrounds)
      logo: "/images/credentials/Kennewick-TriCity-Regional-Chamber-logo-horizontal.webp",
      logoWhite:
        "/images/credentials/Kennewick-TriCity-Regional-Chamber-logo-horizontal.webp",
    },
  },

  // Website URLs
  urls: {
    // Use environment variable with fallback
    site: process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
    // Convenience getters
    getSiteUrl: () =>
      process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  },

  // Associated General Contractors (AGC) — MH Construction is an AGC member
  agc: {
    /** AGC national BABAA resource hub — covers Build America, Buy America Act guidance */
    babaaResourceHub: "https://www.agc.org/babaa-resource-hub",
  },

  /**
   * Washington State Veteran Owned Business — display fields for WaVobBadge component.
   *
   * These fields (logo, alt, title) are the UI-specific surface needed by the
   * WaVobBadge component and any accreditation section that renders the badge image.
   * For strategy/status data (tier, level, certifyingBody, status), see
   * COMPANY_INFO.veteranCertifications.waVob below.
   */
  waVob: {
    /** Certification program page — Washington Department of Veterans Affairs */
    programUrl:
      "https://dva.wa.gov/veterans-service-members-and-their-families/veteran-owned-businesses",
    /** Local badge image (non-transparent background — must be used inside WaVobBadge component) */
    logo: "/images/logo/veteran-owned-business.jpg",
    alt: "Washington State Veteran Owned Business — Certified by WA DVA",
    title: "Washington State Veteran Owned Business Certification",
    certifiedYear: 2026,
  },

  /**
   * 4-Tier Veteran Owned Business Certification Program
   *
   * MH Construction pursues all four tiers to achieve maximum credibility
   * and procurement access across state, federal, and private/corporate channels.
   *
   * Tier 1 — State:            WA DVA VOB            ✅ Certified (2026)
   * Tier 2 — Federal:          SBA VetCert           🔄 Actively Pursuing
   * Tier 3 — Private/Corp #1:  NaVOBA                🔄 Actively Pursuing
   * Tier 4 — Private/Corp #2:  NVBDC                 🔄 Actively Pursuing
   *
   * When a tier reaches "certified" status, add its logo path here and create a
   * badge component (following the WaVobBadge pattern) for accreditation sections.
   */
  veteranCertifications: {
    /**
     * Tier 1 — State-Level Certification
     * Washington State Department of Veterans Affairs — Veteran Owned Business
     * STATUS: ✅ CERTIFIED (2026)
     * Rendered via WaVobBadge component (see src/components/ui/WaVobBadge.tsx).
     * For UI display fields (logo path, alt text, badge title), see COMPANY_INFO.waVob above —
     * that object is the display surface; this object is the strategy/status record.
     */
    waVob: {
      tier: 1,
      level: "state",
      name: "Washington State Veteran Owned Business",
      abbreviation: "WA VOB",
      certifyingBody: "Washington State Department of Veterans Affairs (WA DVA)",
      programUrl:
        "https://dva.wa.gov/veterans-service-members-and-their-families/veteran-owned-businesses",
      status: "certified",
      certifiedYear: 2026,
    },
    /**
     * Tier 2 — Federal Certification
     * U.S. Small Business Administration — Veteran Small Business Certification
     * STATUS: 🔄 ACTIVELY PURSUING
     * SBA VetCert is the federal government's official VOB/SDVOSB certification
     * required for VA and federal procurement set-asides.
     */
    sbaVetCert: {
      tier: 2,
      level: "federal",
      name: "SBA Veteran Small Business Certification",
      abbreviation: "SBA VetCert",
      certifyingBody: "U.S. Small Business Administration (SBA)",
      programUrl: "https://veterans.certify.sba.gov/",
      status: "in-pursuit",
    },
    /**
     * Tier 3 — Private/Corporate Certification #1
     * National Veteran-Owned Business Association
     * STATUS: 🔄 ACTIVELY PURSUING
     * NaVOBA certification opens corporate supplier diversity pipelines
     * and demonstrates commitment to veteran business recognition.
     */
    navoba: {
      tier: 3,
      level: "private-corporate",
      name: "NaVOBA Veteran Owned Business Certification",
      abbreviation: "NaVOBA",
      certifyingBody:
        "National Veteran-Owned Business Association (NaVOBA)",
      programUrl: "https://www.navoba.com/",
      status: "in-pursuit",
    },
    /**
     * Tier 4 — Private/Corporate Certification #2
     * National Veteran Business Development Council
     * STATUS: 🔄 ACTIVELY PURSUING
     * NVBDC is the nation's largest third-party certifier of veteran-owned
     * businesses, providing access to major corporate supplier diversity programs.
     */
    nvbdc: {
      tier: 4,
      level: "private-corporate",
      name: "NVBDC Veteran Owned Business Certification",
      abbreviation: "NVBDC",
      certifyingBody:
        "National Veteran Business Development Council (NVBDC)",
      programUrl: "https://nvbdc.org/",
      status: "in-pursuit",
    },
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
    COMPANY_INFO.email.hr, // Brittney handles HR/hiring coordination
  ],
};
