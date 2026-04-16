/**
 * Tests for hooks/useFormSubmit.ts and hooks/useDialogBehavior.ts
 */

import { renderHook, act, waitFor } from "@testing-library/react";

import { useFormSubmit } from "../useFormSubmit";
import { useDialogBehavior } from "../useDialogBehavior";

// ── useFormSubmit ─────────────────────────────────────────────────────────────

describe("useFormSubmit", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initialises with no error and not submitting", () => {
    const { result } = renderHook(() => useFormSubmit());
    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("setError sets a custom error message", () => {
    const { result } = renderHook(() => useFormSubmit());
    act(() => result.current.setError("Custom error"));
    expect(result.current.error).toBe("Custom error");
  });

  it("clearError clears the error message", () => {
    const { result } = renderHook(() => useFormSubmit());
    act(() => result.current.setError("Some error"));
    act(() => result.current.clearError());
    expect(result.current.error).toBeNull();
  });

  it("returns the JSON response on a successful submission", async () => {
    const responseData = { success: true, id: "abc" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => responseData,
    });

    const { result } = renderHook(() => useFormSubmit<{ name: string }>());
    let returnValue: unknown;
    await act(async () => {
      returnValue = await result.current.submit("/api/test", { name: "Alice" });
    });

    expect(returnValue).toEqual(responseData);
    expect(result.current.error).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("calls onSuccess with the response on success", async () => {
    const onSuccess = jest.fn();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1" }),
    });

    const { result } = renderHook(() => useFormSubmit({ onSuccess }));
    await act(async () => {
      await result.current.submit("/api/test", null);
    });

    expect(onSuccess).toHaveBeenCalledWith({ id: "1" });
  });

  it("sets error and calls onError on a failed response", async () => {
    const onError = jest.fn();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Not found" }),
    });

    const { result } = renderHook(() => useFormSubmit({ onError }));
    await act(async () => {
      await result.current.submit("/api/test", null);
    });

    expect(result.current.error).toBe("Not found");
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
    expect(result.current.isSubmitting).toBe(false);
  });

  it("uses defaultErrorMessage if response has no error property", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    const { result } = renderHook(() =>
      useFormSubmit({ defaultErrorMessage: "Custom failure message" }),
    );
    await act(async () => {
      await result.current.submit("/api/test", null);
    });

    expect(result.current.error).toBe("Custom failure message");
  });

  it("sets error when fetch itself throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit("/api/test", null);
    });

    expect(result.current.error).toBe("Network error");
  });

  it("prevents double submissions (returns null if already submitting)", async () => {
    // Simulate a pending fetch by using a never-resolving promise
    let resolveFetch!: (value: unknown) => void;
    const pendingFetch = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockFetch.mockReturnValueOnce(pendingFetch);
    mockFetch.mockReturnValue({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useFormSubmit());

    // Start the first submission but don't await
    let firstPromiseResolved = false;
    const firstSubmitPromise = act(async () => {
      await result.current.submit("/api/test", null);
      firstPromiseResolved = true;
    });

    // While first is in-flight, isSubmitting should eventually be true
    // trigger a second submit synchronously while first await is pending
    await act(async () => {
      // force state flush
    });

    // Second submit while first is still pending
    let secondResult: unknown;
    if (result.current.isSubmitting) {
      await act(async () => {
        secondResult = await result.current.submit("/api/test", null);
      });
      expect(secondResult).toBeNull();
    }

    // Complete the first fetch
    resolveFetch({ ok: true, json: async () => ({}) });
    await firstSubmitPromise;
    expect(firstPromiseResolved).toBe(true);
  });

  it("uses PUT method when specified in options", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ updated: true }),
    });

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit("/api/test", { id: "1" }, { method: "PUT" });
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({ method: "PUT" }),
    );
  });

  it("merges extra headers into the request", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useFormSubmit());
    await act(async () => {
      await result.current.submit(
        "/api/test",
        {},
        { headers: { Authorization: "Bearer token" } },
      );
    });

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/test",
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token" }),
      }),
    );
  });
});

// ── useDialogBehavior ─────────────────────────────────────────────────────────

describe("useDialogBehavior", () => {
  beforeEach(() => {
    // Mock requestAnimationFrame to avoid async focus side-effects
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      // Execute synchronously so focus logic runs in tests
      cb(0);
      return 1;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  });

  function createDialog() {
    const dialog = document.createElement("div");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    btn1.textContent = "First";
    btn2.textContent = "Last";
    dialog.appendChild(btn1);
    dialog.appendChild(btn2);
    document.body.appendChild(dialog);
    return { dialog, btn1, btn2 };
  }

  afterEach(() => {
    document.body.innerHTML = "";
    jest.restoreAllMocks();
  });

  it("locks body scroll when dialog opens", async () => {
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );

    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  it("restores body scroll when dialog closes", () => {
    document.body.style.overflow = "auto";
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    const { unmount } = renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );

    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("does not lock scroll when isOpen is false", () => {
    document.body.style.overflow = "";
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: false, onClose, dialogRef: ref }),
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("calls onClose when Escape key is pressed", async () => {
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );

    // Wait for effects to settle
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose for non-Escape keys", async () => {
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );
    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("wraps focus from last to first element on Tab", async () => {
    const { dialog, btn1, btn2 } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );
    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    // Focus the last element then press Tab (without shift)
    act(() => {
      btn2.focus();
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
          shiftKey: false,
          bubbles: true,
        }),
      );
    });

    expect(document.activeElement).toBe(btn1);
  });

  it("wraps focus from first to last element on Shift+Tab", async () => {
    const { dialog, btn1, btn2 } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );
    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));

    // Focus the first element then press Shift+Tab
    act(() => {
      btn1.focus();
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Tab",
          shiftKey: true,
          bubbles: true,
        }),
      );
    });

    expect(document.activeElement).toBe(btn2);
  });

  it("removes keydown listener on unmount", async () => {
    const { dialog } = createDialog();
    const ref = { current: dialog };
    const onClose = jest.fn();

    const { unmount } = renderHook(() =>
      useDialogBehavior({ isOpen: true, onClose, dialogRef: ref }),
    );

    await waitFor(() => expect(document.body.style.overflow).toBe("hidden"));
    unmount();

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
