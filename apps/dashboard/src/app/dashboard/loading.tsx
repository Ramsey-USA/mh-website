export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-brand-light to-brand-secondary-light/20 dark:from-brand-primary-darker dark:to-brand-primary-dark p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-brand-primary/20 dark:bg-brand-primary/40 rounded-lg" />
          <div className="h-10 w-32 bg-brand-secondary/25 dark:bg-brand-secondary/35 rounded-lg" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-brand-light/75 dark:bg-brand-primary-dark/55 rounded-2xl p-6 shadow-sm border border-brand-primary/20"
            >
              <div className="h-4 w-24 bg-brand-primary/20 dark:bg-brand-primary/45 rounded mb-3" />
              <div className="h-8 w-16 bg-brand-secondary/30 dark:bg-brand-secondary/40 rounded" />
            </div>
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="bg-brand-light/75 dark:bg-brand-primary-dark/55 rounded-2xl p-6 shadow-sm border border-brand-primary/20 mb-6">
          <div className="h-5 w-40 bg-brand-primary/20 dark:bg-brand-primary/45 rounded mb-6" />
          <div className="h-64 bg-brand-primary/10 dark:bg-brand-primary-darker/55 rounded-xl" />
        </div>

        {/* Table skeleton */}
        <div className="bg-brand-light/75 dark:bg-brand-primary-dark/55 rounded-2xl p-6 shadow-sm border border-brand-primary/20">
          <div className="h-5 w-32 bg-brand-primary/20 dark:bg-brand-primary/45 rounded mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 py-3 border-b border-brand-primary/10 dark:border-brand-primary/35 last:border-0"
            >
              <div className="h-4 flex-1 bg-brand-primary/20 dark:bg-brand-primary/45 rounded" />
              <div className="h-4 w-20 bg-brand-secondary/25 dark:bg-brand-secondary/35 rounded" />
              <div className="h-4 w-16 bg-brand-primary/20 dark:bg-brand-primary/45 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
