"use client";

import Link from "next/link";
import { usePageTracking } from "@/lib/analytics/hooks";
import { Button } from "@/components/ui";
import { SectionContainer } from "@/components/layout";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";
import { enhancedSEO } from "@/components/seo/EnhancedSEO";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { type LocationData } from "@/lib/data/locations";

const coreValues = [
  {
    icon: "handshake",
    title: "Honesty",
    desc: "Transparent communication and pricing",
  },
  {
    icon: "verified_user",
    title: "Integrity",
    desc: "Your word is your bond - so is ours",
  },
  {
    icon: "engineering",
    title: "Professionalism",
    desc: "Disciplined execution in every project",
  },
  {
    icon: "task_alt",
    title: "Thoroughness",
    desc: "Attention to detail in every phase",
  },
];

const trustIndicators = [
  { icon: "verified", label: "Licensed in WA, OR, ID" },
  { icon: "military_tech", label: "Veteran-Owned" },
  { icon: "workspace_premium", label: "650+ Projects Completed" },
];

interface LocationPageProps {
  location: LocationData;
}

export function LocationPageContent({ location }: LocationPageProps) {
  usePageTracking(`Location - ${location.city}`);
  const priorityServices = location.servicePriorities || [];
  const nearbyAreas = location.nearbyAreas || [];
  const heroPriorityLine =
    priorityServices.length > 0
      ? `Priority focus in ${location.city}: ${priorityServices.slice(0, 2).join(" and ")}.`
      : "Priority focus: commercial, industrial, and government construction delivery.";

  const serviceCards = [
    {
      icon: "business",
      title: priorityServices[0] || "Commercial Construction",
      description:
        priorityServices.length > 0
          ? `${priorityServices[0]} delivery tailored for ${location.city} and ${location.county}, with veteran-led execution and transparent project controls.`
          : "Office buildings, retail spaces, restaurants, medical facilities, and religious facilities. Professional construction management from concept to completion.",
    },
    {
      icon: "factory",
      title: priorityServices[1] || "Industrial Construction",
      description:
        priorityServices.length > 1
          ? `${priorityServices[1]} projects across ${location.city} with mission-ready crews, safety-forward operations, and predictable scheduling.`
          : "Manufacturing facilities, warehouses, and pre-engineered metal buildings (PEMB). Engineered for durability and operational efficiency.",
    },
    {
      icon: "account_balance",
      title: priorityServices[2] || "Government Projects",
      description:
        priorityServices.length > 2
          ? `${priorityServices[2]} solutions supporting public-sector standards and long-term lifecycle value in ${location.state}.`
          : "Public sector construction with veteran-owned business advantages. Experienced with government compliance and procurement processes.",
    },
    {
      icon: "home_repair_service",
      title: "Construction Management",
      description:
        "End-to-end coordination from preconstruction through closeout, aligned to your mission scope, budget transparency, and local permitting needs.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbPatterns[
      location.breadcrumbKey as keyof typeof breadcrumbPatterns
    ],
  );

  // Generate location-specific structured data
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${enhancedSEO.siteUrl}/locations/${location.slug}#localbusiness`,
    name: `MH Construction - ${location.city}`,
    description: `Veteran-owned general contractor serving ${location.city}, ${location.state} with commercial, industrial, and government construction services.`,
    url: `${enhancedSEO.siteUrl}/locations/${location.slug}`,
    telephone: location.telephone,
    email: location.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
    areaServed: [
      {
        "@type": "City",
        name: location.city,
        addressRegion: location.state,
        addressCountry: "US",
      },
      ...(location.serviceZipCodes || []).map((zip) => ({
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.state,
        postalCode: zip,
        addressCountry: "US",
      })),
    ],
    knowsAbout: priorityServices,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$$$",
    paymentAccepted: [
      "Cash",
      "Credit Card",
      "Check",
      "ACH",
      "Financing Available",
    ],
    currenciesAccepted: "USD",
    slogan: "Building projects for the client, NOT the dollar",
    veteranOwned: true,
    serviceType:
      priorityServices.length > 0
        ? priorityServices
        : [
            "General Contractor",
            "Commercial Construction",
            "Industrial Construction",
            "Government Construction Projects",
            "Construction Management",
          ],
    // GEO-proof: surface verified completed projects in structured data so search engines
    // can associate MH Construction with specific named projects and categories in this city.
    ...(location.recentProjects && location.recentProjects.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Recent Projects — ${location.city}, ${location.state}`,
            itemListElement: location.recentProjects.map((project, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: {
                "@type": "Service",
                name: project.name,
                description:
                  project.description ||
                  `${project.category} project completed in ${location.city}, ${location.state} by MH Construction.`,
                serviceType: project.category,
              },
            })),
          },
        }
      : {}),
  };

  return (
    <>
      <StructuredData data={locationSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main className="min-h-screen">
        {/* Hero Section - Location Specific */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 sm:py-28 md:py-36 lg:py-44">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
              {/* Location Badge */}
              <div className="flex items-center justify-center gap-2 text-brand-secondary">
                <MaterialIcon icon="place" size="lg" />
                <span className="text-lg sm:text-xl font-semibold">
                  Serving {location.city}, {location.state}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
                <span className="block text-white mb-3">
                  General Contractor in
                </span>
                <span className="block text-brand-secondary drop-shadow-lg">
                  {location.city}, {location.state}
                </span>
              </h1>

              {/* Tagline */}
              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light">
                {location.description}
              </p>
              <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-brand-secondary/90 leading-relaxed font-medium">
                {heroPriorityLine}
              </p>

              {/* Core Slogan */}
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium">
                "Building projects for the client, NOT the dollar"
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href="/contact">
                    <MaterialIcon
                      icon="event"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Schedule {location.city} Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href={`tel:${location.telephone.replace(/\D/g, "")}`}>
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Call for {priorityServices[0] || "Project"} Support
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-8 text-xs sm:text-sm text-white/70">
                {trustIndicators.map((t) => (
                  <div key={t.label} className="flex items-center gap-2">
                    <MaterialIcon icon={t.icon} size="sm" />
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    Construction Services
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    in {location.city}, {location.state}
                  </span>
                </h2>
                <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6">
                  Comprehensive construction management services for commercial,
                  industrial, and government projects throughout {location.city}{" "}
                  and the {location.county} area.
                </p>
                {priorityServices.length > 0 && (
                  <div className="mt-8 inline-flex flex-wrap justify-center gap-2">
                    {priorityServices.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light text-xs sm:text-sm font-semibold"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {serviceCards.map((card) => (
                  <div
                    key={card.title}
                    className="bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <MaterialIcon
                        icon={card.icon}
                        size="xl"
                        className="text-brand-primary"
                      />
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* GEO-Intent Internal Links */}
              <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Plan Your {location.city} Project
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                  Explore our full service framework, project examples, and
                  direct consultation path for {location.city}, {location.state}
                  .
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                  >
                    <MaterialIcon icon="build" size="sm" />
                    View All Services
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                  >
                    <MaterialIcon icon="work" size="sm" />
                    See Project Portfolio
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary-dark transition-colors"
                  >
                    <MaterialIcon icon="phone" size="sm" />
                    Start a Consultation
                  </Link>
                </div>
                {nearbyAreas.length > 0 && (
                  <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Nearby service coverage: {nearbyAreas.join(", ")}.
                  </p>
                )}
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Recent Projects Section — City-specific GEO-proof content */}
        {location.recentProjects && location.recentProjects.length > 0 && (
          <section className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-800/60">
            <SectionContainer padding="compact">
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                    <span className="block text-brand-primary">
                      Recent Projects
                    </span>
                    <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl mt-3">
                      in {location.city}, {location.state}
                    </span>
                  </h2>
                  <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-4">
                    Proven work in the communities we serve — built with
                    honesty, integrity, professionalism, and thoroughness on
                    every project.
                  </p>
                </div>

                {/* Project Cards — format: Name | Year (if any) | Category */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {location.recentProjects.map((project) => (
                    <div
                      key={project.name}
                      className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-5 sm:p-6 rounded-lg hover:border-brand-primary dark:hover:border-brand-primary transition-all hover:shadow-lg"
                    >
                      {/* Category + Year badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary dark:text-brand-primary-light border border-brand-primary/20">
                          {project.category}
                        </span>
                        {project.year && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                            {project.year}
                          </span>
                        )}
                      </div>

                      {/* Project name */}
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 leading-snug">
                        {project.name}
                      </h3>

                      {/* Description */}
                      {project.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                      )}

                      {/* Core value badge */}
                      {project.coreValue && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center gap-1.5">
                          <MaterialIcon
                            icon="verified"
                            size="sm"
                            className="text-brand-secondary"
                          />
                          <span className="text-xs font-semibold text-brand-secondary">
                            {project.coreValue}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Public & Government service callout — only for cities with verified public-safety work.
                    Creates a strong service↔location bond: Zillah Fire Station #10 → /public-sector */}
                {location.publicSectorHighlight && (
                  <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-xl border-2 border-brand-primary/30 bg-brand-primary/5 dark:bg-brand-primary/10">
                    <div className="flex items-start gap-4">
                      <MaterialIcon
                        icon="account_balance"
                        size="xl"
                        className="text-brand-primary flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                          Public &amp; Government Construction
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                          MH Construction has a proven record on
                          mission-critical public safety and government
                          facilities — from active fire stations to municipal
                          infrastructure — serving {location.city} and
                          surrounding communities. When lives depend on the
                          build, Thoroughness is non-negotiable.
                        </p>
                        <Link
                          href="/public-sector"
                          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary dark:text-brand-primary-light hover:underline"
                        >
                          <MaterialIcon icon="arrow_forward" size="sm" />
                          Explore Public &amp; Government Services
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SectionContainer>
          </section>
        )}

        {/* Why Choose MH Construction */}
        <section className="py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    Why {location.city} Chooses
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    MH Construction
                  </span>
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {coreValues.map((v) => (
                  <div key={v.title} className="text-center">
                    <div className="flex justify-center mb-4">
                      <MaterialIcon
                        icon={v.icon}
                        size="2xl"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Local Expertise Callout */}
              <div className="mt-12 sm:mt-16 bg-white dark:bg-gray-900 border-2 border-brand-primary p-6 sm:p-8 rounded-lg">
                <div className="flex items-start gap-4">
                  <MaterialIcon
                    icon="location_city"
                    size="xl"
                    className="text-brand-primary flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {location.localExpertise.title}
                    </h3>
                    {location.localExpertise.description.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Accreditations Section */}
        <section className="py-12 sm:py-16 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="text-center">
              <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-4">
                Accredited & Certified
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Trusted Throughout {location.city}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our credentials reflect our commitment to quality, ethics, and
                safety
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                {/* BBB Accredited A+ */}
                <a
                  href={COMPANY_INFO.bbb.sealClickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="BBB Accredited Business - A+ Rating"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.bbb.sealHorizontal}
                    alt="BBB Accredited Business A+ Rating"
                    className="h-10 sm:h-12 w-auto dark:hidden"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.bbb.sealHorizontalWhite}
                    alt="BBB Accredited Business A+ Rating"
                    className="h-10 sm:h-12 w-auto hidden dark:block"
                  />
                </a>

                {/* AGC Member */}
                <a
                  href="https://agcwa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="AGC of Washington Member"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo/agc-member.png"
                    alt="AGC of Washington Member"
                    className="h-10 sm:h-12 w-auto"
                  />
                </a>

                {/* Travelers Insurance Partner */}
                <a
                  href={COMPANY_INFO.travelers.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  title="Travelers Insurance - Auto & Bonding Partner"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.travelers.logo}
                    alt="Travelers Insurance - Auto & Bonding Partner"
                    className="h-10 sm:h-12 w-auto dark:hidden"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.travelers.logoWhite}
                    alt="Travelers Insurance - Auto & Bonding Partner"
                    className="h-10 sm:h-12 w-auto hidden dark:block"
                  />
                </a>

                {/* Veteran-Owned Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20">
                  <MaterialIcon
                    icon="military_tech"
                    size="lg"
                    className="text-brand-primary dark:text-brand-primary-light"
                    ariaLabel="Veteran-Owned"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white text-sm">
                    Veteran-Owned Business
                  </span>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-primary via-brand-primary to-brand-primary-dark text-white">
          <SectionContainer padding="compact">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                Ready to Start Your
                <span className="block text-brand-secondary mt-2">
                  {location.city} Construction Project?
                </span>
              </h2>

              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Let's discuss how MH Construction can bring your vision to life
                with a veteran-owned, relationship-first approach and
                partnership-driven service.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href="/contact">
                    <MaterialIcon
                      icon="event"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    Schedule Free Consultation
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  <Link href="/services">
                    <MaterialIcon
                      icon="construction"
                      size="md"
                      className="group-hover:scale-110 transition-transform"
                    />
                    View All Services
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-white/80">
                <a
                  href={`tel:${location.telephone.replace(/\D/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="phone" size="sm" />
                  <span>{location.telephone}</span>
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MaterialIcon icon="email" size="sm" />
                  <span>{location.email}</span>
                </a>
                <div className="flex items-center gap-2">
                  <MaterialIcon icon="schedule" size="sm" />
                  <span>Mon-Fri: 7am - 4pm</span>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>
    </>
  );
}
