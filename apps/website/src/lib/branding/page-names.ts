export type PageTerminology = {
  seoName: string;
  mhBrandName: string;
};

export const PAGE_TERMINOLOGY = {
  home: { seoName: "Home", mhBrandName: "Command Center" },
  about: { seoName: "About Us", mhBrandName: "Mission Brief" },
  services: { seoName: "Services", mhBrandName: "Operations Brief" },
  projects: { seoName: "Projects", mhBrandName: "Project SITREP" },
  contact: { seoName: "Contact", mhBrandName: "Comms Desk" },
  events: { seoName: "Events", mhBrandName: "Formation Calendar" },
  coolDesertNights: {
    seoName: "Cool Desert Nights",
    mhBrandName: "Event Archive",
  },
  testimonials: { seoName: "Reviews", mhBrandName: "Field Commendations" },
  team: { seoName: "Our Team", mhBrandName: "Command Staff" },
  careers: { seoName: "Careers", mhBrandName: "Recruitment Command" },
  veterans: { seoName: "Veterans", mhBrandName: "Veteran Battalion" },
  allies: { seoName: "Partners", mhBrandName: "Allied Network" },
  publicSector: { seoName: "Government", mhBrandName: "Civic Operations" },
  safety: { seoName: "Safety", mhBrandName: "Safety Command" },
  safetyManual: {
    seoName: "Safety Manual",
    mhBrandName: "Manual Operations",
  },
  safetyProgram: {
    seoName: "Safety Program",
    mhBrandName: "Program Command",
  },
  safetyForms: {
    seoName: "Safety Forms",
    mhBrandName: "Form Control",
  },
  safetyContents: {
    seoName: "Table of Contents",
    mhBrandName: "Section Index",
  },
  resources: { seoName: "Resources", mhBrandName: "Field Resources" },
  faq: { seoName: "Help/FAQ", mhBrandName: "Intel Brief" },
  locations: { seoName: "Locations", mhBrandName: "Regional AO" },
  qrCodes: { seoName: "QR Codes", mhBrandName: "QR Library" },
  sitemap: { seoName: "Sitemap", mhBrandName: "Route Index" },
  employeeHandbook: {
    seoName: "Employee Handbook",
    mhBrandName: "Field Guide",
  },
  accessibility: {
    seoName: "Accessibility",
    mhBrandName: "Access Protocol",
  },
  privacy: { seoName: "Privacy Policy", mhBrandName: "Data OPSEC" },
  terms: { seoName: "Terms of Service", mhBrandName: "Engagement ROE" },
  offline: { seoName: "Offline", mhBrandName: "Signal Check" },
  incidentReport: {
    seoName: "Incident Report",
    mhBrandName: "Incident Command",
  },
  publicSectorProjects: {
    seoName: "Public Sector Projects",
    mhBrandName: "Civic Operations",
  },
  veteranLedCompliance: {
    seoName: "Veteran-Led Compliance",
    mhBrandName: "Compliance Command",
  },
  triStateGovernmentConstruction: {
    seoName: "Tri-State Government Construction",
    mhBrandName: "Regional Civic Delivery",
  },
  hub: { seoName: "Team Hub", mhBrandName: "Operations Hub" },
} as const satisfies Record<string, PageTerminology>;

export type PageTerminologyKey = keyof typeof PAGE_TERMINOLOGY;

export const MH_DUAL_PHRASES = {
  primarySlogan: "Built on Quality, Backed by Trust.",
  supportingSlogan: "Squared away from start to finish.",
  missionLine: "No gaps. No guesswork. Just accountable follow-through.",
  veteranOwnedLabel: "Veteran-Owned",
  veteranOwnedDescriptor: "Veteran-Owned leadership",
} as const;

