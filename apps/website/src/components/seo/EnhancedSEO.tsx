// Enhanced SEO and Schema Markup System
import { type Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

// Enhanced company information
export const enhancedSEO = {
  siteName: COMPANY_INFO.name,
  defaultTitle:
    "Base HQ → Home | Building projects for the Client, NOT the Dollar | MH Construction",
  defaultDescription:
    "Base HQ → Home: Your Tri-State Construction Command Center. BBB Accredited A+. Pasco, Richland & Tri-City Regional Chamber of Commerce member. Construction management services since 2010, Veteran-Owned Since January 2025, with dual-label approach (Military Operations → Construction Services). Specializing in commercial construction, master planning, preconstruction, tenant improvements, and light industrial construction. Service-earned values—Honesty, Integrity, Professionalism, Thoroughness—building trust through clear transparency and structured leadership throughout the Pacific Northwest.",
  siteUrl: COMPANY_INFO.urls.getSiteUrl(),
  twitterHandle: COMPANY_INFO.social.twitterHandle,
  defaultKeywords: [
    "Base HQ Home construction command center",
    "dual-label military civilian construction",
    "Veteran-Owned contractor",
    "service-earned construction values",
    "Chain of Command construction approach",
    "military precision construction",
    "Operations Services dual messaging",
    "Projects portfolio terminology",
    "Contact construction consultation",
    "clear construction communication",
    "proven construction excellence",
    "all-branch veteran leadership",
    "150 years combined military-grade expertise",
    "general contractor",
    "construction management services",
    "commercial construction services",
    "master planning and preconstruction services",
    "tenant improvement services",
    "light industrial construction",
    "partnership construction approach",
    "collaborative building relationships",
    "modern tools traditional values",
    "military precision construction",
    "Pacific Northwest builder",
    "long-term construction partnerships",
    "trust-based construction",
    "veteran benefits construction",
    "Tri-State licensed contractor",
    "general contractor Tri-State",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "general contractor Richland WA",
    "general contractor Pasco WA",
    "general contractor Kennewick WA",
    "Benton County contractor",
    "Franklin County contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "Tri-State construction company",
    "Richland construction",
    "Pasco construction",
    "Kennewick construction",
    "Yakima general contractor",
    "Spokane general contractor",
    "Walla Walla general contractor",
    "Hermiston general contractor",
    "Coeur d'Alene general contractor",
    "Eastern Washington contractor",
    "transparent construction partnerships",
    "face-to-face consultation construction",
    "Washington Oregon Idaho contractor",
    "relationship-focused building",
    "community-focused building",
    "partnership-driven construction",
    "construction technology innovation",
  ],
  companyInfo: {
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    telephone: COMPANY_INFO.phone.display,
    email: COMPANY_INFO.email.main,
    address: {
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.stateCode,
      postalCode: COMPANY_INFO.address.zip,
      addressCountry: COMPANY_INFO.address.country,
    },
    foundingDate: "2010-01-15",
    numberOfEmployees: "15-25",
    yearlyRevenue: "$2000000-$5000000",
    serviceArea: {
      states: ["Washington", "Oregon", "Idaho"],
      region: "Pacific Northwest",
      primaryArea: "Tri-Cities Headquarters (Pasco, Richland, Kennewick)",
      radius: "Licensed in WA, OR, ID",
    },
    veteranOwned: true,
    businessType: "Veteran-Owned General Contractor",
    mission:
      "Building partnerships, serving communities, creating lasting value in the Pacific Northwest",
    partnershipPhilosophy:
      "We Work With You - Collaborative Construction Partners",
    openingHours: "Mo-Fr 07:00-16:00",
    paymentAccepted: [
      "Cash",
      "Check",
      "Credit Card",
      "ACH",
      "Financing Available",
    ],
    priceRange: "$$$$",
  },
  socialMedia: {
    facebook: COMPANY_INFO.social.facebook,
    instagram: COMPANY_INFO.social.instagram,
    linkedin: COMPANY_INFO.social.linkedin,
    youtube: COMPANY_INFO.social.youtube,
    twitter: COMPANY_INFO.social.twitter,
  },
};

// Generate comprehensive organization schema
export function generateEnhancedOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "VeteranOwnedBusiness"],
    "@id": `${enhancedSEO.siteUrl}/#organization`,
    name: enhancedSEO.companyInfo.name,
    legalName: enhancedSEO.companyInfo.legalName,
    alternateName: "MH Construction - Veteran-Owned General Contractor",
    description: enhancedSEO.defaultDescription,
    url: enhancedSEO.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/logo/mh-logo.png`,
      width: 300,
      height: 150,
    },
    image: {
      "@type": "ImageObject",
      url: `${enhancedSEO.siteUrl}/images/og-default.jpg`,
      width: 1200,
      height: 630,
    },
    telephone: enhancedSEO.companyInfo.telephone,
    email: enhancedSEO.companyInfo.email,
    foundingDate: enhancedSEO.companyInfo.foundingDate,
    numberOfEmployees: enhancedSEO.companyInfo.numberOfEmployees,
    annualRevenue: enhancedSEO.companyInfo.yearlyRevenue,
    address: {
      "@type": "PostalAddress",
      ...enhancedSEO.companyInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.2396,
      longitude: -119.1006,
    },
    areaServed: [
      {
        "@type": "State",
        name: "Washington",
      },
      {
        "@type": "State",
        name: "Oregon",
      },
      {
        "@type": "State",
        name: "Idaho",
      },
      {
        "@type": "Place",
        name: "Pacific Northwest Region",
        description: "Serving Pacific Northwest communities with excellence",
      },
      {
        "@type": "City",
        name: "Tri-Cities Headquarters",
        description: "Headquarters region: Pasco, Richland, and Kennewick",
      },
      {
        "@type": "City",
        name: "Richland",
        addressRegion: "WA",
        description: "General contractor services in Richland, Washington",
      },
      {
        "@type": "City",
        name: "Pasco",
        addressRegion: "WA",
        description: "General contractor services in Pasco, Washington",
      },
      {
        "@type": "City",
        name: "Kennewick",
        addressRegion: "WA",
        description: "General contractor services in Kennewick, Washington",
      },
      {
        "@type": "AdministrativeArea",
        name: "Benton County",
        addressRegion: "WA",
        description: "Construction services in Benton County, Washington",
      },
      {
        "@type": "AdministrativeArea",
        name: "Franklin County",
        addressRegion: "WA",
        description: "Construction services in Franklin County, Washington",
      },
      {
        "@type": "City",
        name: "Yakima",
        addressRegion: "WA",
        description: "General contractor services in Yakima, Washington",
      },
      {
        "@type": "City",
        name: "Spokane",
        addressRegion: "WA",
        description: "General contractor services in Spokane, Washington",
      },
      {
        "@type": "City",
        name: "Walla Walla",
        addressRegion: "WA",
        description: "General contractor services in Walla Walla, Washington",
      },
      {
        "@type": "City",
        name: "Hermiston",
        addressRegion: "OR",
        description: "General contractor services in Hermiston, Oregon",
      },
      {
        "@type": "City",
        name: "Coeur d'Alene",
        addressRegion: "ID",
        description: "General contractor services in Coeur d'Alene, Idaho",
      },
      {
        "@type": "City",
        name: "Omak",
        addressRegion: "WA",
        description: "General contractor services in Omak, Washington",
      },
      {
        "@type": "City",
        name: "Pendleton",
        addressRegion: "OR",
        description: "General contractor services in Pendleton, Oregon",
      },
    ],
    serviceType: [
      "Residential Construction",
      "Commercial Construction",
      "Industrial Construction",
      "Government Construction Projects",
      "Renovation Services",
      "Project Management",
      "Construction Consulting",
      "Green Building",
      "LEED Certification",
      "Disciplined Construction Management",
    ],
    veteranOwned: true,
    ownershipType: "Veteran-Owned Small Business",
    slogan: "Building projects for the Client, NOT the Dollar",
    mission:
      "Building partnerships through traditional values, serving communities with face-to-face trust, creating lasting value in the Pacific Northwest",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "License",
        recognizedBy: {
          "@type": "Organization",
          name: "Washington State Department of Labor & Industries",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "License",
        recognizedBy: {
          "@type": "Organization",
          name: "Oregon Construction Contractors Board",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "License",
        recognizedBy: {
          "@type": "Organization",
          name: "Idaho Division of Building Safety",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Certification",
        recognizedBy: {
          "@type": "Organization",
          name: "U.S. Small Business Administration - Veteran Owned Small Business",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Accreditation",
        recognizedBy: {
          "@type": "Organization",
          name: "Better Business Bureau",
          url: "https://www.bbb.org",
        },
        dateCreated: "2026-04-07",
        description: "BBB Accredited Business with A+ Rating",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Membership",
        recognizedBy: {
          "@type": "Organization",
          name: "Pasco Chamber of Commerce",
          url: "https://pascochamber.org",
        },
        description: "Pasco Chamber of Commerce Member",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Membership",
        recognizedBy: {
          "@type": "Organization",
          name: "Richland Chamber of Commerce",
          url: "https://www.richlandchamber.org",
        },
        description: "Richland Chamber of Commerce Member",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Membership",
        recognizedBy: {
          "@type": "Organization",
          name: "Tri-City Regional Chamber of Commerce",
          url: "https://web.tricityregionalchamber.com",
        },
        description: "Tri-City Regional Chamber of Commerce Member",
      },
    ],
    award: [
      "BBB Accredited Business - A+ Rating 2026",
      "AGC-WA Top EMR Award 2019 - .64 EMR Rating",
      "AGC-WA Top EMR Award 2020 - .64 EMR Rating",
      "AGC-WA Top EMR Award 2021 - .64 EMR Rating",
      "AGC-WA Most Improved EMR Award 2025",
      "OSHA VPP Star Designation 2022",
      "650+ Successfully Completed Projects",
      "70% Client Referral Rate",
      "3+ Years Claims-Free Operation",
      "Veteran Business Excellence - Pacific Northwest 2025",
    ],
    sameAs: [
      enhancedSEO.socialMedia.facebook,
      enhancedSEO.socialMedia.instagram,
      enhancedSEO.socialMedia.twitter,
      enhancedSEO.socialMedia.linkedin,
      enhancedSEO.socialMedia.youtube,
      COMPANY_INFO.bbb.profileUrl,
      COMPANY_INFO.chambers.pasco.memberDirectoryUrl,
      COMPANY_INFO.chambers.richland.memberDirectoryUrl,
      COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl,
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "Pasco Chamber of Commerce",
        url: "https://pascochamber.org",
      },
      {
        "@type": "Organization",
        name: "Richland Chamber of Commerce",
        url: "https://www.richlandchamber.org",
      },
      {
        "@type": "Organization",
        name: "Tri-City Regional Chamber of Commerce",
        url: "https://web.tricityregionalchamber.com",
      },
      {
        "@type": "Organization",
        name: "Associated General Contractors of Washington",
        url: "https://www.agcwa.com",
      },
    ],
    potentialAction: [
      {
        "@type": "ContactAction",
        target: `${enhancedSEO.siteUrl}/contact`,
        name: "Contact Us",
      },
      {
        "@type": "ReserveAction",
        target: `${enhancedSEO.siteUrl}/contact`,
        name: "Schedule Free Consultation",
      },
    ],
  };
}

// Generate service schema for each construction service
export function generateServiceSchema(service: {
  name: string;
  description: string;
  category: string;
  priceRange?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${enhancedSEO.siteUrl}/services/${service.name
      .toLowerCase()
      .split(/\s+/)
      .join("-")}`,
    name: service.name,
    description: service.description,
    category: service.category,
    provider: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    areaServed: {
      "@type": "State",
      name: "Washington",
    },
    priceRange: service.priceRange || "$$$$",
    duration: service.duration,
    serviceType: service.category,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        },
      ],
    },
  };
}

