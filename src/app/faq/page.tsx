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
import { NextStepsSection } from "@/components/shared-sections";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { generateHowToSchema } from "@/lib/seo/howto-schema";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { faqCategories, type FAQQuestion } from "@/lib/data/faq-data";

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbPatterns.faq);

const howToSchema = generateHowToSchema({
  name: "How to Work with MH Construction",
  description:
    "Step-by-step guide to our partnership-driven construction process from consultation to project completion",
  totalTime: "P30D",
  steps: [
    {
      name: "Discovery Phase",
      text: "Initial free consultation, site assessment, needs analysis, and budget discussion",
    },
    {
      name: "Planning Phase",
      text: "Detailed proposal with open-book pricing, timeline development, and contract signing",
    },
    {
      name: "Permitting Phase",
      text: "Permit applications, code compliance review, and approval coordination",
    },
    {
      name: "Construction Phase",
      text: "Regular progress updates, photo documentation, quality inspections, and client walkthroughs",
    },
    {
      name: "Completion Phase",
      text: "Final inspection, punch list completion, warranty documentation, and ongoing support",
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

/**
 * FAQ Accordion Component - Modern Card Design
 */
function FAQItem({ question, answer, link }: FAQQuestion) {
  return (
    <details className="group relative">
      {/* Animated Border Glow */}
      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

      <div className="relative border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
        {/* Top Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker group-open:h-2 transition-all duration-300"></div>

        <summary className="flex items-center justify-between p-6 cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white pr-4">
            {question}
          </h3>
          <div className="relative inline-block flex-shrink-0">
            <div className="absolute -inset-1 bg-brand-primary/20 dark:bg-brand-primary/30 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative rounded-lg bg-gradient-to-br from-brand-primary to-brand-primary-dark p-2 group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon
                icon="expand_more"
                className="text-white transform group-open:rotate-180 transition-transform duration-300"
                size="md"
                ariaLabel="Expand answer"
              />
            </div>
          </div>
        </summary>
        <div className="p-6 pt-2 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            {answer}
          </p>
          {link && (
            <Link
              href={link.href}
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {link.text}
            </Link>
          )}
        </div>
      </div>
    </details>
  );
}

/**
 * FAQ Page Component
 */
export default function FAQPage() {
  return (
    <>
      <PageTrackingClient pageName="FAQ" />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background - Dark gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Mission Icon */}
            <div className="flex justify-end mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <MaterialIcon
                  icon="help"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Frequently Asked Questions"
                />
              </div>
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary-text text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                Intel Brief
              </span>
              <span className="block text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-2">
                FAQ
              </span>
              <span className="block text-white/90 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-3">
                Your Questions,
              </span>
              <span className="block text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-3">
                Our Honest Answers
              </span>
              <span className="block text-white/80 text-xs xs:text-sm sm:text-base md:text-lg">
                Building projects for the Client,{" "}
                <span className="font-black italic text-brand-secondary">
                  NOT
                </span>{" "}
                the Dollar
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.faq}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />

        {/* Introduction Section */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <FadeInWhenVisible>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-10">
                  We believe in transparency, honesty, and clear
                  communication—core values that guide everything we do. Below
                  you'll find answers to common questions about our services,
                  process, and partnership approach. Can't find what you're
                  looking for? We're always available for a conversation.
                </p>
              </FadeInWhenVisible>

              {/* Trust Stat Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                    {faqCategories.reduce(
                      (sum, cat) => sum + cat.questions.length,
                      0,
                    )}
                    +
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Questions Answered
                  </div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                    {faqCategories.length}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Topic Categories
                  </div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                    0.64
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    EMR Safety Record
                  </div>
                </div>
                <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
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
            className={`relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${
              categoryIndex % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16 text-center">
                  <FadeInWhenVisible delay={categoryIndex * 0.1}>
                    {/* Icon with decorative lines */}
                    <div className="flex items-center justify-center mb-8 gap-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                          <MaterialIcon
                            icon={category.icon}
                            size="2xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                      <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                    </div>

                    {/* Two-line gradient heading */}
                    <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-relaxed tracking-tighter overflow-visible">
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                        {category.title}
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-2">
                      {category.questions.length} Questions
                    </p>
                  </FadeInWhenVisible>

                  <StaggeredFadeIn className="space-y-4">
                    {category.questions.map((q, qIndex) => (
                      <FAQItem
                        key={qIndex}
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
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="support_agent"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Still Have
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Questions?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                We're here to help. Our team is available for face-to-face
                consultation where we can discuss your specific needs, answer
                any questions, and start building a partnership based on trust
                and transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-brand-primary hover:bg-brand-primary-dark text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MaterialIcon
                      icon="diversity_3"
                      className="mr-2"
                      theme="military"
                      ariaLabel="Schedule Face-to-Face Consultation"
                    />
                    Schedule Face-to-Face Consultation
                  </Button>
                </Link>
                <a href="tel:+15093086489">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 dark:border-brand-primary-light dark:text-brand-primary-light dark:hover:bg-brand-primary-light/10 font-bold transition-all duration-300"
                  >
                    <MaterialIcon
                      icon="phone"
                      className="mr-2"
                      ariaLabel="Call Us"
                    />
                    (509) 308-6489
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <NextStepsSection
          title="Ready to Start Your Project?"
          subtitle="Let's build something exceptional together"
        />
      </div>
    </>
  );
}
