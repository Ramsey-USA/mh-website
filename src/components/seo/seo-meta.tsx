import { type Metadata } from "next";

// SEO configuration interface for type safety
interface _SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  structuredData?: object;
}

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
}

const defaultSEO = {
  siteName: "MH Construction",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.mhc-gc.com",
  defaultTitle:
    "MH Construction - Veteran-Owned Construction Excellence in the Pacific Northwest",
  defaultDescription:
    "MH Construction delivers exceptional residential, commercial, and industrial construction services throughout the Pacific Northwest. Veteran-owned with AI-powered project management.",
  defaultKeywords: [
    "construction",
    "building",
    "contractor",
    "residential construction",
    "commercial construction",
    "renovation",
    "remodeling",
    "Pacific Northwest",
    "Tri-Cities construction",
    "Pasco construction",
    "Kennewick construction",
    "Richland construction",
    "veteran owned business",
    "custom homes",
    "office buildings",
    "kitchen remodel",
    "bathroom renovation",
    "construction estimate",
    "AI construction",
  ],
  twitterHandle: "@MHConstruction",
  companyInfo: {
    name: "MH Construction",
    address: {
      streetAddress: "3111 N. Capital Ave.",
      addressLocality: "Pasco",
      addressRegion: "WA",
      postalCode: "99301",
      addressCountry: "US",
    },
    telephone: "(509) 308-6489",
    email: "office@mhc-gc.com",
  },
};

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = "website",
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  const pageTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.defaultTitle;

  const pageDescription = description || defaultSEO.defaultDescription;
  const pageKeywords = [...defaultSEO.defaultKeywords, ...keywords].join(", ");
  const pageUrl = canonicalUrl || defaultSEO.siteUrl;
  const pageImage = ogImage || `${defaultSEO.siteUrl}/images/og-default.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    robots: noIndex ? "noindex,nofollow" : "index,follow",

    // Canonical URL
    alternates: {
      canonical: pageUrl,
    },

    // Open Graph
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: defaultSEO.siteName,
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

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: defaultSEO.twitterHandle,
      creator: defaultSEO.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    // Additional meta tags
    other: {
      "theme-color": "#1E40AF", // Brand primary color
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": defaultSEO.siteName,
      "application-name": defaultSEO.siteName,
      "msapplication-TileColor": "#1E40AF",
      "msapplication-config": "/browserconfig.xml",
    },
  };
}

// Component for adding structured data
export function StructuredData({ data }: { data: object }) {
  // Sanitize JSON data for security
  const sanitizedData = JSON.stringify(data).replace(
    /<\/script/gi,
    "<\\/script",
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedData }}
    />
  );
}

// Generate organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: defaultSEO.companyInfo.name,
    description: defaultSEO.defaultDescription,
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/images/logo/mh-logo.png`,
    image: `${defaultSEO.siteUrl}/images/og-default.jpg`,
    telephone: defaultSEO.companyInfo.telephone,
    email: defaultSEO.companyInfo.email,
    address: {
      "@type": "PostalAddress",
      ...defaultSEO.companyInfo.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "46.2396",
      longitude: "-119.1006",
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
    ],
    serviceType: [
      "Residential Construction",
      "Commercial Construction",
      "Industrial Construction",
      "Renovation Services",
      "Remodeling Services",
      "Custom Home Building",
      "Project Management",
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61575511773974",
      "https://www.linkedin.com/company/mhconstruction",
      "https://www.instagram.com/mh_construction_inc/reels/",
    ],
  };
}

// Generate project structured data
export function generateProjectStructuredData(project: {
  title: string;
  description: string;
  details: { startDate?: string; completionDate?: string };
  location: { city: string; state: string };
  tags: string[];
  category: string;
  images: Array<{ url: string; caption?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: {
      "@type": "Organization",
      name: defaultSEO.companyInfo.name,
    },
    dateCreated: project.details.startDate,
    dateModified: project.details.completionDate,
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.city,
        addressRegion: project.location.state,
      },
    },
    keywords: project.tags,
    category: project.category,
    image: project.images.map((img: { url: string; caption?: string }) => ({
      "@type": "ImageObject",
      url: img.url,
      caption: img.caption || project.title,
    })),
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(
  breadcrumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, _index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
