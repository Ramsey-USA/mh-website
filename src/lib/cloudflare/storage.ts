// Cloudflare storage utilities for KV and D1 database
// Cloudflare storage utilities for D1, KV, and R2

// Type definitions for Cloudflare Workers
type KVNamespace = any;
type D1Database = any;

interface CloudflareEnv {
  CACHE?: KVNamespace;
  ANALYTICS?: KVNamespace;
  DB?: D1Database;
}

/**
 * Generic storage interface for Cloudflare KV
 */
export class CloudflareKVStorage {
  private kv: KVNamespace | null = null;

  constructor(namespace?: KVNamespace) {
    this.kv = namespace || null;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.kv) {
      console.warn("KV namespace not initialized");
      return null;
    }
    try {
      const value = await this.kv.get(key, "json");
      return value as T;
    } catch (error) {
      console.error("KV get error:", error);
      return null;
    }
  }

  async set<T>(
    key: string,
    value: T,
    expirationTtl?: number,
  ): Promise<boolean> {
    if (!this.kv) {
      console.warn("KV namespace not initialized");
      return false;
    }
    try {
      await this.kv.put(key, JSON.stringify(value), { expirationTtl });
      return true;
    } catch (error) {
      console.error("KV set error:", error);
      return false;
    }
  }

  async delete(key: string): Promise<boolean> {
    if (!this.kv) {
      console.warn("KV namespace not initialized");
      return false;
    }
    try {
      await this.kv.delete(key);
      return true;
    } catch (error) {
      console.error("KV delete error:", error);
      return false;
    }
  }

  async list(prefix?: string): Promise<string[]> {
    if (!this.kv) {
      console.warn("KV namespace not initialized");
      return [];
    }
    try {
      const result = await this.kv.list({ prefix });
      return result.keys.map((k: any) => k.name);
    } catch (error) {
      console.error("KV list error:", error);
      return [];
    }
  }
}

/**
 * Database interface for Cloudflare D1
 */
export class CloudflareD1Database {
  private db: D1Database | null = null;

  constructor(database?: D1Database) {
    this.db = database || null;
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    if (!this.db) {
      console.warn("D1 database not initialized");
      return [];
    }
    try {
      const result = await this.db
        .prepare(sql)
        .bind(...(params || []))
        .all();
      return result.results as T[];
    } catch (error) {
      console.error("D1 query error:", error);
      return [];
    }
  }

  async execute(sql: string, params?: any[]): Promise<boolean> {
    if (!this.db) {
      console.warn("D1 database not initialized");
      return false;
    }
    try {
      await this.db
        .prepare(sql)
        .bind(...(params || []))
        .run();
      return true;
    } catch (error) {
      console.error("D1 execute error:", error);
      return false;
    }
  }

  async batch(statements: { sql: string; params?: any[] }[]): Promise<boolean> {
    if (!this.db) {
      console.warn("D1 database not initialized");
      return false;
    }
    try {
      const prepared = statements.map((stmt) =>
        this.db!.prepare(stmt.sql).bind(...(stmt.params || [])),
      );
      await this.db.batch(prepared);
      return true;
    } catch (error) {
      console.error("D1 batch error:", error);
      return false;
    }
  }
}

/**
 * Consultation service using Cloudflare storage
 */
export const consultationService = {
  async create(data: any) {
    // In a real implementation, this would call an API route
    // that has access to Cloudflare D1/KV
    const response = await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async get(id: string) {
    const response = await fetch(`/api/consultations/${id}`);
    return response.json();
  },

  async list() {
    const response = await fetch("/api/consultations");
    return response.json();
  },

  async update(id: string, data: any) {
    const response = await fetch(`/api/consultations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`/api/consultations/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },
};

/**
 * Local storage fallback for client-side development
 */
export const localStorageService = {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): boolean {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  delete(key: string): boolean {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
};
