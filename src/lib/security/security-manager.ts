/**
 * Security Manager - Edge Runtime Compatible
 * Provides comprehensive security features for the MH Construction platform
 * Uses Web Crypto API (Edge compatible) instead of Node.js crypto
 */

import { type NextRequest, NextResponse } from "next/server";

// Security Configuration
export interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    skipSuccessfulRequests: boolean;
    skipFailedRequests: boolean;
    standardHeaders: boolean;
    legacyHeaders: boolean;
  };
  cors: {
    origin: string[];
    methods: string[];
    allowedHeaders: string[];
    credentials: boolean;
    maxAge: number;
  };
  helmet: {
    contentSecurityPolicy: {
      directives: Record<string, string[]>;
    };
    hsts: {
      maxAge: number;
      includeSubDomains: boolean;
      preload: boolean;
    };
    xssFilter: boolean;
    noSniff: boolean;
    frameguard: {
      action: string;
    };
    referrerPolicy: string;
  };
  csrf: {
    tokenName: string;
    cookieName: string;
    secure: boolean;
    sameSite: "strict" | "lax" | "none";
    httpOnly: boolean;
    maxAge: number;
  };
  validation: {
    maxFieldLength: number;
    maxFileSize: number;
    allowedMimeTypes: string[];
    sanitizeHtml: boolean;
    validateEmails: boolean;
  };
  audit: {
    logFailedAttempts: boolean;
    logSuccessfulRequests: boolean;
    sensitiveDataMasking: boolean;
    retentionDays: number;
  };
}

// Default Security Configuration
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // limit each IP to 100 requests per windowMs
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
  },
  cors: {
    origin: [
      "https://mh-construction.com",
      "https://www.mh-construction.com",
      "https://staging.mh-construction.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-CSRF-Token",
    ],
    credentials: true,
    maxAge: 86400, // 24 hours
  },
  helmet: {
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://www.googletagmanager.com",
          "https://www.google-analytics.com",
        ],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "data:", "https:", "blob:"],
        "connect-src": [
          "'self'",
          "https://api.cloudflare.com",
          "https://www.google-analytics.com",
        ],
        "frame-src": ["'self'", "https://www.google.com"],
        "worker-src": ["'self'", "blob:"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    xssFilter: true,
    noSniff: true,
    frameguard: {
      action: "deny",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
  },
  csrf: {
    tokenName: "csrfToken",
    cookieName: "_csrf",
    secure: true,
    sameSite: "strict",
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  },
  validation: {
    maxFieldLength: 1000,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "text/plain",
    ],
    sanitizeHtml: true,
    validateEmails: true,
  },
  audit: {
    logFailedAttempts: true,
    logSuccessfulRequests: false,
    sensitiveDataMasking: true,
    retentionDays: 90,
  },
};

// Rate Limiting Store
interface RateLimitEntry {
  count: number;
  resetTime: number;
  lastRequest: number;
}

