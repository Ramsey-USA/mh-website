/**
 * @jest-environment node
 */

import { HeaderScanner } from "../header-scanner";
import type { ScanConfig, HttpResponse } from "../types";
import { VulnerabilityType } from "../types";

const buildConfig = (url = "https://example.com"): ScanConfig => ({
  targets: { urls: [url] },
  scanTypes: [],
});

const buildResponse = (
  headers: Record<string, string>,
  status = 200,
): HttpResponse => ({
  status,
  statusText: "OK",
  headers,
  body: "<html><body>OK</body></html>",
  url: "https://example.com",
});

/** Full set of well-configured security headers */
const SECURE_HEADERS: Record<string, string> = {
  "content-security-policy": "default-src 'self'; script-src 'self'",
  "x-frame-options": "DENY",
  "x-content-type-options": "nosniff",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
  "referrer-policy": "strict-origin-when-cross-origin",
  "permissions-policy": "camera=(), microphone=(), geolocation=()",
};

describe("HeaderScanner", () => {
  let scanner: HeaderScanner;

  beforeEach(() => {
    scanner = new HeaderScanner();
  });

  it("creates an instance", () => {
    expect(scanner).toBeInstanceOf(HeaderScanner);
  });

  it("returns empty array when no URLs configured", async () => {
    const makeRequest = jest.fn();
    const config: ScanConfig = { targets: {}, scanTypes: [] };
    const results = await scanner.scan(config, makeRequest);
    expect(results).toHaveLength(0);
    expect(makeRequest).not.toHaveBeenCalled();
  });

  it("returns empty array when all security headers are properly set", async () => {
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(SECURE_HEADERS));
    const results = await scanner.scan(buildConfig(), makeRequest);
    // Only security-header related vulnerabilities should be absent
    const missingHeaders = results.filter(
      (r) => r.type === VulnerabilityType.MISSING_SECURITY_HEADERS,
    );
    expect(missingHeaders).toHaveLength(0);
  });

  it("detects missing X-Frame-Options header", async () => {
    const { "x-frame-options": _, ...headersWithoutXFO } = SECURE_HEADERS;
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(headersWithoutXFO));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const xfoVuln = results.find(
      (r) =>
        r.type === VulnerabilityType.MISSING_SECURITY_HEADERS &&
        r.title.toLowerCase().includes("x-frame-options"),
    );
    expect(xfoVuln).toBeDefined();
  });

  it("detects missing X-Content-Type-Options header", async () => {
    const { "x-content-type-options": _, ...rest } = SECURE_HEADERS;
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(rest));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const vuln = results.find(
      (r) =>
        r.type === VulnerabilityType.MISSING_SECURITY_HEADERS &&
        r.title.toLowerCase().includes("x-content-type-options"),
    );
    expect(vuln).toBeDefined();
  });

  it("detects missing Content-Security-Policy header", async () => {
    const { "content-security-policy": _, ...rest } = SECURE_HEADERS;
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(rest));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const vuln = results.find(
      (r) =>
        r.type === VulnerabilityType.MISSING_SECURITY_HEADERS &&
        r.title.toLowerCase().includes("content-security-policy"),
    );
    expect(vuln).toBeDefined();
  });

  it("detects missing Strict-Transport-Security header", async () => {
    const { "strict-transport-security": _, ...rest } = SECURE_HEADERS;
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(rest));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const vuln = results.find(
      (r) =>
        r.type === VulnerabilityType.MISSING_SECURITY_HEADERS &&
        r.title.toLowerCase().includes("strict-transport-security"),
    );
    expect(vuln).toBeDefined();
  });

  it("detects missing Referrer-Policy header", async () => {
    const { "referrer-policy": _, ...rest } = SECURE_HEADERS;
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(rest));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const vuln = results.find(
      (r) =>
        r.type === VulnerabilityType.MISSING_SECURITY_HEADERS &&
        r.title.toLowerCase().includes("referrer-policy"),
    );
    expect(vuln).toBeDefined();
  });

  it("detects weak CSP (unsafe-eval)", async () => {
    const headers = {
      ...SECURE_HEADERS,
      "content-security-policy":
        "default-src 'self'; script-src 'self' 'unsafe-eval'",
    };
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(headers));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const weakCsp = results.find(
      (r) =>
        r.type === VulnerabilityType.INSECURE_HEADERS &&
        r.title.toLowerCase().includes("content security policy"),
    );
    expect(weakCsp).toBeDefined();
  });

  it("detects weak CSP (unsafe-inline)", async () => {
    const headers = {
      ...SECURE_HEADERS,
      "content-security-policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline'",
    };
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(headers));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const weakCsp = results.find(
      (r) =>
        r.type === VulnerabilityType.INSECURE_HEADERS &&
        r.title.toLowerCase().includes("content security policy"),
    );
    expect(weakCsp).toBeDefined();
  });

  it("detects all missing headers in one scan", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse({}));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const missingHeaders = results.filter(
      (r) => r.type === VulnerabilityType.MISSING_SECURITY_HEADERS,
    );
    // Should detect all 6 required headers
    expect(missingHeaders.length).toBe(6);
  });

  it("each result has required fields", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse({}));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    for (const vuln of results) {
      expect(vuln).toHaveProperty("id");
      expect(vuln).toHaveProperty("type");
      expect(vuln).toHaveProperty("severity");
      expect(vuln).toHaveProperty("description");
      expect(vuln).toHaveProperty("location");
    }
  });

  it("handles request errors gracefully", async () => {
    const makeRequest = jest
      .fn()
      .mockRejectedValue(new Error("Connection refused"));
    await expect(
      scanner.scan(buildConfig(), makeRequest),
    ).resolves.toStrictEqual([]);
  });

  it("reports HIGH severity for missing CSP and HSTS", async () => {
    const headers = {
      "x-frame-options": "DENY",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "permissions-policy": "camera=()",
    };
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(headers));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const highSeverity = results.filter((r) => r.severity === "high");
    expect(highSeverity.length).toBeGreaterThan(0);
  });
});
