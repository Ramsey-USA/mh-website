import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { useTranslations } from "next-intl";
import { AboutHero } from "@/components/about";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import {
  AccreditationsLogoRow,
  NextStepsSection,
} from "@/components/shared-sections";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { cornerRadius } from "@/lib/styles/design-tokens";

export default function AboutPage() {
  const commonT = useTranslations("common");
  const aboutTitle = commonT("about.hero.sectionTitle").toLowerCase();
  const isSpanish =
    aboutTitle.includes("sobre") || aboutTitle.includes("nosotros");
  const introCopy = isSpanish
    ? {
        label: "Acerca de MH Construction",
        heading: "Quiénes somos",
        body: "Somos un contratista general veterano en el noroeste del Pacífico. Construimos relaciones de largo plazo mediante comunicación clara, ejecución disciplinada y seguridad en campo.",
        storyTitle: "Nuestra historia",
        storyP1:
          "Desde 2010 hemos trabajado junto a propietarios, operadores y equipos de diseño para entregar proyectos con enfoque práctico y coordinación constante.",
        storyP2:
          "Hoy continuamos ese estándar con liderazgo veterano, administración en Procore y control de alcance para agricultura y bodegas, mejoras para inquilinos comerciales y obras municipales.",
        focusTitle: "Lo que hacemos",
        focusItems: [
          "Construcción general para instalaciones nuevas y sitios ocupados",
          "Edificios post-frame para operaciones agrícolas e industriales",
          "Puertas y herrajes con cumplimiento y coordinación de cierre",
          "Gestión de proyectos con trazabilidad de RFIs, entregables técnicos y secuencias de campo",
        ],
        leadershipTitle: "Liderazgo",
        leadershipBody:
          "Nuestro liderazgo mantiene una estructura simple: decisiones claras, comunicación directa y seguimiento completo desde preconstrucción hasta entrega.",
        snapshotTitle: "Resumen de desempeño",
        safetyTitle: "Seguridad y cumplimiento",
        safetyBody:
          "La seguridad es parte del método de trabajo diario. Mantenemos procesos documentados, control operativo en campo y continuidad para instalaciones activas.",
      }
    : {
        label: "About MH Construction",
        heading: "Who we are",
        body: "We are a veteran-owned general contractor serving the Pacific Northwest. We build long-term Client Partner relationships through direct communication, disciplined execution, and field-first safety.",
        storyTitle: "Our story",
        storyP1:
          "Since 2010, we have worked alongside owners, operators, and design teams to deliver projects with practical planning and steady coordination.",
        storyP2:
          "Today we continue that standard with veteran-owned leadership, Procore-based project administration, and scope control for agricultural and winery facilities, commercial tenant improvements, and municipal projects.",
        focusTitle: "What we do",
        focusItems: [
          "General contracting for new facilities and occupied sites",
          "Post-frame building delivery for agricultural and industrial operations",
          "Door and hardware installation with compliance and closeout coordination",
          "Project management with RFI, submittal, and field-sequencing traceability",
        ],
        leadershipTitle: "Leadership",
        leadershipBody:
          "Our leadership model stays simple: clear decisions, direct communication, and full accountability from preconstruction through closeout.",
        snapshotTitle: "Performance snapshot",
        safetyTitle: "Safety and compliance",
        safetyBody:
          "Safety is embedded into daily operations. We maintain documented controls, practical field planning, and continuity for active facilities.",
      };
  const leadershipProfileCopy = isSpanish
    ? {
        title: "Perfil de liderazgo de Jeremy Thamert",
        cta: "Ver perfil de Jeremy",
      }
    : {
        title: "Jeremy Thamert leadership profile",
        cta: "View Jeremy's Profile",
      };
  return (
    <>
      <PageTrackingClient pageName="About" />

      {/* SEO Meta Tags */}
      {/* Structured Data is injected via layout.tsx to avoid duplication */}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.about),
          ),
        }}
      />

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <AboutHero
          title={commonT("about.hero.sectionTitle")}
          subtitle={commonT("about.hero.sectionSubtitle")}
          description={commonT("about.hero.sectionDescription")}
        />

        <Breadcrumb
          items={[
            { label: commonT("back"), href: "/" },
            { label: commonT("about.hero.sectionTitle") },
          ]}
        />

        <section className="py-10 sm:py-14 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="font-heading text-sm font-semibold tracking-[0.16em] uppercase text-brand-secondary mb-3">
              {introCopy.label}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              {introCopy.heading}
            </h2>
            <p className="font-body text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {introCopy.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {isSpanish ? "Honesty (Honestidad)" : "Honesty"}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {isSpanish ? "Integrity (Integridad)" : "Integrity"}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {isSpanish
                  ? "Professionalism (Profesionalismo)"
                  : "Professionalism"}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {isSpanish ? "Thoroughness (Minuciosidad)" : "Thoroughness"}
              </span>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {introCopy.storyTitle}
            </h2>
            <div className="font-body space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{introCopy.storyP1}</p>
              <p>{introCopy.storyP2}</p>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              {introCopy.focusTitle}
            </h2>
            <ul className="font-body space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {introCopy.focusItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
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

        <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {introCopy.leadershipTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {introCopy.leadershipBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/jeremy-thamert">
                  <MaterialIcon icon="person" size="md" className="mr-2" />
                  {leadershipProfileCopy.cta}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/team">
                  <MaterialIcon icon="groups" size="md" className="mr-2" />
                  {isSpanish ? "Ver equipo" : "View Team"}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              {introCopy.snapshotTitle}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <div
                className={`${cornerRadius.element} border border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/70`}
              >
                <p className="text-2xl sm:text-3xl font-black text-brand-primary">
                  0.64
                </p>
                <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {isSpanish
                    ? "EMR de seguridad premiado"
                    : "Award-winning safety EMR"}
                </p>
              </div>
              <div
                className={`${cornerRadius.element} border border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/70`}
              >
                <p className="text-2xl sm:text-3xl font-black text-brand-primary">
                  150+
                </p>
                <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {isSpanish
                    ? "Años de experiencia combinada"
                    : "Years combined experience"}
                </p>
              </div>
              <div
                className={`${cornerRadius.element} border border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/70`}
              >
                <p className="text-2xl sm:text-3xl font-black text-brand-primary">
                  650+
                </p>
                <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {isSpanish ? "Proyectos completados" : "Successful projects"}
                </p>
              </div>
              <div
                className={`${cornerRadius.element} border border-gray-200 dark:border-gray-700 p-4 sm:p-5 bg-gray-50 dark:bg-gray-800/70`}
              >
                <p className="text-2xl sm:text-3xl font-black text-brand-primary">
                  3
                </p>
                <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  {isSpanish
                    ? "Estados con licencia y seguro"
                    : "States licensed and insured"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-12 sm:py-14 bg-gray-50 dark:bg-gray-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-heading text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-6">
              {commonT("about.accreditations.sectionTitle")}
            </p>
            <AccreditationsLogoRow />
          </div>
        </section>

        <section className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {introCopy.safetyTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {introCopy.safetyBody}
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about#safety">
                <MaterialIcon
                  icon="workspace_premium"
                  size="md"
                  className="mr-2"
                />
                {isSpanish
                  ? "Ver información de seguridad"
                  : "View safety information"}
              </Link>
            </Button>
          </div>
        </section>

        <NextStepsSection
          title={commonT("about.nextSteps.sectionTitle")}
          subtitle={commonT("about.nextSteps.sectionSubtitle")}
          description={commonT("about.nextSteps.sectionDescription")}
          locale={isSpanish ? "es" : "en"}
        />
      </div>
    </>
  );
}
