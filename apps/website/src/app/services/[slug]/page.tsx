import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Services | MH Construction",
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

export default async function ServiceDetailPage() {
  permanentRedirect("/#services");
}
