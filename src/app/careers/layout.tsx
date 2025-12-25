import type { Metadata } from "next";
import { getCareersSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/seo-meta";

// Enhanced SEO metadata for Careers page
const seoData = getCareersSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Careers Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
