/**
 * Location Data Configuration
 * Centralized location information for all service areas
 */

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
      "Veteran-owned construction excellence serving Richland with honesty, integrity, professionalism, and thoroughness since 2010.",
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
        "Operations Base → Richland: Strategic Construction Operations in Benton County. MH Construction provides professional veteran-owned general contractor services in Richland, Washington with service-earned values and military precision. Dual-label approach: Missions → Projects. Commercial, industrial, and government projects. 150+ years combined expertise. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Forward Operating Base → Kennewick: Tactical Construction Excellence in Benton County. MH Construction provides professional veteran-owned general contractor services in Kennewick, Washington with service-earned values and military precision. Dual-label approach: Rally Point → Contact. Commercial, industrial, and government projects. All-branch veteran leadership. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Command Center → Pasco: Home Base Construction Excellence. MH Construction headquarters serving Pasco, Washington with professional veteran-owned general contractor services. Service-earned values and military precision. Dual-label approach. Commercial, industrial, and government projects. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Outpost → Yakima: Regional Construction Excellence. MH Construction serves Yakima, Washington with professional veteran-owned general contractor services. Service-earned values and military precision. Commercial, industrial, and government projects. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Deployment Zone → Spokane: Eastern Washington Construction Excellence. MH Construction serves Spokane, Washington with professional veteran-owned general contractor services. Service-earned values and military precision. Commercial, industrial, and government projects. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Station → West Richland: Community-Focused Construction. MH Construction serves West Richland, Washington with professional veteran-owned general contractor services. Service-earned values. Commercial, industrial, and government projects. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
        "Forward Position → Walla Walla: Historic Valley Construction Excellence. MH Construction serves Walla Walla, Washington with professional veteran-owned general contractor services. Service-earned values. Commercial, industrial, and government projects. Licensed in WA, OR, ID. Call (509) 308-6489.",
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
