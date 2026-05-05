/**
 * Simple Skeleton Component
 * Lightweight loading placeholder for dynamic imports
 */

import { cn } from "@/lib/utils";

interface SimpleSkeletonProps {
  height?: string;
  className?: string;
}

export function SimpleSkeleton({
  height = "h-96",
  className = "",
}: SimpleSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-100 dark:bg-gray-800",
        height,
        className,
      )}
      aria-label="Loading..."
      role="status"
    />
  );
}
