import { type Metadata } from "next";
import { cookies, headers } from "next/headers";
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
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { normalizeLocale } from "@/lib/i18n/locale";
import enHome from "@/../messages/home/en.json";
import esHome from "@/../messages/home/es.json";

import { HeroSection, WhyPartnerSection } from "@/components/home";
import { ServicesShowcaseDeferred } from "@/components/home/ServicesShowcaseDeferred";
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

export const metadata: Metadata = withGeoMetadata({
  title: {
    absolute: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | AG, Winery, Commercial TI, and Municipal Builds | MH Construction`,
  },
  description:
    "Construction partner for AG and winery communities, commercial tenant improvements, and municipal builds. Specialties include pole buildings, door and hardware installation, and project management powered by Procore.",
  keywords: [
    "general contractor Pasco, WA",
    "commercial construction services",
    "agricultural community construction",
    "winery community construction",
    "commercial tenant improvements",
    "municipal construction",
    "pole building contractor",
    "door and hardware installation",
    "Procore project management",
    "industrial facility construction",
    "office remodeling and renovation",
    "construction management solutions",
    "construction project management",
    "commercial renovation",
    "building addition contractor",
    "construction design",
    "general contractor Tri-State",
    "Veteran-Owned contractor Pacific Northwest",
    "Richland general contractor",
    "Pasco general contractor",
    "Kennewick general contractor",
    "Benton County general contractor",
    "Franklin County general contractor",
    "commercial construction Tri-State",
    "construction management services",
    "master planning preconstruction",
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | AG, Winery, Commercial TI, and Municipal Builds | MH Construction`,
    description:
      "AG and winery community projects, commercial tenant improvements, and municipal builds with Procore-based project management.",
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
    title: `${formatDualPageName(PAGE_TERMINOLOGY.home.seoName, PAGE_TERMINOLOGY.home.mhBrandName)} | AG, Winery, Commercial TI, and Municipal Builds | MH Construction`,
    description:
      "AG and winery community projects, commercial tenant improvements, and municipal builds with pole building and door/hardware specialties.",
    images: ["/images/og-default.jpg"],
  },
});

