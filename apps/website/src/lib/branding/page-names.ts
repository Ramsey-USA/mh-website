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
  operationsHierarchy: {
    seoName: "Operations Hierarchy",
    mhBrandName: "Command Doctrine",
  },
  operationsManual: {
    seoName: "Operations Manual",
    mhBrandName: "Command Doctrine",
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
    home: "Clear scope, accountable delivery, and dependable follow-through.",
    about:
      "About Us with project-brief clarity, service-earned values, and accountable delivery.",
    services:
      "Services with planning-first scope alignment, practical coordination, and dependable follow-through.",
    projects:
      "Projects with clear sequencing, accountable delivery, and craftsmanship that honors the work.",
    projectDetail:
      "Project Detail with clear sequencing from first walkthrough to proud handoff.",
    contact:
      "Contact through a direct project coordination path with clear answers and dependable follow-through.",
    testimonials:
      "Reviews and field commendations from partners who trust our word.",
    locations:
      "Locations with regional coverage, practical reach, and hometown accountability.",
    locationDetail:
      "Location Detail with local mission-profile focus and reliable execution.",
    team: "Our Team with project leadership discipline and service-first delivery.",
    careers:
      "Careers with clear standards, steady growth, and pride in the craft.",
    veterans:
      "Veterans with practical support, respectful onboarding, and earned opportunity.",
    allies:
      "Partners in an allied network built on trust, scope clarity, and follow-through.",
    publicSector:
      "Government projects under practical compliance planning and public-service accountability.",
    publicSectorProjects:
      "Public Sector Projects delivered with civic pride and mission discipline.",
    veteranLedCompliance:
      "Veteran-Led Compliance with clear documentation, practical controls, and integrity.",
    triStateGovernmentConstruction:
      "Tri-State Government Construction with regional civic delivery and dependable standards.",
    hub: "Team Hub as the operations hub for coordinated execution.",
    safety: "Safety under clear standards that protect every crew and family.",
    safetyManual:
      "Safety Manual with field-ready guidance and duty-driven clarity.",
    safetyProgram:
      "Safety Program with practical discipline in daily operations.",
    safetyForms: "Safety Forms with clear, audit-ready records.",
    safetyContents: "Table of Contents with quick access for field decisions.",
    resources:
      "Resources in a practical field library built for real-world readiness.",
    incidentReport:
      "Incident Report with fast, honest action and clear follow-through.",
    faq: "Help/FAQ with clear guidance and no runaround.",
    faqCategory: "FAQ Category focused on getting answers fast.",
    accessibility:
      "Accessibility with practical discipline so everyone can engage.",
    privacy:
      "Privacy Policy with plain-language transparency and practical care.",
    terms: "Terms of Service with clear expectations and fair process.",
    offline: "Offline guidance so you stay oriented when connections drop.",
    employeeHandbook:
      "Employee Handbook as your field guide for expectations and accountability.",
    qrCodes: "QR Codes in a practical library for quick, reliable access.",
    events: "Events through coordinated planning with community-first pride.",
    coolDesertNights:
      "Cool Desert Nights with event-ready coordination and hometown pride.",
  } as const,
} as const;

