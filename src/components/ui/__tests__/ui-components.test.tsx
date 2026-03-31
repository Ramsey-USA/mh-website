/**
 * @jest-environment jsdom
 *
 * Tests for zero-coverage UI components:
 * AlternatingShowcase, ContentCard, Timeline, AnimatedCounter
 */

import React, { act } from "react";
import { render, screen } from "@testing-library/react";

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("@/components/templates/BrandedContentSection", () => ({
  BrandedContentSection: ({
    children,
    id,
  }: {
    children: React.ReactNode;
    id?: string;
  }) => <section id={id}>{children}</section>,
}));

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

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// ── AlternatingShowcase ───────────────────────────────────────────────────────

describe("AlternatingShowcase", () => {
  const { AlternatingShowcase } = require("../AlternatingShowcase");

  const items = [
    {
      id: "item-1",
      title: "First Item",
      icon: "build",
      tagline: "Tagline one",
      description: "Description one",
      image: "/images/img1.jpg",
      iconBg: "bg-brand-primary",
      stats: "100+",
      statsLabel: "Projects",
    },
    {
      id: "item-2",
      title: "Second Item",
      icon: "engineering",
      tagline: "Tagline two",
      description: "Description two",
      image: "/images/img2.jpg",
      iconBg: "bg-brand-secondary",
    },
  ];

  it("renders without throwing", () => {
    expect(() =>
      render(
        <AlternatingShowcase
          items={items}
          title="Test Title"
          subtitle="Test Subtitle"
          icon="star"
          description="Test description"
        />,
      ),
    ).not.toThrow();
  });

  it("renders all item titles", () => {
    render(
      <AlternatingShowcase
        items={items}
        title="Test Title"
        subtitle="Test Subtitle"
        icon="star"
        description="Test description"
      />,
    );
    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
  });

  it("uses sectionId when provided", () => {
    const { container } = render(
      <AlternatingShowcase
        items={items}
        title="Test Title"
        subtitle="Test Subtitle"
        icon="star"
        description="Test description"
        sectionId="my-section"
      />,
    );
    expect(container.querySelector("#my-section")).toBeInTheDocument();
  });

  it("renders items with stats when stats are provided", () => {
    render(
      <AlternatingShowcase
        items={items}
        title="Test Title"
        subtitle="Test Subtitle"
        icon="star"
        description="Test description"
      />,
    );
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
  });
});

// ── ContentCard ───────────────────────────────────────────────────────────────

