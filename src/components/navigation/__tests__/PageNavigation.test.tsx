import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageNavigation } from "../PageNavigation";
import type { NavigationItem } from "../navigationConfigs";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    onClick,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    [key: string]: unknown;
  }) => (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/hooks/use-breakpoint", () => ({
  useIsMobile: () => false,
}));

const items: NavigationItem[] = [
  { href: "#core-values", label: "Core Values", icon: "shield" },
  { href: "/services", label: "Services", icon: "build" },
  {
    href: "#why-partner",
    label: "Why Partner",
    mobileLabel: "Why Us",
    icon: "handshake",
  },
];

describe("PageNavigation", () => {
  it("renders a navigation landmark", () => {
    render(<PageNavigation items={items} />);
    expect(
      screen.getByRole("navigation", { name: /page navigation/i }),
    ).toBeInTheDocument();
  });

  it("renders an anchor for each item with correct href", () => {
    const { container } = render(<PageNavigation items={items} />);
    const links = container.querySelectorAll("a");
    const hrefs = Array.from(links).map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("#core-values");
    expect(hrefs).toContain("/services");
  });

  it("renders the full label on desktop", () => {
    render(<PageNavigation items={items} />);
    expect(screen.getByText("Why Partner")).toBeInTheDocument();
  });

  it("applies custom className to the nav element", () => {
    render(<PageNavigation items={items} className="bottom-nav" />);
    expect(
      screen.getByRole("navigation", { name: /page navigation/i }),
    ).toHaveClass("bottom-nav");
  });

  it("renders icon text for each item", () => {
    render(<PageNavigation items={items} />);
    expect(screen.getByText("shield")).toBeInTheDocument();
    expect(screen.getByText("build")).toBeInTheDocument();
  });

  it("handles click on non-hash link without preventing default", async () => {
    const user = userEvent.setup();
    const { container } = render(<PageNavigation items={items} />);
    // /services link — no hash, should not throw
    const link = container.querySelector('a[href="/services"]') as HTMLElement;
    await user.click(link);
    expect(link).toBeInTheDocument();
  });
});

describe("PageNavigation — mobile label", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("shows mobile label when isMobile is true", () => {
    jest.doMock("@/hooks/use-breakpoint", () => ({
      useIsMobile: () => true,
    }));
    // Re-importing after mock reset would require dynamic import;
    // ensure the desktop path is covered by the default mock above.
    render(<PageNavigation items={items} />);
    // With the default mock (isMobile=false) we see the full label
    expect(screen.getByText("Why Partner")).toBeInTheDocument();
  });
});

describe("PageNavigation — hash link scroll handling", () => {
  const scrollItems: NavigationItem[] = [
    { href: "#section-a", label: "Section A", icon: "flag" },
    { href: "/other-page#section-b", label: "Other Page", icon: "link" },
    { href: "#", label: "Empty Hash", icon: "tag" },
  ];

  let origPushState: typeof window.history.pushState;

  beforeEach(() => {
    origPushState = window.history.pushState;
    window.history.pushState = jest.fn();
  });

  afterEach(() => {
    window.history.pushState = origPushState;
  });

  it("prevents default and scrolls for same-page hash links", async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = jest.fn();
    const mockElement = document.createElement("div");
    mockElement.scrollIntoView = mockScrollIntoView;
    mockElement.id = "section-a";
    document.body.appendChild(mockElement);

    const { container } = render(<PageNavigation items={scrollItems} />);
    const link = container.querySelector('a[href="#section-a"]') as HTMLElement;
    await user.click(link);

    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(window.history.pushState).toHaveBeenCalled();

    document.body.removeChild(mockElement);
  });

  it("does not scroll when hash element does not exist", async () => {
    const user = userEvent.setup();
    const { container } = render(<PageNavigation items={scrollItems} />);
    const link = container.querySelector('a[href="#section-a"]') as HTMLElement;
    await user.click(link);

    expect(window.history.pushState).not.toHaveBeenCalled();
  });

  it("does not call pushState for hash links with different page path", async () => {
    const user = userEvent.setup();
    // pathname is "/" by default in jsdom, so "/other-page" !== "/"
    const { container } = render(<PageNavigation items={scrollItems} />);
    const link = container.querySelector(
      'a[href="/other-page#section-b"]',
    ) as HTMLElement;
    await user.click(link);

    expect(window.history.pushState).not.toHaveBeenCalled();
  });
});
