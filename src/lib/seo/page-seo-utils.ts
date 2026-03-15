// Page-specific SEO utilities for MH Construction
import { type Metadata } from "next";
import {
  generateEnhancedMetadata,
  generateConstructionFAQSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateEnhancedOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  enhancedSEO,
} from "@/components/seo/EnhancedSEO";

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the homepage to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/#webpage`,
    url: enhancedSEO.siteUrl,
    name: "Base HQ → Home | MH Construction",
    description:
      "Your Tri-Cities Construction Command Center. Founded 2010, veteran-owned since January 2025. General contractor serving Richland, Pasco, Kennewick, Yakima, Spokane, and Walla Walla.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/#breadcrumb` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: enhancedSEO.siteUrl,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: enhancedSEO.siteUrl },
  ]);

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: "Base HQ → Home | Building Projects for the Client, NOT the Dollar",
    description:
      "Base HQ → Home: Your Tri-Cities Construction Command Center serving Richland, Pasco, Kennewick, Yakima, Spokane, and Walla Walla. Founded 2010, veteran-owned since January 2025. Expert commercial construction, master planning, preconstruction, tenant improvements, and light industrial operations throughout the Pacific Northwest. Four core values (Honesty, Integrity, Professionalism, Thoroughness) building trust through transparent communication. Dual-label approach: Military Operations → Construction Services. Licensed in WA, OR, ID.",
    keywords: [
      "Base HQ Home construction command center",
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
      "general contractor Yakima WA",
      "general contractor Spokane WA",
      "general contractor Walla Walla WA",
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
      "PWA construction app",
      "offline construction access",
      "proven construction process",
      "construction testimonials Pacific Northwest",
      "veteran construction values",
    ],
    canonicalUrl: enhancedSEO.siteUrl,
    schemas: [
      generateConstructionFAQSchema(),
      generateLocalBusinessSchema(),
      generateEnhancedOrganizationSchema(),
      generateWebsiteSchema(),
      webPageSchema,
      breadcrumbSchema,
    ],
  });
}

// Removed: AI Budget Estimator page SEO (feature deprecated)
// Removed: Booking/Consultation page SEO (feature deprecated)

// About page SEO - GROUP 2: Heritage & Trust Foundation
export function getAboutSEO(): Metadata & { schemas: object[] } {
  const aboutUrl = `${enhancedSEO.siteUrl}/about`;

  const companyHistorySchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${aboutUrl}#webpage`,
    url: aboutUrl,
    name: "Our Oath → About Us | MH Construction",
    description:
      "Founded 2010, veteran-owned since January 2025. 650+ projects, 70% referral rate, AGC-WA Top EMR Awards & OSHA VPP Star. Serving Tri-Cities WA, Yakima, Spokane, and Walla Walla. Licensed WA, OR, ID.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    breadcrumb: { "@id": `${aboutUrl}#breadcrumb` },
    inLanguage: "en-US",
    mainEntity: {
      "@type": "Organization",
      "@id": `${enhancedSEO.siteUrl}/#organization`,
      name: "MH Construction, Inc.",
      foundingDate: "2010-01-15",
      founder: {
        "@type": "Person",
        name: "Mike Holstein",
        jobTitle: "Founder (Non-veteran)",
        description:
          "Founded MH Construction in 2010, sold to Jeremy Thamert in 2025",
      },
      owns: {
        "@type": "Person",
        name: "Jeremy Thamert",
        jobTitle: "Owner & President",
        description:
          "Army veteran, purchased MH Construction January 2025, bringing company to veteran-owned status",
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
        "Chain of Command Approach",
      ],
      slogan: "We Work WITH You, Not FOR You",
      mission: "Building projects for the client, NOT the dollar",
      areaServed: [
        {
          "@type": "City",
          name: "Richland",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Kennewick",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Pasco",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Yakima",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Spokane",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Walla Walla",
          containedIn: { "@type": "State", name: "Washington" },
        },
      ],
    },
    mentions: [
      {
        "@type": "Event",
        name: "Company Founded",
        startDate: "2010",
        description:
          "Mike Holstein founds MH Construction on partnership philosophy",
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
          "Army veteran Jeremy Thamert purchases MH Construction, bringing company to veteran-owned status with operational discipline",
      },
    ],
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Our Oath → About Us | Service-Earned Values, Battle-Tested Excellence",
    description:
      "Founded 2010, veteran-owned since January 2025. General contractor serving Tri-Cities WA. 650+ projects, 70% referral rate, AGC-WA Top EMR Awards & OSHA VPP Star. Licensed WA, OR, ID. Honesty, Integrity, Professionalism, Thoroughness.",
    keywords: [
      "veteran-owned construction company Tri-Cities WA",
      "MH Construction company history",
      "Jeremy Thamert Army veteran owner",
      "Arnold Garcia VP construction",
      "Chain of Command construction approach",
      "650+ completed projects Pacific Northwest",
      "70 percent referral rate contractor",
      "AGC Washington Top EMR Award",
      "OSHA VPP Star certification",
      ".64 EMR construction safety record",
      "3-state licensed contractor WA OR ID",
      "partnership philosophy construction",
      "transparent pricing honest communication",
      "Tri-Cities veteran general contractor",
      "Richland construction company history",
      "Pasco veteran-owned construction",
      "Kennewick construction awards",
      "Benton County construction excellence",
      "Franklin County veteran-owned contractor",
      "Yakima veteran-owned construction company",
      "Spokane veteran general contractor",
      "Walla Walla construction company",
      "Eastern Washington construction history",
      "Pacific Northwest general contractor about",
    ],
    canonicalUrl: aboutUrl,
    schemas: [companyHistorySchema],
  });
}

