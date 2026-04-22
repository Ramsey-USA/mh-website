/**
 * Projects Search Hook
 * Manages search and filtering logic for projects
 */

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PortfolioService } from "@/lib/services/portfolio-service";
import { useAnalytics } from "@/components/analytics/EnhancedAnalytics";

export function useProjectsSearch() {
  const { trackSearchPerformed, trackSearchFilterUsed, trackSearchClear } =
    useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const normalizedDeferredSearchQuery = useMemo(
    () => deferredSearchQuery.trim(),
    [deferredSearchQuery],
  );
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
    const urlParams = new URLSearchParams(globalThis.location.search);
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
    const timeoutId = globalThis.setTimeout(() => {
      const urlParams = new URLSearchParams();

      if (normalizedDeferredSearchQuery) {
        urlParams.set("search", normalizedDeferredSearchQuery);
      }
      if (selectedCategory && selectedCategory !== "all") {
        urlParams.set("category", selectedCategory);
      }

      const nextQueryString = urlParams.toString();
      const nextUrl = nextQueryString
        ? `${globalThis.location.pathname}?${nextQueryString}`
        : globalThis.location.pathname;
      const currentUrl = `${globalThis.location.pathname}${globalThis.location.search}`;

      if (nextUrl !== currentUrl) {
        globalThis.history.replaceState({}, "", nextUrl);
      }
    }, 250);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [normalizedDeferredSearchQuery, selectedCategory]);

  // Get projects based on selected category and search query
  const projects = useMemo(() => {
    return PortfolioService.searchProjects(
      selectedCategory,
      deferredSearchQuery,
    );
  }, [selectedCategory, deferredSearchQuery]);

  // Track search analytics (after projects is defined)
  useEffect(() => {
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;

    if (normalizedDeferredSearchQuery) {
      timeoutId = globalThis.setTimeout(() => {
        analyticsRef.current.trackSearchPerformed(
          normalizedDeferredSearchQuery,
          "projects_page",
          projects.length,
        );
      }, 750);
    }

    return () => {
      if (timeoutId !== undefined) {
        globalThis.clearTimeout(timeoutId);
      }
    };
  }, [normalizedDeferredSearchQuery, projects.length]);

  // Track category filter usage
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      analyticsRef.current.trackSearchFilterUsed(
        "category",
        selectedCategory,
        normalizedDeferredSearchQuery,
      );
    }
  }, [normalizedDeferredSearchQuery, selectedCategory]);

  // Clear search function with analytics
  const clearSearch = useCallback(() => {
    analyticsRef.current.trackSearchClear(
      searchQuery,
      selectedCategory !== "all",
    );
    setSearchQuery("");
    setSelectedCategory("all");
  }, [searchQuery, selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    projects,
    clearSearch,
  };
}
