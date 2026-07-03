import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyProgram.seoName, PAGE_TERMINOLOGY.safetyProgram.mhBrandName)} | MH Construction`,
  description:
    "Legacy safety program route forwarding to the active safety program page.",
  alternates: {
    canonical: "https://www.mhc-gc.com/safety",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SafetyProgramPage() {
  redirect("/safety");
}
