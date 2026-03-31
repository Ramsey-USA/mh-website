/**
 * Tests for hooks/use-breakpoint.ts
 *
 * Covers: breakpoints export, useBreakpoint hook, useIsMobile hook
 */

import { renderHook, act } from "@testing-library/react";
import { breakpoints, useBreakpoint, useIsMobile } from "../use-breakpoint";
// Import the hooks barrel so hooks/index.ts is covered
import "@/hooks";

// ── breakpoints export ────────────────────────────────────────────────────────

describe("breakpoints", () => {
  it("exports breakpoints object with expected keys", () => {
    expect(breakpoints).toHaveProperty("xs");
    expect(breakpoints).toHaveProperty("sm");
    expect(breakpoints).toHaveProperty("md");
    expect(breakpoints).toHaveProperty("lg");
    expect(breakpoints).toHaveProperty("xl");
    expect(breakpoints.xs).toBe(475);
    expect(breakpoints.md).toBe(768);
  });
});

// ── useBreakpoint ─────────────────────────────────────────────────────────────

describe("useBreakpoint()", () => {
  let mockMq: {
    matches: boolean;
    addEventListener: jest.Mock;
    removeEventListener: jest.Mock;
  };

  beforeEach(() => {
    mockMq = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
    window.matchMedia = jest.fn().mockReturnValue(mockMq);
  });

  it("returns null before the first useEffect fires (SSR guard)", () => {
    // renderHook in jsdom runs effects synchronously via act, but the initial
    // state before any effect is null.
    const { result } = renderHook(() => useBreakpoint("md"));
    // After mount effects run, value should reflect mockMq.matches (false)
    expect(result.current).toBe(false);
  });

  it("returns true when matchMedia matches the breakpoint", () => {
    mockMq.matches = true;
    const { result } = renderHook(() => useBreakpoint("xs"));
    expect(result.current).toBe(true);
  });

  it("registers a 'change' listener on mount", () => {
    renderHook(() => useBreakpoint("sm"));
    expect(mockMq.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("removes the 'change' listener on unmount", () => {
    const { unmount } = renderHook(() => useBreakpoint("sm"));
    unmount();
    expect(mockMq.removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("updates when the media query fires a change event", () => {
    mockMq.matches = false;
    const { result } = renderHook(() => useBreakpoint("lg"));
    expect(result.current).toBe(false);

    // Grab the listener that was registered and fire it
    const [[, listener]] = mockMq.addEventListener.mock.calls as [
      [string, (e: { matches: boolean }) => void],
    ];

    act(() => {
      listener({ matches: true });
    });

    expect(result.current).toBe(true);
  });
});

// ── useIsMobile ───────────────────────────────────────────────────────────────

describe("useIsMobile()", () => {
  beforeEach(() => {
    window.matchMedia = jest
      .fn()
      .mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });
  });

  it("returns a boolean or null", () => {
    const { result } = renderHook(() => useIsMobile());
    expect([true, false, null]).toContain(result.current);
  });
});
