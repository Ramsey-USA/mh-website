"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface PWAInstallPromptProps {
  className?: string;
  variant?: "banner" | "card" | "modal";
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export default function PWAInstallPrompt({
  className = "",
  variant = "banner",
  showOnMobile = true,
  showOnDesktop = true,
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed
    const checkIfInstalled = () => {
      if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone
      ) {
        setIsInstalled(true);
        return;
      }
    };

    // Detect mobile and iOS
    const checkDevice = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent,
        );
      const ios = /iphone|ipad|ipod/i.test(userAgent);

      setIsMobile(mobile);
      setIsIOS(ios);
    };

    // Check if user has dismissed the prompt recently
    const checkDismissed = () => {
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      const dismissedTime = dismissed ? parseInt(dismissed) : 0;
      const dayInMs = 24 * 60 * 60 * 1000;

      // Show again after 7 days
      return Date.now() - dismissedTime < 7 * dayInMs;
    };

    checkIfInstalled();
    checkDevice();

    if (isInstalled || checkDismissed()) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("[PWA] Install prompt event triggered");
      e.preventDefault();
      setDeferredPrompt(e);

      // Show install prompt based on device preferences
      if ((isMobile && showOnMobile) || (!isMobile && showOnDesktop)) {
        setIsVisible(true);
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log("[PWA] App was installed");
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // For iOS, show manual install instructions
    if (isIOS && !isInstalled && !checkDismissed()) {
      setTimeout(() => {
        if (showOnMobile) {
          setIsVisible(true);
        }
      }, 3000); // Show after 3 seconds on iOS
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [showOnMobile, showOnDesktop, isMobile, isInstalled, isIOS]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        // Show iOS install instructions
        setIsVisible(true);
        return;
      }
      return;
    }

    try {
      // Show the install prompt
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;

      console.log("[PWA] User choice:", outcome);

      if (outcome === "accepted") {
        console.log("[PWA] User accepted the install prompt");
      } else {
        console.log("[PWA] User dismissed the install prompt");
      }

      // Clear the prompt
      setDeferredPrompt(null);
      setIsVisible(false);
    } catch (error) {
      console.error("[PWA] Install prompt error:", error);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("pwa-install-dismissed", Date.now().toString());
  };

  if (!isVisible || isInstalled) {
    return null;
  }

  const features = [
    { icon: "bolt", text: "Faster access to your partnership" },
    { icon: "wifi", text: "Works offline with cached partnership info" },
    { icon: "phone_android", text: "Full-screen partnership experience" },
    { icon: "computer", text: "Desktop shortcut for quick partnership access" },
  ];

  if (variant === "banner") {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-brand-primary to-brand-accent text-white p-4 shadow-lg ${className}`}
      >
        <div className="flex justify-between items-center mx-auto container">
          <div className="flex items-center gap-4">
            <MaterialIcon icon="download" className="w-6 h-6" />
            <div>
              <div className="font-semibold">Install Your Partnership App</div>
              <div className="text-forest-100 text-sm">
                Get faster access and offline partnership capabilities
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isIOS ? (
              <div className="text-forest-100 text-sm">
                Tap the share button and select &quot;Add to Home Screen&quot;
              </div>
            ) : (
              <button
                onClick={handleInstallClick}
                className="bg-white hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-brand-primary transition-colors"
              >
                Install Partnership App
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="p-1 text-forest-100 hover:text-white"
              aria-label="Dismiss install prompt"
            >
              <MaterialIcon icon="close" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 p-6 ${className}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary/10 p-2 rounded-lg">
              <MaterialIcon
                icon="download"
                className="w-6 h-6 text-brand-primary"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Install Partnership App
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Enhanced partnership experience
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 dark:text-gray-500"
            aria-label="Dismiss"
          >
            <MaterialIcon icon="close" className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm"
            >
              <MaterialIcon
                icon={feature.icon}
                className="w-4 h-4 text-brand-primary"
              />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {isIOS ? (
          <div className="bg-brand-primary/5 dark:bg-brand-primary/10 p-3 rounded-lg">
            <p className="text-brand-primary dark:text-brand-primary text-sm">
              <strong>To install Partnership App on iOS:</strong>
              <br />
              1. Tap the share button in Safari
              <br />
              2. Select &quot;Add to Home Screen&quot;
              <br />
              3. Tap &quot;Add&quot; to install partnership app
            </p>
          </div>
        ) : (
          <button
            onClick={handleInstallClick}
            className="flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-accent px-4 py-2 rounded-lg w-full font-semibold text-white transition-colors"
          >
            <MaterialIcon icon="download" className="w-4 h-4" />
            Install Partnership App
          </button>
        )}
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6 ${className}`}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-brand-primary/10 p-2 rounded-lg">
                <MaterialIcon
                  icon="download"
                  className="w-6 h-6 text-brand-primary"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
                  Install Your Partnership App
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get the best partnership experience
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 dark:text-gray-500"
              aria-label="Close"
            >
              <MaterialIcon icon="close" className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <MaterialIcon
                  icon={feature.icon}
                  className="w-5 h-5 text-brand-primary"
                />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {isIOS ? (
            <div className="bg-brand-primary/5 dark:bg-brand-primary/10 mb-4 p-4 rounded-lg">
              <h4 className="mb-2 font-semibold text-brand-primary dark:text-brand-primary">
                Installation Instructions for iOS:
              </h4>
              <ol className="space-y-1 text-brand-primary dark:text-brand-primary text-sm">
                <li>1. Open this site in Safari</li>
                <li>2. Tap the share button (square with arrow)</li>
                <li>3. Scroll down and tap &quot;Add to Home Screen&quot;</li>
                <li>4. Tap &quot;Add&quot; to install your partnership app</li>
              </ol>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="flex justify-center items-center gap-2 bg-brand-primary hover:bg-brand-accent mb-4 px-4 py-3 rounded-lg w-full font-semibold text-white transition-colors"
            >
              <MaterialIcon icon="download" className="w-5 h-5" />
              Install Partnership App
            </button>
          )}

          <button
            onClick={handleDismiss}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 px-4 py-2 rounded-lg w-full font-semibold text-gray-800 dark:text-gray-200 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    );
  }

  return null;
}
