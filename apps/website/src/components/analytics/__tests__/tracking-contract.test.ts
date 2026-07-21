/**
 * @jest-environment jsdom
 */

import {
  normalizeAnalyticsRouteTemplate,
  trackAnalyticsEvent,
  trackCustomAnalyticsEvent,
} from "@/lib/analytics/tracking";

describe("analytics contract", () => {
  const originalGtag = window.gtag;
  const originalLighthouse = window.__LIGHTHOUSE__;

  beforeEach(() => {
    Object.defineProperty(window, "gtag", {
      configurable: true,
      value: jest.fn(),
    });
    Object.defineProperty(window, "__LIGHTHOUSE__", {
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "gtag", {
      configurable: true,
      value: originalGtag,
    });
    Object.defineProperty(window, "__LIGHTHOUSE__", {
      configurable: true,
      value: originalLighthouse,
    });
  });

  it("normalizes dynamic route templates", () => {
    expect(normalizeAnalyticsRouteTemplate("/projects/demo-project?x=1")).toBe(
      "/projects/[slug]",
    );
    expect(normalizeAnalyticsRouteTemplate("/events/cool-desert-nights")).toBe(
      "/events/[slug]",
    );
    expect(normalizeAnalyticsRouteTemplate("/resources")).toBe("/resources");
  });

  it("rejects invalid required params", () => {
    const gtagMock = window.gtag as jest.Mock;

    trackAnalyticsEvent("form_submission", {
      form_id: "",
    });

    expect(gtagMock).not.toHaveBeenCalled();
  });

  it("redacts sensitive custom payload keys", () => {
    const gtagMock = window.gtag as jest.Mock;

    trackCustomAnalyticsEvent("cta_banner_click", {
      type: "consultation",
      phoneNumber: "(509) 555-1212",
      emailAddress: "office@example.com",
      search_term: "classified phrase",
    });

    expect(gtagMock).toHaveBeenCalledWith("event", "cta_banner_click", {
      type: "consultation",
    });
  });

  it("deduplicates repeat route views", () => {
    const gtagMock = window.gtag as jest.Mock;

    trackAnalyticsEvent("page_view", {
      page_path: "/projects/demo-project",
      route_template: "/projects/[slug]",
    });
    trackAnalyticsEvent("page_view", {
      page_path: "/projects/demo-project",
      route_template: "/projects/[slug]",
    });

    expect(gtagMock).toHaveBeenCalledTimes(1);
  });

  it("does not emit events during Lighthouse runs", () => {
    const gtagMock = window.gtag as jest.Mock;
    Object.defineProperty(window, "__LIGHTHOUSE__", {
      configurable: true,
      value: true,
    });

    trackAnalyticsEvent("click", {
      element: "hero-cta",
      page_path: "/",
    });

    expect(gtagMock).not.toHaveBeenCalled();
  });

  it("never throws when analytics runtime is unavailable", () => {
    Object.defineProperty(window, "gtag", {
      configurable: true,
      value: undefined,
    });

    expect(() => {
      trackAnalyticsEvent("click", {
        element: "hero-cta",
        page_path: "/",
      });
    }).not.toThrow();
  });
});
