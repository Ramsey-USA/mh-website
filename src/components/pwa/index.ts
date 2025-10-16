// PWA components exported with dynamic loading for better performance
import dynamic from "next/dynamic";

// PWA components are not critical for initial page load
// Load them dynamically to reduce bundle size
export const PWAInstall = dynamic(() => import("./PWAInstall"), {
  ssr: false,
});

export const PWAInstallPrompt = dynamic(() => import("./PWAInstallPrompt"), {
  ssr: false,
});

export const PWAUpdate = dynamic(() => import("./PWAUpdate"), {
  ssr: false,
});

export const PWAUpdatePrompt = dynamic(() => import("./PWAUpdatePrompt"), {
  ssr: false,
});

export const PushNotifications = dynamic(() => import("./PushNotifications"), {
  ssr: false,
});

export const BackgroundSyncStatus = dynamic(
  () => import("./BackgroundSyncStatus"),
  {
    ssr: false,
  },
);
