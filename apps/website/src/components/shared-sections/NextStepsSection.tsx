/**
 * Shared Next Steps CTA Section Component
 * Three-option CTA section: Consultation, Estimate, Contact
 * Used on: Homepage, About, Services pages
 */

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PitchDeckCTA } from "@/components/ui/cta";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";
import type { SupportedLocale } from "@/lib/i18n/locale";
import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens";

interface NextStepsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  noBackground?: boolean;
  locale?: SupportedLocale;
  description?: string;
}

type NextStepsCopy = {
  subtitle: string;
  title: string;
  introPrefix: string;
  introHighlightA: string;
  introMiddle: string;
  introHighlightB: string;
  introSuffix: string;
  tag: string;
  option2Title: string;
  option2Description: string;
  option2Bullets: readonly string[];
  option2Cta: string;
  option3Title: string;
  option3Description: string;
  option3Bullets: readonly string[];
  option3Cta: string;
};

const NEXT_STEPS_COPY: Record<"en" | "es", NextStepsCopy> = {
  es: {
    subtitle: "Listo para comenzar su proyecto?",
    title: "Construyamos juntos",
    introPrefix: "Donde ",
    introHighlightA: "su palabra es su compromiso",
    introMiddle: ", y la nuestra también. Asóciese con un ",
    introHighlightB: "equipo veterano centrado en relaciones",
    introSuffix: "respaldado por valores probados.",
    tag: "Mas popular",
    option2Title: "Vea nuestro trabajo real",
    option2Description:
      "Proyectos reales. Resultados reales. Testimonios reales de Clientes que confían en nosotros.",
    option2Bullets: [
      "650+ proyectos completados desde 2010",
      "98% de satisfacción de clientes",
      "70% de referidos - excelencia comprobada",
    ],
    option2Cta: "Ver nuestro trabajo",
    option3Title: "Hablemos cara a cara",
    option3Description:
      "Respuestas honestas de personas reales. Sin sistemas automatizados. Solo comunicación transparente.",
    option3Bullets: [
      "Consulta presencial preferida",
      "Precios transparentes desde el primer día",
      "Contacto directo con quienes toman decisiones",
    ],
    option3Cta: "Contáctenos",
  },
  en: {
    subtitle: "Ready to Start Your Project?",
    title: "Let's Build Together",
    introPrefix: "Where ",
    introHighlightA: "your word is your bond",
    introMiddle: ", and ours is too. Partner with a ",
    introHighlightB: "relationship-first project team",
    introSuffix: "backed by proven values.",
    tag: "Most Popular",
    option2Title: "See Our Real Work",
    option2Description:
      "Real projects. Real results. Real testimonials from Client Partners who trust us.",
    option2Bullets: [
      "650+ completed projects since 2010",
      "98% Client Partner satisfaction rate",
      "70% referral rate - proven excellence",
    ],
    option2Cta: "View Our Work",
    option3Title: "Let's Talk Face-to-Face",
    option3Description:
      "Honest answers from real people. No automated systems. Just transparent communication.",
    option3Bullets: [
      "Face-to-face consultation preferred",
      "Transparent pricing from day one",
      "Direct line to decision-makers",
    ],
    option3Cta: "Get In Touch",
  },
};

export function NextStepsSection(props: Readonly<NextStepsSectionProps>) {
  const {
    title: _title = "Let's Build Your Vision Together",
    subtitle:
      _subtitle = "Partner with a relationship-first team where honesty, integrity, professionalism, and thoroughness guide every decision.",
    className = "",
    noBackground: _noBackground = false,
    locale = "en",
  } = props;
  const copy = NEXT_STEPS_COPY[locale === "es" ? "es" : "en"];

  return (
    <BrandedContentSection
      id="next-steps"
      header={{
        icon: "handshake",
        iconVariant: "secondary",
        subtitle: copy.subtitle,
        title: copy.title,
        description: (
          <>
            {copy.introPrefix}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              {copy.introHighlightA}
            </span>
            {copy.introMiddle}
            <span className="font-bold text-gray-900 dark:text-white">
              {copy.introHighlightB}
            </span>
            {` ${copy.introSuffix}`}
          </>
        ),
      }}
      className={className}
    >
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Pitch Deck Card - Always visible */}
        <PitchDeckCTA variant="card" />

        {/* Option 2: View Our Work */}
        <div
          className={`group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 ${cornerRadius.card} ${hoverMotion.translateUpLarge} border border-brand-secondary/40 dark:border-brand-secondary/50 flex flex-col h-full`}
        >
          <div
            className={`bg-linear-to-r from-brand-secondary to-brand-secondary-dark -top-4 left-1/2 absolute px-5 py-1.5 ${cornerRadius.full} -translate-x-1/2 shadow-lg border border-brand-secondary/30`}
          >
            <span className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <MaterialIcon icon="star" size="sm" className="text-yellow-300" />
              {copy.tag}
            </span>
          </div>
          <div className="flex justify-center mb-6">
            <div
              className={`${cornerRadius.element} bg-linear-to-br from-brand-secondary to-brand-secondary-dark p-4 shadow-lg ${hoverMotion.iconSubtle}`}
            >
              <MaterialIcon
                icon="photo_library"
                size="xl"
                className="text-white"
              />
            </div>
          </div>
          <h3 className="mb-4 font-bold text-xl sm:text-2xl text-center text-gray-900 dark:text-white leading-tight">
            {copy.option2Title}
          </h3>
          <p className="mb-5 text-center text-gray-600 text-sm sm:text-base dark:text-gray-300 leading-relaxed">
            {copy.option2Description}
          </p>
          <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 grow">
            {copy.option2Bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary shrink-0"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link href="/projects">
            <Button variant="secondary" size="lg" className="w-full group/btn">
              <MaterialIcon
                icon="photo_library"
                size="lg"
                className="mr-2 group-hover/btn:scale-110 transition-transform"
              />
              {copy.option2Cta}
            </Button>
          </Link>
        </div>

        {/* Option 3: Contact Us */}
        <div
          className={`group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 ${cornerRadius.card} ${hoverMotion.translateUpLarge} flex flex-col h-full`}
        >
          <div className="flex justify-center mb-6">
            <div
              className={`${cornerRadius.element} bg-linear-to-br from-brand-secondary to-bronze-600 p-4 shadow-lg ${hoverMotion.iconSubtle}`}
            >
              <MaterialIcon
                icon="contact_phone"
                size="xl"
                className="text-white"
              />
            </div>
          </div>
          <h3 className="mb-4 font-bold text-xl sm:text-2xl text-center text-gray-900 dark:text-white leading-tight">
            {copy.option3Title}
          </h3>
          <p className="mb-5 text-center text-gray-600 text-sm sm:text-base dark:text-gray-300 leading-relaxed">
            {copy.option3Description}
          </p>
          <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 grow">
            {copy.option3Bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="text-brand-secondary shrink-0"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="w-full bg-brand-secondary hover:bg-brand-secondary/90 group/btn"
            >
              <MaterialIcon
                icon="mail"
                size="lg"
                className="mr-2 group-hover/btn:scale-110 transition-transform"
              />
              {copy.option3Cta}
            </Button>
          </Link>
        </div>
      </div>
    </BrandedContentSection>
  );
}
