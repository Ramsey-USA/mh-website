"use client";

import { useEffect } from "react";
import { initSentry } from "@/lib/monitoring/sentry";

/**
 * Client-side Sentry initialization component
 * Must be rendered in the component tree to initialize Sentry on the client.
 *
 * Setup:
 * 1. Create Sentry account at sentry.io
 * 2. Create a new Browser JavaScript project
 * 3. Copy the DSN
 * 4. Add NEXT_PUBLIC_SENTRY_DSN to Cloudflare environment variables
 */
export function SentryInit() {
  useEffect(() => {
    void initSentry();
  }, []);

  return null;
}
