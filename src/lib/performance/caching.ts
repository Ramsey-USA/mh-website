/**
 * Advanced Caching Service
 * Multi-level caching with Redis, memory, and browser storage
 */

import { logger } from "@/lib/utils/logger";
import { queryOptimizer } from "./performance-manager";

export interface CacheConfig {
  ttl: number;
  version: string;
  tags?: string[];
  priority?: "low" | "medium" | "high";
  storage?: "memory" | "session" | "local" | "indexeddb";
}

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  version: string;
  tags: string[];
  accessCount: number;
  lastAccessed: number;
  size: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  totalSize: number;
  itemCount: number;
  hitRate: number;
}

class CacheManager {
  private static instance: CacheManager;
  private memoryCache = new Map<string, CacheEntry>();
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    totalSize: 0,
    itemCount: 0,
    hitRate: 0,
  };
  private maxMemorySize = 50 * 1024 * 1024; // 50MB
  private maxItems = 10000;

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private constructor() {
    // Cleanup expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  async get<T>(key: string, version: string = "1.0"): Promise<T | null> {
    // Try memory cache first
    const memoryEntry = this.getFromMemory<T>(key, version);
    if (memoryEntry) {
      this.recordHit();
      return memoryEntry;
    }

    // Try browser storage
    const browserEntry = await this.getFromBrowser<T>(key, version);
    if (browserEntry) {
      // Store in memory for faster access
      this.setInMemory(key, browserEntry, {
        ttl: browserEntry.ttl - (Date.now() - browserEntry.timestamp),
        version,
        tags: browserEntry.tags,
      });
      this.recordHit();
      return browserEntry.data;
    }

    this.recordMiss();
    return null;
  }

  async set<T>(
    key: string,
    data: T,
    config: CacheConfig = { ttl: 300000, version: "1.0" },
  ): Promise<void> {
    const {
      ttl,
      version,
      tags = [],
      priority = "medium",
      storage = "memory",
    } = config;

    // Always store in memory for fastest access
    this.setInMemory(key, data, config);

    // Also store in browser storage if requested
    if (storage !== "memory") {
      await this.setInBrowser(key, data, config, storage);
    }
  }

  private getFromMemory<T>(key: string, version: string): T | null {
    const entry = this.memoryCache.get(key);
    if (!entry) return null;

    // Check expiration
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.memoryCache.delete(key);
      this.stats.evictions++;
      this.updateStats();
      return null;
    }

    // Check version
    if (entry.version !== version) {
      this.memoryCache.delete(key);
      return null;
    }

    // Update access info
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    return entry.data as T;
  }

  private setInMemory<T>(key: string, data: T, config: CacheConfig): void {
    const size = this.estimateSize(data);

    // Check if we need to evict items
    this.ensureCapacity(size);

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: config.ttl,
      version: config.version,
      tags: config.tags || [],
      accessCount: 1,
      lastAccessed: Date.now(),
      size,
    };

    this.memoryCache.set(key, entry);
    this.stats.totalSize += size;
    this.stats.itemCount++;
    this.updateStats();
  }

  private async getFromBrowser<T>(
    key: string,
    version: string,
  ): Promise<CacheEntry<T> | null> {
    if (typeof window === "undefined") return null;

    try {
      // Try localStorage first
      const localData = localStorage.getItem(`cache_${key}`);
      if (localData) {
        const entry: CacheEntry<T> = JSON.parse(localData);
        if (
          entry.version === version &&
          Date.now() - entry.timestamp <= entry.ttl
        ) {
          return entry;
        } else {
          localStorage.removeItem(`cache_${key}`);
        }
      }

      // Try sessionStorage
      const sessionData = sessionStorage.getItem(`cache_${key}`);
      if (sessionData) {
        const entry: CacheEntry<T> = JSON.parse(sessionData);
        if (
          entry.version === version &&
          Date.now() - entry.timestamp <= entry.ttl
        ) {
          return entry;
        } else {
          sessionStorage.removeItem(`cache_${key}`);
        }
      }

      // Try IndexedDB for larger items
      const idbEntry = await this.getFromIndexedDB<T>(key, version);
      if (idbEntry) return idbEntry;
    } catch (error) {
      logger.warn("Browser cache read error:", error);
    }

    return null;
  }

  private async setInBrowser<T>(
    key: string,
    data: T,
    config: CacheConfig,
    storage: "session" | "local" | "indexeddb",
  ): Promise<void> {
    if (typeof window === "undefined") return;

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: config.ttl,
      version: config.version,
      tags: config.tags || [],
      accessCount: 1,
      lastAccessed: Date.now(),
      size: this.estimateSize(data),
    };

    try {
      const serialized = JSON.stringify(entry);

      switch (storage) {
        case "local":
          localStorage.setItem(`cache_${key}`, serialized);
          break;
        case "session":
          sessionStorage.setItem(`cache_${key}`, serialized);
          break;
        case "indexeddb":
          await this.setInIndexedDB(key, entry);
          break;
      }
    } catch (error) {
      logger.warn("Browser cache write error:", error);
    }
  }

  private async getFromIndexedDB<T>(
    key: string,
    version: string,
  ): Promise<CacheEntry<T> | null> {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }

      const request = indexedDB.open("PerformanceCache", 1);

      request.onerror = () => resolve(null);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["cache"], "readonly");
        const store = transaction.objectStore("cache");
        const getRequest = store.get(key);

        getRequest.onsuccess = () => {
          const entry = getRequest.result as CacheEntry<T>;
          if (
            entry &&
            entry.version === version &&
            Date.now() - entry.timestamp <= entry.ttl
          ) {
            resolve(entry);
          } else {
            if (entry) {
              // Remove expired entry
              const deleteTransaction = db.transaction(["cache"], "readwrite");
              const deleteStore = deleteTransaction.objectStore("cache");
              deleteStore.delete(key);
            }
            resolve(null);
          }
        };

        getRequest.onerror = () => resolve(null);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache");
        }
      };
    });
  }

  private async setInIndexedDB<T>(
    key: string,
    entry: CacheEntry<T>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        resolve();
        return;
      }

      const request = indexedDB.open("PerformanceCache", 1);

      request.onerror = () => reject(request.error);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(["cache"], "readwrite");
        const store = transaction.objectStore("cache");
        const putRequest = store.put(entry, key);

        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("cache")) {
          db.createObjectStore("cache");
        }
      };
    });
  }

  private ensureCapacity(newItemSize: number): void {
    // Check memory limits
    while (
      (this.stats.totalSize + newItemSize > this.maxMemorySize ||
        this.stats.itemCount >= this.maxItems) &&
      this.memoryCache.size > 0
    ) {
      this.evictLeastRecentlyUsed();
    }
  }

  private evictLeastRecentlyUsed(): void {
    let oldestKey = "";
    let oldestTime = Date.now();

    this.memoryCache.forEach((entry, key) => {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    });

    if (oldestKey) {
      const entry = this.memoryCache.get(oldestKey);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.stats.itemCount--;
        this.stats.evictions++;
      }
      this.memoryCache.delete(oldestKey);
    }
  }

  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.memoryCache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      const entry = this.memoryCache.get(key);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.stats.itemCount--;
        this.stats.evictions++;
      }
      this.memoryCache.delete(key);
    });

    this.updateStats();
  }

  private estimateSize(data: any): number {
    return new Blob([JSON.stringify(data)]).size;
  }

  private recordHit(): void {
    this.stats.hits++;
    this.updateStats();
  }

  private recordMiss(): void {
    this.stats.misses++;
    this.updateStats();
  }

  private updateStats(): void {
    const total = this.stats.hits + this.stats.misses;
    this.stats.hitRate = total > 0 ? (this.stats.hits / total) * 100 : 0;
  }

  // Tag-based invalidation
  async invalidateByTag(tag: string): Promise<void> {
    const keysToDelete: string[] = [];

    this.memoryCache.forEach((entry, key) => {
      if (entry.tags.includes(tag)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      const entry = this.memoryCache.get(key);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.stats.itemCount--;
      }
      this.memoryCache.delete(key);
    });

    // Also clear from browser storage
    if (typeof window !== "undefined") {
      // Clear localStorage
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cache_")) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || "{}");
            if (data.tags && data.tags.includes(tag)) {
              localStorage.removeItem(key);
            }
          } catch {}
        }
      });

      // Clear sessionStorage
      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("cache_")) {
          try {
            const data = JSON.parse(sessionStorage.getItem(key) || "{}");
            if (data.tags && data.tags.includes(tag)) {
              sessionStorage.removeItem(key);
            }
          } catch {}
        }
      });
    }

    this.updateStats();
  }

  getStats(): CacheStats {
    return { ...this.stats };
  }

  clear(): void {
    this.memoryCache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      totalSize: 0,
      itemCount: 0,
      hitRate: 0,
    };

    // Clear browser storage
    if (typeof window !== "undefined") {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("cache_")) {
          localStorage.removeItem(key);
        }
      });

      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("cache_")) {
          sessionStorage.removeItem(key);
        }
      });
    }
  }
}

