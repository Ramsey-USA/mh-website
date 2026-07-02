import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageTrackingClient } from "@/components/analytics";
import { Button, Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getFAQCategoryBySlug, getFAQCategorySlugs } from "@/lib/data/faq-data";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

type FAQRoutePlan = {
  service: { href: string; label: string };
  location: { href: string; label: string };
  support: { href: string; label: string };
};

const FAQ_ROUTE_PLANS: Record<string, FAQRoutePlan> = {
  general: {
    service: {
      href: "/#services",
      label: "Commercial construction service line",
    },
    location: {
      href: "/locations/pasco",
      label: "Pasco regional service market",
    },
    support: {
      href: "/contact",
      label: "Start a direct consultation",
    },
  },
  process: {
    service: {
      href: "/#services",
      label: "Drywall and interiors delivery path",
    },
    location: {
      href: "/locations/kennewick",
      label: "Kennewick project planning market",
    },
    support: {
      href: "/projects/kennewick-commercial-office-renovation",
      label: "Review a phased process case study",
    },
  },
  safety: {
    service: {
      href: "/#services",
      label: "Restoration and remodeling controls",
    },
    location: {
      href: "/locations/richland",
      label: "Richland safety-focused delivery market",
    },
    support: {
      href: "/resources/safety-manual/program-compliance-and-continuity",
      label: "Program compliance and continuity standards",
    },
  },
  communication: {
    service: {
      href: "/#services",
      label: "Commercial project communication path",
    },
    location: {
      href: "/locations/spokane",
      label: "Spokane communication-first service market",
    },
    support: {
      href: "/contact",
      label: "Talk with the project team",
    },
  },
  veterans: {
    service: {
      href: "/#services",
      label: "Municipal and government delivery path",
    },
    location: {
      href: "/locations/yakima",
      label: "Yakima public-sector service market",
    },
    support: {
      href: "/public-sector",
      label: "Explore public and government projects",
    },
  },
  technical: {
    service: {
      href: "/#services",
      label: "Commercial technical planning service",
    },
    location: {
      href: "/locations/pendleton",
      label: "Pendleton technical delivery market",
    },
    support: {
      href: "/projects/pasco-industrial-warehouse-build-out",
      label: "Review industrial technical execution",
    },
  },
  partnership: {
    service: {
      href: "/#services",
      label: "Client partnership service pathway",
    },
    location: {
      href: "/locations/walla-walla",
      label: "Walla Walla partner delivery market",
    },
    support: {
      href: "/allies",
      label: "Trade partner network",
    },
  },
  financial: {
    service: {
      href: "/#services",
      label: "Scope and budget control service path",
    },
    location: {
      href: "/locations/richland",
      label: "Richland budget planning market",
    },
    support: {
      href: "/contact",
      label: "Request open-book pricing conversation",
    },
  },
};

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
      title: "FAQ | MH Construction",
      description:
        "Browse MH Construction frequently asked questions by topic to review process, service lines, safety, and partnership details.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${faqCategory.title} FAQ | MH Construction`;
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
  const defaultRoutePlan = FAQ_ROUTE_PLANS["general"];
  const routePlan = FAQ_ROUTE_PLANS[faqCategory.id] ?? defaultRoutePlan;

  if (!routePlan) {
    notFound();
  }

  return (
    <>
      <PageTrackingClient pageName={`FAQ Category: ${faqCategory.title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={faqSchema} />

      <main className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <section className="hero-section hero-safe-top-lg border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 pb-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "FAQ", href: "/faq" },
                { label: faqCategory.title },
              ]}
              className="mb-6 text-white/70"
            />

            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
                FAQ Hub
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
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
                {COMPANY_INFO.slogan.quinary}
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6">
              {faqCategory.questions.map((question) => (
                <Card
                  key={question.question}
                  className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {question.question}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                    {question.answer}
                  </p>
                  {question.link ? (
                    <Link
                      href={question.link.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
                    >
                      <MaterialIcon icon="arrow_forward" size="sm" />
                      {question.link.text}
                    </Link>
                  ) : null}
                </Card>
              ))}
            </div>

            <Card className="mt-10 border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                Move To Scope
              </p>
              <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
                Route this category into a project decision
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                Use the direct service path, local market page, and support
                destination below to move from research to execution.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Link
                  href={routePlan.service.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                >
                  <span>{routePlan.service.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href={routePlan.location.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                >
                  <span>{routePlan.location.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href={routePlan.support.href}
                  className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-brand-primary dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
                >
                  <span>{routePlan.support.label}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
              </div>
            </Card>

            <Card className="mt-10 border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Need a direct answer?
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                Use this category to orient yourself, then reach out for a live
                conversation when the project needs a decision.
              </p>
              <Button asChild className="mt-5">
                <Link href="/contact">Contact the team</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
