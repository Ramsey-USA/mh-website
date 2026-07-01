"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { useAdminTabData } from "@/hooks/useAdminTabData";
import {
  ACCESS_LOG_CSV_HEADERS,
  accessLogCsvRows,
  buildAccessLogQuery,
  EVENT_LABELS,
  formatAccessTimestamp,
  formatEventLabel,
  ROLE_BADGE_CLASSES,
  summarizeUserAgent,
  type AccessLogEntry,
  type AccessLogResponse,
} from "@/lib/dashboard/access-log";

interface AccessLogTabProps {
  readonly token: string;
}

const REFRESH_INTERVAL_MS = 30_000;
const SKELETON_KEYS = [
  "skeleton-1",
  "skeleton-2",
  "skeleton-3",
  "skeleton-4",
  "skeleton-5",
];

export function AccessLogTab({ token }: AccessLogTabProps) {
  const [roleFilter, setRoleFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const url = useMemo(() => {
    const qs = buildAccessLogQuery({
      role: roleFilter,
      eventType: eventTypeFilter,
      fromDate,
      toDate,
    });
    return `/api/safety/access-log?${qs}`;
  }, [roleFilter, eventTypeFilter, fromDate, toDate]);

  const { data, status, error, isFetching, refetch } =
    useAdminTabData<AccessLogResponse>(token, url);

  const refreshAccessLog = useCallback(() => {
    refetch().catch(() => undefined);
  }, [refetch]);

  useEffect(() => {
    if (!token) return;
    const id = globalThis.setInterval(refreshAccessLog, REFRESH_INTERVAL_MS);
    return () => globalThis.clearInterval(id);
  }, [token, refreshAccessLog]);

  const entries = useMemo<ReadonlyArray<AccessLogEntry>>(
    () => data?.data ?? [],
    [data?.data],
  );
  const total = data?.total ?? 0;
  const isLoading = status === "loading";

  const csvRows = useMemo(() => accessLogCsvRows(entries), [entries]);

  let content: React.ReactNode;
  if (isLoading) {
    content = (
      <div className="space-y-3">
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="h-14 rounded-lg border border-brand-primary/35 bg-brand-primary-darker/55 animate-pulse"
          />
        ))}
      </div>
    );
  } else if (entries.length === 0) {
    content = (
      <div className="rounded-xl border border-brand-primary/35 bg-brand-primary-darker/55 p-10 text-center text-brand-secondary-light/80">
        <MaterialIcon
          icon="history_toggle_off"
          size="xl"
          className="mx-auto mb-3 text-brand-secondary/70"
        />
        <p className="text-sm font-semibold">No access events yet</p>
      </div>
    );
  } else {
    content = (
      <section
        data-print-section="true"
        className="rounded-xl border border-brand-primary/35 bg-brand-primary-darker/60 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-brand-primary/35 text-xs uppercase tracking-wider text-brand-secondary-light/85 font-bold">
          {total} event{total === 1 ? "" : "s"}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-275 w-full text-sm">
            <thead className="bg-brand-primary-darker/75 text-brand-secondary-light/80 uppercase tracking-wider text-xs">
              <tr>
                <th scope="col" className="px-4 py-3 text-left">
                  Time
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Role
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Event
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Resource
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  IP Address
                </th>
                <th scope="col" className="px-4 py-3 text-left">
                  Device / Browser
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-primary/35">
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="hover:bg-brand-primary-dark/50 transition-colors text-brand-secondary-light"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatAccessTimestamp(entry.accessed_at)}
                  </td>
                  <td className="px-4 py-3 font-semibold">{entry.user_name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-black uppercase tracking-wide ${
                        ROLE_BADGE_CLASSES[entry.role] ??
                        "bg-brand-primary text-brand-secondary-light"
                      }`}
                    >
                      {entry.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {formatEventLabel(entry.event_type)}
                  </td>
                  <td className="px-4 py-3 text-brand-secondary-light/85">
                    {entry.resource_title ?? entry.resource_key ?? "-"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-brand-secondary-light/85">
                    {entry.ip_address ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-brand-secondary-light/85">
                    {summarizeUserAgent(entry.user_agent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      <section
        data-print-section="true"
        className="rounded-xl border border-brand-primary/35 bg-brand-primary-darker/60 p-5"
      >
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
            <p className="text-sm text-brand-secondary-light/80 mt-1">
              Authenticated hub activity across login, downloads, forms, and
              compliance events.
            </p>
          </div>
          <div data-print-hide="true" className="flex items-center gap-2">
            <ExportCsvButton
              filename={`mh-access-log-${new Date().toISOString().slice(0, 10)}.csv`}
              headers={ACCESS_LOG_CSV_HEADERS}
              rows={csvRows}
            />
            <button
              type="button"
              onClick={refreshAccessLog}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/45 px-4 py-2 text-sm font-black uppercase tracking-wide text-brand-secondary-light hover:border-brand-secondary hover:text-white disabled:opacity-50 transition-colors"
            >
              <MaterialIcon
                icon={isFetching ? "hourglass_empty" : "refresh"}
                size="sm"
              />
              Refresh
            </button>
          </div>
        </div>

        <div
          data-print-hide="true"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3"
        >
          <label className="text-xs font-semibold uppercase tracking-wider text-brand-secondary-light/85">
            <span>Role</span>
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="superintendent">Superintendent</option>
              <option value="worker">Worker</option>
              <option value="traveler">Traveler</option>
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-brand-secondary-light/85">
            <span>Event Type</span>
            <select
              value={eventTypeFilter}
              onChange={(event) => setEventTypeFilter(event.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            >
              <option value="">All Events</option>
              {Object.keys(EVENT_LABELS).map((eventType) => (
                <option key={eventType} value={eventType}>
                  {formatEventLabel(eventType)}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-brand-secondary-light/85">
            <span>From</span>
            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>

          <label className="text-xs font-semibold uppercase tracking-wider text-brand-secondary-light/85">
            <span>To</span>
            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="mt-1 w-full rounded-lg border border-brand-primary/45 bg-brand-primary-darker/60 px-3 py-2 text-sm text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary/50"
            />
          </label>
        </div>
      </section>

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

      {content}
    </div>
  );
}
