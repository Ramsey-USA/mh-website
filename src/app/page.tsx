"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";

// Enhanced SEO for AI-powered veteran-owned construction
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
import { VeteranBadgeSection } from "@/components/veterans/VeteranBadgeSection";

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
      {/* Enhanced SEO structured data for AI-powered veteran-owned construction */}
      <StructuredData data={homepageSEO.schemas} />

      <Head>
        <title>
          MH Construction - AI-Powered Veteran-Owned Construction Excellence
        </title>
        <meta
          name="description"
          content="Revolutionary AI construction intelligence with General MH military assistant. Founded 2010, veteran-owned since January 2025 under Army veteran leadership. Serving Pacific Northwest communities with authentic partnerships and cutting-edge technology."
        />
        <meta
          name="keywords"
          content="veteran-owned construction, military precision construction, commercial construction management, Tri-Cities construction, Pasco construction, Kennewick construction, Richland construction, veteran business, AI-powered construction, construction management services"
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

      {/* Veteran-Owned Badge Section */}
      <VeteranBadgeSection variant="full" showCTA={true} />

      {/* Revolutionary Features Section */}
      <FeaturesSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Showcase of Services Section - Positioned early for SEO (primary offerings) */}
      <ServicesShowcase />

      {/* Enhanced Client Testimonials - Social proof at optimal 25-30% page depth (Phase 0 optimization) */}
      <TestimonialsSection
        subtitle="What Our"
        title="Clients Say"
        description="Read testimonials from valued partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
      />

      {/* Why Partner With MH Construction Section */}
      <WhyPartnerSection />

      {/* Before/After Showcase Section */}
      <section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-12 text-center">
              <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  See Our
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Quality Transformations
                </span>
              </h2>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Drag the slider to compare{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  before and after
                </span>{" "}
                on our{" "}
                <span className="text-brand-primary font-semibold">
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

      {/* AI-Powered Cost Estimator CTA Section */}
      <AIEstimatorCTA variant="full" location="homepage" />

      {/* Smart Project Recommendations */}
      <section className="relative bg-white dark:bg-gray-900 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="mb-8 sm:mb-12 text-center">
              <p className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                  Smart Project
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Recommendations
                </span>
              </p>
              <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Discover intelligent project recommendations based on{" "}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Pacific Northwest trends
                </span>{" "}
                and veteran preferences for{" "}
                <span className="text-brand-primary font-semibold">
                  collaborative success
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

      {/* Company Stats Section */}
      <CompanyStats
        subtitle=""
        title="Trusted by the Community"
        description=""
        variant="primary"
      />

      {/* Next Steps Section */}
      <NextStepsSection />

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />
    </>
  );
}
