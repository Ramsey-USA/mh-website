/**
 * @jest-environment node
 */

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
} from "@/lib/api/responses";

describe("API Response Helpers", () => {
  describe("createSuccessResponse()", () => {
    it("returns success:true with status 200", async () => {
      const res = createSuccessResponse();
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
    });

    it("includes data and message when provided", async () => {
      const res = createSuccessResponse({ id: 1 }, "Created");
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toEqual({ id: 1 });
      expect(body.message).toBe("Created");
    });

    it("uses custom status code", async () => {
      const res = createSuccessResponse({ id: 2 }, undefined, 201);
      expect(res.status).toBe(201);
    });
  });

  describe("createErrorResponse()", () => {
    it("returns success:false with status 500 by default", async () => {
      const res = createErrorResponse("Something went wrong");
      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("Something went wrong");
    });

    it("uses custom status code", async () => {
      const res = createErrorResponse("Bad input", 400);
      expect(res.status).toBe(400);
    });
  });

  describe("createFormSubmissionResponse()", () => {
    it("returns correct shape", async () => {
      const res = createFormSubmissionResponse("sub-1", true, "Thank you");
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.message).toBe("Thank you");
      expect(body.data.id).toBe("sub-1");
      expect(body.data.emailSent).toBe(true);
    });
  });

  describe("createPaginatedResponse()", () => {
    it("returns correct shape", async () => {
      const res = createPaginatedResponse([1, 2, 3], 3);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.data).toEqual([1, 2, 3]);
      expect(body.count).toBe(3);
    });
  });

  describe("shorthand helpers", () => {
    it("badRequest() returns 400", async () => {
      const res = badRequest("Invalid");
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.success).toBe(false);
    });

    it("unauthorized() returns 401", async () => {
      const res = unauthorized();
      expect(res.status).toBe(401);
    });

    it("forbidden() returns 403", async () => {
      const res = forbidden();
      expect(res.status).toBe(403);
    });

    it("notFound() returns 404", async () => {
      const res = notFound();
      expect(res.status).toBe(404);
    });

    it("methodNotAllowed() returns 405", async () => {
      const res = methodNotAllowed();
      expect(res.status).toBe(405);
    });

    it("internalServerError() returns 500", async () => {
      const res = internalServerError();
      expect(res.status).toBe(500);
    });

    it("serviceUnavailable() returns 503", async () => {
      const res = serviceUnavailable();
      expect(res.status).toBe(503);
    });
  });
});
