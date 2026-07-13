import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { ValuesShowcase } from "@/components/about";
import { Timeline, ContentCard } from "@/components/ui";
import { aboutTimelineSteps } from "@/lib/data/about-timeline";
import { gridPresets } from "@/lib/styles/layout-variants";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Keep animations and lower-priority cards out of initial bundle.
const FadeInWhenVisible = dynamic(
  () =>
    import("@/components/animations/FramerMotionComponents").then((m) => ({
      default: m.FadeInWhenVisible,
    })),
  { ssr: true },
);

export const metadata: Metadata = {
  title: buildDualSeoTitle("about", "Detailed Mission Capabilities"),
  description:
    "Detailed capabilities and operational specialties for MH Construction mission lanes.",
  alternates: {
    canonical: "https://www.mhc-gc.com/about/details",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function AboutDetailsPage() {
  const commonT = useTranslations("common");
  const aboutTitle = commonT("about.hero.sectionTitle").toLowerCase();
  const isSpanish =
    aboutTitle.includes("sobre") || aboutTitle.includes("nosotros");

  const copy = isSpanish
    ? {
        breadcrumbCurrent: "Capacidades detalladas",
        valuesDescription:
          "Atendemos comunidades agrícolas y vinícolas, acondicionamientos alineados a la misión y proyectos municipales con comunicación directa, alcance claro y operaciones responsables.",
        timelineDescription:
          "Esta cronología muestra cómo fortalecimos capacidad en edificios post-frame, puertas y herrajes, y gestión de misión en Procore para instalaciones reguladas y activas.",
        newsSubtitle: "Prueba operativa",
        newsTitle: "Especialidades por ruta de misión",
        newsDescription:
          "Capacidades reales para instalaciones AG y bodegas, acondicionamientos y proyectos municipales con seguridad, secuenciación y coordinación multi-equipo desde la definición del alcance hasta la entrega.",
        crmDescription:
          "Coordinamos alcance, RFIs, submittals y secuencias de campo en Procore para reducir retrabajo y sostener la ejecución alineada con objetivos operativos.",
        tradeDescription:
          "Lideramos la instalación de puertas y herrajes con control de aperturas, alineación de cumplimiento y entrega coordinada para instalaciones nuevas y acondicionamientos activos.",
        safetyDescription:
          "La entrega en sitios municipales y ocupados exige seguridad documentada, planes de control y trazabilidad en campo para sostener cumplimiento y continuidad.",
        insightDescription:
          "En trabajos agrícolas y de bodega, planeamos secuencias de obra alrededor de equipos, producción y ventanas de cosecha para reducir interrupciones.",
        veteranDescription:
          "El liderazgo veterano sostiene responsabilidad, disciplina de agenda y comunicación directa con dueños, operadores y equipos de diseño.",
        footerNote:
          "Si necesita detalle de ejecución para su sitio, compartimos enfoque, riesgos y próximos pasos en la primera conversación.",
      }
    : {
        breadcrumbCurrent: "Detailed capabilities",
        valuesDescription:
          "We serve AG and winery communities, mission-ready fit-outs, and municipal projects with direct communication, clear scope, and accountable operations.",
        timelineDescription:
          "This timeline shows how we built depth in post-frame buildings, door and hardware installation, and Procore-supported mission management for regulated and active facilities.",
        newsSubtitle: "Operational proof",
        newsTitle: "Specialties by mission lane",
        newsDescription:
          "Real capabilities for AG and winery facilities, fit-outs, and municipal builds with safety, sequencing, and multi-team coordination from front-end scope definition through handoff.",
        crmDescription:
          "We coordinate scope, RFIs, submittals, and field sequences in Procore to reduce rework and keep execution aligned with operating goals.",
        tradeDescription:
          "We lead door and hardware installation with opening control, compliance alignment, and coordinated handoff for new facilities and active fit-outs.",
        safetyDescription:
          "Municipal and occupied-site delivery requires documented safety, control plans, and field traceability to maintain compliance and continuity.",
        insightDescription:
          "For AG and winery work, we plan mission sequencing around equipment, production schedules, and harvest windows to limit disruption.",
        veteranDescription:
          "Veteran-owned leadership drives accountability, schedule discipline, and direct communication with owners, operators, and design teams.",
        footerNote:
          "If you need execution detail for your site, we can walk through approach, risks, and next steps in the first conversation.",
      };

  return (
    <>
      <PageTrackingClient pageName="About Details" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              ...breadcrumbPatterns.about,
              {
                name: "About Details",
                url: "https://www.mhc-gc.com/about/details",
              },
            ]),
          ),
        }}
      />

      <div className="bg-linear-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        <section className="bg-white dark:bg-gray-900 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: commonT("about.hero.sectionTitle"), href: "/about" },
                { label: copy.breadcrumbCurrent },
              ]}
            />
          </div>
        </section>

        <ValuesShowcase
          title={commonT("about.valuesShowcase.sectionTitle")}
          subtitle={commonT("about.valuesShowcase.sectionSubtitle")}
          description={copy.valuesDescription}
        />

        <Timeline
          id="company-evolution"
          icon="history"
          iconBg="bronze"
          subtitle={commonT("about.timeline.sectionSubtitle")}
          title={commonT("about.timeline.sectionTitle")}
          description={copy.timelineDescription}
          steps={aboutTimelineSteps}
        />

        <section
          id="news"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 sm:mb-20 text-center">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="campaign"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {copy.newsSubtitle}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {copy.newsTitle}
                </span>
              </h2>

              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {copy.newsDescription}
              </p>
            </div>

            <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="precision_manufacturing"
                  category={commonT("about.news.cards.crm.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.crm.title")}
                  description={copy.crmDescription}
                  date={commonT("about.news.cards.crm.date")}
                  href="/contact"
                  linkText={commonT("about.news.cards.crm.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="handshake"
                  category={commonT("about.news.cards.trade.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.trade.title")}
                  description={copy.tradeDescription}
                  date={commonT("about.news.cards.trade.date")}
                  href="/allies"
                  linkText={commonT("about.news.cards.trade.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="workspace_premium"
                  category={commonT("about.news.cards.safety.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.safety.title")}
                  description={copy.safetyDescription}
                  date={commonT("about.news.cards.safety.date")}
                  href="/about#safety"
                  linkText={commonT("about.news.cards.safety.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="lightbulb"
                  category={commonT("about.news.cards.insight.category")}
                  categoryColor="primary"
                  title={commonT("about.news.cards.insight.title")}
                  description={copy.insightDescription}
                  date={commonT("about.news.cards.insight.date")}
                  href="/services"
                  linkText={commonT("about.news.cards.insight.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="military_tech"
                  category={commonT("about.news.cards.veteran.category")}
                  categoryColor="bronze"
                  title={commonT("about.news.cards.veteran.title")}
                  description={copy.veteranDescription}
                  date={commonT("about.news.cards.veteran.date")}
                  href="/about"
                  linkText={commonT("about.news.cards.veteran.linkText")}
                  accentGradient="bg-linear-to-r from-bronze-600 via-bronze-700 to-bronze-800"
                  glowGradient="bg-linear-to-br from-bronze-700/40 to-bronze-800/40"
                  enhancedIcon
                />
              </div>
            </div>

            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    icon="info"
                    size="md"
                    className="text-brand-primary"
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {copy.footerNote}
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
