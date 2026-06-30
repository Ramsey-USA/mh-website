"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StripedBackground } from "@/components/ui/StripedBackground";

const SMOKE_N_SHINE_PLACEMENTS = [
  { place: "1st Place", team: "Classic Grillin'" },
  { place: "2nd Place", team: "Bish Bosh BBQ" },
  { place: "3rd Place", team: "Pork Daddy's" },
  { place: "4th Place", team: "Hallmarks" },
  { place: "5th Place", team: "Army National Guard" },
  { place: "6th Place", team: "Smokin Fools BBQ" },
] as const;

const EVENT_GALLERY_IMAGES = [
  {
    src: "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
    alt: "Smoke n Shine showdown event graphic",
    caption: "Smoke n Shine Showdown",
  },
  {
    src: "/images/events/cool-desert-nights/cool-desert-nights-2026.webp",
    alt: "Community street event photo",
    caption: "Community Event Highlights",
  },
] as const;

const UPCOMING_EVENTS = [
  {
    title: "Next Sponsored Event",
    window: "To Be Announced",
    status: "Open",
    summary:
      "Reserved for the next MH Construction sponsored community event with finalized date, location, and participation details.",
  },
  {
    title: "Next Hosted Event",
    window: "To Be Announced",
    status: "Open",
    summary:
      "Dedicated section for the next MH-hosted event, including partners, timeline, and field highlights.",
  },
  {
    title: "Community Partnership Spotlight",
    window: "To Be Announced",
    status: "Open",
    summary:
      "Reserved for a featured collaboration with a local organization, trade ally, or community initiative.",
  },
] as const;

export function EventsLandingPageClient() {
  const [activeSlide, setActiveSlide] = useState(0);

  const activeImage = useMemo(
    () => EVENT_GALLERY_IMAGES[activeSlide] ?? EVENT_GALLERY_IMAGES[0],
    [activeSlide],
  );

  const goPrev = () => {
    setActiveSlide((prev) =>
      prev === 0 ? EVENT_GALLERY_IMAGES.length - 1 : prev - 1,
    );
  };

  const goNext = () => {
    setActiveSlide((prev) =>
      prev === EVENT_GALLERY_IMAGES.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <main className="min-h-screen text-white">
      <section className="relative overflow-hidden border-b border-brand-secondary/35">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/25 via-gray-900/60 to-gray-900/80" />
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary/90">
            Sponsored and Hosted Events
          </p>
          <h1 className="mt-3 max-w-4xl text-balance text-3xl font-black leading-tight sm:text-5xl">
            MH Construction Community Events Hub
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
            This is the central landing page for MH Construction sponsored and
            hosted events. We keep completed-event records visible, highlight
            participating teams, and publish upcoming opportunities for clients,
            partners, and the Tri-Cities community.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#smoke-n-shine"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-gray-900 transition hover:bg-brand-secondary-light"
            >
              <MaterialIcon icon="emoji_events" size="sm" />
              Smoke n Shine Placements
            </a>
            <a
              href="#upcoming-events"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              <MaterialIcon icon="event" size="sm" />
              Upcoming Events
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-brand-secondary/70 bg-transparent px-5 py-3 text-sm font-semibold text-brand-secondary transition hover:bg-brand-secondary/12"
            >
              <MaterialIcon icon="groups" size="sm" />
              Partner With MH
            </Link>
          </div>
        </div>
      </section>

      <StripedBackground>
        <div className="relative z-10 pb-20">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Events" }]}
            className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8"
          />

          <section
            id="smoke-n-shine"
            className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                Featured Event Archive
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Smoke n Shine Team Placements
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                Final placement standings are listed below for the featured
                Smoke n Shine segment. This section intentionally displays team
                placement only. Detailed event metrics are archived in the
                Events documentation record.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SMOKE_N_SHINE_PLACEMENTS.map((entry) => (
                  <article
                    key={entry.place}
                    className="rounded-xl border border-gray-200 bg-white p-4 dark:border-white/20 dark:bg-white/6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
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
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    Event Media
                  </p>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                    Event Photo Carousel
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 dark:border-white/30 dark:bg-white/10 dark:text-white"
                    aria-label="View previous event photo"
                  >
                    <MaterialIcon icon="chevron_left" size="sm" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-800 transition hover:bg-gray-50 dark:border-white/30 dark:bg-white/10 dark:text-white"
                    aria-label="View next event photo"
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
                  {EVENT_GALLERY_IMAGES.map((image, index) => {
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
                        aria-label={`Show image ${index + 1}: ${image.caption}`}
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
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                Upcoming Events
              </p>
              <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                Future Event Pipeline
              </h2>
              <p className="mt-3 max-w-3xl text-sm text-gray-700 dark:text-white/80 sm:text-base">
                New sponsored and hosted events will be added here as dedicated
                sections once approved, with clear timing, partner details, and
                participation highlights.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {UPCOMING_EVENTS.map((event) => (
                  <article
                    key={event.title}
                    className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/20 dark:bg-white/6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
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
