/**
 * Projects Search Hook
 * Manages search and filtering logic for projects
 */

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { PortfolioService } from "@/lib/services/portfolio-service";
import { useAnalytics } from "@/components/analytics/EnhancedAnalytics";

export function useProjectsSearch() {
  const { trackSearchPerformed, trackSearchFilterUsed, trackSearchClear } =
    useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const analyticsRef = useRef({
    trackSearchPerformed,
    trackSearchFilterUsed,
    trackSearchClear,
  });

  useEffect(() => {
    analyticsRef.current = {
      trackSearchPerformed,
      trackSearchFilterUsed,
      trackSearchClear,
    };
  }, [trackSearchClear, trackSearchFilterUsed, trackSearchPerformed]);

  // Initialize search from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    const categoryParam = urlParams.get("category");

    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (categoryParam && categoryParam !== "all") {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Update URL when search changes
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const trimmedSearchQuery = searchQuery.trim();
      const urlParams = new URLSearchParams();

      if (trimmedSearchQuery) {
        urlParams.set("search", trimmedSearchQuery);
      }
      if (selectedCategory && selectedCategory !== "all") {
        urlParams.set("category", selectedCategory);
      }

      const nextQueryString = urlParams.toString();
      const nextUrl = nextQueryString
        ? `${window.location.pathname}?${nextQueryString}`
        : window.location.pathname;
      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (nextUrl !== currentUrl) {
        window.history.replaceState({}, "", nextUrl);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchQuery, selectedCategory]);

  // Get projects based on selected category and search query
  const projects = useMemo(() => {
    return PortfolioService.searchProjects(
      selectedCategory,
      deferredSearchQuery,
    );
  }, [selectedCategory, deferredSearchQuery]);

  // Track search analytics (after projects is defined)
  useEffect(() => {
    let timeoutId: number | undefined;
    const trimmedSearchQuery = deferredSearchQuery.trim();

    if (trimmedSearchQuery) {
      timeoutId = window.setTimeout(() => {
        analyticsRef.current.trackSearchPerformed(
          trimmedSearchQuery,
          "projects_page",
          projects.length,
        );
      }, 750);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [deferredSearchQuery, projects.length]);

  // Track category filter usage
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      analyticsRef.current.trackSearchFilterUsed(
        "category",
        selectedCategory,
        deferredSearchQuery.trim(),
      );
    }
  }, [deferredSearchQuery, selectedCategory]);

  // Clear search function with analytics
  const clearSearch = () => {
    analyticsRef.current.trackSearchClear(
      searchQuery,
      selectedCategory !== "all",
    );
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    projects,
    clearSearch,
  };
}
