"use client";

// Hook for tracking analytics events
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters: Record<string, string | number | boolean | undefined> = {},
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: (parameters["label"] as string) || "",
        value: (parameters["value"] as number) || 0,
        ...parameters,
      });
    }
  };

  const trackPageView = (path: string, title?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: title || document.title,
        page_location: window.location.origin + path,
        page_path: path,
      });
    }
  };

  const trackConversion = (conversionType: string, value?: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: process.env["NEXT_PUBLIC_GA_CONVERSION_ID"],
        event_category: "conversion",
        event_label: conversionType,
        value: value || 0,
        currency: "USD",
      });
    }
  };

  // Construction-specific tracking events
  const trackFormSubmission = (formType: string, formLocation: string) => {
    trackEvent("form_submission", {
      event_category: "lead_generation",
      event_label: `${formType} form from ${formLocation}`,
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
    trackEvent("site_search", {
      event_category: "user_engagement",
      search_term: searchQuery,
      search_location: searchLocation,
      results_count: resultsCount,
      search_type: searchType,
    });
  };

  const trackSearchFilterUsed = (
    filterType: string,
    filterValue: string,
    searchQuery?: string,
  ) => {
    trackEvent("search_filter_used", {
      event_category: "user_engagement",
      filter_type: filterType,
      filter_value: filterValue,
      search_query: searchQuery || "",
    });
  };

  const trackSearchClear = (searchQuery: string, hasFilters: boolean) => {
    trackEvent("search_cleared", {
      event_category: "user_engagement",
      cleared_query: searchQuery,
      had_filters: hasFilters,
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
