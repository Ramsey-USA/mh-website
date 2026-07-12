import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { redirect } from "next/navigation";
import { getServerLocale } from "@/lib/i18n/locale.server";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.safetyManual.seoName, PAGE_TERMINOLOGY.safetyManual.mhBrandName)} | MH Construction`,
  description:
    "Safety Manual (MISH Safety & Health Program) entry route forwarding to the published table of contents.",
  alternates: {
    canonical: "https://www.mhc-gc.com/resources/safety-manual/contents",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SafetyManualPage() {
  const isEs = (await getServerLocale()) === "es";
  redirect(
    isEs
      ? "/es/resources/safety-manual/contents"
      : "/resources/safety-manual/contents",
  );
}
