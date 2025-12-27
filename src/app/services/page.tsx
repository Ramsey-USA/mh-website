"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePageTracking } from "@/lib/analytics/hooks";
import { COMPANY_INFO } from "@/lib/constants/company";
import { Button, IconContainer } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import {
  ServicesHero,
  ServicesCTA,
  coreServices,
  specialtyServices,
  serviceAreas,
  ConstructionExpertiseSection,
  CoreServicesSection,
  SpecialtyServicesSection,
  GovernmentProjectsSection,
  ServiceAreasSection,
  ConstructionProcessSection,
  WhyChooseUs,
} from "@/components/services";
import { StrategicCTABanner } from "@/components/ui/cta";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load testimonials section for better performance
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { ssr: true },
);

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export default function ServicesPage() {
  // Analytics tracking
  usePageTracking("Services");

  // Get enhanced SEO data for Services page
  const servicesSEO = getServicesSEO();

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Services"
        description="We're refining our services descriptions to ensure 100% accuracy in what we offer and how we deliver exceptional results for every project."
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  // Structured Data for SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Construction Management Services",
    provider: {
      "@type": "Organization",
      name: "MH Construction, Inc.",
      "@id": "https://www.mhc-gc.com/#organization",
      url: "https://www.mhc-gc.com",
      telephone: "+1-509-308-6489",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3111 N. Capitol Ave.",
        addressLocality: "Pasco",
        addressRegion: "WA",
        postalCode: "99301",
        addressCountry: "US",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: "Pasco",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      {
        "@type": "City",
        name: "Kennewick",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      {
        "@type": "City",
        name: "Richland",
        containedInPlace: { "@type": "State", name: "Washington" },
      },
      { "@type": "State", name: "Washington" },
      { "@type": "State", name: "Oregon" },
      { "@type": "State", name: "Idaho" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Construction Management",
            description:
              "Comprehensive construction management services for commercial, industrial, and medical facilities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Master Planning & Pre-Construction",
            description:
              "Detailed pre-construction planning and coordination services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Procurement & Trade Partnership Management",
            description: "Material sourcing and vendor coordination services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Constructability & Budget Control",
            description: "Feasibility analysis and proactive budget management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Project Modularization",
            description: "Advanced subproject management for complex builds",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tenant Improvements",
            description: "Commercial space renovation and transformation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Religious Facility Construction",
            description:
              "Specialized construction for churches and religious facilities",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Government & Grant-Funded Projects",
            description:
              "Construction for government and grant-funded projects",
          },
        },
      ],
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}

      {/* Structured Data from servicesSEO */}
      {servicesSEO.schemas && servicesSEO.schemas.length > 0 && (
        <StructuredData data={servicesSEO.schemas} />
      )}

      {/* Legacy Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.services),
          ),
        }}
      />
      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "The Battle Plan" }]}
        />

        {/* Construction Expertise Section */}
        <ConstructionExpertiseSection />

        {/* Core Services Section */}
        <CoreServicesSection services={coreServices} />

        {/* Specialty Services Section */}
        <SpecialtyServicesSection services={specialtyServices} />

        {/* Client Testimonials Section - Optimal SEO position (25-30% page depth) */}
        <TestimonialsSection
          id="testimonials"
          subtitle="Client Partner"
          title="Testimonials"
          description="Hear directly from our partners about their experience working with MH Construction on their most important projects—where trust is earned, not claimed."
        />

        {/* Government & Grant-Funded Projects Section */}
        <GovernmentProjectsSection />

        {/* Service Areas Section */}
        <ServiceAreasSection serviceAreas={serviceAreas} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Construction Process Overview Section */}
        <ConstructionProcessSection />

        {/* Partnership Types Section - Client Partner vs Trade Partner */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="diversity_3"
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
                  Two Paths to
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Partnership Excellence
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Whether you're a{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  Client Partner with a construction project
                </span>{" "}
                or a{" "}
                <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
                  Trade Partner seeking partnership opportunities
                </span>
                , MH Construction offers{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  dedicated pathways to collaboration and success
                </span>
                .
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {/* Client Partner Relationships */}
              <FadeInWhenVisible>
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-shrink-0">
                          {/* Blur glow layer behind icon */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-2xl"></div>
                          <div className="relative w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <MaterialIcon
                              icon="handshake"
                              size="xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                            Client Partner Relationships
                          </h3>
                          <p className="text-brand-primary dark:text-brand-primary-light font-semibold text-lg">
                            Project Collaboration
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        For Client Partners—businesses and
                        organizations—planning construction projects across the
                        Pacific Northwest. We work{" "}
                        <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                          WITH you
                        </span>{" "}
                        to bring your vision to life through expert construction
                        management and partnership-focused collaboration.
                      </p>

                      <div className="mb-6 flex-grow">
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                          What We Offer Client Partners:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Free consultations and project assessments
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Free expert consultation (comprehensive)
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Transparent pricing and open-book approach
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Full-service construction management
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-primary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Master planning and pre-construction services
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 mt-auto">
                        <Link href="/projects" className="block">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full hover:scale-105 transition-transform duration-300 group"
                          >
                            <MaterialIcon
                              icon="photo_library"
                              size="md"
                              className="mr-2 group-hover:scale-110 transition-transform duration-300"
                            />
                            View Our Work
                          </Button>
                        </Link>
                        <Link href="/contact" className="block">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full hover:scale-105 transition-transform duration-300 group"
                          >
                            <MaterialIcon
                              icon="phone"
                              size="md"
                              className="mr-2 group-hover:scale-110 transition-transform duration-300"
                            />
                            Schedule Free Consultation
                          </Button>
                        </Link>
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                          <MaterialIcon
                            icon="phone"
                            size="sm"
                            className="inline mr-1"
                          />
                          Call (509) 308-6489
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible>
                {/* Trade Partnerships */}
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-shrink-0">
                          {/* Blur glow layer behind icon */}
                          <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg rounded-2xl"></div>
                          <div className="relative w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-brand-secondary to-bronze-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            <MaterialIcon
                              icon="construction"
                              size="xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                            Trade Partnerships
                          </h3>
                          <p className="text-brand-secondary dark:text-brand-secondary-light font-semibold text-lg">
                            Vendor Network
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                        For subcontractors, suppliers, and trade professionals
                        seeking{" "}
                        <span className="font-semibold text-brand-secondary dark:text-brand-secondary-light">
                          consistent project opportunities
                        </span>{" "}
                        with a veteran-owned construction leader in the Pacific
                        Northwest market.
                      </p>

                      <div className="mb-6 flex-grow">
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                          What We Offer Trade Partners:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Consistent project opportunities
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Professional growth in established network
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Early-stage project planning involvement
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Advanced notice for procurement planning
                            </span>
                          </li>
                          <li className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-200">
                            <div className="w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                              <MaterialIcon
                                icon="check_circle"
                                size="sm"
                                className="text-brand-secondary"
                              />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">
                              Partnership with veteran-owned business
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3 mt-auto">
                        <Link href="/allies" className="block">
                          <Button
                            variant="secondary"
                            size="lg"
                            className="w-full hover:scale-105 transition-transform duration-300 group"
                          >
                            <MaterialIcon
                              icon="construction"
                              size="md"
                              className="mr-2 group-hover:scale-110 transition-transform duration-300"
                            />
                            Join Trade Partner Network
                          </Button>
                        </Link>
                        <Link
                          href="/allies#vendor-application"
                          className="block"
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full hover:scale-105 transition-transform duration-300 group"
                          >
                            <MaterialIcon
                              icon="description"
                              size="md"
                              className="mr-2 group-hover:scale-110 transition-transform duration-300"
                            />
                            Download Vendor Package
                          </Button>
                        </Link>
                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                          <MaterialIcon
                            icon="phone"
                            size="sm"
                            className="inline mr-1"
                          />
                          Call (509) 308-6489
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Bottom Note */}
            <FadeInWhenVisible>
              <div className="mt-16 lg:mt-20 text-center max-w-3xl mx-auto">
                <div className="relative bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 p-6 lg:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    <MaterialIcon
                      icon="info"
                      size="md"
                      className="inline mr-2 text-brand-primary align-text-bottom"
                    />
                    <span className="font-medium">
                      Different pathways, same commitment to excellence.
                    </span>{" "}
                    Whether you're building a project or building your business,
                    MH Construction values every partnership relationship.
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section */}
        <section
          id="next-steps"
          className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary py-12 sm:py-16 lg:py-20 xl:py-24"
        >
          <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-white/30 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-white/90 via-white to-white/90 p-5 rounded-2xl shadow-2xl border-2 border-white/50">
                    <MaterialIcon
                      icon="rocket_launch"
                      size="2xl"
                      className="text-brand-primary drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-white/30 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Let's Build Something
                </span>
                <span className="block text-white font-black drop-shadow-lg overflow-visible py-2 pb-3 leading-normal">
                  Great Together
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Take the next step toward{" "}
                <span className="font-bold text-white">
                  bringing your construction vision to life
                </span>{" "}
                with transparent pricing, expert guidance, and{" "}
                <span className="font-bold text-white">
                  veteran-owned reliability
                </span>
                .
              </p>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
              {/* Option 1: Request Estimate */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(56,104,81,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-brand-primary hover:border-brand-primary-dark group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="bg-brand-primary -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-lg">
                  <span className="font-bold text-sm text-white uppercase tracking-wide">
                    Start Here
                  </span>
                </div>
                <IconContainer
                  size="lg"
                  gradient="primary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="calculate"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Get Expert Estimate
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Get a detailed, transparent estimate with line-item pricing
                  within 3-5 business days.
                </p>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Contact Us Today
                  </Button>
                </Link>
              </div>

              {/* Option 2: View Our Work */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(189,146,100,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-brand-secondary group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-brand-secondary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <IconContainer
                  size="lg"
                  gradient="secondary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="photo_library"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  See Our Victories
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Browse our completed projects and see the quality we deliver.
                </p>
                <Link href="/projects">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="photo_library"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Schedule Free Consultation
                  </Button>
                </Link>
              </div>

              {/* Option 3: Contact Us */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(56,104,81,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-brand-primary group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <IconContainer
                  size="lg"
                  gradient="primary"
                  className="mx-auto mb-6"
                >
                  <MaterialIcon
                    icon="calculate"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </IconContainer>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Contact Us
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Have questions? Reach out directly via phone, email, or
                  contact form for immediate help.
                </p>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-all duration-200"
                  >
                    <MaterialIcon
                      icon="mail"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mt-16 text-center text-white">
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  150+
                </p>
                <p className="text-white/90 text-lg">
                  Years Combined Experience
                </p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  .64 EMR
                </p>
                <p className="text-white/90 text-lg">Award-Winning Safety</p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  3-5 Days
                </p>
                <p className="text-white/90 text-lg">Estimate Turnaround</p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  24/7
                </p>
                <p className="text-white/90 text-lg">Emergency Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA - Ask Questions */}
        <section className="relative bg-gradient-to-r from-brand-primary to-brand-primary-dark py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
            <h2 className="mb-6 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
              Questions About Our Services?
            </h2>
            <p className="mx-auto max-w-3xl font-light text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed mb-8">
              Contact our team for answers about construction services, pricing,
              timelines, and capabilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/contact">
                  <MaterialIcon icon="phone" className="mr-2" />
                  Contact Our Team
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 hover:bg-white/20 text-white border-white/30"
              >
                <a href={`tel:${COMPANY_INFO.phone.tel}`}>
                  <MaterialIcon icon="call" className="mr-2" />
                  Call (509) 308-6489
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Section - Simplified */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="photo_library"
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
                  Our Construction
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Portfolio
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Explore our{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  completed projects showcasing quality craftsmanship
                </span>{" "}
                across{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  commercial, residential, and government sectors
                </span>
                .
              </p>
            </div>

            <FadeInWhenVisible className="text-center">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <MaterialIcon icon="visibility" className="mr-2" size="md" />
                  View Complete Portfolio
                </Button>
              </Link>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <MaterialIcon icon="info" size="sm" className="inline mr-2" />
                Detailed portfolio with High-Level CRM integration coming soon
              </p>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Strategic CTA Banner - Conversion Optimization */}
        <StrategicCTABanner variant="combo" className="my-0" />

        {/* CTA Section */}
        <ServicesCTA />
      </div>
    </>
  );
}
