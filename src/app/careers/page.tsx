"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, JobApplicationModal } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { getEmployeeTestimonials } from "@/lib/data/testimonials";
import {
  openPositions,
  companyBenefits,
  veteranBenefits,
  cultureValues,
} from "@/lib/data/careers";
import { COMPANY_INFO } from "@/lib/constants/company";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import { getCareersSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load heavy below-the-fold components
const TestimonialGrid = dynamic(
  () =>
    import("@/components/testimonials").then((mod) => ({
      default: mod.TestimonialGrid,
    })),
  { ssr: true },
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

      {/* Structured Data */}
      {careersSEO.schemas && careersSEO.schemas.length > 0 && (
        <StructuredData data={careersSEO.schemas} />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.careers),
          ),
        }}
      />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
          {/* Background - Ready for photo or video */}
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
                  icon="work"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Occupation Specialties - Career opportunities"
                />
              </div>
            </div>
            <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                Enlist → Careers
              </span>
              <span className="block text-brand-secondary">
                Occupation Specialties
              </span>
              <span className="block text-brand-primary">
                Build Your Future with a Veteran-Owned Team
              </span>
              <span className="block text-white/90">
                Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar
              </span>
              <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                THE ROI IS THE RELATIONSHIP
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

        {/* Why Work With Us */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                . Every team member gets a mentor, clear advancement paths, and
                the tools to succeed.
              </p>

              {/* Core Philosophy Callout */}
              <div className="inline-block mt-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-xl">
                    <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
                      "THE ROI IS THE RELATIONSHIP"
                    </p>
                    <p className="text-brand-secondary dark:text-brand-secondary-light text-sm sm:text-base font-semibold text-center mt-2">
                      Where partnerships outlast projects and your growth is our
                      success
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impressive Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
              <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-brand-primary/10 dark:to-brand-primary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-black text-brand-primary dark:text-brand-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                  150+
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Years Combined Experience
                </div>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-brand-secondary/5 to-bronze-700/10 dark:from-brand-secondary/10 dark:to-bronze-700/20 rounded-xl border border-brand-secondary/20 hover:border-brand-secondary transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-black text-brand-secondary dark:text-brand-secondary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                  .64
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  EMR Safety Rating
                </div>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-bronze-700/5 to-bronze-800/10 dark:from-bronze-700/10 dark:to-bronze-800/20 rounded-xl border border-bronze-700/20 hover:border-bronze-700 transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-black text-bronze-700 dark:text-bronze-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Mentorship Program
                </div>
              </div>
              <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/10 dark:from-brand-primary/10 dark:to-brand-secondary/20 rounded-xl border border-brand-primary/20 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                <div className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  70%
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Referral Business
                </div>
              </div>
            </div>

            {/* Modern Grid Cards with Unique Hover Effects */}
            <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
              {cultureValues.map((value) => (
                <div
                  key={value.title}
                  className="group relative flex h-full min-h-[400px]"
                >
                  {/* Colored Border Glow - Visible on hover */}
                  <div
                    className={`absolute -inset-2 bg-gradient-to-br ${value.color} rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse`}
                  ></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div
                      className={`h-2 bg-gradient-to-r ${value.color}`}
                    ></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      {/* Icon Section */}
                      <div className="mb-5">
                        {/* Enhanced Icon with Header Style */}
                        <div className="relative inline-block">
                          {/* Blur glow layer behind icon */}
                          <div
                            className={`absolute -inset-2 bg-gradient-to-br ${value.color} opacity-30 blur-lg rounded-2xl`}
                          ></div>
                          <div
                            className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300`}
                          >
                            <MaterialIcon
                              icon={value.icon}
                              size="xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-4 font-black text-gray-900 dark:text-white text-xl sm:text-2xl leading-tight">
                        {value.title}
                      </h3>

                      {/* Description */}
                      <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Benefits & Perks */}
        <section className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Build your future with a veteran-owned team that values
                  loyalty
                </span>
                . Your well-being and success matter here—we offer competitive
                pay plus comprehensive benefits because we know you're building
                a life, not just a career. From health coverage to{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  professional development, retirement planning to performance
                  bonuses
                </span>
                —we invest in your total success as part of our mission.
              </p>
            </div>

            {/* Modern Grid Cards with Unique Hover Effects */}
            <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {companyBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="group relative flex h-full min-h-[320px]"
                >
                  {/* Colored Border Glow - Visible on hover */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8 flex flex-col flex-1">
                      {/* Icon Section */}
                      <div className="mb-5">
                        {/* Enhanced Icon with Header Style */}
                        <div className="relative inline-block">
                          {/* Blur glow layer behind icon */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-2xl"></div>
                          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300">
                            <MaterialIcon
                              icon={benefit.icon}
                              size="xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 font-black text-gray-900 dark:text-white text-xl sm:text-2xl leading-tight">
                        {benefit.title}
                      </h3>

                      {/* Description */}
                      <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Employee Testimonials - Optimal SEO position (25-30% page depth) */}
        <section
          id="testimonials"
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

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

        {/* Veteran Benefits Section */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                    teamwork becomes partnership. We don't just hire veterans—we{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      celebrate your service, honor your skills, and build
                      careers
                    </span>{" "}
                    that match your dedication.
                  </p>

                  {/* Veteran Pride Callout */}
                  <div className="inline-block mt-8">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                      <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/30 dark:border-brand-primary/40 shadow-xl">
                        <p className="font-black text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed flex items-center justify-center gap-3">
                          <MaterialIcon
                            icon="military_tech"
                            size="lg"
                            className="text-brand-primary"
                          />
                          WELCOME HOME, BROTHER. WELCOME HOME, SISTER.
                          <MaterialIcon
                            icon="military_tech"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Veteran Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto">
                  <div className="group text-center p-6 bg-gradient-to-br from-brand-primary/10 to-brand-primary/20 dark:from-brand-primary/20 dark:to-brand-primary/30 rounded-xl border-2 border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                    <MaterialIcon
                      icon="stars"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="text-3xl sm:text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                      Priority
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Consideration
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      All Positions
                    </p>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-brand-secondary/10 to-bronze-700/20 dark:from-brand-secondary/20 dark:to-bronze-700/30 rounded-xl border-2 border-brand-secondary/30 hover:border-brand-secondary transition-all duration-300 hover:scale-105">
                    <MaterialIcon
                      icon="shield"
                      size="2xl"
                      className="text-brand-secondary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="text-3xl sm:text-4xl font-black text-brand-secondary dark:text-brand-secondary-light mb-2">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Military-Friendly
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Workplace Culture
                    </p>
                  </div>
                  <div className="group text-center p-6 bg-gradient-to-br from-bronze-700/10 to-bronze-800/20 dark:from-bronze-700/20 dark:to-bronze-800/30 rounded-xl border-2 border-bronze-700/30 hover:border-bronze-700 transition-all duration-300 hover:scale-105">
                    <MaterialIcon
                      icon="flag"
                      size="2xl"
                      className="text-bronze-700 dark:text-bronze-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="text-3xl sm:text-4xl font-black text-bronze-700 dark:text-bronze-400 mb-2">
                      All Branches
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Welcome Here
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                      Army • Navy • Marines • Air Force • Coast Guard • Space
                      Force
                    </p>
                  </div>
                </div>

                {/* Modern Grid Cards with Unique Hover Effects */}
                <StaggeredFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                  {veteranBenefits.map((benefit) => (
                    <div
                      key={benefit.title}
                      className="group relative flex h-full min-h-[280px]"
                    >
                      {/* Colored Border Glow - Visible on hover */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                      <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                        {/* Top Accent Bar */}
                        <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                        <div className="p-6 sm:p-8 flex flex-col flex-1">
                          {/* Icon Section */}
                          <div className="mb-4">
                            {/* Enhanced Icon with Header Style */}
                            <div className="relative inline-block">
                              {/* Blur glow layer behind icon */}
                              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300">
                                <MaterialIcon
                                  icon={benefit.icon}
                                  size="lg"
                                  className="text-white drop-shadow-lg"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="mb-3 font-black text-gray-900 dark:text-white text-lg sm:text-xl leading-tight">
                            {benefit.title}
                          </h3>

                          {/* Description */}
                          <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </StaggeredFadeIn>

                {/* Enhanced CTA Section */}
                <FadeInWhenVisible>
                  <div className="relative">
                    {/* Background gradient box */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-primary-dark/10 dark:from-brand-primary/10 dark:to-brand-primary-dark/20 rounded-2xl"></div>

                    <div className="relative p-8 sm:p-10 text-center border-2 border-brand-primary/20 dark:border-brand-primary/30 rounded-2xl">
                      <MaterialIcon
                        icon="military_tech"
                        size="3xl"
                        className="text-brand-primary mx-auto mb-6"
                      />
                      <h3 className="mb-4 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl">
                        Veterans Receive Priority Consideration
                      </h3>
                      <p className="mb-8 font-medium text-gray-700 dark:text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
                        Your service matters. Your skills translate. Your
                        experience is valued.
                        <br />
                        <span className="text-brand-primary dark:text-brand-primary-light font-bold">
                          Start your next mission with us.
                        </span>
                      </p>
                      <div className="flex sm:flex-row flex-col justify-center gap-4 sm:gap-6">
                        <Button
                          onClick={() => handleApplyNow("Veteran Application")}
                          variant="primary"
                          size="lg"
                          className="transition-all duration-300 min-w-[260px] shadow-xl hover:shadow-2xl"
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
                      </div>
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
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                , and the chance to build something meaningful. Veterans receive
                priority consideration.
              </p>
            </div>

            <StaggeredFadeIn className="space-y-8">
              {openPositions.map((position, _index) => (
                <div key={_index} className="group relative">
                  {/* Colored Border Glow - Visible on hover */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-6 sm:p-8">
                      {/* Header Section with Title and Apply Button */}
                      <div className="flex sm:flex-row flex-col justify-between items-start gap-6 mb-6">
                        <div className="flex-grow">
                          {/* Job Title with Icon */}
                          <div className="flex items-start gap-4 mb-4">
                            <div className="relative flex-shrink-0">
                              <div className="absolute -inset-1 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-xl"></div>
                              <div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-xl shadow-lg group-hover:scale-110 transition-all duration-300">
                                <MaterialIcon
                                  icon="badge"
                                  size="lg"
                                  className="text-white drop-shadow-lg"
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="mb-2 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl leading-tight">
                                {position.title}
                              </h3>
                              {/* Metadata Pills */}
                              <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary-light rounded-full text-xs font-semibold">
                                  <MaterialIcon icon="business" size="xs" />
                                  {position.department}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-secondary/10 dark:bg-brand-secondary/20 text-brand-secondary dark:text-brand-secondary-light rounded-full text-xs font-semibold">
                                  <MaterialIcon icon="location_on" size="xs" />
                                  {position.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bronze-700/10 dark:bg-bronze-700/20 text-bronze-700 dark:text-bronze-400 rounded-full text-xs font-semibold">
                                  <MaterialIcon icon="schedule" size="xs" />
                                  {position.type}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-semibold">
                                  <MaterialIcon icon="work" size="xs" />
                                  {position.experience}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                            {position.description}
                          </p>
                        </div>

                        {/* Apply Button - Desktop Sticky */}
                        <div className="flex-shrink-0 w-full sm:w-auto">
                          <Button
                            onClick={() => handleApplyNow(position.title)}
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto transition-all duration-300 min-w-[200px] shadow-lg hover:shadow-xl group/btn"
                          >
                            <MaterialIcon
                              icon="send"
                              size="md"
                              className="mr-2 group-hover/btn:translate-x-1 transition-transform duration-300"
                            />
                            Apply Now
                          </Button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-6"></div>

                      {/* Requirements and Benefits Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Requirements */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center">
                              <MaterialIcon
                                icon="checklist"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <h4 className="font-black text-gray-900 dark:text-gray-100 text-lg">
                              Requirements
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {position.requirements.map((req, reqIndex) => (
                              <li
                                key={reqIndex}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-brand-primary to-brand-primary-dark flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                                  <MaterialIcon
                                    icon="check"
                                    className="text-white text-xs"
                                  />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {req}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* What We Offer */}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center">
                              <MaterialIcon
                                icon="workspace_premium"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <h4 className="font-black text-gray-900 dark:text-gray-100 text-lg">
                              What We Offer
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {position.benefits.map((benefit, benefitIndex) => (
                              <li
                                key={benefitIndex}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-brand-secondary to-bronze-700 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                                  <MaterialIcon
                                    icon="star"
                                    className="text-white text-xs"
                                  />
                                </div>
                                <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {benefit}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Application Process Guide Section */}
        <section
          id="application-process"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                    respectful of YOUR time—because we know you're evaluating us
                    just as much. Fast-track options available for exceptional
                    candidates.{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      Most offers extended within 2-3 weeks
                    </span>
                    .
                  </p>
                </div>

                {/* Timeline - Vertical Alternating Layout */}
                <div className="relative max-w-6xl mx-auto">
                  {/* Vertical Connecting Line */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

                  {/* Timeline Steps - Desktop Alternating */}
                  <div className="space-y-12 lg:space-y-20">
                    {[
                      {
                        num: 1,
                        icon: "description",
                        title: "Submit Application",
                        desc: "Complete our online application form or email your resume to careers@mhc-gc.com. Include relevant certifications and references. Response within 3-5 business days.",
                        position: "left",
                      },
                      {
                        num: 2,
                        icon: "phone",
                        title: "Phone Screening",
                        desc: "Brief 15-20 minute phone conversation to discuss your background, career goals, and answer initial questions about the position.",
                        position: "right",
                      },
                      {
                        num: 3,
                        icon: "groups",
                        title: "In-Person Interview",
                        desc: "Meet our team at our office or job site. Discuss your technical skills, safety mindset, and cultural fit. Questions encouraged! 45-60 minutes.",
                        position: "left",
                      },
                      {
                        num: 4,
                        icon: "verified_user",
                        title: "Background Check",
                        desc: "Standard background and reference checks to verify employment history and qualifications. Drug screening may be required. 3-7 business days.",
                        position: "right",
                      },
                      {
                        num: 5,
                        icon: "celebration",
                        title: "Offer & Onboarding",
                        desc: "Receive formal offer, complete paperwork, and begin orientation. Meet your mentor, get safety training, and start building your career. 1-2 weeks.",
                        position: "left",
                      },
                    ].map((step, index) => (
                      <div
                        key={step.num}
                        className="relative group scroll-reveal"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex items-center gap-8">
                          {step.position === "left" ? (
                            <>
                              {/* Content Left */}
                              <div className="flex-1 text-right">
                                <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                                  <div className="flex items-center justify-end gap-4 mb-4">
                                    <div>
                                      <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                        {step.title}
                                      </h3>
                                    </div>
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                      <MaterialIcon
                                        icon={step.icon}
                                        size="xl"
                                        className="text-white"
                                      />
                                    </div>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>

                              {/* Center Circle */}
                              <div className="flex-shrink-0 relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                                  {step.num}
                                </div>
                              </div>

                              {/* Empty Right */}
                              <div className="flex-1"></div>
                            </>
                          ) : (
                            <>
                              {/* Empty Left */}
                              <div className="flex-1"></div>

                              {/* Center Circle */}
                              <div className="flex-shrink-0 relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                                  {step.num}
                                </div>
                              </div>

                              {/* Content Right */}
                              <div className="flex-1 text-left">
                                <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                                  <div className="flex items-center gap-4 mb-4">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                      <MaterialIcon
                                        icon={step.icon}
                                        size="xl"
                                        className="text-white"
                                      />
                                    </div>
                                    <div>
                                      <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
                                        {step.title}
                                      </h3>
                                    </div>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden flex gap-4">
                          {/* Left Side - Number and Line */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`w-16 h-16 ${
                                step.num === 5
                                  ? "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                                  : "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                              } rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
                            >
                              {step.num}
                            </div>
                            {index < 4 && (
                              <div className="w-1 flex-1 bg-gradient-to-b from-brand-primary to-brand-secondary mt-2 min-h-[60px]"></div>
                            )}
                          </div>

                          {/* Right Side - Card */}
                          <div className="flex-1 pb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary dark:hover:border-brand-primary-light">
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`flex-shrink-0 w-14 h-14 ${
                                    step.num === 5
                                      ? "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                                      : "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                                  } rounded-xl flex items-center justify-center shadow-lg`}
                                >
                                  <MaterialIcon
                                    icon={step.icon}
                                    size="lg"
                                    className="text-white"
                                  />
                                </div>
                                <h3 className="font-black text-gray-900 dark:text-white text-xl">
                                  {step.title}
                                </h3>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Details */}
                <FadeInWhenVisible>
                  <div className="mt-16">
                    <h3 className="mb-8 font-black text-center text-gray-900 dark:text-white text-2xl sm:text-3xl">
                      What to Expect Timeline
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                      {/* Fast-Track Card */}
                      <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
                          <div className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                              <div className="relative flex justify-center items-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-xl mx-auto group-hover:scale-110 transition-transform duration-300">
                                <MaterialIcon
                                  icon="flash_on"
                                  size="xl"
                                  className="text-white drop-shadow-lg"
                                />
                              </div>
                            </div>
                            <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                              Fast-Track Available
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              Exceptional candidates with urgent availability
                              may complete the process in{" "}
                              <span className="font-bold text-brand-primary">
                                1 week
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Standard Process Card */}
                      <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>
                          <div className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                              <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-2xl"></div>
                              <div className="relative flex justify-center items-center w-16 h-16 bg-gradient-to-br from-brand-secondary to-bronze-700 rounded-2xl shadow-xl mx-auto group-hover:scale-110 transition-transform duration-300">
                                <MaterialIcon
                                  icon="verified"
                                  size="xl"
                                  className="text-white drop-shadow-lg"
                                />
                              </div>
                            </div>
                            <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                              Standard Process
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              Most candidates complete the full process in{" "}
                              <span className="font-bold text-brand-secondary">
                                2-3 weeks
                              </span>{" "}
                              from application to offer
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Always Transparent Card */}
                      <div className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-br from-bronze-700/40 to-bronze-800/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                          <div className="h-2 bg-gradient-to-r from-bronze-700 via-bronze-800 to-gray-700"></div>
                          <div className="p-6 text-center">
                            <div className="relative inline-block mb-4">
                              <div className="absolute -inset-2 bg-gradient-to-br from-bronze-700/40 to-bronze-800/40 opacity-30 blur-lg rounded-2xl"></div>
                              <div className="relative flex justify-center items-center w-16 h-16 bg-gradient-to-br from-bronze-700 to-bronze-800 rounded-2xl shadow-xl mx-auto group-hover:scale-110 transition-transform duration-300">
                                <MaterialIcon
                                  icon="support_agent"
                                  size="xl"
                                  className="text-white drop-shadow-lg"
                                />
                              </div>
                            </div>
                            <h4 className="mb-3 font-black text-gray-900 dark:text-white text-xl">
                              Always Transparent
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                              We keep you informed at every stage and are always
                              available for your{" "}
                              <span className="font-bold text-bronze-700 dark:text-bronze-400">
                                questions
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeInWhenVisible>

                {/* CTA Section */}
                <div className="mt-12 text-center">
                  <p className="mb-6 font-medium text-gray-700 text-xl dark:text-gray-300">
                    Ready to start your journey with MH Construction?
                  </p>
                  <p className="mb-6 font-semibold text-brand-secondary text-lg dark:text-brand-secondary-light">
                    THE ROI IS THE RELATIONSHIP — Build your career on a
                    foundation of trust
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

        {/* General Application Section */}
        <section
          id="general-application"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

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
                  HR Hotline: {COMPANY_INFO.phone.display} |{" "}
                  <a
                    href={`mailto:${COMPANY_INFO.email.main}`}
                    className="font-semibold text-brand-primary hover:text-brand-secondary underline"
                  >
                    {COMPANY_INFO.email.main}
                  </a>
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Contact CTA - Career Questions */}
        <section className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
              Questions About Careers?
            </h2>
            <p className="mx-auto max-w-3xl font-light text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8">
              Contact our team for information about jobs, benefits, hiring
              process, and growth opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  <MaterialIcon icon="email" className="mr-2" />
                  Contact HR
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <a href={`tel:${COMPANY_INFO.phone.tel}`}>
                  <MaterialIcon icon="call" className="mr-2" />
                  Call {COMPANY_INFO.phone.display}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Job Application Modal */}
        <JobApplicationModal
          isOpen={showApplicationModal}
          onClose={() => setShowApplicationModal(false)}
        />
      </div>
    </>
  );
}
