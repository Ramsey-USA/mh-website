/**
 * @jest-environment node
 */

import { SQLInjectionScanner } from "../sql-injection-scanner";
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

// SQL error messages that match the scanner's errorPatterns
const MYSQL_ERROR = "SQL syntax.*MySQL error occurred in query";
const MSSQL_ERROR = "Driver SQL Server JDBC Driver error";
const ORACLE_ERROR = "Oracle error occurred during execution";

describe("SQLInjectionScanner", () => {
  let scanner: SQLInjectionScanner;

  beforeEach(() => {
    scanner = new SQLInjectionScanner();
  });

  it("creates an instance", () => {
    expect(scanner).toBeInstanceOf(SQLInjectionScanner);
  });

  it("returns empty array when no URLs configured", async () => {
    const makeRequest = jest.fn();
    const config: ScanConfig = { targets: {}, scanTypes: [] };
    const results = await scanner.scan(config, makeRequest);
    expect(results).toHaveLength(0);
    expect(makeRequest).not.toHaveBeenCalled();
  });

  it("returns empty array for clean responses (no SQL errors)", async () => {
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse("<html>Normal page</html>"));
    const results = await scanner.scan(buildConfig(), makeRequest);
    // No SQL error patterns → no vulnerabilities from error detection
    // (blind detection might fire based on size diff — we only check type here)
    const sqlErrorVulns = results.filter(
      (r) => r.type === VulnerabilityType.SQL_INJECTION,
    );
    // Error-based detection should find nothing since no SQL error in body
    const errorBased = sqlErrorVulns.filter(
      (r) => (r.metadata as Record<string, unknown>)?.["errorBased"] === true,
    );
    expect(errorBased).toHaveLength(0);
  });

  it("detects UNION SELECT patterns via SQL error response", async () => {
    // Respond with a MySQL error when a UNION SELECT payload is tested
    const makeRequest = jest.fn().mockImplementation((url: string) => {
      if (url.includes("UNION") || url.includes("union")) {
        return Promise.resolve(buildResponse(MYSQL_ERROR));
      }
      return Promise.resolve(buildResponse("Normal page"));
    });
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.type).toBe(VulnerabilityType.SQL_INJECTION);
  });

  it("detects OR 1=1 patterns via SQL error response", async () => {
    const makeRequest = jest.fn().mockImplementation((url: string) => {
      if (
        url.includes("%27") ||
        url.includes("OR") ||
        url.includes("or+1%3D1")
      ) {
        return Promise.resolve(buildResponse(MYSQL_ERROR));
      }
      return Promise.resolve(buildResponse("OK"));
    });
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    expect(results[0]!.type).toBe(VulnerabilityType.SQL_INJECTION);
  });

  it("returns vulnerability with type SQL_INJECTION when SQL error detected", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(MYSQL_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const sqlVulns = results.filter(
      (r) => r.type === VulnerabilityType.SQL_INJECTION,
    );
    expect(sqlVulns.length).toBeGreaterThan(0);
  });

  it("detects MSSQL error patterns (Driver SQL Server)", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(MSSQL_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const sqlVulns = results.filter(
      (r) => r.type === VulnerabilityType.SQL_INJECTION,
    );
    expect(sqlVulns.length).toBeGreaterThan(0);
  });

  it("detects Oracle error patterns", async () => {
    const makeRequest = jest
      .fn()
      .mockResolvedValue(buildResponse(ORACLE_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const sqlVulns = results.filter(
      (r) => r.type === VulnerabilityType.SQL_INJECTION,
    );
    expect(sqlVulns.length).toBeGreaterThan(0);
  });

  it("each result has required fields", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(MYSQL_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    expect(results.length).toBeGreaterThan(0);
    for (const vuln of results) {
      expect(vuln).toHaveProperty("id");
      expect(vuln).toHaveProperty("type");
      expect(vuln).toHaveProperty("severity");
      expect(vuln).toHaveProperty("description");
      expect(vuln).toHaveProperty("evidence");
    }
  });

  it("error-based detection uses CRITICAL severity", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(MYSQL_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const errorBased = results.filter(
      (r) => (r.metadata as Record<string, unknown>)?.["errorBased"] === true,
    );
    expect(errorBased.length).toBeGreaterThan(0);
    for (const vuln of errorBased) {
      expect(vuln.severity).toBe("critical");
    }
  });

  it("handles request errors without throwing", async () => {
    const makeRequest = jest.fn().mockRejectedValue(new Error("timeout"));
    await expect(
      scanner.scan(buildConfig(), makeRequest),
    ).resolves.toStrictEqual([]);
  });

  it("includes evidence with payload and response", async () => {
    const makeRequest = jest.fn().mockResolvedValue(buildResponse(MYSQL_ERROR));
    const results = await scanner.scan(buildConfig(), makeRequest);
    const errorBased = results.find(
      (r) => (r.metadata as Record<string, unknown>)?.["errorBased"] === true,
    );
    expect(errorBased).toBeDefined();
    expect(errorBased!.evidence).toHaveProperty("payload");
    expect(errorBased!.evidence).toHaveProperty("response");
  });
});