// Services page SEO - GROUP 3: Future Vision & Expertise
export function getServicesSEO(): Metadata & { schemas: object[] } {
  const servicesUrl = `${enhancedSEO.siteUrl}/services`;

  const constructionServices = [
    {
      name: "Commercial Construction",
      description:
        "Commercial buildings, renovations, and business projects with transparent pricing and proven craftsmanship across the Pacific Northwest",
      category: "Commercial Services",
    },
    {
      name: "Master Planning & Preconstruction",
      description:
        "Comprehensive preconstruction planning, feasibility studies, and master planning with military-precision scope development",
      category: "Preconstruction Services",
    },
    {
      name: "Tenant Improvements",
      description:
        "Interior buildouts and tenant improvement projects for commercial and industrial facilities throughout Eastern Washington",
      category: "Tenant Improvement Services",
    },
    {
      name: "Light Industrial Construction",
      description:
        "Small to mid-size industrial facility expansions, renovations, and new builds with veteran-led operational discipline",
      category: "Industrial Services",
    },
    {
      name: "Government & Public Sector Construction",
      description:
        "Mission-ready government construction with federal compliance standards and veteran-owned business advantages",
      category: "Government Services",
    },
    {
      name: "Construction Management",
      description:
        "Full-service construction management with transparent communication, open-book pricing, and systematic quality control",
      category: "Project Management",
    },
  ];

  const serviceSchemas = constructionServices.map((service) =>
    generateServiceSchema(service),
  );

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${servicesUrl}#webpage`,
    url: servicesUrl,
    name: "Operations → Services | MH Construction",
    description:
      "Commercial construction, master planning, tenant improvements, light industrial, and government projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    breadcrumb: { "@id": `${servicesUrl}#breadcrumb` },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: servicesUrl,
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: enhancedSEO.siteUrl },
    { name: "Services", url: servicesUrl },
  ]);

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Operations → Services | The Battle Plan - Strategic Construction Excellence",
    description:
      "Commercial construction, master planning, tenant improvements, light industrial & government projects. Veteran-owned, Tri-Cities WA. Licensed WA, OR, ID. Transparent pricing.",
    keywords: [
      "commercial construction Tri-Cities WA",
      "master planning preconstruction services",
      "tenant improvement contractor",
      "light industrial construction Pacific Northwest",
      "government construction veteran-owned",
      "construction management services",
      "general contractor Richland WA",
      "general contractor Pasco WA",
      "general contractor Kennewick WA",
      "Benton County construction services",
      "Franklin County contractor services",
      "general contractor Yakima WA",
      "general contractor Spokane WA",
      "general contractor Walla Walla WA",
      "Eastern Washington construction services",
      "veteran-owned construction services",
      "transparent pricing contractor",
      "WA OR ID licensed contractor",
      "medical facility construction",
      "winery construction Pacific Northwest",
      "religious facility construction",
      "grant-funded construction projects",
    ],
    canonicalUrl: servicesUrl,
    schemas: [...serviceSchemas, webPageSchema, breadcrumbSchema],
  });
}

