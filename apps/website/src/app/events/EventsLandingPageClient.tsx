"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StripedBackground } from "@/components/ui/StripedBackground";
import { EventsHero } from "@/components/events/EventsHero";
import {
  eventGalleryImages,
  getLocalizedUpcomingEvents,
} from "@/lib/data/events";

type EventsLandingPageClientProps = {
  locale: "en" | "es";
};

export function EventsLandingPageClient({
  locale,
}: EventsLandingPageClientProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const isEs = locale === "es";
  const localizedUpcomingEvents = useMemo(
    () => getLocalizedUpcomingEvents(locale),
    [locale],
  );

  const activeImage = useMemo(
    () => eventGalleryImages[activeSlide] ?? eventGalleryImages[0],
    [activeSlide],
  );

  const goPrev = () => {
    setActiveSlide((prev) =>
      prev === 0 ? eventGalleryImages.length - 1 : prev - 1,
    );
  };

  const goNext = () => {
    setActiveSlide((prev) =>
      prev === eventGalleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <main className="min-h-screen text-white">
      {/* Hero Section - Compliant with MH Branding Standards */}
      <EventsHero locale={locale} />

      {/* Event Hub Introduction and CTAs */}
      <section className="relative bg-white/5 border-b border-brand-secondary/35 py-12 sm:py-16 lg:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <p className="font-body text-base sm:text-lg text-white/90 leading-relaxed">
              {isEs
                ? "Esta es la pagina central para los eventos patrocinados y organizados por MH Construction. Mantenemos visibles los registros de eventos completados, destacamos a los equipos participantes y publicamos proximas oportunidades para clientes, aliados y la comunidad de Tri-Cities."
                : "This is the central landing page for MH Construction sponsored and hosted events. We keep completed-event records visible, highlight participating teams, and publish upcoming opportunities for clients, partners, and the Tri-Cities community."}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#yearly-hosted-event"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-gray-900 transition hover:-translate-y-0.5 hover:bg-brand-secondary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="military_tech" size="sm" />
              {isEs
                ? "Evento anual Operation: Cast & Recover"
                : "Annual Operation: Cast & Recover"}
            </a>
            <a
              href="#fishing-event-ribbon"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="emoji_events" size="sm" />
              {isEs ? "Cinta de evento de pesca" : "Fishing Event Ribbon"}
            </a>
            <Link
              href="/events/operation-cast-recover"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="article" size="sm" />
              {isEs
                ? "Ver registro y detalles"
                : "View registration and details"}
            </Link>
            <Link
              href="/events/cool-desert-nights"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="local_fire_department" size="sm" />
              {isEs
                ? "Ver pagina Cool Desert Nights"
                : "View Cool Desert Nights page"}
            </Link>
            <Link
              href="/events/bbq-contest"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="outdoor_grill" size="sm" />
              {isEs
                ? "Ver ruta de coordinacion BBQ"
                : "View BBQ Coordination page"}
            </Link>
            <Link
              href="/events/ironman-volunteer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="directions_run" size="sm" />
              {isEs
                ? "Ver pagina de voluntariado IRONMAN"
                : "View IRONMAN volunteer page"}
            </Link>
            <a
              href="#upcoming-events"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="event" size="sm" />
              {isEs ? "Proximos eventos" : "Upcoming Events"}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-brand-secondary/70 bg-transparent px-5 py-3 text-sm font-semibold text-brand-secondary transition hover:-translate-y-0.5 hover:bg-brand-secondary/12 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary"
            >
              <MaterialIcon icon="groups" size="sm" />
              {isEs ? "Asociate con MH" : "Partner With MH"}
            </Link>
          </div>
        </div>
      </section>
      <StripedBackground>
        <div className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: isEs ? "Inicio" : "Home", href: "/" },
                { label: isEs ? "Eventos" : "Events" },
              ]}
            />
          </div>

          <section
            id="event-pages"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                {isEs ? "Paginas dedicadas" : "Dedicated Event Pages"}
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {isEs
                  ? "Cuatro paginas activas desde el centro de eventos"
                  : "Four Active Pages from the Events Hub"}
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "Cada ruta mantiene un enfoque distinto: el evento anual de pesca, el archivo de Cool Desert Nights, la pagina dedicada de la Competencia Anual BBQ del Pacific Northwest y el proceso anual de voluntariado IRONMAN."
                  : "Each route keeps a distinct focus: the annual fishing event, the Cool Desert Nights archive, the dedicated Pacific Northwest Annual BBQ Competition page, and the yearly IRONMAN volunteer process."}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25 dark:border-white/20 dark:bg-white/6">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Evento anual" : "Annual Hosted Event"}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                    Operation: Cast & Recover
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
                    {isEs
                      ? "Ruta con estado del evento, calendario confirmado y ruta de registro y participacion para veteranos y capitanes voluntarios."
                      : "Route with event status, confirmed schedule, and registration and participation paths for veterans and volunteer captains."}
                  </p>
                  <Link
                    href="/events/operation-cast-recover"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                  >
                    <MaterialIcon icon="arrow_forward" size="sm" />
                    {isEs ? "Abrir pagina" : "Open page"}
                  </Link>
                </article>

                <article className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25 dark:border-white/20 dark:bg-white/6">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Archivo de evento" : "Event Archive"}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                    Cool Desert Nights
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
                    {isEs
                      ? "Resumen archivado de resultados y material del evento comunitario 2026."
                      : "Archived recap route for 2026 community event results and media."}
                  </p>
                  <Link
                    href="/events/cool-desert-nights"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                  >
                    <MaterialIcon icon="arrow_forward" size="sm" />
                    {isEs ? "Abrir pagina" : "Open page"}
                  </Link>
                </article>

                <article className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25 dark:border-white/20 dark:bg-white/6">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Evento dedicado" : "Dedicated Event"}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                    {isEs
                      ? "Competencia Anual BBQ del Pacific Northwest"
                      : "Pacific Northwest Annual BBQ Competition"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
                    {isEs
                      ? "Ruta enfocada en experiencia del usuario con estado del evento, ventana objetivo y coordinacion para equipos, patrocinadores y aliados."
                      : "User-focused route with event status, target window, and coordination paths for teams, sponsors, and partners."}
                  </p>
                  <Link
                    href="/events/bbq-contest"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                  >
                    <MaterialIcon icon="arrow_forward" size="sm" />
                    {isEs ? "Abrir pagina" : "Open page"}
                  </Link>
                </article>

                <article className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25 dark:border-white/20 dark:bg-white/6">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Proceso anual" : "Annual Process"}
                  </p>
                  <h3 className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                    {isEs
                      ? "Voluntariado IRONMAN 70.3"
                      : "IRONMAN 70.3 Volunteer Page"}
                  </h3>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
                    {isEs
                      ? "Ruta con estado del evento, fecha confirmada y ruta de registro y participacion para el proceso anual de voluntariado IRONMAN 70.3."
                      : "Route with event status, confirmed date, and registration and participation paths for the yearly IRONMAN 70.3 volunteer process."}
                  </p>
                  <Link
                    href="/events/ironman-volunteer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                  >
                    <MaterialIcon icon="arrow_forward" size="sm" />
                    {isEs ? "Abrir pagina" : "Open page"}
                  </Link>
                </article>
              </div>
            </div>
          </section>

          <section
            id="yearly-hosted-event"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                {isEs ? "Evento anual organizado" : "Annual Hosted Event"}
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Operation: Cast & Recover
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "MH Construction organiza este evento anual para conectar a veteranos con capitanes voluntarios en el rio Columbia. La ruta mantiene estado del evento, calendario confirmado y ruta de registro y participacion para 2026."
                  : "MH Construction hosts this annual event to connect veterans with volunteer captains on the Columbia River. The route maintains event status, confirmed schedule, and registration and participation paths for 2026."}
              </p>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "El programa incluye la presentacion con Challenge Coin, reconocimientos y coordinacion comunitaria con aliados locales."
                  : "The program includes the Challenge Coin presentation, awards, and coordinated community support with local partners."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/events/operation-cast-recover"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                >
                  <MaterialIcon icon="how_to_reg" size="sm" />
                  {isEs
                    ? "Abrir registro del evento"
                    : "Open event registration"}
                </Link>
                <Link
                  href="/events/cool-desert-nights"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-white/30 dark:bg-white/10 dark:text-white"
                >
                  <MaterialIcon icon="archive" size="sm" />
                  {isEs ? "Ver archivo previo" : "View archive event"}
                </Link>
              </div>
            </div>
          </section>

          <section
            id="fishing-event-ribbon"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                {isEs ? "Cinta destacada de evento" : "Featured Event Ribbon"}
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {isEs
                  ? "Operation: Cast & Recover - Evento anual de pesca"
                  : "Operation: Cast & Recover - Annual Fishing Event"}
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "Este bloque destaca el evento anual organizado por MH Construction para conectar a veteranos con capitanes voluntarios en el rio Columbia, con registro activo y coordinacion de aliados comunitarios."
                  : "This block highlights MH Construction's annual hosted fishing event that connects veteran participants with volunteer captains on the Columbia River, with active registration and coordinated community partners."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [
                    isEs ? "Fecha del evento" : "Event Date",
                    isEs ? "26 de septiembre de 2026" : "September 26, 2026",
                  ],
                  [
                    isEs ? "Ubicacion" : "Location",
                    "Columbia Point Marina Park, Richland, WA",
                  ],
                  [
                    isEs ? "Participantes veteranos" : "Veteran Participants",
                    "50 primary slots",
                  ],
                  [
                    isEs ? "Bloque destacado" : "Feature Block",
                    isEs
                      ? "Presentacion con Challenge Coin"
                      : "Challenge Coin Presentation",
                  ],
                ].map(([term, detail]) => (
                  <article
                    key={String(term)}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/20 dark:bg-white/6"
                  >
                    <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                      {term}
                    </p>
                    <p className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                      {detail}
                    </p>
                  </article>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/events/operation-cast-recover"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                >
                  <MaterialIcon icon="how_to_reg" size="sm" />
                  {isEs
                    ? "Abrir registro del evento de pesca"
                    : "Open fishing event registration"}
                </Link>
              </div>
            </div>
          </section>

          <section
            id="event-gallery"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-xl dark:border-white/20 dark:bg-white/5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-white/15 sm:px-6">
                <div>
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    {isEs ? "Medios del evento" : "Event Media"}
                  </p>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                    {isEs
                      ? "Carrusel de fotos del evento"
                      : "Event Photo Carousel"}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-white/30 dark:bg-white/10 dark:text-white"
                    aria-label={
                      isEs
                        ? "Ver la foto anterior del evento"
                        : "View previous event photo"
                    }
                  >
                    <MaterialIcon icon="chevron_left" size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-white/30 dark:bg-white/10 dark:text-white"
                    aria-label={
                      isEs
                        ? "Ver la siguiente foto del evento"
                        : "View next event photo"
                    }
                  >
                    <MaterialIcon icon="chevron_right" size="sm" />
                  </button>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-950 dark:border-white/20">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    width={1400}
                    height={900}
                    className="h-64 w-full object-cover sm:h-80 lg:h-96"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-4 py-3">
                    <p className="text-sm font-semibold text-white">
                      {activeImage.caption}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                  {eventGalleryImages.map((image, index) => {
                    const isActive = index === activeSlide;
                    return (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`relative overflow-hidden rounded-xl border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                          isActive
                            ? "border-brand-secondary ring-2 ring-brand-secondary/45"
                            : "border-gray-200 hover:border-brand-secondary/60 dark:border-white/20"
                        }`}
                        aria-label={
                          isEs
                            ? `Mostrar imagen ${index + 1}: ${image.caption}`
                            : `Show image ${index + 1}: ${image.caption}`
                        }
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={600}
                          height={420}
                          className="h-28 w-full object-cover sm:h-24 lg:h-36"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            id="upcoming-events"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                {isEs ? "Proximos eventos" : "Upcoming Events"}
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {isEs ? "Canal de eventos futuros" : "Future Event Pipeline"}
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "Los nuevos eventos patrocinados y organizados se agregaran aqui como secciones dedicadas una vez aprobados, con calendario claro, detalles de aliados y destacados de participacion."
                  : "New sponsored and hosted events will be added here as dedicated sections once approved, with clear timing, partner details, and participation highlights."}
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {localizedUpcomingEvents.map((event) => (
                  <article
                    key={event.title}
                    className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25 dark:border-white/20 dark:bg-white/6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                        {event.window}
                      </p>
                      <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary dark:text-brand-secondary">
                        {event.status}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-black text-gray-900 dark:text-white">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-700 dark:text-white/80">
                      {event.summary}
                    </p>
                    {event.href && (
                      <Link
                        href={event.href}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                      >
                        <MaterialIcon icon="arrow_forward" size="sm" />
                        {isEs
                          ? "Ver detalles y registrarse"
                          : "View details and register"}
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </StripedBackground>
    </main>
  );
}
