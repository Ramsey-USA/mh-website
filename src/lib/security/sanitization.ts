/**
 * Input Sanitization Utilities
 *
 * Provides functions to sanitize and validate user inputs to prevent
 * XSS, SQL injection, and other security vulnerabilities.
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes dangerous tags and attributes
 */
export function sanitizeHTML(input: string): string {
  if (!input) return "";

  // Remove script tags and their content
  let sanitized = input.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );

  // Remove iframe tags
  sanitized = sanitized.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    ""
  );

  // Remove dangerous event handlers
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "");

  // Remove javascript: protocols
  sanitized = sanitized.replace(/javascript:/gi, "");

  // Remove data: protocols (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, "");

  return sanitized.trim();
}

/**
 * Sanitize string for SQL queries
 * Note: Always use parameterized queries instead when possible
 */
export function sanitizeSQL(input: string): string {
  if (!input) return "";

  // Escape single quotes
  let sanitized = input.replace(/'/g, "''");

  // Remove SQL comment markers
  sanitized = sanitized.replace(/--/g, "");
  sanitized = sanitized.replace(/\/\*/g, "");
  sanitized = sanitized.replace(/\*\//g, "");

  // Remove semicolons (prevent statement chaining)
  sanitized = sanitized.replace(/;/g, "");

  return sanitized.trim();
}

/**
 * Sanitize user input for general use
 * Removes control characters and normalizes whitespace
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  // Remove control characters except newlines and tabs
  let sanitized = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Normalize whitespace
  sanitized = sanitized.replace(/\s+/g, " ");

  // Trim
  sanitized = sanitized.trim();

  return sanitized;
}

/**
 * Sanitize email address
 * Validates format and removes dangerous characters
 */
export function sanitizeEmail(email: string): string | null {
  if (!email) return null;

  // Remove whitespace
  const sanitized = email.trim().toLowerCase();

  // Basic email validation regex
  const emailRegex = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  if (!emailRegex.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize phone number
 * Removes non-numeric characters and validates format
 */
export function sanitizePhone(phone: string): string | null {
  if (!phone) return null;

  // Remove all non-numeric characters except + (for international)
  const sanitized = phone.replace(/[^\d+]/g, "");

  // Validate length (10 digits for US, or starts with +)
  if (
    sanitized.length === 10 ||
    (sanitized.startsWith("+") && sanitized.length >= 11)
  ) {
    return sanitized;
  }

  return null;
}

/**
 * Sanitize URL
 * Validates protocol and removes dangerous schemes
 */
export function sanitizeURL(url: string): string | null {
  if (!url) return null;

  const sanitized = url.trim();

  // Allow only http, https, and mailto protocols
  const allowedProtocols = /^(https?:\/\/|mailto:)/i;

  if (!allowedProtocols.test(sanitized)) {
    // If no protocol, assume https
    if (!sanitized.includes("://")) {
      return `https://${sanitized}`;
    }
    return null;
  }

  // Block javascript: and data: protocols
  if (/^(javascript|data):/i.test(sanitized)) {
    return null;
  }

  return sanitized;
}

/**
 * Sanitize filename
 * Removes path traversal attempts and dangerous characters
 */
export function sanitizeFilename(filename: string): string | null {
  if (!filename) return null;

  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, "");
  sanitized = sanitized.replace(/[\/\\]/g, "");

  // Remove dangerous characters
  sanitized = sanitized.replace(/[<>:"|?*\x00-\x1F]/g, "");

  // Limit length
  if (sanitized.length > 255) {
    sanitized = sanitized.substring(0, 255);
  }

  // Ensure it's not empty after sanitization
  if (!sanitized) return null;

  return sanitized;
}

/**
 * Escape HTML special characters
 * Useful for displaying user content
 */
export function escapeHTML(input: string): string {
  if (!input) return "";

  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
  };

  return input.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Validate and sanitize JSON input
 */
export function sanitizeJSON(input: string): unknown | null {
  if (!input) return null;

  try {
    const parsed = JSON.parse(input);

    // Additional validation: check for prototype pollution
    if (parsed && typeof parsed === "object") {
      if (
        "__proto__" in parsed ||
        "constructor" in parsed ||
        "prototype" in parsed
      ) {
        console.warn("Potential prototype pollution attempt detected");
        return null;
      }
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

/**
 * Comprehensive input sanitization for form data
 */
export interface SanitizedFormData {
  [key: string]: string | null;
}

export function sanitizeFormData(
  data: Record<string, unknown>
): SanitizedFormData {
  const sanitized: SanitizedFormData = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      // Apply different sanitization based on field type
      if (key.toLowerCase().includes("email")) {
        sanitized[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes("phone")) {
        sanitized[key] = sanitizePhone(value);
      } else if (
        key.toLowerCase().includes("url") ||
        key.toLowerCase().includes("website")
      ) {
        sanitized[key] = sanitizeURL(value);
      } else if (
        key.toLowerCase().includes("file") ||
        key.toLowerCase().includes("filename")
      ) {
        sanitized[key] = sanitizeFilename(value);
      } else {
        sanitized[key] = sanitizeInput(value);
      }
    } else {
      // For non-string values, convert to string and sanitize
      sanitized[key] = sanitizeInput(String(value));
    }
  }

  return sanitized;
}

/**
 * Rate limit validation - checks if a request should be allowed
 */
export function validateRateLimit(
  _identifier: string,
  _maxRequests: number,
  _windowMs: number
): { allowed: boolean; retryAfter?: number } {
  // This would typically use a database or KV store
  // For now, return allowed for all requests
  return { allowed: true };
}
