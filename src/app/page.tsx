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
import { SectionHeader } from "@/components/ui/SectionHeader";

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
        subtitle="What Our"
        title="Client Partners Say"
        description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Website Transparency & Commitment Section */}
      <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        {/* Unique Diagonal Stripe Background Pattern */}
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
          <SectionHeader
            icon="construction"
            iconVariant="secondary"
            subtitle="Transparency & Honesty"
            title="Commitment to Excellence"
            description="As a veteran-owned company, we apply the same values that guide our construction—honesty, integrity, and clear communication—to everything we do, including our digital presence."
          />

          <div className="mx-auto max-w-4xl space-y-6">
            {/* Transparency Notice */}
            <div className="bg-gradient-to-br from-brand-primary/10 via-white to-brand-secondary/10 dark:from-brand-primary/20 dark:via-gray-800 dark:to-brand-secondary/20 p-8 sm:p-10 border-2 border-brand-primary/30 dark:border-brand-primary/40 rounded-2xl shadow-lg mx-4 sm:mx-8">
              <div className="flex justify-center items-center mb-6">
                <div className="bg-brand-primary/20 dark:bg-brand-primary/30 p-3 rounded-full">
                  <MaterialIcon
                    icon="handshake"
                    size="xl"
                    className="text-brand-primary dark:text-brand-primary-light"
                  />
                </div>
              </div>

              <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl sm:text-2xl">
                🔧 Website Enhancement In Progress
              </h3>

              <p className="mb-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                Our core values—
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  honesty, integrity, and thoroughness
                </span>
                —mean we're transparent about everything. We're refining our
                website to reflect the same proven craftsmanship we bring to
                every project.
              </p>

              <p className="mb-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                <em>"Your Word Is Your Bond - So Is Ours."</em> Every detail
                will reflect our commitment to transparent relationships and
                proven results.
              </p>

              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-brand-secondary/30 rounded-xl mt-6">
                <p className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg">
                  💬 What This Means:
                </p>
                <ul className="space-y-2 mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base text-left">
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                    />
                    <span>
                      All services and contact information are fully operational
                    </span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                    />
                    <span>Content refinements ensure 100% accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <MaterialIcon
                      icon="check_circle"
                      size="sm"
                      className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                    />
                    <span>
                      Reach us at{" "}
                      <a
                        href="tel:+15093086489"
                        className="font-semibold text-brand-primary hover:text-brand-primary-dark underline"
                      >
                        (509) 308-6489
                      </a>{" "}
                      anytime
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="font-medium text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed px-4 mt-8">
              <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                Building projects for the client,{" "}
                <span className="font-black italic text-bronze-300">NOT</span>{" "}
                the dollar
              </span>{" "}
              means never compromising our values—whether in construction or
              communication. Thank you for your patience as we perfect every
              detail.
            </p>
          </div>
        </div>
      </section>

      {/* Company Statistics Section - Credibility through numbers */}
      <CompanyStats
        id="stats"
        subtitle=""
        title="Trusted by the Community"
        description=""
        variant="primary"
      />

      {/* Our Process Timeline Section */}
      <section
        id="our-process"
        className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
      >
        {/* Unique Diagonal Stripe Background Pattern */}
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
          <SectionHeader
            icon="timeline"
            iconVariant="primary"
            subtitle="Simple & Transparent"
            title="Our Process"
            description="Five clear steps from first contact to project completion. No surprises, just honest communication and proven results."
          />

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
