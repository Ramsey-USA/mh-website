import type { Metadata } from "next";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title: buildDualSeoTitle("safetyForms", "Print Safety Form"),
  robots: { index: false, follow: false },
});

export { default } from "./PrintPageClient";
