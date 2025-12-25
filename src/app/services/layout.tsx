import type { Metadata } from "next";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/seo-meta";

// Enhanced SEO metadata for Services
const seoData = getServicesSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Services Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