// Generate IRL Consultation service schema (removed booking/estimator schemas Dec 2025)
export function generateIRLConsultationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${enhancedSEO.siteUrl}/contact#irl-consultation`,
    name: "In-Person Construction Consultation",
    alternateName: "IRL Sales Consultation",
    description:
      "Professional in-person consultation with experienced MH Construction sales representatives for comprehensive project assessment and detailed estimates",
    provider: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    serviceType: "Construction Consultation",
    category: "Professional Construction Services",
    areaServed: [
      {
        "@type": "State",
        name: "Washington",
      },
      {
        "@type": "State",
        name: "Oregon",
      },
      {
        "@type": "State",
        name: "Idaho",
      },
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Construction Consultation",
      description: "Complimentary on-site evaluation and project consultation",
    },
    serviceOutput: [
      "On-site evaluation and assessment",
      "Preliminary project estimates",
      "Two-way dialogue and Q&A session",
      "Expert guidance from construction managers",
      "Partnership building and relationship development",
      "Customized solutions for specific needs",
    ],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00",
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: `${enhancedSEO.siteUrl}/contact`,
      name: "Schedule Free Consultation",
    },
  };
}

// Generate FAQ schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate comprehensive construction FAQ schema
export function generateConstructionFAQSchema() {
  const faqs = [
    {
      question:
        "What is the difference between preliminary planning and Expert Consultation?",
      answer:
        "Our free Expert Consultation offers comprehensive on-site evaluations with detailed open-book pricing and personalized recommendations during business hours. This face-to-face approach is how we build trust and lasting partnerships. We believe the best projects start with honest conversation and a firm handshake.",
    },
    {
      question: "Do you offer veteran benefits and discounts?",
      answer:
        "Yes! As a Veteran-Owned business since January 2025, we proudly offer Combat Veteran Discount at the Ready on all projects, plus specialized protocols for veteran recognition and service-specific benefits. Our team provides veteran advisory services for accessibility, energy efficiency, and security guidance. Contact us directly for personalized veteran support.",
    },
    {
      question: "What areas do you serve in the Pacific Northwest?",
      answer:
        "MH Construction serves projects throughout the Pacific Northwest and is fully licensed in Washington, Oregon, and Idaho. We are headquartered in the Tri-Cities (Pasco, Richland, Kennewick) and deliver work across our Tri-State footprint, with Montana expansion coming soon.",
    },
    {
      question: "What makes MH Construction different from other contractors?",
      answer:
        "We're a Veteran-Owned construction company where traditional business values come first: handshakes matter, your word is your bond, and face-to-face trust defines every partnership. Founded in 2010 by Mike Holstein, purchased by Army veteran Jeremy Thamert in January 2025, we combine disciplined execution with transparent communication and authentic community relationships. Our motto: 'Building projects for the Client, NOT the Dollar.'",
    },
    {
      question: "What safety record and awards does MH Construction hold?",
      answer:
        "MH Construction has an award-winning safety record, including multiple AGC-WA Top EMR Awards (2019, 2020, 2021) with a 0.64 EMR — roughly 40% better than the industry average — and the OSHA VPP Star Designation, the highest workplace safety recognition. In 2025 we received the AGC-WA Most Improved EMR Award and have operated claims-free for 3+ consecutive years. Safety is a core value, not just a metric.",
    },
    {
      question: "What types of construction services do you provide?",
      answer:
        "MH Construction offers comprehensive construction services including commercial, industrial, and government projects. We specialize in general contracting, construction management, master planning and preconstruction, tenant improvements, light industrial construction, design-build, facility renovations, and public-sector builds. Each project is approached with disciplined planning and transparent open-book communication.",
    },
    {
      question: "How can I get started with my construction project?",
      answer:
        "We recommend starting with a free expert consultation—schedule your on-site evaluation for comprehensive assessment and detailed open-book pricing. This face-to-face meeting is where partnerships begin. Contact us at (509) 308-6489 or visit our Contact page to get started.",
    },
    {
      question: "Are you a Veteran-Owned business?",
      answer:
        "Yes, MH Construction is a proud Veteran-Owned business certified by the U.S. Small Business Administration. We operate with disciplined execution, serve the veteran community with specialized benefits and recognition, and maintain authentic partnerships that strengthen Pacific Northwest communities.",
    },
  ];

  return generateFAQSchema(faqs);
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// Generate project schema
export function generateProjectSchema(project: {
  name: string;
  description: string;
  category: string;
  location: { city: string; state: string };
  completionDate?: string;
  budget?: string;
  images: Array<{ url: string; caption?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ConstructionProject",
    name: project.name,
    description: project.description,
    category: project.category,
    contractor: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.city,
        addressRegion: project.location.state,
        addressCountry: "US",
      },
    },
    dateCompleted: project.completionDate,
    budget: project.budget,
    image: project.images.map((img) => ({
      "@type": "ImageObject",
      url: img.url,
      caption: img.caption,
    })),
  };
}

