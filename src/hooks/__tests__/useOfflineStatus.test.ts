/**
 * @jest-environment jsdom
 *
 * Tests for hooks/useOfflineStatus.ts
 */

import { renderHook, act } from "@testing-library/react";

// ── Mock offline-queue ────────────────────────────────────────────────────────

const mockGetPendingCount = jest.fn().mockResolvedValue(0);
jest.mock("@/lib/pwa/offline-queue", () => ({
  getPendingCount: () => mockGetPendingCount(),
}));

// Make indexedDB appear defined so the hook's guard passes
Object.defineProperty(global, "indexedDB", {
  value: {},
  configurable: true,
  writable: true,
});

import { useOfflineStatus } from "../useOfflineStatus";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fireOnline() {
  window.dispatchEvent(new Event("online"));
}

function fireOffline() {
  window.dispatchEvent(new Event("offline"));
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useOfflineStatus", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPendingCount.mockResolvedValue(0);
    Object.defineProperty(navigator, "onLine", {
      value: true,
      configurable: true,
      writable: true,
    });
  });

  it("initialises as online", async () => {
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {});
    expect(result.current.isOnline).toBe(true);
  });

  it("sets isOnline to false when the offline event fires", async () => {
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {
      fireOffline();
    });
    expect(result.current.isOnline).toBe(false);
  });

  it("sets isOnline back to true when the online event fires", async () => {
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {
      fireOffline();
    });
    await act(async () => {
      fireOnline();
    });
    expect(result.current.isOnline).toBe(true);
  });

  it("fetches pending count from offline-queue on mount", async () => {
    mockGetPendingCount.mockResolvedValue(5);
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {
      await Promise.resolve();
    });
    expect(result.current.pendingCount).toBe(5);
  });

  it("refreshPendingCount() updates pendingCount when called manually", async () => {
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {});
    mockGetPendingCount.mockResolvedValueOnce(7);
    await act(async () => {
      await result.current.refreshPendingCount();
    });
    expect(result.current.pendingCount).toBe(7);
  });

  it("handles getPendingCount rejection without throwing", async () => {
    mockGetPendingCount.mockRejectedValueOnce(
      new Error("IndexedDB unavailable"),
    );
    await expect(
      act(async () => {
        renderHook(() => useOfflineStatus());
        await Promise.resolve();
      }),
    ).resolves.not.toThrow();
  });

  it("exposes a refreshPendingCount function", async () => {
    const { result } = renderHook(() => useOfflineStatus());
    await act(async () => {});
    expect(typeof result.current.refreshPendingCount).toBe("function");
  });
});
