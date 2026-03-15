/**
 * Location Data Configuration
 * Centralized location information for all service areas
 */

/**
 * A completed project associated with a specific service area.
 * Used for GEO-proof content and LocalBusiness schema enrichment.
 */
export interface LocationProject {
  /** Formal project name as it would appear in a portfolio or proposal */
  name: string;
  /** Year or year-range of completion (e.g. 2025, "2025-2026") */
  year?: number | string;
  /** Project category — drives schema serviceType and keyword generation */
  category: string;
  /** Short plain-language description emphasising the relevant MHC core value */
  description?: string;
  /** Which MHC core value this project best exemplifies */
  coreValue?: "Honesty" | "Integrity" | "Professionalism" | "Thoroughness";
}

export interface LocationData {
  slug: string;
  city: string;
  state: string;
  county: string;
  militaryTitle: string; // e.g., "Operations Base", "Forward Operating Base"
  tagline: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  seo: {
    title: string;
    metaDescription: string;
    keywords: string[];
    openGraphDescription: string;
    twitterDescription: string;
  };
  breadcrumbKey: string;
  localExpertise: {
    title: string;
    description: string[];
  };
  servicePriorities?: string[];
  nearbyAreas?: string[];
  /** Verified completed projects in or directly serving this location */
  recentProjects?: LocationProject[];
  /** When true, renders a strong internal link to the Public & Government service page */
  publicSectorHighlight?: boolean;
}