export const MH_SLOGANS = {
  primary: MH_DUAL_PHRASES.primarySlogan,
  supporting: [
    MH_DUAL_PHRASES.supportingSlogan,
    "From Handshake to Handoff, we got your 'six.'",
    "Professional on the line. Thorough in the details.",
    MH_DUAL_PHRASES.missionLine,
    "Clear facts. No spin. No surprises.",
    "Commitments kept under pressure.",
    "Standards high on every site, every day.",
    "Measure twice, document always, close out clean.",
  ],
  heroByRoute: {
    home: "Straight answers from the Command Center, built with American grit.",
    about:
      "About Us with mission-brief clarity, service-earned values, and handshake pride.",
    services:
      "Services with operations-brief discipline, done right for every American jobsite.",
    projects:
      "Projects with SITREP accountability and craftsmanship that honors the work.",
    projectDetail:
      "Project Detail with SITREP clarity from first walkthrough to proud handoff.",
    contact:
      "Contact through the Comms Desk for direct answers and stand-up service.",
    testimonials:
      "Reviews and Field Commendations from partners who trust our word.",
    locations:
      "Locations with Regional AO coverage and hometown accountability.",
    locationDetail:
      "Location Detail with local mission-profile focus and national-standard execution.",
    team: "Our Team led with Command Staff discipline and service-first leadership.",
    careers:
      "Careers with Recruitment Command standards, steady growth, and pride in the craft.",
    veterans:
      "Veterans with battalion-level respect, practical support, and earned opportunity.",
    allies:
      "Partners in an Allied Network built on trust, duty, and follow-through.",
    publicSector:
      "Government projects under Civic Operations discipline and public-service accountability.",
    publicSectorProjects:
      "Public Sector Projects delivered with civic pride and mission discipline.",
    veteranLedCompliance:
      "Veteran-Led Compliance with command-grade documentation and integrity.",
    triStateGovernmentConstruction:
      "Tri-State Government Construction with regional civic delivery and unwavering standards.",
    hub: "Team Hub as the Operations Hub for coordinated execution.",
    safety:
      "Safety under Safety Command standards to protect every crew and family.",
    safetyManual:
      "Safety Manual in Manual Operations format, field-ready and duty-driven.",
    safetyProgram:
      "Safety Program with Program Command discipline in daily operations.",
    safetyForms:
      "Safety Forms through Form Control for clear, audit-ready records.",
    safetyContents:
      "Table of Contents with Section Index speed for field decisions.",
    resources:
      "Resources in a Field Resources library built for real-world readiness.",
    incidentReport:
      "Incident Report through Incident Command for fast, honest action.",
    faq: "Help/FAQ with Intel Brief clarity and no runaround.",
    faqCategory: "FAQ Category with Category Recon focus to get answers fast.",
    accessibility:
      "Accessibility with access-protocol discipline so everyone can engage.",
    privacy:
      "Privacy Policy with data-OPSEC discipline and plain-language transparency.",
    terms: "Terms of Service with clear ROE and fair expectations.",
    offline:
      "Offline signal-check guidance so you stay oriented when connections drop.",
    employeeHandbook:
      "Employee Handbook as your field guide for expectations and accountability.",
    qrCodes: "QR Codes in a QR Library for quick, reliable access.",
    events:
      "Events through Formation Calendar planning with community-first pride.",
    coolDesertNights:
      "Cool Desert Nights with Event Archive readiness and hometown pride.",
  } as const,
} as const;

export const MH_TERMINOLOGY = {
  missionReadyConstruction: "Mission-Ready Construction",
  missionReadyConstructionServices: "Mission-Ready Construction Services",
  missionReadyFitOuts: "Mission-Ready Fit-Outs",
  missionReadyBuildOuts: "Mission-Ready Build-Outs",
  missionManagement: "Mission Management",
  missionPlanning: "Mission Planning",
  predeployment: "Predeployment",
  handoff: "Handoff",
} as const;

const PAGE_TERMINOLOGY_ALIASES: Record<string, PageTerminologyKey> = {
  home: "home",
  "about us": "about",
  about: "about",
  services: "services",
  projects: "projects",
  "our work": "projects",
  "work together": "projects",
  contact: "contact",
  "contact us": "contact",
  "get in touch": "contact",
  events: "events",
  "events - cool desert nights 2026": "coolDesertNights",
  "cool desert nights": "coolDesertNights",
  reviews: "testimonials",
  testimonials: "testimonials",
  team: "team",
  "our team": "team",
  crew: "team",
  staff: "team",
  careers: "careers",
  "career opportunities": "careers",
  hiring: "careers",
  veterans: "veterans",
  allies: "allies",
  "trade partners": "allies",
  partners: "allies",
  "our partners": "allies",
  "partner network": "allies",
  government: "publicSector",
  "government projects": "publicSector",
  "public sector": "publicSector",
  "government work": "publicSector",
  "public sector work": "publicSector",
  "public sector projects": "publicSectorProjects",
  safety: "safety",
  "safety program": "safetyProgram",
  "safety manual": "safetyManual",
  "table of contents": "safetyContents",
  forms: "safetyForms",
  "safety forms": "safetyForms",
  "forms index": "safetyForms",
  "safety forms index": "safetyForms",
  "incident report": "incidentReport",
  "safety hub": "safety",
  resources: "resources",
  accessibility: "accessibility",
  "privacy policy": "privacy",
  "terms of service": "terms",
  offline: "offline",
  "help center": "faq",
  faqs: "faq",
  "questions and answers": "faq",
  "questions & answers": "faq",
  "veteran-led compliance": "veteranLedCompliance",
  "tri-state government construction": "triStateGovernmentConstruction",
  hub: "hub",
  locations: "locations",
  "qr codes": "qrCodes",
  "qr code library": "qrCodes",
  sitemap: "sitemap",
  "employee handbook": "employeeHandbook",
  faq: "faq",
  "help/faq": "faq",
  "team hub": "hub",
};

