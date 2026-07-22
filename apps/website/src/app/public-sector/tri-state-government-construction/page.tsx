import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TrackedBridgeButton, TrackedBridgeLink } from "@/components/analytics";
import { Card } from "@/components/ui";
import { DiagonalStripePattern } from "@/components/ui/backgrounds";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getServerLocale } from "@/lib/i18n/locale.server";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const TRI_STATE_GOVERNMENT_HERO_SLOGAN = getHeroPageSlogan(
  "triStateGovernmentConstruction",
).slogan;
const GOVERNMENT_LIGHT_LOGO = "/images/logo/mh-logo-black.webp";
const GOVERNMENT_DARK_LOGO = "/images/logo/mh-logo-white.webp";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.triStateGovernmentConstruction.seoName, PAGE_TERMINOLOGY.triStateGovernmentConstruction.mhBrandName)} | MH Construction`,
  description:
    "Regional strategy for government construction across Washington, Oregon, and Idaho, aligned to location coverage and service pathways.",
  keywords: [
    "tri-state government construction",
    "public agency construction WA OR ID",
    "regional municipal construction strategy",
    "government capital project planning",
    "owner and architect public-sector coordination",
    "public works construction coverage Washington Oregon Idaho",
    "veteran-owned public-sector contractor",
    "procurement-ready government construction support",
  ],
  alternates: {
    canonical: `${SITE_URL}/public-sector/tri-state-government-construction`,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.triStateGovernmentConstruction.seoName, PAGE_TERMINOLOGY.triStateGovernmentConstruction.mhBrandName)} | MH Construction`,
    description:
      "Regional government construction strategy across WA, OR, and ID with location-backed coverage and mission-partner-aligned delivery pathways.",
    url: `${SITE_URL}/public-sector/tri-state-government-construction`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og/services/municipal-government.webp`,
        alt: "MH Construction tri-state government construction coverage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tri-State Government Construction Coverage | MH Construction",
    description:
      "Public-sector planning and delivery coverage across Washington, Oregon, and Idaho with local service pathways.",
    creator: "@mhc_gc",
    images: [`${SITE_URL}/images/og/services/municipal-government.webp`],
  },
  robots: { index: true, follow: true },
};

const stateCoverage = [
  {
    state: "Washington",
    hubs: ["Pasco", "Kennewick", "Richland", "Yakima", "Spokane"],
    route: "/locations/pasco",
  },
  {
    state: "Oregon",
    hubs: ["Hermiston", "Pendleton"],
    route: "/locations/hermiston",
  },
  {
    state: "Idaho",
    hubs: ["Coeur d'Alene"],
    route: "/locations/coeur-d-alene",
  },
];

export default async function TriStateGovernmentConstructionPage() {
  const isEs = (await getServerLocale()) === "es";

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <section
        className="hero-section relative flex items-end justify-end text-white hero-safe-top-lg border-b border-gray-200 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900 px-4 pb-14 sm:px-6 lg:px-8 overflow-hidden"
        style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
      >
        <div className="mx-auto max-w-5xl w-full ml-auto">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            {isEs
              ? "Autoridad Regional -> Construccion Gubernamental Triestatal"
              : "Regional Authority → Tri-State Government Construction"}
          </p>
          <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            {isEs
              ? "Cobertura de Construccion Gubernamental Triestatal"
              : "Tri-State Government Construction Coverage"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {isEs
              ? "Planifique la entrega de obra publica en Washington, Oregon e Idaho con un enfoque respaldado por ubicacion, preparado para servicio y gobernanza clara del proyecto."
              : "Plan public-sector delivery across Washington, Oregon, and Idaho with a location-backed approach tied to service readiness and clear project governance."}
          </p>
          <p className="mt-3 text-sm font-semibold text-white/90 sm:text-base">
            {COMPANY_INFO.slogan.primary}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-secondary/90 sm:text-base">
            {TRI_STATE_GOVERNMENT_HERO_SLOGAN}
          </p>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: isEs ? "Inicio" : "Home", href: "/" },
          { label: isEs ? "Gobierno" : "Government", href: "/public-sector" },
          {
            label: isEs
              ? "Construccion Gubernamental Triestatal"
              : "Tri-State Government Construction",
          },
        ]}
      />

      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <DiagonalStripePattern
          lightLogoSrc={GOVERNMENT_LIGHT_LOGO}
          darkLogoSrc={GOVERNMENT_DARK_LOGO}
        />
        <div className="relative z-10 mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {stateCoverage.map((entry) => (
            <Card
              key={entry.state}
              className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <MaterialIcon
                  icon="location_on"
                  size="md"
                  className="text-brand-primary"
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {entry.state}
                </h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {entry.hubs.map((hub) => (
                  <li key={hub} className="flex items-center gap-2">
                    <MaterialIcon icon="check_circle" size="sm" />
                    <span>{hub}</span>
                  </li>
                ))}
              </ul>
              <TrackedBridgeLink
                href={entry.route}
                trackId={`tri-state-${entry.state.toLowerCase()}-coverage`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
              >
                Review coverage route
                <MaterialIcon icon="arrow_forward" size="sm" />
              </TrackedBridgeLink>
            </Card>
          ))}
        </div>

        <Card className="mx-auto mt-10 max-w-5xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Build the complete government delivery path
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedBridgeButton
              href="/services"
              trackId="tri-state-municipal-service"
            >
              Municipal and government service line
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/public-sector/veteran-led-compliance"
              trackId="tri-state-veteran-compliance"
              variant="outline"
            >
              Veteran-led compliance workflow
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/contact"
              trackId="tri-state-schedule-planning"
              variant="outline"
            >
              Schedule project planning
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/veterans/public-sector-construction"
              trackId="tri-state-veteran-pathway"
              variant="outline"
            >
              Veteran public-sector pathway
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/locations/yakima"
              trackId="tri-state-yakima-market"
              variant="outline"
            >
              Yakima public-sector service area
            </TrackedBridgeButton>
          </div>
        </Card>
      </section>
    </main>
  );
}
