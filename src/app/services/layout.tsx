import type { Metadata } from "next";
import Link from "next/link";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import { StructuredData } from "@/components/seo/SeoMeta";
import { serviceRoutes } from "@/lib/data/service-routes";

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
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-8">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-primary dark:text-brand-primary-light">
              Service Lines
            </p>
            <nav className="mt-4 space-y-2" aria-label="Service lines">
              {serviceRoutes.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary dark:border-gray-700 dark:text-gray-200 dark:hover:border-brand-primary-light dark:hover:bg-brand-primary/10 dark:hover:text-brand-primary-light"
                >
                  {service.title}
                </Link>
              ))}
            </nav>
            <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Use this rail to move between service lines without losing the
              project context.
            </p>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
