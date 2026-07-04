import type { Metadata } from "next";
import { Suspense } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";
import { HubCard } from "@/components/hub/HubCard";
import { HUB_CARDS, ADMIN_CARDS } from "@/lib/hub/cards";
import { getHubSafetySummary } from "@/lib/hub/resources";

export const metadata: Metadata = {
  title: "Operations Hub | MH Construction",
  description:
    "Operations Hub dashboard for Safety Program (MISH Safety & Health Program / Safety Manual) access, forms, incident reporting, and employee handbook resources.",
  robots: {
    index: false,
    follow: false,
  },
};

const CARDS_FALLBACK = (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`hub-card-skeleton-${index}`}
        className="h-36 rounded-xl border border-brand-primary/25 bg-brand-light/75 animate-pulse dark:border-brand-primary/30 dark:bg-brand-primary-dark/40"
      />
    ))}
  </div>
);

export default async function HubPage() {
  const {
    sectionCount,
    revisionNumber,
    handbookRevision,
    handbookSections,
    safetyFormCount,
    handbookFormCount,
    formCount,
  } = await getHubSafetySummary();

  return (
    <>
      <PageTrackingClient pageName="operations-hub" />

      <section className="relative overflow-hidden bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl text-white">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-secondary/45 bg-brand-primary-darker/35 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary-light">
              <MaterialIcon
                icon="dashboard"
                size="sm"
                className="text-brand-secondary"
              />
              Operations Hub
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              Operations Dashboard
            </h1>
            <p className="mt-4 text-base text-brand-secondary-light/95 sm:text-lg">
              Access the Safety Program (MISH Safety &amp; Health Program),
              delivered as the Safety Manual, plus field documentation and team
              resources from one dashboard built for mobile and desktop PWA
              workflows.
            </p>
            <p className="mt-2 text-sm text-brand-secondary-light/85">
              MISH Rev {revisionNumber} · {sectionCount} sections in the Safety
              Manual.
            </p>
            <p className="mt-1 text-sm text-brand-secondary-light/85">
              Employee Handbook Rev {handbookRevision} · {handbookSections}{" "}
              sections · {handbookFormCount} handbook forms.
            </p>
            <p className="mt-1 text-sm text-brand-secondary-light/85">
              Safety Program forms: {safetyFormCount} · Total active forms:{" "}
              {formCount}.
            </p>
            <p className="mt-3 text-sm text-brand-secondary-light/85">
              Built on Quality, Backed by Trust.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-light px-4 py-10 dark:bg-brand-primary-darker sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-brand-primary-darker dark:text-brand-secondary-light">
              Dashboard Access
            </h2>
            <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
              Role-gated actions remain protected
            </span>
          </div>

          <Suspense fallback={CARDS_FALLBACK}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {HUB_CARDS.map((card) => (
                <HubCard key={card.title} card={card} accent="primary" />
              ))}
            </div>
          </Suspense>

          {/* Admin-only tools */}
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-xl font-black text-brand-primary-darker dark:text-brand-secondary-light">
                Admin Tools
              </h2>
              <span className="rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
                Requires admin login
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADMIN_CARDS.map((card) => (
                <HubCard key={card.title} card={card} accent="secondary" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
