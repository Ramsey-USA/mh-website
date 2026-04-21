describe("analytics beacon", () => {
  const originalNavigator = global.navigator;
  const originalFetch = global.fetch;

  function loadBeaconModule() {
    let exports: typeof import("../beacon");
    jest.isolateModules(() => {
      exports = require("../beacon") as typeof import("../beacon");
    });
    return exports!;
  }

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetModules();
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as jest.Mock;

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {
        sendBeacon: jest.fn().mockReturnValue(true),
      },
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: originalNavigator,
    });
    global.fetch = originalFetch;
  });

  it("queues events and flushes them through sendBeacon after the debounce interval", () => {
    const { beaconPageview, beaconClick, beaconConversion } =
      loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    beaconPageview("/contact");
    beaconClick("hero-cta", { page: "/contact" });
    beaconConversion("contact");

    expect(sendBeaconMock).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10_000);

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);
    expect(sendBeaconMock.mock.calls[0][0]).toBe("/api/analytics/collect");
    expect(sendBeaconMock.mock.calls[0][1]).toBeInstanceOf(Blob);
  });

  it("falls back to fetch when sendBeacon is unavailable or returns false", () => {
    const { beaconSessionEnd, beaconFlush } = loadBeaconModule();
    const sendBeaconMock = jest.fn().mockReturnValue(false);
    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: { sendBeacon: sendBeaconMock },
    });

    beaconSessionEnd(45);
    beaconFlush();

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/collect",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }),
    );
  });

  it("flushes immediately when the queue reaches capacity and binds lifecycle listeners once", () => {
    const { beaconClick, beaconFlush, beaconPageview } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;
    const addVisibilitySpy = jest.spyOn(document, "addEventListener");
    const addWindowSpy = jest.spyOn(window, "addEventListener");

    for (let index = 0; index < 25; index += 1) {
      beaconClick(`element-${index}`);
    }

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);
    expect(addVisibilitySpy).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function),
    );
    expect(addWindowSpy).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );

    beaconPageview("/again");
    beaconFlush();

    expect(addVisibilitySpy).toHaveBeenCalledTimes(1);
    expect(addWindowSpy).toHaveBeenCalledTimes(1);
  });

  it("flushes via fetch when sendBeacon is not on navigator", () => {
    const { beaconPageview, beaconFlush } = loadBeaconModule();

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {},
    });

    beaconPageview("/no-beacon");
    beaconFlush();

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/collect",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }),
    );
  });

  it("silently handles a fetch rejection (fetch.catch path)", () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network"));

    const { beaconPageview, beaconFlush } = loadBeaconModule();

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {},
    });

    beaconPageview("/catch-test");

    // Must not throw — the .catch inside fetchFallback swallows the rejection
    expect(() => beaconFlush()).not.toThrow();

    // fetch was invoked — the rejection is handled silently
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/analytics/collect",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("silently handles a synchronous fetch throw (try/catch path)", () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Sync network error");
    });

    const { beaconPageview, beaconFlush } = loadBeaconModule();

    Object.defineProperty(global, "navigator", {
      configurable: true,
      value: {},
    });

    beaconPageview("/throw-test");
    expect(() => beaconFlush()).not.toThrow();
  });

  it("re-schedules a flush when the queue still has items after max capacity", () => {
    const { beaconClick } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    // Push MAX_QUEUE_SIZE + extra events to trigger flush + leftover
    for (let i = 0; i < 30; i++) {
      beaconClick(`el-${i}`);
    }

    // First flush (at capacity) fires 1 sendBeacon call
    expect(sendBeaconMock.mock.calls.length).toBeGreaterThanOrEqual(1);

    // Advance time to trigger the re-scheduled flush for the remaining 5
    jest.advanceTimersByTime(10_000);
    expect(sendBeaconMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("flushes on visibilitychange when document becomes hidden", () => {
    const { beaconPageview } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    beaconPageview("/vis-change");

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "hidden",
    });

    document.dispatchEvent(new Event("visibilitychange"));

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });
  });

  it("does not flush on visibilitychange when document is visible", () => {
    const { beaconPageview } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    beaconPageview("/vis-visible");

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      get: () => "visible",
    });

    document.dispatchEvent(new Event("visibilitychange"));

    expect(sendBeaconMock).not.toHaveBeenCalled();
  });

  it("flushes on beforeunload", () => {
    const { beaconPageview } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    beaconPageview("/before-unload");

    window.dispatchEvent(new Event("beforeunload"));

    expect(sendBeaconMock).toHaveBeenCalledTimes(1);
  });

  it("beaconFlush is a no-op during a Lighthouse run", () => {
    const { beaconFlush } = loadBeaconModule();
    const sendBeaconMock = navigator.sendBeacon as jest.Mock;

    Object.defineProperty(window, "__LIGHTHOUSE__", {
      configurable: true,
      writable: true,
      value: true,
    });

    beaconFlush();

    expect(sendBeaconMock).not.toHaveBeenCalled();

    Object.defineProperty(window, "__LIGHTHOUSE__", {
      configurable: true,
      writable: true,
      value: undefined,
    });
  });
});
