import Link from "next/link";
import dynamic from "next/dynamic";
import { Button, Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
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
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { UnderConstruction } from "@/components/layout/UnderConstruction";
import { StructuredData } from "@/components/seo/seo-meta";
import Head from "next/head";
import { getServicesSEO } from "@/lib/seo/page-seo-utils";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load heavy below-the-fold components
const ChatbotCTASection = dynamic(
  () =>
    import("@/components/chatbot").then((mod) => ({
      default: mod.ChatbotCTASection,
    })),
  { ssr: true },
);
const InteractiveTimeline = dynamic(
  () =>
    import("@/components/timeline").then((mod) => ({
      default: mod.InteractiveTimeline,
    })),
  { ssr: true },
);

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = false;

export default function ServicesPage() {
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
      <Head>
        <title>{servicesSEO.title as string}</title>
        <meta name="description" content={servicesSEO.description as string} />
        {servicesSEO.keywords && (
          <meta
            name="keywords"
            content={
              Array.isArray(servicesSEO.keywords)
                ? servicesSEO.keywords.join(", ")
                : servicesSEO.keywords
            }
          />
        )}
        <link rel="canonical" href={servicesSEO.openGraph?.url as string} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={servicesSEO.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={servicesSEO.openGraph?.description as string}
        />
        <meta
          property="og:url"
          content={servicesSEO.openGraph?.url as string}
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={servicesSEO.twitter?.title as string}
        />
        <meta
          name="twitter:description"
          content={servicesSEO.twitter?.description as string}
        />
      </Head>

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

        {/* Government & Grant-Funded Projects Section */}
        <GovernmentProjectsSection />

        {/* Service Areas Section */}
        <ServiceAreasSection serviceAreas={serviceAreas} />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Interactive Timeline Tool - Visualize Your Project */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="timeline"
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
                  Visualize Your
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Project Timeline
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Get an{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  instant view of your project phases and timeline
                </span>
                . Adjust complexity to see how different factors affect your{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  construction schedule
                </span>
                .
              </p>
            </div>

            <InteractiveTimeline />
          </div>
        </section>

        {/* Construction Process Overview Section */}
        <ConstructionProcessSection />

        {/* Partnership Types Section - Client Partner vs Trade Partner */}
        <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
          {/* Diagonal Stripe Background Pattern */}
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
          <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>

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
                <Card className="relative bg-gradient-to-br from-brand-primary/5 via-brand-primary/8 to-brand-primary/10 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 border-2 border-brand-primary hover:border-brand-primary-dark dark:hover:border-brand-primary-light h-full hover:shadow-2xl dark:hover:shadow-brand-primary/20 hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 dark:bg-brand-primary/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

                  <CardContent className="relative p-8 lg:p-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <MaterialIcon
                          icon="handshake"
                          size="xl"
                          className="text-white"
                        />
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
                      For Client Partners—businesses and organizations—planning
                      construction projects across the Pacific Northwest. We
                      work{" "}
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
                  </CardContent>
                </Card>
              </FadeInWhenVisible>

              {/* Trade Partnerships */}
              <FadeInWhenVisible>
                <Card className="relative bg-gradient-to-br from-brand-secondary/5 via-brand-secondary/8 to-brand-secondary/10 dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 border-2 border-brand-secondary hover:border-brand-secondary-dark dark:hover:border-brand-secondary-light h-full hover:shadow-2xl dark:hover:shadow-brand-secondary/20 hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 dark:bg-brand-secondary/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

                  <CardContent className="relative p-8 lg:p-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <MaterialIcon
                          icon="construction"
                          size="xl"
                          className="text-white"
                        />
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
                      <Link href="/allies#vendor-application" className="block">
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
                  </CardContent>
                </Card>
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
          className="relative bg-gradient-to-br from-accent-600 via-accent-700 to-primary-600 py-20 lg:py-32"
        >
          <div className="absolute inset-0 bg-[url('/images/textures/construction-pattern.png')] opacity-5"></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-black text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                Let's Build Something Great Together
              </h2>
              <p className="mx-auto max-w-3xl font-light text-accent-100 text-xl sm:text-2xl md:text-3xl leading-relaxed">
                Take the next step toward bringing your construction vision to
                life with transparent pricing, expert guidance, and
                veteran-owned reliability.
              </p>
            </div>

            <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
              {/* Option 1: Request Estimate */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(56,104,81,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border-4 border-primary-500 hover:border-primary-400 group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="bg-primary-500 -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-lg">
                  <span className="font-bold text-sm text-white uppercase tracking-wide">
                    Start Here
                  </span>
                </div>
                <div className="relative flex justify-center items-center bg-gradient-to-br from-primary-500 to-primary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="calculate"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
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
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(189,146,100,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-secondary-400 group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="photo_library"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
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
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(47,93,69,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-accent-400 group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative flex justify-center items-center bg-gradient-to-br from-accent-500 to-accent-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="contact_phone"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
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
                    className="relative w-full bg-accent-600 hover:bg-accent-700 group/btn hover:scale-105 transition-all duration-200"
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
                <p className="text-accent-100 text-lg">
                  Years Combined Experience
                </p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  .64 EMR
                </p>
                <p className="text-accent-100 text-lg">Award-Winning Safety</p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  3-5 Days
                </p>
                <p className="text-accent-100 text-lg">Estimate Turnaround</p>
              </div>
              <div className="group">
                <p className="mb-2 font-black text-4xl lg:text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">
                  24/7
                </p>
                <p className="text-accent-100 text-lg">Emergency Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot CTA - Ask Questions */}
        <ChatbotCTASection
          context="services"
          title="Questions About Our Services?"
          subtitle="Chat with General MH for instant answers about our construction services, pricing, timelines, and capabilities"
          exampleQuestions={[
            "What types of commercial construction projects do you handle?",
            "Do you work on government or grant-funded projects?",
            "What's included in your Master Planning services?",
            "How do you handle trade partnership management?",
            "What's your experience with religious facility construction?",
            "Can you help with tenant improvements in the Tri-Cities?",
          ]}
        />

        {/* Portfolio Section - Simplified */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

        {/* CTA Section */}
        <ServicesCTA />
      </div>
    </>
  );
}