describe("ContentCard", () => {
  const { ContentCard } = require("../ContentCard");

  const baseProps = {
    icon: "star",
    category: "Test Category",
    title: "Test Card Title",
    description: "Test card description",
  };

  it("renders without throwing (default variant)", () => {
    expect(() => render(<ContentCard {...baseProps} />)).not.toThrow();
  });

  it("renders the title and category", () => {
    render(<ContentCard {...baseProps} />);
    expect(screen.getByText("Test Card Title")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  it("renders news variant without throwing", () => {
    expect(() =>
      render(<ContentCard {...baseProps} variant="news" />),
    ).not.toThrow();
  });

  it("renders feature variant without throwing", () => {
    expect(() =>
      render(<ContentCard {...baseProps} variant="feature" />),
    ).not.toThrow();
  });

  it("renders service variant without throwing", () => {
    expect(() =>
      render(<ContentCard {...baseProps} variant="service" />),
    ).not.toThrow();
  });

  it("renders with href link", () => {
    render(
      <ContentCard {...baseProps} href="/projects" linkText="View Projects" />,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects");
    expect(screen.getByText("View Projects")).toBeInTheDocument();
  });

  it("renders with enhanced icon style", () => {
    expect(() =>
      render(<ContentCard {...baseProps} enhancedIcon={true} />),
    ).not.toThrow();
  });

  it("renders with secondary categoryColor", () => {
    expect(() =>
      render(<ContentCard {...baseProps} categoryColor="secondary" />),
    ).not.toThrow();
  });

  it("renders with bronze categoryColor", () => {
    expect(() =>
      render(<ContentCard {...baseProps} categoryColor="bronze" />),
    ).not.toThrow();
  });

  it("renders date when provided", () => {
    render(<ContentCard {...baseProps} date="Nov 2025" />);
    expect(screen.getByText("Nov 2025")).toBeInTheDocument();
  });
});

// ── Timeline ──────────────────────────────────────────────────────────────────

describe("Timeline", () => {
  const { Timeline } = require("../Timeline");

  const steps = [
    {
      num: 1,
      icon: "search",
      title: "Step One",
      desc: "First step description",
    },
    {
      num: 2,
      icon: "build",
      title: "Step Two",
      desc: "Second step description",
    },
    {
      num: 3,
      icon: "check",
      title: "Step Three",
      desc: "Third step description",
      position: "left" as const,
    },
  ];

  it("renders without throwing", () => {
    expect(() =>
      render(
        <Timeline
          subtitle="Our Process"
          title="How We Work"
          description="We follow a proven process"
          steps={steps}
        />,
      ),
    ).not.toThrow();
  });

  it("renders all step titles", () => {
    render(
      <Timeline
        subtitle="Our Process"
        title="How We Work"
        description="We follow a proven process"
        steps={steps}
      />,
    );
    expect(screen.getAllByText("Step One").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Step Two").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Step Three").length).toBeGreaterThan(0);
  });

  it("renders with section id", () => {
    const { container } = render(
      <Timeline
        id="process-timeline"
        subtitle="Our Process"
        title="How We Work"
        description="We follow a proven process"
        steps={steps}
      />,
    );
    expect(container.querySelector("#process-timeline")).toBeInTheDocument();
  });

  it("renders with secondary iconBg variant", () => {
    expect(() =>
      render(
        <Timeline
          subtitle="Our Process"
          title="How We Work"
          description="We follow a proven process"
          steps={steps}
          iconBg="secondary"
        />,
      ),
    ).not.toThrow();
  });

  it("renders with bronze iconBg variant", () => {
    expect(() =>
      render(
        <Timeline
          subtitle="Our Process"
          title="How We Work"
          description="We follow a proven process"
          steps={steps}
          iconBg="bronze"
        />,
      ),
    ).not.toThrow();
  });
});

// ── AnimatedCounter ───────────────────────────────────────────────────────────

describe("AnimatedCounter", () => {
  const { AnimatedCounter } = require("../AnimatedCounter");

  beforeEach(() => {
    // Mock IntersectionObserver
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    const mockDisconnect = jest.fn();
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: mockObserve,
      unobserve: mockUnobserve,
      disconnect: mockDisconnect,
    })) as jest.MockedClass<typeof IntersectionObserver>;

    // Mock matchMedia — default: no reduced motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without throwing", () => {
    expect(() => render(<AnimatedCounter value={100} />)).not.toThrow();
  });

  it("renders with animateOnMount=true", () => {
    expect(() =>
      render(<AnimatedCounter value={50} animateOnMount={true} />),
    ).not.toThrow();
  });

  it("renders with prefix and suffix", () => {
    render(
      <AnimatedCounter value={0} prefix="$" suffix="+" animateOnMount={true} />,
    );
    // With animateOnMount, starts animation immediately; renders the span
    const span = document.querySelector("span");
    expect(span).toBeInTheDocument();
  });

  it("renders with decimals", () => {
    expect(() =>
      render(
        <AnimatedCounter value={0.64} decimals={2} animateOnMount={true} />,
      ),
    ).not.toThrow();
  });

  it("skips animation when prefers-reduced-motion", () => {
    // Override matchMedia to indicate reduced motion preference
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: query.includes("reduce"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
    expect(() =>
      render(<AnimatedCounter value={42} animateOnMount={true} />),
    ).not.toThrow();
  });

  it("triggers animation via IntersectionObserver when scrolled into view", () => {
    let observerCallback: IntersectionObserverCallback;
    const mockObserve = jest.fn();
    const mockUnobserve = jest.fn();
    global.IntersectionObserver = jest
      .fn()
      .mockImplementation((cb: IntersectionObserverCallback) => {
        observerCallback = cb;
        return {
          observe: mockObserve,
          unobserve: mockUnobserve,
          disconnect: jest.fn(),
        };
      }) as jest.MockedClass<typeof IntersectionObserver>;

    // animateOnMount defaults to false → uses IntersectionObserver
    render(<AnimatedCounter value={100} />);

    expect(mockObserve).toHaveBeenCalled();

    // Simulate the element scrolling into view
    act(() => {
      observerCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    // The observer callback ran animateValue — no crash
    expect(mockObserve).toHaveBeenCalledTimes(1);
  });

  it("steps through requestAnimationFrame animation loop", () => {
    const rafCallbacks: FrameRequestCallback[] = [];
    const startTime = performance.now();
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });

    const { container } = render(
      <AnimatedCounter value={100} duration={1000} animateOnMount={true} />,
    );

    // First rAF fires — simulate mid-animation
    act(() => {
      if (rafCallbacks.length > 0) rafCallbacks[0]!(startTime + 500);
    });

    // Should have queued another frame since progress < 1
    expect(rafCallbacks.length).toBeGreaterThanOrEqual(2);

    // Fire again at a time past duration to complete animation
    act(() => {
      if (rafCallbacks.length > 1)
        rafCallbacks[rafCallbacks.length - 1]!(startTime + 2000);
    });

    const span = container.querySelector("span");
    expect(span).toBeInTheDocument();
    // Value should be "100" when animation completes (elapsed > duration)
    expect(span!.textContent).toContain("100");
  });
});
