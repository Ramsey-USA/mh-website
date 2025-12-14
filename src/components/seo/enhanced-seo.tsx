// Enhanced SEO and Schema Markup System
import { type Metadata } from "next";

// Enhanced company information
export const enhancedSEO = {
  siteName: "MH Construction",
  defaultTitle:
    "MH Construction - Building projects for the client, NOT the dollar | Veteran-Owned",
  defaultDescription:
    "Veteran-owned construction management services provider since 2010. Specializing in commercial construction services, master planning and preconstruction services, tenant improvement services, and light industrial construction. Four core values—Honesty, Integrity, Professionalism, Thoroughness—building trust through transparent communication and lasting relationships throughout the Pacific Northwest.",
  siteUrl: process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  twitterHandle: "@mhc_gc",
  defaultKeywords: [
    "veteran-owned contractor",
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
    "Tri-Cities WA contractor",
    "general contractor Tri-Cities",
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
    "Tri-Cities construction company",
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
    name: "MH Construction, Inc.",
    legalName: "MH Construction Incorporated - Veteran-Owned",
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    address: {
      streetAddress: "3111 N. Capitol Ave.",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    foundingDate: "2010-01-15",
    numberOfEmployees: "15-25",
    yearlyRevenue: "$2000000-$5000000",
    serviceArea: {
      states: ["Washington", "Oregon", "Idaho"],
      region: "Pacific Northwest",
      primaryArea: "Tri-Cities WA",
      radius: "Licensed in WA, OR, ID",
    },
    veteranOwned: true,
    businessType: "Veteran-Owned Partnership-Driven Platform",
    mission:
      "Building partnerships, serving communities, creating lasting value in the Pacific Northwest",
    partnershipPhilosophy:
      "We Work With You - Collaborative Construction Partners",
    constructionTools: {
      hasTools: true,
      toolName: "General MH - Construction Assistant",
      toolServices: [
        "Real-time cost estimation",
        "Construction intelligence",
        "Lead qualification",
        "Veteran recognition",
      ],
    },
  },
  socialMedia: {
    facebook: "https://www.facebook.com/profile.php?id=61575511773974",
    instagram: "https://www.instagram.com/mh_construction_inc/reels/",
    linkedin: "https://linkedin.com/company/mhconstruction",
    youtube: "https://youtube.com/@mhc-gc?si=RGnloxP4NgV4Dm_j",
    twitter: "https://x.com/mhc_gc",
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
    alternateName:
      "MH Construction - Veteran-Owned Partnership-Driven Platform",
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
        name: "Tri-Cities Washington",
        description:
          "Primary service area including Pasco, Kennewick, and Richland",
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
      "Budget Planning Tools",
      "Military Precision Construction Management",
    ],
    veteranOwned: true,
    ownershipType: "Veteran-Owned Small Business",
    slogan: "Building projects for the client, NOT the dollar",
    mission:
      "Building partnerships through traditional values, serving communities with face-to-face trust, creating lasting value in the Pacific Northwest",
    technology: {
      "@type": "SoftwareApplication",
      name: "General MH - Construction Planning Assistant",
      description: "Construction planning tools with military precision",
      applicationCategory: "Construction Management Software",
      features: [
        "Budget planning estimates",
        "Military-style project assessment",
        "Veteran recognition and benefits",
        "Construction guidance",
        "Lead qualification system",
      ],
    },
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
    ],
    award: [
      "Award-Winning .64 EMR Safety Record",
      "Traditional Business Values Excellence 2025",
      "Veteran Business Excellence - Pacific Northwest 2025",
    ],
    sameAs: [
      enhancedSEO.socialMedia.facebook,
      enhancedSEO.socialMedia.instagram,
      enhancedSEO.socialMedia.linkedin,
      enhancedSEO.socialMedia.youtube,
    ],
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${enhancedSEO.siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ContactAction",
        target: `${enhancedSEO.siteUrl}/contact`,
        name: "Contact Us",
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
      .replace(/\s+/g, "-")}`,
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
    priceRange: service.priceRange || "$$",
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
      opens: "08:00",
      closes: "17:00",
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
        "Yes! As a veteran-owned business since January 2025, we proudly offer Combat Veteran Discount at the Ready on all projects, plus specialized protocols for veteran recognition and service-specific benefits. Our team provides veteran advisory services for accessibility, energy efficiency, and security guidance. Contact us directly for personalized veteran support.",
    },
    {
      question: "What areas do you serve in the Pacific Northwest?",
      answer:
        "MH Construction serves the Pacific Northwest region with primary focus on the Tri-Cities Washington area (Pasco, Kennewick, Richland). We are fully licensed in Washington, Oregon, and Idaho, serving communities throughout these three states with our partnership-driven approach.",
    },
    {
      question: "What makes MH Construction different from other contractors?",
      answer:
        "We're a veteran-owned construction company where traditional business values come first: handshakes matter, your word is your bond, and face-to-face trust defines every partnership. Founded in 2010, veteran-owned since January 2025 under Army veteran leadership, we combine military precision with helpful modern planning tools, transparent communication, and authentic community relationships. Our motto: 'Building projects for the client, NOT the dollar.'",
    },
    {
      question: "How does the construction planning assistant work?",
      answer:
        "General MH is our construction planning assistant available 24/7 on every page. It provides construction support, preliminary budget planning, veteran recognition, lead qualification, and construction guidance with military-style professionalism. The assistant prepares you for your in-person consultation with our team.",
    },
    {
      question: "What types of construction services do you provide?",
      answer:
        "MH Construction offers comprehensive construction services including residential, commercial, industrial, and government projects. We specialize in renovation services, project management, construction consulting, green building, LEED certification, and military precision construction management with helpful budget planning tools.",
    },
    {
      question: "How can I get started with my construction project?",
      answer:
        "We recommend starting with a free expert consultation—schedule your on-site evaluation for comprehensive assessment and detailed open-book pricing. This face-to-face meeting is where partnerships begin. Contact us at (509) 308-6489 or visit our Contact page to get started.",
    },
    {
      question: "Are you a veteran-owned business?",
      answer:
        "Yes, MH Construction is a proud veteran-owned business certified by the U.S. Small Business Administration. We operate with military precision, serve the veteran community with specialized benefits and recognition, and maintain authentic partnerships that strengthen Pacific Northwest communities.",
    },
  ];

  return generateFAQSchema(faqs);
}

// Generate review schema
export function generateReviewSchema(
  reviews: Array<{
    rating: number;
    reviewBody: string;
    author: string;
    datePublished: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${enhancedSEO.siteUrl}/#organization`,
    review: reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.datePublished,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, _index) => ({
      "@type": "ListItem",
      position: _index + 1,
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
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${enhancedSEO.siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Check", "Financing"],
    currenciesAccepted: "USD",
  };
}

// Component for adding structured data
export function StructuredData({ data }: { data: object | object[] }) {
  const schemaData = Array.isArray(data) ? data : [data];

  // Sanitize JSON data for security
  const sanitizedData = JSON.stringify(schemaData).replace(
    /<\/script/gi,
    "<\\/script",
  );

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

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    robots: noIndex ? "noindex,nofollow" : "_index,follow",

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

    schemas,
  };
}
