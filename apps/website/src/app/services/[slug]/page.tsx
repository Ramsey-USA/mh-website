import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: buildDualSeoTitle("services", "Legacy Route Redirect"),
  description:
    "Legacy service detail route redirected to the services overview page.",
  alternates: {
    canonical: "https://www.mhc-gc.com/services",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ServiceDetailPage() {
  permanentRedirect("/services");
}