class RateLimitStore {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup();
      },
      5 * 60 * 1000,
    );
  }

  get(key: string): RateLimitEntry | undefined {
    return this.store.get(key);
  }

  set(key: string, entry: RateLimitEntry): void {
    this.store.set(key, entry);
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  cleanup(): void {
    const now = Date.now();
    this.store.forEach((entry, key) => {
      if (entry.resetTime < now) {
        this.store.delete(key);
      }
    });
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Global rate limit store
const rateLimitStore = new RateLimitStore();

/**
 * Rate Limiting Middleware
 */
export class RateLimiter {
  private config: SecurityConfig["rateLimit"];

  constructor(
    config: SecurityConfig["rateLimit"] = DEFAULT_SECURITY_CONFIG.rateLimit,
  ) {
    this.config = config;
  }

  /**
   * Check if request should be rate limited
   */
  async checkRateLimit(request: NextRequest): Promise<{
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
  }> {
    const ip = this.getClientIP(request);
    const key = `rate_limit:${ip}`;
    const now = Date.now();

    let entry = rateLimitStore.get(key);

    if (!entry || entry.resetTime < now) {
      // Create new entry or reset expired entry
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs,
        lastRequest: now,
      };
      rateLimitStore.set(key, entry);

      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: entry.resetTime,
      };
    }

    // Update existing entry
    entry.count += 1;
    entry.lastRequest = now;
    rateLimitStore.set(key, entry);

    const allowed = entry.count <= this.config.maxRequests;
    const remaining = Math.max(0, this.config.maxRequests - entry.count);
    const retryAfter = allowed
      ? undefined
      : Math.ceil((entry.resetTime - now) / 1000);

    return {
      allowed,
      remaining,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }

  /**
   * Get client IP address
   */
  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");

    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }

    if (realIP) {
      return realIP;
    }

    // Fallback - try to get from the request URL or use unknown
    const url = new URL(request.url);
    return url.hostname === "localhost" ? "127.0.0.1" : "unknown";
  }

  /**
   * Apply rate limit headers to response
   */
  applyHeaders(response: NextResponse, rateLimitInfo: unknown): NextResponse {
    if (this.config.standardHeaders) {
      response.headers.set(
        "RateLimit-Limit",
        this.config.maxRequests.toString(),
      );
      response.headers.set(
        "RateLimit-Remaining",
        rateLimitInfo.remaining.toString(),
      );
      response.headers.set(
        "RateLimit-Reset",
        new Date(rateLimitInfo.resetTime).toISOString(),
      );
    }

    if (this.config.legacyHeaders) {
      response.headers.set(
        "X-RateLimit-Limit",
        this.config.maxRequests.toString(),
      );
      response.headers.set(
        "X-RateLimit-Remaining",
        rateLimitInfo.remaining.toString(),
      );
      response.headers.set(
        "X-RateLimit-Reset",
        Math.ceil(rateLimitInfo.resetTime / 1000).toString(),
      );
    }

    if (rateLimitInfo.retryAfter) {
      response.headers.set("Retry-After", rateLimitInfo.retryAfter.toString());
    }

    return response;
  }
}

/**
 * CSRF Protection
 */
export class CSRFProtection {
  private config: SecurityConfig["csrf"];

  constructor(config: SecurityConfig["csrf"] = DEFAULT_SECURITY_CONFIG.csrf) {
    this.config = config;
  }

  /**
   * Generate CSRF token (Edge-compatible)
   */
  generateToken(): string {
    const array = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }

  /**
   * Validate CSRF token
   */
  validateToken(request: NextRequest, token: string): boolean {
    const cookieToken = this.extractTokenFromCookie(request);
    const headerToken = this.extractTokenFromHeader(request);

    return cookieToken === token || headerToken === token;
  }

  /**
   * Extract token from cookie
   */
  private extractTokenFromCookie(request: NextRequest): string | null {
    const cookies = request.headers.get("cookie");
    if (!cookies) return null;

    const match = cookies.match(
      new RegExp(`${this.config.cookieName}=([^;]+)`),
    );
    return match ? match[1] : null;
  }

  /**
   * Extract token from header
   */
  private extractTokenFromHeader(request: NextRequest): string | null {
    return (
      request.headers.get("X-CSRF-Token") ||
      request.headers.get("x-csrf-token") ||
      request.headers.get("csrf-token")
    );
  }

  /**
   * Set CSRF token in response
   */
  setTokenCookie(response: NextResponse, token: string): NextResponse {
    const cookieValue = `${this.config.cookieName}=${token}; Max-Age=${this.config.maxAge}; Path=/; ${this.config.secure ? "Secure; " : ""}SameSite=${this.config.sameSite}${this.config.httpOnly ? "; HttpOnly" : ""}`;

    response.headers.set("Set-Cookie", cookieValue);
    return response;
  }
}

/**
 * Input Validation and Sanitization
 */
