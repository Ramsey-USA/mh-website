import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Button } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  getProjectCaseStudyBySlug,
  getProjectCaseStudySlugs,
} from "@/lib/data/project-case-studies";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { PortfolioService } from "@/lib/services/portfolio-service";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

type RelatedRoute = {
  href: string;
  label: string;
};

type ProjectRoutePlan = {
  primaryService: RelatedRoute;
  secondaryService: RelatedRoute;
  location: RelatedRoute;
};

const PROJECT_ROUTE_PLANS: Record<string, ProjectRoutePlan> = {
  "kennewick-commercial-office-renovation": {
    primaryService: {
      href: "/services/commercial-construction",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services/drywall-interiors",
      label: "Drywall and Interiors",
    },
    location: {
      href: "/locations/kennewick",
      label: "Kennewick Market",
    },
  },
  "pasco-industrial-warehouse-build-out": {
    primaryService: {
      href: "/services/commercial-construction",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services/municipal-government",
      label: "Municipal and Government",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco Market",
    },
  },
  "richland-residential-custom-home": {
    primaryService: {
      href: "/services/restoration-remodeling",
      label: "Restoration and Remodeling",
    },
    secondaryService: {
      href: "/services/drywall-interiors",
      label: "Drywall and Interiors",
    },
    location: {
      href: "/locations/richland",
      label: "Richland Market",
    },
  },
  "spokane-healthcare-clinic-tenant-improvement": {
    primaryService: {
      href: "/services/drywall-interiors",
      label: "Drywall and Interiors",
    },
    secondaryService: {
      href: "/services/commercial-construction",
      label: "Commercial Construction",
    },
    location: {
      href: "/locations/spokane",
      label: "Spokane Market",
    },
  },
  "west-richland-multi-family-complex": {
    primaryService: {
      href: "/services/commercial-construction",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services/restoration-remodeling",
      label: "Restoration and Remodeling",
    },
    location: {
      href: "/locations/west-richland",
      label: "West Richland Market",
    },
  },
};

