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
import {
  formatDualPageName,
  MH_DUAL_PHRASES,
  PAGE_TERMINOLOGY,
  normalizeMhKeywordList,
} from "@/lib/branding/page-names";
import { getJeremyRibbon } from "@/lib/content/jeremy-ribbons";

const JEREMY_SEO_SIGNAL_KEYWORDS = [
  "Jeremy Thamert",
  "Jeremy Gale Thamert",
  "Jeremy Thamert MH Construction",
  "Jeremy Thamert Owner & President",
  "Jeremy Thamert construction leadership",
  "Jeremy Thamert verified leadership profile",
  "Jeremy Thamert Washington L&I contractor record",
  "Jeremy Thamert veteran-owned construction leadership",
  "Jeremy Thamert Pacific Northwest construction",
];

function getJeremyQuoteSearchSignals(routeKey: string): string[] {
  const ribbon = getJeremyRibbon(routeKey);
  const normalizedQuote = ribbon.quote
    .replace(/[“”"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const teaser = normalizedQuote.split(" ").slice(0, 12).join(" ");

  return [
    `Jeremy Thamert ${routeKey} quote`,
    `Jeremy Thamert leadership message ${routeKey}`,
    `Jeremy Thamert quote ${teaser}`,
  ];
}

function buildPageKeywords(routeKey: string, baseKeywords: string[]): string[] {
  const combinedKeywords = Array.from(
    new Set([
      ...JEREMY_SEO_SIGNAL_KEYWORDS,
      ...getJeremyQuoteSearchSignals(routeKey),
      ...baseKeywords,
    ]),
  );

  return normalizeMhKeywordList(combinedKeywords);
}

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  // WebPage schema ties the homepage to the Organization and Website entities
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${enhancedSEO.siteUrl}/#webpage`,
    url: enhancedSEO.siteUrl,
    name: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | MH Construction`,
    description:
      "Mission-ready construction and delivery from MH Construction's Tri-Cities headquarters, serving Washington, Oregon, and Idaho.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | Mission-Ready Delivery Across WA, OR, and ID`,
    description:
      "MH Construction delivers AG and winery facilities, commercial fit-out work, and municipal projects with clear planning, disciplined field coordination, and licensed coverage across WA, OR, and ID. Homepage radio ad voiceover is Jeremy Thamert, produced in conjunction with Stephens Media Group, with placements on 94.9 The WOLF (https://949thewolf.com/) and local ESPN channel.",
    keywords: buildPageKeywords("home", [
      "Jeremy Thamert leadership",
      "Jeremy Thamert radio ad",
      "Stephens Media Group",
      "94.9 The WOLF",
      "949thewolf.com",
      "Local ESPN channel radio ad",
      "MH Construction home",
      "veteran-owned contractor Pacific Northwest",
      "general contractor Pasco, WA",
      "general contractor Tri-State",
      "Richland general contractor",
      "Pasco general contractor",
      "Kennewick general contractor",
      "mission-ready construction",
      "agricultural community construction",
      "winery community construction",
      "municipal delivery services",
      "industrial construction",
      "mission management",
      "Procore mission management",
      "mission management",
      "pole building contractor",
      "door and hardware installation contractor",
      "office remodeling",
      "mission-ready renovation",
      "building addition contractor",
      "construction design",
      "industrial facility construction",
      "mission-ready construction services",
      "office remodeling and renovation",
      "mission management solutions",
      "Benton County general contractor",
      "Franklin County general contractor",
      "mission management services",
      "mission-ready construction services",
      "mission planning and predeployment services",
      "fit-out services",
      "light industrial construction",
      "general contractor Richland WA",
      "general contractor Pasco, WA",
      "general contractor Kennewick WA",
      "general contractor Yakima WA",
      "general contractor Spokane WA",
      "general contractor Walla Walla WA",
      "Tri-State construction company",
      "construction partnership approach",
      "face-to-face construction consultation",
      "construction partnerships Tri-State WA OR ID",
      "modern construction tools traditional values",
      "collaborative construction relationships",
      "transparent construction communication",
      "long-term construction partnerships",
      "WA OR ID licensed contractor",
      "Eastern Washington contractor",
      "Pacific Northwest general contractor",
      "BBB accredited contractor",
      "BBB A+ rated general contractor",
      "Pasco Chamber of Commerce contractor",
      "Tri-City Regional Chamber member",
      "PWA construction app",
      "offline construction access",
      "proven construction process",
      "construction testimonials Pacific Northwest",
      "veteran construction values",
    ]),
    canonicalUrl: enhancedSEO.siteUrl,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.about.seoName, PAGE_TERMINOLOGY.about.mhBrandName)} | MH Construction`,
    description:
      "Learn MH Construction's company history, leadership transition, and operating approach across commercial, industrial, and public-sector projects in Washington, Oregon, and Idaho.",
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
            "10+ years with MH Construction leading mission-partner relationships",
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
        "Mission-Ready Construction",
        "Industrial Construction",
        "Government Construction Projects",
        "Safety Excellence",
        "Partnership-Driven Construction",
        "Structured Leadership Approach",
      ],
      slogan: MH_DUAL_PHRASES.primarySlogan,
      mission: `${MH_DUAL_PHRASES.primarySlogan} ${MH_DUAL_PHRASES.missionLine}`,
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
        {
          "@type": "City",
          name: "West Richland",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Hermiston",
          containedIn: { "@type": "State", name: "Oregon" },
        },
        {
          "@type": "City",
          name: "Coeur d'Alene",
          containedIn: { "@type": "State", name: "Idaho" },
        },
        {
          "@type": "City",
          name: "Omak",
          containedIn: { "@type": "State", name: "Washington" },
        },
        {
          "@type": "City",
          name: "Pendleton",
          containedIn: { "@type": "State", name: "Oregon" },
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.about.seoName, PAGE_TERMINOLOGY.about.mhBrandName)} | Service-Earned Values, Honest Relationships`,
    description:
      "Explore MH Construction's history, leadership, and trust foundations including BBB accreditation, regional chamber membership, and licensed operations across WA, OR, and ID.",
    keywords: buildPageKeywords("about", [
      "veteran-owned construction company Tri-State WA OR ID",
      "MH Construction company history",
      "Jeremy Thamert Army veteran owner",
      "Arnold Garcia VP construction",
      "structured leadership construction approach",
      "650+ completed projects Pacific Northwest",
      "70 percent referral rate contractor",
      "AGC Washington Top EMR Award",
      "OSHA VPP Star certification",
      ".64 EMR construction safety record",
      "3-state licensed contractor WA OR ID",
      "BBB accredited general contractor",
      "BBB A+ rated construction company",
      "Pasco Chamber of Commerce member",
      "Richland Chamber of Commerce member",
      "Tri-City Regional Chamber of Commerce member",
      "Travelers Insurance bonding partner",
      "partnership philosophy construction",
      "transparent pricing honest communication",
      "Tri-State veteran general contractor",
      "Richland construction company history",
      "Pasco veteran-owned construction",
      "Kennewick construction awards",
      "Benton County construction excellence",
      "Franklin County veteran-owned contractor",
      "Yakima veteran-owned construction company",
      "Spokane veteran general contractor",
      "Walla Walla construction company",
      "Hermiston Oregon general contractor",
      "Coeur d'Alene Idaho general contractor",
      "Omak WA veteran-owned contractor",
      "Pendleton OR general contractor",
      "Eastern Washington construction history",
      "Pacific Northwest general contractor about",
    ]),
    canonicalUrl: aboutUrl,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
    schemas: [companyHistorySchema],
  });
}

