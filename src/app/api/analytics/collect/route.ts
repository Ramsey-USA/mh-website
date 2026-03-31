/**
 * Analytics Collection API
 *
 * Receives analytics events from clients and persists them to Cloudflare KV.
 * Accepts batches of events via POST to minimize network round-trips.
 *
 * Designed for `navigator.sendBeacon()` / `fetch(keepalive: true)` so events
 * are captured even on page unload.
 */

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { rateLimit } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import {
  recordPageview,
  recordConversion,
  recordClick,
  recordSession,
  type KVClickEvent,
} from "@/lib/analytics/kv-store";

export const dynamic = "force-dynamic";

// ── Payload validation ──────────────────────────────────────────────────────

interface CollectEvent {
  type: "pageview" | "click" | "conversion" | "session_end";
  page?: string | undefined;
  element?: string | undefined;
  conversionType?: "contact" | "consultation" | undefined;
  duration?: number | undefined;
  deviceType?: string | undefined;
  browser?: string | undefined;
  os?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
}

interface CollectPayload {
  events: CollectEvent[];
}

const MAX_EVENTS_PER_BATCH = 25;
const MAX_STRING_LENGTH = 256;

function sanitizeString(value: unknown, maxLen = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return "";
  // Strip control characters and limit length
  return value.replace(/[\x00-\x1F\x7F]/g, "").slice(0, maxLen);
}

function validatePayload(body: unknown): CollectPayload | null {
  if (!body || typeof body !== "object") return null;
  const obj = body as Record<string, unknown>;
  if (!Array.isArray(obj["events"])) return null;

  const events: CollectEvent[] = [];
  const raw = obj["events"] as unknown[];
  const limited = raw.slice(0, MAX_EVENTS_PER_BATCH);

  for (const item of limited) {
    if (!item || typeof item !== "object") continue;
    const ev = item as Record<string, unknown>;
    const type = ev["type"];
    if (
      type !== "pageview" &&
      type !== "click" &&
      type !== "conversion" &&
      type !== "session_end"
    ) {
      continue;
    }

    events.push({
      type,
      page: sanitizeString(ev["page"]),
      element: sanitizeString(ev["element"]),
      conversionType:
        ev["conversionType"] === "contact" ||
        ev["conversionType"] === "consultation"
          ? ev["conversionType"]
          : undefined,
      duration:
        typeof ev["duration"] === "number"
          ? Math.min(Math.max(ev["duration"], 0), 86400)
          : undefined,
      deviceType: sanitizeString(ev["deviceType"]),
      browser: sanitizeString(ev["browser"]),
      os: sanitizeString(ev["os"]),
      country: sanitizeString(ev["country"]),
      state: sanitizeString(ev["state"]),
      city: sanitizeString(ev["city"]),
    });
  }

  if (events.length === 0) return null;
  return { events };
}

// ── Handler ──────────────────────────────────────────────────────────────────

async function handler(request: NextRequest): Promise<NextResponse> {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = validatePayload(body);
  if (!payload) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Process events in parallel — KV writes are independent
  const promises: Promise<void>[] = [];

  for (const event of payload.events) {
    switch (event.type) {
      case "pageview":
        if (event.page) {
          promises.push(recordPageview(event.page));
        }
        break;

      case "click": {
        if (event.element) {
          const click: KVClickEvent = {
            element: event.element,
            timestamp: new Date().toISOString(),
            page: event.page || "",
            deviceType: event.deviceType,
            browser: event.browser,
            os: event.os,
            country: event.country,
            state: event.state,
            city: event.city,
          };
          promises.push(recordClick(click));
        }
        break;
      }

      case "conversion":
        if (event.conversionType) {
          promises.push(recordConversion(event.conversionType));
        }
        break;

      case "session_end":
        if (event.duration !== undefined && event.duration > 0) {
          promises.push(recordSession(event.duration));
        }
        break;
    }
  }

  // Fire KV writes in the background via ctx.waitUntil() so the Worker can
  // return 200 immediately without burning CPU-ms waiting for KV round-trips.
  // Falls back to awaiting directly when running outside Cloudflare (local dev).
  try {
    const cfCtx = getCloudflareContext();
    cfCtx.ctx.waitUntil(
      Promise.all(promises).catch((err) => {
        logger.error("Analytics collect error:", err);
      }),
    );
  } catch {
    // Not in a Cloudflare Workers context (local dev / test) — await normally
    try {
      await Promise.all(promises);
    } catch (err) {
      logger.error("Analytics collect error:", err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

// Rate limit: 60 requests per minute per IP (generous for beacon batches)
export const POST = rateLimit({ maxRequests: 60, windowMs: 60_000 })(handler);
