/**
 * Form Validation Utilities
 * Centralized validation functions used across all forms
 */

/**
 * Email validation regex
 * RFC 5322 compliant basic validation
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Phone validation regex (international format support)
 * Accepts formats like: 5093086489, +15093086489, (509) 308-6489
 */
export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns true if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Validate phone number
 * @param phone - Phone number to validate (can include formatting)
 * @returns true if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  return PHONE_REGEX.test(cleaned);
}

/**
 * Clean phone number (remove formatting)
 * @param phone - Phone number with potential formatting
 * @returns Cleaned phone number with only digits and optional +
 */
export function cleanPhone(phone: string): string {
  return phone.replace(/[\s\-\(\)]/g, "");
}

/**
 * Validate required field
 * @param value - Value to check
 * @returns true if not empty, false otherwise
 */
export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

/**
 * Validate minimum length
 * @param value - Value to check
 * @param minLength - Minimum required length
 * @returns true if meets minimum, false otherwise
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.trim().length >= minLength;
}

/**
 * Validate maximum length
 * @param value - Value to check
 * @param maxLength - Maximum allowed length
 * @returns true if within limit, false otherwise
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.trim().length <= maxLength;
}
