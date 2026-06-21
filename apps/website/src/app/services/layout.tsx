import type { Metadata } from "next";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";

// Enhanced SEO metadata for Services
const seoData = getServicesSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ServicesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { slug?: string };
}>) {
  const showSchema = !params?.slug;

  return (
    <>
      {showSchema ? <StructuredData data={schemas} /> : null}
      {children}
    </>
  );
}
