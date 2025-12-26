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

  // Don't render if not installable
  if (!isInstallable) {
    return null;
  }

  // Card variant for NextSteps section
  if (variant === "card") {
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

        <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
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

  // Banner variant for after hero
  if (variant === "banner") {
    return (
      <div
        className={`bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary py-4 ${className}`}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <MaterialIcon
                    icon="install_mobile"
                    size="lg"
                    className="text-white"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base">
                  Install MH Construction App
                </p>
                <p className="text-white/90 text-xs sm:text-sm">
                  Faster access, offline support, and native experience
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="flex-shrink-0 bg-white hover:bg-gray-100 text-brand-primary"
              onClick={handleInstallClick}
            >
              <MaterialIcon icon="download" size="lg" className="mr-2" />
              Install
            </Button>
          </div>
        </div>
      </div>
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
