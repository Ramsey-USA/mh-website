"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * PWA Install Button Component
 * Matches Google Review card style in footer
 * Only shows when PWA is installable
 */
export function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for successful installation
    window.addEventListener("appinstalled", () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user's response
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.info("[PWA] User accepted the install prompt");

        // Track installation with Google Analytics if available
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
          gtag("event", "pwa_install_footer", {
            event_category: "engagement",
            event_label: "PWA Footer Button Install",
          });
        }
      } else {
        console.info("[PWA] User dismissed the install prompt");
      }

      // Clear the deferred prompt
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error("[PWA] Install prompt error:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  // Don't render if not installable
  if (!isInstallable) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      disabled={isInstalling}
      className="group flex items-center gap-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Install MH Construction app to your device"
    >
      <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
        <MaterialIcon
          icon={isInstalling ? "hourglass_empty" : "get_app"}
          size="md"
          className="text-white"
        />
      </div>
      <div className="flex-grow min-w-0 text-left">
        <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
          Install App
        </div>
        <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors mb-1">
          {isInstalling ? "Installing..." : "Get Our Mobile App"}
        </div>
        <div className="flex items-center gap-1 text-brand-primary text-xs">
          <MaterialIcon icon="offline_bolt" size="sm" />
          <span>Works Offline</span>
        </div>
      </div>
      <MaterialIcon
        icon="arrow_forward"
        size="sm"
        className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
      />
    </button>
  );
}
