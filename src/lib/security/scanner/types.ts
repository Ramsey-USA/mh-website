/**
 * Vulnerability Scanner Types
 * Shared interfaces and enums for security scanning
 */

// Vulnerability Types
export enum VulnerabilityType {
  // Web Application Vulnerabilities
  XSS = "cross_site_scripting",
  SQL_INJECTION = "sql_injection",
  CSRF = "cross_site_request_forgery",
  DIRECTORY_TRAVERSAL = "directory_traversal",
  COMMAND_INJECTION = "command_injection",

  // Configuration Vulnerabilities
  WEAK_CIPHER = "weak_cipher",
  INSECURE_HEADERS = "insecure_headers",
  MISSING_SECURITY_HEADERS = "missing_security_headers",
  EXPOSED_SENSITIVE_DATA = "exposed_sensitive_data",
  WEAK_SESSION_CONFIG = "weak_session_config",
  INSECURE_COOKIES = "insecure_cookies",

  // Infrastructure Vulnerabilities
  OUTDATED_DEPENDENCIES = "outdated_dependencies",
  WEAK_SSL_CONFIG = "weak_ssl_config",
  OPEN_PORTS = "open_ports",
  WEAK_PASSWORDS = "weak_passwords",
  MISSING_SECURITY_UPDATES = "missing_security_updates",

  // Access Control Vulnerabilities
  PRIVILEGE_ESCALATION = "privilege_escalation",
  BROKEN_ACCESS_CONTROL = "broken_access_control",
  INSECURE_DIRECT_OBJECT_REFERENCE = "insecure_direct_object_reference",
  MISSING_AUTHORIZATION = "missing_authorization",

  // Data Vulnerabilities
  SENSITIVE_DATA_EXPOSURE = "sensitive_data_exposure",
  INSUFFICIENT_ENCRYPTION = "insufficient_encryption",
  DATA_VALIDATION_BYPASS = "data_validation_bypass",

  // API Vulnerabilities
  BROKEN_API_AUTHENTICATION = "broken_api_authentication",
  EXCESSIVE_DATA_EXPOSURE = "excessive_data_exposure",
  RATE_LIMITING_MISSING = "rate_limiting_missing",

  // Client-Side Vulnerabilities
  INSECURE_CLIENT_STORAGE = "insecure_client_storage",
  CLIENT_SIDE_INJECTION = "client_side_injection",
  CORS_MISCONFIGURATION = "cors_misconfiguration",
}

// Severity Levels
export enum SeverityLevel {
  INFO = "info",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Vulnerability Interface
export interface Vulnerability {
  id: string;
  type: VulnerabilityType;
  severity: SeverityLevel;
  title: string;
  description: string;
  location: {
    file?: string;
    line?: number;
    url?: string;
    component?: string;
  };
  impact: string;
  recommendation: string;
  references: string[];
  discoveredAt: Date;
  status: "new" | "acknowledged" | "fixed" | "false_positive";
  cvss?: {
    score: number;
    vector: string;
  };
  evidence?: {
    payload?: string;
    response?: string;
    headers?: Record<string, string>;
    screenshots?: string[];
    error?: string;
    package?: string;
    version?: string;
    matches?: string[];
    requestCount?: number;
    successfulRequests?: number;
    cookie?: string;
    status?: number;
    [key: string]: any;
  };
  metadata: Record<string, any>;
}

// Scan Configuration
export interface ScanConfig {
  targets: {
    urls?: string[];
    files?: string[];
    apis?: string[];
  };
  scanTypes: VulnerabilityType[];
  depth?: number;
  timeout?: number;
  maxConcurrent?: number;
  userAgent?: string;
  customHeaders?: Record<string, string>;
  followRedirects?: boolean;
  checkSSL?: boolean;
  aggressive?: boolean;
  excludePatterns?: string[];
  method?: string;
  body?: string;
  authentication?: {
    type: "basic" | "bearer" | "cookie";
    credentials: Record<string, string>;
  };
}

// Scan Result
export interface ScanResult {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  config: ScanConfig;
  vulnerabilities: Vulnerability[];
  summary: ScanSummary;
  coverage: ScanCoverage;
  metadata: Record<string, any>;
}

export interface ScanSummary {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
  topVulnerabilities: Array<{ type: VulnerabilityType; count: number }>;
}

export interface ScanCoverage {
  urlsTested: number;
  filesTested: number;
  testCases: number;
  successRate: number;
}

// Request Config for HTTP requests
export interface RequestConfig {
  timeout?: number;
  userAgent?: string;
  customHeaders?: Record<string, string>;
  followRedirects?: boolean;
  checkSSL?: boolean;
}

// HTTP Response
export interface HttpResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
  url?: string;
}
