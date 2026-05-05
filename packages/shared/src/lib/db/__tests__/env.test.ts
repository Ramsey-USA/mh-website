/**
 * @jest-environment node
 *
 * db/env.ts — unit tests
 * Covers getD1Database, getKVNamespace, isCloudflareWorkers
 * in both the error-catch (non-CF) path and the success (CF env) path.
 *
 * NOTE: R2 bucket access is handled via @/lib/cloudflare/r2.ts — see r2.test.ts
 */

const mockGetCloudflareContext = jest.fn();

jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: (...args: unknown[]) =>
    mockGetCloudflareContext(...args),
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  },
}));

describe("db/env — non-Cloudflare environment (getCloudflareContext throws)", () => {
  let getD1Database: () => unknown;
  let getKVNamespace: (b: string) => unknown;
  let isCloudflareWorkers: () => boolean;

  beforeAll(async () => {
    mockGetCloudflareContext.mockImplementation(() => {
      throw new Error("Not in a Cloudflare Workers environment");
    });

    jest.isolateModules(() => {
      ({ getD1Database, getKVNamespace, isCloudflareWorkers } =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/lib/db/env") as typeof import("@/lib/db/env"));
    });
  });

  it("getD1Database returns null", () => {
    expect(getD1Database()).toBeNull();
  });

  it("getKVNamespace returns null", () => {
    expect(getKVNamespace("CACHE")).toBeNull();
  });

  it("isCloudflareWorkers returns false", () => {
    expect(isCloudflareWorkers()).toBe(false);
  });
});

describe("db/env — Cloudflare environment (getCloudflareContext succeeds)", () => {
  const mockDB = { prepare: jest.fn() };
  const mockKV = { get: jest.fn() };

  let getD1Database: () => unknown;
  let getKVNamespace: (b: string) => unknown;
  let isCloudflareWorkers: () => boolean;

  beforeAll(async () => {
    mockGetCloudflareContext.mockReturnValue({
      env: { DB: mockDB, CACHE: mockKV },
    });

    jest.isolateModules(() => {
      ({ getD1Database, getKVNamespace, isCloudflareWorkers } =
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require("@/lib/db/env") as typeof import("@/lib/db/env"));
    });
  });

  it("getD1Database returns the DB binding", () => {
    expect(getD1Database()).toBe(mockDB);
  });

  it("getKVNamespace returns the named KV binding", () => {
    expect(getKVNamespace("CACHE")).toBe(mockKV);
  });

  it("isCloudflareWorkers returns true", () => {
    expect(isCloudflareWorkers()).toBe(true);
  });

  it("getKVNamespace returns null for an unbound key", () => {
    expect(getKVNamespace("NONEXISTENT")).toBeNull();
  });
});