// Team page SEO - GROUP 3: Future Vision & Growth
export function getTeamSEO(): Metadata & { schemas: object[] } {
  const teamUrl = `${enhancedSEO.siteUrl}/team`;

  // Generate Person schema for key team members
  const teamPersonSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${teamUrl}#jeremy-thamert`,
      name: "Jeremy Thamert",
      jobTitle: "Owner & President",
      worksFor: { "@id": `${enhancedSEO.siteUrl}/#organization` },
      description:
        "Owner & President of MH Construction, bringing 35+ years of construction expertise and 15 years of Army aviation service. Leads with integrity, discipline, and people-first philosophy.",
      alumniOf: "U.S. Army Aviation",
      knowsAbout: [
        "Construction Management",
        "Safety Management",
        "Leadership Development",
        "Business Operations",
      ],
      url: `${teamUrl}#jeremy-thamert`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${teamUrl}#arnold-garcia`,
      name: "Arnold Garcia",
      jobTitle: "Vice President",
      worksFor: { "@id": `${enhancedSEO.siteUrl}/#organization` },
      description:
        "Vice President with 40+ years of construction experience, overseeing all construction activities and staff mentoring.",
      knowsAbout: [
        "Construction Management",
        "Project Management",
        "Commercial Construction",
        "Team Leadership",
      ],
      url: `${teamUrl}#arnold-garcia`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${teamUrl}#mike-holstein`,
      name: "Mike Holstein",
      jobTitle: "Founder",
      worksFor: { "@id": `${enhancedSEO.siteUrl}/#organization` },
      description:
        "Founder of MH Construction (founded 2010), created company foundation on integrity, quality, and partnership philosophy. Sold company to Jeremy Thamert in 2025.",
      knowsAbout: [
        "Construction Management",
        "Business Development",
        "Quality Standards",
        "Company Values",
      ],
      url: `${teamUrl}#mike-holstein`,
    },
  ];

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${teamUrl}#webpage`,
    url: teamUrl,
    name: "Chain of Command → Our Team | MH Construction",
    description:
      "Meet the MH Construction team: 150+ years combined expertise across all service branches. Veteran-owned leadership serving Tri-Cities WA and Pacific Northwest.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    breadcrumb: { "@id": `${teamUrl}#breadcrumb` },
    inLanguage: "en-US",
    mentions: teamPersonSchemas.map((p) => ({ "@id": p["@id"] })),
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Chain of Command → Our Team | 150+ Years Combined Military-Grade Expertise",
    description:
      "Meet MH Construction's veteran-led team: 150+ years combined expertise across all service branches. Jeremy Thamert (Army), Arnold Garcia VP. Serving Tri-Cities WA. Licensed WA, OR, ID.",
    keywords: [
      "MH Construction team leadership",
      "veteran-owned construction team Tri-Cities WA",
      "Jeremy Thamert Army veteran owner",
      "Arnold Garcia VP construction",
      "150 years combined construction experience",
      "all-branch veteran leadership",
      "construction project managers Tri-Cities",
      "veteran construction professionals",
      "Richland contractor team",
      "Pasco construction leadership",
      "Kennewick general contractor team",
      "Benton County construction experts",
      "Franklin County veteran leadership",
      "Pacific Northwest construction team",
      "Eastern Washington construction professionals",
      "veteran hiring construction company",
    ],
    canonicalUrl: teamUrl,
    schemas: [...teamPersonSchemas, webPageSchema],
  });
}

// Government page SEO (Public Sector)
export function getGovernmentSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the public-sector page to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/public-sector#webpage`,
    url: `${enhancedSEO.siteUrl}/public-sector`,
    name: "Public Sector → Government | MH Construction",
    description:
      "Veteran-owned Tri-Cities contractor for government & public sector construction. Federal compliance, grant support, bonding capacity. Pasco, WA.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/public-sector#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Public Sector → Government | Veteran-Owned Excellence for Government Construction",
    description:
      "Veteran-owned Tri-Cities contractor for government & public sector construction. Federal compliance, grant support, bonding capacity. Pasco, WA.",
    keywords: [
      "Public Sector Government construction missions",
      "mission-ready construction operations",
      "federal compliance-driven standards",
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
    schemas: [webPageSchema, generateLocalBusinessSchema()],
  });
}

