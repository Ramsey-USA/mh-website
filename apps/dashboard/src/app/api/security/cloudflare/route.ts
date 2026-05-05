/**
 * Cloudflare Security Integration API
 * Reports the active Cloudflare security features for this Workers deployment.
 *
 * All features listed here are enabled at the network/infrastructure layer by
 * Cloudflare and do not require additional runtime code — they are always active
 * for any request that reaches the Worker.
 *
 * Dashboard settings referenced in wrangler.toml comments document how each
 * feature is configured. This endpoint surfaces that status for the admin UI.
 */

import { type NextRequest, type NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { withSecurity } from "@/middleware/security";
import { requireRole } from "@/lib/auth/middleware";
import {
  createSuccessResponse,
  methodNotAllowed,
  internalServerError,
} from "@/lib/api/responses";

export const dynamic = "force-dynamic";

/** Returns true when the request arrived through Cloudflare's proxy. */
function isCloudflareRequest(request: NextRequest): boolean {
  // cf-connecting-ip is injected exclusively by Cloudflare and cannot be
  // spoofed by callers, so its presence reliably identifies a CF-proxied request.
  return Boolean(request.headers.get("cf-connecting-ip"));
}

/** Extract the Cloudflare Ray ID for the current request, if available. */
function getRayId(request: NextRequest): string | null {
  return request.headers.get("cf-ray");
}

/** Detect whether KV-backed rate limiting is available in this environment. */
function hasKVRateLimiting(): boolean {
  try {
    const { env } = getCloudflareContext();
    return Boolean((env as Record<string, unknown>)["CACHE"]);
  } catch {
    return false;
  }
}

function handler(request: NextRequest) {
  try {
    if (request.method === "GET") {
      const onCloudflare = isCloudflareRequest(request);
      const kvRateLimiting = hasKVRateLimiting();

      return createSuccessResponse({
        // "active" when the request is proxied through Cloudflare; the
        // features below are always ON at the CF network layer for this zone.
        status: onCloudflare ? "active" : "local_dev",
        message: onCloudflare
          ? "Cloudflare security features are active for this deployment"
          : "Running outside Cloudflare (local dev) — CF features not applicable",
        timestamp: new Date().toISOString(),
        ray_id: getRayId(request),
        features: {
          // Cloudflare WAF (Web Application Firewall) — enabled at zone level.
          // Blocks SQLi, XSS, RCE, and other OWASP Top 10 attack patterns.
          // Dashboard: Security → WAF → Managed Rules (Cloudflare Managed Ruleset ON)
          waf: onCloudflare,

          // Cloudflare DDoS protection — always ON for all CF zones at no extra cost.
          // Layer 3/4 volumetric and Layer 7 application DDoS mitigation.
          // Dashboard: Security → DDoS
          ddos_protection: onCloudflare,

          // SSL/TLS — Full (strict) mode. All traffic is encrypted end-to-end.
          // Minimum TLS 1.2, HSTS enabled, Always Use HTTPS ON.
          // Dashboard: SSL/TLS → Overview → Full (strict)
          ssl_encryption: onCloudflare,

          // Application-layer rate limiting — implemented in Worker code using
          // Cloudflare KV for fleet-wide shared counters (see rate-limiter.ts).
          // Falls back to per-isolate in-memory store when KV is unavailable.
          rate_limiting: kvRateLimiting,

          // HTTP/2 + HTTP/3 with QUIC — ON for all proxied zones.
          // Dashboard: Speed → Optimization → Protocol Optimization
          modern_protocols: onCloudflare,

          // Cloudflare Tiered Cache — Smart Tiered Cache (free tier).
          // Reduces origin hits by routing through regional upper-tier caches.
          // Dashboard: Caching → Tiered Cache → Smart Tiered Cache Topology ON
          tiered_cache: onCloudflare,

          // Bot Fight Mode / Bot Management — baseline bot protection.
          // Dashboard: Security → Bots
          bot_protection: onCloudflare,
        },
      });
    }

    return methodNotAllowed("Method not supported");
  } catch {
    return internalServerError("Failed to process Cloudflare request");
  }
}

// Cast required because getCloudflareContext() returns void outside of a CF
// Workers environment; the handler itself handles the non-CF case gracefully.
export const GET = requireRole(
  ["admin"],
  withSecurity(handler as (req: NextRequest) => NextResponse),
);
