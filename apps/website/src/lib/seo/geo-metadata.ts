import { type Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  MH_SLOGANS,
  normalizeMhPhrasesInText,
} from "@/lib/branding/page-names";

const PAGEHUB_FOUNDATIONAL_KEYWORDS = [
  "general contractor Pasco, WA",
  "Pacific Northwest construction",
  "Tri-Cities contractor",
  "Washington Oregon Idaho contractor",
  "veteran-owned contractor Pacific Northwest",
  MH_SLOGANS.primary,
  MH_SLOGANS.supporting[0],
  "mission-ready construction mission-partner alignment",
  "client partner construction delivery",
];

const PAGEHUB_JEREMY_AUTHORITY_KEYWORDS = [
  "Jeremy Thamert",
  "Jeremy Gale Thamert",
  "Jeremy Thamert MH Construction",
  "Jeremy Thamert Owner and President",
  "Jeremy Thamert leadership",
  "Jeremy Thamert verified leadership profile",
  "Jeremy Thamert Washington L&I contractor record",
  "mhc-gc.com Jeremy Thamert",
];

const PAGEHUB_COMMERCIAL_KEYWORDS = [
  "general contractor",
  "mission-ready construction",
  "industrial construction",
  "mission management",
  "mission management",
  "mission-partner-focused construction planning",
  "owner representative coordination",
  "property and facilities construction support",
  "public-sector mission-partner construction delivery",
  "agricultural and winery project delivery",
  "mission-ready fit-outs",
  "office remodeling",
  "mission-ready renovation",
  "building addition contractor",
  "construction design",
  "industrial facility construction",
  "Mission-Ready Construction Services",
  "Industrial Facility Construction",
  "Office Remodeling And Renovation",
  "Mission Management Solutions",
];

const PAGEHUB_CANONICAL_PHRASES: Record<string, string> = {
  "general contractor pasco wa": "general contractor Pasco, WA",
  "general contractor pasco, wa": "general contractor Pasco, WA",
  "commercial construction services": "Mission-Ready Construction Services",
  "commercial construction": "mission-ready construction",
  "construction management": "mission management",
  "construction project management": "mission management",
  "project management": "mission management",
  "tenant improvements": "mission-ready fit-outs",
  "tenant improvement": "mission-ready fit-outs",
  preconstruction: "predeployment",
  "pre-construction": "predeployment",
  closeout: "handoff",
  turnover: "handoff",
  "industrial facility construction": "Industrial Facility Construction",
  "office remodeling and renovation": "Office Remodeling And Renovation",
  "construction management solutions": "Mission Management Solutions",
};

const COMPLIANCE_ROUTE_PREFIXES = [
  "/privacy",
  "/terms",
  "/accessibility",
  "/offline",
  "/not-found",
];

interface GeoOverride {
  placename?: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Adds stable GEO metadata tags used by search engines and location-aware crawlers.
 */
export function withGeoMetadata(
  metadata: Metadata,
  geoOverride?: GeoOverride,
): Metadata {
  const latitude = geoOverride?.latitude ?? COMPANY_INFO.coordinates.latitude;
  const longitude =
    geoOverride?.longitude ?? COMPANY_INFO.coordinates.longitude;
  const placename = geoOverride?.placename ?? COMPANY_INFO.address.city;
  const region =
    geoOverride?.region ??
    `${COMPANY_INFO.address.country}-${COMPANY_INFO.address.stateCode}`;

  // Extract state code from region string (e.g., "US-OR" → "OR")
  const stateCode = region.includes("-")
    ? (region.split("-")[1] ?? COMPANY_INFO.address.stateCode)
    : COMPANY_INFO.address.stateCode;

  const existingOther = normalizeOther(metadata.other);
  const mergedKeywords = mergeSitewideKeywords(metadata.keywords, metadata);
  const localizedAlternates = buildLocalizedAlternates(
    metadata.alternates,
    metadata.metadataBase,
  );

  return {
    ...metadata,
    keywords: mergedKeywords,
    alternates: localizedAlternates,
    other: {
      ...existingOther,
      "geo.region": region,
      "geo.placename": placename,
      "geo.position": `${latitude};${longitude}`,
      ICBM: `${latitude}, ${longitude}`,
      "business:contact_data:locality": placename,
      "business:contact_data:region": stateCode,
      "business:contact_data:postal_code": COMPANY_INFO.address.zip,
      "business:contact_data:country_name": "USA",
    },
  };
}

function buildLocalizedAlternates(
  alternates: Metadata["alternates"],
  metadataBase: Metadata["metadataBase"],
): Metadata["alternates"] {
  const fallbackBaseUrl = resolveMetadataBase(metadataBase);
  const canonicalValue = alternates?.canonical;
  const canonicalUrl = resolveCanonicalUrl(canonicalValue, fallbackBaseUrl);

  if (!canonicalUrl) {
    return alternates;
  }

  const canonicalBaseUrl = resolveCanonicalOrigin(
    canonicalUrl,
    fallbackBaseUrl,
  );

  const routePath = parseRoutePath(canonicalUrl);
  if (!routePath) {
    return alternates;
  }

  const normalizedPath = stripLocalePrefix(routePath);
  const enUrl = `${canonicalBaseUrl}${normalizedPath}`;
  const enPath = normalizedPath === "/" ? "/en" : `/en${normalizedPath}`;
  const esPath = normalizedPath === "/" ? "/es" : `/es${normalizedPath}`;
  const enLocalizedUrl = `${canonicalBaseUrl}${enPath}`;
  const esUrl = `${canonicalBaseUrl}${esPath}`;

  return {
    ...alternates,
    canonical: canonicalUrl,
    languages: {
      ...alternates?.languages,
      "x-default": enUrl,
      "en-US": enLocalizedUrl,
      "es-US": esUrl,
    },
  };
}

function resolveCanonicalOrigin(
  canonicalUrl: string,
  fallbackBaseUrl: string,
): string {
  try {
    return new URL(canonicalUrl).origin;
  } catch {
    return fallbackBaseUrl;
  }
}

function resolveMetadataBase(metadataBase: Metadata["metadataBase"]): string {
  const fallback = COMPANY_INFO.urls.getSiteUrl().replace(/\/$/, "");
  if (!metadataBase) {
    return fallback;
  }

  try {
    return new URL(metadataBase.toString()).origin;
  } catch {
    return fallback;
  }
}

function resolveCanonicalUrl(
  canonical: unknown,
  baseUrl: string,
): string | null {
  const canonicalString = stringifyUrlLike(canonical);
  if (!canonicalString) {
    return null;
  }

  if (
    canonicalString.startsWith("http://") ||
    canonicalString.startsWith("https://")
  ) {
    return canonicalString.replace(/\/$/, "") || canonicalString;
  }

  try {
    return new URL(canonicalString, `${baseUrl}/`)
      .toString()
      .replace(/\/$/, "");
  } catch {
    return null;
  }
}

function stringifyUrlLike(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (value instanceof URL) {
    return value.toString();
  }

  if (typeof value === "object") {
    const maybeUrl = (value as { url?: unknown }).url;
    if (typeof maybeUrl === "string") {
      return maybeUrl;
    }
    if (maybeUrl instanceof URL) {
      return maybeUrl.toString();
    }
  }

  return null;
}

function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/es") {
    return "/";
  }
  if (pathname.startsWith("/en/")) {
    return pathname.slice(3);
  }
  if (pathname.startsWith("/es/")) {
    return pathname.slice(3);
  }
  return pathname;
}

