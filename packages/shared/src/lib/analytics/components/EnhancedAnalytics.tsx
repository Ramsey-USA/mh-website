"use client";

import { trackAnalyticsEvent, trackCustomAnalyticsEvent } from "../tracking";

// Hook for tracking analytics events
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters: Record<string, string | number | boolean | undefined> = {},
  ) => {
    if (eventName === "exception") {
      const description = parameters["description"];
      if (typeof description !== "string") {
        return;
      }

      trackAnalyticsEvent("exception", {
        description,
        ...(typeof parameters["fatal"] === "boolean"
          ? { fatal: parameters["fatal"] }
          : {}),
      });
      return;
    }

    if (eventName === "click") {
      const element = parameters["element"];
      if (typeof element !== "string") {
        return;
      }

      trackAnalyticsEvent("click", {
        element,
        page_path:
          typeof window !== "undefined" ? window.location.pathname : "/",
        ...(parameters as Record<
          string,
          string | number | boolean | undefined
        >),
      });
      return;
    }

    trackCustomAnalyticsEvent(eventName, parameters);
  };

  const trackPageView = (path: string, title?: string) => {
    trackAnalyticsEvent("page_view", {
      page_title:
        title || (typeof document !== "undefined" ? document.title : ""),
      page_location:
        typeof window !== "undefined"
          ? `${window.location.origin}${path}`
          : path,
      page_path: path,
    });
  };

  const trackConversion = (conversionType: string, value?: number) => {
    trackAnalyticsEvent("conversion", {
      conversion_type: conversionType,
    });

    void value;
  };

  // Construction-specific tracking events
  const trackFormSubmission = (formType: string, formLocation: string) => {
    trackAnalyticsEvent("form_submission", {
      form_id: formType,
      form_type: formType,
      form_location: formLocation,
    });
  };

  // Enhanced search tracking events
  const trackSearchPerformed = (
    searchQuery: string,
    searchLocation: string,
    resultsCount: number,
    searchType = "standard",
  ) => {
    trackAnalyticsEvent("site_search", {
      event_category: "user_engagement",
      search_location: searchLocation,
      results_count: resultsCount,
      search_type: searchType,
      query_length: searchQuery.trim().length,
    });
  };

  const trackSearchFilterUsed = (
    filterType: string,
    filterValue: string,
    searchQuery?: string,
  ) => {
    trackAnalyticsEvent("search_filter_used", {
      event_category: "user_engagement",
      filter_type: filterType,
      filter_value: filterValue,
      has_search_query: Boolean(searchQuery?.trim()),
    });
  };

  const trackSearchClear = (searchQuery: string, hasFilters: boolean) => {
    trackAnalyticsEvent("search_cleared", {
      event_category: "user_engagement",
      had_filters: hasFilters,
      cleared_query_length: searchQuery.trim().length,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormSubmission,
    trackSearchPerformed,
    trackSearchFilterUsed,
    trackSearchClear,
  };
}
