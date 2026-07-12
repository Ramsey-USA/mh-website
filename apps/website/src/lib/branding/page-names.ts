export type PageTerminology = {
  seoName: string;
  mhBrandName: string;
};

export const PAGE_TERMINOLOGY = {
  home: { seoName: "Home", mhBrandName: "Command Center" },
  about: { seoName: "About Us", mhBrandName: "Our Mission" },
  services: { seoName: "Services", mhBrandName: "Operations Brief" },
  projects: { seoName: "Projects", mhBrandName: "Our Work" },
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
  locations: { seoName: "Locations", mhBrandName: "Regional Coverage" },
  qrCodes: { seoName: "QR Codes", mhBrandName: "QR Library" },
  employeeHandbook: {
    seoName: "Employee Handbook",
    mhBrandName: "Handbook Index",
  },
  accessibility: {
    seoName: "Accessibility",
    mhBrandName: "Access Standards",
  },
  privacy: { seoName: "Privacy Policy", mhBrandName: "Privacy Standards" },
  terms: { seoName: "Terms of Service", mhBrandName: "Service Terms" },
  offline: { seoName: "Offline", mhBrandName: "Connection Status" },
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

export function buildDualSeoTitle(
  pageKey: PageTerminologyKey,
  descriptor: string,
): string {
  return `${getDualPageNameByKey(pageKey)} | ${descriptor} | MH Construction`;
}
