"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/base/button";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
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
}

const DynamicSearch = ({
  items = [],
  placeholder = "Search for projects, blog posts, services...",
  categories = [],
  showFilters = true,
  showViewToggle = true,
  onItemClick,
  className = "",
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

  // Memoized filtered and searched results
  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.category.toLowerCase().includes(query),
      );
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

    return filtered;
  }, [items, searchQuery, filters]);

  // Track search analytics
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        trackEvent("site_search", {
          event_category: "user_engagement",
          search_term: searchQuery,
          results_count: filteredItems.length,
        });
      }, 1000); // Debounce search tracking

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, filteredItems.length, trackEvent]);

  const clearFilters = () => {
    setFilters({
      category: "",
      type: "",
      dateRange: "",
      featured: false,
    });
    setSearchQuery("");
  };

  const handleItemClick = (item: SearchableItem) => {
    trackEvent("search_result_click", {
      event_category: "user_engagement",
      item_type: item.type,
      item_id: item.id,
      search_query: searchQuery,
    });

    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderGridView = () => (
    <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-sm border rounded-lg overflow-hidden transition-transform cursor-pointer transform"
          onClick={() => handleItemClick(item)}
        >
          {item.image && (
            <div className="w-full aspect-video overflow-hidden">
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                width={400}
                height={225}
              />
            </div>
          )}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg line-clamp-2">
                {item.title}
              </h3>
              {item.featured && (
                <span className="flex-shrink-0 bg-primary-100 ml-2 px-2 py-1 rounded-full text-primary-800 text-xs">
                  Featured
                </span>
              )}
            </div>
            <p className="mb-3 text-gray-600 text-sm line-clamp-3">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.type === "blog"
                      ? "bg-green-100 text-green-800"
                      : item.type === "project"
                        ? "bg-blue-100 text-blue-800"
                        : item.type === "service"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.type}
                </span>
                <span className="text-gray-500 text-xs">{item.category}</span>
              </div>
              <MaterialIcon
                icon="arrow_forward"
                className="w-4 h-4 text-gray-400"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow-sm p-4 border rounded-lg hover:scale-[1.02] transition-transform cursor-pointer transform"
          onClick={() => handleItemClick(item)}
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
                <h3 className="font-semibold text-lg">{item.title}</h3>
                {item.featured && (
                  <span className="bg-primary-100 ml-2 px-2 py-1 rounded-full text-primary-800 text-xs">
                    Featured
                  </span>
                )}
              </div>
              <p className="mb-3 text-gray-600 text-sm line-clamp-2">
                {item.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.type === "blog"
                        ? "bg-green-100 text-green-800"
                        : item.type === "project"
                          ? "bg-blue-100 text-blue-800"
                          : item.type === "service"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-gray-500 text-xs">{item.category}</span>
                  {item.date && (
                    <span className="text-gray-400 text-xs">
                      {item.date.toLocaleDateString()}
                    </span>
                  )}
                </div>
                <MaterialIcon
                  icon="arrow_forward"
                  className="w-4 h-4 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <FadeInWhenVisible className={`w-full ${className}`}>
      {/* Search Header */}
      <div className="mb-6">
        <div className="flex sm:flex-row flex-col gap-4 mb-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <MaterialIcon
              icon="search"
              className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholder}
              className="py-3 pr-4 pl-10 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-primary-500 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="top-1/2 right-3 absolute text-gray-400 hover:text-gray-600 -translate-y-1/2 transform"
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
                className={showFiltersPanel ? "bg-primary-50" : ""}
              >
                <MaterialIcon icon="filter_list" className="mr-2 w-4 h-4" />
                Filters
              </Button>
            )}

            {showViewToggle && (
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <MaterialIcon icon="grid_view" className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary-100 text-primary-700"
                      : "bg-white text-gray-600"
                  }`}
                >
                  <MaterialIcon icon="list" className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && showFiltersPanel && (
          <FadeInWhenVisible className="bg-gray-50 mb-4 p-4 rounded-lg">
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
              <div>
                <label className="block mb-2 font-medium text-sm">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
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
                <label className="block mb-2 font-medium text-sm">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">All Types</option>
                  <option value="blog">Blog Posts</option>
                  <option value="project">Projects</option>
                  <option value="service">Services</option>
                  <option value="testimonial">Testimonials</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm">
                  Date Range
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) =>
                    setFilters({ ...filters, dateRange: e.target.value })
                  }
                  className="p-2 border rounded-lg w-full"
                >
                  <option value="">All Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) =>
                      setFilters({ ...filters, featured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Featured Only
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">
                {filteredItems.length} result
                {filteredItems.length !== 1 ? "s" : ""} found
              </span>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </FadeInWhenVisible>
        )}
      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center">
          <MaterialIcon
            icon="search"
            className="mx-auto mb-4 w-12 h-12 text-gray-400"
          />
          <h3 className="mb-2 font-medium text-gray-900 text-lg">
            No results found
          </h3>
          <p className="text-gray-600">
            {searchQuery
              ? `No results for "${searchQuery}"`
              : "Try adjusting your search or filters"}
          </p>
        </div>
      ) : (
        <div className="animate-in duration-500 fade-in">
          {viewMode === "grid" ? renderGridView() : renderListView()}
        </div>
      )}
    </FadeInWhenVisible>
  );
};

export default DynamicSearch;
export type { SearchableItem, SearchFilters };
