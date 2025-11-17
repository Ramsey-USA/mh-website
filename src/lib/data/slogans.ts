/**
 * MH Construction Slogan Library
 *
 * Complete slogan definitions with dedicated page assignments.
 *
 * @see /docs/branding/strategy/slogan-rotation-guide.md - Full slogan guide
 *
 * Strategy:
 * - Tier 1 (Foundation): Core brand slogans - CAN be reused across pages
 * - Tier 2-5 (Specialized): Page-specific slogans - DEDICATED to specific pages
 */

/**
 * Slogan tier classification
 */
export enum SloganTier {
  /** Foundation slogans - Core brand identity - Can be reused */
  TIER_1_FOUNDATION = 1,

  /** Value-driven slogans - Page-specific - Dedicated */
  TIER_2_VALUE = 2,

  /** Action-oriented slogans - Conversion focus - Dedicated */
  TIER_3_ACTION = 3,

  /** Positioning slogans - Differentiation focus - Dedicated */
  TIER_4_POSITIONING = 4,

  /** Partnership-type specific - Audience-targeted - Dedicated */
  TIER_5_PARTNERSHIP = 5,
}

/**
 * Slogan tone classifications
 */
export type SloganTone =
  | "bold-distinctive"
  | "powerful-memorable"
  | "inviting-collaborative"
  | "professional-balanced"
  | "progressive-trustworthy"
  | "proud-service-oriented"
  | "confident-quality"
  | "empowering-precise"
  | "direct-action"
  | "honest-transparent"
  | "aspirational-complete"
  | "enduring-quality"
  | "balanced-reassuring"
  | "connected-capable"
  | "credible-experienced"
  | "collaborative-supportive"
  | "professional-b2b";

/**
 * Context where slogan is most appropriate
 */
export type SloganContext =
  | "hero"
  | "tagline"
  | "cta"
  | "section-heading"
  | "footer"
  | "signature"
  | "button"
  | "email"
  | "social-media"
  | "print";

/**
 * Complete slogan definition
 */
export interface Slogan {
  /** The slogan text */
  text: string;

  /** Tier classification */
  tier: SloganTier;

  /** Can this slogan be reused across multiple pages? */
  reusable: boolean;

  /** Tone characteristics */
  tone: SloganTone;

  /** Best contexts for usage */
  contexts: SloganContext[];

  /** Description and usage guidance */
  description: string;

  /** Pages where this slogan is assigned (if dedicated) */
  assignedPages?: string[];
}

/**
 * Complete slogan library (17 total slogans)
 */
