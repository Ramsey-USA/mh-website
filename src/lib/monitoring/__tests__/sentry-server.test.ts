/**
 * @jest-environment node
 *
 * Tests for lib/monitoring/sentry-server.ts
 *
 * Covers:
 *   - createServerSentry()       — returns null when DSN missing, instance when set
 *   - captureServerException()   — no-op when DSN missing; captures via Toucan
 *   - captureServerMessage()     — no-op when DSN missing; captures via Toucan
 *   - withServerSentry()         — passes through result; captures + re-throws on error
 */

import { NextRequest } from "next/server";

// ── Mock toucan-js ────────────────────────────────────────────────────────────
// jest.mock factories are hoisted — variables are declared INSIDE the factory
// and retrieved via jest.requireMock() below.

jest.mock("toucan-js", () => {
  const instance = {
    setRequestBody: jest.fn(),
    setTag: jest.fn(),
    setExtras: jest.fn(),
    setExtra: jest.fn(),
    captureException: jest.fn(),
    captureMessage: jest.fn(),
  };
  const Toucan = jest.fn(() => instance);
  return { Toucan, _instance: instance };
});

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn(), info: jest.fn(), warn: jest.fn() },
}));

interface ToucanMockInstance {
  setRequestBody: jest.Mock;
  setTag: jest.Mock;
  setExtras: jest.Mock;
  setExtra: jest.Mock;
  captureException: jest.Mock;
  captureMessage: jest.Mock;
}

// Retrieve mock references after the factory has run
const toucanMod = jest.requireMock("toucan-js") as {
  Toucan: jest.Mock;
  _instance: ToucanMockInstance;
};
const MockToucan = toucanMod.Toucan;
const mockToucanInstance = toucanMod._instance;

import {
  createServerSentry,
  captureServerException,
  captureServerMessage,
  withServerSentry,
} from "@/lib/monitoring/sentry-server";

function makeRequest(url = "http://localhost/api/test") {
  return new NextRequest(url, { method: "GET" });
}

describe("createServerSentry()", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env["SENTRY_DSN"];
  });

  it("returns null when SENTRY_DSN is not set", () => {
    expect(createServerSentry(makeRequest())).toBeNull();
  });

  it("returns a Toucan instance when SENTRY_DSN is set", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    const sentry = createServerSentry(makeRequest());
    expect(sentry).not.toBeNull();
    expect(MockToucan).toHaveBeenCalled();
    expect(mockToucanInstance.setRequestBody).toHaveBeenCalled();
  });

  it("creates Toucan with a context when ctx is provided", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    const ctx = { waitUntil: jest.fn() };
    createServerSentry(makeRequest(), ctx);
    const options = MockToucan.mock.calls[0][0];
    expect(options.context).toBe(ctx);
  });
});

describe("captureServerException()", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env["SENTRY_DSN"];
  });

  it("is a no-op when SENTRY_DSN is not set", () => {
    captureServerException(new Error("oops"));
    expect(MockToucan).not.toHaveBeenCalled();
  });

  it("captures an Error instance via Toucan", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerException(new Error("test error"));
    expect(mockToucanInstance.captureException).toHaveBeenCalledWith(
      expect.any(Error),
    );
  });

  it("captures a non-Error value as a message", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerException("string error");
    expect(mockToucanInstance.captureMessage).toHaveBeenCalledWith(
      "string error",
      "error",
    );
  });

  it("sets route tag and extra context when provided", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerException(new Error("ctx error"), {
      route: "/api/test",
      extra: { foo: "bar" },
    });
    expect(mockToucanInstance.setTag).toHaveBeenCalledWith(
      "route",
      "/api/test",
    );
    expect(mockToucanInstance.setExtras).toHaveBeenCalledWith({ foo: "bar" });
  });

  it("sets request tags when request is provided", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerException(new Error("req error"), {
      request: makeRequest("http://localhost/api/check"),
    });
    expect(mockToucanInstance.setTag).toHaveBeenCalledWith("method", "GET");
    expect(mockToucanInstance.setTag).toHaveBeenCalledWith("url", "/api/check");
  });

  it("filters out sensitive request headers", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    const req = new NextRequest("http://localhost/api/check", {
      headers: {
        authorization: "Bearer token",
        cookie: "session=abc",
        "x-forwarded-for": "1.2.3.4",
      },
    });
    captureServerException(new Error("headers test"), { request: req });
    const extraCall = mockToucanInstance.setExtra.mock.calls.find(
      (c: unknown[]) => c[0] === "headers",
    );
    const headers = extraCall?.[1] as Record<string, string> | undefined;
    if (headers) {
      expect(headers["authorization"]).toBeUndefined();
      expect(headers["cookie"]).toBeUndefined();
    }
  });
});

describe("captureServerMessage()", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env["SENTRY_DSN"];
  });

  it("is a no-op when SENTRY_DSN is not set", () => {
    captureServerMessage("hello");
    expect(MockToucan).not.toHaveBeenCalled();
  });

  it("captures a message with the given level", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerMessage("deploy complete", "info");
    expect(mockToucanInstance.captureMessage).toHaveBeenCalledWith(
      "deploy complete",
      "info",
    );
  });

  it("adds extras when provided", () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    captureServerMessage("msg", "warning", { key: "value" });
    expect(mockToucanInstance.setExtras).toHaveBeenCalledWith({ key: "value" });
  });
});

describe("withServerSentry()", () => {
  afterEach(() => {
    jest.clearAllMocks();
    delete process.env["SENTRY_DSN"];
  });

  it("passes through the handler result on success", async () => {
    const handler = jest.fn().mockResolvedValue("result");
    const wrapped = withServerSentry(handler);
    const result = await wrapped(makeRequest());
    expect(result).toBe("result");
  });

  it("re-throws errors and calls captureServerException when DSN is set", async () => {
    process.env["SENTRY_DSN"] = "https://key@sentry.io/123";
    const handler = jest.fn().mockRejectedValue(new Error("handler fail"));
    const wrapped = withServerSentry(handler, "/api/test");
    await expect(wrapped(makeRequest())).rejects.toThrow("handler fail");
    expect(mockToucanInstance.captureException).toHaveBeenCalled();
  });

  it("re-throws errors even when SENTRY_DSN is not set", async () => {
    const handler = jest
      .fn()
      .mockRejectedValue(new Error("fail without sentry"));
    const wrapped = withServerSentry(handler);
    await expect(wrapped(makeRequest())).rejects.toThrow("fail without sentry");
  });
});
