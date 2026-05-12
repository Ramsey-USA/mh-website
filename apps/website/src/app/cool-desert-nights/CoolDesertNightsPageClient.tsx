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
import { OptimizedVideo } from "@/components/ui/media/OptimizedVideo";
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
const mayorOfficeUrl = "https://www.go2kennewick.com/131/Mayor-Council";
const pnwbaUrl = "https://www.pnwba.com/";
const kiwanisUrl = "https://kiwanisrichland.org/";

export function CoolDesertNightsPageClient() {
  const { isMissionComplete } = useSmokeBossCampaignStatus();
  const [eventLogoSrc, setEventLogoSrc] = useState(
    "/images/events/cool-desert-nights/cool-desert-nights-logo.webp",
  );
  const [signageLogoASrc, setSignageLogoASrc] = useState(
    "/images/events/cool-desert-nights/smoke-boss-premium-signage-logo.webp",
  );
  const [signageLogoBSrc, setSignageLogoBSrc] = useState(
    "/images/events/cool-desert-nights/smoke-boss-booth-signage-logo.webp",
  );

  return (
    <>
      <PageTrackingClient pageName="Cool Desert Nights Event" />
      <div className="bg-linear-to-b from-brand-primary/95 via-brand-primary/90 to-brand-primary/85 text-white">
        <section
          id="event-hero"
          className="relative overflow-hidden border-b border-brand-secondary/35"
        >
          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-brand-primary/25 via-transparent to-brand-secondary/20" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-12 sm:px-6 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-40 lg:pb-28">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/90">
                  Events | Field Brief
                </p>
                {isMissionComplete ? (
                  <h1 className="text-balance text-3xl font-black leading-tight sm:text-5xl">
                    Cool Desert Nights 2026: Event Debrief
                  </h1>
                ) : (
                  <h1 className="text-balance text-3xl font-black leading-tight sm:text-5xl">
                    MH Construction at the 32nd Annual Cool Desert Nights
                  </h1>
                )}
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {isMissionComplete
                  ? "Thank you to the Richland and Kennewick community, event leadership, and local partners who made this event successful."
                  : "Join us June 26-27 in Richland, WA for the event weekend, community activities, and a chance to connect with our team in person."}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={chamberScheduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    size="lg"
                    className="touch-manipulation border-brand-secondary bg-brand-secondary/25 text-white hover:bg-brand-secondary hover:text-brand-primary"
                  >
                    <MaterialIcon
                      icon="calendar_month"
                      size="md"
                      className="mr-2"
                    />
                    View Official Schedule
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="touch-manipulation border-brand-secondary/45 bg-brand-primary/35 text-white hover:bg-brand-secondary/20"
                  >
                    <MaterialIcon icon="handshake" size="md" className="mr-2" />
                    Talk With Our Team
                  </Button>
                </Link>
                {!isMissionComplete && (
                  <Link href="#booth-map">
                    <Button
                      variant="outline"
                      size="lg"
                      className="touch-manipulation border-brand-secondary/45 bg-brand-primary/35 text-white hover:bg-brand-secondary/20"
                    >
                      <MaterialIcon icon="map" size="md" className="mr-2" />
                      Visit Our Booth
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-4 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                  Official Event Logo
                </p>
                <Image
                  src={eventLogoSrc}
                  alt="Cool Desert Nights official event logo"
                  width={520}
                  height={320}
                  className="h-36 w-full rounded-lg object-contain"
                  onError={() => setEventLogoSrc("/images/og-default.webp")}
                />
              </div>
              <div className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-4 backdrop-blur-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                  MH Construction
                </p>
                <Image
                  src="/images/logo/mh-logo.webp"
                  alt="MH Construction brand logo"
                  width={520}
                  height={320}
                  className="h-36 w-full rounded-lg bg-brand-primary/40 object-contain p-3"
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

        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Events" }]}
        />

        <section
          id="event-update"
          className="relative overflow-hidden border-b border-brand-secondary/25 bg-brand-primary/35 py-6"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/45 bg-brand-secondary/20 px-4 py-1.5 text-white">
              <MaterialIcon icon="event" size="sm" />
              <span className="flex flex-col leading-tight">
                <span className="font-heading text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  Event Update
                </span>
                <span className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/90">
                  Discover | Field Brief | Cool Desert Nights 2026
                </span>
              </span>
            </div>
          </div>
        </section>

        <section
          id="community-leadership"
          className="mx-auto max-w-7xl px-4 py-12 sm:px-6"
        >
          <div className="rounded-2xl border border-brand-secondary/45 bg-brand-primary/30 p-6 sm:p-8">
            <div className="mb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                Community Leadership
              </p>
              <p className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/80">
                Trust | Command Alignment
              </p>
            </div>
            <p className="text-lg font-semibold text-white sm:text-xl">
              MH Construction Owner Jeremy Thamert will serve as an official BBQ
              judge alongside the Mayor of Kennewick.
            </p>
            <p className="mt-3 text-white/85">
              Local leadership alignment is coordinated with the{" "}
              <Link
                href={mayorOfficeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-secondary underline decoration-brand-secondary/60 underline-offset-4"
              >
                Kennewick Mayor&apos;s Office
              </Link>{" "}
              to support coordinated community participation.
            </p>
          </div>
        </section>

        <section
          id="event-overview"
          className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-3"
        >
          <article className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-6">
            <h2 className="mb-3 text-xl font-black text-brand-secondary">
              Competition Overview
            </h2>
            <p className="text-white/90">
              The Smoke &amp; Shine BBQ Showdown is sanctioned by the{" "}
              <Link
                href={pnwbaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-secondary underline decoration-brand-secondary/60 underline-offset-4"
              >
                PNWBA
              </Link>
              , bringing regional teams together in one official competition.
            </p>
          </article>

          <article className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-6">
            <h2 className="mb-3 text-xl font-black text-brand-secondary">
              MH Construction Presence
            </h2>
            <p className="text-white/90">
              Our event footprint includes a 10 x 10 booth package, sponsor
              signage, and an on-site fleet display designed for direct
              community engagement.
            </p>
          </article>

          <article className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-6">
            <h2 className="mb-3 text-xl font-black text-brand-secondary">
              Local Impact
            </h2>
            <p className="text-white/90">
              MH Construction support extends to the Richland Kiwanis Pancake
              Breakfast,{" "}
              <Link
                href={kiwanisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-secondary underline decoration-brand-secondary/60 underline-offset-4"
              >
                Kiwanis programming
              </Link>
              , and the Party in the Park weekend draw.
            </p>
          </article>
        </section>

        <section
          id="event-media"
          className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="overflow-hidden rounded-2xl border border-brand-secondary/30 bg-brand-primary/30">
            <div className="border-b border-brand-secondary/30 px-5 py-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
                  Event Media
                </p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/85">
                  Visual Brief
                </p>
              </div>
            </div>
            <div className="aspect-video w-full bg-black">
              <OptimizedVideo
                webmSrc="/videos/events/cool-desert-nights/smoke-boss-feature.webm"
                mp4Src="/videos/events/cool-desert-nights/smoke-boss-feature.mp4"
                poster="/images/events/cool-desert-nights/smoke-boss-video-poster.webp"
                controls
                ariaLabel="Cool Desert Nights event feature video"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                Premium Signage Logo A
              </p>
              <Image
                src={signageLogoASrc}
                alt="Smoke Boss premium signage logo"
                width={600}
                height={260}
                className="h-24 w-full rounded-lg object-contain"
                onError={() => setSignageLogoASrc("/images/logo/mh-logo.webp")}
              />
            </div>

            <div className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                Premium Signage Logo B
              </p>
              <Image
                src={signageLogoBSrc}
                alt="Smoke Boss booth signage logo"
                width={600}
                height={260}
                className="h-24 w-full rounded-lg object-contain"
                onError={() => setSignageLogoBSrc("/images/logo/mh-logo.webp")}
              />
            </div>
          </div>
        </section>

        {!isMissionComplete && (
          <section
            id="booth-map"
            className="mx-auto max-w-7xl px-4 py-8 sm:px-6"
          >
            <div className="rounded-2xl border border-brand-secondary/45 bg-brand-primary/30 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-black text-brand-secondary">
                  Digital Booth Map
                </h2>
                <p className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/80">
                  Site Recon
                </p>
              </div>
              <p className="mt-3 max-w-3xl text-white/90">
                Our booth is staged near the BBQ competition lane for direct
                access to event traffic and the fleet showcase.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-brand-secondary/30 bg-brand-primary/45 p-4">
                  <p className="text-sm font-semibold text-white">Booth ID</p>
                  <p className="text-white/85">
                    Smoke &amp; Shine Sponsor Booth - 10 x 10
                  </p>
                </div>
                <div className="rounded-xl border border-brand-secondary/30 bg-brand-primary/45 p-4">
                  <p className="text-sm font-semibold text-white">Landmark</p>
                  <p className="text-white/85">
                    Adjacent to BBQ competition ingress
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          id="event-timeline"
          className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6"
        >
          <div className="rounded-2xl border border-brand-secondary/30 bg-brand-primary/30 p-6">
            <h2 className="text-lg font-black text-white">Event Timeline</h2>
            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/85">
              Proof | After-Action Timeline
            </p>
            <p className="mt-2 text-sm text-white/85">
              Production deployment target: May 20, 2026. Chamber reciprocity
              and partner coordination are tracked through official event
              channels.
            </p>
          </div>
        </section>

        <section
          id="event-action"
          className="mx-auto max-w-7xl px-4 pb-14 sm:px-6"
        >
          <div className="rounded-2xl border border-brand-secondary/45 bg-brand-primary/35 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
              Events Coordination
            </p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-brand-secondary/80">
              Action | Rally Point
            </p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
              Connect With the Team Before the Next Event Window
            </h2>
            <p className="mt-3 max-w-3xl text-white/90">
              For event partnerships, sponsorship coordination, or community
              planning, contact our team directly for relationship-first support
              and clear next steps.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="touch-manipulation border-brand-secondary bg-brand-secondary/25 text-white hover:bg-brand-secondary hover:text-brand-primary"
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
                  variant="outline"
                  size="lg"
                  className="touch-manipulation border-brand-secondary/45 bg-brand-primary/35 text-white hover:bg-brand-secondary/20"
                >
                  <MaterialIcon icon="handshake" size="md" className="mr-2" />
                  Partner Pathways
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <NextStepsSection />
      </div>
    </>
  );
}
