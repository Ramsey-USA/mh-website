import type { Metadata } from "next";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { redirect } from "next/navigation";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
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
});

export default function SafetyManualPage() {
  redirect("/resources/safety-manual/contents");
}
