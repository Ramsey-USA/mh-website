/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

const mockQueryOne = jest.fn();
const mockExecute = jest.fn();
const mockGetD1Database = jest.fn();

jest.mock("@/lib/db/env", () => ({
  getD1Database: () => mockGetD1Database(),
}));

jest.mock("@/lib/db/client", () => ({
  createDbClient: () => ({
    queryOne: mockQueryOne,
    execute: mockExecute,
  }),
}));

jest.mock("@/lib/security/rate-limiter", () => ({
  rateLimit: () => (handler: unknown) => handler,
  rateLimitPresets: { public: {} },
}));

jest.mock("@/middleware/security", () => ({
  withSecurity: (handler: unknown) => handler,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn() },
}));

let GET: typeof import("@/app/api/events/cast-recover/route").GET;
let POST: typeof import("@/app/api/events/cast-recover/route").POST;

beforeAll(async () => {
  ({ GET, POST } = await import("@/app/api/events/cast-recover/route"));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockGetD1Database.mockReturnValue({});
  mockExecute.mockResolvedValue({ success: true, rowsAffected: 1 });
});

const makeRequest = (body: unknown) =>
  new NextRequest("http://localhost/api/events/cast-recover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const veteranRegistration = {
  registrationType: "veteran",
  fullName: "Taylor Morgan",
  branchOfService: "Navy",
  phone: "509-555-0100",
  email: "taylor@example.com",
  emergencyContact: "Jordan Morgan, 509-555-0101",
  tshirtSize: "L",
};

describe("Cast & Recover registration API", () => {
  it("returns current veteran availability", async () => {
    mockQueryOne.mockResolvedValue({ count: 17 });

    const response = await GET(
      new NextRequest("http://localhost/api/events/cast-recover", {
        method: "GET",
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      confirmedVeterans: 17,
      capacity: 50,
    });
  });

  it("rejects incomplete veteran registrations", async () => {
    const response = await POST(
      makeRequest({ ...veteranRegistration, branchOfService: "" }),
    );

    expect(response.status).toBe(400);
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it("rejects captain capacities outside the 3 to 6 range", async () => {
    const response = await POST(
      makeRequest({
        registrationType: "captain",
        fullName: "Alex River",
        phone: "509-555-0102",
        email: "alex@example.com",
        vesselTypeLength: "20 ft sled",
        passengerCapacity: 2,
      }),
    );

    expect(response.status).toBe(400);
    expect(mockExecute).not.toHaveBeenCalled();
  });

  it("returns confirmed status assigned by the database statement", async () => {
    mockQueryOne.mockResolvedValue({ roster_status: "confirmed" });

    const response = await POST(makeRequest(veteranRegistration));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      success: true,
      rosterStatus: "confirmed",
      registeredName: "Taylor Morgan",
    });
    expect(mockExecute).toHaveBeenCalledTimes(1);
  });

  it("returns alternate status after primary capacity is reached", async () => {
    mockQueryOne.mockResolvedValue({ roster_status: "alternate" });

    const response = await POST(
      makeRequest({ ...veteranRegistration, email: "alternate@example.com" }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      rosterStatus: "alternate",
    });
  });
});
