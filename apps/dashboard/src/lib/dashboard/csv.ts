/**
 * Minimal CSV utilities for exporting dashboard data tables.
 *
 * Avoids any heavyweight dependency — handles quoting, embedded
 * commas/quotes/newlines per RFC 4180, and triggers a browser download.
 */

export type CsvRow = ReadonlyArray<string | number | null | undefined>;

export function escapeCsvCell(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCsv(
  headers: ReadonlyArray<string>,
  rows: ReadonlyArray<CsvRow>,
): string {
  const lines: string[] = [];
  lines.push(headers.map(escapeCsvCell).join(","));
  for (const row of rows) {
    lines.push(row.map(escapeCsvCell).join(","));
  }
  return lines.join("\r\n");
}

export function downloadCsv(filename: string, csv: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob(["\uFEFF", csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
