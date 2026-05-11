import { unstable_cache } from "next/cache";
import { manuals } from "@/lib/data/documents";

export interface HubSafetySummary {
  sectionCount: number;
  revisionNumber: string;
}

const getCachedSafetySummary = unstable_cache(
  (): Promise<HubSafetySummary> => {
    const safetyManual = manuals.find((doc) => doc.id === "safety-manual");

    return Promise.resolve({
      sectionCount: safetyManual?.totalSections ?? 50,
      revisionNumber: safetyManual?.revisionNumber ?? "3",
    });
  },
  ["hub-safety-summary"],
  {
    revalidate: 3600,
    tags: ["hub:safety-resources"],
  },
);

export function getHubSafetySummary(): Promise<HubSafetySummary> {
  return getCachedSafetySummary();
}
