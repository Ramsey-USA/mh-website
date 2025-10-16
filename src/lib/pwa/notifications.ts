/**
 * Push Notification Manager for MH Construction PWA
 * Handles push notifications for estimates, appointments, and updates
 */

"use client";

import { useState, useEffect } from "react";
import { PUSH_CONFIG } from "@/lib/pwa/config";

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  url?: string;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: Record<string, any>;
  vibrate?: number[];
  requireInteraction?: boolean;
  silent?: boolean;
  renotify?: boolean;
  timestamp?: number;
}

export interface NotificationSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export class PushNotificationManager {
  private static instance: PushNotificationManager;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;
  private isSupported: boolean = false;
  private permission: NotificationPermission = "default";

  constructor() {
    if (typeof window !== "undefined") {
      this.isSupported =
        "Notification" in window &&
        "serviceWorker" in navigator &&
        "PushManager" in window;
      this.permission = Notification.permission;
    }
  }

  static getInstance(): PushNotificationManager {
    if (!PushNotificationManager.instance) {
      PushNotificationManager.instance = new PushNotificationManager();
    }
    return PushNotificationManager.instance;
  }

  /**
   * Initialize push notifications
   */
  async initialize(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn("Push notifications not supported");
      return false;
    }

    try {
      // Get service worker registration
      this.registration = await navigator.serviceWorker.ready;

      // Check existing subscription
      this.subscription = await this.registration.pushManager.getSubscription();

      return true;
    } catch (error) {
      console.error("Failed to initialize push notifications:", error);
      return false;
    }
  }

  /**
   * Request notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported) {
      return "denied";
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission;
    } catch (error) {
      console.error("Failed to request notification permission:", error);
      return "denied";
    }
  }

  /**
   * Subscribe to push notifications
   */
  async subscribe(): Promise<NotificationSubscription | null> {
    if (!this.registration || this.permission !== "granted") {
      return null;
    }

    try {
      // Check for existing subscription
      this.subscription = await this.registration.pushManager.getSubscription();

      if (this.subscription) {
        return this.serializeSubscription(this.subscription);
      }

      // Create new subscription
      const vapidKey = PUSH_CONFIG.VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        throw new Error("VAPID public key not configured");
      }

      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidKey),
      });

      const serializedSubscription = this.serializeSubscription(
        this.subscription,
      );

      // Send subscription to server
      await this.sendSubscriptionToServer(serializedSubscription);

      return serializedSubscription;
    } catch (error) {
      console.error("Failed to subscribe to push notifications:", error);
      return null;
    }
  }

  /**
   * Unsubscribe from push notifications
   */
  async unsubscribe(): Promise<boolean> {
    if (!this.subscription) {
      return false;
    }

    try {
      const success = await this.subscription.unsubscribe();

      if (success) {
        // Remove subscription from server
        await this.removeSubscriptionFromServer();
        this.subscription = null;
      }

      return success;
    } catch (error) {
      console.error("Failed to unsubscribe from push notifications:", error);
      return false;
    }
  }

  /**
   * Check if user is subscribed
   */
  async isSubscribed(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      this.subscription = await this.registration.pushManager.getSubscription();
      return this.subscription !== null;
    } catch (error) {
      console.error("Failed to check subscription status:", error);
      return false;
    }
  }

  /**
   * Show local notification
   */
  async showNotification(payload: NotificationPayload): Promise<void> {
    if (!this.registration || this.permission !== "granted") {
      console.warn("Cannot show notification: not granted or no registration");
      return;
    }

    try {
      const options: any = {
        body: payload.body,
        icon: payload.icon || PUSH_CONFIG.DEFAULT_OPTIONS.icon,
        badge: payload.badge || PUSH_CONFIG.DEFAULT_OPTIONS.badge,
        tag: payload.tag || "default",
        data: {
          url: payload.url || "/",
          timestamp: payload.timestamp || Date.now(),
          ...payload.data,
        },
        vibrate: payload.vibrate || PUSH_CONFIG.DEFAULT_OPTIONS.vibrate,
        requireInteraction:
          payload.requireInteraction ??
          PUSH_CONFIG.DEFAULT_OPTIONS.requireInteraction,
        silent: payload.silent ?? false,
        renotify: payload.renotify ?? false,
      };

      // Add actions if supported
      if (payload.actions || PUSH_CONFIG.DEFAULT_OPTIONS.actions) {
        options.actions =
          payload.actions || PUSH_CONFIG.DEFAULT_OPTIONS.actions;
      }

      await this.registration.showNotification(payload.title, options);
    } catch (error) {
      console.error("Failed to show notification:", error);
    }
  }

  /**
   * Get notification status and capabilities
   */
  getStatus(): {
    isSupported: boolean;
    permission: NotificationPermission;
    isSubscribed: boolean;
    capabilities: {
      actions: boolean;
      badge: boolean;
      vibrate: boolean;
      persistent: boolean;
    };
  } {
    return {
      isSupported: this.isSupported,
      permission: this.permission,
      isSubscribed: this.subscription !== null,
      capabilities: {
        actions: "actions" in Notification.prototype,
        badge: "badge" in Notification.prototype,
        vibrate: "vibrate" in navigator,
        persistent: "serviceWorker" in navigator,
      },
    };
  }

  /**
   * Predefined notification types for MH Construction
   */
  async notifyEstimateReady(estimate: {
    id: string;
    type: string;
    total: number;
    clientName: string;
  }): Promise<void> {
    await this.showNotification({
      title: "Your Estimate is Ready! [ASSIGNMENT]",
      body: `${estimate.type} estimate for ${estimate.clientName}: $${estimate.total.toLocaleString()}`,
      tag: `estimate-${estimate.id}`,
      url: `/estimator/results/${estimate.id}`,
      icon: "/icons/icon-192x192.png",
      badge: "/icons/badge-estimate.png",
      vibrate: [200, 100, 200],
      requireInteraction: true,
      actions: [
        {
          action: "view",
          title: "View Estimate",
          icon: "/icons/action-view.png",
        },
        {
          action: "share",
          title: "Share",
          icon: "/icons/action-share.png",
        },
      ],
      data: {
        type: "estimate",
        estimateId: estimate.id,
        total: estimate.total,
      },
    });
  }

  async notifyAppointmentReminder(appointment: {
    id: string;
    date: string;
    time: string;
    service: string;
    address: string;
  }): Promise<void> {
    await this.showNotification({
      title: "Upcoming Appointment Reminder [EVENT]",
      body: `${appointment.service} scheduled for ${appointment.date} at ${appointment.time}`,
      tag: `appointment-${appointment.id}`,
      url: `/appointments/${appointment.id}`,
      vibrate: [100, 50, 100, 50, 100],
      requireInteraction: true,
      actions: [
        {
          action: "confirm",
          title: "Confirm",
          icon: "/icons/action-confirm.png",
        },
        {
          action: "reschedule",
          title: "Reschedule",
          icon: "/icons/action-reschedule.png",
        },
      ],
      data: {
        type: "appointment",
        appointmentId: appointment.id,
        date: appointment.date,
        time: appointment.time,
      },
    });
  }

  async notifyProjectUpdate(project: {
    id: string;
    title: string;
    status: string;
    progress: number;
    message: string;
  }): Promise<void> {
    await this.showNotification({
      title: `Project Update: ${project.title} [CONSTRUCTION]`,
      body: `${project.status} - ${project.progress}% complete. ${project.message}`,
      tag: `project-${project.id}`,
      url: `/projects/${project.id}`,
      vibrate: [150],
      actions: [
        {
          action: "view",
          title: "View Project",
          icon: "/icons/action-view.png",
        },
      ],
      data: {
        type: "project",
        projectId: project.id,
        status: project.status,
        progress: project.progress,
      },
    });
  }

  async notifyVeteranBenefit(benefit: {
    title: string;
    description: string;
    deadline?: string;
    amount?: number;
  }): Promise<void> {
    const body = benefit.deadline
      ? `${benefit.description} Deadline: ${benefit.deadline}`
      : benefit.description;

    await this.showNotification({
      title: `Veteran Benefit Available: ${benefit.title} [FLAG]`,
      body,
      tag: "veteran-benefit",
      url: "/veterans",
      vibrate: [200, 100, 200, 100, 200],
      requireInteraction: true,
      actions: [
        {
          action: "learn-more",
          title: "Learn More",
          icon: "/icons/action-info.png",
        },
        {
          action: "apply",
          title: "Apply Now",
          icon: "/icons/action-apply.png",
        },
      ],
      data: {
        type: "veteran-benefit",
        benefitTitle: benefit.title,
        amount: benefit.amount,
        deadline: benefit.deadline,
      },
    });
  }

  async notifyMaintenanceWindow(maintenance: {
    title: string;
    startTime: string;
    endTime: string;
    affectedServices: string[];
  }): Promise<void> {
    await this.showNotification({
      title: `Scheduled Maintenance: ${maintenance.title} [BUILD]`,
      body: `${maintenance.startTime} - ${maintenance.endTime}. Affected: ${maintenance.affectedServices.join(", ")}`,
      tag: "maintenance",
      url: "/status",
      vibrate: [100],
      silent: true,
      data: {
        type: "maintenance",
        startTime: maintenance.startTime,
        endTime: maintenance.endTime,
        services: maintenance.affectedServices,
      },
    });
  }

  /**
   * Private helper methods
   */
  private urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  private serializeSubscription(
    subscription: PushSubscription,
  ): NotificationSubscription {
    const keys = subscription.getKey("p256dh");
    const auth = subscription.getKey("auth");

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: keys ? this.arrayBufferToBase64(keys) : "",
        auth: auth ? this.arrayBufferToBase64(auth) : "",
      },
    };
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";

    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
  }

  private async sendSubscriptionToServer(
    subscription: NotificationSubscription,
  ): Promise<void> {
    try {
      await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        }),
      });
    } catch (error) {
      console.error("Failed to send subscription to server:", error);
    }
  }

  private async removeSubscriptionFromServer(): Promise<void> {
    try {
      await fetch("/api/notifications/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: this.subscription?.endpoint,
        }),
      });
    } catch (error) {
      console.error("Failed to remove subscription from server:", error);
    }
  }
}

