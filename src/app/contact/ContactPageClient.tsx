"use client";

import { MapFacade } from "./MapFacade";
import { PageTrackingClient } from "@/components/analytics";
import { useLocale } from "@/hooks/useLocale";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { gridPresets } from "@/lib/styles/layout-variants";
import { COMPANY_INFO } from "@/lib/constants/company";
import { PWAOnly } from "@/components/pwa";

// Quick contact info - defined inside component for locale support
const buildQuickContact = (isEs: boolean) => [
  {
    icon: "call",
    label: isEs ? "Llámenos" : "Call Us",
    value: COMPANY_INFO.phone.display,
    link: `tel:${COMPANY_INFO.phone.tel}`,
    color: "brand-primary",
    actionLabel: isEs ? "Llamar Ahora" : "Call Now",
    ariaLabel: `${isEs ? "Llamar a MH Construction al" : "Call MH Construction at"} ${COMPANY_INFO.phone.display}`,
  },
  {
    icon: "mark_email_read",
    label: isEs ? "Envíenos un Correo" : "Email Us",
    value: COMPANY_INFO.email.main,
    link: `mailto:${COMPANY_INFO.email.main}`,
    color: "brand-primary",
    actionLabel: isEs ? "Enviar Correo" : "Send Email",
    ariaLabel: isEs
      ? "Enviar correo a MH Construction"
      : "Send email to MH Construction",
  },
  {
    icon: "place",
    label: isEs ? "Visítenos" : "Visit Us",
    value: COMPANY_INFO.address.full,
    link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address.full)}`,
    color: "brand-primary",
    actionLabel: isEs ? "Cómo Llegar" : "Get Directions",
    ariaLabel: isEs
      ? "Cómo llegar a las oficinas de MH Construction en Pasco, WA"
      : "Get directions to MH Construction office in Pasco, WA",
  },
];

const buildMainCTAs = (isEs: boolean) => [
  {
    icon: "map",
    label: isEs ? "El Plan de Batalla" : "The Battle Plan",
    description: isEs ? "Lo que construimos juntos" : "What we build together",
    link: "/services",
    variant: "primary" as const,
    ariaLabel: isEs
      ? "Explorar servicios de construcción"
      : "Explore construction services and solutions",
  },
  {
    icon: "emoji_events",
    label: isEs ? "Victorias" : "Victories",
    description: isEs ? "Ver proyectos completados" : "See completed projects",
    link: "/projects",
    variant: "primary" as const,
    ariaLabel: isEs
      ? "Ver proyectos completados"
      : "View completed projects and partnerships",
  },
  {
    icon: "diversity_3",
    label: isEs ? "Cadena de Mando" : "Chain of Command",
    description: isEs ? "Su equipo de asociación" : "Your partnership team",
    link: "/team",
    variant: "primary" as const,
    ariaLabel: isEs
      ? "Conocer al equipo de MH Construction"
      : "Meet the MH Construction partnership team",
  },
  {
    icon: "military_tech",
    label: isEs ? "Especialidades" : "Occupation Specialties",
    description: isEs ? "Oportunidades de carrera" : "Career opportunities",
    link: "/careers",
    variant: "secondary" as const,
    ariaLabel: isEs
      ? "Explorar oportunidades de carrera"
      : "Explore career opportunities at MH Construction",
  },
];

export default function ContactPageClient() {
  const locale = useLocale();
  const isEs = locale === "es";
  const quickContact = buildQuickContact(isEs);
  const mainCTAs = buildMainCTAs(isEs);

  return (
    <>
      <PageTrackingClient pageName="Contact" />
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Hero Section */}
        <section
          className="hero-section relative flex items-end justify-end text-white overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background - Ready for photo or video */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
            {/* Overlay for text readability */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"
              aria-hidden="true"
            ></div>
          </div>

          {/* Header Text - Bottom Right */}
          <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
            {/* Mission Icon */}
            <div className="flex justify-end mb-4">
              <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
                <MaterialIcon
                  icon="forum"
                  size="4xl"
                  className="text-white drop-shadow-lg"
                  ariaLabel="Rally Point - Contact us"
                />
              </div>
            </div>
            <h1
              id="hero-heading"
              className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight"
            >
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                {isEs
                  ? "Punto de Encuentro → Contacto"
                  : "Rally Point → Contact"}
              </span>
              <span className="block text-brand-secondary">
                {isEs
                  ? "Su Proyecto. Nuestra Experiencia. Conectemos."
                  : "Your Project. Our Expertise. Let's Connect."}
              </span>
              <span className="block text-brand-primary">
                {isEs
                  ? "Programe Su Consulta Gratuita"
                  : "Schedule Your Free Mission Brief"}
              </span>
              <span className="block text-white/90">
                {isEs
                  ? "Construyendo proyectos para el Cliente, "
                  : "Building projects for the Client, "}
                <span className="font-black italic text-bronze-300">
                  {isEs ? "NO" : "NOT"}
                </span>{" "}
                {isEs ? "el Dinero" : "the Dollar"}
              </span>
            </h1>
          </div>

          {/* Page Navigation */}
          <PageNavigation
            items={navigationConfigs.contact}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: isEs ? "Inicio" : "Home", href: "/" },
            { label: isEs ? "Presentaciones" : "Introductions" },
          ]}
        />

        {/* Quick Contact Section */}
        <section
          id="quick-contact"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="quick-contact-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="forum"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="quick-contact-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {isEs ? "Conéctese Con" : "Connect With"}
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {isEs ? "Su Equipo de Asociación" : "Your Partnership Team"}
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {isEs
                    ? "Todo gran asociación comienza con una "
                    : "Every great partnership begins with an "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {isEs ? "conversación honesta" : "honest conversation"}
                  </span>
                  {isEs
                    ? ". Llámenos, envíe un correo, o visítenos en Pasco—hacemos negocios a la antigua. Más de "
                    : ". Pick up the phone, send an email, or stop by our office in Pasco—we do business the old-fashioned way. Over "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {isEs
                      ? "150 años de experiencia combinada"
                      : "150 years combined experience"}
                  </span>
                  {isEs
                    ? ", y aún creemos en mirar a las personas a los ojos y estrechar la mano."
                    : ", and we still believe in looking people in the eye and shaking hands."}
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-3 mb-16">
                {quickContact.map((contact) => (
                  <a
                    key={contact.link}
                    href={contact.link}
                    target={contact.icon === "place" ? "_blank" : undefined}
                    rel={
                      contact.icon === "place"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={contact.ariaLabel}
                    className="group relative flex h-full"
                  >
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden flex flex-col w-full focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
                      {/* Top Accent Bar */}
                      <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                      <div className="p-8 flex flex-col flex-1 items-center text-center">
                        <div className="relative inline-block mb-6">
                          <div className="absolute -inset-3 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                          <div className="relative rounded-xl bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-4 shadow-xl group-hover:scale-110 transition-all duration-300">
                            <MaterialIcon
                              icon={contact.icon}
                              size="3xl"
                              className="text-white drop-shadow-lg"
                            />
                          </div>
                        </div>
                        <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                          {contact.label}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                          {contact.value}
                        </p>
                        <div
                          className="flex items-center gap-2 mt-4 text-brand-primary group-hover:gap-3 transition-all duration-300"
                          aria-hidden="true"
                        >
                          <span className="font-medium text-sm">
                            {contact.actionLabel}
                          </span>
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Trust Credentials */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {isEs
                    ? "Acreditado y Certificado:"
                    : "Accredited & Certified:"}
                </span>
                <a
                  href={COMPANY_INFO.bbb.sealClickUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="BBB Accredited Business - A+ Rating"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.bbb.sealHorizontal}
                    alt="BBB Accredited A+ Rating"
                    className="h-10 w-auto dark:hidden"
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.bbb.sealHorizontalWhite}
                    alt="BBB Accredited A+ Rating"
                    className="h-10 w-auto hidden dark:block"
                    loading="lazy"
                  />
                </a>
                <a
                  href="https://www.agcwa.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="AGC of Washington Member"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logo/agc-member.webp"
                    alt="AGC of Washington Member"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
                <a
                  href={COMPANY_INFO.travelers.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Travelers Insurance - Auto & Bonding Partner"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.travelers.logo}
                    alt="Travelers Insurance - Auto & Bonding Partner"
                    className="h-8 w-auto dark:hidden"
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.travelers.logoWhite}
                    alt="Travelers Insurance - Auto & Bonding Partner"
                    className="h-8 w-auto hidden dark:block"
                    loading="lazy"
                  />
                </a>
                <a
                  href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Pasco Chamber of Commerce Member"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.chambers.pasco.logo}
                    alt="Pasco Chamber of Commerce Member"
                    className="h-10 w-auto dark:hidden"
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.chambers.pasco.logoWhite}
                    alt="Pasco Chamber of Commerce Member"
                    className="h-10 w-auto hidden dark:block"
                    loading="lazy"
                  />
                </a>
                <a
                  href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Richland Chamber of Commerce Member"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.chambers.richland.logo}
                    alt="Richland Chamber of Commerce Member"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
                <a
                  href={
                    COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Tri-City Regional Chamber of Commerce Member"
                  className="transition-transform hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COMPANY_INFO.chambers.triCityRegional.logo}
                    alt="Tri-City Regional Chamber of Commerce Member"
                    className="h-10 w-auto"
                    loading="lazy"
                  />
                </a>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full">
                  <MaterialIcon
                    icon="military_tech"
                    size="sm"
                    className="text-brand-primary"
                  />
                  <span className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light">
                    Veteran-Owned Since January 2025
                  </span>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* PWA-only: one-tap contact strip (only shown in installed app) */}
        <PWAOnly>
          <div className="bg-brand-primary dark:bg-brand-primary-dark px-4 py-3 flex flex-wrap items-center justify-center gap-3">
            <span className="text-white font-bold text-sm tracking-wide mr-2">
              {isEs ? "Contacto rápido" : "Quick Contact"}
            </span>
            <a
              href={`tel:${COMPANY_INFO.phone.tel}`}
              className="flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold text-sm px-4 py-2 transition-colors"
              aria-label={
                isEs
                  ? `Llamar al ${COMPANY_INFO.phone.display}`
                  : `Call ${COMPANY_INFO.phone.display}`
              }
            >
              <MaterialIcon
                icon="call"
                size="sm"
                style={{ fontSize: "16px" }}
              />
              {COMPANY_INFO.phone.display}
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email.main}`}
              className="flex items-center gap-1.5 rounded-lg bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold text-sm px-4 py-2 transition-colors"
              aria-label={
                isEs
                  ? `Enviar correo a ${COMPANY_INFO.email.main}`
                  : `Email ${COMPANY_INFO.email.main}`
              }
            >
              <MaterialIcon
                icon="mail"
                size="sm"
                style={{ fontSize: "16px" }}
              />
              {isEs ? "Enviar correo" : "Send Email"}
            </a>
          </div>
        </PWAOnly>

        {/* Two Pathways - Allies vs Client Partners */}
        <section
          className="relative py-20 lg:py-32 xl:py-40 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden"
          aria-labelledby="partnership-pathways-heading"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
          <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
          <div
            className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              <div className="mb-16 lg:mb-24 text-center">
                <h2
                  id="partnership-pathways-heading"
                  className="mb-8 pb-2 font-black text-gray-900 dark:text-gray-100 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter"
                >
                  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                    {isEs ? "Dos Caminos hacia el" : "Two Pathways to"}
                  </span>
                  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                    {isEs ? "Éxito en Asociación" : "Partnership Success"}
                  </span>
                </h2>
                <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                  {isEs
                    ? "Ya sea cliente o Aliado, tenemos un camino diseñado para usted"
                    : "Whether you're a Client Partner or an Ally, we have a pathway designed for you"}
                </p>
              </div>

              {/* Two-Column Grid for Pathways */}
              <div className={gridPresets.twoColumn("xl")}>
                {/* Client Partner Services Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-primary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-primary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-primary/10 dark:bg-brand-primary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="diversity_3"
                        size="3xl"
                        theme="military"
                        ariaLabel="Client Partner Partnership"
                        className="text-brand-primary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      {isEs ? "Para Clientes" : "For Client Partners"}
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    {isEs
                      ? "¿Listo para comenzar su proyecto de construcción? Estamos aquí para escuchar, colaborar y hacer realidad su visión a través de una gestión de construcción profesional."
                      : "Ready to begin your construction project? We're here to listen, collaborate, and bring your vision to life through professional construction management."}
                  </p>

                  {/* Client Partner Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-primary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="military"
                          ariaLabel="Client Services Phone"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {isEs
                              ? "Servicios al Cliente"
                              : "Client Partner Services"}
                          </p>
                          <a
                            href={`tel:${COMPANY_INFO.phone.tel}`}
                            className="text-brand-primary hover:text-brand-secondary-text text-lg font-bold transition-colors"
                            aria-label={`Call Client Partner services at ${COMPANY_INFO.phone.display}`}
                          >
                            {COMPANY_INFO.phone.display}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="mark_email_read"
                          size="lg"
                          theme="military"
                          ariaLabel="Client Services Email"
                          className="text-brand-primary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {isEs ? "Correo" : "Email"}
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Project%20Inquiry"
                            className="text-brand-primary hover:text-brand-secondary-text text-lg font-bold transition-colors"
                            aria-label={
                              isEs
                                ? "Enviar correo a office@mhc-gc.com para consultas de proyectos"
                                : "Email office@mhc-gc.com for project inquiries"
                            }
                          >
                            office@mhc-gc.com
                          </a>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                          {isEs
                            ? "Para: Presupuestos gratuitos, consultas y discusiones de proyectos"
                            : "For: Free estimates, consultations, and project discussions"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Client Partner CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      {isEs ? "Comenzar:" : "Get Started:"}
                    </h4>
                    <Link
                      href="/contact"
                      className="flex items-center justify-between bg-brand-primary hover:bg-brand-secondary text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="military"
                          ariaLabel="Contact Us"
                        />
                        <span>
                          {isEs ? "Contáctenos Hoy" : "Contact Us Today"}
                        </span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/services"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-primary text-brand-primary dark:text-brand-secondary hover:bg-brand-primary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="map"
                          size="lg"
                          theme="military"
                          ariaLabel="Services"
                        />
                        <span>
                          {isEs ? "Explorar Servicios" : "Explore Services"}
                        </span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>

                {/* Allies Pathway */}
                <div className="bg-white dark:bg-gray-900 border-4 border-brand-secondary p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-brand-secondary/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-brand-secondary/10 dark:bg-brand-secondary/20 p-4 rounded-2xl">
                      <MaterialIcon
                        icon="handshake"
                        size="3xl"
                        theme="veteran"
                        ariaLabel="Ally Partnership"
                        className="text-brand-secondary"
                      />
                    </div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
                      {isEs ? "Para Aliados" : "For Allies"}
                    </h3>
                  </div>

                  <p className="mb-6 text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                    {isEs
                      ? "¿Desea crecer su negocio con un líder de construcción de propiedad veterana? Únase a nuestra red de profesionales de calidad que sirven al mercado del Noroeste del Pacífico."
                      : "Looking to grow your business with a Veteran-Owned Since January 2025 construction leader? Join our network of quality professionals serving the Pacific Northwest market."}
                  </p>

                  {/* Ally Contact Info */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 border-l-4 border-brand-secondary rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="call"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Inquiries Phone"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {isEs ? "Consultas de Aliados" : "Ally Inquiries"}
                          </p>
                          <a
                            href={`tel:${COMPANY_INFO.phone.tel}`}
                            className="text-brand-secondary-text hover:text-bronze-600 text-lg font-bold transition-colors dark:text-brand-secondary-light"
                            aria-label={`Call Ally inquiries at ${COMPANY_INFO.phone.display}`}
                          >
                            {COMPANY_INFO.phone.display}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="mark_email_read"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Inquiries Email"
                          className="text-brand-secondary flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {isEs ? "Correo" : "Email"}
                          </p>
                          <a
                            href="mailto:office@mhc-gc.com?subject=Ally%20Inquiry"
                            className="text-brand-secondary-text hover:text-bronze-600 text-lg font-bold transition-colors dark:text-brand-secondary-light"
                            aria-label={
                              isEs
                                ? "Enviar correo a office@mhc-gc.com para consultas de aliados"
                                : "Email office@mhc-gc.com for Ally inquiries"
                            }
                          >
                            office@mhc-gc.com
                          </a>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                          {isEs
                            ? "Para: Solicitudes de proveedores, relaciones de Aliados y oportunidades de negocio"
                            : "For: Trade Partner applications, Ally relationships, and business opportunities"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ally CTAs */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">
                      {isEs ? "Únase a Nuestra Red:" : "Join Our Network:"}
                    </h4>
                    <Link
                      href="/allies"
                      className="flex items-center justify-between bg-secondary-700 hover:bg-bronze-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="verified_user"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Approved Trade Partner"
                        />
                        <span>
                          {isEs
                            ? "Solicitar como Proveedor Aprobado"
                            : "Apply as Approved Trade Partner"}
                        </span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <Link
                      href="/allies#benefits"
                      className="flex items-center justify-between bg-white dark:bg-gray-700 border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <MaterialIcon
                          icon="handshake"
                          size="lg"
                          theme="veteran"
                          ariaLabel="Ally Benefits"
                        />
                        <span>
                          {isEs
                            ? "Ver Beneficios de Aliados"
                            : "View Ally Benefits"}
                        </span>
                      </div>
                      <MaterialIcon
                        icon="arrow_forward"
                        size="md"
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="office-location-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="location_on"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="office-location-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {isEs ? "Visítenos en" : "Visit Our"}
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {isEs ? "Nuestra Oficina" : "Office Location"}
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  <span itemProp="address">
                    3111 N Capitol Ave, Pasco, WA 99301
                  </span>
                </p>
                <p className="mt-4 text-gray-500 dark:text-gray-300 text-base sm:text-lg">
                  {isEs
                    ? "Sede en Tri-Cities (Pasco, Richland y Kennewick). Con licencia Tri-State en el Noroeste del Pacífico"
                    : "Headquartered in the Tri-Cities (Pasco, Richland, Kennewick). Tri-State licensed across the Pacific Northwest"}
                </p>
              </div>

              {/* Interactive Map - loads on click (facade pattern) */}
              <div
                className="relative mb-12 rounded-2xl shadow-2xl overflow-hidden border-4 border-brand-primary/20"
                style={{ height: "600px" }}
              >
                <MapFacade />
              </div>

              {/* Map CTA */}
              <div className="text-center">
                <a
                  href="https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    isEs
                      ? "Como llegar a la oficina de MH Construction en Pasco, Washington"
                      : "Get directions to MH Construction office in Pasco, Washington"
                  }
                  className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
                >
                  <MaterialIcon
                    icon="explore"
                    size="lg"
                    theme="military"
                    ariaLabel="Get Directions"
                  />
                  {isEs ? "Cómo Llegar" : "Get Directions"}
                </a>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Strategic CTAs Section */}
        <section
          className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          aria-labelledby="partnership-options-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="handshake"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="partnership-options-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {isEs ? "Explore Sus" : "Explore Your"}
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {isEs ? "Opciones de Asociación" : "Partnership Options"}
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {isEs ? "Descubra cómo podemos " : "Discover how we can "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {isEs ? "construir juntos" : "build together"}
                  </span>
                </p>
              </div>

              {/* CTA Grid - Following MH Standards for 6 cards */}
              <StaggeredFadeIn
                className={gridPresets.cards3("md", "max-w-6xl mx-auto")}
              >
                {mainCTAs.map((cta) => (
                  <Link
                    key={cta.link}
                    href={cta.link}
                    aria-label={cta.ariaLabel}
                    className="group relative flex h-full"
                  >
                    {/* Animated Border Glow */}
                    <div
                      className={`absolute -inset-2 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse ${
                        cta.variant === "primary"
                          ? "bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40"
                          : "bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40"
                      }`}
                    ></div>

                    <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 overflow-hidden flex flex-col w-full focus:outline-none focus:ring-4 focus:ring-brand-primary/50">
                      {/* Top Accent Bar */}
                      <div
                        className={`h-2 ${
                          cta.variant === "primary"
                            ? "bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"
                            : "bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"
                        }`}
                      ></div>

                      <div className="p-8 flex flex-col flex-1">
                        {/* Icon Container */}
                        <div className="flex justify-center mb-6">
                          <div className="relative inline-block">
                            <div
                              className={`absolute -inset-3 opacity-30 blur-lg rounded-xl ${
                                cta.variant === "primary"
                                  ? "bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40"
                                  : "bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40"
                              }`}
                            ></div>
                            <div
                              className={`relative rounded-xl p-4 shadow-xl group-hover:scale-110 transition-all duration-300 ${
                                cta.variant === "primary"
                                  ? "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker"
                                  : "bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800"
                              }`}
                            >
                              <MaterialIcon
                                icon={cta.icon}
                                size="3xl"
                                className="text-white drop-shadow-lg"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="text-center flex flex-col flex-grow">
                          <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-xl sm:text-2xl min-h-[3.5rem] flex items-center justify-center">
                            {cta.label}
                          </h3>
                          <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed flex-grow">
                            {cta.description}
                          </p>
                          <div
                            className={`flex justify-center items-center gap-2 ${
                              cta.variant === "primary"
                                ? "text-brand-primary"
                                : "text-brand-secondary"
                            } group-hover:gap-3 transition-all duration-300`}
                            aria-hidden="true"
                          >
                            <span className="font-semibold text-sm">
                              {isEs ? "Más Información" : "Learn More"}
                            </span>
                            <MaterialIcon
                              icon="arrow_forward"
                              size="sm"
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </StaggeredFadeIn>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Service Areas Section */}
        <section
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          id="service-areas"
          aria-labelledby="service-areas-heading"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInWhenVisible>
              {/* Section Header - Military Construction Standard */}
              <div className="mb-16 sm:mb-20 text-center">
                {/* Icon with decorative lines */}
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="map"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Service coverage areas"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                </div>

                {/* Two-line gradient heading */}
                <h2
                  id="service-areas-heading"
                  className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible"
                >
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {isEs ? "Nuestra Cobertura" : "Our Tri-State"}
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {isEs ? "de Tres Estados" : "Service Coverage"}
                  </span>
                </h2>

                {/* Description */}
                <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {isEs
                    ? "Servicios profesionales de construccion en todo el"
                    : "Professional construction services throughout the"}{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    {isEs ? "Noroeste del Pacifico" : "Pacific Northwest"}
                  </span>
                </p>
              </div>

              {/* Service Area Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Tri-Cities Headquarters Card */}
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                    <div className="p-8 flex flex-col flex-1">
                      {/* Icon */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                          <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl p-3 shadow-xl">
                            <MaterialIcon
                              icon="place"
                              size="xl"
                              className="text-white drop-shadow-lg"
                              ariaLabel="Primary service region"
                            />
                          </div>
                        </div>
                        <h3 className="font-bold text-brand-primary text-xl sm:text-2xl">
                          {isEs
                            ? "Sede en Tri-Cities"
                            : "Tri-Cities Headquarters"}
                        </h3>
                      </div>

                      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                        {isEs
                          ? "Pasco, Richland y Kennewick - Respuesta inmediata disponible"
                          : "Pasco, Richland, and Kennewick - Immediate response available"}
                      </p>

                      {/* Location Links */}
                      <div className="grid grid-cols-1 gap-3">
                        <Link
                          href="/locations/pasco"
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                        >
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="text-brand-secondary group-hover/link:translate-x-1 transition-transform"
                            ariaLabel={
                              isEs
                                ? "Navegar a la pagina de Pasco"
                                : "Navigate to Pasco page"
                            }
                          />
                          <span className="font-medium">Pasco, WA</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {isEs ? "Sede" : "Headquarters"}
                          </span>
                        </Link>
                        <Link
                          href="/locations/kennewick"
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                        >
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="text-brand-secondary group-hover/link:translate-x-1 transition-transform"
                            ariaLabel={
                              isEs
                                ? "Navegar a la pagina de Kennewick"
                                : "Navigate to Kennewick page"
                            }
                          />
                          <span className="font-medium">Kennewick, WA</span>
                        </Link>
                        <Link
                          href="/locations/richland"
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                        >
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="text-brand-secondary group-hover/link:translate-x-1 transition-transform"
                            ariaLabel={
                              isEs
                                ? "Navegar a la pagina de Richland"
                                : "Navigate to Richland page"
                            }
                          />
                          <span className="font-medium">Richland, WA</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extended Coverage Card */}
                <div className="group relative flex h-full">
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-20 group-hover:opacity-60 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                    {/* Top Accent Bar */}
                    <div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

                    <div className="p-8 flex flex-col flex-1">
                      {/* Icon */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-brand-secondary/40 to-bronze-600/40 opacity-30 blur-lg rounded-xl"></div>
                          <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-xl p-3 shadow-xl">
                            <MaterialIcon
                              icon="travel_explore"
                              size="xl"
                              className="text-white drop-shadow-lg"
                              ariaLabel={
                                isEs
                                  ? "Cobertura de servicio extendida"
                                  : "Extended service coverage"
                              }
                            />
                          </div>
                        </div>
                        <h3 className="font-bold text-brand-secondary text-xl sm:text-2xl">
                          {isEs ? "Cobertura Extendida" : "Extended Coverage"}
                        </h3>
                      </div>

                      <p className="mb-6 text-gray-600 dark:text-gray-300 text-sm">
                        {isEs
                          ? "Con licencia Tri-State - WA, OR, ID. Expansión a MT próximamente"
                          : "Tri-State Licensed - WA, OR, ID. Montana expansion coming soon"}
                      </p>

                      {/* Location Links and Coverage */}
                      <div className="grid grid-cols-1 gap-3">
                        <Link
                          href="/locations/spokane"
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                        >
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="text-brand-primary group-hover/link:translate-x-1 transition-transform"
                            ariaLabel={
                              isEs
                                ? "Navegar a la pagina de Spokane"
                                : "Navigate to Spokane page"
                            }
                          />
                          <span className="font-medium">Spokane, WA</span>
                        </Link>
                        <Link
                          href="/locations/yakima"
                          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-brand-secondary dark:hover:text-brand-secondary transition-colors p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 group/link"
                        >
                          <MaterialIcon
                            icon="arrow_forward"
                            size="sm"
                            className="text-brand-primary group-hover/link:translate-x-1 transition-transform"
                            ariaLabel={
                              isEs
                                ? "Navegar a la pagina de Yakima"
                                : "Navigate to Yakima page"
                            }
                          />
                          <span className="font-medium">Yakima, WA</span>
                        </Link>
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-primary"
                            ariaLabel="Licensed in Washington"
                          />
                          <span className="font-medium">Washington State</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-primary"
                            ariaLabel="Licensed in Oregon"
                          />
                          <span className="font-medium">Oregon</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300 p-3">
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-primary"
                            ariaLabel="Licensed in Idaho"
                          />
                          <span className="font-medium">Idaho</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      </div>
    </>
  );
}
