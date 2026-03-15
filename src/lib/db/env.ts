/**
 * Cloudflare Environment Access for Next.js
 *
 * Helper to access Cloudflare Workers bindings (D1, KV, R2) from Next.js API routes
 * when deployed to Cloudflare Pages via @opennextjs/cloudflare.
 *
 * Returns null when called outside of a Cloudflare Workers context (e.g. local dev).
 */

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { logger } from "@/lib/utils/logger";
import type { D1Database } from "@/lib/db/client";

/**
 * Get Cloudflare D1 database binding
 * Returns null in local development where D1 is not available
 */
export function getD1Database(): D1Database | null {
  try {
    const { env } = getCloudflareContext();
    return (
      ((env as Record<string, unknown>)["DB"] as D1Database | undefined) ?? null
    );
  } catch (error) {
    logger.error("Error getting D1 database:", error);
    return null;
  }
}

/**
 * Get Cloudflare KV namespace binding
 */
export function getKVNamespace(binding: string): unknown | null {
  try {
    const { env } = getCloudflareContext();
    return (env as Record<string, unknown>)[binding] ?? null;
  } catch (_error) {
    logger.error("Error getting KV namespace:", { binding, _error });
    return null;
  }
}

/**
 * Get Cloudflare R2 bucket binding
 */
export function getR2Bucket(binding: string): unknown | null {
  try {
    const { env } = getCloudflareContext();
    return (env as Record<string, unknown>)[binding] ?? null;
  } catch (_error) {
    logger.error("Error getting R2 bucket:", { binding, _error });
    return null;
  }
}

/**
 * Check if running in Cloudflare Workers environment
 */
export function isCloudflareWorkers(): boolean {
  try {
    getCloudflareContext();
    return true;
  } catch {
    return false;
  }
}
