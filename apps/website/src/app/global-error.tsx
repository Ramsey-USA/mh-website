"use client";

import { useEffect } from "react";
import { ErrorFallbackCard } from "@/components/error/ErrorFallbackCard";
import { captureException } from "@/lib/monitoring/sentry";
import { getClientLocale } from "@/lib/i18n/locale";
import { logger } from "@/lib/utils/logger";

const GLOBAL_ERROR_COPY = {
  en: {
    heading: "Application Error",
    message:
      "We hit an unexpected issue while loading this page. You can try again or continue to a stable page.",
    tryAgain: "Try Again",
    goHome: "Go Home",
    contact: "Contact Support",
  },
  es: {
    heading: "Error de la aplicacion",
    message:
      "Encontramos un problema inesperado al cargar esta pagina. Puede intentarlo de nuevo o continuar a una pagina estable.",
    tryAgain: "Intentar de nuevo",
    goHome: "Ir al inicio",
    contact: "Contactar soporte",
  },
} as const;

function toSafeErrorContext(error: Error & { digest?: string }) {
  return {
    boundary: "global-error",
    errorName: error.name,
    digest: error.digest ?? null,
  };
}

function resolveGlobalCopy() {
  return getClientLocale() === "es"
    ? GLOBAL_ERROR_COPY.es
    : GLOBAL_ERROR_COPY.en;
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const copy = resolveGlobalCopy();

  useEffect(() => {
    const safeContext = toSafeErrorContext(error);
    logger.error("Global error boundary triggered", safeContext);
    captureException(error, safeContext);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: `global-error:${safeContext.digest ?? "none"}`,
        fatal: true,
      });
    }
  }, [error]);

  return (
    <html lang={getClientLocale()}>
      <body className="font-body">
        <ErrorFallbackCard
          reset={reset}
          heading={copy.heading}
          message={copy.message}
          tryAgainLabel={copy.tryAgain}
          homeLabel={copy.goHome}
          contactLabel={copy.contact}
          alert
        />
      </body>
    </html>
  );
}
