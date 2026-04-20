/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/analytics", () => ({
  PageTrackingClient: () => null,
}));

describe("Operations Hub workflows", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.localStorage.clear();
  });

  it("keeps Incident Reporting card mapped to direct incident entry route", () => {
    const { default: HubPage } = require("../hub/page") as {
      default: React.ComponentType;
    };

    render(<HubPage />);

    const incidentCard = screen.getByRole("link", {
      name: /Incident Reporting/i,
    });

    expect(incidentCard).toHaveAttribute("href", "/safety/incident-report");
  });

  it("keeps Employee Handbook card mapped to placeholder route", () => {
    const { default: HubPage } = require("../hub/page") as {
      default: React.ComponentType;
    };

    render(<HubPage />);

    const handbookCard = screen.getByRole("link", {
      name: /Employee Handbook/i,
    });

    expect(handbookCard).toHaveAttribute("href", "/employee-handbook");
  });

  it("shows Team Access Required when incident route has no auth token", () => {
    const { default: IncidentReportPage } =
      require("../safety/incident-report/page") as {
        default: React.ComponentType;
      };

    render(<IncidentReportPage />);

    expect(screen.getByText(/Team Access Required/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Return to Hub/i }),
    ).toHaveAttribute("href", "/hub");
  });

  it("loads active jobs with auth token on incident route", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: [{ id: "job-1", job_number: "J-001", job_name: "Project" }],
      }),
    });

    Object.defineProperty(globalThis, "fetch", {
      writable: true,
      value: fetchMock,
    });

    globalThis.localStorage.setItem("field_auth_token", "field-token");

    const { default: IncidentReportPage } =
      require("../safety/incident-report/page") as {
        default: React.ComponentType;
      };

    render(<IncidentReportPage />);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith("/api/safety/jobs", {
        headers: { Authorization: "Bearer field-token" },
      });
    });

    expect(screen.getByText(/Incident Report Submission/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("option", { name: /J-001 · Project/i }),
      ).toBeInTheDocument();
    });
  });
});
