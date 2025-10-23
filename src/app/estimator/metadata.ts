import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Construction Cost Estimator | Instant Estimates 24/7 | MH Construction",
  description:
    "Revolutionary AI-powered construction estimates with General MH military intelligence. Instant pricing, veteran discounts, Pacific Northwest market data, and 24/7 availability for preliminary project budgets.",
  keywords: [
    "AI construction cost estimator",
    "instant construction estimates",
    "General MH military AI assistant",
    "veteran discount construction",
    "Pacific Northwest construction costs",
    "real-time construction pricing",
    "automated construction calculator",
    "military precision cost analysis",
    "24/7 construction estimator",
    "revolutionary AI construction intelligence",
    "veteran-owned construction estimator",
    "Tri-Cities WA construction costs",
    "regional intelligence construction pricing",
    "preliminary construction estimates",
    "AI-powered cost estimation technology",
    "construction intelligence platform",
  ],
  openGraph: {
    title: "Revolutionary AI Construction Cost Estimator - MH Construction",
    description:
      "Get instant AI-powered construction estimates with General MH military intelligence. 24/7 availability, veteran discounts, and Pacific Northwest regional pricing intelligence.",
    url: "https://mhc-gc.com/estimator",
    siteName: "MH Construction - AI-Powered Veteran-Owned Excellence",
    images: [
      {
        url: "/images/og/estimator.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction AI Estimator - Preliminary construction cost estimates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revolutionary AI Construction Cost Estimator - MH Construction",
    description:
      "Instant AI-powered construction estimates with General MH military intelligence. 24/7 availability, veteran discounts, Pacific Northwest pricing.",
    images: ["/images/og/estimator.jpg"],
    creator: "@MHConstruction",
    site: "@MHConstruction",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mhc-gc.com/estimator",
  },
  other: {
    "application-name": "MH Construction AI Estimator",
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
  },
};
