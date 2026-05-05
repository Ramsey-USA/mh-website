/**
 * Escape HTML special characters to prevent XSS / HTML injection
 * when interpolating user-supplied values into HTML email templates.
 */
export function escapeHtml(str: unknown): string {
  const s = String(str ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validate that a URL is safe to use in an `href` attribute.
 * Rejects `javascript:`, `data:`, `vbscript:`, and other dangerous schemes.
 * Returns the URL if safe, or an empty string if not.
 */
export function sanitizeUrl(url: unknown): string {
  const s = String(url ?? "").trim();
  if (!s) return "";
  try {
    const parsed = new URL(s);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return s;
    }
    return "";
  } catch {
    // relative URLs are OK in email context — just block dangerous schemes
    if (/^[a-z][a-z0-9+.-]*:/i.test(s)) {
      return "";
    }
    return s;
  }
}
