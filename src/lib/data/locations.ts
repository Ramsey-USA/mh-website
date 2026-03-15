/**
 * Location Data Configuration
 * Centralized location information for all service areas
 */
import { COMPANY_INFO } from "@/lib/constants/company";

const LOCATION_CONTACT = {
  telephone: COMPANY_INFO.phone.display,
  email: COMPANY_INFO.email.main,
  address: {
    street: COMPANY_INFO.address.street,
    city: COMPANY_INFO.address.city,
    state: COMPANY_INFO.address.state,
    zip: COMPANY_INFO.address.zip,
  },
};

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
  /** Primary USPS postal codes for the served city — used for structured data and keyword generation */
  serviceZipCodes?: string[];
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["99352", "99354"],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["99336", "99337", "99338"],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["99301", "99302"],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["98901", "98902", "98903", "98908"],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: [
      "99201",
      "99202",
      "99203",
      "99204",
      "99205",
      "99206",
      "99207",
      "99208",
    ],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["99353"],
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
    ...LOCATION_CONTACT,
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
    serviceZipCodes: ["99362"],
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
  hermiston: {
    slug: "hermiston",
    city: "Hermiston",
    state: "OR",
    county: "Umatilla County",
    militaryTitle: "Forward Base → Hermiston",
    tagline: "Oregon Columbia Basin Construction Excellence",
    description:
      "Bringing veteran-owned construction expertise to Hermiston and the Oregon Columbia Basin with honesty, integrity, professionalism, and thoroughness.",
    ...LOCATION_CONTACT,
    coordinates: COMPANY_INFO.coordinates,
    seo: {
      title:
        "Forward Base → Hermiston | General Contractor Hermiston OR | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Hermiston OR. Commercial, industrial & agricultural construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Forward Base Hermiston Oregon construction",
        "general contractor Hermiston OR",
        "general contractor Hermiston Oregon",
        "construction company Hermiston OR",
        "commercial contractor Hermiston Oregon",
        "Hermiston construction services",
        "veteran-owned contractor Hermiston",
        "Umatilla County general contractor",
        "Hermiston OR builder",
        "construction management Hermiston",
        "industrial contractor Hermiston Oregon",
        "agricultural facility contractor Hermiston",
      ],
      openGraphDescription:
        "Forward Base → Hermiston: Oregon Columbia Basin Construction Excellence. Professional veteran-owned construction services serving Hermiston. Commercial, industrial & agricultural projects.",
      twitterDescription:
        "Professional construction services in Hermiston, OR. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationHermiston",
    localExpertise: {
      title: "Serving the Hermiston Area",
      description: [
        "Expanding our veteran-owned construction services to Hermiston and the Oregon Columbia Basin. We understand the region's industrial and agricultural development demands and bring the same rigorous standards that have served the Tri-Cities since 2010.",
        "Licensed in Oregon, Washington, and Idaho, MH Construction is positioned to serve Hermiston clients across commercial, industrial, and government project types — with transparent pricing and mission-focused delivery.",
      ],
    },
    servicePriorities: [
      "Industrial and warehouse construction",
      "Agricultural facility builds",
      "Commercial development",
    ],
    nearbyAreas: ["Hermiston", "Umatilla County", "Boardman", "Irrigon"],
    serviceZipCodes: ["97838"],
  },
  pendleton: {
    slug: "pendleton",
    city: "Pendleton",
    state: "OR",
    county: "Umatilla County",
    militaryTitle: "Tactical Position → Pendleton",
    tagline: "Eastern Oregon Construction Excellence",
    description:
      "Delivering veteran-owned construction services to Pendleton and Eastern Oregon with honesty, integrity, professionalism, and thoroughness.",
    ...LOCATION_CONTACT,
    coordinates: COMPANY_INFO.coordinates,
    seo: {
      title:
        "Tactical Position → Pendleton | General Contractor Pendleton OR | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Pendleton OR. Commercial, industrial & government construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Tactical Position Pendleton Oregon construction",
        "general contractor Pendleton OR",
        "general contractor Pendleton Oregon",
        "construction company Pendleton OR",
        "commercial contractor Pendleton Oregon",
        "Pendleton construction services",
        "veteran-owned contractor Pendleton",
        "Umatilla County general contractor",
        "Pendleton OR builder",
        "construction management Pendleton",
        "government contractor Pendleton Oregon",
      ],
      openGraphDescription:
        "Tactical Position → Pendleton: Eastern Oregon Construction Excellence. Professional veteran-owned construction services serving Pendleton. Commercial, industrial & government projects.",
      twitterDescription:
        "Professional construction services in Pendleton, OR. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationPendleton",
    localExpertise: {
      title: "Serving Eastern Oregon from Pendleton",
      description: [
        "Pendleton anchors Eastern Oregon's commercial and government construction corridor. Our veteran-owned team brings the same mission-focused execution that has served the Tri-Cities for 15+ years to every Pendleton and Umatilla County project.",
        "Licensed in Oregon, Washington, and Idaho, MH Construction delivers commercial, industrial, and public-sector builds across Eastern Oregon with transparent communication and zero-surprise project delivery.",
      ],
    },
    servicePriorities: [
      "Commercial construction",
      "Industrial facility builds",
      "Government and municipal projects",
    ],
    nearbyAreas: [
      "Pendleton",
      "Umatilla County",
      "Milton-Freewater",
      "Hermiston",
    ],
    serviceZipCodes: ["97801"],
  },
  "coeur-d-alene": {
    slug: "coeur-d-alene",
    city: "Coeur d'Alene",
    state: "ID",
    county: "Kootenai County",
    militaryTitle: "Northern Operations → Coeur d'Alene",
    tagline: "North Idaho Construction Excellence",
    description:
      "Bringing veteran-owned construction expertise to Coeur d'Alene and North Idaho with honesty, integrity, professionalism, and thoroughness.",
    ...LOCATION_CONTACT,
    coordinates: COMPANY_INFO.coordinates,
    seo: {
      title:
        "Northern Operations → Coeur d'Alene | General Contractor Coeur d'Alene ID | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Coeur d'Alene ID. Commercial, resort & government construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Northern Operations Coeur d'Alene Idaho construction",
        "general contractor Coeur d'Alene ID",
        "general contractor Coeur d'Alene Idaho",
        "construction company Coeur d'Alene ID",
        "commercial contractor Coeur d'Alene Idaho",
        "Coeur d'Alene construction services",
        "veteran-owned contractor Coeur d'Alene",
        "Kootenai County general contractor",
        "Coeur d'Alene ID builder",
        "construction management Coeur d'Alene",
        "resort construction North Idaho",
        "CDA contractor Idaho",
      ],
      openGraphDescription:
        "Northern Operations → Coeur d'Alene: North Idaho Construction Excellence. Professional veteran-owned construction services serving Coeur d'Alene. Commercial, resort & government projects.",
      twitterDescription:
        "Professional construction services in Coeur d'Alene, ID. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationCoeurDAlene",
    localExpertise: {
      title: "Serving Coeur d'Alene and North Idaho",
      description: [
        "Coeur d'Alene is one of the Pacific Northwest's fastest-growing markets, with strong demand across commercial, resort hospitality, and public-sector construction. Our veteran-owned team brings licensed Idaho expertise and the same mission-precision that has served Eastern Washington since 2010.",
        "Licensed in Idaho, Washington, and Oregon, MH Construction is ready to partner on Coeur d'Alene and Kootenai County projects of any scale — with transparent pricing, honest timelines, and veteran-earned professionalism.",
      ],
    },
    servicePriorities: [
      "Commercial and resort construction",
      "Industrial builds",
      "Government and municipal projects",
    ],
    nearbyAreas: ["Coeur d'Alene", "Kootenai County", "Post Falls", "Hayden"],
    serviceZipCodes: ["83814", "83815"],
  },
  omak: {
    slug: "omak",
    city: "Omak",
    state: "WA",
    county: "Okanogan County",
    militaryTitle: "Remote Station → Omak",
    tagline: "Okanogan Valley Construction Excellence",
    description:
      "Delivering veteran-owned construction services to Omak and the Okanogan Valley with honesty, integrity, professionalism, and thoroughness.",
    ...LOCATION_CONTACT,
    coordinates: COMPANY_INFO.coordinates,
    seo: {
      title:
        "Remote Station → Omak | General Contractor Omak WA | MH Construction",
      metaDescription:
        "Veteran-owned GC serving Omak WA. Commercial, agricultural & community construction with military precision. Licensed WA, OR, ID. Call (509) 308-6489.",
      keywords: [
        "Remote Station Omak Washington construction",
        "general contractor Omak WA",
        "general contractor Omak Washington",
        "construction company Omak WA",
        "commercial contractor Omak Washington",
        "Omak construction services",
        "veteran-owned contractor Omak",
        "Okanogan County general contractor",
        "Omak WA builder",
        "construction management Omak",
        "rural commercial contractor Okanogan County",
      ],
      openGraphDescription:
        "Remote Station → Omak: Okanogan Valley Construction Excellence. Professional veteran-owned construction services serving Omak. Commercial, agricultural & community projects.",
      twitterDescription:
        "Professional construction services in Omak, WA. Veteran-owned, partnership-driven approach.",
    },
    breadcrumbKey: "locationOmak",
    localExpertise: {
      title: "Serving the Okanogan Valley",
      description: [
        "Omak and the Okanogan Valley represent a growing market for quality construction services. Our veteran-owned team brings the discipline and transparency that rural communities deserve — no shortcuts, no surprises, and honest communication from first conversation to final inspection.",
        "Based in Pasco and licensed throughout Washington, we serve Omak and Okanogan County clients with the same commitment to quality and community partnership that defines every MH Construction project.",
      ],
    },
    servicePriorities: [
      "Rural commercial construction",
      "Agricultural and industrial builds",
      "Community infrastructure",
    ],
    nearbyAreas: ["Omak", "Okanogan County", "Okanogan", "Tonasket"],
    serviceZipCodes: ["98841"],
  },
};

// Helper function to get location by slug
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations[slug];
}
