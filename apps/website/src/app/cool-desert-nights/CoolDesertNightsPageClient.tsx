"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { Button } from "@/components/ui";
import { StripedBackground } from "@/components/ui/StripedBackground";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useSmokeBossCampaignStatus } from "@/hooks";
import { EventWizard } from "./EventWizard";

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
  const t = useTranslations("coolDesertNightsPage");

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
                  {t("hero.kicker")}
                </p>
                {isMissionComplete ? (
                  <h1 className="text-balance text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    {t("hero.titleComplete")}
                  </h1>
                ) : (
                  <h1 className="text-balance text-2xl font-black leading-tight sm:text-4xl lg:text-5xl">
                    {t("hero.titleBriefing")}
                  </h1>
                )}
              </div>
              <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {isMissionComplete
                  ? t("hero.descriptionComplete")
                  : t("hero.descriptionBriefing")}
              </p>

              <div className="grid gap-3 text-sm text-white/90 sm:grid-cols-3">
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    {t("hero.stats.eventWindow.label")}
                  </p>
                  <p className="mt-1 font-semibold">
                    {t("hero.stats.eventWindow.value")}
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    {t("hero.stats.location.label")}
                  </p>
                  <p className="mt-1 font-semibold">
                    {t("hero.stats.location.value")}
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/8 px-4 py-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                    {t("hero.stats.signatureEvents.label")}
                  </p>
                  <p className="mt-1 font-semibold">
                    {t("hero.stats.signatureEvents.value")}
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
                    {t("hero.cta.schedule")}
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    className="touch-manipulation"
                  >
                    <MaterialIcon icon="handshake" size="md" className="mr-2" />
                    {t("hero.cta.team")}
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
                      {t("hero.cta.booth")}
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/95">
                  {t("hero.logo.eventLabel")}
                </p>
                <Image
                  src={eventLogoSrc}
                  alt={t("hero.logo.eventAlt")}
                  width={520}
                  height={320}
                  className="h-36 w-full object-contain drop-shadow-[0_14px_34px_rgba(0,0,0,0.55)] sm:h-44 lg:h-48"
                  onError={() => setEventLogoSrc("/images/og-default.webp")}
                />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary/95">
                  {t("hero.logo.companyLabel")}
                </p>
                <Image
                  src="/images/logo/mh-logo.webp"
                  alt={t("hero.logo.companyAlt")}
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
            showRemainingPagesOverlay
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

        {/* Main Content Sections with Stripes */}
        <StripedBackground>
          <div className="relative z-10">
            <Breadcrumb
              items={[
                { label: t("breadcrumb.home"), href: "/" },
                { label: t("breadcrumb.current") },
              ]}
            />

            <section
              id="community-leadership"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <div className="mb-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    {t("communityLeadership.kicker")}
                  </p>
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                    {t("communityLeadership.overline")}
                  </p>
                </div>
                <p className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  {t("communityLeadership.title")}
                </p>
                <p className="mt-3 text-gray-700 dark:text-white/85">
                  {t("communityLeadership.descriptionPrefix")}{" "}
                  <Link
                    href={mayorOfficeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    {t("communityLeadership.linkLabel")}
                  </Link>{" "}
                  {t("communityLeadership.descriptionSuffix")}
                </p>
              </div>
            </section>

            <section
              id="mh-values"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6`}>
                <h2 className="text-xl font-black text-brand-secondary">
                  {t("values.title")}
                </h2>
                <p className="mt-2 max-w-3xl text-gray-700 dark:text-white/85">
                  {t("values.description")}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {t("values.cards.honesty.title")}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      {t("values.cards.honesty.description")}
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {t("values.cards.integrity.title")}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      {t("values.cards.integrity.description")}
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {t("values.cards.professionalism.title")}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      {t("values.cards.professionalism.description")}
                    </p>
                  </div>
                  <div className={`${subPanelClass} p-4`}>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {t("values.cards.thoroughness.title")}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-white/80">
                      {t("values.cards.thoroughness.description")}
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
                  {t("overview.competition.title")}
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  {t("overview.competition.description")}
                </p>
              </article>

              <article className={`${panelClass} p-6`}>
                <h2 className="mb-3 text-xl font-black text-brand-secondary">
                  {t("overview.presence.title")}
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  {t("overview.presence.description")}
                </p>
              </article>

              <article className={`${panelClass} p-6`}>
                <h2 className="mb-3 text-xl font-black text-brand-secondary">
                  {t("overview.localImpact.title")}
                </h2>
                <p className="text-gray-700 dark:text-white/90">
                  {t("overview.localImpact.descriptionPrefix")}{" "}
                  <Link
                    href={kiwanisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    {t("overview.localImpact.linkLabel")}
                  </Link>
                  {t("overview.localImpact.descriptionSuffix")}
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
                      {t("eventMedia.title")}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                      {t("eventMedia.subtitle")}
                    </p>
                  </div>
                </div>
                <div className="aspect-video w-full bg-black">
                  <Image
                    src="/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp"
                    alt={t("eventMedia.imageAlt")}
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
                  {t("eventIdentity.kicker")}
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  {t("eventIdentity.title")}
                </h2>
                <div className="mt-5">
                  <Image
                    src="/images/events/cool-desert-nights/cool-desert-nights-2026.webp"
                    alt={t("eventIdentity.imageAlt")}
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
                      {t("boothMap.title")}
                    </h2>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                      {t("boothMap.subtitle")}
                    </p>
                  </div>
                  <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                    {t("boothMap.description")}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className={`${subPanelClass} p-4`}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t("boothMap.cards.boothId.title")}
                      </p>
                      <p className="text-gray-700 dark:text-white/85">
                        {t("boothMap.cards.boothId.value")}
                      </p>
                    </div>
                    <div className={`${subPanelClass} p-4`}>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t("boothMap.cards.landmark.title")}
                      </p>
                      <p className="text-gray-700 dark:text-white/85">
                        {t("boothMap.cards.landmark.value")}
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
                  {t("timeline.title")}
                </h2>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/85">
                  {t("timeline.subtitle")}
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-white/85">
                  <p>{t("timeline.items.fridayCruise")}</p>
                  <p>{t("timeline.items.partyInPark")}</p>
                  <p>{t("timeline.items.saturdayShow")}</p>
                </div>
              </div>
            </section>

            <section
              id="event-action"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                  {t("action.kicker")}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-brand-secondary/80">
                  {t("action.overline")}
                </p>
                <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  {t("action.title")}
                </h2>
                <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                  {t("action.description1")}
                </p>
                <p className="mt-3 max-w-3xl text-gray-700 dark:text-white/90">
                  {t("action.description2Prefix")}{" "}
                  <Link
                    href={chamberScheduleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLinkClass}
                  >
                    {t("action.description2Link")}
                  </Link>{" "}
                  {t("action.description2Suffix")}
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
                      {t("action.cta.coordinate")}
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
                      {t("action.cta.pathways")}
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
                      {t("action.cta.eventbrite")}
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
            {/* ── Booth Entry Wizard ─────────────────────────────────── */}
            <section
              id="booth-entry"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16"
            >
              <div className={`${panelClass} p-6 sm:p-8`}>
                <div className="mb-6">
                  <p className="text-xs font-black uppercase tracking-widest text-brand-secondary">
                    Booth Entry
                  </p>
                  <h2 className="mt-1 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                    Sign In, Guess &amp; Vote
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-gray-600 dark:text-white/70">
                    Three quick steps — claim your swag, enter the Hilti
                    fastener challenge, and cast your People's Choice BBQ vote.
                  </p>
                </div>
                <EventWizard />
              </div>
            </section>

            <NextStepsSection />
          </div>
        </StripedBackground>
      </div>
    </>
  );
}

export default CoolDesertNightsPageClient;
