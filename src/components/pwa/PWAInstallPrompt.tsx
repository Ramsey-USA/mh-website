"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has previously dismissed
    const dismissed = localStorage.getItem("pwa-install-dismissed");
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed =
        (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);

      // Don't show again for 30 days
      if (daysSinceDismissed < 30) {
        return;
      }
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after a delay (better UX)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener("appinstalled", () => {
      console.info("[PWA] App installed successfully");
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);

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
        gtag("event", "pwa_install", {
          event_category: "engagement",
          event_label: "PWA Installation",
        });
      }
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

    // Show the install prompt
    await deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.info("[PWA] User accepted the install prompt");
    } else {
      console.info("[PWA] User dismissed the install prompt");
      localStorage.setItem("pwa-install-dismissed", new Date().toISOString());
    }

    // Clear the deferred prompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", new Date().toISOString());
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Dismiss"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-4 pr-10">
          {/* Icon and Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-green-700 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                Install MH Construction
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get quick access with offline support, faster loading, and a
                native app experience
              </p>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-1.5 mb-4 ml-15">
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Works offline</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Faster loading times</span>
            </li>
            <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Add to home screen</span>
            </li>
          </ul>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 px-4 py-2.5 bg-green-700 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              Install App
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 text-sm"
            >
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
