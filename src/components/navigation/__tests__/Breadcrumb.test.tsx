import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../Breadcrumb";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: () => <span data-testid="chevron" />,
}));

describe("Breadcrumb", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Roofing" },
  ];

  it("renders a nav landmark with accessible label", () => {
    render(<Breadcrumb items={items} />);
    expect(
      screen.getByRole("navigation", { name: /breadcrumb/i }),
    ).toBeInTheDocument();
  });

  it("renders linked labels for non-last items", () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("renders the last item as non-linked with aria-current", () => {
    render(<Breadcrumb items={items} />);
    const current = screen.getByText("Roofing");
    expect(current.tagName).toBe("SPAN");
    expect(current).toHaveAttribute("aria-current", "page");
  });

  it("renders separator chevrons between items", () => {
    render(<Breadcrumb items={items} />);
    // Two chevrons for three items (between 1-2 and 2-3)
    expect(screen.getAllByTestId("chevron")).toHaveLength(2);
  });

  it("applies custom className", () => {
    render(<Breadcrumb items={items} className="my-nav" />);
    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toHaveClass(
      "my-nav",
    );
  });

  it("handles single item without chevron", () => {
    render(<Breadcrumb items={[{ label: "Home" }]} />);
    expect(screen.queryByTestId("chevron")).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
  });

  it("renders item with href as last item without link", () => {
    // Items where last has href — still shown as non-clickable current
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      />,
    );
    // Last item "About" should be non-linked (isLast = true)
    const about = screen.getByText("About");
    expect(about.tagName).toBe("SPAN");
  });
});
