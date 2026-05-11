import type { Metadata } from "next";
import { getProjectsSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";

// Enhanced SEO metadata for Projects page
const seoData = getProjectsSEO();
const { schemas, ...metadataProps } = seoData;
export const metadata: Metadata = metadataProps;

export default function ProjectsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: { slug?: string };
}>) {
  return (
    <>
      {params?.slug ? null : <StructuredData data={schemas} />}
      {children}
    </>
  );
}
