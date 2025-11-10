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

      {/* AI-Powered Cost Estimator CTA Section */}
      <section className="bg-gradient-to-br from-brand-primary/10 via-brand-secondary/5 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <FadeInWhenVisible>
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center bg-brand-secondary/10 text-brand-secondary px-4 py-2 rounded-full text-sm font-bold mb-4">
                      <MaterialIcon
                        icon="auto_awesome"
                        size="sm"
                        className="mr-2"
                      />
                      AI-Powered Technology
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                      Get Your AI-Powered
                      <span className="block text-brand-primary">
                        Cost Estimate
                      </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Our advanced AI estimator analyzes 500+ completed projects
                      and 150+ years of combined team experience to provide
                      accurate preliminary budget planning in under 5 minutes.
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="speed"
                          size="sm"
                          className="text-brand-primary"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Under 5 Minutes
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Complete detailed estimates fast, 24/7 availability
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-secondary/10 rounded-full flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="analytics"
                          size="sm"
                          className="text-brand-secondary"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Data-Driven Intelligence
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Pacific Northwest market data from WA, OR, and ID
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="military_tech"
                          size="sm"
                          className="text-brand-primary"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          Veteran-Owned Expertise
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Military precision backed by award-winning .6 EMR
                          safety
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/estimator" className="flex-1">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          // Track CTA click
                          if (typeof window !== "undefined" && window.gtag) {
                            window.gtag("event", "ai_estimator_cta_click", {
                              event_category: "conversion",
                              event_label: "homepage_estimator_cta",
                              location: "homepage",
                            });
                          }
                          trackEvent("ai_estimator_cta_click", {
                            location: "homepage",
                            section: "estimator_cta",
                          });
                        }}
                      >
                        <MaterialIcon
                          icon="calculate"
                          size="md"
                          className="mr-2"
                        />
                        Start AI Estimate
                      </Button>
                    </Link>
                    <Link href="/booking" className="flex-1">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => {
                          trackEvent("consultation_cta_click", {
                            location: "homepage",
                            section: "estimator_cta",
                          });
                        }}
                      >
                        <MaterialIcon icon="event" size="md" className="mr-2" />
                        Book Consultation
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Side - Visual/Stats */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark p-8 lg:p-12 flex flex-col justify-center text-white">
                  <h3 className="text-2xl font-bold mb-8">
                    Trusted by Pacific Northwest Businesses
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="dataset"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <div className="text-3xl font-black">500+</div>
                        <div className="text-white/80 text-sm">
                          Projects Analyzed
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="verified"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <div className="text-3xl font-black">.6 EMR</div>
                        <div className="text-white/80 text-sm">
                          Award-Winning Safety
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="engineering"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <div className="text-3xl font-black">150+</div>
                        <div className="text-white/80 text-sm">
                          Years Combined Experience
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                        <MaterialIcon
                          icon="schedule"
                          size="lg"
                          className="text-white"
                        />
                      </div>
                      <div>
                        <div className="text-3xl font-black">24/7</div>
                        <div className="text-white/80 text-sm">
                          Always Available
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <p className="text-sm text-white/80 italic">
                      "Get transparent, open-book pricing for your project. No
                      hidden costs, just honest assessments you can trust."
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

      {/* Company Stats Section */}
      <CompanyStats
        subtitle=""
        title="Trusted by the Community"
        description=""
        variant="primary"
      />

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
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon icon="event" size="xl" className="text-white" />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
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
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>Free consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>Expert recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-primary-600 flex-shrink-0"
                  />
                  <span>No obligation</span>
                </li>
              </ul>
              <Link href="/booking">
                <Button variant="primary" size="lg" className="w-full group">
                  <MaterialIcon
                    icon="calendar_today"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Book Consultation
                </Button>
              </Link>
            </div>

            {/* Option 2: Get Quick Estimate */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-4 border-secondary-500">
              <div className="bg-secondary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
                <span className="font-bold text-sm text-white uppercase tracking-wide">
                  Most Popular
                </span>
              </div>
              <div className="flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon
                  icon="calculate"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
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
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>3-5 day turnaround</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>Detailed line items</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-secondary-600 flex-shrink-0"
                  />
                  <span>Open-book pricing</span>
                </li>
              </ul>
              <Link href="/estimator">
                <Button variant="secondary" size="lg" className="w-full group">
                  <MaterialIcon
                    icon="description"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Request Estimate
                </Button>
              </Link>
            </div>

            {/* Option 3: Contact Us */}
            <div className="bg-white dark:bg-gray-800 shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              <div className="flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg">
                <MaterialIcon
                  icon="contact_phone"
                  size="xl"
                  className="text-white"
                />
              </div>
              <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
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
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>24-48hr response</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>Multiple contact methods</span>
                </li>
                <li className="flex items-center gap-2">
                  <MaterialIcon
                    icon="check_circle"
                    size="sm"
                    className="text-accent-600 flex-shrink-0"
                  />
                  <span>Direct team access</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full bg-accent-600 hover:bg-accent-700 group"
                >
                  <MaterialIcon
                    icon="mail"
                    size="md"
                    className="mr-2 group-hover:scale-110 transition-transform"
                  />
                  Get In Touch
                </Button>
              </Link>
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
