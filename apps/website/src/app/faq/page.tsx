import { PageTrackingClient } from "@/components/analytics";
import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
  MH_SLOGANS,
} from "@/lib/branding/page-names";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import { generateHowToSchema } from "@/lib/seo/howto-schema";
import { StructuredData } from "@/components/seo/SeoMeta";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import {
  faqCategories,
  totalFAQCount,
  type FAQQuestion,
} from "@/lib/data/faq-data";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getServerLocale } from "@/lib/i18n/locale.server";

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbPatterns.faq);

const howToSchema = generateHowToSchema({
  name: "How to Work with MH Construction",
  description: `${MH_SLOGANS.heroByRoute.faq} Step-by-step guide to our mission process from consultation to handoff.`,
  totalTime: "P30D",
  steps: [
    {
      name: "Mission Discovery",
      text: "Initial consultation, site assessment, needs analysis, and budget discussion",
    },
    {
      name: "Mission Planning",
      text: "Detailed scope brief with open-book pricing, schedule alignment, and operational coordination",
    },
    {
      name: "Authorization and Clearances",
      text: "Permit applications, code-compliance review, and approval coordination",
    },
    {
      name: "Field Operations",
      text: "Progress updates, quality inspections, and mission-partner walkthroughs",
    },
    {
      name: "Mission Handoff",
      text: "Final inspection, corrective-item completion, warranty documentation, and ongoing support",
    },
  ],
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  ),
};

const FAQ_HUB_OVERVIEW_ID = "faq-hub-overview";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/**
 * FAQ Accordion Component - Modern Card Design
 */
function FAQItem({ question, answer, link }: Readonly<FAQQuestion>) {
  return (
    <details className="group rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-brand-primary/40 open:border-brand-primary/40 dark:border-gray-700 dark:bg-gray-900/90">
      <summary className="flex cursor-pointer items-start justify-between gap-4 p-5 transition-colors duration-300 hover:bg-gray-50/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:hover:bg-gray-800/70 sm:p-6">
        <h3 className="pr-2 text-base font-bold leading-snug text-gray-900 dark:text-white sm:text-lg">
          {question}
        </h3>
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
        <p className="font-body text-base leading-relaxed text-gray-700 dark:text-gray-300">
          {answer}
        </p>
        {link &&
          (isExternalHref(link.href) ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-primary-light"
            >
              {link.text}
              <MaterialIcon
                icon="open_in_new"
                size="sm"
                ariaLabel="Opens in a new tab"
              />
            </a>
          ) : (
            <Link
              href={link.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition-colors duration-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-primary-light"
            >
              {link.text}
            </Link>
          ))}
      </div>
    </details>
  );
}

/**
 * FAQ Page Component
 */
