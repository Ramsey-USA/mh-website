/**
 * PWA Manifest Generator for MH Construction
 * Generates dynamic manifest.json based on configuration
 */

import { logger } from "@/lib/utils/logger";
import { PWA_CONFIG } from "./config";

/**
 * Generate manifest.json for PWA installation
 */
export function generateManifest(): any {
  return {
    name: PWA_CONFIG.name,
    short_name: PWA_CONFIG.short_name,
    description: PWA_CONFIG.description,
    start_url: PWA_CONFIG.start_url,
    scope: PWA_CONFIG.scope,
    display: PWA_CONFIG.display,
    orientation: PWA_CONFIG.orientation,
    theme_color: PWA_CONFIG.theme_color,
    background_color: PWA_CONFIG.background_color,

    icons: PWA_CONFIG.icons.map((icon: any) => ({
      src: icon.src,
      sizes: icon.sizes,
      type: icon.type,
      purpose: icon.purpose || "any maskable",
    })),

    shortcuts: PWA_CONFIG.shortcuts.map((shortcut: any) => ({
      name: shortcut.name,
      short_name: shortcut.short_name,
      description: shortcut.description,
      url: shortcut.url,
      icons: [
        {
          src: shortcut.icon,
          sizes: "192x192",
          type: "image/png",
        },
      ],
    })),

    categories: PWA_CONFIG.categories,
    lang: PWA_CONFIG.lang,

    // Enhanced PWA features
    display_override: ["window-controls-overlay", "minimal-ui"],

    // Share target for receiving shared content
    share_target: {
      action: "/contact",
      method: "POST",
      enctype: "multipart/form-data",
      params: {
        title: "title",
        text: "message",
        url: "url",
      },
    },

    // Protocol handlers
    protocol_handlers: [
      {
        protocol: "mailto",
        url: "/contact?email=%s",
      },
      {
        protocol: "tel",
        url: "/contact?phone=%s",
      },
    ],

    // File handlers for construction documents
    file_handlers: [
      {
        action: "/estimator",
        accept: {
          "image/*": [".jpg", ".jpeg", ".png", ".gif"],
          "application/pdf": [".pdf"],
          "text/plain": [".txt"],
        },
      },
    ],

    // Screenshots for app stores
    screenshots: [
      {
        src: "/screenshots/desktop-home.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Home page on desktop",
      },
      {
        src: "/screenshots/mobile-home.png",
        sizes: "750x1334",
        type: "image/png",
        platform: "narrow",
        label: "Home page on mobile",
      },
      {
        src: "/screenshots/desktop-estimator.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Cost estimator tool",
      },
      {
        src: "/screenshots/mobile-estimator.png",
        sizes: "750x1334",
        type: "image/png",
        platform: "narrow",
        label: "Mobile cost estimator",
      },
    ],

    // Edge and Chrome specific features
    edge_side_panel: {
      preferred_width: 400,
    },

    // Launch handler for better app startup
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },
  };
}

/**
 * Update manifest.json file
 */
export async function updateManifest(): Promise<void> {
  const manifest = generateManifest();

  try {
    // In a real implementation, this would update the public/manifest.json file
    logger.log("Generated manifest:", manifest);

    // Store in localStorage for runtime access
    if (typeof window !== "undefined") {
      localStorage.setItem("pwa-manifest", JSON.stringify(manifest));
    }
  } catch (error) {
    logger.error("Failed to update manifest:", error);
  }
}

/**
 * Get browser capabilities for PWA features
 */
