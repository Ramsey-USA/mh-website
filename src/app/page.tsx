"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";

// Enhanced SEO for veteran-owned construction with traditional values
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";

// Homepage sections - Critical above-the-fold content
import {
  HeroSection,
  CoreValuesSection,
  ServicesShowcase,
  WhyPartnerSection,
} from "@/components/home";
import { CompanyStats } from "@/components/about/CompanyStats";

// Shared sections - Lazy load below-the-fold content
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

import Head from "next/head";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { useImagePreloader } from "@/hooks/usePerformanceOptimization";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";

export default function Home() {
  // Initialize analytics
  const { trackEvent } = useAnalytics();

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();

  // Preload critical images for better performance
  const criticalImages = [
    "/images/placeholder.jpg",
    "/images/logo/mh-logo.png",
  ];

  // Preload critical images for performance
  useImagePreloader(criticalImages);

  // Track page view
  useEffect(() => {
    trackEvent("page_view", {
      page_name: "homepage",
      page_location: "/",
      content_group1: "marketing",
    });
  }, [trackEvent]);

  // Track scroll depth for engagement analytics with custom hook
  useScrollDepthTracking("homepage");

  return (
    <>
      {/* Enhanced SEO structured data for veteran-owned construction excellence */}
      <StructuredData data={homepageSEO.schemas} />

      <Head>
        <title>
          MH Construction - Veteran-Owned Integrity & Honest Communication |
          Tri-Cities WA
        </title>
        <meta
          name="description"
          content="Veteran-owned construction management since January 2025. Honest communication, transparent pricing, proven craftsmanship. Specializing in commercial construction, master planning, tenant improvements, and light industrial projects. Four core values—Honesty, Integrity, Professionalism, Thoroughness—building trust through face-to-face consultation and lasting relationships. Serving Pacific Northwest communities."
        />
        <meta
          name="keywords"
          content="veteran-owned construction, honest communication construction, transparent pricing construction, proven craftsmanship, construction management services, commercial construction services, master planning preconstruction, tenant improvement services, light industrial construction, face-to-face consultation, service-earned values, Tri-Cities construction, Pasco construction, Kennewick construction, Honesty Integrity Professionalism Thoroughness, trust-based partnerships"
        />
        <meta
          property="og:title"
          content="MH Construction - Veteran-Owned Integrity & Honest Communication | Tri-Cities WA"
        />
        <meta
          property="og:description"
          content="Veteran-owned since January 2025. Built on honest communication, transparent pricing, and proven craftsmanship. Four core values: Honesty, Integrity, Professionalism, Thoroughness. Serving Tri-Cities with face-to-face consultation. Call (509) 308-6489."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.mhc-gc.com" />
      </Head>

      {/* Add structured data for SEO */}
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Home Page Hero Section */}
      <HeroSection />

      {/* Core Values Section - Establish trust and heritage first */}
      <CoreValuesSection />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection />

      {/* Showcase of Services Section - What we actually do */}
      <ServicesShowcase />

      {/* Enhanced Client Partner Testimonials - Social proof builds credibility */}
      <TestimonialsSection
        id="testimonials"
        subtitle="Trusted By Our Partners"
        title="What Our Client Partners Say"
        description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Company Statistics Section - Credibility through numbers */}
      <CompanyStats
        id="stats"
        subtitle="Battle-Tested Excellence"
        title="Proven Track Record"
        description="Measurable results from a veteran-owned team committed to mission excellence across the Pacific Northwest—from deployment to development, we deliver."
        variant="primary"
      />

      {/* Our Process Timeline Section */}
      <section
        id="our-process"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
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
                    icon="timeline"
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
                Simple & Transparent
              </span>
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Our Process
              </span>
            </h2>

            {/* Description with colored keyword highlighting */}
            <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
              Five clear steps from{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                first contact to project completion
              </span>
              . No surprises, just{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                honest communication and proven results
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
                  icon: "engineering",
                  title: "Pre-Construction Planning",
                  desc: "Comprehensive site assessment, detailed scope development, and strategic planning to identify challenges before they arise.",
                  position: "left",
                },
                {
                  num: 2,
                  icon: "payments",
                  title: "Budget Transparency",
                  desc: "Clear, itemized pricing with complete cost breakdown. No hidden fees, no surprises—just honest numbers you can trust.",
                  position: "right",
                },
                {
                  num: 3,
                  icon: "verified",
                  title: "Quality Execution",
                  desc: "Expert craftsmanship with systematic quality checkpoints at every phase. Precision execution backed by 150+ years combined experience.",
                  position: "left",
                },
                {
                  num: 4,
                  icon: "forum",
                  title: "Proactive Communication",
                  desc: "Regular updates keep you informed throughout the project. Real-time notifications of any changes—you're never in the dark.",
                  position: "right",
                },
                {
                  num: 5,
                  icon: "task_alt",
                  title: "Seamless Close-Out",
                  desc: "Comprehensive final walkthrough and complete documentation. Our commitment to your satisfaction extends beyond project completion.",
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
        </div>
      </section>

      {/* Next Steps Section */}
      <NextStepsSection />
    </>
  );
}
