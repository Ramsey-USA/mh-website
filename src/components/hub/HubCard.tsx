import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { HubCardDefinition } from "@/lib/hub/cards";

export type HubCardAccent = "primary" | "secondary";

interface HubCardProps {
  readonly card: HubCardDefinition;
  readonly accent?: HubCardAccent;
}

const ACCENT_STYLES: Record<
  HubCardAccent,
  {
    container: string;
    iconWrap: string;
    badge: string;
    cta: string;
  }
> = {
  primary: {
    container:
      "border-slate-200 hover:border-brand-primary/40 dark:border-slate-700",
    iconWrap:
      "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white",
    badge: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
    cta: "text-brand-primary",
  },
  secondary: {
    container:
      "border-brand-secondary/20 hover:border-brand-secondary/50 dark:border-brand-secondary/20",
    iconWrap:
      "bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white",
    badge:
      "border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary",
    cta: "text-brand-secondary",
  },
};

/**
 * Presentational tile shown on the Operations Hub dashboard.
 *
 * Accepts a {@link HubCardDefinition} so the parent page only renders
 * data, not markup. The `accent` controls primary (operations) vs.
 * secondary (admin) styling.
 */
export function HubCard({ card, accent = "primary" }: HubCardProps) {
  const styles = ACCENT_STYLES[accent];
  return (
    <Link
      href={card.href}
      className={`group rounded-2xl border bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-900 ${styles.container}`}
    >
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${styles.iconWrap}`}
      >
        <MaterialIcon icon={card.icon} size="md" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {card.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {card.subtitle}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {card.badge}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-sm font-bold ${styles.cta}`}
        >
          Open
          <MaterialIcon icon="arrow_forward" size="sm" />
        </span>
      </div>
    </Link>
  );
}
