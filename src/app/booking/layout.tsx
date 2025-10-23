import type { Metadata } from "next";
import { getBookingSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Booking/IRL Consultation
const seoData = getBookingSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced IRL Consultation Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}