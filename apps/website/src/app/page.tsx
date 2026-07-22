import { type Metadata } from "next";
import { headers } from "next/headers";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageTrackingClient } from "@/components/analytics";
import { HomePageSentrySupport } from "@/components/monitoring/HomePageSentrySupport";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { normalizeStakeholderTestimonials } from "@/lib/data/testimonials";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
import {
  formatDualPageName,
  MH_SLOGANS,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { projectCaseStudies } from "@/lib/data/project-case-studies";
import {
  getPublishedServiceDetailBySlug,
  type ServiceRecord,
} from "@/lib/data/service-routes";
import enHome from "../../../../messages/home/en.json";
import esHome from "../../../../messages/home/es.json";
import { BrandedContentSection } from "@/components/templates";

import { HeroSection } from "@/components/home";
import { TestimonialsSectionDeferred } from "@/components/home/TestimonialsSectionDeferred";
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
const HOME_CARD_CLASS =
  "rounded-2xl border border-gray-200/90 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-5 sm:p-6 shadow-md";
const HOME_CTA_PRIMARY_CLASS =
  "inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm sm:text-base font-bold text-white shadow hover:bg-brand-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";
const HOME_CTA_SECONDARY_CLASS =
  "inline-flex items-center justify-center rounded-xl border-2 border-brand-primary/70 dark:border-brand-primary-light/70 bg-brand-primary/10 dark:bg-brand-primary/20 px-5 py-3 text-sm sm:text-base font-bold text-brand-primary-dark dark:text-brand-primary-light shadow-sm hover:bg-brand-primary/15 dark:hover:bg-brand-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2";
const SERVICE_OVERVIEW_DETAIL_SLUGS = [
  "agricultural-winery-construction",
  "commercial-tenant-improvements",
  "municipal-public-work",
] as const;

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
  const clientTestimonials = normalizeStakeholderTestimonials(
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
    }>,
  );
  const publishedCaseStudies = projectCaseStudies.filter(
    (project) => project.isPublished !== false,
  );
  const featuredCaseStudies = publishedCaseStudies.slice(0, 3);
  const featuredServiceDetails = SERVICE_OVERVIEW_DETAIL_SLUGS.map((slug) =>
    getPublishedServiceDetailBySlug(slug),
  ).filter((service): service is ServiceRecord => Boolean(service));
  const isProduction = process.env.NODE_ENV === "production";
  const requestHeaders = await headers();
  const isLighthouseAudit = /Chrome-Lighthouse/i.test(
    requestHeaders.get("user-agent") ?? "",
  );
  const enableHomeTelemetry = isProduction && !isLighthouseAudit;
  const universalCtas = getUniversalCtaSet(locale);
  const splashCopy =
    locale === "es"
      ? {
          proofSubtitle: "Prueba Verificada",
          proofTitle: "Hechos Públicos que Respaldan Cada Proyecto",
          proofDescription:
            "Este resumen usa solo registros públicos actuales del repositorio de MH Construction.",
          serviceSubtitle: "Panorama de Servicios",
          serviceTitle: "Servicios de Construcción para Proyectos Comerciales",
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
          featuredSubtitle: "Trabajo Destacado",
          featuredTitle: "Casos Públicos de Proyectos Recientes",
          featuredDescription:
            "Vea casos publicados con ubicación, tipo de proyecto y resultados documentados.",
          whySubtitle: "Por Qué MH",
          whyTitle: "Planificación, Comunicación y Ejecución en Campo",
          whyDescription:
            "MH Construction dirige proyectos comerciales con planificación previa, coordinación diaria, prácticas de seguridad verificables y cierre responsable.",
          whyPoints: [
            "Planificación previa para definir alcance, cronograma y secuencia de obra.",
            "Comunicación clara con propietarios, diseñadores y socios de obra.",
            "Prácticas de seguridad y calidad integradas en operaciones de campo.",
            "Rendición de cuentas desde la movilización hasta el cierre.",
          ],
          testimonialSubtitle: "Voces de Clientes",
          testimonialTitle: "Testimonios de Socios de Proyecto",
          testimonialDescription:
            "Comentarios de socios en proyectos agrícolas/de bodega, acondicionamientos comerciales y trabajo municipal.",
        }
      : {
          proofSubtitle: "Verified Proof",
          proofTitle: "Public Records Behind Our Project Delivery",
          proofDescription:
            "This summary uses current public records already published in the MH Construction repository.",
          serviceSubtitle: "Service Overview",
          serviceTitle: "Construction Services for Commercial Projects",
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
          featuredSubtitle: "Featured Work",
          featuredTitle: "Recent Public Project Case Studies",
          featuredDescription:
            "Review published case studies with location, project type, and documented outcomes.",
          whySubtitle: "Why MH",
          whyTitle: "Planning, Communication, and Field Execution",
          whyDescription:
            "MH Construction leads commercial delivery with front-end planning, clear communication, verified safety practices, and accountable field coordination.",
          whyPoints: [
            "Planning discipline that clarifies scope, schedule, and delivery strategy before mobilization.",
            "Communication cadence that keeps owners, designers, and field teams aligned.",
            "Safety and quality practices integrated into daily field operations.",
            "Accountability from kickoff through closeout documentation.",
          ],
          testimonialSubtitle: "Client Proof",
          testimonialTitle: "Project Partner Testimonials",
          testimonialDescription:
            "Feedback from partners across agricultural/winery, commercial fit-out, and municipal project scopes.",
        };

  return (
    <>
      {enableHomeTelemetry ? <PageTrackingClient pageName="Home" /> : null}
      {enableHomeTelemetry ? <HomePageSentrySupport /> : null}

      {/* Enhanced SEO structured data for Veteran-Owned construction excellence */}
      {isProduction ? <StructuredData data={homepageSEO.schemas} /> : null}

      {/* Home Page Hero Section */}
      <HeroSection locale={locale} copy={homeCopy.hero} />

      <div className="relative z-10">
        <BrandedContentSection
          id="stats"
          variant="white"
          className={HOME_SECTION_SPACING}
          showBackgroundPattern={false}
          headerSize="section"
          header={{
            icon: "verified",
            iconVariant: "primary",
            subtitle: splashCopy.proofSubtitle,
            title: splashCopy.proofTitle,
            description: splashCopy.proofDescription,
          }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
            <article className={HOME_CARD_CLASS}>
              <p className="font-subheading text-xs font-semibold font-heading uppercase tracking-wide text-brand-primary dark:text-brand-primary-light">
                {locale === "es" ? "Cobertura" : "Coverage"}
              </p>
              <p className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                WA, OR, ID
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {locale === "es"
                  ? "Licencia activa en Washington, Oregon e Idaho."
                  : "Licensed project delivery across Washington, Oregon, and Idaho."}
              </p>
            </article>
            <article className={HOME_CARD_CLASS}>
              <p className="font-subheading text-xs font-semibold font-heading uppercase tracking-wide text-brand-primary dark:text-brand-primary-light">
                {locale === "es"
                  ? "Casos publicados"
                  : "Published case studies"}
              </p>
              <p className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {publishedCaseStudies.length}
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {locale === "es"
                  ? "Registros públicos actuales en nuestro archivo de proyectos."
                  : "Current public project records available in our portfolio."}
              </p>
            </article>
            <article className={HOME_CARD_CLASS}>
              <p className="font-subheading text-xs font-semibold font-heading uppercase tracking-wide text-brand-primary dark:text-brand-primary-light">
                {locale === "es"
                  ? "Testimonios de clientes"
                  : "Client testimonials"}
              </p>
              <p className="mt-2 text-2xl font-black text-gray-900 dark:text-white">
                {clientTestimonials.length}
              </p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {locale === "es"
                  ? "Testimonios disponibles en nuestra fuente de datos actual."
                  : "Testimonials currently available in the controlled testimonial data source."}
              </p>
            </article>
          </div>
        </BrandedContentSection>

        <BrandedContentSection
          id="services"
          variant="gray"
          className={HOME_SECTION_SPACING}
          showBackgroundPattern={false}
          headerSize="section"
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
                    ? "Ver servicios y rutas disponibles"
                    : "View services and available routes"}
                </Link>
              </article>
            ))}
          </div>
          {featuredServiceDetails.length > 0 ? (
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
              {featuredServiceDetails.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center rounded-full border border-brand-primary/30 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-primary/10 dark:border-brand-primary-light/30 dark:bg-gray-800 dark:text-brand-primary-light dark:hover:bg-brand-primary/20"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          ) : null}
          <div className="mt-6 text-center">
            <Link
              href="/services?utm_source=homepage&utm_medium=cta&utm_campaign=home-phase3&utm_content=services-hub"
              className={HOME_CTA_SECONDARY_CLASS}
            >
              {universalCtas.services.label}
            </Link>
          </div>
        </BrandedContentSection>

        <BrandedContentSection
          id="our-process"
          variant="white"
          className={HOME_SECTION_SPACING}
          showBackgroundPattern={false}
          headerSize="section"
          header={{
            icon: "photo_library",
            iconVariant: "secondary",
            subtitle: splashCopy.featuredSubtitle,
            title: splashCopy.featuredTitle,
            description: splashCopy.featuredDescription,
          }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredCaseStudies.map((caseStudy) => (
              <article key={caseStudy.slug} className={HOME_CARD_CLASS}>
                <p className="font-subheading text-xs font-semibold font-heading uppercase tracking-wide text-brand-primary dark:text-brand-primary-light">
                  {caseStudy.category}
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-gray-900 dark:text-white">
                  {caseStudy.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {caseStudy.location.city}, {caseStudy.location.state} ·{" "}
                  {caseStudy.yearCompleted}
                </p>
                <p className="font-body mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.description}
                </p>
                <Link
                  href={`/projects/${caseStudy.slug}`}
                  className="mt-4 inline-flex items-center text-sm sm:text-base font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
                >
                  {locale === "es" ? "Ver estudio de caso" : "View case study"}
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/projects?utm_source=homepage&utm_medium=cta&utm_campaign=home-phase3&utm_content=featured-work"
              className={HOME_CTA_PRIMARY_CLASS}
            >
              {universalCtas.portfolio.label}
            </Link>
          </div>
        </BrandedContentSection>

        <BrandedContentSection
          id="why-partner"
          variant="gray"
          className={HOME_SECTION_SPACING}
          showBackgroundPattern={false}
          headerSize="section"
          header={{
            icon: "handshake",
            iconVariant: "primary",
            subtitle: splashCopy.whySubtitle,
            title: splashCopy.whyTitle,
            description: splashCopy.whyDescription,
          }}
        >
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2">
            {splashCopy.whyPoints.map((point) => (
              <li key={point} className={HOME_CARD_CLASS}>
                <p className="font-body text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  {point}
                </p>
              </li>
            ))}
          </ul>
        </BrandedContentSection>

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

        {/* Next Steps Section */}
        <NextStepsSection
          locale={locale}
          className={HOME_SECTION_SPACING}
          includePublicSectorLink
        />
      </div>
    </>
  );
}
