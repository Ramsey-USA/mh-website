export default function CareersLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-8">
        {/* Filter pills skeleton */}
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
            />
          ))}
        </div>

        {/* Job cards skeleton */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <div className="h-6 w-56 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
              <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-700/50 rounded" />
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div
                  key={j}
                  className="h-6 w-20 bg-gray-100 dark:bg-gray-700 rounded-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
