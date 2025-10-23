// Page-specific SEO utilities for MH Construction
import { Metadata } from "next";
import {
  generateEnhancedMetadata,
  generateAIEstimatorSchema,
  generateIRLConsultationSchema,
  generateConstructionFAQSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  enhancedSEO,
} from "@/components/seo/enhanced-seo";

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title: "AI-Powered Veteran-Owned Construction Excellence | MH Construction",
    description:
      "Revolutionary AI construction intelligence with General MH military assistant. Veteran-owned excellence serving Pacific Northwest communities with transparent partnerships, 24/7 AI estimator, and military precision project management.",
    keywords: [
      "AI construction assistant",
      "veteran-owned contractor Pacific Northwest",
      "General MH military AI",
      "construction partnerships Tri-Cities WA",
      "transparent construction communication",
      "authentic relationships builder",
      "community impact construction",
    ],
    canonicalUrl: enhancedSEO.siteUrl,
    schemas: [generateConstructionFAQSchema(), generateLocalBusinessSchema()],
  });
}

// AI Estimator page SEO
export function getAIEstimatorSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "AI Construction Cost Estimator | Instant Estimates 24/7 | MH Construction",
    description:
      "Get instant AI-powered construction estimates with regional intelligence, veteran discounts, and Pacific Northwest market data. Revolutionary cost estimation available 24/7 with military precision accuracy.",
    keywords: [
      "AI construction cost estimator",
      "instant construction estimates",
      "veteran discount construction",
      "Pacific Northwest construction costs",
      "real-time construction pricing",
      "automated construction calculator",
      "military precision cost analysis",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/estimator`,
    schemas: [generateAIEstimatorSchema()],
  });
}

// Booking/Consultation page SEO
export function getBookingSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Schedule Free Construction Consultation | Expert Site Visit | MH Construction",
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

// About page SEO
export function getAboutSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title: "About MH Construction | Veteran-Owned Partnership-Driven Platform",
    description:
      "Learn about MH Construction's veteran-owned heritage, partnership philosophy, and revolutionary AI construction intelligence. Serving Pacific Northwest communities with military precision and authentic relationships since 2020.",
    keywords: [
      "veteran-owned construction company",
      "partnership-driven construction",
      "military precision building",
      "Pacific Northwest construction heritage",
      "authentic construction relationships",
      "community-focused construction",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/about`,
    schemas: [],
  });
}

// Services page SEO
export function getServicesSEO(): Metadata & { schemas: object[] } {
  const constructionServices = [
    {
      name: "AI-Powered Construction Intelligence",
      description:
        "Revolutionary construction assistance with General MH military AI for cost estimation, project assessment, and veteran services",
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
    generateServiceSchema(service)
  );

  return generateEnhancedMetadata({
    title:
      "Construction Services | AI-Powered Building Solutions | MH Construction",
    description:
      "Comprehensive construction services powered by revolutionary AI technology. Residential, commercial, government projects with military precision, veteran benefits, and Pacific Northwest expertise.",
    keywords: [
      "AI-powered construction services",
      "residential commercial construction",
      "government construction projects",
      "veteran construction services",
      "Pacific Northwest builder",
      "military precision construction",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/services`,
    schemas: serviceSchemas,
  });
}

// Team page SEO
export function getTeamSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Meet Our Veteran-Owned Team | Construction Experts | MH Construction",
    description:
      "Meet the MH Construction team of veteran construction professionals, expert project managers, and partnership specialists serving Pacific Northwest communities with military precision and authentic relationships.",
    keywords: [
      "veteran construction team",
      "construction project managers",
      "military construction expertise",
      "Pacific Northwest construction professionals",
      "veteran-owned construction specialists",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/team`,
    schemas: [],
  });
}

// Government page SEO
export function getGovernmentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Government Construction Projects | Veteran-Owned Contractor | MH Construction",
    description:
      "Specialized government construction services by veteran-owned MH Construction. Military precision project management, security clearance capabilities, and compliance expertise for public sector projects.",
    keywords: [
      "government construction contractor",
      "veteran-owned government contractor",
      "military construction projects",
      "public sector construction",
      "government building contractor Pacific Northwest",
      "VOSB construction services",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/government`,
    schemas: [],
  });
}

// Trade Partners page SEO
export function getTradePartnersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Trade Partner Network | Join Our Subcontractor Team | MH Construction",
    description:
      "Join MH Construction's approved trade partner network. Professional subcontractor opportunities with veteran-owned business, fair payment practices, and consistent Pacific Northwest project flow.",
    keywords: [
      "construction subcontractor opportunities",
      "trade partner network",
      "veteran-owned contractor partnerships",
      "Pacific Northwest subcontractor work",
      "professional construction partnerships",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/trade-partners`,
    schemas: [],
  });
}

// Careers page SEO
export function getCareersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Construction Careers | Join Our Veteran-Owned Team | MH Construction",
    description:
      "Build your career with MH Construction's veteran-owned team. Construction job opportunities with military values, community impact, and growth potential in the Pacific Northwest.",
    keywords: [
      "construction jobs Pacific Northwest",
      "veteran construction careers",
      "construction employment Tri-Cities WA",
      "military values construction jobs",
      "construction career opportunities",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/careers`,
    schemas: [],
  });
}

// Projects page SEO
export function getProjectsSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Construction Project Portfolio | Pacific Northwest Excellence | MH Construction",
    description:
      "Explore MH Construction's portfolio of residential, commercial, and government projects across the Pacific Northwest. Military precision quality and partnership-driven results showcased.",
    keywords: [
      "construction project portfolio",
      "Pacific Northwest construction projects",
      "veteran-owned construction examples",
      "construction project showcase",
      "military precision construction quality",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/projects`,
    schemas: [],
  });
}

// Contact page SEO
export function getContactSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title: "Contact MH Construction | Veteran-Owned Builder | Pasco, WA",
    description:
      "Contact MH Construction for your Pacific Northwest construction needs. Veteran-owned excellence with AI-powered estimating, military precision, and authentic partnership approach. (509) 308-6489",
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
