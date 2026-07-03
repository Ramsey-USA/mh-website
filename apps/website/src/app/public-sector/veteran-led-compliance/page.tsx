import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TrackedBridgeButton } from "@/components/analytics";
import { Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.publicSector.seoName, PAGE_TERMINOLOGY.publicSector.mhBrandName)} | Veteran-Led Compliance Workflow | MH Construction`,
  description:
    "Review MH Construction's veteran-led workflow for public-sector preconstruction, procurement readiness, and execution oversight.",
  alternates: {
    canonical: `${SITE_URL}/public-sector/veteran-led-compliance`,
  },
  robots: { index: true, follow: true },
};

const workflow = [
  {
    icon: "search",
    title: "Scope and Requirement Intake",
    detail:
      "Define project scope, constraints, and required agency documentation before planning begins.",
  },
  {
    icon: "assignment",
    title: "Compliance Path Mapping",
    detail:
      "Map permitting, procurement, and documentation checkpoints into a unified delivery plan.",
  },
  {
    icon: "rule",
    title: "Preconstruction Controls",
    detail:
      "Set field controls, safety expectations, and reporting cadence before mobilization.",
  },
  {
    icon: "timeline",
    title: "Execution and Reporting",
    detail:
      "Track milestones with transparent communication and issue-escalation protocols.",
  },
];

export default function VeteranLedCompliancePage() {
  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <section className="hero-section hero-safe-top-lg border-b border-gray-200 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900 px-4 pb-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Government", href: "/public-sector" },
              { label: "Veteran-Led Compliance" },
            ]}
            className="mb-6 text-white/70"
          />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            Compliance Pathway
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Veteran-Led Compliance Workflow
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            A practical route from government requirements to field execution,
            designed for disciplined delivery and transparent stakeholder
            alignment.
          </p>
          <p className="mt-3 text-sm font-semibold text-white/90 sm:text-base">
            {COMPANY_INFO.slogan.primary}
          </p>
          <p className="mt-4 text-sm font-semibold text-brand-secondary/90 sm:text-base">
            {COMPANY_INFO.slogan.quaternary}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {workflow.map((step, index) => (
              <Card
                key={step.title}
                className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold text-brand-primary dark:text-brand-primary-light">
                  <span>Step {index + 1}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <MaterialIcon
                    icon={step.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {step.detail}
                </p>
              </Card>
            ))}
          </div>

          <Card className="mt-10 border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Continue the public-sector pathway
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <TrackedBridgeButton
                href="/public-sector"
                trackId="compliance-return-public-sector"
              >
                Return to public sector hub
              </TrackedBridgeButton>
              <TrackedBridgeButton
                href="/public-sector/tri-state-government-construction"
                trackId="compliance-tri-state-strategy"
                variant="outline"
              >
                Tri-state government construction strategy
              </TrackedBridgeButton>
              <TrackedBridgeButton
                href="/contact"
                trackId="compliance-request-planning"
                variant="outline"
              >
                Request planning support
              </TrackedBridgeButton>
              <TrackedBridgeButton
                href="/services"
                trackId="compliance-municipal-service"
                variant="outline"
              >
                Municipal and government service line
              </TrackedBridgeButton>
              <TrackedBridgeButton
                href="/locations/hermiston"
                trackId="compliance-hermiston-market"
                variant="outline"
              >
                Hermiston municipal delivery area
              </TrackedBridgeButton>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
