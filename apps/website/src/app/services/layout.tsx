import type { Metadata } from "next";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";
import { serviceRoutes } from "@/lib/data/service-routes";
import { SectionShell } from "@/components/layout";

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
      <SectionShell
        navTitle="Service Lines"
        navLabel="Service lines"
        navItems={serviceRoutes.map((service) => ({
          href: `/services/${service.slug}`,
          label: service.title,
        }))}
        navNote="Use this rail to move between service lines without losing the project context."
      >
        {children}
      </SectionShell>
    </>
  );
}
