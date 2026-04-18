"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

type AccessEventType =
  | "login"
  | "logout"
  | "download"
  | "form_view"
  | "form_submit"
  | "manual_view"
  | "joining_view"
  | "compliance_warning";

interface AccessLogEntry {
  id: string;
  event_type: AccessEventType;
  role: "admin" | "superintendent" | "worker" | "traveler" | string;
  user_name: string;
  resource_key: string | null;
  resource_title: string | null;
  job_id: string | null;
  ip_address: string | null;
  user_agent: string | null;
  accessed_at: string;
}

interface AccessLogResponse {
  success: boolean;
  data: AccessLogEntry[];
  total: number;
}

interface AccessLogTabProps {
  token: string;
}

const EVENT_LABELS: Record<AccessEventType, string> = {
  login: "Login",
  logout: "Logout",
  download: "Download",
  form_view: "Form View",
  form_submit: "Form Submit",
  manual_view: "Manual View",
  joining_view: "Joining View",
  compliance_warning: "Compliance Warning",
};

const ROLE_BADGES: Record<string, string> = {
  admin: "bg-brand-primary text-white",
  superintendent: "bg-blue-600 text-white",
  worker: "bg-green-600 text-white",
  traveler: "bg-amber-500 text-white",
};

function formatTimestamp(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatEventLabel(value: string): string {
  if (value in EVENT_LABELS) {
    return EVENT_LABELS[value as AccessEventType];
  }

  return value
    .split("_")
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(" ");
}

function summarizeUserAgent(userAgent: string | null): string {
  if (!userAgent) {
    return "Unknown";
  }

  const browser = userAgent.includes("Edg/")
    ? "Edge"
    : userAgent.includes("Chrome/")
      ? "Chrome"
      : userAgent.includes("Firefox/")
        ? "Firefox"
        : userAgent.includes("Safari/") && !userAgent.includes("Chrome/")
          ? "Safari"
          : "Browser";

  const os = userAgent.includes("Windows")
    ? "Windows"
    : userAgent.includes("Mac OS X")
      ? "macOS"
      : userAgent.includes("Android")
        ? "Android"
        : userAgent.includes("iPhone") || userAgent.includes("iPad")
          ? "iOS"
          : userAgent.includes("Linux")
            ? "Linux"
            : "Unknown OS";

  return `${browser} / ${os}`;
}

export function AccessLogTab({ token }: AccessLogTabProps) {
  const [entries, setEntries] = useState<AccessLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (roleFilter) {
      params.set("role", roleFilter);
    }
    if (eventTypeFilter) {
      params.set("event_type", eventTypeFilter);
    }
    if (fromDate) {
      params.set("from_date", new Date(fromDate).toISOString());
    }
    if (toDate) {
      params.set("to_date", new Date(`${toDate}T23:59:59.999Z`).toISOString());
    }
    params.set("limit", "250");
    return params.toString();
  }, [roleFilter, eventTypeFilter, fromDate, toDate]);

  const fetchAccessLog = useCallback(
    async (backgroundRefresh = false) => {
      if (backgroundRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);
      try {
        const response = await fetch(
          `/api/safety/access-log${queryString ? `?${queryString}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const payload = (await response.json()) as
          | AccessLogResponse
          | { error?: string };

        if (!response.ok || !("success" in payload)) {
          const errPayload = payload as { error?: string };
          throw new Error(errPayload.error ?? "Failed to load access log");
        }

        const okPayload = payload as AccessLogResponse;
        setEntries(okPayload.data);
        setTotal(okPayload.total);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load access log",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [queryString, token],
  );

  useEffect(() => {
    void fetchAccessLog();
  }, [fetchAccessLog]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      void fetchAccessLog(true);
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchAccessLog]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-700 bg-gray-800/80 p-5">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
              <MaterialIcon
                icon="verified_user"
                size="lg"
                className="text-brand-secondary"
              />
              Access Log
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Authenticated hub activity across login, downloads, forms, and
              compliance events.
            </p>
          </div>
          <button
            onClick={() => void fetchAccessLog(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm font-black uppercase tracking-wide text-gray-200 hover:border-brand-secondary hover:text-white transition-colors"
          >
            <MaterialIcon
              icon={refreshing ? "hourglass_empty" : "refresh"}
              size="sm"
            />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Role
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="superintendent">Superintendent</option>
              <option value="worker">Worker</option>
              <option value="traveler">Traveler</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Event Type
            <select
              value={eventTypeFilter}
              onChange={(event) => setEventTypeFilter(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            >
              <option value="">All Events</option>
              {Object.keys(EVENT_LABELS).map((eventType) => (
                <option key={eventType} value={eventType}>
                  {formatEventLabel(eventType)}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            From
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            To
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-700 bg-red-900/30 p-4 text-red-200">
          <div className="flex items-start gap-3">
            <MaterialIcon icon="warning" size="sm" className="mt-0.5" />
            <div>
              <p className="font-black uppercase tracking-wide text-sm">
                Access Log Unavailable
              </p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={`access-log-skeleton-${index}`}
              className="h-14 rounded-lg border border-gray-700 bg-gray-800/60 animate-pulse"
            />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800/60 p-10 text-center text-gray-400">
          <MaterialIcon
            icon="history_toggle_off"
            size="xl"
            className="mx-auto mb-3 text-gray-500"
          />
          <p className="text-sm font-semibold">No access events yet</p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-700 bg-gray-800/80 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700 text-xs uppercase tracking-wider text-gray-400 font-bold">
            {total} event{total === 1 ? "" : "s"}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-900/80 text-gray-400 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Event</th>
                  <th className="px-4 py-3 text-left">Resource</th>
                  <th className="px-4 py-3 text-left">IP Address</th>
                  <th className="px-4 py-3 text-left">Device / Browser</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="hover:bg-gray-700/30 transition-colors text-gray-200"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatTimestamp(entry.accessed_at)}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {entry.user_name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wide ${ROLE_BADGES[entry.role] ?? "bg-gray-600 text-white"}`}
                      >
                        {entry.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {formatEventLabel(entry.event_type)}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {entry.resource_title ?? entry.resource_key ?? "-"}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-300">
                      {entry.ip_address ?? "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {summarizeUserAgent(entry.user_agent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
