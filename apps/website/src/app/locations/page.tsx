import type { Metadata } from "next";
import Link from "next/link";

import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Button, Card } from "@/components/ui";
import { LocationsHero } from "@/components/locations/LocationsHero";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { locations } from "@/lib/data/locations";
import { getTranslations } from "next-intl/server";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const locationList = Object.values(locations);

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.locations.seoName, PAGE_TERMINOLOGY.locations.mhBrandName)} | MH Construction`,
  description:
    "Service coverage across Washington, Oregon, and Idaho with local project proof for AG and winery facilities, commercial tenant improvements, and municipal builds.",
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.locations.seoName, PAGE_TERMINOLOGY.locations.mhBrandName)} | MH Construction`,
    description:
      "Regional market profiles for Washington, Oregon, and Idaho with verified project examples and local delivery context.",
    url: `${SITE_URL}/locations`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-default.webp`,
        alt: "MH Construction locations and service area coverage",
      },
    ],
  },
  robots: { index: true, follow: true },
};

const breadcrumbItems = [
  { name: "Home", url: "/" },
  { name: "Locations", url: "/locations" },
];

const locationsSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}/locations#webpage`,
  url: `${SITE_URL}/locations`,
  name: `${formatDualPageName(PAGE_TERMINOLOGY.locations.seoName, PAGE_TERMINOLOGY.locations.mhBrandName)} | MH Construction`,
  description:
    "Location-by-location service index for MH Construction across Washington, Oregon, and Idaho.",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: { "@id": `${SITE_URL}/locations#breadcrumb` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: locationList.map((location, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/locations/${location.slug}`,
      name: `${location.city}, ${location.state}`,
    })),
  },
};

export default async function LocationsPage() {
  const t = await getTranslations();

  return (
    <>
      <PageTrackingClient pageName="Locations" />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={locationsSchema} />

      {/* Hero Section - Compliant with MH Branding Standards */}
      <LocationsHero />

      <main className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs
              items={[
                { label: t("locations.breadcrumb.home"), href: "/" },
                { label: t("locations.breadcrumb.current") },
              ]}
              className="mb-6 bg-transparent text-gray-700 dark:text-white/70 [&_nav]:border-0 [&_nav]:bg-transparent [&_nav]:py-0 [&_span[aria-current='page']]:text-gray-900 dark:[&_span[aria-current='page']]:text-white [&_a]:text-gray-600 dark:[&_a]:text-white/70 [&_a:hover]:text-gray-900 dark:[&_a:hover]:text-white"
            />
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {locationList.map((location) => (
                <Card
                  key={location.slug}
                  className="border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-primary dark:text-brand-primary-light">
                        {location.state}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {location.city}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {location.county}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-brand-primary/10 p-3 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light">
                      <MaterialIcon icon="place" size="md" />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    {location.tagline}
                  </p>

                  <div className="mt-5 space-y-3">
                    {(location.servicePriorities || [])
                      .slice(0, 3)
                      .map((priority) => (
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

                  <div className="mt-6 flex items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>
                      {(location.recentProjects || []).length}{" "}
                      {t("locations.card.verifiedProject")}
                      {(location.recentProjects || []).length === 1 ? "" : "s"}
                    </span>
                    <span>
                      {(location.serviceZipCodes || []).length} ZIP
                      {(location.serviceZipCodes || []).length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <Button asChild className="mt-6 w-full">
                    <Link href={`/locations/${location.slug}`}>
                      {t("locations.card.reviewMarket", {
                        city: location.city,
                      })}
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