function mergeSitewideKeywords(
  existingKeywords: Metadata["keywords"],
  metadata: Metadata,
): Metadata["keywords"] {
  const normalizedExisting = normalizeKeywords(existingKeywords);
  const strategyKeywords = getKeywordStrategyByRoute(metadata);
  const combinedKeywords = [
    ...normalizedExisting,
    ...PAGEHUB_JEREMY_AUTHORITY_KEYWORDS,
    ...strategyKeywords,
  ]
    .map(canonicalizePageHubPhrase)
    .filter(Boolean);

  const dedupedKeywords: string[] = [];
  const seen = new Set<string>();

  for (const keyword of combinedKeywords) {
    const dedupeKey = keyword.toLowerCase();
    if (seen.has(dedupeKey)) {
      continue;
    }
    seen.add(dedupeKey);
    dedupedKeywords.push(keyword);
  }

  return dedupedKeywords;
}

function getKeywordStrategyByRoute(metadata: Metadata): string[] {
  const routePath = getRoutePathFromMetadata(metadata);

  if (
    routePath &&
    COMPLIANCE_ROUTE_PREFIXES.some(
      (prefix) => routePath === prefix || routePath.startsWith(`${prefix}/`),
    )
  ) {
    return PAGEHUB_FOUNDATIONAL_KEYWORDS;
  }

  return [...PAGEHUB_FOUNDATIONAL_KEYWORDS, ...PAGEHUB_COMMERCIAL_KEYWORDS];
}

function getRoutePathFromMetadata(metadata: Metadata): string | null {
  const canonical = metadata.alternates?.canonical;
  const canonicalUrl = stringifyUrlLike(canonical);

  if (canonicalUrl) {
    return parseRoutePath(canonicalUrl);
  }

  const openGraphUrl = stringifyUrlLike(
    (metadata.openGraph as { url?: unknown } | undefined)?.url,
  );
  if (openGraphUrl) {
    return parseRoutePath(openGraphUrl);
  }

  return null;
}

function parseRoutePath(urlOrPath: string): string | null {
  if (!urlOrPath) {
    return null;
  }

  if (urlOrPath.startsWith("/")) {
    return urlOrPath;
  }

  try {
    const parsed = new URL(urlOrPath);
    return parsed.pathname || "/";
  } catch {
    return null;
  }
}

function canonicalizePageHubPhrase(keyword: string): string {
  const normalizedKeyword = keyword.trim().replace(/\s+/g, " ");
  const canonical = PAGEHUB_CANONICAL_PHRASES[normalizedKeyword.toLowerCase()];
  return normalizeMhPhrasesInText(canonical ?? normalizedKeyword);
}

function normalizeKeywords(existingKeywords: Metadata["keywords"]): string[] {
  if (!existingKeywords) {
    return [];
  }

  if (Array.isArray(existingKeywords)) {
    return existingKeywords.map((keyword) => String(keyword));
  }

  return String(existingKeywords)
    .split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function normalizeOther(metadataOther: Metadata["other"]): {
  [name: string]: string | number | (string | number)[];
} {
  if (!metadataOther) {
    return {};
  }

  const normalized: { [name: string]: string | number | (string | number)[] } =
    {};

  for (const [key, value] of Object.entries(metadataOther)) {
    if (value !== undefined) {
      normalized[key] = value;
    }
  }

  return normalized;
}
