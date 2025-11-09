"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/base/button";
import {
  FadeInWhenVisible,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { OptimizedImage } from "@/components/ui/media/OptimizedImage";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  type: "blog" | "project" | "service" | "testimonial";
  date?: Date;
  featured?: boolean;
}

interface SearchFilters {
  category: string;
  type: string;
  dateRange: string;
  featured: boolean;
}

interface DynamicSearchProps {
  items: SearchableItem[];
  placeholder?: string;
  categories?: string[];
  showFilters?: boolean;
  showViewToggle?: boolean;
  onItemClick?: (item: SearchableItem) => void;
  className?: string;
  enableFuzzySearch?: boolean;
  maxResults?: number;
  debounceMs?: number;
}

// Enhanced search utilities
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s]/g, " ") // Replace special chars with spaces
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

const calculateRelevanceScore = (
  item: SearchableItem,
  query: string,
): number => {
  const normalizedQuery = normalizeString(query);
  const queryWords = normalizedQuery.split(" ").filter(Boolean);

  if (queryWords.length === 0) return 0;

  let score = 0;
  const normalizedTitle = normalizeString(item.title);
  const normalizedDesc = normalizeString(item.description);
  const normalizedCategory = normalizeString(item.category);
  const normalizedTags = item.tags.map(normalizeString);

  queryWords.forEach((word) => {
    // Exact title match - highest score
    if (normalizedTitle.includes(word)) {
      score += normalizedTitle.startsWith(word) ? 100 : 50;
    }

    // Category match - high score
    if (normalizedCategory.includes(word)) {
      score += 30;
    }

    // Tags match - good score
    normalizedTags.forEach((tag: string) => {
      if (tag.includes(word)) {
        score += tag === word ? 25 : 15;
      }
    });

    // Description match - basic score
    if (normalizedDesc.includes(word)) {
      score += 10;
    }

    // Featured items bonus
    if (item.featured) {
      score += 5;
    }

    // Recent items bonus (if date exists)
    if (item.date) {
      const daysSinceCreated =
        (Date.now() - item.date.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceCreated < 30) score += 5;
    }
  });

  return score;
};

const fuzzyMatch = (text: string, query: string): boolean => {
  const normalizedText = normalizeString(text);
  const normalizedQuery = normalizeString(query);

  if (normalizedQuery.length === 0) return true;
  if (normalizedText.length === 0) return false;

  let textIndex = 0;
  let queryIndex = 0;

  while (
    textIndex < normalizedText.length &&
    queryIndex < normalizedQuery.length
  ) {
    if (normalizedText[textIndex] === normalizedQuery[queryIndex]) {
      queryIndex++;
    }
    textIndex++;
  }

  return queryIndex === normalizedQuery.length;
};

