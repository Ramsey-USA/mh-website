import type { MetadataRoute } from "next";
import { getFAQCategorySlugs } from "@/lib/data/faq-data";
import { getLocationSlugs, locations } from "@/lib/data/locations";
import {
  getPublishedProjectCaseStudyBySlug,
  getPublishedProjectCaseStudySlugs,
} from "@/lib/data/project-case-studies";
import { getPublishedServiceDetailRoutes } from "@/lib/data/service-routes";
import { eventRecords } from "@/lib/data/events";
import { ALL_CLUSTER_SLUGS } from "@/lib/data/safety-manual-clusters";
import { redirects } from "@/lib/routing/redirects";
import {
  getCanonicalSiteOrigin,
  isEventsHubIndexable,
} from "@/lib/site-config";

export type RouteLocale = "en" | "es";
export type RouteSection =
  | "core"
  | "services"
  | "projects"
  | "locations"
  | "resources"
  | "trust"
  | "legal"
  | "events";

export type CanonicalRouteManifestEntry = {
  path: `/${string}`;
  section: RouteSection;
  label: {
    en: string;
    es: string;
  };
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: string;
  locales: {
    en: true;
    es: boolean;
  };
};

const LAST_MODIFIED = {
  static: "2026-07-19",
  legal: "2026-05-01",
  events: "2026-07-01",
  faq: "2026-05-01",
  locations: "2026-07-01",
  resources: "2026-07-01",
} as const;

const SPANISH_PARITY_STATIC_PATHS = new Set<string>([
  "/",
  "/about",
  "/allies",
  "/careers",
  "/contact",
  "/cool-desert-nights",
  "/faq",
  "/jeremy-thamert",
  "/news",
  "/projects",
  "/public-sector",
  "/public-sector/tri-state-government-construction",
  "/public-sector/veteran-led-compliance",
  "/resources",
  "/resources/safety-manual/contents",
  "/resources/safety-manual/forms",
  "/safety",
  "/services",
  "/team",
  "/terms",
  "/testimonials",
  "/veterans",
  "/veterans/public-sector-construction",
  "/accessibility",
  "/privacy",
]);

