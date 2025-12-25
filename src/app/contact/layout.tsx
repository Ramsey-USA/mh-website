import type { Metadata } from "next";
import { getContactSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/seo-meta";

// Enhanced SEO metadata for Contact page
const seoData = getContactSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Contact Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
