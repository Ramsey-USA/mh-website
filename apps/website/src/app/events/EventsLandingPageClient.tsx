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
  smokeNShinePlacements,
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
              href="#smoke-n-shine"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-brand-secondary-light"
            >
              <MaterialIcon icon="emoji_events" size="sm" />
              {isEs
                ? "Posiciones de Smoke n Shine"
                : "Smoke n Shine Placements"}
            </a>
            <Link
              href="/events/cool-desert-nights"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <MaterialIcon icon="article" size="sm" />
              {isEs ? "Detalle del evento" : "Event Detail"}
            </Link>
            <a
              href="#upcoming-events"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <MaterialIcon icon="event" size="sm" />
              {isEs ? "Proximos eventos" : "Upcoming Events"}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-brand-secondary/70 bg-transparent px-5 py-3 text-sm font-semibold text-brand-secondary transition hover:bg-brand-secondary/12"
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
            id="smoke-n-shine"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                {isEs
                  ? "Archivo de evento destacado"
                  : "Featured Event Archive"}
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {isEs
                  ? "Posiciones del equipo Smoke n Shine"
                  : "Smoke n Shine Team Placements"}
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                {isEs
                  ? "Las posiciones finales se muestran a continuacion para el segmento destacado de Smoke n Shine. Esta seccion muestra de forma intencional solo la posicion de equipos. Las metricas detalladas del evento se archivan en el registro de documentacion de Eventos."
                  : "Final placement standings are listed below for the featured Smoke n Shine segment. This section intentionally displays team placement only. Detailed event metrics are archived in the Events documentation record."}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {smokeNShinePlacements.map((entry) => (
                  <article
                    key={entry.place}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/20 dark:bg-white/6"
                  >
                    <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                      {entry.place}
                    </p>
                    <p className="mt-2 text-lg font-black text-gray-900 dark:text-white">
                      {entry.team}
                    </p>
                  </article>
                ))}
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
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 dark:border-white/30 dark:bg-white/10 dark:text-white"
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
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 dark:border-white/30 dark:bg-white/10 dark:text-white"
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
                        className={`relative overflow-hidden rounded-xl border transition ${
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
                    className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/20 dark:bg-white/6"
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
