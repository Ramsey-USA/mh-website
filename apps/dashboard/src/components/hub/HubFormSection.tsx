import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { DASHBOARD_SECTION_HEADER_CLASS } from "@/components/ui/forms/DashboardFormField";

interface HubFormSectionProps {
  readonly icon: string;
  readonly label: string;
  readonly description?: string;
  readonly children: ReactNode;
}

/**
 * Standard section wrapper used by Hub admin forms.
 *
 * Replaces the repeated rounded border/surface wrapper block +
 * inline section heading that used to appear ~7 times in
 * `TeamProfileForm`.
 */
export function HubFormSection({
  icon,
  label,
  description,
  children,
}: HubFormSectionProps) {
  return (
    <div className="rounded-xl border border-brand-primary/35 bg-brand-primary-darker/60 p-5 space-y-4">
      <div className="flex items-center gap-2 border-b border-brand-primary/35 pb-2">
        <MaterialIcon icon={icon} size="sm" className="text-brand-secondary" />
        <span className={DASHBOARD_SECTION_HEADER_CLASS}>{label}</span>
      </div>
      {description && (
        <p className="text-xs text-brand-secondary-light/70">{description}</p>
      )}
      {children}
    </div>
  );
}
