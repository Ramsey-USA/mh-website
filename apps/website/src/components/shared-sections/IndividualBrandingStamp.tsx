import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { IndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";

interface IndividualBrandingStampProps {
  stamp: IndividualBrandingStamp;
  className?: string;
}

export function IndividualBrandingStamp({
  stamp,
  className,
}: Readonly<IndividualBrandingStampProps>) {
  const marks = Array.from({ length: stamp.stars });

  return (
    <span
      role="img"
      aria-label={stamp.ariaLabel}
      title={stamp.label}
      className={[
        "inline-flex items-center gap-0.5 rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-2 py-1 text-brand-secondary dark:border-brand-secondary-light/60 dark:bg-brand-secondary/20 dark:text-brand-secondary-light",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {marks.map((_, index) => (
        <MaterialIcon
          key={`${stamp.key}-${stamp.icon}-${index}`}
          icon={stamp.icon}
          size="xs"
          className="text-brand-secondary dark:text-brand-secondary-light"
        />
      ))}
    </span>
  );
}
