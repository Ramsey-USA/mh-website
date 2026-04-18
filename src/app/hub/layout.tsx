import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operational Hub | MH Construction",
  description:
    "Restricted staff portal - safety, employee resources, and onboarding.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
