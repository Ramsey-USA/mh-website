"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { ErrorFallbackCard } from "@/components/error/ErrorFallbackCard";
import { logger } from "@/lib/utils/logger";
import { captureException } from "@/lib/monitoring/sentry";

function toSafeErrorContext(error: Error & { digest?: string }) {
  return {
    boundary: "route-error",
    errorName: error.name,
    digest: error.digest ?? null,
  };
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("statusStates.error");

  useEffect(() => {
    const safeContext = toSafeErrorContext(error);
    logger.error("Route error boundary triggered", safeContext);
    captureException(error, safeContext);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: `route-error:${safeContext.digest ?? "none"}`,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <ErrorFallbackCard
      reset={reset}
      heading={t("heading")}
      message={t("message")}
      tryAgainLabel={t("tryAgain")}
      homeLabel={t("goHome")}
      contactLabel={t("contact")}
      alert
    />
  );
}
