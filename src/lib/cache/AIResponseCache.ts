/**
 * AI Response Caching System
 * Phase 5: Intelligent caching for AI responses and form data
 */

import { logger } from "@/lib/utils/logger";

export interface CacheEntry {
  key: string;
  response: string;
  timestamp: number;
  expiry: number;
}

export interface FormCache {
  formId: string;
  data: Record<string, any>;
  lastUpdated: number;
}

class AIResponseCache {
  private cache: Map<string, CacheEntry> = new Map();
  private formCache: Map<string, FormCache> = new Map();
  private readonly DEFAULT_EXPIRY = 5 * 60 * 1000; // 5 minutes
  private readonly FORM_EXPIRY = 30 * 60 * 1000; // 30 minutes

  constructor() {
    // Load from localStorage if available
    if (typeof window !== "undefined") {
      this.loadFromStorage();
      // Clean up expired entries every minute
      setInterval(() => this.cleanup(), 60000);
    }
  }

  /**
   * Cache an AI response
   */
  set(key: string, response: string, expiryMs?: number): void {
    const expiry = Date.now() + (expiryMs || this.DEFAULT_EXPIRY);
    const entry: CacheEntry = {
      key,
      response,
      timestamp: Date.now(),
      expiry,
    };

    this.cache.set(key, entry);
    this.saveToStorage();
  }

  /**
   * Get cached AI response
   */
  get(key: string): string | null {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check if expired
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      this.saveToStorage();
      return null;
    }

    return entry.response;
  }

  /**
   * Cache form data for persistence
   */
  setFormData(formId: string, data: Record<string, any>): void {
    const formEntry: FormCache = {
      formId,
      data,
      lastUpdated: Date.now(),
    };

    this.formCache.set(formId, formEntry);
    this.saveFormDataToStorage();
  }

  /**
   * Get cached form data
   */
  getFormData(formId: string): Record<string, any> | null {
    const formEntry = this.formCache.get(formId);

    if (!formEntry) return null;

    // Check if expired (30 minutes)
    if (Date.now() - formEntry.lastUpdated > this.FORM_EXPIRY) {
      this.formCache.delete(formId);
      this.saveFormDataToStorage();
      return null;
    }

    return formEntry.data;
  }

  /**
   * Clear specific cache entry
   */
  delete(key: string): void {
    this.cache.delete(key);
    this.saveToStorage();
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.formCache.clear();
    if (typeof window !== "undefined") {
      localStorage.removeItem("mh-ai-cache");
      localStorage.removeItem("mh-form-cache");
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const cacheKeys = Array.from(this.cache.keys());
    const formKeys = Array.from(this.formCache.keys());

    // Count hits and misses (simplified mock for now)
    const totalRequests = cacheKeys.length + formKeys.length;
    const hits = Math.floor(totalRequests * 0.7); // Mock 70% hit rate
    const misses = totalRequests - hits;

    return {
      hits,
      misses,
      size: this.cache.size,
      aiCacheSize: this.cache.size,
      formCacheSize: this.formCache.size,
      aiCacheKeys: cacheKeys,
      formCacheKeys: formKeys,
    };
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    let cleaned = false;

    // Clean AI cache
    const cacheKeys = Array.from(this.cache.keys());
    for (const key of cacheKeys) {
      const entry = this.cache.get(key);
      if (entry && now > entry.expiry) {
        this.cache.delete(key);
        cleaned = true;
      }
    }

    // Clean form cache
    const formKeys = Array.from(this.formCache.keys());
    for (const key of formKeys) {
      const entry = this.formCache.get(key);
      if (entry && now - entry.lastUpdated > this.FORM_EXPIRY) {
        this.formCache.delete(key);
        cleaned = true;
      }
    }

    if (cleaned) {
      this.saveToStorage();
      this.saveFormDataToStorage();
    }
  }

  /**
   * Save cache to localStorage
   */
  private saveToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const cacheData: [string, CacheEntry][] = [];
      const keys = Array.from(this.cache.keys());
      for (const key of keys) {
        const entry = this.cache.get(key);
        if (entry) {
          cacheData.push([key, entry]);
        }
      }
      localStorage.setItem("mh-ai-cache", JSON.stringify(cacheData));
    } catch (_error) {
      logger.warn("Failed to save AI cache to localStorage:", _error);
    }
  }

  /**
   * Save form cache to localStorage
   */
  private saveFormDataToStorage(): void {
    if (typeof window === "undefined") return;

    try {
      const formCacheData: [string, FormCache][] = [];
      const keys = Array.from(this.formCache.keys());
      for (const key of keys) {
        const entry = this.formCache.get(key);
        if (entry) {
          formCacheData.push([key, entry]);
        }
      }
      localStorage.setItem("mh-form-cache", JSON.stringify(formCacheData));
    } catch (_error) {
      logger.warn("Failed to save form cache to localStorage:", _error);
    }
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage(): void {
    try {
      // Load AI cache
      const aiCacheData = localStorage.getItem("mh-ai-cache");
      if (aiCacheData) {
        const entries = JSON.parse(aiCacheData) as [string, CacheEntry][];
        this.cache = new Map(entries);
      }

      // Load form cache
      const formCacheData = localStorage.getItem("mh-form-cache");
      if (formCacheData) {
        const entries = JSON.parse(formCacheData) as [string, FormCache][];
        this.formCache = new Map(entries);
      }

      // Clean up expired entries on load
      this.cleanup();
    } catch (_error) {
      logger.warn("Failed to load cache from localStorage:", _error);
      this.clear();
    }
  }
}

// Singleton instance
export const aiCache = new AIResponseCache();

// Utility functions for easy use
export const cacheAIResponse = (
  key: string,
  response: string,
  expiryMs?: number,
) => {
  aiCache.set(key, response, expiryMs);
};

export const getCachedAIResponse = (key: string): string | null => {
  return aiCache.get(key);
};

export const cacheFormData = (formId: string, data: Record<string, any>) => {
  aiCache.setFormData(formId, data);
};

export const getCachedFormData = (
  formId: string,
): Record<string, any> | null => {
  return aiCache.getFormData(formId);
};

// Generate cache key for AI requests
export const generateCacheKey = (
  type: string,
  input: string | object,
): string => {
  const inputString = typeof input === "string" ? input : JSON.stringify(input);
  const hash = btoa(inputString)
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 16);
  return `${type}-${hash}`;
};
