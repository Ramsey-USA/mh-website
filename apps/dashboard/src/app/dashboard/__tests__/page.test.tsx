/**
 * @jest-environment jsdom
 *
 * Dashboard page tests for refresh-token auth bootstrap and tab rendering.
 */

jest.mock("next/navigation", () => {
  const stableRouter = { push: mockPush };
  return {
    useRouter: jest.fn(() => stableRouter),
    usePathname: () => "/dashboard",
    useSearchParams: () => new URLSearchParams(),
  };
});

jest.mock("@/lib/analytics/hooks", () => ({
  usePageTracking: jest.fn(),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("../AccessLogTab", () => ({
  AccessLogTab: () => <div>ACCESS LOG TAB</div>,
}));

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn(), info: jest.fn(), warn: jest.fn() },
}));

const mockPush = jest.fn();
const mockFetch = jest.fn();
Object.defineProperty(globalThis, "fetch", {
  writable: true,
  value: mockFetch,
});

import { render, act } from "@testing-library/react";

function mockRefreshAsAdmin() {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      accessToken: "admin-access-token",
      user: { name: "Admin", email: "admin@test.com", role: "admin" },
    }),
  });
}

function mockAnalyticsOk(payload?: Record<string, unknown>) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () =>
      payload ?? {
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
      },
  });
}

describe("Analytics Dashboard page", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockPush.mockClear();
  });

  it("renders without throwing when refresh is unauthorized", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("redirects when refresh returns non-admin role", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: "token",
        user: { name: "User", role: "worker" },
      }),
    });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders the access log tab label for authenticated admins", async () => {
    const { screen } = await import("@testing-library/react");

    mockRefreshAsAdmin();
    mockAnalyticsOk();

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };

    await act(async () => {
      render(<DashboardPage />);
    });

    expect(screen.getByText(/Access Log/i)).toBeInTheDocument();
  });

  it("shows error state when analytics fetch returns !ok", async () => {
    mockRefreshAsAdmin();
    mockFetch.mockResolvedValueOnce({ ok: false, json: async () => ({}) });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<DashboardPage />));
    });

    expect(container.textContent).toMatch(/error|failed/i);
  });

  it("shows error state when analytics fetch rejects", async () => {
    mockRefreshAsAdmin();
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<DashboardPage />));
    });

    expect(container.textContent).toMatch(/error|failed/i);
  });

  it("handles logout and redirects", async () => {
    const { screen, fireEvent } = await import("@testing-library/react");

    mockRefreshAsAdmin();
    mockAnalyticsOk({
      pageviews: { pages: {}, total: 5, lastUpdated: "" },
      conversions: {
        contacts: 1,
        consultations: 0,
        total: 1,
        lastUpdated: "",
      },
      clicks: [],
      sessions: {
        count: 2,
        totalDuration: 100,
        averageDuration: 50,
        lastUpdated: "",
      },
      topPages: [{ page: "/", views: 3 }],
      today: { pageviews: 2, sessions: 1 },
      kvStatus: "connected",
    });
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };

    await act(async () => {
      render(<DashboardPage />);
    });

    const logoutBtn = screen.getByText(/disengage/i);
    await act(async () => {
      fireEvent.click(logoutBtn);
    });

    expect(mockFetch).toHaveBeenLastCalledWith("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("renders kvStatus=unavailable warning banner", async () => {
    const { screen } = await import("@testing-library/react");

    mockRefreshAsAdmin();
    mockAnalyticsOk({
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
    });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });

    expect(screen.getByText(/KV NOT CONNECTED/i)).toBeInTheDocument();
  });

  it("renders populated dashboard with engagement data", async () => {
    const { screen } = await import("@testing-library/react");

    mockRefreshAsAdmin();
    mockAnalyticsOk({
      pageviews: {
        pages: { "/": 50, "/services": 30, "/veterans": 10, "/contact": 5 },
        total: 95,
        lastUpdated: "2026-03-31T00:00:00Z",
      },
      conversions: {
        contacts: 5,
        consultations: 3,
        total: 8,
        lastUpdated: "2026-03-31T00:00:00Z",
      },
      clicks: [
        {
          element: "phone-header",
          state: "Washington",
          city: "Pasco",
          page: "/",
          timestamp: "2026-03-31",
        },
      ],
      sessions: {
        count: 40,
        totalDuration: 3600,
        averageDuration: 90,
        lastUpdated: "2026-03-31T00:00:00Z",
      },
      topPages: [
        { page: "/", views: 50 },
        { page: "/services", views: 30 },
      ],
      today: { pageviews: 15, sessions: 8 },
      kvStatus: "connected",
    });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };

    await act(async () => {
      render(<DashboardPage />);
    });

    expect(screen.getByText(/TACTICAL OVERVIEW/i)).toBeInTheDocument();
    expect(screen.getByText(/MISSION SUCCESS/i)).toBeInTheDocument();
  });

  it("renders no-data geographic and CTA messaging", async () => {
    const { screen } = await import("@testing-library/react");

    mockRefreshAsAdmin();
    mockAnalyticsOk({
      pageviews: {
        pages: { "/": 10, "/services": 5 },
        total: 15,
        lastUpdated: "",
      },
      conversions: {
        contacts: 0,
        consultations: 0,
        total: 0,
        lastUpdated: "",
      },
      clicks: [],
      sessions: {
        count: 3,
        totalDuration: 180,
        averageDuration: 60,
        lastUpdated: "",
      },
      topPages: [],
      today: { pageviews: 1, sessions: 1 },
    });

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };

    await act(async () => {
      render(<DashboardPage />);
    });

    expect(
      screen.getByText(/No geographic data available/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/No phone clicks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/No email clicks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/No address clicks yet/i)).toBeInTheDocument();
  });
});
