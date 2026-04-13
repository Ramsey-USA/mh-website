"use client";

import { useState, useEffect, useCallback } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthorizedDriver {
  id: string;
  employee_name: string;
  email?: string;
  phone?: string;
  license_number: string;
  license_state: string;
  license_class?: string;
  cdl_endorsements?: string;
  license_expiration_date: string;
  last_mvr_check_date?: string;
  next_mvr_check_date?: string;
  mvr_status: "clear" | "flagged" | "suspended" | "revoked" | "pending";
  authorization_status: "authorized" | "suspended" | "revoked" | "pending";
  authorized_by?: string;
  authorization_date?: string;
  consent_on_file: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface AlertSummary {
  expiring_count: number;
  overdue_mvr_count: number;
  pending_count: number;
  missing_consent_count: number;
}

type FilterType = "all" | "authorized" | "pending" | "expiring" | "cdl";

const AUTH_STATUS_COLORS: Record<string, string> = {
  authorized: "bg-green-900/50 text-green-300 border-green-600",
  pending: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  suspended: "bg-orange-900/50 text-orange-300 border-orange-600",
  revoked: "bg-red-900/50 text-red-400 border-red-700",
};

const MVR_STATUS_COLORS: Record<string, string> = {
  clear: "bg-green-900/50 text-green-300 border-green-600",
  pending: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  flagged: "bg-orange-900/50 text-orange-300 border-orange-600",
  suspended: "bg-red-900/50 text-red-400 border-red-700",
  revoked: "bg-red-900/50 text-red-400 border-red-700",
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string): number {
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Driver Form ──────────────────────────────────────────────────────────────

interface DriverFormProps {
  token: string;
  driver?: AuthorizedDriver | null;
  onSaved: () => void;
  onCancel: () => void;
}

function DriverForm({ token, driver, onSaved, onCancel }: DriverFormProps) {
  const [fields, setFields] = useState({
    employee_name: driver?.employee_name ?? "",
    email: driver?.email ?? "",
    phone: driver?.phone ?? "",
    license_number: driver?.license_number ?? "",
    license_state: driver?.license_state ?? "WA",
    license_class: driver?.license_class ?? "",
    cdl_endorsements: driver?.cdl_endorsements ?? "",
    license_expiration_date: driver?.license_expiration_date ?? "",
    last_mvr_check_date: driver?.last_mvr_check_date ?? "",
    next_mvr_check_date: driver?.next_mvr_check_date ?? "",
    mvr_status: driver?.mvr_status ?? "pending",
    authorization_status: driver?.authorization_status ?? "pending",
    authorized_by: driver?.authorized_by ?? "",
    authorization_date: driver?.authorization_date ?? "",
    consent_on_file: driver?.consent_on_file === 1,
    notes: driver?.notes ?? "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(driver);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !fields.employee_name.trim() ||
      !fields.license_number.trim() ||
      !fields.license_expiration_date
    ) {
      setError(
        "Employee name, license number, and expiration date are required.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const url = isEdit ? `/api/drivers/${driver!.id}` : "/api/drivers";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fields),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to save driver");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save driver");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 bg-gray-700/60 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:border-brand-secondary";

  const selectClass = `${inputClass} appearance-none`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/80 border border-brand-secondary/50 rounded-xl p-4 mb-4"
    >
      <h4 className="text-sm font-black text-brand-secondary uppercase tracking-wider mb-3">
        {isEdit ? "Edit Driver" : "Add New Driver"}
      </h4>

      {/* Row 1: Name, Email, Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Employee Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Full name"
            value={fields.employee_name}
            onChange={(e) =>
              setFields((f) => ({ ...f, employee_name: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Email
          </label>
          <input
            type="email"
            placeholder="employee@email.com"
            value={fields.email}
            onChange={(e) =>
              setFields((f) => ({ ...f, email: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Phone
          </label>
          <input
            type="tel"
            placeholder="(509) 555-0123"
            value={fields.phone}
            onChange={(e) =>
              setFields((f) => ({ ...f, phone: e.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: License Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            License # <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="DL number"
            value={fields.license_number}
            onChange={(e) =>
              setFields((f) => ({ ...f, license_number: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            State
          </label>
          <input
            type="text"
            placeholder="WA"
            maxLength={2}
            value={fields.license_state}
            onChange={(e) =>
              setFields((f) => ({
                ...f,
                license_state: e.target.value.toUpperCase(),
              }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            License Class
          </label>
          <select
            value={fields.license_class}
            onChange={(e) =>
              setFields((f) => ({ ...f, license_class: e.target.value }))
            }
            className={selectClass}
          >
            <option value="">Standard</option>
            <option value="CDL-A">CDL-A</option>
            <option value="CDL-B">CDL-B</option>
            <option value="CDL-C">CDL-C</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Expiration <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            required
            value={fields.license_expiration_date}
            onChange={(e) =>
              setFields((f) => ({
                ...f,
                license_expiration_date: e.target.value,
              }))
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 3: CDL & MVR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            CDL Endorsements
          </label>
          <input
            type="text"
            placeholder="H, N, T, P, etc."
            value={fields.cdl_endorsements}
            onChange={(e) =>
              setFields((f) => ({ ...f, cdl_endorsements: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Last MVR Check
          </label>
          <input
            type="date"
            value={fields.last_mvr_check_date}
            onChange={(e) =>
              setFields((f) => ({ ...f, last_mvr_check_date: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Next MVR Due
          </label>
          <input
            type="date"
            value={fields.next_mvr_check_date}
            onChange={(e) =>
              setFields((f) => ({ ...f, next_mvr_check_date: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            MVR Status
          </label>
          <select
            value={fields.mvr_status}
            onChange={(e) =>
              setFields((f) => ({
                ...f,
                mvr_status: e.target.value as typeof f.mvr_status,
              }))
            }
            className={selectClass}
          >
            <option value="pending">Pending</option>
            <option value="clear">Clear</option>
            <option value="flagged">Flagged</option>
            <option value="suspended">Suspended</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>
      </div>

      {/* Row 4: Authorization */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Auth Status
          </label>
          <select
            value={fields.authorization_status}
            onChange={(e) =>
              setFields((f) => ({
                ...f,
                authorization_status: e.target
                  .value as typeof f.authorization_status,
              }))
            }
            className={selectClass}
          >
            <option value="pending">Pending</option>
            <option value="authorized">Authorized</option>
            <option value="suspended">Suspended</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Authorized By
          </label>
          <input
            type="text"
            placeholder="Manager name"
            value={fields.authorized_by}
            onChange={(e) =>
              setFields((f) => ({ ...f, authorized_by: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
            Auth Date
          </label>
          <input
            type="date"
            value={fields.authorization_date}
            onChange={(e) =>
              setFields((f) => ({ ...f, authorization_date: e.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={fields.consent_on_file}
              onChange={(e) =>
                setFields((f) => ({ ...f, consent_on_file: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-brand-secondary focus:ring-brand-secondary"
            />
            Consent on File
          </label>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-3">
        <label className="text-xs text-gray-400 font-semibold uppercase mb-1 block">
          Notes
        </label>
        <textarea
          placeholder="Additional notes..."
          rows={2}
          value={fields.notes}
          onChange={(e) => setFields((f) => ({ ...f, notes: e.target.value }))}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 mb-3 flex items-center gap-1">
          <MaterialIcon icon="error_outline" size="sm" />
          {error}
        </p>
      )}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 text-sm font-black text-white bg-brand-primary hover:bg-brand-primary-dark disabled:opacity-60 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          {submitting ? (
            <>
              <MaterialIcon icon="hourglass_empty" size="sm" />
              Saving…
            </>
          ) : (
            <>
              <MaterialIcon icon={isEdit ? "save" : "add_circle"} size="sm" />
              {isEdit ? "Update Driver" : "Add Driver"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Main Drivers Tab ─────────────────────────────────────────────────────────

interface DriversTabProps {
  token: string;
}

export function DriversTab({ token }: DriversTabProps) {
  const [drivers, setDrivers] = useState<AuthorizedDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [alertSummary, setAlertSummary] = useState<AlertSummary | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<AuthorizedDriver | null>(
    null,
  );
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/drivers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setDrivers(json.data as AuthorizedDriver[]);
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await fetch("/api/drivers/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setAlertSummary(json.data.summary as AlertSummary);
      }
    } catch {
      // alerts are non-critical
    }
  }, [token]);

  useEffect(() => {
    fetchDrivers();
    fetchAlerts();
  }, [fetchDrivers, fetchAlerts]);

  const handleRevoke = async (driver: AuthorizedDriver) => {
    // eslint-disable-next-line no-alert
    if (!confirm(`Revoke authorization for ${driver.employee_name}?`)) return;
    setRevokingId(driver.id);
    try {
      const res = await fetch(`/api/drivers/${driver.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchDrivers();
        fetchAlerts();
      }
    } finally {
      setRevokingId(null);
    }
  };

  const handleEdit = (driver: AuthorizedDriver) => {
    setEditingDriver(driver);
    setShowForm(true);
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setEditingDriver(null);
    fetchDrivers();
    fetchAlerts();
  };

  // Filter logic
  const filteredDrivers = drivers.filter((d) => {
    switch (filter) {
      case "authorized":
        return d.authorization_status === "authorized";
      case "pending":
        return (
          d.authorization_status === "pending" ||
          d.authorization_status === "suspended"
        );
      case "expiring": {
        const days = daysUntil(d.license_expiration_date);
        return days <= 90 && d.authorization_status !== "revoked";
      }
      case "cdl":
        return d.license_class && d.license_class.startsWith("CDL");
      default:
        return d.authorization_status !== "revoked";
    }
  });

  const totalActive = drivers.filter(
    (d) => d.authorization_status !== "revoked",
  ).length;

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alertSummary &&
        (alertSummary.expiring_count > 0 ||
          alertSummary.overdue_mvr_count > 0 ||
          alertSummary.missing_consent_count > 0) && (
          <div className="bg-amber-900/30 backdrop-blur-sm border-2 border-amber-500/60 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MaterialIcon
                icon="warning"
                size="lg"
                className="text-amber-400"
              />
              <div className="flex-1">
                <h3 className="font-black text-amber-300 mb-2 uppercase tracking-wide text-sm">
                  ACTION REQUIRED
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {alertSummary.expiring_count > 0 && (
                    <div className="text-amber-200">
                      <span className="font-bold text-amber-100">
                        {alertSummary.expiring_count}
                      </span>{" "}
                      license(s) expiring within 90 days
                    </div>
                  )}
                  {alertSummary.overdue_mvr_count > 0 && (
                    <div className="text-amber-200">
                      <span className="font-bold text-amber-100">
                        {alertSummary.overdue_mvr_count}
                      </span>{" "}
                      overdue MVR check(s)
                    </div>
                  )}
                  {alertSummary.pending_count > 0 && (
                    <div className="text-amber-200">
                      <span className="font-bold text-amber-100">
                        {alertSummary.pending_count}
                      </span>{" "}
                      pending authorization(s)
                    </div>
                  )}
                  {alertSummary.missing_consent_count > 0 && (
                    <div className="text-amber-200">
                      <span className="font-bold text-amber-100">
                        {alertSummary.missing_consent_count}
                      </span>{" "}
                      missing consent form(s)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wide flex items-center gap-3">
            <MaterialIcon
              icon="directions_car"
              size="lg"
              className="text-brand-secondary"
            />
            AUTHORIZED DRIVERS
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {totalActive} active driver{totalActive !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <button
          onClick={() => {
            setEditingDriver(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 text-sm font-black text-white bg-brand-primary hover:bg-brand-primary-dark rounded-lg transition-colors inline-flex items-center gap-2 uppercase"
        >
          <MaterialIcon icon={showForm ? "close" : "person_add"} size="sm" />
          {showForm ? "Cancel" : "Add Driver"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <DriverForm
          token={token}
          driver={editingDriver}
          onSaved={handleFormSaved}
          onCancel={() => {
            setShowForm(false);
            setEditingDriver(null);
          }}
        />
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(
          [
            { key: "all", label: "All Active", icon: "group" },
            { key: "authorized", label: "Authorized", icon: "verified" },
            { key: "pending", label: "Needs Review", icon: "pending" },
            { key: "expiring", label: "Expiring Soon", icon: "schedule" },
            { key: "cdl", label: "CDL Holders", icon: "local_shipping" },
          ] as const
        ).map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 ${
              filter === key
                ? "bg-brand-primary text-white"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
            }`}
          >
            <MaterialIcon icon={icon} size="sm" />
            {label}
          </button>
        ))}
      </div>

      {/* Driver Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <MaterialIcon
            icon="hourglass_empty"
            size="2xl"
            className="text-brand-secondary animate-pulse"
          />
          <p className="text-brand-secondary font-bold uppercase tracking-wider ml-3">
            Loading drivers...
          </p>
        </div>
      ) : filteredDrivers.length === 0 ? (
        <div className="bg-gray-800/60 border border-gray-700 rounded-xl p-8 text-center">
          <MaterialIcon
            icon="no_accounts"
            size="3xl"
            className="text-gray-600 mx-auto mb-3"
          />
          <p className="text-gray-400">No drivers match the current filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Driver
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  License
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Expiration
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  MVR Status
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Auth Status
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Consent
                </th>
                <th className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => {
                const expirationDays = daysUntil(
                  driver.license_expiration_date,
                );
                const isExpiringSoon =
                  expirationDays <= 90 && expirationDays > 0;
                const isExpired = expirationDays <= 0;
                const isCdl = driver.license_class?.startsWith("CDL");

                return (
                  <tr
                    key={driver.id}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors"
                  >
                    {/* Driver Name & Contact */}
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">
                        {driver.employee_name}
                      </div>
                      {driver.email && (
                        <div className="text-xs text-gray-500">
                          {driver.email}
                        </div>
                      )}
                      {isCdl && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-blue-900/50 text-blue-300 border border-blue-600 rounded">
                          {driver.license_class}
                          {driver.cdl_endorsements
                            ? ` (${driver.cdl_endorsements})`
                            : ""}
                        </span>
                      )}
                    </td>

                    {/* License */}
                    <td className="py-3 px-3">
                      <div className="text-gray-300 font-mono text-xs">
                        {driver.license_number}
                      </div>
                      <div className="text-xs text-gray-500">
                        {driver.license_state}
                      </div>
                    </td>

                    {/* Expiration */}
                    <td className="py-3 px-3">
                      <div
                        className={`text-sm ${isExpired ? "text-red-400 font-bold" : isExpiringSoon ? "text-amber-300" : "text-gray-300"}`}
                      >
                        {formatDate(driver.license_expiration_date)}
                      </div>
                      {isExpired ? (
                        <div className="text-xs text-red-400 font-bold">
                          EXPIRED
                        </div>
                      ) : isExpiringSoon ? (
                        <div className="text-xs text-amber-400">
                          {expirationDays} days left
                        </div>
                      ) : null}
                    </td>

                    {/* MVR Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-bold uppercase rounded border ${MVR_STATUS_COLORS[driver.mvr_status] || ""}`}
                      >
                        {driver.mvr_status}
                      </span>
                      {driver.next_mvr_check_date && (
                        <div className="text-[10px] text-gray-500 mt-1">
                          Next: {formatDate(driver.next_mvr_check_date)}
                        </div>
                      )}
                    </td>

                    {/* Auth Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-bold uppercase rounded border ${AUTH_STATUS_COLORS[driver.authorization_status] || ""}`}
                      >
                        {driver.authorization_status}
                      </span>
                      {driver.authorized_by && (
                        <div className="text-[10px] text-gray-500 mt-1">
                          by {driver.authorized_by}
                        </div>
                      )}
                    </td>

                    {/* Consent */}
                    <td className="py-3 px-3 text-center">
                      {driver.consent_on_file ? (
                        <MaterialIcon
                          icon="check_circle"
                          size="sm"
                          className="text-green-400"
                        />
                      ) : (
                        <MaterialIcon
                          icon="cancel"
                          size="sm"
                          className="text-red-400"
                        />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(driver)}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <MaterialIcon icon="edit" size="sm" />
                        </button>
                        <button
                          onClick={() => handleRevoke(driver)}
                          disabled={
                            revokingId === driver.id ||
                            driver.authorization_status === "revoked"
                          }
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-40"
                          title="Revoke Authorization"
                        >
                          <MaterialIcon icon="block" size="sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
