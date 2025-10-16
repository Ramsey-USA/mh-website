"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  getPendingSyncCount,
  getBackgroundSyncManager,
} from "@/lib/background-sync";

interface BackgroundSyncStatusProps {
  className?: string;
}

export default function BackgroundSyncStatus({
  className = "",
}: BackgroundSyncStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [isManualSync, setIsManualSync] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = async () => {
      setIsOnline(true);
      setLastSync(new Date());
      // Trigger background sync
      const manager = await getBackgroundSyncManager();
      manager.processPendingRequests();
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Check pending count periodically
    const checkPendingCount = async () => {
      const count = await getPendingSyncCount();
      setPendingCount(count);
    };

    checkPendingCount();
    const interval = setInterval(checkPendingCount, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleManualSync = async () => {
    if (!isOnline || isManualSync) return;

    setIsManualSync(true);
    try {
      const manager = await getBackgroundSyncManager();
      await manager.processPendingRequests();
      setLastSync(new Date());

      // Refresh pending count
      const count = await getPendingSyncCount();
      setPendingCount(count);
    } catch (error) {
      console.error("Manual sync failed:", error);
    } finally {
      setIsManualSync(false);
    }
  };

  const getStatusIcon = () => {
    if (!isOnline) {
      return <MaterialIcon icon="wifi_off" className="w-4 h-4 text-red-500" />;
    }

    if (pendingCount > 0) {
      return (
        <MaterialIcon icon="schedule" className="w-4 h-4 text-yellow-500" />
      );
    }

    return (
      <MaterialIcon icon="check_circle" className="w-4 h-4 text-green-500" />
    );
  };

  const getStatusText = () => {
    if (!isOnline) {
      return "Offline";
    }

    if (pendingCount > 0) {
      return `${pendingCount} pending`;
    }

    return "Synced";
  };

  const getStatusColor = () => {
    if (!isOnline) {
      return "text-red-600 bg-red-50 border-red-200";
    }

    if (pendingCount > 0) {
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    }

    return "text-green-600 bg-green-50 border-green-200";
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Status Badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}
      >
        {getStatusIcon()}
        <span>{getStatusText()}</span>
      </div>

      {/* Manual Sync Button */}
      {isOnline && pendingCount > 0 && (
        <button
          onClick={handleManualSync}
          disabled={isManualSync}
          className="disabled:opacity-50 p-1 text-gray-400 hover:text-gray-600"
          title="Sync now"
        >
          <MaterialIcon
            icon="refresh"
            className={`h-4 w-4 ${isManualSync ? "animate-spin" : ""}`}
          />
        </button>
      )}

      {/* Last Sync Time */}
      {lastSync && isOnline && pendingCount === 0 && (
        <span className="text-gray-500 text-xs">
          Last synced: {lastSync.toLocaleTimeString()}
        </span>
      )}

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MaterialIcon icon="warning" className="w-3 h-3" />
          <span>Changes will sync when online</span>
        </div>
      )}
    </div>
  );
}

// Hook for using background sync in forms
export const useBackgroundSync = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const updateStatus = () => {
      setIsOnline(navigator.onLine);
    };

    const updatePendingCount = async () => {
      const count = await getPendingSyncCount();
      setPendingCount(count);
    };

    updateStatus();
    updatePendingCount();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    const interval = setInterval(updatePendingCount, 3000);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
      clearInterval(interval);
    };
  }, []);

  return {
    isOnline,
    pendingCount,
    hasPendingSync: pendingCount > 0,
  };
};
