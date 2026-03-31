import {
  Logger,
  logger,
  log,
  info,
  warn,
  error,
  debug,
  metric,
} from "@/lib/utils/logger";
import type { LogLevel, LoggerConfig } from "@/lib/utils/logger";

describe("Logger class", () => {
  let consoleSpy: {
    log: jest.SpyInstance;
    info: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
    debug: jest.SpyInstance;
  };

  beforeEach(() => {
    consoleSpy = {
      log: jest.spyOn(console, "log").mockImplementation(() => {}),
      info: jest.spyOn(console, "info").mockImplementation(() => {}),
      warn: jest.spyOn(console, "warn").mockImplementation(() => {}),
      error: jest.spyOn(console, "error").mockImplementation(() => {}),
      debug: jest.spyOn(console, "debug").mockImplementation(() => {}),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("in development mode", () => {
    let devLogger: Logger;

    beforeEach(() => {
      devLogger = new Logger({ isDevelopment: true });
    });

    it("log() outputs to console.log with [LOG] prefix", () => {
      devLogger.log("test message");
      expect(consoleSpy.log).toHaveBeenCalledWith("[LOG] test message");
    });

    it("log() passes additional args", () => {
      devLogger.log("message", { key: "value" });
      expect(consoleSpy.log).toHaveBeenCalledWith("[LOG] message", {
        key: "value",
      });
    });

    it("info() outputs to console.info with [INFO] prefix", () => {
      devLogger.info("info message");
      expect(consoleSpy.info).toHaveBeenCalledWith("[INFO] info message");
    });

    it("warn() outputs to console.warn with [WARN] prefix", () => {
      devLogger.warn("warn message");
      expect(consoleSpy.warn).toHaveBeenCalledWith("[WARN] warn message");
    });

    it("error() outputs to console.error with [ERROR] prefix", () => {
      devLogger.error("error message", new Error("oops"));
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "[ERROR] error message",
        new Error("oops"),
      );
    });

    it("debug() outputs to console.debug with [DEBUG] prefix", () => {
      devLogger.debug("debug message");
      expect(consoleSpy.debug).toHaveBeenCalledWith("[DEBUG] debug message");
    });

    it("metric() outputs to console.log with [METRIC] prefix", () => {
      devLogger.metric("pageLoad", 250, "ms");
      expect(consoleSpy.log).toHaveBeenCalledWith("[METRIC] pageLoad: 250ms");
    });

    it("metric() omits unit when not provided", () => {
      devLogger.metric("count", 42);
      expect(consoleSpy.log).toHaveBeenCalledWith("[METRIC] count: 42");
    });
  });

  describe("in production mode", () => {
    let prodLogger: Logger;

    beforeEach(() => {
      prodLogger = new Logger({
        isDevelopment: false,
        enableProductionErrors: true,
      });
    });

    it("log() does NOT output to console in production", () => {
      prodLogger.log("test message");
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it("info() does NOT output to console in production", () => {
      prodLogger.info("info message");
      expect(consoleSpy.info).not.toHaveBeenCalled();
    });

    it("warn() does NOT output to console in production without externalLogger", () => {
      prodLogger.warn("warn message");
      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it("debug() does NOT output to console in production", () => {
      prodLogger.debug("debug message");
      expect(consoleSpy.debug).not.toHaveBeenCalled();
    });

    it("metric() does NOT output to console in production without externalLogger", () => {
      prodLogger.metric("pageLoad", 250, "ms");
      expect(consoleSpy.log).not.toHaveBeenCalled();
    });

    it("error() falls back to console.error in production when enableProductionErrors is true and no externalLogger", () => {
      prodLogger.error("critical error", new Error("fail"));
      expect(consoleSpy.error).toHaveBeenCalledWith(
        "[ERROR] critical error",
        new Error("fail"),
      );
    });

    it("error() does NOT output when enableProductionErrors is false", () => {
      const silentLogger = new Logger({
        isDevelopment: false,
        enableProductionErrors: false,
      });
      silentLogger.error("suppressed error");
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });
  });

  describe("with externalLogger config", () => {
    let externalLogger: jest.Mock;
    let extLogger: Logger;

    beforeEach(() => {
      externalLogger = jest.fn();
      extLogger = new Logger({
        isDevelopment: false,
        enableProductionErrors: true,
        externalLogger,
      });
    });

    it("warn() calls externalLogger in production", () => {
      extLogger.warn("warn message", "extra");
      expect(externalLogger).toHaveBeenCalledWith("warn", "warn message", [
        "extra",
      ]);
    });

    it("error() calls externalLogger in production", () => {
      const err = new Error("fail");
      extLogger.error("error message", err);
      expect(externalLogger).toHaveBeenCalledWith("error", "error message", {
        error: err,
        args: [],
      });
    });

    it("metric() calls externalLogger in production", () => {
      extLogger.metric("pageLoad", 300, "ms");
      expect(externalLogger).toHaveBeenCalledWith("info", "metric:pageLoad", {
        value: 300,
        unit: "ms",
      });
    });

    it("does NOT call externalLogger in development", () => {
      const devExtLogger = new Logger({
        isDevelopment: true,
        externalLogger,
      });
      devExtLogger.warn("dev warning");
      expect(externalLogger).not.toHaveBeenCalled();
    });
  });

  describe("configure()", () => {
    it("updates isDevelopment config", () => {
      const testLogger = new Logger({ isDevelopment: false });
      testLogger.configure({ isDevelopment: true });
      testLogger.log("now logging");
      expect(consoleSpy.log).toHaveBeenCalledWith("[LOG] now logging");
    });

    it("updates enableProductionErrors config", () => {
      const testLogger = new Logger({
        isDevelopment: false,
        enableProductionErrors: true,
      });
      testLogger.configure({ enableProductionErrors: false });
      testLogger.error("suppressed");
      expect(consoleSpy.error).not.toHaveBeenCalled();
    });

    it("merges config rather than replacing it", () => {
      const testLogger = new Logger({
        isDevelopment: true,
        enableProductionErrors: false,
      });
      testLogger.configure({ enableProductionErrors: true });
      // isDevelopment should still be true
      testLogger.log("merged config");
      expect(consoleSpy.log).toHaveBeenCalledWith("[LOG] merged config");
    });
  });

  describe("constructor defaults", () => {
    it("defaults enableProductionErrors to true", () => {
      const defaultLogger = new Logger({ isDevelopment: false });
      defaultLogger.error("production error");
      // falls back to console.error since no externalLogger and enableProductionErrors defaults to true
      expect(consoleSpy.error).toHaveBeenCalled();
    });

    it("defaults isDevelopment based on NODE_ENV", () => {
      const originalEnv = process.env.NODE_ENV;
      // NODE_ENV in tests is 'test', so isDevelopment should be false
      const defaultLogger = new Logger();
      defaultLogger.log("should not appear");
      expect(consoleSpy.log).not.toHaveBeenCalled();
      // restore (just in case)
      Object.defineProperty(process.env, "NODE_ENV", {
        value: originalEnv,
        configurable: true,
      });
    });
  });
});

describe("logger singleton", () => {
  it("is a Logger instance", () => {
    expect(logger).toBeInstanceOf(Logger);
  });
});

describe("convenience exports", () => {
  it("log is exported as a function", () => {
    expect(typeof log).toBe("function");
  });

  it("info is exported as a function", () => {
    expect(typeof info).toBe("function");
  });

  it("warn is exported as a function", () => {
    expect(typeof warn).toBe("function");
  });

  it("error is exported as a function", () => {
    expect(typeof error).toBe("function");
  });

  it("debug is exported as a function", () => {
    expect(typeof debug).toBe("function");
  });

  it("metric is exported as a function", () => {
    expect(typeof metric).toBe("function");
  });
});

describe("LogLevel and LoggerConfig types", () => {
  it("LogLevel type accepts valid levels", () => {
    const level: LogLevel = "error";
    expect(level).toBe("error");
  });

  it("LoggerConfig type can be constructed", () => {
    const config: LoggerConfig = {
      isDevelopment: false,
      enableProductionErrors: true,
    };
    expect(config.isDevelopment).toBe(false);
    expect(config.enableProductionErrors).toBe(true);
  });
});
