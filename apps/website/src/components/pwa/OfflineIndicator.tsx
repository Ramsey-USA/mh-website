"use client";

import { useOfflineStatus } from "@/hooks/useOfflineStatus";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

/**
 * OfflineIndicator
 *
 * Renders a fixed bottom banner when the user is:
 *   - Offline   → amber strip: "You're offline — app is running from cache"
 *   - Back online with pending submissions → green strip with count + sync note
 *
 * Only visible inside the installed PWA context, but harmlessly hidden on the
 * browser website because it only appears when network conditions change.
 */
export function OfflineIndicator() {
  const { isOnline, pendingCount } = useOfflineStatus();

  // Nothing to show when fully online with nothing pending
  if (isOnline && pendingCount === 0) return null;

  if (!isOnline) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-0 inset-x-0 z-[200] flex items-center justify-center gap-2 bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 shadow-lg"
      >
        <MaterialIcon icon="wifi_off" size="sm" className="flex-shrink-0" />
        <span>
          You&apos;re offline — the app is running from cache. Forms will sync
          when you reconnect.
        </span>
      </div>
    );
  }

  // Online but pending submissions exist
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-0 inset-x-0 z-[200] flex items-center justify-center gap-2 bg-green-700 text-white text-sm font-semibold px-4 py-2.5 shadow-lg"
    >
      <MaterialIcon
        icon="cloud_sync"
        size="sm"
        className="flex-shrink-0 animate-spin"
      />
      <span>
        Back online — syncing {pendingCount} pending{" "}
        {pendingCount === 1 ? "submission" : "submissions"}&hellip;
      </span>
    </div>
  );
}
