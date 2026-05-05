/**
 * Unified API Response Types
 * Standardized response structures for all API endpoints
 */

/**
 * Success response structure
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  message?: string;
}

/**
 * Error response structure
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

/**
 * Paginated response structure
 */
export interface PaginatedApiResponse<T> extends ApiSuccessResponse<T[]> {
  count: number;
  page?: number;
  pageSize?: number;
  total?: number;
}

/**
 * Form submission response
 */
export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    emailSent: boolean;
    dbStored?: boolean;
  };
  error?: string;
}

/**
 * Status code constants
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export type HttpStatusCode = (typeof HttpStatus)[keyof typeof HttpStatus];
