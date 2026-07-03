import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 border-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none btn-lift btn-shine",
  {
    variants: {
      variant: {
        // MH Construction Primary - Hunter Green
        primary:
          "border-brand-primary bg-brand-primary text-white hover:bg-brand-primary-dark hover:border-brand-primary-dark focus:ring-brand-primary shadow-[0_4px_16px_rgba(56,104,81,0.25)] hover:shadow-[0_8px_24px_rgba(56,104,81,0.35)]",

        // MH Construction Secondary - Leather Tan
        secondary:
          "border-brand-secondary bg-brand-secondary text-gray-900 hover:bg-brand-secondary-dark hover:border-brand-secondary-dark focus:ring-brand-secondary shadow-[0_4px_16px_rgba(189,146,100,0.25)] hover:shadow-[0_8px_24px_rgba(189,146,100,0.35)]",

        // MH Construction Outline — Bronze border for premium CTA feel
        outline:
          "border-brand-primary bg-transparent text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:border-brand-primary-dark focus:ring-brand-primary/50 shadow-none",

        // Neutral/Theme-aware
        neutral:
          "border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:hover:border-gray-100 focus:ring-gray-500",

        // Standard utility variants
        default:
          "border-brand-primary/25 bg-white dark:bg-gray-900 text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:border-brand-primary/40 focus:ring-brand-primary",

        destructive:
          "border-red-500 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-600 dark:hover:border-red-300 focus:ring-red-500",

        ghost:
          "border-transparent bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:ring-gray-500",

        link: "border-transparent bg-transparent text-brand-primary dark:text-bronze-400 underline-offset-4 hover:underline hover:text-brand-secondary dark:hover:text-bronze-300 focus:ring-brand-primary/50",
      },
      size: {
        sm: "h-9 px-3.5 text-xs min-w-[76px]",
        default: "h-11 px-4.5 text-sm min-w-[92px]",
        lg: "h-12 px-6 text-base min-w-[108px]",
        xl: "h-14 px-8 text-lg min-w-[124px]",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
