export interface HeroPageSlogan {
  seoName: string;
  slogan: string;
}

import { MH_SLOGANS } from "@/lib/branding/page-names";

const HERO_PAGE_SLOGANS: Record<string, HeroPageSlogan> = {
  home: {
    seoName: "Home",
    slogan: MH_SLOGANS.heroByRoute.home,
  },
  about: {
    seoName: "About Us",
    slogan: MH_SLOGANS.heroByRoute.about,
  },
  services: {
    seoName: "Services",
    slogan: MH_SLOGANS.heroByRoute.services,
  },
  projects: {
    seoName: "Projects",
    slogan: MH_SLOGANS.heroByRoute.projects,
  },
  projectDetail: {
    seoName: "Project Detail",
    slogan: MH_SLOGANS.heroByRoute.projectDetail,
  },
  contact: {
    seoName: "Contact",
    slogan: MH_SLOGANS.heroByRoute.contact,
  },
  testimonials: {
    seoName: "Reviews",
    slogan: MH_SLOGANS.heroByRoute.testimonials,
  },
  locations: {
    seoName: "Locations",
    slogan: MH_SLOGANS.heroByRoute.locations,
  },
  locationDetail: {
    seoName: "Location Detail",
    slogan: MH_SLOGANS.heroByRoute.locationDetail,
  },
  team: {
    seoName: "Our Team",
    slogan: MH_SLOGANS.heroByRoute.team,
  },
  careers: {
    seoName: "Careers",
    slogan: MH_SLOGANS.heroByRoute.careers,
  },
  veterans: {
    seoName: "Veterans",
    slogan: MH_SLOGANS.heroByRoute.veterans,
  },
  allies: {
    seoName: "Partners",
    slogan: MH_SLOGANS.heroByRoute.allies,
  },
  publicSector: {
    seoName: "Government",
    slogan: MH_SLOGANS.heroByRoute.publicSector,
  },
  publicSectorProjects: {
    seoName: "Public Sector Projects",
    slogan: MH_SLOGANS.heroByRoute.publicSectorProjects,
  },
  veteranLedCompliance: {
    seoName: "Veteran-Led Compliance",
    slogan: MH_SLOGANS.heroByRoute.veteranLedCompliance,
  },
  triStateGovernmentConstruction: {
    seoName: "Tri-State Government Construction",
    slogan: MH_SLOGANS.heroByRoute.triStateGovernmentConstruction,
  },
  hub: { seoName: "Team Hub", slogan: MH_SLOGANS.heroByRoute.hub },
  safety: {
    seoName: "Safety",
    slogan: MH_SLOGANS.heroByRoute.safety,
  },
  safetyManual: {
    seoName: "Safety Manual",
    slogan: MH_SLOGANS.heroByRoute.safetyManual,
  },
  safetyProgram: {
    seoName: "Safety Program",
    slogan: MH_SLOGANS.heroByRoute.safetyProgram,
  },
  safetyForms: {
    seoName: "Safety Forms",
    slogan: MH_SLOGANS.heroByRoute.safetyForms,
  },
  safetyContents: {
    seoName: "Table of Contents",
    slogan: MH_SLOGANS.heroByRoute.safetyContents,
  },
  resources: {
    seoName: "Resources",
    slogan: MH_SLOGANS.heroByRoute.resources,
  },
  incidentReport: {
    seoName: "Incident Report",
    slogan: MH_SLOGANS.heroByRoute.incidentReport,
  },
  faq: {
    seoName: "Help/FAQ",
    slogan: MH_SLOGANS.heroByRoute.faq,
  },
  faqCategory: {
    seoName: "FAQ Category",
    slogan: MH_SLOGANS.heroByRoute.faqCategory,
  },
  accessibility: {
    seoName: "Accessibility",
    slogan: MH_SLOGANS.heroByRoute.accessibility,
  },
  privacy: {
    seoName: "Privacy Policy",
    slogan: MH_SLOGANS.heroByRoute.privacy,
  },
  terms: {
    seoName: "Terms of Service",
    slogan: MH_SLOGANS.heroByRoute.terms,
  },
  offline: {
    seoName: "Offline",
    slogan: MH_SLOGANS.heroByRoute.offline,
  },
  employeeHandbook: {
    seoName: "Employee Handbook",
    slogan: MH_SLOGANS.heroByRoute.employeeHandbook,
  },
  qrCodes: {
    seoName: "QR Codes",
    slogan: MH_SLOGANS.heroByRoute.qrCodes,
  },
  events: {
    seoName: "Events",
    slogan: MH_SLOGANS.heroByRoute.events,
  },
  coolDesertNights: {
    seoName: "Cool Desert Nights",
    slogan: MH_SLOGANS.heroByRoute.coolDesertNights,
  },
  default: {
    seoName: "Home",
    slogan: MH_SLOGANS.heroByRoute.home,
  },
};

export function getHeroPageSlogan(key: string): HeroPageSlogan {
  return HERO_PAGE_SLOGANS[key] ?? HERO_PAGE_SLOGANS["default"]!;
}

export function getAllHeroPageSlogans(): Record<string, HeroPageSlogan> {
  return HERO_PAGE_SLOGANS;
}
