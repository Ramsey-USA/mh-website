/**
 * @jest-environment jsdom
 */

import { hubFetch, refreshHubAdminSession } from "../api";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function mockFetchOnce(response: { ok: boolean; body?: unknown }): jest.Mock {
  const fn = jest.fn().mockResolvedValue({
    ok: response.ok,
    json: async () => response.body ?? {},
  });
  globalThis.fetch = fn;
  return fn;
}

describe("refreshHubAdminSession", () => {
  it("returns the session when the user is an admin", async () => {
    mockFetchOnce({
      ok: true,
      body: { accessToken: "tok-123", user: { name: "Matt", role: "admin" } },
    });

    const session = await refreshHubAdminSession();
    expect(session).toEqual({
      accessToken: "tok-123",
      user: { name: "Matt", role: "admin" },
    });
  });

  it("returns null when the refresh response is not ok", async () => {
    mockFetchOnce({ ok: false });
    expect(await refreshHubAdminSession()).toBeNull();
  });

  it("returns null when the user role is not admin", async () => {
    mockFetchOnce({
      ok: true,
      body: { accessToken: "tok-x", user: { role: "worker" } },
    });
    expect(await refreshHubAdminSession()).toBeNull();
  });

  it("returns null when the response is missing an access token", async () => {
    mockFetchOnce({ ok: true, body: { user: { role: "admin" } } });
    expect(await refreshHubAdminSession()).toBeNull();
  });

  it("posts to /api/auth/refresh with credentials", async () => {
    const fn = mockFetchOnce({
      ok: true,
      body: { accessToken: "tok-1", user: { role: "admin" } },
    });

    await refreshHubAdminSession();

    expect(fn).toHaveBeenCalledWith("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
  });
});

describe("hubFetch", () => {
  it("attaches a bearer Authorization header", async () => {
    const fn = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    globalThis.fetch = fn;

    await hubFetch("tok-abc", "/api/team-profile");

    const init = fn.mock.calls[0][1] as { headers: Headers };
    expect(init.headers.get("Authorization")).toBe("Bearer tok-abc");
  });

  it("sets JSON content type when a body is present", async () => {
    const fn = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    globalThis.fetch = fn;

    await hubFetch("tok", "/api/team-profile", {
      method: "PUT",
      body: JSON.stringify({ bio: "hi" }),
    });

    const init = fn.mock.calls[0][1] as { headers: Headers };
    expect(init.headers.get("Content-Type")).toBe("application/json");
  });

  it("does not set Content-Type for body-less requests", async () => {
    const fn = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    globalThis.fetch = fn;

    await hubFetch("tok", "/api/team-profile/review");

    const init = fn.mock.calls[0][1] as { headers: Headers };
    expect(init.headers.get("Content-Type")).toBeNull();
  });

  it("preserves caller-supplied Content-Type", async () => {
    const fn = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    globalThis.fetch = fn;

    await hubFetch("tok", "/api/upload", {
      method: "POST",
      body: "raw-body",
      headers: { "Content-Type": "text/plain" },
    });

    const init = fn.mock.calls[0][1] as { headers: Headers };
    expect(init.headers.get("Content-Type")).toBe("text/plain");
  });
});
