import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { generateServiceSchema } from "@/components/seo/EnhancedSEO";
import {
  getServiceRouteBySlug,
  getServiceRouteSlugs,
} from "@/lib/data/service-routes";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

type RelatedPath = {
  href: string;
  label: string;
};

type ServicePowerCenter = {
  projects: RelatedPath[];
  locations: RelatedPath[];
  faq: RelatedPath;
  safety: RelatedPath;
  bridges?: RelatedPath[];
};

const SERVICE_POWER_CENTER: Record<string, ServicePowerCenter> = {
  "commercial-construction": {
    projects: [
      {
        href: "/projects/kennewick-commercial-office-renovation",
        label: "Kennewick commercial office renovation",
      },
      {
        href: "/projects/pasco-industrial-warehouse-build-out",
        label: "Pasco industrial warehouse build-out",
      },
      {
        href: "/projects/west-richland-multi-family-complex",
        label: "West Richland multi-family complex",
      },
    ],
    locations: [
      { href: "/locations/kennewick", label: "Kennewick service market" },
      { href: "/locations/pasco", label: "Pasco service market" },
      { href: "/locations/spokane", label: "Spokane service market" },
    ],
    faq: { href: "/faq/technical", label: "Technical project management FAQ" },
    safety: {
      href: "/resources/safety-manual/tools-and-materials",
      label: "Tools and materials safety standards",
    },
  },
  "municipal-government": {
    projects: [
      {
        href: "/projects/pasco-industrial-warehouse-build-out",
        label: "Pasco infrastructure-ready warehouse case study",
      },
      {
        href: "/projects/spokane-healthcare-clinic-tenant-improvement",
        label: "Spokane clinic tenant improvement",
      },
      {
        href: "/projects/kennewick-commercial-office-renovation",
        label: "Kennewick phased commercial renovation",
      },
    ],
    locations: [
      { href: "/locations/yakima", label: "Yakima public projects market" },
      {
        href: "/locations/pendleton",
        label: "Pendleton government delivery market",
      },
      {
        href: "/locations/hermiston",
        label: "Hermiston municipal delivery market",
      },
    ],
    faq: { href: "/faq/veterans", label: "Veteran and government FAQ" },
    safety: {
      href: "/resources/safety-manual/program-compliance-and-continuity",
      label: "Program compliance and continuity",
    },
    bridges: [
      {
        href: "/veterans/public-sector-construction",
        label: "Veteran-led public sector pathway",
      },
      {
        href: "/public-sector/veteran-led-compliance",
        label: "Veteran-led compliance workflow",
      },
      {
        href: "/public-sector/tri-state-government-construction",
        label: "Tri-state government construction coverage",
      },
    ],
  },
  "drywall-interiors": {
    projects: [
      {
        href: "/projects/spokane-healthcare-clinic-tenant-improvement",
        label: "Spokane healthcare interior build-out",
      },
      {
        href: "/projects/kennewick-commercial-office-renovation",
        label: "Kennewick office interior renovation",
      },
      {
        href: "/projects/richland-residential-custom-home",
        label: "Richland custom interior finish package",
      },
    ],
    locations: [
      { href: "/locations/spokane", label: "Spokane interior projects market" },
      {
        href: "/locations/kennewick",
        label: "Kennewick interior delivery market",
      },
      {
        href: "/locations/richland",
        label: "Richland interior projects market",
      },
    ],
    faq: { href: "/faq/process", label: "Process and partnership FAQ" },
    safety: {
      href: "/resources/safety-manual/fall-and-access-safety",
      label: "Fall and access safety standards",
    },
  },
  "restoration-remodeling": {
    projects: [
      {
        href: "/projects/richland-residential-custom-home",
        label: "Richland phased restoration project",
      },
      {
        href: "/projects/west-richland-multi-family-complex",
        label: "West Richland phased occupancy delivery",
      },
      {
        href: "/projects/kennewick-commercial-office-renovation",
        label: "Kennewick occupied renovation sequencing",
      },
    ],
    locations: [
      { href: "/locations/richland", label: "Richland restoration market" },
      {
        href: "/locations/west-richland",
        label: "West Richland restoration market",
      },
      {
        href: "/locations/walla-walla",
        label: "Walla Walla restoration market",
      },
    ],
    faq: { href: "/faq/safety", label: "Safety and quality FAQ" },
    safety: {
      href: "/resources/safety-manual/energy-and-fire-hazards",
      label: "Energy and fire hazard controls",
    },
  },
};

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
      images: [
        {
          url: `${SITE_URL}${service.ogImage}`,
          alt: `${service.title} service line overview`,
        },
      ],
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
  const powerCenter = SERVICE_POWER_CENTER[service.slug];

  return (
    <>
      <PageTrackingClient pageName={`Service: ${service.title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={serviceSchema} />

      <main className="bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen">
        <section className="hero-section border-b border-gray-200 bg-white/95 px-4 py-14 sm:px-6 lg:px-8 dark:border-gray-800 dark:bg-gray-950/80">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
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

              {powerCenter ? (
                <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Proof and Regional Fit
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    Use field-proven examples and market pages to align your
                    scope before kickoff.
                  </p>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                      Related Projects
                    </p>
                    <div className="mt-3 grid gap-2">
                      {powerCenter.projects.map((projectPath) => (
                        <Link
                          key={projectPath.href}
                          href={projectPath.href}
                          className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        >
                          <span>{projectPath.label}</span>
                          <MaterialIcon icon="arrow_forward" size="sm" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                      Priority Markets
                    </p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {powerCenter.locations.map((locationPath) => (
                        <Link
                          key={locationPath.href}
                          href={locationPath.href}
                          className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        >
                          <MaterialIcon icon="place" size="sm" />
                          <span>{locationPath.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
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

              {powerCenter ? (
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Trust Resources
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                    Validate decisions with category guidance and published
                    safety standards.
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link
                      href={powerCenter.faq.href}
                      className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    >
                      <span>{powerCenter.faq.label}</span>
                      <MaterialIcon icon="arrow_forward" size="sm" />
                    </Link>
                    <Link
                      href={powerCenter.safety.href}
                      className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                    >
                      <span>{powerCenter.safety.label}</span>
                      <MaterialIcon icon="arrow_forward" size="sm" />
                    </Link>
                    {powerCenter.bridges?.map((bridgePath) => (
                      <Link
                        key={bridgePath.href}
                        href={bridgePath.href}
                        className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                      >
                        <span>{bridgePath.label}</span>
                        <MaterialIcon icon="arrow_forward" size="sm" />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
