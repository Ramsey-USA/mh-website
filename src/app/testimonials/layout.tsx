import type { Metadata } from "next";
import { getTestimonialsSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";

// Enhanced SEO metadata for Testimonials page
const seoData = getTestimonialsSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Testimonials Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
