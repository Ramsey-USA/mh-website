import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Construction Estimator | MH Construction | Instant Project Quotes',
  description:
    'Get accurate construction estimates in minutes with our AI-powered estimator. 95% accuracy guarantee, veteran discounts, and instant results for Pacific Northwest projects.',
  keywords: [
    'construction estimator',
    'AI project estimation',
    'construction calculator',
    'building cost estimator',
    'Pacific Northwest construction',
    'veteran construction company',
    'MH Construction estimator',
    'instant construction quotes',
    'AI-powered estimates',
    'construction cost calculator',
    'building estimate tool',
    'veteran owned business',
    'Washington construction',
    'Oregon construction',
    'commercial construction estimator',
    'residential construction estimator',
  ],
  openGraph: {
    title: 'AI Construction Estimator - MH Construction',
    description:
      'Revolutionary AI-powered construction estimator with 95% accuracy guarantee. Get instant, accurate quotes for your Pacific Northwest construction project.',
    url: 'https://mhconstruction.com/estimator',
    siteName: 'MH Construction',
    images: [
      {
        url: '/images/og/estimator.jpg',
        width: 1200,
        height: 630,
        alt: 'MH Construction AI Estimator - Instant accurate construction estimates',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Construction Estimator - MH Construction',
    description:
      'Get instant, accurate construction estimates powered by AI technology with 95% accuracy guarantee.',
    images: ['/images/og/estimator.jpg'],
    creator: '@MHConstruction',
    site: '@MHConstruction',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mhconstruction.com/estimator',
  },
  other: {
    'application-name': 'MH Construction AI Estimator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
}
