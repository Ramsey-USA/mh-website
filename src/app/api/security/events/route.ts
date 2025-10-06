/**
 * Security Events API Endpoint
 * Provides access to security audit logs and events
 */

import { NextRequest, NextResponse } from 'next/server'
import { withSecurity } from '@/middleware/security'
import {
  auditLogger,
  AuditEventType,
  RiskLevel,
} from '@/lib/security/audit-logger'

async function handler(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    if (request.method === 'GET') {
      // Parse query parameters
      const eventTypes = searchParams.get('types')?.split(',') as
        | AuditEventType[]
        | undefined
      const riskLevels = searchParams.get('risk')?.split(',') as
        | RiskLevel[]
        | undefined
      const startDate = searchParams.get('start')
      const endDate = searchParams.get('end')
      const userId = searchParams.get('user') || undefined
      const ipAddress = searchParams.get('ip') || undefined
      const outcome = searchParams.get('outcome') as
        | 'success'
        | 'failure'
        | 'warning'
        | undefined
      const limit = parseInt(searchParams.get('limit') || '50')
      const offset = parseInt(searchParams.get('offset') || '0')
      const format = searchParams.get('format') || 'json'

      // Build query
      const query = {
        eventTypes,
        riskLevels,
        dateRange:
          startDate && endDate
            ? {
                start: new Date(startDate),
                end: new Date(endDate),
              }
            : undefined,
        userId,
        ipAddress,
        outcome,
        limit: Math.min(limit, 1000), // Cap at 1000
        offset,
        sortBy: 'timestamp' as const,
        sortOrder: 'desc' as const,
      }

      // Get events
      const events = await auditLogger.queryEvents(query)

      if (format === 'csv') {
        const csvData = await auditLogger.exportLogs(query, 'csv')
        return new NextResponse(csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="security-events.csv"',
          },
        })
      }

      // Return JSON
      return NextResponse.json({
        events: events.map(event => ({
          id: event.id,
          timestamp: event.timestamp.toISOString(),
          type: event.eventType,
          riskLevel: event.riskLevel,
          source: event.source,
          ipAddress: event.ipAddress,
          userId: event.userId,
          outcome: event.outcome,
          description: getEventDescription(event.eventType, event.details),
          details: event.details,
          tags: event.tags,
        })),
        pagination: {
          limit,
          offset,
          hasMore: events.length === limit,
        },
        query: {
          eventTypes,
          riskLevels,
          dateRange: query.dateRange,
          filters: { userId, ipAddress, outcome },
        },
      })
    }

    if (request.method === 'POST') {
      // Manual event logging (for testing or external integrations)
      const body = await request.json()
      const {
        eventType,
        details,
        riskLevel,
        source,
        userId,
        outcome = 'success',
      } = body

      if (!eventType || !Object.values(AuditEventType).includes(eventType)) {
        return NextResponse.json(
          { error: 'Invalid event type' },
          { status: 400 }
        )
      }

      await auditLogger.logEvent(eventType, {
        details: details || {},
        source: source || 'api',
        userId,
        outcome,
        tags: ['manual', 'api'],
      })

      return NextResponse.json({
        success: true,
        message: 'Event logged successfully',
      })
    }

    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
  } catch (error) {
    console.error('Security events API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to generate human-readable descriptions
function getEventDescription(
  eventType: AuditEventType,
  details: Record<string, any>
): string {
  switch (eventType) {
    case AuditEventType.LOGIN_SUCCESS:
      return 'User successfully logged in'
    case AuditEventType.LOGIN_FAILURE:
      return 'Failed login attempt'
    case AuditEventType.RATE_LIMIT_EXCEEDED:
      return `Rate limit exceeded for ${details.path || 'unknown endpoint'}`
    case AuditEventType.CSRF_TOKEN_INVALID:
      return 'Request rejected due to invalid CSRF token'
    case AuditEventType.XSS_ATTEMPT:
      return 'Cross-site scripting attempt detected'
    case AuditEventType.SQL_INJECTION_ATTEMPT:
      return 'SQL injection attempt detected'
    case AuditEventType.FILE_UPLOAD_BLOCKED:
      return `File upload blocked: ${details.fileName || 'unknown file'}`
    case AuditEventType.ACCESS_DENIED:
      return 'Access denied to protected resource'
    case AuditEventType.VULNERABILITY_DETECTED:
      return `Vulnerability detected: ${details.type || 'unknown'}`
    case AuditEventType.SECURITY_SCAN_STARTED:
      return 'Security scan initiated'
    case AuditEventType.SECURITY_SCAN_COMPLETED:
      return `Security scan completed with ${details.vulnerabilitiesFound || 0} vulnerabilities found`
    case AuditEventType.DATA_ACCESS:
      return `Data accessed: ${details.resource || 'unknown resource'}`
    case AuditEventType.DATA_MODIFICATION:
      return `Data modified: ${details.resource || 'unknown resource'}`
    case AuditEventType.SUSPICIOUS_TRAFFIC:
      return 'Suspicious network traffic detected'
    case AuditEventType.ERROR_OCCURRED:
      return `System error: ${details.error || 'unknown error'}`
    default:
      return 'Security event occurred'
  }
}

export const GET = withSecurity(handler)
export const POST = withSecurity(handler)
