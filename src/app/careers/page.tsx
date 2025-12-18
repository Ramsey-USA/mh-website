"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardContent,
  JobApplicationModal,
} from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import {
  openPositions,
  companyBenefits,
  veteranBenefits,
  cultureValues,
} from "@/lib/data/careers";
import { gridPresets } from "@/lib/styles/layout-variants";
import { getCardClassName } from "@/lib/styles/card-variants";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import Head from "next/head";
import { StructuredData } from "@/components/seo/seo-meta";
import { getCareersSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load heavy below-the-fold components
const ChatbotCTASection = dynamic(
  () =>
    import("@/components/chatbot").then((mod) => ({
      default: mod.ChatbotCTASection,
    })),
  { ssr: true }
);
const TestimonialGrid = dynamic(
  () =>
    import("@/components/testimonials").then((mod) => ({
      default: mod.TestimonialGrid,
    })),
  { ssr: true }
);

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export default function CareersPage() {
  // Get enhanced SEO data for Careers page
  const careersSEO = getCareersSEO();

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const handleApplyNow = (_position?: string) => {
    // Position parameter reserved for future use to pre-fill the application form
    setShowApplicationModal(true);
  };

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Careers"
        description="We're perfecting our career opportunities and benefits information to attract the best talent and accurately represent what makes MH Construction a great place to build your future."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>{careersSEO.title as string}</title>
        <meta name="description" content={careersSEO.description as string} />
        {careersSEO.keywords && (
          <meta
            name="keywords"
            content={
              Array.isArray(careersSEO.keywords)
                ? careersSEO.keywords.join(", ")
                : careersSEO.keywords
            }
          />
        )}
        <link rel="canonical" href={careersSEO.openGraph?.url as string} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={careersSEO.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={careersSEO.openGraph?.description as string}
        />
        <meta property="og:url" content={careersSEO.openGraph?.url as string} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={careersSEO.twitter?.title as string}
        />
        <meta
          name="twitter:description"
          content={careersSEO.twitter?.description as string}
        />
      </Head>

      {/* Structured Data */}
      {careersSEO.schemas && careersSEO.schemas.length > 0 && (
        <StructuredData data={careersSEO.schemas} />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.careers)
          ),
        }}
      />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section - Group 5: Recruitment & Growth */}
        <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

          {/* Content - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary">
                Occupation Specialties
              </span>
              <span className="block text-brand-primary">
                Your Future Starts Here
              </span>
              <span className="block text-white/90">
                Building careers for the employee,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar
              </span>
            </h1>
          </div>

          {/* Page-Specific Navigation Bar */}
          <PageNavigation
            items={navigationConfigs.careers}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Occupation Specialties" },
          ]}
        />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
          {/* Why Work With Us */}
          <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32">
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
                        icon="star"
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
                    Why Choose
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    MH Construction
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  This isn't just another construction job—it's a{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    career investment in YOU
                  </span>
                  . We're building your skills, your future, and your financial
                  security through{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    meaningful work, continuous training, and authentic
                    partnerships
                  </span>
                  . Every team member gets a mentor, clear advancement paths,
                  and the tools to succeed.
                </p>
              </div>

              <StaggeredFadeIn className={gridPresets.cards4("lg")}>
                {cultureValues.map((value, index) => (
                  <Card
                    key={index}
                    className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary hover:-translate-y-2 transition-all duration-300"
                  >
                    <CardContent className="flex flex-col flex-grow p-6 xs:p-7 sm:p-8 text-center">
                      <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon={value.icon}
                          size="lg"
                          className="text-brand-primary"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-lg">
                        {value.title}
                      </h3>
                      <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>
            </div>
          </section>

          {/* Benefits & Perks */}
          <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32">
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
                        icon="volunteer_activism"
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
                    Employee Benefits
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    & Perks
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Your{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    well-being and success matter here
                  </span>
                  . We offer competitive pay plus comprehensive benefits because
                  we know you're building a life, not just a career. From health
                  coverage to{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    professional development, retirement planning to performance
                    bonuses
                  </span>
                  —we invest in your total success.
                </p>
              </div>

              <StaggeredFadeIn className={gridPresets.cards3("md")}>
                {companyBenefits.map((benefit, index) => (
                  <Card
                    key={index}
                    className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-secondary transition-all duration-300"
                  >
                    <CardContent className="flex flex-col flex-grow p-6 xs:p-7 sm:p-8">
                      <div className="mb-4">
                        <MaterialIcon
                          icon={benefit.icon}
                          size="xl"
                          className="text-brand-primary mb-3"
                        />
                        <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-lg">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>
            </div>
          </section>

          {/* Veteran Benefits Section */}
          <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32">
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
              <FadeInWhenVisible>
                <div>
                  {/* Section Header - Military Construction Standard */}
                  <div className="mb-16 sm:mb-20 text-center">
                    {/* Icon with decorative lines */}
                    <div className="flex items-center justify-center mb-8 gap-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                          <MaterialIcon
                            icon="military_tech"
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
                        Supporting Our
                      </span>
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                        Veterans
                      </span>
                    </h2>

                    {/* Description with colored keyword highlighting */}
                    <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                      <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                        Veteran-owned, veteran-led, veteran-proud
                      </span>
                      . Your military experience translates directly to
                      construction excellence: discipline becomes precision,
                      teamwork becomes partnership. We don't just hire
                      veterans—we{" "}
                      <span className="font-bold text-gray-900 dark:text-white">
                        celebrate your service, honor your skills, and build
                        careers
                      </span>{" "}
                      that match your dedication. Welcome home.
                    </p>
                  </div>

                  <StaggeredFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {veteranBenefits.map((benefit, index) => (
                      <Card
                        key={index}
                        className={getCardClassName(
                          "default",
                          "bg-white dark:bg-gray-800"
                        )}
                      >
                        <CardContent className="p-6">
                          <MaterialIcon
                            icon={benefit.icon}
                            size="lg"
                            className="text-brand-primary mb-3"
                          />
                          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100 text-base">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </StaggeredFadeIn>

                  <FadeInWhenVisible>
                    <div className="mt-10 text-center">
                      <p className="mb-6 font-medium text-gray-700 text-lg dark:text-gray-300">
                        Veterans receive priority consideration for all
                        positions
                      </p>
                      <div className="flex sm:flex-row flex-col justify-center gap-6 mt-10">
                        <Button
                          onClick={() => handleApplyNow("Veteran Application")}
                          variant="primary"
                          size="lg"
                          className="transition-all duration-300 min-w-[260px]"
                        >
                          <MaterialIcon
                            icon="military_tech"
                            size="lg"
                            theme="veteran"
                            ariaLabel="Veteran Application"
                            className="mr-3"
                          />
                          <span className="font-medium">Apply as Veteran</span>
                        </Button>
                        <Link href="/veterans">
                          <Button
                            variant="outline"
                            size="lg"
                            className="transition-all duration-300 min-w-[260px]"
                          >
                            <MaterialIcon
                              icon="info"
                              size="lg"
                              theme="military"
                              ariaLabel="Veterans Initiative"
                              className="mr-3"
                            />
                            <span className="font-medium">
                              Veterans Initiative
                            </span>
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button
                            variant="outline"
                            size="lg"
                            className="transition-all duration-300 min-w-[260px]"
                          >
                            <MaterialIcon
                              icon="campaign"
                              size="lg"
                              theme="military"
                              ariaLabel="Contact Liaison"
                              className="mr-3"
                            />
                            <span className="font-medium">
                              Contact Veteran Liaison
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </FadeInWhenVisible>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>

          {/* Open Positions */}
          <section
            id="positions"
            className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32"
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
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="work"
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
                    Current Career
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Opportunities
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Your next career chapter starts here. These aren't just job
                  openings—they're{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    gateways to your future
                  </span>
                  . Every position offers{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    competitive pay, comprehensive training, clear advancement
                    paths
                  </span>
                  , and the chance to build something meaningful. Veterans
                  receive priority consideration.
                </p>
              </div>

              <StaggeredFadeIn className="space-y-6">
                {openPositions.map((position, _index) => (
                  <Card
                    key={_index}
                    className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-secondary transition-all duration-300"
                  >
                    <CardContent className="p-8">
                      <div className="flex sm:flex-row flex-col justify-between items-start mb-6">
                        <div className="flex-grow">
                          <h3 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-2xl">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 mb-4">
                            <span className="flex items-center text-gray-600 dark:text-gray-300">
                              <MaterialIcon
                                icon="business"
                                className="mr-1"
                                size="sm"
                              />
                              {position.department}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-300">
                              <MaterialIcon
                                icon="location_on"
                                className="mr-1"
                                size="sm"
                              />
                              {position.location}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-300">
                              <MaterialIcon
                                icon="schedule"
                                className="mr-1"
                                size="sm"
                              />
                              {position.type}
                            </span>
                            <span className="flex items-center text-gray-600 dark:text-gray-300">
                              <MaterialIcon
                                icon="work"
                                className="mr-1"
                                size="sm"
                              />
                              {position.experience}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {position.description}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-6">
                          <Button
                            onClick={() => handleApplyNow(position.title)}
                            variant="primary"
                            size="lg"
                            className="transition-all duration-300 min-w-[180px]"
                          >
                            <MaterialIcon
                              icon="send"
                              size="lg"
                              className="mr-3"
                            />
                            Apply Now
                          </Button>
                        </div>
                      </div>

                      <div className={gridPresets.twoColumn("lg")}>
                        <div>
                          <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                            Requirements
                          </h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                              >
                                <MaterialIcon
                                  icon="check_circle"
                                  className="flex-shrink-0 mt-0.5 mr-2 text-brand-primary"
                                  size="sm"
                                />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
                            What We Offer
                          </h4>
                          <ul className="space-y-2">
                            {position.benefits.map((benefit, benefitIndex) => (
                              <li
                                key={benefitIndex}
                                className="flex items-start text-gray-600 dark:text-gray-300 text-sm"
                              >
                                <MaterialIcon
                                  icon="star"
                                  className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                                  size="sm"
                                />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredFadeIn>
            </div>
          </section>

          {/* Application Process Guide Section */}
          <section
            id="application-process"
            className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32"
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
              <FadeInWhenVisible>
                <div>
                  {/* Section Header - Military Construction Standard */}
                  <div className="mb-16 sm:mb-20 text-center">
                    {/* Icon with decorative lines */}
                    <div className="flex items-center justify-center mb-8 gap-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                          <MaterialIcon
                            icon="how_to_reg"
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
                        Your Journey to
                      </span>
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                        Join Our Team
                      </span>
                    </h2>

                    {/* Description with colored keyword highlighting */}
                    <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                      <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                        No games, no ghosting, no endless waiting
                      </span>
                      . Our hiring process is transparent, efficient, and
                      respectful of YOUR time—because we know you're evaluating
                      us just as much. Fast-track options available for
                      exceptional candidates.{" "}
                      <span className="font-bold text-gray-900 dark:text-white">
                        Most offers extended within 2-3 weeks
                      </span>
                      .
                    </p>
                  </div>

                  <div className="gap-8 grid grid-cols-1 lg:grid-cols-5 mb-12">
                    {/* Step 1: Submit Application */}
                    <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mb-4 rounded-full w-14 h-14">
                        <span className="font-black text-2xl text-white">
                          1
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="description"
                          size="lg"
                          className="text-primary-600 dark:text-primary-400"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                        Submit Application
                      </h3>
                      <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                        Complete our online application form or email your
                        resume to careers@mhc-gc.com. Include relevant
                        certifications and references.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="schedule"
                            size="sm"
                            className="text-accent-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            Response within 3-5 business days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Phone Screening */}
                    <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mb-4 rounded-full w-14 h-14">
                        <span className="font-black text-2xl text-white">
                          2
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="phone"
                          size="lg"
                          className="text-secondary-600 dark:text-secondary-400"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                        Phone Screening
                      </h3>
                      <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                        Brief 15-20 minute phone conversation to discuss your
                        background, career goals, and answer initial questions.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="schedule"
                            size="sm"
                            className="text-accent-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            15-20 minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: In-Person Interview */}
                    <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mb-4 rounded-full w-14 h-14">
                        <span className="font-black text-2xl text-white">
                          3
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-accent-100 dark:bg-accent-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="groups"
                          size="lg"
                          className="text-accent-600 dark:text-accent-400"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                        In-Person Interview
                      </h3>
                      <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                        Meet our team at our office or job site. Discuss your
                        technical skills, safety mindset, and cultural fit.
                        Questions encouraged!
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="schedule"
                            size="sm"
                            className="text-accent-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            45-60 minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Background Check */}
                    <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mb-4 rounded-full w-14 h-14">
                        <span className="font-black text-2xl text-white">
                          4
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="verified_user"
                          size="lg"
                          className="text-primary-600 dark:text-primary-400"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                        Background Check
                      </h3>
                      <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                        Standard background and reference checks to verify
                        employment history and qualifications. Drug screening
                        may be required.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="schedule"
                            size="sm"
                            className="text-accent-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            3-7 business days
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 5: Offer & Onboarding */}
                    <div className="h-full flex flex-col relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300">
                      <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mb-4 rounded-full w-14 h-14">
                        <span className="font-black text-2xl text-white">
                          5
                        </span>
                      </div>
                      <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-4 rounded-full w-16 h-16">
                        <MaterialIcon
                          icon="celebration"
                          size="lg"
                          className="text-secondary-600 dark:text-secondary-400"
                        />
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-gray-100 text-xl">
                        Offer & Onboarding
                      </h3>
                      <p className="flex-grow mb-4 text-gray-600 text-sm dark:text-gray-300 leading-relaxed">
                        Receive formal offer, complete paperwork, and begin
                        orientation. Meet your mentor, get safety training, and
                        start building your career.
                      </p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <MaterialIcon
                            icon="schedule"
                            size="sm"
                            className="text-accent-600"
                          />
                          <span className="text-gray-600 dark:text-gray-400">
                            1-2 weeks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Details */}
                  <FadeInWhenVisible>
                    <div className="bg-white dark:bg-gray-800 shadow-md mt-12 p-8 rounded-xl">
                      <h3 className="mb-6 font-bold text-center text-gray-900 text-xl dark:text-gray-100">
                        What to Expect Timeline
                      </h3>
                      <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                        <div className="text-center">
                          <div className="flex justify-center items-center bg-primary-100 dark:bg-primary-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                            <MaterialIcon
                              icon="flash_on"
                              size="md"
                              className="text-primary-600"
                            />
                          </div>
                          <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                            Fast-Track Available
                          </h4>
                          <p className="text-gray-600 text-sm dark:text-gray-300">
                            Exceptional candidates with urgent availability may
                            complete the process in 1 week
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center items-center bg-secondary-100 dark:bg-secondary-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                            <MaterialIcon
                              icon="verified"
                              size="md"
                              className="text-secondary-600"
                            />
                          </div>
                          <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                            Standard Process
                          </h4>
                          <p className="text-gray-600 text-sm dark:text-gray-300">
                            Most candidates complete the full process in 2-3
                            weeks from application to offer
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="flex justify-center items-center bg-accent-100 dark:bg-accent-900/30 mx-auto mb-3 rounded-full w-12 h-12">
                            <MaterialIcon
                              icon="support_agent"
                              size="md"
                              className="text-accent-600"
                            />
                          </div>
                          <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
                            Always Transparent
                          </h4>
                          <p className="text-gray-600 text-sm dark:text-gray-300">
                            We keep you informed at every stage and are always
                            available for your questions
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeInWhenVisible>

                  {/* CTA Section */}
                  <div className="mt-12 text-center">
                    <p className="mb-6 font-medium text-gray-700 text-xl dark:text-gray-300">
                      Ready to start your journey with MH Construction?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        onClick={() => {
                          const positionsSection =
                            document.getElementById("positions");
                          positionsSection?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        variant="primary"
                        size="lg"
                      >
                        <MaterialIcon
                          icon="badge"
                          size="md"
                          theme="military"
                          ariaLabel="Open Positions"
                          className="mr-2"
                        />
                        View Open Positions
                      </Button>
                      <Button
                        onClick={() => {
                          window.location.href = "mailto:careers@mhc-gc.com";
                        }}
                        variant="secondary"
                        size="lg"
                      >
                        <MaterialIcon
                          icon="mark_email_read"
                          size="md"
                          theme="military"
                          ariaLabel="Email Resume"
                          className="mr-2"
                        />
                        Email Your Resume
                      </Button>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>

          {/* Employee Testimonials */}
          <section
            id="testimonials"
            className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32"
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
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="groups"
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
                    Hear From Our
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Team Members
                  </span>
                </h2>

                {/* Description with colored keyword highlighting */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Don't just take our word for it—hear directly from{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    the people who work here every day
                  </span>
                  . Real stories from real team members about{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    career growth, workplace culture, and leadership support
                  </span>
                  . These aren't scripted testimonials—they're authentic voices.
                </p>
              </div>

              <TestimonialGrid testimonials={getEmployeeTestimonials()} />
            </div>
          </section>

          {/* General Application Section */}
          <section
            id="general-application"
            className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32"
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
              <FadeInWhenVisible>
                <div className="text-center">
                  {/* Section Header - Military Construction Standard */}
                  <div className="mb-16 sm:mb-20 text-center">
                    {/* Icon with decorative lines */}
                    <div className="flex items-center justify-center mb-8 gap-4">
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                        <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                          <MaterialIcon
                            icon="person_search"
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
                        Don't See the
                      </span>
                      <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                        Perfect Role?
                      </span>
                    </h2>

                    {/* Description with colored keyword highlighting */}
                    <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                      Your perfect role might not exist yet—but{" "}
                      <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                        your FUTURE does
                      </span>
                      . We're always seeking exceptional people who share our
                      values: military precision, partnership mindset, quality
                      obsession. If you bring{" "}
                      <span className="font-bold text-gray-900 dark:text-white">
                        dedication and potential, we'll invest in your growth
                      </span>
                      . Tell us your story.
                    </p>
                  </div>

                  {/* CTA Buttons - Brand Standards */}
                  <div className="flex sm:flex-row flex-col justify-center gap-6">
                    <Button
                      onClick={() => handleApplyNow("General Application")}
                      variant="primary"
                      size="lg"
                      className="transition-all duration-300 min-w-[260px]"
                    >
                      <MaterialIcon
                        icon="description"
                        size="lg"
                        theme="military"
                        ariaLabel="Submit Application"
                        className="mr-3"
                      />
                      <span className="font-medium">Submit Application</span>
                    </Button>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon
                          icon="campaign"
                          size="lg"
                          theme="military"
                          ariaLabel="Contact HR"
                          className="mr-3"
                        />
                        <span className="font-medium">Contact HR</span>
                      </Button>
                    </Link>
                  </div>
                  <p className="mt-8 text-gray-500 dark:text-gray-400 text-lg">
                    <MaterialIcon
                      icon="call"
                      size="sm"
                      theme="military"
                      ariaLabel="HR Phone"
                      className="inline mr-2"
                    />
                    HR Hotline: (509) 308-6489 |{" "}
                    <a
                      href="mailto:office@mhc-gc.com"
                      className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                    >
                      office@mhc-gc.com
                    </a>
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
          </section>
        </div>

        {/* Chatbot CTA - Career Questions */}
        <ChatbotCTASection
          context="careers"
          title="Questions About Careers?"
          subtitle="Chat with General MH for instant answers about jobs, benefits, hiring process, and growth opportunities"
          exampleQuestions={[
            "What is your hiring process?",
            "Do you have veteran benefits?",
            "What are the pay ranges?",
            "How do I apply?",
            "What are career growth opportunities?",
          ]}
        />

        {/* Job Application Modal */}
        <JobApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      </div>
    </>
  );
}
