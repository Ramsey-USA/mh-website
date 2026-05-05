import { type NextRequest } from "next/server";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import { sendToN8nAsync } from "@/lib/notifications/n8n-webhook";
import { alertMatt } from "@/lib/notifications/twilio-sms";

export type AccessEventType =
  | "login"
  | "logout"
  | "download"
  | "form_view"
  | "form_submit"
  | "manual_view"
  | "joining_view"
  | "compliance_warning";

export const VALID_ACCESS_EVENT_TYPES = new Set<AccessEventType>([
  "login",
  "logout",
  "download",
  "form_view",
  "form_submit",
  "manual_view",
  "joining_view",
  "compliance_warning",
]);

const SMS_EVENT_TYPES = new Set<AccessEventType>([
  "login",
  "form_submit",
  "compliance_warning",
]);

const DIGEST_EVENT_TYPES = new Set<AccessEventType>([
  "download",
  "form_view",
  "manual_view",
  "joining_view",
  "logout",
]);

export function redactSensitiveContent(value: string): string {
  let scrubbed = value;

  scrubbed = scrubbed.replaceAll(
    /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
    "[REDACTED_SSN]",
  );

  scrubbed = scrubbed.replaceAll(
    /(DL|Driver\s*License|Drivers\s*License)\s*[:#-]?\s*[A-Z0-9-]{4,}/gi,
    "$1 [REDACTED_DL]",
  );

  return scrubbed;
}

export function normalizeNullableText(
  value: unknown,
  maxLength = 256,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return redactSensitiveContent(trimmed).slice(0, maxLength);
}

function normalizeIpAddress(request: NextRequest): string {
  const forwarded =
    request.headers.get("CF-Connecting-IP") ??
    request.headers.get("X-Forwarded-For") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";

  const firstHop = forwarded.split(",")[0]?.trim() || "unknown";
  return redactSensitiveContent(firstHop).slice(0, 64);
}

function normalizeUserAgent(request: NextRequest): string {
  const userAgent = request.headers.get("User-Agent") ?? "unknown";
  return redactSensitiveContent(userAgent).slice(0, 512);
}

function emitNotifications(event: {
  event_type: AccessEventType;
  role: string;
  user_name: string;
  resource_key?: string | null;
  resource_title?: string | null;
  job_id?: string | null;
}) {
  if (SMS_EVENT_TYPES.has(event.event_type)) {
    const sms =
      event.event_type === "compliance_warning"
        ? `[MH Hub] Compliance Warning: ${event.user_name} (${event.role}) ${event.resource_title ?? event.resource_key ?? "requires review"}`
        : `[MH Hub] ${event.event_type.toUpperCase()}: ${event.user_name} (${event.role}) ${event.resource_title ?? event.resource_key ?? ""}`;

    alertMatt(sms.slice(0, 250));
  }

  if (
    DIGEST_EVENT_TYPES.has(event.event_type) ||
    event.event_type === "compliance_warning"
  ) {
    sendToN8nAsync({
      type: "safety-form",
      data: {
        formType: "hub-activity",
        mode: "digest-item",
        highlight: event.event_type === "compliance_warning",
        eventType: event.event_type,
        role: event.role,
        userName: event.user_name,
        resourceKey: event.resource_key,
        resourceTitle: event.resource_title,
        jobId: event.job_id,
        occurredAt: new Date().toISOString(),
      },
    });
  }
}

export async function logAccessEvent(
  request: NextRequest,
  payload: {
    event_type: AccessEventType;
    role: string;
    user_name: string;
    resource_key?: string;
    resource_title?: string;
    job_id?: string;
  },
): Promise<void> {
  const DB = getD1Database();
  if (!DB) {
    throw new Error("Database not available");
  }

  const db = createDbClient({ DB });
  const normalizedPayload = {
    id: crypto.randomUUID(),
    event_type: payload.event_type,
    role: payload.role,
    user_name: normalizeNullableText(payload.user_name, 120) ?? "Unknown",
    resource_key: normalizeNullableText(payload.resource_key, 120),
    resource_title: normalizeNullableText(payload.resource_title, 240),
    job_id: normalizeNullableText(payload.job_id, 64),
    ip_address: normalizeIpAddress(request),
    user_agent: normalizeUserAgent(request),
  };

  await db.insert("safety_access_log", normalizedPayload);
  emitNotifications(normalizedPayload);
}