// API Response Caching
export class APICache {
  private cacheManager = CacheManager.getInstance();

  async cachedFetch<T>(
    url: string,
    options: RequestInit & { cacheConfig?: CacheConfig } = {},
  ): Promise<T> {
    const { cacheConfig, ...fetchOptions } = options;
    const cacheKey = this.generateCacheKey(url, fetchOptions);

    // Try to get from cache first
    const cached = await this.cacheManager.get<T>(
      cacheKey,
      cacheConfig?.version || "1.0",
    );
    if (cached) {
      return cached;
    }

    // Fetch from network
    const startTime = performance.now();
    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();
      const fetchTime = performance.now() - startTime;

      // Cache the response
      await this.cacheManager.set(cacheKey, data, {
        ttl: 300000, // 5 minutes default
        version: "1.0",
        tags: ["api", this.extractDomainFromUrl(url)],
        ...cacheConfig,
      });

      // Record performance metric
      queryOptimizer.cacheQuery(
        `api_${cacheKey}`,
        () => Promise.resolve(data),
        cacheConfig?.ttl || 300000,
      );

      return data;
    } catch (error) {
      const fetchTime = performance.now() - startTime;
      logger.error(`API fetch failed for ${url}:`, error);
      throw error;
    }
  }

  private generateCacheKey(url: string, options: RequestInit): string {
    const sortedOptions = {
      method: options.method || "GET",
      headers: options.headers ? JSON.stringify(options.headers) : "",
      body: options.body || "",
    };

    return btoa(`${url}_${JSON.stringify(sortedOptions)}`).replace(
      /[/+=]/g,
      "_",
    );
  }

  private extractDomainFromUrl(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return "unknown";
    }
  }

  async invalidateAPI(pattern: string): Promise<void> {
    await this.cacheManager.invalidateByTag("api");
  }
}

