/**
 * @jest-environment jsdom
 *
 * Tests for DeferredPerformanceEnhancements
 *
 * ENABLE_RUNTIME_ENHANCEMENTS is a module-level constant that evaluates to
 * `false` in the test environment (NODE_ENV=test, no monitoring flag set).
 * These tests cover the early-exit / null-render path that runs in tests.
 * The deferred-render path (enabled mode) is covered through the sub-components'
 * own test suites (WebVitalsReporter, MobilePerformanceMonitor, etc.).
 */

jest.mock("@/components/performance/WebVitalsReporter", () => ({
  WebVitalsReporter: () => null,
}));
jest.mock("@/components/performance/MobilePerformanceMonitor", () => ({
  MobilePerformanceMonitor: () => null,
}));
jest.mock("@/components/pwa", () => ({ PWAManager: () => null }));
jest.mock("@/components/pwa/OfflineIndicator", () => ({
  OfflineIndicator: () => null,
}));

import { render, act } from "@testing-library/react";
import { DeferredPerformanceEnhancements } from "../DeferredPerformanceEnhancements";

describe("DeferredPerformanceEnhancements", () => {
  it("renders null when enhancements are disabled (default test env)", () => {
    const { container } = render(<DeferredPerformanceEnhancements />);
    expect(container.innerHTML).toBe("");
  });

  it("renders null when mounted and unmounted cleanly", async () => {
    const { container, unmount } = render(<DeferredPerformanceEnhancements />);
    await act(async () => {
      unmount();
    });
    expect(container.innerHTML).toBe("");
  });

  it("renders null even after several re-renders", async () => {
    const { container, rerender } = render(<DeferredPerformanceEnhancements />);
    await act(async () => {
      rerender(<DeferredPerformanceEnhancements />);
    });
    expect(container.innerHTML).toBe("");
  });
});
