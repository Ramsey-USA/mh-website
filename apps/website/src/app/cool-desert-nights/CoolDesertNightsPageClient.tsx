"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { Button } from "@/components/ui";
import { StripedBackground } from "@/components/ui/StripedBackground";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useSmokeBossCampaignStatus } from "@/hooks";

const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

const chamberScheduleUrl =
  "https://www.richlandchamber.org/cool-desert-nights/";
const eventbriteUrl =
  "https://www.eventbrite.com/e/2026-cool-desert-nights-tickets-1984588946964";
const mayorOfficeUrl = "https://www.ci.richland.wa.us/government/city-council";
const kiwanisUrl = "https://kiwanisrichland.org/";
const panelClass =
  "rounded-2xl border border-gray-200 bg-white/92 shadow-xl backdrop-blur-sm dark:border-white/20 dark:bg-white/5 dark:shadow-2xl";
const subPanelClass =
  "rounded-xl border border-gray-200 bg-white/88 backdrop-blur-sm dark:border-white/15 dark:bg-white/8";
const inlineLinkClass =
  "font-semibold text-brand-primary underline decoration-brand-primary/45 underline-offset-4 transition-colors hover:text-brand-primary-dark dark:text-brand-secondary dark:decoration-brand-secondary/60 dark:hover:text-brand-secondary-light";

