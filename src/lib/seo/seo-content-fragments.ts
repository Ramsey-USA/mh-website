/**
 * SEO Content Fragments
 * Reusable, SEO-optimized content snippets for systematic application across the website
 *
 * Purpose: Maintain consistent local SEO messaging, reduce duplication,
 * and ensure all pages include critical location and service keywords
 */

// ============================================================================
// LOCATION-BASED CONTENT FRAGMENTS
// ============================================================================

export const locationFragments = {
  // Primary Service Area Mentions
  triCitiesShort: "Tri-Cities (Richland, Pasco, Kennewick)",
  triCitiesLong: "Tri-Cities area including Richland, Pasco, and Kennewick",
  counties: "Benton County and Franklin County",
  countiesLong: "Benton County and Franklin County, Washington",

  // Extended Service Area
  extendedCities: "Yakima, Spokane, Walla Walla, Hermiston, and Coeur d'Alene",
  extendedRegion: "Eastern Washington and Pacific Northwest",

  // State Coverage
  statesCovered: "Washington, Oregon, and Idaho",
  statesLicensed: "Licensed in WA, OR, and ID",

  // Complete Service Area (for comprehensive pages)
  fullServiceArea:
    "Tri-Cities (Richland, Pasco, Kennewick), Benton County, Franklin County, and throughout the Pacific Northwest including Yakima, Spokane, Walla Walla, Hermiston, and Coeur d'Alene",

  // Headquarters
  headquarters: "Pasco, WA",
  headquartersLong: "3111 N. Capitol Ave., Pasco, WA 99301",

  // SEO-friendly location phrases
  servingPhrase:
    "serving the Tri-Cities (Richland, Pasco, Kennewick) and Pacific Northwest",
  basedInPhrase: "based in Pasco, serving the Tri-Cities area",
  localExpertisePhrase: "local expertise in Benton and Franklin Counties",
  regionalReachPhrase: "regional reach across Washington, Oregon, and Idaho",
} as const;

// ============================================================================
// GENERAL CONTRACTOR KEYWORD VARIATIONS
// ============================================================================

export const contractorKeywords = {
  // Primary variations
  base: "general contractor",

  // Location combinations (for keyword arrays)
  triCitiesVariations: [
    "general contractor Tri-Cities",
    "Tri-Cities general contractor",
    "general contractor Richland",
    "general contractor Pasco",
    "general contractor Kennewick",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
  ],

  countyVariations: [
    "general contractor Benton County",
    "general contractor Franklin County",
    "Benton County general contractor",
    "Franklin County general contractor",
  ],

  cityVariations: [
    "general contractor Richland WA",
    "general contractor Pasco WA",
    "general contractor Kennewick WA",
  ],

  extendedVariations: [
    "general contractor Yakima",
    "general contractor Spokane",
    "general contractor Walla Walla",
    "general contractor Hermiston",
    "general contractor Coeur d'Alene",
  ],

  // Phrases for content
  searchPattern: "general contractor",
  searchNote:
    'Many users search for "general contractor" followed by their city name',
} as const;

// ============================================================================
// SERVICE-BASED CONTENT FRAGMENTS
// ============================================================================

export const serviceFragments = {
  // Core services with location context
  commercialConstruction: {
    short: "commercial construction",
    withLocation: "commercial construction in the Tri-Cities",
    longForm:
      "commercial construction services serving Richland, Pasco, Kennewick, and the Pacific Northwest",
  },

  constructionManagement: {
    short: "construction management",
    withLocation: "construction management in Benton and Franklin Counties",
    longForm:
      "professional construction management services throughout the Tri-Cities and Pacific Northwest",
  },

  governmentProjects: {
    short: "government construction projects",
    withLocation: "government construction in the Tri-Cities area",
    longForm:
      "federal and government construction projects serving Hanford and the Pacific Northwest",
    hanfordSpecific: "Hanford contractor services in the Tri-Cities",
  },

  // Industry-specific mentions
  industries: [
    "commercial construction",
    "industrial construction",
    "medical facility construction",
    "tenant improvements",
    "master planning",
    "pre-construction services",
  ],
} as const;

// ============================================================================
// VETERAN-OWNED MESSAGING FRAGMENTS
// ============================================================================

export const veteranFragments = {
  ownership: "veteran-owned",
  ownershipLong: "veteran-owned and operated since January 2025",
  leadership: "Army veteran leadership",
  leadershipLong: "led by Army veteran Jeremy Thamert",

  // Combined phrases
  veteranOwnedContractor: "veteran-owned general contractor",
  veteranOwnedLocal: "veteran-owned contractor serving the Tri-Cities",

  // Value propositions
  militaryPrecision: "military precision",
  militaryValues: "military values and construction excellence",

  // Keywords for arrays
  veteranKeywords: [
    "veteran-owned contractor",
    "Army veteran construction",
    "military precision construction",
    "veteran-owned business",
  ],
} as const;

// ============================================================================
// BRAND VALUE FRAGMENTS
// ============================================================================

export const brandValueFragments = {
  // Core slogan
  mainSlogan: "Building projects for the client, NOT the dollar",
  relationshipROI: "THE ROI IS THE RELATIONSHIP",

  // Four core values
  coreValues: [
    "Professionalism",
    "Thoroughness",
    "Honesty",
    "Integrity",
    "Innovation",
    "Partnership",
  ],

  coreValuesPhrase: "Honesty, Integrity, Professionalism, and Thoroughness",
  trustPhrase: "building trust through proven excellence",

  // Value proposition snippets
  partnershipApproach: "working WITH you, not FOR you",
  transparentPricing: "transparent pricing and open communication",
  qualityCommitment: "uncompromising quality and attention to detail",
} as const;

