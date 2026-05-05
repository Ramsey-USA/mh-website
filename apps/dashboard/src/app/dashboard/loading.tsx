export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"
            >
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>

        {/* Chart skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm mb-6">
          <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="h-64 bg-gray-100 dark:bg-gray-700/50 rounded-xl" />
        </div>

        {/* Table skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <div className="h-4 flex-1 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
