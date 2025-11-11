"use client";

import Link from "next/link";
import { Button, Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Section, SectionHeader } from "@/components/ui/layout";
import {
  ServicesHero,
  ServiceCard,
  SpecialtyServiceCard,
  WhyChooseUs,
  ServicesCTA,
  coreServices,
  specialtyServices,
  serviceAreas,
} from "@/components/services";
import { TestimonialGrid } from "@/components/testimonials";
import { getClientTestimonials } from "@/lib/data/testimonials";
import { ChatbotCTASection } from "@/components/chatbot";
import { InteractiveTimeline } from "@/components/timeline";
import { gridPresets } from "@/lib/styles/layout-variants";

// Import shared sections
import { AIEstimatorCTA } from "@/components/shared-sections";

export default function ServicesPage() {
  // Structured Data for SEO
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Construction Management Services",
    provider: {
      "@type": "Organization",
      name: "MH Construction LLC",
      "@id": "https://www.mhc-gc.com/#organization",
      url: "https://www.mhc-gc.com",
      telephone: "+1-509-308-6489",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3111 N. Capital Ave.",
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section */}
        <ServicesHero />

        {/* Construction Expertise Section */}
        <Section variant="default" padding="default">
          <SectionHeader
            subtitle="Partnership-Focused"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Construction Management
              </span>
            }
            description={
              <>
                <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                  Planning a new commercial building demands intricate details
                  and expert partnership oversight. Work WITH us through
                  comprehensive Partnership-Focused Construction Management
                  services throughout the Tri-Cities (Pasco, WA) area.
                </p>

                <div className="relative bg-gradient-to-br from-brand-primary/5 via-brand-primary/10 to-brand-accent/5 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800 p-6 sm:p-8 lg:p-10 border-l-4 border-brand-primary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>

                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <MaterialIcon
                        icon="handshake"
                        size="lg"
                        className="text-brand-primary"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed text-left">
                        <strong className="text-brand-primary dark:text-brand-primary-light block mb-3 text-xl sm:text-2xl font-black">
                          Our Partnership Priority:
                        </strong>
                        Delivering an exceptional partnership experience from
                        start to finish. Our commitment to thorough
                        communication and upfront collaboration is critical to
                        streamlining the process, preventing costly on-the-fly
                        decisions later on.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mt-12">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[280px] group"
                    >
                      <MaterialIcon
                        icon="phone"
                        size="lg"
                        className="mr-3 group-hover:rotate-12 transition-transform duration-300"
                      />
                      <span className="font-medium">Call (509) 308-6489</span>
                    </Button>
                  </Link>
                  <Link href="/booking" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[280px] group"
                    >
                      <MaterialIcon
                        icon="event"
                        size="lg"
                        className="mr-3 group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="font-medium">
                        Schedule Free Consultation
                      </span>
                    </Button>
                  </Link>
                </div>
              </>
            }
          />
        </Section>

        {/* Core Services Section */}
        <Section id="core-services" variant="gray" padding="default">
          <SectionHeader
            subtitle="Core Partnership"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Services
              </span>
            }
            description="Comprehensive partnership-focused management services designed to bring your vision to life through collaboration and military precision"
          />

          <StaggeredFadeIn
            className={gridPresets.cards3("md", "mx-auto max-w-7xl")}
          >
            {coreServices.map((service, _index) => (
              <ServiceCard key={_index} service={service} />
            ))}
          </StaggeredFadeIn>
        </Section>

        {/* Specialty Services Section */}
        <Section variant="default" padding="default">
          <SectionHeader
            subtitle="Specialized Partnership"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Solutions
              </span>
            }
            description="Diverse collaborative construction expertise across the Tri-Cities and Pacific Northwest region"
          />

          <StaggeredFadeIn
            className={gridPresets.cards3("lg", "mx-auto max-w-7xl")}
          >
            {specialtyServices.map((service, _index) => (
              <SpecialtyServiceCard key={_index} service={service} />
            ))}
          </StaggeredFadeIn>
        </Section>

        {/* Government & Grant-Funded Projects Section */}
        <Section variant="gray" padding="default">
          <SectionHeader
            subtitle="Public Sector Expertise"
            title={
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Government & Grant-Funded Projects
              </span>
            }
            description="MH Construction brings specialized expertise in government and grant-funded construction projects. We understand the unique requirements, documentation standards, and compliance needs of public sector work throughout the Pacific Northwest."
          />

          <FadeInWhenVisible>
            <div className="mx-auto max-w-5xl">
              {/* Main Government Services Card */}
              <Card className="relative bg-gradient-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-2 border-brand-primary shadow-xl hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-500 mb-8 overflow-hidden group">
                {/* Decorative background pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-1000"></div>

                <CardContent className="relative p-8 lg:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <MaterialIcon
                        icon="account_balance"
                        size="2xl"
                        className="text-white"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                      Comprehensive Government Project Management
                    </h3>
                  </div>

                  <p className="mb-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    From federal buildings to state facilities and local
                    municipal projects, our team navigates complex government
                    requirements with{" "}
                    <span className="text-brand-primary dark:text-brand-primary-light font-semibold">
                      precision and efficiency
                    </span>
                    . We specialize in grant documentation, compliance
                    management, and public sector communication standards.
                  </p>

                  {/* Government Project Types Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="relative bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-2xl border border-brand-primary/20 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group/card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                          <MaterialIcon
                            icon="gavel"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                          Federal Projects
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>GSA Facilities & Federal Buildings</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Military Base Construction & Renovations</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Federal Grant-Funded Projects</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Veterans Affairs Facilities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="relative bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 dark:from-gray-800 dark:to-gray-800/80 p-6 rounded-2xl border border-brand-primary/20 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group/card">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-300">
                          <MaterialIcon
                            icon="location_city"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                          State & Local Projects
                        </h4>
                      </div>
                      <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Municipal Buildings & City Halls</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Educational Facilities & Schools</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>Public Safety & Emergency Services</span>
                        </li>
                        <li className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary mt-1 flex-shrink-0"
                          />
                          <span>State Grant-Funded Infrastructure</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Grant Documentation Expertise */}
                  <div className="relative bg-gradient-to-r from-brand-secondary/10 via-brand-secondary/15 to-brand-secondary/10 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800 p-6 lg:p-8 rounded-2xl mb-6 border border-brand-secondary/20 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden group/grant">
                    {/* Decorative accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover/grant:scale-150 transition-transform duration-700"></div>

                    <div className="relative flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-brand-secondary/20 dark:bg-brand-secondary/30 rounded-xl flex items-center justify-center group-hover/grant:scale-110 transition-transform duration-300">
                        <MaterialIcon
                          icon="description"
                          size="lg"
                          className="text-brand-secondary"
                        />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                        Grant Documentation & Compliance
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Our team excels at navigating complex grant requirements,
                      ensuring your project meets all documentation standards
                      and compliance mandates. We manage:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="verified"
                          size="sm"
                          className="text-brand-secondary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Complete documentation services
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="verified"
                          size="sm"
                          className="text-brand-secondary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Regulatory compliance management
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="verified"
                          size="sm"
                          className="text-brand-secondary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Audit preparation & support
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MaterialIcon
                          icon="verified"
                          size="sm"
                          className="text-brand-secondary"
                        />
                        <span className="text-gray-700 dark:text-gray-300">
                          Progress reporting systems
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/booking" className="w-full sm:w-auto">
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 group"
                      >
                        <MaterialIcon
                          icon="event"
                          size="md"
                          className="mr-2 group-hover:scale-110 transition-transform duration-300"
                        />
                        Discuss Government Project
                      </Button>
                    </Link>
                    <Link href="/contact" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto hover:scale-105 transition-transform duration-300 group"
                      >
                        <MaterialIcon
                          icon="mail"
                          size="md"
                          className="mr-2 group-hover:scale-110 transition-transform duration-300"
                        />
                        Request Project Information
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us for Government Work */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <MaterialIcon
                        icon="military_tech"
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      Veteran-Owned Advantage
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Military background provides unique understanding of
                      government standards and protocols
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <MaterialIcon
                        icon="workspace_premium"
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      Licensed in 3 States
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Qualified for government projects across Washington,
                      Oregon, and Idaho
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-brand-primary/10 hover:-translate-y-2 transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <MaterialIcon
                        icon="verified"
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      Compliance Expertise
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Deep experience with federal, state, and local compliance
                      requirements
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeInWhenVisible>
        </Section>

        {/* Service Areas Section */}
        <section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-accent dark:from-brand-primary-dark dark:via-gray-900 dark:to-gray-800 py-20 lg:py-32 text-white overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary-dark/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2 className="mb-8 pb-2 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter drop-shadow-lg">
                  <span className="block mb-4 font-semibold text-white/95 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Areas We
                  </span>
                  <span className="block text-white font-black">Serve</span>
                </h2>
              </div>
            </FadeInWhenVisible>

            <StaggeredFadeIn
              className={gridPresets.twoColumn("md", "mx-auto max-w-4xl")}
            >
              {serviceAreas.map((area, _index) => (
                <Card
                  key={_index}
                  className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md border-2 border-white/30 dark:border-white/20 p-8 hover:bg-white/15 hover:border-white/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 group overflow-hidden"
                >
                  {/* Card decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative flex items-center mb-6 gap-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <MaterialIcon
                        icon={area.iconName}
                        size="xl"
                        className="text-white"
                      />
                    </div>
                    <h3 className="text-white text-2xl font-black drop-shadow-md">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="relative space-y-3">
                    {area.areas.map((location, lIndex) => (
                      <li
                        key={lIndex}
                        className="flex items-center group/item hover:translate-x-1 transition-transform duration-200"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-brand-secondary/30 dark:bg-brand-secondary/40 rounded-lg flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform duration-200">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary"
                          />
                        </div>
                        <span className="text-white/90 text-lg">
                          {location}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Client Testimonials Section - SERVICE FOCUSED */}
        <TestimonialGrid
          testimonials={getClientTestimonials()}
          title="What Our Partners Say About Us"
          subtitle="Real feedback from partners who trust us with their commercial and residential construction projects"
          variant="client"
          showViewMoreButton={true}
          viewMoreHref="/about#testimonials"
        />

        {/* Interactive Timeline Tool - Visualize Your Project */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-12">
                <h2 className="mb-6 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
                  <span className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl">
                    Visualize Your
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary">
                    Project Timeline
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
                  Get an instant view of your project phases and timeline.
                  Adjust complexity to see how different factors affect your
                  construction schedule.
                </p>
              </div>
            </FadeInWhenVisible>

            <InteractiveTimeline />
          </div>
        </section>

        {/* Construction Process Overview Section */}
        <section
          id="process"
          className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32"
        >
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Our Partnership
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Construction Process
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                  From initial consultation to project completion, we guide you
                  through every step with transparency, communication, and
                  collaborative excellence
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="mx-auto max-w-6xl relative">
              {/* Vertical connecting line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-brand-primary via-brand-secondary to-brand-accent dark:from-brand-primary-dark dark:via-brand-secondary-dark dark:to-brand-accent hidden sm:block"></div>

              <StaggeredFadeIn className="space-y-8 lg:space-y-12">
                {/* Step 1 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start relative">
                  <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-accent shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                    <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      1
                    </span>
                    {/* Pulse animation */}
                    <div className="absolute inset-0 rounded-full bg-brand-primary/50 animate-ping opacity-20"></div>
                  </div>
                  <Card className="flex-1 bg-gradient-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-primary hover:shadow-2xl dark:hover:shadow-brand-primary/10 hover:-translate-y-1 transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MaterialIcon
                            icon="contact_phone"
                            size="lg"
                            className="text-brand-primary"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Initial Consultation
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        We start by listening to your vision, understanding your
                        needs, and discussing your project goals. Whether you
                        have detailed plans or just an idea, we'll work{" "}
                        <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                          WITH you
                        </span>{" "}
                        to clarify scope, timeline, and budget expectations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                          Free Consultation
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                          No Obligation
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1.5 rounded-full text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-colors duration-200">
                          24-48 Hour Response
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 2 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start relative">
                  <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-amber-700 shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                    <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      2
                    </span>
                    <div className="absolute inset-0 rounded-full bg-brand-secondary/50 animate-ping opacity-20"></div>
                  </div>
                  <Card className="flex-1 bg-gradient-to-br from-white to-brand-secondary/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-secondary hover:shadow-2xl dark:hover:shadow-brand-secondary/10 hover:-translate-y-1 transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MaterialIcon
                            icon="calculate"
                            size="lg"
                            className="text-brand-secondary"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Detailed Estimation & Planning
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our Lead Estimator provides a comprehensive, transparent
                        cost breakdown with no hidden fees. We analyze all
                        variables, identify potential risks, and create a
                        realistic timeline. You'll understand{" "}
                        <span className="font-semibold text-brand-secondary dark:text-brand-secondary-light">
                          every aspect
                        </span>{" "}
                        of your project costs upfront.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                          Transparent Pricing
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                          20+ Years Experience
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1.5 rounded-full text-brand-secondary text-sm font-medium hover:bg-brand-secondary/20 transition-colors duration-200">
                          No Surprises
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 3 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start relative">
                  <div className="relative flex justify-center items-center bg-gradient-to-br from-brand-accent via-forest-600 to-forest-700 shadow-xl rounded-full w-16 h-16 flex-shrink-0 z-10 ring-4 ring-white dark:ring-gray-800 hover:scale-110 transition-transform duration-300 group">
                    <span className="font-black text-2xl text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                      3
                    </span>
                    <div className="absolute inset-0 rounded-full bg-brand-accent/50 animate-ping opacity-20"></div>
                  </div>
                  <Card className="flex-1 bg-gradient-to-br from-white to-brand-accent/5 dark:from-gray-900 dark:to-gray-800 border-l-4 border-brand-accent hover:shadow-2xl dark:hover:shadow-brand-accent/10 hover:-translate-y-1 transition-all duration-300 group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MaterialIcon
                            icon="description"
                            size="lg"
                            className="text-brand-accent"
                          />
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Contract & Pre-Construction
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        We finalize contracts with clear terms, obtain necessary
                        permits, coordinate with subcontractors, and schedule
                        materials. Our Project Manager handles{" "}
                        <span className="font-semibold text-brand-accent dark:text-brand-accent-light">
                          all paperwork
                        </span>
                        , submittals, and RFIs while keeping you informed every
                        step of the way.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
                          Clear Contracts
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
                          Permit Handling
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1.5 rounded-full text-forest-700 text-sm font-medium hover:bg-brand-accent/20 transition-colors duration-200">
                          Full Coordination
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 4 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-primary to-brand-primary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">4</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-primary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="construction"
                          size="lg"
                          className="text-brand-primary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Construction Execution
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Our Senior Superintendent oversees all on-site
                        operations with award-winning safety standards (.6 EMR).
                        We provide regular progress updates, coordinate
                        subcontractors, manage quality inspections, and address
                        any issues immediately. You're never left wondering
                        what's happening.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          Daily Updates
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          .6 EMR Safety
                        </span>
                        <span className="bg-brand-primary/10 px-3 py-1 rounded-full text-brand-primary text-sm">
                          Quality Control
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 5 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-secondary to-brand-secondary-dark shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">5</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-secondary border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="fact_check"
                          size="lg"
                          className="text-brand-secondary"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Quality Inspections & Compliance
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Multi-point quality inspections at every project phase
                        ensure code compliance and craftsmanship excellence.
                        Third-party inspections, building department
                        coordination, and thorough documentation mean your
                        project meets all standards.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Code Compliance
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Quality Checks
                        </span>
                        <span className="bg-brand-secondary/10 px-3 py-1 rounded-full text-brand-secondary text-sm">
                          Full Documentation
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Step 6 */}
                <div className="flex sm:flex-row flex-col gap-6 items-start">
                  <div className="flex justify-center items-center bg-gradient-to-br from-brand-accent to-forest-700 shadow-lg rounded-full w-16 h-16 flex-shrink-0">
                    <span className="font-black text-2xl text-white">6</span>
                  </div>
                  <Card className="flex-1 bg-white dark:bg-gray-900 border-brand-accent border-l-4">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <MaterialIcon
                          icon="check_circle"
                          size="lg"
                          className="text-brand-accent"
                        />
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          Project Close-Out & Follow-Up
                        </h3>
                      </div>
                      <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        Final walkthrough, punch list completion, warranty
                        documentation, and post-project support ensure your
                        complete satisfaction. We don't disappear after
                        completion—THE ROI IS THE RELATIONSHIP means we're here
                        for the long term.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Final Walkthrough
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Warranty Support
                        </span>
                        <span className="bg-brand-accent/10 px-3 py-1 rounded-full text-forest-700 text-sm">
                          Ongoing Partnership
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </StaggeredFadeIn>

              {/* CTA Section */}
              <FadeInWhenVisible>
                <div className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 shadow-xl mx-auto mt-16 p-8 lg:p-12 border-2 border-brand-primary dark:border-brand-primary/50 rounded-2xl max-w-4xl text-center">
                  <MaterialIcon
                    icon="handshake"
                    size="4xl"
                    className="mb-6 text-brand-primary"
                  />
                  <h3 className="mb-4 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl">
                    Ready to Start Your Project?
                  </h3>
                  <p className="mb-8 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    Let's discuss your construction needs and create a plan
                    together. Free consultation, transparent pricing, and
                    partnership-focused collaboration from day one.
                  </p>
                  <div className="flex sm:flex-row flex-col justify-center gap-6">
                    <Link href="/booking">
                      <Button
                        variant="primary"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon icon="event" size="lg" className="mr-3" />
                        <span className="font-medium">
                          Schedule Free Consultation
                        </span>
                      </Button>
                    </Link>
                    <Link href="/estimator">
                      <Button
                        variant="outline"
                        size="lg"
                        className="transition-all duration-300 min-w-[260px]"
                      >
                        <MaterialIcon
                          icon="calculate"
                          size="lg"
                          className="mr-3"
                        />
                        <span className="font-medium">Get Expert Estimate</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Partnership Types Section - Client vs Trade */}
        <section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <FadeInWhenVisible>
              <div className="mx-auto max-w-4xl text-center mb-16">
                <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                    Two Paths to
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary font-black">
                    Partnership Excellence
                  </span>
                </h2>
                <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl leading-relaxed tracking-wide px-2">
                  Whether you're a client with a construction project or a trade
                  professional seeking partnership opportunities, MH
                  Construction offers dedicated pathways to collaboration and
                  success.
                </p>
              </div>
            </FadeInWhenVisible>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
              {/* Client Partnerships */}
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
                          Client Partnerships
                        </h3>
                        <p className="text-brand-primary dark:text-brand-primary-light font-semibold text-lg">
                          Project Collaboration
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                      For businesses and organizations planning construction
                      projects. We work{" "}
                      <span className="font-semibold text-brand-primary dark:text-brand-primary-light">
                        WITH you
                      </span>{" "}
                      to bring your vision to life through expert construction
                      management and partnership-focused collaboration.
                    </p>

                    <div className="mb-6 flex-grow">
                      <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                        What We Offer Clients:
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
                            AI-powered instant estimates (24/7)
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
                      <Link href="/estimator" className="block">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full bg-brand-primary hover:bg-brand-primary-dark hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="calculate"
                            size="md"
                            className="mr-2 group-hover:scale-110 transition-transform duration-300"
                          />
                          Get Instant AI Estimate
                        </Button>
                      </Link>
                      <Link href="/booking" className="block">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full hover:scale-105 transition-transform duration-300 group"
                        >
                          <MaterialIcon
                            icon="event"
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
                        Call (509) 308-6489 ext. 100
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
                      <Link href="/trade-partners" className="block">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full bg-brand-secondary hover:bg-brand-secondary-dark hover:scale-105 transition-transform duration-300 group"
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
                        href="/trade-partners#vendor-application"
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
                        Call (509) 308-6489 ext. 150
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
                <Link href="/estimator">
                  <Button
                    variant="primary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="calculate"
                      size="md"
                      className="mr-2 group-hover/btn:rotate-12 transition-transform duration-300"
                    />
                    Get Expert Estimate
                  </Button>
                </Link>
              </div>

              {/* Option 2: Schedule Consultation */}
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(189,146,100,0.3)] p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-secondary-400 group overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>

                <div className="relative flex justify-center items-center bg-gradient-to-br from-secondary-500 to-secondary-600 mx-auto mb-6 rounded-full w-20 h-20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MaterialIcon
                    icon="event"
                    size="xl"
                    className="text-white group-hover:rotate-12 transition-transform duration-300"
                  />
                </div>
                <h3 className="relative mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white">
                  Schedule Free Consultation
                </h3>
                <p className="relative mb-6 text-center text-gray-600 text-lg dark:text-gray-300 leading-relaxed">
                  Book a free consultation to discuss your project scope,
                  timeline, and goals.
                </p>
                <Link href="/booking">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="relative w-full group/btn hover:scale-105 transition-transform duration-200"
                  >
                    <MaterialIcon
                      icon="calendar_today"
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
                  .6 EMR
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

        {/* AI Estimator CTA - Services Page */}
        <AIEstimatorCTA variant="compact" location="services" />

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
            <FadeInWhenVisible className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  Our Construction
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Portfolio
                </span>
              </h2>
              <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                Explore our completed projects showcasing quality craftsmanship
                across commercial, residential, and government sectors
              </p>
            </FadeInWhenVisible>

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