function cityToLocationSlug(city: string): string {
  return city
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatTechnicalSpecValue(value: string | number | string[]): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "number") {
    return value.toString();
  }

  return value;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getProjectCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);
  const projectBySlug = PortfolioService.getProjectBySlug(slug);
  const projectById = projectBySlug
    ? undefined
    : PortfolioService.getAllProjects().find(
        (item) => item.id.toLowerCase() === slug.toLowerCase(),
      );
  const project = projectBySlug ?? projectById;

  if (!caseStudy && !project) {
    return {
      title: "Projects | MH Construction",
      description:
        "Review completed MH Construction projects and case studies across commercial, industrial, residential, and public-sector work.",
      robots: { index: false, follow: false },
    };
  }

  const canonicalSlug = caseStudy?.slug ?? project?.seoMetadata.slug ?? slug;
  const title =
    caseStudy?.metaTitle ??
    project?.seoMetadata.metaTitle ??
    `${project?.title ?? "Project"} | MH Construction`;
  const description =
    caseStudy?.metaDescription ??
    project?.seoMetadata.metaDescription ??
    project?.description ??
    "Completed construction project case study.";
  const openGraphImage =
    caseStudy?.ogImage ??
    project?.images.find((image) => image.isFeatured)?.url ??
    project?.images[0]?.url ??
    "/images/projects/project-default.webp";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/projects/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/${canonicalSlug}`,
      type: "article",
      images: [
        {
          url: `${SITE_URL}${openGraphImage}`,
          alt: `${project?.title ?? caseStudy?.title ?? "Project"} case study`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const caseStudy = getProjectCaseStudyBySlug(slug);
  const projectFromCaseStudy = caseStudy
    ? PortfolioService.getAllProjects().find(
        (item) => item.id === caseStudy.projectId,
      )
    : undefined;
  const projectBySlug = PortfolioService.getProjectBySlug(slug);
  const project = projectFromCaseStudy ?? projectBySlug;
  const legacyProject = project
    ? undefined
    : PortfolioService.getAllProjects().find(
        (item) => item.id.toLowerCase() === slug.toLowerCase(),
      );
  const hasProjectContext = Boolean(caseStudy || project || legacyProject);

  if (!hasProjectContext) {
    notFound();
  }

  const selectedProject = project ?? legacyProject;
  const canonicalSlug = caseStudy?.slug ?? selectedProject?.seoMetadata.slug;

  if (legacyProject && canonicalSlug && slug !== canonicalSlug) {
    redirect(`/projects/${canonicalSlug}`);
  }

  const location = caseStudy?.location ?? {
    city: selectedProject?.location.city ?? "Unknown",
    state: selectedProject?.location.state ?? "WA",
  };

  const yearCompleted =
    caseStudy?.yearCompleted ??
    (selectedProject?.details.completionDate
      ? selectedProject.details.completionDate.getFullYear()
      : new Date().getFullYear());

  const technicalSpecs = caseStudy?.technicalSpecs ?? {
    squareFootage: selectedProject?.details.squareFootage ?? "Not published",
    duration: selectedProject?.details.duration ?? "Not published",
    deliveryMethod: selectedProject?.subcategory ?? selectedProject?.category,
    tags: selectedProject?.tags ?? [],
  };

  const safetyMilestones = caseStudy?.safetyMilestones ?? [
    "Reviewed site constraints before field work",
    "Maintained clean access paths and jobsite control",
    "Completed field checks at each major milestone",
  ];

  const title =
    caseStudy?.title ?? selectedProject?.title ?? "Project Case Study";
  const description =
    caseStudy?.description ??
    selectedProject?.description ??
    "Project case study detail.";
  const canonicalPath = `/projects/${canonicalSlug ?? slug}`;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: title,
    description,
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: "US",
      },
    },
    yearCompleted,
    technicalSpecs,
    safetyMilestones,
    url: `${SITE_URL}${canonicalPath}`,
    sponsor: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.stateCode,
      postalCode: COMPANY_INFO.address.zip,
      addressCountry: COMPANY_INFO.address.country,
    },
    areaServed: ["Washington", "Oregon", "Idaho"],
  };

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: title, url: canonicalPath },
  ];
  const routePlan = PROJECT_ROUTE_PLANS[canonicalSlug ?? slug] ??
    PROJECT_ROUTE_PLANS[caseStudy?.slug ?? ""] ?? {
      primaryService: {
        href: "/services/commercial-construction",
        label: "Commercial Construction",
      },
      secondaryService: {
        href: "/services/restoration-remodeling",
        label: "Restoration and Remodeling",
      },
      location: {
        href: `/locations/${cityToLocationSlug(location.city)}`,
        label: `${location.city} Market`,
      },
    };

  return (
    <>
      <PageTrackingClient pageName={`Project Case Study: ${title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={[projectSchema, localBusinessSchema]} />

      <main className="bg-white dark:bg-gray-950 min-h-screen">
        <section className="hero-section border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: title },
              ]}
              className="mb-6 text-white/70"
            />

            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
                Case Study
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                {title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/85">
                {description}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Location
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {location.city}, {location.state}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Year Completed
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {yearCompleted}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-950">
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Category
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {caseStudy?.category ??
                      selectedProject?.category ??
                      "Project"}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    icon="engineering"
                    size="md"
                    className="text-brand-primary dark:text-brand-primary-light"
                  />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Technical Specs
                  </h2>
                </div>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(
                    Object.entries(technicalSpecs) as Array<
                      [string, string | number | string[]]
                    >
                  ).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-900"
                    >
                      <dt className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                        {key.replaceAll(/([A-Z])/g, " $1").trim()}
                      </dt>
                      <dd className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                        {formatTechnicalSpecValue(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Safety Milestones
                </p>
                <ul className="mt-4 space-y-3">
                  {safetyMilestones.map((milestone) => (
                    <li
                      key={milestone}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <MaterialIcon
                        icon="shield"
                        size="sm"
                        className="mt-0.5 text-brand-secondary dark:text-brand-secondary-light"
                      />
                      <span>{milestone}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Results
                </p>
                <ul className="mt-4 space-y-3">
                  {(caseStudy?.results ?? []).map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-700 dark:text-gray-300"
                    >
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary dark:text-brand-primary-light"
                      />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Related Service Paths
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Use the nearest service line and market page to move this case
                  study into scoping and consultation.
                </p>
                <div className="mt-4 space-y-3">
                  <Link
                    href={routePlan.primaryService.href}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                  >
                    <span>{routePlan.primaryService.label}</span>
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </Link>
                  <Link
                    href={routePlan.secondaryService.href}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                  >
                    <span>{routePlan.secondaryService.label}</span>
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </Link>
                  <Link
                    href={routePlan.location.href}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                  >
                    <span>{routePlan.location.label}</span>
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-primary dark:text-brand-primary-light">
                  Next Step
                </p>
                <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                  Review a similar scope
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Compare this case study to your own project goals and start
                  the planning conversation.
                </p>
                <Button asChild className="mt-5 w-full">
                  <Link href="/contact">Contact the team</Link>
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
