/**
 * API Response Helper Functions
 * Utilities for creating standardized API responses
 */

import { NextResponse } from "next/server";
import {
  HttpStatus,
  type ApiSuccessResponse,
  type ApiErrorResponse,
  type HttpStatusCode,
  type FormSubmissionResponse,
  type PaginatedApiResponse,
} from "@/lib/types/api";

/**
 * Create a standardized success response
 * @param data Optional data to include in the response
 * @param message Optional success message
 * @param status HTTP status code (default: 200)
 */
export function createSuccessResponse<T = unknown>(
  data?: T,
  message?: string,
  status: HttpStatusCode = HttpStatus.OK,
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    ...(data !== undefined && { data }),
    ...(message && { message }),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a standardized error response
 * @param error Error message
 * @param status HTTP status code (default: 500)
 * @param message Optional additional context message
 */
export function createErrorResponse(
  error: string,
  status: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  message?: string,
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    success: false,
    error,
    ...(message && { message }),
  };

  return NextResponse.json(response, { status });
}

/**
 * Create a form submission success response
 * @param id Submission ID
 * @param emailSent Whether email was sent successfully
 * @param dbStored Whether data was stored in database
 * @param message Success message
 */
export function createFormSubmissionResponse(
  id: string,
  emailSent: boolean,
  message: string,
  dbStored?: boolean,
): NextResponse<FormSubmissionResponse> {
  return NextResponse.json({
    success: true,
    message,
    data: {
      id,
      emailSent,
      ...(dbStored !== undefined && { dbStored }),
    },
  });
}

/**
 * Create a paginated response
 * @param data Array of items
 * @param count Number of items in current page
 * @param message Optional message
 * @param pagination Optional pagination metadata
 */
export function createPaginatedResponse<T>(
  data: T[],
  count: number,
  message?: string,
  pagination?: {
    page?: number;
    pageSize?: number;
    total?: number;
  },
): NextResponse<PaginatedApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    count,
    ...(message && { message }),
    ...pagination,
  });
}

/**
 * Create a 400 Bad Request error response
 */
export function badRequest(error: string, message?: string): NextResponse {
  return createErrorResponse(error, HttpStatus.BAD_REQUEST, message);
}

/**
 * Create a 401 Unauthorized error response
 */
export function unauthorized(
  error = "Unauthorized",
  message?: string,
): NextResponse {
  return createErrorResponse(error, HttpStatus.UNAUTHORIZED, message);
}

/**
 * Create a 403 Forbidden error response
 */
export function forbidden(error = "Forbidden", message?: string): NextResponse {
  return createErrorResponse(error, HttpStatus.FORBIDDEN, message);
}

/**
 * Create a 404 Not Found error response
 */
export function notFound(
  error = "Resource not found",
  message?: string,
): NextResponse {
  return createErrorResponse(error, HttpStatus.NOT_FOUND, message);
}

/**
 * Create a 405 Method Not Allowed error response
 */
export function methodNotAllowed(
  error = "Method not allowed",
  message?: string,
): NextResponse {
  return createErrorResponse(error, HttpStatus.METHOD_NOT_ALLOWED, message);
}

/**
 * Create a 500 Internal Server Error response
 */
export function internalServerError(
  error = "Internal server error",
  message?: string,
): NextResponse {
  return createErrorResponse(error, HttpStatus.INTERNAL_SERVER_ERROR, message);
}

/**
 * Create a 503 Service Unavailable error response
 */
export function serviceUnavailable(
  error = "Service unavailable",
  message?: string,
): NextResponse {
  return createErrorResponse(error, HttpStatus.SERVICE_UNAVAILABLE, message);
}
