// Page-specific SEO utilities for MH Construction
import { type Metadata } from "next";
import {
  generateEnhancedMetadata,
  generateConstructionFAQSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  enhancedSEO,
} from "@/components/seo/enhanced-seo";

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Building projects for the client, NOT the dollar | Veteran-Owned Construction | MH Construction",
    description:
      "Veteran-owned construction management services since 2010. Specializing in commercial construction, master planning, preconstruction, tenant improvements, and light industrial construction throughout the Pacific Northwest. Licensed in WA, OR, ID. Four core values (Honesty, Integrity, Professionalism, Thoroughness) building trust through transparent communication and face-to-face consultation. Serving Tri-Cities (Richland, Pasco, Kennewick), Benton County, Franklin County, Yakima, Spokane, Walla Walla, and Eastern Washington.",
    keywords: [
      "veteran-owned contractor Pacific Northwest",
      "general contractor Tri-Cities",
      "Richland general contractor",
      "Pasco general contractor",
      "Kennewick general contractor",
      "Benton County general contractor",
      "Franklin County general contractor",
      "construction management services",
      "commercial construction services",
      "master planning and preconstruction services",
      "tenant improvement services",
      "light industrial construction",
      "general contractor Richland WA",
      "general contractor Pasco WA",
      "general contractor Kennewick WA",
      "Tri-Cities construction company",
      "construction partnership approach",
      "face-to-face construction consultation",
      "construction partnerships Tri-Cities WA",
      "modern construction tools traditional values",
      "collaborative construction relationships",
      "transparent construction communication",
      "long-term construction partnerships",
      "WA OR ID licensed contractor",
      "Eastern Washington contractor",
      "Pacific Northwest general contractor",
    ],
    canonicalUrl: enhancedSEO.siteUrl,
    schemas: [generateConstructionFAQSchema(), generateLocalBusinessSchema()],
  });
}

// Removed: AI Budget Estimator page SEO (feature deprecated)
// Removed: Booking/Consultation page SEO (feature deprecated)

// About page SEO - GROUP 2: Heritage & Trust Foundation
export function getAboutSEO(): Metadata & { schemas: object[] } {
  const companyHistorySchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${enhancedSEO.siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${enhancedSEO.siteUrl}/#organization`,
      name: "MH Construction, Inc.",
      foundingDate: "2010-01-15",
      founder: {
        "@type": "Person",
        name: "Mike Holstein",
        jobTitle: "Founder",
      },
      owns: {
        "@type": "Person",
        name: "Jeremy Thamert",
        jobTitle: "Owner & President",
        description: "Veteran-owned operational leadership since January 2025",
      },
      employee: [
        {
          "@type": "Person",
          name: "Arnold Garcia",
          jobTitle: "Vice President",
          description:
            "15+ years with MH Construction leading client partnerships",
        },
      ],
      award: [
        "AGC-WA Top EMR Award 2019",
        "AGC-WA Top EMR Award 2020",
        "AGC-WA Top EMR Award 2021",
        "AGC-WA Most Improved EMR Award 2025",
        "OSHA VPP Star Designation 2022",
      ],
      knowsAbout: [
        "Commercial Construction",
        "Industrial Construction",
        "Government Construction Projects",
        "Safety Excellence",
        "Partnership-Driven Construction",
        "Team Six Approach",
      ],
      slogan: "We Work WITH You, Not FOR You",
      mission: "Building projects for the client, NOT the dollar",
    },
    mentions: [
      {
        "@type": "Event",
        name: "Company Founded",
        startDate: "2010",
        description:
          "Mike Holstein establishes MH Construction on partnership philosophy",
      },
      {
        "@type": "Event",
        name: "Arnold Garcia Joins as VP",
        startDate: "2016",
        description:
          "Strategic leadership establishing 70% referral rate foundation",
      },
      {
        "@type": "Event",
        name: "First AGC-WA Top EMR Award",
        startDate: "2019",
        description: ".64 EMR achievement - 40% better than industry average",
      },
      {
        "@type": "Event",
        name: "OSHA VPP Star Designation",
        startDate: "2022",
        description: "Highest recognition of workplace safety excellence",
      },
      {
        "@type": "Event",
        name: "Veteran-Owned Transition",
        startDate: "2025-01",
        description:
          "Jeremy Thamert assumes ownership bringing operational discipline",
      },
    ],
  };

  return generateEnhancedMetadata({
    title:
      "Our Story | From Founding Father to Veteran Excellence | Company Evolution 2010-2025 | MH Construction",
    description:
      "15 years of proven excellence: Mike Holstein founded MH Construction in 2010 on partnership values. Now veteran-owned since January 2025 with Jeremy Thamert's operational leadership. 650+ completed projects, 70% referral rate, consecutive AGC-WA Top EMR Awards, OSHA VPP Star certification. Team Six approach: individual specialists, unified mission. Learn our complete evolution from family foundation to industry-leading safety culture.",
    keywords: [
      "veteran-owned construction company 2025",
      "MH Construction company history",
      "construction company evolution 2010-2025",
      "Mike Holstein founder MH Construction",
      "Jeremy Thamert veteran owner",
      "Arnold Garcia VP construction",
      "Team Six construction approach",
      "650+ completed projects Pacific Northwest",
      "70 percent referral rate contractor",
      "AGC Washington Top EMR Award",
      "OSHA VPP Star certification",
      ".64 EMR construction safety",
      "consecutive safety awards AGC-WA",
      "3-state licensed contractor WA OR ID",
      "partnership philosophy construction",
      "honest communication transparent pricing",
      "proven craftsmanship Pacific Northwest",
      "military-grade construction discipline",
      "zero-incident construction culture",
      "Tri-Cities veteran general contractor",
      "Richland construction company history",
      "Pasco veteran-owned construction",
      "Kennewick construction awards",
      "Benton County construction excellence",
      "Franklin County veteran-owned contractor",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/about`,
    schemas: [companyHistorySchema],
  });
}

// Services page SEO - GROUP 3: Future Vision & Expertise
export function getServicesSEO(): Metadata & { schemas: object[] } {
  const constructionServices = [
    {
      name: "Residential Construction",
      description:
        "Custom homes, renovations, and residential projects with veteran-owned precision and honest communication",
      category: "Residential Services",
    },
    {
      name: "Commercial Construction",
      description:
        "Commercial buildings, renovations, and business projects with transparent pricing and proven craftsmanship",
      category: "Commercial Services",
    },
    {
      name: "Government Construction Projects",
      description:
        "Specialized government and military construction projects with veteran-owned business expertise",
      category: "Government Services",
    },
    {
      name: "Construction Management",
      description:
        "Comprehensive project oversight with military precision and partnership approach",
      category: "Project Management",
    },
  ];

  const serviceSchemas = constructionServices.map((service) =>
    generateServiceSchema(service),
  );

  return generateEnhancedMetadata({
    title:
      "The Battle Plan | Veteran-Owned Comprehensive Services | MH Construction",
    description:
      "Veteran-owned construction services: honest communication, transparent pricing, proven craftsmanship. Residential, commercial, and government projects across Pacific Northwest. Where professional excellence today creates trusted partnerships tomorrow.",
    keywords: [
      "veteran-owned construction services",
      "honest construction communication",
      "transparent pricing contractor",
      "proven craftsmanship services",
      "residential commercial construction",
      "government construction projects",
      "comprehensive construction management",
      "Pacific Northwest construction services",
      "military precision building",
      "Tri-Cities construction services",
      "Richland honest contractor services",
      "Pasco veteran-owned construction",
      "Kennewick transparent contractor",
      "Benton County construction services",
      "Franklin County veteran contractor",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/services`,
    schemas: serviceSchemas,
  });
}

