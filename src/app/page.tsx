"use client";

import { useEffect } from "react";
import {
  generateOrganizationStructuredData,
  StructuredData,
} from "@/components/seo/seo-meta";

// Enhanced SEO for veteran-owned construction with traditional values
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";

// Homepage sections
import {
  HeroSection,
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
} from "@/components/shared-sections";

import Head from "next/head";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { useImagePreloader } from "@/hooks/usePerformanceOptimization";

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
          MH Construction - Veteran-Owned Integrity & Honest Communication
        </title>
        <meta
          name="description"
          content="Veteran-owned construction management since 2010. Honest communication, transparent pricing, proven craftsmanship. Specializing in commercial construction, master planning, tenant improvements, and light industrial projects. Four core values—Honesty, Integrity, Professionalism, Thoroughness—building trust through face-to-face consultation and lasting relationships. Serving Pacific Northwest communities."
        />
        <meta
          name="keywords"
          content="veteran-owned construction, honest communication construction, transparent pricing construction, proven craftsmanship, construction management services, commercial construction services, master planning preconstruction, tenant improvement services, light industrial construction, face-to-face consultation, traditional business values, Tri-Cities construction, Pasco construction, Kennewick construction, Honesty Integrity Professionalism Thoroughness, trust-based partnerships"
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
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center scroll-reveal">
            <div className="flex justify-center items-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                  <MaterialIcon
                    icon="construction"
                    size="2xl"
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Veteran-Owned Commitment to
              </span>
              <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                Honest Excellence
              </span>
            </h2>

            <div className="mx-auto max-w-4xl space-y-6">
              <p className="font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4">
                As a{" "}
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  veteran-owned company
                </span>
                , we apply the same values that guide our construction projects—
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  honesty, integrity, and transparent communication
                </span>
                —to everything we do, including our digital presence.
              </p>

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
                  Our veteran-owned values—
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    honesty, thoroughness, and integrity
                  </span>
                  —mean we're transparent about everything, including this: our
                  website is being refined to reflect the same proven
                  craftsmanship and excellence we bring to every construction
                  project.
                </p>

                <p className="mb-4 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  <em>"Your Word Is Your Bond - So Is Ours."</em> Trust earned
                  through honest communication isn't just for job sites—it
                  applies everywhere. Every detail will reflect our commitment
                  to transparent relationships and proven results.
                </p>

                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 border border-brand-secondary/30 rounded-xl mt-6">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg">
                    💬 What This Means for You:
                  </p>
                  <ul className="space-y-2 mt-4 text-gray-700 dark:text-gray-300 text-sm sm:text-base text-left">
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                      />
                      <span>
                        All core services, contact information, and booking
                        capabilities are fully operational
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                      />
                      <span>
                        We're refining content to ensure 100% accuracy and
                        authenticity
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                      />
                      <span>
                        Every word, image, and detail will meet our exacting
                        standards
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="text-brand-primary mr-2 mt-1 flex-shrink-0"
                      />
                      <span>
                        You can still reach us at{" "}
                        <a
                          href="tel:+15093086489"
                          className="font-semibold text-brand-primary hover:text-brand-primary-dark underline"
                        >
                          (509) 308-6489
                        </a>{" "}
                        for immediate assistance
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed tracking-wide px-4 mt-8">
                <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                  Building projects for the client,{" "}
                  <span className="font-black italic text-bronze-300">NOT</span>{" "}
                  the dollar
                </span>{" "}
                means never compromising our veteran-owned values—whether it's
                honest communication on a construction project or the
                transparent information we provide online. Thank you for your
                patience as we perfect every detail with the same proven
                craftsmanship that defines our work.
              </p>
            </div>
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

      {/* Next Steps Section */}
      <NextStepsSection />

      {/* Enhanced Partnership Call to Action Section */}
      <PartnershipCTA />
    </>
  );
}
