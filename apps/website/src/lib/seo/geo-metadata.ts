import { type Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";

const PAGEHUB_FOUNDATIONAL_KEYWORDS = [
  "general contractor Pasco, WA",
  "Pacific Northwest construction",
  "Tri-Cities contractor",
  "Washington Oregon Idaho contractor",
  "veteran-owned contractor Pacific Northwest",
];

const PAGEHUB_COMMERCIAL_KEYWORDS = [
  "general contractor",
  "commercial construction",
  "industrial construction",
  "construction management",
  "construction project management",
  "office remodeling",
  "commercial renovation",
  "building addition contractor",
  "construction design",
  "industrial facility construction",
  "Commercial Construction Services",
  "Industrial Facility Construction",
  "Office Remodeling And Renovation",
  "Construction Management Solutions",
];

const PAGEHUB_CANONICAL_PHRASES: Record<string, string> = {
  "general contractor pasco wa": "general contractor Pasco, WA",
  "general contractor pasco, wa": "general contractor Pasco, WA",
  "commercial construction services": "Commercial Construction Services",
  "industrial facility construction": "Industrial Facility Construction",
  "office remodeling and renovation": "Office Remodeling And Renovation",
  "construction management solutions": "Construction Management Solutions",
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

  return {
    ...metadata,
    keywords: mergedKeywords,
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

function mergeSitewideKeywords(
  existingKeywords: Metadata["keywords"],
  metadata: Metadata,
): Metadata["keywords"] {
  const normalizedExisting = normalizeKeywords(existingKeywords);
  const strategyKeywords = getKeywordStrategyByRoute(metadata);
  const combinedKeywords = [...normalizedExisting, ...strategyKeywords]
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
  const canonicalUrl =
    typeof canonical === "string" ? canonical : canonical?.toString();

  if (canonicalUrl) {
    return parseRoutePath(canonicalUrl);
  }

  if (metadata.openGraph?.url) {
    return parseRoutePath(metadata.openGraph.url.toString());
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
  return canonical ?? normalizedKeyword;
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
