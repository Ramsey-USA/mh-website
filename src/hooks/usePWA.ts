"use client";

import { useState, useEffect } from "react";

export interface PWAStatus {
  /** True when the app is running in an installed (standalone) PWA context. */
  isStandalone: boolean;
  /** True when the browser has fired `beforeinstallprompt` (installable). */
  isInstallable: boolean;
  /** True on iOS/iPadOS (uses "Add to Home Screen" flow instead of prompt). */
  isIOS: boolean;
}

/**
 * Detects whether the site is running as an installed Progressive Web App.
 *
 * - `isStandalone` fires for both Android (display-mode: standalone) and iOS
 *   (navigator.standalone = true).
 * - `isInstallable` becomes true once the browser fires `beforeinstallprompt`,
 *   meaning the user has not yet installed the app.
 * - Returns all-false on the server (SSR) — components should gate on mounting.
 */
export function usePWA(): PWAStatus {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Standalone check: covers Android/Chrome and iOS Safari
    const mql = globalThis.matchMedia("(display-mode: standalone)");
    const iosStandalone =
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(mql.matches || iosStandalone);

    // Track installability
    const handleBeforeInstall = () => setIsInstallable(true);
    globalThis.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Track if it transitions to standalone later (edge case)
    const handleChange = (e: MediaQueryListEvent) =>
      setIsStandalone(e.matches || iosStandalone);
    mql.addEventListener("change", handleChange);

    // iOS detection
    setIsIOS(/iphone|ipad|ipod/i.test(navigator.userAgent));

    return () => {
      globalThis.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstall,
      );
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return { isStandalone, isInstallable, isIOS };
}
