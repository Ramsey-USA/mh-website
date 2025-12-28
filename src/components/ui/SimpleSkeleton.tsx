/**
 * Simple Skeleton Component
 * Lightweight loading placeholder for dynamic imports
 */

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
      className={`animate-pulse bg-gray-100 dark:bg-gray-800 ${height} ${className}`}
      aria-label="Loading..."
      role="status"
    />
  );
}
