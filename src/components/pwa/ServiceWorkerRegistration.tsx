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

type StoredRole = "admin" | "superintendent" | "worker" | "traveler";

function getStoredRole(): StoredRole | null {
  try {
    const adminToken = localStorage.getItem("admin_token");
    const adminUser = localStorage.getItem("admin_user");
    if (adminToken && adminUser) {
      const parsed = JSON.parse(adminUser) as { role?: string };
      if (parsed.role === "admin") return "admin";
    }

    const fieldToken = localStorage.getItem("field_auth_token");
    const fieldUser = localStorage.getItem("field_user");
    if (fieldToken && fieldUser) {
      const parsed = JSON.parse(fieldUser) as { role?: string };
      const role = parsed.role;
      if (
        role === "superintendent" ||
        role === "worker" ||
        role === "traveler"
      ) {
        return role as StoredRole;
      }
    }
  } catch {
    // localStorage unavailable or malformed
  }
  return null;
}

function requestRegisteredOfflineBundle(reg: ServiceWorkerRegistration): void {
  const role = getStoredRole();
  if (!role) return;

  const targetWorker =
    reg.active ||
    reg.waiting ||
    reg.installing ||
    navigator.serviceWorker.controller;

  if (!targetWorker) return;

  targetWorker.postMessage({ type: "CACHE_REGISTERED_OFFLINE_BUNDLE" });
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

          // Registered users get an expanded offline bundle (manual PDFs + pages).
          requestRegisteredOfflineBundle(reg);

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

      if (
        event.data &&
        event.data.type === "REGISTERED_OFFLINE_BUNDLE_CACHED"
      ) {
        const { cachedCount, failedCount } =
          (event.data.data as { cachedCount?: number; failedCount?: number }) ||
          {};
        logger.info(
          `[PWA] Registered offline bundle cached (${cachedCount ?? 0} success, ${failedCount ?? 0} failed)`,
        );
      }

      if (
        event.data &&
        event.data.type === "REGISTERED_OFFLINE_BUNDLE_FAILED"
      ) {
        logger.warn(
          "[PWA] Registered offline bundle caching failed:",
          event.data.error,
        );
      }
    });

    return () => {
      // Cleanup if needed
    };
  }, [onUpdateAvailable, onInstalled, onError, registration]);

  return null; // This is a utility component with no UI
}
