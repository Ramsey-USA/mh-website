/** @jest-environment node */

const mockSend = jest.fn();
const mockGetCloudflareContext = jest.fn();

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: () => mockGetCloudflareContext(),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
}));

describe("private SSSP factory queue", () => {
  const originalEnvironment = process.env;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = {
      ...originalEnvironment,
      SSSP_FACTORY_ACTIVATED: "true",
      SSSP_CALLBACK_SECRET: "callback-test-secret",
      SSSP_CALLBACK_BASE_URL: "https://www.mhc-gc.com",
    };
    mockSend.mockResolvedValue({});
    mockGetCloudflareContext.mockReturnValue({
      env: {
        SSSP_FACTORY_WORK_ORDERS: {
          send: (...args: unknown[]) => mockSend(...args),
        },
      },
    });
  });

  afterAll(() => {
    process.env = originalEnvironment;
  });

  it("fails closed when activation is disabled", async () => {
    process.env["SSSP_FACTORY_ACTIVATED"] = "false";
    const { isSsspFactoryConfigured } = await import(
      "@/lib/safety/sssp-factory",
    );

    expect(isSsspFactoryConfigured()).toBe(false);
  });

  it("fails closed when the queue binding is missing", async () => {
    mockGetCloudflareContext.mockReturnValue({ env: {} });
    const { isSsspFactoryConfigured } = await import(
      "@/lib/safety/sssp-factory",
    );

    expect(isSsspFactoryConfigured()).toBe(false);
  });

  it("queues a JSON work order with an idempotency key", async () => {
    const { dispatchSsspFactoryWorkOrder, isSsspFactoryConfigured } =
      await import("@/lib/safety/sssp-factory");

    expect(isSsspFactoryConfigured()).toBe(true);

    const result = await dispatchSsspFactoryWorkOrder({
      ssspId: "sssp-1",
      jobId: "job-1",
      jobNumber: "2026-100",
      jobName: "School Expansion",
      location: "Kennewick, WA",
      pmName: "Pat PM",
      superName: "Sam Super",
      sourceFiles: [
        {
          id: "file-1",
          fileKey: "sssp/job-1/plan-a.pdf",
          originalFilename: "plan-a.pdf",
          contentType: "application/pdf",
        },
      ],
      triggeredBy: "admin-1",
    });

    expect(result).toEqual({ success: true });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        schemaVersion: 1,
        type: "sssp-generate",
        idempotencyKey: "sssp-1",
        workOrder: expect.objectContaining({
          callbackUrl:
            "https://www.mhc-gc.com/api/safety/sssp/job-1/result",
        }),
      }),
      { contentType: "json" },
    );
  });

  it("reports queue write failures", async () => {
    mockSend.mockRejectedValueOnce(new Error("queue unavailable"));
    const { dispatchSsspFactoryWorkOrder } = await import(
      "@/lib/safety/sssp-factory",
    );

    const result = await dispatchSsspFactoryWorkOrder({
      ssspId: "sssp-2",
      jobId: "job-2",
      jobNumber: "2026-200",
      jobName: "Clinic",
      location: null,
      pmName: null,
      superName: null,
      sourceFiles: [],
      triggeredBy: "admin-1",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBe("queue unavailable");
  });
});
