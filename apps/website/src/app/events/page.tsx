import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

export const metadata: Metadata = {
  title: "MH Construction Events Redirect",
  description:
    "Legacy events route that permanently redirects to the latest MH Construction event briefing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EventsPage() {
  permanentRedirect("/cool-desert-nights");
}
