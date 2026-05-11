import { getDashboardSnapshot } from "@/lib/analytics/kv-store";
import { createDbClient } from "@/lib/db/client";
import { getD1Database } from "@/lib/db/env";
import type { DashboardData } from "@/lib/dashboard/types";

export interface LeadsAnalyticsData {
  totals: {
    all: number;
    active: number;
    won: number;
    lost: number;
    urgent: number;
  };
}

export interface SafetyAnalyticsData {
  totals: {
    activeJobs: number;
    formSubmissions: number;
    pendingIntake: number;
  };
}

export interface DriversAnalyticsData {
  totals: {
    allDrivers: number;
    approved: number;
    expiringSoon: number;
  };
}

export interface AccessLogAnalyticsData {
  totals: {
    events: number;
    warnings: number;
    downloads: number;
  };
}

function emptyDashboardData(): DashboardData {
  return {
    pageviews: { pages: {}, total: 0, lastUpdated: "" },
    conversions: {
      contacts: 0,
      consultations: 0,
      total: 0,
      lastUpdated: "",
    },
    clicks: [],
    sessions: {
      count: 0,
      totalDuration: 0,
      averageDuration: 0,
      lastUpdated: "",
    },
    topPages: [],
    today: { pageviews: 0, sessions: 0 },
    kvStatus: "unavailable",
  };
}

export async function getAnalyticsOverview(): Promise<DashboardData> {
  const snapshot = await getDashboardSnapshot();
  if (!snapshot) {
    return emptyDashboardData();
  }

  const averageDuration =
    snapshot.sessions.count > 0
      ? Math.round(snapshot.sessions.totalDuration / snapshot.sessions.count)
      : 0;

  const topPages = Object.entries(snapshot.pageviews.pages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  const clicks = snapshot.clicks.map((click) => {
    return {
      ...(click.element !== undefined ? { element: click.element } : {}),
      ...(click.state !== undefined ? { state: click.state } : {}),
      ...(click.city !== undefined ? { city: click.city } : {}),
      ...(click.page !== undefined ? { page: click.page } : {}),
      ...(click.timestamp !== undefined ? { timestamp: click.timestamp } : {}),
    };
  });

  return {
    pageviews: snapshot.pageviews,
    conversions: snapshot.conversions,
    clicks,
    sessions: {
      ...snapshot.sessions,
      averageDuration,
    },
    topPages,
    today: {
      pageviews: snapshot.dailyPageviews?.total ?? 0,
      sessions: snapshot.dailySessions?.count ?? 0,
    },
    kvStatus: "connected",
  };
}

function withDbClient<T>(
  run: (db: ReturnType<typeof createDbClient>) => Promise<T>,
  fallback: T,
): Promise<T> {
  const DB = getD1Database();
  if (!DB) {
    return Promise.resolve(fallback);
  }

  const db = createDbClient({ DB });
  return run(db);
}

export function getLeadsAnalytics(): Promise<LeadsAnalyticsData> {
  const fallback: LeadsAnalyticsData = {
    totals: { all: 0, active: 0, won: 0, lost: 0, urgent: 0 },
  };

  return withDbClient(async (db) => {
    const [all, active, won, lost, urgent] = await Promise.all([
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM leads",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM leads WHERE status NOT IN ('won', 'lost')",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM leads WHERE status = 'won'",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM leads WHERE status = 'lost'",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM leads WHERE priority = 'urgent'",
      ),
    ]);

    return {
      totals: {
        all: Number(all?.total ?? 0),
        active: Number(active?.total ?? 0),
        won: Number(won?.total ?? 0),
        lost: Number(lost?.total ?? 0),
        urgent: Number(urgent?.total ?? 0),
      },
    };
  }, fallback);
}

export function getSafetyAnalytics(): Promise<SafetyAnalyticsData> {
  const fallback: SafetyAnalyticsData = {
    totals: { activeJobs: 0, formSubmissions: 0, pendingIntake: 0 },
  };

  return withDbClient(async (db) => {
    const [activeJobs, formSubmissions, pendingIntake] = await Promise.all([
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM jobs WHERE status = 'active'",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM safety_form_submissions",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM safety_intake_submissions WHERE status = 'pending_review'",
      ),
    ]);

    return {
      totals: {
        activeJobs: Number(activeJobs?.total ?? 0),
        formSubmissions: Number(formSubmissions?.total ?? 0),
        pendingIntake: Number(pendingIntake?.total ?? 0),
      },
    };
  }, fallback);
}

export function getDriversAnalytics(): Promise<DriversAnalyticsData> {
  const fallback: DriversAnalyticsData = {
    totals: { allDrivers: 0, approved: 0, expiringSoon: 0 },
  };

  return withDbClient(async (db) => {
    const [allDrivers, approved, expiringSoon] = await Promise.all([
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM authorized_drivers",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM authorized_drivers WHERE authorization_status = 'approved'",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM authorized_drivers WHERE date(license_expiration_date) <= date('now', '+30 day')",
      ),
    ]);

    return {
      totals: {
        allDrivers: Number(allDrivers?.total ?? 0),
        approved: Number(approved?.total ?? 0),
        expiringSoon: Number(expiringSoon?.total ?? 0),
      },
    };
  }, fallback);
}

export function getAccessLogAnalytics(): Promise<AccessLogAnalyticsData> {
  const fallback: AccessLogAnalyticsData = {
    totals: { events: 0, warnings: 0, downloads: 0 },
  };

  return withDbClient(async (db) => {
    const [events, warnings, downloads] = await Promise.all([
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM safety_access_log",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM safety_access_log WHERE event_type = 'compliance_warning'",
      ),
      db.queryOne<{ total: number | string }>(
        "SELECT COUNT(*) as total FROM safety_access_log WHERE event_type = 'download'",
      ),
    ]);

    return {
      totals: {
        events: Number(events?.total ?? 0),
        warnings: Number(warnings?.total ?? 0),
        downloads: Number(downloads?.total ?? 0),
      },
    };
  }, fallback);
}
