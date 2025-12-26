/**
 * Strategic CTA Banner
 * Compact, attention-grabbing banner to drive key actions
 * Displays after important homepage sections
 */

"use client";

import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import Link from "next/link";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";

interface StrategicCTABannerProps {
  variant?: "pwa" | "pitch-deck" | "consultation" | "combo";
  className?: string;
}

export function StrategicCTABanner({
  variant = "combo",
  className = "",
}: StrategicCTABannerProps) {
  const { trackEvent } = useAnalytics();

  if (variant === "pwa") {
    return (
      <section
        className={`bg-brand-primary py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="pwa-cta-heading"
        role="complementary"
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
                Access MH Construction Offline
              </p>
              <p className="text-sm text-white/90">
                Install our app for instant access anywhere, anytime—even
                without internet
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              trackEvent("cta_banner_click", { type: "pwa_install" });
              // PWA install logic handled by PWAInstallPrompt
            }}
            className="flex-shrink-0"
            aria-label="Install MH Construction Progressive Web App"
          >
            <MaterialIcon
              icon="get_app"
              size="md"
              className="mr-2"
              aria-hidden="true"
            />
            Install App
          </Button>
        </div>
      </section>
    );
  }

  if (variant === "pitch-deck") {
    return (
      <section
        className={`bg-brand-secondary py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="pitch-deck-cta-heading"
        role="complementary"
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
                Download our pitch deck for detailed project portfolios & proven
                results
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              trackEvent("cta_banner_click", {
                type: "pitch_deck",
                status: "coming_soon",
              });
            }}
            className="flex-shrink-0 bg-white/10 border-white/30 text-white hover:bg-white/20 opacity-60 cursor-not-allowed"
            disabled
            aria-label="Download pitch deck - Coming soon"
          >
            <MaterialIcon
              icon="download"
              size="md"
              className="mr-2"
              aria-hidden="true"
            />
            Coming Soon
          </Button>
        </div>
      </section>
    );
  }

  if (variant === "consultation") {
    return (
      <section
        className={`bg-gray-900 py-6 px-4 sm:px-6 ${className}`}
        aria-labelledby="consultation-cta-heading"
        role="complementary"
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
          <Link href="/contact" className="flex-shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent("cta_banner_click", { type: "consultation" });
              }}
              aria-label="Book a free consultation with MH Construction"
            >
              <MaterialIcon
                icon="event"
                size="md"
                className="mr-2"
                aria-hidden="true"
              />
              Book Consultation
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  // Combo variant (default) - All three actions
  return (
    <section
      className={`relative bg-white dark:bg-gray-900 py-12 sm:py-16 overflow-hidden ${className}`}
      aria-labelledby="combo-cta-heading"
      role="complementary"
    >
      {/* Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-10 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6">
          <h2
            id="combo-cta-heading"
            className="font-bold text-gray-900 dark:text-white text-2xl mb-2"
          >
            Take the Next Step
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Choose how you'd like to engage with MH Construction
          </p>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          role="group"
          aria-label="Engagement options"
        >
          {/* Install App */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              trackEvent("cta_combo_click", { type: "pwa_install" });
            }}
            className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-brand-primary/20 hover:border-brand-primary/40 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
            aria-label="Install MH Construction app for offline access"
          >
            <MaterialIcon
              icon="install_mobile"
              size="xl"
              aria-hidden="true"
              className="text-brand-primary"
            />
            <span className="font-bold text-gray-900 dark:text-white">
              Install App
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Offline access
            </span>
          </Button>

          {/* View Pitch Deck */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              trackEvent("cta_combo_click", {
                type: "pitch_deck",
                status: "coming_soon",
              });
            }}
            className="flex flex-col items-center gap-2 h-auto py-6 border-2 border-gray-300/40 bg-white/50 dark:bg-gray-800/50 opacity-60 cursor-not-allowed"
            disabled
            aria-label="View pitch deck - Coming soon"
          >
            <MaterialIcon
              icon="picture_as_pdf"
              size="xl"
              aria-hidden="true"
              className="text-gray-500 dark:text-gray-400"
            />
            <span className="font-bold text-gray-900 dark:text-white">
              Pitch Deck
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Coming soon
            </span>
          </Button>

          {/* Get Consultation */}
          <Link href="/contact" className="block">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                trackEvent("cta_combo_click", { type: "consultation" });
              }}
              className="w-full flex flex-col items-center gap-2 h-auto py-6"
              aria-label="Schedule a free consultation with MH Construction"
            >
              <MaterialIcon
                icon="event_available"
                size="xl"
                aria-hidden="true"
              />
              <span className="font-bold">Get Consultation</span>
              <span className="text-xs">Free estimate</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
