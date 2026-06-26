import { render, screen } from "@testing-library/react";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
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

jest.mock("@/lib/i18n/locale.server", () => ({
  getServerLocale: jest.fn(async () => "en"),
}));

describe("EmployeeHandbookPage", () => {
  async function renderPage() {
    const { default: EmployeeHandbookPage } = require("../page") as {
      default: () => Promise<React.ReactElement>;
    };
    render(await EmployeeHandbookPage());
  }

  it("renders without throwing", async () => {
    await expect(renderPage()).resolves.toBeUndefined();
  });

  it("renders the main heading", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /employee handbook/i }),
    ).toBeInTheDocument();
  });

  it("renders handbook sections and forms blocks", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { name: /handbook sections/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /handbook forms/i }),
    ).toBeInTheDocument();
  });

  it("links to handbook PDF and back to resources", async () => {
    await renderPage();
    expect(
      screen.getByRole("link", {
        name: /download handbook pdf/i,
      }),
    ).toHaveAttribute("href", "/docs/employee/employee-handbook-2026.pdf");
    expect(
      screen.getByRole("link", {
        name: /back to resources/i,
      }),
    ).toHaveAttribute("href", "/resources");
  });
});
