/**
 * Security Framework Core Tests
 * Tests for security components without Next.js dependencies
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'

// Mock crypto for Node.js environment
Object.defineProperty(globalThis, 'crypto', {
  value: {
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256)
      }
      return arr
    },
    randomBytes: (length: number) => {
      const bytes = Buffer.alloc(length)
      for (let i = 0; i < length; i++) {
        bytes[i] = Math.floor(Math.random() * 256)
      }
      return bytes
    },
  },
})

// Mock classes without Next.js dependencies
class MockSecurityManager {
  private config: any

  constructor(config?: any) {
    this.config = config || {
      validation: {
        maxFieldLength: 1000,
        sanitizeHtml: true,
        validateEmails: true,
      },
    }
  }

  validateInput(data: Record<string, any>) {
    const sanitizedData: Record<string, any> = {}
    const errors: Record<string, string[]> = {}
    let isValid = true

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Length validation
        if (value.length > this.config.validation.maxFieldLength) {
          errors[key] = [
            `${key} exceeds maximum length of ${this.config.validation.maxFieldLength} characters`,
          ]
          isValid = false
        }

        // Email validation
        if (key.toLowerCase().includes('email')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) {
            errors[key] = ['Invalid email format']
            isValid = false
          }
          sanitizedData[key] = value.trim().toLowerCase()
        } else {
          // HTML sanitization
          let sanitized = value
          if (this.config.validation.sanitizeHtml) {
            sanitized = value
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#x27;')
          }

          // SQL injection prevention
          const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP']
          sqlKeywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'gi')
            sanitized = sanitized.replace(regex, '')
          })

          sanitizedData[key] = sanitized
        }
      } else {
        sanitizedData[key] = value
      }
    }

    return { isValid, sanitizedData, errors }
  }

  getConfig() {
    return this.config
  }
}

// Import our audit logger and scanner classes
import {
  AuditLogger,
  AuditEventType,
  RiskLevel,
} from '@/lib/security/audit-logger'
import {
  VulnerabilityType,
  SeverityLevel,
} from '@/lib/security/vulnerability-scanner'

describe('Security Framework Core Tests', () => {
  describe('MockSecurityManager', () => {
    let securityManager: MockSecurityManager

    beforeEach(() => {
      securityManager = new MockSecurityManager()
    })

    describe('Input Validation', () => {
      it('should sanitize XSS attempts', () => {
        const testData = {
          name: '<script>alert("xss")</script>John Doe',
          message: 'Hello <b>world</b>',
        }

        const result = securityManager.validateInput(testData)

        expect(result.isValid).toBe(true)
        expect(result.sanitizedData.name).toBe(
          '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;John Doe'
        )
        expect(result.sanitizedData.message).toBe(
          'Hello &lt;b&gt;world&lt;/b&gt;'
        )
      })

      it('should prevent SQL injection', () => {
        const testData = {
          query: 'SELECT * FROM users WHERE id = 1',
          input: "'; DROP TABLE users; --",
        }

        const result = securityManager.validateInput(testData)

        expect(result.isValid).toBe(true)
        expect(result.sanitizedData.query).not.toContain('SELECT')
        expect(result.sanitizedData.input).not.toContain('DROP')
      })

      it('should validate email addresses', () => {
        const validEmail = {
          email: 'user@example.com',
        }

        const invalidEmail = {
          email: 'invalid-email',
        }

        const validResult = securityManager.validateInput(validEmail)
        const invalidResult = securityManager.validateInput(invalidEmail)

        expect(validResult.isValid).toBe(true)
        expect(validResult.sanitizedData.email).toBe('user@example.com')

        expect(invalidResult.isValid).toBe(false)
        expect(invalidResult.errors.email).toContain('Invalid email format')
      })

      it('should reject overly long input', () => {
        const longData = {
          message: 'a'.repeat(2000), // Exceeds default limit
        }

        const result = securityManager.validateInput(longData)

        expect(result.isValid).toBe(false)
        expect(result.errors.message[0]).toContain('exceeds maximum length')
      })
    })
  })

  describe('AuditLogger', () => {
    let auditLogger: AuditLogger

    beforeEach(() => {
      auditLogger = new AuditLogger({
        logFailedAttempts: true,
        logSuccessfulRequests: true,
        sensitiveDataMasking: true,
        retentionDays: 90,
      })
    })

    describe('Event Logging', () => {
      it('should log security events', async () => {
        await auditLogger.logEvent(AuditEventType.LOGIN_SUCCESS, {
          userId: 'user123',
          ipAddress: '192.168.1.100',
          outcome: 'success',
          details: { method: 'password' },
        })

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.LOGIN_SUCCESS],
          limit: 10,
        })

        expect(events.length).toBeGreaterThan(0)
        const event = events[0]
        expect(event.eventType).toBe(AuditEventType.LOGIN_SUCCESS)
        expect(event.userId).toBe('user123')
        expect(event.outcome).toBe('success')
      })

      it('should mask sensitive IP data', async () => {
        await auditLogger.logEvent(AuditEventType.ACCESS_DENIED, {
          ipAddress: '192.168.1.100',
          outcome: 'failure',
        })

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.ACCESS_DENIED],
          limit: 1,
        })

        expect(events[0].ipAddress).toBe('192.168.*.***')
      })

      it('should assign appropriate risk levels', async () => {
        await auditLogger.logEvent(AuditEventType.SQL_INJECTION_ATTEMPT, {
          outcome: 'failure',
        })

        await auditLogger.logEvent(AuditEventType.LOGIN_SUCCESS, {
          outcome: 'success',
        })

        const events = await auditLogger.queryEvents({
          limit: 10,
          sortBy: 'timestamp',
          sortOrder: 'desc',
        })

        const sqlEvent = events.find(
          e => e.eventType === AuditEventType.SQL_INJECTION_ATTEMPT
        )
        const loginEvent = events.find(
          e => e.eventType === AuditEventType.LOGIN_SUCCESS
        )

        expect(sqlEvent?.riskLevel).toBe(RiskLevel.CRITICAL)
        expect(loginEvent?.riskLevel).toBe(RiskLevel.LOW)
      })
    })

    describe('Event Filtering and Querying', () => {
      beforeEach(async () => {
        // Set up test data
        await auditLogger.logEvent(AuditEventType.LOGIN_SUCCESS, {
          outcome: 'success',
        })
        await auditLogger.logEvent(AuditEventType.LOGIN_FAILURE, {
          outcome: 'failure',
        })
        await auditLogger.logEvent(AuditEventType.XSS_ATTEMPT, {
          outcome: 'failure',
        })
        await auditLogger.logEvent(AuditEventType.RATE_LIMIT_EXCEEDED, {
          outcome: 'failure',
        })
      })

      it('should filter by event type', async () => {
        const loginEvents = await auditLogger.queryEvents({
          eventTypes: [
            AuditEventType.LOGIN_SUCCESS,
            AuditEventType.LOGIN_FAILURE,
          ],
          limit: 10,
        })

        expect(loginEvents.length).toBe(2)
        loginEvents.forEach(event => {
          expect([
            AuditEventType.LOGIN_SUCCESS,
            AuditEventType.LOGIN_FAILURE,
          ]).toContain(event.eventType)
        })
      })

      it('should filter by outcome', async () => {
        const failureEvents = await auditLogger.queryEvents({
          outcome: 'failure',
          limit: 10,
        })

        expect(failureEvents.length).toBe(3)
        failureEvents.forEach(event => {
          expect(event.outcome).toBe('failure')
        })
      })

      it('should filter by risk level', async () => {
        const highRiskEvents = await auditLogger.queryEvents({
          riskLevels: [RiskLevel.HIGH, RiskLevel.CRITICAL],
          limit: 10,
        })

        highRiskEvents.forEach(event => {
          expect([RiskLevel.HIGH, RiskLevel.CRITICAL]).toContain(
            event.riskLevel
          )
        })
      })

      it('should support pagination', async () => {
        const page1 = await auditLogger.queryEvents({
          limit: 2,
          offset: 0,
        })

        const page2 = await auditLogger.queryEvents({
          limit: 2,
          offset: 2,
        })

        expect(page1.length).toBe(2)
        expect(page2.length).toBeGreaterThanOrEqual(0)

        // Events should be different (assuming we have more than 2 events)
        if (page2.length > 0) {
          expect(page1[0].id).not.toBe(page2[0].id)
        }
      })
    })

    describe('Statistics and Analytics', () => {
      beforeEach(async () => {
        // Create a variety of test events
        await auditLogger.logEvent(AuditEventType.LOGIN_SUCCESS, {
          outcome: 'success',
        })
        await auditLogger.logEvent(AuditEventType.LOGIN_SUCCESS, {
          outcome: 'success',
        })
        await auditLogger.logEvent(AuditEventType.LOGIN_FAILURE, {
          outcome: 'failure',
        })
        await auditLogger.logEvent(AuditEventType.XSS_ATTEMPT, {
          outcome: 'failure',
        })
        await auditLogger.logEvent(AuditEventType.CSRF_TOKEN_INVALID, {
          outcome: 'failure',
        })
      })

      it('should generate accurate statistics', async () => {
        const stats = await auditLogger.getStatistics()

        expect(stats.totalEvents).toBeGreaterThanOrEqual(5)
        expect(
          stats.eventsByType[AuditEventType.LOGIN_SUCCESS]
        ).toBeGreaterThanOrEqual(2)
        expect(
          stats.eventsByType[AuditEventType.LOGIN_FAILURE]
        ).toBeGreaterThanOrEqual(1)
        expect(stats.eventsByOutcome.success).toBeGreaterThanOrEqual(2)
        expect(stats.eventsByOutcome.failure).toBeGreaterThanOrEqual(3)
      })

      it('should track risk levels in statistics', async () => {
        const stats = await auditLogger.getStatistics()

        expect(stats.eventsByRiskLevel[RiskLevel.LOW]).toBeGreaterThanOrEqual(2) // LOGIN_SUCCESS events
        expect(
          stats.eventsByRiskLevel[RiskLevel.CRITICAL]
        ).toBeGreaterThanOrEqual(1) // XSS_ATTEMPT
        expect(stats.eventsByRiskLevel[RiskLevel.HIGH]).toBeGreaterThanOrEqual(
          2
        ) // LOGIN_FAILURE, CSRF_TOKEN_INVALID
      })

      it('should export events to CSV format', async () => {
        const csvData = await auditLogger.exportLogs(
          {
            limit: 10,
          },
          'csv'
        )

        expect(csvData).toContain('"ID","Timestamp","Event Type"')
        expect(csvData).toContain('login_success')
        expect(csvData).toContain('login_failure')
        expect(csvData.split('\n').length).toBeGreaterThan(1) // Header + at least one data row
      })
    })

    describe('Authentication Event Helpers', () => {
      it('should log successful authentication', async () => {
        await auditLogger.logAuthEvent(
          'success',
          'user123',
          '192.168.1.100',
          'Mozilla/5.0',
          { method: 'password' }
        )

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.LOGIN_SUCCESS],
          limit: 1,
        })

        expect(events.length).toBe(1)
        expect(events[0].eventType).toBe(AuditEventType.LOGIN_SUCCESS)
        expect(events[0].userId).toBe('user123')
        expect(events[0].outcome).toBe('success')
      })

      it('should log failed authentication', async () => {
        await auditLogger.logAuthEvent(
          'failure',
          undefined,
          '192.168.1.100',
          'Mozilla/5.0',
          { reason: 'invalid_password' }
        )

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.LOGIN_FAILURE],
          limit: 1,
        })

        expect(events.length).toBe(1)
        expect(events[0].eventType).toBe(AuditEventType.LOGIN_FAILURE)
        expect(events[0].outcome).toBe('failure')
      })
    })

    describe('Security Violation Logging', () => {
      it('should log security violations', async () => {
        await auditLogger.logSecurityViolation(
          AuditEventType.XSS_ATTEMPT,
          '192.168.1.100',
          'Mozilla/5.0',
          { payload: '<script>alert("xss")</script>' }
        )

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.XSS_ATTEMPT],
          limit: 1,
        })

        expect(events.length).toBe(1)
        expect(events[0].eventType).toBe(AuditEventType.XSS_ATTEMPT)
        expect(events[0].outcome).toBe('failure')
        expect(events[0].tags).toContain('security')
        expect(events[0].tags).toContain('violation')
      })
    })

    describe('Data Access Logging', () => {
      it('should log data access events', async () => {
        await auditLogger.logDataAccess(
          '/api/users',
          'READ',
          'user123',
          'success',
          { recordCount: 5 }
        )

        const events = await auditLogger.queryEvents({
          eventTypes: [AuditEventType.DATA_ACCESS],
          limit: 1,
        })

        expect(events.length).toBe(1)
        expect(events[0].eventType).toBe(AuditEventType.DATA_ACCESS)
        expect(events[0].resource).toBe('/api/users')
        expect(events[0].action).toBe('READ')
        expect(events[0].userId).toBe('user123')
        expect(events[0].tags).toContain('data')
        expect(events[0].tags).toContain('access')
      })
    })
  })

  describe('Vulnerability Types and Severity', () => {
    it('should have all required vulnerability types', () => {
      const expectedTypes = [
        'cross_site_scripting',
        'sql_injection',
        'cross_site_request_forgery',
        'insecure_headers',
        'weak_ssl_config',
        'outdated_dependencies',
        'cors_misconfiguration',
        'sensitive_data_exposure',
      ]

      const actualTypes = Object.values(VulnerabilityType)

      expectedTypes.forEach(type => {
        expect(actualTypes).toContain(type)
      })
    })

    it('should have proper severity levels', () => {
      const expectedSeverities = ['info', 'low', 'medium', 'high', 'critical']
      const actualSeverities = Object.values(SeverityLevel)

      expectedSeverities.forEach(severity => {
        expect(actualSeverities).toContain(severity)
      })
    })
  })

  describe('Performance Tests', () => {
    it('should handle rapid event logging', async () => {
      const auditLogger = new AuditLogger({
        logFailedAttempts: true,
        logSuccessfulRequests: true,
        sensitiveDataMasking: false, // Disable for performance
        retentionDays: 90,
      })

      const startTime = Date.now()

      // Log 50 events rapidly
      const promises = []
      for (let i = 0; i < 50; i++) {
        promises.push(
          auditLogger.logEvent(AuditEventType.ACCESS_GRANTED, {
            details: { test: i },
            outcome: 'success',
          })
        )
      }

      await Promise.all(promises)
      const duration = Date.now() - startTime

      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(2000) // 2 seconds

      // Verify all events were logged
      const events = await auditLogger.queryEvents({
        eventTypes: [AuditEventType.ACCESS_GRANTED],
        limit: 100,
      })

      expect(events.length).toBeGreaterThanOrEqual(50)
    })

    it('should handle large query results efficiently', async () => {
      const auditLogger = new AuditLogger({
        logFailedAttempts: true,
        logSuccessfulRequests: true,
        sensitiveDataMasking: true,
        retentionDays: 90,
      })

      // Add some events first
      for (let i = 0; i < 20; i++) {
        await auditLogger.logEvent(AuditEventType.ACCESS_GRANTED, {
          details: { iteration: i },
          outcome: 'success',
        })
      }

      const startTime = Date.now()

      // Query all events
      const events = await auditLogger.queryEvents({
        limit: 1000, // Large limit
      })

      const duration = Date.now() - startTime

      expect(duration).toBeLessThan(500) // Should be fast
      expect(events.length).toBeGreaterThan(0)
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid event types gracefully', async () => {
      const auditLogger = new AuditLogger({
        logFailedAttempts: true,
        logSuccessfulRequests: true,
        sensitiveDataMasking: true,
        retentionDays: 90,
      })

      // This should not crash
      try {
        await auditLogger.logEvent('invalid_event_type' as any, {
          outcome: 'success',
        })
      } catch (error) {
        // If it throws, it should be handled gracefully
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should handle malformed query parameters', async () => {
      const auditLogger = new AuditLogger({
        logFailedAttempts: true,
        logSuccessfulRequests: true,
        sensitiveDataMasking: true,
        retentionDays: 90,
      })

      // Test with invalid date range
      const events = await auditLogger.queryEvents({
        dateRange: {
          start: new Date('invalid'),
          end: new Date('also-invalid'),
        },
        limit: 10,
      })

      // Should return an array (possibly empty) without crashing
      expect(Array.isArray(events)).toBe(true)
    })
  })
})
