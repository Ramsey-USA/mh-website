import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyManual.seoName, PAGE_TERMINOLOGY.safetyManual.mhBrandName)} | MH Construction`,
  description:
    "Safety manual entry route forwarding to the published table of contents.",
  alternates: {
    canonical: "https://www.mhc-gc.com/resources/safety-manual/contents",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SafetyManualPage() {
  redirect("/resources/safety-manual/contents");
}