// Veterans page SEO - GROUP 4: Professional & Patriotic - UPDATED December 2025
export function getVeteransSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the veterans page to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/veterans#webpage`,
    url: `${enhancedSEO.siteUrl}/veterans`,
    name: "Allied Forces → Veterans | MH Construction",
    description:
      "Veteran-owned Tri-Cities construction firm with Army & Navy leadership. Combat Veteran Discount, 100% veteran hiring priority & apprenticeships. Pasco, WA.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/veterans#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Allied Forces → Veterans | Combat Veteran Discount, Year-Round Support",
    description:
      "Veteran-owned Tri-Cities construction firm with Army & Navy leadership. Combat Veteran Discount, 100% veteran hiring priority & apprenticeships. Pasco, WA.",
    keywords: [
      "veteran-owned construction Tri-Cities",
      "combat veteran discount",
      "veteran hiring priority",
      "Army Navy veteran leadership",
      "veteran apprenticeship programs",
      "veteran-owned subcontractors",
      "Pacific Northwest veteran contractor",
      "Group 1 Veteran Foundation",
      "military precision construction",
      "veteran support programs",
      "service-earned values",
      "veteran partnerships",
      "Jeremy Ramsey Army veteran",
      "Matt Hunzeker Navy veteran",
      "all-branch veterans",
      "veteran discount screening",
      "military construction services",
      "Tri-Cities veteran contractor",
      "veteran-owned business Washington",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/veterans`,
    schemas: [webPageSchema, generateLocalBusinessSchema()],
  });
}

// Trade Partners page SEO - GROUP 7: Partnership & ROI Focus
export function getTradePartnersSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the allies page to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/allies#webpage`,
    url: `${enhancedSEO.siteUrl}/allies`,
    name: "Allies → Partners | MH Construction",
    description:
      "Join MH Construction's trade partner network. Subcontractor opportunities with a veteran-owned Tri-Cities GC. Fair pay, consistent project flow, mutual success.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/allies#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Allies → Partners | Strategic Partnerships Built on Trust & Mutual Success",
    description:
      "Join MH Construction's trade partner network. Subcontractor opportunities with a veteran-owned Tri-Cities GC. Fair pay, consistent project flow, mutual success.",
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
    schemas: [webPageSchema, generateLocalBusinessSchema()],
  });
}

