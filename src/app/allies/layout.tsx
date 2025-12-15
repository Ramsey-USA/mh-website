import type { Metadata } from "next";
import { getTradePartnersSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/enhanced-seo";

// Enhanced SEO metadata for Trade Partners page
const seoData = getTradePartnersSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function TradePartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Enhanced Allies Structured Data for SEO */}
      <StructuredData data={schemas} />
      {children}
    </>
  );
}
