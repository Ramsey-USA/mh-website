/**
 * Analytics Types
 * Shared TypeScript interfaces for the analytics system
 */

// Analytics Event Types
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

// Core Analytics Interfaces
export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  properties: Record<string, any>;
  metadata: EventMetadata;
}

export interface EventMetadata {
  page: string;
  referrer: string;
  userAgent: string;
  device: DeviceInfo;
  location: LocationInfo;
  performance?: PerformanceMetrics;
}

export interface DeviceInfo {
  type: "desktop" | "tablet" | "mobile";
  os: string;
  browser: string;
  screenResolution: string;
  viewportSize: string;
}

export interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
  language: string;
}

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
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
  properties: Record<string, any>;
}

export interface AnalyticsDashboardData {
  overview: OverviewMetrics;
  userBehavior: UserBehaviorMetrics;
  performance: PerformanceAnalytics;
  conversions: ConversionAnalytics;
  veteranInsights: VeteranAnalytics;
  realTime: RealTimeMetrics;
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

export interface UserBehaviorMetrics {
  userFlows: UserFlow[];
  popularFeatures: FeatureUsage[];
  estimatorUsage: EstimatorAnalytics;
  recommendationEngagement: RecommendationAnalytics;
  deviceBreakdown: DeviceAnalytics;
  geographicDistribution: GeographicData[];
}

export interface PerformanceAnalytics {
  coreWebVitals: CoreWebVitals;
  pageLoadTimes: PagePerformance[];
  errorRates: ErrorAnalytics;
  uptimeMetrics: UptimeData;
  resourceMetrics: ResourceUsage;
}

export interface ConversionAnalytics {
  funnelAnalysis: FunnelStep[];
  conversionsBySource: ConversionSource[];
  veteranConversions: VeteranConversionData;
  estimatorToContact: number;
  recommendationToInquiry: number;
}

export interface VeteranAnalytics {
  veteranUsers: number;
  branchDistribution: BranchMetric[];
  benefitUtilization: BenefitUsage[];
  specialistEngagement: SpecialistMetrics;
  conversionRates: VeteranConversionRates;
}

export interface RealTimeMetrics {
  activeUsers: number;
  currentSessions: ActiveSession[];
  recentEvents: AnalyticsEvent[];
  liveConversions: ConversionEvent[];
  systemHealth: SystemHealth;
}

// Supporting Interfaces
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

export interface UserFlow {
  path: string[];
  users: number;
  completionRate: number;
  averageDuration: number;
}

export interface FeatureUsage {
  feature: string;
  uses: number;
  uniqueUsers: number;
  successRate: number;
}

export interface EstimatorAnalytics {
  totalUsage: number;
  completionRate: number;
  averageProjectValue: number;
  popularProjectTypes: ProjectTypeMetric[];
  dropOffPoints: DropOffPoint[];
}

export interface RecommendationAnalytics {
  impressions: number;
  clicks: number;
  clickThroughRate: number;
  conversionRate: number;
  topRecommendations: RecommendationMetric[];
}

export interface DeviceAnalytics {
  desktop: number;
  tablet: number;
  mobile: number;
}

export interface GeographicData {
  region: string;
  users: number;
  sessions: number;
  conversionRate: number;
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export interface PagePerformance {
  page: string;
  averageLoadTime: number;
  p75LoadTime: number;
  p95LoadTime: number;
}

export interface ErrorAnalytics {
  totalErrors: number;
  errorRate: number;
  topErrors: ErrorMetric[];
}

export interface UptimeData {
  uptime: number;
  downtimeEvents: DowntimeEvent[];
}

export interface ResourceUsage {
  bandwidth: number;
  requestCount: number;
  averageResponseTime: number;
}

export interface FunnelStep {
  step: string;
  users: number;
  dropOffRate: number;
}

export interface ConversionSource {
  source: string;
  conversions: number;
  value: number;
}

export interface VeteranConversionData {
  veteranConversions: number;
  veteranConversionRate: number;
  averageVeteranValue: number;
}

export interface BranchMetric {
  branch: string;
  users: number;
  percentage: number;
}

export interface BenefitUsage {
  benefit: string;
  uses: number;
  users: number;
}

export interface SpecialistMetrics {
  contacts: number;
  averageResponseTime: number;
  satisfactionRate: number;
}

export interface VeteranConversionRates {
  estimateRequests: number;
  contactForms: number;
  projectInquiries: number;
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

export interface ProjectTypeMetric {
  type: string;
  count: number;
  averageValue: number;
}

export interface DropOffPoint {
  step: string;
  dropOffRate: number;
  affectedUsers: number;
}

export interface RecommendationMetric {
  recommendation: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface ErrorMetric {
  error: string;
  count: number;
  affectedUsers: number;
  lastOccurrence: Date;
}

export interface DowntimeEvent {
  startTime: Date;
  endTime: Date;
  duration: number;
  cause?: string;
}
