/**
 * Branding Rules — CommonJS Export
 *
 * This file provides CommonJS-compatible exports of branding rules
 * for use in Node.js CLI validation scripts.
 *
 * Mirrors src/lib/validation/branding-rules.ts but in CommonJS format.
 *
 * Usage:
 *   const { SLOGAN_RULES, TERMINOLOGY_GUARDRAIL_RULES } = require("./branding-rules.cjs");
 */

const SLOGAN_RULES = {
  primary: "Built on Quality, Backed by Trust.",
  primaryRegex: /Built on Quality, Backed by Trust\./,

  supportingList: [
    "Squared away from start to finish.",
    "From Handshake to Handoff, we got your 'six.'",
    "Professional on the line. Thorough in the details.",
    "No gaps. No guesswork. Just accountable follow-through.",
    "Clear facts. No spin. No surprises.",
    "Commitments kept under pressure.",
    "Standards high on every site, every day.",
    "Measure twice, document always, close out clean.",
  ],

  supportingRegex:
    /Squared away from start to finish\.|From Handshake to Handoff, we got your 'six\.'|Professional on the line\. Thorough in the details\.|No gaps\. No guesswork\. Just accountable follow-through\.|Clear facts\. No spin\. No surprises\.|Commitments kept under pressure\.|Standards high on every site, every day\.|Measure twice, document always, close out clean\./,

  heroFiles: [
    "src/components/home/HeroSection.tsx",
    "src/components/about/AboutHero.tsx",
    "src/components/services/ServicesHero.tsx",
    "src/components/locations/LocationPageContent.tsx",
    "src/app/projects/components/ProjectsHero.tsx",
    "src/app/team/page.tsx",
    "src/app/contact/ContactPageClient.tsx",
    "src/app/locations/page.tsx",
    "src/app/projects/[slug]/page.tsx",
    "src/app/testimonials/page.tsx",
    "src/app/faq/page.tsx",
    "src/app/faq/[category]/page.tsx",
    "src/app/veterans/page.tsx",
    "src/app/safety/page.tsx",
    "src/app/careers/CareersPageClient.tsx",
    "src/app/resources/page.tsx",
    "src/app/public-sector/PublicSectorFullPage.tsx",
    "src/app/public-sector/veteran-led-compliance/page.tsx",
    "src/app/public-sector/tri-state-government-construction/page.tsx",
    "src/app/allies/page.tsx",
  ],
};

const DISALLOWED_HYPE_PATTERNS = [
  /\bAI-powered\b/i,
  /\bsynergy\b/i,
  /\bcutting-edge\b/i,
  /\bbest-in-class\b/i,
  /\bguaranteed\b/i,
  /\bbook now\b/i,
  /\binstant quote\b/i,
];

const TERMINOLOGY_GUARDRAIL_RULES = [
  {
    id: "repetitive-precon-through-closeout",
    description:
      "Repetitive preconstruction-through-closeout phrase detected in public copy.",
    recommendation:
      "Use more specific wording for stage intent (for example: front-end scope definition, constructability mapping, turnover controls).",
    pattern: /from\s+preconstruction\s+through\s+closeout/gi,
  },
  {
    id: "repetitive-transparent-preconstruction",
    description:
      "Generic 'transparent preconstruction' phrase detected in public copy.",
    recommendation:
      "Describe the concrete planning mechanism (scope architecture, cost intelligence, procurement sequencing, or risk modeling).",
    pattern: /transparent\s+preconstruction/gi,
  },
  {
    id: "repetitive-clear-preconstruction-controls",
    description:
      "Generic 'clear preconstruction controls' phrase detected in public copy.",
    recommendation:
      "Replace with a unique phrase tied to the audience and stage outcome.",
    pattern: /clear\s+preconstruction\s+controls/gi,
  },
  {
    id: "repetitive-precon-through-turnover",
    description:
      "Repetitive preconstruction-through-turnover phrase detected in public copy.",
    recommendation:
      "Use differentiated wording that names the distinct operating stages being described.",
    pattern: /preconstruction\s+planning\s+through\s+turnover\s+execution/gi,
  },
  {
    id: "repetitive-precon-doc-procurement",
    description: "Repeated compliance phrase detected in public copy.",
    recommendation:
      "Use unique compliance wording such as front-end scope controls, documentation readiness, and procurement readiness.",
    pattern:
      /preconstruction,\s+documentation,\s+and\s+procurement\s+readiness/gi,
  },
  {
    id: "repetitive-precon-methods-boilerplate",
    description: "Repeated preconstruction boilerplate sentence detected.",
    recommendation:
      "Replace with a unique explanation of how planning decisions prevent downstream risk.",
    pattern:
      /preconstruction\s+methods\s+and\s+reduces\s+scope\s+drift,\s+change\s+pressure,\s+and\s+avoidable\s+delays/gi,
  },
];

