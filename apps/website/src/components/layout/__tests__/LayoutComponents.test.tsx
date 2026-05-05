/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SectionContainer } from "../SectionContainer";
import FaviconLinks from "../FaviconLinks";
import { UnderConstruction } from "../UnderConstruction";

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={typeof href === "string" ? href : "/"} {...props}>
      {children}
    </a>
  ),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

jest.mock("@/components/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("@/lib/constants/company", () => ({
  COMPANY_INFO: {
    phone: { display: "(509) 308-6489", tel: "+15093086489" },
    email: { main: "office@mhc-gc.com" },
    urls: { getSiteUrl: () => "https://mhc-gc.com" },
  },
}));

// ── SectionContainer ─────────────────────────────────────────────────────────

describe("SectionContainer", () => {
  it("renders children with default (full / default-padding) classes", () => {
    const { container } = render(
      <SectionContainer>
        <span>Hello</span>
      </SectionContainer>,
    );
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("container", "mx-auto");
  });

  it("applies xl size class", () => {
    const { container } = render(
      <SectionContainer size="xl">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("max-w-7xl");
  });

  it("applies lg size class", () => {
    const { container } = render(
      <SectionContainer size="lg">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("max-w-5xl");
  });

  it("applies md size class", () => {
    const { container } = render(
      <SectionContainer size="md">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("max-w-3xl");
  });

  it("applies sm size class", () => {
    const { container } = render(
      <SectionContainer size="sm">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("max-w-2xl");
  });

  it("applies compact padding class", () => {
    const { container } = render(
      <SectionContainer padding="compact">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("px-4");
    // compact does NOT have sm:px-6 so lg:px-8 shouldn't be applied
    expect(container.firstChild).not.toHaveClass("lg:px-8");
  });

  it("applies no padding when padding='none'", () => {
    const { container } = render(
      <SectionContainer padding="none">content</SectionContainer>,
    );
    expect(container.firstChild).not.toHaveClass("px-4");
  });

  it("merges extra className prop", () => {
    const { container } = render(
      <SectionContainer className="py-12 bg-gray-50">content</SectionContainer>,
    );
    expect(container.firstChild).toHaveClass("py-12", "bg-gray-50");
  });
});

// ── FaviconLinks ─────────────────────────────────────────────────────────────

describe("FaviconLinks", () => {
  it("renders all expected link rel tags", () => {
    render(<FaviconLinks />);
    // React 19 hoists <link> elements to document.head
    const links = document.head.querySelectorAll("link");
    const rels = Array.from(links).map((l) => l.getAttribute("rel"));

    expect(rels).toContain("icon");
    expect(rels).toContain("apple-touch-icon");
    expect(rels).toContain("shortcut icon");
  });

  it("includes a 16×16 PNG icon link", () => {
    render(<FaviconLinks />);
    const link = document.head.querySelector('link[sizes="16x16"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/icons/icon-16x16.png");
  });

  it("includes a 180×180 apple-touch-icon", () => {
    render(<FaviconLinks />);
    const link = document.head.querySelector('link[sizes="180x180"]');
    expect(link).not.toBeNull();
    expect(link?.getAttribute("href")).toBe("/icons/icon-180x180.png");
  });
});

// ── UnderConstruction ────────────────────────────────────────────────────────

describe("UnderConstruction", () => {
  it("renders the page name and 'Under Construction' heading", () => {
    render(<UnderConstruction pageName="Portfolio" />);
    expect(screen.getByText("Portfolio Page")).toBeInTheDocument();
    expect(screen.getByText("Under Construction")).toBeInTheDocument();
  });

  it("uses default description when none supplied", () => {
    render(<UnderConstruction pageName="Test" />);
    expect(screen.getByText(/we're refining this page/i)).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(
      <UnderConstruction
        pageName="Test"
        description="Custom description here"
      />,
    );
    expect(screen.getByText("Custom description here")).toBeInTheDocument();
  });

  it("renders custom estimatedCompletion", () => {
    render(<UnderConstruction pageName="Test" estimatedCompletion="Q2 2026" />);
    expect(screen.getByText(/Q2 2026/)).toBeInTheDocument();
  });

  it("shows 'Contact Us' CTA by default (showContactCTA=true)", () => {
    render(<UnderConstruction pageName="Test" />);
    expect(
      screen.getByText(/ready to start your project/i),
    ).toBeInTheDocument();
  });

  it("hides CTA section when showContactCTA=false", () => {
    render(<UnderConstruction pageName="Test" showContactCTA={false} />);
    expect(
      screen.queryByText(/ready to start your project/i),
    ).not.toBeInTheDocument();
  });
});
