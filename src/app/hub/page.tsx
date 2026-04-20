import Link from "next/link";
import type { Metadata } from "next";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";

export const metadata: Metadata = {
  title: "Operations Hub | MH Construction",
  description:
    "Operations Hub dashboard for safety, forms, manuals, incident reporting, and employee handbook resources.",
  robots: {
    index: false,
    follow: false,
  },
};

const HUB_CARDS = [
  {
    title: "Safety Program",
    subtitle: "Credentials, standards, and program overview",
    href: "/safety",
    icon: "shield",
    badge: "Program",
  },
  {
    title: "Incident Reporting",
    subtitle: "Submit incident reports directly from the field",
    href: "/safety/incident-report",
    icon: "report",
    badge: "Direct Entry",
  },
  {
    title: "Employee Handbook",
    subtitle: "Placeholder ready for document upload and PDF publishing",
    href: "/employee-handbook",
    icon: "menu_book",
    badge: "Placeholder",
  },
  {
    title: "Field Forms",
    subtitle: "Toolbox talks, JHA, inspections, and safety forms",
    href: "/resources",
    icon: "description",
    badge: "Role-Gated Downloads",
  },
  {
    title: "Manuals and SOPs",
    subtitle: "Safety manuals and operations documentation",
    href: "/resources",
    icon: "library_books",
    badge: "Reference",
  },
  {
    title: "Training and Toolbox Talks",
    subtitle: "Training records and toolbox workflow materials",
    href: "/resources",
    icon: "school",
    badge: "Field Ready",
  },
] as const;

export default function HubPage() {
  return (
    <>
      <PageTrackingClient pageName="operations-hub" />

      <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-16 sm:px-6">
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
              Mission Control Dashboard
            </h1>
            <p className="mt-4 text-base text-slate-100 sm:text-lg">
              Access safety operations, field documentation, and team resources
              from one dashboard built for mobile and desktop PWA workflows.
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-lg dark:border-slate-700 dark:bg-gray-900"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <MaterialIcon icon={card.icon} size="md" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {card.subtitle}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {card.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary">
                    Open
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
