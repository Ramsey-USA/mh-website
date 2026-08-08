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

  it("locks the Draft PDF and keeps the resources return path", async () => {
    await renderPage();
    expect(
      screen.queryByRole("link", {
        name: /download handbook toc pdf/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/public downloads remain disabled/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /back to resources/i,
      }),
    ).toHaveAttribute("href", "/resources");
  });
});