// Services page SEO - GROUP 3: Future Vision & Expertise
export function getServicesSEO(): Metadata & { schemas: object[] } {
  const servicesUrl = `${enhancedSEO.siteUrl}/services`;

  const constructionServices = [
    {
      name: "Mission-Ready Construction",
      description:
        "Mission-ready buildings, renovations, and business projects for AG and winery communities with transparent pricing and proven craftsmanship across the Pacific Northwest",
      category: "Mission-Ready Services",
    },
    {
      name: "Mission Planning & Predeployment",
      description:
        'Comprehensive mission planning, feasibility studies, and predeployment alignment rooted in "Creating Value, from Proven Results."',
      category: "Mission Planning Services",
    },
    {
      name: "Mission-Ready Fit-Outs",
      description:
        "Mission-ready fit-outs, interior buildouts, and door and hardware installation for occupied facilities throughout Eastern Washington",
      category: "Fit-Out Services",
    },
    {
      name: "Light Industrial Construction",
      description:
        "Small to mid-size industrial facility expansions, renovations, new builds, and pole buildings with veteran-led operational discipline",
      category: "Industrial Services",
    },
    {
      name: "Government & Public Sector Construction",
      description:
        "Government construction with federal compliance standards and veteran-owned business advantages",
      category: "Government Services",
    },
    {
      name: "Mission Management",
      description:
        "Full-service mission management in Procore with transparent communication, open-book pricing, and systematic quality control",
      category: "Mission Management",
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.services.seoName, PAGE_TERMINOLOGY.services.mhBrandName)} | MH Construction`,
    description:
      "Mission-ready services for owners, facilities teams, and public mission partners including agricultural and winery projects, fit-outs, municipal work, and light industrial delivery across WA, OR, and ID.",
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.services.seoName, PAGE_TERMINOLOGY.services.mhBrandName)} | Mission-Ready Construction Services`,
    description:
      "Explore MH Construction services for agricultural and winery facilities, mission-ready fit-outs, municipal work, and light industrial scopes across WA, OR, and ID, with mission-partner-aligned planning and Procore mission controls.",
    keywords: buildPageKeywords("services", [
      "Jeremy Thamert leadership",
      "mission-ready construction Tri-State WA OR ID",
      "mission planning predeployment services",
      "owner representative construction support",
      "facilities capital project support",
      "mission partner alignment construction",
      "construction planning for occupied facilities",
      "tenant improvement contractor",
      "mission-ready fit-outs",
      "agricultural construction contractor",
      "winery construction contractor",
      "municipal construction contractor",
      "pole building construction",
      "door and hardware installation",
      "Procore mission management",
      "light industrial construction Pacific Northwest",
      "government construction veteran-owned",
      "mission management services",
      "general contractor Richland WA",
      "general contractor Pasco, WA",
      "general contractor Kennewick WA",
      "Benton County construction services",
      "Franklin County contractor services",
      "general contractor Yakima WA",
      "general contractor Spokane WA",
      "general contractor Walla Walla WA",
      "Eastern Washington construction services",
      "veteran-owned construction services",
      "transparent communication construction",
      "WA OR ID licensed contractor",
      "public agency project planning support",
      "school district construction support",
      "healthcare facility mission-ready fit-outs",
      "medical facility construction",
      "winery construction Pacific Northwest",
      "religious facility construction",
      "grant-funded construction projects",
    ]),
    canonicalUrl: servicesUrl,
    ogImage: `${enhancedSEO.siteUrl}/images/og/services/commercial-construction.webp`,
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
        "Owner & President of MH Construction, bringing 35+ years of construction expertise, 500+ completed projects, and 15 years of Army aviation service. Leads with integrity, discipline, and people-first philosophy.",
      alumniOf: "U.S. Army Aviation",
      knowsAbout: [
        "Mission Management",
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
        "Mission Management",
        "Construction Leadership",
        "Mission-Ready Construction",
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
        "Mission Management",
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.team.seoName, PAGE_TERMINOLOGY.team.mhBrandName)} | MH Construction`,
    description:
      "Meet MH Construction's leadership and field management team serving Washington, Oregon, and Idaho with accountable planning and delivery.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    breadcrumb: { "@id": `${teamUrl}#breadcrumb` },
    inLanguage: "en-US",
    mentions: teamPersonSchemas.map((p) => ({ "@id": p["@id"] })),
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.team.seoName, PAGE_TERMINOLOGY.team.mhBrandName)} | Leadership and Field Management`,
    description:
      "Meet MH Construction's leadership team, including Jeremy Thamert and Arnold Garcia, guiding commercial, industrial, and public-sector work across WA, OR, and ID.",
    keywords: buildPageKeywords("team", [
      "MH Construction team leadership",
      "veteran-owned construction team Tri-State WA OR ID",
      "Jeremy Thamert Army veteran owner",
      "Arnold Garcia VP construction",
      "150 years combined construction experience",
      "all-branch veteran leadership",
      "construction project managers Tri-State",
      "veteran construction professionals",
      "Richland contractor team",
      "Pasco construction leadership",
      "Kennewick general contractor team",
      "Benton County construction experts",
      "Franklin County veteran leadership",
      "Pacific Northwest construction team",
      "Eastern Washington construction professionals",
      "veteran hiring construction company",
    ]),
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
    name: `${formatDualPageName("Public Sector Construction", PAGE_TERMINOLOGY.publicSector.mhBrandName)} | MH Construction`,
    description:
      "Veteran-owned Tri-State contractor supporting public agencies with procurement-ready planning, BABAA-aligned delivery support, and accountable execution from Pasco, WA.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og/services/municipal-government.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/public-sector#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.publicSector.seoName, PAGE_TERMINOLOGY.publicSector.mhBrandName)} | Veteran-Owned, Accountable Delivery`,
    description:
      "MH Construction supports public-sector mission partners with veteran-owned leadership, procurement-ready planning, BABAA-informed execution pathways, and transparent delivery reporting across WA, OR, and ID.",
    keywords: buildPageKeywords("public-sector", [
      "Jeremy Thamert leadership",
      "public-sector construction planning",
      "public agency construction partner",
      "owner and architect mission partner alignment",
      "municipal procurement-ready construction",
      "federal compliance construction standards",
      "Build America Buy America Act",
      "BABAA construction support",
      "public sector construction",
      "government grant support",
      "grant-funded project documentation support",
      "public works construction support",
      "school district capital project support",
      "city and county construction support",
      "bonded public construction contractor",
      "construction subcontractor",
      "veteran-owned contractor",
      "Tri-State construction",
      "grant application construction support",
      "Richland public sector",
      "Pasco government support",
      "Hanford area contractor",
      "Benton County construction",
      "Franklin County contractor",
      "Pacific Northwest public sector",
    ]),
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.veterans.seoName, PAGE_TERMINOLOGY.veterans.mhBrandName)} | MH Construction`,
    description:
      "Veteran-focused MH Construction programs include combat veteran discounts, community support, and leadership pathways connected to commercial, industrial, and public-sector work across WA, OR, and ID.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/veterans#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.veterans.seoName, PAGE_TERMINOLOGY.veterans.mhBrandName)} | Combat Veteran Discount, Year-Round Support`,
    description:
      "Learn how MH Construction supports veterans through combat veteran discounts, hiring initiatives, apprenticeships, and long-term community partnerships across the Pacific Northwest.",
    keywords: buildPageKeywords("veterans", [
      "veteran-owned construction Tri-State",
      "combat veteran discount",
      "veteran hiring priority",
      "Army Navy veteran leadership",
      "veteran apprenticeship programs",
      "veteran-owned Trade Partners",
      "Pacific Northwest veteran contractor",
      "Group 1 Veteran Foundation",
      "construction leadership standards",
      "veteran support programs",
      "values-driven leadership",
      "veteran partnerships",
      "Jeremy Thamert Army veteran",
      "Matt Ramsey Navy veteran",
      "all-branch veterans",
      "veteran discount screening",
      "military construction services",
      "Tri-State veteran contractor",
      "veteran-owned business Washington",
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/veterans`,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    name: `${formatDualPageName("Trade Partners", PAGE_TERMINOLOGY.allies.mhBrandName)} | MH Construction`,
    description:
      "Join MH Construction's Trade Partner network serving commercial, industrial, and public-sector projects across WA, OR, and ID with vetted specialty contractors.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/allies#breadcrumb` },
    inLanguage: "en-US",
  };

  // Organization schemas for active vendor partners — "digital handshakes"
  // Each schema creates an entity relationship between MHC and the vendor,
  // supporting GEO co-citation and structured-data link equity.
  const vendorSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Diamond Electric LLC",
      description:
        "Electrical contractor in the MH Construction Trade Partner network. Commercial and industrial electrical installations, code-compliant work, safety-first approach.",
      telephone: "509-552-9459",
      email: "drew@diamondelectricllc.net",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1267 Evanslee Court",
        addressLocality: "Richland",
        addressRegion: "WA",
        postalCode: "99352",
        addressCountry: "US",
      },
      sameAs: ["https://www.facebook.com/diamondelectricllc/photos/"],
      areaServed: "Tri-State (WA, OR, ID)",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Mustang Signs",
      description:
        "Signage Trade Partner in the MH Construction network. Full-service custom signage, vehicle wraps, exterior & interior signage, digital signage, LED retrofitting, print solutions, and professional installation.",
      telephone: "(509) 735-4607",
      email: "info@mustangsigns.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10379 W Clearwater Ave",
        addressLocality: "Kennewick",
        addressRegion: "WA",
        postalCode: "99336",
        addressCountry: "US",
      },
      url: "https://mustangsigns.com/",
      sameAs: [
        "https://mustangsigns.com/",
        "https://www.facebook.com/mustangsigns/",
        "https://www.instagram.com/mustangsigns/",
      ],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Bagley Landscape Construction, Inc.",
      description:
        "Landscaping contractor in the MH Construction Trade Partner network. Commercial and industrial landscape design, irrigation, hydroseeding, retaining walls, hardscaping, maintenance, spraying, and snow & ice services from the Tri-Cities headquarters region across the broader footprint.",
      telephone: "(509) 546-2449",
      email: "office@bagleylandscape.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1418 E St Helens St",
        addressLocality: "Pasco",
        addressRegion: "WA",
        postalCode: "99301",
        addressCountry: "US",
      },
      url: "https://bagleylandscape.com/",
      sameAs: ["https://bagleylandscape.com/"],
      areaServed: "Tri-State (WA, OR, ID)",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "McKinney Glass",
      description:
        "Glass and glazing contractor in the MH Construction Trade Partner network. Auto glass fleet support, commercial storefronts, automatic doors, fire-rated specialty doors, and interior partitions. Union Gap WA.",
      telephone: "(509) 248-2770",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2220 Goodman Rd",
        addressLocality: "Union Gap",
        addressRegion: "WA",
        postalCode: "98903",
        addressCountry: "US",
      },
      url: "https://mckinneyglass.com/",
      sameAs: [
        "https://mckinneyglass.com/",
        "https://www.facebook.com/McKinneyglassyakima",
      ],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Dupree Building Specialties",
      description:
        "Building specialties Trade Partner in the MH Construction network. CSI Division 7–12 products: roof accessories, commercial doors, skylights, access flooring, visual displays, lockers, partitions, athletic equipment, window shades. Spokane WA.",
      telephone: "509.484.2000",
      email: "info@dupreebldg.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1035 E. Cataldo",
        addressLocality: "Spokane",
        addressRegion: "WA",
        postalCode: "99202",
        addressCountry: "US",
      },
      url: "https://dupreebldg.com/",
      sameAs: [
        "https://dupreebldg.com/",
        "https://www.facebook.com/people/Dupree-Building-Specialties/61554190085687/",
        "https://www.linkedin.com/company/dupree-building-specialties",
      ],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Frontier Fencing",
      description:
        "Premier fencing Trade Partner in the MH Construction network. Commercial and industrial fencing, perimeter security, and gate solutions across the Pacific Northwest.",
      telephone: "(509) 545-1801",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2516 N Commercial Ave",
        addressLocality: "Pasco",
        addressRegion: "WA",
        postalCode: "99301",
        addressCountry: "US",
      },
      url: "https://www.frontierfenceinc.com/",
      sameAs: ["https://www.frontierfenceinc.com/"],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Intermountain West Insulation",
      description:
        "Insulation contractor in the MH Construction Trade Partner network. Fiberglass, spray foam, cellulose insulation, air sealing, garage door sales & installation, epoxy flooring, gutters, siding, windows, and window blinds. Kennewick WA.",
      telephone: "509.735.8411",
      address: {
        "@type": "PostalAddress",
        streetAddress: "9304 W. Clearwater Dr. Suite A",
        addressLocality: "Kennewick",
        addressRegion: "WA",
        postalCode: "99336",
        addressCountry: "US",
      },
      url: "https://iwinsulation.com/",
      sameAs: [
        "https://iwinsulation.com/",
        "https://www.facebook.com/p/Intermountain-West-Insulation-100063735342877/",
      ],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Viking Plumbing & Mechanical",
      description:
        "Plumbing and mechanical contractor in the MH Construction Trade Partner network. Commercial and industrial new construction plumbing, drain cleaning, hydro jetting, water heater services, sewer line repair, and water filtration. Yakima WA.",
      telephone: "(509) 450-0485",
      email: "info@vikingplumbingandmechanical.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2805 Ahtanum Rd",
        addressLocality: "Yakima",
        addressRegion: "WA",
        postalCode: "98942",
        addressCountry: "US",
      },
      url: "https://vikingplumbingandmechanical.com/",
      sameAs: [
        "https://vikingplumbingandmechanical.com/",
        "https://www.facebook.com/profile.php?id=61552033463552",
        "https://www.instagram.com/vikingplumbingandmechanical/",
      ],
      areaServed: "Pacific Northwest",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Core Cabinet Production",
      description:
        "Cabinetry Trade Partner in the MH Construction network. Custom-designed and in-house fabricated commercial casework, office cabinetry, storage systems, and specialty millwork. Richland WA.",
      telephone: "(509) 375-7900",
      email: "admin@corecabinetproduction.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2573 Robertson Drive",
        addressLocality: "Richland",
        addressRegion: "WA",
        postalCode: "99354",
        addressCountry: "US",
      },
      url: "https://corecabinetproduction.com/",
      sameAs: ["https://corecabinetproduction.com/"],
      areaServed: "Tri-State (WA, OR, ID)",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "High Desert Drywall, Inc.",
      description:
        "Drywall and interior construction contractor in the MH Construction Trade Partner network. Drywall installation, taping, finishing, and commercial interior scope across the Pacific Northwest.",
      telephone: "(509) 492-5208",
      email: "office@hd-drywall.net",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pasco",
        addressRegion: "WA",
        addressCountry: "US",
      },
      url: "https://hd-drywall.net/",
      sameAs: ["https://hd-drywall.net/"],
      areaServed: "Pacific Northwest",
    },
  ];

  return generateEnhancedMetadata({
    // Title leads with the search-intent keyword phrase, then brand tagline
    title: `${formatDualPageName("Trade Partner Opportunities", PAGE_TERMINOLOGY.allies.mhBrandName)} | Allied Trade Partner Network`,
    description:
      "MH Construction's Trade Partner network includes electrical, signage, landscaping, glazing, specialties, fencing, insulation, plumbing, cabinetry, and drywall teams supporting projects throughout the Pacific Northwest.",
    keywords: buildPageKeywords("allies", [
      "Jeremy Thamert leadership",
      "construction subcontractor opportunities Tri-State WA OR ID",
      "trade partner network Pacific Northwest",
      "veteran-owned contractor partnerships Washington",
      "Diamond Electric electrical contractor Tri-State region",
      "Mustang Signs Kennewick commercial signage vehicle wraps",
      "Bagley Landscape Construction Pasco WA landscaping",
      "McKinney Glass Union Gap Yakima glazing contractor",
      "Dupree Building Specialties Spokane WA",
      "Frontier Fencing premier fencing company Pacific Northwest",
      "Intermountain West Insulation IWI Kennewick spray foam",
      "Viking Plumbing Mechanical Yakima WA plumbing contractor",
      "Core Cabinet Production Richland WA custom cabinets",
      "High Desert Drywall drywall contractor Pacific Northwest",
      "MH Construction Trade Partner network",
      "subcontractor opportunities Richland Kennewick Pasco Yakima Spokane",
      "construction digital handshake subcontractor",
      "Benton County Franklin County Yakima County trade partners",
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/allies`,
    schemas: [
      webPageSchema,
      generateLocalBusinessSchema(),
      ...vendorSchemas,
      // ItemList schema — surfaces the vendor roster as an organized entity
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${enhancedSEO.siteUrl}/allies#vendorlist`,
        name: "MH Construction Trade Partner Network",
        description:
          "Vetted Trade Partners in the MH Construction network, listed alphabetically within each trade category. Updated quarterly.",
        numberOfItems: vendorSchemas.length,
        itemListElement: vendorSchemas.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: (v as { name: string }).name,
          url:
            (v as { url?: string }).url ??
            `${enhancedSEO.siteUrl}/allies#vendors`,
        })),
      },
      // FAQPage schema — captures long-tail "how do I become a subcontractor" queries
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${enhancedSEO.siteUrl}/allies#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "How do I join MH Construction's trade partner network?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We're actively recruiting skilled trade professionals and specialty contractors across the Pacific Northwest. Visit mhc-gc.com/allies and use the 'Begin Partnership Discussion' button, or call (509) 308-6489 to start the conversation.",
            },
          },
          {
            "@type": "Question",
            name: "What trades is MH Construction looking for?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "MH Construction works with electrical, plumbing, landscaping, glass & glazing, signage, insulation, building specialties, cabinetry, drywall, and additional scopes through project-specific procurement. We evaluate every partner for quality, safety culture, and alignment with our values of honesty, integrity, professionalism, and thoroughness.",
            },
          },
          {
            "@type": "Question",
            name: "What are the benefits of being an MH Construction Ally?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Allies receive consistent project volume, prompt payment, and collaborative planning with clear scope expectations, safety coordination, and reliable field communication from bid through handoff.",
            },
          },
        ],
      },
    ],
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
    name: `${formatDualPageName("Client Reviews", PAGE_TERMINOLOGY.testimonials.mhBrandName)} | MH Construction`,
    description:
      "Verified client testimonials from commercial, industrial, and public-sector partners across MH Construction's WA, OR, and ID service area.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/testimonials#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName("Client Reviews", PAGE_TERMINOLOGY.testimonials.mhBrandName)} | Trusted Partner Testimonials`,
    description:
      "Verified client testimonials from commercial, industrial, and public-sector partners across MH Construction's WA, OR, and ID service area.",
    keywords: buildPageKeywords("testimonials", [
      "Jeremy Thamert leadership",
      "construction testimonials",
      "client reviews MH Construction",
      "Tri-State contractor reviews",
      "veteran-owned construction feedback",
      "mission-ready construction testimonials",
      "Pacific Northwest construction reputation",
      "construction client testimonials Pasco WA",
      "verified contractor reviews",
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/testimonials`,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.careers.seoName, PAGE_TERMINOLOGY.careers.mhBrandName)} | MH Construction`,
    description:
      "Build your future with MH Construction through general career inquiries, mentorship-minded growth, and opportunities across commercial, industrial, and public-sector work in WA, OR, and ID.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/careers#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.careers.seoName, PAGE_TERMINOLOGY.careers.mhBrandName)} | Build Your Future with MH Construction`,
    description:
      "Submit a general career inquiry to MH Construction and connect with a team that values honesty, integrity, professionalism, and thoroughness across WA, OR, and ID operations.",
    keywords: buildPageKeywords("careers", [
      "Jeremy Thamert leadership",
      "MH Construction careers",
      "join the mission construction career",
      "veteran-owned construction careers Pacific Northwest",
      "honest construction employer Pacific Northwest",
      "transparent career growth construction",
      "construction career inquiry Washington state",
      "construction jobs Pacific Northwest",
      "veteran construction careers Washington",
      "construction employment Tri-State WA OR ID",
      "military values construction jobs",
      "4 core values employer construction",
      "honesty integrity professionalism thoroughness jobs",
      "skilled trades career inquiry WA",
      "general contractor career Washington",
      "Tri-State construction careers WA OR ID",
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
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/careers`,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
          "Submit a general inquiry for career opportunities at MH Construction. We are always looking for driven individuals who mirror our commitment to our 4 Core Values: Honesty, Integrity, Professionalism, and Thoroughness. Even when we aren't hiring for a specific role, we are always open to inquiries from skilled professionals who want to contribute to a high-standard operations environment. Whether you are a seasoned Project Manager or a dedicated Field Specialist, we want to hear from you. Veterans receive priority consideration. Serving Tri-State WA, OR, ID (Richland, Kennewick, Pasco), Yakima, Spokane, and Walla Walla.",
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
          "Commitment to our 4 Core Values: Honesty, Integrity, Professionalism, and Thoroughness. Skills in mission management, field operations, or skilled trades welcome. Veterans encouraged to apply.",
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
      "Portfolio of completed commercial, industrial, and government construction projects across the Pacific Northwest since 2010.",
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.projects.seoName, PAGE_TERMINOLOGY.projects.mhBrandName)} | MH Construction Portfolio`,
    description:
      "Browse MH Construction's commercial, industrial, light industrial, and government project portfolio across Washington, Oregon, and Idaho.",
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.projects.seoName, PAGE_TERMINOLOGY.projects.mhBrandName)} | Completed Commercial and Industrial Construction Projects`,
    description:
      "Explore MH Construction case studies for commercial, tenant improvement, municipal, agricultural and winery, and light industrial delivery across WA, OR, and ID.",
    keywords: buildPageKeywords("projects", [
      "Jeremy Thamert leadership",
      "construction portfolio Tri-State WA OR ID",
      "construction case studies Pacific Northwest",
      "owner mission partner project outcomes",
      "facilities team project delivery examples",
      "municipal project case studies",
      "tenant improvement case studies",
      "agricultural and winery project case studies",
      "mission-ready construction projects Pacific Northwest",
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
    ]),
    canonicalUrl: projectsUrl,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    name: `${formatDualPageName(PAGE_TERMINOLOGY.contact.seoName, PAGE_TERMINOLOGY.contact.mhBrandName)} | MH Construction`,
    description:
      "Contact MH Construction for a consultation on commercial, industrial, or public-sector projects across WA, OR, and ID. Headquarters: Pasco, WA. Call (509) 308-6489.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/contact#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.contact.seoName, PAGE_TERMINOLOGY.contact.mhBrandName)} | Your Project. Honest Guidance. Let's Connect.`,
    description:
      "Schedule a consultation with MH Construction for commercial, industrial, or public-sector work. We are headquartered in Pasco, WA and licensed across WA, OR, and ID. Call (509) 308-6489.",
    keywords: buildPageKeywords("contact", [
      "Jeremy Thamert leadership",
      "contact construction consultation",
      "clear consultation process",
      "contact construction contractor Pasco WA",
      "veteran-owned construction contact",
      "Pacific Northwest construction company",
      "construction consultation Tri-State",
      "construction project consultation",
      "Richland general contractor contact",
      "Pasco general contractor",
      "Kennewick contractor contact",
      "Benton County construction contact",
      "Franklin County general contractor",
      "Tri-State general contractor contact",
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/contact`,
    ogImage: `${enhancedSEO.siteUrl}/images/og-default.webp`,
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
    name: `${formatDualPageName("FAQ", PAGE_TERMINOLOGY.faq.mhBrandName)} | MH Construction`,
    description:
      "Construction FAQ from MH Construction covering planning, delivery methods, safety practices, project controls, and consultations across WA, OR, and ID service areas.",
    isPartOf: { "@id": `${enhancedSEO.siteUrl}/#website` },
    about: { "@id": `${enhancedSEO.siteUrl}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og/faq/general-information.webp`,
      width: 1200,
      height: 630,
    },
    breadcrumb: { "@id": `${enhancedSEO.siteUrl}/faq#breadcrumb` },
    inLanguage: "en-US",
  };

  return generateEnhancedMetadata({
    // Title without trailing "| MH Construction" — generateEnhancedMetadata appends it
    title: `${formatDualPageName(PAGE_TERMINOLOGY.faq.seoName, PAGE_TERMINOLOGY.faq.mhBrandName)} | Direct Answers. Clear Guidance.`,
    description:
      "Get direct answers on project planning, delivery methods, pricing visibility, safety expectations, and consultation workflow for MH Construction projects across WA, OR, and ID.",
    keywords: buildPageKeywords("faq", [
      "Jeremy Thamert leadership",
      "MH Construction FAQ",
      "direct answers construction guidance",
      "construction FAQ",
      "mission management questions",
      "veteran-owned construction",
      "MH Construction questions",
      "construction process explained",
      "open-book pricing",
      "construction safety record",
      "0.64 EMR safety",
      "Pacific Northwest construction",
      "construction consultation",
      "licensed WA OR ID",
      "mission-ready construction FAQ",
      "construction project timeline",
      "Design-Build vs Design-Bid-Build",
      "Pre-Engineered Metal Buildings PEMB",
      "Pasco WA building permits",
      "Tri-State construction",
      "Yakima construction",
      "Spokane construction",
      "Walla Walla construction",
      "Hermiston Oregon contractor",
      "Coeur d'Alene Idaho contractor",
      "Procore mission management",
      "change orders construction",
      "site feasibility studies",
      "government construction projects",
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/faq`,
    ogImage: `${enhancedSEO.siteUrl}/images/og/faq/general-information.webp`,
    schemas: [webPageSchema, generateConstructionFAQSchema()],
  });
}

// Removed: get3DExplorerSEO function (feature deprecated Dec 2025)
