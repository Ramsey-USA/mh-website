"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface ErrorFallbackCardProps {
  error: Error;
  reset: () => void;
  heading: string;
  message: string;
  digest?: string;
}

export function ErrorFallbackCard({
  error,
  reset,
  heading,
  message,
  digest,
}: ErrorFallbackCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo/mh-logo-light-bg.webp"
            alt="MH Construction"
            width={180}
            height={103}
            priority
            className="dark:hidden"
          />
          <Image
            src="/images/logo/mh-logo-dark-bg.webp"
            alt="MH Construction"
            width={180}
            height={103}
            priority
            className="hidden dark:block"
          />
        </div>

        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {heading}
        </h2>

        <p className="mb-6 text-gray-600 dark:text-gray-300">{message}</p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 text-left">
            <summary className="mb-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
              Error Details (Development Only)
            </summary>
            <div className="max-h-48 overflow-auto rounded bg-gray-100 p-4 text-xs dark:bg-gray-900">
              <p className="mb-2 font-mono text-red-600 dark:text-red-400">
                {error.message}
              </p>
              {digest && (
                <p className="mb-2 text-gray-600 dark:text-gray-300">
                  Digest: {digest}
                </p>
              )}
              <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {error.stack}
              </pre>
            </div>
          </details>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button onClick={reset} variant="primary" size="lg">
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

        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Need help?{" "}
            <a
              href="/contact"
              className="font-medium text-brand-primary hover:underline dark:text-brand-primary-light"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
