/**
 * Header Scanner
 * Detects missing or misconfigured security headers
 */

import {
  type Vulnerability,
  type VulnerabilityType,
  type ScanConfig,
  type HttpResponse,
  SeverityLevel,
} from "./types";

export class HeaderScanner {
  private readonly requiredHeaders = [
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "strict-transport-security",
    "referrer-policy",
    "permissions-policy",
  ];

  /**
   * Scan for security header issues
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
      try {
        const response = await makeRequest(url, config);

        if (response) {
          // Check for missing headers
          vulnerabilities.push(...this.checkMissingHeaders(url, response));

          // Check header values
          vulnerabilities.push(...this.checkHeaderValues(url, response));

          // Check for insecure headers
          vulnerabilities.push(...this.checkInsecureHeaders(url, response));
        }
      } catch (_error) {
        // Continue with next URL
      }
    }

    return vulnerabilities;
  }

  /**
   * Check for missing security headers
   */
  private checkMissingHeaders(
    url: string,
    response: HttpResponse,
  ): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    const headers = new Map(
      Object.entries(response.headers).map(([k, v]) => [k.toLowerCase(), v]),
    );

    for (const headerName of this.requiredHeaders) {
      if (!headers.has(headerName)) {
        vulnerabilities.push(
          this.createMissingHeaderVulnerability(url, headerName),
        );
      }
    }

