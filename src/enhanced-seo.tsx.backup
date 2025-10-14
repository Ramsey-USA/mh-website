// Enhanced SEO and Schema Markup System
import { Metadata } from 'next'

// Enhanced company information
export const enhancedSEO = {
  siteName: 'MH Construction',
  defaultTitle: "MH Construction - Building Tomorrow with Today's Technology",
  defaultDescription:
    'Veteran-owned construction excellence powered by cutting-edge AI technology. Serving the Pacific Northwest with military precision and construction expertise.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://mhconstruction.com',
  twitterHandle: '@MHConstruction',
  defaultKeywords: [
    'construction',
    'veteran-owned',
    'Pacific Northwest',
    'building contractor',
    'commercial construction',
    'residential construction',
    'AI estimator',
    'sustainable building',
    'LEED certified',
    'construction technology',
  ],
  companyInfo: {
    name: 'MH Construction LLC',
    legalName: 'MH Construction Limited Liability Company',
    telephone: '+1-509-123-4567',
    email: 'info@mhconstruction.com',
    address: {
      streetAddress: '1234 Construction Ave',
      addressLocality: 'Pasco',
      addressRegion: 'WA',
      postalCode: '99301',
      addressCountry: 'US',
    },
    foundingDate: '2020-01-15',
    numberOfEmployees: '15-25',
    yearlyRevenue: '$2000000-$5000000',
    serviceArea: {
      states: ['Washington', 'Oregon', 'Idaho'],
      radius: '300 miles from Pasco, WA',
    },
  },
  socialMedia: {
    facebook: 'https://facebook.com/mhconstruction',
    instagram: 'https://instagram.com/mhconstruction',
    linkedin: 'https://linkedin.com/company/mhconstruction',
    youtube: 'https://youtube.com/@mhconstruction',
  },
}

// Generate comprehensive organization schema
export function generateEnhancedOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${enhancedSEO.siteUrl}/#organization`,
    name: enhancedSEO.companyInfo.name,
    legalName: enhancedSEO.companyInfo.legalName,
    description: enhancedSEO.defaultDescription,
    url: enhancedSEO.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${enhancedSEO.siteUrl}/images/logo/mh-logo.png`,
      width: 300,
      height: 150,
    },
    image: {
      '@type': 'ImageObject',
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
      '@type': 'PostalAddress',
      ...enhancedSEO.companyInfo.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.2396,
      longitude: -119.1006,
    },
    areaServed: [
      {
        '@type': 'State',
        name: 'Washington',
      },
      {
        '@type': 'State',
        name: 'Oregon',
      },
      {
        '@type': 'State',
        name: 'Idaho',
      },
    ],
    serviceType: [
      'Residential Construction',
      'Commercial Construction',
      'Industrial Construction',
      'Renovation Services',
      'Project Management',
      'Construction Consulting',
      'Green Building',
      'LEED Certification',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Washington State Department of Labor & Industries',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'U.S. Green Building Council',
        },
      },
    ],
    award: [
      'Best Contractor 2023 - Pacific Northwest Builder',
      'Veteran Business of the Year 2022',
      'LEED Gold Certification Excellence',
    ],
    sameAs: [
      enhancedSEO.socialMedia.facebook,
      enhancedSEO.socialMedia.instagram,
      enhancedSEO.socialMedia.linkedin,
      enhancedSEO.socialMedia.youtube,
    ],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${enhancedSEO.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

// Generate service schema for each construction service
export function generateServiceSchema(service: {
  name: string
  description: string
  category: string
  priceRange?: string
  duration?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${enhancedSEO.siteUrl}/services/${service.name
      .toLowerCase()
      .replace(/\s+/g, '-')}`,
    name: service.name,
    description: service.description,
    category: service.category,
    provider: {
      '@id': `${enhancedSEO.siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'Washington',
    },
    priceRange: service.priceRange || '$$',
    duration: service.duration,
    serviceType: service.category,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
        },
      ],
    },
  }
}

// Generate FAQ schema
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Generate review schema
export function generateReviewSchema(
  reviews: Array<{
    rating: number
    reviewBody: string
    author: string
    datePublished: string
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${enhancedSEO.siteUrl}/#organization`,
    review: reviews.map(review => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.datePublished,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue:
        reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length,
      reviewCount: reviews.length,
      bestRating: 5,
    },
  }
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

// Generate project schema
export function generateProjectSchema(project: {
  name: string
  description: string
  category: string
  location: { city: string; state: string }
  completionDate?: string
  budget?: string
  images: Array<{ url: string; caption?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ConstructionProject',
    name: project.name,
    description: project.description,
    category: project.category,
    contractor: {
      '@id': `${enhancedSEO.siteUrl}/#organization`,
    },
    location: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: project.location.city,
        addressRegion: project.location.state,
        addressCountry: 'US',
      },
    },
    dateCompleted: project.completionDate,
    budget: project.budget,
    image: project.images.map(img => ({
      '@type': 'ImageObject',
      url: img.url,
      caption: img.caption,
    })),
  }
}

// Generate blog article schema
export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  publishedDate: string
  modifiedDate?: string
  image: string
  url: string
  category: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: {
      '@type': 'ImageObject',
      url: article.image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@id': `${enhancedSEO.siteUrl}/#organization`,
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    url: article.url,
    articleSection: article.category,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  }
}

// Generate website schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${enhancedSEO.siteUrl}/#website`,
    url: enhancedSEO.siteUrl,
    name: enhancedSEO.siteName,
    description: enhancedSEO.defaultDescription,
    publisher: {
      '@id': `${enhancedSEO.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${enhancedSEO.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// Generate local business schema
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${enhancedSEO.siteUrl}/#localbusiness`,
    name: enhancedSEO.companyInfo.name,
    description: enhancedSEO.defaultDescription,
    url: enhancedSEO.siteUrl,
    telephone: enhancedSEO.companyInfo.telephone,
    email: enhancedSEO.companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      ...enhancedSEO.companyInfo.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 46.2396,
      longitude: -119.1006,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Financing'],
    currenciesAccepted: 'USD',
  }
}

// Component for adding structured data
export function StructuredData({ data }: { data: object | object[] }) {
  const schemaData = Array.isArray(data) ? data : [data]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  )
}

// Enhanced metadata generation
export function generateEnhancedMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  noIndex = false,
  schemas = [],
}: {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  schemas?: object[]
}): Metadata & { schemas: object[] } {
  const pageTitle = title
    ? `${title} | ${enhancedSEO.siteName}`
    : enhancedSEO.defaultTitle

  const pageDescription = description || enhancedSEO.defaultDescription
  const pageKeywords = [...enhancedSEO.defaultKeywords, ...keywords].join(', ')
  const pageUrl = canonicalUrl || enhancedSEO.siteUrl
  const pageImage = ogImage || `${enhancedSEO.siteUrl}/images/og-default.png`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',

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
      locale: 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      site: enhancedSEO.twitterHandle,
      creator: enhancedSEO.twitterHandle,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },

    other: {
      'theme-color': '#386851',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': enhancedSEO.siteName,
      'application-name': enhancedSEO.siteName,
      'msapplication-TileColor': '#386851',
      'msapplication-config': '/browserconfig.xml',
    },

    schemas,
  }
}
