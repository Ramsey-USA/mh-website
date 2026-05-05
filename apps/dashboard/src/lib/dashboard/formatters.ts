/**
 * Display formatters used across the analytics dashboard.
 *
 * Pure, dependency-free functions so they can be safely shared between
 * client tabs, the print report, and CSV exports.
 */

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0m 0s";
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const remaining = total % 60;
  return `${minutes}m ${remaining}s`;
}

export function formatNumber(value: number | undefined | null): string {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return "0";
  }
  return value.toLocaleString();
}

export function formatPercent(
  numerator: number,
  denominator: number,
  fractionDigits = 0,
): string {
  if (denominator <= 0) return "0%";
  const pct = (numerator / denominator) * 100;
  return `${pct.toFixed(fractionDigits)}%`;
}

export function formatTimestamp(value: string | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
