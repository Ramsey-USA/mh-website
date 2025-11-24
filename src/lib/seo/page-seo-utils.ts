// Page-specific SEO utilities for MH Construction
import { type Metadata } from "next";
import {
  generateEnhancedMetadata,
  generateAutomatedEstimatorSchema,
  generateIRLConsultationSchema,
  generateConstructionFAQSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  enhancedSEO,
} from "@/components/seo/enhanced-seo";

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Building for the Client, NOT the Dollar | Veteran-Owned Construction | MH Construction",
    description:
      "Veteran-owned construction management services since 2010. Specializing in commercial construction services, master planning and preconstruction services, tenant improvement services, and light industrial construction throughout the Pacific Northwest. Six core values (Professionalism, Thoroughness, Honesty, Integrity, Innovation, Partnership) building trust through modern AI-powered tools and face-to-face consultation.",
    keywords: [
      "veteran-owned contractor Pacific Northwest",
      "construction management services",
      "commercial construction services",
      "master planning and preconstruction services",
      "tenant improvement services",
      "light industrial construction",
      "innovative construction technology",
      "construction partnership approach",
      "AI-powered construction planning",
      "face-to-face construction consultation",
      "construction partnerships Tri-Cities WA",
      "modern construction tools traditional values",
      "collaborative construction relationships",
      "transparent construction communication",
      "long-term construction partnerships",
      "innovation meets integrity construction",
    ],
    canonicalUrl: enhancedSEO.siteUrl,
    schemas: [generateConstructionFAQSchema(), generateLocalBusinessSchema()],
  });
}

// AI Budget Estimator page SEO
export function getAutomatedEstimatorSEO(): Metadata & {
  schemas: object[];
} {
  return generateEnhancedMetadata({
    title: "AI Budget Estimator - Free Planning Tool | MH Construction",
    description:
      "Get preliminary budget estimates in under 5 minutes with regional intelligence, veteran discounts, and Pacific Northwest market data. AI planning tool available 24/7 to prepare for your consultation.",
    keywords: [
      "AI cost estimator",
      "budget planning tool",
      "instant construction estimates",
      "veteran discount construction",
      "Pacific Northwest construction costs",
      "preliminary cost estimates",
      "construction budget calculator",
      "military precision cost analysis",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/estimator`,
    schemas: [generateAutomatedEstimatorSchema()],
  });
}

// Booking/Consultation page SEO
export function getBookingSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Face-to-Face Consultation Where Trust Begins | Book Your Meeting | MH Construction",
    description:
      "Book your complimentary on-site construction consultation with MH Construction experts. Professional evaluation, detailed estimates, and partnership development for your Pacific Northwest project.",
    keywords: [
      "free construction consultation",
      "on-site construction evaluation",
      "construction expert visit",
      "professional construction assessment",
      "construction project planning",
      "veteran-owned construction consultation",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/booking`,
    schemas: [generateIRLConsultationSchema()],
  });
}

// About page SEO - GROUP 2: Heritage & Trust Foundation
export function getAboutSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Trust Built, Project by Project | Founded 2010, Veteran-Owned Since 2025 | MH Construction",
    description:
      "Founded 2010 by Mike Holstein, veteran-owned since January 2025 under Army veteran Jeremy Thamert's leadership (Owner & President). 150+ years of combined excellence serving Pacific Northwest communities with partnership philosophy, traditional business values, and authentic relationships built on trust.",
    keywords: [
      "veteran-owned construction company",
      "construction company founded 2010",
      "Pacific Northwest construction heritage",
      "partnership-driven construction",
      "authentic construction relationships",
      "community-focused construction",
      "military precision building",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/about`,
    schemas: [],
  });
}

// Services page SEO
export function getServicesSEO(): Metadata & { schemas: object[] } {
  const constructionServices = [
    {
      name: "Construction Intelligence Tools",
      description:
        "Construction assistance with General MH for cost estimation, project assessment, and veteran services",
      category: "Construction Technology",
    },
    {
      name: "Residential Construction",
      description:
        "Custom homes, renovations, and residential projects with military precision and partnership approach",
      category: "Residential Services",
    },
    {
      name: "Commercial Construction",
      description:
        "Commercial buildings, renovations, and business projects serving Pacific Northwest communities",
      category: "Commercial Services",
    },
    {
      name: "Government Construction Projects",
      description:
        "Specialized government and military construction projects with veteran-owned business certification",
      category: "Government Services",
    },
  ];

  const serviceSchemas = constructionServices.map((service) =>
    generateServiceSchema(service),
  );

  return generateEnhancedMetadata({
    title:
      "Your Vision, Our Precision | Construction Services | MH Construction",
    description:
      "Comprehensive construction services across residential, commercial, and government projects. Veteran-owned company serving Pacific Northwest with military precision, modern planning tools, and partnership approach. Building tomorrow's excellence today.",
    keywords: [
      "residential commercial construction",
      "government construction projects",
      "veteran construction services",
      "Pacific Northwest builder",
      "military precision construction",
      "construction project management",
      "construction planning services",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/services`,
    schemas: serviceSchemas,
  });
}

