/**
 * @jest-environment jsdom
 */

import { act, render, waitFor } from "@testing-library/react";
import { useHubAdminAuth } from "../useHubAdminAuth";

const pushMock = jest.fn();
// Stable router reference — `useRouter` mocks that return a fresh object
// each call cause the hook's effect to re-run forever.
const stableRouter = { push: pushMock };

jest.mock("next/navigation", () => ({
  useRouter: () => stableRouter,
}));

function HookProbe({
  onState,
}: {
  onState: (s: ReturnType<typeof useHubAdminAuth>) => void;
}) {
  const state = useHubAdminAuth();
  onState(state);
  return null;
}

const originalFetch = globalThis.fetch;

beforeEach(() => {
  pushMock.mockReset();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetch(response: { ok: boolean; body?: unknown }): jest.Mock {
  const fn = jest.fn().mockResolvedValue({
    ok: response.ok,
    json: async () => response.body ?? {},
  });
  globalThis.fetch = fn;
  return fn;
}

describe("useHubAdminAuth", () => {
  it("returns authenticated state when refresh succeeds with admin role", async () => {
    mockFetch({
      ok: true,
      body: {
        accessToken: "tok-123",
        user: { name: "Matt", role: "admin" },
      },
    });

    const states: Array<ReturnType<typeof useHubAdminAuth>> = [];
    await act(async () => {
      render(<HookProbe onState={(s) => states.push(s)} />);
    });

    await waitFor(() => {
      expect(states.at(-1)?.status).toBe("authenticated");
    });

    const last = states.at(-1);
    expect(last).toEqual({
      status: "authenticated",
      token: "tok-123",
      userName: "Matt",
    });
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("redirects to '/' when refresh returns a non-admin role", async () => {
    mockFetch({
      ok: true,
      body: {
        accessToken: "tok-456",
        user: { name: "Field Worker", role: "worker" },
      },
    });

    const states: Array<ReturnType<typeof useHubAdminAuth>> = [];
    await act(async () => {
      render(<HookProbe onState={(s) => states.push(s)} />);
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });

    expect(states.at(-1)?.status).toBe("redirecting");
  });

  it("redirects to '/' when refresh fails (network error)", async () => {
    const fn = jest.fn().mockRejectedValue(new Error("offline"));
    globalThis.fetch = fn;

    await act(async () => {
      render(<HookProbe onState={() => {}} />);
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });

  it("redirects when refresh returns 401", async () => {
    mockFetch({ ok: false });

    await act(async () => {
      render(<HookProbe onState={() => {}} />);
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });
});
