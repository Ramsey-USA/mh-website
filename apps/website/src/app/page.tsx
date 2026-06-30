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
    absolute:
      "Home | AG, Winery, Commercial TI, and Municipal Builds | MH Construction",
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
    title:
      "Home | AG, Winery, Commercial TI, and Municipal Builds | MH Construction",
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
    title:
      "Home | AG, Winery, Commercial TI, and Municipal Builds | MH Construction",
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
  const ownershipCopy =
    locale === "es"
      ? {
          sectionSubtitle: "Controles Operativos",
          sectionTitle: "Gobernanza de Proyecto en Procore",
          sectionDescription:
            "Resumen rápido de responsables, escalamiento y aprobaciones para mantener trazabilidad desde preconstrucción hasta cierre.",
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
          sectionSubtitle: "Operational Controls",
          sectionTitle: "Procore Project Governance",
          sectionDescription:
            "Quick snapshot of ownership, escalation, and approval controls that keep traceability from preconstruction through closeout.",
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
          subtitle: "Especialidades Principales",
          title: "Donde Somos Más Fuertes",
          description:
            "Tres especialidades que elevan velocidad, trazabilidad y calidad en AG, bodegas, TI comercial y obra municipal.",
          items: [
            {
              title: "Pole Buildings",
              desc: "Entrega de estructuras post-frame y PEMB para usos agrícolas, industriales y de soporte operativo.",
            },
            {
              title: "Instalación de Puertas y Herrajes",
              desc: "Coordinación e instalación para proyectos con operaciones activas y control de cumplimiento por etapa.",
            },
            {
              title: "Gestión de Proyecto en Procore",
              desc: "RFIs, submittals, costos, hitos y cierre en una sola fuente de verdad para cliente y equipo.",
            },
          ],
        }
      : {
          subtitle: "Core Specialties",
          title: "Where We Create the Most Value",
          description:
            "Three specialties that raise speed, traceability, and quality across AG/winery, commercial TI, and municipal delivery.",
          items: [
            {
              title: "Pole Buildings",
              desc: "Post-frame and PEMB delivery for agricultural, industrial, and operations-support facilities.",
            },
            {
              title: "Door and Hardware Installation",
              desc: "Detailed coordination and installation for occupied facilities with phased compliance controls.",
            },
            {
              title: "Project Management in Procore",
              desc: "RFIs, submittals, costs, milestones, and closeout in one source of truth for client and team.",
            },
          ],
        };

  const marketCtaCopy =
    locale === "es"
      ? {
          title: "Seleccione su Mercado y Comencemos",
          buttons: [
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=ag-winery",
              label: "Iniciar Revisión AG y Bodegas",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=commercial-ti",
              label: "Iniciar Revisión de TI Comercial",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=municipal",
              label: "Iniciar Revisión Municipal",
            },
          ],
        }
      : {
          title: "Choose Your Market and Start the Right Review",
          buttons: [
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=ag-winery",
              label: "Start AG and Winery Scope Review",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=commercial-ti",
              label: "Start Commercial TI Review",
            },
            {
              href: "/contact?utm_source=homepage&utm_medium=cta&utm_campaign=market-review&utm_content=municipal",
              label: "Start Municipal Project Review",
            },
          ],
        };

  const proofByMarketCopy =
    locale === "es"
      ? {
          subtitle: "Prueba por Mercado",
          title: "Evidencia de Entrega en Cada Frente",
          lanes: [
            {
              market: "AG y Bodegas",
              proof:
                "Cobertura especializada para bodegas y AG: instalamos pond liners para contención de wastewater y sludge runoff, y coordinamos alcances con implicaciones de acero inoxidable y silos mayores (incluyendo experiencia en Darigold Pasco).",
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=ag-winery",
              cta: "Ver capacidades AG/Bodegas",
            },
            {
              market: "TI Comercial",
              proof:
                "Tenant improvements comerciales con control en Procore, instalación de puertas/herrajes y cierre limpio.",
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=commercial-ti",
              cta: "Ver capacidades TI Comercial",
            },
            {
              market: "Municipal",
              proof:
                "Entrega municipal con trazabilidad de aprobaciones, seguridad y cumplimiento por requisito de agencia.",
              href: "/public-sector?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=municipal",
              cta: "Ver capacidades Municipales",
            },
          ],
        }
      : {
          subtitle: "Proof by Market",
          title: "Delivery Evidence for Each Lane",
          lanes: [
            {
              market: "AG and Winery Communities",
              proof:
                "Specialty delivery for winery operations and AG-adjacent scopes, including pond liner installation for wastewater and sludge runoff, plus stainless-steel and major-silo coordination based on work like Darigold Plant in Pasco.",
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=ag-winery",
              cta: "View AG and Winery Capabilities",
            },
            {
              market: "Commercial Tenant Improvements",
              proof:
                "Commercial TI delivery with Procore controls, door/hardware installation, and clean occupied-space closeout.",
              href: "/services?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=commercial-ti",
              cta: "View Commercial TI Capabilities",
            },
            {
              market: "Municipal Builds",
              proof:
                "Municipal delivery with approval traceability, safety authority, and agency-specific compliance coordination.",
              href: "/public-sector?utm_source=homepage&utm_medium=cta&utm_campaign=proof-by-market&utm_content=municipal",
              cta: "View Municipal Capabilities",
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-gray-800 py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight">
            {marketCtaCopy.title}
          </h2>
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

      {/* Showcase of Services Section - Primary discovery path */}
      <ServicesShowcaseDeferred
        className="py-6 sm:py-8 lg:py-10 xl:py-12"
        maxVisibleCards={2}
      />

      {/* Why Partner With MH Construction Section - Partnership philosophy */}
      <WhyPartnerSection
        sectionVariant="white"
        className="py-8 sm:py-10 lg:py-12"
        condensed
        condensedVisibleCount={2}
        locale={locale}
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

      {/* Enhanced Client Partner Testimonials - Social proof after trust and stats */}
      <TestimonialsSectionDeferred
        id="testimonials"
        subtitle={homeCopy.testimonials.subtitle}
        title={homeCopy.testimonials.title}
        description={homeCopy.testimonials.description}
        testimonials={clientTestimonials}
        className="py-8 sm:py-10 lg:py-12"
        animated={false}
      />

      {/* Our Process Timeline Section - Reinforce confidence before conversion */}
      <TimelineDeferred
        id="our-process"
        icon="timeline"
        subtitle={homeCopy.process.subtitle}
        title={homeCopy.process.title}
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

      {/* Next Steps Section */}
      <NextStepsSection locale={locale} />
    </>
  );
}
