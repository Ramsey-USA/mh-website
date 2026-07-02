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
  testimonials: { seoName: "Reviews", mhBrandName: "Field Commendations" },
  team: { seoName: "Our Team", mhBrandName: "Command Staff" },
  careers: { seoName: "Careers", mhBrandName: "Recruitment Command" },
  veterans: { seoName: "Veterans", mhBrandName: "Veteran Battalion" },
  allies: { seoName: "Partners", mhBrandName: "Allied Network" },
  publicSector: { seoName: "Government", mhBrandName: "Civic Operations" },
  safety: { seoName: "Safety", mhBrandName: "Safety Command" },
  resources: { seoName: "Resources", mhBrandName: "Field Resources" },
  faq: { seoName: "Help/FAQ", mhBrandName: "Intel Brief" },
  hub: { seoName: "Team Hub", mhBrandName: "Operations Hub" },
} as const satisfies Record<string, PageTerminology>;

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
