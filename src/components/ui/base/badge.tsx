import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 border rounded-full focus:outline-none focus:ring-[#386851] focus:ring-2 focus:ring-offset-2 font-semibold text-xs transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#386851] text-white hover:bg-[#2D5443]",
        secondary:
          "border-transparent bg-[#BD9264] text-white hover:bg-[#9A7451]",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        outline:
          "text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
