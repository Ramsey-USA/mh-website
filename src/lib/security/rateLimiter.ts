/**
 * Rate Limiting Middleware
 *
 * Implements token bucket algorithm for rate limiting API requests.
 * Can be configured per-route with different limits.
 */

import { type NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;

  /**
   * Time window in milliseconds
   */
  windowMs: number;

  /**
   * Message to return when rate limit is exceeded
   */
  message?: string;

  /**
   * Whether to use IP address for rate limiting
   * If false, uses a custom identifier from request headers
   */
  useIP?: boolean;

  /**
   * Custom header name to use for identification (if useIP is false)
   */
  identifierHeader?: string;
}

// In-memory storage for rate limiting (use KV/D1 in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Get client identifier for rate limiting
 */
function getClientIdentifier(
  request: NextRequest,
  config: RateLimitConfig
): string {
  if (config.useIP !== false) {
    // Try to get IP from various headers (Cloudflare, proxies, etc.)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    const cfConnectingIP = request.headers.get("cf-connecting-ip");

    return cfConnectingIP || realIP || forwardedFor?.split(",")[0] || "unknown";
  }

  // Use custom identifier from header
  if (config.identifierHeader) {
    return request.headers.get(config.identifierHeader) || "unknown";
  }

  return "default";
}

/**
 * Clean up expired entries from rate limit store
 */
function cleanupExpiredEntries() {
  const now = Date.now();
  const keysToDelete: string[] = [];

  rateLimitStore.forEach((value, key) => {
    if (value.resetTime < now) {
      keysToDelete.push(key);
    }
  });

  keysToDelete.forEach((key) => rateLimitStore.delete(key));
}

/**
 * Rate limit middleware factory
 *
 * @example
 * ```typescript
 * import { rateLimit } from '@/lib/security/rateLimiter';
 *
 * export const GET = rateLimit({
 *   maxRequests: 10,
 *   windowMs: 60000, // 1 minute
 * })(async (request: NextRequest) => {
 *   // Your handler code here
 * });
 * ```
 */
export function rateLimit(config: RateLimitConfig) {
  const {
    maxRequests,
    windowMs,
    message = "Too many requests, please try again later.",
  } = config;

  return function rateLimitMiddleware(
    handler: (request: NextRequest, context?: unknown) => Promise<NextResponse>
  ) {
    return async function rateLimitedHandler(
      request: NextRequest,
      context?: unknown
    ): Promise<NextResponse> {
      // Clean up expired entries periodically
      if (Math.random() < 0.01) {
        // 1% chance to cleanup on each request
        cleanupExpiredEntries();
      }

      const identifier = getClientIdentifier(request, config);
      const key = `${request.nextUrl.pathname}:${identifier}`;
      const now = Date.now();

      let rateLimit = rateLimitStore.get(key);

      if (!rateLimit || rateLimit.resetTime < now) {
        // Create new rate limit window
        rateLimit = {
          count: 1,
          resetTime: now + windowMs,
        };
        rateLimitStore.set(key, rateLimit);
      } else {
        // Increment counter
        rateLimit.count++;
      }

      // Check if rate limit exceeded
      if (rateLimit.count > maxRequests) {
        const retryAfter = Math.ceil((rateLimit.resetTime - now) / 1000);

        return NextResponse.json(
          {
            error: message,
            retryAfter,
          },
          {
            status: 429,
            headers: {
              "Retry-After": retryAfter.toString(),
              "X-RateLimit-Limit": maxRequests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": rateLimit.resetTime.toString(),
            },
          }
        );
      }

      // Add rate limit headers to response
      const response = await handler(request, context);

      response.headers.set("X-RateLimit-Limit", maxRequests.toString());
      response.headers.set(
        "X-RateLimit-Remaining",
        (maxRequests - rateLimit.count).toString()
      );
      response.headers.set("X-RateLimit-Reset", rateLimit.resetTime.toString());

      return response;
    };
  };
}

/**
 * Preset rate limit configurations
 */
export const rateLimitPresets = {
  /**
   * Strict rate limit for authentication endpoints
   * 5 requests per minute
   */
  auth: {
    maxRequests: 5,
    windowMs: 60000,
    message: "Too many authentication attempts, please try again in a minute.",
  },

  /**
   * Standard rate limit for API endpoints
   * 60 requests per minute
   */
  api: {
    maxRequests: 60,
    windowMs: 60000,
    message: "API rate limit exceeded, please slow down.",
  },

  /**
   * Relaxed rate limit for public endpoints
   * 100 requests per minute
   */
  public: {
    maxRequests: 100,
    windowMs: 60000,
    message: "Rate limit exceeded, please try again shortly.",
  },

  /**
   * Very strict rate limit for expensive operations
   * 3 requests per 5 minutes
   */
  expensive: {
    maxRequests: 3,
    windowMs: 300000,
    message:
      "This operation is rate limited. Please try again in a few minutes.",
  },
};

/**
 * Get rate limit status for a client
 * Useful for displaying remaining requests to users
 */
export function getRateLimitStatus(
  request: NextRequest,
  config: RateLimitConfig
): {
  limit: number;
  remaining: number;
  reset: number;
} {
  const identifier = getClientIdentifier(request, config);
  const key = `${request.nextUrl.pathname}:${identifier}`;
  const rateLimit = rateLimitStore.get(key);
  const now = Date.now();

  if (!rateLimit || rateLimit.resetTime < now) {
    return {
      limit: config.maxRequests,
      remaining: config.maxRequests,
      reset: now + config.windowMs,
    };
  }

  return {
    limit: config.maxRequests,
    remaining: Math.max(0, config.maxRequests - rateLimit.count),
    reset: rateLimit.resetTime,
  };
}
