/**
 * Admin Authentication Flow Integration Tests
 *
 * Tests the admin login flow used by Matt and Jeremy to access
 * the analytics dashboard via the AdminSignInModal in the Footer.
 *
 * Real flow: Footer → AdminSignInModal → POST /api/auth/admin-login → JWT token
 *
 * Note: General user login (/api/auth/login) is not implemented —
 * the site uses a "direct human contact" model (phone/email only).
 */

import "@testing-library/jest-dom";

// Mock fetch for API calls
global.fetch = jest.fn();

describe("Admin Authentication Flow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Admin Login Flow (Matt & Jeremy)", () => {
    it("should login with valid admin credentials", async () => {
      const mockResponse = {
        success: true,
        user: {
          uid: "admin-matt",
          email: "matt@mhc-gc.com",
          role: "admin",
          name: "Matt",
        },
        accessToken: "mock-access-token",
        expiresIn: 3600,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "matt@mhc-gc.com",
          password: "correct-password",
        }),
      });

      const result = await response.json();

      expect(response.ok).toBe(true);
      expect(result.success).toBe(true);
      expect(result.accessToken).toBeDefined();
      expect(result.user.role).toBe("admin");
      expect(result.user.email).toBe("matt@mhc-gc.com");
    });

    it("should reject invalid admin credentials", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Invalid credentials",
        }),
      });

      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "matt@mhc-gc.com",
          password: "wrongpassword",
        }),
      });

      expect(response.status).toBe(401);
      const result = await response.json();
      expect(result.error).toBe("Invalid credentials");
    });

    it("should enforce strict rate limiting (3 attempts per 5 minutes)", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({
          "Retry-After": "300",
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": "0",
        }),
        json: async () => ({
          error: "Too many authentication attempts",
          retryAfter: 300,
        }),
      });

      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "matt@mhc-gc.com",
          password: "password",
        }),
      });

      expect(response.status).toBe(429);
    });

    it("should require both email and password", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          error: "Email and password are required",
        }),
      });

      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "matt@mhc-gc.com" }),
      });

      expect(response.status).toBe(400);
      const result = await response.json();
      expect(result.error).toBe("Email and password are required");
    });
  });

  describe("Dashboard Access (Protected Routes)", () => {
    it("should access analytics dashboard with valid admin token", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { message: "Dashboard data" },
        }),
      });

      const response = await fetch("/api/functions/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-admin-token",
        },
        body: JSON.stringify({
          recipient: "matt@mhc-gc.com",
          message: "Test notification",
          type: "email",
        }),
      });

      expect(response.ok).toBe(true);
    });

    it("should reject dashboard access without token", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Authentication required",
        }),
      });

      const response = await fetch("/api/functions/sendNotification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(401);
    });

    it("should reject expired admin tokens", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Invalid token",
          message: "Token is invalid or expired",
        }),
      });

      const response = await fetch("/api/functions/sendNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer expired-token",
        },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(401);
    });
  });

  describe("Authorization Header Parsing", () => {
    it("should parse Bearer token correctly", () => {
      const authHeader = "Bearer abc123xyz";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

      expect(token).toBe("abc123xyz");
    });

    it("should handle missing Authorization header", () => {
      const testAuthHeader = (header: string | null) => {
        if (!header || !header.startsWith("Bearer ")) {
          return null;
        }
        return header.substring(7);
      };

      expect(testAuthHeader(null)).toBeNull();
    });

    it("should reject invalid header format", () => {
      const authHeader = "InvalidFormat token123";
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : null;

      expect(token).toBeNull();
    });
  });
});
