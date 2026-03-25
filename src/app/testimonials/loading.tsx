export default function TestimonialsLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-gray-100 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-4" />
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Testimonial card grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"
                  />
                ))}
              </div>
              {/* Quote lines */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
                <div className="h-4 w-4/5 bg-gray-100 dark:bg-gray-700/50 rounded" />
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                <div className="space-y-1">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-20 bg-gray-100 dark:bg-gray-700/50 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
