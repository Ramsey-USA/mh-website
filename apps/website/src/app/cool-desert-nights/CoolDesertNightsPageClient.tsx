"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";
import { OptimizedVideo } from "@/components/ui/media/OptimizedVideo";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useSmokeBossCampaignStatus } from "@/hooks";

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
    <div className="bg-linear-to-b from-zinc-950 via-zinc-900 to-gray-950 text-white">
      <section className="relative overflow-hidden border-b border-amber-400/25">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.24),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(245,158,11,0.22),transparent_40%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-200">
              <MaterialIcon icon="event" size="sm" />
              Cool Desert Nights 2026
            </p>
            {isMissionComplete ? (
              <h1 className="text-balance text-3xl font-black leading-tight sm:text-5xl">
                Mission Complete: Smoke &amp; Shine 2026 Debrief
              </h1>
            ) : (
              <h1 className="text-balance text-3xl font-black leading-tight sm:text-5xl">
                MHC Presents: The Smoke &amp; Shine BBQ Showdown at the 32nd
                Annual Cool Desert Nights.
              </h1>
            )}
            <p className="max-w-3xl text-base leading-relaxed text-zinc-200 sm:text-lg">
              {isMissionComplete
                ? "Thank you to the Richland and Kennewick community, event leadership, and every team that made the inaugural Smoke & Shine BBQ Showdown a high-impact success."
                : "Join us June 26-27 in Richland, WA, to see our fleet and experience the inaugural BBQ competition."}
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
                  className="border-amber-400 bg-amber-400/20 text-amber-100 hover:bg-amber-400 hover:text-gray-950"
                >
                  <MaterialIcon
                    icon="calendar_month"
                    size="md"
                    className="mr-2"
                  />
                  View Event Schedule
                </Button>
              </Link>
              {!isMissionComplete && (
                <a href="#booth-map">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-zinc-300/40 bg-zinc-800/40 text-zinc-100 hover:bg-zinc-700/60"
                  >
                    <MaterialIcon icon="map" size="md" className="mr-2" />
                    Visit Our Booth
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900/85 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
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
            <div className="rounded-2xl border border-zinc-700/80 bg-zinc-900/85 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                MHC Brand Presence
              </p>
              <Image
                src="/images/logo/mh-logo.webp"
                alt="MHC brand logo"
                width={520}
                height={320}
                className="h-36 w-full rounded-lg bg-zinc-950 object-contain p-3"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-amber-400/30 bg-zinc-900/80 p-6 sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
            Judge&apos;s Table Spotlight
          </p>
          <p className="text-lg font-semibold text-zinc-100 sm:text-xl">
            MHC Owner Jeremy Thamert will serve as an official BBQ judge
            alongside the Mayor of Kennewick.
          </p>
          <p className="mt-3 text-zinc-300">
            Local leadership alignment is coordinated with the{" "}
            <Link
              href={mayorOfficeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-300 underline decoration-amber-400/60 underline-offset-4"
            >
              Kennewick Mayor&apos;s Office
            </Link>{" "}
            to ground event impact in city-level collaboration.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6">
          <h2 className="mb-3 text-xl font-black text-amber-200">
            The Competition
          </h2>
          <p className="text-zinc-200">
            The inaugural Smoke &amp; Shine BBQ Showdown is sanctioned by the{" "}
            <Link
              href={pnwbaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-300 underline decoration-amber-500/60 underline-offset-4"
            >
              PNWBA
            </Link>
            , bringing the region&apos;s strongest pit teams into one
            mission-ready bracket.
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6">
          <h2 className="mb-3 text-xl font-black text-amber-200">
            MHC Mission
          </h2>
          <p className="text-zinc-200">
            The Smoke Boss footprint includes a 10 x 10 premium booth package,
            direct sponsor signage, and an on-site MHC fleet display positioned
            for high-visibility engagement.
          </p>
        </article>

        <article className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-6">
          <h2 className="mb-3 text-xl font-black text-amber-200">
            Local Impact
          </h2>
          <p className="text-zinc-200">
            MHC support extends to the Richland Kiwanis Pancake Breakfast,{" "}
            <Link
              href={kiwanisUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-300 underline decoration-amber-500/60 underline-offset-4"
            >
              Kiwanis programming
            </Link>
            , and the Party in the Park weekend draw.
          </p>
        </article>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900/75">
          <div className="border-b border-zinc-700 px-5 py-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-300">
              Smoke Boss Content Video
            </h3>
          </div>
          <div className="aspect-video w-full bg-black">
            <OptimizedVideo
              webmSrc="/videos/events/cool-desert-nights/smoke-boss-feature.webm"
              mp4Src="/videos/events/cool-desert-nights/smoke-boss-feature.mp4"
              poster="/images/events/cool-desert-nights/smoke-boss-video-poster.webp"
              controls
              ariaLabel="Smoke Boss package event briefing video"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/75 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
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

          <div className="rounded-2xl border border-zinc-700 bg-zinc-900/75 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
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
        <section id="booth-map" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="rounded-2xl border border-amber-400/35 bg-zinc-900/80 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-amber-200">
              Digital Booth Map: Smoke Boss Zone
            </h2>
            <p className="mt-3 max-w-3xl text-zinc-200">
              The Smoke Boss booth is staged near the BBQ competition lane for
              direct access to judging flow, crowd traffic, and fleet showcase
              viewing.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-700 bg-zinc-950/80 p-4">
                <p className="text-sm font-semibold text-zinc-100">Booth ID</p>
                <p className="text-zinc-300">
                  Smoke Boss Command Post - 10 x 10
                </p>
              </div>
              <div className="rounded-xl border border-zinc-700 bg-zinc-950/80 p-4">
                <p className="text-sm font-semibold text-zinc-100">Landmark</p>
                <p className="text-zinc-300">
                  Adjacent to BBQ competition ingress
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900/75 p-6">
          <h2 className="text-lg font-black text-zinc-100">Command Timeline</h2>
          <p className="mt-2 text-sm text-zinc-300">
            Production deployment target: May 20, 2026. Chamber reciprocity and
            partner coordination are tracked through official event channels.
          </p>
        </div>
      </section>
    </div>
  );
}
