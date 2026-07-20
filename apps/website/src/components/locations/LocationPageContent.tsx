"use client";

import Link from "next/link";
import { usePageTracking } from "@/lib/analytics/hooks";
import { Button } from "@/components/ui";
import { SectionContainer } from "@/components/layout";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { StructuredData } from "@/components/seo/SeoMeta";
import { enhancedSEO } from "@/components/seo/EnhancedSEO";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { CORE_VALUE_ICONS } from "@/lib/constants/navigation-icons";
import { useLocale } from "next-intl";
import {
  type LocationData,
  getLocationBridgeDeepLinks,
  getLocationEvidenceProfile,
  getLocationProjectDeepLinks,
  getLocationServiceDeepLinks,
} from "@/lib/data/locations";

const coreValues = [
  {
    icon: CORE_VALUE_ICONS.honesty,
    title: "Honesty",
    desc: "Transparent communication and pricing",
  },
  {
    icon: CORE_VALUE_ICONS.integrity,
    title: "Integrity",
    desc: "Your word is your bond - so is ours",
  },
  {
    icon: CORE_VALUE_ICONS.professionalism,
    title: "Professionalism",
    desc: "Disciplined execution in every project",
  },
  {
    icon: CORE_VALUE_ICONS.thoroughness,
    title: "Thoroughness",
    desc: "Attention to detail in every phase",
  },
];

const trustIndicators = [
  { icon: "verified", label: "Licensed in WA, OR, ID" },
  { icon: "military_tech", label: "Veteran-Owned Leadership" },
  { icon: "workspace_premium", label: "650+ Projects Completed" },
];

interface LocationPageProps {
  readonly location: LocationData;
  readonly heroSlogan?: string;
}

