import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
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

  // Track contact form submissions
  contactForm: (formType: string, inquiryType?: string) => {
    analytics.event("contact_form_submit", {
      form_type: formType,
      inquiry_type: inquiryType,
      event_category: "Lead Generation",
      event_label: "Contact Form",
    });
  },
};

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
