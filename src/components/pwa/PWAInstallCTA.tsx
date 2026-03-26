"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Button } from "@/components/ui";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAInstallCTAProps {
  variant?: "card" | "banner" | "button";
  className?: string;
}

/**
 * PWA Install CTA Component
 * Branded call-to-action for installing the MH Construction PWA
 * Follows MH branding guidelines with military green colors
 * Only shows when PWA is installable
 */
export function PWAInstallCTA({
  variant = "card",
  className = "",
}: PWAInstallCTAProps) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      // Track installation
      if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (
          window as typeof window & {
            gtag: (
              command: string,
              eventName: string,
              params?: Record<string, string>,
            ) => void;
          }
        ).gtag;
        gtag("event", "pwa_install_cta", {
          event_category: "engagement",
          event_label: "PWA CTA Click",
        });
      }
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Card variant for NextSteps section
  if (variant === "card") {
    // Always show card, but with different content when not installable
    if (!isInstallable) {
      return (
        <div
          className={`group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border-2 border-gray-300/20 ${className}`}
        >
          <div className="flex justify-center mb-6">
            <div className="rounded-xl bg-gradient-to-br from-gray-400 to-gray-500 p-4 shadow-lg">
              <MaterialIcon
                icon="install_mobile"
                size="xl"
                className="text-white"
              />
            </div>
          </div>

          <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
            Install Our App
          </h3>

          <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
            Add MH Construction to your home screen for faster access and
            offline support.
          </p>

          <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 flex-grow">
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-gray-600 flex-shrink-0"
              />
              <span>Works offline with cached content</span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-gray-600 flex-shrink-0"
              />
              <span>3-5x faster page loads</span>
            </li>
            <li className="flex items-center gap-2">
              <MaterialIcon
                icon="check_circle"
                size="sm"
                className="text-gray-600 flex-shrink-0"
              />
              <span>Quick shortcuts to key pages</span>
            </li>
          </ul>

          <Button
            variant="outline"
            size="lg"
            className="w-full opacity-60 cursor-not-allowed"
            disabled
          >
            <MaterialIcon icon="info" size="lg" className="mr-2" />
            Already Installed
          </Button>
        </div>
      );
    }

    return (
      <div
        className={`group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border-2 border-brand-primary/20 ${className}`}
      >
        {/* Optional badge */}
        <div className="bg-brand-primary -top-4 left-1/2 absolute px-4 py-1 rounded-full -translate-x-1/2 shadow-md">
          <span className="font-bold text-sm text-white uppercase tracking-wide">
            New
          </span>
        </div>

        <div className="flex justify-center mb-6">
          <div className="rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <MaterialIcon
              icon="install_mobile"
              size="xl"
              className="text-white"
            />
          </div>
        </div>

        <h3 className="mb-4 font-bold text-2xl text-center text-gray-900 dark:text-white leading-tight">
          Install Our App
        </h3>

        <p className="mb-6 text-center text-gray-600 text-base dark:text-gray-300 leading-relaxed">
          Quick access with offline support. Add MH Construction to your home
          screen for faster loading and native app experience.
        </p>

        <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-300 flex-grow">
          <li className="flex items-center gap-2">
            <MaterialIcon
              icon="check_circle"
              size="sm"
              className="text-brand-primary flex-shrink-0"
            />
            <span>Works offline with cached content</span>
          </li>
          <li className="flex items-center gap-2">
            <MaterialIcon
              icon="check_circle"
              size="sm"
              className="text-brand-primary flex-shrink-0"
            />
            <span>3-5x faster page loads</span>
          </li>
          <li className="flex items-center gap-2">
            <MaterialIcon
              icon="check_circle"
              size="sm"
              className="text-brand-primary flex-shrink-0"
            />
            <span>Quick shortcuts to key pages</span>
          </li>
        </ul>

        <Button
          variant="primary"
          size="lg"
          className="w-full group/btn"
          onClick={handleInstallClick}
        >
          <MaterialIcon
            icon="add_to_home_screen"
            size="lg"
            className="mr-2 group-hover/btn:scale-110 transition-transform"
          />
          Install Now
        </Button>
      </div>
    );
  }

  // Banner and button variants only show when installable
  if (!isInstallable) {
    return null;
  }

  // Banner variant for after hero
  if (variant === "banner") {
    return (
      <section
        className={`relative overflow-hidden bg-gradient-to-br from-gray-950 via-brand-primary-dark to-brand-primary py-8 sm:py-10 ${className}`}
        aria-labelledby="homepage-offline-access-heading"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,189,147,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/15 bg-white/8 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-1 items-start gap-4 sm:gap-5">
                <div className="flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/12 shadow-lg sm:h-16 sm:w-16">
                    <MaterialIcon
                      icon="install_mobile"
                      size="lg"
                      className="text-white"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-brand-secondary-light">
                    Field Access
                  </p>
                  <h2
                    id="homepage-offline-access-heading"
                    className="text-2xl font-bold leading-tight text-white sm:text-3xl"
                  >
                    Keep MH Construction available even when the signal drops.
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
                    Add the site to your device for faster return visits,
                    offline access to key pages, and a cleaner home-screen
                    experience built to work well with our Cloudflare-powered
                    deployment.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5 text-xs font-semibold text-white/90 sm:text-sm">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                      Offline-ready core pages
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                      Faster repeat visits
                    </span>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5">
                      Cloudflare-optimized delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:min-w-[220px] sm:max-w-[240px]">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-brand-secondary text-gray-950 hover:bg-brand-secondary-light"
                  onClick={handleInstallClick}
                >
                  <MaterialIcon icon="download" size="lg" className="mr-2" />
                  Save To Device
                </Button>
                <p className="text-center text-xs leading-relaxed text-white/70 sm:text-left">
                  Available on supported mobile and desktop browsers when
                  install criteria are met.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Button variant for navigation/footer
  if (variant === "button") {
    return (
      <button
        onClick={handleInstallClick}
        className={`inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-colors duration-200 ${className}`}
      >
        <MaterialIcon icon="install_mobile" size="sm" />
        <span className="font-medium text-sm">Install App</span>
      </button>
    );
  }

  return null;
}