export function getBrowserCapabilities(): {
  installPrompt: boolean;
  pushNotifications: boolean;
  backgroundSync: boolean;
  periodicSync: boolean;
  badging: boolean;
  share: boolean;
  fileHandling: boolean;
  shortcuts: boolean;
} {
  if (typeof window === "undefined") {
    return {
      installPrompt: false,
      pushNotifications: false,
      backgroundSync: false,
      periodicSync: false,
      badging: false,
      share: false,
      fileHandling: false,
      shortcuts: false,
    };
  }

  return {
    installPrompt: "BeforeInstallPromptEvent" in window,
    pushNotifications: "PushManager" in window && "Notification" in window,
    backgroundSync:
      "serviceWorker" in navigator &&
      "sync" in window.ServiceWorkerRegistration.prototype,
    periodicSync:
      "serviceWorker" in navigator &&
      "periodicSync" in window.ServiceWorkerRegistration.prototype,
    badging: "setAppBadge" in navigator,
    share: "share" in navigator,
    fileHandling: "launchQueue" in window,
    shortcuts: "getInstalledRelatedApps" in navigator,
  };
}

/**
 * Check if app is installed as PWA
 */
export function isPWAInstalled(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  // Check if app is launched from home screen
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  const isMinimalUI = window.matchMedia("(display-mode: minimal-ui)").matches;
  const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;

  return isStandalone || isMinimalUI || isFullscreen;
}

/**
 * Get PWA installation status and capabilities
 */
export function getPWAStatus(): {
  isInstalled: boolean;
  isInstallable: boolean;
  capabilities: ReturnType<typeof getBrowserCapabilities>;
  manifest: any;
} {
  return {
    isInstalled: isPWAInstalled(),
    isInstallable: getBrowserCapabilities().installPrompt,
    capabilities: getBrowserCapabilities(),
    manifest: generateManifest(),
  };
}

/**
 * App badge management
 */
export class AppBadge {
  static async set(count: number): Promise<void> {
    if ("setAppBadge" in navigator) {
      try {
        await (navigator as any).setAppBadge(count);
      } catch (error) {
        logger.warn("Failed to set app badge:", error);
      }
    }
  }

  static async clear(): Promise<void> {
    if ("clearAppBadge" in navigator) {
      try {
        await (navigator as any).clearAppBadge();
      } catch (error) {
        logger.warn("Failed to clear app badge:", error);
      }
    }
  }

  static async update(
    newEstimates: number,
    newMessages: number,
  ): Promise<void> {
    const total = newEstimates + newMessages;
    if (total > 0) {
      await this.set(total);
    } else {
      await this.clear();
    }
  }
}

/**
 * Web Share API integration
 */
export class WebShare {
  static async isSupported(): Promise<boolean> {
    return "share" in navigator;
  }

  static async shareProject(project: {
    title: string;
    description: string;
    url: string;
    images?: string[];
  }): Promise<boolean> {
    if (!(await this.isSupported())) {
      return false;
    }

    try {
      const shareData: ShareData = {
        title: `${project.title} - MH Construction`,
        text: project.description,
        url: project.url,
      };

      // Add files if supported and available
      if (
        project.images &&
        project.images.length > 0 &&
        "canShare" in navigator
      ) {
        const files = await Promise.all(
          project.images.map(async (imageUrl) => {
            try {
              const response = await fetch(imageUrl);
              const blob = await response.blob();
              return new File([blob], "project-image.jpg", { type: blob.type });
            } catch {
              return null;
            }
          }),
        );

        const validFiles = files.filter(Boolean) as File[];
        if (
          validFiles.length > 0 &&
          (navigator as any).canShare({ files: validFiles })
        ) {
          shareData.files = validFiles;
        }
      }

      await navigator.share(shareData);
      return true;
    } catch (error) {
      logger.warn("Web share failed:", error);
      return false;
    }
  }

  static async shareEstimate(estimate: {
    type: string;
    total: number;
    url: string;
  }): Promise<boolean> {
    if (!(await this.isSupported())) {
      return false;
    }

    try {
      await navigator.share({
        title: "Construction Estimate - MH Construction",
        text: `${estimate.type} estimate: $${estimate.total.toLocaleString()}`,
        url: estimate.url,
      });
      return true;
    } catch (error) {
      logger.warn("Estimate share failed:", error);
      return false;
    }
  }
}
