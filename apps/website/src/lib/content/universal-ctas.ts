import type { SupportedLocale } from "@/lib/i18n/locale";

export type UniversalCtaKey =
  | "primary"
  | "portfolio"
  | "services"
  | "caseStudy"
  | "publicSector"
  | "allServices"
  | "pitchDeck"
  | "publicSectorOverview"
  | "capabilitiesBrief";

type UniversalCtaDefinition = {
  href: string;
  label: string;
};

const UNIVERSAL_CTA_HREFS: Record<UniversalCtaKey, string> = {
  primary: "/contact",
  portfolio: "/projects",
  services: "/contact",
  caseStudy: "/contact",
  publicSector: "/contact",
  allServices: "/services",
  pitchDeck: "/contact?subject=pitch-deck",
  publicSectorOverview: "/public-sector",
  capabilitiesBrief:
    "/contact?subject=Request%20Federal%20Capabilities%20Brief",
};

const UNIVERSAL_CTA_LABELS: Record<
  "en" | "es",
  Record<UniversalCtaKey, string>
> = {
  en: {
    primary: "Discuss Your Project",
    portfolio: "View Project Portfolio",
    services: "Schedule a Capability Review",
    caseStudy: "Discuss a Similar Project",
    publicSector: "Request Public-Sector Capability Review",
    allServices: "View All Services",
    pitchDeck: "Request Pitch Deck",
    publicSectorOverview: "View Public-Sector Capabilities",
    capabilitiesBrief: "Request Federal Capabilities Brief",
  },
  es: {
    primary: "Hablemos de su proyecto",
    portfolio: "Ver portafolio de proyectos",
    services: "Programar una revision de capacidades",
    caseStudy: "Hablemos de un proyecto similar",
    publicSector: "Solicitar revision de capacidades del sector publico",
    allServices: "Ver todos los servicios",
    pitchDeck: "Solicitar pitch deck",
    publicSectorOverview: "Ver capacidades del sector publico",
    capabilitiesBrief: "Solicitar resumen federal de capacidades",
  },
};

function getUniversalCtaLocale(locale?: SupportedLocale): "en" | "es" {
  return locale === "es" ? "es" : "en";
}

export function getUniversalCta(
  key: UniversalCtaKey,
  locale?: SupportedLocale,
): UniversalCtaDefinition {
  const resolvedLocale = getUniversalCtaLocale(locale);

  return {
    href: UNIVERSAL_CTA_HREFS[key],
    label: UNIVERSAL_CTA_LABELS[resolvedLocale][key],
  };
}

export function getUniversalCtaSet(
  locale?: SupportedLocale,
): Record<UniversalCtaKey, UniversalCtaDefinition> {
  return {
    primary: getUniversalCta("primary", locale),
    portfolio: getUniversalCta("portfolio", locale),
    services: getUniversalCta("services", locale),
    caseStudy: getUniversalCta("caseStudy", locale),
    publicSector: getUniversalCta("publicSector", locale),
    allServices: getUniversalCta("allServices", locale),
    pitchDeck: getUniversalCta("pitchDeck", locale),
    publicSectorOverview: getUniversalCta("publicSectorOverview", locale),
    capabilitiesBrief: getUniversalCta("capabilitiesBrief", locale),
  };
}
