import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      narrow: "max-w-3xl",
      standard: "max-w-7xl",
      wide: "max-w-[88rem]",
    },
    gutter: {
      default: "px-4 sm:px-6 lg:px-8",
      compact: "px-4 sm:px-5",
      none: "px-0",
    },
  },
  defaultVariants: {
    size: "standard",
    gutter: "default",
  },
});

export interface ContainerProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({
  className,
  size,
  gutter,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size, gutter }), className)}
      {...props}
    />
  );
}

export { containerVariants };
