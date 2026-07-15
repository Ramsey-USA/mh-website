import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { Button, Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  faqCategories,
  getFAQCategoryBySlug,
  getFAQCategorySlugs,
} from "@/lib/data/faq-data";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const FAQ_CATEGORY_CONTENT_ID = "faq-category-content";
const FAQ_CATEGORY_HERO_SLOGAN = getHeroPageSlogan("faqCategory").slogan;

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

type FAQRoutePlan = {
  service: { href: string; label: string };
  location: { href: string; label: string };
  support: { href: string; label: string };
};

function FAQCategoryItem({
  question,
  answer,
  link,
}: {
  question: string;
  answer: string;
  link: { text: string; href: string } | undefined;
}) {
  return (
    <details className="group rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-brand-primary/40 open:border-brand-primary/40 dark:border-gray-700 dark:bg-gray-900/90">
      <summary className="flex cursor-pointer items-start justify-between gap-4 p-5 transition-colors duration-300 hover:bg-gray-50/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:hover:bg-gray-800/70 sm:p-6">
        <h2 className="pr-2 text-lg font-bold leading-snug text-gray-900 dark:text-white sm:text-xl">
          {question}
        </h2>
        <span className="inline-flex shrink-0 rounded-xl border border-brand-primary/25 bg-brand-primary/10 p-2 text-brand-primary transition-transform duration-300 group-open:rotate-180 dark:border-brand-primary/35 dark:bg-brand-primary/20 dark:text-brand-primary-light">
          <MaterialIcon
            icon="expand_more"
            className="text-current"
            size="md"
            ariaLabel="Expand answer"
          />
        </span>
      </summary>
      <div className="border-t border-gray-200 px-5 pb-5 pt-3 dark:border-gray-700 sm:px-6 sm:pb-6">
        <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
          {answer}
        </p>
        {link ? (
          isExternalHref(link.href) ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-primary-light"
            >
              <MaterialIcon
                icon="open_in_new"
                size="sm"
                ariaLabel="Opens in a new tab"
              />
              {link.text}
            </a>
          ) : (
            <Link
              href={link.href}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-primary-light"
            >
              <MaterialIcon icon="arrow_forward" size="sm" />
              {link.text}
            </Link>
          )
        ) : null}
      </div>
    </details>
  );
}

const FAQ_ROUTE_PLANS: Record<string, FAQRoutePlan> = {
  general: {
    service: {
      href: "/services",
      label: "Commercial construction service line",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco regional service area",
    },
    support: {
      href: "/contact",
      label: "Start a direct consultation",
    },
  },
  process: {
    service: {
      href: "/services",
      label: "Drywall and interiors delivery path",
    },
    location: {
      href: "/locations/kennewick",
      label: "Kennewick project planning area",
    },
    support: {
      href: "/projects/auto-lot-nw",
      label: "Review a phased process case study",
    },
  },
  safety: {
    service: {
      href: "/services",
      label: "Restoration and remodeling controls",
    },
    location: {
      href: "/locations/richland",
      label: "Richland safety-focused delivery area",
    },
    support: {
      href: "/resources/safety-manual/program-compliance-and-continuity",
      label: "Program compliance and continuity standards",
    },
  },
  communication: {
    service: {
      href: "/services",
      label: "Commercial project communication path",
    },
    location: {
      href: "/locations/spokane",
      label: "Spokane communication-first service area",
    },
    support: {
      href: "/contact",
      label: "Talk with the project team",
    },
  },
  veterans: {
    service: {
      href: "/services",
      label: "Municipal and government delivery path",
    },
    location: {
      href: "/locations/yakima",
      label: "Yakima public-sector service area",
    },
    support: {
      href: "/public-sector",
      label: "Explore public and government projects",
    },
  },
  technical: {
    service: {
      href: "/services",
      label: "Commercial technical planning service",
    },
    location: {
      href: "/locations/pendleton",
      label: "Pendleton technical delivery area",
    },
    support: {
      href: "/projects/darigold-pasco-production-facility",
      label: "Review industrial technical execution",
    },
  },
  partnership: {
    service: {
      href: "/services",
      label: "Mission-partner service pathway",
    },
    location: {
      href: "/locations/walla-walla",
      label: "Walla Walla partner delivery area",
    },
    support: {
      href: "/allies",
      label: "Trade partner network",
    },
  },
  financial: {
    service: {
      href: "/services",
      label: "Scope and budget control service path",
    },
    location: {
      href: "/locations/richland",
      label: "Richland budget planning area",
    },
    support: {
      href: "/contact",
      label: "Request open-book pricing conversation",
    },
  },
};

const DEFAULT_FAQ_ROUTE_PLAN: FAQRoutePlan = FAQ_ROUTE_PLANS["general"]!;

