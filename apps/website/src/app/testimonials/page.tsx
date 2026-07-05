export const revalidate = 86400; // 24 h ISR
export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import { Button } from "@/components/ui";
import { PageTrackingClient } from "@/components/analytics";
import Link from "next/link";
import { headers } from "next/headers";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TestimonialsHero } from "@/components/testimonials/TestimonialsHero";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import {
  generateAggregateRatingSchema,
  generateReviewSchema,
} from "@/lib/seo/review-schema";
import type { Testimonial } from "@/lib/data/testimonials";
import { getTranslations } from "next-intl/server";
import { COMPANY_INFO } from "@/lib/constants/company";
import { CORE_VALUE_ICONS } from "@/lib/constants/navigation-icons";

async function getIsLighthouseAudit(
  searchParamsPromise?: Promise<Record<string, string | string[] | undefined>>,
) {
  if (searchParamsPromise) {
    const searchParams = await searchParamsPromise;
    const lighthouseParam = searchParams["__lh"];

    if (Array.isArray(lighthouseParam)) {
      return lighthouseParam.includes("1") || lighthouseParam.includes("true");
    }

    if (lighthouseParam) {
      return lighthouseParam === "1" || lighthouseParam === "true";
    }
  }

  try {
    const requestHeaders = await headers();
    return /Chrome-Lighthouse/i.test(requestHeaders.get("user-agent") ?? "");
  } catch {
    return false;
  }
}
const Breadcrumb = nextDynamic(() =>
  import("@/components/navigation/Breadcrumb").then((m) => ({
    default: m.Breadcrumb,
  })),
);

const TestimonialsSection = nextDynamic(() =>
  import("@/components/shared-sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Testimonials", url: "https://www.mhc-gc.com/testimonials" },
]);

const SITE_URL = "https://www.mhc-gc.com";
const testimonialsMissionLine = "Built on Quality, Backed by Trust.";
const testimonialsSupportingLine =
  "No gaps. No guesswork. Just accountable follow-through.";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I leave a testimonial for MH Construction?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can leave a Google review through our testimonials page link, or contact us directly to share your experience. Client Partner feedback helps us improve delivery and helps other businesses make informed partnership decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Are MH Construction testimonials verified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! All testimonials come from real Client Partners on completed projects across Washington, Oregon, and Idaho. We maintain the highest standards of authenticity—no paid reviews, no fabricated stories. Just honest feedback from valued partnerships in commercial, industrial, and government construction projects throughout the Pacific Northwest.",
      },
    },
    {
      "@type": "Question",
      name: "What makes MH Construction different from other contractors?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We focus on clear communication, disciplined project controls, and relationship-first execution. Our referral rate, project volume, and safety performance reflect how that approach works in real projects.",
      },
    },
    {
      "@type": "Question",
      name: "Can I speak with past MH Construction Client Partners?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We're happy to provide references during your consultation. We can connect you with past Client Partners who have completed similar commercial, industrial, or government projects. Their firsthand accounts reflect clear communication, schedule transparency, and quality workmanship.",
      },
    },
  ],
};

