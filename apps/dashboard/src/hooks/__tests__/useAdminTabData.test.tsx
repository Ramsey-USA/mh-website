/**
 * @jest-environment jsdom
 */

import { act, render, waitFor } from "@testing-library/react";
import { useAdminTabData } from "../useAdminTabData";

const originalFetch = globalThis.fetch;

interface Probe<T> {
  current: ReturnType<typeof useAdminTabData<T>> | null;
}

function HookProbe<T>({
  token,
  url,
  probe,
}: {
  token: string | null;
  url: string;
  probe: Probe<T>;
}) {
  probe.current = useAdminTabData<T>(token, url);
  return null;
}

afterEach(() => {
  globalThis.fetch = originalFetch;
  jest.clearAllMocks();
});

function mockFetch<T>(body: T, ok = true): jest.Mock {
  const fn = jest.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: async () => body,
  });
  globalThis.fetch = fn;
  return fn;
}

describe("useAdminTabData", () => {
  it("fetches with bearer token and reaches success state", async () => {
    const fn = mockFetch({ items: [1, 2, 3] });

    const probe: Probe<{ items: number[] }> = { current: null };
    await act(async () => {
      render(<HookProbe token="tok" url="/api/x" probe={probe} />);
    });
    await waitFor(() => expect(probe.current?.status).toBe("success"));
    expect(probe.current?.data).toEqual({ items: [1, 2, 3] });

    const [, init] = fn.mock.calls[0];
    expect((init.headers as Headers).get("Authorization")).toBe("Bearer tok");
  });

  it("transitions to error state on non-ok response", async () => {
    mockFetch({}, false);

    const probe: Probe<unknown> = { current: null };
    await act(async () => {
      render(<HookProbe token="tok" url="/api/y" probe={probe} />);
    });
    await waitFor(() => expect(probe.current?.status).toBe("error"));
    expect(probe.current?.error).toMatch(/500/);
  });

  it("does not fetch when token is null", async () => {
    const fn = mockFetch({});

    const probe: Probe<unknown> = { current: null };
    await act(async () => {
      render(<HookProbe token={null} url="/api/z" probe={probe} />);
    });

    expect(fn).not.toHaveBeenCalled();
    expect(probe.current?.status).toBe("idle");
  });

  it("refetch() re-runs the request", async () => {
    const fn = mockFetch({ ok: true });

    const probe: Probe<unknown> = { current: null };
    await act(async () => {
      render(<HookProbe token="tok" url="/api/r" probe={probe} />);
    });
    await waitFor(() => expect(probe.current?.status).toBe("success"));
    expect(fn).toHaveBeenCalledTimes(1);

    await act(async () => {
      await probe.current?.refetch();
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
