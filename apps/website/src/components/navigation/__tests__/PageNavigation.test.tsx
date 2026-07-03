import { fireEvent, render, screen } from "@testing-library/react";
import { PageNavigation } from "../PageNavigation";
import type { NavigationItem } from "../navigationConfigs";
import { PAGE_TERMINOLOGY } from "@/lib/branding/page-names";

let _navErrorSpy: jest.SpyInstance;
beforeAll(() => {
  _navErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation((...args: unknown[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Not implemented: navigation")
      )
        return;
    });
});
afterAll(() => {
  _navErrorSpy.mockRestore();
});

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const mockLocale = jest.fn<"en" | "es", []>(() => "en");
const mockPathname = jest.fn<string, []>(() => "/");

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

jest.mock("@/hooks/useLocale", () => ({
  useLocale: () => mockLocale(),
}));

// items prop is accepted but ignored — nav always shows the top 5 page links
const items: NavigationItem[] = [];

describe("PageNavigation", () => {
  beforeEach(() => {
    mockLocale.mockReturnValue("en");
    mockPathname.mockReturnValue("/");
  });

  it("renders a navigation landmark", () => {
    render(<PageNavigation items={items} />);
    expect(
      screen.getByRole("navigation", { name: /page navigation/i }),
    ).toBeInTheDocument();
  });

  it("renders exactly the top 5 page links", () => {
    render(<PageNavigation items={items} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(5);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/#services");
    expect(links[2]).toHaveAttribute("href", "/projects");
    expect(links[3]).toHaveAttribute("href", "/about");
    expect(links[4]).toHaveAttribute("href", "/contact");
  });

  it("renders localized labels in spanish locale", () => {
    mockLocale.mockReturnValue("es");
    render(<PageNavigation items={items} />);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Nosotros")).toBeInTheDocument();
    expect(screen.getByText("Servicios")).toBeInTheDocument();
  });

  it("applies custom className to the nav element", () => {
    render(<PageNavigation items={items} className="bottom-nav" />);
    expect(
      screen.getByRole("navigation", { name: /page navigation/i }),
    ).toHaveClass("bottom-nav");
  });

  it("marks current route with aria-current", () => {
    mockPathname.mockReturnValue("/");
    render(<PageNavigation items={items} />);
    expect(
      screen.getByRole("link", {
        name: new RegExp(PAGE_TERMINOLOGY.home.mhBrandName, "i"),
      }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", {
        name: new RegExp(PAGE_TERMINOLOGY.about.mhBrandName, "i"),
      }),
    ).not.toHaveAttribute("aria-current");
  });

  it("shows a More overlay trigger when enabled", () => {
    render(<PageNavigation items={items} showRemainingPagesOverlay />);
    expect(
      screen.getByRole("button", {
        name: /more/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders remaining pages inside overlay when opened", () => {
    render(<PageNavigation items={items} showRemainingPagesOverlay />);

    fireEvent.click(screen.getByRole("button", { name: /more/i }));

    expect(
      screen.getByRole("dialog", { name: /more pages/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menu", { name: /more pages/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("menuitem", {
        name: new RegExp(PAGE_TERMINOLOGY.events.mhBrandName, "i"),
      }),
    ).toHaveAttribute("href", "/events");
    expect(
      screen.getByRole("menuitem", {
        name: new RegExp(PAGE_TERMINOLOGY.hub.mhBrandName, "i"),
      }),
    ).toHaveAttribute("href", "/hub");
    expect(
      screen.getByText(PAGE_TERMINOLOGY.events.seoName),
    ).toBeInTheDocument();
    expect(screen.getByText(PAGE_TERMINOLOGY.hub.seoName)).toBeInTheDocument();
  });

  it("closes overlay on Escape and restores focus to trigger", () => {
    render(<PageNavigation items={items} showRemainingPagesOverlay />);

    const trigger = screen.getByRole("button", { name: /more/i });
    trigger.focus();
    fireEvent.click(trigger);

    expect(
      screen.getByRole("dialog", { name: /more pages/i }),
    ).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    expect(
      screen.queryByRole("dialog", { name: /more pages/i }),
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