    return vulnerabilities;
  }

  /**
   * Check header values for misconfigurations
   */
  private checkHeaderValues(
    url: string,
    response: HttpResponse,
  ): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    const headers = new Map(
      Object.entries(response.headers).map(([k, v]) => [k.toLowerCase(), v]),
    );

    // Check CSP
    const csp = headers.get("content-security-policy");
    if (csp) {
      if (csp.includes("unsafe-inline") || csp.includes("unsafe-eval")) {
        vulnerabilities.push(this.createWeakCSPVulnerability(url, csp));
      }
    }

    // Check X-Frame-Options
    const xfo = headers.get("x-frame-options");
    if (xfo && xfo.toUpperCase() === "ALLOW") {
      vulnerabilities.push(this.createWeakXFOVulnerability(url, xfo));
    }

    // Check HSTS
    const hsts = headers.get("strict-transport-security");
    if (hsts) {
      const maxAge = this.extractMaxAge(hsts);
      if (maxAge && maxAge < 31536000) {
        // Less than 1 year
        vulnerabilities.push(
          this.createWeakHSTSVulnerability(url, hsts, maxAge),
        );
      }
    }

    return vulnerabilities;
  }

  /**
   * Check for insecure headers
   */
  private checkInsecureHeaders(
    url: string,
    response: HttpResponse,
  ): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    const headers = new Map(
      Object.entries(response.headers).map(([k, v]) => [k.toLowerCase(), v]),
    );

    // Check for server header (information disclosure)
    const server = headers.get("server");
    if (server && server.length > 0) {
      vulnerabilities.push(this.createServerHeaderVulnerability(url, server));
    }

    // Check for X-Powered-By (information disclosure)
    const poweredBy = headers.get("x-powered-by");
    if (poweredBy && poweredBy.length > 0) {
      vulnerabilities.push(
        this.createPoweredByHeaderVulnerability(url, poweredBy),
      );
    }

    // Check for Access-Control-Allow-Origin: *
    const cors = headers.get("access-control-allow-origin");
    if (cors === "*") {
      vulnerabilities.push(this.createWeakCORSVulnerability(url, cors));
    }

    return vulnerabilities;
  }

  /**
   * Extract max-age from HSTS header
   */
  private extractMaxAge(hsts: string): number | null {
    const match = hsts.match(/max-age=(\d+)/i);
    return match && match[1] ? parseInt(match[1], 10) : null;
  }

  /**
   * Create missing header vulnerability
   */
  private createMissingHeaderVulnerability(
    url: string,
    headerName: string,
  ): Vulnerability {
    const descriptions: Record<string, string> = {
      "content-security-policy":
        "Missing Content Security Policy header allows execution of malicious scripts",
      "x-frame-options":
        "Missing X-Frame-Options header allows clickjacking attacks",
      "x-content-type-options":
        "Missing X-Content-Type-Options header allows MIME-sniffing attacks",
      "strict-transport-security":
        "Missing Strict-Transport-Security header allows man-in-the-middle attacks",
      "referrer-policy":
        "Missing Referrer-Policy header may leak sensitive information in URLs",
      "permissions-policy":
        "Missing Permissions-Policy header allows unrestricted access to browser features",
    };

    const recommendations: Record<string, string> = {
      "content-security-policy":
        "Add Content-Security-Policy: default-src 'self'; script-src 'self'",
      "x-frame-options": "Add X-Frame-Options: DENY or SAMEORIGIN",
      "x-content-type-options": "Add X-Content-Type-Options: nosniff",
      "strict-transport-security":
        "Add Strict-Transport-Security: max-age=31536000; includeSubDomains",
      "referrer-policy": "Add Referrer-Policy: strict-origin-when-cross-origin",
      "permissions-policy":
        "Add Permissions-Policy to restrict browser features",
    };

    return {
      id: `header_missing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "missing_security_headers" as VulnerabilityType,
      severity: this.getHeaderSeverity(headerName),
      title: `Missing ${headerName} Header`,
      description: descriptions[headerName] || `Missing ${headerName} header`,
      location: { url },
      impact: "Increased attack surface for various web-based attacks",
      recommendation: recommendations[headerName] || `Add ${headerName} header`,
      references: [
        "https://owasp.org/www-project-secure-headers/",
        "https://securityheaders.com/",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        missingHeader: headerName,
      },
      metadata: {},
    };
  }

  /**
   * Create weak CSP vulnerability
   */
  private createWeakCSPVulnerability(url: string, csp: string): Vulnerability {
    return {
      id: `header_weak_csp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "high" as SeverityLevel,
      title: "Weak Content Security Policy",
      description:
        "CSP contains unsafe-inline or unsafe-eval, allowing execution of inline scripts",
      location: { url },
      impact:
        "Reduces effectiveness of CSP against XSS attacks. Inline scripts can still execute",
      recommendation:
        "Remove unsafe-inline and unsafe-eval. Use nonces or hashes for inline scripts",
      references: [
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
        "https://csp.withgoogle.com/docs/strict-csp.html",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: csp,
      },
      metadata: {},
    };
  }

  /**
   * Create weak X-Frame-Options vulnerability
   */
  private createWeakXFOVulnerability(url: string, xfo: string): Vulnerability {
    return {
      id: `header_weak_xfo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "medium" as SeverityLevel,
      title: "Weak X-Frame-Options Configuration",
      description: "X-Frame-Options set to ALLOW, permitting framing attacks",
      location: { url },
      impact: "Site can be embedded in iframes, enabling clickjacking attacks",
      recommendation: "Set X-Frame-Options to DENY or SAMEORIGIN",
      references: [
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: xfo,
      },
      metadata: {},
    };
  }

  /**
   * Create weak HSTS vulnerability
   */
  private createWeakHSTSVulnerability(
    url: string,
    hsts: string,
    maxAge: number,
  ): Vulnerability {
    return {
      id: `header_weak_hsts_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "medium" as SeverityLevel,
      title: "Weak HSTS Configuration",
      description: `HSTS max-age is ${maxAge} seconds (less than recommended 1 year)`,
      location: { url },
      impact: "Users may be vulnerable to man-in-the-middle attacks",
      recommendation:
        "Increase max-age to at least 31536000 (1 year). Add includeSubDomains",
      references: [
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: hsts,
        maxAge,
      },
      metadata: {},
    };
  }

  /**
   * Create server header vulnerability
   */
  private createServerHeaderVulnerability(
    url: string,
    server: string,
  ): Vulnerability {
    return {
      id: `header_server_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "low" as SeverityLevel,
      title: "Server Header Information Disclosure",
      description: "Server header reveals server software and version",
      location: { url },
      impact:
        "Attackers can identify server software and target known vulnerabilities",
      recommendation: "Remove or obfuscate Server header",
      references: [
        "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: server,
      },
      metadata: {},
    };
  }

  /**
   * Create X-Powered-By header vulnerability
   */
  private createPoweredByHeaderVulnerability(
    url: string,
    poweredBy: string,
  ): Vulnerability {
    return {
      id: `header_poweredby_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "low" as SeverityLevel,
      title: "X-Powered-By Header Information Disclosure",
      description: "X-Powered-By header reveals technology stack",
      location: { url },
      impact:
        "Attackers can identify framework and target known vulnerabilities",
      recommendation: "Remove X-Powered-By header",
      references: ["https://owasp.org/www-project-secure-headers/"],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: poweredBy,
      },
      metadata: {},
    };
  }

  /**
   * Create weak CORS vulnerability
   */
  private createWeakCORSVulnerability(
    url: string,
    cors: string,
  ): Vulnerability {
    return {
      id: `header_cors_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: "insecure_headers" as VulnerabilityType,
      severity: "medium" as SeverityLevel,
      title: "Overly Permissive CORS Policy",
      description: "Access-Control-Allow-Origin set to wildcard (*)",
      location: { url },
      impact:
        "Any website can make requests to your API, potentially leaking sensitive data",
      recommendation:
        "Specify allowed origins explicitly. Avoid using wildcard for authenticated endpoints",
      references: [
        "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
        "https://owasp.org/www-community/attacks/Cross-Site_Request_Forgery_(CSRF)",
      ],
      discoveredAt: new Date(),
      status: "new",
      evidence: {
        currentValue: cors,
      },
      metadata: {},
    };
  }

  /**
   * Get severity for missing header
   */
  private getHeaderSeverity(headerName: string): SeverityLevel {
    const severityMap: Record<string, SeverityLevel> = {
      "content-security-policy": SeverityLevel.HIGH,
      "x-frame-options": SeverityLevel.MEDIUM,
      "x-content-type-options": SeverityLevel.MEDIUM,
      "strict-transport-security": SeverityLevel.HIGH,
      "referrer-policy": SeverityLevel.LOW,
      "permissions-policy": SeverityLevel.LOW,
    };

    return severityMap[headerName] || SeverityLevel.MEDIUM;
  }
}
