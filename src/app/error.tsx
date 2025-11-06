"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <MaterialIcon
            icon="error_outline"
            className="text-red-500 dark:text-red-400 mx-auto"
            size="4xl"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Something went wrong!
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We're sorry for the inconvenience. Our team has been notified and is
          working to resolve the issue.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Error Details (Development Only)
            </summary>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-xs overflow-auto max-h-48">
              <p className="font-mono text-red-600 dark:text-red-400 mb-2">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Digest: {error.digest}
                </p>
              )}
              <pre className="text-gray-700 dark:text-gray-400 whitespace-pre-wrap">
                {error.stack}
              </pre>
            </div>
          </details>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="primary"
            size="lg"
          >
            <MaterialIcon icon="refresh" size="md" className="mr-2" />
            Try again
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
            size="lg"
          >
            <MaterialIcon icon="home" size="md" className="mr-2" />
            Go Home
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <a
              href="/contact"
              className="text-brand-primary dark:text-brand-primary-light hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
