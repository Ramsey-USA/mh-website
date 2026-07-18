import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Button, Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  getProjectCaseStudyBySlug,
  getPublishedProjectCaseStudySlugs,
} from "@/lib/data/project-case-studies";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { PortfolioService } from "@/lib/services/portfolio-service";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const PROJECT_DETAIL_HERO_SLOGAN = getHeroPageSlogan("projectDetail").slogan;

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
  "lcsnw-tri-cities": {
    primaryService: {
      href: "/services",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services",
      label: "Restoration and Remodeling",
    },
    location: {
      href: "/locations/kennewick",
      label: "Kennewick Service Area",
    },
  },
  "volm-companies-remodel": {
    primaryService: {
      href: "/services",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services",
      label: "Drywall and Interiors",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco Service Area",
    },
  },
  "darigold-pasco-production-facility": {
    primaryService: {
      href: "/services",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services",
      label: "Municipal and Government",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco Service Area",
    },
  },
  "franklin-county-coroners-office-morgue": {
    primaryService: {
      href: "/services",
      label: "Municipal and Government",
    },
    secondaryService: {
      href: "/services",
      label: "Commercial Construction",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco Service Area",
    },
  },
  "auto-lot-nw": {
    primaryService: {
      href: "/services",
      label: "Commercial Construction",
    },
    secondaryService: {
      href: "/services",
      label: "Restoration and Remodeling",
    },
    location: {
      href: "/locations/kennewick",
      label: "Kennewick Service Area",
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
  return getPublishedProjectCaseStudySlugs().map((slug) => ({ slug }));
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
      title: `${formatDualPageName(PAGE_TERMINOLOGY.projects.seoName, PAGE_TERMINOLOGY.projects.mhBrandName)} | MH Construction`,
      description:
        "Review completed MH Construction projects and case studies across commercial, industrial, and public-sector work.",
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
  const projectKeywords = Array.from(
    new Set([
      "construction case study",
      "project delivery outcomes",
      "mission-partner-aligned project execution",
      "commercial construction project",
      "tenant improvement project",
      "municipal construction project",
      "agricultural and winery construction project",
      "light industrial construction project",
      ...(project?.tags ?? []),
      ...(project?.location.city ? [project.location.city] : []),
      ...(project?.location.state ? [project.location.state] : []),
    ]),
  );
  const openGraphImage =
    caseStudy?.ogImage ??
    project?.images.find((image) => image.isFeatured)?.url ??
    project?.images[0]?.url ??
    "/images/projects/project-default.webp";

  if (caseStudy?.isPublished === false) {
    return {
      title,
      description,
      keywords: projectKeywords,
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
      twitter: {
        card: "summary_large_image",
        title,
        description,
        creator: "@mhc_gc",
        images: [`${SITE_URL}${openGraphImage}`],
      },
      robots: { index: false, follow: false },
    };
  }

  return {
    title,
    description,
    keywords: projectKeywords,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@mhc_gc",
      images: [`${SITE_URL}${openGraphImage}`],
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
  const projectImages = selectedProject?.images
    ? [...selectedProject.images].sort(
        (left, right) => left.order - right.order,
      )
    : [];
  const galleryImages =
    projectImages.length > 0
      ? projectImages
      : caseStudy?.ogImage
        ? [
            {
              id: `case-study-${slug}`,
              url: caseStudy.ogImage,
              alt: `${title} project photo`,
              isFeatured: true,
              order: 1,
            },
          ]
        : [];
  const featuredProjectImage = galleryImages[0];
  const supportingGalleryImages = galleryImages.slice(1, 5);

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
        href: "/services",
        label: "Commercial Construction",
      },
      secondaryService: {
        href: "/services",
        label: "Restoration and Remodeling",
      },
      location: {
        href: `/locations/${cityToLocationSlug(location.city)}`,
        label: `${location.city} Service Area`,
      },
    };

  return (
    <>
      <PageTrackingClient pageName={`Project Case Study: ${title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={[projectSchema, localBusinessSchema]} />

      <main className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section
          className="hero-section relative flex items-end justify-end text-white hero-safe-top-lg border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 pb-14 sm:px-6 lg:px-8 overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          <div className="mx-auto max-w-6xl w-full ml-auto">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
                Case Study → Project Detail
              </p>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                {title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/85">
                {description}
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-secondary/90 sm:text-base">
                {COMPANY_INFO.slogan.primary}
              </p>
              <p className="mt-2 text-sm font-semibold text-brand-secondary/80 sm:text-base">
                {PROJECT_DETAIL_HERO_SLOGAN}
              </p>
            </div>
          </div>

          <PageNavigation
            items={navigationConfigs.projects}
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: title },
          ]}
        />

        {featuredProjectImage && (
          <section className="px-4 pb-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                    Project Gallery
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    A look at the finished work
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {projectImages.length > 0
                    ? "These project photos come from the captured site record and are shown in the order the team documented them."
                    : "This case study uses the available project image as a visual fallback until a full photo set is published."}
                </p>
              </div>

              <div
                className={`grid gap-4 ${supportingGalleryImages.length > 0 ? "lg:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.75fr)]" : ""}`}
              >
                <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-8">
                  <div className="relative aspect-16/10 bg-gray-100 dark:bg-gray-950">
                    <Image
                      src={featuredProjectImage.url}
                      alt={featuredProjectImage.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      quality={82}
                      priority
                    />
                  </div>
                  {featuredProjectImage.caption && (
                    <p className="border-t border-gray-200 px-5 py-4 text-sm leading-6 text-gray-600 dark:border-gray-800 dark:text-gray-300">
                      {featuredProjectImage.caption}
                    </p>
                  )}
                </div>

                {supportingGalleryImages.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {supportingGalleryImages.map((image) => (
                      <figure
                        key={image.id}
                        className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
                      >
                        <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-950">
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                            quality={78}
                          />
                        </div>
                        {image.caption && (
                          <figcaption className="px-4 py-3 text-xs leading-5 text-gray-600 dark:text-gray-300">
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]">
            <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
            </Card>

            <aside className="space-y-6">
              <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
              </Card>

              <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
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
              </Card>

              <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  Related Service Paths
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  Use the nearest service line and service area page to move
                  this case study into scoping and consultation.
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
              </Card>

              <Card className="border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
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
              </Card>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
