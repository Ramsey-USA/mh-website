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
});
