"use client";

import { useEffect } from "react";
import { ErrorFallbackCard } from "@/components/error/ErrorFallbackCard";
import { logger } from "@/lib/utils/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to error reporting service
    logger.error("Page error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });

    // Track in analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: false,
      });
    }
  }, [error]);

  return (
    <ErrorFallbackCard
      error={error}
      reset={reset}
      heading="Something went wrong!"
      message="We're sorry for the inconvenience. Our team has been notified and is working to resolve the issue."
      digest={error.digest}
    />
  );
}