export class InputValidator {
  private config: SecurityConfig["validation"];

  constructor(
    config: SecurityConfig["validation"] = DEFAULT_SECURITY_CONFIG.validation,
  ) {
    this.config = config;
  }

  /**
   * Validate and sanitize text input
   */
  validateText(
    input: string,
    fieldName: string,
  ): {
    isValid: boolean;
    sanitizedValue: string;
    errors: string[];
  } {
    const errors: string[] = [];
    let sanitizedValue = input;

    // Length validation
    if (input.length > this.config.maxFieldLength) {
      errors.push(
        `${fieldName} exceeds maximum length of ${this.config.maxFieldLength} characters`,
      );
    }

    // XSS protection
    if (this.config.sanitizeHtml) {
      sanitizedValue = this.sanitizeHtml(input);
    }

    // SQL injection protection
    sanitizedValue = this.preventSQLInjection(sanitizedValue);

    return {
      isValid: errors.length === 0,
      sanitizedValue,
      errors,
    };
  }

  /**
   * Validate email address
   */
  validateEmail(email: string): {
    isValid: boolean;
    sanitizedValue: string;
    errors: string[];
  } {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.config.validateEmails) {
      return {
        isValid: true,
        sanitizedValue: email.trim().toLowerCase(),
        errors: [],
      };
    }

    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }

    return {
      isValid: errors.length === 0,
      sanitizedValue: email.trim().toLowerCase(),
      errors,
    };
  }

  /**
   * Validate file upload
   */
  validateFile(file: File): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Size validation
    if (file.size > this.config.maxFileSize) {
      errors.push(
        `File size exceeds maximum allowed size of ${this.config.maxFileSize / (1024 * 1024)}MB`,
      );
    }

    // MIME type validation
    if (!this.config.allowedMimeTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize HTML to prevent XSS
   */
  private sanitizeHtml(input: string): string {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  }

  /**
   * Prevent SQL injection
   */
  private preventSQLInjection(input: string): string {
    const sqlKeywords = [
      "SELECT",
      "INSERT",
      "UPDATE",
      "DELETE",
      "DROP",
      "CREATE",
      "ALTER",
      "EXEC",
      "EXECUTE",
      "UNION",
      "SCRIPT",
      "JAVASCRIPT",
    ];

    let sanitized = input;
    sqlKeywords.forEach((keyword) => {
      const regex = new RegExp(keyword, "gi");
      sanitized = sanitized.replace(regex, "");
    });

    return sanitized;
  }
}

/**
 * Security Headers Manager
 */
export class SecurityHeaders {
  private config: SecurityConfig["helmet"];

  constructor(
    config: SecurityConfig["helmet"] = DEFAULT_SECURITY_CONFIG.helmet,
  ) {
    this.config = config;
  }

  /**
   * Apply security headers to response
   */
  applyHeaders(response: NextResponse): NextResponse {
    // Content Security Policy
    const csp = this.buildCSP();
    response.headers.set("Content-Security-Policy", csp);

    // HSTS
    if (this.config.hsts) {
      const hstsValue = `max-age=${this.config.hsts.maxAge}${this.config.hsts.includeSubDomains ? "; includeSubDomains" : ""}${this.config.hsts.preload ? "; preload" : ""}`;
      response.headers.set("Strict-Transport-Security", hstsValue);
    }

    // X-XSS-Protection
    if (this.config.xssFilter) {
      response.headers.set("X-XSS-Protection", "1; mode=block");
    }

    // X-Content-Type-Options
    if (this.config.noSniff) {
      response.headers.set("X-Content-Type-Options", "nosniff");
    }

    // X-Frame-Options
    if (this.config.frameguard) {
      response.headers.set(
        "X-Frame-Options",
        this.config.frameguard.action.toUpperCase(),
      );
    }

    // Referrer Policy
    if (this.config.referrerPolicy) {
      response.headers.set("Referrer-Policy", this.config.referrerPolicy);
    }

    // Additional security headers
    response.headers.set("X-Permitted-Cross-Domain-Policies", "none");
    response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin");

    return response;
  }

