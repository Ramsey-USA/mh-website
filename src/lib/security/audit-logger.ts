/**
 * Security Audit Logging System
 * Comprehensive logging and monitoring for security events
 */

import { logger } from "@/lib/utils/logger";
import { SecurityConfig } from "./security-manager";

// Audit Event Types
export enum AuditEventType {
  // Authentication Events
  LOGIN_SUCCESS = "login_success",
  LOGIN_FAILURE = "login_failure",
  LOGOUT = "logout",
  PASSWORD_CHANGE = "password_change",
  ACCOUNT_LOCKED = "account_locked",

  // Authorization Events
  ACCESS_GRANTED = "access_granted",
  ACCESS_DENIED = "access_denied",
  PERMISSION_ESCALATION = "permission_escalation",

  // Security Events
  RATE_LIMIT_EXCEEDED = "rate_limit_exceeded",
  CSRF_TOKEN_INVALID = "csrf_token_invalid",
  XSS_ATTEMPT = "xss_attempt",
  SQL_INJECTION_ATTEMPT = "sql_injection_attempt",
  FILE_UPLOAD_BLOCKED = "file_upload_blocked",

  // System Events
  SECURITY_SCAN_STARTED = "security_scan_started",
  SECURITY_SCAN_COMPLETED = "security_scan_completed",
  VULNERABILITY_DETECTED = "vulnerability_detected",
  SECURITY_UPDATE_APPLIED = "security_update_applied",

  // Data Events
  DATA_ACCESS = "data_access",
  DATA_MODIFICATION = "data_modification",
  DATA_EXPORT = "data_export",
  DATA_DELETION = "data_deletion",

  // Network Events
  SUSPICIOUS_TRAFFIC = "suspicious_traffic",
  BLACKLISTED_IP = "blacklisted_ip",
  GEOLOCATION_ANOMALY = "geolocation_anomaly",

  // Application Events
  ERROR_OCCURRED = "error_occurred",
  CONFIGURATION_CHANGED = "configuration_changed",
  BACKUP_CREATED = "backup_created",
  BACKUP_RESTORED = "backup_restored",
}

// Risk Levels
export enum RiskLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

// Audit Event Interface
export interface AuditEvent {
  id: string;
  timestamp: Date;
  eventType: AuditEventType;
  riskLevel: RiskLevel;
  source: string;
  userAgent?: string;
  ipAddress?: string;
  userId?: string;
  sessionId?: string;
  resource?: string;
  action?: string;
  outcome: "success" | "failure" | "warning";
  details: Record<string, any>;
  metadata: {
    userLocation?: {
      country?: string;
      region?: string;
      city?: string;
    };
    deviceInfo?: {
      type?: string;
      os?: string;
      browser?: string;
    };
    requestInfo?: {
      method?: string;
      url?: string;
      headers?: Record<string, string>;
    };
  };
  tags: string[];
}

// Audit Query Interface
export interface AuditQuery {
  eventTypes?: AuditEventType[];
  riskLevels?: RiskLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  userId?: string;
  ipAddress?: string;
  outcome?: "success" | "failure" | "warning";
  tags?: string[];
  limit?: number;
  offset?: number;
  sortBy?: "timestamp" | "riskLevel";
  sortOrder?: "asc" | "desc";
}

// Audit Statistics Interface
export interface AuditStatistics {
  totalEvents: number;
  eventsByType: Record<AuditEventType, number>;
  eventsByRiskLevel: Record<RiskLevel, number>;
  eventsByOutcome: Record<string, number>;
  topIPAddresses: Array<{ ip: string; count: number }>;
  topUsers: Array<{ userId: string; count: number }>;
  timelineData: Array<{
    date: string;
    events: number;
    riskScore: number;
  }>;
  anomalies: Array<{
    type: string;
    description: string;
    timestamp: Date;
    severity: RiskLevel;
  }>;
}

/**
 * Audit Logger Class
 */
export class AuditLogger {
  private events: AuditEvent[] = [];
  private config: SecurityConfig["audit"];
  private maxEvents: number = 10000; // In-memory limit

  constructor(config: SecurityConfig["audit"]) {
    this.config = config;
    this.setupCleanup();
  }

