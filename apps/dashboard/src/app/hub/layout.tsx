import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operations Hub | MH Construction",
  description:
    "Restricted staff portal for Safety Manual access, employee resources, and onboarding.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HubLayout({ children }: { children: React.ReactNode }) {
  return children;
}