// Export singleton instance
export const pushNotifications = PushNotificationManager.getInstance();

// React hook for using push notifications
export function usePushNotifications() {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeNotifications = async () => {
      setIsLoading(true);

      await pushNotifications.initialize();
      const status = pushNotifications.getStatus();

      setIsSupported(status.isSupported);
      setPermission(status.permission);
      setIsSubscribed(status.isSubscribed);
      setIsLoading(false);
    };

    initializeNotifications();
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    setIsLoading(true);
    const newPermission = await pushNotifications.requestPermission();
    setPermission(newPermission);
    setIsLoading(false);
    return newPermission === "granted";
  };

  const subscribe = async (): Promise<boolean> => {
    setIsLoading(true);
    const subscription = await pushNotifications.subscribe();
    setIsSubscribed(subscription !== null);
    setIsLoading(false);
    return subscription !== null;
  };

  const unsubscribe = async (): Promise<boolean> => {
    setIsLoading(true);
    const success = await pushNotifications.unsubscribe();
    setIsSubscribed(!success);
    setIsLoading(false);
    return success;
  };

  return {
    isSupported,
    permission,
    isSubscribed,
    isLoading,
    requestPermission,
    subscribe,
    unsubscribe,
    showNotification:
      pushNotifications.showNotification.bind(pushNotifications),
    notifyEstimateReady:
      pushNotifications.notifyEstimateReady.bind(pushNotifications),
    notifyAppointmentReminder:
      pushNotifications.notifyAppointmentReminder.bind(pushNotifications),
    notifyProjectUpdate:
      pushNotifications.notifyProjectUpdate.bind(pushNotifications),
    notifyVeteranBenefit:
      pushNotifications.notifyVeteranBenefit.bind(pushNotifications),
  };
}
