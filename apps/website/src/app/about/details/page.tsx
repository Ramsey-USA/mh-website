import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { ValuesShowcase } from "@/components/about";
import { Timeline, ContentCard, Button } from "@/components/ui";
import { aboutTimelineSteps } from "@/lib/data/about-timeline";
import { getNewsInsightsContent } from "@/lib/data/news-insights";
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
  title: buildDualSeoTitle("about", "Detailed Construction Capabilities"),
  description:
    "Detailed construction capabilities for AG and winery facilities, tenant improvements, and municipal projects across the Pacific Northwest.",
  openGraph: {
    title: "About Us | Detailed Construction Capabilities",
    description:
      "Execution capabilities, controls, and delivery sequencing for AG and winery facilities, tenant improvements, and municipal projects.",
    url: "https://www.mhc-gc.com/about/details",
    siteName: "MH Construction",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Detailed Construction Capabilities",
    description:
      "Execution capabilities, controls, and delivery sequencing for complex construction environments.",
  },
  alternates: {
    canonical: "https://www.mhc-gc.com/about/details",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutDetailsPage() {
  const commonT = useTranslations("common");
  const locale = useLocale();
  const isSpanish = locale.startsWith("es");
  const newsContent = getNewsInsightsContent(isSpanish ? "es" : "en");

  const copy = isSpanish
    ? {
        heroEyebrow: "Capacidades -> Sobre Nosotros",
        heroTitle: "Capacidades detalladas",
        heroSubtitle:
          "Planificación de preconstrucción, coordinación en campo y entrega responsable",
        breadcrumbCurrent: "Capacidades detalladas",
        pagePurposeTitle: "Cómo usar esta página",
        pagePurposeBody:
          "Sobre Nosotros resume quiénes somos y a quién servimos. Esta página detalla cómo ejecutamos: secuencias, controles y coordinación para proyectos en instalaciones activas.",
        valuesTitle: "Marco operativo",
        valuesSubtitle: "Estándar de ejecución",
        valuesDescription:
          "Atendemos comunidades agrícolas y vinícolas, acondicionamientos comerciales y proyectos municipales con comunicación directa, alcance claro y operaciones responsables.",
        timelineTitle: "Evolución de capacidad",
        timelineSubtitle: "Cómo fortalecimos la entrega",
        timelineDescription:
          "Esta cronología muestra cómo fortalecimos capacidad en edificios post-frame, puertas y herrajes, y coordinación de proyectos en Procore para instalaciones reguladas y activas.",
        pillarsTitle: "Capacidades principales",
        pillars: [
          "Secuenciación en sitios ocupados para reducir interrupciones",
          "Control de RFIs y submittals con trazabilidad en campo",
          "Coordinación de oficios para instalaciones y cierres limpios",
          "Planificación de seguridad con continuidad operativa",
        ],
        newsSubtitle: "Prueba de capacidad",
        newsTitle: "Especialidades de entrega",
        newsDescription:
          "Capacidades reales para instalaciones AG y bodegas, acondicionamientos y proyectos municipales con seguridad, secuenciación y coordinación multi-equipo desde la definición del alcance hasta la entrega.",
        actionTitle: "Conversemos su próximo proyecto",
        actionBody:
          "Comparta su alcance y sus restricciones operativas. Le entregamos una ruta clara con secuencia, riesgos clave y siguiente paso recomendado.",
        actionPrimary: "Iniciar una conversación",
        actionSecondary: "Revisar servicios",
        actionTertiary: "Ver estándares de seguridad",
        footerNote:
          "Si necesita detalle de ejecución para su sitio, compartimos enfoque, riesgos y próximos pasos en la primera conversación.",
      }
    : {
        heroEyebrow: "Capabilities -> About Us",
        heroTitle: "Detailed capabilities",
        heroSubtitle:
          "Preconstruction planning, field coordination, and accountable delivery",
        breadcrumbCurrent: "Detailed capabilities",
        pagePurposeTitle: "How to use this page",
        pagePurposeBody:
          "About Us summarizes who we are and who we serve. This page goes deeper into how we execute: sequencing, controls, and coordination for projects in active facilities.",
        valuesTitle: "Operating framework",
        valuesSubtitle: "Execution standard",
        valuesDescription:
          "We serve AG and winery communities, tenant improvements, and municipal projects with direct communication, clear scope, and accountable operations.",
        timelineTitle: "Capability evolution",
        timelineSubtitle: "How delivery depth expanded",
        timelineDescription:
          "This timeline shows how we built depth in post-frame buildings, door and hardware installation, and Procore-supported project coordination for regulated and active facilities.",
        pillarsTitle: "Core capabilities",
        pillars: [
          "Occupied-site sequencing that minimizes disruption",
          "RFI and submittal control with field traceability",
          "Trade coordination for clean installation and handoff",
          "Documented safety planning with continuity controls",
        ],
        newsSubtitle: "Capability proof",
        newsTitle: "Delivery specialties",
        newsDescription:
          "Real capabilities for AG and winery facilities, tenant improvements, and municipal projects with disciplined safety, sequencing, and multi-team coordination.",
        actionTitle: "Start your project conversation",
        actionBody:
          "Share your scope and operating constraints. We will map a clear path with sequencing, key risks, and the recommended next step.",
        actionPrimary: "Start a conversation",
        actionSecondary: "Review services",
        actionTertiary: "View safety standards",
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
                name: "About Capabilities",
                url: "https://www.mhc-gc.com/about/details",
              },
            ]),
          ),
        }}
      />

      <div className="bg-linear-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        <section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
            <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
          </div>

          <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="block text-brand-secondary text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl mb-1">
                  {copy.heroEyebrow}
                </span>
                <span className="block text-brand-secondary">
                  {copy.heroTitle}
                </span>
                <span className="block text-brand-primary">
                  {copy.heroSubtitle}
                </span>
                <span className="block text-white/90 text-sm sm:text-base lg:text-lg">
                  {COMPANY_INFO.slogan.primary}
                </span>
                <span className="block text-white/85 text-xs xs:text-sm sm:text-base mt-1">
                  {getHeroPageSlogan("about").slogan}
                </span>
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-900 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: commonT("about.hero.sectionTitle"), href: "/about" },
                { label: copy.breadcrumbCurrent },
              ]}
            />

            <div className="mt-5 rounded-xl border border-brand-primary/20 bg-brand-light/50 dark:bg-gray-800/70 p-4 sm:p-5 shadow-sm">
              <h2 className="mh-heading-display-tight font-heading text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {copy.pagePurposeTitle}
              </h2>
              <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {copy.pagePurposeBody}
              </p>
            </div>
          </div>
        </section>

        <section
          id="core-capabilities"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="mh-heading-display font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5 text-center">
              {copy.pillarsTitle}
            </h2>
            <ul className="grid gap-3 sm:gap-4 md:grid-cols-2 font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {copy.pillars.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/70 px-4 py-3 flex items-start gap-3 shadow-sm"
                >
                  <MaterialIcon
                    icon="check_circle"
                    size="md"
                    className="text-brand-primary mt-1 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ValuesShowcase
          title={copy.valuesTitle}
          subtitle={copy.valuesSubtitle}
          description={copy.valuesDescription}
        />

        <Timeline
          id="company-evolution"
          icon="history"
          iconBg="bronze"
          subtitle={copy.timelineSubtitle}
          title={copy.timelineTitle}
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
              {newsContent.cards.map((card) => (
                <div className="scroll-reveal" key={card.title}>
                  <ContentCard
                    variant="feature"
                    icon={card.icon}
                    category={card.category}
                    categoryColor={card.categoryColor}
                    title={card.title}
                    description={card.description}
                    date={card.date}
                    href={card.href}
                    linkText={card.linkText}
                    {...(card.enhancedIcon ? { enhancedIcon: true } : {})}
                    {...(card.accentGradient
                      ? { accentGradient: card.accentGradient }
                      : {})}
                    {...(card.glowGradient
                      ? { glowGradient: card.glowGradient }
                      : {})}
                  />
                </div>
              ))}
            </div>

            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block shadow-sm">
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

            <FadeInWhenVisible className="mt-8 sm:mt-10">
              <div className="mx-auto max-w-4xl rounded-2xl border border-brand-primary/30 bg-white/90 dark:bg-gray-800/80 p-6 sm:p-8 shadow-xl">
                <h3 className="mh-heading-display font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
                  {copy.actionTitle}
                </h3>
                <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed mb-6">
                  {copy.actionBody}
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3">
                  <Button variant="primary" size="lg" asChild>
                    <Link href="/contact">{copy.actionPrimary}</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/services">{copy.actionSecondary}</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/safety">{copy.actionTertiary}</Link>
                  </Button>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
