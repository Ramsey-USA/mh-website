import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Safety Program | MH Construction",
  description:
    "Legacy safety program route forwarding to the active safety program page.",
  alternates: {
    canonical: "https://www.mhc-gc.com/safety",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SafetyProgramPage() {
  redirect("/safety");
}