export default async function FAQPage() {
  const universalCtas = getUniversalCtaSet("en");
  const isEs = (await getServerLocale()) === "es";

  return (
    <>
      <PageTrackingClient pageName={isEs ? "Preguntas Frecuentes" : "FAQ"} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />

      <div className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <a
          href={`#${FAQ_HUB_OVERVIEW_ID}`}
          className="sr-only z-40 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-brand-primary"
        >
          Skip to FAQ content
        </a>

        {/* Hero Section */}
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
        >
          {/* Background - Dark gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="hero-safe-top hero-safe-bottom relative z-30 mb-32 ml-auto mr-4 max-w-2xl pointer-events-none pb-2 transition-opacity duration-300 sm:mb-36 sm:mr-6 md:mb-40 lg:mb-44 lg:mr-8 xl:mr-12">
            <div className="mb-4 flex justify-end">
              <div className="relative rounded-2xl border-2 border-white/30 bg-linear-to-br from-white/15 to-white/5 p-4 shadow-2xl backdrop-blur-sm">
                <MaterialIcon
                  icon="help"
                  size="2xl"
                  className="text-brand-secondary"
                  ariaLabel="FAQ Hero Icon"
                />
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                  {isEs ? "Resumen -> FAQ" : "Intel Brief → FAQ"}
                </span>
                <span className="block text-brand-secondary">
                  {isEs
                    ? "Respuestas directas. Guia de misión clara."
                    : "Direct Answers. Clear Mission Guidance."}
                </span>
                <span className="block text-brand-primary">
                  {isEs
                    ? "Informacion lista para accion de la misión."
                    : "Mission-Ready Information."}
                </span>
                <span className="block text-white/90">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                  {getHeroPageSlogan("faq").slogan}
                </span>
              </h1>
            </div>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.faq}
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            {
              label: formatDualPageName(
                PAGE_TERMINOLOGY.faq.seoName,
                PAGE_TERMINOLOGY.faq.mhBrandName,
              ),
            },
          ]}
        />

        <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8">
          <JeremyAuthorityLinksStrip isEs={isEs} />
        </div>

        {/* Introduction Section */}
        <section
          id={FAQ_HUB_OVERVIEW_ID}
          className="relative overflow-hidden bg-white py-12 dark:bg-gray-900 sm:py-16 lg:py-20 xl:py-24"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-5xl text-center">
              <FadeInWhenVisible>
                <p className="font-body text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  {isEs
                    ? "Respuestas claras sobre servicios, proceso, costos y ejecución de misión. Si su pregunta no aparece, nuestro equipo puede ayudarle directamente. Sin vacíos. Sin suposiciones. Solo seguimiento responsable."
                    : "Clear answers on services, process, pricing, and mission execution. If your question is not listed, our team can help directly. No gaps. No guesswork. Just accountable follow-through."}
                </p>
              </FadeInWhenVisible>

              <nav
                aria-label="FAQ categories quick jump"
                className="mb-10 flex flex-wrap items-center justify-center gap-3"
              >
                {faqCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-white/80 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors duration-300 hover:border-brand-primary hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:border-brand-primary-light dark:hover:text-brand-primary-light"
                  >
                    <MaterialIcon
                      icon={category.icon}
                      size="sm"
                      className="text-brand-primary dark:text-brand-primary-light"
                    />
                    {category.title}
                  </a>
                ))}
              </nav>

              {/* Trust Stat Badges */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
                <div className="rounded-2xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 text-center transition-colors duration-300 hover:border-brand-primary dark:border-brand-primary/30 dark:from-brand-primary/15 dark:to-brand-primary/25">
                  <div className="mb-2 text-3xl font-black text-brand-primary transition-colors duration-300 dark:text-brand-primary-light sm:text-4xl">
                    {totalFAQCount}+
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    Questions Answered
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 text-center transition-colors duration-300 hover:border-brand-primary dark:border-brand-primary/30 dark:from-brand-primary/15 dark:to-brand-primary/25">
                  <div className="mb-2 text-3xl font-black text-brand-primary transition-colors duration-300 dark:text-brand-primary-light sm:text-4xl">
                    {faqCategories.length}
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    Topic Categories
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 text-center transition-colors duration-300 hover:border-brand-primary dark:border-brand-primary/30 dark:from-brand-primary/15 dark:to-brand-primary/25">
                  <div className="mb-2 text-3xl font-black text-brand-primary transition-colors duration-300 dark:text-brand-primary-light sm:text-4xl">
                    0.64
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    EMR Safety Record
                  </div>
                </div>
                <div className="rounded-2xl border border-brand-primary/20 bg-linear-to-br from-brand-primary/5 to-brand-primary/10 p-6 text-center transition-colors duration-300 hover:border-brand-primary dark:border-brand-primary/30 dark:from-brand-primary/15 dark:to-brand-primary/25">
                  <div className="mb-2 text-3xl font-black text-brand-primary transition-colors duration-300 dark:text-brand-primary-light sm:text-4xl">
                    3
                  </div>
                  <div className="font-subheading text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-heading uppercase tracking-wider">
                    States Licensed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        {faqCategories.map((category, categoryIndex) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className={`relative scroll-mt-28 overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24 ${
              categoryIndex % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 text-center sm:mb-16">
                  <FadeInWhenVisible delay={categoryIndex * 0.1}>
                    <div className="mb-8 flex items-center justify-center gap-4">
                      <div className="h-px w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600"></div>
                      <div className="rounded-2xl border border-brand-primary/30 bg-linear-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg">
                        <MaterialIcon
                          icon={category.icon}
                          size="xl"
                          className="text-white"
                        />
                      </div>
                      <div className="h-px w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600"></div>
                    </div>

                    <h2
                      id={`${category.id}-title`}
                      className="mb-4 text-3xl font-black leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl"
                    >
                      <span className="font-subheading mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-brand-secondary sm:text-base">
                        FAQ Category
                      </span>
                      <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
                        {category.title}
                      </span>
                    </h2>
                    <p className="font-subheading mb-3 text-sm font-semibold font-heading uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {category.questions.length} Questions
                    </p>
                    <p className="font-body mx-auto max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                      {category.metaDescription}
                    </p>
                  </FadeInWhenVisible>

                  <StaggeredFadeIn className="space-y-4 sm:space-y-5">
                    {category.questions.map((q) => (
                      <FAQItem
                        key={q.question}
                        question={q.question}
                        answer={q.answer}
                        {...(q.link ? { link: q.link } : {})}
                      />
                    ))}
                  </StaggeredFadeIn>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Still Have Questions CTA */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-6 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="support_agent"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Still Have
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Questions?
                </span>
              </h2>
              <p className="font-body text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                We are here to help. Schedule a face-to-face consultation to
                review your goals, get direct answers, and plan next steps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" variant="primary">
                  <Link
                    href={universalCtas.primary.href}
                    className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                  >
                    <MaterialIcon
                      icon="diversity_3"
                      className="mr-2"
                      theme="military"
                      ariaLabel="Discuss Your Project"
                    />
                    {universalCtas.primary.label}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href="tel:+15093086489"
                    className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                    aria-label="Call us at 509-308-6489"
                  >
                    <MaterialIcon icon="phone" className="mr-2" />
                    (509) 308-6489
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
