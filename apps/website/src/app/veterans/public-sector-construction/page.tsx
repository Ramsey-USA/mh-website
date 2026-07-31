import { permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

export const metadata: Metadata = withGeoMetadata({
  title: buildDualSeoTitle("publicSector", "Public Sector Construction Path"),
  description:
    "Redirects to the canonical page at /public-sector/veteran-led-construction.",
  alternates: {
    canonical: "https://www.mhc-gc.com/public-sector/veteran-led-construction",
  },
  robots: { index: false, follow: true },
});

export default async function VeteranPublicSectorConstructionPage() {
  const locale = await getServerLocale();
  const targetPath =
    locale === "es"
      ? "/es/public-sector/veteran-led-construction"
      : "/public-sector/veteran-led-construction";

  permanentRedirect(targetPath);
}
