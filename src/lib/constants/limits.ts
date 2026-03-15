/**
 * Limits and Constraints Constants
 * Centralized size limits, pagination, and constraint values
 */

export const LIMITS = {
  // File Upload
  FILE: {
    MAX_RESUME_SIZE: 10 * 1024 * 1024, // 10MB
  },

  // Analytics & Logging
  ANALYTICS: {
    MAX_EVENTS_IN_MEMORY: 10000,
  },
} as const;