const PHRASE_NORMALIZATION_ALIASES: Record<string, string> = {
  "veteran owned": MH_DUAL_PHRASES.veteranOwnedLabel,
  "veteran-owned": MH_DUAL_PHRASES.veteranOwnedLabel,
  "veteran owned leadership": MH_DUAL_PHRASES.veteranOwnedDescriptor,
  "veteran-owned leadership": MH_DUAL_PHRASES.veteranOwnedDescriptor,
  "built on quality, backed by trust": MH_DUAL_PHRASES.primarySlogan,
  "built on quality backed by trust": MH_DUAL_PHRASES.primarySlogan,
  "squared away from start to finish": MH_DUAL_PHRASES.supportingSlogan,
  "squared away, from start to finish": MH_DUAL_PHRASES.supportingSlogan,
  "no gaps. no guesswork. just accountable follow-through":
    MH_DUAL_PHRASES.missionLine,
  "no gaps, no guesswork, just accountable follow-through":
    MH_DUAL_PHRASES.missionLine,
  "commercial construction": MH_TERMINOLOGY.missionReadyConstruction,
  "commercial construction services":
    MH_TERMINOLOGY.missionReadyConstructionServices,
  "commercial construction management": MH_TERMINOLOGY.missionManagement,
  "construction project management": MH_TERMINOLOGY.missionManagement,
  "project management": MH_TERMINOLOGY.missionManagement,
  "master planning": MH_TERMINOLOGY.missionPlanning,
  preconstruction: MH_TERMINOLOGY.predeployment,
  "pre-construction": MH_TERMINOLOGY.predeployment,
  "tenant improvements": MH_TERMINOLOGY.missionReadyFitOuts,
  "tenant improvement": MH_TERMINOLOGY.missionReadyFitOuts,
  "commercial new build-outs": MH_TERMINOLOGY.missionReadyBuildOuts,
  "commercial new build outs": MH_TERMINOLOGY.missionReadyBuildOuts,
  closeout: MH_TERMINOLOGY.handoff,
  turnover: MH_TERMINOLOGY.handoff,
};

const PHRASE_REGEX_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bveteran[- ]owned\b/gi, MH_DUAL_PHRASES.veteranOwnedLabel],
  [
    /built on quality(?:,)?\s*backed by trust\.?/gi,
    MH_DUAL_PHRASES.primarySlogan,
  ],
  [/squared away from start to finish\.?/gi, MH_DUAL_PHRASES.supportingSlogan],
  [
    /no gaps[.,]?\s*no guesswork[.,]?\s*just accountable follow[- ]through\.?/gi,
    MH_DUAL_PHRASES.missionLine,
  ],
  [
    /\bcommercial construction services\b/gi,
    MH_TERMINOLOGY.missionReadyConstructionServices,
  ],
  [/\bcommercial construction\b/gi, MH_TERMINOLOGY.missionReadyConstruction],
  [/\bconstruction project management\b/gi, MH_TERMINOLOGY.missionManagement],
  [/\bproject management\b/gi, MH_TERMINOLOGY.missionManagement],
  [/\bmaster planning\b/gi, MH_TERMINOLOGY.missionPlanning],
  [/\bpre-?construction\b/gi, MH_TERMINOLOGY.predeployment],
  [/\btenant improvements?\b/gi, MH_TERMINOLOGY.missionReadyFitOuts],
  [/\bcommercial new build-?outs?\b/gi, MH_TERMINOLOGY.missionReadyBuildOuts],
  [/\bcloseout\b/gi, MH_TERMINOLOGY.handoff],
  [/\bturnover\b/gi, MH_TERMINOLOGY.handoff],
];

export function formatDualPageName(
  seoName: string,
  mhBrandName: string,
): string {
  return `${seoName} (${mhBrandName})`;
}

export function formatDualPageSummary(
  summary: string,
  mhBrandName: string,
): string {
  return `${summary} - ${mhBrandName}`;
}

export function getDualPageNameByKey(key: PageTerminologyKey): string {
  const terminology = PAGE_TERMINOLOGY[key];
  return formatDualPageName(terminology.seoName, terminology.mhBrandName);
}

export function getDualPageName(labelOrKey: string): string {
  const normalized = labelOrKey.trim().toLowerCase();
  const pageKey = PAGE_TERMINOLOGY_ALIASES[normalized];

  if (!pageKey) {
    return labelOrKey;
  }

  return getDualPageNameByKey(pageKey);
}

export function normalizeMhPhrase(phrase: string): string {
  const normalized = phrase.trim().toLowerCase();
  return PHRASE_NORMALIZATION_ALIASES[normalized] ?? phrase;
}

export function normalizeMhPhrasesInText(text: string): string {
  return PHRASE_REGEX_REPLACEMENTS.reduce(
    (normalizedText, [pattern, replacement]) =>
      normalizedText.replace(pattern, replacement),
    text,
  );
}

export function normalizeMhKeywordList(keywords: string[]): string[] {
  return keywords.map((keyword) => normalizeMhPhrasesInText(keyword));
}

export function normalizeMhSlogan(slogan: string): string {
  return normalizeMhPhrasesInText(slogan).replace(/\s+/g, " ").trim();
}

export function buildDualSeoTitle(
  pageKey: PageTerminologyKey,
  descriptor: string,
): string {
  return `${getDualPageNameByKey(pageKey)} | ${descriptor} | MH Construction`;
}
