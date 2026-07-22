import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { StructuredData } from "@/components/seo/SeoMeta";
import { ServiceDetailPageContent } from "@/components/services/ServiceDetailPageContent";
import {
  getPublishedServiceDetailBySlug,
  getPublishedServiceDetailRouteSlugs,
  getPublishedServiceDetailRoutes,
} from "@/lib/data/service-routes";
import { getServiceDetailSEO } from "@/lib/seo/page-seo-utils";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getPublishedServiceDetailRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getPublishedServiceDetailBySlug(slug);

  if (!service) {
    return {
      title: "Service Detail | MH Construction",
      robots: { index: false, follow: false },
    };
  }

  const { schemas: _schemas, ...metadataProps } = getServiceDetailSEO(service);
  return metadataProps;
}

export default async function ServiceDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const service = getPublishedServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = getPublishedServiceDetailRoutes()
    .filter((candidate) => candidate.slug !== service.slug)
    .slice(0, 4)
    .map((candidate) => ({
      slug: candidate.slug,
      title: candidate.title,
    }));

  const { schemas } = getServiceDetailSEO(service);

  return (
    <>
      <StructuredData data={schemas} />
      <PageTrackingClient pageName={`Service Detail - ${service.slug}`} />
      <ServiceDetailPageContent
        service={service}
        relatedServices={relatedServices}
      />
    </>
  );
}
