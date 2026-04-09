/**
 * Limits and Constraints Constants
 * Centralized size limits, pagination, and constraint values
 */

export const LIMITS = {
  // File Upload
  FILE: {
    MAX_RESUME_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_SAFETY_INTAKE_SIZE: 25 * 1024 * 1024, // 25MB
  },

  // Analytics & Logging
  ANALYTICS: {
    MAX_EVENTS_IN_MEMORY: 10000,
  },
} as const;