export function generateStaticParams() {
  return getFAQCategorySlugs().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const faqCategory = getFAQCategoryBySlug(category);

  if (!faqCategory) {
    return {
      title: `${formatDualPageName(PAGE_TERMINOLOGY.faq.seoName, PAGE_TERMINOLOGY.faq.mhBrandName)} | MH Construction`,
      description:
        "Browse MH Construction frequently asked questions by topic to review process, service lines, safety, and partnership details.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${faqCategory.title} | ${formatDualPageName(PAGE_TERMINOLOGY.faq.seoName, PAGE_TERMINOLOGY.faq.mhBrandName)} | MH Construction`;
  const description = faqCategory.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/faq/${faqCategory.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/faq/${faqCategory.id}`,
      type: "website",
      images: [
        {
          url: `${SITE_URL}${faqCategory.ogImage}`,
          alt: `${faqCategory.title} frequently asked questions`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function FAQCategoryPage({
  params,
}: Readonly<{
  params: Promise<{ category: string }>;
}>) {
  const { category } = await params;
  const faqCategory = getFAQCategoryBySlug(category);

  if (!faqCategory) {
    notFound();
  }

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" },
    { name: faqCategory.title, url: `/faq/${faqCategory.id}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategory.questions.map((question) => ({
      "@type": "Question",
      name: question.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.answer,
      },
    })),
  };
  const routePlan = FAQ_ROUTE_PLANS[faqCategory.id] ?? DEFAULT_FAQ_ROUTE_PLAN;

  return (
    <>
      <PageTrackingClient pageName={`FAQ Category: ${faqCategory.title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={faqSchema} />

      <main className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <a
          href={`#${FAQ_CATEGORY_CONTENT_ID}`}
          className="sr-only z-40 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-brand-primary"
        >
          Skip to category questions
        </a>

        <section
          className="hero-section relative flex items-end justify-end text-white hero-safe-top-lg border-b border-gray-200 px-4 pb-14 sm:px-6 lg:px-8 overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950">
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80" />
          </div>

          <div className="relative mx-auto max-w-5xl w-full ml-auto">
            <div className="max-w-4xl">
              <div className="mb-4 flex justify-start">
                <div className="relative rounded-2xl border-2 border-white/30 bg-linear-to-br from-white/15 to-white/5 p-4 shadow-2xl backdrop-blur-sm">
                  <MaterialIcon
                    icon={faqCategory.icon}
                    size="xl"
                    className="text-brand-secondary"
                    ariaLabel="FAQ Category Icon"
                  />
                </div>
              </div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
                Intel Brief → FAQ Category
              </p>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                {faqCategory.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/85">
                Review the most common questions in this category and move from
                uncertainty to a clear next step.
              </p>
              <p className="mt-3 text-sm font-semibold text-white/90 sm:text-base">
                {COMPANY_INFO.slogan.primary}
              </p>
              <p className="mt-4 text-sm font-semibold text-brand-secondary/90 sm:text-base">
                {FAQ_CATEGORY_HERO_SLOGAN}
              </p>

              <nav
                aria-label="Switch FAQ category"
                className="mt-6 flex flex-wrap gap-3"
              >
                {faqCategories.map((item) => {
                  const isCurrent = item.id === faqCategory.id;
                  return (
                    <Link
                      key={item.id}
                      href={`/faq/${item.id}`}
                      className={`font-heading inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary sm:text-sm ${
                        isCurrent
                          ? "border-brand-secondary/70 bg-brand-secondary/20 text-white"
                          : "border-white/30 bg-white/10 text-white/90 hover:border-brand-secondary/70 hover:bg-brand-secondary/20"
                      }`}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      <MaterialIcon icon={item.icon} size="sm" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          <PageNavigation
            items={navigationConfigs.faq}
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "FAQ", href: "/faq" },
            { label: faqCategory.title },
          ]}
        />

        <section
          id={FAQ_CATEGORY_CONTENT_ID}
          className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="mx-auto max-w-5xl">
            <StaggeredFadeIn className="space-y-5">
              {faqCategory.questions.map((question) => (
                <FAQCategoryItem
                  key={question.question}
                  question={question.question}
                  answer={question.answer}
                  link={question.link}
                />
              ))}
            </StaggeredFadeIn>

            <Card className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/90">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-secondary">
                Move To Scope
              </p>
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                Route this category into a project decision
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                Use the direct service path, local service area page, and
                support destination below to move from research to execution.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  href={routePlan.service.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:border-brand-primary hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900"
                >
                  <span>{routePlan.service.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href={routePlan.location.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:border-brand-primary hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900"
                >
                  <span>{routePlan.location.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href={routePlan.support.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors duration-300 hover:border-brand-primary hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:hover:bg-gray-900"
                >
                  <span>{routePlan.support.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
              </div>
            </Card>

            <Card className="mt-10 rounded-3xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 dark:border-brand-primary/30 dark:from-brand-primary/10 dark:to-brand-primary/20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Need a direct answer?
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                Use this category to orient yourself, then reach out for a live
                conversation when the project needs a decision.
              </p>
              <Button asChild className="mt-5">
                <Link
                  href="/contact"
                  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                  aria-label="Contact our team for direct consultation"
                >
                  Schedule a Consultation
                </Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