// Generate blog article schema
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  modifiedDate?: string;
  image: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: {
      "@type": "ImageObject",
      url: article.image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    url: article.url,
    articleSection: article.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
  };
}

// Generate website schema
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${enhancedSEO.siteUrl}/#website`,
    url: enhancedSEO.siteUrl,
    name: enhancedSEO.siteName,
    description: enhancedSEO.defaultDescription,
    publisher: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "ContactAction",
      target: `${enhancedSEO.siteUrl}/contact`,
      name: "Contact MH Construction",
    },
  };
}

// Generate local business schema
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${enhancedSEO.siteUrl}/#localbusiness`,
    name: enhancedSEO.companyInfo.name,
    description: enhancedSEO.defaultDescription,
    url: enhancedSEO.siteUrl,
    telephone: enhancedSEO.companyInfo.telephone,
    email: enhancedSEO.companyInfo.email,
    address: {
      "@type": "PostalAddress",
      ...enhancedSEO.companyInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.2396,
      longitude: -119.1006,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Richland",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Pasco",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Kennewick",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Yakima",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Spokane",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Walla Walla",
        addressRegion: "WA",
      },
      {
        "@type": "AdministrativeArea",
        name: "Benton County",
      },
      {
        "@type": "AdministrativeArea",
        name: "Franklin County",
      },
      {
        "@type": "Place",
        name: "Tri-Cities Headquarters Region",
      },
      {
        "@type": "Place",
        name: "Pacific Northwest",
      },
      {
        "@type": "City",
        name: "Omak",
        addressRegion: "WA",
      },
      {
        "@type": "City",
        name: "Pendleton",
        addressRegion: "OR",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$$$",
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Check",
      "ACH",
      "Financing Available",
    ],
    currenciesAccepted: "USD",
    memberOf: {
      "@type": "Organization",
      name: "Better Business Bureau",
      url: "https://www.bbb.org",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Accreditation",
      recognizedBy: {
        "@type": "Organization",
        name: "Better Business Bureau",
        url: "https://www.bbb.org",
      },
      dateCreated: "2026-04-07",
      description: "BBB Accredited Business with A+ Rating",
    },
  };
}

