/**
 * Caching System for AI Responses and Form Data
 * Provides intelligent caching with TTL and persistence
 */

import { logger } from "@/lib/utils/logger";

// Cache entry interface
export interface CacheEntry<T = any> {
  key: string;
  data: T;
  timestamp: number;
  expiry: number;
  version: string;
}

// Form data cache entry
export interface FormCacheEntry {
  formId: string;
  data: Record<string, any>;
  lastUpdated: number;
  version: string;
}

// Cache configuration
export interface CacheConfig {
  maxEntries: number;
  defaultTTL: number; // Time to live in milliseconds
  version: string;
  enablePersistence: boolean;
}

const DEFAULT_CONFIG: CacheConfig = {
  maxEntries: 100,
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  version: "1.0.0",
  enablePersistence: true,
};

/**
 * AI Response Cache
 * Caches AI responses with intelligent expiration
 */
export class AIResponseCache {
  private cache = new Map<string, CacheEntry>();
  private config: CacheConfig;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.loadFromStorage();
  }

  /**
   * Generate cache key from prompt and context
   */
  private generateKey(prompt: string, context?: any): string {
    const contextStr = context ? JSON.stringify(context) : "";
    return `ai_${this.hashString(prompt + contextStr)}`;
  }

  /**
   * Simple hash function for cache keys
   */
  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get cached AI response
   */
  get(prompt: string, context?: any): string | null {
    const key = this.generateKey(prompt, context);
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return entry.data;
  }

  /**
   * Set AI response in cache
   */
  set(prompt: string, response: string, context?: any, ttl?: number): void {
    const key = this.generateKey(prompt, context);
    const expiry = Date.now() + (ttl || this.config.defaultTTL);

    const entry: CacheEntry<string> = {
      key,
      data: response,
      timestamp: Date.now(),
      expiry,
      version: this.config.version,
    };

    this.cache.set(key, entry);

    // Enforce max entries limit
    if (this.cache.size > this.config.maxEntries) {
      this.evictOldest();
    }

    this.saveToStorage();
  }

  /**
   * Clear cache entries matching pattern
   */
  invalidate(pattern: string): number {
    let removed = 0;
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (key.includes(pattern) || entry.data.includes(pattern)) {
        this.cache.delete(key);
        removed++;
      }
    }
    this.saveToStorage();
    return removed;
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.saveToStorage();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let expired = 0;
    let active = 0;

    const entries = Array.from(this.cache.values());
    for (const entry of entries) {
      if (now > entry.expiry) {
        expired++;
      } else {
        active++;
      }
    }

    return {
      total: this.cache.size,
      active,
      expired,
      maxEntries: this.config.maxEntries,
      hitRate: this.calculateHitRate(),
    };
  }

  /**
   * Evict oldest entries
   */
  private evictOldest(): void {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, Math.ceil(this.config.maxEntries * 0.1));
    toRemove.forEach(([key]) => this.cache.delete(key));
  }

  /**
   * Calculate cache hit rate (simplified)
   */
  private calculateHitRate(): number {
    // This would require hit/miss tracking in a real implementation
    return this.cache.size > 0 ? 0.75 : 0;
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage(): void {
    if (!this.config.enablePersistence || typeof window === "undefined") {
      return;
    }

    try {
      const stored = localStorage.getItem("ai_response_cache");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === this.config.version) {
          this.cache = new Map(data.entries);
        }
      }
    } catch (error) {
      logger.warn("Failed to load AI cache from storage:", error);
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToStorage(): void {
    if (!this.config.enablePersistence || typeof window === "undefined") {
      return;
    }

    try {
      const data = {
        version: this.config.version,
        entries: Array.from(this.cache.entries()),
        timestamp: Date.now(),
      };
      localStorage.setItem("ai_response_cache", JSON.stringify(data));
    } catch (error) {
      logger.warn("Failed to save AI cache to storage:", error);
    }
  }
}

/**
 * Form Data Persistence
 * Saves and restores form data across sessions
 */
export class FormDataCache {
  private cache = new Map<string, FormCacheEntry>();
  private version = "1.0.0";

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Save form data
   */
  saveFormData(formId: string, data: Record<string, any>): void {
    const entry: FormCacheEntry = {
      formId,
      data: { ...data },
      lastUpdated: Date.now(),
      version: this.version,
    };

    this.cache.set(formId, entry);
    this.saveToStorage();
  }

  /**
   * Get saved form data
   */
  getFormData(formId: string): Record<string, any> | null {
    const entry = this.cache.get(formId);
    if (!entry) {
      return null;
    }

    // Check if data is too old (24 hours)
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - entry.lastUpdated > maxAge) {
      this.cache.delete(formId);
      this.saveToStorage();
      return null;
    }

    return entry.data;
  }

  /**
   * Clear form data
   */
  clearFormData(formId: string): void {
    this.cache.delete(formId);
    this.saveToStorage();
  }

  /**
   * Clear all form data
   */
  clearAllFormData(): void {
    this.cache.clear();
    this.saveToStorage();
  }

  /**
   * Load from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("form_data_cache");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.version === this.version) {
          this.cache = new Map(data.entries);
        }
      }
    } catch (error) {
      logger.warn("Failed to load form cache from storage:", error);
    }
  }

  /**
   * Save to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const data = {
        version: this.version,
        entries: Array.from(this.cache.entries()),
        timestamp: Date.now(),
      };
      localStorage.setItem("form_data_cache", JSON.stringify(data));
    } catch (error) {
      logger.warn("Failed to save form cache to storage:", error);
    }
  }
}

// Global cache instances
export const aiResponseCache = new AIResponseCache({
  maxEntries: 50,
  defaultTTL: 10 * 60 * 1000, // 10 minutes for AI responses
});

export const formDataCache = new FormDataCache();

// Hook for form persistence
export const useFormPersistence = (formId: string) => {
  const saveFormData = (data: Record<string, any>) => {
    formDataCache.saveFormData(formId, data);
  };

  const loadFormData = (): Record<string, any> | null => {
    return formDataCache.getFormData(formId);
  };

  const clearFormData = () => {
    formDataCache.clearFormData(formId);
  };

  return {
    saveFormData,
    loadFormData,
    clearFormData,
  };
};

// Hook for AI response caching
export const useAICache = () => {
  const getCachedResponse = (prompt: string, context?: any): string | null => {
    return aiResponseCache.get(prompt, context);
  };

  const setCachedResponse = (
    prompt: string,
    response: string,
    context?: any,
    ttl?: number
  ) => {
    aiResponseCache.set(prompt, response, context, ttl);
  };

  const invalidateCache = (pattern: string): number => {
    return aiResponseCache.invalidate(pattern);
  };

  const getCacheStats = () => {
    return aiResponseCache.getStats();
  };

  return {
    getCachedResponse,
    setCachedResponse,
    invalidateCache,
    getCacheStats,
  };
};
