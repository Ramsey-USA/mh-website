"use client";

import { useEffect, useState } from "react";

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
      process.env.NODE_ENV === "development"
    ) {
      return;
    }

    let refreshing = false;

    // Register service worker
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        console.info("[PWA] Service worker registered successfully");
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
          console.info("[PWA] Service worker installed for the first time");
          onInstalled?.();
          return;
        }

        // Check for waiting service worker
        if (reg.waiting) {
          console.info("[PWA] New service worker waiting");
          onUpdateAvailable?.(reg);
        }

        // Handle new service worker installing
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          console.info("[PWA] New service worker installing");

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New service worker available
                console.info("[PWA] New service worker available");
                onUpdateAvailable?.(reg);
              } else {
                // First time install
                console.info("[PWA] Content cached for offline use");
                onInstalled?.();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error("[PWA] Service worker registration failed:", error);
        onError?.(error);
      });

    // Handle controller change (new SW activated)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      console.info("[PWA] New service worker activated, reloading page");
      window.location.reload();
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SW_UPDATED") {
        console.info("[PWA] Service worker updated message received");
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

/**
 * Hook to manually update the service worker
 */
export function useServiceWorkerUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        setRegistration(reg);
      });
    }
  }, []);

  const checkForUpdates = async () => {
    if (registration) {
      await registration.update();
    }
  };

  const skipWaiting = () => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      setIsUpdateAvailable(false);
    }
  };

  return {
    isUpdateAvailable,
    setIsUpdateAvailable,
    checkForUpdates,
    skipWaiting,
    registration,
  };
}
