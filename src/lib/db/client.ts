/**
 * Cloudflare D1 Database Client
 *
 * Provides type-safe database access for Edge runtime with:
 * - Connection management
 * - Query helpers
 * - Error handling
 * - Type definitions
 */

import { logger } from "@/lib/utils/logger";

/**
 * D1 Database binding type
 * Available via Cloudflare Workers environment
 */
export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta: {
    duration: number;
    rows_read: number;
    rows_written: number;
  };
  error?: string;
}

export interface D1ExecResult {
  count: number;
  duration: number;
}

/**
 * Get D1 database instance from environment
 * For use in API routes running on Cloudflare Workers
 */
export function getDb(env: { DB?: D1Database }): D1Database {
  if (!env.DB) {
    throw new Error(
      "D1 database binding not found. Ensure DB is configured in wrangler.toml",
    );
  }
  return env.DB;
}

/**
 * Database query helper with error handling and logging
 */
export class DbClient {
  constructor(private db: D1Database) {}

  /**
   * Execute a SELECT query and return all results
   */
  async query<T = unknown>(sql: string, ...params: unknown[]): Promise<T[]> {
    try {
      const stmt = this.db.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await bound.all<T>();

      if (!result.success) {
        throw new Error(result.error || "Query failed");
      }

      logger.debug("Query executed", {
        sql,
        rowCount: result.results?.length || 0,
        duration: result.meta.duration,
      });

      return result.results || [];
    } catch (error) {
      logger.error("Database query error", error);
      throw error;
    }
  }

  /**
   * Execute a SELECT query and return first result
   */
  async queryOne<T = unknown>(
    sql: string,
    ...params: unknown[]
  ): Promise<T | null> {
    try {
      const stmt = this.db.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await bound.first<T>();

      logger.debug("Query one executed", { sql, found: !!result });

      return result;
    } catch (error) {
      logger.error("Database query one error", error);
      throw error;
    }
  }

  /**
   * Execute an INSERT, UPDATE, or DELETE query
   */
  async execute(
    sql: string,
    ...params: unknown[]
  ): Promise<{ success: boolean; rowsAffected: number }> {
    try {
      const stmt = this.db.prepare(sql);
      const bound = params.length > 0 ? stmt.bind(...params) : stmt;
      const result = await bound.run();

      logger.debug("Execute completed", {
        sql,
        rowsAffected: result.meta.rows_written,
        duration: result.meta.duration,
      });

      return {
        success: result.success,
        rowsAffected: result.meta.rows_written,
      };
    } catch (error) {
      logger.error("Database execute error", error);
      throw error;
    }
  }

  /**
   * Execute multiple statements in a transaction
   */
  async batch(
    statements: { sql: string; params?: unknown[] }[],
  ): Promise<void> {
    try {
      const prepared = statements.map(({ sql, params = [] }) => {
        const stmt = this.db.prepare(sql);
        return params.length > 0 ? stmt.bind(...params) : stmt;
      });

      const results = await this.db.batch(prepared);

      const failed = results.find((r) => !r.success);
      if (failed) {
        throw new Error(failed.error || "Batch operation failed");
      }

      logger.debug("Batch executed", {
        count: statements.length,
        totalRowsWritten: results.reduce(
          (sum, r) => sum + r.meta.rows_written,
          0,
        ),
      });
    } catch (error) {
      logger.error("Database batch error", error);
      throw error;
    }
  }

  /**
   * Insert a record and return the inserted ID
   */
  async insert(table: string, data: Record<string, unknown>): Promise<string> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const sql = `
      INSERT INTO ${table} (${keys.join(", ")})
      VALUES (${placeholders})
    `;

    // Generate UUID for id if not provided
    const id = (data.id as string) || crypto.randomUUID();
    const params = keys.map((key) => (key === "id" ? id : data[key]));

    await this.execute(sql, ...params);
    return id;
  }

  /**
   * Update a record by ID
   */
  async update(
    table: string,
    id: string,
    data: Record<string, unknown>,
  ): Promise<boolean> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const sets = keys.map((key) => `${key} = ?`).join(", ");

    const sql = `
      UPDATE ${table}
      SET ${sets}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const result = await this.execute(sql, ...values, id);
    return result.rowsAffected > 0;
  }

  /**
   * Delete a record by ID
   */
  async delete(table: string, id: string): Promise<boolean> {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const result = await this.execute(sql, id);
    return result.rowsAffected > 0;
  }

  /**
   * Check if a record exists by ID
   */
  async exists(table: string, id: string): Promise<boolean> {
    const sql = `SELECT 1 FROM ${table} WHERE id = ? LIMIT 1`;
    const result = await this.queryOne(sql, id);
    return result !== null;
  }

  /**
   * Count records in a table with optional WHERE clause
   */
  async count(
    table: string,
    where?: { column: string; value: unknown },
  ): Promise<number> {
    let sql = `SELECT COUNT(*) as count FROM ${table}`;
    const params: unknown[] = [];

    if (where) {
      sql += ` WHERE ${where.column} = ?`;
      params.push(where.value);
    }

    const result = await this.queryOne<{ count: number }>(sql, ...params);
    return result?.count || 0;
  }
}

/**
 * Create a database client instance
 * For use in API routes with access to Cloudflare Workers environment
 */
export function createDbClient(env: { DB?: D1Database }): DbClient {
  const db = getDb(env);
  return new DbClient(db);
}

/**
 * Type-safe database models
 */
export interface Consultation {
  id: string;
  client_name: string;
  email: string;
  phone?: string;
  project_type: string;
  project_description?: string;
  location?: string;
  budget?: string;
  selected_date: string;
  selected_time: string;
  additional_notes?: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  metadata?: string; // JSON string
}

export interface JobApplication {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  position: string;
  experience: string;
  availability?: string;
  cover_letter?: string;
  resume_url?: string;
  veteran_status?: string;
  referral_source?: string;
  status: "new" | "reviewing" | "interviewed" | "hired" | "rejected";
  created_at: string;
  updated_at: string;
  metadata?: string; // JSON string
}

export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  project_type?: string;
  project_location?: string;
  budget?: string;
  timeline?: string;
  message: string;
  urgency: "low" | "medium" | "high";
  preferred_contact: "email" | "phone" | "either";
  status: "new" | "in_progress" | "resolved" | "closed";
  created_at: string;
  updated_at: string;
  metadata?: string; // JSON string
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: "user" | "admin" | "manager";
  first_name?: string;
  last_name?: string;
  phone?: string;
  veteran_status?: string;
  is_active: number; // 0 or 1 (SQLite boolean)
  email_verified: number; // 0 or 1
  last_login?: string;
  created_at: string;
  updated_at: string;
  metadata?: string; // JSON string
}

export interface Session {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  created_at: string;
  ip_address?: string;
  user_agent?: string;
}
