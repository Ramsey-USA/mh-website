/**
 * @jest-environment jsdom
 */

import { adminFetch, refreshAdminSession } from "../api";
import {
  mockFetchOnce,
  restoreFetch,
} from "@/__tests__/helpers/api-test-utils";

afterEach(() => {
  restoreFetch();
});

describe("refreshAdminSession", () => {
  it("returns a session including email when present", async () => {
    mockFetchOnce({
      ok: true,
      body: {
        accessToken: "tok-1",
        user: { name: "Matt", email: "matt@mh.com", role: "admin" },
      },
    });
    expect(await refreshAdminSession()).toEqual({
      accessToken: "tok-1",
      user: { name: "Matt", email: "matt@mh.com", role: "admin" },
    });
  });

  it("omits email when not provided", async () => {
    mockFetchOnce({
      ok: true,
      body: { accessToken: "tok-2", user: { name: "X", role: "admin" } },
    });
    const session = await refreshAdminSession();
    expect(session).toEqual({
      accessToken: "tok-2",
      user: { name: "X", role: "admin" },
    });
  });

  it("returns null when not ok", async () => {
    mockFetchOnce({ ok: false });
    expect(await refreshAdminSession()).toBeNull();
  });

  it("returns null when role is not admin", async () => {
    mockFetchOnce({
      ok: true,
      body: { accessToken: "t", user: { role: "worker" } },
    });
    expect(await refreshAdminSession()).toBeNull();
  });

  it("returns null when accessToken missing", async () => {
    mockFetchOnce({ ok: true, body: { user: { role: "admin" } } });
    expect(await refreshAdminSession()).toBeNull();
  });
});

describe("adminFetch", () => {
  it("injects bearer token + JSON content-type when body present", async () => {
    const fn = jest.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fn;

    await adminFetch("tok-x", "/api/foo", {
      method: "POST",
      body: JSON.stringify({ a: 1 }),
    });

    const [, init] = fn.mock.calls[0];
    const headers = init.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer tok-x");
    expect(headers.get("Content-Type")).toBe("application/json");
  });

  it("does not set content-type for GET (no body)", async () => {
    const fn = jest.fn().mockResolvedValue({ ok: true });
    globalThis.fetch = fn;

    await adminFetch("tok-y", "/api/bar");

    const [, init] = fn.mock.calls[0];
    const headers = init.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer tok-y");
    expect(headers.get("Content-Type")).toBeNull();
  });
});
