"use client";

import { useEffect } from "react";
import { addBreadcrumb } from "@/lib/monitoring/sentry";

const REQUIRED_HOME_SECTION_IDS = [
  "services",
  "why-partner",
  "core-values",
  "stats",
  "testimonials",
  "our-process",
  "next-steps",
] as const;

export function HomePageSentrySupport() {
  useEffect(() => {
    addBreadcrumb({
      category: "navigation",
      message: "Homepage rendered",
      level: "info",
      data: {
        pathname: window.location.pathname,
        sectionIds: [...REQUIRED_HOME_SECTION_IDS],
      },
    });

    const missingSectionIds = REQUIRED_HOME_SECTION_IDS.filter(
      (sectionId) => !document.getElementById(sectionId),
    );

    if (missingSectionIds.length > 0) {
      addBreadcrumb({
        category: "render",
        message: "Homepage missing expected sections",
        level: "warning",
        data: {
          pathname: window.location.pathname,
          missingSectionIds,
        },
      });
    }
  }, []);

  return null;
}
