/**
 * Shared types for the analytics dashboard at /dashboard.
 *
 * Mirrors the response shape returned by /api/analytics/dashboard.
 */

export interface DashboardClick {
  readonly element?: string;
  readonly state?: string;
  readonly city?: string;
  readonly page?: string;
  readonly timestamp?: string;
}

export interface DashboardData {
  readonly pageviews: {
    readonly pages: Record<string, number>;
    readonly total: number;
    readonly lastUpdated: string;
  };
  readonly conversions: {
    readonly contacts: number;
    readonly consultations: number;
    readonly total: number;
    readonly lastUpdated: string;
  };
  readonly clicks: ReadonlyArray<DashboardClick>;
  readonly sessions: {
    readonly count: number;
    readonly totalDuration: number;
    readonly averageDuration: number;
    readonly lastUpdated: string;
  };
  readonly topPages: ReadonlyArray<{ page: string; views: number }>;
  readonly today: { pageviews: number; sessions: number };
  readonly kvStatus?: "connected" | "unavailable";
}
