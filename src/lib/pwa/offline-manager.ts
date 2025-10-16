/**
 * Offline Storage and Sync Manager for MH Construction PWA
 * Handles offline data storage, background sync, and conflict resolution
 */

"use client";

import { OFFLINE_CONFIG, BACKGROUND_SYNC_CONFIG } from "@/lib/pwa/config";

export interface StorageItem<T = any> {
  id: string;
  data: T;
  timestamp: number;
  version: number;
  syncStatus: "pending" | "synced" | "failed" | "conflict";
  lastModified: number;
  userId?: string;
}

export interface SyncResult {
  success: boolean;
  conflicts: Array<{
    id: string;
    local: StorageItem;
    remote: StorageItem;
    resolution?: "local" | "remote" | "merge";
  }>;
  synced: string[];
  failed: string[];
}

/**
 * IndexedDB wrapper for offline storage
 */
export class OfflineStorage {
  private dbName: string = "MHConstructionDB";
  private version: number = 1;
  private db: IDBDatabase | null = null;

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Estimates store
        if (!db.objectStoreNames.contains("estimates")) {
          const estimatesStore = db.createObjectStore("estimates", {
            keyPath: "id",
          });
          estimatesStore.createIndex("timestamp", "timestamp");
          estimatesStore.createIndex("syncStatus", "syncStatus");
          estimatesStore.createIndex("userId", "userId");
        }

        // Contact forms store
        if (!db.objectStoreNames.contains("contactForms")) {
          const contactStore = db.createObjectStore("contactForms", {
            keyPath: "id",
          });
          contactStore.createIndex("timestamp", "timestamp");
          contactStore.createIndex("syncStatus", "syncStatus");
        }

        // Projects store
        if (!db.objectStoreNames.contains("projects")) {
          const projectsStore = db.createObjectStore("projects", {
            keyPath: "id",
          });
          projectsStore.createIndex("timestamp", "timestamp");
          projectsStore.createIndex("syncStatus", "syncStatus");
          projectsStore.createIndex("userId", "userId");
        }

        // Analytics store
        if (!db.objectStoreNames.contains("analytics")) {
          const analyticsStore = db.createObjectStore("analytics", {
            keyPath: "id",
          });
          analyticsStore.createIndex("timestamp", "timestamp");
          analyticsStore.createIndex("syncStatus", "syncStatus");
          analyticsStore.createIndex("eventType", "data.eventType");
        }

        // User preferences store
        if (!db.objectStoreNames.contains("preferences")) {
          const preferencesStore = db.createObjectStore("preferences", {
            keyPath: "id",
          });
          preferencesStore.createIndex("timestamp", "timestamp");
          preferencesStore.createIndex("userId", "userId");
        }

        // Cache metadata store
        if (!db.objectStoreNames.contains("cacheMetadata")) {
          const cacheStore = db.createObjectStore("cacheMetadata", {
            keyPath: "url",
          });
          cacheStore.createIndex("timestamp", "timestamp");
          cacheStore.createIndex("expiresAt", "expiresAt");
        }
      };
    });
  }

  async store<T>(storeName: string, item: StorageItem<T>): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async get<T>(storeName: string, id: string): Promise<StorageItem<T> | null> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAll<T>(
    storeName: string,
    filter?: {
      syncStatus?: StorageItem["syncStatus"];
      userId?: string;
      since?: number;
    },
  ): Promise<StorageItem<T>[]> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        let results = request.result as StorageItem<T>[];

        if (filter) {
          results = results.filter((item) => {
            if (filter.syncStatus && item.syncStatus !== filter.syncStatus)
              return false;
            if (filter.userId && item.userId !== filter.userId) return false;
            if (filter.since && item.timestamp < filter.since) return false;
            return true;
          });
        }

        resolve(results);
      };
    });
  }

  async delete(storeName: string, id: string): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(storeName: string): Promise<void> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async cleanup(storeName: string, olderThan: number): Promise<number> {
    if (!this.db) throw new Error("Database not initialized");

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      const index = store.index("timestamp");
      const range = IDBKeyRange.upperBound(olderThan);
      const request = index.openCursor(range);

      let deletedCount = 0;

      request.onerror = () => reject(request.error);
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          cursor.delete();
          deletedCount++;
          cursor.continue();
        } else {
          resolve(deletedCount);
        }
      };
    });
  }
}

/**
 * Background sync manager
 */
