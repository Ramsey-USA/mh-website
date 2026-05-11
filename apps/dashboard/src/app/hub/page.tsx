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
    "Operations Hub dashboard for Safety Manual access, forms, incident reporting, and employee handbook resources.",
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
        className="h-36 rounded-xl border border-slate-200 bg-white/80 animate-pulse dark:border-gray-800 dark:bg-gray-900/70"
      />
    ))}
  </div>
);

export default async function HubPage() {
  const { sectionCount, revisionNumber } = await getHubSafetySummary();

  return (
    <>
      <PageTrackingClient pageName="operations-hub" />

      <section className="relative overflow-hidden bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl text-white">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
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
            <p className="mt-4 text-base text-slate-100 sm:text-lg">
              Access the Safety Manual, field documentation, and team resources
              from one dashboard built for mobile and desktop PWA workflows.
            </p>
            <p className="mt-2 text-sm text-slate-200">
              MISH Rev {revisionNumber} · {sectionCount} sections.
            </p>
            <p className="mt-3 text-sm text-slate-200">
              Building projects for the Client, NOT the Dollar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10 dark:bg-gray-950 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
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
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
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