const TRUST_SURFACE_CONTRACTS = [
  {
    relPath: "src/app/about/page.tsx",
    requiredSnippets: ["AccreditationsLogoRow"],
  },
  {
    relPath: "src/app/allies/page.tsx",
    requiredSnippets: ["AccreditationsLogoRow"],
  },
  {
    relPath: "src/app/veterans/page.tsx",
    requiredSnippets: ["AccreditationsLogoRow"],
  },
  {
    relPath: "src/app/public-sector/PublicSectorFullPage.tsx",
    requiredSnippets: [
      "AccreditationsLogoRow",
      "Build America, Buy America Act (BABAA)",
    ],
  },
  {
    relPath: "src/app/contact/ContactPageClient.tsx",
    requiredSnippets: [
      "COMPANY_INFO.bbb.sealClickUrl",
      "COMPANY_INFO.travelers.website",
      "COMPANY_INFO.chambers.pasco.memberDirectoryUrl",
      "COMPANY_INFO.chambers.richland.memberDirectoryUrl",
      "COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl",
    ],
  },
  {
    relPath: "src/components/layout/Footer.tsx",
    requiredSnippets: ["footer-accreditations-heading", "WaVobBadge"],
  },
];

const CLIENT_TERMINOLOGY_GUARDRAIL_RULES = [
  {
    id: "hard-dollar-amount",
    pattern: /\$\s?\d[\d.,]*(?:\s?[KMBkmb])?\+?/g,
    message: "Avoid hard dollar amounts in client-facing copy.",
    prefer:
      "Use trust-safe phrasing like 'robust bonding capacity' or 'defined approval controls'.",
  },
  {
    id: "choose-market",
    pattern: /\b(?:choose|pick)\s+(?:your\s+)?market\b/gi,
    message: "Avoid market-trader journey framing.",
    prefer: "Use 'project type', 'delivery path', or 'scope fit'.",
  },
  {
    id: "market-by-market",
    pattern: /\bmarket[-\s]by[-\s]market\b/gi,
    message: "Avoid market-by-market phrasing.",
    prefer: "Use 'location-by-location' or 'project-type'.",
  },
  {
    id: "service-market-label",
    pattern:
      /\b(?:service|delivery|planning|regional|local|technical|public-sector|municipal|partner)\s+market\b/gi,
    message: "Avoid market labels in user-facing navigation/copy.",
    prefer: "Use 'service area', 'project path', or 'project type'.",
  },
  {
    id: "market-page-label",
    pattern: /\bmarket\s+page\b/gi,
    message: "Avoid market page phrasing.",
    prefer: "Use 'service area page' or route by project type.",
  },
  {
    id: "approval-threshold-label",
    pattern: /\bapproval\s+thresholds?\b/gi,
    message: "Avoid threshold-heavy terminology in client-facing copy.",
    prefer: "Use 'approval controls'.",
  },
  {
    id: "generic-market-noun",
    pattern: /\bmarket\b/gi,
    message: "Avoid generic market wording in client-facing copy.",
    prefer: "Use 'project type', 'service area', or 'delivery lane'.",
    allowIfMatch: [
      /marketing/i,
      /remarketing/i,
      /benchmark/i,
      /marketplace/i,
      /google business profile/i,
    ],
  },
];

const HERO_SECTION_RULES = {
  canonicalClass:
    "hero-section relative flex items-end justify-end text-white overflow-hidden",
  canonicalClassRegex:
    /className="hero-section\s+relative\s+flex\s+items-end\s+justify-end\s+text-white\s+overflow-hidden"/,
  canonicalClassRegexFlexible:
    /className=['"]hero-section.*?relative.*?flex.*?items-end.*?justify-end.*?text-white.*?overflow-hidden['"]/,
  heightRegex: /height.*?calc\(100vh\s*-\s*var\(--mh-nav-offset,\s*6\.5rem\)\)/,
  hasPageNavigation: /PageNavigation/,
  hasDualNaming: /→/,
  hasBottomRightPositioning: /ml-auto/,
  suspiciousCTA: /href.*?className.*?(?:button|cta|btn)/,
};

module.exports = {
  SLOGAN_RULES,
  DISALLOWED_HYPE_PATTERNS,
  TERMINOLOGY_GUARDRAIL_RULES,
  TRUST_SURFACE_CONTRACTS,
  CLIENT_TERMINOLOGY_GUARDRAIL_RULES,
  HERO_SECTION_RULES,
};
