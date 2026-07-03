import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.incidentReport.seoName, PAGE_TERMINOLOGY.incidentReport.mhBrandName)} | MH Construction`,
  description:
    "Authorized team incident report submission interface for MH Construction safety workflows.",
  alternates: {
    canonical: "https://www.mhc-gc.com/safety/incident-report",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SafetyIncidentReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
