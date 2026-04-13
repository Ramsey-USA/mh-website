import { MaterialIcon } from "@/components/icons/MaterialIcon";

export type BadgeVariant =
  | "osha"
  | "agc"
  | "wisha"
  | "pmbok"
  | "dot"
  | "veteran"
  | "bbb"
  | "travelers";

interface Props {
  variant: BadgeVariant;
  label?: string;
  citation?: string;
}

const BADGE_CONFIG: Record<
  BadgeVariant,
  {
    icon: string;
    defaultLabel: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
  }
> = {
  osha: {
    icon: "gpp_good",
    defaultLabel: "OSHA 29 CFR 1926",
    colorClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-900/20",
    borderClass: "border-red-200 dark:border-red-800",
  },
  agc: {
    icon: "verified",
    defaultLabel: "AGC CSEA Aligned",
    colorClass: "text-brand-primary dark:text-brand-secondary",
    bgClass: "bg-brand-primary/8 dark:bg-brand-primary/20",
    borderClass: "border-brand-primary/25 dark:border-brand-primary/40",
  },
  wisha: {
    icon: "shield",
    defaultLabel: "WISHA Compliant",
    colorClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-900/20",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  pmbok: {
    icon: "schema",
    defaultLabel: "PMBOK Aligned",
    colorClass: "text-purple-700 dark:text-purple-400",
    bgClass: "bg-purple-50 dark:bg-purple-900/20",
    borderClass: "border-purple-200 dark:border-purple-800",
  },
  dot: {
    icon: "local_shipping",
    defaultLabel: "DOT 49 CFR 382",
    colorClass: "text-amber-700 dark:text-amber-400",
    bgClass: "bg-amber-50 dark:bg-amber-900/20",
    borderClass: "border-amber-200 dark:border-amber-800",
  },
  veteran: {
    icon: "military_tech",
    defaultLabel: "Veteran Owned",
    colorClass: "text-gray-700 dark:text-gray-300",
    bgClass: "bg-gray-50 dark:bg-gray-800",
    borderClass: "border-gray-200 dark:border-gray-600",
  },
  bbb: {
    icon: "verified",
    defaultLabel: "BBB Accredited A+",
    colorClass: "text-blue-700 dark:text-blue-400",
    bgClass: "bg-blue-50 dark:bg-blue-900/20",
    borderClass: "border-blue-200 dark:border-blue-800",
  },
  travelers: {
    icon: "umbrella",
    defaultLabel: "Travelers Bonded",
    colorClass: "text-red-700 dark:text-red-400",
    bgClass: "bg-red-50 dark:bg-red-900/20",
    borderClass: "border-red-200 dark:border-red-800",
  },
};

export function SafetyComplianceBadge({ variant, label, citation }: Props) {
  const cfg = BADGE_CONFIG[variant];
  const displayLabel = label ?? cfg.defaultLabel;

  return (
    <span
      className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-semibold ${cfg.bgClass} ${cfg.borderClass} ${cfg.colorClass}`}
    >
      <MaterialIcon icon={cfg.icon} size="xs" className="shrink-0" />
      <span>{displayLabel}</span>
      {citation && <span className="opacity-70 font-normal">· {citation}</span>}
    </span>
  );
}