// Component for adding structured data
type StructuredDataProps = Readonly<{ data: object | object[] }>;

export function StructuredData({ data }: StructuredDataProps) {
  const schemaData = Array.isArray(data) ? data : [data];

  // Sanitize JSON data for security
  const sanitizedData = JSON.stringify(schemaData)
    .split("</script")
    .join(String.raw`<\/script`)
    .split("</SCRIPT")
    .join(String.raw`<\/SCRIPT`);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: sanitizedData,
      }}
    />
  );
}

// Enhanced metadata generation
export function generateEnhancedMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = "website",
  noIndex = false,
  schemas = [],
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
  schemas?: object[];
}): Metadata & { schemas: object[] } {
  const pageTitle = title
    ? `${title} | ${enhancedSEO.siteName}`
    : enhancedSEO.defaultTitle;

  const pageDescription = description || enhancedSEO.defaultDescription;
  const pageKeywords = [...enhancedSEO.defaultKeywords, ...keywords].join(", ");
  const pageUrl = canonicalUrl || enhancedSEO.siteUrl;
  const pageImage = ogImage || `${enhancedSEO.siteUrl}/images/og-default.png`;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    robots: noIndex ? "noindex,nofollow" : "index,follow",

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: enhancedSEO.siteName,
      type: ogType,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
    },

    twitter: {
      card: "summary_large_image",
      site: enhancedSEO.twitterHandle,
      creator: enhancedSEO.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    other: {
      "theme-color": "#386851",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": enhancedSEO.siteName,
      "application-name": enhancedSEO.siteName,
      "msapplication-TileColor": "#386851",
      "msapplication-config": "/browserconfig.xml",
    },
  };

  return {
    ...withGeoMetadata(metadata),
    schemas,
  };
}