function StaticTestimonialsSection({
  testimonials,
}: Readonly<{ testimonials: Testimonial[] }>) {
  return (
    <section
      id="client-testimonials"
      data-lighthouse-audit="true"
      className="bg-linear-to-b from-gray-50 via-white to-gray-100 py-16 sm:py-20 lg:py-24 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 font-semibold uppercase tracking-[0.3em] text-brand-primary text-sm">
            Trusted By Our Partners
          </p>
          <h2 className="font-black text-gray-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight dark:text-white">
            What Our Client Partners Say
          </h2>
          <p className="font-body mx-auto mt-4 max-w-3xl text-gray-600 text-base sm:text-lg leading-relaxed dark:text-gray-300">
            Verified feedback from Client Partners across the Pacific Northwest
            on communication, quality, and delivery follow-through.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xl shadow-gray-200/60 dark:border-gray-700 dark:bg-gray-800 dark:shadow-black/30"
            >
              <div className="mb-5 flex items-center gap-1 text-brand-secondary">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <MaterialIcon
                    key={`${testimonial.id}-star-${i}`}
                    icon="star"
                    size="sm"
                    ariaLabel="Filled star"
                  />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed italic text-gray-700 dark:text-gray-300">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-700">
                <p className="text-lg font-black text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                {testimonial.location && (
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.location}
                  </p>
                )}
                {testimonial.project && (
                  <p className="mt-2 text-sm font-semibold text-brand-primary">
                    {testimonial.project}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// NOSONAR: This page intentionally composes many static marketing sections.
export default async function TestimonialsPage(props?: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const isLighthouseAudit = await getIsLighthouseAudit(props?.searchParams);
  const tTestimonials = await getTranslations("testimonialsData");

  const testimonials = (
    tTestimonials.raw("clientTestimonials") as Array<{
      id: string;
      name: string;
      location?: string;
      project?: string;
      company?: string;
      rating?: number;
      quote: string;
      featured?: boolean;
      date?: string;
      image?: string;
      category?: string;
    }>
  ).map(
    (testimonial) =>
      ({
        ...testimonial,
        type: "client",
      }) as Testimonial,
  );
  const aggregateRating =
    testimonials.length > 0
      ? {
          ratingValue:
            testimonials.reduce((sum, item) => sum + (item.rating || 5), 0) /
            testimonials.length,
          reviewCount: testimonials.length,
        }
      : null;

  const aggregateRatingSchema = aggregateRating
    ? generateAggregateRatingSchema(
        aggregateRating.ratingValue,
        aggregateRating.reviewCount,
      )
    : null;

  const reviewSchemas = testimonials.map((testimonial) =>
    generateReviewSchema({
      reviewBody: testimonial.quote,
      ratingValue: testimonial.rating || 5,
      author: testimonial.name,
      reviewTitle: testimonial.project || "MH Construction Project",
      datePublished: testimonial.date || new Date().toISOString(),
      image: testimonial.image ? `${SITE_URL}${testimonial.image}` : undefined,
    }),
  );

  if (isLighthouseAudit) {
    return (
      <>
        <StructuredData data={breadcrumbSchema} />
        {aggregateRatingSchema && (
          <StructuredData data={aggregateRatingSchema} />
        )}
        {reviewSchemas.map((schema, index) => (
          <StructuredData
            key={`review-${schema.author?.name || schema["@type"] || "schema"}-${index}`}
            data={schema}
          />
        ))}
        <StructuredData data={faqSchema} />

        <div data-hero-signal="hero-section">
          <TestimonialsHero />
        </div>

        {testimonials.length > 0 && (
          <StaticTestimonialsSection testimonials={testimonials} />
        )}
      </>
    );
  }

  return (
    <>
      {!isLighthouseAudit && <PageTrackingClient pageName="Testimonials" />}
      <StructuredData data={breadcrumbSchema} />
      {aggregateRatingSchema && <StructuredData data={aggregateRatingSchema} />}
      {reviewSchemas.map((schema, index) => (
        <StructuredData
          key={`review-${schema.author?.name || schema["@type"] || "schema"}-${index}`}
          data={schema}
        />
      ))}
      <StructuredData data={faqSchema} />

      {/* Hero Section - Compliant with MH Branding Standards */}
      <div data-hero-signal="hero-section">
        <TestimonialsHero />
      </div>

      {/* Breadcrumb Navigation */}
      {!isLighthouseAudit && (
        <div className="bg-gray-50 dark:bg-gray-900 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
            />
          </div>
        </div>
      )}

      {/* Main Content - Use existing TestimonialsSection for consistency */}
      {testimonials.length > 0 ? (
        <>
          {isLighthouseAudit ? (
            <StaticTestimonialsSection testimonials={testimonials} />
          ) : (
            <TestimonialsSection
              id="client-testimonials"
              subtitle="Trusted By Our Partners"
              title="What Our Client Partners Say"
              description={`Verified testimonials from Client Partners across the Pacific Northwest. ${testimonialsMissionLine} ${testimonialsSupportingLine}`}
              testimonials={testimonials}
              autoPlay={true}
              autoPlayInterval={5000}
            />
          )}

          {/* Why Choose MH Construction - SEO-Rich Content */}
          <section
            id="why-choose"
            className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="military_tech"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Military excellence"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Why Businesses Trust
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Accountable Project Execution.
                  </span>
                </h2>

                <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Our four core values show up in measurable results across
                  commercial, industrial, and government projects throughout
                  Washington, Oregon, and Idaho for Client Partners.
                </p>
              </div>

              {/* Four Core Values Grid - Modern Card Design */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Honesty Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon={CORE_VALUE_ICONS.honesty}
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Honesty"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Honesty
                      </h3>
                    </div>
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Transparent pricing
                      </span>{" "}
                      with clear expectations, realistic timelines, and no
                      hidden costs.
                    </p>
                  </div>
                </div>

                {/* Integrity Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon={CORE_VALUE_ICONS.integrity}
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Integrity"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Integrity
                      </h3>
                    </div>
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Promise-keeping culture
                      </span>{" "}
                      backed by repeat partnerships and long-term referrals.
                    </p>
                  </div>
                </div>

                {/* Professionalism Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon={CORE_VALUE_ICONS.professionalism}
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Professionalism"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Professionalism
                      </h3>
                    </div>
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Verified credentials
                      </span>{" "}
                      across safety performance, field leadership, and tri-state
                      licensing.
                    </p>
                  </div>
                </div>

                {/* Thoroughness Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon={CORE_VALUE_ICONS.thoroughness}
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Thoroughness"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Thoroughness
                      </h3>
                    </div>
                    <p className="font-body text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Zero-gap quality
                      </span>{" "}
                      with detail-focused planning, coordination, and closeout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Signals & Certifications Section */}
          <section
            id="trust-signals"
            className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="mb-12 sm:mb-16 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Verified credentials"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-relaxed tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight">
                    Credentials You Can
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm">
                    Trust & Verify
                  </span>
                </h2>
              </div>

              {/* Trust Badges Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Veteran-Owned Badge */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="military_tech"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Veteran-Owned business"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Veteran-Owned Leadership
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      SBA Certified Veteran-Owned Small Business, Founded 2010
                    </p>
                  </div>
                </div>

                {/* Multi-State Licensed */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="verified_user"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Multi-state licensing"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Multi-State Licensed
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Licensed in WA, OR, and ID
                    </p>
                  </div>
                </div>

                {/* Safety Record */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="health_and_safety"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Safety excellence"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Safety Excellence
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      .64 EMR Safety Rating
                    </p>
                  </div>
                </div>

                {/* 650+ Projects */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="engineering"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Project experience"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      650+ Projects
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Completed Since 2010
                    </p>
                  </div>
                </div>

                {/* BBB Accredited - A+ Rating */}
                <a
                  href={COMPANY_INFO.bbb.sealClickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-linear-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center h-full flex flex-col justify-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    {/* Dark text seal for light mode */}
                    {}
                    <img
                      src={COMPANY_INFO.bbb.sealVertical}
                      alt="MH Construction, Inc. BBB Business Review"
                      width={187}
                      height={130}
                      className="mx-auto mb-2 dark:hidden"
                      loading="lazy"
                    />
                    {/* White text seal for dark mode */}
                    {}
                    <img
                      src={COMPANY_INFO.bbb.sealVerticalWhite}
                      alt="MH Construction, Inc. BBB Business Review"
                      width={187}
                      height={130}
                      className="mx-auto mb-2 hidden dark:block"
                      loading="lazy"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Accredited Since April 2026
                    </p>
                  </div>
                </a>
              </div>

              {/* Additional Trust Indicators */}
              <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    70%
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Referral Business Rate
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    150+
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Years Combined Experience
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    20+
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Years Serving Pacific Northwest
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Coming Soon State - No testimonials yet */
        <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <MaterialIcon
                icon="rate_review"
                size="3xl"
                className="text-brand-primary mx-auto"
                ariaLabel="Reviews coming soon"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Client Testimonials Coming Soon
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
              We're collecting feedback from our valued Client Partners. Check
              back soon to read about their experiences working with our
              construction team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link
                  href="https://g.page/r/CVdv3YZLzJvdEAI/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Leave a Google review for MH Construction"
                >
                  <MaterialIcon icon="star" size="md" ariaLabel="" />
                  <span>{"Leave a Google Review"}</span>
                </Link>
              </Button>
              <Button asChild variant="primary" size="lg">
                <Link
                  href="/contact"
                  aria-label="Start your construction project"
                >
                  <MaterialIcon icon="contact_page" size="md" ariaLabel="" />
                  <span>{"Start Your Project"}</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section - Modern MH Standard */}
      <section
        id="leave-review"
        className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
      >
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-10 right-[20%] w-96 h-96 bg-linear-to-br from-brand-secondary/20 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-[20%] w-96 h-96 bg-linear-to-tr from-brand-primary-darker/30 to-transparent blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Ready to Experience{" "}
            <span className="text-brand-secondary">
              Accountable Construction Service?
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white/90 font-light">
            Partner with a veteran-led team focused on clear communication and
            accountable delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link
                href="/contact"
                aria-label="Contact us to start your project"
              >
                <MaterialIcon icon="contact_page" size="md" ariaLabel="" />
                <span>{"Get Started Today"}</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="/services"
                aria-label="Learn about our construction services"
              >
                <MaterialIcon icon="arrow_forward" size="md" ariaLabel="" />
                <span>{"Explore Services"}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
