"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";

// Enhanced SEO for veteran-owned construction with traditional values
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";

// Homepage sections
import {
  HeroSection,
  FeaturesSection,
  CoreValuesSection,
  ServicesShowcase,
  WhyPartnerSection,
  PartnershipCTA,
} from "@/components/home";
import { CompanyStats } from "@/components/about/CompanyStats";

// Shared sections used across multiple pages
import {
  TestimonialsSection,
  NextStepsSection,
  AIEstimatorCTA,
} from "@/components/shared-sections";

// Dynamically import below-the-fold components
const SmartRecommendations = dynamic(
  () => import("../components/recommendations/SmartRecommendations"),
  {
    loading: () => (
      <div className="bg-muted rounded-lg h-64 animate-pulse"></div>
    ),
    ssr: false,
  },
);
import Head from "next/head";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { useImagePreloader } from "@/hooks/usePerformanceOptimization";
import { BeforeAfterSlider } from "@/components/slider";

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

  // Track scroll depth for engagement analytics
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100,
      );

      if (scrollPercent >= 25 && !sessionStorage.getItem("scroll_25")) {
        sessionStorage.setItem("scroll_25", "true");
        trackEvent("scroll_depth", { percent: 25, page: "homepage" });
      }
      if (scrollPercent >= 50 && !sessionStorage.getItem("scroll_50")) {
        sessionStorage.setItem("scroll_50", "true");
        trackEvent("scroll_depth", { percent: 50, page: "homepage" });
      }
      if (scrollPercent >= 75 && !sessionStorage.getItem("scroll_75")) {
        sessionStorage.setItem("scroll_75", "true");
        trackEvent("scroll_depth", { percent: 75, page: "homepage" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trackEvent]);

  return (
    <>
      {/* Enhanced SEO structured data for veteran-owned construction excellence */}
      <StructuredData data={homepageSEO.schemas} />

      <Head>
        <title>
          MH Construction - Building for the Client, NOT the Dollar |
          Veteran-Owned
        </title>
        <meta
          name="description"
          content="Where handshakes matter and your word is your bond. Founded 2010, veteran-owned since January 2025 under Army veteran leadership. Serving Pacific Northwest communities with traditional business values and face-to-face trust."
        />
        <meta
          name="keywords"
          content="veteran-owned construction, military precision construction, traditional business values, commercial construction management, Tri-Cities construction, Pasco construction, Kennewick construction, Richland construction, veteran business, trust-based construction, construction management services"
        />
        <meta
          property="og:title"
          content="MH Construction - Veteran-Led Construction Management | Tri-Cities WA"
        />
        <meta
          property="og:description"
          content="Founded 2010, veteran-owned since January 2025. Commercial Construction Management with military precision and AI technology. Serving the Tri-Cities area. Call (509) 308-6489."
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

      {/* Showcase of Services Section - What we actually do */}
      <ServicesShowcase />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection />

      {/* Enhanced Client Partner Testimonials - Social proof builds credibility */}
      <TestimonialsSection
        subtitle="What Our"
        title="Client Partners Say"
        description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Before/After Showcase Section - Tangible results */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
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
            <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                    <MaterialIcon
                      icon="compare"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  See Our
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  Quality Transformations
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Drag the slider to compare{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  before and after
                </span>{" "}
                on our{" "}
                <span className="text-brand-primary dark:text-brand-primary-light font-bold">
                  construction projects
                </span>
                .
              </p>
            </div>

            <BeforeAfterSlider
              beforeImage="/images/logo/mh-logo.png"
              afterImage="/images/logo/mh-logo.png"
              beforeAlt="Project before construction - MH Construction placeholder"
              afterAlt="Project after construction - MH Construction placeholder"
              caption="Example transformation - Real project images coming soon"
              height="h-[400px] sm:h-[500px] lg:h-[600px]"
              showLabels={true}
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Company Statistics Section - Credibility through numbers */}
      <CompanyStats
        subtitle=""
        title="Trusted by the Community"
        description=""
        variant="primary"
      />

      {/* Modern Tools & Features Section - Positioned after trust foundation */}
      <FeaturesSection />

      {/* Budget Planning Tool CTA Section */}
      <AIEstimatorCTA variant="full" location="homepage" />

      {/* Smart Project Recommendations - For tech-curious visitors */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
        <div className="top-20 right-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
        <div
          className="left-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                    <MaterialIcon
                      icon="lightbulb"
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Helpful Project
                </span>
                <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                  Ideas & Suggestions
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                Explore project ideas based on{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Pacific Northwest trends
                </span>{" "}
                and veteran preferences to help you think about{" "}
                <span className="text-brand-primary font-semibold">
                  your next project
                </span>
                .
              </p>
            </div>

            <SmartRecommendations
              variant="compact"
              maxRecommendations={6}
              showVeteranBenefits={true}
              onRecommendationClick={(recommendation) => {
                // Track recommendation click on homepage
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "homepage_recommendation_click", {
                    project_type: recommendation.projectType,
                    confidence: recommendation.confidence,
                    event_category: "engagement",
                    event_label: "smart_recommendations",
                  });
                }

                // Track with analytics hook
                trackEvent("smart_recommendation_click", {
                  location: "homepage",
                  project_type: recommendation.projectType,
                  confidence_score: recommendation.confidence,
                  recommendation_id: recommendation.id,
                });
              }}
              onGetEstimate={(recommendation) => {
                // Navigate to estimator with pre-filled data
                if (typeof window !== "undefined") {
                  window.location.href = `/estimator?project=${encodeURIComponent(recommendation.projectType)}&title=${encodeURIComponent(recommendation.title)}`;
                }

                // Track estimate request from homepage recommendation
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "homepage_recommendation_estimate", {
                    project_type: recommendation.projectType,
                    estimated_value: recommendation.estimatedCost.min,
                    event_category: "conversion",
                    event_label: "estimate_from_recommendation",
                  });
                }

                // Track conversion event
                trackEvent("estimate_from_recommendation", {
                  location: "homepage",
                  project_type: recommendation.projectType,
                  estimated_min: recommendation.estimatedCost.min,
                  estimated_max: recommendation.estimatedCost.max,
                  recommendation_id: recommendation.id,
                });
              }}
              className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-indigo-100 dark:to-gray-700 shadow-lg p-4 sm:p-6 lg:p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>
      {/* Next Steps Section */}
      <NextStepsSection />

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />
    </>
  );
}