export default async function Home() {
  // Analytics tracking remains client-only while page rendering stays server-first

  // Get enhanced SEO data for homepage
  const homepageSEO = getHomepageSEO();
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get("locale")?.value);
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
  const processSteps = homeCopy.process.steps.map((step, index) => ({
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
  const agWineryLaneHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=ag-winery#services";
  const commercialTiLaneHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=commercial-ti#services";
  const municipalLaneHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=municipal#services";
  const agWineryProofHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=ag-winery-proof#services";
  const commercialTiProofHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=commercial-ti-proof#services";
  const municipalProofHref =
    "/?utm_source=homepage&utm_medium=cta&utm_campaign=services-section&utm_content=municipal-proof#services";
  const ownershipCopy =
    locale === "es"
      ? {
          sectionSubtitle: "Etapa 4 · Validar Gobernanza Operativa",
          sectionTitle: "Gobernanza de Proyecto y Controles de Aprobación",
          sectionDescription:
            "Antes de comprometer presupuesto o cronograma, vea responsables por etapa, ruta de escalamiento y umbrales de aprobación que sostienen la trazabilidad en Procore.",
          cards: [
            {
              title: "Responsable por Etapa",
              bullets: [
                "Estimación lidera preconstrucción.",
                "PM y superintendencia lideran ejecución.",
                "Owner/President confirma cierre final.",
              ],
              detailsTitle: "Ver detalle",
              detailsText:
                "La continuidad se mantiene con la misma cadena de responsables desde la planificación hasta el soporte posterior al cierre.",
            },
            {
              title: "Ruta de Escalamiento",
              bullets: [
                "Superintendente -> PM -> COO -> Owner.",
                "Si PM no está disponible: Steve o COO.",
                "Ruta definida para decisiones rápidas.",
              ],
              detailsTitle: "Ver detalle",
              detailsText:
                "La misma ruta se refleja en coordinación de campo, control de costo y handoff de cierre.",
            },
            {
              title: "Umbrales de Aprobación",
              bullets: [
                "Impactos > $5,000 requieren COO.",
                "Impactos > $25,000 suman aprobación de CFO.",
                "Municipal se ajusta por requisito de agencia.",
              ],
              detailsTitle: "Ver detalle",
              detailsText:
                "Este control protege el presupuesto y mantiene transparencia para cliente, equipo de campo y oficina.",
            },
          ],
        }
      : {
          sectionSubtitle: "Stage 4 · Validate Operating Governance",
          sectionTitle: "Project Governance and Approval Controls",
          sectionDescription:
            "Before committing budget and schedule, review ownership by stage, escalation path, and approval thresholds that keep Procore traceability intact.",
          cards: [
            {
              title: "Ownership by Stage",
              bullets: [
                "Estimating leads preconstruction controls.",
                "PM and superintendent teams lead active execution.",
                "Owner/President confirms final closeout.",
              ],
              detailsTitle: "View detail",
              detailsText:
                "Continuity stays intact through one accountability chain from planning through post-closeout support.",
            },
            {
              title: "Escalation Path",
              bullets: [
                "Superintendent -> PM -> COO -> Owner.",
                "If PM is unavailable: escalate to Steve or COO.",
                "Defined escalation reduces field decision delays.",
              ],
              detailsTitle: "View detail",
              detailsText:
                "The same path is used for field coordination, cost control, and closeout handoff.",
            },
            {
              title: "Approval Thresholds",
              bullets: [
                "Impacts over $5,000 require COO approval.",
                "Impacts over $25,000 require additional CFO approval.",
                "Municipal governance flexes by agency requirement.",
              ],
              detailsTitle: "View detail",
              detailsText:
                "This keeps field decisions fast while preserving authority limits and transparent reporting.",
            },
          ],
        };

  const specialtiesCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 1 · Definir la Base del Umbrella",
          title: "Capacidades Base que Soportan Cada Mercado",
          description:
            "Estas tres capacidades sostienen todo el sistema de servicios: primero definimos base técnica, luego dirigimos al frente correcto (AG/bodegas, TI comercial o municipal).",
          items: [
            {
              title: "Pole Buildings",
              desc: "Entrega de estructuras post-frame y PEMB para usos agrícolas, industriales y de soporte operativo.",
              href: agWineryLaneHref,
              cta: "Ir a Frente AG/Bodegas",
            },
            {
              title: "Instalación de Puertas y Herrajes",
              desc: "Coordinación e instalación para proyectos con operaciones activas y control de cumplimiento por etapa.",
              href: commercialTiLaneHref,
              cta: "Ir a Frente TI Comercial",
            },
            {
              title: "Gestión de Proyecto en Procore",
              desc: "RFIs, submittals, costos, hitos y cierre en una sola fuente de verdad para cliente y equipo.",
              href: municipalLaneHref,
              cta: "Ir a Frente Municipal",
            },
          ],
        }
      : {
          subtitle: "Stage 1 · Define the Umbrella Foundation",
          title: "Core Capabilities Behind Every Market Lane",
          description:
            "These three capabilities power the full services umbrella: establish technical fit first, then route to the right lane for AG/winery, commercial TI, or municipal delivery.",
          items: [
            {
              title: "Pole Buildings",
              desc: "Post-frame and PEMB delivery for agricultural, industrial, and operations-support facilities.",
              href: agWineryLaneHref,
              cta: "Go to AG/Winery Lane",
            },
            {
              title: "Door and Hardware Installation",
              desc: "Detailed coordination and installation for occupied facilities with phased compliance controls.",
              href: commercialTiLaneHref,
              cta: "Go to Commercial TI Lane",
            },
            {
              title: "Project Management in Procore",
              desc: "RFIs, submittals, costs, milestones, and closeout in one source of truth for client and team.",
              href: municipalLaneHref,
              cta: "Go to Municipal Lane",
            },
          ],
        };

  const marketCtaCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 8 · Activar su Ruta de Proyecto",
          title: "Seleccione su Mercado y Entre al Frente Correcto",
          description:
            "Seleccione su mercado y avance a una revisión enfocada de alcance, cronograma y ruta de ejecución.",
          buttons: [
            {
              href: agWineryLaneHref,
              label: "Agendar Revisión de Alcance AG/Bodegas",
            },
            {
              href: commercialTiLaneHref,
              label: "Agendar Revisión de Plan TI Comercial",
            },
            {
              href: municipalLaneHref,
              label: "Agendar Revisión de Entrega Municipal",
            },
          ],
        }
      : {
          subtitle: "Stage 8 · Activate Your Project Path",
          title: "Choose Your Market and Enter the Right Lane",
          description:
            "Pick your market and move into a focused review for scope, schedule, and delivery path.",
          buttons: [
            {
              href: agWineryLaneHref,
              label: "Book AG/Winery Scope Review",
            },
            {
              href: commercialTiLaneHref,
              label: "Book Commercial TI Planning Review",
            },
            {
              href: municipalLaneHref,
              label: "Book Municipal Delivery Review",
            },
          ],
        };

  const proofByMarketCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 3 · Validar por Mercado",
          title: "Prueba de Ejecución por Frente",
          description:
            "Compare evidencia real por mercado antes de avanzar a revisión técnica y de presupuesto.",
          lanes: [
            {
              market: "AG y Bodegas",
              proof:
                "Entrega especializada para AG y bodegas con instalación de pond liners para contención de wastewater/sludge runoff, más coordinación técnica para alcances con acero inoxidable y silos mayores.",
              href: agWineryProofHref,
              cta: "Evaluar Ajuste de Alcance AG/Bodegas",
            },
            {
              market: "TI Comercial",
              proof:
                "Tenant improvements en espacios activos con control en Procore, instalación de puertas/herrajes y secuenciación por fases para proteger operación.",
              href: commercialTiProofHref,
              cta: "Evaluar Ajuste de Entrega TI",
            },
            {
              market: "Municipal",
              proof:
                "Entrega municipal con trazabilidad de aprobaciones, autoridad de seguridad y documentación de cierre alineada a requisito de agencia.",
              href: municipalProofHref,
              cta: "Evaluar Ajuste Municipal y Cumplimiento",
            },
          ],
        }
      : {
          subtitle: "Stage 3 · Validate by Market",
          title: "Delivery Evidence by Lane",
          description:
            "Compare field proof by market before moving into technical and budget review.",
          lanes: [
            {
              market: "AG and Winery Communities",
              proof:
                "Specialty delivery for AG and winery scopes with pond liner containment for wastewater/sludge runoff, plus technical coordination for stainless-steel and major-silo impacts.",
              href: agWineryProofHref,
              cta: "Check AG/Winery Scope Fit",
            },
            {
              market: "Commercial Tenant Improvements",
              proof:
                "Occupied-space TI delivery with Procore controls, door/hardware packages, and phased sequencing that protects live operations.",
              href: commercialTiProofHref,
              cta: "Check Commercial TI Delivery Fit",
            },
            {
              market: "Municipal Builds",
              proof:
                "Municipal delivery with approval traceability, defined safety authority, and agency-ready closeout records.",
              href: municipalProofHref,
              cta: "Check Municipal Compliance Fit",
            },
          ],
        };

  const servicesShowcaseIntroCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 2 · Elegir Ruta de Servicio",
          title: "Seleccione su Tipo de Proyecto Dentro del Umbrella",
          description:
            "Revise cada ruta de servicio y abra detalles para ver alcance, beneficios y siguiente paso.",
        }
      : {
          subtitle: "Stage 2 · Select Your Service Lane",
          title: "Choose Your Project Type Inside the Umbrella",
          description:
            "Review each lane, confirm scope fit, and move forward with the right planning conversation.",
        };

  const processCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 5 · Confirmar Plan de Ejecución",
          title: "Modelo Operativo de Seis Etapas",
        }
      : {
          subtitle: "Stage 5 · Confirm Delivery Plan",
          title: "Six-Stage Operating Model",
        };

  const trustIntroCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 6 · Confirmar Ajuste de Socio",
          title: "Modelo de Relación y Rendición de Cuentas",
          description:
            "Después de validar la ruta técnica, confirme cómo operamos como socio durante y después del cierre.",
        }
      : {
          subtitle: "Stage 6 · Confirm Partner Fit",
          title: "Relationship and Accountability Model",
          description:
            "After validating technical route, confirm how we operate as your partner through closeout and support.",
        };

  const testimonialsCopy =
    locale === "es"
      ? {
          subtitle: "Etapa 7 · Verificar con Evidencia de Clientes",
          title: "Lo que Dicen Nuestros Client Partners",
          description:
            "Validación final del mercado: resultados compartidos por clientes AG/bodegas, TI comercial y municipal.",
        }
      : {
          subtitle: "Stage 7 · Verify with Client Evidence",
          title: "What Client Partners Report",
          description:
            "Final market validation from AG/winery, commercial TI, and municipal-facing client partners.",
        };

  return (
    <>
      {enableHomeTelemetry ? <PageTrackingClient pageName="Home" /> : null}
      {enableHomeTelemetry ? <HomePageSentrySupport /> : null}

      {/* Enhanced SEO structured data for Veteran-Owned construction excellence */}
      {isProduction ? <StructuredData data={homepageSEO.schemas} /> : null}

      {/* Home Page Hero Section */}
      <HeroSection locale={locale} copy={homeCopy.hero} />

      <section className="bg-white dark:bg-gray-900 py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-8">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {specialtiesCopy.subtitle}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {specialtiesCopy.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {specialtiesCopy.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {specialtiesCopy.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex items-center text-sm sm:text-base font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase of Services Section - Primary discovery path */}
      <section className="bg-white dark:bg-gray-900 pt-2 sm:pt-3 lg:pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {servicesShowcaseIntroCopy.subtitle}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {servicesShowcaseIntroCopy.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {servicesShowcaseIntroCopy.description}
            </p>
          </div>
        </div>
      </section>
      <ServicesShowcaseDeferred
        className="py-6 sm:py-8 lg:py-10 xl:py-12"
        maxVisibleCards={6}
      />

      <section className="bg-white dark:bg-gray-900 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-10">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {proofByMarketCopy.subtitle}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {proofByMarketCopy.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {proofByMarketCopy.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {proofByMarketCopy.lanes.map((lane) => (
              <article
                key={lane.market}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {lane.market}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {lane.proof}
                </p>
                <Link
                  href={lane.href}
                  className="mt-4 inline-flex items-center text-sm sm:text-base font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
                >
                  {lane.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ownership-controls"
        className="bg-white dark:bg-gray-900 py-8 sm:py-10 lg:py-12"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-8 sm:mb-10">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {ownershipCopy.sectionSubtitle}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {ownershipCopy.sectionTitle}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {ownershipCopy.sectionDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {ownershipCopy.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 sm:p-6 shadow-sm"
              >
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {card.bullets.map((bullet) => (
                    <li
                      key={`${card.title}-${bullet}`}
                      className="flex items-start gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-200"
                    >
                      <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-brand-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <details className="mt-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 p-3 sm:p-4">
                  <summary className="cursor-pointer select-none text-sm sm:text-base font-semibold text-brand-primary dark:text-brand-primary-light">
                    {card.detailsTitle}
                  </summary>
                  <p className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {card.detailsText}
                  </p>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process Timeline Section - Reinforce confidence before conversion */}
      <TimelineDeferred
        id="our-process"
        icon="timeline"
        subtitle={processCopy.subtitle}
        title={processCopy.title}
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
        className="bg-gray-50 dark:bg-gray-800 py-8 sm:py-10 lg:py-12"
      />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <section className="bg-white dark:bg-gray-900 pt-2 sm:pt-3 lg:pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
              {trustIntroCopy.subtitle}
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {trustIntroCopy.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {trustIntroCopy.description}
            </p>
          </div>
        </div>
      </section>
      <WhyPartnerSection
        sectionVariant="white"
        className="py-8 sm:py-10 lg:py-12"
        condensed
        condensedVisibleCount={2}
        locale={locale}
      />

      {/* Enhanced Client Partner Testimonials - Social proof after trust and stats */}
      <TestimonialsSectionDeferred
        id="testimonials"
        subtitle={testimonialsCopy.subtitle}
        title={testimonialsCopy.title}
        description={testimonialsCopy.description}
        testimonials={clientTestimonials}
        className="py-8 sm:py-10 lg:py-12"
        animated={false}
      />

      <section className="bg-gray-50 dark:bg-gray-800 py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm sm:text-base font-semibold uppercase tracking-[0.12em] text-brand-secondary">
            {marketCtaCopy.subtitle}
          </p>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {marketCtaCopy.title}
          </h2>
          <p className="mt-3 text-center text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {marketCtaCopy.description}
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {marketCtaCopy.buttons.map((button) => (
              <Link
                key={button.label}
                href={button.href}
                className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm sm:text-base font-bold text-white shadow hover:bg-brand-primary-dark transition-colors"
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <NextStepsSection locale={locale} />
    </>
  );
}
