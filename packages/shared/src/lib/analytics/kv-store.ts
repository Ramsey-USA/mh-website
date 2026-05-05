/**
 * KV-Backed Analytics Store
 *
 * Server-side analytics storage using Cloudflare KV.
 * Aggregates cross-visitor metrics for the admin dashboard.
 *
 * KV Keys:
 *   analytics:pageviews:total      → { pages: Record<string, number>, total: number }
 *   analytics:pageviews:daily:YYYY-MM-DD → same shape per day
 *   analytics:conversions          → { contacts: number, consultations: number, total: number }
 *   analytics:clicks:recent        → ClickEvent[] (last 500)
 *   analytics:sessions:total       → { count: number, totalDuration: number }
 *   analytics:sessions:daily:YYYY-MM-DD → same shape per day
 */

import { getKVNamespace } from "@/lib/db/env";
import { logger } from "@/lib/utils/logger";

// ── Types ────────────────────────────────────────────────────────────────────

export interface KVPageviews {
  pages: Record<string, number>;
  total: number;
  lastUpdated: string;
}

export interface KVConversions {
  contacts: number;
  consultations: number;
  total: number;
  lastUpdated: string;
}

export interface KVClickEvent {
  element: string;
  timestamp: string;
  page: string;
  deviceType?: string | undefined;
  browser?: string | undefined;
  os?: string | undefined;
  country?: string | undefined;
  state?: string | undefined;
  city?: string | undefined;
}

export interface KVSessions {
  count: number;
  totalDuration: number;
  lastUpdated: string;
}

export interface KVDashboardSnapshot {
  pageviews: KVPageviews;
  conversions: KVConversions;
  clicks: KVClickEvent[];
  sessions: KVSessions;
  dailyPageviews: KVPageviews | null;
  dailySessions: KVSessions | null;
}

// ── KV Helpers ───────────────────────────────────────────────────────────────

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
}

function getAnalyticsKV(): KVNamespace | null {
  const kv = getKVNamespace("ANALYTICS");
  if (!kv) return null;
  return kv as KVNamespace;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

async function kvGet<T>(kv: KVNamespace, key: string): Promise<T | null> {
  try {
    const raw = await kv.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (err) {
    logger.error("KV get error:", { key, err });
    return null;
  }
}

async function kvPut(
  kv: KVNamespace,
  key: string,
  value: unknown,
  ttl?: number,
): Promise<void> {
  try {
    const opts = ttl ? { expirationTtl: ttl } : undefined;
    await kv.put(key, JSON.stringify(value), opts);
  } catch (err) {
    logger.error("KV put error:", { key, err });
  }
}

// ── Write Operations (called by /api/analytics/collect) ──────────────────────

export async function recordPageview(page: string): Promise<void> {
  const kv = getAnalyticsKV();
  if (!kv) return;

  const now = new Date().toISOString();

  // Update totals
  const totals = (await kvGet<KVPageviews>(
    kv,
    "analytics:pageviews:total",
  )) ?? {
    pages: {},
    total: 0,
    lastUpdated: now,
  };
  totals.pages[page] = (totals.pages[page] || 0) + 1;
  totals.total += 1;
  totals.lastUpdated = now;
  await kvPut(kv, "analytics:pageviews:total", totals);

  // Update daily
  const dayKey = `analytics:pageviews:daily:${todayKey()}`;
  const daily = (await kvGet<KVPageviews>(kv, dayKey)) ?? {
    pages: {},
    total: 0,
    lastUpdated: now,
  };
  daily.pages[page] = (daily.pages[page] || 0) + 1;
  daily.total += 1;
  daily.lastUpdated = now;
  // Daily keys expire after 90 days
  await kvPut(kv, dayKey, daily, 90 * 86400);
}

export async function recordConversion(
  type: "contact" | "consultation",
): Promise<void> {
  const kv = getAnalyticsKV();
  if (!kv) return;

  const now = new Date().toISOString();
  const conversions = (await kvGet<KVConversions>(
    kv,
    "analytics:conversions",
  )) ?? {
    contacts: 0,
    consultations: 0,
    total: 0,
    lastUpdated: now,
  };

  if (type === "contact") {
    conversions.contacts += 1;
  } else {
    conversions.consultations += 1;
  }
  conversions.total += 1;
  conversions.lastUpdated = now;

  await kvPut(kv, "analytics:conversions", conversions);
}

export async function recordClick(click: KVClickEvent): Promise<void> {
  const kv = getAnalyticsKV();
  if (!kv) return;

  const clicks =
    (await kvGet<KVClickEvent[]>(kv, "analytics:clicks:recent")) ?? [];
  clicks.push(click);
  // Keep last 500 clicks
  const trimmed = clicks.slice(-500);
  await kvPut(kv, "analytics:clicks:recent", trimmed);
}

export async function recordSession(duration: number): Promise<void> {
  const kv = getAnalyticsKV();
  if (!kv) return;

  const now = new Date().toISOString();

  // Update totals
  const totals = (await kvGet<KVSessions>(kv, "analytics:sessions:total")) ?? {
    count: 0,
    totalDuration: 0,
    lastUpdated: now,
  };
  totals.count += 1;
  totals.totalDuration += duration;
  totals.lastUpdated = now;
  await kvPut(kv, "analytics:sessions:total", totals);

  // Update daily
  const dayKey = `analytics:sessions:daily:${todayKey()}`;
  const daily = (await kvGet<KVSessions>(kv, dayKey)) ?? {
    count: 0,
    totalDuration: 0,
    lastUpdated: now,
  };
  daily.count += 1;
  daily.totalDuration += duration;
  daily.lastUpdated = now;
  await kvPut(kv, dayKey, daily, 90 * 86400);
}

// ── Read Operations (called by /api/analytics/dashboard) ─────────────────────

export async function getDashboardSnapshot(): Promise<KVDashboardSnapshot | null> {
  const kv = getAnalyticsKV();
  if (!kv) return null;

  const [
    pageviews,
    conversions,
    clicks,
    sessions,
    dailyPageviews,
    dailySessions,
  ] = await Promise.all([
    kvGet<KVPageviews>(kv, "analytics:pageviews:total"),
    kvGet<KVConversions>(kv, "analytics:conversions"),
    kvGet<KVClickEvent[]>(kv, "analytics:clicks:recent"),
    kvGet<KVSessions>(kv, "analytics:sessions:total"),
    kvGet<KVPageviews>(kv, `analytics:pageviews:daily:${todayKey()}`),
    kvGet<KVSessions>(kv, `analytics:sessions:daily:${todayKey()}`),
  ]);

  return {
    pageviews: pageviews ?? { pages: {}, total: 0, lastUpdated: "" },
    conversions: conversions ?? {
      contacts: 0,
      consultations: 0,
      total: 0,
      lastUpdated: "",
    },
    clicks: clicks ?? [],
    sessions: sessions ?? { count: 0, totalDuration: 0, lastUpdated: "" },
    dailyPageviews: dailyPageviews,
    dailySessions: dailySessions,
  };
}
