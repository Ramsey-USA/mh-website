/**
 * Loading Skeleton Components
 * Reusable skeleton loaders for better perceived performance
 * Shows placeholder content while real content is loading
 */

/**
 * Base Skeleton Component
 */
export function Skeleton({
  className = "",
  variant = "rounded",
}: {
  className?: string;
  variant?: "rounded" | "circular" | "rectangular";
}) {
  const variantClasses = {
    rounded: "rounded-lg",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${variantClasses[variant]} ${className}`}
      aria-label="Loading..."
      role="status"
    />
  );
}

/**
 * Card Skeleton for testimonials, service cards, etc.
 */
export function CardSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4"
        >
          {/* Header with avatar and name */}
          <div className="flex items-center gap-4">
            <Skeleton variant="circular" className="w-12 h-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          {/* Content lines */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          {/* Rating stars */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-5 h-5" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Team Member Card Skeleton
 */
export function TeamMemberSkeleton({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          {/* Image placeholder */}
          <Skeleton className="w-full h-64" variant="rectangular" />
          {/* Content */}
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Form Field Skeleton
 */
export function FormFieldSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

/**
 * Table Row Skeleton
 */
export function TableRowSkeleton({
  rows = 3,
  columns = 4,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="p-4">
              <Skeleton className="h-4 w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/**
 * List Item Skeleton
 */
export function ListItemSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <Skeleton variant="circular" className="w-8 h-8 flex-shrink-0" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  );
}

/**
 * Page Header Skeleton
 */
export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto text-center py-12">
      <Skeleton className="h-8 w-32 mx-auto" />
      <Skeleton className="h-12 w-3/4 mx-auto" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-5/6 mx-auto" />
    </div>
  );
}

/**
 * Hero Section Skeleton
 */
export function HeroSkeleton() {
  return (
    <div className="relative h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 space-y-6 text-center">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-5/6 mx-auto" />
        <div className="flex gap-4 justify-center pt-8">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid Skeleton for card grids
 */
export function GridSkeleton({
  columns = 3,
  rows = 2,
  type = "card",
}: {
  columns?: number;
  rows?: number;
  type?: "card" | "team" | "list";
}) {
  const totalItems = columns * rows;
  const gridClasses =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridClasses} gap-6`}>
      {type === "card" && <CardSkeleton count={totalItems} />}
      {type === "team" && <TeamMemberSkeleton count={totalItems} />}
      {type === "list" && <ListItemSkeleton count={totalItems} />}
    </div>
  );
}
