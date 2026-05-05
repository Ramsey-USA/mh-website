export default function TeamLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-2/5 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Team grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="h-64 bg-gray-200 dark:bg-gray-700" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="space-y-1">
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
                  <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-700/50 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
