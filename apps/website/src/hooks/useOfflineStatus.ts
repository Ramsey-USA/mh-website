"use client";

import { useEffect, useState, useCallback } from "react";
import { getPendingCount } from "@/lib/pwa/offline-queue";

export interface OfflineStatus {
  isOnline: boolean;
  pendingCount: number;
  refreshPendingCount: () => Promise<void>;
}

/**
 * Tracks network connectivity and the number of queued offline submissions.
 * Refreshes the pending count whenever connectivity is restored or a
 * BACKGROUND_SYNC_SUCCESS message arrives from the service worker.
 */
export function useOfflineStatus(): OfflineStatus {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const [pendingCount, setPendingCount] = useState(0);

  const refreshPendingCount = useCallback(async () => {
    if (typeof indexedDB === "undefined") return;
    try {
      const count = await getPendingCount();
      setPendingCount(count);
    } catch {
      // IndexedDB unavailable (e.g. private browsing Firefox)
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      void refreshPendingCount();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial count
    void refreshPendingCount();

    // Listen for sync success messages from the service worker
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === "BACKGROUND_SYNC_SUCCESS" ||
        event.data?.type === "BACKGROUND_SYNC_START"
      ) {
        void refreshPendingCount();
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", handleMessage);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.removeEventListener("message", handleMessage);
      }
    };
  }, [refreshPendingCount]);

  return { isOnline, pendingCount, refreshPendingCount };
}