// ============================================================================
// SEO-OPTIMIZED DESCRIPTION BUILDERS
// ============================================================================

/**
 * Generate SEO-optimized description with location context
 */
export function buildLocationDescription(
  serviceType: string,
  emphasis: "primary" | "extended" | "full" = "primary",
): string {
  const base = `${serviceType} ${locationFragments.servingPhrase}`;

  if (emphasis === "extended") {
    return `${base}. Licensed in ${locationFragments.statesCovered}, with expertise in ${locationFragments.extendedCities}.`;
  }

  if (emphasis === "full") {
    return `${serviceType} throughout ${locationFragments.fullServiceArea}. ${locationFragments.statesLicensed}.`;
  }

  return `${base}. Headquarters in ${locationFragments.headquarters}, serving ${locationFragments.counties}.`;
}

/**
 * Generate comprehensive keyword array with location variants
 */
export function buildLocationKeywords(
  baseKeywords: string[],
  includeExtended = true,
): string[] {
  const locationKeywords: string[] = [
    ...contractorKeywords.triCitiesVariations,
    ...contractorKeywords.countyVariations,
    ...contractorKeywords.cityVariations,
  ];

  if (includeExtended) {
    locationKeywords.push(...contractorKeywords.extendedVariations);
  }

  return [...baseKeywords, ...locationKeywords];
}

/**
 * Generate service-specific description with location
 */
export function buildServiceDescription(
  serviceName: string,
  serviceType:
    | "commercialConstruction"
    | "constructionManagement"
    | "governmentProjects",
  includeVeteran = true,
): string {
  const service = serviceFragments[serviceType];
  const veteranPrefix = includeVeteran
    ? `${veteranFragments.veteranOwnedContractor} providing `
    : "";

  return `${veteranPrefix}${serviceName} - ${service.longForm}. ${brandValueFragments.mainSlogan}.`;
}

/**
 * Generate full SEO title with location
 */
export function buildSEOTitle(
  pageTitle: string,
  includeLocation = true,
  locationSpecific?: string,
): string {
  const location = locationSpecific || locationFragments.triCitiesShort;
  const locationSuffix = includeLocation ? ` | ${location}` : "";

  return `${pageTitle}${locationSuffix} | MH Construction`;
}

// ============================================================================
// CONTENT TEMPLATES FOR COMMON SECTIONS
// ============================================================================

export const contentTemplates = {
  // Standard footer service area text
  footerServiceArea: `Serving ${locationFragments.fullServiceArea}. ${locationFragments.statesLicensed}.`,

  // Contact page location text
  contactLocation: `Headquarters: ${locationFragments.headquartersLong}. ${locationFragments.servingPhrase}.`,

  // About page location context
  aboutLocation: `Based in ${locationFragments.headquarters}, proudly serving ${locationFragments.triCitiesLong}, ${locationFragments.counties}, and communities throughout the Pacific Northwest.`,

  // Service page location introduction
  serviceIntro: (serviceName: string) =>
    `${serviceName} services throughout the ${locationFragments.triCitiesLong}. ${veteranFragments.veteranOwnedLocal} with ${locationFragments.localExpertisePhrase} and ${locationFragments.regionalReachPhrase}.`,

  // General contractor search pattern note
  searchPatternNote: `${contractorKeywords.searchNote} (e.g., "general contractor Richland", "Pasco general contractor", "Kennewick contractor"). MH Construction is a licensed general contractor serving all Tri-Cities communities.`,
} as const;

// ============================================================================
// STRUCTURED DATA HELPERS
// ============================================================================

/**
 * Generate areaServed array for Schema.org LocalBusiness
 */
export function getAreaServedSchema() {
  return [
    // Primary cities
    { "@type": "City" as const, name: "Richland", addressRegion: "WA" },
    { "@type": "City" as const, name: "Pasco", addressRegion: "WA" },
    { "@type": "City" as const, name: "Kennewick", addressRegion: "WA" },

    // Counties
    {
      "@type": "AdministrativeArea" as const,
      name: "Benton County",
      addressRegion: "WA",
    },
    {
      "@type": "AdministrativeArea" as const,
      name: "Franklin County",
      addressRegion: "WA",
    },

    // Extended cities
    { "@type": "City" as const, name: "Yakima", addressRegion: "WA" },
    { "@type": "City" as const, name: "Spokane", addressRegion: "WA" },
    { "@type": "City" as const, name: "Walla Walla", addressRegion: "WA" },
    { "@type": "City" as const, name: "Hermiston", addressRegion: "OR" },
    { "@type": "City" as const, name: "Coeur d'Alene", addressRegion: "ID" },

    // States
    { "@type": "State" as const, name: "Washington" },
    { "@type": "State" as const, name: "Oregon" },
    { "@type": "State" as const, name: "Idaho" },

    // Region
    { "@type": "Place" as const, name: "Pacific Northwest Region" },
  ];
}

// ============================================================================
// EXPORT CONVENIENCE OBJECT
// ============================================================================

export const SEOFragments = {
  location: locationFragments,
  contractor: contractorKeywords,
  service: serviceFragments,
  veteran: veteranFragments,
  brand: brandValueFragments,
  templates: contentTemplates,
  builders: {
    locationDescription: buildLocationDescription,
    locationKeywords: buildLocationKeywords,
    serviceDescription: buildServiceDescription,
    seoTitle: buildSEOTitle,
  },
  schema: {
    areaServed: getAreaServedSchema,
  },
} as const;

export default SEOFragments;
