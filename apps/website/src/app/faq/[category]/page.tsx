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
import { getFAQCategoryBySlug, getFAQCategorySlugs } from "@/lib/data/faq-data";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

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

  return (
    <>
      <PageTrackingClient pageName={`FAQ Category: ${faqCategory.title}`} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={faqSchema} />

      <main className="bg-white dark:bg-gray-950 min-h-screen">
        <section className="border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 py-14 text-white sm:px-6 lg:px-8">
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
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-6">
              {faqCategory.questions.map((question) => (
                <article
                  key={question.question}
                  className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
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
                </article>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
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
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
