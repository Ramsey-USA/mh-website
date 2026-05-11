import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { generateServiceSchema } from "@/components/seo/EnhancedSEO";
import {
  getServiceRouteBySlug,
  getServiceRouteSlugs,
} from "@/lib/data/service-routes";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export function generateStaticParams() {
  return getServiceRouteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceRouteBySlug(slug);

  if (!service) {
    return {
      title: "Services | MH Construction",
      description:
        "Explore MH Construction service lines across commercial construction, municipal work, drywall interiors, and restoration remodeling.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const service = getServiceRouteBySlug(slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  const serviceSchema = generateServiceSchema({
    name: service.title,
    description: service.summary,
    category: service.category,
  });

  return (
    <>
      <PageTrackingClient pageName={`Service: ${service.title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={serviceSchema} />

      <main className="bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
        <section className="border-b border-gray-200 bg-white/95 px-4 py-14 sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-950/80">
          <div className="mx-auto max-w-5xl">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]}
              className="mb-6"
            />

            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-primary dark:text-brand-primary-light">
                Service Line
              </p>
              <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {service.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {service.summary}
              </p>
              <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                {service.overview}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
            <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-primary/10 p-3 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light">
                  <MaterialIcon icon="verified" size="md" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Focus Areas
                  </p>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delivery Scope
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.focusAreas.map((focusArea) => (
                  <div
                    key={focusArea}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
                  >
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {focusArea}
                    </h3>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Execution Steps
                </h2>
                <ol className="mt-4 space-y-3">
                  {service.deliverySteps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Technical Priorities
                </p>
                <div className="mt-4 space-y-3">
                  {service.technicalPriorities.map((priority) => (
                    <div
                      key={priority}
                      className="flex items-start gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-gray-950"
                    >
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary dark:text-brand-primary-light"
                      />
                      <span className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                        {priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Safety Commitments
                </p>
                <ul className="mt-4 space-y-3">
                  {service.safetyCommitments.map((commitment) => (
                    <li
                      key={commitment}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <MaterialIcon
                        icon="shield"
                        size="sm"
                        className="mt-0.5 text-brand-secondary dark:text-brand-secondary-light"
                      />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-primary dark:text-brand-primary-light">
                  Next Step
                </p>
                <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                  Keep the scope moving
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {service.ctaText}.
                </p>
                <Button asChild className="mt-5 w-full">
                  <Link href={service.ctaHref}>Contact the team</Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
