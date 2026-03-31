/**
 * @jest-environment jsdom
 *
 * Smoke tests for the Dashboard (Analytics) client-component page.
 * The page is auth-gated via localStorage; tests cover the unauthenticated
 * path (renders null) and the authenticated loading path.
 */

// Must use a factory that returns a stable router object — the component's
// useEffect has [router] as a dep so a new object on every render causes
// Maximum-update-depth errors.
jest.mock("next/navigation", () => {
  const push = jest.fn();
  const stableRouter = { push };
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

jest.mock("@/lib/utils/logger", () => ({
  logger: { error: jest.fn(), info: jest.fn(), warn: jest.fn() },
}));

// Stub fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { render, act } from "@testing-library/react";

describe("Analytics Dashboard page", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
    const { useRouter } = jest.requireMock("next/navigation") as {
      useRouter: jest.Mock;
    };
    (useRouter() as { push: jest.Mock }).push.mockClear();
  });

  it("renders without throwing when unauthenticated", async () => {
    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
  });

  it("redirects to / when no admin token is set", async () => {
    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
    const { useRouter } = jest.requireMock("next/navigation") as {
      useRouter: jest.Mock;
    };
    expect((useRouter() as { push: jest.Mock }).push).toHaveBeenCalledWith("/");
  });

  it("renders without throwing with valid localStorage tokens", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    });

    localStorage.setItem("admin_token", "test-token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Admin", email: "admin@test.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
  });
});

// ─── Additional branch coverage ───────────────────────────────────────────────

describe("Analytics Dashboard page — branch coverage", () => {
  // Get the stable router reference (same mock factory as above)
  function getRouter() {
    const { useRouter } = jest.requireMock("next/navigation") as {
      useRouter: jest.Mock;
    };
    return useRouter() as { push: jest.Mock };
  }

  beforeEach(() => {
    mockFetch.mockClear();
    localStorage.clear();
    getRouter().push.mockClear();
  });

  it("redirects to / when admin_user JSON is malformed", async () => {
    localStorage.setItem("admin_token", "token");
    localStorage.setItem("admin_user", "not-valid-json{{{");

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
    expect(getRouter().push).toHaveBeenCalledWith("/");
  });

  it("shows error state when fetch returns !ok", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Admin", email: "a@b.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<DashboardPage />));
    });
    expect(container.textContent).toMatch(/error|failed/i);
  });

  it("shows error state when fetch rejects (network error)", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Operator", email: "op@mhc.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    let container!: HTMLElement;
    await act(async () => {
      ({ container } = render(<DashboardPage />));
    });
    expect(container.textContent).toMatch(/error|failed/i);
  });

  it("handles logout — removes tokens and redirects", async () => {
    const { screen, fireEvent } = await import("@testing-library/react");
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    });
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Admin", email: "a@b.com" }),
    );

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

    expect(localStorage.getItem("admin_token")).toBeNull();
    expect(localStorage.getItem("admin_user")).toBeNull();
    expect(getRouter().push).toHaveBeenCalledWith("/");
  });

  it("renders kvStatus=unavailable warning banner", async () => {
    const { screen } = await import("@testing-library/react");
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    });
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Admin", email: "a@b.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
    expect(screen.getByText(/KV NOT CONNECTED/i)).toBeInTheDocument();
  });

  it("renders fully populated dashboard with geographic + CTA data", async () => {
    const { screen } = await import("@testing-library/react");
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
          {
            element: "phone-footer",
            state: "Washington",
            city: "Richland",
            page: "/services",
            timestamp: "2026-03-31",
          },
          {
            element: "phone-header",
            state: "WA",
            city: "Kennewick",
            page: "/",
            timestamp: "2026-03-31",
          },
          {
            element: "email-contact",
            state: "Oregon",
            city: "Portland",
            page: "/contact",
            timestamp: "2026-03-31",
          },
          {
            element: "address-footer",
            state: "Idaho",
            city: "Boise",
            page: "/",
            timestamp: "2026-03-31",
          },
          {
            element: "phone-mobile",
            state: "Washington",
            city: "Pasco",
            page: "/",
            timestamp: "2026-03-31",
          },
          { state: "California" }, // click with state only, no city
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
      }),
    });
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Jeremy", email: "jeremy@mhc.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });

    // Verify dashboard rendered successfully (not loading/error state)
    expect(screen.getByText(/TACTICAL OVERVIEW/i)).toBeInTheDocument();
    expect(screen.getByText(/MISSION SUCCESS/i)).toBeInTheDocument();

    // Verify geographic data rendered (from clicks)
    expect(screen.getByText(/OPERATIONAL ZONES/i)).toBeInTheDocument();
    expect(screen.getByText(/TARGET AO STATUS/i)).toBeInTheDocument();

    // Verify CTA performance sections
    expect(screen.getByText(/DIRECT COMMS/i)).toBeInTheDocument();

    // Veteran page views section
    expect(screen.getByText(/BROTHERHOOD ENGAGEMENT/i)).toBeInTheDocument();

    // Verify user name appears
    expect(screen.getByText(/Jeremy/)).toBeInTheDocument();
  });

  it("renders with data where no veteran pages exist", async () => {
    const { screen } = await import("@testing-library/react");
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
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
      }),
    });
    localStorage.setItem("admin_token", "token");
    localStorage.setItem(
      "admin_user",
      JSON.stringify({ name: "Matt", email: "matt@mhc.com" }),
    );

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });

    // Should render with empty click data — "No geographic data" message
    expect(
      screen.getByText(/No geographic data available/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/No phone clicks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/No email clicks yet/i)).toBeInTheDocument();
    expect(screen.getByText(/No address clicks yet/i)).toBeInTheDocument();
  });

  it("renders when admin_token is present but admin_user is missing", async () => {
    localStorage.setItem("admin_token", "token");
    // No admin_user set

    const { default: DashboardPage } = require("../page") as {
      default: React.ComponentType;
    };
    await act(async () => {
      render(<DashboardPage />);
    });
    expect(getRouter().push).toHaveBeenCalledWith("/");
  });
});
