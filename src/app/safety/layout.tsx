import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = withGeoMetadata({
  title: "Safety Program | MH Construction",
  description:
    "MH Construction's award-winning safety program — veteran-owned general contractor serving Tri-Cities WA. 0.64 EMR (40% below industry avg), 44-section OSHA 29 CFR 1926 written program, AGC-WA Top EMR Award winner. Documentation available for bonding agency review.",
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
      "Veteran-owned general contractor | 0.64 EMR · 44-section OSHA written program · AGC-WA award winner. Documented safety credentials for bonding agencies and surety underwriters.",
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
