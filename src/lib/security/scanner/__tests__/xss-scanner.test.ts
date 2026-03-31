/**
 * @jest-environment node
 */

import { XSSScanner } from "../xss-scanner";
import type { ScanConfig, HttpResponse } from "../types";
import { VulnerabilityType } from "../types";

const buildConfig = (url = "http://example.com"): ScanConfig => ({
  targets: { urls: [url] },
  scanTypes: [],
});

const buildResponse = (body: string, status = 200): HttpResponse => ({
  status,
  statusText: "OK",
  headers: {},
  body,
  url: "http://example.com",
});

describe("XSSScanner", () => {
  let scanner: XSSScanner;

  beforeEach(() => {
    scanner = new XSSScanner();
  });

  it("creates an instance", () => {
    expect(scanner).toBeInstanceOf(XSSScanner);
  });

  it("returns an empty array when makeRequest returns null", async () => {
    const makeRequest = jest.fn().mockResolvedValue(null);
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(Array.isArray(results)).toBe(true);
    expect(results).toHaveLength(0);
  });

  it("returns an empty array for clean content (no reflection)", async () => {
    const cleanBody = "<html><body><p>Hello world</p></body></html>";
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(cleanBody));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results).toHaveLength(0);
  });

  it("returns empty array when no URLs configured", async () => {
    const makeRequest = jest.fn();
    const config: ScanConfig = { targets: {}, scanTypes: [] };
    const results = await scanner.scan(config, makeRequest);
    expect(results).toHaveLength(0);
    expect(makeRequest).not.toHaveBeenCalled();
  });

  it("detects <script> tag injection via reflection", async () => {
    // Return the exact payload in the response body so isReflected() matches
    const scriptPayload = '<script>alert("XSS")</script>';
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(scriptPayload));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    const vuln = results[0];
    expect(vuln!.type).toBe(VulnerabilityType.XSS);
  });

  it("detects javascript: URL via reflection", async () => {
    // Payload that includes javascript: — reflected back in body
    const payload = 'javascript:alert("XSS")';
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(payload));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.type).toBe(VulnerabilityType.XSS);
  });

  it("detects event handler (onerror) via DOM-based patterns", async () => {
    // DOM-based: response body contains onerror= pattern
    const body = '<img src=x onerror=alert("XSS")>';
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(body));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
  });

  it("detects eval() calls via DOM-based XSS check", async () => {
    // checkDOMBasedXSS scans response body for eval(...)
    const body = "<script>eval(userInput)</script>";
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(body));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
  });

  it("detects innerHTML assignment via DOM-based check", async () => {
    const body = "element.innerHTML = userInput;";
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(body));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
  });

  it("reports severity HIGH or CRITICAL for script injection", async () => {
    const scriptPayload = '<script>alert("XSS")</script>';
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(scriptPayload));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    const severities = results.map((r) => r.severity);
    const highOrCritical = severities.filter(
      (s) => s === "high" || s === "critical",
    );
    expect(highOrCritical.length).toBeGreaterThan(0);
  });

  it("each result has required fields", async () => {
    const scriptPayload = '<script>alert("XSS")</script>';
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(scriptPayload));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    for (const vuln of results) {
      expect(vuln).toHaveProperty("id");
      expect(vuln).toHaveProperty("type");
      expect(vuln).toHaveProperty("severity");
      expect(vuln).toHaveProperty("description");
      expect(vuln).toHaveProperty("location");
      expect(vuln).toHaveProperty("evidence");
    }
  });

  it("result type is cross_site_scripting", async () => {
    const scriptPayload = '<script>alert("XSS")</script>';
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(scriptPayload));
    const results = await scanner.scan(buildConfig(), makeRequest);
    for (const vuln of results) {
      expect(vuln.type).toBe("cross_site_scripting");
    }
  });

  it("handles request errors gracefully without throwing", async () => {
    const makeRequest = jest.fn().mockRejectedValue(new Error("Network error"));
    await expect(
      scanner.scan(buildConfig(), makeRequest),
    ).resolves.toStrictEqual([]);
  });

  it("scans multiple URLs", async () => {
    const makeRequest = jest.fn().mockResolvedValue(null);
    const config: ScanConfig = {
      targets: { urls: ["http://a.com", "http://b.com"] },
      scanTypes: [],
    };
    const results = await scanner.scan(config, makeRequest);
    expect(Array.isArray(results)).toBe(true);
    // makeRequest should have been called for both URLs
    expect(makeRequest).toHaveBeenCalled();
  });
});
