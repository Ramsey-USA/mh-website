import Link from "next/link";

export interface SectionShellNavItem {
  href: string;
  label: string;
}

interface SectionShellProps {
  children: React.ReactNode;
  navTitle: string;
  navLabel: string;
  navItems: SectionShellNavItem[];
  navNote: string;
}

export function SectionShell({
  children,
  navTitle,
  navLabel,
  navItems,
  navNote,
}: Readonly<SectionShellProps>) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:px-8">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-gray-200 bg-white/95 p-5 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.24em] text-brand-primary dark:text-brand-primary-light">
            {navTitle}
          </p>
          <nav className="mt-4 space-y-2" aria-label={navLabel}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary dark:border-gray-700 dark:text-gray-200 dark:hover:border-brand-primary-light dark:hover:bg-brand-primary/10 dark:hover:text-brand-primary-light"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-300">
            {navNote}
          </p>
        </div>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
