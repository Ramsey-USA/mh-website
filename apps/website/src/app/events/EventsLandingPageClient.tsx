"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StripedBackground } from "@/components/ui/StripedBackground";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { NextStepsSection } from "@/components/shared-sections";
import { EventsHero } from "@/components/events/EventsHero";
import { TestimonialsSection } from "@/app/projects/components/TestimonialsSection";
import {
  eventGalleryImages,
  getLocalizedEventTestimonials,
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
  type EventCardWithHref = {
    id: string;
    title: string;
    window: string;
    status: string;
    summary: string;
    href: string;
  };
  const localizedUpcomingEvents = useMemo(
    () => getLocalizedUpcomingEvents(locale),
    [locale],
  );

  const featuredEventTestimonials = useMemo(
    () => getLocalizedEventTestimonials(locale),
    [locale],
  );

  const communityServiceEvents = useMemo((): EventCardWithHref[] => {
    const upcomingWithHref = localizedUpcomingEvents.filter(
      (
        event,
      ): event is (typeof localizedUpcomingEvents)[number] & {
        href: string;
      } => typeof event.href === "string" && event.href.length > 0,
    );

    return [
      {
        id: "cool-desert-nights-archive",
        title: isEs ? "Cool Desert Nights 2026" : "Cool Desert Nights 2026",
        window: isEs ? "Junio 2026" : "June 2026",
        status: isEs ? "Archivado" : "Archived",
        summary: isEs
          ? "Ruta de archivo con resultados finales, material del evento y notas de continuidad para futuras alianzas comunitarias."
          : "Archive route with finalized results, event media, and continuity notes for future community partnerships.",
        href: "/events/cool-desert-nights",
      },
      ...upcomingWithHref,
    ];
  }, [isEs, localizedUpcomingEvents]);

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

          <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8">
            <JeremyAuthorityLinksStrip isEs={isEs} />
          </div>

          <section
            id="community-service"
            aria-labelledby="community-service-heading"
            className="bg-white py-10 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20"
          >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center lg:mb-16">
                <div className="mb-6 flex items-center justify-center">
                  <MaterialIcon
                    icon="volunteer_activism"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h2
                  id="community-service-heading"
                  className="overflow-visible text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-gray-100 xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
                >
                  <span className="mb-2 block overflow-visible py-1 text-xl font-semibold tracking-tight text-gray-700 dark:text-gray-200 xs:text-2xl sm:mb-3 sm:text-3xl md:text-3xl lg:text-4xl">
                    {isEs ? "Servicio comunitario" : "Community Service"}
                  </span>
                  <span className="block overflow-visible bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text py-1 pb-2 font-black leading-tight text-transparent drop-shadow-sm">
                    {isEs ? "Historias" : "Stories"}
                  </span>
                </h2>
                <p
                  className="font-body mx-auto mt-5 max-w-3xl px-2 text-base font-light leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-xl"
                  aria-live="polite"
                >
                  {communityServiceEvents.length}{" "}
                  {isEs
                    ? "eventos activos y archivados con rutas dedicadas"
                    : "active and archived events with dedicated routes"}
                </p>
              </div>

              <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
                {communityServiceEvents.map((event) => (
                  <article
                    key={event.id}
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
                    <Link
                      href={event.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                    >
                      <MaterialIcon icon="arrow_forward" size="sm" />
                      {isEs ? "Abrir pagina" : "Open page"}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section
            id="event-gallery"
            aria-labelledby="event-gallery-heading"
            className="bg-white py-10 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20"
          >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center lg:mb-16">
                <div className="mb-6 flex items-center justify-center">
                  <MaterialIcon
                    icon="photo_library"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h2
                  id="event-gallery-heading"
                  className="overflow-visible text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-gray-100 xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
                >
                  <span className="mb-2 block overflow-visible py-1 text-xl font-semibold tracking-tight text-gray-700 dark:text-gray-200 xs:text-2xl sm:mb-3 sm:text-3xl md:text-3xl lg:text-4xl">
                    {isEs ? "Medios del evento" : "Event Media"}
                  </span>
                  <span className="block overflow-visible bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text py-1 pb-2 font-black leading-tight text-transparent drop-shadow-sm">
                    {isEs ? "Galeria" : "Gallery"}
                  </span>
                </h2>
                <p className="font-body mx-auto mt-5 max-w-3xl px-2 text-base font-light leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-xl">
                  {isEs
                    ? "Fotos destacadas de eventos comunitarios patrocinados y organizados por MH Construction."
                    : "Featured photo coverage from MH Construction sponsored and hosted community events."}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-xl dark:border-white/20 dark:bg-white/5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-5 py-4 dark:border-white/15 sm:px-6">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    {isEs ? "Carrusel" : "Carousel"}
                  </p>
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
            </div>
          </section>

          <section
            id="upcoming-events"
            aria-labelledby="upcoming-events-heading"
            className="bg-white py-10 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20"
          >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 text-center lg:mb-16">
                <div className="mb-6 flex items-center justify-center">
                  <MaterialIcon
                    icon="event"
                    size="xl"
                    className="text-brand-primary"
                  />
                </div>
                <h2
                  id="upcoming-events-heading"
                  className="overflow-visible text-3xl font-black leading-tight tracking-tighter text-gray-900 dark:text-gray-100 xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl"
                >
                  <span className="mb-2 block overflow-visible py-1 text-xl font-semibold tracking-tight text-gray-700 dark:text-gray-200 xs:text-2xl sm:mb-3 sm:text-3xl md:text-3xl lg:text-4xl">
                    {isEs ? "Proximos eventos" : "Upcoming Events"}
                  </span>
                  <span className="block overflow-visible bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text py-1 pb-2 font-black leading-tight text-transparent drop-shadow-sm">
                    {isEs ? "Pipeline" : "Pipeline"}
                  </span>
                </h2>
                <p className="font-body mx-auto mt-5 max-w-3xl px-2 text-base font-light leading-relaxed tracking-wide text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-xl">
                  {isEs
                    ? "Los nuevos eventos patrocinados y organizados se agregaran aqui como secciones dedicadas una vez aprobados, con calendario claro, detalles de aliados y destacados de participacion."
                    : "New sponsored and hosted events will be added here as dedicated sections once approved, with clear timing, partner details, and participation highlights."}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                  {isEs ? "Canal de eventos futuros" : "Future Event Pipeline"}
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
            </div>
          </section>

          <TestimonialsSection
            testimonials={featuredEventTestimonials}
            subtitle={isEs ? "Comunidad y aliados" : "Community Partners"}
            title={isEs ? "Testimonios" : "Testimonials"}
            description={
              isEs
                ? "Testimonios de la Camara de Comercio de Richland, aliados de eventos y equipos de voluntariado con los que trabajamos durante todo el ano."
                : "Testimonials from the Richland Chamber of Commerce, event partners, and volunteer teams we work with throughout the year."
            }
            clientPartnerLabel={
              isEs ? "Aliado comunitario" : "Community Partner"
            }
            starRatingAriaSuffix={
              isEs ? "calificacion de estrellas" : "star rating"
            }
          />

          <NextStepsSection locale={locale} />
        </div>
      </StripedBackground>
    </main>
  );
}
