"use client";

import { useEffect } from "react";

export function WebVitalsReporter() {
  useEffect(() => {
    // Only load web vitals in production
    if (process.env.NODE_ENV === "production") {
      import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onINP(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
      });
    }
  }, []);

  return null;
}
