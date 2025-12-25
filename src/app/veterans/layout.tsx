import type { Metadata } from "next";
import { getVeteransSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Veterans page
const seoData = getVeteransSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function VeteransLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Veterans Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