export const MH_TERMINOLOGY = {
  commercialConstruction: "Commercial Construction",
  commercialConstructionServices: "Commercial Construction Services",
  tenantImprovements: "Tenant Improvements",
  commercialNewBuildOuts: "Commercial New Build-Outs",
  projectManagement: "Project Management",
  preconstructionPlanning: "Preconstruction Planning",
  projectCloseout: "Project Closeout",
  projectStatusUpdate: "Project Status Update",
  projectSite: "Project Site",
  projectContract: "Project Contract",
  projectSchedulePace: "Project Schedule / Pace",
  onCallReadyToMobilize: "On Call / Ready to Mobilize",
  commandDoctrine: "Command Doctrine",
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
  "operations hierarchy": "operationsHierarchy",
  "command doctrine": "operationsHierarchy",
  "operations doctrine": "operationsHierarchy",
  "operations manual": "operationsManual",
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
  "mission-ready construction": MH_TERMINOLOGY.commercialConstruction,
  "mission-ready construction services":
    MH_TERMINOLOGY.commercialConstructionServices,
  "mission-ready fit-outs": MH_TERMINOLOGY.tenantImprovements,
  "mission-ready fit outs": MH_TERMINOLOGY.tenantImprovements,
  "mission-ready build-outs": MH_TERMINOLOGY.commercialNewBuildOuts,
  "mission management": MH_TERMINOLOGY.projectManagement,
  "mission planning": MH_TERMINOLOGY.preconstructionPlanning,
  predeployment: MH_TERMINOLOGY.preconstructionPlanning,
  "pre-deployment": MH_TERMINOLOGY.preconstructionPlanning,
  handoff: MH_TERMINOLOGY.projectCloseout,
  sitrep: MH_TERMINOLOGY.projectStatusUpdate,
  "situation report": MH_TERMINOLOGY.projectStatusUpdate,
  "operational theater": MH_TERMINOLOGY.projectSite,
  "mission parameters": "Project Scope",
  "force multiplier": "Efficiency Gain",
  "boots on the ground": "Field Crew",
  "rules of engagement": MH_TERMINOLOGY.projectContract,
  "rules of engagement (roe)": MH_TERMINOLOGY.projectContract,
  roe: MH_TERMINOLOGY.projectContract,
  "ground truth": "Verified Field Conditions",
  "mission accomplished": MH_TERMINOLOGY.projectCloseout,
  "operational tempo": MH_TERMINOLOGY.projectSchedulePace,
  "standby to standby": MH_TERMINOLOGY.onCallReadyToMobilize,
  "operations hierarchy": MH_TERMINOLOGY.commandDoctrine,
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
    /\bmission-ready construction services\b/gi,
    MH_TERMINOLOGY.commercialConstructionServices,
  ],
  [/\bmission-ready construction\b/gi, MH_TERMINOLOGY.commercialConstruction],
  [/\bmission-ready fit-outs?\b/gi, MH_TERMINOLOGY.tenantImprovements],
  [/\bmission-ready build-?outs?\b/gi, MH_TERMINOLOGY.commercialNewBuildOuts],
  [/\bmission management\b/gi, MH_TERMINOLOGY.projectManagement],
  [/\bmission planning\b/gi, MH_TERMINOLOGY.preconstructionPlanning],
  [/\bpre-?deployment\b/gi, MH_TERMINOLOGY.preconstructionPlanning],
  [/\bhandoff\b/gi, MH_TERMINOLOGY.projectCloseout],
  [/\bSITREP\b/gi, MH_TERMINOLOGY.projectStatusUpdate],
  [/\bSituation Report\b/gi, MH_TERMINOLOGY.projectStatusUpdate],
  [/\bOperational Theater\b/gi, MH_TERMINOLOGY.projectSite],
  [/\bMission Parameters\b/gi, "Project Scope"],
  [/\bForce Multiplier\b/gi, "Efficiency Gain"],
  [/\bBoots on the Ground\b/gi, "Field Crew"],
  [/\bRules of Engagement(?:\s*\(ROE\))?\b/gi, MH_TERMINOLOGY.projectContract],
  [/\bROE\b/gi, MH_TERMINOLOGY.projectContract],
  [/\bGround Truth\b/gi, "Verified Field Conditions"],
  [/\bMission Accomplished\b/gi, MH_TERMINOLOGY.projectCloseout],
  [/\bOperational Tempo\b/gi, MH_TERMINOLOGY.projectSchedulePace],
  [/\bStandby to Standby\b/gi, MH_TERMINOLOGY.onCallReadyToMobilize],
  [/\bOperations Hierarchy\b/gi, MH_TERMINOLOGY.commandDoctrine],
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
