/**
 * Tests for lib/api/responses.ts
 *
 * Covers all 11 functions:
 * createSuccessResponse, createErrorResponse, createFormSubmissionResponse,
 * createPaginatedResponse, badRequest, unauthorized, forbidden,
 * notFound, methodNotAllowed, internalServerError, serviceUnavailable
 *
 * @jest-environment node
 */

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    })),
  },
}));

import {
  createSuccessResponse,
  createErrorResponse,
  createFormSubmissionResponse,
  createPaginatedResponse,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  methodNotAllowed,
  internalServerError,
  serviceUnavailable,
} from "../responses";

function getJson() {
  return jest.requireMock("next/server").NextResponse.json as jest.Mock;
}

function lastCall() {
  const calls = getJson().mock.calls;
  return calls[calls.length - 1];
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ---- createSuccessResponse ----

describe("createSuccessResponse()", () => {
  it("returns success=true with data and message", () => {
    createSuccessResponse({ id: 1 }, "Created");
    const [body, init] = lastCall();
    expect(body.success).toBe(true);
    expect(body.data).toEqual({ id: 1 });
    expect(body.message).toBe("Created");
    expect(init?.status).toBe(200);
  });

  it("omits data when not provided", () => {
    createSuccessResponse(undefined, "OK");
    const [body] = lastCall();
    expect(body).not.toHaveProperty("data");
  });

  it("omits message when not provided", () => {
    createSuccessResponse({ x: 1 });
    const [body] = lastCall();
    expect(body).not.toHaveProperty("message");
  });

  it("accepts a custom HTTP status code", () => {
    createSuccessResponse(undefined, undefined, 201);
    const [, init] = lastCall();
    expect(init?.status).toBe(201);
  });
});

// ---- createErrorResponse ----

describe("createErrorResponse()", () => {
  it("returns success=false with error string and default 500", () => {
    createErrorResponse("Something went wrong");
    const [body, init] = lastCall();
    expect(body.success).toBe(false);
    expect(body.error).toBe("Something went wrong");
    expect(init?.status).toBe(500);
  });

  it("includes optional message", () => {
    createErrorResponse("DB error", 500, "Please try again later");
    const [body] = lastCall();
    expect(body.message).toBe("Please try again later");
  });

  it("omits message when not provided", () => {
    createErrorResponse("error");
    const [body] = lastCall();
    expect(body).not.toHaveProperty("message");
  });

  it("accepts a custom status code", () => {
    createErrorResponse("Not found", 404);
    const [, init] = lastCall();
    expect(init?.status).toBe(404);
  });
});

// ---- createFormSubmissionResponse ----

describe("createFormSubmissionResponse()", () => {
  it("returns success with id, emailSent, and message", () => {
    createFormSubmissionResponse("sub-123", true, "Submitted successfully");
    const [body] = lastCall();
    expect(body.success).toBe(true);
    expect(body.message).toBe("Submitted successfully");
    expect(body.data.id).toBe("sub-123");
    expect(body.data.emailSent).toBe(true);
  });

  it("includes dbStored when provided", () => {
    createFormSubmissionResponse("sub-456", false, "Saved", true);
    const [body] = lastCall();
    expect(body.data.dbStored).toBe(true);
  });

  it("omits dbStored when not provided", () => {
    createFormSubmissionResponse("sub-789", true, "Saved");
    const [body] = lastCall();
    expect(body.data).not.toHaveProperty("dbStored");
  });
});

// ---- createPaginatedResponse ----

describe("createPaginatedResponse()", () => {
  it("returns paginated data with count", () => {
    createPaginatedResponse([1, 2, 3], 3, "Items fetched", {
      page: 1,
      pageSize: 10,
      total: 50,
    });
    const [body] = lastCall();
    expect(body.success).toBe(true);
    expect(body.data).toEqual([1, 2, 3]);
    expect(body.count).toBe(3);
    expect(body.message).toBe("Items fetched");
    expect(body.page).toBe(1);
    expect(body.total).toBe(50);
  });

  it("omits message when not provided", () => {
    createPaginatedResponse([], 0);
    const [body] = lastCall();
    expect(body).not.toHaveProperty("message");
  });
});

// ---- HTTP shortcut helpers ----

describe("badRequest()", () => {
  it("returns 400 status", () => {
    badRequest("Invalid input");
    const [, init] = lastCall();
    expect(init?.status).toBe(400);
  });

  it("passes optional message through", () => {
    badRequest("Validation failed", "Check required fields");
    const [body] = lastCall();
    expect(body.message).toBe("Check required fields");
  });
});

describe("unauthorized()", () => {
  it("returns 401 status with default error message", () => {
    unauthorized();
    const [body, init] = lastCall();
    expect(init?.status).toBe(401);
    expect(body.error).toBe("Unauthorized");
  });

  it("accepts a custom error string", () => {
    unauthorized("Token expired");
    const [body] = lastCall();
    expect(body.error).toBe("Token expired");
  });
});

describe("forbidden()", () => {
  it("returns 403 with default error", () => {
    forbidden();
    const [body, init] = lastCall();
    expect(init?.status).toBe(403);
    expect(body.error).toBe("Forbidden");
  });

  it("accepts a custom error and message", () => {
    forbidden("Insufficient permissions", "Admin only");
    const [body] = lastCall();
    expect(body.error).toBe("Insufficient permissions");
    expect(body.message).toBe("Admin only");
  });
});

describe("notFound()", () => {
  it("returns 404 with default error", () => {
    notFound();
    const [, init] = lastCall();
    expect(init?.status).toBe(404);
  });
});

describe("methodNotAllowed()", () => {
  it("returns 405 with default error", () => {
    methodNotAllowed();
    const [body, init] = lastCall();
    expect(init?.status).toBe(405);
    expect(body.error).toBe("Method not allowed");
  });
});

describe("internalServerError()", () => {
  it("returns 500 with default error", () => {
    internalServerError();
    const [, init] = lastCall();
    expect(init?.status).toBe(500);
  });

  it("accepts custom error and message", () => {
    internalServerError("DB connection failed", "Retry later");
    const [body] = lastCall();
    expect(body.error).toBe("DB connection failed");
    expect(body.message).toBe("Retry later");
  });
});

describe("serviceUnavailable()", () => {
  it("returns 503 with default error", () => {
    serviceUnavailable();
    const [body, init] = lastCall();
    expect(init?.status).toBe(503);
    expect(body.error).toBe("Service unavailable");
  });

  it("accepts custom error", () => {
    serviceUnavailable("Maintenance mode", "Back soon");
    const [body] = lastCall();
    expect(body.error).toBe("Maintenance mode");
    expect(body.message).toBe("Back soon");
  });
});
