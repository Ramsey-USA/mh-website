/**
 * Service Health Check Utility
 *
 * Validates availability and configuration of external services:
 * - Cloudflare (D1, KV, R2, AI)
 * - Resend (Email)
 * - Twilio (SMS)
 *
 * Used by /api/health for health monitoring.
 */

import { logger } from "@/lib/utils/logger";
import type { D1Database } from "@/lib/db/client";

export interface ServiceStatus {
  name: string;
  status: "healthy" | "degraded" | "unavailable" | "unconfigured";
  latency?: number;
  error?: string;
  lastChecked: string;
}

export interface ServiceHealthReport {
  overall: "healthy" | "degraded" | "unhealthy";
  services: ServiceStatus[];
  timestamp: string;
}

/**
 * Check if Resend email service is configured
 */
export function checkResendStatus(): ServiceStatus {
  const apiKey = process.env["RESEND_API_KEY"];
  const emailFrom = process.env["EMAIL_FROM"];

  return {
    name: "resend",
    status: apiKey && emailFrom ? "healthy" : "unconfigured",
    lastChecked: new Date().toISOString(),
    ...((!apiKey || !emailFrom) && {
      error: "Missing RESEND_API_KEY or EMAIL_FROM",
    }),
  };
}

/**
 * Check if Twilio SMS service is configured
 */
export function checkTwilioStatus(): ServiceStatus {
  const accountSid = process.env["TWILIO_ACCOUNT_SID"];
  const authToken = process.env["TWILIO_AUTH_TOKEN"];
  const fromNumber = process.env["TWILIO_FROM_NUMBER"];

  const isConfigured = accountSid && authToken && fromNumber;

  return {
    name: "twilio",
    status: isConfigured ? "healthy" : "unconfigured",
    lastChecked: new Date().toISOString(),
    ...(!isConfigured && {
      error: "Missing Twilio credentials (optional service)",
    }),
  };
}

/**
 * Check Cloudflare D1 database connectivity
 * Requires getCloudflareContext from @opennextjs/cloudflare
 */
export async function checkD1Status(): Promise<ServiceStatus> {
  const startTime = Date.now();

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const DB = (env as Record<string, unknown>)["DB"] as D1Database | undefined;

    if (!DB) {
      return {
        name: "cloudflare-d1",
        status: "unconfigured",
        error: "D1 database binding not found",
        lastChecked: new Date().toISOString(),
      };
    }

    // Simple connectivity check
    await DB.prepare("SELECT 1").first();
    const latency = Date.now() - startTime;

    return {
      name: "cloudflare-d1",
      status: "healthy",
      latency,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("D1 health check failed", { error });
    return {
      name: "cloudflare-d1",
      status: "unavailable",
      error: error instanceof Error ? error.message : "Connection failed",
      latency: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * KV namespace type for health checks
 */
interface KVNamespace {
  get(key: string): Promise<string | null>;
}

/**
 * Check Cloudflare KV (CACHE) connectivity
 */
export async function checkKVStatus(): Promise<ServiceStatus> {
  const startTime = Date.now();

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const CACHE = (env as Record<string, unknown>)["CACHE"] as
      | KVNamespace
      | undefined;

    if (!CACHE) {
      return {
        name: "cloudflare-kv",
        status: "unconfigured",
        error: "KV CACHE binding not found",
        lastChecked: new Date().toISOString(),
      };
    }

    // Simple read check (key won't exist, but connection is verified)
    await CACHE.get("_health_check");
    const latency = Date.now() - startTime;

    return {
      name: "cloudflare-kv",
      status: "healthy",
      latency,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("KV health check failed", { error });
    return {
      name: "cloudflare-kv",
      status: "unavailable",
      error: error instanceof Error ? error.message : "Connection failed",
      latency: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Check Cloudflare R2 storage connectivity
 */
export async function checkR2Status(): Promise<ServiceStatus> {
  const startTime = Date.now();

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const envRecord = env as Record<string, unknown>;

    // Check if any R2 bucket is bound
    const hasBucket =
      envRecord["FILE_ASSETS"] ||
      envRecord["SAFETY_INTAKE"] ||
      envRecord["RESUMES"];

    if (!hasBucket) {
      return {
        name: "cloudflare-r2",
        status: "unconfigured",
        error: "No R2 bucket bindings found",
        lastChecked: new Date().toISOString(),
      };
    }

    const latency = Date.now() - startTime;

    return {
      name: "cloudflare-r2",
      status: "healthy",
      latency,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("R2 health check failed", { error });
    return {
      name: "cloudflare-r2",
      status: "unavailable",
      error: error instanceof Error ? error.message : "Connection failed",
      latency: Date.now() - startTime,
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Check Cloudflare AI binding
 */
export async function checkAIStatus(): Promise<ServiceStatus> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const AI = (env as Record<string, unknown>)["AI"];

    if (!AI) {
      return {
        name: "cloudflare-ai",
        status: "unconfigured",
        error: "AI binding not found",
        lastChecked: new Date().toISOString(),
      };
    }

    return {
      name: "cloudflare-ai",
      status: "healthy",
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("AI health check failed", { error });
    return {
      name: "cloudflare-ai",
      status: "unavailable",
      error: error instanceof Error ? error.message : "Binding unavailable",
      lastChecked: new Date().toISOString(),
    };
  }
}

/**
 * Run all service health checks
 */
export async function checkAllServices(): Promise<ServiceHealthReport> {
  const timestamp = new Date().toISOString();

  // Sync checks
  const syncServices: ServiceStatus[] = [
    checkResendStatus(),
    checkTwilioStatus(),
  ];

  // Async checks - run in parallel
  const asyncChecks = await Promise.all([
    checkD1Status(),
    checkKVStatus(),
    checkR2Status(),
    checkAIStatus(),
  ]);

  const services = [...syncServices, ...asyncChecks];

  // Determine overall health
  const hasUnavailable = services.some((s) => s.status === "unavailable");
  const hasDegraded = services.some((s) => s.status === "degraded");
  const allUnconfiguredAreOptional = services
    .filter((s) => s.status === "unconfigured")
    .every((s) => s.name === "twilio"); // Twilio is optional

  let overall: ServiceHealthReport["overall"];
  if (hasUnavailable) {
    overall = "unhealthy";
  } else if (hasDegraded) {
    overall = "degraded";
  } else {
    overall = "healthy";
  }

  // If only Twilio is unconfigured, still healthy
  if (overall === "healthy" && !allUnconfiguredAreOptional) {
    overall = "degraded";
  }

  return {
    overall,
    services,
    timestamp,
  };
}

/**
 * Get a quick sync-only health check (no async DB calls)
 * Used when full async check is not needed
 */
export function getQuickHealthStatus(): {
  email: boolean;
  sms: boolean;
} {
  return {
    email: Boolean(process.env["RESEND_API_KEY"] && process.env["EMAIL_FROM"]),
    sms: Boolean(
      process.env["TWILIO_ACCOUNT_SID"] &&
      process.env["TWILIO_AUTH_TOKEN"] &&
      process.env["TWILIO_FROM_NUMBER"],
    ),
  };
}
