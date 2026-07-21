import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 font-semibold transition-colors duration-200 touch-manipulation disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-brand-secondary",
  {
    variants: {
      variant: {
        default:
          "border-brand-primary/35 bg-white text-brand-primary hover:border-brand-primary hover:bg-brand-primary/5 dark:border-brand-primary/50 dark:bg-gray-900 dark:text-brand-primary-light dark:hover:bg-brand-primary/10",
        primary:
          "border-brand-primary bg-brand-primary text-white hover:border-brand-primary-dark hover:bg-brand-primary-dark",
        secondary:
          "border-brand-secondary bg-brand-secondary text-gray-950 hover:border-brand-secondary-dark hover:bg-brand-secondary-dark",
        outline:
          "border-brand-primary bg-transparent text-brand-primary hover:border-brand-primary-dark hover:bg-brand-primary/5 dark:border-brand-primary-light dark:text-brand-primary-light dark:hover:bg-brand-primary/10",
        text: "border-transparent bg-transparent px-2 text-brand-primary hover:text-brand-primary-dark hover:underline dark:text-brand-secondary dark:hover:text-brand-secondary-light",
        link: "border-transparent bg-transparent px-2 text-brand-primary hover:text-brand-primary-dark hover:underline dark:text-brand-secondary dark:hover:text-brand-secondary-light",
      },
      size: {
        sm: "min-h-10 rounded-lg px-3 text-sm",
        md: "min-h-11 px-4 text-sm",
        lg: "min-h-12 px-6 text-base",
        icon: "h-11 w-11 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, asChild = false, type, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
