"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { downloadCsv, toCsv, type CsvRow } from "@/lib/dashboard/csv";

interface ExportCsvButtonProps {
  readonly filename: string;
  readonly headers: ReadonlyArray<string>;
  readonly rows: ReadonlyArray<CsvRow>;
  readonly label?: string;
  readonly className?: string;
  readonly disabled?: boolean;
}

/**
 * Generates a CSV file from in-memory rows and triggers a browser
 * download. Used to export click logs, top pages, etc. without any
 * round-trip to the server.
 */
export function ExportCsvButton({
  filename,
  headers,
  rows,
  label = "Export CSV",
  className,
  disabled,
}: ExportCsvButtonProps) {
  const isDisabled = disabled || rows.length === 0;

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => {
        const csv = toCsv(headers, rows);
        downloadCsv(filename, csv);
      }}
      data-print-hide="true"
      className={
        className ??
        "flex items-center gap-2 px-4 py-2 bg-brand-primary-darker/70 hover:bg-brand-primary-dark disabled:opacity-50 disabled:cursor-not-allowed border-2 border-brand-secondary rounded-lg text-white font-black uppercase text-xs transition-colors"
      }
    >
      <MaterialIcon icon="download" size="sm" />
      {label}
      <span className="text-brand-secondary">({rows.length})</span>
    </button>
  );
}
