"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

// Analytics event tracking functions
export const analytics = {
  // Track page views
  pageView: (url: string, title?: string) => {
    if (
      typeof window !== "undefined" &&
      window.gtag &&
      process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"]
    ) {
      window.gtag("config", process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"], {
        page_title: title || document.title,
        page_location: url,
      });
    }
  },

  // Track custom events
  event: (
    eventName: string,
    parameters?: Record<string, string | number | boolean | undefined>,
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, parameters);
    }
  },

  // Track portfolio project views
  portfolioView: (projectTitle: string, projectCategory: string) => {
    analytics.event("portfolio_view", {
      project_title: projectTitle,
      project_category: projectCategory,
      event_category: "Portfolio",
      event_label: projectTitle,
    });
  },

  // Track estimate requests
  estimateRequest: (projectType: string, location: string) => {
    analytics.event("estimate_request", {
      project_type: projectType,
      location: location,
      event_category: "Lead Generation",
      event_label: "AI Estimate Request",
    });
  },

  // Track consultation bookings
  consultationBooking: (serviceType: string) => {
    analytics.event("consultation_booking", {
      service_type: serviceType,
      event_category: "Lead Generation",
      event_label: "Consultation Booking",
    });
  },

  // Track contact form submissions
  contactForm: (formType: string, inquiryType?: string) => {
    analytics.event("contact_form_submit", {
      form_type: formType,
      inquiry_type: inquiryType,
      event_category: "Lead Generation",
      event_label: "Contact Form",
    });
  },

  // Track phone clicks
  phoneClick: (phoneNumber: string) => {
    analytics.event("phone_click", {
      phone_number: phoneNumber,
      event_category: "Contact",
      event_label: "Phone Call",
    });
  },

  // Track email clicks
  emailClick: (emailAddress: string) => {
    analytics.event("email_click", {
      email_address: emailAddress,
      event_category: "Contact",
      event_label: "Email",
    });
  },

  // Track file downloads
  download: (fileName: string, fileType: string) => {
    analytics.event("file_download", {
      file_name: fileName,
      file_type: fileType,
      event_category: "Downloads",
      event_label: fileName,
    });
  },

  // Track social media clicks
  socialClick: (platform: string, url: string) => {
    analytics.event("social_click", {
      social_platform: platform,
      social_url: url,
      event_category: "Social Media",
      event_label: platform,
    });
  },
};

// Hook for tracking page views in Next.js
export function useAnalytics() {
  useEffect(() => {
    // Track initial page view
    analytics.pageView(window.location.href);
  }, []);

  return analytics;
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, string | number | boolean | undefined>,
    ) => void;
    dataLayer: unknown[];
  }
}