// Testimonials page SEO
export function getTestimonialsSEO(): Metadata & { schemas: object[] } {
  // CollectionPage schema ties the testimonials page to the Organization and Website entities
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${enhancedSEO.siteUrl}/testimonials#webpage`,
    url: `${enhancedSEO.siteUrl}/testimonials`,
    name: "Commendations \u2192 Reviews | MH Construction",
    description:
      "Verified client testimonials from commercial, industrial & public-sector partners across Tri-Cities WA and the Pacific Northwest. Veteran-owned MH Construction.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/testimonials#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: "Commendations \u2192 Reviews | Trusted Partner Testimonials",
    description:
      "Verified client testimonials from commercial, industrial & public-sector partners across Tri-Cities WA and the Pacific Northwest. Veteran-owned MH Construction.",
    keywords: [
      "construction testimonials",
      "client reviews MH Construction",
      "Tri-Cities contractor reviews",
      "veteran-owned construction feedback",
      "commercial construction testimonials",
      "Pacific Northwest construction reputation",
      "construction client testimonials Pasco WA",
      "verified contractor reviews",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/testimonials`,
    schemas: [collectionPageSchema, generateLocalBusinessSchema()],
  });
}

// Careers page SEO - GROUP 5: Recruitment & Growth
export function getCareersSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the careers page to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/careers#webpage`,
    url: `${enhancedSEO.siteUrl}/careers`,
    name: "Enlist → Careers | MH Construction",
    description:
      "Build your future with a veteran-owned Tri-Cities construction team. General career inquiries welcome — Honesty, Integrity, Professionalism, Thoroughness. Veterans prioritized.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/careers#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: "Enlist → Careers | Build Your Future with MH Construction",
    description:
      "Build your future with a veteran-owned Tri-Cities construction team. General career inquiries welcome — Honesty, Integrity, Professionalism, Thoroughness. Veterans prioritized.",
    keywords: [
      "Enlist Careers build your future MH Construction",
      "join the mission construction career",
      "veteran-owned construction careers Pacific Northwest",
      "honest construction employer Pacific Northwest",
      "transparent career growth construction",
      "construction career inquiry Washington state",
      "construction jobs Pacific Northwest",
      "veteran construction careers Washington",
      "construction employment Tri-Cities WA",
      "military values construction jobs",
      "4 core values employer construction",
      "honesty integrity professionalism thoroughness jobs",
      "skilled trades career inquiry WA",
      "general contractor career Washington",
      "Tri-Cities construction careers WA",
      "Richland construction jobs WA",
      "Pasco construction careers WA",
      "Kennewick construction employment WA",
      "Benton County veteran construction careers",
      "Franklin County construction careers WA",
      "Yakima construction jobs WA",
      "Spokane construction careers WA",
      "Walla Walla construction jobs WA",
      "Eastern Washington contractor hiring",
      "construction career growth mentorship",
      "veteran priority consideration construction jobs",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/careers`,
    schemas: [
      webPageSchema,
      generateEnhancedOrganizationSchema(),
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "@id": `${enhancedSEO.siteUrl}/careers#general-inquiry`,
        title:
          "Build Your Future with MH Construction - General Career Inquiry",
        description:
          "Submit a general inquiry for career opportunities at MH Construction. We are always looking for driven individuals who mirror our commitment to our 4 Core Values: Honesty, Integrity, Professionalism, and Thoroughness. Even when we aren't hiring for a specific role, we are always open to inquiries from skilled professionals who want to contribute to a high-standard operations environment. Whether you are a seasoned Project Manager or a dedicated Field Specialist, we want to hear from you. Veterans receive priority consideration. Serving Tri-Cities WA (Richland, Kennewick, Pasco), Yakima, Spokane, and Walla Walla.",
        datePosted: "2026-03-11",
        url: `${enhancedSEO.siteUrl}/careers`,
        hiringOrganization: {
          "@type": "Organization",
          name: enhancedSEO.companyInfo.name,
          sameAs: enhancedSEO.siteUrl,
          logo: `${enhancedSEO.siteUrl}/images/logo/mh-logo.png`,
        },
        jobLocation: [
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Richland",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pasco",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kennewick",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Yakima",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Spokane",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Walla Walla",
              addressRegion: "WA",
              addressCountry: "US",
            },
          },
        ],
        employmentType: "FULL_TIME",
        baseSalary: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          price: "Competitive",
        },
        validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        benefits: [
          "Competitive pay",
          "Comprehensive health, dental, and vision insurance",
          "Professional development and certifications",
          "100% mentorship program coverage",
          "Veteran priority consideration",
          "Retirement planning with company match",
          "Award-winning safety culture (.64 EMR)",
        ],
        qualifications:
          "Commitment to our 4 Core Values: Honesty, Integrity, Professionalism, and Thoroughness. Skills in construction management, field operations, or skilled trades welcome. Veterans encouraged to apply.",
        industry: "Construction",
        occupationalCategory: "Construction and Extraction",
        jobBenefits:
          "Health insurance, dental, vision, 401(k) with company match, professional development, mentorship, safety incentive programs",
        workHours: "Full-time",
        applicantLocationRequirements: {
          "@type": "Country",
          name: "United States",
        },
      },
    ],
  });
}

