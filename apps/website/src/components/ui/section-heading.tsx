import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const wrapperVariants = cva("space-y-3", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

const headingLevelStyles: Record<SectionHeadingLevel, string> = {
  h1: "text-4xl md:text-5xl",
  h2: "text-3xl md:text-4xl",
  h3: "text-2xl md:text-3xl",
  h4: "text-xl md:text-2xl",
  h5: "text-lg md:text-xl",
  h6: "text-base md:text-lg",
};

type SectionHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface SectionHeadingProps extends VariantProps<
  typeof wrapperVariants
> {
  as?: SectionHeadingLevel;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  accent?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  as = "h2",
  eyebrow,
  title,
  description,
  accent = false,
  align,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const HeadingTag = as;
  return (
    <div className={cn(wrapperVariants({ align }), className)}>
      {eyebrow ? (
        <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary dark:text-brand-secondary-light">
          {eyebrow}
        </p>
      ) : null}

      <HeadingTag
        className={cn(
          "font-heading font-bold text-gray-900 dark:text-white",
          headingLevelStyles[as],
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>

      {accent ? (
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 block h-1 w-16 rounded-full bg-brand-primary dark:bg-brand-secondary",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
          )}
        />
      ) : null}

      {description ? (
        <p
          className={cn(
            "font-body max-w-3xl text-base text-gray-700 dark:text-gray-300",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
