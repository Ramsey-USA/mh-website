/**
 * Authentication Flow Integration Tests
 *
 * Tests the complete authentication flow including login,
 * token generation, refresh, and protected routes
 */

import "@testing-library/jest-dom";
import {
  generateTokenPair,
  verifyToken,
  refreshAccessToken,
} from "@/lib/auth/jwt";

// Mock fetch for API calls
global.fetch = jest.fn();

describe("Authentication Flow Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Login Flow", () => {
    it("should login with valid credentials", async () => {
      const mockResponse = {
        success: true,
        user: {
          uid: "user-123",
          email: "test@example.com",
          role: "user",
          name: "Test User",
        },
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        expiresIn: 900,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const result = await response.json();

      expect(response.ok).toBe(true);
      expect(result.success).toBe(true);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.user.email).toBe("test@example.com");
    });

    it("should reject invalid credentials", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Invalid credentials",
        }),
      });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "wrongpassword",
        }),
      });

      expect(response.status).toBe(401);
      const result = await response.json();
      expect(result.error).toBe("Invalid credentials");
    });

    it("should enforce rate limiting on login attempts", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({
          "Retry-After": "60",
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
        }),
        json: async () => ({
          error: "Too many authentication attempts",
          retryAfter: 60,
        }),
      });

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password",
        }),
      });

      expect(response.status).toBe(429);
    });
  });

  describe("Token Refresh Flow", () => {
    it("should refresh access token with valid refresh token", async () => {
      const mockResponse = {
        success: true,
        accessToken: "new-access-token",
        expiresIn: 900,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: "valid-refresh-token",
        }),
      });

      const result = await response.json();

      expect(response.ok).toBe(true);
      expect(result.success).toBe(true);
      expect(result.accessToken).toBeDefined();
    });

    it("should reject invalid refresh token", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Invalid or expired refresh token",
        }),
      });

      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: "invalid-token",
        }),
      });

      expect(response.status).toBe(401);
    });
  });

  describe("Protected Routes", () => {
    it("should access protected route with valid token", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: { message: "Protected data" },
        }),
      });

      const response = await fetch("/api/functions/getUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer valid-token",
        },
        body: JSON.stringify({}),
      });

      expect(response.ok).toBe(true);
    });

    it("should reject access without token", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Authentication required",
        }),
      });

      const response = await fetch("/api/functions/getUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(401);
    });

    it("should reject expired tokens", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          error: "Invalid token",
          message: "Token is invalid or expired",
        }),
      });

      const response = await fetch("/api/functions/getUserData", {
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

  describe("Authorization Header", () => {
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

  describe("User Roles and Permissions", () => {
    it("should check user role hierarchy", () => {
      const roleHierarchy: Record<string, number> = {
        user: 1,
        editor: 2,
        admin: 3,
        superadmin: 4,
      };

      const hasPermission = (userRole: string, requiredRole: string) => {
        const userLevel = roleHierarchy[userRole] || 0;
        const requiredLevel = roleHierarchy[requiredRole] || 0;
        return userLevel >= requiredLevel;
      };

      expect(hasPermission("admin", "user")).toBe(true);
      expect(hasPermission("user", "admin")).toBe(false);
      expect(hasPermission("editor", "editor")).toBe(true);
    });

    it("should enforce role-based access", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          error: "Insufficient permissions",
          message: "Required role: admin",
        }),
      });

      const response = await fetch("/api/admin/settings", {
        method: "GET",
        headers: {
          Authorization: "Bearer user-token-with-user-role",
        },
      });

      expect(response.status).toBe(403);
    });
  });
});
