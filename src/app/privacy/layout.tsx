import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

const privacySchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/privacy`,
    name: "Privacy Policy",
    url: `${siteUrl}/privacy`,
    description:
      "MH Construction's privacy policy covering data collection, use, and protection for website visitors and clients.",
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
      target: `${siteUrl}/privacy`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "PrivacyPolicy",
    "@id": `${siteUrl}/privacy#policy`,
    name: "MH Construction Privacy Policy",
    url: `${siteUrl}/privacy`,
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
      "@id": `${siteUrl}/privacy`,
    },
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
  },
];

export const metadata: Metadata = withGeoMetadata({
  title: "Privacy Policy | MH Construction",
  description:
    "Review how MH Construction collects, uses, and protects personal information for consultations, careers, and website services.",
  keywords: [
    "MH Construction privacy policy",
    "construction company privacy",
    "data protection policy",
    "Tri-State contractor privacy",
    "Pasco WA privacy notice",
  ],
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | MH Construction",
    description:
      "How MH Construction protects your data and handles privacy across contact and project workflows.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/privacy`,
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | MH Construction",
    description:
      "Data handling and privacy practices for MH Construction website users.",
  },
});

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData data={privacySchemas} />
      {children}
    </>
  );
}
