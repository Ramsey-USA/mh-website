import { Suspense } from "react";
import { getAnalyticsOverview } from "@/lib/dashboard/read-model";
import type { DashboardData } from "@/lib/dashboard/types";
import DashboardClientPage from "./DashboardClientPage";

export const dynamic = "force-dynamic";

const FALLBACK_SHELL = (
  <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black" />
);

export default async function DashboardPage() {
  let initialOverview: DashboardData | null = null;
  try {
    initialOverview = await getAnalyticsOverview();
  } catch {
    initialOverview = null;
  }

  return (
    <Suspense fallback={FALLBACK_SHELL}>
      <DashboardClientPage initialOverview={initialOverview} />
    </Suspense>
  );
}
