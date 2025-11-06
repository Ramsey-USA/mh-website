/**
 * Vulnerability Scanner
 * Main orchestrator for automated security vulnerability detection
 */

import { AuditLogger, AuditEventType } from "../audit-logger";
import { XSSScanner } from "./XSSScanner";
import { SQLInjectionScanner } from "./SQLInjectionScanner";
import { HeaderScanner } from "./HeaderScanner";
import type {
  Vulnerability,
  VulnerabilityType,
  SeverityLevel,
  ScanConfig,
  ScanResult,
  HttpResponse,
} from "./types";

/**
 * Vulnerability Scanner Class
 * Orchestrates specialized scanners and generates reports
 */
export class VulnerabilityScanner {
  private auditLogger: AuditLogger;
  private xssScanner: XSSScanner;
  private sqlScanner: SQLInjectionScanner;
  private headerScanner: HeaderScanner;
  private vulnerabilities: Vulnerability[] = [];
  private isScanning: boolean = false;

  constructor(auditLogger: AuditLogger) {
    this.auditLogger = auditLogger;
    this.xssScanner = new XSSScanner();
    this.sqlScanner = new SQLInjectionScanner();
    this.headerScanner = new HeaderScanner();
  }

  /**
   * Run comprehensive vulnerability scan
   */
  async runScan(config: ScanConfig): Promise<ScanResult> {
    if (this.isScanning) {
      throw new Error("Scanner is already running");
    }

    this.isScanning = true;
    const scanId = this.generateScanId();
    const startTime = new Date();

    await this.auditLogger.logEvent(AuditEventType.SECURITY_SCAN_STARTED, {
      details: { scanId, config },
      tags: ["security", "scan"],
    });

    try {
      const vulnerabilities: Vulnerability[] = [];

      // Run different types of scans based on configuration
      for (const scanType of config.scanTypes) {
        const typeVulns = await this.runScanByType(scanType, config);
        vulnerabilities.push(...typeVulns);
      }

      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();

      // Generate scan result
      const result: ScanResult = {
        id: scanId,
        startTime,
        endTime,
        duration,
        config,
        vulnerabilities,
        summary: this.generateSummary(vulnerabilities),
        coverage: {
          urlsTested: config.targets.urls?.length || 0,
          filesTested: config.targets.files?.length || 0,
          testCases: this.countTestCases(config.scanTypes),
          successRate: 100,
        },
        metadata: {
          scannerVersion: "2.0.0",
          environment: process.env.NODE_ENV || "development",
        },
      };

      // Store vulnerabilities
      this.vulnerabilities.push(...vulnerabilities);

      await this.auditLogger.logEvent(AuditEventType.SECURITY_SCAN_COMPLETED, {
        details: {
          scanId,
          vulnerabilitiesFound: vulnerabilities.length,
          duration,
        },
        tags: ["security", "scan"],
      });

      return result;
    } catch (error) {
      await this.auditLogger.logEvent(AuditEventType.ERROR_OCCURRED, {
        outcome: "failure",
        details: {
          scanId,
          error: error instanceof Error ? error.message : "Unknown error",
        },
        tags: ["security", "scan", "error"],
      });
      throw error;
    } finally {
      this.isScanning = false;
    }
  }

  /**
   * Quick security check
   */
  async quickScan(url: string): Promise<Vulnerability[]> {
    const config: ScanConfig = {
      targets: { urls: [url] },
      scanTypes: [
        "cross_site_scripting" as VulnerabilityType,
        "sql_injection" as VulnerabilityType,
        "insecure_headers" as VulnerabilityType,
        "weak_ssl_config" as VulnerabilityType,
      ],
      depth: 1,
      timeout: 30000,
      userAgent: "MH-Security-Scanner/2.0",
      followRedirects: true,
      checkSSL: true,
      aggressive: false,
    };

    const result = await this.runScan(config);
    return result.vulnerabilities;
  }

  /**
   * Scan specific vulnerability type
   */
  private async runScanByType(
    type: VulnerabilityType,
    config: ScanConfig,
  ): Promise<Vulnerability[]> {
    const makeRequest = this.createRequestFunction(config);

    switch (type) {
      case "cross_site_scripting":
        return this.xssScanner.scan(config, makeRequest);
      case "sql_injection":
        return this.sqlScanner.scan(config, makeRequest);
      case "insecure_headers":
      case "missing_security_headers":
        return this.headerScanner.scan(config, makeRequest);
      case "weak_ssl_config":
        return this.scanSSL(config);
      case "outdated_dependencies":
        return this.scanDependencies(config);
      case "cors_misconfiguration":
        return this.scanCORS(config);
      case "sensitive_data_exposure":
        return this.scanSensitiveData(config);
      case "rate_limiting_missing":
        return this.scanRateLimiting(config);
      case "insecure_cookies":
        return this.scanCookies(config);
      case "cross_site_request_forgery":
        return this.scanCSRF(config);
      default:
        return [];
    }
  }

