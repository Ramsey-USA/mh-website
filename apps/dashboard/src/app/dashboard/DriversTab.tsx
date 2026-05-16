"use client";

import { useCallback, useState } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DashboardFormField,
  DashboardSelectField,
  DashboardTextareaField,
} from "@/components/ui/forms/DashboardFormField";
import { ExportCsvButton } from "@/components/dashboard/ExportCsvButton";
import { useAdminTabData } from "@/hooks/useAdminTabData";
import { adminFetch } from "@/lib/admin-auth/api";
import {
  AUTH_STATUS_COLORS,
  countActiveDrivers,
  daysUntil,
  DRIVERS_CSV_HEADERS,
  driversCsvRows,
  filterDrivers,
  formatDriverDate,
  hasActionableAlerts,
  isCdlDriver,
  MVR_STATUS_COLORS,
  type AlertSummary,
  type AuthorizedDriver,
  type DriverAlertsResponse,
  type DriverFilter,
  type DriversResponse,
} from "@/lib/dashboard/drivers";

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
    } catch (_err) {
      setError(_err instanceof Error ? _err.message : "Failed to save driver");
    } finally {
      setSubmitting(false);
    }
  };

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
        <DashboardFormField
          label="Employee Name"
          isRequired
          type="text"
          required
          placeholder="Full name"
          value={fields.employee_name}
          onChange={(e) =>
            setFields((f) => ({ ...f, employee_name: e.target.value }))
          }
        />
        <DashboardFormField
          label="Email"
          type="email"
          placeholder="employee@email.com"
          value={fields.email}
          onChange={(e) => setFields((f) => ({ ...f, email: e.target.value }))}
        />
        <DashboardFormField
          label="Phone"
          type="tel"
          placeholder="(509) 555-0123"
          value={fields.phone}
          onChange={(e) => setFields((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>

      {/* Row 2: License Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <DashboardFormField
          label="License #"
          isRequired
          type="text"
          required
          placeholder="DL number"
          value={fields.license_number}
          onChange={(e) =>
            setFields((f) => ({ ...f, license_number: e.target.value }))
          }
        />
        <DashboardFormField
          label="State"
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
        />
        <DashboardSelectField
          label="License Class"
          value={fields.license_class}
          onChange={(e) =>
            setFields((f) => ({ ...f, license_class: e.target.value }))
          }
        >
          <option value="">Standard</option>
          <option value="CDL-A">CDL-A</option>
          <option value="CDL-B">CDL-B</option>
          <option value="CDL-C">CDL-C</option>
        </DashboardSelectField>
        <DashboardFormField
          label="Expiration"
          isRequired
          type="date"
          required
          value={fields.license_expiration_date}
          onChange={(e) =>
            setFields((f) => ({
              ...f,
              license_expiration_date: e.target.value,
            }))
          }
        />
      </div>

      {/* Row 3: CDL & MVR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <DashboardFormField
          label="CDL Endorsements"
          type="text"
          placeholder="H, N, T, P, etc."
          value={fields.cdl_endorsements}
          onChange={(e) =>
            setFields((f) => ({ ...f, cdl_endorsements: e.target.value }))
          }
        />
        <DashboardFormField
          label="Last MVR Check"
          type="date"
          value={fields.last_mvr_check_date}
          onChange={(e) =>
            setFields((f) => ({ ...f, last_mvr_check_date: e.target.value }))
          }
        />
        <DashboardFormField
          label="Next MVR Due"
          type="date"
          value={fields.next_mvr_check_date}
          onChange={(e) =>
            setFields((f) => ({ ...f, next_mvr_check_date: e.target.value }))
          }
        />
        <DashboardSelectField
          label="MVR Status"
          value={fields.mvr_status}
          onChange={(e) =>
            setFields((f) => ({
              ...f,
              mvr_status: e.target.value as typeof f.mvr_status,
            }))
          }
        >
          <option value="pending">Pending</option>
          <option value="clear">Clear</option>
          <option value="flagged">Flagged</option>
          <option value="suspended">Suspended</option>
          <option value="revoked">Revoked</option>
        </DashboardSelectField>
      </div>

      {/* Row 4: Authorization */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        <DashboardSelectField
          label="Auth Status"
          value={fields.authorization_status}
          onChange={(e) =>
            setFields((f) => ({
              ...f,
              authorization_status: e.target
                .value as typeof f.authorization_status,
            }))
          }
        >
          <option value="pending">Pending</option>
          <option value="authorized">Authorized</option>
          <option value="suspended">Suspended</option>
          <option value="revoked">Revoked</option>
        </DashboardSelectField>
        <DashboardFormField
          label="Authorized By"
          type="text"
          placeholder="Manager name"
          value={fields.authorized_by}
          onChange={(e) =>
            setFields((f) => ({ ...f, authorized_by: e.target.value }))
          }
        />
        <DashboardFormField
          label="Auth Date"
          type="date"
          value={fields.authorization_date}
          onChange={(e) =>
            setFields((f) => ({ ...f, authorization_date: e.target.value }))
          }
        />
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
        <DashboardTextareaField
          label="Notes"
          placeholder="Additional notes..."
          rows={2}
          value={fields.notes}
          onChange={(e) => setFields((f) => ({ ...f, notes: e.target.value }))}
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
  readonly token: string;
}

const FILTER_OPTIONS: ReadonlyArray<{
  readonly key: DriverFilter;
  readonly label: string;
  readonly icon: string;
}> = [
  { key: "all", label: "All Active", icon: "group" },
  { key: "authorized", label: "Authorized", icon: "verified" },
  { key: "pending", label: "Needs Review", icon: "pending" },
  { key: "expiring", label: "Expiring Soon", icon: "schedule" },
  { key: "cdl", label: "CDL Holders", icon: "local_shipping" },
];

const SKELETON_KEYS = [
  "driver-skel-1",
  "driver-skel-2",
  "driver-skel-3",
  "driver-skel-4",
  "driver-skel-5",
];

export function DriversTab({ token }: DriversTabProps) {
  const [filter, setFilter] = useState<DriverFilter>("all");
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<AuthorizedDriver | null>(
    null,
  );
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const driversQuery = useAdminTabData<DriversResponse>(token, "/api/drivers");
  const alertsQuery = useAdminTabData<DriverAlertsResponse>(
    token,
    "/api/drivers/alerts",
  );

  const drivers: ReadonlyArray<AuthorizedDriver> =
    driversQuery.data?.data ?? [];
  const alertSummary: AlertSummary | null =
    alertsQuery.data?.data.summary ?? null;
  const isLoading = driversQuery.status === "loading";

  const refresh = useCallback(() => {
    void driversQuery.refetch();
    void alertsQuery.refetch();
  }, [driversQuery, alertsQuery]);

  const handleRevoke = async (driver: AuthorizedDriver) => {
    // eslint-disable-next-line no-alert
    if (!confirm(`Revoke authorization for ${driver.employee_name}?`)) return;
    setRevokingId(driver.id);
    try {
      const res = await adminFetch(token, `/api/drivers/${driver.id}`, {
        method: "DELETE",
      });
      if (res.ok) refresh();
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
    refresh();
  };

  const filteredDrivers = filterDrivers(drivers, filter);
  const totalActive = countActiveDrivers(drivers);
  const csvRows = driversCsvRows(filteredDrivers);

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {hasActionableAlerts(alertSummary) && alertSummary && (
        <section
          data-print-section="true"
          className="bg-amber-900/30 backdrop-blur-sm border-2 border-amber-500/60 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <MaterialIcon icon="warning" size="lg" className="text-amber-400" />
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
        </section>
      )}

      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
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
        <div data-print-hide="true" className="flex items-center gap-2">
          <ExportCsvButton
            filename={`mh-drivers-${new Date().toISOString().slice(0, 10)}.csv`}
            headers={DRIVERS_CSV_HEADERS}
            rows={csvRows}
          />
          <button
            type="button"
            onClick={refresh}
            disabled={driversQuery.isFetching}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-3 py-2 text-sm font-black uppercase tracking-wide text-gray-200 hover:border-brand-secondary hover:text-white disabled:opacity-50 transition-colors"
          >
            <MaterialIcon
              icon={driversQuery.isFetching ? "hourglass_empty" : "refresh"}
              size="sm"
            />
            Refresh
          </button>
          <button
            type="button"
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
      <div data-print-hide="true" className="flex gap-2 flex-wrap">
        {FILTER_OPTIONS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
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
      <section
        data-print-section="true"
        className="bg-gray-800/60 border border-gray-700 rounded-xl overflow-hidden"
      >
        {isLoading && drivers.length === 0 ? (
          <div className="p-4 space-y-2">
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="h-12 bg-gray-700/40 rounded animate-pulse"
              />
            ))}
          </div>
        ) : filteredDrivers.length === 0 ? (
          <div className="p-8 text-center">
            <MaterialIcon
              icon="no_accounts"
              size="3xl"
              className="text-gray-600 mx-auto mb-3"
            />
            <p className="text-gray-400">
              No drivers match the current filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-left">
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    Driver
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    License
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    Expiration
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    MVR Status
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    Auth Status
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    Consent
                  </th>
                  <th
                    scope="col"
                    data-print-hide="true"
                    className="py-3 px-3 text-xs font-black text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDrivers.map((driver) => (
                  <DriverRow
                    key={driver.id}
                    driver={driver}
                    revoking={revokingId === driver.id}
                    onEdit={handleEdit}
                    onRevoke={handleRevoke}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Driver Row ───────────────────────────────────────────────────────────────

interface DriverRowProps {
  readonly driver: AuthorizedDriver;
  readonly revoking: boolean;
  readonly onEdit: (driver: AuthorizedDriver) => void;
  readonly onRevoke: (driver: AuthorizedDriver) => void;
}

function DriverRow({ driver, revoking, onEdit, onRevoke }: DriverRowProps) {
  const expirationDays = daysUntil(driver.license_expiration_date);
  const isExpiringSoon = expirationDays <= 90 && expirationDays > 0;
  const isExpired = expirationDays <= 0;
  const cdl = isCdlDriver(driver);

  let expirationClass = "text-gray-300";
  if (isExpired) expirationClass = "text-red-400 font-bold";
  else if (isExpiringSoon) expirationClass = "text-amber-300";

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/40 transition-colors">
      <td className="py-3 px-3">
        <div className="font-bold text-white">{driver.employee_name}</div>
        {driver.email && (
          <div className="text-xs text-gray-500">{driver.email}</div>
        )}
        {cdl && (
          <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-bold uppercase bg-blue-900/50 text-blue-300 border border-blue-600 rounded">
            {driver.license_class}
            {driver.cdl_endorsements ? ` (${driver.cdl_endorsements})` : ""}
          </span>
        )}
      </td>

      <td className="py-3 px-3">
        <div className="text-gray-300 font-mono text-xs">
          {driver.license_number}
        </div>
        <div className="text-xs text-gray-500">{driver.license_state}</div>
      </td>

      <td className="py-3 px-3">
        <div className={`text-sm ${expirationClass}`}>
          {formatDriverDate(driver.license_expiration_date)}
        </div>
        {isExpired && (
          <div className="text-xs text-red-400 font-bold">EXPIRED</div>
        )}
        {!isExpired && isExpiringSoon && (
          <div className="text-xs text-amber-400">
            {expirationDays} days left
          </div>
        )}
      </td>

      <td className="py-3 px-3">
        <span
          className={`inline-block px-2 py-0.5 text-xs font-bold uppercase rounded border ${MVR_STATUS_COLORS[driver.mvr_status] || ""}`}
        >
          {driver.mvr_status}
        </span>
        {driver.next_mvr_check_date && (
          <div className="text-[10px] text-gray-500 mt-1">
            Next: {formatDriverDate(driver.next_mvr_check_date)}
          </div>
        )}
      </td>

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

      <td className="py-3 px-3 text-center">
        {driver.consent_on_file ? (
          <MaterialIcon
            icon="check_circle"
            size="sm"
            className="text-green-400"
          />
        ) : (
          <MaterialIcon icon="cancel" size="sm" className="text-red-400" />
        )}
      </td>

      <td data-print-hide="true" className="py-3 px-3">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(driver)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit"
            aria-label={`Edit ${driver.employee_name}`}
          >
            <MaterialIcon icon="edit" size="sm" />
          </button>
          <button
            type="button"
            onClick={() => onRevoke(driver)}
            disabled={revoking || driver.authorization_status === "revoked"}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-40"
            title="Revoke Authorization"
            aria-label={`Revoke ${driver.employee_name}`}
          >
            <MaterialIcon icon="block" size="sm" />
          </button>
        </div>
      </td>
    </tr>
  );
}