export const SLOGANS: Record<string, Slogan> = {
  // ===== TIER 1: FOUNDATION SLOGANS (Reusable) =====

  BUILDING_FOR_OWNER: {
    text: "Building for the Client, NOT the Dollar",
    tier: SloganTier.TIER_1_FOUNDATION,
    reusable: true,
    tone: "bold-distinctive",
    contexts: ["hero", "tagline", "signature", "email"],
    description:
      "Primary brand tagline emphasizing owner-first philosophy and differentiation from profit-driven competitors",
    assignedPages: ["homepage", "business-cards", "email-signatures"],
  },

  ROI_IS_RELATIONSHIP: {
    text: "THE ROI IS THE RELATIONSHIP",
    tier: SloganTier.TIER_1_FOUNDATION,
    reusable: false,
    tone: "powerful-memorable",
    contexts: ["hero", "tagline", "footer"],
    description:
      "Trade Partner-specific slogan redefining ROI as relationship value rather than purely financial returns. ONLY used on Trade Partners and Urgent pages to emphasize partner relationships.",
    assignedPages: ["trade-partners-page", "urgent-page"],
  },

  BUILD_MORE_THAN_STRUCTURES: {
    text: "Let's Build More than Just Structures",
    tier: SloganTier.TIER_1_FOUNDATION,
    reusable: true,
    tone: "inviting-collaborative",
    contexts: ["cta", "hero", "button"],
    description:
      "Inviting CTA emphasizing relationship-building beyond physical construction",
    assignedPages: [
      "homepage",
      "contact-page",
      "booking-page",
      "3d-explorer-page",
    ],
  },

  // ===== TIER 2: VALUE-DRIVEN SLOGANS (Dedicated) =====

  PRECISION_MEETS_PARTNERSHIP: {
    text: "Where Precision Meets Partnership",
    tier: SloganTier.TIER_2_VALUE,
    reusable: false,
    tone: "professional-balanced",
    contexts: ["hero", "section-heading"],
    description:
      "Balances technical excellence with relationship focus for about/company positioning",
    assignedPages: ["about-page", "vehicle-wraps"],
  },

  TRUST_BUILT_PROJECT_BY_PROJECT: {
    text: "Trust Built, Project by Project",
    tier: SloganTier.TIER_2_VALUE,
    reusable: false,
    tone: "progressive-trustworthy",
    contexts: ["hero", "section-heading"],
    description:
      "Emphasizes progressive trust-building through proven track record",
    assignedPages: ["projects-page", "portfolio-page"],
  },

  VETERAN_VALUES_COMMUNITY_RESULTS: {
    text: "Veteran Values, Community-Focused Results",
    tier: SloganTier.TIER_2_VALUE,
    reusable: false,
    tone: "proud-service-oriented",
    contexts: ["hero", "section-heading"],
    description:
      "Highlights veteran heritage and community commitment for government/public sector work",
    assignedPages: ["government-projects-page", "team-page-culture-section"],
  },

  EXCELLENCE_IN_EVERY_DETAIL: {
    text: "Excellence in Every Detail",
    tier: SloganTier.TIER_2_VALUE,
    reusable: false,
    tone: "confident-quality",
    contexts: ["section-heading", "tagline"],
    description:
      "Quality commitment from military training applied to craftsmanship",
    assignedPages: [
      "services-page-quality-section",
      "careers-page-standards",
      "government-projects-page",
      "job-site-signs",
    ],
  },

  YOUR_VISION_OUR_PRECISION: {
    text: "Your Vision, Our Precision",
    tier: SloganTier.TIER_2_VALUE,
    reusable: false,
    tone: "empowering-precise",
    contexts: ["hero", "section-heading"],
    description:
      "Client-empowering slogan balancing vision ownership with professional precision execution",
    assignedPages: [
      "services-page",
      "estimator-page",
      "3d-explorer-page-visualization",
    ],
  },

  // ===== TIER 3: ACTION-ORIENTED SLOGANS (Dedicated) =====

  PARTNER_WITH_PRECISION: {
    text: "Partner with Precision",
    tier: SloganTier.TIER_3_ACTION,
    reusable: false,
    tone: "direct-action",
    contexts: ["cta", "button", "hero"],
    description:
      "Direct call-to-action combining partnership and precision themes",
    assignedPages: [
      "careers-page-hero",
      "contact-page-cta",
      "estimator-page-cta",
      "urgent-support-page",
    ],
  },

  BUILDING_TRUST_THROUGH_TRANSPARENCY: {
    text: "Building Trust Through Transparency",
    tier: SloganTier.TIER_3_ACTION,
    reusable: false,
    tone: "honest-transparent",
    contexts: ["section-heading", "tagline"],
    description:
      "Process-focused slogan emphasizing transparent communication and honest practices",
    assignedPages: [
      "services-page-process",
      "contact-page-promise",
      "estimator-page-pricing",
      "government-projects-page",
    ],
  },

  FROM_VISION_TO_VICTORY: {
    text: "From Vision to Victory",
    tier: SloganTier.TIER_3_ACTION,
    reusable: false,
    tone: "aspirational-complete",
    contexts: ["hero", "section-heading"],
    description:
      "Journey-focused slogan emphasizing complete project lifecycle success",
    assignedPages: [
      "projects-page-timeline",
      "booking-page-journey",
      "3d-explorer-page-hero",
    ],
  },

  RELATIONSHIPS_THAT_LAST: {
    text: "Relationships That Last, Projects That Endure",
    tier: SloganTier.TIER_3_ACTION,
    reusable: false,
    tone: "enduring-quality",
    contexts: ["section-heading", "tagline"],
    description:
      "Dual emphasis on lasting relationships and enduring construction quality",
    assignedPages: ["projects-page-results", "warranty-section"],
  },

  // ===== TIER 4: POSITIONING SLOGANS (Dedicated) =====

  BIG_ENOUGH_SMALL_ENOUGH: {
    text: "Big Enough to Scale, Small Enough to Stay Personal",
    tier: SloganTier.TIER_4_POSITIONING,
    reusable: false,
    tone: "balanced-reassuring",
    contexts: ["section-heading", "tagline"],
    description:
      "Positioning slogan addressing scalability concerns while emphasizing personal service",
    assignedPages: ["about-page-positioning"],
  },

  PACIFIC_NORTHWEST_ROOTS: {
    text: "Pacific Northwest Roots, Regional Reach",
    tier: SloganTier.TIER_4_POSITIONING,
    reusable: false,
    tone: "connected-capable",
    contexts: ["section-heading", "tagline"],
    description:
      "Geographic positioning showing local expertise with regional capability",
    assignedPages: ["trade-partners-page-network", "regional-content"],
  },

  COMBINED_EXCELLENCE: {
    text: "150+ Years of Combined Excellence",
    tier: SloganTier.TIER_4_POSITIONING,
    reusable: false,
    tone: "credible-experienced",
    contexts: ["section-heading", "tagline"],
    description:
      "Quantified experience positioning for credibility and expertise demonstration",
    assignedPages: ["team-page-expertise"],
  },

  // ===== TIER 5: PARTNERSHIP-TYPE SPECIFIC (Dedicated) =====

  YOUR_PROJECT_PARTNER: {
    text: "Your Project Partner",
    tier: SloganTier.TIER_5_PARTNERSHIP,
    reusable: false,
    tone: "collaborative-supportive",
    contexts: ["tagline", "section-heading"],
    description:
      "CLIENT PARTNERSHIPS ONLY - Simple partnership positioning for homeowners/businesses",
    assignedPages: ["booking-page-relationship", "client-facing-pages"],
  },

  BUILDING_PROFESSIONAL_PARTNERSHIPS: {
    text: "Building Professional Partnerships",
    tier: SloganTier.TIER_5_PARTNERSHIP,
    reusable: false,
    tone: "professional-b2b",
    contexts: ["hero", "tagline"],
    description:
      "TRADE PARTNERSHIPS ONLY - Professional B2B relationship focus for vendors/subcontractors",
    assignedPages: ["trade-partners-page-hero"],
  },
};

