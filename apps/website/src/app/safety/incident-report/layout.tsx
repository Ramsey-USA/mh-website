import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety Incident Report | MH Construction",
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
