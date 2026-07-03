import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: buildDualSeoTitle("services", "Legacy Route Redirect"),
  description:
    "Legacy service detail route redirected to the home services section.",
  alternates: {
    canonical: "https://www.mhc-gc.com/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ServiceDetailPage() {
  permanentRedirect("/#services");
}