/**
 * Helper function to safely get slogan text
 */
const getSlogan = (key: string): string => {
  const slogan = SLOGANS[key];
  return slogan?.text || "";
};

/**
 * Page-specific slogan assignments
 *
 * Maps page routes/identifiers to their dedicated slogans
 */
export const PAGE_SLOGANS: Record<
  string,
  {
    hero?: string;
    tagline?: string;
    cta?: string;
    sections?: Record<string, string>;
  }
> = {
  // Homepage
  homepage: {
    hero: getSlogan("ROI_IS_RELATIONSHIP"),
    tagline: getSlogan("BUILDING_FOR_OWNER"),
    cta: getSlogan("BUILD_MORE_THAN_STRUCTURES"),
  },

  // About Page
  about: {
    hero: getSlogan("PRECISION_MEETS_PARTNERSHIP"),
    sections: {
      history: getSlogan("TRUST_BUILT_PROJECT_BY_PROJECT"),
      positioning: getSlogan("BIG_ENOUGH_SMALL_ENOUGH"),
    },
  },

  // Services Page
  services: {
    hero: getSlogan("YOUR_VISION_OUR_PRECISION"),
    sections: {
      quality: getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
      process: getSlogan("BUILDING_TRUST_THROUGH_TRANSPARENCY"),
    },
  },

  // Projects/Portfolio Page
  projects: {
    hero: getSlogan("TRUST_BUILT_PROJECT_BY_PROJECT"),
    sections: {
      timeline: getSlogan("FROM_VISION_TO_VICTORY"),
      results: getSlogan("RELATIONSHIPS_THAT_LAST"),
    },
  },

  // Team Page
  team: {
    hero: getSlogan("ROI_IS_RELATIONSHIP"),
    sections: {
      expertise: getSlogan("COMBINED_EXCELLENCE"),
      culture: getSlogan("VETERAN_VALUES_COMMUNITY_RESULTS"),
    },
  },

  // Careers Page
  careers: {
    hero: getSlogan("PARTNER_WITH_PRECISION"),
    tagline: getSlogan("ROI_IS_RELATIONSHIP"),
    sections: {
      standards: getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
    },
  },

  // Contact Page
  contact: {
    hero: getSlogan("BUILD_MORE_THAN_STRUCTURES"),
    tagline: getSlogan("BUILDING_TRUST_THROUGH_TRANSPARENCY"),
    cta: getSlogan("PARTNER_WITH_PRECISION"),
  },

  // Booking/Consultation Page
  booking: {
    hero: getSlogan("BUILD_MORE_THAN_STRUCTURES"),
    tagline: getSlogan("YOUR_PROJECT_PARTNER"),
    sections: {
      journey: getSlogan("FROM_VISION_TO_VICTORY"),
    },
  },

  // Government Projects Page
  "government-projects": {
    hero: getSlogan("VETERAN_VALUES_COMMUNITY_RESULTS"),
    sections: {
      compliance: getSlogan("BUILDING_TRUST_THROUGH_TRANSPARENCY"),
      quality: getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
    },
  },

  // Trade Partners Page
  "trade-partners": {
    hero: getSlogan("BUILDING_PROFESSIONAL_PARTNERSHIPS"),
    tagline: getSlogan("ROI_IS_RELATIONSHIP"),
    sections: {
      network: getSlogan("PACIFIC_NORTHWEST_ROOTS"),
    },
  },

  // Estimator/Calculator Page
  estimator: {
    hero: getSlogan("YOUR_VISION_OUR_PRECISION"),
    tagline: getSlogan("BUILDING_TRUST_THROUGH_TRANSPARENCY"),
    cta: getSlogan("PARTNER_WITH_PRECISION"),
  },

  // 3D Explorer Page
  "3d-explorer": {
    hero: getSlogan("FROM_VISION_TO_VICTORY"),
    tagline: getSlogan("YOUR_VISION_OUR_PRECISION"),
    cta: getSlogan("BUILD_MORE_THAN_STRUCTURES"),
  },

  // Urgent Support Page
  "urgent-support": {
    hero: getSlogan("PARTNER_WITH_PRECISION"),
    sections: {
      quality: getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
      reliability: getSlogan("VETERAN_VALUES_COMMUNITY_RESULTS"),
    },
  },
};