// Team page SEO - GROUP 3: Future Vision & Growth
export function getTeamSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Building Tomorrow's Success Today | Meet Our Team | MH Construction",
    description:
      "Meet the MH Construction team building the future of construction excellence. Veteran professionals, expert project managers, and partnership specialists with 150+ years combined experience serving Pacific Northwest communities with innovation, military precision, and authentic relationships.",
    keywords: [
      "veteran construction team",
      "construction project managers",
      "Pacific Northwest construction professionals",
      "military construction expertise",
      "veteran-owned construction specialists",
      "construction team leadership",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/team`,
    schemas: [],
  });
}

// Government page SEO
export function getGovernmentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Mission-Ready, Compliance-Driven | Federal Government Contractor | MH Construction",
    description:
      "Mission-critical government construction with Army veteran leadership. Federal contracting expertise, DOE compliance, and military-grade project execution for government facilities in the Pacific Northwest.",
    keywords: [
      "federal government contractor",
      "Army veteran construction",
      "mission-critical construction",
      "DOE federal contractor",
      "military precision construction",
      "VOSB contractor Pacific Northwest",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/government`,
    schemas: [],
  });
}

// Veterans page SEO - GROUP 4: Professional & Patriotic
export function getVeteransSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Serving Those Who Served | Veterans Initiative & Support | MH Construction",
    description:
      "Serving those who served. Veteran-owned under Army veteran leadership since January 2025, MH Construction honors military service through veteran hiring initiatives, community partnerships, and annual benefit events. Supporting Pacific Northwest veterans and military families with professional construction excellence and shared values.",
    keywords: [
      "veteran-owned construction company",
      "veteran support programs",
      "military veteran hiring",
      "Army veteran leadership",
      "veteran benefit events",
      "Pacific Northwest veterans",
      "military family support",
      "veteran community partnerships",
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
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/trade-partners`,
    schemas: [],
  });
}

// Careers page SEO - GROUP 5: Recruitment & Growth
export function getCareersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Your Future Starts Here | Join Our Growing Team | MH Construction Careers",
    description:
      "Join MH Construction and build your future with a veteran-owned team that values you! Exciting construction career opportunities with competitive benefits, growth potential, cutting-edge technology, and military values in the Pacific Northwest. We're hiring skilled professionals ready to make an impact.",
    keywords: [
      "construction jobs Pacific Northwest",
      "construction career opportunities",
      "veteran construction careers",
      "construction employment Tri-Cities WA",
      "hiring construction professionals",
      "military values construction jobs",
      "construction career growth",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/careers`,
    schemas: [],
  });
}

// Projects page SEO - GROUP 2: Heritage & Trust Foundation
export function getProjectsSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Our History Speaks for Itself | Excellence Since 2010 | MH Construction Projects",
    description:
      "Explore MH Construction's proven track record of residential, commercial, and government projects across the Pacific Northwest. Our history speaks for itself with military precision quality, partnership-driven results, and trust built project by project since 2010.",
    keywords: [
      "construction project portfolio",
      "proven construction track record",
      "Pacific Northwest construction projects",
      "veteran-owned construction examples",
      "construction excellence since 2010",
      "military precision construction quality",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/projects`,
    schemas: [],
  });
}

// Contact page SEO
export function getContactSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Where Handshakes Still Matter | Contact MH Construction | Pasco, WA",
    description:
      "Contact MH Construction for your Pacific Northwest construction needs. Founded 2010, veteran-owned since January 2025 with online estimating tools, military precision, and authentic partnership approach. (509) 308-6489",
    keywords: [
      "contact construction contractor Pasco WA",
      "veteran-owned construction contact",
      "Pacific Northwest construction company",
      "construction consultation Tri-Cities",
      "military precision construction contact",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/contact`,
    schemas: [generateLocalBusinessSchema()],
  });
}

// Urgent Support page SEO - GROUP 7: Partnership & ROI Focus
export function getUrgentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "THE ROI IS THE RELATIONSHIP | Urgent Construction Support | MH Construction",
    description:
      "Professional urgent construction support where THE ROI IS THE RELATIONSHIP. Immediate response for General Contractors facing critical structural challenges. Expert consultation, specialized equipment, heavy machinery operators, and experienced crews available for rapid deployment in WA, OR, and ID. Your project success is our priority.",
    keywords: [
      "urgent construction support",
      "emergency structural repairs",
      "immediate construction response",
      "construction equipment rental",
      "heavy machinery operators",
      "general contractor support",
      "structural assessment urgent",
      "Pacific Northwest urgent construction",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/urgent`,
    schemas: [],
  });
}

// 3D Explorer page SEO
export function get3DExplorerSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Innovation Meets Construction Excellence | 3D Project Explorer | MH Construction",
    description:
      "Immersive 3D visualization platform for construction projects. Explore project designs, walk through virtual models, and experience MH Construction's innovative approach to project visualization. Coming soon.",
    keywords: [
      "3D construction visualization",
      "virtual construction walkthrough",
      "construction project 3D models",
      "immersive construction experience",
      "construction technology innovation",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/3d-explorer`,
    schemas: [],
  });
}
