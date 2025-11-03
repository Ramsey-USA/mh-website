/**
 * Security Status API Endpoint
 * Provides security metrics and status information
 */

import { NextRequest, NextResponse } from "next/server";
import { withSecurity } from "@/middleware/security";
import { auditLogger } from "@/lib/security/audit-logger";
import {
  VulnerabilityScanner,
  VulnerabilityType,
} from "@/lib/security/vulnerability-scanner";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function handler(request: NextRequest) {
  try {
    const scanner = new VulnerabilityScanner(auditLogger);

    if (request.method === "GET") {
      // Get security status and metrics
      const now = new Date();
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Get recent audit statistics
      const auditStats = await auditLogger.getStatistics({
        start: oneDayAgo,
        end: now,
      });

      // Get current vulnerabilities
      const vulnerabilities = scanner.getVulnerabilities();

      // Calculate security score
      const securityScore = calculateSecurityScore(auditStats, vulnerabilities);

      return NextResponse.json({
        timestamp: now.toISOString(),
        status: getSystemStatus(securityScore),
        securityScore,
        metrics: {
          totalEvents: auditStats.totalEvents,
          criticalVulnerabilities: vulnerabilities.filter(
            (v) => v.severity === "critical",
          ).length,
          highVulnerabilities: vulnerabilities.filter(
            (v) => v.severity === "high",
          ).length,
          activeThreats: auditStats.anomalies.length,
          lastScanTime: getLastScanTime(vulnerabilities),
        },
        trends: {
          events: calculateTrend(auditStats.timelineData, "events"),
          riskScore: calculateTrend(auditStats.timelineData, "riskScore"),
          vulnerabilities: calculateVulnerabilityTrend(vulnerabilities),
        },
        summary: {
          vulnerabilities: {
            total: vulnerabilities.length,
            bySeverity: vulnerabilities.reduce(
              (acc, v) => {
                acc[v.severity] = (acc[v.severity] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>,
            ),
            byStatus: vulnerabilities.reduce(
              (acc, v) => {
                acc[v.status] = (acc[v.status] || 0) + 1;
                return acc;
              },
              {} as Record<string, number>,
            ),
          },
          events: auditStats.eventsByType,
          anomalies: auditStats.anomalies.map((a) => ({
            type: a.type,
            severity: a.severity,
            description: a.description,
            timestamp: a.timestamp,
          })),
        },
      });
    }

    if (request.method === "POST") {
      // Trigger security scan
      const body = await request.json();
      const { scanType = "quick", targets } = body;

      if (scanType === "quick") {
        const url = targets?.url || "https://localhost:3000";
        const vulnerabilities = await scanner.quickScan(url);

        return NextResponse.json({
          scanId: `quick_${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: "quick",
          vulnerabilities: vulnerabilities.map((v) => ({
            id: v.id,
            type: v.type,
            severity: v.severity,
            title: v.title,
            description: v.description,
            location: v.location,
            recommendation: v.recommendation,
          })),
        });
      }

      // Full scan
      const scanConfig = {
        targets: targets || { urls: ["https://localhost:3000"] },
        scanTypes: Object.values(VulnerabilityType),
        depth: 2,
        timeout: 30000,
        userAgent: "MH-Security-Scanner/1.0",
        followRedirects: true,
        checkSSL: true,
        aggressive: false,
      };

      const scanResult = await scanner.runScan(scanConfig);

      return NextResponse.json({
        scanId: scanResult.id,
        timestamp: scanResult.startTime.toISOString(),
        duration: scanResult.duration,
        summary: scanResult.summary,
        vulnerabilities: scanResult.vulnerabilities.map((v) => ({
          id: v.id,
          type: v.type,
          severity: v.severity,
          title: v.title,
          description: v.description,
          location: v.location,
          impact: v.impact,
          recommendation: v.recommendation,
          status: v.status,
        })),
      });
    }

    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Security API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Helper functions
function calculateSecurityScore(
  auditStats: any,
  vulnerabilities: any[],
): number {
  let score = 100;

  // Deduct points for vulnerabilities
  vulnerabilities.forEach((v) => {
    switch (v.severity) {
      case "critical":
        score -= 20;
        break;
      case "high":
        score -= 10;
        break;
      case "medium":
        score -= 5;
        break;
      case "low":
        score -= 2;
        break;
    }
  });

  // Deduct points for anomalies
  score -= auditStats.anomalies.length * 5;

  // Deduct points for high event volume
  if (auditStats.totalEvents > 1000) {
    score -= 5;
  }

  return Math.max(0, score);
}

function getSystemStatus(score: number): "secure" | "warning" | "critical" {
  if (score >= 80) return "secure";
  if (score >= 60) return "warning";
  return "critical";
}

function getLastScanTime(vulnerabilities: any[]): string | null {
  if (vulnerabilities.length === 0) return null;

  const latest = vulnerabilities.reduce((latest, v) => {
    return v.discoveredAt > latest ? v.discoveredAt : latest;
  }, vulnerabilities[0].discoveredAt);

  return latest.toISOString();
}

function calculateTrend(timelineData: any[], metric: string): number {
  if (timelineData.length < 2) return 0;

  const recent = timelineData.slice(-2);
  const current = recent[1][metric];
  const previous = recent[0][metric];

  return current - previous;
}

function calculateVulnerabilityTrend(vulnerabilities: any[]): number {
  // Simplified: count vulnerabilities discovered in last 24 hours
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return vulnerabilities.filter((v) => v.discoveredAt > oneDayAgo).length;
}

export const GET = withSecurity(handler);
export const POST = withSecurity(handler);
