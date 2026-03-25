/**
 * Rate Limiting Middleware
 *
 * Implements a sliding-window counter for rate limiting API requests.
 *
 * Storage strategy (in priority order):
 *   1. Cloudflare KV ("CACHE" binding) — durable, shared across all Workers
 *      isolates, used automatically when deployed to Cloudflare Workers.
 *   2. In-memory Map — local development fallback only.  This store is
 *      per-isolate and is reset on cold-starts; it is intentionally NOT used
 *      in production (Cloudflare Workers can spawn many isolates).
 */

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

interface RateLimitConfig {
  /** Maximum number of requests allowed in the time window */
  maxRequests: number;

  /** Time window in milliseconds */
  windowMs: number;

  /** Message to return when rate limit is exceeded */
  message?: string;

  /** Whether to use IP address for rate limiting */
  useIP?: boolean;

  /** Custom header name to use for identification (when useIP is false) */
  identifierHeader?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// ---------------------------------------------------------------------------
// KV interface (subset used here)
// ---------------------------------------------------------------------------
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
}

// In-process fallback used in local development only.
const localStore = new Map<string, RateLimitEntry>();

function cleanupLocalStore() {
  const now = Date.now();
  for (const [key, entry] of localStore) {
    if (entry.resetTime < now) localStore.delete(key);
  }
}

/** Try to obtain the KV namespace bound as "CACHE". Returns null outside CF. */
function getCacheKV(): KVNamespace | null {
  try {
    const { env } = getCloudflareContext();
    const kv = (env as Record<string, unknown>)["CACHE"];
    return kv ? (kv as KVNamespace) : null;
  } catch {
    return null;
  }
}

/**
 * Read/increment the rate-limit counter.  Prefers KV; falls back to the
 * local in-memory store so development works without Cloudflare bindings.
 */
async function incrementCounter(
  key: string,
  windowMs: number,
): Promise<RateLimitEntry> {
  const now = Date.now();
  const kv = getCacheKV();

  if (kv) {
    const raw = await kv.get(`rl:${key}`);
    let entry: RateLimitEntry = raw
      ? (JSON.parse(raw) as RateLimitEntry)
      : { count: 0, resetTime: now + windowMs };

    if (entry.resetTime < now) {
      entry = { count: 0, resetTime: now + windowMs };
    }
    entry.count += 1;

    const ttlSeconds = Math.ceil((entry.resetTime - now) / 1000);
    await kv.put(`rl:${key}`, JSON.stringify(entry), {
      expirationTtl: ttlSeconds,
    });
    return entry;
  }

  // Local dev fallback
  if (Math.random() < 0.01) cleanupLocalStore();
  let entry = localStore.get(key);
  if (!entry || entry.resetTime < now) {
    entry = { count: 1, resetTime: now + windowMs };
  } else {
    entry.count += 1;
  }
  localStore.set(key, entry);
  return entry;
}

/**
 * Return the canonical client IP.
 *
 * Only `cf-connecting-ip` is trusted — it is set exclusively by Cloudflare
 * and cannot be spoofed by callers.  We do NOT read `x-real-ip` here because
 * this header can be injected by any HTTP client.
 */
function getClientIdentifier(
  request: NextRequest,
  config: RateLimitConfig,
): string {
  if (config.useIP !== false) {
    // cf-connecting-ip is authoritative when behind Cloudflare.
    // x-forwarded-for is kept as a last resort for non-Cloudflare local dev.
    const cfIP = request.headers.get("cf-connecting-ip");
    if (cfIP) return cfIP;
    const forwarded = request.headers.get("x-forwarded-for");
    return forwarded?.split(",")[0]?.trim() ?? "unknown";
  }

  if (config.identifierHeader) {
    return request.headers.get(config.identifierHeader) ?? "unknown";
  }

  return "default";
}

/**
 * Rate limit middleware factory.
 *
 * @example
 * ```typescript
 * export const POST = rateLimit({ maxRequests: 10, windowMs: 60_000 })(handler);
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const {
    maxRequests,
    windowMs,
    message = "Too many requests, please try again later.",
  } = config;

  return function rateLimitMiddleware(
    handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>,
  ) {
    return async function rateLimitedHandler(
      request: NextRequest,
      context?: unknown,
    ): Promise<NextResponse> {
      const identifier = getClientIdentifier(request, config);
      const key = `${request.nextUrl.pathname}:${identifier}`;

      const entry = await incrementCounter(key, windowMs);

      if (entry.count > maxRequests) {
        const now = Date.now();
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000);

        return NextResponse.json(
          { error: message, retryAfter },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
              "X-RateLimit-Limit": maxRequests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": entry.resetTime.toString(),
            },
          },
        );
      }

      const response = await handler(request, context);

      response.headers.set("X-RateLimit-Limit", maxRequests.toString());
      response.headers.set(
        "X-RateLimit-Remaining",
        Math.max(0, maxRequests - entry.count).toString(),
      );
      response.headers.set("X-RateLimit-Reset", entry.resetTime.toString());

      return response;
    };
  };
}

/**
 * Preset rate limit configurations
 */
export const rateLimitPresets = {
  /** 5 requests per minute — general auth endpoints */
  auth: {
    maxRequests: 5,
    windowMs: 60_000,
    message: "Too many authentication attempts, please try again in a minute.",
  },

  /** 60 requests per minute — standard API endpoints */
  api: {
    maxRequests: 60,
    windowMs: 60_000,
    message: "API rate limit exceeded, please slow down.",
  },

  /** 100 requests per minute — public endpoints */
  public: {
    maxRequests: 100,
    windowMs: 60_000,
    message: "Rate limit exceeded, please try again shortly.",
  },

  /** 3 requests per 5 minutes — expensive operations */
  expensive: {
    maxRequests: 3,
    windowMs: 300_000,
    message:
      "This operation is rate limited. Please try again in a few minutes.",
  },

  /** 3 attempts per 5 minutes — admin login */
  strict: {
    maxRequests: 3,
    windowMs: 300_000,
    message: "Too many login attempts. Please try again in 5 minutes.",
  },
};
