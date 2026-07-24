import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

const coolDesertNightsSeoTitle = buildDualSeoTitle(
  "coolDesertNights",
  "Legacy Route Redirect",
);

export const metadata: Metadata = withGeoMetadata({
  title: coolDesertNightsSeoTitle,
  description:
    "Legacy Cool Desert Nights route. This path permanently redirects to the canonical event route at /events/cool-desert-nights.",
  keywords: ["Cool Desert Nights redirect", "events canonical route"],
  alternates: {
    canonical: "https://www.mhc-gc.com/events/cool-desert-nights",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: coolDesertNightsSeoTitle,
    description:
      "Legacy Cool Desert Nights route redirecting to the canonical event page.",
    url: "https://www.mhc-gc.com/events/cool-desert-nights",
  },
  twitter: {
    card: "summary",
    title: coolDesertNightsSeoTitle,
    description:
      "Legacy route redirect to canonical Cool Desert Nights event page.",
  },
});

export default function CoolDesertNightsPage() {
  permanentRedirect("/events/cool-desert-nights");
}
