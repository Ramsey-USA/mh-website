"use client";

import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";
import { TestimonialGrid } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { AggregateRating } from "@/components/ratings";
import { ProjectCostCalculator } from "@/components/calculator";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

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
import { ActivityFeed } from "@/components/activity";
import { BeforeAfterSlider, BeforeAfterGallery } from "@/components/slider";

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

      {/* Revolutionary Features Section */}
      <FeaturesSection />

      {/* Core Values Section */}
      <CoreValuesSection />

      {/* Enhanced Client Testimonials - MOVED UP for trust-building (Phase 0 optimization) */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                What Our
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Clients Say
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Read testimonials from{" "}
              <span className="font-medium text-gray-800 dark:text-gray-200">
                valued partners
              </span>{" "}
              across the Pacific Northwest who have experienced our{" "}
              <span className="text-brand-primary font-semibold">
                collaborative excellence
              </span>{" "}
              firsthand.
            </p>
          </div>

          <TestimonialGrid
            testimonials={getClientTestimonials(true)}
            title=""
            variant="client"
            maxItems={3}
            showViewMoreButton={true}
            viewMoreHref="/about#testimonials"
            className="!py-0"
          />

          {/* Aggregate Rating - SEO Enhanced */}
          <div className="mt-12 lg:mt-16">
            <AggregateRating
              testimonials={getClientTestimonials()}
              variant="hero"
              title="Trusted by Clients Across the Pacific Northwest"
            />
          </div>
        </div>
      </section>

      {/* Why Partner With MH Construction Section */}
      <WhyPartnerSection />

      {/* Showcase of Services Section */}
      <ServicesShowcase />

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

      {/* Project Cost Calculator Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <ProjectCostCalculator
              variant="featured"
              showVeteranDiscount={true}
              enableChatbotHandoff={true}
              onGetDetailedEstimate={(data) => {
                // Track calculator usage
                if (typeof window !== "undefined" && window.gtag) {
                  window.gtag("event", "cost_calculator_used", {
                    project_type: data.projectType,
                    quality: data.quality,
                    estimated_min: data.estimatedCost.min,
                    estimated_max: data.estimatedCost.max,
                    is_veteran: data.isVeteran,
                    event_category: "engagement",
                    event_label: "homepage_calculator",
                  });
                }

                // Track with analytics hook
                trackEvent("project_cost_calculated", {
                  location: "homepage",
                  project_type: data.projectType,
                  scope_level: data.scope,
                  quality_level: data.quality,
                  timeline: data.timeline,
                  is_veteran: data.isVeteran,
                  estimated_range: data.estimatedCost.display,
                });
              }}
            />
          </FadeInWhenVisible>
        </div>
      </section>

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

      {/* Quick Stats Bar - Instant Trust Indicators */}
      <section className="relative bg-brand-primary/5 dark:bg-gray-800/50 py-12 lg:py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {/* Stat 1: Years Experience */}
              <div className="text-center group">
                <div className="flex justify-center items-center bg-brand-primary/10 dark:bg-brand-primary/20 mx-auto mb-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="engineering"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <div className="mb-2 font-black text-3xl sm:text-4xl text-brand-primary dark:text-brand-primary-light">
                  <AnimatedCounter value={20} suffix="+" duration={2000} />
                </div>
                <div className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                  Years Experience
                </div>
              </div>

              {/* Stat 2: Safety Rating */}
              <div className="text-center group">
                <div className="flex justify-center items-center bg-brand-secondary/10 dark:bg-brand-secondary/20 mx-auto mb-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="verified"
                    size="xl"
                    className="text-brand-secondary"
                  />
                </div>
                <div className="mb-2 font-black text-3xl sm:text-4xl text-brand-secondary dark:text-brand-secondary-light">
                  <AnimatedCounter value={0.6} decimals={1} duration={2000} />
                </div>
                <div className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                  EMR Safety Rating
                </div>
              </div>

              {/* Stat 3: Combined Experience */}
              <div className="text-center group">
                <div className="flex justify-center items-center bg-brand-accent/10 dark:bg-brand-accent/20 mx-auto mb-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="groups"
                    size="xl"
                    className="text-brand-accent"
                  />
                </div>
                <div className="mb-2 font-black text-3xl sm:text-4xl text-brand-accent dark:text-brand-accent-light">
                  <AnimatedCounter value={150} suffix="+" duration={2000} />
                </div>
                <div className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                  Combined Years
                </div>
              </div>

              {/* Stat 4: Support */}
              <div className="text-center group">
                <div className="flex justify-center items-center bg-brand-primary/10 dark:bg-brand-primary/20 mx-auto mb-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="support_agent"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <div className="mb-2 font-black text-3xl sm:text-4xl text-brand-primary dark:text-brand-primary-light">
                  24/7
                </div>
                <div className="font-medium text-gray-700 text-sm sm:text-base dark:text-gray-300">
                  Emergency Support
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Before & After Transformations */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <BeforeAfterGallery
              title="Project Transformations"
              description="See the remarkable changes we've made to transform spaces across the Pacific Northwest. Real projects, real results."
              slides={[
                {
                  beforeImage: "/images/logo/mh-logo.png",
                  afterImage: "/images/logo/mh-logo.png",
                  beforeAlt: "Before construction - placeholder",
                  afterAlt: "After completion - placeholder",
                  caption: "Medical Center Expansion - Kennewick, WA",
                },
                {
                  beforeImage: "/images/logo/mh-logo.png",
                  afterImage: "/images/logo/mh-logo.png",
                  beforeAlt: "Before renovation - placeholder",
                  afterAlt: "After renovation - placeholder",
                  caption: "Commercial Office Remodel - Pasco, WA",
                },
              ]}
              layout="grid"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Next Steps Section */}
      <section
        id="next-steps"
        className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 py-20 lg:py-32"
      >
        <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto max-w-3xl font-light text-primary-100 text-xl sm:text-2xl md:text-3xl leading-relaxed">
              Let's partner together to bring your construction vision to life
              with veteran-owned excellence and military precision.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-12">
            {/* Option 1: Schedule Consultation */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20">
                <MaterialIcon icon="event" size="xl" className="text-white" />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                Schedule Consultation
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Book a free 45-60 minute consultation to discuss your project
                goals, timeline, and budget.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600"
                  />
                  <span>Free consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600"
                  />
                  <span>Expert recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600"
                  />
                  <span>No obligation</span>
                </li>
              </ul>
              <Link href="/booking">
                <Button variant="primary" size="lg" className="w-full">
                  <MaterialIcon
                    icon="calendar_today"
                    size="md"
                    className="mr-2"
                  />
                  Book Consultation
                </Button>
              </Link>
            </div>

            {/* Option 2: Get Quick Estimate */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-secondary-500">
              <div className="bg-secondary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2">
                <span className="font-bold text-sm text-white uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20">
                <MaterialIcon
                  icon="calculate"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                Get Quick Estimate
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Receive a detailed project estimate within 3-5 business days
                with transparent pricing.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600"
                  />
                  <span>3-5 day turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600"
                  />
                  <span>Detailed line items</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600"
                  />
                  <span>Open-book pricing</span>
                </li>
              </ul>
              <Link href="/estimator">
                <Button variant="secondary" size="lg" className="w-full">
                  <MaterialIcon icon="description" size="md" className="mr-2" />
                  Request Estimate
                </Button>
              </Link>
            </div>

            {/* Option 3: Contact Us */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20">
                <MaterialIcon
                  icon="contact_phone"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                Contact Us Directly
              </h3>
              <p className="mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                Reach out via phone, email, or contact form for immediate
                assistance with your project.
              </p>
              <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600"
                  />
                  <span>24-48hr response</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600"
                  />
                  <span>Multiple contact methods</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600"
                  />
                  <span>Direct team access</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-accent-600 hover:bg-accent-700"
                >
                  <MaterialIcon icon="mail" size="md" className="mr-2" />
                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 text-center text-white">
            <div>
              <p className="mb-2 font-black text-4xl">20+</p>
              <p className="text-primary-100">Years Experience</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">.6</p>
              <p className="text-primary-100">EMR Safety Rating</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">70%</p>
              <p className="text-primary-100">Referral Business</p>
            </div>
            <div>
              <p className="mb-2 font-black text-4xl">24/7</p>
              <p className="text-primary-100">Emergency Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />

      {/* Real-Time Activity Feed - Social Proof */}
      <ActivityFeed
        maxActivities={3}
        enableChatbotIntegration={true}
        autoDismissSeconds={0}
        desktopOnly={true}
      />
    </>
  );
}
