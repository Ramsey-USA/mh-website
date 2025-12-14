"use client";

import Link from "next/link";
import Head from "next/head";
import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import {
  AboutHero,
  AboutValues,
  coreValues,
  PartnershipPhilosophy,
  CompanyStats,
  LeadershipTeam,
  SafetySection,
  AwardsSection,
} from "@/components/about";
import { gridPresets } from "@/lib/styles/layout-variants";
import { PartnershipCTA } from "@/components/home/PartnershipCTA";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/seo-meta";

// Enhanced SEO for veteran-owned heritage and proven track record
import { getAboutSEO } from "@/lib/seo/page-seo-utils";

// Import shared sections
import {
  TestimonialsSection,
  NextStepsSection,
} from "@/components/shared-sections";

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

      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <AboutHero />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Our Oath" }]}
        />

        {/* Partnership Philosophy Section */}
        <PartnershipPhilosophy />

        {/* Company Stats */}
        <CompanyStats />

        {/* Core Values Section */}
        <AboutValues coreValues={coreValues} />

        {/* Client Reviews Section - POSITIONED AT 25-30% PAGE DEPTH FOR SEO OPTIMIZATION */}
        <TestimonialsSection
          id="testimonials"
          subtitle="Partnership"
          title="Reviews"
          description="Hear directly from our partners about their experience working with MH Construction on their most important projects."
        />

        {/* Leadership Team Section - MOVED EARLIER: Faces build trust and connection */}
        <LeadershipTeam />

        {/* Awards & Recognition Section */}
        <AwardsSection />

        {/* Why Values Matter Section */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
          <div className="top-20 right-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="left-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <SectionHeader
              icon="verified"
              iconVariant="bronze"
              subtitle="Why Our Values"
              title="Matter"
              description="Our commitment to integrity, transparency, and excellence drives every project decision and partnership we build. These aren't just words on a wall—they're the foundation of how we do business and the promise we make to every Client Partner."
            />

            <StaggeredFadeIn className={gridPresets.cards3("md")}>
              <div className="group h-full">
                <div className="h-full flex flex-col p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="people"
                        className="text-4xl text-white"
                      />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                    For Our Partners
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Predictable, consistent experience you can count on
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Peace of mind knowing your project is in capable hands
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Long-term partnership beyond project completion
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        True ROI—the return is the relationship
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group h-full">
                <div className="h-full flex flex-col p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="location_city"
                        className="text-4xl text-white"
                      />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                    For Our Community
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Economic development supporting local suppliers
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Raising quality standards in construction industry
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Veteran support and opportunities for military families
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Building structures serving communities for generations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group h-full">
                <div className="h-full flex flex-col p-6 sm:p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-xl bg-gradient-to-br from-brand-accent to-bronze-600 p-3 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="engineering"
                        className="text-4xl text-white"
                      />
                    </div>
                  </div>
                  <h3 className="mb-4 text-center font-bold text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl">
                    For Our Team
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 flex-grow">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Professional pride in meaningful work
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Clear standards and expectations in every interaction
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Personal growth in environment valuing excellence
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        className="flex-shrink-0 mt-1 mr-3 text-brand-accent text-sm sm:text-base"
                      />
                      <span className="leading-relaxed text-sm sm:text-base md:text-lg">
                        Being part of something larger than individual projects
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Safety & Compliance Section */}
        <SafetySection />

        {/* News & Achievements Section - MERGED from Company Blog + Latest News */}
        <section
          id="news"
          className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
          <div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 lg:mb-20">
                {/* Icon Header with Glow Effect */}
                <div className="flex justify-center items-center mb-6 sm:mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                      <MaterialIcon
                        icon="article"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                  </div>
                </div>
                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    News, Insights &
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    Company Achievements
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  Stay updated with our latest projects, partnerships, industry
                  insights, and milestones from our veteran-owned team
                </p>
              </div>
            </FadeInWhenVisible>

            {/* Combined grid with best content from both sections - 6 items total */}
            <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
              {/* Company Milestone */}
              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-primary h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
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
                      50+ Successful Partnerships in Pacific Northwest
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg">
                      We&apos;re proud to announce reaching a major milestone:
                      over 50 completed construction partnerships across
                      Washington and Oregon. Thank you to all our Client
                      Partners and Trade Partners for your continued trust.
                    </p>
                    <Link
                      href="/projects"
                      className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors mt-auto"
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="rocket_launch"
                          className="text-brand-secondary"
                          size="md"
                        />
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
                      We&apos;re implementing High-Level CRM to provide seamless
                      communication, real-time project updates, and enhanced
                      Client Partner experience throughout your construction
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-accent h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="handshake"
                          className="text-brand-accent"
                          size="md"
                        />
                        <span className="font-semibold text-brand-accent text-xs sm:text-sm">
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
                      We&apos;re actively growing our network of skilled Trade
                      Partners to better serve our Client Partners across the
                      Pacific Northwest. Join our veteran-owned partnership
                      program.
                    </p>
                    <Link
                      href="/trade-partners"
                      className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors mt-auto"
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-secondary h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="workspace_premium"
                          className="text-brand-secondary"
                          size="md"
                        />
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
                      Our commitment to safety excellence has been recognized by
                      industry organizations. Zero accidents, 100% compliance -
                      that&apos;s the veteran-owned difference.
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-primary h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="lightbulb"
                          className="text-brand-primary"
                          size="md"
                        />
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
                      className="inline-flex items-center text-brand-primary hover:text-brand-accent transition-colors mt-auto"
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                <Card className="border-l-4 border-l-brand-accent h-full flex flex-col">
                  <CardContent className="pt-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="military_tech"
                          className="text-brand-accent"
                          size="md"
                        />
                        <span className="font-semibold text-brand-accent text-xs sm:text-sm">
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
                      className="inline-flex items-center text-brand-accent hover:text-brand-primary transition-colors mt-auto"
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
                  </CardContent>
                </Card>
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

        {/* Enhanced Partnership Call to Action Section */}
        <PartnershipCTA />
      </div>
    </>
  );
}
