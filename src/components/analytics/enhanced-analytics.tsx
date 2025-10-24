"use client";

import React, { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
  enableDevelopment?: boolean;
}

export function GoogleAnalytics({
  measurementId,
  enableDevelopment = false,
}: GoogleAnalyticsProps) {
  useEffect(() => {
    // Only load in production or when explicitly enabled
    if (process.env.NODE_ENV !== "production" && !enableDevelopment) {
      return;
    }

    // Initialize gtag
    window.gtag =
      window.gtag ||
      function (...args: any[]) {
        (window.dataLayer = window.dataLayer || []).push(args);
      };

    window.gtag("config", measurementId, {
      send_page_view: false, // We'll handle this manually
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
    });

    // Track initial page view
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }, [measurementId, enableDevelopment]);

  if (process.env.NODE_ENV !== "production" && !enableDevelopment) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} // eslint-disable-line prefer-rest-params
            gtag('js', new Date());
          `,
        }}
      />
    </>
  );
}

// Hook for tracking analytics events
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters: Record<string, any> = {}
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "engagement",
        event_label: parameters.label || "",
        value: parameters.value || 0,
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
        send_to: process.env.NEXT_PUBLIC_GA_CONVERSION_ID,
        event_category: "conversion",
        event_label: conversionType,
        value: value || 0,
        currency: "USD",
      });
    }
  };

  // Construction-specific tracking events
  const trackProjectInquiry = (projectType: string, serviceType: string) => {
    trackEvent("project_inquiry", {
      construction_service: serviceType,
      project_type: projectType,
      event_category: "lead_generation",
      event_label: `${projectType} - ${serviceType}`,
    });
  };

  const trackEstimateRequest = (
    projectType: string,
    estimatedValue?: number
  ) => {
    trackEvent("estimate_request", {
      project_type: projectType,
      event_category: "lead_generation",
      value: estimatedValue || 0,
      currency: "USD",
    });
  };

  const trackQuoteDownload = (projectType: string) => {
    trackEvent("quote_download", {
      project_type: projectType,
      event_category: "engagement",
      event_label: `Quote downloaded for ${projectType}`,
    });
  };

  const trackPortfolioView = (
    projectTitle: string,
    projectCategory: string
  ) => {
    trackEvent("portfolio_view", {
      project_type: projectCategory,
      event_category: "content_engagement",
      event_label: projectTitle,
    });
  };

  const trackTestimonialSubmission = () => {
    trackEvent("testimonial_submission", {
      event_category: "user_generated_content",
      event_label: "Customer testimonial submitted",
    });
  };

  const trackFormSubmission = (formType: string, formLocation: string) => {
    trackEvent("form_submission", {
      event_category: "lead_generation",
      event_label: `${formType} form from ${formLocation}`,
      form_type: formType,
      form_location: formLocation,
    });
  };

  const trackPhoneCall = (source: string) => {
    trackEvent("phone_call_click", {
      event_category: "lead_generation",
      event_label: `Phone number clicked from ${source}`,
      lead_source: source,
    });
  };

  const trackEmailClick = (source: string) => {
    trackEvent("email_click", {
      event_category: "lead_generation",
      event_label: `Email clicked from ${source}`,
      lead_source: source,
    });
  };

  // Enhanced search tracking events
  const trackSearchPerformed = (
    searchQuery: string,
    searchLocation: string,
    resultsCount: number,
    searchType: string = "standard"
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
    searchQuery?: string
  ) => {
    trackEvent("search_filter_used", {
      event_category: "user_engagement",
      filter_type: filterType,
      filter_value: filterValue,
      search_query: searchQuery || "",
    });
  };

  const trackSearchResultClick = (
    itemId: string,
    itemType: string,
    searchQuery: string,
    resultPosition: number
  ) => {
    trackEvent("search_result_click", {
      event_category: "user_engagement",
      item_id: itemId,
      item_type: itemType,
      search_query: searchQuery,
      result_position: resultPosition,
    });
  };

  const trackSearchViewToggle = (
    oldView: string,
    newView: string,
    searchQuery?: string
  ) => {
    trackEvent("search_view_toggle", {
      event_category: "user_engagement",
      previous_view: oldView,
      new_view: newView,
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

  // Enhanced chatbot tracking events
  const trackChatbotOpen = (source: string, currentPage?: string) => {
    trackEvent("chatbot_opened", {
      event_category: "chatbot_engagement",
      source_location: source,
      current_page: currentPage || "",
    });
  };

  const trackChatbotClose = (sessionDuration: number, messageCount: number) => {
    trackEvent("chatbot_closed", {
      event_category: "chatbot_engagement",
      session_duration: sessionDuration,
      message_count: messageCount,
    });
  };

  const trackChatbotMessage = (
    messageType: "user" | "bot",
    messageLength: number,
    conversationTurn: number,
    messageContent?: string
  ) => {
    trackEvent("chatbot_message", {
      event_category: "chatbot_engagement",
      message_type: messageType,
      message_length: messageLength,
      conversation_turn: conversationTurn,
      has_business_keywords: messageContent
        ? /project|estimate|cost|budget|build|construction/i.test(
            messageContent
          )
        : false,
    });
  };

  const trackChatbotLeadGenerated = (
    leadType: "veteran" | "standard",
    priority: "low" | "medium" | "high" | "critical",
    projectType?: string
  ) => {
    trackEvent("chatbot_lead_generated", {
      event_category: "lead_generation",
      lead_type: leadType,
      priority_level: priority,
      project_type: projectType || "unknown",
    });
  };

  const trackChatbotFormAssist = (
    formType: string,
    assistType: "suggestion" | "completion" | "validation",
    fieldName?: string
  ) => {
    trackEvent("chatbot_form_assist", {
      event_category: "chatbot_engagement",
      form_type: formType,
      assist_type: assistType,
      field_name: fieldName || "",
    });
  };

  const trackChatbotError = (
    errorType: "ai_response" | "connection" | "validation",
    errorMessage?: string
  ) => {
    trackEvent("chatbot_error", {
      event_category: "chatbot_errors",
      error_type: errorType,
      error_message: errorMessage || "unknown",
    });
  };

  const trackChatbotDrag = (fromPosition: string, toPosition: string) => {
    trackEvent("chatbot_dragged", {
      event_category: "chatbot_engagement",
      from_position: fromPosition,
      to_position: toPosition,
    });
  };

  const trackChatbotMinimize = (isMinimized: boolean) => {
    trackEvent("chatbot_minimize_toggle", {
      event_category: "chatbot_engagement",
      is_minimized: isMinimized,
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackProjectInquiry,
    trackEstimateRequest,
    trackQuoteDownload,
    trackPortfolioView,
    trackTestimonialSubmission,
    trackFormSubmission,
    trackPhoneCall,
    trackEmailClick,
    trackSearchPerformed,
    trackSearchFilterUsed,
    trackSearchResultClick,
    trackSearchViewToggle,
    trackSearchClear,
    trackChatbotOpen,
    trackChatbotClose,
    trackChatbotMessage,
    trackChatbotLeadGenerated,
    trackChatbotFormAssist,
    trackChatbotError,
    trackChatbotDrag,
    trackChatbotMinimize,
  };
}

// Component for tracking scroll depth
export function ScrollDepthTracker() {
  useEffect(() => {
    const scrollDepthTracking = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      // Track scroll milestones
      if (scrollDepth >= 25 && !sessionStorage.getItem("scroll_25")) {
        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "25% scroll depth",
          value: 25,
        });
        sessionStorage.setItem("scroll_25", "true");
      }

      if (scrollDepth >= 50 && !sessionStorage.getItem("scroll_50")) {
        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50% scroll depth",
          value: 50,
        });
        sessionStorage.setItem("scroll_50", "true");
      }

      if (scrollDepth >= 75 && !sessionStorage.getItem("scroll_75")) {
        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "75% scroll depth",
          value: 75,
        });
        sessionStorage.setItem("scroll_75", "true");
      }

      if (scrollDepth >= 90 && !sessionStorage.getItem("scroll_90")) {
        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "90% scroll depth",
          value: 90,
        });
        sessionStorage.setItem("scroll_90", "true");
      }
    };

    const throttledScrollHandler = throttle(scrollDepthTracking, 1000);
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, []);

  return null;
}

// Component for tracking time on page
export function TimeOnPageTracker() {
  useEffect(() => {
    const startTime = Date.now();
    let timeTracked = false;

    const trackTimeOnPage = () => {
      if (!timeTracked) {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);

        if (timeSpent >= 30) {
          // Track after 30 seconds
          window.gtag?.("event", "time_on_page", {
            event_category: "engagement",
            event_label: "Engaged user (30+ seconds)",
            value: timeSpent,
          });
          timeTracked = true;
        }
      }
    };

    // Track when user scrolls, clicks, or moves mouse (indicates engagement)
    const engagementEvents = ["scroll", "click", "mousemove", "keydown"];
    const trackEngagement = throttle(trackTimeOnPage, 5000);

    engagementEvents.forEach((event) => {
      window.addEventListener(event, trackEngagement, { passive: true });
    });

    return () => {
      engagementEvents.forEach((event) => {
        window.removeEventListener(event, trackEngagement);
      });
    };
  }, []);

  return null;
}

// Utility function for throttling
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Enhanced Analytics Provider Component
interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId?: string;
  enableScrollTracking?: boolean;
  enableTimeTracking?: boolean;
}

export function AnalyticsProvider({
  children,
  measurementId,
  enableScrollTracking = true,
  enableTimeTracking = true,
}: AnalyticsProviderProps) {
  if (!measurementId) {
    console.warn("Google Analytics measurement ID not provided");
    return <>{children}</>;
  }

  return (
    <>
      <GoogleAnalytics measurementId={measurementId} />
      {enableScrollTracking && <ScrollDepthTracker />}
      {enableTimeTracking && <TimeOnPageTracker />}
      {children}
    </>
  );
}
