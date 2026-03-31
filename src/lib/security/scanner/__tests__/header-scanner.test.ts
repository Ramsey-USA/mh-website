/**
 * @jest-environment node
 */

import { HeaderScanner } from "../header-scanner";
import { SeverityLevel } from "../types";

describe("HeaderScanner", () => {
  const scanner = new HeaderScanner();

  it("returns no vulnerabilities when no target URLs are configured", async () => {
    const result = await scanner.scan(
      {
        targets: {},
        scanTypes: [],
      },
      jest.fn(),
    );

    expect(result).toEqual([]);
  });

  it("reports all missing required security headers", async () => {
    const result = await scanner.scan(
      {
        targets: { urls: ["https://example.com"] },
        scanTypes: [],
      },
      jest.fn().mockResolvedValue({
        status: 200,
        statusText: "OK",
        headers: {},
        body: "",
      }),
    );

    expect(result).toHaveLength(6);
    expect(result.map((v) => v.title)).toEqual(
      expect.arrayContaining([
        "Missing content-security-policy Header",
        "Missing x-frame-options Header",
        "Missing x-content-type-options Header",
        "Missing strict-transport-security Header",
        "Missing referrer-policy Header",
        "Missing permissions-policy Header",
      ]),
    );
    expect(
      result.find((v) => v.title === "Missing content-security-policy Header")
        ?.severity,
    ).toBe(SeverityLevel.HIGH);
  });

  it("detects weak configured headers and insecure disclosure headers", async () => {
    const result = await scanner.scan(
      {
        targets: { urls: ["https://example.com"] },
        scanTypes: [],
      },
      jest.fn().mockResolvedValue({
        status: 200,
        statusText: "OK",
        headers: {
          "content-security-policy": "default-src 'self' 'unsafe-inline'",
          "x-frame-options": "ALLOW",
          "x-content-type-options": "nosniff",
          "strict-transport-security": "max-age=300",
          "referrer-policy": "strict-origin-when-cross-origin",
          "permissions-policy": "geolocation=()",
          server: "nginx/1.0",
          "x-powered-by": "Next.js",
          "access-control-allow-origin": "*",
        },
        body: "",
      }),
    );

    expect(result.map((v) => v.title)).toEqual(
      expect.arrayContaining([
        "Weak Content Security Policy",
        "Weak X-Frame-Options Configuration",
        "Weak HSTS Configuration",
        "Server Header Information Disclosure",
        "X-Powered-By Header Information Disclosure",
        "Overly Permissive CORS Policy",
      ]),
    );
  });

  it("continues scanning when one request fails", async () => {
    const makeRequest = jest
      .fn()
      .mockRejectedValueOnce(new Error("network error"))
      .mockResolvedValueOnce({
        status: 200,
        statusText: "OK",
        headers: {},
        body: "",
      });

    const result = await scanner.scan(
      {
        targets: {
          urls: ["https://bad.example.com", "https://good.example.com"],
        },
        scanTypes: [],
      },
      makeRequest,
    );

    expect(makeRequest).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(6);
  });
});
