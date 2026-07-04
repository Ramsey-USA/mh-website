/**
 * @jest-environment jsdom
 *
 * Operations Hub page routing tests — dashboard app
 */

import { render, screen } from "@testing-library/react";

async function renderHubPage() {
  const { default: HubPage } = require("../hub/page") as {
    default: () => Promise<React.ReactElement> | React.ReactElement;
  };
  const element = await HubPage();
  return render(element);
}

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

jest.mock("@/lib/hub/resources", () => ({
  getHubSafetySummary: async () => ({
    sectionCount: 50,
    revisionNumber: "3",
    handbookRevision: "1.0",
    handbookSections: 6,
    safetyFormCount: 42,
    handbookFormCount: 12,
    formCount: 54,
  }),
}));

describe("Operations Hub page routing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.localStorage.clear();
  });

  it("keeps Incident Reporting card mapped to direct incident entry route", async () => {
    await renderHubPage();

    const incidentCard = screen.getByRole("link", {
      name: /Incident Reporting/i,
    });

    expect(incidentCard).toHaveAttribute("href", "/safety/incident-report");
  });

  it("keeps Employee Handbook card mapped to handbook route", async () => {
    await renderHubPage();

    const handbookCard = screen.getByRole("link", {
      name: /^menu_book Employee Handbook/i,
    });

    expect(handbookCard).toHaveAttribute("href", "/employee-handbook");
  });

  it("renders safety manual revision summary from hub resources", async () => {
    await renderHubPage();

    expect(screen.getByText(/MISH Rev 3/i)).toBeInTheDocument();
    expect(screen.getByText(/50 sections/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Handbook Rev 1.0/i)).toBeInTheDocument();
    expect(screen.getByText(/12 handbook forms/i)).toBeInTheDocument();
    expect(screen.getByText(/Safety Program forms: 42/i)).toBeInTheDocument();
    expect(screen.getByText(/Total active forms: 54/i)).toBeInTheDocument();
  });

  it("renders admin tools section with review profile action", async () => {
    await renderHubPage();

    expect(screen.getByText(/Admin Tools/i)).toBeInTheDocument();
    const reviewProfilesCard = screen.getByRole("link", {
      name: /Review Profiles/i,
    });
    expect(reviewProfilesCard).toHaveAttribute("href", "/hub/profile/review");
  });
});