// Team page SEO - GROUP 3: Future Vision & Growth
export function getTeamSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Team Six | Veteran-Owned Professional Excellence | Meet Our Team | MH Construction",
    description:
      "Meet the veteran-led team building tomorrow's success today. 150+ years combined expertise in honest communication, transparent pricing, and proven craftsmanship. Professional excellence empowering Pacific Northwest growth through military precision and values-driven construction leadership.",
    keywords: [
      "veteran construction team",
      "veteran-owned construction leadership",
      "honest construction professionals",
      "transparent pricing experts",
      "proven craftsmanship team",
      "construction project managers",
      "Pacific Northwest construction professionals",
      "military veteran expertise",
      "construction team excellence",
      "Tri-Cities veteran construction team",
      "Richland honest contractor team",
      "Pasco veteran professionals",
      "Kennewick construction experts",
      "Benton County veteran-owned team",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/team`,
    schemas: [],
  });
}

// Government page SEO (Public Sector)
export function getGovernmentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Public Sector Excellence | Building Toward Government Contracting | MH Construction",
    description:
      "Veteran-owned construction company building bonding capacity for public sector work. Currently offering grant application support and subcontracting services. Tri-Cities based with Pacific Northwest coverage.",
    keywords: [
      "public sector construction",
      "government grant support",
      "construction subcontractor",
      "veteran-owned contractor",
      "Tri-Cities construction",
      "grant application construction support",
      "Richland public sector",
      "Pasco government support",
      "Hanford area contractor",
      "Benton County construction",
      "Franklin County contractor",
      "Pacific Northwest public sector",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/public-sector`,
    schemas: [],
  });
}

