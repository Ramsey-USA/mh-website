"use client";

import { usePageTracking } from "@/lib/analytics/hooks";

interface PageTrackingClientProps {
  pageName: string;
}

export function PageTrackingClient({ pageName }: PageTrackingClientProps) {
  usePageTracking(pageName);
  return null;
}
