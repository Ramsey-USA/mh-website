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
    title: string;
    subtitle: string;
    badge: string;
    cta: string;
  }
> = {
  primary: {
    container:
      "border-brand-primary/20 hover:border-brand-primary/45 dark:border-brand-primary/30",
    iconWrap:
      "bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white",
    title: "text-brand-primary-darker dark:text-brand-secondary-light",
    subtitle: "text-brand-primary-dark/80 dark:text-brand-secondary-light/85",
    badge:
      "border border-brand-primary/20 bg-brand-primary/10 text-brand-primary-dark dark:border-brand-secondary/30 dark:bg-brand-secondary/15 dark:text-brand-secondary-light",
    cta: "text-brand-primary dark:text-brand-secondary-light",
  },
  secondary: {
    container:
      "border-brand-secondary/25 hover:border-brand-secondary/55 dark:border-brand-secondary/35",
    iconWrap:
      "bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white",
    title: "text-brand-primary-darker dark:text-brand-secondary-light",
    subtitle: "text-brand-primary-dark/80 dark:text-brand-secondary-light/85",
    badge:
      "border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary",
    cta: "text-brand-secondary dark:text-brand-secondary-light",
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
      className={`group rounded-2xl border bg-brand-light/85 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-brand-primary-dark/60 ${styles.container}`}
    >
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${styles.iconWrap}`}
      >
        <MaterialIcon icon={card.icon} size="md" />
      </div>
      <h3 className={`text-lg font-bold ${styles.title}`}>{card.title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${styles.subtitle}`}>
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
