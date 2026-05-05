/**
 * @jest-environment node
 */

import { type NextRequest } from "next/server";
import {
  databaseUnavailableResponse,
  withDatabase,
  withDatabaseAuth,
} from "../middleware";

const mockGetD1Database = jest.fn();
const mockCreateDbClient = jest.fn();

jest.mock("@/lib/db/env", () => ({
  getD1Database: () => mockGetD1Database(),
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: (...args: unknown[]) => mockCreateDbClient(...args),
}));

describe("db middleware helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns a standardized 503 response when the database is unavailable", async () => {
    const response = databaseUnavailableResponse();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Database not available",
    });
  });

  it("withDatabase short-circuits when DB binding is missing", async () => {
    mockGetD1Database.mockReturnValue(null);
    const handler = jest.fn();

    const wrapped = withDatabase(handler);
    const response = await wrapped({} as NextRequest, { params: { id: "1" } });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Database not available",
    });
    expect(mockCreateDbClient).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
  });

  it("withDatabase injects a db client and forwards route args", async () => {
    const dbBinding = { name: "D1" };
    const dbClient = { query: jest.fn() };
    mockGetD1Database.mockReturnValue(dbBinding);
    mockCreateDbClient.mockReturnValue(dbClient);

    const handler = jest
      .fn()
      .mockResolvedValue(new Response("ok", { status: 201 }));
    const wrapped = withDatabase(handler);

    const request = { method: "GET" } as NextRequest;
    const routeParams = { params: { id: "42" } };
    const response = await wrapped(request, routeParams);

    expect(mockCreateDbClient).toHaveBeenCalledWith({ DB: dbBinding });
    expect(handler).toHaveBeenCalledWith(request, dbClient, routeParams);
    expect(response.status).toBe(201);
    await expect(response.text()).resolves.toBe("ok");
  });

  it("withDatabaseAuth short-circuits when DB binding is missing", async () => {
    mockGetD1Database.mockReturnValue(null);
    const handler = jest.fn();

    const wrapped = withDatabaseAuth(handler);
    const response = await wrapped({} as NextRequest, { role: "admin" });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Database not available",
    });
    expect(mockCreateDbClient).not.toHaveBeenCalled();
    expect(handler).not.toHaveBeenCalled();
  });

  it("withDatabaseAuth injects db after user and forwards additional args", async () => {
    const dbBinding = { name: "D1" };
    const dbClient = { query: jest.fn() };
    mockGetD1Database.mockReturnValue(dbBinding);
    mockCreateDbClient.mockReturnValue(dbClient);

    const handler = jest
      .fn()
      .mockResolvedValue(new Response("created", { status: 202 }));
    const wrapped = withDatabaseAuth(handler);

    const request = { method: "POST" } as NextRequest;
    const user = { id: "u-1", role: "admin" };
    const params = { params: { slug: "a" } };
    const response = await wrapped(request, user, params);

    expect(mockCreateDbClient).toHaveBeenCalledWith({ DB: dbBinding });
    expect(handler).toHaveBeenCalledWith(request, user, dbClient, params);
    expect(response.status).toBe(202);
    await expect(response.text()).resolves.toBe("created");
  });
});
