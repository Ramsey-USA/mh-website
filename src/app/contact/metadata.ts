/**
 * DEAD FILE — Next.js App Router does NOT consume metadata exports from metadata.ts.
 * Active metadata is exported from layout.tsx (which calls getContactSEO() from page-seo-utils.ts).
 * This file is kept for reference only.
 */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rally Point → Contact | Your Project. Our Expertise. Let's Connect.",
  description:
    "Get a free consultation with MH Construction — veteran-owned general contractor in Pasco, WA. Serving the Tri-Cities & Pacific Northwest. Call (509) 308-6489.",
  keywords: [
    "Rally Point Contact mission brief",
    "SITREP-level clarity consultation",
    "dual-label veteran contact",
    "service-earned construction contact",
    "contact MH Construction",
    "construction quote",
    "free construction consultation",
    "Tri-Cities contractor contact",
    "Pasco construction phone",
    "Richland general contractor",
    "Kennewick contractor contact",
    "Benton County construction contact",
    "Franklin County general contractor",
    "(509) 308-6489",
    "construction company email",
    "get construction quote",
    "contact contractor Tri-Cities",
    "veteran-owned contractor contact",
  ],
  openGraph: {
    title:
      "Rally Point → Contact | Your Project. Our Expertise. | MH Construction",
    description:
      "Get a free consultation with MH Construction — veteran-owned general contractor in Pasco, WA. Serving the Tri-Cities & Pacific Northwest. Call (509) 308-6489.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/contact",
    siteName: "MH Construction",
    images: [
      {
        url: "https://www.mhc-gc.com/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction — Contact Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Contact MH Construction — Free Consultation",
    description:
      "Veteran-owned general contractor in Pasco, WA. Free consultation for your Tri-Cities construction project. Call (509) 308-6489.",
    images: ["https://www.mhc-gc.com/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};