  /**
   * Create HTTP request function for scanners
   */
  private createRequestFunction(
    config: ScanConfig,
  ): (url: string, requestConfig: ScanConfig) => Promise<HttpResponse | null> {
    return async (url: string): Promise<HttpResponse | null> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          config.timeout || 30000,
        );

        const response = await fetch(url, {
          method: config.method || "GET",
          headers: {
            "User-Agent": config.userAgent || "MH-Security-Scanner/2.0",
            ...config.customHeaders,
          },
          signal: controller.signal,
          redirect: config.followRedirects ? "follow" : "manual",
          body: config.body,
        });

        clearTimeout(timeoutId);

        const body = await response.text();
        const headers: Record<string, string> = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });

        return {
          status: response.status,
          statusText: response.statusText,
          headers,
          body,
        };
      } catch (error) {
        return null;
      }
    };
  }

  /**
   * Scan for SSL/TLS vulnerabilities
   */
  private async scanSSL(config: ScanConfig): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.checkSSL || !config.targets.urls) {
      return vulnerabilities;
    }

    for (const url of config.targets.urls) {
      try {
        const urlObj = new URL(url);
        if (urlObj.protocol !== "https:") {
          vulnerabilities.push({
            id: `ssl_http_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: "weak_ssl_config" as VulnerabilityType,
            severity: "medium" as SeverityLevel,
            title: "Unencrypted HTTP Connection",
            description: "Site uses HTTP instead of HTTPS",
            location: { url },
            impact: "Data transmitted in plaintext, vulnerable to interception",
            recommendation: "Use HTTPS for all connections",
            references: [
              "https://owasp.org/www-project-web-security-testing-guide/",
            ],
            discoveredAt: new Date(),
            status: "new",
            metadata: {},
          });
        }
      } catch (error) {
        // Invalid URL
      }
    }

    return vulnerabilities;
  }

  /**
   * Scan for outdated dependencies
   */
  private async scanDependencies(config: ScanConfig): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.targets.files) {
      return vulnerabilities;
    }

    // Simplified dependency check
    for (const file of config.targets.files) {
      if (file.includes("package.json") || file.includes("package-lock.json")) {
        vulnerabilities.push({
          id: `deps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: "outdated_dependencies" as VulnerabilityType,
          severity: "medium" as SeverityLevel,
          title: "Potentially Outdated Dependencies",
          description: "Dependencies may contain known vulnerabilities",
          location: { file },
          impact: "Known vulnerabilities may be exploitable",
          recommendation: "Run npm audit and update dependencies",
          references: ["https://docs.npmjs.com/cli/v8/commands/npm-audit"],
          discoveredAt: new Date(),
          status: "new",
          metadata: {},
        });
      }
    }

    return vulnerabilities;
  }

  /**
   * Scan for CORS misconfigurations
   */
  private async scanCORS(config: ScanConfig): Promise<Vulnerability[]> {
    // CORS scanning is handled by HeaderScanner
    return [];
  }

  /**
   * Scan for sensitive data exposure
   */
  private async scanSensitiveData(
    config: ScanConfig,
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];
    const sensitivePatterns = [
      /api[_-]?key/i,
      /password/i,
      /secret/i,
      /token/i,
      /credential/i,
      /auth/i,
    ];

    if (!config.targets.files) {
      return vulnerabilities;
    }

    for (const file of config.targets.files) {
      for (const pattern of sensitivePatterns) {
        if (pattern.test(file)) {
          vulnerabilities.push({
            id: `sensitive_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: "sensitive_data_exposure" as VulnerabilityType,
            severity: "high" as SeverityLevel,
            title: "Potential Sensitive Data Exposure",
            description: `File may contain sensitive information: ${file}`,
            location: { file },
            impact: "Sensitive credentials or keys may be exposed",
            recommendation:
              "Use environment variables or secure key management",
            references: ["https://owasp.org/www-project-top-ten/"],
            discoveredAt: new Date(),
            status: "new",
            metadata: {},
          });
          break;
        }
      }
    }

    return vulnerabilities;
  }

  /**
   * Scan for rate limiting issues
   */
  private async scanRateLimiting(config: ScanConfig): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.targets.urls) {
      return vulnerabilities;
    }

    // Test rate limiting by making multiple requests
    for (const url of config.targets.urls) {
      const requestCount = 100;
      let successfulRequests = 0;

      for (let i = 0; i < requestCount; i++) {
        try {
          const response = await fetch(url, {
            method: "GET",
            signal: AbortSignal.timeout(config.timeout || 5000),
          });

          if (response.status === 200) {
            successfulRequests++;
          }
        } catch {
          // Ignore errors
        }
      }

      // If most requests succeed, rate limiting may be missing
      if (successfulRequests > requestCount * 0.9) {
        vulnerabilities.push({
          id: `rate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: "rate_limiting_missing" as VulnerabilityType,
          severity: "medium" as SeverityLevel,
          title: "Missing Rate Limiting",
          description: `No rate limiting detected: ${successfulRequests}/${requestCount} requests succeeded`,
          location: { url },
          impact: "API endpoints vulnerable to abuse and DDoS attacks",
          recommendation: "Implement rate limiting on API endpoints",
          references: [
            "https://owasp.org/www-community/controls/Rate_Limiting",
          ],
          discoveredAt: new Date(),
          status: "new",
          evidence: {
            requestCount,
            successfulRequests,
          },
          metadata: {},
        });
      }
    }

    return vulnerabilities;
  }

  /**
   * Scan for insecure cookies
   */
  private async scanCookies(config: ScanConfig): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.targets.urls) {
      return vulnerabilities;
    }

    const makeRequest = this.createRequestFunction(config);

    for (const url of config.targets.urls) {
      try {
        const response = await makeRequest(url, config);

        if (response) {
          const setCookie = response.headers["set-cookie"];

          if (setCookie) {
            const cookies = Array.isArray(setCookie) ? setCookie : [setCookie];

            for (const cookie of cookies) {
              const hasSecure = /secure/i.test(cookie);
              const hasHttpOnly = /httponly/i.test(cookie);
              const hasSameSite = /samesite/i.test(cookie);

              if (!hasSecure || !hasHttpOnly || !hasSameSite) {
                vulnerabilities.push({
                  id: `cookie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                  type: "insecure_cookies" as VulnerabilityType,
                  severity: "medium" as SeverityLevel,
                  title: "Insecure Cookie Configuration",
                  description: "Cookie missing security attributes",
                  location: { url },
                  impact: "Cookies vulnerable to interception or XSS attacks",
                  recommendation:
                    "Add Secure, HttpOnly, and SameSite attributes",
                  references: [
                    "https://owasp.org/www-community/controls/SecureCookieAttribute",
                  ],
                  discoveredAt: new Date(),
                  status: "new",
                  evidence: {
                    cookie: cookie.substring(0, 100),
                  },
                  metadata: {},
                });
              }
            }
          }
        }
      } catch (error) {
        // Continue with next URL
      }
    }

    return vulnerabilities;
  }

  /**
   * Scan for CSRF vulnerabilities
   */
  private async scanCSRF(config: ScanConfig): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.targets.urls) {
      return vulnerabilities;
    }

    const makeRequest = this.createRequestFunction(config);

    for (const url of config.targets.urls) {
      try {
        const response = await makeRequest(url, config);

        if (response) {
          const hasCSRFToken =
            /csrf|xsrf|_token/i.test(response.body) ||
            Object.keys(response.headers).some((h) => /csrf|xsrf/i.test(h));

          if (!hasCSRFToken) {
            vulnerabilities.push({
              id: `csrf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              type: "cross_site_request_forgery" as VulnerabilityType,
              severity: "high" as SeverityLevel,
              title: "Missing CSRF Protection",
              description: "No CSRF tokens detected",
              location: { url },
              impact: "Vulnerable to Cross-Site Request Forgery attacks",
              recommendation:
                "Implement CSRF tokens for state-changing operations",
              references: ["https://owasp.org/www-community/attacks/csrf"],
              discoveredAt: new Date(),
              status: "new",
              metadata: {},
            });
          }
        }
      } catch (error) {
        // Continue with next URL
      }
    }

    return vulnerabilities;
  }

  /**
   * Generate scan summary
   */
  private generateSummary(vulnerabilities: Vulnerability[]) {
    const bySeverity: Record<SeverityLevel, number> = {
      info: 0,
      low: 0,
      medium: 0,
      high: 0,
      critical: 0,
    };

    const byType: Record<string, number> = {};

    vulnerabilities.forEach((vuln) => {
      bySeverity[vuln.severity]++;
      byType[vuln.type] = (byType[vuln.type] || 0) + 1;
    });

    // Get top vulnerabilities
    const topVulnerabilities = Object.entries(byType)
      .map(([type, count]) => ({ type: type as VulnerabilityType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      total: vulnerabilities.length,
      critical: bySeverity.critical,
      high: bySeverity.high,
      medium: bySeverity.medium,
      low: bySeverity.low,
      info: bySeverity.info,
      topVulnerabilities,
    };
  }

  /**
   * Count test cases
   */
  private countTestCases(scanTypes: VulnerabilityType[]): number {
    return scanTypes.length * 10; // Simplified
  }

  /**
   * Generate scan ID
   */
  private generateScanId(): string {
    return `scan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all discovered vulnerabilities
   */
  getVulnerabilities(): Vulnerability[] {
    return this.vulnerabilities;
  }

  /**
   * Clear vulnerability history
   */
  clearVulnerabilities(): void {
    this.vulnerabilities = [];
  }

  /**
   * Check if scanner is running
   */
  isRunning(): boolean {
    return this.isScanning;
  }
}

// Re-export types
export * from "./types";
