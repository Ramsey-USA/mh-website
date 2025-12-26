/**
 * Analytics Types
 * Core type definitions for analytics system
 */

export type AnalyticsPropertyValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type AnalyticsEventType =
  | "page_view"
  | "user_interaction"
  | "form_submission"
  | "estimator_usage"
  | "recommendation_view"
  | "recommendation_click"
  | "veteran_benefit_view"
  | "contact_specialist"
  | "project_inquiry"
  | "performance_metric"
  | "error_event"
  | "conversion_event";

export interface DeviceInfo {
  type: "desktop" | "tablet" | "mobile";
  os: string;
  browser: string;
  screenResolution: string;
  viewportSize: string;
}

export interface LocationInfo {
  timezone: string;
  language: string;
  country?: string;
  region?: string;
  city?: string;
}

export interface EventMetadata {
  page: string;
  referrer: string;
  userAgent: string;
  device: DeviceInfo;
  location: LocationInfo;
}

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  properties: Record<string, AnalyticsPropertyValue>;
  metadata: EventMetadata;
}

export interface UserJourney {
  sessionId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  events: AnalyticsEvent[];
  pages: string[];
  conversions: ConversionEvent[];
  totalDuration: number;
  bounceRate: boolean;
}

export interface ConversionEvent {
  type:
    | "estimate_request"
    | "contact_form"
    | "specialist_contact"
    | "project_inquiry";
  value: number;
  timestamp: Date;
  properties: Record<string, AnalyticsPropertyValue>;
}

export interface OverviewMetrics {
  totalUsers: number;
  totalSessions: number;
  pageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  veteranUserPercentage: number;
  topPages: PageMetric[];
  trafficSources: TrafficSource[];
}

export interface PageMetric {
  page: string;
  views: number;
  uniqueViews: number;
  averageTime: number;
  bounceRate: number;
}

export interface TrafficSource {
  source: string;
  sessions: number;
  users: number;
  conversionRate: number;
}

export interface UserBehaviorMetrics {
  userFlows: unknown[];
  popularFeatures: unknown[];
  estimatorUsage: unknown;
  recommendationEngagement: unknown;
  deviceBreakdown: unknown;
  geographicDistribution: unknown[];
}

export interface PerformanceAnalytics {
  coreWebVitals: CoreWebVitals;
  pageLoadTimes: unknown[];
  errorRates: unknown;
  uptimeMetrics: unknown;
  resourceMetrics: ResourceUsage;
}

export interface CoreWebVitals {
  lcp: number;
  fid: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

export interface ResourceUsage {
  bandwidth: number;
  requestCount: number;
  averageResponseTime: number;
}

export interface ConversionAnalytics {
  funnelAnalysis: unknown[];
  conversionsBySource: unknown[];
  veteranConversions: unknown;
  estimatorToContact: number;
  recommendationToInquiry: number;
}

export interface VeteranAnalytics {
  veteranUsers: number;
  branchDistribution: unknown[];
  benefitUtilization: unknown[];
  specialistEngagement: unknown;
  conversionRates: VeteranConversionRates;
}

export interface VeteranConversionRates {
  estimateRequests: number;
  contactForms: number;
  projectInquiries: number;
}

export interface RealTimeMetrics {
  activeUsers: number;
  currentSessions: ActiveSession[];
  recentEvents: AnalyticsEvent[];
  liveConversions: ConversionEvent[];
  systemHealth: SystemHealth;
}

export interface ActiveSession {
  sessionId: string;
  userId?: string;
  startTime: Date;
  currentPage: string;
  eventCount: number;
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "down";
  responseTime: number;
  errorRate: number;
  activeConnections: number;
}

export interface AnalyticsDashboardData {
  overview: OverviewMetrics;
  userBehavior: UserBehaviorMetrics;
  performance: PerformanceAnalytics;
  conversions: ConversionAnalytics;
  veteranInsights: VeteranAnalytics;
  realTime: RealTimeMetrics;
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
}
