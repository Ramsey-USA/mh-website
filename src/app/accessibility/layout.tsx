import type { Metadata } from "next";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

const accessibilitySchemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/accessibility`,
    name: "Accessibility Statement",
    url: `${siteUrl}/accessibility`,
    description:
      "MH Construction's digital accessibility statement outlining WCAG 2.1 AA conformance and commitment to inclusive design.",
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
    dateModified: "2025-12-22",
    inLanguage: "en-US",
    accessibilityFeature: [
      "alternativeText",
      "highContrastDisplay",
      "keyboardNavigation",
      "structuredNavigation",
      "tableOfContents",
    ],
    accessibilityHazard: "none",
    accessibilityAPI: "ARIA",
    accessibilitySummary:
      "This page describes MH Construction's commitment to WCAG 2.1 Level AA accessibility, including keyboard navigation, ARIA labeling, screen reader support, and ongoing accessibility improvements.",
    potentialAction: {
      "@type": "ReadAction",
      target: `${siteUrl}/accessibility`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "@id": `${siteUrl}/accessibility#statement`,
    name: "MH Construction Accessibility Statement",
    url: `${siteUrl}/accessibility`,
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
      "@id": `${siteUrl}/accessibility`,
    },
    about: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: COMPANY_INFO.name,
    },
    accessibilitySummary:
      "This statement documents MH Construction's ongoing accessibility commitments and WCAG 2.1 AA alignment for digital experiences.",
  },
];

export const metadata: Metadata = withGeoMetadata({
  title: "Accessibility Statement | MH Construction",
  description:
    "Read MH Construction's accessibility statement and WCAG commitment for a usable, inclusive digital experience across the Pacific Northwest.",
  keywords: [
    "accessibility statement",
    "WCAG 2.1 AA",
    "inclusive construction website",
    "MH Construction accessibility",
    "Pasco WA accessibility policy",
  ],
  alternates: {
    canonical: "https://www.mhc-gc.com/accessibility",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Accessibility Statement | MH Construction",
    description:
      "Our accessibility commitment: continuous WCAG-aligned improvements for all visitors.",
    type: "website",
    locale: "en_US",
    url: "https://www.mhc-gc.com/accessibility",
  },
  twitter: {
    card: "summary",
    title: "Accessibility Statement | MH Construction",
    description:
      "WCAG-focused accessibility commitment for the MH Construction website.",
  },
});

export default function AccessibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StructuredData data={accessibilitySchemas} />
      {children}
    </>
  );
}
