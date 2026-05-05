import { render, screen } from "@testing-library/react";
import EmployeeHandbookPage from "../page";

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

describe("EmployeeHandbookPage", () => {
  it("renders without throwing", () => {
    expect(() => render(<EmployeeHandbookPage />)).not.toThrow();
  });

  it("renders the main heading", () => {
    render(<EmployeeHandbookPage />);
    expect(
      screen.getByRole("heading", { name: /employee handbook placeholder/i }),
    ).toBeInTheDocument();
  });

  it("renders the status and next step sections", () => {
    render(<EmployeeHandbookPage />);
    expect(
      screen.getByRole("heading", { name: /current status/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /next step/i }),
    ).toBeInTheDocument();
  });

  it("links back to Operations Hub and Field Resources", () => {
    render(<EmployeeHandbookPage />);
    expect(
      screen.getByRole("link", { name: /back to operations hub/i }),
    ).toHaveAttribute("href", "/hub");
    expect(
      screen.getByRole("link", { name: /view field resources/i }),
    ).toHaveAttribute("href", "/resources");
  });
});
