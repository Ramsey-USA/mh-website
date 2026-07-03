import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: buildDualSeoTitle("services", "Legacy Route Redirect"),
  description: "Legacy services route redirected to the home services section.",
  alternates: {
    canonical: "https://www.mhc-gc.com/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ServicesPage() {
  permanentRedirect("/#services");
}
