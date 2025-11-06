/**
 * XSS Scanner
 * Detects Cross-Site Scripting vulnerabilities
 */

import type {
  Vulnerability,
  VulnerabilityType,
  SeverityLevel,
  ScanConfig,
  HttpResponse,
} from "./types";

export class XSSScanner {
  private readonly xssPayloads = [
    '<script>alert("XSS")</script>',
    '"><script>alert("XSS")</script>',
    "';alert('XSS');//",
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
    "{{7*7}}", // Template injection
    "${7*7}", // Expression injection
    "<iframe src=\"javascript:alert('XSS')\">",
    '<body onload=alert("XSS")>',
    '<input type="text" value="<script>alert(\'XSS\')</script>">',
    '"><img src=x onerror="alert(\'XSS\')">',
  ];

  private readonly reflectionPatterns = [
    /<script[^>]*>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /onerror\s*=/gi,
    /onload\s*=/gi,
    /onclick\s*=/gi,
    /onfocus\s*=/gi,
    /onmouseover\s*=/gi,
  ];

  /**
   * Scan for XSS vulnerabilities
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
      // Test each payload
      for (const payload of this.xssPayloads) {
        const testUrls = this.generateTestUrls(url, payload);

        for (const testUrl of testUrls) {
          try {
            const response = await makeRequest(testUrl, config);

            if (response && this.isReflected(payload, response.body)) {
              vulnerabilities.push(
                this.createVulnerability({
                  url: testUrl,
                  payload,
                  response: response.body.substring(0, 500),
                  severity: this.calculateSeverity(payload, response.body),
                }),
              );
              break; // Found vulnerability, no need to test more payloads for this URL
            }
          } catch (error) {
            // Continue with next payload
          }
        }
      }

      // Check for DOM-based XSS indicators
      const domVulns = await this.checkDOMBasedXSS(url, makeRequest, config);
      vulnerabilities.push(...domVulns);
    }

    return vulnerabilities;
  }

  /**
   * Generate test URLs with XSS payloads
   */
  private generateTestUrls(baseUrl: string, payload: string): string[] {
    const testUrls: string[] = [];
    const encodedPayload = encodeURIComponent(payload);

    // Test different injection points
    testUrls.push(`${baseUrl}?q=${encodedPayload}`);
    testUrls.push(`${baseUrl}?search=${encodedPayload}`);
    testUrls.push(`${baseUrl}?name=${encodedPayload}`);
    testUrls.push(`${baseUrl}#${encodedPayload}`);

    // Add path-based injection
    if (baseUrl.includes("/")) {
      const urlParts = baseUrl.split("/");
      testUrls.push([...urlParts.slice(0, -1), encodedPayload].join("/"));
    }

    return testUrls;
  }

  /**
   * Check if payload is reflected in response
   */
  private isReflected(payload: string, responseBody: string): boolean {
    // Check for exact match
    if (responseBody.includes(payload)) return true;

    // Check for HTML-encoded version
    const htmlEncoded = this.htmlEncode(payload);
    if (responseBody.includes(htmlEncoded)) return false; // Properly encoded, not vulnerable

    // Check for partial reflections that could still be exploitable
    const dangerousPatterns = this.reflectionPatterns;
    for (const pattern of dangerousPatterns) {
      if (pattern.test(responseBody)) {
        // Check if it's near our payload markers
        const payloadMarker = payload.substring(0, 10);
        if (responseBody.includes(payloadMarker)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Check for DOM-based XSS vulnerabilities
   */
  private async checkDOMBasedXSS(
    url: string,
    makeRequest: (
      url: string,
      config: ScanConfig,
    ) => Promise<HttpResponse | null>,
    config: ScanConfig,
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = [];

    try {
      const response = await makeRequest(url, config);
      if (!response) return vulnerabilities;

      // Check for dangerous JavaScript patterns
      const dangerousPatterns = [
        /document\.write\([^)]*\)/gi,
        /innerHTML\s*=\s*[^;]+/gi,
        /location\s*=\s*[^;]+/gi,
        /eval\([^)]*\)/gi,
        /setTimeout\([^)]*,\s*[^)]*\)/gi,
        /setInterval\([^)]*,\s*[^)]*\)/gi,
      ];

      const matches: string[] = [];
      for (const pattern of dangerousPatterns) {
        const found = response.body.match(pattern);
        if (found) {
          matches.push(...found);
        }
      }

      if (matches.length > 0) {
        vulnerabilities.push(
          this.createVulnerability({
            url,
            payload: "DOM-based XSS indicators",
            response: "",
            severity: "medium" as SeverityLevel,
            matches,
          }),
        );
      }
    } catch (error) {
      // Ignore errors
    }

    return vulnerabilities;
  }

  /**
   * Calculate severity based on payload and context
   */
  private calculateSeverity(
    payload: string,
    responseBody: string,
  ): SeverityLevel {
    // Check if payload is in a script context (most dangerous)
    if (/<script[^>]*>[\s\S]*?<\/script>/gi.test(responseBody)) {
      return "critical" as SeverityLevel;
    }

    // Check if it's in an event handler
    if (/on\w+\s*=/gi.test(payload)) {
      return "high" as SeverityLevel;
    }

    // Check if it's a template injection
    if (payload.includes("{{") || payload.includes("${")) {
      return "high" as SeverityLevel;
    }

    // Default to medium for reflected XSS
    return "medium" as SeverityLevel;
  }

  /**
   * HTML encode string
   */
  private htmlEncode(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }

  /**
   * Create vulnerability object
   */
  private createVulnerability(data: {
    url: string;
    payload: string;
    response: string;
    severity: SeverityLevel;
    matches?: string[];
  }): Vulnerability {
    return {
      id: `xss_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "cross_site_scripting" as VulnerabilityType,
      severity: data.severity,
      title: "Cross-Site Scripting (XSS) Vulnerability",
      description: data.matches
        ? "DOM-based XSS indicators detected in JavaScript code"
        : "Unescaped user input is reflected in the response, allowing script injection",
      location: { url: data.url },
      impact:
        "Attackers can execute arbitrary JavaScript in victim browsers, steal sessions, redirect users, or deface content",
      recommendation:
        "Properly encode all user input before rendering. Use Content Security Policy (CSP). Implement output encoding based on context (HTML, JavaScript, URL, CSS)",
      references: [
        "https://owasp.org/www-community/attacks/xss/",
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        payload: data.payload,
        response: data.response,
        matches: data.matches,
      },
      metadata: {},
    };
  }
}
