/**
 * Projects Search Hook
 * Manages search and filtering logic for projects
 */

import { useState, useMemo, useEffect } from "react";
import { PortfolioService } from "@/lib/services/portfolioService";
import { useAnalytics } from "@/components/analytics/enhanced-analytics";

export function useProjectsSearch() {
  const { trackSearchPerformed, trackSearchFilterUsed, trackSearchClear } =
    useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
    const urlParams = new URLSearchParams();
    if (searchQuery.trim()) {
      urlParams.set("search", searchQuery);
    }
    if (selectedCategory && selectedCategory !== "all") {
      urlParams.set("category", selectedCategory);
    }

    const newUrl = urlParams.toString()
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [searchQuery, selectedCategory]);

  // Get projects based on selected category and search query
  const projects = useMemo(() => {
    let filteredProjects =
      PortfolioService.getProjectsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      filteredProjects = filteredProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.subcategory &&
            project.subcategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          project.location.city
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (project.tags &&
            project.tags.some((tag) =>
              tag.toLowerCase().includes(searchQuery.toLowerCase()),
            )),
      );
    }

    return filteredProjects;
  }, [selectedCategory, searchQuery]);

  // Track search analytics (after projects is defined)
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        trackSearchPerformed(searchQuery, "projects_page", projects.length);
      }, 1000); // Debounce tracking

      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery, projects.length, trackSearchPerformed]);

  // Track category filter usage
  useEffect(() => {
    if (selectedCategory && selectedCategory !== "all") {
      trackSearchFilterUsed("category", selectedCategory, searchQuery);
    }
  }, [selectedCategory, searchQuery, trackSearchFilterUsed]);

  // Clear search function with analytics
  const clearSearch = () => {
    trackSearchClear(searchQuery, selectedCategory !== "all");
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
