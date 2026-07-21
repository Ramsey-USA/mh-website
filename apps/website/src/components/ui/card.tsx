import { type HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-3xl border bg-white text-gray-900 shadow-sm transition-colors duration-200 dark:bg-gray-900 dark:text-white overflow-hidden",
  {
    variants: {
      variant: {
        service:
          "border-brand-primary/25 hover:border-brand-primary/40 dark:border-brand-primary/35 dark:hover:border-brand-primary/55",
        project:
          "border-brand-secondary/35 hover:border-brand-secondary/55 dark:border-brand-secondary/40 dark:hover:border-brand-secondary/60",
        proof:
          "border-emerald-600/25 hover:border-emerald-700/45 dark:border-emerald-400/35 dark:hover:border-emerald-300/55",
        testimonial:
          "border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600",
        event:
          "border-sky-600/25 hover:border-sky-700/45 dark:border-sky-400/35 dark:hover:border-sky-300/55",
        article:
          "border-amber-700/20 hover:border-amber-700/35 dark:border-amber-400/35 dark:hover:border-amber-300/55",
        default: "border-gray-200 dark:border-gray-700",
      },
      emphasis: {
        muted: "bg-gray-50 dark:bg-gray-950",
        default: "bg-white dark:bg-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
      emphasis: "default",
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, emphasis, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, emphasis }), className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-heading text-2xl font-bold leading-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-body text-sm text-gray-700 dark:text-gray-300",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { cardVariants };