// Debounce hook for search input
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DynamicSearch = ({
  items = [],
  placeholder = "Search for projects, blog posts, services...",
  categories = [],
  showFilters = true,
  showViewToggle = true,
  onItemClick,
  className = "",
  enableFuzzySearch = true,
  maxResults = 50,
  debounceMs = 300,
}: DynamicSearchProps) => {
  const { trackEvent } = useAnalytics();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    category: "",
    type: "",
    dateRange: "",
    featured: false,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search query
  const debouncedSearchQuery = useDebounce(searchQuery, debounceMs);

  // Enhanced filtered and searched results with performance optimization
  const filteredItems = useMemo(() => {
    setIsSearching(true);

    let filtered = items;
    const hasSearchQuery = debouncedSearchQuery.trim().length > 0;

    // Apply search query with relevance scoring
    if (hasSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();

      if (enableFuzzySearch) {
        // Fuzzy search with relevance scoring
        filtered = filtered
          .map((item) => ({
            ...item,
            relevanceScore: calculateRelevanceScore(item, query),
          }))
          .filter(
            (item) =>
              item.relevanceScore > 0 ||
              fuzzyMatch(item.title, query) ||
              fuzzyMatch(item.description, query) ||
              item.tags.some((tag) => fuzzyMatch(tag, query)),
          )
          .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
      } else {
        // Standard search
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
            item.category.toLowerCase().includes(query),
        );
      }
    }

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    if (filters.featured) {
      filtered = filtered.filter((item) => item.featured);
    }

    if (filters.dateRange) {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.dateRange) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(
        (item) => item.date && item.date >= filterDate,
      );
    }

    // Limit results for performance
    filtered = filtered.slice(0, maxResults);

    setTimeout(() => setIsSearching(false), 100);
    return filtered;
  }, [items, debouncedSearchQuery, filters, enableFuzzySearch, maxResults]);

  // Enhanced search analytics with debouncing
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      trackEvent("site_search", {
        event_category: "user_engagement",
        search_term: debouncedSearchQuery,
        results_count: filteredItems.length,
        search_type: enableFuzzySearch ? "fuzzy" : "exact",
        has_filters: Object.values(filters).some(Boolean),
      });
    }
  }, [
    debouncedSearchQuery,
    filteredItems.length,
    trackEvent,
    enableFuzzySearch,
    filters,
  ]);

  const clearFilters = useCallback(() => {
    setFilters({
      category: "",
      type: "",
      dateRange: "",
      featured: false,
    });
    setSearchQuery("");
    trackEvent("search_filters_cleared", {
      event_category: "user_engagement",
    });
  }, [trackEvent]);

  const handleItemClick = useCallback(
    (item: SearchableItem) => {
      trackEvent("search_result_click", {
        event_category: "user_engagement",
        item_type: item.type,
        item_id: item.id,
        search_query: debouncedSearchQuery,
        result_position: filteredItems.findIndex((i) => i.id === item.id) + 1,
      });

      if (onItemClick) {
        onItemClick(item);
      }
    },
    [trackEvent, debouncedSearchQuery, filteredItems, onItemClick],
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Clear search with Escape
      if (event.key === "Escape" && searchQuery) {
        setSearchQuery("");
        event.preventDefault();
      }

      // Focus search with Ctrl+K or Cmd+K
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        const searchInput = document.querySelector(
          'input[type="text"]',
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  const renderGridView = () => (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredItems.map((item, _index) => (
        <HoverScale key={item.id}>
          <div
            className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(item);
                e.preventDefault();
              }
            }}
            aria-label={`View ${item.title}`}
          >
            {item.image && (
              <div className="w-full aspect-video overflow-hidden">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  width={400}
                  height={225}
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-2 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                {item.featured && (
                  <span className="flex-shrink-0 bg-brand-primary/10 text-brand-primary ml-2 px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
              </div>
              <p className="mb-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      item.type === "blog"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : item.type === "project"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : item.type === "service"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {item.category}
                  </span>
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </HoverScale>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item, _index) => (
        <FadeInWhenVisible key={item.id}>
          <div
            className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg dark:shadow-gray-900/20 p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 cursor-pointer hover:border-brand-primary/50"
            onClick={() => handleItemClick(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleItemClick(item);
                e.preventDefault();
              }
            }}
            aria-label={`View ${item.title}`}
          >
            <div className="flex items-start space-x-4">
              {item.image && (
                <div className="flex-shrink-0 rounded-lg w-24 h-24 overflow-hidden">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.featured && (
                    <span className="bg-brand-primary/10 text-brand-primary ml-2 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mb-3 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.type === "blog"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : item.type === "project"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : item.type === "service"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {item.category}
                    </span>
                    {item.date && (
                      <span className="text-gray-400 dark:text-gray-500 text-xs">
                        {item.date.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <MaterialIcon
                    icon="arrow_forward"
                    className="w-4 h-4 text-gray-400 dark:text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      ))}
    </div>
  );

  return (
    <FadeInWhenVisible className={`w-full ${className}`}>
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex sm:flex-row flex-col gap-4 mb-4">
          {/* Enhanced Search Input */}
          <div className="relative flex-1">
            <MaterialIcon
              icon="search"
              className="top-1/2 left-3 absolute w-5 h-5 text-gray-400 dark:text-gray-500 -translate-y-1/2 transform"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`${placeholder} (Ctrl+K to focus)`}
              className="py-3 pr-12 pl-11 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-primary rounded-lg focus:ring-2 focus:ring-brand-primary/20 w-full transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
              aria-label="Search items"
            />
            {isSearching && (
              <div className="top-1/2 right-10 absolute -translate-y-1/2 transform">
                <div className="animate-spin rounded-full w-4 h-4 border-2 border-brand-primary border-t-transparent"></div>
              </div>
            )}
            {searchQuery && !isSearching && (
              <button
                onClick={() => setSearchQuery("")}
                className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 -translate-y-1/2 transform transition-colors"
                aria-label="Clear search"
              >
                <MaterialIcon icon="close" className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {showFilters && (
              <Button
                variant="outline"
                onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                className={`${showFiltersPanel ? "bg-brand-primary/10 border-brand-primary text-brand-primary" : ""} transition-all duration-200`}
                aria-expanded={showFiltersPanel}
                aria-label="Toggle filters"
              >
                <MaterialIcon icon="tune" className="mr-2 w-4 h-4" />
                Filters
                {Object.values(filters).some(Boolean) && (
                  <span className="bg-brand-primary ml-2 w-2 h-2 rounded-full"></span>
                )}
              </Button>
            )}

            {showViewToggle && (
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-brand-primary text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Grid view"
                  aria-pressed={viewMode === "grid"}
                >
                  <MaterialIcon icon="grid_view" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-brand-primary text-white"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                  aria-label="List view"
                  aria-pressed={viewMode === "list"}
                >
                  <MaterialIcon icon="view_list" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Filters Panel */}
        {showFilters && showFiltersPanel && (
          <FadeInWhenVisible className="bg-gray-50 dark:bg-gray-800/50 mb-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              <div>
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg w-full focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg w-full focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="">All Types</option>
                  <option value="blog">Blog Posts</option>
                  <option value="project">Projects</option>
                  <option value="service">Services</option>
                  <option value="testimonial">Testimonials</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-gray-300">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg w-full focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                >
                  <option value="">All Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) =>
                      setFilters({ ...filters, featured: e.target.checked })
                    }
                    className="mr-2 w-4 h-4 text-brand-primary bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-brand-primary focus:ring-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Featured Only
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {filteredItems.length} result
                {filteredItems.length !== 1 ? "s" : ""} found
                {enableFuzzySearch &&
                  debouncedSearchQuery &&
                  " (with smart matching)"}
              </span>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <MaterialIcon icon="clear_all" className="mr-1 w-4 h-4" />
                Clear All
              </Button>
            </div>
          </FadeInWhenVisible>
        )}
      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <div className="py-16 text-center">
          <div className="max-w-md mx-auto">
            <MaterialIcon
              icon="search_off"
              className="mx-auto mb-4 w-16 h-16 text-gray-400 dark:text-gray-500"
            />
            <h3 className="mb-2 font-medium text-gray-900 dark:text-white text-xl">
              No results found
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              {debouncedSearchQuery
                ? `No results for "${debouncedSearchQuery}". Try adjusting your search or filters.`
                : "Try entering a search term or adjusting your filters."}
            </p>
            {(debouncedSearchQuery || Object.values(filters).some(Boolean)) && (
              <Button onClick={clearFilters} variant="outline">
                <MaterialIcon icon="refresh" className="mr-2 w-4 h-4" />
                Clear Search & Filters
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-in duration-500 fade-in">
          {viewMode === "grid" ? renderGridView() : renderListView()}

          {filteredItems.length === maxResults && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Showing first {maxResults} results. Try refining your search for
                more specific results.
              </p>
            </div>
          )}
        </div>
      )}
    </FadeInWhenVisible>
  );
};

export default DynamicSearch;
export type { SearchableItem, SearchFilters };
