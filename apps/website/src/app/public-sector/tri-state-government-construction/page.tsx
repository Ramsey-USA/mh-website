import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TrackedBridgeButton, TrackedBridgeLink } from "@/components/analytics";
import { Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.triStateGovernmentConstruction.seoName, PAGE_TERMINOLOGY.triStateGovernmentConstruction.mhBrandName)} | MH Construction`,
  description:
    "Regional strategy for government construction across Washington, Oregon, and Idaho, aligned to location coverage and service pathways.",
  alternates: {
    canonical: `${SITE_URL}/public-sector/tri-state-government-construction`,
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

export default function TriStateGovernmentConstructionPage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <section className="hero-section hero-safe-top-lg border-b border-gray-200 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900 px-4 pb-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            Regional Authority
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Tri-State Government Construction Coverage
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            Plan public-sector delivery across Washington, Oregon, and Idaho
            with a location-backed approach tied to service readiness and clear
            project governance.
          </p>
          <p className="mt-3 text-sm font-semibold text-white/90 sm:text-base">
            {COMPANY_INFO.slogan.primary}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-secondary/90 sm:text-base">
            {COMPANY_INFO.slogan.tertiary}
          </p>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Government", href: "/public-sector" },
          { label: "Tri-State Government Construction" },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
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
