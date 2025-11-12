// Enhanced SEO and Schema Markup System
import { type Metadata } from "next";

// Enhanced company information
export const enhancedSEO = {
  siteName: "MH Construction",
  defaultTitle:
    "MH Construction - Building for the Client, NOT the Dollar | Veteran-Owned",
  defaultDescription:
    "Where handshakes matter and your word is your bond. Founded 2010, veteran-owned since January 2025 under Army veteran leadership. Serving Pacific Northwest communities with traditional business values, face-to-face trust, and helpful modern tools including budget planning and military precision project management.",
  siteUrl: process.env["NEXT_PUBLIC_SITE_URL"] || "https://www.mhc-gc.com",
  twitterHandle: "@MHConstruction",
  defaultKeywords: [
    "veteran-owned contractor",
    "traditional business values construction",
    "military precision construction",
    "Pacific Northwest builder",
    "construction budget planner",
    "handshake business construction",
    "trust-based construction",
    "veteran benefits construction",
    "Tri-Cities WA contractor",
    "transparent construction partnerships",
    "personal consultation construction",
    "military-style project management",
    "Washington Oregon Idaho contractor",
    "relationship-focused building",
    "community-focused building",
    "partnership-driven construction",
    "face-to-face trust builder",
  ],
  companyInfo: {
    name: "MH Construction LLC",
    legalName: "MH Construction Limited Liability Company - Veteran-Owned",
    telephone: "(509) 308-6489",
    clientExtension: "ext. 100",
    vendorExtension: "ext. 150",
    email: "office@mhc-gc.com",
    address: {
      streetAddress: "3111 N. Capital Ave.",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    foundingDate: "2020-01-15",
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
    aiCapabilities: {
      hasAI: true,
      aiAssistant: "General MH - Military AI Assistant",
      aiServices: [
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
    youtube: "https://youtube.com/@mhconstruction",
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
    slogan: "Building for the Client, NOT the Dollar",
    mission:
      "Building partnerships through traditional values, serving communities with face-to-face trust, creating lasting value in the Pacific Northwest",
    technology: {
      "@type": "SoftwareApplication",
      name: "General MH - Construction Planning Assistant",
      description:
        "Helpful construction planning tools with military precision",
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
      "Award-Winning .6 EMR Safety Record",
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
        "@type": "ReserveAction",
        target: `${enhancedSEO.siteUrl}/booking`,
        name: "Schedule Free Consultation",
      },
      {
        "@type": "OrderAction",
        target: `${enhancedSEO.siteUrl}/estimator`,
        name: "Get Budget Planning Estimate",
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

// Generate AI Estimator service schema
export function generateAIEstimatorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${enhancedSEO.siteUrl}/estimator#budget-planner`,
    name: "Construction Budget Planning Tool",
    description:
      "Helpful budget planning tool providing preliminary project cost estimates with regional intelligence and veteran benefits integration to prepare for personal consultation",
    applicationCategory: "Construction Estimation Software",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Budget Planning",
      description:
        "Helpful budget estimation service available 24/7 to prepare for consultation",
    },
    provider: {
      "@id": `${enhancedSEO.siteUrl}/#organization`,
    },
    featureList: [
      "Real-Time Pricing Intelligence",
      "Material Database with 4-tier quality system",
      "Pacific Northwest location intelligence with 8 zones",
      "Seasonal adjustments for weather and market conditions",
      "Automatic 12% combat veteran discount application",
      "Regional market intelligence with live cost calculations",
      "Instant preliminary estimates in seconds",
      "24/7 availability for research phase clients",
    ],
    screenshot: `${enhancedSEO.siteUrl}/images/ai-estimator-screenshot.jpg`,
    softwareVersion: "4.0.0",
    datePublished: "2025-10-23",
    isAccessibleForFree: true,
    audience: {
      "@type": "Audience",
      audienceType: "Construction Project Clients, Homeowners, Business Owners",
    },
  };
}

// Generate IRL Consultation service schema
export function generateIRLConsultationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${enhancedSEO.siteUrl}/booking#irl-consultation`,
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
      target: `${enhancedSEO.siteUrl}/booking`,
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
        "What is the difference between AI Estimator and IRL Consultation?",
      answer:
        "Our AI Estimator provides instant, preliminary cost estimates available 24/7 for research phase clients, while IRL Consultation offers personalized on-site evaluations with our experienced sales representatives during business hours. AI Estimator is automated and immediate, while IRL Consultation provides detailed human expertise and relationship building.",
    },
    {
      question: "Do you offer veteran benefits and discounts?",
      answer:
        "Yes! As a veteran-owned business since January 2025, we proudly offer automatic 12% combat veteran discounts through our AI Estimator system, plus specialized protocols for veteran recognition and service-specific benefits. Our General MH military AI assistant provides veteran advisory services for accessibility, energy efficiency, and security guidance.",
    },
    {
      question: "What areas do you serve in the Pacific Northwest?",
      answer:
        "MH Construction serves the Pacific Northwest region with primary focus on the Tri-Cities Washington area (Pasco, Kennewick, Richland). We are fully licensed in Washington, Oregon, and Idaho, serving communities throughout these three states with our partnership-driven approach.",
    },
    {
      question: "What makes MH Construction different from other contractors?",
      answer:
        "We're a veteran-owned construction company where traditional business values come first: handshakes matter, your word is your bond, and face-to-face trust defines every partnership. Founded in 2010, veteran-owned since January 2025 under Army veteran leadership, we combine military precision with helpful modern planning tools, transparent communication, and authentic community relationships. Our motto: 'Building for the Client, NOT the Dollar.'",
    },
    {
      question: "How does the construction planning assistant work?",
      answer:
        "General MH is our helpful construction planning assistant available 24/7 on every page. It provides construction support, preliminary budget planning, veteran recognition, lead qualification, and construction guidance with military-style professionalism. The assistant uses helpful tools to prepare you for your in-person consultation with our team.",
    },
    {
      question: "What types of construction services do you provide?",
      answer:
        "MH Construction offers comprehensive construction services including residential, commercial, industrial, and government projects. We specialize in renovation services, project management, construction consulting, green building, LEED certification, and military precision construction management with helpful budget planning tools.",
    },
    {
      question: "How can I get started with my construction project?",
      answer:
        "We recommend starting with a personal consultation—schedule your free on-site evaluation for personalized assessment. You can also use our 24/7 Budget Planning Tool for preliminary estimates to help prepare for our meeting. Contact us at (509) 308-6489 - ext. 100 for client partnerships or ext. 150 for vendor partnerships.",
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
