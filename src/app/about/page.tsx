import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import {
  AboutHero,
  PartnershipPhilosophy,
  CompanyStats,
  LeadershipTeam,
  SafetySection,
  AwardsSection,
} from "@/components/about";
import { CompanyEvolution } from "@/components/about/CompanyEvolution";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Enhanced SEO for veteran-owned heritage and proven track record
import { getAboutSEO } from "@/lib/seo/page-seo-utils";

// Lazy load heavy below-the-fold sections
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { ssr: true },
);
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export default function AboutPage() {
  // Get enhanced SEO data for About page
  const aboutSEO = getAboutSEO();

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="About Us"
        description="We're ensuring every detail about our company history, values, and team accurately reflects the excellence you'll experience when partnering with us."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{aboutSEO.title as string}</title>
        <meta name="description" content={aboutSEO.description as string} />
        {aboutSEO.keywords && (
          <meta
            name="keywords"
            content={
              Array.isArray(aboutSEO.keywords)
                ? aboutSEO.keywords.join(", ")
                : aboutSEO.keywords
            }
          />
        )}
        <link rel="canonical" href={aboutSEO.openGraph?.url as string} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={aboutSEO.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={aboutSEO.openGraph?.description as string}
        />
        <meta property="og:url" content={aboutSEO.openGraph?.url as string} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={aboutSEO.twitter?.title as string}
        />
        <meta
          name="twitter:description"
          content={aboutSEO.twitter?.description as string}
        />
      </Head>

      {/* Structured Data */}
      {aboutSEO.schemas && aboutSEO.schemas.length > 0 && (
        <StructuredData data={aboutSEO.schemas} />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.about),
          ),
        }}
      />

      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section - Keyword-rich introduction */}
        <AboutHero />

        {/* Breadcrumb Navigation - Schema markup for SEO */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Our Oath" }]}
        />

        {/* Company Stats - Early trust signals (social proof at 15-20% depth) */}
        <CompanyStats
          id="stats"
          subtitle=""
          title="Trusted by the Community"
          description=""
          variant="primary"
        />

        {/* Client Reviews Section - Social proof at optimal 20-25% page depth for SEO */}
        <TestimonialsSection
          id="testimonials"
          subtitle="Client Partner"
          title="Testimonials"
          description="Hear directly from our partners about their experience working with MH Construction on their most important projects—where trust is earned, not claimed."
        />

        {/* Partnership Philosophy Section - Core value proposition with keywords */}
        <PartnershipPhilosophy />

        {/* Company Evolution Timeline Section - Rich historical content with keywords */}
        <CompanyEvolution />

        {/* Leadership Team Section - Chain of Command (moved earlier for SEO - faces build trust) */}
        <LeadershipTeam />

        {/* Awards & Recognition Section - Credibility and trust signals */}
        <AwardsSection />

        {/* Safety & Compliance Section - Industry-specific trust and expertise */}
        <SafetySection />

        {/* Why Values Matter Section */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          {/* Diagonal Stripe Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #386851 0px,
                  #386851 2px,
                  transparent 2px,
                  transparent 60px
                )`,
              }}
            ></div>
          </div>

          {/* Large Brand Color Blobs */}
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="verified"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Why Our Values
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Matter
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Our{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  service-earned values—integrity, transparency, and excellence
                </span>{" "}
                drive every project decision and partnership we build. These
                battle-tested principles aren't just{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  words on a wall
                </span>
                —they're the foundation of how we do business with 150+ years
                combined military-grade expertise backing every promise we make
                to every partner.
              </p>
            </div>

            <StaggeredFadeIn className={gridPresets.cards3("md")}>
              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="mb-6 flex justify-center">
                      <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon="groups"
                            size="xl"
                            ariaLabel="Our partners"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Partners
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Predictable, consistent experience you can count on
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Peace of mind knowing your project is in capable hands
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Long-term partnership beyond project completion
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          True ROI—the return is the relationship
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-brand-secondary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-secondary via-brand-secondary-dark to-secondary-700"></div>

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="mb-6 flex justify-center">
                      <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/30 to-brand-secondary-dark/30 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-secondary-700 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon="domain"
                            size="xl"
                            ariaLabel="Our community"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Community
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Economic development supporting local suppliers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Raising quality standards in construction industry
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Veteran support and opportunities for military
                          families
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Building structures serving communities for
                          generations
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group relative flex h-full">
                {/* Animated Border Glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Top Accent Bar */}
                  <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="mb-6 flex justify-center">
                      <div className="relative inline-block">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                        <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                          <MaterialIcon
                            icon="engineering"
                            size="xl"
                            className="text-white drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                      For Our Team
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Professional pride in meaningful work
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Clear standards and expectations in every interaction
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Personal growth in environment valuing excellence
                        </span>
                      </li>
                      <li className="flex items-start">
                        <MaterialIcon
                          icon="check_circle"
                          className="flex-shrink-0 mt-1 mr-3 text-brand-primary text-sm sm:text-base"
                        />
                        <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                          Being part of something larger than individual
                          projects
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </StaggeredFadeIn>
          </div>
        </section>

        {/* News & Achievements Section - MERGED from Company Blog + Latest News */}
        <section
          id="news"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          {/* Diagonal Stripe Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #386851 0px,
                  #386851 2px,
                  transparent 2px,
                  transparent 60px
                )`,
              }}
            ></div>
          </div>

          {/* Large Brand Color Blobs */}
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="campaign"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Mission Updates
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Latest News & Achievements
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Stay updated with our latest{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  projects, partnerships, and industry insights
                </span>{" "}
                —milestones from our{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  veteran-owned team
                </span>{" "}
                where every achievement reflects our commitment to excellence.
              </p>
            </div>

            {/* Combined grid with best content from both sections - 6 items total */}
            <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
              {/* Company Milestone */}
              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="celebration"
                            className="text-brand-primary"
                            size="md"
                          />
                          <span className="font-semibold text-brand-primary text-xs sm:text-sm">
                            Company Milestone
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Nov 2025
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        50+ Successful Projects in Pacific Northwest
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        We&apos;re proud to announce reaching a major milestone:
                        over 50 completed construction projects across
                        Washington and Oregon. Thank you to all our partners for
                        your continued trust.
                      </p>
                      <Link
                        href="/projects"
                        className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          View Our Work
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-brand-secondary"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary to-bronze-700 p-2 shadow-xl group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon="rocket_launch"
                                className="text-white drop-shadow-lg"
                                size="md"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                            New Technology
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Coming Soon
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        Integrated CRM & Project Management Platform
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        We&apos;re implementing High-Level CRM to provide
                        seamless communication, real-time project updates, and
                        an enhanced experience throughout your construction
                        journey. Feedback from every project helps us improve.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          Learn More
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-brand-secondary"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary to-bronze-700 p-2 shadow-xl group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon="handshake"
                                className="text-white drop-shadow-lg"
                                size="md"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                            Partnership
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Oct 2025
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        Expanding Trade Partner Network
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        We&apos;re actively growing our network of skilled trade
                        professionals to better serve clients across the Pacific
                        Northwest. Join our veteran-owned partnership program.
                      </p>
                      <Link
                        href="/allies"
                        className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          Become a Partner
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-brand-secondary"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-brand-secondary to-bronze-700 p-2 shadow-xl group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon="workspace_premium"
                                className="text-white drop-shadow-lg"
                                size="md"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-brand-secondary text-xs sm:text-sm">
                            Recognition
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Sep 2025
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        Award-Winning Safety Record
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        Our commitment to safety excellence has been recognized
                        by industry organizations. Zero accidents, 100%
                        compliance - that&apos;s the veteran-owned difference.
                      </p>
                      <Link
                        href="/about#safety"
                        className="inline-flex items-center text-brand-secondary hover:text-brand-primary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          Safety Standards
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-2 shadow-xl group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon="lightbulb"
                                className="text-white drop-shadow-lg"
                                size="md"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-brand-primary text-xs sm:text-sm">
                            Industry Insight
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Aug 2025
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        Best Practices for Commercial Construction Projects
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        Drawing from our years of experience, we share key
                        insights for successful commercial builds: planning,
                        communication, and partnership-focused collaboration.
                      </p>
                      <Link
                        href="/services"
                        className="inline-flex items-center text-brand-primary hover:text-brand-secondary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          Our Services
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-bronze-700/40 to-bronze-800/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-bronze-600 via-bronze-700 to-bronze-800"></div>

                    <div className="pt-6 px-6 pb-6 flex flex-col flex-grow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-br from-bronze-700/40 to-bronze-800/40 opacity-30 blur-lg rounded-xl"></div>
                            <div className="relative rounded-xl bg-gradient-to-br from-bronze-600 to-bronze-800 p-2 shadow-xl group-hover:scale-110 transition-all duration-300">
                              <MaterialIcon
                                icon="military_tech"
                                className="text-white drop-shadow-lg"
                                size="md"
                              />
                            </div>
                          </div>
                          <span className="font-semibold text-bronze-700 dark:text-bronze-600 text-xs sm:text-sm">
                            Veteran Initiative
                          </span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm flex-shrink-0">
                          Jul 2025
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                        Supporting Veteran-Owned Businesses
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                        As a veteran-owned company, we prioritize partnerships
                        with fellow veteran businesses and support programs that
                        help veterans transition to civilian careers.
                      </p>
                      <Link
                        href="/about"
                        className="inline-flex items-center text-bronze-700 hover:text-brand-primary transition-colors mt-auto"
                      >
                        <span className="font-medium text-xs sm:text-sm">
                          Our Values
                        </span>
                        <MaterialIcon
                          icon="arrow_forward"
                          size="sm"
                          className="ml-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Footer note about future blog */}
            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    icon="info"
                    size="md"
                    className="text-brand-primary"
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Full blog with integrated High-Level CRM coming soon
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section - MOVED TO PROPER CONVERSION POSITION (80-90% page depth) */}
        <NextStepsSection />
      </div>
    </>
  );
}
