"use client";

import { useEffect } from "react";
import { logger } from "@/lib/utils/logger";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Global error:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.message,
        fatal: true,
      });
    }
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#f9fafb",
            padding: "1rem",
          }}
        >
          <div
            style={{
              maxWidth: "28rem",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>⚠️</div>

            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Application Error
            </h2>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              A critical error occurred. Please try refreshing the page or
              contact support if the problem persists.
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  backgroundColor: "#386851",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Try Again
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  backgroundColor: "white",
                  color: "#386851",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  border: "2px solid #386851",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "500",
                }}
              >
                Go Home
              </button>
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                Need help?{" "}
                <a
                  href="/contact"
                  style={{
                    color: "#386851",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
