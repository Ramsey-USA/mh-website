import { type Metadata } from "next";
import { headers } from "next/headers";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageTrackingClient } from "@/components/analytics";
import { HomePageSentrySupport } from "@/components/monitoring/HomePageSentrySupport";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Testimonial } from "@/lib/data/testimonials";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
import {
  formatDualPageName,
  MH_SLOGANS,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";
import enHome from "../../../../messages/home/en.json";
import esHome from "../../../../messages/home/es.json";
import { BrandedContentSection } from "@/components/templates";

import { HeroSection, WhyPartnerSection } from "@/components/home";
import { TestimonialsSectionDeferred } from "@/components/home/TestimonialsSectionDeferred";
import { TimelineDeferred } from "@/components/home/TimelineDeferred";
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

const SITE_URL = "https://www.mhc-gc.com";
const HOME_COPY_BY_LOCALE = {
  en: enHome,
  es: esHome,
} as const;
const HOME_SECTION_SPACING = "py-10 sm:py-12 lg:py-16";
const HOME_SECTION_SPACING_TIGHT_TOP =
  "pt-8 sm:pt-10 lg:pt-14 pb-10 sm:pb-12 lg:pb-16";
const HOME_CARD_CLASS =
  "rounded-2xl border border-gray-200/90 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-5 sm:p-6 shadow-md";
const HOME_CTA_PRIMARY_CLASS =
  "inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm sm:text-base font-bold text-white shadow hover:bg-brand-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";
const HOME_CTA_SECONDARY_CLASS =
  "inline-flex items-center justify-center rounded-xl border-2 border-brand-primary/70 dark:border-brand-primary-light/70 bg-brand-primary/10 dark:bg-brand-primary/20 px-5 py-3 text-sm sm:text-base font-bold text-brand-primary-dark dark:text-brand-primary-light shadow-sm hover:bg-brand-primary/15 dark:hover:bg-brand-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";
const HOME_FAQ_CARD_CLASS =
  "rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gray-50/85 dark:bg-gray-800/85 p-4 shadow-sm";

export const metadata: Metadata = withGeoMetadata({
  title: {
    absolute: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | Mission-Ready Construction, Fit-Outs, Municipal, and Light Industrial | MH Construction`,
  },
  description: `Mission-ready construction partner for agricultural and winery communities, fit-outs, municipal projects, and light industrial scopes across WA, OR, and ID. Relationship-first delivery with Procore-backed mission management. ${MH_SLOGANS.primary}`,
  keywords: [
    "general contractor Pasco, WA",
    "mission-ready construction services",
    "agricultural community construction",
    "winery community construction",
    "mission-ready fit-outs",
    "municipal construction",
    "pole building contractor",
    "door and hardware installation",
    "Procore mission management",
    "industrial facility construction",
    "office remodeling and renovation",
    "mission management solutions",
    "mission management",
    "mission-ready renovation",
    "building addition contractor",
    "construction design",
    "general contractor Tri-State",
    "Veteran-Owned contractor Pacific Northwest",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "mission-ready construction Tri-State",
    "mission management services",
    "mission planning predeployment",
    "tenant improvement contractor",
    "light industrial construction Pacific Northwest",
    "general contractor Yakima WA",
    "general contractor Spokane WA",
    "general contractor Walla Walla WA",
    "general contractor Omak WA",
    "general contractor Pendleton OR",
    "veteran construction values",
    "WA OR ID licensed contractor",
    "Eastern Washington contractor",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | Mission-Ready Construction, Fit-Outs, Municipal, and Light Industrial | MH Construction`,
    description: `Mission-ready construction services for agricultural and winery communities, fit-outs, municipal, and light industrial projects with disciplined scope control and Procore-based delivery. ${MH_SLOGANS.primary}`,
    url: SITE_URL,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction general contractor project team",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | Mission-Ready Construction, Fit-Outs, Municipal, and Light Industrial | MH Construction`,
    description: `Mission-ready construction services with agricultural and winery expertise, occupied-space fit-out delivery, municipal execution, and light industrial mission management. ${MH_SLOGANS.supporting[0]}`,
    images: ["/images/og-default.jpg"],
  },
});

export default async function Home() {
  // Analytics tracking remains client-only while page rendering stays server-first

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();
  const locale = await getServerLocale();
  const tTestimonials = await getTranslations({
    locale,
    namespace: "testimonialsData",
  });
  const homeCopy = HOME_COPY_BY_LOCALE[locale] ?? enHome;
  const clientTestimonials = (
    tTestimonials.raw("clientTestimonials") as Array<{
      id: string;
      name: string;
      location?: string;
      project?: string;
      company?: string;
      rating?: number;
      quote: string;
      featured?: boolean;
      date?: string;
      image?: string;
      category?: string;
    }>
  ).map(
    (testimonial) =>
      ({
        ...testimonial,
        type: "client",
      }) as Testimonial,
  );
  const processSteps = (
    homeCopy.process.steps as Array<{ title: string; desc: string }>
  ).map((step: { title: string; desc: string }, index: number) => ({
    num: index + 1,
    icon:
      [
        "assignment",
        "engineering",
        "build",
        "verified_user",
        "task_alt",
        "support_agent",
      ][index] ?? "timeline",
    title: step.title,
    desc: step.desc,
    position: index % 2 === 0 ? ("left" as const) : ("right" as const),
  }));
  const isProduction = process.env.NODE_ENV === "production";
  const requestHeaders = await headers();
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableHomeTelemetry = isProduction && !isLighthouseAudit;
  const splashCopy =
    locale === "es"
      ? {
          overviewSubtitle: "Brief de la Misión",
          overviewTitle:
            "Entrega Lista para la Misión con Ejecución Disciplinada",
          overviewDescription:
            "MH Construction entrega proyectos agrícolas y de bodegas, acondicionamientos en espacios activos, obra municipal e industrial ligero con control de alcance, transparencia y coordinación en Procore.",
          overviewButtons: [
            {
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=primary-services",
              label: "Ver Servicios",
            },
            {
              href: "/projects?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=proof-projects",
              label: "Ver Proyectos",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=start-contact",
              label: "Hablar con el Equipo",
            },
          ],
          serviceSubtitle: "Sectores de Misión",
          serviceTitle: "Servicios de Construcción por Sector de Despliegue",
          serviceDescription:
            "Nuestra operación es principalmente comercial. También evaluamos Custom Home Builds selectivos cuando el alcance y la ruta de entrega están alineados.",
          serviceCards: [
            {
              title: "Agrícola y Bodegas",
              desc: "Infraestructura especializada, secuenciación técnica y coordinación de campo para operaciones agrícolas y de bodega.",
            },
            {
              title: "Tenant Improvements Comerciales",
              desc: "Mejoras para inquilinos en espacios activos con control de cronograma, puertas/herrajes y continuidad operativa.",
            },
            {
              title: "Municipal e Industrial Ligero",
              desc: "Entrega orientada a cumplimiento, documentación de cierre y estándares de seguridad en proyectos públicos e industriales.",
            },
          ],
          processSubtitle: "Cómo Ejecutamos",
          processTitle: "Proceso de Ejecución de la Misión en Seis Fases",
          trustSubtitle: "Confianza y Rendición de Cuentas",
          trustTitle:
            "Por Qué Socios de Misión Eligen Nuestro Equipo de Misión",
          trustDescription:
            "Resultados consistentes, comunicación clara y una cadena operativa responsable desde la planificación hasta el cierre.",
          testimonialSubtitle: "Prueba de Socios",
          testimonialTitle: "Testimonios de Socios y Resultados de Misión",
          testimonialDescription:
            "Comentarios de socios de misión en proyectos agrícolas/de bodega, acondicionamientos comerciales y proyectos municipales.",
          finalSubtitle: "Siguiente Movimiento",
          finalTitle: "Comience con una Revisión de Alcance para la Misión",
          finalDescription:
            "Si su proyecto es comercial o necesita evaluar ajuste de alcance, nuestro equipo puede orientar la siguiente decisión.",
          finalButtons: [
            {
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=final-services",
              label: "Revisar Servicios",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=final-contact",
              label: "Solicitar Conversación",
            },
          ],
        }
      : {
          overviewSubtitle: "Mission Brief",
          overviewTitle:
            "Mission-Ready Construction Built on Relationship-First Execution",
          overviewDescription:
            "MH Construction delivers agricultural and winery, commercial fit-out, municipal, and light industrial missions with disciplined scope control, transparent communication, and Procore-backed command-and-control.",
          overviewButtons: [
            {
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=primary-services",
              label: "Explore Services",
            },
            {
              href: "/projects?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=proof-projects",
              label: "View Projects",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=start-contact",
              label: "Talk With Our Team",
            },
          ],
          serviceSubtitle: "Mission Sectors",
          serviceTitle: "Construction Services by Deployment Sector",
          serviceDescription:
            "Our delivery is primarily commercial. We also entertain select Custom Home Builds when scope fit and delivery requirements align.",
          serviceCards: [
            {
              title: "Agricultural and Winery Projects",
              desc: "Specialized infrastructure, technical sequencing, and field coordination for agricultural and winery operations.",
            },
            {
              title: "Commercial Tenant Improvements",
              desc: "Occupied-space tenant improvements with schedule control, door/hardware integration, and business continuity planning.",
            },
            {
              title: "Municipal and Light Industrial",
              desc: "Compliance-forward delivery with audit-ready handoff packages and safety-first execution for public and industrial scopes.",
            },
          ],
          processSubtitle: "How We Execute",
          processTitle: "Mission Delivery Process in Six Phases",
          trustSubtitle: "Trust and Accountability",
          trustTitle: "Why Mission Partners Choose Our Mission Team",
          trustDescription:
            "Consistent execution, direct communication, and accountable operating controls from planning through mission handoff for owners, architects, bonding banks, insurers, and mission partners.",
          testimonialSubtitle: "Mission Partner Proof",
          testimonialTitle: "Mission Partner Testimonials and Outcomes",
          testimonialDescription:
            "Feedback from mission partners across agricultural/winery, commercial fit-out, and municipal-facing project scopes.",
          finalSubtitle: "Next Step",
          finalTitle: "Start with a Mission Scope Review",
          finalDescription:
            "If your project is commercial or needs a fit-first review, our team can help you define the best delivery path.",
          finalButtons: [
            {
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=final-services",
              label: "Review Services",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=final-contact",
              label: "Request Consultation",
            },
          ],
        };

  return (
    <>
      {enableHomeTelemetry ? <PageTrackingClient pageName="Home" /> : null}
      {enableHomeTelemetry ? <HomePageSentrySupport /> : null}

      {/* Enhanced SEO structured data for Veteran-Owned construction excellence */}
      {isProduction ? <StructuredData data={homepageSEO.schemas} /> : null}

      {/* Home Page Hero Section */}
      <HeroSection locale={locale} copy={homeCopy.hero} />

      <BrandedContentSection
        id="company-overview"
        variant="white"
        className={HOME_SECTION_SPACING}
        header={{
          icon: "domain",
          iconVariant: "primary",
          subtitle: splashCopy.overviewSubtitle,
          title: splashCopy.overviewTitle,
          description: splashCopy.overviewDescription,
        }}
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
            {locale === "es" ? "Revise " : "Review "}
            <Link
              href="/services?utm_source=homepage&utm_medium=internal-link&utm_campaign=home-splash&utm_content=overview-services"
              className="font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {locale === "es"
                ? "servicios listos para la misión"
                : "mission-ready services"}
            </Link>
            {locale === "es" ? ", vea nuestro " : ", see our "}
            <Link
              href="/projects?utm_source=homepage&utm_medium=internal-link&utm_campaign=home-splash&utm_content=overview-projects"
              className="font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {locale === "es" ? "archivo de misiones" : "mission portfolio"}
            </Link>
            {locale === "es" ? " o " : " or "}
            <Link
              href="/contact?utm_source=homepage&utm_medium=internal-link&utm_campaign=home-splash&utm_content=overview-contact"
              className="font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
            >
              {locale === "es"
                ? "contacte a nuestro equipo de misión"
                : "contact our mission team"}
            </Link>
            .
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-5xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {splashCopy.overviewButtons.map((button, index) => (
            <Link
              key={button.label}
              href={button.href}
              className={
                index === 0 ? HOME_CTA_PRIMARY_CLASS : HOME_CTA_SECONDARY_CLASS
              }
            >
              {button.label}
            </Link>
          ))}
        </div>
      </BrandedContentSection>

      <BrandedContentSection
        id="service-overview"
        variant="gray"
        className={HOME_SECTION_SPACING}
        header={{
          icon: "construction",
          iconVariant: "secondary",
          subtitle: splashCopy.serviceSubtitle,
          title: splashCopy.serviceTitle,
          description: splashCopy.serviceDescription,
        }}
      >
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {splashCopy.serviceCards.map((card) => (
            <article key={card.title} className={HOME_CARD_CLASS}>
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="font-body mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {card.desc}
              </p>
              <Link
                href="/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-splash&utm_content=service-card"
                className="mt-4 inline-flex items-center text-sm sm:text-base font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
              >
                {locale === "es"
                  ? "Ver detalle de servicios comerciales"
                  : "View commercial service details"}
              </Link>
            </article>
          ))}
        </div>
      </BrandedContentSection>

      <TimelineDeferred
        id="our-process"
        icon="timeline"
        subtitle={splashCopy.processSubtitle}
        title={splashCopy.processTitle}
        description={
          <>
            {homeCopy.process.descriptionPart1}{" "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              {homeCopy.process.descriptionPart2}
            </span>
            {homeCopy.process.descriptionPart3}{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              {homeCopy.process.descriptionPart4}
            </span>
            {homeCopy.process.descriptionPart5}
          </>
        }
        steps={processSteps}
        compact
        initiallyVisibleSteps={3}
        expandStepsLabel={
          locale === "es"
            ? `Ver los ${processSteps.length} pasos`
            : `View all ${processSteps.length} steps`
        }
        collapseStepsLabel={
          locale === "es" ? "Mostrar menos pasos" : "Show fewer steps"
        }
        className={`bg-gray-50 dark:bg-gray-800 ${HOME_SECTION_SPACING}`}
      />

      <WhyPartnerSection
        sectionVariant="white"
        className={HOME_SECTION_SPACING}
        headerSubtitle={splashCopy.trustSubtitle}
        headerTitle={splashCopy.trustTitle}
        headerDescription={splashCopy.trustDescription}
        headerSize="section"
        condensed
        condensedVisibleCount={2}
        locale={locale}
      />

      <TestimonialsSectionDeferred
        id="testimonials"
        subtitle={splashCopy.testimonialSubtitle}
        title={splashCopy.testimonialTitle}
        description={splashCopy.testimonialDescription}
        testimonials={clientTestimonials}
        className={HOME_SECTION_SPACING}
        animated={false}
        headerSize="section"
      />

      <BrandedContentSection
        id="home-faq"
        variant="white"
        className={HOME_SECTION_SPACING}
        headerSize="section"
        header={{
          icon: "quiz",
          iconVariant: "bronze",
          subtitle: locale === "es" ? "Breve de Misión" : "Mission FAQ",
          title:
            locale === "es"
              ? "Preguntas Clave Antes de Iniciar una Misión"
              : "Key Questions Before Starting a Mission",
        }}
      >
        <div className="mx-auto max-w-5xl space-y-3">
          <details className={HOME_FAQ_CARD_CLASS}>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
              {locale === "es"
                ? "¿Qué tipos de misiones atienden?"
                : "What mission types do you handle?"}
            </summary>
            <p className="font-body mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {locale === "es"
                ? "Nos enfocamos principalmente en construcción comercial: agrícola y bodegas, acondicionamientos comerciales, municipal e industrial ligero."
                : "We focus primarily on mission-ready commercial work: agricultural and winery projects, fit-out operations, municipal, and light industrial scopes."}
            </p>
          </details>

          <details className={HOME_FAQ_CARD_CLASS}>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
              {locale === "es"
                ? "¿Operan en WA, OR e ID?"
                : "Do you operate across WA, OR, and ID?"}
            </summary>
            <p className="font-body mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {locale === "es"
                ? "Sí. MH Construction opera con licencia en los tres estados con gestión en Procore y control de documentación."
                : "Yes. MH Construction is licensed across all three states with Procore-backed mission management and documentation control."}
            </p>
          </details>

          <details className={HOME_FAQ_CARD_CLASS}>
            <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white">
              {locale === "es"
                ? "¿Cómo inicio una conversación de misión?"
                : "How do I start a mission conversation?"}
            </summary>
            <p className="font-body mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {locale === "es"
                ? "Comparta alcance, cronograma y ubicación en la página de contacto para una revisión inicial de ajuste."
                : "Share scope, schedule, and location details through the contact page for an initial mission-fit review."}
            </p>
          </details>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq?utm_source=homepage&utm_medium=internal-link&utm_campaign=home-splash&utm_content=faq-section"
            className={HOME_CTA_SECONDARY_CLASS}
          >
            {locale === "es"
              ? "Ver todas las preguntas frecuentes"
              : "View all frequently asked questions"}
          </Link>
        </div>
      </BrandedContentSection>

      <BrandedContentSection
        id="home-final-cta"
        variant="gray"
        className={HOME_SECTION_SPACING_TIGHT_TOP}
        header={{
          icon: "flag",
          iconVariant: "secondary",
          subtitle: splashCopy.finalSubtitle,
          title: splashCopy.finalTitle,
          description: splashCopy.finalDescription,
        }}
      >
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
          {splashCopy.finalButtons.map((button, index) => (
            <Link
              key={button.label}
              href={button.href}
              className={
                index === 0 ? HOME_CTA_PRIMARY_CLASS : HOME_CTA_SECONDARY_CLASS
              }
            >
              {button.label}
            </Link>
          ))}
        </div>
      </BrandedContentSection>

      {/* Next Steps Section */}
      <NextStepsSection locale={locale} className={HOME_SECTION_SPACING} />
    </>
  );
}
