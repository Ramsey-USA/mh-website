import { COMPANY_INFO } from "@/lib/constants/company";
import {
  buildCanonicalRouteManifest,
  type CanonicalRouteManifestEntry,
  type RouteLocale,
} from "@/lib/seo/route-manifest";
import { isHtmlSitemapEnabled } from "@/lib/site-config";

const FOOTER_ROUTE_PATHS = {
  about: "/about",
  accessibility: "/accessibility",
  allies: "/allies",
  careers: "/careers",
  events: "/events",
  faq: "/faq",
  jeremyThamert: "/jeremy-thamert",
  news: "/news",
  privacy: "/privacy",
  projects: "/projects",
  publicSector: "/public-sector",
  resources: "/resources",
  safety: "/safety",
  services: "/services",
  team: "/team",
  testimonials: "/testimonials",
  veterans: "/veterans",
} as const;

const FOOTER_GROUP_DEFINITIONS = {
  servicesMarkets: ["services", "projects", "publicSector", "allies"],
  companyProof: ["about", "team", "jeremyThamert", "veterans", "testimonials"],
  resourcesCommunity: [
    "resources",
    "news",
    "safety",
    "faq",
    "careers",
    "events",
  ],
} as const;

const FOOTER_LEGAL_ROUTE_KEYS = ["privacy", "accessibility"] as const;

export type FooterRouteKey = keyof typeof FOOTER_ROUTE_PATHS;
export type FooterNavGroupKey = keyof typeof FOOTER_GROUP_DEFINITIONS;

export type FooterNavLink = {
  key: FooterRouteKey;
  href: `/${string}`;
  label: string;
};

export type FooterNavGroup = {
  key: FooterNavGroupKey;
  items: FooterNavLink[];
};

export type FooterLegalLink = {
  href: `/${string}`;
  label: string;
};

export type SiteFooterModel = {
  navGroups: FooterNavGroup[];
  legalLinks: FooterLegalLink[];
  contact: {
    phoneDisplay: string;
    phoneHref: `tel:${string}`;
    emailDisplay: string;
    emailHref: `mailto:${string}`;
    addressLines: [string, string];
    serviceArea: string;
    primaryRegion: string;
  };
  primaryActionHref: "/contact?intent=project-discussion";
  showHtmlSitemap: boolean;
};

function buildManifestByPath() {
  return new Map<string, CanonicalRouteManifestEntry>(
    buildCanonicalRouteManifest().map((entry) => [entry.path, entry]),
  );
}

function resolveRouteLink(
  key: FooterRouteKey,
  locale: RouteLocale,
  manifestByPath: Map<string, CanonicalRouteManifestEntry>,
): FooterNavLink | null {
  const href = FOOTER_ROUTE_PATHS[key];
  const route = manifestByPath.get(href);
  if (!route) {
    return null;
  }

  if (locale === "es" && !route.locales.es) {
    return null;
  }

  return {
    key,
    href,
    label: route.label[locale],
  };
}

function buildNavGroups(locale: RouteLocale): FooterNavGroup[] {
  const manifestByPath = buildManifestByPath();

  return Object.entries(FOOTER_GROUP_DEFINITIONS).map(
    ([groupKey, routeKeys]) => ({
      key: groupKey as FooterNavGroupKey,
      items: routeKeys.flatMap((routeKey) => {
        const item = resolveRouteLink(routeKey, locale, manifestByPath);
        return item ? [item] : [];
      }),
    }),
  );
}

function buildLegalLinks(locale: RouteLocale): FooterLegalLink[] {
  const manifestByPath = buildManifestByPath();

  return FOOTER_LEGAL_ROUTE_KEYS.flatMap((routeKey) => {
    const item = resolveRouteLink(routeKey, locale, manifestByPath);
    return item ? [{ href: item.href, label: item.label }] : [];
  });
}

export function buildSiteFooterModel(locale: RouteLocale): SiteFooterModel {
  return {
    navGroups: buildNavGroups(locale),
    legalLinks: buildLegalLinks(locale),
    contact: {
      phoneDisplay: COMPANY_INFO.phone.display,
      phoneHref: `tel:${COMPANY_INFO.phone.tel}`,
      emailDisplay: COMPANY_INFO.email.main,
      emailHref: `mailto:${COMPANY_INFO.email.main}`,
      addressLines: [
        COMPANY_INFO.address.street,
        COMPANY_INFO.address.cityStateZip,
      ],
      serviceArea: COMPANY_INFO.details.serviceArea,
      primaryRegion: COMPANY_INFO.details.primaryRegion,
    },
    primaryActionHref: "/contact?intent=project-discussion",
    showHtmlSitemap: isHtmlSitemapEnabled(),
  };
}
