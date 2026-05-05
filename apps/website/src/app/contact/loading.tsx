export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form skeleton */}
          <div className="space-y-6">
            <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-xl" />
              </div>
            ))}
            <div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            </div>
            <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>

          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))}
            {/* Map skeleton */}
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
