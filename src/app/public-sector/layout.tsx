import type { Metadata } from "next";
import { getGovernmentSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Government page
const seoData = getGovernmentSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function GovernmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Public Sector Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
