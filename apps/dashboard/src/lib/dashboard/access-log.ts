/**
 * Pure helpers for the Access Log dashboard tab.
 * Extracted so they can be unit-tested without React.
 */

export type AccessEventType =
  | "login"
  | "logout"
  | "download"
  | "form_view"
  | "form_submit"
  | "manual_view"
  | "joining_view"
  | "compliance_warning";

export interface AccessLogEntry {
  readonly id: string;
  readonly event_type: AccessEventType | string;
  readonly role: string;
  readonly user_name: string;
  readonly resource_key: string | null;
  readonly resource_title: string | null;
  readonly job_id: string | null;
  readonly ip_address: string | null;
  readonly user_agent: string | null;
  readonly accessed_at: string;
}

export interface AccessLogResponse {
  readonly success: boolean;
  readonly data: ReadonlyArray<AccessLogEntry>;
  readonly total: number;
}

export const EVENT_LABELS: Readonly<Record<AccessEventType, string>> = {
  login: "Login",
  logout: "Logout",
  download: "Download",
  form_view: "Form View",
  form_submit: "Form Submit",
  manual_view: "Manual View",
  joining_view: "Joining View",
  compliance_warning: "Compliance Warning",
};

export const ROLE_BADGE_CLASSES: Readonly<Record<string, string>> = {
  admin: "bg-brand-primary text-white",
  superintendent: "bg-blue-600 text-white",
  worker: "bg-green-600 text-white",
  traveler: "bg-amber-500 text-white",
};

export function formatAccessTimestamp(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventLabel(value: string): string {
  if (value in EVENT_LABELS) {
    return EVENT_LABELS[value as AccessEventType];
  }
  return value
    .split("_")
    .filter(Boolean)
    .map((segment) => (segment[0]?.toUpperCase() ?? "") + segment.slice(1))
    .join(" ");
}

export function summarizeUserAgent(userAgent: string | null): string {
  if (!userAgent) return "Unknown";

  let browser = "Browser";
  if (userAgent.includes("Edg/")) {
    browser = "Edge";
  } else if (userAgent.includes("Chrome/")) {
    browser = "Chrome";
  } else if (userAgent.includes("Firefox/")) {
    browser = "Firefox";
  } else if (userAgent.includes("Safari/") && !userAgent.includes("Chrome/")) {
    browser = "Safari";
  }

  let os = "Unknown OS";
  if (userAgent.includes("Windows")) {
    os = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    os = "macOS";
  } else if (userAgent.includes("Android")) {
    os = "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    os = "iOS";
  } else if (userAgent.includes("Linux")) {
    os = "Linux";
  }

  return `${browser} / ${os}`;
}

export interface AccessLogQuery {
  readonly role?: string;
  readonly eventType?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly limit?: number;
}

export function buildAccessLogQuery(query: AccessLogQuery): string {
  const params = new URLSearchParams();
  if (query.role) params.set("role", query.role);
  if (query.eventType) params.set("event_type", query.eventType);
  if (query.fromDate) {
    params.set("from_date", new Date(query.fromDate).toISOString());
  }
  if (query.toDate) {
    params.set(
      "to_date",
      new Date(`${query.toDate}T23:59:59.999Z`).toISOString(),
    );
  }
  params.set("limit", String(query.limit ?? 250));
  return params.toString();
}

export function accessLogCsvRows(
  entries: ReadonlyArray<AccessLogEntry>,
): ReadonlyArray<ReadonlyArray<string>> {
  return entries.map((e) => [
    e.accessed_at,
    e.user_name,
    e.role,
    formatEventLabel(e.event_type),
    e.resource_title ?? e.resource_key ?? "",
    e.ip_address ?? "",
    summarizeUserAgent(e.user_agent),
  ]);
}

export const ACCESS_LOG_CSV_HEADERS: ReadonlyArray<string> = [
  "Timestamp",
  "User",
  "Role",
  "Event",
  "Resource",
  "IP Address",
  "Device",
];
