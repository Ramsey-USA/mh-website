"use client";

import { useState, useEffect } from "react";
import { logger } from "@/lib/utils/logger";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { UpdateNotification } from "./UpdateNotification";
import { shouldDeferComponent } from "@/lib/performance/mobile-optimizations";

/**
 * PWA Manager component that coordinates all PWA functionality
 * - Service worker registration (deferred on mobile)
 * - Install prompts
 * - Update notifications
 */
export function PWAManager() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer PWA initialization on mobile devices or slow connections
    const defer = shouldDeferComponent();

    if (defer) {
      // Delay PWA loading by 2 seconds on mobile to prioritize page rendering
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShouldLoad(true);
    }

    return undefined;
  }, []);

  const handleUpdateAvailable = (reg: ServiceWorkerRegistration) => {
    setRegistration(reg);
    setShowUpdateNotification(true);
  };

  const handleUpdate = () => {
    if (registration?.waiting) {
      // Tell the waiting service worker to skip waiting
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };

  const handleInstalled = () => {
    console.info("[PWA Manager] Service worker installed for first time");
  };

  const handleError = (error: Error) => {
    logger.error("[PWA Manager] Service worker error:", error);
  };

  // Don't render PWA components until ready
  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <ServiceWorkerRegistration
        onUpdateAvailable={handleUpdateAvailable}
        onInstalled={handleInstalled}
        onError={handleError}
      />
      <PWAInstallPrompt />
      {showUpdateNotification && <UpdateNotification onUpdate={handleUpdate} />}
    </>
  );
}
