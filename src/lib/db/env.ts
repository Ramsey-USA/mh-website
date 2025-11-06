/**
 * Cloudflare Environment Access for Next.js
 *
 * Helper to access Cloudflare Workers bindings (D1, KV, R2) from Next.js API routes
 * when deployed to Cloudflare Pages.
 *
 * Note: This uses @cloudflare/next-on-pages which makes env bindings available
 * via getRequestContext() when deployed, but not in local development.
 */

import { logger } from "@/lib/utils/logger";

/**
 * Get Cloudflare D1 database binding
 * Returns null in local development where D1 is not available
 */
export function getD1Database(): any | null {
  try {
    // When deployed to Cloudflare Pages with @cloudflare/next-on-pages
    // the env bindings are available via getRequestContext()
    if (
      typeof globalThis !== "undefined" &&
      "getRequestContext" in globalThis
    ) {
      const context = (globalThis as any).getRequestContext();
      const env = context?.env || context?.cloudflare?.env;
      return env?.DB || null;
    }
    return null;
  } catch (error) {
    logger.error("Error getting D1 database:", error);
    return null;
  }
}

/**
 * Get Cloudflare KV namespace binding
 */
export function getKVNamespace(binding: string): any | null {
  try {
    if (
      typeof globalThis !== "undefined" &&
      "getRequestContext" in globalThis
    ) {
      const { env } = (globalThis as any).getRequestContext();
      return env?.[binding] || null;
    }
    return null;
  } catch (error) {
    logger.error("Error getting KV namespace:", { binding, error });
    return null;
  }
}

/**
 * Get Cloudflare R2 bucket binding
 */
export function getR2Bucket(binding: string): any | null {
  try {
    if (
      typeof globalThis !== "undefined" &&
      "getRequestContext" in globalThis
    ) {
      const { env } = (globalThis as any).getRequestContext();
      return env?.[binding] || null;
    }
    return null;
  } catch (error) {
    logger.error("Error getting R2 bucket:", { binding, error });
    return null;
  }
}

/**
 * Check if running in Cloudflare Workers environment
 */
export function isCloudflareWorkers(): boolean {
  return typeof globalThis !== "undefined" && "getRequestContext" in globalThis;
}