// Veterans page SEO - GROUP 4: Professional & Patriotic
export function getVeteransSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Combat Proven | Honoring Those Who Served | Veteran-Owned Since 2025 | MH Construction",
    description:
      "Veteran-owned under Army veteran leadership since January 2025. Serving those who served with honest communication, transparent pricing, and proven craftsmanship. Supporting Pacific Northwest veterans through hiring initiatives, community partnerships, and shared military values. Mission-focused excellence honoring service.",
    keywords: [
      "veteran-owned construction company",
      "Army veteran leadership",
      "veteran support programs",
      "military veteran hiring",
      "honest veteran employer",
      "transparent veteran business",
      "veteran benefit events",
      "Pacific Northwest veterans",
      "military family support",
      "veteran community partnerships",
      "service-disabled veteran business",
      "military values construction",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/veterans`,
    schemas: [],
  });
}

// Trade Partners page SEO - GROUP 7: Partnership & ROI Focus
export function getTradePartnersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Trade Partner Network | THE ROI IS THE RELATIONSHIP | MH Construction",
    description:
      "Join MH Construction's elite trade partner network where THE ROI IS THE RELATIONSHIP. Professional subcontractor opportunities with veteran-owned business, fair payment practices, consistent Pacific Northwest project flow, and partnerships that deliver mutual success.",
    keywords: [
      "construction subcontractor opportunities",
      "trade partner network",
      "ROI construction partnerships",
      "veteran-owned contractor partnerships",
      "Pacific Northwest subcontractor work",
      "professional construction partnerships",
      "Tri-Cities subcontractor opportunities",
      "Richland trade partner network",
      "Pasco subcontractor work",
      "Kennewick construction partnerships",
      "Benton County subcontractors",
      "Franklin County trade partners",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/allies`,
    schemas: [],
  });
}

// Careers page SEO - GROUP 5: Recruitment & Growth
export function getCareersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Occupation Specialties | Build Your Future with Veteran Values | MH Construction Careers",
    description:
      "Your career growth is our mission. Join a veteran-owned team where honest communication, transparent expectations, and proven mentorship create tomorrow's leaders. Exciting construction career opportunities with competitive benefits, award-winning safety (.64 EMR), and a culture where your potential matters as much as any project we build.",
    keywords: [
      "veteran-owned construction careers",
      "honest construction employer",
      "transparent career growth",
      "construction jobs Pacific Northwest",
      "veteran construction careers",
      "construction career opportunities",
      "construction employment Tri-Cities WA",
      "military values construction jobs",
      "construction career growth",
      "Project Manager jobs",
      "Superintendent jobs",
      "Carpenter jobs",
      "Project Engineer jobs",
      "Richland veteran-owned jobs",
      "Pasco construction careers",
      "Kennewick construction employment",
      "Benton County veteran careers",
      "Franklin County construction careers",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/careers`,
    schemas: [],
  });
}

// Projects page SEO - GROUP 2: Heritage & Trust Foundation
export function getProjectsSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Victories | Proven Results Through Veteran Values | Excellence Since 2010 | MH Construction",
    description:
      "Veteran-owned since 2025, building excellence since 2010. Our completed projects showcase honest communication, transparent pricing, and proven craftsmanship across residential, commercial, and government work. Trust built project by project—our history speaks for itself.",
    keywords: [
      "veteran-owned construction portfolio",
      "proven construction track record",
      "honest construction results",
      "transparent pricing projects",
      "proven craftsmanship examples",
      "Pacific Northwest construction projects",
      "construction excellence since 2010",
      "military precision quality",
      "Tri-Cities construction portfolio",
      "Richland veteran contractor projects",
      "Pasco construction examples",
      "Kennewick proven results",
      "Benton County construction work",
      "Franklin County veteran-owned portfolio",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/projects`,
    schemas: [],
  });
}

// Contact page SEO
export function getContactSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Introductions | Where Handshakes Still Matter | Contact MH Construction | Pasco, WA",
    description:
      "Contact MH Construction for your Pacific Northwest construction needs. Founded 2010, veteran-owned since January 2025 with online estimating tools, military precision, and authentic partnership approach. (509) 308-6489",
    keywords: [
      "contact construction contractor Pasco WA",
      "veteran-owned construction contact",
      "Pacific Northwest construction company",
      "construction consultation Tri-Cities",
      "military precision construction contact",
      "Richland general contractor contact",
      "Pasco general contractor",
      "Kennewick contractor contact",
      "Benton County construction contact",
      "Franklin County general contractor",
      "Tri-Cities general contractor contact",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/contact`,
    schemas: [generateLocalBusinessSchema()],
  });
}

// Urgent Support page SEO - GROUP 7: Partnership & Urgency
export function getUrgentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "When Time Is Critical, We Respond | Veteran-Owned Urgent Support | MH Construction",
    description:
      "THE ROI IS THE RELATIONSHIP. Veteran-owned rapid response for critical construction challenges. Honest assessment, transparent pricing, proven solutions. Expert consultation, specialized equipment, experienced crews—immediate deployment WA, OR, ID. Your project success is our mission. Call (509) 308-6489.",
    keywords: [
      "veteran-owned urgent construction",
      "honest emergency assessment",
      "transparent urgent pricing",
      "urgent construction support",
      "emergency structural repairs",
      "immediate construction response",
      "construction equipment rental",
      "heavy machinery operators",
      "general contractor support",
      "Pacific Northwest urgent construction",
      "Tri-Cities emergency construction",
      "Richland urgent contractor support",
      "Pasco emergency repairs",
      "Kennewick urgent construction",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/urgent`,
    schemas: [],
  });
}

// Removed: get3DExplorerSEO function (feature deprecated Dec 2025)