const STATIC_ROUTES: CanonicalRouteManifestEntry[] = [
  {
    path: "/",
    section: "core",
    label: { en: "Home", es: "Inicio" },
    changeFrequency: "monthly",
    priority: 1,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/about",
    section: "core",
    label: { en: "About", es: "Nosotros" },
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/services",
    section: "services",
    label: { en: "Services", es: "Servicios" },
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/projects",
    section: "projects",
    label: { en: "Projects", es: "Proyectos" },
    changeFrequency: "weekly",
    priority: 0.85,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/contact",
    section: "core",
    label: { en: "Contact", es: "Contacto" },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/allies",
    section: "services",
    label: { en: "Allies", es: "Aliados" },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/veterans",
    section: "trust",
    label: { en: "Veterans", es: "Veteranos" },
    changeFrequency: "monthly",
    priority: 0.85,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/veterans/public-sector-construction",
    section: "trust",
    label: {
      en: "Veterans Public-Sector Construction",
      es: "Construccion Publica para Veteranos",
    },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/public-sector",
    section: "services",
    label: { en: "Public Sector", es: "Sector Publico" },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/public-sector/tri-state-government-construction",
    section: "services",
    label: {
      en: "Tri-State Government Construction",
      es: "Construccion Gubernamental Tri-State",
    },
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/public-sector/veteran-led-compliance",
    section: "services",
    label: {
      en: "Veteran-Led Compliance",
      es: "Cumplimiento Liderado por Veteranos",
    },
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/news",
    section: "resources",
    label: { en: "News and Insights", es: "Noticias e ideas" },
    changeFrequency: "monthly",
    priority: 0.72,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true, es: true },
  },
  {
    path: "/resources",
    section: "resources",
    label: { en: "Resources", es: "Recursos" },
    changeFrequency: "monthly",
    priority: 0.75,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true, es: true },
  },
  {
    path: "/resources/safety-manual/contents",
    section: "resources",
    label: {
      en: "Safety Manual Contents",
      es: "Contenido del Manual de Seguridad",
    },
    changeFrequency: "monthly",
    priority: 0.72,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true, es: true },
  },
  {
    path: "/resources/safety-manual/forms",
    section: "resources",
    label: { en: "Safety Forms", es: "Formularios de Seguridad" },
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true, es: true },
  },
  {
    path: "/safety",
    section: "resources",
    label: { en: "Safety", es: "Seguridad" },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true, es: true },
  },
  {
    path: "/faq",
    section: "trust",
    label: { en: "FAQ", es: "Preguntas Frecuentes" },
    changeFrequency: "monthly",
    priority: 0.82,
    lastModified: LAST_MODIFIED.faq,
    locales: { en: true, es: true },
  },
  {
    path: "/locations",
    section: "locations",
    label: { en: "Locations", es: "Ubicaciones" },
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.locations,
    locales: { en: true, es: false },
  },
  {
    path: "/jeremy-thamert",
    section: "trust",
    label: { en: "Jeremy Thamert", es: "Jeremy Thamert" },
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/testimonials",
    section: "trust",
    label: { en: "Testimonials", es: "Resenas" },
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/team",
    section: "core",
    label: { en: "Team", es: "Equipo" },
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/careers",
    section: "core",
    label: { en: "Careers", es: "Carreras" },
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true, es: true },
  },
  {
    path: "/cool-desert-nights",
    section: "events",
    label: { en: "Cool Desert Nights", es: "Cool Desert Nights" },
    changeFrequency: "monthly",
    priority: 0.78,
    lastModified: LAST_MODIFIED.events,
    locales: { en: true, es: true },
  },
  {
    path: "/accessibility",
    section: "legal",
    label: { en: "Accessibility", es: "Accesibilidad" },
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: LAST_MODIFIED.legal,
    locales: { en: true, es: true },
  },
  {
    path: "/privacy",
    section: "legal",
    label: { en: "Privacy", es: "Privacidad" },
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: LAST_MODIFIED.legal,
    locales: { en: true, es: true },
  },
  {
    path: "/terms",
    section: "legal",
    label: { en: "Terms", es: "Terminos" },
    changeFrequency: "yearly",
    priority: 0.5,
    lastModified: LAST_MODIFIED.legal,
    locales: { en: true, es: true },
  },
];

function isCanonicalAndIndexable(path: string): boolean {
  if (path.startsWith("/en/")) return false;
  if (path === "/en") return false;
  if (path.startsWith("/api/")) return false;
  if (path === "/qr-codes") return false;
  if (path.startsWith("/sitemap")) return false;
  if (path.startsWith("/offline")) return false;
  return true;
}

function isRedirectSource(path: string): boolean {
  return redirects.some((record) => record.source === path);
}

function normalizePath(path: string): `/${string}` {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }
  return path as `/${string}`;
}

function toProjectLastModified(yearCompleted: number): string {
  return `${Math.max(yearCompleted, 2010)}-12-31`;
}

