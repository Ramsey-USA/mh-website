/**
 * Projects Filter Section
 * Category filters and search interface
 */

import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { categories } from "./projectsData";

interface ProjectsFilterSectionProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  resultsCount: number;
}

export function ProjectsFilterSection({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
  resultsCount,
}: Readonly<ProjectsFilterSectionProps>) {
  const normalizedSearchQuery = searchQuery.trim();
  const hasActiveFilters =
    selectedCategory !== "all" || normalizedSearchQuery.length > 0;

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-12 border-gray-200 border-y dark:border-gray-700">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-8 text-center scroll-reveal">
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                Find Your Perfect
              </span>
              <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                Partnership
              </span>
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 mx-auto max-w-2xl">
            <div className="relative">
              <MaterialIcon
                icon="search"
                size="md"
                className="top-1/2 left-4 absolute text-gray-600 -translate-y-1/2 transform"
              />
              <input
                type="text"
                placeholder="Search partnerships by title, description, or location..."
                aria-label="Search projects"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-white dark:bg-gray-700 py-4 pr-4 pl-12 border border-gray-300 dark:border-gray-600 focus:border-brand-primary dark:focus:border-brand-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 w-full text-gray-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={onClearSearch}
                  className="top-1/2 right-4 absolute hover:bg-gray-200 dark:hover:bg-gray-600 p-1 rounded-full text-gray-600 hover:text-gray-600 dark:hover:text-gray-300 transition-colors -translate-y-1/2 transform"
                  aria-label="Clear search"
                >
                  <MaterialIcon icon="close" size="sm" />
                </button>
              )}
            </div>
            <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
              Try terms like project type, city, or specialty scope.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                aria-pressed={selectedCategory === category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                className={`
                  ${
                    selectedCategory === category.id
                      ? "bg-brand-primary hover:bg-brand-primary-dark text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600"
                  }
                `}
              >
                <MaterialIcon icon={category.icon} className="mr-2" size="md" />
                {category.label}
              </Button>
            ))}
          </div>

          <div
            className="mx-auto mt-6 max-w-3xl rounded-xl border border-gray-200 bg-white/80 px-4 py-3 text-center text-sm text-gray-700 shadow-xs dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200"
            aria-live="polite"
          >
            <span className="font-semibold">{resultsCount}</span>{" "}
            {resultsCount === 1 ? "project match" : "project matches"}
            {hasActiveFilters && (
              <>
                {" "}
                for your current filters.
                <Button
                  type="button"
                  variant="link"
                  className="ml-1 p-0 font-semibold text-brand-primary"
                  onClick={onClearSearch}
                >
                  Reset all
                </Button>
              </>
            )}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
