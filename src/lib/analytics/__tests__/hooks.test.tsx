/**
 * Tests for lib/analytics/hooks.ts
 *
 * Covers: usePageTracking (via renderHook), useClickTracking
 *
 * The hooks depend on:
 * - next/navigation (usePathname) → mocked
 * - ./tracking (trackPageView, trackPageDuration, trackScrollDepth, initializeSession, trackClick)
 * - ./marketing-tracking (trackJourneyMilestone, trackLandingPage)
 */

import { renderHook, act } from "@testing-library/react";

// ── Mocks ─────────────────────────────────────────────────────────────────────

const mockPathname = jest.fn<string, []>(() => "/");

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

const mockTrackPageView = jest.fn();
const mockTrackPageDuration = jest.fn();
const mockTrackScrollDepth = jest.fn();
const mockInitializeSession = jest.fn();
const mockTrackClick = jest.fn();

jest.mock("../tracking", () => ({
  trackPageView: (...args: unknown[]) => mockTrackPageView(...args),
  trackPageDuration: (...args: unknown[]) => mockTrackPageDuration(...args),
  trackScrollDepth: (...args: unknown[]) => mockTrackScrollDepth(...args),
  initializeSession: () => mockInitializeSession(),
  trackClick: (...args: unknown[]) => mockTrackClick(...args),
}));

const mockTrackJourneyMilestone = jest.fn();
const mockTrackLandingPage = jest.fn();

jest.mock("../marketing-tracking", () => ({
  trackJourneyMilestone: (...args: unknown[]) =>
    mockTrackJourneyMilestone(...args),
  trackLandingPage: (...args: unknown[]) => mockTrackLandingPage(...args),
}));

// Lazy import after mocks
import { usePageTracking, useClickTracking } from "../hooks";

// ── usePageTracking ───────────────────────────────────────────────────────────

describe("usePageTracking()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/");
  });

  it("skips tracking on excluded operational routes", () => {
    mockPathname.mockReturnValue("/dashboard");

    renderHook(() => usePageTracking("Analytics Dashboard"));

    expect(mockInitializeSession).not.toHaveBeenCalled();
    expect(mockTrackPageView).not.toHaveBeenCalled();
    expect(mockTrackLandingPage).not.toHaveBeenCalled();
    expect(mockTrackJourneyMilestone).not.toHaveBeenCalled();
  });

  it("calls initializeSession on first mount", () => {
    renderHook(() => usePageTracking());
    expect(mockInitializeSession).toHaveBeenCalledTimes(1);
  });

  it("calls trackPageView with the current pathname on mount", () => {
    mockPathname.mockReturnValue("/services");
    renderHook(() => usePageTracking());
    expect(mockTrackPageView).toHaveBeenCalledWith(
      "/services",
      expect.objectContaining({ pageName: "/services" }),
    );
  });

  it("passes custom pageName to trackPageView when provided", () => {
    mockPathname.mockReturnValue("/contact");
    renderHook(() => usePageTracking("Contact Us"));
    expect(mockTrackPageView).toHaveBeenCalledWith(
      "/contact",
      expect.objectContaining({ pageName: "Contact Us" }),
    );
  });

  it("calls trackLandingPage on mount", () => {
    mockPathname.mockReturnValue("/about");
    renderHook(() => usePageTracking());
    expect(mockTrackLandingPage).toHaveBeenCalledWith(
      "/about",
      expect.any(String),
    );
  });

  it("tracks journey milestone for /services page", () => {
    mockPathname.mockReturnValue("/services");
    renderHook(() => usePageTracking());
    expect(mockTrackJourneyMilestone).toHaveBeenCalledWith("viewed_services");
  });

  it("tracks journey milestone for /projects page", () => {
    mockPathname.mockReturnValue("/projects");
    renderHook(() => usePageTracking());
    expect(mockTrackJourneyMilestone).toHaveBeenCalledWith("viewed_projects");
  });

  it("tracks journey milestone for /contact page", () => {
    mockPathname.mockReturnValue("/contact");
    renderHook(() => usePageTracking());
    expect(mockTrackJourneyMilestone).toHaveBeenCalledWith("viewed_contact");
  });

  it("adds scroll event listener on mount and removes it on unmount", () => {
    const addListener = jest.spyOn(window, "addEventListener");
    const removeListener = jest.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => usePageTracking());
    expect(addListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      expect.objectContaining({ passive: true }),
    );

    unmount();
    expect(removeListener).toHaveBeenCalledWith("scroll", expect.any(Function));

    addListener.mockRestore();
    removeListener.mockRestore();
  });

  it("fires scroll milestone tracking when scroll percent reaches a milestone", () => {
    renderHook(() => usePageTracking());

    // Simulate a scroll event that results in 50% scroll depth
    Object.defineProperty(window, "innerHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1000,
      configurable: true,
    });
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    // At scrollY=0 with innerHeight=500 and scrollHeight=1000 → 50% scroll
    expect(mockTrackScrollDepth).toHaveBeenCalledWith(50);
  });
});

