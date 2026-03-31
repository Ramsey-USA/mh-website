import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../Breadcrumb";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon, className }: { icon: string; className?: string }) => (
    <span data-testid="material-icon" className={className}>
      {icon}
    </span>
  ),
}));

describe("Breadcrumb", () => {
  it("renders without crashing with empty items array", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container).toBeTruthy();
  });

  it("renders a nav element with aria-label", () => {
    render(<Breadcrumb items={[{ label: "Home", href: "/" }]} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute("aria-label", "Breadcrumb navigation");
  });

  it("renders breadcrumb item labels", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Current Page" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Current Page")).toBeInTheDocument();
  });

  it("renders last item as plain text (aria-current=page)", () => {
    render(
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />,
    );
    const current = screen.getByText("About");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders middle items as links with correct href", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Current" },
        ]}
      />,
    );
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
    const servicesLink = screen.getByRole("link", { name: "Services" });
    expect(servicesLink).toHaveAttribute("href", "/services");
  });

  it("last item is NOT a link", () => {
    render(
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Last Item" }]}
      />,
    );
    const links = screen.queryAllByRole("link");
    const lastLink = links.find((l) => l.textContent === "Last Item");
    expect(lastLink).toBeUndefined();
  });

  it("renders separators between items", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Current" },
        ]}
      />,
    );
    const separators = screen.getAllByTestId("material-icon");
    // One separator per item after the first
    expect(separators).toHaveLength(2);
  });

  it("renders correct number of list items", () => {
    const { container } = render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Team" },
        ]}
      />,
    );
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(3);
  });
});
