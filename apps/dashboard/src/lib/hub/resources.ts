import { unstable_cache } from "next/cache";
import {
  forms,
  handbookForms,
  manuals,
  safetyForms,
} from "@/lib/data/documents";

export interface HubSafetySummary {
  sectionCount: number;
  revisionNumber: string;
  handbookRevision: string;
  handbookSections: number;
  safetyFormCount: number;
  handbookFormCount: number;
  formCount: number;
}

const getCachedSafetySummary = unstable_cache(
  (): Promise<HubSafetySummary> => {
    const safetyManual = manuals.find((doc) => doc.id === "safety-manual");
    const employeeHandbook = manuals.find(
      (doc) => doc.id === "employee-handbook",
    );

    return Promise.resolve({
      sectionCount: safetyManual?.totalSections ?? 50,
      revisionNumber: safetyManual?.revisionNumber ?? "3",
      handbookRevision: employeeHandbook?.revisionNumber ?? "1.0",
      handbookSections: employeeHandbook?.totalSections ?? 6,
      safetyFormCount: safetyForms.length,
      handbookFormCount: handbookForms.length,
      formCount: forms.length,
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