  /**
   * Log an audit event
   */
  async logEvent(
    eventType: AuditEventType,
    details: Partial<AuditEvent>,
  ): Promise<void> {
    // Skip if logging is disabled for this event type
    if (!this.shouldLog(eventType, details.outcome)) {
      return;
    }

    const event: AuditEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      eventType,
      riskLevel: this.calculateRiskLevel(eventType, details),
      source: details.source || "system",
      userAgent: details.userAgent,
      ipAddress: this.maskSensitiveData(details.ipAddress),
      userId: details.userId,
      sessionId: details.sessionId,
      resource: details.resource,
      action: details.action,
      outcome: details.outcome || "success",
      details: this.sanitizeDetails(details.details || {}),
      metadata: details.metadata || {},
      tags: details.tags || [],
    };

    // Add to in-memory store
    this.events.push(event);

    // Maintain size limit
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      logger.log("[LOCK] Security Audit Event:", {
        type: event.eventType,
        risk: event.riskLevel,
        outcome: event.outcome,
        ip: event.ipAddress,
        details: event.details,
      });
    }

    // Send to external logging service if configured
    await this.sendToExternalLogger(event);
  }

  /**
   * Query audit events
   */
  async queryEvents(query: AuditQuery): Promise<AuditEvent[]> {
    let filteredEvents = [...this.events];

    // Filter by event types
    if (query.eventTypes && query.eventTypes.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        query.eventTypes!.includes(event.eventType),
      );
    }

    // Filter by risk levels
    if (query.riskLevels && query.riskLevels.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        query.riskLevels!.includes(event.riskLevel),
      );
    }

    // Filter by date range
    if (query.dateRange) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.timestamp >= query.dateRange!.start &&
          event.timestamp <= query.dateRange!.end,
      );
    }

    // Filter by user ID
    if (query.userId) {
      filteredEvents = filteredEvents.filter(
        (event) => event.userId === query.userId,
      );
    }

    // Filter by IP address
    if (query.ipAddress) {
      filteredEvents = filteredEvents.filter(
        (event) => event.ipAddress === query.ipAddress,
      );
    }

    // Filter by outcome
    if (query.outcome) {
      filteredEvents = filteredEvents.filter(
        (event) => event.outcome === query.outcome,
      );
    }

    // Filter by tags
    if (query.tags && query.tags.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        query.tags!.some((tag) => event.tags.includes(tag)),
      );
    }

    // Sort results
    const sortBy = query.sortBy || "timestamp";
    const sortOrder = query.sortOrder || "desc";

    filteredEvents.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "timestamp") {
        comparison = a.timestamp.getTime() - b.timestamp.getTime();
      } else if (sortBy === "riskLevel") {
        const riskOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        comparison = riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    // Apply pagination
    const offset = query.offset || 0;
    const limit = query.limit || 100;

    return filteredEvents.slice(offset, offset + limit);
  }

  /**
   * Get audit statistics
   */
  async getStatistics(dateRange?: {
    start: Date;
    end: Date;
  }): Promise<AuditStatistics> {
    let events = this.events;

    if (dateRange) {
      events = events.filter(
        (event) =>
          event.timestamp >= dateRange.start &&
          event.timestamp <= dateRange.end,
      );
    }

    // Event counts by type
    const eventsByType: Record<AuditEventType, number> = {} as any;
    Object.values(AuditEventType).forEach((type) => {
      eventsByType[type] = 0;
    });

    // Event counts by risk level
    const eventsByRiskLevel: Record<RiskLevel, number> = {
      [RiskLevel.LOW]: 0,
      [RiskLevel.MEDIUM]: 0,
      [RiskLevel.HIGH]: 0,
      [RiskLevel.CRITICAL]: 0,
    };

    // Event counts by outcome
    const eventsByOutcome: Record<string, number> = {
      success: 0,
      failure: 0,
      warning: 0,
    };

    // IP address counts
    const ipCounts: Record<string, number> = {};

    // User counts
    const userCounts: Record<string, number> = {};

    // Process events
    events.forEach((event) => {
      eventsByType[event.eventType]++;
      eventsByRiskLevel[event.riskLevel]++;
      eventsByOutcome[event.outcome]++;

      if (event.ipAddress) {
        ipCounts[event.ipAddress] = (ipCounts[event.ipAddress] || 0) + 1;
      }

      if (event.userId) {
        userCounts[event.userId] = (userCounts[event.userId] || 0) + 1;
      }
    });

    // Top IP addresses
    const topIPAddresses = Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));

    // Top users
    const topUsers = Object.entries(userCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([userId, count]) => ({ userId, count }));

    // Timeline data (last 30 days)
    const timelineData = this.generateTimelineData(events);

    // Anomaly detection
    const anomalies = this.detectAnomalies(events);

    return {
      totalEvents: events.length,
      eventsByType,
      eventsByRiskLevel,
      eventsByOutcome,
      topIPAddresses,
      topUsers,
      timelineData,
      anomalies,
    };
  }

  /**
   * Log authentication event
   */
  async logAuthEvent(
    type: "success" | "failure",
    userId?: string,
    ipAddress?: string,
    userAgent?: string,
    details?: Record<string, any>,
  ): Promise<void> {
    await this.logEvent(
      type === "success"
        ? AuditEventType.LOGIN_SUCCESS
        : AuditEventType.LOGIN_FAILURE,
      {
        userId,
        ipAddress,
        userAgent,
        outcome: type === "success" ? "success" : "failure",
        details,
        tags: ["authentication"],
      },
    );
  }

  /**
   * Log security violation
   */
  async logSecurityViolation(
    violationType: AuditEventType,
    ipAddress?: string,
    userAgent?: string,
    details?: Record<string, any>,
  ): Promise<void> {
    await this.logEvent(violationType, {
      ipAddress,
      userAgent,
      outcome: "failure",
      details,
      tags: ["security", "violation"],
    });
  }

  /**
   * Log data access
   */
  async logDataAccess(
    resource: string,
    action: string,
    userId?: string,
    outcome: "success" | "failure" = "success",
    details?: Record<string, any>,
  ): Promise<void> {
    await this.logEvent(AuditEventType.DATA_ACCESS, {
      resource,
      action,
      userId,
      outcome,
      details,
      tags: ["data", "access"],
    });
  }

  /**
   * Export audit logs
   */
  async exportLogs(
    query: AuditQuery,
    format: "json" | "csv" = "json",
  ): Promise<string> {
    const events = await this.queryEvents(query);

    if (format === "csv") {
      return this.exportToCSV(events);
    }

    return JSON.stringify(events, null, 2);
  }

  // Private methods

  private shouldLog(eventType: AuditEventType, outcome?: string): boolean {
    if (outcome === "failure" && this.config.logFailedAttempts) {
      return true;
    }

    if (outcome === "success" && this.config.logSuccessfulRequests) {
      return true;
    }

    // Always log high-risk events
    const highRiskEvents = [
      AuditEventType.CSRF_TOKEN_INVALID,
      AuditEventType.XSS_ATTEMPT,
      AuditEventType.SQL_INJECTION_ATTEMPT,
      AuditEventType.VULNERABILITY_DETECTED,
      AuditEventType.SUSPICIOUS_TRAFFIC,
    ];

    return highRiskEvents.includes(eventType);
  }

  private calculateRiskLevel(
    eventType: AuditEventType,
    details: Partial<AuditEvent>,
  ): RiskLevel {
    // Critical risk events
    const criticalEvents = [
      AuditEventType.SQL_INJECTION_ATTEMPT,
      AuditEventType.XSS_ATTEMPT,
      AuditEventType.VULNERABILITY_DETECTED,
      AuditEventType.ACCOUNT_LOCKED,
    ];

    // High risk events
    const highRiskEvents = [
      AuditEventType.CSRF_TOKEN_INVALID,
      AuditEventType.PERMISSION_ESCALATION,
      AuditEventType.SUSPICIOUS_TRAFFIC,
      AuditEventType.LOGIN_FAILURE,
    ];

    // Medium risk events
    const mediumRiskEvents = [
      AuditEventType.RATE_LIMIT_EXCEEDED,
      AuditEventType.ACCESS_DENIED,
      AuditEventType.FILE_UPLOAD_BLOCKED,
    ];

    if (criticalEvents.includes(eventType)) {
      return RiskLevel.CRITICAL;
    }

    if (highRiskEvents.includes(eventType)) {
      return RiskLevel.HIGH;
    }

    if (mediumRiskEvents.includes(eventType)) {
      return RiskLevel.MEDIUM;
    }

    return RiskLevel.LOW;
  }

  private generateEventId(): string {
    return `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private maskSensitiveData(data?: string): string | undefined {
    if (!data || !this.config.sensitiveDataMasking) {
      return data;
    }

    // Mask IP addresses (keep first two octets)
    if (data.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      const parts = data.split(".");
      return `${parts[0]}.${parts[1]}.*.***`;
    }

    return data;
  }

  private sanitizeDetails(details: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(details)) {
      // Remove sensitive fields
      const sensitiveFields = [
        "password",
        "token",
        "key",
        "secret",
        "credential",
      ];
      if (sensitiveFields.some((field) => key.toLowerCase().includes(field))) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  private async sendToExternalLogger(event: AuditEvent): Promise<void> {
    // In a real implementation, this would send to external logging services
    // like Elasticsearch, Splunk, or cloud logging services
    // For now, we'll just store locally
    // TODO: Implement external logging integration
  }

  private setupCleanup(): void {
    // Clean up old events periodically
    setInterval(
      () => {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);

        this.events = this.events.filter(
          (event) => event.timestamp > cutoffDate,
        );
      },
      24 * 60 * 60 * 1000,
    ); // Run daily
  }

  private generateTimelineData(events: AuditEvent[]): Array<{
    date: string;
    events: number;
    riskScore: number;
  }> {
    const timeline: Record<string, { events: number; riskScore: number }> = {};

    events.forEach((event) => {
      const date = event.timestamp.toISOString().split("T")[0];

      if (!timeline[date]) {
        timeline[date] = { events: 0, riskScore: 0 };
      }

      timeline[date].events++;

      // Calculate risk score
      const riskScores = {
        [RiskLevel.LOW]: 1,
        [RiskLevel.MEDIUM]: 3,
        [RiskLevel.HIGH]: 7,
        [RiskLevel.CRITICAL]: 10,
      };

      timeline[date].riskScore += riskScores[event.riskLevel];
    });

    return Object.entries(timeline)
      .map(([date, data]) => ({
        date,
        events: data.events,
        riskScore: Math.round(data.riskScore / data.events),
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private detectAnomalies(events: AuditEvent[]): Array<{
    type: string;
    description: string;
    timestamp: Date;
    severity: RiskLevel;
  }> {
    const anomalies: Array<{
      type: string;
      description: string;
      timestamp: Date;
      severity: RiskLevel;
    }> = [];

    // Detect unusual login patterns
    const loginFailures = events.filter(
      (e) => e.eventType === AuditEventType.LOGIN_FAILURE,
    );
    const recentFailures = loginFailures.filter(
      (e) => Date.now() - e.timestamp.getTime() < 60 * 60 * 1000, // Last hour
    );

    if (recentFailures.length > 10) {
      anomalies.push({
        type: "brute_force",
        description: `${recentFailures.length} login failures in the last hour`,
        timestamp: new Date(),
        severity: RiskLevel.HIGH,
      });
    }

    // Detect unusual IP activity
    const ipActivity: Record<string, number> = {};
    events
      .filter((e) => e.ipAddress)
      .forEach((e) => {
        ipActivity[e.ipAddress!] = (ipActivity[e.ipAddress!] || 0) + 1;
      });

    Object.entries(ipActivity).forEach(([ip, count]) => {
      if (count > 100) {
        anomalies.push({
          type: "suspicious_ip",
          description: `IP ${ip} generated ${count} events`,
          timestamp: new Date(),
          severity: RiskLevel.MEDIUM,
        });
      }
    });

    return anomalies;
  }

  private exportToCSV(events: AuditEvent[]): string {
    const headers = [
      "ID",
      "Timestamp",
      "Event Type",
      "Risk Level",
      "Source",
      "IP Address",
      "User ID",
      "Outcome",
      "Details",
    ];

    const rows = events.map((event) => [
      event.id,
      event.timestamp.toISOString(),
      event.eventType,
      event.riskLevel,
      event.source,
      event.ipAddress || "",
      event.userId || "",
      event.outcome,
      JSON.stringify(event.details),
    ]);

    return [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");
  }
}

// Export singleton instance
export const auditLogger = new AuditLogger({
  logFailedAttempts: true,
  logSuccessfulRequests: false,
  sensitiveDataMasking: true,
  retentionDays: 90,
});
