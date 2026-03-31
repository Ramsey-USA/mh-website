import { HttpStatus } from "@/lib/types/api";
import type {
  ApiSuccessResponse,
  ApiErrorResponse,
  PaginatedApiResponse,
  FormSubmissionResponse,
  HttpStatusCode,
} from "@/lib/types/api";

describe("HttpStatus", () => {
  it("OK is 200", () => {
    expect(HttpStatus.OK).toBe(200);
  });

  it("CREATED is 201", () => {
    expect(HttpStatus.CREATED).toBe(201);
  });

  it("BAD_REQUEST is 400", () => {
    expect(HttpStatus.BAD_REQUEST).toBe(400);
  });

  it("UNAUTHORIZED is 401", () => {
    expect(HttpStatus.UNAUTHORIZED).toBe(401);
  });

  it("FORBIDDEN is 403", () => {
    expect(HttpStatus.FORBIDDEN).toBe(403);
  });

  it("NOT_FOUND is 404", () => {
    expect(HttpStatus.NOT_FOUND).toBe(404);
  });

  it("METHOD_NOT_ALLOWED is 405", () => {
    expect(HttpStatus.METHOD_NOT_ALLOWED).toBe(405);
  });

  it("CONFLICT is 409", () => {
    expect(HttpStatus.CONFLICT).toBe(409);
  });

  it("INTERNAL_SERVER_ERROR is 500", () => {
    expect(HttpStatus.INTERNAL_SERVER_ERROR).toBe(500);
  });

  it("SERVICE_UNAVAILABLE is 503", () => {
    expect(HttpStatus.SERVICE_UNAVAILABLE).toBe(503);
  });

  it("has exactly 10 status codes", () => {
    expect(Object.keys(HttpStatus)).toHaveLength(10);
  });

  it("all values are numbers", () => {
    Object.values(HttpStatus).forEach((value) => {
      expect(typeof value).toBe("number");
    });
  });
});

describe("type exports", () => {
  it("ApiSuccessResponse can be constructed with success: true", () => {
    const response: ApiSuccessResponse<string> = {
      success: true,
      data: "result",
      message: "All good",
    };
    expect(response.success).toBe(true);
    expect(response.data).toBe("result");
    expect(response.message).toBe("All good");
  });

  it("ApiSuccessResponse works without optional fields", () => {
    const response: ApiSuccessResponse = { success: true };
    expect(response.success).toBe(true);
  });

  it("ApiErrorResponse can be constructed with success: false", () => {
    const response: ApiErrorResponse = {
      success: false,
      error: "Something went wrong",
      message: "Please try again",
    };
    expect(response.success).toBe(false);
    expect(response.error).toBe("Something went wrong");
  });

  it("PaginatedApiResponse includes count and pagination fields", () => {
    const response: PaginatedApiResponse<number> = {
      success: true,
      data: [1, 2, 3],
      count: 3,
      page: 1,
      pageSize: 10,
      total: 100,
    };
    expect(response.count).toBe(3);
    expect(response.data).toEqual([1, 2, 3]);
    expect(response.total).toBe(100);
  });

  it("FormSubmissionResponse has required success and message fields", () => {
    const response: FormSubmissionResponse = {
      success: true,
      message: "Form submitted successfully",
      data: {
        id: "abc123",
        emailSent: true,
        dbStored: true,
      },
    };
    expect(response.success).toBe(true);
    expect(response.message).toBe("Form submitted successfully");
    expect(response.data?.id).toBe("abc123");
    expect(response.data?.emailSent).toBe(true);
  });

  it("HttpStatusCode is a valid status value", () => {
    const code: HttpStatusCode = 200;
    expect(Object.values(HttpStatus)).toContain(code);
  });
});
