import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Safety Intake | MH Construction",
  description:
    "Safety intake entry route that forwards to the active MH Construction safety program page.",
  alternates: {
    canonical: "https://www.mhc-gc.com/safety",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SafetyIntakePage() {
  redirect("/safety");
}
