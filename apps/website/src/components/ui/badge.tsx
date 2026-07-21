import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-6 items-center rounded-full border px-2.5 py-0.5 font-subheading text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-brand-primary/35 bg-brand-primary/8 text-brand-primary dark:border-brand-primary/45 dark:bg-brand-primary/18 dark:text-brand-primary-light",
        verified:
          "border-emerald-700/35 bg-emerald-50 text-emerald-800 dark:border-emerald-300/45 dark:bg-emerald-950/35 dark:text-emerald-200",
        sector:
          "border-brand-secondary/45 bg-brand-secondary/15 text-brand-secondary-dark dark:border-brand-secondary/60 dark:bg-brand-secondary/25 dark:text-brand-secondary-light",
        location:
          "border-sky-700/35 bg-sky-50 text-sky-800 dark:border-sky-300/45 dark:bg-sky-950/35 dark:text-sky-200",
        event:
          "border-violet-700/35 bg-violet-50 text-violet-800 dark:border-violet-300/45 dark:bg-violet-950/35 dark:text-violet-200",
        secondary:
          "border-brand-secondary/45 bg-brand-secondary/15 text-brand-secondary-dark dark:border-brand-secondary/60 dark:bg-brand-secondary/25 dark:text-brand-secondary-light",
        destructive:
          "border-red-700/35 bg-red-50 text-red-800 dark:border-red-300/45 dark:bg-red-950/35 dark:text-red-200",
        outline:
          "border-gray-300 bg-transparent text-gray-800 dark:border-gray-600 dark:text-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
