/**
 * Tests for analytics/geolocation.ts
 *
 * Covers getGeographicLocation() with all fallback paths:
 * cloudflare success, cloudflare failure, ipapi success, ipapi error,
 * ipapi failure, timezone fallback, and cache behaviour.
 *
 * Module-level cache is reset between tests via jest.resetModules().
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    log: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    warn: jest.fn(),
  },
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Re-require the module to get a fresh cache state after jest.resetModules() */
function loadModule() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("../geolocation") as typeof import("../geolocation");
}

const ORIGINAL_FETCH = global.fetch;

beforeEach(() => {
  jest.resetModules();
  global.fetch = ORIGINAL_FETCH;
});

afterAll(() => {
  global.fetch = ORIGINAL_FETCH;
});

// ---------------------------------------------------------------------------
// Cloudflare path
// ---------------------------------------------------------------------------

describe("getGeographicLocation() — cloudflare path", () => {
  it("returns cloudflare location when /api/analytics/geolocation responds with country", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        country: "United States",
        countryCode: "US",
        city: "Pasco",
        state: "WA",
      }),
    } as unknown as Response);

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();

    expect(loc.source).toBe("cloudflare");
    expect(loc.country).toBe("United States");
    expect(loc.city).toBe("Pasco");
  });

  it("falls through when cloudflare response has no country field", async () => {
    global.fetch = jest
      .fn()
      // Cloudflare returns {}, no country
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      } as unknown as Response)
      // IPAPI also fails so we reach timezone
      .mockRejectedValueOnce(new Error("network error"));

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();

    // Should reach timezone fallback
    expect(loc.source).toBe("timezone");
  });

  it("falls through when cloudflare endpoint returns non-ok status", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as unknown as Response)
      .mockRejectedValueOnce(new Error("ipapi unavailable"));

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.source).toBe("timezone");
  });

  it("falls through when cloudflare fetch throws", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("network offline"))
      .mockRejectedValueOnce(new Error("ipapi also offline"));

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.source).toBe("timezone");
  });
});

// ---------------------------------------------------------------------------
// IPAPI path
// ---------------------------------------------------------------------------

describe("getGeographicLocation() — ipapi path", () => {
  it("returns ipapi location when cloudflare fails and ipapi succeeds", async () => {
    global.fetch = jest
      .fn()
      // Cloudflare fails
      .mockRejectedValueOnce(new Error("cloudflare unavailable"))
      // IPAPI succeeds
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          country_name: "United States",
          country_code: "US",
          region: "Washington",
          city: "Pasco",
          postal: "99301",
          latitude: 46.24,
          longitude: -119.1,
          continent_code: "NA",
          timezone: "America/Los_Angeles",
        }),
      } as unknown as Response);

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();

    expect(loc.source).toBe("ipapi");
    expect(loc.country).toBe("United States");
    expect(loc.city).toBe("Pasco");
    expect(loc.latitude).toBeCloseTo(46.24);
  });

  it("falls through to timezone when ipapi response body contains an error", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("cf unavailable"))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ error: true, reason: "Rate limit exceeded" }),
      } as unknown as Response);

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.source).toBe("timezone");
  });

  it("falls through to timezone when ipapi response is not ok", async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("cf unavailable"))
      .mockResolvedValueOnce({ ok: false } as unknown as Response);

    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.source).toBe("timezone");
  });
});

// ---------------------------------------------------------------------------
// Timezone fallback
// ---------------------------------------------------------------------------

describe("getGeographicLocation() — timezone fallback", () => {
  function mockAllFetchFail() {
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("cf fail"))
      .mockRejectedValueOnce(new Error("ipapi fail"));
  }

  const TIMEZONE_CASES: [string, string, string | undefined][] = [
    ["America/Los_Angeles", "West Coast", "United States"],
    ["America/New_York", "East Coast", "United States"],
    ["America/Chicago", "Central", "United States"],
    ["America/Denver", "Mountain", "United States"],
    ["America/Phoenix", "Arizona", "United States"],
    ["America/Boise", "Idaho", "United States"],
  ];

  test.each(TIMEZONE_CASES)(
    "maps timezone %s to state=%s country=%s",
    async (timezone, expectedState, expectedCountry) => {
      mockAllFetchFail();
      const origDateTimeFormat = Intl.DateTimeFormat;
      jest.spyOn(Intl, "DateTimeFormat").mockImplementation(
        () =>
          ({
            resolvedOptions: () => ({ timeZone: timezone }),
            format: origDateTimeFormat().format,
            formatRange: jest.fn(),
            formatRangeToParts: jest.fn(),
            formatToParts: jest.fn(),
          }) as unknown as Intl.DateTimeFormat,
      );

      const { getGeographicLocation } = loadModule();
      const loc = await getGeographicLocation();
      expect(loc.source).toBe("timezone");
      expect(loc.state).toBe(expectedState);
      if (expectedCountry) expect(loc.country).toBe(expectedCountry);
      jest.restoreAllMocks();
    },
  );

  it("maps Europe/ timezone to Europe region", async () => {
    mockAllFetchFail();
    jest.spyOn(Intl, "DateTimeFormat").mockImplementation(
      () =>
        ({
          resolvedOptions: () => ({ timeZone: "Europe/London" }),
        }) as unknown as Intl.DateTimeFormat,
    );
    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.region).toBe("Europe");
    jest.restoreAllMocks();
  });

  it("maps Asia/ timezone to Asia region", async () => {
    mockAllFetchFail();
    jest.spyOn(Intl, "DateTimeFormat").mockImplementation(
      () =>
        ({
          resolvedOptions: () => ({ timeZone: "Asia/Tokyo" }),
        }) as unknown as Intl.DateTimeFormat,
    );
    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.region).toBe("Asia");
    jest.restoreAllMocks();
  });

  it("maps Pacific/ timezone to Pacific region", async () => {
    mockAllFetchFail();
    jest.spyOn(Intl, "DateTimeFormat").mockImplementation(
      () =>
        ({
          resolvedOptions: () => ({ timeZone: "Pacific/Auckland" }),
        }) as unknown as Intl.DateTimeFormat,
    );
    const { getGeographicLocation } = loadModule();
    const loc = await getGeographicLocation();
    expect(loc.region).toBe("Pacific");
    jest.restoreAllMocks();
  });
});

// ---------------------------------------------------------------------------
// Cache behaviour
// ---------------------------------------------------------------------------

describe("getGeographicLocation() — cache", () => {
  it("returns cached result on second call without re-fetching", async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ country: "US", city: "Richland" }),
    } as unknown as Response);
    global.fetch = fetchMock;

    const { getGeographicLocation } = loadModule();

    const first = await getGeographicLocation();
    const second = await getGeographicLocation();

    // fetch was only called once (cloudflare endpoint only)
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(second).toBe(first); // same object reference from cache
  });

  it("re-fetches when cache is stale (> 1 hour old)", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ country: "US", city: "Kennewick" }),
    } as unknown as Response);
    global.fetch = fetchMock;

    const { getGeographicLocation } = loadModule();

    // First call populates cache
    await getGeographicLocation();

    // Advance system time by > 1 hour
    const origDateNow = Date.now;
    Date.now = jest.fn().mockReturnValue(origDateNow() + 2 * 60 * 60 * 1000);

    await getGeographicLocation();

    // fetch should have been called twice
    expect(fetchMock).toHaveBeenCalledTimes(2);
    Date.now = origDateNow;
  });
});
