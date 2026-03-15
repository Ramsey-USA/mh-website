// Page-specific SEO utilities for MH Construction
import { type Metadata } from "next";
import {
  generateEnhancedMetadata,
  generateConstructionFAQSchema,
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateEnhancedOrganizationSchema,
  enhancedSEO,
} from "@/components/seo/EnhancedSEO";

// Homepage SEO
export function getHomepageSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction",
    description:
      "Base HQ → Home: Your Tri-Cities Construction Command Center serving Richland, Pasco, Kennewick, Yakima, Spokane, and Walla Walla. Veteran-owned construction management since 2010. Expert commercial construction, master planning, preconstruction, tenant improvements, and light industrial operations throughout the Pacific Northwest. Four core values (Honesty, Integrity, Professionalism, Thoroughness) building trust through transparent communication. Dual-label approach: Military Operations → Construction Services. Licensed in WA, OR, ID.",
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
    title:
      "Our Oath → About Us | Service-Earned Values, Battle-Tested Excellence | MH Construction",
    description:
      "Our Oath → About Us: Service-Earned Values, Battle-Tested Excellence. 15 years of proven operations serving Tri-Cities WA (Richland, Kennewick, Pasco), Yakima, Spokane, and Walla Walla. Mike Holstein founded MH Construction in 2010 on partnership values. Army veteran Jeremy Thamert purchased the company in January 2025, bringing veteran-owned leadership. 650+ completed missions, 70% referral rate, consecutive AGC-WA Top EMR Awards, OSHA VPP Star certification. Chain of Command approach: individual specialists, unified mission.",
    keywords: [
      "Our Oath About Us service-earned values",
      "battle-tested construction excellence",
      "veteran-owned construction company 2025",
      "MH Construction company history",
      "construction company evolution 2010-2025",
      "Mike Holstein founder MH Construction",
      "Jeremy Thamert veteran owner",
      "Arnold Garcia VP construction",
      "Chain of Command construction approach",
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
      "Yakima veteran-owned construction company",
      "Spokane veteran general contractor",
      "Walla Walla construction company",
      "Eastern Washington construction history",
      "Pacific Northwest general contractor about",
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
      "Operations → Services | The Battle Plan - Strategic Construction Excellence | MH Construction",
    description:
      "Operations → Services: The Battle Plan - Strategic Construction Excellence from Concept to Completion. Veteran-owned construction services with military precision: honest communication, transparent pricing, proven craftsmanship. Residential, commercial, and government projects across the Tri-Cities (Richland, Kennewick, Pasco), Yakima, Spokane, and Walla Walla. Serving Eastern Washington and the Pacific Northwest. Your construction mission deserves veteran-led expert oversight.",
    keywords: [
      "Operations Services battle plan",
      "strategic construction excellence concept to completion",
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
      "Yakima construction services WA",
      "Yakima veteran contractor Washington",
      "Spokane construction services WA",
      "Spokane veteran contractor Washington",
      "Walla Walla construction services WA",
      "Eastern Washington construction services",
      "construction consultation booking",
      "PWA construction services app",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/services`,
    schemas: serviceSchemas,
  });
}

// Team page SEO - GROUP 3: Future Vision & Growth
export function getTeamSEO(): Metadata & { schemas: object[] } {
  // Generate Person schema for key team members
  const teamPersonSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jeremy Thamert",
      jobTitle: "Owner & President",
      worksFor: {
        "@type": "Organization",
        name: "MH Construction",
        url: enhancedSEO.siteUrl,
      },
      description:
        "Owner & President of MH Construction, bringing 35+ years of construction expertise and 15 years of Army aviation service. Leads with integrity, discipline, and people-first philosophy.",
      alumniOf: "Army Aviation",
      knowsAbout: [
        "Construction Management",
        "Safety Management",
        "Leadership Development",
        "Business Operations",
      ],
      url: `${enhancedSEO.siteUrl}/team#jeremy-thamert`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Arnold Garcia",
      jobTitle: "Vice President",
      worksFor: {
        "@type": "Organization",
        name: "MH Construction",
        url: enhancedSEO.siteUrl,
      },
      description:
        "Vice President with 40+ years of construction experience, overseeing all construction activities and staff mentoring.",
      knowsAbout: [
        "Construction Management",
        "Project Management",
        "Commercial Construction",
        "Team Leadership",
      ],
      url: `${enhancedSEO.siteUrl}/team#arnold-garcia`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mike Holstein",
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        name: "MH Construction",
        url: enhancedSEO.siteUrl,
      },
      description:
        "Founder of MH Construction (founded 2010), created company foundation on integrity, quality, and partnership philosophy. Sold company to Jeremy Thamert in 2025.",
      knowsAbout: [
        "Construction Management",
        "Business Development",
        "Quality Standards",
        "Company Values",
      ],
      url: `${enhancedSEO.siteUrl}/team#mike-holstein`,
    },
  ];

  // Organization Employee Collection Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MH Construction",
    url: enhancedSEO.siteUrl,
    description:
      "Veteran-owned construction company with 150+ years combined military-grade expertise across all service branches.",
    employee: teamPersonSchemas.map((person) => ({
      "@type": "Person",
      name: person.name,
      jobTitle: person.jobTitle,
    })),
    knowsAbout: [
      "Commercial Construction",
      "Residential Construction",
      "Industrial Construction",
      "Project Management",
      "Construction Safety",
      "Veteran Leadership",
    ],
  };

  return generateEnhancedMetadata({
    title:
      "Chain of Command → Our Team | 150+ Years Combined Military-Grade Expertise | MH Construction",
    description:
      "Chain of Command → Our Team: 150+ Years Combined Military-Grade Expertise at Your Service. All-branch veteran leadership you can trust. Meet the veteran-led team building tomorrow's success today through honest communication, transparent pricing, and proven craftsmanship. Professional excellence with service-earned values driving Pacific Northwest construction leadership. Connect through consultation booking, PWA app, or pitch deck.",
    keywords: [
      "Chain of Command Our Team military-grade expertise",
      "150 years combined veteran experience",
      "all-branch veteran leadership",
      "veteran construction team",
      "veteran-owned construction leadership",
      "honest construction professionals",
      "transparent pricing experts",
      "proven craftsmanship team",
      "Pacific Northwest construction leaders",
      "military-grade construction discipline",
      "Tri-Cities construction team",
      "Richland veteran contractors",
      "Pasco construction professionals",
      "Kennewick veteran team",
      "Benton County construction experts",
      "Franklin County veteran leadership",
      "construction team consultation",
      "PWA construction team app",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/team`,
    schemas: [...teamPersonSchemas, organizationSchema],
  });
}

// Government page SEO (Public Sector)
export function getGovernmentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Public Sector → Government | Veteran-Owned Excellence for Government Construction | MH Construction",
    description:
      "Public Sector → Government: Veteran-Owned Excellence for Government Construction Missions. Mission-ready construction operations with federal compliance-driven standards. Building bonding capacity for public sector work. Grant application support and subcontracting services. Tri-Cities based with Pacific Northwest coverage. Military precision meets government requirements.",
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
    schemas: [],
  });
}

// Veterans page SEO - GROUP 4: Professional & Patriotic - UPDATED December 2025
export function getVeteransSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Allied Forces → Veterans | Combat Veteran Discount, Year-Round Support | MH Construction",
    description:
      "Allied Forces → Veterans: Veteran-owned since January 2025 with Army & Navy veteran leadership. 150+ years combined operational experience. Combat Veteran Discount through respectful screening, 100% veteran hiring priority, active apprenticeship programs, strategic partnerships with selective veteran organizations. Group 1 Veteran Foundation values: Honesty, Integrity, Professionalism, Thoroughness guide every mission and partnership.",
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
    schemas: [],
  });
}

// Trade Partners page SEO - GROUP 7: Partnership & ROI Focus
export function getTradePartnersSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Allies → Partners | Strategic Partnerships Built on Trust, Performance, and Mutual Success | MH Construction",
    description:
      "Allies → Partners: Strategic Partnerships Built on Trust, Performance, and Mutual Success. Vetted vendor partnerships building success through trusted alliances. Join MH Construction's elite trade partner network where THE ROI IS THE RELATIONSHIP. Professional subcontractor opportunities with veteran-owned business, fair payment practices, consistent Pacific Northwest project flow, and mission-approved collaboration.",
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
      "Enlist → Careers | Build Your Future with MH Construction | MH Construction",
    description:
      "Enlist → Careers: Build Your Future with a Veteran-Owned Team. We are always looking for driven individuals who mirror our 4 Core Values: Honesty, Integrity, Professionalism, and Thoroughness. Submit a general career inquiry - even when we aren't hiring for a specific role we welcome skilled professionals in the Tri-Cities, Yakima, Spokane, and Walla Walla, WA. Veterans receive priority consideration.",
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
  return generateEnhancedMetadata({
    title:
      "Missions → Projects | Mission Success: 650+ Completed Projects | MH Construction",
    description:
      "Missions → Projects: Mission Success - 650+ Completed Projects, Countless Lasting Relationships. Veteran-owned since 2025, building excellence since 2010. Our completed construction missions showcase honest communication, transparent pricing, and proven craftsmanship across residential, commercial, and government work throughout Tri-Cities WA (Richland, Kennewick, Pasco), Yakima, Spokane, and Walla Walla. Trust built project by project through proven results and trusted partnerships.",
    keywords: [
      "Missions Projects 650 completed",
      "mission success proven results",
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
      "Yakima construction projects",
      "Spokane construction portfolio",
      "Walla Walla contractor projects",
      "Eastern Washington construction projects",
      "WA OR ID construction projects",
      "construction project consultation",
      "construction portfolio Pacific Northwest",
    ],
    canonicalUrl: `${enhancedSEO.siteUrl}/projects`,
    schemas: [generateLocalBusinessSchema()],
  });
}

// Contact page SEO
export function getContactSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Rally Point → Contact | Your Project. Our Expertise. Let's Connect. | MH Construction",
    description:
      "Rally Point → Contact: Your Project. Our Expertise. Let's Connect. Schedule your free mission brief - start with SITREP-level clarity. Contact MH Construction for your Pacific Northwest construction needs. Founded 2010, veteran-owned since January 2025 with military precision and authentic partnership approach. Face-to-face consultation. (509) 308-6489",
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
    schemas: [generateLocalBusinessSchema()],
  });
}

// Urgent Support page SEO - GROUP 7: Partnership & Urgency
export function getUrgentSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Rapid Response → Emergency | 24/7 Emergency Construction Response | MH Construction",
    description:
      "Rapid Response → Emergency: 24/7 Emergency Construction Response - Mission-Ready Support. Rapid response when your construction mission is critical. Veteran-owned emergency deployment with honest assessment, transparent pricing, proven solutions. Expert consultation, specialized equipment, experienced crews—immediate deployment WA, OR, ID. THE ROI IS THE RELATIONSHIP. Call (509) 308-6489.",
    keywords: [
      "Rapid Response Emergency 24/7",
      "mission-ready support construction",
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

// FAQ page SEO - GROUP 6: Information & Support
export function getFAQSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title:
      "Intel Brief → FAQ | Direct Answers. Clear Guidance. Mission-Ready Information. | MH Construction",
    description:
      "Intel Brief → FAQ: Direct Answers. Clear Guidance. Mission-Ready Information. Mission intelligence for your construction questions answered. Find answers to common questions about MH Construction's veteran-owned services, process, safety record (.64 EMR), veteran benefits, and partnership approach. Open-book pricing, Design-Build vs Design-Bid-Build, PEMB buildings, Procore project management, and face-to-face consultation process.",
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
    schemas: [generateConstructionFAQSchema()],
  });
}

// Removed: get3DExplorerSEO function (feature deprecated Dec 2025)