/**
 * Get slogan for a specific page and context
 *
 * @param page - Page identifier (e.g., 'homepage', 'about', 'services')
 * @param context - Context ('hero', 'tagline', 'cta', or section name)
 * @returns Slogan text or undefined if not found
 *
 * @example
 * ```ts
 * const heroSlogan = getSloganForPage('homepage', 'hero');
 * // Returns: "THE ROI IS THE RELATIONSHIP"
 *
 * const qualitySlogan = getSloganForPage('services', 'quality');
 * // Returns: "Excellence in Every Detail"
 * ```
 */
export function getSloganForPage(
  page: string,
  context: string,
): string | undefined {
  const pageSlogans = PAGE_SLOGANS[page];
  if (!pageSlogans) return undefined;

  // Check primary contexts
  if (context === "hero") return pageSlogans.hero;
  if (context === "tagline") return pageSlogans.tagline;
  if (context === "cta") return pageSlogans.cta;

  // Check sections
  return pageSlogans.sections?.[context];
}

/**
 * Get all Tier 1 (reusable) slogans
 *
 * @returns Array of Tier 1 slogan objects
 */
export function getTier1Slogans(): Slogan[] {
  return Object.values(SLOGANS).filter(
    (slogan) => slogan.tier === SloganTier.TIER_1_FOUNDATION,
  );
}

/**
 * Get all slogans by tier
 *
 * @param tier - Slogan tier to filter by
 * @returns Array of slogan objects in that tier
 */
export function getSlogansByTier(tier: SloganTier): Slogan[] {
  return Object.values(SLOGANS).filter((slogan) => slogan.tier === tier);
}

/**
 * Check if a slogan can be reused
 *
 * @param sloganText - The slogan text to check
 * @returns true if slogan is reusable (Tier 1), false otherwise
 */
export function isSloganReusable(sloganText: string): boolean {
  const slogan = Object.values(SLOGANS).find((s) => s.text === sloganText);
  return slogan?.reusable ?? false;
}

/**
 * Get slogan details by text
 *
 * @param sloganText - The slogan text
 * @returns Slogan object or undefined if not found
 */
export function getSloganDetails(sloganText: string): Slogan | undefined {
  return Object.values(SLOGANS).find((s) => s.text === sloganText);
}

/**
 * Social media posting schedule
 *
 * Consistent weekly themes for social media posts
 */
export const SOCIAL_MEDIA_SCHEDULE: Record<string, string> = {
  monday: getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
  tuesday: getSlogan("COMBINED_EXCELLENCE"),
  wednesday: getSlogan("FROM_VISION_TO_VICTORY"),
  thursday: getSlogan("TRUST_BUILT_PROJECT_BY_PROJECT"),
  friday: getSlogan("ROI_IS_RELATIONSHIP"),
};

/**
 * Print material slogan assignments
 */
export const PRINT_MATERIALS: Record<string, string> = {
  "business-cards": getSlogan("BUILDING_FOR_OWNER"),
  "brochures-primary": getSlogan("ROI_IS_RELATIONSHIP"),
  "vehicle-wraps": getSlogan("PRECISION_MEETS_PARTNERSHIP"),
  "job-site-signs": getSlogan("EXCELLENCE_IN_EVERY_DETAIL"),
};

/**
 * Email signature slogans by recipient type
 */
export const EMAIL_SIGNATURES: Record<
  string,
  { signature: string; footer: string }
> = {
  "client-communications": {
    signature: getSlogan("BUILDING_FOR_OWNER"),
    footer: getSlogan("ROI_IS_RELATIONSHIP"),
  },
  "trade-communications": {
    signature: getSlogan("BUILDING_PROFESSIONAL_PARTNERSHIPS"),
    footer: getSlogan("ROI_IS_RELATIONSHIP"),
  },
};
