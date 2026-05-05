"use client";

import { useLocale } from "@/hooks/useLocale";
import { useSearchParams } from "next/navigation";

export function SentryTestButton() {
  const locale = useLocale();
  const isEs = locale === "es";
  const searchParams = useSearchParams();
  const showSentryTestButton = searchParams.get("sentry_test") === "1";

  const triggerSentryTestError = () => {
    // Intentionally trigger a runtime ReferenceError for Sentry verification.
    // @ts-expect-error -- Intentional undefined function call for Sentry test.
    myUndefinedFunction();
  };

  if (!showSentryTestButton) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={triggerSentryTestError}
      className="bottom-4 left-4 z-[100] fixed bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg text-white text-sm font-bold shadow-lg"
      aria-label={
        isEs
          ? "Disparar error de prueba para Sentry"
          : "Trigger Sentry test error"
      }
    >
      {isEs ? "Probar Sentry" : "Test Sentry"}
    </button>
  );
}
