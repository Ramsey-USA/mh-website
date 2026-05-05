/**
 * @jest-environment jsdom
 *
 * Safety incident-report page integration tests — website app
 * (Hub page routing tests live in apps/dashboard/src/app/__tests__/hub-routing.test.tsx)
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

describe("Safety incident-report page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.localStorage.clear();
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
