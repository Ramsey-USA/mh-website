import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: "Safety Program | MH Construction",
  description:
    "MH Construction's award-winning written safety program — Veteran-Owned Since January 2025 general contractor serving Tri-Cities WA. 0.64 EMR (40% below industry avg), aligned with OSHA 29 CFR 1926, AGC CSEA expectations, and applicable WA/OR/ID requirements. AGC-WA Top EMR Award winner.",
  alternates: {
    canonical: `${siteUrl}/safety`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Safety Program | MH Construction",
    description:
      "Veteran-Owned Since January 2025 general contractor | 0.64 EMR · written safety program aligned with OSHA 29 CFR 1926 and AGC CSEA expectations · AGC-WA award winner.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/safety`,
    images: [
      {
        url: `${siteUrl}/images/safety/safety-culture.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction safety program — jobsite briefing",
      },
    ],
  },
});

export default function SafetyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
