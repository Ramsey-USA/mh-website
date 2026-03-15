import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

const termsSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/terms`,
    name: "Terms of Service",
    url: `${siteUrl}/terms`,
    description:
      "Terms of Service governing use of the MH Construction website, digital content, and service inquiry submissions.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
    dateModified: "2025-12-22",
    inLanguage: "en-US",
    potentialAction: {
      "@type": "ReadAction",
      target: `${siteUrl}/terms`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "TermsOfService",
    "@id": `${siteUrl}/terms#tos`,
    name: "MH Construction Terms of Service",
    url: `${siteUrl}/terms`,
    inLanguage: "en-US",
    dateModified: "2025-12-22",
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    mainEntityOfPage: {
      "@id": `${siteUrl}/terms`,
    },
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
  },
];

export const metadata: Metadata = withGeoMetadata({
  title: "Terms of Service | MH Construction",
  description:
    "Read MH Construction's website terms of service, usage conditions, and legal terms for digital content and service inquiries.",
  keywords: [
    "terms of service",
    "MH Construction terms",
    "construction website legal terms",
    "Pasco contractor terms",
    "Tri-Cities construction legal",
  ],
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | MH Construction",
    description:
      "Website usage terms, legal disclaimers, and service agreement boundaries.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/terms`,
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | MH Construction",
    description:
      "Legal terms governing use of MH Construction digital properties.",
  },
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={termsSchemas} />
      {children}
    </>
  );
}