  /**
   * Build Content Security Policy string
   */
  private buildCSP(): string {
    const directives: string[] = [];

    for (const [directive, sources] of Object.entries(
      this.config.contentSecurityPolicy.directives,
    )) {
      directives.push(`${directive} ${sources.join(" ")}`);
    }

    return directives.join("; ");
  }
}

/**
 * Main Security Manager
 */
export class SecurityManager {
  private rateLimiter: RateLimiter;
  private csrfProtection: CSRFProtection;
  private inputValidator: InputValidator;
  private securityHeaders: SecurityHeaders;
  private config: SecurityConfig;

  constructor(config: SecurityConfig = DEFAULT_SECURITY_CONFIG) {
    this.config = config;
    this.rateLimiter = new RateLimiter(config.rateLimit);
    this.csrfProtection = new CSRFProtection(config.csrf);
    this.inputValidator = new InputValidator(config.validation);
    this.securityHeaders = new SecurityHeaders(config.helmet);
  }

  /**
   * Process security middleware for request
   */
  async processRequest(request: NextRequest): Promise<{
    allowed: boolean;
    response?: NextResponse;
    csrfToken?: string;
  }> {
    // Check rate limiting
    const rateLimitInfo = await this.rateLimiter.checkRateLimit(request);

    if (!rateLimitInfo.allowed) {
      const response = new NextResponse("Too Many Requests", { status: 429 });
      this.rateLimiter.applyHeaders(response, rateLimitInfo);
      return { allowed: false, response };
    }

    // CSRF protection for state-changing requests
    if (["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const csrfToken = request.headers.get("X-CSRF-Token");
      if (
        !csrfToken ||
        !this.csrfProtection.validateToken(request, csrfToken)
      ) {
        const response = new NextResponse("CSRF Token Invalid", {
          status: 403,
        });
        return { allowed: false, response };
      }
    }

    // Generate CSRF token for safe requests
    let csrfToken: string | undefined;
    if (request.method === "GET") {
      csrfToken = this.csrfProtection.generateToken();
    }

    return { allowed: true, csrfToken };
  }

  /**
   * Apply security to response
   */
  applyResponseSecurity(
    response: NextResponse,
    rateLimitInfo?: unknown,
    csrfToken?: string,
  ): NextResponse {
    // Apply security headers
    this.securityHeaders.applyHeaders(response);

    // Apply rate limit headers
    if (rateLimitInfo) {
      this.rateLimiter.applyHeaders(response, rateLimitInfo);
    }

    // Set CSRF token
    if (csrfToken) {
      this.csrfProtection.setTokenCookie(response, csrfToken);
    }

    return response;
  }

  /**
   * Validate input data
   */
  validateInput(data: Record<string, unknown>): {
    isValid: boolean;
    sanitizedData: Record<string, unknown>;
    errors: Record<string, string[]>;
  } {
    const sanitizedData: Record<string, unknown> = {};
    const errors: Record<string, string[]> = {};
    let isValid = true;

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        if (key.toLowerCase().includes("email")) {
          const result = this.inputValidator.validateEmail(value);
          sanitizedData[key] = result.sanitizedValue;
          if (!result.isValid) {
            errors[key] = result.errors;
            isValid = false;
          }
        } else {
          const result = this.inputValidator.validateText(value, key);
          sanitizedData[key] = result.sanitizedValue;
          if (!result.isValid) {
            errors[key] = result.errors;
            isValid = false;
          }
        }
      } else {
        sanitizedData[key] = value;
      }
    }

    return { isValid, sanitizedData, errors };
  }

  /**
   * Get configuration
   */
  getConfig(): SecurityConfig {
    return this.config;
  }
}

// Export singleton instance
export const securityManager = new SecurityManager();

// Types for external use
export type { RateLimitEntry };
