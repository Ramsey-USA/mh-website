import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/lib/i18n/locale.server";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyProgram.seoName, PAGE_TERMINOLOGY.safetyProgram.mhBrandName)} | MH Construction`,
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

export default async function SafetyIntakePage() {
  const isEs = (await getServerLocale()) === "es";
  redirect(isEs ? "/es/safety" : "/safety");
}
