import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers - Join Our Team | MH Construction",
  description:
    "Join MH Construction, a veteran-owned construction company in the Pacific Northwest. Explore career opportunities in construction management, field operations, and administration with competitive benefits.",
  keywords: [
    "MH Construction careers",
    "construction jobs Pasco WA",
    "Tri-Cities construction employment",
    "veteran-owned company jobs",
    "construction manager positions",
    "site supervisor jobs",
    "construction estimator careers",
    "Pacific Northwest construction jobs",
    "commercial construction careers",
    "construction company benefits",
  ].join(", "),
  openGraph: {
    title: "Careers - Join Our Team | MH Construction",
    description:
      "Join MH Construction, a veteran-owned construction company in the Pacific Northwest. Explore career opportunities with competitive benefits and a supportive work environment.",
    url: "https://mhc-gc.com/careers",
    siteName: "MH Construction",
    images: [
      {
        url: "/images/og-careers.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction Career Opportunities",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers - Join Our Team | MH Construction",
    description:
      "Join MH Construction, a veteran-owned construction company. Explore career opportunities with competitive benefits.",
    images: ["/images/og-careers.jpg"],
  },
  alternates: {
    canonical: "https://mhc-gc.com/careers",
  },
};
