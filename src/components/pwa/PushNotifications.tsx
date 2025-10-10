"use client";

import { useState, useEffect } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  timestamp: number;
  read: boolean;
  type: "project" | "appointment" | "message" | "general";
}

interface PushNotificationsProps {
  onPermissionChange?: (permission: NotificationPermission) => void;
  onNotificationReceived?: (notification: PushNotification) => void;
}

export default function PushNotifications({
  onPermissionChange,
  onNotificationReceived,
}: PushNotificationsProps) {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState<PushNotification[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    // Check if push notifications are supported
    const supported =
      "serviceWorker" in navigator &&
      "PushManager" in window &&
      "Notification" in window;
    setIsSupported(supported);

    if (supported) {
      // Get current permission status
      setPermission(Notification.permission);

      // Check if already subscribed
      navigator.serviceWorker.ready.then(async (registration) => {
        const existingSubscription =
          await registration.pushManager.getSubscription();
        setIsSubscribed(!!existingSubscription);
        setSubscription(existingSubscription);
      });

      // Load stored notifications
      loadStoredNotifications();
    }
  }, []);

  useEffect(() => {
    if (onPermissionChange) {
      onPermissionChange(permission);
    }
  }, [permission, onPermissionChange]);

  const loadStoredNotifications = () => {
    try {
      const stored = localStorage.getItem("mh-notifications");
      if (stored) {
        const parsed = JSON.parse(stored);
        setNotifications(
          parsed.sort(
            (a: PushNotification, b: PushNotification) =>
              b.timestamp - a.timestamp
          )
        );
      }
    } catch (error) {
      console.error("Error loading stored notifications:", error);
    }
  };

  const saveNotifications = (notifs: PushNotification[]) => {
    try {
      localStorage.setItem("mh-notifications", JSON.stringify(notifs));
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      alert("Push notifications are not supported in this browser.");
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        await subscribeToPush();
        return true;
      } else {
        console.log("Notification permission denied");
        return false;
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  };

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      // VAPID public key (in production, this would be your actual VAPID public key)
      const vapidPublicKey =
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
        "BMqSvZTDRZhUqQZCiK6ARr6jxJEa-XmbmGWgSJF1rRLyf5QrZVKnJV_8UaW4Nkr_r5HX-5Q6_2mVhE_U3d7J8yY";

      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          vapidPublicKey
        ) as BufferSource,
      });

      setSubscription(pushSubscription);
      setIsSubscribed(true);

      // Send subscription to server
      await sendSubscriptionToServer(pushSubscription);

      console.log("Push subscription successful:", pushSubscription);
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
      setIsSubscribed(false);
    }
  };

  const unsubscribeFromPush = async () => {
    try {
      if (subscription) {
        await subscription.unsubscribe();
        await removeSubscriptionFromServer(subscription);
        setSubscription(null);
        setIsSubscribed(false);
        console.log("Push unsubscription successful");
      }
    } catch (error) {
      console.error("Error unsubscribing from push notifications:", error);
    }
  };

  const sendSubscriptionToServer = async (subscription: PushSubscription) => {
    try {
      // In a real app, send this to your backend
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send subscription to server");
      }
    } catch (error) {
      console.log("Note: Subscription not sent to server (demo mode):", error);
      // In demo mode, just log the subscription
      console.log("Subscription object:", subscription.toJSON());
    }
  };

  const removeSubscriptionFromServer = async (
    subscription: PushSubscription
  ) => {
    try {
      await fetch("/api/notifications/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });
    } catch (error) {
      console.log(
        "Note: Unsubscription not sent to server (demo mode):",
        error
      );
    }
  };

  // Demo: Add a test notification
  const addTestNotification = () => {
    const testNotification: PushNotification = {
      id: Date.now().toString(),
      title: "Partnership Update",
      body: "This is a test notification from your MH Partnership Team",
      type: "general",
      timestamp: Date.now(),
      read: false,
      icon: "/icons/icon-96x96.png",
    };

    const updatedNotifications = [testNotification, ...notifications];
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);

    if (onNotificationReceived) {
      onNotificationReceived(testNotification);
    }

    // Show browser notification if permission granted
    if (permission === "granted") {
      new Notification(testNotification.title, {
        body: testNotification.body,
        icon: testNotification.icon,
        tag: testNotification.id,
      });
    }
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== id
    );
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    saveNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "project":
        return <MaterialIcon icon="construction" className="w-4 h-4" />;
      case "appointment":
        return <MaterialIcon icon="event" className="w-4 h-4" />;
      case "message":
        return <MaterialIcon icon="message" className="w-4 h-4" />;
      default:
        return <MaterialIcon icon="notifications" className="w-4 h-4" />;
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="relative p-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-200 dark:text-gray-400 transition-colors"
        title="Partnership Notifications"
      >
        {isSubscribed ? (
          <MaterialIcon icon="notifications" className="w-5 h-5" />
        ) : (
          <MaterialIcon icon="notifications_off" className="w-5 h-5" />
        )}

        {unreadCount > 0 && (
          <span className="-top-1 -right-1 absolute flex justify-center items-center bg-brand-primary rounded-full w-5 h-5 text-white text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Panel */}
      {showSettings && (
        <div className="top-full right-0 z-50 absolute bg-white dark:bg-gray-800 shadow-lg mt-2 border border-gray-200 dark:border-gray-600 rounded-lg w-80">
          <div className="p-4 border-gray-200 dark:border-gray-600 border-b">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Partnership Notifications
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 dark:text-gray-500"
              >
                <MaterialIcon icon="close" className="w-4 h-4" />
              </button>
            </div>

            {/* Permission Status */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-2 h-2 rounded-full ${
                  permission === "granted"
                    ? "bg-green-500"
                    : permission === "denied"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {permission === "granted"
                  ? "Partnership updates enabled"
                  : permission === "denied"
                    ? "Partnership updates blocked"
                    : "Partnership updates not enabled"}
              </span>
            </div>

            {/* Enable/Disable Buttons */}
            <div className="space-y-2">
              {permission !== "granted" && (
                <button
                  onClick={requestPermission}
                  className="bg-brand-primary hover:bg-brand-accent px-3 py-2 rounded w-full font-medium text-white text-sm transition-colors"
                >
                  Enable Partnership Updates
                </button>
              )}

              {isSubscribed && (
                <button
                  onClick={unsubscribeFromPush}
                  className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 px-3 py-2 rounded w-full font-medium text-white text-sm transition-colors"
                >
                  Disable Partnership Updates
                </button>
              )}

              {/* Demo Button */}
              {permission === "granted" && (
                <button
                  onClick={addTestNotification}
                  className="bg-brand-secondary hover:bg-bronze-600 px-3 py-2 rounded w-full font-medium text-white text-sm transition-colors"
                >
                  Test Partnership Update
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                No partnership updates yet
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? "bg-brand-primary/5 dark:bg-brand-primary/10" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded ${
                          notification.type === "project"
                            ? "bg-brand-primary/10 text-brand-primary"
                            : notification.type === "appointment"
                              ? "bg-brand-secondary/10 text-brand-secondary"
                              : notification.type === "message"
                                ? "bg-brand-accent/10 text-brand-accent"
                                : "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                          {notification.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2">
                          {notification.body}
                        </p>
                        <p className="mt-1 text-gray-400 dark:text-gray-500 text-xs">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-brand-primary hover:text-brand-accent"
                            title="Mark as read"
                          >
                            <MaterialIcon icon="check" className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-red-600 hover:text-red-700 dark:hover:text-red-300 dark:text-red-400"
                          title="Delete"
                        >
                          <MaterialIcon icon="close" className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear All */}
          {notifications.length > 0 && (
            <div className="p-3 border-gray-200 dark:border-gray-600 border-t">
              <button
                onClick={clearAllNotifications}
                className="w-full font-medium text-red-600 hover:text-red-700 dark:hover:text-red-300 dark:text-red-400 text-sm"
              >
                Clear All Partnership Updates
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Utility function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return new Uint8Array(outputArray.buffer);
}

// Notification types for different use cases
export const NotificationTypes = {
  PROJECT_UPDATE: "project",
  APPOINTMENT_REMINDER: "appointment",
  MESSAGE_RECEIVED: "message",
  GENERAL: "general",
} as const;

// Helper function to send notifications (for use in other components)
export const sendNotification = async (
  title: string,
  body: string,
  type: string = "general"
) => {
  if ("serviceWorker" in navigator && Notification.permission === "granted") {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        body,
        icon: "/icons/icon-96x96.png",
        badge: "/icons/icon-96x96.png",
        tag: `mh-${type}-${Date.now()}`,
        data: { type, timestamp: Date.now() },
        requireInteraction: type === "appointment",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }
};
