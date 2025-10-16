/**
 * Analytics Integration Provider
 * Provides analytics context and automatic tracking throughout the app
 */

"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useAnalytics } from "@/lib/analytics/analytics-engine";
import { useAnalyticsTracking } from "@/lib/analytics/data-collector";

interface AnalyticsContextType {
  trackPageView: (page?: string, properties?: Record<string, any>) => void;
  trackInteraction: (
    element: string,
    action: string,
    properties?: Record<string, any>,
  ) => void;
  trackConversion: (
    type: string,
    value: number,
    properties?: Record<string, any>,
  ) => void;
  trackFormSubmission: (
    formName: string,
    formData: Record<string, any>,
  ) => void;
  trackEstimatorUsage: (
    projectType: string,
    estimatedValue: number,
    completed: boolean,
  ) => void;
  trackVeteranInteraction: (benefitType: string, action: string) => void;
  trackRecommendationInteraction: (
    recommendationId: string,
    action: "view" | "click" | "dismiss",
  ) => void;
  trackError: (error: Error, context?: Record<string, any>) => void;
  track: (type: string, properties?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
  enableAutoTracking?: boolean;
}

export function AnalyticsProvider({
  children,
  enableAutoTracking = true,
}: AnalyticsProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const analytics = useAnalytics();
  const tracking = useAnalyticsTracking();

  // Auto-track page views
  useEffect(() => {
    if (enableAutoTracking) {
      const url =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");
      analytics.trackPageView(url, {
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      });
      tracking.trackPageView(url);
    }
  }, [pathname, searchParams, enableAutoTracking, analytics, tracking]);

  // Auto-track errors
  useEffect(() => {
    if (!enableAutoTracking) return;

    const handleError = (event: ErrorEvent) => {
      analytics.trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.trackError(new Error(event.reason), {
        type: "unhandled_promise_rejection",
        reason: event.reason,
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, [enableAutoTracking, analytics]);

  const trackPageView = (page?: string, properties?: Record<string, any>) => {
    analytics.trackPageView(page || pathname, properties);
    tracking.trackPageView(page);
  };

  const trackInteraction = (
    element: string,
    action: string,
    properties?: Record<string, any>,
  ) => {
    analytics.trackInteraction(element, action, properties);
    tracking.trackInteraction("click", element, { action, ...properties });
  };

  const trackConversion = (
    type: string,
    value: number,
    properties?: Record<string, any>,
  ) => {
    analytics.trackConversion(type as any, value, properties);
  };

  const trackFormSubmission = (
    formName: string,
    formData: Record<string, any>,
  ) => {
    analytics.track("form_submission", { form: formName, ...formData });
    tracking.trackFormSubmission(formName, formData);
  };

  const trackEstimatorUsage = (
    projectType: string,
    estimatedValue: number,
    completed: boolean,
  ) => {
    analytics.track("estimator_usage", {
      projectType,
      estimatedValue,
      completed,
    });
    tracking.trackEstimatorUsage(projectType, estimatedValue, completed);
  };

  const trackVeteranInteraction = (benefitType: string, action: string) => {
    analytics.track("veteran_benefit_view", { benefitType, action });
    tracking.trackVeteranInteraction(benefitType, action as any);
  };

  const trackRecommendationInteraction = (
    recommendationId: string,
    action: "view" | "click" | "dismiss",
  ) => {
    const eventType =
      action === "view" ? "recommendation_view" : "recommendation_click";
    analytics.track(eventType, { recommendationId, action });
    tracking.trackRecommendationInteraction(recommendationId, action);
  };

  const trackError = (error: Error, context?: Record<string, any>) => {
    analytics.trackError(error, context);
  };

  const track = (type: string, properties?: Record<string, any>) => {
    analytics.track(type as any, properties);
  };

  const value: AnalyticsContextType = {
    trackPageView,
    trackInteraction,
    trackConversion,
    trackFormSubmission,
    trackEstimatorUsage,
    trackVeteranInteraction,
    trackRecommendationInteraction,
    trackError,
    track,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error(
      "useAnalyticsContext must be used within an AnalyticsProvider",
    );
  }
  return context;
}

// Higher-order component for automatic tracking
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  trackingOptions?: {
    trackMountAsPageView?: boolean;
    trackInteractions?: boolean;
    componentName?: string;
  },
) {
  const WrappedComponent = (props: P) => {
    const analytics = useAnalyticsContext();
    const pathname = usePathname();

    useEffect(() => {
      if (trackingOptions?.trackMountAsPageView) {
        analytics.trackPageView(pathname, {
          component: trackingOptions.componentName || Component.name,
          timestamp: new Date().toISOString(),
        });
      }
    }, [analytics, pathname]);

    const trackingProps = trackingOptions?.trackInteractions
      ? {
          "data-track": trackingOptions.componentName || Component.name,
          onClick: (event: React.MouseEvent) => {
            analytics.trackInteraction(
              trackingOptions.componentName || Component.name,
              "click",
              {
                target: (event.target as HTMLElement).textContent?.substring(
                  0,
                  100,
                ),
              },
            );
            (props as any).onClick?.(event);
          },
        }
      : {};

    return <Component {...props} {...trackingProps} />;
  };

  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Analytics tracking hooks
export function usePageViewTracking(dependencies: any[] = []) {
  const analytics = useAnalyticsContext();
  const pathname = usePathname();

  useEffect(() => {
    analytics.trackPageView(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, analytics, ...dependencies]);
}

export function useInteractionTracking() {
  const analytics = useAnalyticsContext();

  return {
    trackClick: (element: string, properties?: Record<string, any>) => {
      analytics.trackInteraction(element, "click", properties);
    },
    trackHover: (element: string, properties?: Record<string, any>) => {
      analytics.trackInteraction(element, "hover", properties);
    },
    trackFocus: (element: string, properties?: Record<string, any>) => {
      analytics.trackInteraction(element, "focus", properties);
    },
    trackScroll: (element: string, depth: number) => {
      analytics.trackInteraction(element, "scroll", { depth });
    },
  };
}

export function useConversionTracking() {
  const analytics = useAnalyticsContext();

  return {
    trackEstimateRequest: (value: number, projectType: string) => {
      analytics.trackConversion("estimate_request", value, { projectType });
    },
    trackContactForm: (source: string) => {
      analytics.trackConversion("contact_form", 1, { source });
    },
    trackSpecialistContact: (specialistType: string) => {
      analytics.trackConversion("specialist_contact", 1, { specialistType });
    },
    trackProjectInquiry: (projectType: string, estimatedValue: number) => {
      analytics.trackConversion("project_inquiry", estimatedValue, {
        projectType,
      });
    },
  };
}

export function useVeteranTracking() {
  const analytics = useAnalyticsContext();

  return {
    trackBenefitView: (benefitType: string) => {
      analytics.trackVeteranInteraction(benefitType, "view");
    },
    trackBenefitCalculation: (benefitType: string, savings: number) => {
      analytics.trackVeteranInteraction(benefitType, "calculate");
      analytics.track("veteran_benefit_view", {
        benefitType,
        action: "calculate",
        savings,
      });
    },
    trackSpecialistContact: (specialistType: string) => {
      analytics.trackVeteranInteraction(specialistType, "contact_specialist");
    },
    trackBadgeView: (branch: string) => {
      analytics.track("veteran_benefit_view", {
        benefitType: "badge",
        action: "view",
        branch,
      });
    },
  };
}

// Custom hook for form analytics
export function useFormAnalytics(formName: string) {
  const analytics = useAnalyticsContext();

  return {
    trackFormStart: () => {
      analytics.track("form_submission", { form: formName, action: "start" });
    },
    trackFormProgress: (step: string, totalSteps: number) => {
      analytics.track("form_submission", {
        form: formName,
        action: "progress",
        step,
        totalSteps,
        completion: (parseInt(step) / totalSteps) * 100,
      });
    },
    trackFormSubmit: (formData: Record<string, any>) => {
      analytics.trackFormSubmission(formName, formData);
    },
    trackFormError: (error: string, field?: string) => {
      analytics.track("form_submission", {
        form: formName,
        action: "error",
        error,
        field,
      });
    },
    trackFormAbandonment: (lastStep: string) => {
      analytics.track("form_submission", {
        form: formName,
        action: "abandon",
        lastStep,
      });
    },
  };
}

// Performance tracking hook
export function usePerformanceTracking(componentName: string) {
  const analytics = useAnalyticsContext();

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      analytics.track("performance_metric", {
        component: componentName,
        renderTime,
        timestamp: new Date().toISOString(),
      });
    };
  }, [analytics, componentName]);

  return {
    trackComponentLoad: (loadTime: number) => {
      analytics.track("performance_metric", {
        component: componentName,
        loadTime,
        timestamp: new Date().toISOString(),
      });
    },
    trackAsyncOperation: (operation: string, duration: number) => {
      analytics.track("performance_metric", {
        component: componentName,
        operation,
        duration,
        timestamp: new Date().toISOString(),
      });
    },
  };
}

export default AnalyticsProvider;
