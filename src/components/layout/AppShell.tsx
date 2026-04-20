"use client";

import Link from "next/link";
import { Navigation, Footer } from "@/components/layout";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { usePWA } from "@/hooks/usePWA";

interface AppShellProps {
  children: React.ReactNode;
}

const QUICK_ACTIONS = [
  { label: "Hub", href: "/hub", icon: "dashboard" },
  { label: "Safety", href: "/safety", icon: "shield" },
  { label: "Incident", href: "/safety/incident-report", icon: "report" },
  { label: "Resources", href: "/resources", icon: "menu_book" },
] as const;

export function AppShell({ children }: Readonly<AppShellProps>) {
  const { isStandalone } = usePWA();

  if (!isStandalone) {
    return (
      <>
        <Navigation />
        <div className="flex flex-col bg-white dark:bg-gray-900 min-h-screen">
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-gray-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-gray-900/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-3 py-2 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary/10"
          >
            <MaterialIcon icon="construction" size="sm" />
            Operations Hub
          </Link>

          <nav
            aria-label="PWA quick actions"
            className="flex items-center gap-1 sm:gap-2"
          >
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-primary dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <MaterialIcon icon={action.icon} size="sm" />
                <span className="hidden sm:inline">{action.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-gray-900 dark:text-slate-300">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">
            MH Construction, Inc. · Veteran-Owned Since January 2025
          </p>
          <Link
            href="/safety"
            className="inline-flex items-center gap-1 rounded-md border border-brand-primary/25 px-2 py-1 font-semibold text-brand-primary hover:bg-brand-primary/10"
          >
            <MaterialIcon icon="verified_user" size="sm" />
            Safety Credentials
          </Link>
        </div>
      </footer>
    </div>
  );
}
