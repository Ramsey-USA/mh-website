"use client";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { cornerRadius } from "@/lib/styles/design-tokens";

export function RetryConnectionButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className={`px-6 py-3 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold ${cornerRadius.element} transition-colors flex items-center justify-center gap-2`}
    >
      <MaterialIcon icon="refresh" size="sm" className="text-white" />
      Retry Connection
    </button>
  );
}
