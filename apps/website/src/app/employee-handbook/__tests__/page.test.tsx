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
      screen.getByRole("heading", { name: /employee handbook placeholder/i }),
    ).toBeInTheDocument();
  });

  it("renders the status and next step sections", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { name: /current status/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /next step/i }),
    ).toBeInTheDocument();
  });

  it("links back to Operations Hub and Field Resources", async () => {
    await renderPage();
    expect(
      screen.getByRole("link", { name: /back to operations hub/i }),
    ).toHaveAttribute("href", "/hub");
    expect(
      screen.getByRole("link", { name: /view field resources/i }),
    ).toHaveAttribute("href", "/resources");
  });
});