// ── useClickTracking ──────────────────────────────────────────────────────────

describe("useClickTracking()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/home");
  });

  it("returns a stable callback function", () => {
    const { result } = renderHook(() => useClickTracking());
    expect(typeof result.current).toBe("function");
  });

  it("calls trackClick with element ID and page from pathname", () => {
    mockPathname.mockReturnValue("/services");
    const { result } = renderHook(() => useClickTracking());

    act(() => {
      result.current("cta-button", { section: "hero" });
    });

    expect(mockTrackClick).toHaveBeenCalledWith(
      "cta-button",
      expect.objectContaining({ section: "hero", page: "/services" }),
    );
  });

  it("works without extra properties", () => {
    mockPathname.mockReturnValue("/home");
    const { result } = renderHook(() => useClickTracking());
    act(() => {
      result.current("nav-link");
    });
    expect(mockTrackClick).toHaveBeenCalledWith(
      "nav-link",
      expect.objectContaining({ page: "/home" }),
    );
  });

  it("skips click tracking on excluded operational routes", () => {
    mockPathname.mockReturnValue("/hub");
    const { result } = renderHook(() => useClickTracking());

    act(() => {
      result.current("restricted-link", { section: "internal" });
    });

    expect(mockTrackClick).not.toHaveBeenCalled();
  });
});

// ── usePageTracking – duration tracking (beforeunload / visibilitychange) ─────

describe("usePageTracking() duration tracking", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname.mockReturnValue("/about");
    // Reset document.hidden to default (not hidden)
    Object.defineProperty(document, "hidden", {
      value: false,
      configurable: true,
      writable: true,
    });
  });

  it("fires trackPageDuration on beforeunload event", () => {
    renderHook(() => usePageTracking());

    act(() => {
      window.dispatchEvent(new Event("beforeunload"));
    });

    expect(mockTrackPageDuration).toHaveBeenCalledWith(
      "/about",
      expect.any(Number),
    );
  });

  it("fires trackPageDuration on visibilitychange when tab becomes hidden", () => {
    renderHook(() => usePageTracking());

    act(() => {
      Object.defineProperty(document, "hidden", {
        value: true,
        configurable: true,
        writable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(mockTrackPageDuration).toHaveBeenCalledWith(
      "/about",
      expect.any(Number),
    );
  });

  it("resets startTime on visibilitychange when tab becomes visible", () => {
    renderHook(() => usePageTracking());

    // Tab becomes hidden
    act(() => {
      Object.defineProperty(document, "hidden", {
        value: true,
        configurable: true,
        writable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    const callsAfterHide = mockTrackPageDuration.mock.calls.length;

    // Tab becomes visible again — resets timer, does NOT call trackPageDuration
    act(() => {
      Object.defineProperty(document, "hidden", {
        value: false,
        configurable: true,
        writable: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(mockTrackPageDuration.mock.calls.length).toBe(callsAfterHide);
  });

  it("fires trackPageDuration on unmount (page navigation)", () => {
    const { unmount } = renderHook(() => usePageTracking());

    act(() => {
      unmount();
    });

    expect(mockTrackPageDuration).toHaveBeenCalledWith(
      "/about",
      expect.any(Number),
    );
  });
});