export function LocationPageContent({
  location,
  heroSlogan = getHeroPageSlogan("locationDetail").slogan,
}: Readonly<LocationPageProps>) {
  const locale = useLocale();
  const isEs = locale === "es";
  const coreValuesLocalized = isEs
    ? [
        {
          icon: CORE_VALUE_ICONS.honesty,
          title: "Honestidad",
          desc: "Comunicacion y precios transparentes",
        },
        {
          icon: CORE_VALUE_ICONS.integrity,
          title: "Integridad",
          desc: "Su palabra es su compromiso - y la nuestra tambien",
        },
        {
          icon: CORE_VALUE_ICONS.professionalism,
          title: "Profesionalismo",
          desc: "Ejecucion disciplinada en cada proyecto",
        },
        {
          icon: CORE_VALUE_ICONS.thoroughness,
          title: "Minuciosidad",
          desc: "Atencion al detalle en cada fase",
        },
      ]
    : coreValues;
  const trustIndicatorsLocalized = isEs
    ? [
        { icon: "verified", label: "Licencia en WA, OR e ID" },
        { icon: "military_tech", label: "Liderazgo veterano" },
        { icon: "workspace_premium", label: "650+ proyectos completados" },
      ]
    : trustIndicators;
  usePageTracking(`Location - ${location.city}`);
  const universalCtas = getUniversalCtaSet(isEs ? "es" : "en");
  const priorityServices = location.servicePriorities || [];
  const standardPositioningLine = `Primary markets: AG and winery communities, mission-ready fit-outs, and municipal builds. Core specialties: pole buildings, door and hardware installation, and mission management powered by Procore. ${MH_SLOGANS.supporting[0]}`;
  const nearbyAreas = location.nearbyAreas || [];
  const locationTelephoneHref = `tel:${Array.from(location.telephone)
    .filter((char) => /\d/.test(char))
    .join("")}`;
  const heroPriorityLine =
    priorityServices.length > 0
      ? `Priority focus in ${location.city}: ${priorityServices.slice(0, 2).join(" and ")}. ${standardPositioningLine}`
      : standardPositioningLine;

  const serviceCards = [
    {
      icon: "business",
      title: priorityServices[0] || "Mission-Ready Construction",
      description:
        priorityServices.length > 0
          ? `${priorityServices[0]} delivery tailored for ${location.city} and ${location.county}, with Procore-based mission controls and fit-out planning for AG and winery community operations.`
          : "Office buildings, retail spaces, and municipal facilities supported by Procore-based mission management from concept to handoff.",
    },
    {
      icon: "factory",
      title: priorityServices[1] || "Industrial Construction",
      description:
        priorityServices.length > 1
          ? `${priorityServices[1]} projects across ${location.city} with safety-forward operations, predictable scheduling, and specialty delivery for pole buildings.`
          : "Manufacturing facilities, warehouses, and pole buildings (including PEMB/post-frame applications), engineered for durability and operational efficiency.",
    },
    {
      icon: "account_balance",
      title: priorityServices[2] || "Government Projects",
      description:
        priorityServices.length > 2
          ? `${priorityServices[2]} solutions supporting municipal standards, government compliance, and long-term lifecycle value in ${location.state}.`
          : "Municipal and public-sector construction supported by government compliance planning, procurement transparency, and experienced agency coordination.",
    },
    {
      icon: "home_repair_service",
      title: "Mission Management",
      description:
        "End-to-end coordination from front-end scope definition through handoff, powered by Procore with budget transparency, door/hardware tracking, and local permitting alignment.",
    },
  ];

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbPatterns[
      location.breadcrumbKey as keyof typeof breadcrumbPatterns
    ],
  );
  const serviceDeepLinks = getLocationServiceDeepLinks(location.slug);
  const projectDeepLinks = getLocationProjectDeepLinks(location.slug);
  const bridgeDeepLinks = getLocationBridgeDeepLinks(location.slug);
  const locationEvidence = getLocationEvidenceProfile(location.slug);
  const isOfficeLocation = locationEvidence.presenceType === "office";
  const officeAddress = `${location.address.street}, ${location.address.city}, ${location.address.state} ${location.address.zip}`;

  // Generate location-specific structured data
  const sharedLocationSchemaFields = {
    "@context": "https://schema.org",
    "@id": `${enhancedSEO.siteUrl}/locations/${location.slug}#service-area`,
    name: `MH Construction - ${location.city}`,
    description: `General contractor serving ${location.city}, ${location.state} with AG and winery community projects, commercial tenant improvements, and municipal builds. Specialties include pole buildings, door and hardware installation, and Procore project management.`,
    url: `${enhancedSEO.siteUrl}/locations/${location.slug}`,
    telephone: location.telephone,
    email: location.email,
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
    knowsAbout: [
      ...priorityServices,
      "AG and winery community construction",
      "Mission-ready fit-outs",
      "Municipal and government construction",
      "Pole buildings",
      "Door and hardware installation",
      "Procore project management",
    ],
    slogan: MH_SLOGANS.primary,
    veteranOwned: true,
    serviceType: [
      ...(priorityServices.length > 0
        ? priorityServices
        : ["Mission-Ready Construction", "Municipal Construction"]),
      "Mission-ready fit-outs",
      "Pole Building Construction",
      "Door and Hardware Installation",
      "Mission Management powered by Procore",
    ],
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

  const locationSchema = isOfficeLocation
    ? {
        ...sharedLocationSchemaFields,
        "@type": "LocalBusiness",
        "@id": `${enhancedSEO.siteUrl}/locations/${location.slug}#localbusiness`,
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
      }
    : {
        ...sharedLocationSchemaFields,
        "@type": "Service",
        provider: {
          "@id": `${enhancedSEO.siteUrl}/#organization`,
        },
      };

  return (
    <>
      <StructuredData data={locationSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main className="min-h-screen flex flex-col">
        {/* Hero Section - Location Specific */}
        <section className="hero-section hero-safe-top-lg relative bg-linear-to-br from-gray-900 via-brand-primary to-gray-900 text-white pb-20 sm:pb-28 md:pb-36 lg:pb-44">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
              <Breadcrumbs
                items={[
                  { label: isEs ? "Inicio" : "Home", href: "/" },
                  {
                    label: isEs ? "Ubicaciones" : "Locations",
                    href: "/locations",
                  },
                  { label: `${location.city}, ${location.state}` },
                ]}
                className="mb-6 bg-transparent text-white/70 [&_nav]:border-0 [&_nav]:bg-transparent [&_nav]:py-0 [&_span[aria-current='page']]:text-white [&_a]:text-white/70 [&_a:hover]:text-white"
              />

              {/* Location Badge */}
              <div className="flex items-center justify-center gap-2 text-brand-secondary">
                <MaterialIcon icon="place" size="lg" />
                <span className="text-lg sm:text-xl font-semibold">
                  {isOfficeLocation
                    ? isEs
                      ? `Oficina y cobertura de servicio en ${location.city}, ${location.state}`
                      : `Office and service coverage in ${location.city}, ${location.state}`
                    : isEs
                      ? `Cobertura de area de servicio en ${location.city}, ${location.state}`
                      : `Service area coverage in ${location.city}, ${location.state}`}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-black text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
                <span className="block text-white mb-3">
                  {isEs ? "Contratista general en" : "General Contractor in"}
                </span>
                <span className="block text-brand-secondary drop-shadow-lg">
                  {location.city}, {location.state}
                </span>
              </h1>

              {/* Tagline */}
              <p className="font-body max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light">
                {location.description}
              </p>
              <p className="font-body max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-brand-secondary/90 leading-relaxed font-medium">
                {heroPriorityLine}
              </p>

              {/* Core Slogan */}
              <p className="text-sm sm:text-base md:text-lg text-white/80 font-medium">
                {COMPANY_INFO.slogan.primary}
              </p>
              <p className="text-sm sm:text-base md:text-lg text-brand-secondary/90 font-medium">
                {heroSlogan}
              </p>
              <p className="text-xs sm:text-sm text-white/75 font-medium">
                {isOfficeLocation
                  ? isEs
                    ? `Oficina publica: ${officeAddress}`
                    : `Public office: ${officeAddress}`
                  : isEs
                    ? `${locationEvidence.regionalRelationship} Esta pagina no representa una oficina publica fisica.`
                    : `${locationEvidence.regionalRelationship} No physical public office is represented on this page.`}
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
                      className=" transition-colors"
                    />
                    {isEs
                      ? `Programar consulta en ${location.city}`
                      : `Schedule ${location.city} Consultation`}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="group w-full sm:w-auto"
                >
                  <Link href={locationTelephoneHref}>
                    <MaterialIcon
                      icon="phone"
                      size="md"
                      className=" transition-colors"
                    />
                    {isEs
                      ? `Llamar para apoyo de ${priorityServices[0] || "proyecto"}`
                      : `Call for ${priorityServices[0] || "Project"} Support`}
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-8 text-xs sm:text-sm text-white/70">
                {trustIndicatorsLocalized.map((t) => (
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
        <section className="order-1 py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    {isEs
                      ? "Servicios de construccion"
                      : "Construction Services"}
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    {isEs ? "en" : "in"} {location.city}, {location.state}
                  </span>
                </h2>
                <p className="font-body max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-6">
                  {isEs
                    ? `Servicios integrales de gestion de construccion para proyectos comerciales, industriales y del sector publico en ${location.city} y el area de ${location.county}.`
                    : `Comprehensive construction management services for commercial, industrial, and government projects throughout ${location.city} and the ${location.county} area.`}
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
                    <p className="font-body text-gray-600 dark:text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* GEO-Intent Internal Links */}
              <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {isEs
                    ? `Planifique su proyecto en ${location.city}`
                    : `Plan Your ${location.city} Project`}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                  {isEs
                    ? `Explore nuestro marco completo de servicios, ejemplos de proyectos y ruta de consulta directa para ${location.city}, ${location.state}.`
                    : `Explore our full service framework, project examples, and direct consultation path for ${location.city}, ${location.state}.`}
                </p>
                <div className="flex flex-wrap gap-3">
                  {serviceDeepLinks.map((serviceLink) => (
                    <Link
                      key={serviceLink.href}
                      href={serviceLink.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                    >
                      <MaterialIcon icon="verified" size="sm" />
                      {serviceLink.label}
                    </Link>
                  ))}
                  {projectDeepLinks.map((projectLink) => (
                    <Link
                      key={projectLink.href}
                      href={projectLink.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                    >
                      <MaterialIcon icon="work" size="sm" />
                      {projectLink.label}
                    </Link>
                  ))}
                  {bridgeDeepLinks.map((bridgeLink) => (
                    <Link
                      key={bridgeLink.href}
                      href={bridgeLink.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-secondary transition-colors"
                    >
                      <MaterialIcon icon="account_balance" size="sm" />
                      {bridgeLink.label}
                    </Link>
                  ))}
                  <Link
                    href={universalCtas.allServices.href}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                  >
                    <MaterialIcon icon="build" size="sm" />
                    {universalCtas.allServices.label}
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-primary transition-colors"
                  >
                    <MaterialIcon icon="work" size="sm" />
                    {universalCtas.portfolio.label}
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary-dark transition-colors"
                  >
                    <MaterialIcon icon="phone" size="sm" />
                    {universalCtas.primary.label}
                  </Link>
                  <Link
                    href="/allies"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:border-brand-secondary transition-colors"
                  >
                    <MaterialIcon icon="handshake" size="sm" />
                    {isEs
                      ? "Red de aliados de oficio"
                      : "Trade Partner Network"}
                  </Link>
                </div>
                {nearbyAreas.length > 0 && (
                  <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    {isEs
                      ? `Cobertura de servicio cercana: ${nearbyAreas.join(", ")}.`
                      : `Nearby service coverage: ${nearbyAreas.join(", ")}.`}
                  </p>
                )}
              </div>
            </div>
          </SectionContainer>
        </section>

        {/* Recent Projects Section — City-specific GEO-proof content */}
        {location.recentProjects && location.recentProjects.length > 0 && (
          <section className="order-3 py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-800/60">
            <SectionContainer padding="compact">
              <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                  <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                    <span className="block text-brand-primary">
                      {isEs ? "Proyectos recientes" : "Recent Projects"}
                    </span>
                    <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl mt-3">
                      {isEs ? "en" : "in"} {location.city}, {location.state}
                    </span>
                  </h2>
                  <p className="font-body max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light mt-4">
                    {isEs
                      ? "Trabajo comprobado en las comunidades que atendemos, construido con honestidad, integridad, profesionalismo y minuciosidad en cada proyecto."
                      : "Proven work in the communities we serve — built with honesty, integrity, professionalism, and thoroughness on every project."}
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
                        <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
                        className="text-brand-primary shrink-0 mt-0.5"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                          {isEs
                            ? "Construccion publica y gubernamental"
                            : "Public & Government Construction"}
                        </h3>
                        <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                          {isEs
                            ? `MH Construction tiene un historial comprobado en instalaciones publicas y de seguridad de mision critica, desde estaciones activas de bomberos hasta infraestructura municipal, atendiendo ${location.city} y comunidades cercanas. Cuando hay vidas en juego, la minuciosidad no es negociable.`
                            : `MH Construction has a proven record on mission-critical public safety and government facilities — from active fire stations to municipal infrastructure — serving ${location.city} and surrounding communities. When lives depend on the build, Thoroughness is non-negotiable.`}
                        </p>
                        <Link
                          href="/public-sector"
                          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary dark:text-brand-primary-light hover:underline"
                        >
                          <MaterialIcon icon="arrow_forward" size="sm" />
                          {isEs
                            ? "Explorar servicios del sector publico"
                            : "Explore Public & Government Services"}
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
        <section className="order-2 py-16 sm:py-20 md:py-24 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="max-w-5xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 sm:mb-20">
                <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight tracking-tighter mb-4">
                  <span className="block text-brand-primary">
                    {isEs
                      ? `Por que ${location.city} elige`
                      : `Why ${location.city} Chooses`}
                  </span>
                  <span className="block text-gray-700 dark:text-gray-300 font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl mt-3">
                    MH Construction
                  </span>
                </h2>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {coreValuesLocalized.map((v) => (
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
                    className="text-brand-primary shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {location.localExpertise.title}
                    </h3>
                    {location.localExpertise.description.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-body text-gray-600 dark:text-gray-300 leading-relaxed mb-4 last:mb-0"
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
        <section className="order-4 py-12 sm:py-16 bg-white dark:bg-gray-900">
          <SectionContainer padding="compact">
            <div className="text-center">
              <p className="font-heading text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-4">
                {isEs ? "Acreditado y certificado" : "Accredited & Certified"}
              </p>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {isEs
                  ? `Confianza en todo ${location.city}`
                  : `Trusted Throughout ${location.city}`}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {isEs
                  ? "Nuestras credenciales reflejan el compromiso con calidad, etica y seguridad"
                  : "Our credentials reflect our commitment to quality, ethics, and safety"}
              </p>
              <AccreditationsLogoRow showChambers={false} />
            </div>
          </SectionContainer>
        </section>

        {/* Contact CTA Section */}
        <section className="order-5 py-16 sm:py-20 md:py-24 bg-linear-to-br from-brand-primary via-brand-primary to-brand-primary-dark text-white">
          <SectionContainer padding="compact">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <h2 className="font-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
                {isEs ? "Listo para iniciar su" : "Ready to Start Your"}{" "}
                <span className="block text-brand-secondary mt-2">
                  {isEs
                    ? `proyecto de construccion en ${location.city}?`
                    : `${location.city} Construction Project?`}
                </span>
              </h2>

              <p className="font-body max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-light">
                {isEs
                  ? "Conversemos sobre como MH Construction puede convertir su vision en resultados con un enfoque veterano, centrado en relaciones y servicio orientado a alianzas."
                  : "Let's discuss how MH Construction can bring your vision to life with a Veteran-Owned, relationship-first approach and partnership-driven service."}
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
                      className=" transition-colors"
                    />
                    {isEs
                      ? "Programar consulta gratuita"
                      : "Schedule Free Consultation"}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  <Link href={universalCtas.allServices.href}>
                    <MaterialIcon
                      icon="build"
                      size="md"
                      className=" transition-colors"
                    />
                    {universalCtas.allServices.label}
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="pt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-white/80">
                <a
                  href={locationTelephoneHref}
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
                  <span>
                    {isEs ? "Lun-Vie: 7am - 4pm" : "Mon-Fri: 7am - 4pm"}
                  </span>
                </div>
              </div>
            </div>
          </SectionContainer>
        </section>
      </main>
    </>
  );
}
