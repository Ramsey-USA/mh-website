/**
 * Shared constants for the Authorized Drivers API
 * Used by both /api/drivers and /api/drivers/[id] routes
 */

export const VALID_AUTHORIZATION_STATUSES = [
  "authorized",
  "suspended",
  "revoked",
  "pending",
] as const;

export const VALID_MVR_STATUSES = [
  "clear",
  "flagged",
  "suspended",
  "revoked",
  "pending",
] as const;

export const VALID_LICENSE_CLASSES = [
  "standard",
  "CDL-A",
  "CDL-B",
  "CDL-C",
] as const;

export type AuthorizationStatus = (typeof VALID_AUTHORIZATION_STATUSES)[number];
export type MvrStatus = (typeof VALID_MVR_STATUSES)[number];
export type LicenseClass = (typeof VALID_LICENSE_CLASSES)[number];

/**
 * Type guard to check if a value is a valid authorization status
 */
export function isValidAuthorizationStatus(
  value: unknown,
): value is AuthorizationStatus {
  return (
    typeof value === "string" &&
    VALID_AUTHORIZATION_STATUSES.includes(value as AuthorizationStatus)
  );
}

/**
 * Type guard to check if a value is a valid MVR status
 */
export function isValidMvrStatus(value: unknown): value is MvrStatus {
  return (
    typeof value === "string" && VALID_MVR_STATUSES.includes(value as MvrStatus)
  );
}

/**
 * Type guard to check if a value is a valid license class
 */
export function isValidLicenseClass(value: unknown): value is LicenseClass {
  return (
    typeof value === "string" &&
    VALID_LICENSE_CLASSES.includes(value as LicenseClass)
  );
}
