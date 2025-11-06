"use client";

import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { PortfolioService } from "@/lib/services/portfolioService";
import {
  generateSEOMetadata,
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
  BlogNewsSection,
  PartnershipCTA,
} from "@/components/home";

// Dynamically import below-the-fold components
const TestimonialsWidget = dynamic(
  () => import("../components/testimonials/TestimonialsWidget"),
  {
    loading: () => (
      <div className="bg-muted rounded-lg h-96 animate-pulse"></div>
    ),
    ssr: false,
  },
);
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
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import {
  useIntersectionObserver,
  useImagePreloader,
} from "@/hooks/usePerformanceOptimization";

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

  const preloadedImages = useImagePreloader(criticalImages);

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

      {/* Showcase of Services Section */}
      <ServicesShowcase />

      {/* Enhanced Client Testimonials */}
      <section className="relative bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900 py-8 sm:py-12 lg:py-16 testimonials-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(189,146,100,0.05)_0%,transparent_50%)] opacity-60"></div>
        <div className="top-20 left-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-40 h-40"></div>
        <div className="right-20 bottom-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-32 h-32"></div>

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
            <p className="mb-4 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-2 sm:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
                What Our
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Clients Say
              </span>
            </p>
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

          <div className="gap-4 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
            {[
              {
                name: "Sarah Thompson",
                location: "Spokane, WA",
                project: "Historic Home Renovation",
                rating: 5,
                review:
                  "MH Construction truly worked WITH us, not just for us. Their collaborative approach and attention to detail made our 1920s home renovation extraordinary. The partnership felt genuine, and they finished ahead of schedule!",
                image: "/images/testimonials/sarah-t.jpg",
              },
              {
                name: "Mike Chen",
                location: "Yakima, WA",
                project: "Modern Kitchen Remodel",
                rating: 5,
                review:
                  "The partnership approach made all the difference. They listened to our vision and made it better. Their veteran-owned values and collaborative planning exceeded our expectations in every way.",
                image: "/images/testimonials/mike-c.jpg",
              },
              {
                name: "Jessica Rodriguez",
                location: "Spokane, WA",
                project: "Luxury Bathroom Addition",
                rating: 5,
                review:
                  "As a fellow veteran, I appreciated their 'we work with you' philosophy. The partnership felt authentic - they became our advocates throughout the project. True collaboration that delivered exceptional results.",
                image: "/images/testimonials/jessica-r.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group scroll-reveal testimonial-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-2xl p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl h-full antialiased transform-gpu transition-all duration-500 min-h-[280px] sm:min-h-[320px]">
                  {/* Quote Icon - Mobile optimized */}
                  <div className="top-4 right-4 sm:top-6 sm:right-6 absolute flex justify-center items-center bg-brand-secondary/10 p-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-full h-full text-brand-secondary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-brand-primary to-brand-secondary shadow-lg p-2 sm:p-3 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16 group-hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-white text-lg sm:text-2xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 sm:mb-2 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl tracking-tight">
                        {testimonial.name}
                      </p>
                      <p className="mb-2 sm:mb-3 font-medium text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base tracking-wide">
                        {testimonial.location} •{" "}
                        <span className="font-bold text-brand-primary">
                          {testimonial.project}
                        </span>
                      </p>
                      <div className="flex space-x-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <MaterialIcon
                              key={i}
                              icon="star"
                              size="sm"
                              className="text-yellow-400"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </div>

                  <blockquote className="font-light text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl italic leading-relaxed tracking-wide">
                    "{testimonial.review}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center scroll-reveal">
            <Link href="/about#testimonials">
              <Button
                variant="secondary"
                size="lg"
                className="group transition-all duration-300 w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <MaterialIcon
                  icon="rate_review"
                  size="lg"
                  className="mr-2 sm:mr-3 flex-shrink-0"
                />
                <span className="font-medium text-sm sm:text-base">
                  View All Partnership Stories
                </span>
              </Button>
            </Link>
          </div>
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
                  });
                }
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
                  });
                }
              }}
              className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-indigo-100 dark:to-gray-700 shadow-lg p-4 sm:p-6 lg:p-8 rounded-xl"
            />
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Why Partner With MH Construction Section */}
      <WhyPartnerSection />

      {/* Latest Blog & News Section */}
      <BlogNewsSection />

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />
    </>
  );
}
