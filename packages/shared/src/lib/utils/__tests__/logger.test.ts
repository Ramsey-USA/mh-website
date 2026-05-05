/**
 * Tests for lib/utils/logger.ts
 *
 * Covers the Logger class and all 8 methods:
 * log, info, warn, error, debug, metric, configure + constructor
 * Tests both development and production mode behaviour.
 */

/* eslint-disable no-console */

import { Logger, logger } from "../logger";

describe("Logger — development mode", () => {
  let devLogger: InstanceType<typeof Logger>;

  beforeEach(() => {
    devLogger = new Logger({ isDevelopment: true });
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("log() writes to console.log in development", () => {
    devLogger.log("test message", { extra: 1 });
    expect(console.log).toHaveBeenCalledWith("[LOG] test message", {
      extra: 1,
    });
  });

  it("info() writes to console.info in development", () => {
    devLogger.info("info msg");
    expect(console.info).toHaveBeenCalledWith("[INFO] info msg");
  });

  it("warn() writes to console.warn in development", () => {
    devLogger.warn("warning", "details");
    expect(console.warn).toHaveBeenCalledWith("[WARN] warning", "details");
  });

  it("error() writes to console.error in development", () => {
    const err = new Error("boom");
    devLogger.error("something broke", err);
    expect(console.error).toHaveBeenCalledWith("[ERROR] something broke", err);
  });

  it("debug() writes to console.debug in development", () => {
    devLogger.debug("debug info");
    expect(console.debug).toHaveBeenCalledWith("[DEBUG] debug info");
  });

  it("metric() writes to console.log with unit suffix", () => {
    devLogger.metric("response-time", 120, "ms");
    expect(console.log).toHaveBeenCalledWith("[METRIC] response-time: 120ms");
  });

  it("metric() works without unit", () => {
    devLogger.metric("cache-hit-rate", 0.95);
    expect(console.log).toHaveBeenCalledWith("[METRIC] cache-hit-rate: 0.95");
  });
});

describe("Logger — production mode", () => {
  let prodLogger: InstanceType<typeof Logger>;

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "debug").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("log() is silent in production", () => {
    prodLogger = new Logger({ isDevelopment: false });
    prodLogger.log("silent");
    expect(console.log).not.toHaveBeenCalled();
  });

  it("info() is silent in production", () => {
    prodLogger = new Logger({ isDevelopment: false });
    prodLogger.info("silent info");
    expect(console.log).not.toHaveBeenCalled();
  });

  it("warn() calls external logger in production when provided", () => {
    const externalLogger = jest.fn();
    prodLogger = new Logger({ isDevelopment: false, externalLogger });
    prodLogger.warn("prod warning");
    expect(externalLogger).toHaveBeenCalledWith(
      "warn",
      "prod warning",
      expect.any(Array),
    );
  });

  it("warn() is silent in production when no external logger", () => {
    prodLogger = new Logger({ isDevelopment: false });
    prodLogger.warn("unheard");
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("error() calls external logger in production when provided", () => {
    const externalLogger = jest.fn();
    prodLogger = new Logger({
      isDevelopment: false,
      enableProductionErrors: true,
      externalLogger,
    });
    prodLogger.error("prod error", new Error("e"));
    expect(externalLogger).toHaveBeenCalledWith(
      "error",
      "prod error",
      expect.any(Object),
    );
  });

  it("error() falls back to console.error in production when no external logger", () => {
    prodLogger = new Logger({
      isDevelopment: false,
      enableProductionErrors: true,
    });
    prodLogger.error("console fallback");
    expect(console.error).toHaveBeenCalledWith(
      "[ERROR] console fallback",
      undefined,
    );
  });

  it("error() is silent when enableProductionErrors is false", () => {
    prodLogger = new Logger({
      isDevelopment: false,
      enableProductionErrors: false,
    });
    prodLogger.error("suppressed");
    expect(console.error).not.toHaveBeenCalled();
  });

  it("debug() is silent in production", () => {
    prodLogger = new Logger({ isDevelopment: false });
    prodLogger.debug("debug suppressed");
    expect(console.debug).not.toHaveBeenCalled();
  });

  it("metric() calls external logger in production", () => {
    const externalLogger = jest.fn();
    prodLogger = new Logger({ isDevelopment: false, externalLogger });
    prodLogger.metric("api-calls", 500);
    expect(externalLogger).toHaveBeenCalledWith(
      "info",
      "metric:api-calls",
      expect.any(Object),
    );
  });

  it("metric() is silent in production without external logger", () => {
    prodLogger = new Logger({ isDevelopment: false });
    prodLogger.metric("req", 1);
    expect(console.log).not.toHaveBeenCalled();
  });
});

describe("Logger.configure()", () => {
  it("updates logger config at runtime", () => {
    const devLogger = new Logger({ isDevelopment: true });
    jest.spyOn(console, "log").mockImplementation(() => {});
    devLogger.log("before configure");
    expect(console.log).toHaveBeenCalledTimes(1);

    devLogger.configure({ isDevelopment: false });
    devLogger.log("after configure — should be silent");
    expect(console.log).toHaveBeenCalledTimes(1); // still 1, no new call
    jest.restoreAllMocks();
  });
});

describe("singleton logger export", () => {
  it("is an instance of Logger", () => {
    expect(logger).toBeInstanceOf(Logger);
  });
});