// Database Query Caching
export class DatabaseCache {
  private cacheManager = CacheManager.getInstance();

  async cachedQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    options: {
      ttl?: number;
      version?: string;
      tags?: string[];
      dependencies?: string[];
    } = {},
  ): Promise<T> {
    const {
      ttl = 600000,
      version = "1.0",
      tags = ["database"],
      dependencies = [],
    } = options;

    // Generate cache key with dependencies
    const fullKey =
      dependencies.length > 0
        ? `${queryKey}_${dependencies.sort().join("_")}`
        : queryKey;

    // Try cache first
    const cached = await this.cacheManager.get<T>(fullKey, version);
    if (cached) {
      return cached;
    }

    // Execute query
    const result = await queryOptimizer.cacheQuery(fullKey, queryFn, ttl);

    // Cache the result
    await this.cacheManager.set(fullKey, result, {
      ttl,
      version,
      tags: [...tags, "database"],
    });

    return result;
  }

  async invalidateQuery(queryKey: string): Promise<void> {
    await this.cacheManager.invalidateByTag(queryKey);
  }

  async invalidateTable(tableName: string): Promise<void> {
    await this.cacheManager.invalidateByTag(`table_${tableName}`);
  }
}

// Export instances
export const cacheManager = CacheManager.getInstance();
export const apiCache = new APICache();
export const dbCache = new DatabaseCache();
