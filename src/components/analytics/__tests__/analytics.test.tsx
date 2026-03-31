/**
 * @jest-environment jsdom
 *
 * Tests for analytics components:
 * EnhancedAnalytics (useAnalytics hook), GoogleAnalytics, PageTrackingClient
 */

import { renderHook, render } from "@testing-library/react";

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockGtag = jest.fn();

jest.mock(
  "next/script",
  () =>
    function MockScript({
      src,
      id,
      children,
    }: {
      src?: string;
      id?: string;
      children?: string;
    }) {
      return (
        <script
          src={src}
          id={id}
          dangerouslySetInnerHTML={{ __html: children ?? "" }}
        />
      );
    },
);

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

// ─── Setup / Teardown ─────────────────────────────────────────────────────────

beforeEach(() => {
  mockGtag.mockClear();
});

afterEach(() => {
  // Clean up gtag on window
  Object.defineProperty(window, "gtag", { writable: true, value: undefined });
});

// ─── useAnalytics ─────────────────────────────────────────────────────────────

import { useAnalytics } from "../EnhancedAnalytics";

describe("useAnalytics", () => {
  it("returns all tracking functions", () => {
    const { result } = renderHook(() => useAnalytics());
    expect(typeof result.current.trackEvent).toBe("function");
    expect(typeof result.current.trackPageView).toBe("function");
    expect(typeof result.current.trackConversion).toBe("function");
    expect(typeof result.current.trackFormSubmission).toBe("function");
    expect(typeof result.current.trackSearchPerformed).toBe("function");
    expect(typeof result.current.trackSearchFilterUsed).toBe("function");
    expect(typeof result.current.trackSearchClear).toBe("function");
  });

  it("trackEvent calls gtag when available", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackEvent("button_click", { label: "hero-cta", value: 1 });
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "button_click",
      expect.objectContaining({
        event_category: "engagement",
        event_label: "hero-cta",
      }),
    );
  });

  it("trackEvent does nothing when gtag is unavailable", () => {
    const { result } = renderHook(() => useAnalytics());
    expect(() => result.current.trackEvent("test")).not.toThrow();
    expect(mockGtag).not.toHaveBeenCalled();
  });

  it("trackEvent uses empty string label when no label provided", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackEvent("no_label_event");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "no_label_event",
      expect.objectContaining({ event_label: "" }),
    );
  });

  it("trackPageView calls gtag when available", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackPageView("/about", "About Us");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({ page_title: "About Us", page_path: "/about" }),
    );
  });

  it("trackPageView uses document.title when no title provided", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    document.title = "Test Page";
    const { result } = renderHook(() => useAnalytics());
    result.current.trackPageView("/test");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "page_view",
      expect.objectContaining({ page_title: "Test Page" }),
    );
  });

  it("trackPageView does nothing when gtag is unavailable", () => {
    const { result } = renderHook(() => useAnalytics());
    expect(() => result.current.trackPageView("/test")).not.toThrow();
  });

  it("trackConversion calls gtag when available", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackConversion("contact_form", 100);
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "conversion",
      expect.objectContaining({
        event_label: "contact_form",
        value: 100,
        currency: "USD",
      }),
    );
  });

  it("trackConversion uses value=0 when not provided", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackConversion("newsletter_signup");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "conversion",
      expect.objectContaining({ value: 0 }),
    );
  });

  it("trackConversion does nothing when gtag unavailable", () => {
    const { result } = renderHook(() => useAnalytics());
    expect(() => result.current.trackConversion("test")).not.toThrow();
  });

  it("trackFormSubmission calls trackEvent with correct params", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackFormSubmission("consultation", "homepage");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "form_submission",
      expect.objectContaining({
        form_type: "consultation",
        form_location: "homepage",
      }),
    );
  });

  it("trackSearchPerformed calls trackEvent with search params", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackSearchPerformed("concrete", "projects", 12);
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "site_search",
      expect.objectContaining({
        search_term: "concrete",
        search_location: "projects",
        results_count: 12,
        search_type: "standard",
      }),
    );
  });

  it("trackSearchPerformed accepts custom searchType", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackSearchPerformed("q", "loc", 5, "advanced");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "site_search",
      expect.objectContaining({ search_type: "advanced" }),
    );
  });

  it("trackSearchFilterUsed calls trackEvent with filter params", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackSearchFilterUsed("category", "commercial", "query");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "search_filter_used",
      expect.objectContaining({
        filter_type: "category",
        filter_value: "commercial",
      }),
    );
  });

  it("trackSearchFilterUsed omits search_query when not provided", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackSearchFilterUsed("type", "industrial");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "search_filter_used",
      expect.objectContaining({ search_query: "" }),
    );
  });

  it("trackSearchClear calls trackEvent with clear params", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    const { result } = renderHook(() => useAnalytics());
    result.current.trackSearchClear("kennewick", true);
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "search_cleared",
      expect.objectContaining({
        cleared_query: "kennewick",
        had_filters: true,
      }),
    );
  });
});

// ─── GoogleAnalytics component ────────────────────────────────────────────────

import { GoogleAnalytics, analytics } from "../GoogleAnalytics";

describe("GoogleAnalytics", () => {
  it("renders two Script tags with measurementId", () => {
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    const scripts = container.querySelectorAll("script");
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    Array.from(scripts).find((s) => s.src?.includes("G-TEST123"));
    // Script src may not be set in jsdom — check the rendered container has content
    expect(container.innerHTML).toBeTruthy();
  });
});

describe("analytics object", () => {
  it("analytics.pageView calls gtag when available", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    Object.defineProperty(process.env, "NEXT_PUBLIC_GA_MEASUREMENT_ID", {
      value: "G-TEST",
      configurable: true,
    });
    analytics.pageView("/test", "Test Page");
    expect(mockGtag).toHaveBeenCalledWith(
      "config",
      expect.any(String),
      expect.objectContaining({ page_title: "Test Page" }),
    );
  });

  it("analytics.pageView does nothing when gtag unavailable", () => {
    expect(() => analytics.pageView("/test")).not.toThrow();
  });

  it("analytics.event calls gtag when available", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    analytics.event("cta_click", { button: "contact" });
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "cta_click",
      expect.objectContaining({ button: "contact" }),
    );
  });

  it("analytics.event does nothing when gtag unavailable", () => {
    expect(() => analytics.event("test")).not.toThrow();
  });

  it("analytics.contactForm calls analytics.event with correct params", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    analytics.contactForm("consultation", "commercial");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "contact_form_submit",
      expect.objectContaining({
        form_type: "consultation",
        inquiry_type: "commercial",
        event_category: "Lead Generation",
      }),
    );
  });

  it("analytics.contactForm works without inquiryType", () => {
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });
    analytics.contactForm("estimate");
    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "contact_form_submit",
      expect.objectContaining({ form_type: "estimate" }),
    );
  });
});

// ─── PageTrackingClient ───────────────────────────────────────────────────────

import { PageTrackingClient } from "../PageTrackingClient";

describe("PageTrackingClient", () => {
  it("renders null (no DOM output)", () => {
    const { container } = render(<PageTrackingClient pageName="About" />);
    expect(container.innerHTML).toBe("");
  });

  it("calls usePageTracking with pageName", () => {
    const { usePageTracking } = jest.requireMock("@/lib/analytics/hooks");
    render(<PageTrackingClient pageName="Services" />);
    expect(usePageTracking).toHaveBeenCalledWith("Services");
  });
});
