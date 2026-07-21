import { type HTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const focusRingVariants = cva(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      tone: {
        primary:
          "focus-visible:ring-brand-primary focus-visible:ring-offset-white dark:focus-visible:ring-brand-secondary dark:focus-visible:ring-offset-gray-950",
        neutral:
          "focus-visible:ring-gray-700 focus-visible:ring-offset-white dark:focus-visible:ring-gray-300 dark:focus-visible:ring-offset-gray-950",
      },
      inset: {
        true: "focus-visible:ring-offset-0",
        false: "",
      },
    },
    defaultVariants: {
      tone: "primary",
      inset: false,
    },
  },
);

export interface FocusRingProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof focusRingVariants> {
  asChild?: boolean;
}

export function FocusRing({
  asChild = false,
  className,
  tone,
  inset,
  ...props
}: FocusRingProps) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(focusRingVariants({ tone, inset }), className)}
      {...props}
    />
  );
}

export { focusRingVariants };
