import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trade Partners - Our Network | MH Construction",
  description:
    "Meet MH Construction's trusted trade partners and subcontractors in the Pacific Northwest. We work with skilled electrical, plumbing, HVAC, concrete, roofing specialists and reliable material suppliers.",
  keywords: [
    "MH Construction trade partners",
    "subcontractors Tri-Cities WA",
    "construction network Pacific Northwest",
    "electrical contractors Pasco",
    "plumbing contractors Richland",
    "HVAC specialists Kennewick",
    "concrete contractors Washington",
    "roofing contractors Tri-Cities",
    "building material suppliers",
    "construction partnerships",
    "trade partner network",
    "subcontractor relationships",
  ].join(", "),
  openGraph: {
    title: "Trade Partners - Our Network | MH Construction",
    description:
      "Meet MH Construction's trusted trade partners and subcontractors. We work with skilled professionals across electrical, plumbing, HVAC, concrete, roofing, and material supply.",
    url: "https://mhconstruction.com/trade-partners",
    siteName: "MH Construction",
    images: [
      {
        url: "/images/og-trade-partners.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction Trade Partners Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trade Partners - Our Network | MH Construction",
    description:
      "Meet MH Construction's trusted trade partners and subcontractors in the Pacific Northwest construction industry.",
    images: ["/images/og-trade-partners.jpg"],
  },
  alternates: {
    canonical: "https://mhconstruction.com/trade-partners",
  },
};
