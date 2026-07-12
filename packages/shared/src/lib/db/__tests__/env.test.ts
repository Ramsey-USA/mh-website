/**
 * @jest-environment node
 *
 * db/env.ts — unit tests
 * Covers getD1Database, getKVNamespace, isCloudflareWorkers
 * in both the error-catch (non-CF) path and the success (CF env) path.
 *
 * NOTE: R2 bucket access is handled via @/lib/cloudflare/r2.ts — see r2.test.ts
 */

jest.mock("@opennextjs/cloudflare");

const { getCloudflareContext: mockGetCloudflareContext } = jest.requireMock(
  "@opennextjs/cloudflare",
) as {
  getCloudflareContext: jest.Mock;
};

jest.mock("@/lib/utils/logger");

type DbEnvModule = {
  getD1Database: () => unknown;
  getKVNamespace: (bindingName: string) => unknown;
  isCloudflareWorkers: () => boolean;
};

function setCloudflareContextUnavailable(
  message = "Not in a Cloudflare Workers environment",
) {
  mockGetCloudflareContext.mockReset();
  mockGetCloudflareContext.mockImplementation(() => {
    throw new Error(message);
  });
}

function setCloudflareContextEnv(env: Record<string, unknown>) {
  mockGetCloudflareContext.mockReset();
  mockGetCloudflareContext.mockReturnValue({ env });
}

function loadDbEnvModule(): DbEnvModule {
  let loaded: DbEnvModule | undefined;

  jest.isolateModules(() => {
    loaded =
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("@/lib/db/env") as DbEnvModule;
  });

  if (!loaded) {
    throw new Error("Failed to load db/env test module");
  }

  return loaded;
}

describe("db/env — non-Cloudflare environment (getCloudflareContext throws)", () => {
  let getD1Database: () => unknown;
  let getKVNamespace: (b: string) => unknown;
  let isCloudflareWorkers: () => boolean;

  beforeAll(async () => {
    setCloudflareContextUnavailable();

    ({ getD1Database, getKVNamespace, isCloudflareWorkers } =
      loadDbEnvModule());
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
    setCloudflareContextEnv({ DB: mockDB, CACHE: mockKV });

    ({ getD1Database, getKVNamespace, isCloudflareWorkers } =
      loadDbEnvModule());
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
