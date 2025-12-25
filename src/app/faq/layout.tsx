import type { Metadata } from "next";
import { getFAQSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for FAQ page
const seoData = getFAQSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Enhanced FAQ Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