export const locations: Record<string, LocationData> = {
  richland: {
    slug: "richland",
    city: "Richland",
    state: "WA",
    county: "Benton County",
    militaryTitle: "Operations Base → Richland",
    tagline: "Strategic Construction Operations in Benton County",
    description:
      "Founded 2010, veteran-owned since January 2025. Construction excellence serving Richland with honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Operations Base → Richland | General Contractor Richland WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Richland WA. Commercial, industrial & government projects with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Operations Base Richland strategic construction",
        "dual-label military construction Richland",
        "service-earned construction values Richland",
        "general contractor Richland WA",
        "general contractor Richland",
        "construction company Richland",
        "commercial contractor Richland Washington",
        "Richland construction services",
        "veteran-owned contractor Richland",
        "Benton County general contractor",
        "Richland WA builder",
        "construction management Richland",
        "military precision construction Richland",
        "battle-tested construction excellence Richland",
      ],
      openGraphDescription:
        "Operations Base → Richland: Strategic Construction Operations. Professional veteran-owned construction services with service-earned values and 150+ years combined expertise. Dual-label approach. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Richland, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationRichland",
    localExpertise: {
      title: "Local Richland Expertise",
      description: [
        "Based in nearby Pasco, we've been serving Richland and the Tri-Cities area since 2010. We understand local building codes, permitting processes, and the unique construction challenges of Eastern Washington.",
        "With over 650 completed projects throughout Benton and Franklin Counties, we're your trusted local partner for construction excellence in Richland.",
      ],
    },
    servicePriorities: [
      "High-end residential production",
      "Site facilitation",
      "Municipal inspections",
    ],
    nearbyAreas: ["Richland", "Benton County"],
    recentProjects: [
      {
        name: "Audi Tri-Cities",
        category: "Automotive / Commercial",
        description:
          "Premium automotive dealership built to OEM brand standards with showcase-quality finishes and honest project delivery throughout.",
        coreValue: "Integrity",
      },
      {
        name: "BMW of Tri-Cities",
        category: "Automotive / Commercial",
        description:
          "Luxury automotive facility demanding precise manufacturer compliance and a craftsmanship-forward approach at every phase.",
        coreValue: "Professionalism",
      },
      {
        name: "Country Mercantile",
        category: "Retail / Hospitality",
        description:
          "Retail and hospitality environment built with transparent communication and honest timelines to serve the Richland community.",
        coreValue: "Honesty",
      },
    ],
  },
  kennewick: {
    slug: "kennewick",
    city: "Kennewick",
    state: "WA",
    county: "Benton County",
    militaryTitle: "Forward Operating Base → Kennewick",
    tagline: "Tactical Construction Excellence in Benton County",
    description:
      "Professional veteran-owned construction services with service-earned values and all-branch veteran leadership. SITREP-level communication.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Forward Operating Base → Kennewick | General Contractor Kennewick WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Kennewick WA. Commercial, industrial & government projects with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Forward Operating Base Kennewick tactical construction",
        "dual-label military construction Kennewick",
        "service-earned construction values Kennewick",
        "general contractor Kennewick WA",
        "general contractor Kennewick",
        "construction company Kennewick",
        "commercial contractor Kennewick Washington",
        "Kennewick construction services",
        "veteran-owned contractor Kennewick",
        "Benton County general contractor",
        "Kennewick WA builder",
        "construction management Kennewick",
        "all-branch veteran leadership Kennewick",
        "SITREP-level communication Kennewick",
      ],
      openGraphDescription:
        "Forward Operating Base → Kennewick: Tactical Construction Excellence. Professional veteran-owned construction services with service-earned values and all-branch veteran leadership. Dual-label approach. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Kennewick, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationKennewick",
    localExpertise: {
      title: "Local Kennewick Expertise",
      description: [
        "Serving Kennewick and the Tri-Cities area since 2010. Our team understands the unique construction requirements and permitting processes specific to Kennewick and Benton County.",
        "With extensive experience in commercial, industrial, and government projects throughout the region, we're your trusted construction partner in Kennewick.",
      ],
    },
    servicePriorities: [
      "High-end residential production",
      "Site facilitation",
      "Municipal inspections",
    ],
    nearbyAreas: ["Kennewick", "Benton County"],
    recentProjects: [
      {
        name: "Tri-Cities Cancer Center Expansion",
        category: "Healthcare",
        description:
          "Specialized medical facility expansion requiring exacting standards and zero disruption to active patient care — Thoroughness in healthcare infrastructure.",
        coreValue: "Thoroughness",
      },
      {
        name: "Tri-City Orthopaedic Clinic",
        category: "Healthcare",
        description:
          "Precision clinic buildout delivering meticulous code compliance and careful coordination with medical equipment suppliers.",
        coreValue: "Professionalism",
      },
      {
        name: "Amazon Building Renovation",
        category: "Commercial / Industrial",
        description:
          "High-profile commercial renovation executed on tight logistics timelines with full transparency on costs and scope changes.",
        coreValue: "Integrity",
      },
    ],
  },
  pasco: {
    slug: "pasco",
    city: "Pasco",
    state: "WA",
    county: "Franklin County",
    militaryTitle: "Command Center → Pasco",
    tagline: "Home Base Construction Excellence in Franklin County",
    description:
      "Headquartered in Pasco since 2010, delivering veteran-owned construction excellence with honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Command Center → Pasco | General Contractor Pasco WA | MH Construction",
      metaDescription:
        "Veteran-owned GC headquartered in Pasco WA. Commercial, industrial & government construction since 2010. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Command Center Pasco home base construction",
        "dual-label military construction Pasco",
        "service-earned construction values Pasco",
        "general contractor Pasco WA",
        "general contractor Pasco",
        "construction company Pasco",
        "commercial contractor Pasco Washington",
        "Pasco construction services",
        "veteran-owned contractor Pasco",
        "Franklin County general contractor",
        "Pasco WA builder",
        "construction management Pasco",
      ],
      openGraphDescription:
        "Command Center → Pasco: Home Base Construction Excellence. Professional veteran-owned construction services headquartered in Pasco. Service-earned values. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Pasco, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationPasco",
    localExpertise: {
      title: "Pasco Headquarters",
      description: [
        "Our headquarters have been in Pasco since 2010. As locals, we have deep knowledge of Franklin County building codes, permitting processes, and the construction landscape.",
        "Being based in Pasco allows us to serve the Tri-Cities area efficiently and maintain close relationships with local suppliers, subcontractors, and officials.",
      ],
    },
    servicePriorities: [
      "Industrial builds",
      "Administrative and office remodels",
    ],
    nearbyAreas: ["Pasco", "Franklin County", "Zillah"],
    recentProjects: [
      {
        name: "Volm Corporate Warehouse",
        category: "Industrial",
        description:
          "Large-scale industrial warehouse delivered with thorough pre-construction planning and direct command-center oversight from our Pasco headquarters.",
        coreValue: "Thoroughness",
      },
      {
        name: "Allied Potato Corporate Office",
        category: "Corporate / Commercial",
        description:
          "Corporate headquarters buildout completed with transparent pricing, clear milestones, and honest communication at every decision point.",
        coreValue: "Honesty",
      },
      {
        name: "Summer's Hub",
        year: 2025,
        category: "Commercial",
        description:
          "2025 mixed-use commercial project demonstrating continued professional investment in Pasco and Franklin County's growing economy.",
        coreValue: "Professionalism",
      },
    ],
  },
  yakima: {
    slug: "yakima",
    city: "Yakima",
    state: "WA",
    county: "Yakima County",
    militaryTitle: "Outpost → Yakima",
    tagline: "Regional Construction Excellence in Yakima County",
    description:
      "Extending veteran-owned construction services to Yakima with the same honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Outpost → Yakima | General Contractor Yakima WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Yakima WA. Commercial, industrial & public-safety construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Outpost Yakima regional construction",
        "dual-label military construction Yakima",
        "service-earned construction values Yakima",
        "general contractor Yakima WA",
        "general contractor Yakima",
        "construction company Yakima",
        "commercial contractor Yakima Washington",
        "Yakima construction services",
        "veteran-owned contractor Yakima",
        "Yakima County general contractor",
        "Yakima WA builder",
        "construction management Yakima",
      ],
      openGraphDescription:
        "Outpost → Yakima: Regional Construction Excellence. Professional veteran-owned construction services serving Yakima. Service-earned values. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Yakima, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationYakima",
    localExpertise: {
      title: "Serving Yakima Valley",
      description: [
        "While based in the Tri-Cities, we have extensive experience serving Yakima and the surrounding Yakima Valley. We understand the regional construction requirements and maintain relationships with local trades.",
        "Our commitment to quality and service excellence extends throughout Central Washington, bringing the same veteran-owned professionalism to every Yakima project.",
      ],
    },
    servicePriorities: [
      "Fire station and emergency services remodeling",
      "Public works infrastructure",
    ],
    nearbyAreas: ["Yakima", "Yakima Valley", "Zillah"],
    recentProjects: [
      {
        name: "Zillah Fire Station #10 Remodel & Admin Building",
        category: "Public Safety / Government",
        description:
          "Full station remodel plus new administrative building for an active fire company — mission-critical public safety infrastructure executed with Thoroughness and zero service interruption.",
        coreValue: "Thoroughness",
      },
      {
        name: "Yakima County Fire District #5 (Parker)",
        category: "Public Safety / Government",
        description:
          "Fire district facility serving Yakima County communities; held to the highest standards of public-sector compliance and life-safety performance.",
        coreValue: "Thoroughness",
      },
    ],
    publicSectorHighlight: true,
  },
  spokane: {
    slug: "spokane",
    city: "Spokane",
    state: "WA",
    county: "Spokane County",
    militaryTitle: "Deployment Zone → Spokane",
    tagline: "Eastern Washington Construction Excellence",
    description:
      "Expanding veteran-owned construction excellence to Spokane with honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Deployment Zone → Spokane | General Contractor Spokane WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Spokane WA. Commercial, industrial & government construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Deployment Zone Spokane construction",
        "dual-label military construction Spokane",
        "service-earned construction values Spokane",
        "general contractor Spokane WA",
        "general contractor Spokane",
        "construction company Spokane",
        "commercial contractor Spokane Washington",
        "Spokane construction services",
        "veteran-owned contractor Spokane",
        "Spokane County general contractor",
        "Spokane WA builder",
        "construction management Spokane",
      ],
      openGraphDescription:
        "Deployment Zone → Spokane: Eastern Washington Construction Excellence. Professional veteran-owned construction services serving Spokane. Service-earned values. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Spokane, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationSpokane",
    localExpertise: {
      title: "Expanding to Spokane",
      description: [
        "As we expand our services to Spokane and Eastern Washington, we bring the same level of professionalism and expertise that has made us successful in the Tri-Cities area.",
        "Our veteran-owned values and commitment to excellence travel with us, ensuring Spokane clients receive the same quality service and partnership-driven approach.",
      ],
    },
    servicePriorities: [
      "General contracting",
      "Commercial tenant improvements",
    ],
    nearbyAreas: ["Spokane", "Spokane County"],
  },
  "west-richland": {
    slug: "west-richland",
    city: "West Richland",
    state: "WA",
    county: "Benton County",
    militaryTitle: "Station → West Richland",
    tagline: "Community-Focused Construction in Benton County",
    description:
      "Serving West Richland with veteran-owned construction services built on honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Station → West Richland | General Contractor West Richland WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving West Richland WA. Commercial, industrial & government projects with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Station West Richland community construction",
        "dual-label military construction West Richland",
        "service-earned construction values West Richland",
        "general contractor West Richland WA",
        "general contractor West Richland",
        "construction company West Richland",
        "commercial contractor West Richland Washington",
        "West Richland construction services",
        "veteran-owned contractor West Richland",
        "Benton County general contractor",
        "West Richland WA builder",
        "construction management West Richland",
      ],
      openGraphDescription:
        "Station → West Richland: Community-Focused Construction. Professional veteran-owned construction services serving West Richland. Service-earned values. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in West Richland, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationWestRichland",
    localExpertise: {
      title: "West Richland Community Partner",
      description: [
        "Serving West Richland and the greater Tri-Cities area since 2010. We understand the community's unique character and construction needs in Benton County.",
        "Our proximity allows us to provide responsive service and maintain strong relationships with local officials and the West Richland community.",
      ],
    },
    servicePriorities: [
      "High-end residential production",
      "Site facilitation",
      "Municipal inspections",
    ],
    nearbyAreas: ["West Richland", "Benton County"],
  },
  "walla-walla": {
    slug: "walla-walla",
    city: "Walla Walla",
    state: "WA",
    county: "Walla Walla County",
    militaryTitle: "Forward Position → Walla Walla",
    tagline: "Historic Valley Construction Excellence",
    description:
      "Bringing veteran-owned construction expertise to Walla Walla with honesty, integrity, professionalism, and thoroughness.",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      street: "3111 N. Capitol Ave.",
      city: "Pasco",
      state: "WA",
      zip: "99301",
    },
    coordinates: {
      latitude: 46.2396,
      longitude: -119.1006,
    },
    seo: {
      title:
        "Forward Position → Walla Walla | General Contractor Walla Walla WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Walla Walla WA. Commercial, industrial & specialty construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Forward Position Walla Walla construction",
        "dual-label military construction Walla Walla",
        "service-earned construction values Walla Walla",
        "general contractor Walla Walla WA",
        "general contractor Walla Walla",
        "construction company Walla Walla",
        "commercial contractor Walla Walla Washington",
        "Walla Walla construction services",
        "veteran-owned contractor Walla Walla",
        "Walla Walla County general contractor",
        "Walla Walla WA builder",
        "construction management Walla Walla",
      ],
      openGraphDescription:
        "Forward Position → Walla Walla: Historic Valley Construction Excellence. Professional veteran-owned construction services serving Walla Walla. Service-earned values. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Walla Walla, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationWallaWalla",
    localExpertise: {
      title: "Serving Walla Walla Valley",
      description: [
        "Extending our services to the historic Walla Walla Valley. We appreciate the area's rich heritage and bring construction services that respect the community's character.",
        "Our veteran-owned commitment to excellence and partnership-driven approach ensures Walla Walla clients receive the same quality service that has built our reputation throughout Eastern Washington.",
      ],
    },
    servicePriorities: [
      "Land development",
      "Private retreats",
      "High-stakes land stewardship",
    ],
    nearbyAreas: ["Walla Walla", "Walla Walla County", "Dayton"],
    recentProjects: [
      {
        name: "NW Equipment Sales",
        category: "Industrial / Equipment",
        description:
          "Regional equipment sales and service facility built for long-term operational durability across the Columbia River Basin corridor.",
        coreValue: "Professionalism",
      },
      {
        name: "Columbia Crest Winery Corridor Projects",
        category: "Specialty / Commercial",
        description:
          "Specialty commercial work in the Columbia Crest Winery region — heritage-sensitive site coordination with high-end finish standards and full client transparency.",
        coreValue: "Integrity",
      },
    ],
  },
};

// Helper function to get location by slug
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations[slug];
}

// Get all location slugs (useful for static generation)
export function getAllLocationSlugs(): string[] {
  return Object.keys(locations);
}
