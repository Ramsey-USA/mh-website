/**
 * @jest-environment node
 *
 * Auth Logout & Refresh API — unit tests
 */

import { NextRequest } from "next/server";

// ── Mock JWT lib ─────────────────────────────────────────────────────────────

jest.mock("@/lib/auth/jwt", () => ({
  refreshAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { api: {}, auth: {} },
}));

import { POST as logoutPOST } from "@/app/api/auth/logout/route";
import { POST as refreshPOST } from "@/app/api/auth/refresh/route";
import { refreshAccessToken, verifyRefreshToken } from "@/lib/auth/jwt";

// ── /api/auth/logout ──────────────────────────────────────────────────────────

describe("POST /api/auth/logout", () => {
  beforeEach(() => jest.clearAllMocks());

  it("returns 401 when no refresh token cookie is present", async () => {
    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    const res = await logoutPOST(req);
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/authentication required/i);
  });

  it("returns 401 and clears cookie when refresh token is invalid", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce(null);

    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    req.cookies.set("mh_refresh_token", "bad-token");

    const res = await logoutPOST(req);
    expect(res.status).toBe(401);
    const setCookie = res.headers.get("set-cookie") ?? "";
    expect(setCookie).toMatch(/mh_refresh_token/);
    expect(setCookie).toMatch(/mh_worker_refresh_token/);
    expect(setCookie).toMatch(/mh_traveler_refresh_token/);
    expect(setCookie).toMatch(/Max-Age=0/i);
  });

  it("returns 200 with success:true for valid refresh token", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("admin-matt");

    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    req.cookies.set("mh_refresh_token", "valid-token");

    const res = await logoutPOST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("sets mh_refresh_token cookie to empty with maxAge 0", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("admin-matt");

    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    req.cookies.set("mh_refresh_token", "valid-token");

    const res = await logoutPOST(req);
    const setCookie = res.headers.get("set-cookie") ?? "";
    // Cookie value is cleared (empty string) and maxAge is 0
    expect(setCookie).toMatch(/mh_refresh_token/);
    expect(setCookie).toMatch(/Max-Age=0/i);
  });

  it("accepts worker refresh token cookie", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("worker-123");

    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    req.cookies.set("mh_worker_refresh_token", "worker-valid-token");

    const res = await logoutPOST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });

  it("accepts traveler refresh token cookie", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("traveler-123");

    const req = new NextRequest("http://localhost/api/auth/logout", {
      method: "POST",
    });
    req.cookies.set("mh_traveler_refresh_token", "traveler-valid-token");

    const res = await logoutPOST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});

// ── /api/auth/refresh ─────────────────────────────────────────────────────────

describe("POST /api/auth/refresh", () => {
  beforeEach(() => jest.clearAllMocks());

  const makeRefreshRequest = (
    cookieName?:
      | "mh_refresh_token"
      | "mh_field_refresh_token"
      | "mh_worker_refresh_token"
      | "mh_traveler_refresh_token",
    token?: string,
  ) => {
    const req = new NextRequest("http://localhost/api/auth/refresh", {
      method: "POST",
    });
    if (cookieName && token) {
      req.cookies.set(cookieName, token);
    }
    return req;
  };

  it("returns 401 when no refresh token cookie is present", async () => {
    const res = await refreshPOST(makeRefreshRequest());
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("No refresh token provided");
  });

  it("returns 401 and clears cookie when token is invalid/expired", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce(null);
    const res = await refreshPOST(
      makeRefreshRequest("mh_refresh_token", "bad-token"),
    );
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/invalid or expired/i);
  });

  it("returns new accessToken when refresh token is valid", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("admin-matt");
    (refreshAccessToken as jest.Mock).mockResolvedValueOnce("new-access-token");
    const res = await refreshPOST(
      makeRefreshRequest("mh_refresh_token", "valid-token"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.accessToken).toBe("new-access-token");
    expect(body.expiresIn).toBe(900);
  });

  it("uses worker refresh cookie and returns worker role", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("worker-999");
    (refreshAccessToken as jest.Mock).mockResolvedValueOnce(
      "worker-access-token",
    );

    const res = await refreshPOST(
      makeRefreshRequest("mh_worker_refresh_token", "worker-refresh-token"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.role).toBe("worker");
    expect(body.user.name).toBe("Field Worker");
  });

  it("uses traveler refresh cookie and returns traveler role", async () => {
    (verifyRefreshToken as jest.Mock).mockResolvedValueOnce("traveler-999");
    (refreshAccessToken as jest.Mock).mockResolvedValueOnce(
      "traveler-access-token",
    );

    const res = await refreshPOST(
      makeRefreshRequest("mh_traveler_refresh_token", "traveler-refresh-token"),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.role).toBe("traveler");
    expect(body.user.name).toBe("Travelers Insurance");
  });
});
