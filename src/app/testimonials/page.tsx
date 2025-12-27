"use client";

import Link from "next/link";
import { usePageTracking } from "@/lib/analytics/hooks";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/seo-meta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import {
  generateAggregateRatingSchema,
  generateReviewSchema,
} from "@/lib/seo/review-schema";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { TestimonialsSection } from "@/components/shared-sections/TestimonialsSection";
import { StrategicCTABanner } from "@/components/ui/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Note: Metadata moved to parent layout due to 'use client' directive

export default function TestimonialsPage() {
  // Analytics tracking
  usePageTracking("Testimonials");

  // Get client testimonials from centralized data source
  const testimonials = getClientTestimonials();

  // Calculate aggregate rating for Schema.org
  const aggregateRating =
    testimonials.length > 0
      ? {
          ratingValue:
            testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) /
            testimonials.length,
          reviewCount: testimonials.length,
        }
      : null;

  // Generate Schema.org structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Testimonials", url: "https://www.mhc-gc.com/testimonials" },
  ]);

  const aggregateRatingSchema = aggregateRating
    ? generateAggregateRatingSchema(
        aggregateRating.ratingValue,
        aggregateRating.reviewCount,
      )
    : null;

  const reviewSchemas = testimonials.map((testimonial) =>
    generateReviewSchema({
      reviewBody: testimonial.quote,
      ratingValue: testimonial.rating || 5,
      author: testimonial.name,
      reviewTitle: testimonial.project || "MH Construction Project",
      datePublished: testimonial.date || new Date().toISOString(),
    }),
  );

  // Generate FAQ Schema for testimonials page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I leave a testimonial for MH Construction?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can leave a Google review through our testimonials page link, or contact us directly to share your experience. We appreciate client feedback as it helps us maintain our high standards of Honesty, Integrity, Professionalism, and Thoroughness, and helps other businesses make informed decisions about partnering with our veteran-owned construction team.",
        },
      },
      {
        "@type": "Question",
        name: "Are MH Construction testimonials verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! All testimonials come from real Client Partners on completed projects across Washington, Oregon, and Idaho. We maintain the highest standards of authenticity—no paid reviews, no fabricated stories. Just honest feedback from valued partnerships in commercial, industrial, and government construction projects throughout the Pacific Northwest.",
        },
      },
      {
        "@type": "Question",
        name: "What makes MH Construction different from other contractors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "As a veteran-owned business certified by the U.S. Small Business Administration, we bring military precision and four core values—Honesty, Integrity, Professionalism, and Thoroughness—to every project. Our 70% referral rate, 650+ completed projects, .64 EMR safety rating, and 150+ years combined team experience demonstrate our commitment to building for the client, not the dollar.",
        },
      },
      {
        "@type": "Question",
        name: "Can I speak with past MH Construction clients?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We're happy to provide references during your consultation. We can connect you with past Client Partners who've experienced projects similar to yours in commercial, industrial, or government construction. Their firsthand accounts demonstrate our commitment to transparent communication, open-book pricing, and quality craftsmanship across the Pacific Northwest.",
        },
      },
    ],
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      {aggregateRatingSchema && <StructuredData data={aggregateRatingSchema} />}
      {reviewSchemas.map((schema) => (
        <StructuredData
          key={`review-${schema.author?.name || schema["@type"]}`}
          data={schema}
        />
      ))}
      <StructuredData data={faqSchema} />

      {/* Hero Section - Modern MH Standard with Diagonal Stripes */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-screen flex items-center justify-center text-white overflow-hidden">
        <DiagonalStripePattern />
        <BrandColorBlobs />

        {/* Content - Centered for standard pages */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <FadeInWhenVisible>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white/30 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/50 to-bronze-600/50 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                    <MaterialIcon
                      icon="forum"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Client testimonials"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white/30 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h1 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Service-Earned Commendations
                </span>
                <span className="block bg-gradient-to-r from-brand-secondary via-brand-secondary-light to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  From Client Partners
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed px-2 font-light tracking-wide">
                Authentic feedback from{" "}
                <span className="text-brand-secondary font-bold">
                  Client Partners
                </span>{" "}
                who've experienced our{" "}
                <span className="text-white font-bold">
                  veteran-owned excellence
                </span>{" "}
                in commercial, industrial, and government construction
              </p>

              {/* Stats Display */}
              {aggregateRating && (
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-8">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcon
                          key={i}
                          icon="star"
                          size="md"
                          className={
                            i < Math.round(aggregateRating.ratingValue)
                              ? "text-brand-secondary"
                              : "text-gray-500"
                          }
                          ariaLabel={
                            i < Math.round(aggregateRating.ratingValue)
                              ? "Filled star"
                              : "Empty star"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-base sm:text-lg text-white/90 font-medium">
                      {aggregateRating.ratingValue.toFixed(1)} Average Rating
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-secondary drop-shadow-lg">
                      {aggregateRating.reviewCount}+
                    </p>
                    <p className="text-base sm:text-lg text-white/90 font-medium">
                      Client Reviews
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-secondary drop-shadow-lg">
                      20+
                    </p>
                    <p className="text-base sm:text-lg text-white/90 font-medium">
                      Years Experience
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-10">
                <Link
                  href="https://search.google.com/local/writereview?placeid=234677025037995169"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl font-bold text-lg"
                  aria-label="Leave a Google review for MH Construction"
                >
                  <MaterialIcon
                    icon="star"
                    size="md"
                    className="group-hover:scale-110 transition-transform"
                    ariaLabel=""
                  />
                  <span>Leave a Google Review</span>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-white/50 hover:border-white shadow-2xl font-bold text-lg"
                  aria-label="Start your construction project"
                >
                  <MaterialIcon
                    icon="contact_page"
                    size="md"
                    className="group-hover:scale-110 transition-transform"
                    ariaLabel=""
                  />
                  <span>Start Your Project</span>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Page-Specific Navigation Bar */}
        <PageNavigation
          items={navigationConfigs.testimonials}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 dark:bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
          />
        </div>
      </div>

      {/* Main Content - Use existing TestimonialsSection for consistency */}
      {testimonials.length > 0 ? (
        <>
          {/* Featured Testimonials Carousel - integrates with homepage component */}
          <TestimonialsSection
            id="client-testimonials"
            subtitle="Trusted By Our Partners"
            title="What Our Client Partners Say"
            description="Read testimonials from valued Client Partners across the Pacific Northwest who have experienced our collaborative excellence firsthand."
            autoPlay={true}
            autoPlayInterval={5000}
          />

          {/* Why Choose MH Construction - SEO-Rich Content */}
          <section
            id="why-choose"
            className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="military_tech"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Military excellence"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Why Businesses Trust
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Veteran-Owned Excellence
                  </span>
                </h2>

                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Our{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    four-value professional foundation
                  </span>{" "}
                  creates{" "}
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    six measurable differences
                  </span>{" "}
                  in every commercial, industrial, and government project across
                  Washington, Oregon, and Idaho.
                </p>
              </div>

              {/* Four Core Values Grid - Modern Card Design */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Honesty Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon="visibility"
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Honesty"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Honesty
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Transparent pricing
                      </span>{" "}
                      with no hidden costs. Realistic timelines and honest
                      assessments every time.
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      ✓ Open-book pricing
                      <br />✓ No surprises, just solutions
                    </div>
                  </div>
                </div>

                {/* Integrity Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon="verified_user"
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Integrity"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Integrity
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Promise-keeping culture
                      </span>{" "}
                      backed by 70% referral business and 650+ completed
                      projects.
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      ✓ We finish what we start
                      <br />✓ Your word is your bond — so is ours
                    </div>
                  </div>
                </div>

                {/* Professionalism Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon="workspace_premium"
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Professionalism"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Professionalism
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Award-winning safety
                      </span>{" "}
                      with .64 EMR, 150+ years team experience, 3-state
                      licensing.
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      ✓ Military precision applied
                      <br />✓ Expert credentials
                    </div>
                  </div>
                </div>

                {/* Thoroughness Card */}
                <div className="group relative">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  {/* Card */}
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    {/* Top accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-brand-primary/20 blur-lg rounded-lg"></div>
                        <div className="relative bg-brand-primary/10 p-3 rounded-lg">
                          <MaterialIcon
                            icon="search"
                            size="lg"
                            className="text-brand-primary"
                            ariaLabel="Thoroughness"
                          />
                        </div>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 dark:text-white">
                        Thoroughness
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                      <span className="font-bold text-brand-primary">
                        Zero-gap quality
                      </span>{" "}
                      with meticulous attention to detail. Zero accidents, zero
                      shortcuts.
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      ✓ Every detail matters
                      <br />✓ Comprehensive quality control
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Areas & Capabilities - SEO Content */}
          <section
            id="service-areas"
            className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Service Areas */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon
                      icon="map"
                      size="lg"
                      className="text-brand-primary"
                      ariaLabel="Service coverage map"
                    />
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                      Serving the Pacific Northwest
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Licensed and insured across{" "}
                    <span className="font-bold text-brand-primary">
                      Washington, Oregon, and Idaho
                    </span>
                    , we bring veteran-owned excellence to commercial and
                    industrial projects throughout the region.
                  </p>
                  <div className="space-y-3">
                    {/* Tri-Cities Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="location_city"
                          size="sm"
                          className="text-brand-primary mt-1"
                          ariaLabel="City location"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            Tri-Cities, WA (Headquarters)
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Pasco, Kennewick, Richland, West Richland
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Eastern Washington Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="terrain"
                          size="sm"
                          className="text-brand-primary mt-1"
                          ariaLabel="Regional area"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            Eastern Washington
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Yakima, Walla Walla, Spokane, and surrounding areas
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Multi-State Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="landscape"
                          size="sm"
                          className="text-brand-primary mt-1"
                          ariaLabel="Multi-state coverage"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                            Multi-State Projects
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Eastern Oregon, Southern Idaho, and beyond
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Types */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon
                      icon="construction"
                      size="lg"
                      className="text-brand-primary"
                      ariaLabel="Construction expertise"
                    />
                    <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                      Commercial & Industrial Expertise
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    From{" "}
                    <span className="font-bold text-brand-primary">
                      ground-up construction to tenant improvements
                    </span>
                    , we deliver proven results across diverse project types.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Office Buildings Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="business"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Office buildings"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Office Buildings
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Corporate spaces & tenant improvements
                        </p>
                      </div>
                    </div>

                    {/* Medical Facilities Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="local_hospital"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Medical facilities"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Medical Facilities
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Healthcare centers & clinics
                        </p>
                      </div>
                    </div>

                    {/* Industrial Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="factory"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Industrial facilities"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Industrial
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Warehouses & manufacturing
                        </p>
                      </div>
                    </div>

                    {/* Government Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="account_balance"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Government projects"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Government
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Public sector & municipal
                        </p>
                      </div>
                    </div>

                    {/* Retail Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="store"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Retail and hospitality"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Retail & Hospitality
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Stores & restaurants
                        </p>
                      </div>
                    </div>

                    {/* Agricultural Card */}
                    <div className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                      <div className="relative bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 group-hover:border-brand-primary/30 transition-all duration-300">
                        <MaterialIcon
                          icon="agriculture"
                          size="sm"
                          className="text-brand-primary mb-2"
                          ariaLabel="Agricultural facilities"
                        />
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                          Agricultural
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Farm & processing facilities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Content Sections */}
          <section className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Why Reviews Matter - Following MH Section Header Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Verified feedback"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Why Client Feedback
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Matters to Us
                  </span>
                </h2>

                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  As a{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    veteran-owned business
                  </span>
                  , we bring the same{" "}
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    accountability and integrity
                  </span>{" "}
                  from military service to every construction project. Your
                  feedback helps us maintain the{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    highest standards
                  </span>{" "}
                  of excellence and collaborative partnership.
                </p>
              </div>

              {/* Grid of value propositions - Modern Card Design */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Honest Communication Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="handshake"
                      size="lg"
                      className="text-brand-primary mb-4"
                      ariaLabel="Partnership and communication"
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Honest Communication
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Clear, direct updates throughout your project—no
                      surprises, just straightforward collaboration
                    </p>
                  </div>
                </div>

                {/* Veteran Excellence Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="military_tech"
                      size="lg"
                      className="text-brand-primary mb-4"
                      ariaLabel="Military veteran excellence"
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Veteran Excellence
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Military precision and dedication applied to commercial,
                      industrial, and government construction
                    </p>
                  </div>
                </div>

                {/* Proven Track Record Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="workspace_premium"
                      size="lg"
                      className="text-brand-primary mb-4"
                      ariaLabel="Award-winning quality"
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Proven Track Record
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      20+ years delivering quality projects across Washington,
                      Oregon, and Idaho
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section - Optimal SEO Positioning (60-75% depth) */}
          <section
            id="testimonials-faq"
            className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          >
            <DiagonalStripePattern />
            <BrandColorBlobs />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="mb-16 sm:mb-20 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-primary-dark p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="help"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Frequently asked questions"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Common Questions About
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Working With Us
                  </span>
                </h2>

                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Get answers to the most{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    frequently asked questions
                  </span>{" "}
                  about our{" "}
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    partnership approach
                  </span>{" "}
                  and what to expect when working with our veteran-owned team.
                </p>
              </div>

              {/* FAQ Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* FAQ 1 */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <MaterialIcon
                        icon="help_outline"
                        size="lg"
                        className="text-brand-primary mt-1"
                        ariaLabel="Question"
                      />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        How do I leave a testimonial?
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We appreciate client feedback! You can leave a Google
                      review through the link above, or contact us directly to
                      share your experience. Your honest feedback helps us
                      maintain our high standards and helps other businesses
                      make informed decisions.
                    </p>
                  </div>
                </div>

                {/* FAQ 2 */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <MaterialIcon
                        icon="help_outline"
                        size="lg"
                        className="text-brand-primary mt-1"
                        ariaLabel="Question"
                      />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Are these testimonials verified?
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Yes! All testimonials come from real Client Partners on
                      completed projects. We maintain the highest standards of
                      authenticity—no paid reviews, no fabricated stories. Just
                      honest feedback from valued partnerships across the
                      Pacific Northwest.
                    </p>
                  </div>
                </div>

                {/* FAQ 3 */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <MaterialIcon
                        icon="help_outline"
                        size="lg"
                        className="text-brand-primary mt-1"
                        ariaLabel="Question"
                      />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        What makes MH Construction different?
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      As a veteran-owned business, we bring military precision,
                      Honesty, Integrity, Professionalism, and Thoroughness to
                      every project. Our 70% referral rate and 650+ completed
                      projects speak to our partnership-first approach and
                      commitment to building for the client, not the dollar.
                    </p>
                  </div>
                </div>

                {/* FAQ 4 */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start gap-4 mb-4">
                      <MaterialIcon
                        icon="help_outline"
                        size="lg"
                        className="text-brand-primary mt-1"
                        ariaLabel="Question"
                      />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Can I speak with past clients?
                      </h3>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We're happy to provide references! During your
                      consultation, we can connect you with past Client Partners
                      who've experienced projects similar to yours. Their
                      firsthand accounts demonstrate our commitment to
                      transparent communication and quality craftsmanship.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA to Full FAQ Page */}
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                  Have more questions? Check out our comprehensive FAQ page.
                </p>
                <Link
                  href="/faq"
                  className="group inline-flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl font-bold text-lg"
                  aria-label="View all frequently asked questions"
                >
                  <MaterialIcon
                    icon="quiz"
                    size="md"
                    className="group-hover:scale-110 transition-transform"
                    ariaLabel=""
                  />
                  <span>View All FAQs</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Trust Signals & Certifications Section */}
          <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section Header */}
              <div className="mb-12 sm:mb-16 text-center">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="verified"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Verified credentials"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-relaxed tracking-tighter">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl tracking-tight">
                    Credentials You Can
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm">
                    Trust & Verify
                  </span>
                </h2>
              </div>

              {/* Trust Badges Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Veteran-Owned Badge */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="military_tech"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Veteran-owned business"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Veteran-Owned
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      SBA Certified Veteran-Owned Small Business
                    </p>
                  </div>
                </div>

                {/* Multi-State Licensed */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="verified_user"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Multi-state licensing"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Multi-State Licensed
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Licensed in WA, OR, and ID
                    </p>
                  </div>
                </div>

                {/* Safety Record */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="health_and_safety"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Safety excellence"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      Safety Excellence
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      .64 EMR Safety Rating
                    </p>
                  </div>
                </div>

                {/* 650+ Projects */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl opacity-30 group-hover:opacity-60 blur transition-all duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-transparent group-hover:border-brand-primary/30 transition-all duration-300 text-center">
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary rounded-t-xl"></div>
                    <MaterialIcon
                      icon="engineering"
                      size="2xl"
                      className="text-brand-primary mx-auto mb-4"
                      ariaLabel="Project experience"
                    />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      650+ Projects
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Completed Since 2010
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Trust Indicators */}
              <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    70%
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Referral Business Rate
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    150+
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Years Combined Experience
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-black text-brand-primary dark:text-brand-primary-light mb-2">
                    20+
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Years Serving Pacific Northwest
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Coming Soon State - No testimonials yet */
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <MaterialIcon
                icon="rate_review"
                size="3xl"
                className="text-brand-primary mx-auto"
                ariaLabel="Reviews coming soon"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Client Testimonials Coming Soon
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
              We're collecting feedback from our valued Client Partners. Check
              back soon to read about their experiences working with our
              veteran-owned construction team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://search.google.com/local/writereview?placeid=234677025037995169"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl font-bold text-lg"
                aria-label="Leave a Google review for MH Construction"
              >
                <MaterialIcon
                  icon="star"
                  size="md"
                  className="group-hover:scale-110 transition-transform"
                  ariaLabel=""
                />
                <span>Leave a Google Review</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-brand-secondary shadow-xl font-bold text-lg"
                aria-label="Start your construction project"
              >
                <MaterialIcon
                  icon="contact_page"
                  size="md"
                  className="group-hover:scale-110 transition-transform"
                  ariaLabel=""
                />
                <span>Start Your Project</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Strategic CTA Banner - Conversion Optimization */}
      <StrategicCTABanner variant="combo" className="my-0" />

      {/* Final CTA Section - Modern MH Standard */}
      <section
        id="leave-review"
        className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-16 sm:py-20 lg:py-24 text-white overflow-hidden"
      >
        <DiagonalStripePattern />
        <BrandColorBlobs />
        {/* Placeholder for any additional blobs */}
        <div className="absolute top-10 right-[20%] w-96 h-96 bg-gradient-to-br from-brand-secondary/20 to-transparent blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 left-[20%] w-96 h-96 bg-gradient-to-tr from-brand-primary-darker/30 to-transparent blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
            Ready to Experience{" "}
            <span className="text-brand-secondary">
              Veteran-Owned Excellence?
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white/90 font-light">
            Join our satisfied Client Partners across the Pacific Northwest.
            Let's build something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-2xl font-bold text-lg"
              aria-label="Contact us to start your project"
            >
              <MaterialIcon
                icon="contact_page"
                size="md"
                className="group-hover:scale-110 transition-transform"
                ariaLabel=""
              />
              <span>Get Started Today</span>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-white/50 hover:border-white shadow-2xl font-bold text-lg"
              aria-label="Learn about our construction services"
            >
              <MaterialIcon
                icon="construction"
                size="md"
                className="group-hover:scale-110 transition-transform"
                ariaLabel=""
              />
              <span>View Our Services</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
