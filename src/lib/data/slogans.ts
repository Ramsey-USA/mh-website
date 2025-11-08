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
    text: "Building for the Owner, NOT the Dollar",
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
    reusable: true,
    tone: "powerful-memorable",
    contexts: ["hero", "tagline", "footer", "social-media"],
    description:
      "Flagship slogan redefining ROI as relationship value rather than purely financial returns",
    assignedPages: [
      "homepage",
      "team-page",
      "careers-page",
      "trade-partners-page",
      "email-footers",
    ],
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
    hero: SLOGANS.ROI_IS_RELATIONSHIP.text,
    tagline: SLOGANS.BUILDING_FOR_OWNER.text,
    cta: SLOGANS.BUILD_MORE_THAN_STRUCTURES.text,
  },

  // About Page
  about: {
    hero: SLOGANS.PRECISION_MEETS_PARTNERSHIP.text,
    sections: {
      history: SLOGANS.TRUST_BUILT_PROJECT_BY_PROJECT.text,
      positioning: SLOGANS.BIG_ENOUGH_SMALL_ENOUGH.text,
    },
  },

  // Services Page
  services: {
    hero: SLOGANS.YOUR_VISION_OUR_PRECISION.text,
    sections: {
      quality: SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
      process: SLOGANS.BUILDING_TRUST_THROUGH_TRANSPARENCY.text,
    },
  },

  // Projects/Portfolio Page
  projects: {
    hero: SLOGANS.TRUST_BUILT_PROJECT_BY_PROJECT.text,
    sections: {
      timeline: SLOGANS.FROM_VISION_TO_VICTORY.text,
      results: SLOGANS.RELATIONSHIPS_THAT_LAST.text,
    },
  },

  // Team Page
  team: {
    hero: SLOGANS.ROI_IS_RELATIONSHIP.text,
    sections: {
      expertise: SLOGANS.COMBINED_EXCELLENCE.text,
      culture: SLOGANS.VETERAN_VALUES_COMMUNITY_RESULTS.text,
    },
  },

  // Careers Page
  careers: {
    hero: SLOGANS.PARTNER_WITH_PRECISION.text,
    tagline: SLOGANS.ROI_IS_RELATIONSHIP.text,
    sections: {
      standards: SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
    },
  },

  // Contact Page
  contact: {
    hero: SLOGANS.BUILD_MORE_THAN_STRUCTURES.text,
    tagline: SLOGANS.BUILDING_TRUST_THROUGH_TRANSPARENCY.text,
    cta: SLOGANS.PARTNER_WITH_PRECISION.text,
  },

  // Booking/Consultation Page
  booking: {
    hero: SLOGANS.BUILD_MORE_THAN_STRUCTURES.text,
    tagline: SLOGANS.YOUR_PROJECT_PARTNER.text,
    sections: {
      journey: SLOGANS.FROM_VISION_TO_VICTORY.text,
    },
  },

  // Government Projects Page
  "government-projects": {
    hero: SLOGANS.VETERAN_VALUES_COMMUNITY_RESULTS.text,
    sections: {
      compliance: SLOGANS.BUILDING_TRUST_THROUGH_TRANSPARENCY.text,
      quality: SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
    },
  },

  // Trade Partners Page
  "trade-partners": {
    hero: SLOGANS.BUILDING_PROFESSIONAL_PARTNERSHIPS.text,
    tagline: SLOGANS.ROI_IS_RELATIONSHIP.text,
    sections: {
      network: SLOGANS.PACIFIC_NORTHWEST_ROOTS.text,
    },
  },

  // Estimator/Calculator Page
  estimator: {
    hero: SLOGANS.YOUR_VISION_OUR_PRECISION.text,
    tagline: SLOGANS.BUILDING_TRUST_THROUGH_TRANSPARENCY.text,
    cta: SLOGANS.PARTNER_WITH_PRECISION.text,
  },

  // 3D Explorer Page
  "3d-explorer": {
    hero: SLOGANS.FROM_VISION_TO_VICTORY.text,
    tagline: SLOGANS.YOUR_VISION_OUR_PRECISION.text,
    cta: SLOGANS.BUILD_MORE_THAN_STRUCTURES.text,
  },

  // Urgent Support Page
  "urgent-support": {
    hero: SLOGANS.PARTNER_WITH_PRECISION.text,
    sections: {
      quality: SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
      reliability: SLOGANS.VETERAN_VALUES_COMMUNITY_RESULTS.text,
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
  monday: SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
  tuesday: SLOGANS.COMBINED_EXCELLENCE.text,
  wednesday: SLOGANS.FROM_VISION_TO_VICTORY.text,
  thursday: SLOGANS.TRUST_BUILT_PROJECT_BY_PROJECT.text,
  friday: SLOGANS.ROI_IS_RELATIONSHIP.text,
};

/**
 * Print material slogan assignments
 */
export const PRINT_MATERIALS: Record<string, string> = {
  "business-cards": SLOGANS.BUILDING_FOR_OWNER.text,
  "brochures-primary": SLOGANS.ROI_IS_RELATIONSHIP.text,
  "vehicle-wraps": SLOGANS.PRECISION_MEETS_PARTNERSHIP.text,
  "job-site-signs": SLOGANS.EXCELLENCE_IN_EVERY_DETAIL.text,
};

/**
 * Email signature slogans by recipient type
 */
export const EMAIL_SIGNATURES: Record<
  string,
  { signature: string; footer: string }
> = {
  "client-communications": {
    signature: SLOGANS.BUILDING_FOR_OWNER.text,
    footer: SLOGANS.ROI_IS_RELATIONSHIP.text,
  },
  "trade-communications": {
    signature: SLOGANS.BUILDING_PROFESSIONAL_PARTNERSHIPS.text,
    footer: SLOGANS.ROI_IS_RELATIONSHIP.text,
  },
};
