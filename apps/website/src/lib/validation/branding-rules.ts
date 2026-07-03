/**
 * Centralized branding validation rules.
 *
 * This module defines all reusable branding validation rules to avoid duplication
 * across Jest tests and CLI validation scripts. Rules are organized by category.
 *
 * @module branding-rules
 */

// ─────────────────────────────────────────────────────────────────────────────
// Slogan Rules
// ─────────────────────────────────────────────────────────────────────────────

export const SLOGAN_RULES = {
  /** Canonical primary slogan */
  primary: "Built on Quality, Backed by Trust.",
  primaryRegex: /Built on Quality, Backed by Trust\./,

  /** All approved supporting slogans (distributed across pages) */
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

  /** Files that must display both primary and supporting slogans */
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
  ] as const,
};

// ─────────────────────────────────────────────────────────────────────────────
// Visual Guardrail Rules
// ─────────────────────────────────────────────────────────────────────────────

export interface VisualGuardrailRule {
  id: string;
  description: string;
  recommendation: string;
  pattern: RegExp;
  scope: "tsx" | "jsx"; // Only check in component files
}

export const VISUAL_GUARDRAIL_RULES: VisualGuardrailRule[] = [
  {
    id: "legacy-neutral-card-shell",
    description:
      "Legacy neutral card shell is being used on a raw layout element instead of the shared Card primitive.",
    recommendation:
      'Use <Card className="..."> for repeated neutral content surfaces.',
    pattern:
      /<(?:div|article|aside|section)\b[^>]*className\s*=\s*(?:"[^"]*rounded-3xl border border-gray-200 bg-white p-6 shadow-sm[^"]*"|\{\s*`[^`]*rounded-3xl border border-gray-200 bg-white p-6 shadow-sm[^`]*`\s*\})/g,
    scope: "tsx",
  },
  {
    id: "legacy-brand-callout-shell",
    description:
      "Legacy branded callout shell is being used on a raw layout element instead of the shared Card primitive.",
    recommendation:
      'Use <Card className="..."> for repeated branded callout surfaces.',
    pattern:
      /<(?:div|article|aside|section)\b[^>]*className\s*=\s*(?:"[^"]*rounded-3xl border border-brand-primary\/20 bg-brand-primary\/5 p-6[^"]*"|\{\s*`[^`]*rounded-3xl border border-brand-primary\/20 bg-brand-primary\/5 p-6[^`]*`\s*\})/g,
    scope: "tsx",
  },
  {
    id: "legacy-empty-state-shell",
    description:
      "Legacy empty-state shell is being used on a raw div wrapper instead of the shared Card primitive.",
    recommendation:
      "Wrap empty-state surfaces in <Card> and keep the visual classes on Card.",
    pattern:
      /<div\b[^>]*className\s*=\s*(?:"[^"]*relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16[^"]*"|\{\s*`[^`]*relative bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 sm:p-12 lg:p-16[^`]*`\s*\})/g,
    scope: "tsx",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Branding Congruency Rules
// ─────────────────────────────────────────────────────────────────────────────

export interface BrandingCongruencyRule {
  id: string;
  description: string;
  recommendation: string;
  pattern: RegExp;
}

export const BRANDING_CONGRUENCY_RULES: BrandingCongruencyRule[] = [
  {
    id: "group-hover-animate-pulse",
    description:
      "High-intensity hover pulse utility is not allowed on components.",
    recommendation:
      "Remove `group-hover:animate-pulse` to maintain consistent branding.",
    pattern: /group-hover:animate-pulse/,
  },
  {
    id: "malformed-group-token",
    description: "Malformed group class token detected.",
    recommendation:
      "Ensure group utility classes are properly formatted without extra spaces.",
    pattern: /\bgroup-\s+/,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Terminology Guardrail Rules
// ─────────────────────────────────────────────────────────────────────────────

export interface TerminologyGuardrailRule {
  id: string;
  description: string;
  recommendation: string;
  pattern: RegExp;
}

export const TERMINOLOGY_GUARDRAIL_RULES: TerminologyGuardrailRule[] = [
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

// ─────────────────────────────────────────────────────────────────────────────
// Disallowed Hype Language
// ─────────────────────────────────────────────────────────────────────────────

export const DISALLOWED_HYPE_PATTERNS = [
  /\bAI-powered\b/i,
  /\bsynergy\b/i,
  /\bcutting-edge\b/i,
  /\bbest-in-class\b/i,
  /\bguaranteed\b/i,
  /\bbook now\b/i,
  /\binstant quote\b/i,
];

// ─────────────────────────────────────────────────────────────────────────────
// Trust Surface Contracts
// ─────────────────────────────────────────────────────────────────────────────

export interface TrustSurfaceContract {
  relPath: string;
  requiredSnippets: string[];
}

export const TRUST_SURFACE_CONTRACTS: TrustSurfaceContract[] = [
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
