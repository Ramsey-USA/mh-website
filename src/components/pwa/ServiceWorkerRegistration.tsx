"use client";

import { useEffect, useState } from "react";
import { logger } from "@/lib/utils/logger";

function isLighthouseRun(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return Boolean(window.__LIGHTHOUSE__) || /Chrome-Lighthouse/i.test(userAgent);
}

interface ServiceWorkerRegistrationProps {
  onUpdateAvailable?: (registration: ServiceWorkerRegistration) => void;
  onInstalled?: () => void;
  onError?: (error: Error) => void;
}

export function ServiceWorkerRegistration({
  onUpdateAvailable,
  onInstalled,
  onError,
}: ServiceWorkerRegistrationProps) {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Only run in browser and when service workers are supported
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV === "development" ||
      (process.env.NODE_ENV !== "test" && isLighthouseRun())
    ) {
      return;
    }

    let refreshing = false;

    const performRegistration = () => {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          logger.info("[PWA] Service worker registered successfully");
          setRegistration(reg);

          // Check for updates every hour
          setInterval(
            () => {
              reg.update();
            },
            60 * 60 * 1000,
          );

          // Handle initial installation
          if (!navigator.serviceWorker.controller) {
            logger.info("[PWA] Service worker installed for the first time");
            onInstalled?.();
            return;
          }

          // Check for waiting service worker
          if (reg.waiting) {
            logger.info("[PWA] New service worker waiting");
            onUpdateAvailable?.(reg);
          }

          // Handle new service worker installing
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;

            logger.info("[PWA] New service worker installing");

            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // New service worker available
                  logger.info("[PWA] New service worker available");
                  onUpdateAvailable?.(reg);
                } else {
                  // First time install
                  logger.info("[PWA] Content cached for offline use");
                  onInstalled?.();
                }
              }
            });
          });
        })
        .catch((error) => {
          logger.error("[PWA] Service worker registration failed:", error);
          onError?.(error);
        });
    };

    if (process.env.NODE_ENV !== "production" || typeof fetch !== "function") {
      performRegistration();
    } else {
      void fetch("/sw.js", {
        method: "GET",
        cache: "no-store",
      })
        .then((swCheck) => {
          if (!swCheck.ok) {
            logger.warn(
              `[PWA] Skipping service worker registration: /sw.js returned ${swCheck.status}`,
            );
            return;
          }

          performRegistration();
        })
        .catch((error) => {
          logger.warn(
            "[PWA] Skipping service worker registration: /sw.js check failed",
            error,
          );
        });
    }

    // Handle controller change (new SW activated)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      // Guard: do not reload if the current frame is a Chrome error page
      // (chrome-error://chromewebdata/). Calling window.location.reload() from
      // that context causes Chrome to attempt a cross-protocol navigation to
      // https://www.mhc-gc.com/, which it blocks with an "Unsafe attempt to
      // load URL" error in the console.
      if (!window.location.protocol.startsWith("http")) return;
      refreshing = true;
      logger.info("[PWA] New service worker activated, reloading page");
      window.location.reload();
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SW_UPDATED") {
        logger.info("[PWA] Service worker updated message received");
        if (registration) {
          onUpdateAvailable?.(registration);
        }
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, [onUpdateAvailable, onInstalled, onError, registration]);

  return null; // This is a utility component with no UI
}
