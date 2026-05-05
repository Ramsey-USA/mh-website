/**
 * @jest-environment jsdom
 *
 * Tests for performance components: MobilePerformanceMonitor, WebVitalsReporter
 */

import { render, act } from "@testing-library/react";

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock("@/lib/utils/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

const mockIsMobile = jest.fn().mockReturnValue(false);
const mockIsSlowConnection = jest.fn().mockReturnValue(false);
jest.mock("@/lib/performance/mobile-optimizations", () => ({
  isMobileDevice: () => mockIsMobile(),
  isSlowConnection: () => mockIsSlowConnection(),
  getAnimationConfig: jest.fn().mockReturnValue({
    duration: 0.6,
    staggerDelay: 0.1,
    enableAnimations: true,
    threshold: 0.2,
  }),
}));

// Mock web-vitals
jest.mock("web-vitals", () => ({
  onCLS: jest.fn(),
  onINP: jest.fn(),
  onFCP: jest.fn(),
  onLCP: jest.fn(),
  onTTFB: jest.fn(),
}));

import { MobilePerformanceMonitor } from "../MobilePerformanceMonitor";
import { WebVitalsReporter } from "../WebVitalsReporter";

// ─── MobilePerformanceMonitor ─────────────────────────────────────────────────

describe("MobilePerformanceMonitor", () => {
  afterEach(() => {
    mockIsMobile.mockReturnValue(false);
  });

  it("renders null (no DOM output)", () => {
    const { container } = render(<MobilePerformanceMonitor />);
    expect(container.innerHTML).toBe("");
  });

  it("logs device info on mount (non-mobile)", () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    render(<MobilePerformanceMonitor />);
    expect(logger.info).toHaveBeenCalledWith(
      "[Performance] Device Info:",
      expect.objectContaining({ mobile: false }),
    );
  });

  it("sets up PerformanceObserver on mobile devices", async () => {
    mockIsMobile.mockReturnValue(true);

    const mockObserver = {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
    const MockPerformanceObserver = jest
      .fn()
      .mockImplementation(() => mockObserver);
    Object.defineProperty(window, "PerformanceObserver", {
      writable: true,
      configurable: true,
      value: MockPerformanceObserver,
    });

    await act(async () => {
      render(<MobilePerformanceMonitor />);
    });

    expect(MockPerformanceObserver).toHaveBeenCalled();
    expect(mockObserver.observe).toHaveBeenCalled();
  });

  it("handles PerformanceObserver setup error gracefully", async () => {
    mockIsMobile.mockReturnValue(true);
    const { logger } = jest.requireMock("@/lib/utils/logger");

    const MockPerformanceObserver = jest.fn().mockImplementation(() => {
      throw new Error("Observer not supported");
    });
    Object.defineProperty(window, "PerformanceObserver", {
      writable: true,
      configurable: true,
      value: MockPerformanceObserver,
    });

    await act(async () => {
      render(<MobilePerformanceMonitor />);
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "[Performance] Observer setup failed:",
      expect.any(Error),
    );
  });

  it("calls observer callbacks (LCP, FID, CLS)", async () => {
    mockIsMobile.mockReturnValue(true);
    const { logger } = jest.requireMock("@/lib/utils/logger");

    let lcpCallback: ((list: { getEntries: () => object[] }) => void) | null =
      null;
    let clsCallback: ((list: { getEntries: () => object[] }) => void) | null =
      null;

    const MockPerformanceObserver = jest.fn().mockImplementation((cb) => {
      return {
        observe: jest.fn().mockImplementation(({ type }) => {
          if (type === "largest-contentful-paint") lcpCallback = cb;
          if (type === "layout-shift") clsCallback = cb;
        }),
        disconnect: jest.fn(),
      };
    });
    Object.defineProperty(window, "PerformanceObserver", {
      writable: true,
      configurable: true,
      value: MockPerformanceObserver,
    });

    await act(async () => {
      render(<MobilePerformanceMonitor />);
    });

    await act(async () => {
      lcpCallback?.({ getEntries: () => [{ startTime: 1200 }] });
      clsCallback?.({
        getEntries: () => [{ value: 0.05, hadRecentInput: false }],
      });
    });

    expect(logger.info).toHaveBeenCalledWith("[Mobile LCP]", 1200, "ms");
    expect(logger.info).toHaveBeenCalledWith("[Mobile CLS]", 0.05);
  });
});

// ─── WebVitalsReporter ────────────────────────────────────────────────────────

describe("WebVitalsReporter", () => {
  it("renders null (no DOM output)", () => {
    const { container } = render(<WebVitalsReporter />);
    expect(container.innerHTML).toBe("");
  });

  it("calls web-vitals registration functions on mount", async () => {
    const webVitals = jest.requireMock("web-vitals");

    await act(async () => {
      render(<WebVitalsReporter />);
      // Flush dynamic import promise
      await Promise.resolve();
    });

    expect(webVitals.onCLS).toHaveBeenCalled();
    expect(webVitals.onINP).toHaveBeenCalled();
    expect(webVitals.onFCP).toHaveBeenCalled();
    expect(webVitals.onLCP).toHaveBeenCalled();
    expect(webVitals.onTTFB).toHaveBeenCalled();
  });

  it("sendToAnalytics logs good performance metric", async () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    const webVitals = jest.requireMock("web-vitals");
    let capturedCallback: ((m: object) => void) | null = null;
    webVitals.onLCP.mockImplementation((cb: (m: object) => void) => {
      capturedCallback = cb;
    });

    await act(async () => {
      render(<WebVitalsReporter />);
      await Promise.resolve();
    });

    await act(async () => {
      capturedCallback?.({
        name: "LCP",
        value: 1500,
        id: "test-id",
        delta: 100,
      });
    });

    expect(logger.info).toHaveBeenCalledWith(
      "Web Vital - LCP",
      expect.objectContaining({ value: 1500, rating: "good" }),
    );
  });

  it("sendToAnalytics warns on poor performance metric", async () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    const webVitals = jest.requireMock("web-vitals");
    let capturedCallback: ((m: object) => void) | null = null;
    webVitals.onLCP.mockImplementation((cb: (m: object) => void) => {
      capturedCallback = cb;
    });

    await act(async () => {
      render(<WebVitalsReporter />);
      await Promise.resolve();
    });

    await act(async () => {
      capturedCallback?.({
        name: "LCP",
        value: 5000,
        id: "test-id",
        delta: 500,
      });
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "Performance Warning - LCP is poor",
      expect.objectContaining({ rating: "poor" }),
    );
  });

  it("sendToAnalytics calls gtag when available", async () => {
    const mockGtag = jest.fn();
    Object.defineProperty(window, "gtag", { writable: true, value: mockGtag });

    const webVitals = jest.requireMock("web-vitals");
    let capturedCallback: ((m: object) => void) | null = null;
    webVitals.onCLS.mockImplementation((cb: (m: object) => void) => {
      capturedCallback = cb;
    });

    await act(async () => {
      render(<WebVitalsReporter />);
      await Promise.resolve();
    });

    await act(async () => {
      capturedCallback?.({
        name: "CLS",
        value: 0.05,
        id: "cls-id",
        delta: 0.01,
      });
    });

    expect(mockGtag).toHaveBeenCalledWith(
      "event",
      "CLS",
      expect.objectContaining({ event_category: "Web Vitals" }),
    );

    // Cleanup
    Object.defineProperty(window, "gtag", { writable: true, value: undefined });
  });

  it("handles needs-improvement rating", async () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    const webVitals = jest.requireMock("web-vitals");
    let capturedCallback: ((m: object) => void) | null = null;
    webVitals.onLCP.mockImplementation((cb: (m: object) => void) => {
      capturedCallback = cb;
    });

    await act(async () => {
      render(<WebVitalsReporter />);
      await Promise.resolve();
    });

    await act(async () => {
      // 3000ms is between good (2500) and poor (4000) for LCP
      capturedCallback?.({
        name: "LCP",
        value: 3000,
        id: "test-id",
        delta: 200,
      });
    });

    expect(logger.info).toHaveBeenCalledWith(
      "Web Vital - LCP",
      expect.objectContaining({ rating: "needs-improvement" }),
    );
  });

  it("handles unknown metric name (no threshold)", async () => {
    const { logger } = jest.requireMock("@/lib/utils/logger");
    const webVitals = jest.requireMock("web-vitals");
    let capturedCallback: ((m: object) => void) | null = null;
    webVitals.onTTFB.mockImplementation((cb: (m: object) => void) => {
      capturedCallback = cb;
    });

    await act(async () => {
      render(<WebVitalsReporter />);
      await Promise.resolve();
    });

    await act(async () => {
      capturedCallback?.({
        name: "UNKNOWN_METRIC",
        value: 99999,
        id: "x",
        delta: 0,
      });
    });

    // Unknown metrics fall through as "good"
    expect(logger.info).toHaveBeenCalledWith(
      "Web Vital - UNKNOWN_METRIC",
      expect.objectContaining({ rating: "good" }),
    );
  });
});