export function CoolDesertNightsPageClient() {
  const { isMissionComplete } = useSmokeBossCampaignStatus();
  const [eventLogoSrc, setEventLogoSrc] = useState(
    "/images/events/cool-desert-nights/cool-desert-nights-logo1.webp",
  );

  return (
    <>
      <PageTrackingClient pageName="Cool Desert Nights Event" />
      <div className="relative overflow-hidden text-white">
        {/* Hero Section (no stripes) */}
        <section
          id="event-hero"
          className="relative overflow-hidden border-b border-brand-secondary/35"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 pt-32 pb-28 sm:px-6 sm:pt-36 sm:pb-32 md:pt-40 md:pb-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-44 lg:pb-40">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/90">
                  Base HQ - Events | Field Brief
                </p>
                {isMissionComplete ? (
                  <h1 className="text-balance text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Base HQ - Events: Cool Desert Nights 2026 Debrief
                  </h1>
                ) : (
                  <h1 className="text-balance text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    Base HQ - Events: Cool Desert Nights 2026 Briefing
                  </h1>
                )}
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {isMissionComplete
                  ? "Thank you to the Richland and Kennewick community, event leadership, and Client Partners who made this event successful through coordinated execution."
                  : "Cool Desert Nights 2026 is scheduled for June 26-27 in Richland, WA, featuring classic cars, a Friday night cruise, and a Saturday Show 'n Shine in the Uptown Shopping Center."}
              </p>

              <div className="grid gap-3 text-sm text-white/90 sm:grid-cols-3">
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    Event Window
                  </p>
                  <p className="mt-1 font-semibold">June 26-27, 2026</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    Location
                  </p>
                  <p className="mt-1 font-semibold">Uptown Shopping Center</p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    Signature Events
                  </p>
                  <p className="mt-1 font-semibold">
                    Cruise + Show &#39;n Shine
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={chamberScheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="touch-manipulation"
                  >
                    <MaterialIcon
                      icon="calendar_month"
                      size="md"
                      className="mr-2"
                    />
                    Chamber Schedule + Registration
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="touch-manipulation"
                  >
                    <MaterialIcon icon="handshake" size="md" className="mr-2" />
                    Talk With Our Team
                  </Button>
                </Link>
                {!isMissionComplete && (
                  <Link href="#booth-map">
                    <Button
                      variant="primary"
                      size="lg"
                      className="touch-manipulation"
                    >
                      <MaterialIcon icon="map" size="md" className="mr-2" />
                      Visit Our Booth
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/95">
                  Official Event Logo
                </p>
                <Image
                  src={eventLogoSrc}
                  alt="Cool Desert Nights official event logo"
                  width={520}
                  height={320}
                  className="h-36 w-full object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)] sm:h-44 lg:h-48"
                  onError={() => setEventLogoSrc("/images/og-default.webp")}
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/95">
                  MH Construction
                </p>
                <Image
                  src="/images/logo/mh-logo.webp"
                  alt="MH Construction brand logo"
                  width={520}
                  height={320}
                  className="h-36 w-full object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)] sm:h-44 lg:h-48"
                  priority
                />
              </div>
            </div>
          </div>
          <PageNavigation
            items={navigationConfigs.coolDesertNights}
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Main Content Sections with Stripes */}
        <StripedBackground className="bg-white dark:bg-gray-900">
          <div className="relative z-10">
            <Breadcrumb
              items={[{ label: "Home", href: "/" }, { label: "Events" }]}
            />

            <section
              id="community-leadership"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <div className="mb-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    Community Leadership
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                    Trust | Command Alignment
                  </p>
                </div>
                <p className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  MH Construction Owner Jeremy Thamert will serve as an official
                  BBQ judge alongside Richland Mayor Theresa Richardson.
                </p>
                <p className="mt-3 text-gray-700 dark:text-white/85">
                  Local leadership alignment is coordinated with the{" "}
                  <Link
                    href={mayorOfficeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    Richland Mayor&apos;s Office
                  </Link>{" "}
                  and event leadership to support coordinated community
                  participation and clear communication.
                </p>
              </div>
            </section>

            <section
              id="mh-values"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6`}>
                <h2 className="text-xl font-black text-brand-secondary">
                  Service-Earned Values In Action
                </h2>
                <p className="mt-2 max-w-3xl text-gray-700 dark:text-white/85">
                  Event coordination follows the same operating standard as
                  every MH Construction project: Honesty, Integrity,
                  Professionalism, and Thoroughness.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Honesty
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      Clear event expectations and scope.
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Integrity
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      Commitments delivered as promised.
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Professionalism
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      Coordinated leadership and partner communication.
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      Thoroughness
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      Details managed from schedule through close-out.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="event-overview"
              className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-3"
            >
              <article className={`${panelClass} p-6`}>
                <h2 className="mb-3 text-xl font-black text-brand-secondary">
                  Competition Overview
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  Cool Desert Nights is a premier Tri-Cities summer event with
                  classic cars, a Friday night cruise on George Washington Way,
                  and a Saturday Show &#39;n Shine hosted in Richland&apos;s
                  Uptown Shopping Center.
                </p>
              </article>

              <article className={`${panelClass} p-6`}>
                <h2 className="mb-3 text-xl font-black text-brand-secondary">
                  MH Construction Presence
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  Saturday Show &#39;n Shine includes hundreds of cars on
                  display, plus family-friendly activities with a kids&#39;
                  zone, vendor booths, and community access points throughout
                  the venue.
                </p>
              </article>

              <article className={`${panelClass} p-6`}>
                <h2 className="mb-3 text-xl font-black text-brand-secondary">
                  Local Impact
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  Weekend programming includes Party in the Park, live music,
                  food vendors, and a Saturday awards ceremony. MH Construction
                  support extends to the Richland Kiwanis Pancake Breakfast,{" "}
                  <Link
                    href={kiwanisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    Kiwanis programming
                  </Link>
                  , and the Party in the Park weekend draw.
                </p>
              </article>
            </section>

            <section
              id="event-media"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} overflow-hidden`}>
                <div className="border-b border-brand-secondary/30 px-5 py-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-600 dark:text-white/80">
                      Event Media
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                      Visual Brief
                    </p>
                  </div>
                </div>
                <div className="aspect-video w-full bg-black">
                  <Image
                    src="/images/events/cool-desert-nights/Smoke%20n%20Shine%20Showdown%20Graphic.webp"
                    alt="Official Smoke n Shine Showdown BBQ contest graphic"
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </section>

            <section
              id="event-identity"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/95">
                  2026 Event Identity
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  Official Cool Desert Nights 2026 Graphic
                </h2>
                <div className="mt-5">
                  <Image
                    src="/images/events/cool-desert-nights/cool-desert-nights-2026.webp"
                    alt="Official Cool Desert Nights 2026 event graphic"
                    width={1200}
                    height={720}
                    className="h-auto w-full object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)]"
                  />
                </div>
              </div>
            </section>

            {!isMissionComplete && (
              <section
                id="booth-map"
                className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
              >
                <div className={`${panelClass} p-6 sm:p-8`}>
                  <div>
                    <h2 className="text-2xl font-black text-brand-secondary">
                      Digital Booth Map
                    </h2>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                      Site Recon
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                    Our booth is staged near the BBQ competition lane for direct
                    access to event traffic and the fleet showcase.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className={`${subPanelClass} p-4`}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Booth ID
                      </p>
                      <p className="text-gray-700 dark:text-white/85">
                        Smoke &amp; Shine Sponsor Booth - 10 x 10
                      </p>
                    </div>
                    <div className={`${subPanelClass} p-4`}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        Landmark
                      </p>
                      <p className="text-gray-700 dark:text-white/85">
                        Adjacent to BBQ competition ingress
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section
              id="event-timeline"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6`}>
                <h2 className="text-2xl font-black text-brand-secondary">
                  Event Timeline
                </h2>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                  Proof | After-Action Timeline
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-white/85">
                  <p>
                    Friday Cruise: Classic cars cruise along George Washington
                    Way.
                  </p>
                  <p>Party in the Park: Live music and community activities.</p>
                  <p>
                    Saturday Show &#39;n Shine: Vehicle displays, kids&#39;
                    zone, vendors, and awards ceremony.
                  </p>
                </div>
              </div>
            </section>

            <section
              id="event-action"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                  Events Coordination
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                  Action | Rally Point
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  Connect With the Team Before the Next Event Window
                </h2>
                <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                  Early online registration for cars, trucks, and motorcycles is
                  available through the Richland Chamber. Vendor applications
                  for 2026 are also being accepted through the chamber, and full
                  listing details are available on Eventbrite.
                </p>
                <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                  Start with the{" "}
                  <Link
                    href={chamberScheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    Richland Chamber of Commerce event page
                  </Link>{" "}
                  and view Eventbrite details below.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="lg"
                      className="touch-manipulation"
                    >
                      <MaterialIcon
                        icon="contact_phone"
                        size="md"
                        className="mr-2"
                      />
                      Coordinate With MH
                    </Button>
                  </Link>
                  <Link href="/allies">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="touch-manipulation"
                    >
                      <MaterialIcon
                        icon="handshake"
                        size="md"
                        className="mr-2"
                      />
                      Partner Pathways
                    </Button>
                  </Link>
                  <Link
                    href={eventbriteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="secondary"
                      size="lg"
                      className="touch-manipulation"
                    >
                      <MaterialIcon
                        icon="confirmation_number"
                        size="md"
                        className="mr-2"
                      />
                      View Eventbrite Details
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
            <NextStepsSection />
          </div>
        </StripedBackground>
      </div>
    </>
  );
}
