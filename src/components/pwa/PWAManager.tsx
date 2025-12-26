"use client";

import { useState } from "react";
import { ServiceWorkerRegistration } from "./ServiceWorkerRegistration";
import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { UpdateNotification } from "./UpdateNotification";

/**
 * PWA Manager component that coordinates all PWA functionality
 * - Service worker registration
 * - Install prompts
 * - Update notifications
 */
export function PWAManager() {
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

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
    console.error("[PWA Manager] Service worker error:", error);
  };

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