export class BackgroundSyncManager {
  private storage: OfflineStorage;
  private isOnline: boolean = navigator.onLine;

  constructor(storage: OfflineStorage) {
    this.storage = storage;
    this.setupOnlineListener();
  }

  private setupOnlineListener(): void {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.syncAll();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  async queueForSync<T>(
    storeName: string,
    data: T,
    syncEndpoint: string,
    userId?: string,
  ): Promise<string> {
    const id = this.generateId();
    const item: StorageItem<T> = {
      id,
      data,
      timestamp: Date.now(),
      version: 1,
      syncStatus: "pending",
      lastModified: Date.now(),
      userId,
    };

    await this.storage.store(storeName, item);

    // Try immediate sync if online
    if (this.isOnline) {
      this.syncItem(storeName, id, syncEndpoint);
    } else {
      // Register for background sync
      this.registerBackgroundSync(storeName);
    }

    return id;
  }

  async syncAll(): Promise<SyncResult> {
    const results: SyncResult = {
      success: true,
      conflicts: [],
      synced: [],
      failed: [],
    };

    // Sync estimates
    const estimateResult = await this.syncStore(
      "estimates",
      "/api/estimates/sync",
    );
    this.mergeResults(results, estimateResult);

    // Sync contact forms
    const contactResult = await this.syncStore(
      "contactForms",
      "/api/contact/sync",
    );
    this.mergeResults(results, contactResult);

    // Sync analytics
    const analyticsResult = await this.syncStore(
      "analytics",
      "/api/analytics/sync",
    );
    this.mergeResults(results, analyticsResult);

    // Sync projects
    const projectsResult = await this.syncStore(
      "projects",
      "/api/projects/sync",
    );
    this.mergeResults(results, projectsResult);

    results.success = results.failed.length === 0;

    return results;
  }

  private async syncStore(
    storeName: string,
    endpoint: string,
  ): Promise<SyncResult> {
    const pendingItems = await this.storage.getAll(storeName, {
      syncStatus: "pending",
    });
    const results: SyncResult = {
      success: true,
      conflicts: [],
      synced: [],
      failed: [],
    };

    for (const item of pendingItems) {
      try {
        const syncResult = await this.syncItem(storeName, item.id, endpoint);
        if (syncResult.success) {
          results.synced.push(item.id);
        } else if (syncResult.conflict) {
          results.conflicts.push(syncResult.conflict);
        } else {
          results.failed.push(item.id);
        }
      } catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error);
        results.failed.push(item.id);
      }
    }

