import { type Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/seo-meta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import {
  generateAggregateRatingSchema,
  generateReviewSchema,
} from "@/lib/seo/review-schema";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { TestimonialsSection } from "@/components/shared-sections/TestimonialsSection";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | MH Construction",
  description:
    "Read authentic testimonials from our valued Client Partners across the Pacific Northwest. See why businesses trust our veteran-owned construction team for commercial, industrial, and government projects.",
  keywords: [
    "MH Construction reviews",
    "construction testimonials",
    "Tri-Cities contractor reviews",
    "client feedback",
    "construction company ratings",
    "Pasco WA contractor reviews",
    "commercial construction testimonials",
    "veteran-owned construction reviews",
  ],
  openGraph: {
    title: "Client Testimonials & Reviews | MH Construction",
    description:
      "Authentic testimonials from our Client Partners. See why businesses across Washington, Oregon, and Idaho choose MH Construction.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Reviews | MH Construction",
    description:
      "Read what our Client Partners say about working with our veteran-owned construction team.",
  },
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
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

  return (
    <>
      {/* Schema.org Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      {aggregateRatingSchema && <StructuredData data={aggregateRatingSchema} />}
      {reviewSchemas.map((schema, index) => (
        <StructuredData key={index} data={schema} />
      ))}

      {/* Hero Section - Following MH Standard Pattern B (Centered) */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Decorative Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Content - Centered for standard pages */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <FadeInWhenVisible>
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Icon Badge */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/50 to-bronze-600/50 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-4 rounded-2xl shadow-2xl border-2 border-white/50">
                    <MaterialIcon
                      icon="forum"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Page Title */}
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-brand-secondary font-black drop-shadow-lg">
                  Client Testimonials & Reviews
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
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
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8">
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
                        />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-white/80">
                      {aggregateRating.ratingValue.toFixed(1)} Average Rating
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl font-black text-brand-secondary">
                      {aggregateRating.reviewCount}+
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      Client Reviews
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-3xl sm:text-4xl font-black text-brand-secondary">
                      20+
                    </p>
                    <p className="text-sm sm:text-base text-white/80">
                      Years Experience
                    </p>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link
                  href="https://search.google.com/local/writereview?placeid=234677025037995169"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl font-bold"
                >
                  <MaterialIcon icon="star" size="sm" />
                  <span>Leave a Google Review</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-brand-secondary shadow-xl font-bold"
                >
                  <MaterialIcon icon="contact_page" size="sm" />
                  <span>Start Your Project</span>
                </Link>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
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
          <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20">
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

              {/* Four Core Values Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-primary/10 p-3 rounded-lg">
                      <MaterialIcon
                        icon="visibility"
                        size="lg"
                        className="text-brand-primary"
                      />
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

                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-primary/10 p-3 rounded-lg">
                      <MaterialIcon
                        icon="verified_user"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      Integrity
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-brand-primary">
                      Promise-keeping culture
                    </span>{" "}
                    backed by 70% referral business and 650+ completed projects.
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    ✓ We finish what we start
                    <br />✓ Your word is your bond — so is ours
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-primary/10 p-3 rounded-lg">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">
                      Professionalism
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                    <span className="font-bold text-brand-primary">
                      Award-winning safety
                    </span>{" "}
                    with .64 EMR, 150+ years team experience, 3-state licensing.
                  </p>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    ✓ Military precision applied
                    <br />✓ Expert credentials
                  </div>
                </div>

                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-brand-primary/10 p-3 rounded-lg">
                      <MaterialIcon
                        icon="search"
                        size="lg"
                        className="text-brand-primary"
                      />
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
          </section>

          {/* Service Areas & Capabilities - SEO Content */}
          <section className="bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Service Areas */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon
                      icon="map"
                      size="lg"
                      className="text-brand-primary"
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
                    <div className="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="location_city"
                        size="sm"
                        className="text-brand-primary mt-1"
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
                    <div className="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="terrain"
                        size="sm"
                        className="text-brand-primary mt-1"
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
                    <div className="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="landscape"
                        size="sm"
                        className="text-brand-primary mt-1"
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

                {/* Project Types */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <MaterialIcon
                      icon="construction"
                      size="lg"
                      className="text-brand-primary"
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
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="business"
                        size="sm"
                        className="text-brand-primary mb-2"
                      />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                        Office Buildings
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Corporate spaces & tenant improvements
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="local_hospital"
                        size="sm"
                        className="text-brand-primary mb-2"
                      />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                        Medical Facilities
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Healthcare centers & clinics
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="factory"
                        size="sm"
                        className="text-brand-primary mb-2"
                      />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                        Industrial
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Warehouses & manufacturing
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="account_balance"
                        size="sm"
                        className="text-brand-primary mb-2"
                      />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                        Government
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Public sector & municipal
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="store"
                        size="sm"
                        className="text-brand-primary mb-2"
                      />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                        Retail & Hospitality
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Stores & restaurants
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <MaterialIcon
                        icon="agriculture"
                        size="sm"
                        className="text-brand-primary mb-2"
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

              {/* Grid of value propositions */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300">
                  <MaterialIcon
                    icon="handshake"
                    size="lg"
                    className="text-brand-primary mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Honest Communication
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Clear, direct updates throughout your project—no surprises,
                    just straightforward collaboration
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300">
                  <MaterialIcon
                    icon="military_tech"
                    size="lg"
                    className="text-brand-primary mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Veteran Excellence
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Military precision and dedication applied to commercial,
                    industrial, and government construction
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-brand-primary/20 hover:border-brand-primary/50 transition-all duration-300">
                  <MaterialIcon
                    icon="workspace_premium"
                    size="lg"
                    className="text-brand-primary mb-4"
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
          </section>
        </>
      ) : (
        /* Coming Soon State - No testimonials yet */
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <MaterialIcon
                icon="rate_review"
                size="3xl"
                className="text-brand-primary mx-auto"
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
                className="inline-flex items-center justify-center gap-2 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl font-bold text-lg"
              >
                <MaterialIcon icon="star" size="md" />
                <span>Leave a Google Review</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-brand-secondary shadow-xl font-bold text-lg"
              >
                <MaterialIcon icon="contact_page" size="md" />
                <span>Start Your Project</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 py-16 sm:py-20 lg:py-24 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Ready to Experience{" "}
            <span className="text-brand-secondary">
              Veteran-Owned Excellence?
            </span>
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-white/90">
            Join our satisfied Client Partners across the Pacific Northwest.
            Let's build something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand-secondary hover:bg-brand-secondary-light text-gray-900 px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-xl font-bold text-lg"
            >
              <MaterialIcon icon="contact_page" size="md" />
              <span>Get Started Today</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-white/30 shadow-xl font-bold text-lg"
            >
              <MaterialIcon icon="construction" size="md" />
              <span>View Our Services</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
