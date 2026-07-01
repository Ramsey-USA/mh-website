"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface PrintButtonProps {
  readonly label?: string;
  readonly className?: string;
}

/**
 * Triggers the browser print dialog. Print styling is provided by
 * `dashboard-print.css` which targets the `data-print-scope="dashboard"`
 * root and produces a clean, paper-friendly report.
 */
export function PrintButton({
  label = "Print Report",
  className,
}: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      data-print-hide="true"
      className={
        className ??
        "flex items-center gap-2 px-4 py-2 bg-brand-primary-darker/70 hover:bg-brand-primary-dark border-2 border-brand-secondary rounded-lg text-white font-black uppercase text-xs transition-colors"
      }
    >
      <MaterialIcon icon="print" size="sm" />
      {label}
    </button>
  );
}