// Projects page SEO - GROUP 2: Heritage & Trust Foundation
export function getProjectsSEO(): Metadata & { schemas: object[] } {
  const projectsUrl = `${enhancedSEO.siteUrl}/projects`;

  // ItemList schema for the portfolio — helps Google understand this is a collection page
  const portfolioListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${projectsUrl}#portfolio`,
    name: "MH Construction Project Portfolio",
    description:
      "650+ completed commercial, industrial, and government construction projects across the Pacific Northwest since 2010.",
    url: projectsUrl,
    numberOfItems: 650,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    provider: { "@id": `${enhancedSEO.siteUrl}/#organization` },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${projectsUrl}#webpage`,
    url: projectsUrl,
    name: "Missions \u2192 Projects | MH Construction Portfolio",
    description:
      "650+ completed commercial, industrial, light industrial, and government construction projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    breadcrumb: { "@id": `${projectsUrl}#breadcrumb` },
    inLanguage: "en-US",
    mainEntity: { "@id": `${projectsUrl}#portfolio` },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: enhancedSEO.siteUrl },
    { name: "Projects", url: projectsUrl },
  ]);

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Missions \u2192 Projects | Mission Success: 650+ Completed Projects",
    description:
      "650+ completed commercial, industrial & government projects across Tri-Cities WA, Yakima, Spokane, and Walla Walla. Veteran-owned since 2025. 70% referral rate. Licensed WA, OR, ID.",
    keywords: [
      "construction portfolio Tri-Cities WA",
      "650 completed construction projects",
      "commercial construction projects Pacific Northwest",
      "light industrial construction portfolio",
      "government construction projects veteran-owned",
      "tenant improvement portfolio",
      "veteran-owned construction portfolio",
      "Richland construction projects",
      "Pasco construction portfolio",
      "Kennewick construction work",
      "Benton County construction portfolio",
      "Franklin County construction projects",
      "Yakima construction portfolio",
      "Spokane construction projects",
      "Walla Walla construction portfolio",
      "Eastern Washington construction projects",
      "70 percent referral rate contractor",
      "AGC Washington EMR Award projects",
      "WA OR ID construction portfolio",
    ],
    canonicalUrl: projectsUrl,
    schemas: [
      portfolioListSchema,
      webPageSchema,
      breadcrumbSchema,
      generateLocalBusinessSchema(),
    ],
  });
}

// Contact page SEO
export function getContactSEO(): Metadata & { schemas: object[] } {
  // ContactPage schema ties this page to the Organization and Website entities
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${enhancedSEO.siteUrl}/contact#webpage`,
    url: `${enhancedSEO.siteUrl}/contact`,
    name: "Rally Point → Contact | MH Construction",
    description:
      "Get a free consultation with MH Construction — veteran-owned general contractor in Pasco, WA. Serving the Tri-Cities & Pacific Northwest. Call (509) 308-6489.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/contact#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Rally Point → Contact | Your Project. Our Expertise. Let's Connect.",
    description:
      "Get a free consultation with MH Construction — veteran-owned general contractor in Pasco, WA. Serving the Tri-Cities & Pacific Northwest. Call (509) 308-6489.",
    keywords: [
      "Rally Point Contact mission brief",
      "SITREP-level clarity consultation",
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
    schemas: [contactPageSchema, generateLocalBusinessSchema()],
  });
}

// FAQ page SEO - GROUP 6: Information & Support
export function getFAQSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the FAQ page to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/faq#webpage`,
    url: `${enhancedSEO.siteUrl}/faq`,
    name: "Intel Brief → FAQ | MH Construction",
    description:
      "Veteran-owned Tri-Cities construction FAQ. Open-book pricing, 0.64 EMR safety, Design-Build, PEMB metal buildings, and free consultation. Pasco, WA.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/faq#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title:
      "Intel Brief → FAQ | Direct Answers. Clear Guidance. Mission-Ready Information.",
    description:
      "Veteran-owned Tri-Cities construction FAQ. Open-book pricing, 0.64 EMR safety, Design-Build, PEMB metal buildings, and free consultation. Pasco, WA.",
    keywords: [
      "Intel Brief FAQ mission intelligence",
      "direct answers construction guidance",
      "construction FAQ",
      "construction management questions",
      "veteran-owned construction",
      "MH Construction questions",
      "construction process explained",
      "open-book pricing",
      "construction safety record",
      "0.64 EMR safety",
      "Pacific Northwest construction",
      "construction consultation",
      "licensed WA OR ID",
      "commercial construction FAQ",
      "construction project timeline",
      "Design-Build vs Design-Bid-Build",
      "Pre-Engineered Metal Buildings PEMB",
      "Pasco WA building permits",
      "Tri-Cities construction",
      "Procore construction management",
      "change orders construction",
      "site feasibility studies",
      "government construction projects",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/faq`,
    schemas: [webPageSchema, generateConstructionFAQSchema()],
  });
}

// Removed: get3DExplorerSEO function (feature deprecated Dec 2025)
