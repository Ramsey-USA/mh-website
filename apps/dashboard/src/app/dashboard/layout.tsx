import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: "Mission Dashboard | MH Construction",
  description:
    "Internal mission dashboard for MH Construction performance and conversion intelligence.",
  alternates: {
    canonical: `${siteUrl}/dashboard`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Mission Dashboard | MH Construction",
    description:
      "Internal dashboard view for MH Construction mission intelligence.",
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/dashboard`,
  },
  twitter: {
    card: "summary",
    title: "Mission Dashboard | MH Construction",
    description: "Internal mission and geographic intelligence dashboard.",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
