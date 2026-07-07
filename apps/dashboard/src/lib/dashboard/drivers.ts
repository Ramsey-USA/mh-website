/**
 * Pure helpers, types, and constants for the Authorized Drivers dashboard tab.
 * Extracted so they can be unit-tested without React.
 */

export type AuthorizationStatus =
  "authorized" | "suspended" | "revoked" | "pending";

export type MvrStatus =
  "clear" | "flagged" | "suspended" | "revoked" | "pending";

export interface AuthorizedDriver {
  readonly id: string;
  readonly employee_name: string;
  readonly email?: string;
  readonly phone?: string;
  readonly license_number: string;
  readonly license_state: string;
  readonly license_class?: string;
  readonly cdl_endorsements?: string;
  readonly license_expiration_date: string;
  readonly last_mvr_check_date?: string;
  readonly next_mvr_check_date?: string;
  readonly mvr_status: MvrStatus;
  readonly authorization_status: AuthorizationStatus;
  readonly authorized_by?: string;
  readonly authorization_date?: string;
  readonly consent_on_file: number;
  readonly notes?: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface AlertSummary {
  readonly expiring_count: number;
  readonly overdue_mvr_count: number;
  readonly pending_count: number;
  readonly missing_consent_count: number;
}

export interface DriversResponse {
  readonly data: ReadonlyArray<AuthorizedDriver>;
}

export interface DriverAlertsResponse {
  readonly data: { readonly summary: AlertSummary };
}

export type DriverFilter =
  "all" | "authorized" | "pending" | "expiring" | "cdl";

export const AUTH_STATUS_COLORS: Readonly<Record<AuthorizationStatus, string>> =
  {
    authorized: "bg-green-900/50 text-green-300 border-green-600",
    pending: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
    suspended: "bg-orange-900/50 text-orange-300 border-orange-600",
    revoked: "bg-red-900/50 text-red-400 border-red-700",
  };

export const MVR_STATUS_COLORS: Readonly<Record<MvrStatus, string>> = {
  clear: "bg-green-900/50 text-green-300 border-green-600",
  pending: "bg-yellow-900/50 text-yellow-300 border-yellow-600",
  flagged: "bg-orange-900/50 text-orange-300 border-orange-600",
  suspended: "bg-red-900/50 text-red-400 border-red-700",
  revoked: "bg-red-900/50 text-red-400 border-red-700",
};

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function daysUntil(dateStr: string, now: Date = new Date()): number {
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return Math.ceil(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function formatDriverDate(dateStr?: string): string {
  if (!dateStr) return "—";
  return DATE_FORMATTER.format(new Date(`${dateStr}T00:00:00`));
}

export function isCdlDriver(driver: AuthorizedDriver): boolean {
  return Boolean(driver.license_class?.startsWith("CDL"));
}

export function filterDrivers(
  drivers: ReadonlyArray<AuthorizedDriver>,
  filter: DriverFilter,
  now: Date = new Date(),
): ReadonlyArray<AuthorizedDriver> {
  switch (filter) {
    case "authorized":
      return drivers.filter((d) => d.authorization_status === "authorized");
    case "pending":
      return drivers.filter(
        (d) =>
          d.authorization_status === "pending" ||
          d.authorization_status === "suspended",
      );
    case "expiring":
      return drivers.filter((d) => {
        const days = daysUntil(d.license_expiration_date, now);
        return days <= 90 && d.authorization_status !== "revoked";
      });
    case "cdl":
      return drivers.filter(isCdlDriver);
    case "all":
    default:
      return drivers.filter((d) => d.authorization_status !== "revoked");
  }
}

export function countActiveDrivers(
  drivers: ReadonlyArray<AuthorizedDriver>,
): number {
  return drivers.filter((d) => d.authorization_status !== "revoked").length;
}

export function hasActionableAlerts(
  alerts: AlertSummary | null | undefined,
): boolean {
  if (!alerts) return false;
  return (
    alerts.expiring_count > 0 ||
    alerts.overdue_mvr_count > 0 ||
    alerts.missing_consent_count > 0
  );
}

export const DRIVERS_CSV_HEADERS = [
  "Employee Name",
  "Email",
  "Phone",
  "License #",
  "State",
  "Class",
  "CDL Endorsements",
  "License Expiration",
  "Days Until Expiration",
  "Last MVR Check",
  "Next MVR Check",
  "MVR Status",
  "Authorization Status",
  "Authorized By",
  "Authorization Date",
  "Consent On File",
  "Notes",
] as const;

export function driversCsvRows(
  drivers: ReadonlyArray<AuthorizedDriver>,
  now: Date = new Date(),
): ReadonlyArray<ReadonlyArray<string | number>> {
  return drivers.map((d) => [
    d.employee_name,
    d.email ?? "",
    d.phone ?? "",
    d.license_number,
    d.license_state,
    d.license_class ?? "",
    d.cdl_endorsements ?? "",
    d.license_expiration_date,
    daysUntil(d.license_expiration_date, now),
    d.last_mvr_check_date ?? "",
    d.next_mvr_check_date ?? "",
    d.mvr_status,
    d.authorization_status,
    d.authorized_by ?? "",
    d.authorization_date ?? "",
    d.consent_on_file ? "yes" : "no",
    d.notes ?? "",
  ]);
}