    return results;
  }

  private async syncItem(
    storeName: string,
    itemId: string,
    endpoint: string,
  ): Promise<{
    success: boolean;
    conflict?: any;
  }> {
    const item = await this.storage.get(storeName, itemId);
    if (!item) return { success: false };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Sync-Version": item.version.toString(),
          "X-Last-Modified": item.lastModified.toString(),
        },
        body: JSON.stringify({
          id: item.id,
          data: item.data,
          version: item.version,
          lastModified: item.lastModified,
        }),
      });

      if (response.ok) {
        // Update sync status
        item.syncStatus = "synced";
        await this.storage.store(storeName, item);
        return { success: true };
      } else if (response.status === 409) {
        // Conflict - server has newer version
        const serverData = await response.json();
        const conflict = {
          id: item.id,
          local: item,
          remote: serverData,
        };

        // Mark as conflict for manual resolution
        item.syncStatus = "conflict";
        await this.storage.store(storeName, item);

        return { success: false, conflict };
      } else {
        // Other error
        item.syncStatus = "failed";
        await this.storage.store(storeName, item);
        return { success: false };
      }
    } catch (error) {
      // Network error
      item.syncStatus = "failed";
      await this.storage.store(storeName, item);
      return { success: false };
    }
  }

  private async registerBackgroundSync(storeName: string): Promise<void> {
    if (
      "serviceWorker" in navigator &&
      "sync" in window.ServiceWorkerRegistration.prototype
    ) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const syncConfig =
          BACKGROUND_SYNC_CONFIG[
            storeName.toUpperCase() as keyof typeof BACKGROUND_SYNC_CONFIG
          ];

        if (syncConfig && "sync" in registration) {
          await (registration as any).sync.register(syncConfig.tag);
        }
      } catch (error) {
        console.error("Failed to register background sync:", error);
      }
    }
  }

  private mergeResults(target: SyncResult, source: SyncResult): void {
    target.conflicts.push(...source.conflicts);
    target.synced.push(...source.synced);
    target.failed.push(...source.failed);
    target.success = target.success && source.success;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Conflict resolution utilities
 */
export class ConflictResolver {
  static resolveByTimestamp<T>(
    local: StorageItem<T>,
    remote: StorageItem<T>,
  ): StorageItem<T> {
    return local.lastModified > remote.lastModified ? local : remote;
  }

  static resolveByVersion<T>(
    local: StorageItem<T>,
    remote: StorageItem<T>,
  ): StorageItem<T> {
    return local.version > remote.version ? local : remote;
  }

  static mergeEstimates(local: StorageItem, remote: StorageItem): StorageItem {
    const merged = { ...local };
    const localData = local.data as any;
    const remoteData = remote.data as any;

    // Merge non-conflicting fields
    merged.data = {
      ...remoteData,
      ...localData,
      // Use server ID if available
      id: remoteData.id || localData.id,
      // Use latest version number
      version: Math.max(local.version, remote.version) + 1,
      // Merge arrays
      items: [...(remoteData.items || []), ...(localData.items || [])],
      // Use latest timestamp
      lastModified: Math.max(local.lastModified, remote.lastModified),
    };

    merged.version = merged.data.version;
    merged.lastModified = merged.data.lastModified;
    merged.syncStatus = "pending";

    return merged;
  }

  static mergeContactForms(
    local: StorageItem,
    remote: StorageItem,
  ): StorageItem {
    // Contact forms are typically not merged - use latest
    return local.lastModified > remote.lastModified ? local : remote;
  }
}

/**
 * Offline-first data manager
 */
export class OfflineDataManager {
  private storage: OfflineStorage;
  private syncManager: BackgroundSyncManager;
  private isInitialized: boolean = false;

  constructor() {
    this.storage = new OfflineStorage();
    this.syncManager = new BackgroundSyncManager(this.storage);
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await this.storage.initialize();
    this.isInitialized = true;

    // Setup periodic cleanup
    this.setupPeriodicCleanup();
  }

  async saveEstimate(estimate: any, userId?: string): Promise<string> {
    if (!this.isInitialized) await this.initialize();

    return this.syncManager.queueForSync(
      "estimates",
      estimate,
      "/api/estimates/submit",
      userId,
    );
  }

  async saveContactForm(form: any): Promise<string> {
    if (!this.isInitialized) await this.initialize();

    return this.syncManager.queueForSync(
      "contactForms",
      form,
      "/api/contact/submit",
    );
  }

  async trackAnalytics(event: any): Promise<string> {
    if (!this.isInitialized) await this.initialize();

    return this.syncManager.queueForSync(
      "analytics",
      event,
      "/api/analytics/track",
    );
  }

  async getEstimates(userId?: string): Promise<any[]> {
    if (!this.isInitialized) await this.initialize();

    const items = await this.storage.getAll("estimates", { userId });
    return items.map((item) => item.data);
  }

  async getContactForms(): Promise<any[]> {
    if (!this.isInitialized) await this.initialize();

    const items = await this.storage.getAll("contactForms");
    return items.map((item) => item.data);
  }

  async syncAll(): Promise<SyncResult> {
    if (!this.isInitialized) await this.initialize();

    return this.syncManager.syncAll();
  }

  async getPendingSync(): Promise<{
    estimates: number;
    contactForms: number;
    analytics: number;
    total: number;
  }> {
    if (!this.isInitialized) await this.initialize();

    const estimates = await this.storage.getAll("estimates", {
      syncStatus: "pending",
    });
    const contactForms = await this.storage.getAll("contactForms", {
      syncStatus: "pending",
    });
    const analytics = await this.storage.getAll("analytics", {
      syncStatus: "pending",
    });

    return {
      estimates: estimates.length,
      contactForms: contactForms.length,
      analytics: analytics.length,
      total: estimates.length + contactForms.length + analytics.length,
    };
  }

  private setupPeriodicCleanup(): void {
    // Clean up old data every 24 hours
    setInterval(
      async () => {
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

        try {
          await this.storage.cleanup("analytics", oneWeekAgo);
          await this.storage.cleanup("cacheMetadata", oneWeekAgo);
          console.log("Periodic cleanup completed");
        } catch (error) {
          console.error("Periodic cleanup failed:", error);
        }
      },
      24 * 60 * 60 * 1000,
    ); // 24 hours
  }
}

// Export singleton instance
export const offlineDataManager = new OfflineDataManager();
