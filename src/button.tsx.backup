import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex justify-center items-center disabled:opacity-50 border-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-medium transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // MH Construction Primary - Hunter Green
        primary:
          "border-brand-primary bg-white dark:bg-gray-900 text-brand-primary dark:text-bronze-400 hover:bg-brand-primary hover:text-white hover:border-brand-accent focus:ring-brand-primary shadow-[0_4px_16px_rgba(56,104,81,0.2)] hover:shadow-[0_8px_25px_rgba(56,104,81,0.35)]",

        // MH Construction Secondary - Leather Tan
        secondary:
          "border-brand-secondary bg-white dark:bg-gray-900 text-brand-secondary dark:text-bronze-300 hover:bg-brand-secondary hover:text-white hover:border-bronze-700 focus:ring-brand-secondary shadow-[0_4px_16px_rgba(189,146,100,0.2)] hover:shadow-[0_8px_25px_rgba(189,146,100,0.35)]",

        // MH Construction Outline
        outline:
          "border-brand-primary bg-transparent text-brand-primary dark:text-bronze-400 hover:bg-brand-primary/5 dark:hover:bg-bronze-400/10 focus:ring-brand-primary/50",

        // Neutral/Theme-aware
        neutral:
          "border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:hover:border-gray-100 focus:ring-gray-500",

        // Standard utility variants
        default:
          "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-gray-500",

        destructive:
          "border-red-500 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-600 dark:hover:border-red-300 focus:ring-red-500",

        ghost:
          "border-transparent bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700 focus:ring-gray-500",

        link: "border-transparent bg-transparent text-brand-primary dark:text-bronze-400 underline-offset-4 hover:underline hover:text-brand-accent dark:hover:text-bronze-300 focus:ring-brand-primary/50 hover:translate-y-0",
      },
      size: {
        sm: "h-8 px-3 text-xs min-w-[72px]",
        default: "h-10 px-4 text-sm min-w-[88px]",
        lg: "h-12 px-6 text-base min-w-[104px]",
        xl: "h-14 px-8 text-lg min-w-[120px]",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
