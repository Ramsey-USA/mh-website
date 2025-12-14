/**
 * Unified API Response Types
 * Standardized response structures for all API endpoints
 */

/**
 * Base API response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

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
 * Authentication response
 */
export interface AuthResponse {
  success: boolean;
  user?: {
    uid: string;
    email?: string;
    role?: string;
    name?: string;
  };
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  error?: string;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  success: boolean;
  data?: {
    url: string;
    key: string;
    filename: string;
    size: number;
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
