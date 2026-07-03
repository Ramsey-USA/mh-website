"use client";

/**
 * Strategic CTA Banner
 * Compact, attention-grabbing banner to drive key actions
 * Displays after important homepage sections
 */

import { useCallback } from "react";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import Link from "next/link";
import { useAnalytics } from "@/components/analytics/EnhancedAnalytics";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";

/** Contact page URL pre-filled with pitch deck request subject */
const PITCH_DECK_HREF = "/contact?subject=pitch-deck";

interface StrategicCTABannerProps {
  variant?: "pwa" | "pitch-deck" | "consultation" | "combo";
  className?: string;
}

export function StrategicCTABanner(props: Readonly<StrategicCTABannerProps>) {
  const { variant = "combo", className = "" } = props;
  const { trackEvent } = useAnalytics();

  const trackPwaInstall = useCallback(
    () => trackEvent("cta_banner_click", { type: "pwa_install" }),
    [trackEvent],
  );
  const trackPitchDeck = useCallback(
    () => trackEvent("cta_banner_click", { type: "pitch_deck" }),
    [trackEvent],
  );
  const trackConsultation = useCallback(
    () => trackEvent("cta_banner_click", { type: "consultation" }),
    [trackEvent],
  );
  const trackComboPwa = useCallback(
    () => trackEvent("cta_combo_click", { type: "pwa_install" }),
    [trackEvent],
  );
  const trackComboPitchDeck = useCallback(
    () => trackEvent("cta_combo_click", { type: "pitch_deck" }),
    [trackEvent],
  );
  const trackComboConsultation = useCallback(
    () => trackEvent("cta_combo_click", { type: "consultation" }),
    [trackEvent],
  );

  if (variant === "pwa") {
    return (
      <aside
        className={`bg-brand-primary py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="pwa-cta-heading"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:block bg-white/20 backdrop-blur-sm p-4 rounded-xl"
              aria-hidden="true"
            >
              <MaterialIcon
                icon="install_mobile"
                size="xl"
                className="text-white"
              />
            </div>
            <div className="text-white text-center sm:text-left">
              <p id="pwa-cta-heading" className="font-bold text-xl mb-1">
                Access the MH Construction Staff Hub
              </p>
              <p className="text-sm text-white/90">
                Team members can open the Staff Hub for safety manuals, forms,
                and operational workflows.
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={trackPwaInstall}
            className="shrink-0"
            aria-label="Open MH Construction Staff Hub"
            asChild
          >
            <Link href="/hub" className="shrink-0">
              <MaterialIcon
                icon="dashboard"
                size="md"
                className="mr-2"
                aria-hidden="true"
              />
              Open Staff Hub
            </Link>
          </Button>
        </div>
      </aside>
    );
  }

  if (variant === "pitch-deck") {
    return (
      <aside
        className={`bg-brand-secondary py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="pitch-deck-cta-heading"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:block bg-white/20 backdrop-blur-sm p-4 rounded-xl"
              aria-hidden="true"
            >
              <MaterialIcon
                icon="picture_as_pdf"
                size="xl"
                className="text-white"
              />
            </div>
            <div className="text-white text-center sm:text-left">
              <p id="pitch-deck-cta-heading" className="font-bold text-xl mb-1">
                Explore Our Full Capabilities
              </p>
              <p className="text-sm text-white/90">
                Request our pitch deck for detailed project portfolios &amp;
                proven results — we'll reach out personally
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={trackPitchDeck}
            className="shrink-0 bg-white/10 border-white/30 text-white hover:bg-white/20"
            aria-label="Request MH Construction pitch deck"
            asChild
          >
            <Link href={PITCH_DECK_HREF} className="shrink-0">
              <MaterialIcon
                icon="request_page"
                size="md"
                className="mr-2"
                aria-hidden="true"
              />
              Request Deck
            </Link>
          </Button>
        </div>
      </aside>
    );
  }

  if (variant === "consultation") {
    return (
      <aside
        className={`bg-gray-900 py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="consultation-cta-heading"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="hidden sm:block bg-brand-primary/20 backdrop-blur-sm p-4 rounded-xl"
              aria-hidden="true"
            >
              <MaterialIcon
                icon="event_available"
                size="xl"
                className="text-brand-primary-light"
              />
            </div>
            <div className="text-white text-center sm:text-left">
              <p
                id="consultation-cta-heading"
                className="font-bold text-xl mb-1"
              >
                Ready to Start Your Project?
              </p>
              <p className="text-sm text-gray-300">
                Schedule a free consultation—let's discuss your vision
              </p>
            </div>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={trackConsultation}
            aria-label="Book a free consultation with MH Construction"
            asChild
          >
            <Link href="/contact" className="shrink-0">
              <MaterialIcon
                icon="event"
                size="md"
                className="mr-2"
                aria-hidden="true"
              />
              Book Consultation
            </Link>
          </Button>
        </div>
      </aside>
    );
  }

  // Combo variant (default) - All three actions
  return (
    <BrandedContentSection
      id="strategic-cta"
      header={{
        icon: "rocket_launch",
        iconVariant: "secondary",
        subtitle: "Ready to Partner?",
        title: "Take the Next Step",
        description: "Choose how you'd like to engage with MH Construction",
      }}
      className={className}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Staff Hub */}
        <Button
          variant="outline"
          size="lg"
          onClick={trackComboPwa}
          className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-brand-bronze/30 hover:border-brand-bronze/60 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
          aria-label="Open MH Construction Staff Hub"
          asChild
        >
          <Link href="/hub" className="block">
            <MaterialIcon
              icon="dashboard"
              size="xl"
              aria-hidden="true"
              className="text-brand-primary"
            />
            <span className="font-bold text-gray-900 dark:text-white">
              Staff Hub
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Team portal access
            </span>
          </Link>
        </Button>

        {/* View Pitch Deck */}
        <Button
          variant="outline"
          size="lg"
          onClick={trackComboPitchDeck}
          className="w-full flex flex-col items-center gap-2 h-auto py-6 border-2 border-brand-primary/30 hover:border-brand-primary/60 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
          aria-label="Request MH Construction pitch deck"
          asChild
        >
          <Link href={PITCH_DECK_HREF} className="block">
            <MaterialIcon
              icon="request_page"
              size="xl"
              aria-hidden="true"
              className="text-brand-primary"
            />
            <span className="font-bold text-gray-900 dark:text-white">
              Pitch Deck
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              Request via contact
            </span>
          </Link>
        </Button>

        {/* Get Consultation */}
        <Button
          variant="primary"
          size="lg"
          onClick={trackComboConsultation}
          className="w-full flex flex-col items-center gap-2 h-auto py-6"
          aria-label="Schedule a free consultation with MH Construction"
          asChild
        >
          <Link href="/contact" className="block">
            <MaterialIcon icon="event_available" size="xl" aria-hidden="true" />
            <span className="font-bold">Get Consultation</span>
            <span className="text-xs">Free estimate</span>
          </Link>
        </Button>
      </div>
    </BrandedContentSection>
  );
}