function buildDynamicEntries(): CanonicalRouteManifestEntry[] {
  const projectEntries = getPublishedProjectCaseStudySlugs().map((slug) => {
    const project = getPublishedProjectCaseStudyBySlug(slug);

    return {
      path: normalizePath(`/projects/${slug}`),
      section: "projects" as const,
      label: {
        en: project?.title ?? slug,
        es: project?.title ?? slug,
      },
      changeFrequency: "monthly" as const,
      priority: 0.75,
      lastModified: toProjectLastModified(project?.yearCompleted ?? 2026),
      locales: { en: true as const, es: false },
    };
  });

  const locationEntries = getLocationSlugs().map((slug) => {
    const location = locations[slug];
    const city = location?.city ?? slug;

    return {
      path: normalizePath(`/locations/${slug}`),
      section: "locations" as const,
      label: {
        en: `${city}, ${location?.state ?? ""}`.trim(),
        es: `${city}, ${location?.state ?? ""}`.trim(),
      },
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: LAST_MODIFIED.locations,
      locales: { en: true as const, es: false },
    };
  });

  const faqEntries = getFAQCategorySlugs().map((slug) => ({
    path: normalizePath(`/faq/${slug}`),
    section: "trust" as const,
    label: {
      en: `FAQ: ${slug}`,
      es: `Preguntas: ${slug}`,
    },
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: LAST_MODIFIED.faq,
    locales: { en: true as const, es: false },
  }));

  const clusterEntries = ALL_CLUSTER_SLUGS.map((slug) => ({
    path: normalizePath(`/resources/safety-manual/${slug}`),
    section: "resources" as const,
    label: {
      en: `Safety Manual: ${slug}`,
      es: `Manual de Seguridad: ${slug}`,
    },
    changeFrequency: "monthly" as const,
    priority: 0.68,
    lastModified: LAST_MODIFIED.resources,
    locales: { en: true as const, es: false },
  }));

  const serviceEntries = getPublishedServiceDetailRoutes().map((service) => ({
    path: normalizePath(`/services/${service.slug}`),
    section: "services" as const,
    label: {
      en: service.title,
      es: service.title,
    },
    changeFrequency: "monthly" as const,
    priority: 0.74,
    lastModified: LAST_MODIFIED.static,
    locales: { en: true as const, es: false },
  }));

  const eventEntries = eventRecords.map((event) => ({
    path: normalizePath(`/events/${event.slug}`),
    section: "events" as const,
    label: {
      en: event.title,
      es: event.title,
    },
    changeFrequency: "monthly" as const,
    priority: 0.74,
    lastModified: LAST_MODIFIED.events,
    locales: { en: true as const, es: false },
  }));

  return [
    ...projectEntries,
    ...serviceEntries,
    ...eventEntries,
    ...locationEntries,
    ...faqEntries,
    ...clusterEntries,
  ];
}

function buildStaticEntries(): CanonicalRouteManifestEntry[] {
  const includeEvents = isEventsHubIndexable();

  const withConditional = includeEvents
    ? [
        ...STATIC_ROUTES,
        {
          path: "/events" as const,
          section: "events" as const,
          label: { en: "Events", es: "Eventos" },
          changeFrequency: "monthly" as const,
          priority: 0.72,
          lastModified: LAST_MODIFIED.events,
          locales: { en: true as const, es: true },
        },
      ]
    : STATIC_ROUTES;

  return withConditional.map((entry) => {
    if (entry.path in SPANISH_PARITY_STATIC_PATHS) {
      return entry;
    }
    return {
      ...entry,
      locales: { en: true, es: SPANISH_PARITY_STATIC_PATHS.has(entry.path) },
    };
  });
}

export function buildCanonicalRouteManifest(): CanonicalRouteManifestEntry[] {
  const entries = [...buildStaticEntries(), ...buildDynamicEntries()]
    .filter((entry) => isCanonicalAndIndexable(entry.path))
    .filter((entry) => !isRedirectSource(entry.path));

  const uniqueByPath = new Map<string, CanonicalRouteManifestEntry>();
  for (const entry of entries) {
    uniqueByPath.set(entry.path, entry);
  }

  return [...uniqueByPath.values()].sort((left, right) =>
    left.path.localeCompare(right.path),
  );
}

export function toLocalizedRoutePath(
  canonicalPath: `/${string}`,
  locale: RouteLocale,
): `/${string}` {
  if (locale === "en") {
    return canonicalPath;
  }

  if (canonicalPath === "/") {
    return "/es";
  }

  return `/es${canonicalPath}`;
}

export function toAbsoluteRouteUrl(
  canonicalPath: `/${string}`,
  _locale: RouteLocale = "en",
): string {
  const base = getCanonicalSiteOrigin();
  return `${base}${canonicalPath}`;
}

export function toSitemapEntries(
  manifest: CanonicalRouteManifestEntry[],
): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of manifest) {
    entries.push({
      url: toAbsoluteRouteUrl(route.path, "en"),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  return entries.sort((left, right) => left.url.localeCompare(right.url));
}
