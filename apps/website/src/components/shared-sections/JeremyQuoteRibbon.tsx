import Link from "next/link";
import { useTranslations } from "next-intl";
import type { JeremyRibbon } from "@/lib/content/jeremy-ribbons";
import type { IndividualBrandingStamp as IndividualBrandingStampType } from "@/lib/content/individual-branding-stamps";
import { IndividualBrandingStamp } from "@/components/shared-sections/IndividualBrandingStamp";

type JeremyQuoteRibbonVariant = "about" | "team" | "profile" | "global";

const VARIANT_STYLES: Record<JeremyQuoteRibbonVariant, string> = {
  about:
    "border-brand-primary/35 bg-linear-to-r from-brand-primary/12 via-white to-brand-secondary/10 shadow-[0_16px_40px_-24px_rgba(56,104,81,0.45)] dark:border-brand-primary/45 dark:from-brand-primary/28 dark:via-gray-900 dark:to-brand-secondary/24 dark:shadow-[0_18px_45px_-25px_rgba(5,27,20,0.9)]",
  team: "border-brand-secondary/35 bg-linear-to-r from-white via-brand-secondary/14 to-white shadow-[0_16px_40px_-24px_rgba(143,104,49,0.4)] dark:border-brand-secondary/45 dark:from-gray-900 dark:via-brand-secondary/24 dark:to-gray-900 dark:shadow-[0_18px_45px_-25px_rgba(34,26,12,0.9)]",
  profile:
    "border-brand-secondary/35 bg-linear-to-r from-white via-brand-secondary/9 to-white shadow-[0_16px_40px_-24px_rgba(143,104,49,0.4)] dark:border-brand-secondary/45 dark:from-gray-900 dark:via-brand-secondary/18 dark:to-gray-900 dark:shadow-[0_18px_45px_-25px_rgba(34,26,12,0.9)]",
  global:
    "border-brand-primary/40 bg-linear-to-r from-brand-primary/15 via-white to-brand-secondary/14 shadow-[0_22px_52px_-28px_rgba(56,104,81,0.5)] dark:border-brand-primary/50 dark:from-brand-primary/30 dark:via-gray-900 dark:to-brand-secondary/26 dark:shadow-[0_22px_55px_-28px_rgba(4,22,17,0.95)]",
};

interface JeremyQuoteRibbonProps {
  ribbon: JeremyRibbon;
  variant: JeremyQuoteRibbonVariant;
  stamp?: IndividualBrandingStampType | null;
  className?: string;
}

const JEREMY_FULL_NAME = "Jeremy Thamert";
const JEREMY_DEFAULT_ROLE = "Owner & President";

function buildDisplayAttribution(attribution: string): string {
  const trimmed = attribution.trim();
  if (!trimmed) {
    return `${JEREMY_FULL_NAME}, ${JEREMY_DEFAULT_ROLE}`;
  }

  if (trimmed.toLowerCase().includes(JEREMY_FULL_NAME.toLowerCase())) {
    return trimmed;
  }

  return `${JEREMY_FULL_NAME}, ${trimmed}`;
}

export function JeremyQuoteRibbon({
  ribbon,
  variant,
  stamp,
  className,
}: JeremyQuoteRibbonProps) {
  const t = useTranslations("common.jeremyRibbon");
  const displayAttribution = buildDisplayAttribution(ribbon.attribution);

  const classes = [
    "relative overflow-hidden rounded-2xl border p-6 text-center sm:p-8",
    VARIANT_STYLES[variant],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-label={`Jeremy quote ribbon: ${variant}`}
      className={className}
    >
      <div className={classes}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-16 h-44 w-44 rounded-full bg-brand-primary/20 blur-3xl dark:bg-brand-primary/28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -bottom-20 h-52 w-52 rounded-full bg-brand-secondary/18 blur-3xl dark:bg-brand-secondary/26"
        />

        <p className="font-heading relative text-xs font-bold tracking-[0.22em] text-brand-primary uppercase sm:text-sm">
          {ribbon.eyebrow}
        </p>
        {stamp ? (
          <div className="relative mt-3 flex justify-center">
            <IndividualBrandingStamp stamp={stamp} />
          </div>
        ) : null}
        <blockquote className="relative mt-4 text-lg font-semibold leading-relaxed text-gray-900 italic dark:text-white sm:text-xl md:text-2xl">
          <span
            aria-hidden="true"
            className="mr-1 align-top text-2xl leading-none text-brand-secondary/90 sm:text-3xl"
          >
            &ldquo;
          </span>
          {ribbon.quote}
          <span
            aria-hidden="true"
            className="ml-1 align-bottom text-2xl leading-none text-brand-secondary/90 sm:text-3xl"
          >
            &rdquo;
          </span>
        </blockquote>
        <p className="font-heading relative mt-4 text-sm font-semibold tracking-wide text-brand-secondary dark:text-brand-secondary-light">
          - {displayAttribution}
        </p>
        <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold sm:text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            {t("exploreLabel")}
          </span>
          <Link
            href="/jeremy-thamert"
            className="rounded-full border border-brand-primary/30 bg-white/80 px-3 py-1 text-brand-primary transition-colors hover:bg-brand-primary/10 dark:bg-gray-900/70 dark:text-brand-primary-light dark:hover:bg-brand-primary/20"
          >
            {t("profileLink")}
          </Link>
          <Link
            href="/jeremy-thamert#verified-sources"
            className="rounded-full border border-brand-secondary/30 bg-white/80 px-3 py-1 text-brand-secondary-dark transition-colors hover:bg-brand-secondary/10 dark:bg-gray-900/70 dark:text-brand-secondary-light dark:hover:bg-brand-secondary/20"
          >
            {t("sourcesLink")}
          </Link>
        </div>
      </div>
    </section>
  );
}
