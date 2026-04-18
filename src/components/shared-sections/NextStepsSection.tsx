/**
 * Shared Next Steps CTA Section Component
 * Three-option CTA section: Consultation, Estimate, Contact
 * Used on: Homepage, About, Services pages
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PitchDeckCTA } from "@/components/ui/cta";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";
import { useLocale } from "@/hooks/useLocale";

interface NextStepsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  noBackground?: boolean;
}

export function NextStepsSection({
  title: _title = "Let's Build Your Vision Together",
  subtitle:
    _subtitle = "Partner with a Veteran-Owned, relationship-first team where honesty, integrity, professionalism, and thoroughness guide every decision.",
  className = "",
  noBackground: _noBackground = false,
}: NextStepsSectionProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <BrandedContentSection
      id="next-steps"
      header={{
        icon: "handshake",
        iconVariant: "secondary",
        subtitle: isEs
          ? "Listo para comenzar su proyecto?"
          : "Ready to Start Your Project?",
        title: isEs ? "Construyamos juntos" : "Let's Build Together",
        description: (
          <>
            {isEs ? "Donde " : "Where "}
            <span className="font-bold text-brand-primary dark:text-brand-primary-light">
              {isEs ? "su palabra es su compromiso" : "your word is your bond"}
            </span>
            {isEs
              ? ", y la nuestra también. Asóciese con un "
              : ", and ours is too. Partner with a "}
            <span className="font-bold text-gray-900 dark:text-white">
              {isEs
                ? "equipo veterano centrado en relaciones"
                : "Veteran-Owned, relationship-first team"}
            </span>{" "}
            {isEs
              ? "respaldado por valores probados."
              : "backed by proven values."}
          </>
        ),
      }}
      className={className}
    >
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Pitch Deck Card - Always visible */}
        <PitchDeckCTA variant="card" />

        {/* Option 2: View Our Work */}
        <div className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 border-2 border-brand-secondary flex flex-col h-full">
          <div className="bg-gradient-to-r from-brand-secondary to-brand-secondary-dark -top-4 left-1/2 absolute px-5 py-1.5 rounded-full -translate-x-1/2 shadow-lg border-2 border-brand-secondary/30">
            <span className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
              <MaterialIcon icon="star" size="sm" className="text-yellow-300" />
              {isEs ? "Mas popular" : "Most Popular"}
            </span>
          </div>
          <div className="flex justify-center mb-6">
            <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon
                icon="photo_library"
                size="xl"
                className="text-white"
              />
            </div>
          </div>
          <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
            {isEs ? "Vea nuestro trabajo real" : "See Our Real Work"}
          </h3>
          <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
            {isEs
              ? "Proyectos reales. Resultados reales. Testimonios reales de Clientes que confian en nosotros."
              : "Real projects. Real results. Real testimonials from Client Partners who trust us."}
          </p>
          <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 flex-grow">
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "650+ proyectos completados desde 2010"
                  : "650+ completed projects since 2010"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "98% de satisfaccion de clientes"
                  : "98% Client Partner satisfaction rate"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "70% de referidos - excelencia comprobada"
                  : "70% referral rate - proven excellence"}
              </span>
            </li>
          </ul>
          <Link href="/projects">
            <Button variant="secondary" size="lg" className="w-full group/btn">
              <MaterialIcon
                icon="photo_library"
                size="lg"
                className="mr-2 group-hover/btn:scale-110 transition-transform"
              />
              {isEs ? "Ver nuestro trabajo" : "View Our Work"}
            </Button>
          </Link>
        </div>

        {/* Option 3: Contact Us */}
        <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
          <div className="flex justify-center mb-6">
            <div className="rounded-xl bg-gradient-to-br from-brand-secondary to-bronze-600 p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <MaterialIcon
                icon="contact_phone"
                size="xl"
                className="text-white"
              />
            </div>
          </div>
          <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
            {isEs ? "Hablemos cara a cara" : "Let's Talk Face-to-Face"}
          </h3>
          <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
            {isEs
              ? "Respuestas honestas de personas reales. Sin sistemas automatizados. Solo comunicacion transparente."
              : "Honest answers from real people. No automated systems. Just transparent communication."}
          </p>
          <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 flex-grow">
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "Consulta presencial preferida"
                  : "Face-to-face consultation preferred"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "Precios transparentes desde el primer dia"
                  : "Transparent pricing from day one"}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-brand-secondary flex-shrink-0"
              />
              <span>
                {isEs
                  ? "Contacto directo con quienes toman decisiones"
                  : "Direct line to decision-makers"}
              </span>
            </li>
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
              {isEs ? "Contactenos" : "Get In Touch"}
            </Button>
          </Link>
        </div>
      </div>
    </BrandedContentSection>
  );
}
