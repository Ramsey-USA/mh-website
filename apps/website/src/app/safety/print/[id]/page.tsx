import type { Metadata } from "next";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: buildDualSeoTitle("safetyForms", "Print Safety Form"),
  robots: { index: false, follow: false },
};

export { default } from "./PrintPageClient";
