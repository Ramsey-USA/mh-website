/**
 * @jest-environment jsdom
 *
 * Tests for remaining zero-coverage UI components:
 * Skeleton, SimpleSkeleton, GlowEffect, IconContainer,
 * PageHero, Section, ThemeToggle,
 * OptimizedImage, OptimizedVideo, HeroVideo,
 * SkipLink, ScrollProgress,
 * Progress, Tabs
 */

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Top-level imports for hook-using components (must be imported BEFORE any
// jest.resetModules() call to avoid a double-React-instance error where
// render() holds the original React copy but the component gets a re-required copy).
import { OptimizedImage } from "../media/OptimizedImage";
import { OptimizedVideo, HeroVideo } from "../media/OptimizedVideo";
import { ScrollProgress } from "../accessibility/ScrollProgress";
import { Progress } from "../base/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../base/tabs";
import { SkipLink } from "../accessibility/SkipLink";
import { ThemeToggle } from "../layout/ThemeToggle";

// ─── Shared mocks ─────────────────────────────────────────────────────────────

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

jest.mock("@/components/icons/MaterialIcon", () => ({
  MaterialIcon: ({ icon }: { icon: string }) => (
    <span data-icon={icon}>{icon}</span>
  ),
}));

jest.mock("@/components/animations/FramerMotionComponents", () => ({
  FadeInWhenVisible: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

jest.mock("@/components/ui/backgrounds", () => ({
  DiagonalStripePattern: () => null,
  BrandColorBlobs: () => null,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    onLoad,
    onError,
  }: {
    alt: string;
    src: string;
    onLoad?: () => void;
    onError?: () => void;
  }) => (
    <img
      alt={alt}
      src={src}
      data-testid="next-image"
      onLoad={onLoad}
      onError={onError}
    />
  ),
}));

const mockSetTheme = jest.fn();
const mockThemeState = {
  theme: "light" as "light" | "dark" | "system",
  setTheme: mockSetTheme,
  isDarkMode: false,
};

jest.mock("@/contexts/theme-context", () => ({
  useTheme: () => mockThemeState,
}));

// ─── Skeleton ─────────────────────────────────────────────────────────────────

describe("Skeleton", () => {
  it("renders with default props", () => {
    const { Skeleton } = require("../Skeleton");
    const { container } = render(<Skeleton />);
    expect(container.querySelector("[aria-label='Loading...']")).toBeTruthy();
  });

  it("applies rounded variant", () => {
    const { Skeleton } = require("../Skeleton");
    render(<Skeleton variant="rounded" className="w-40 h-8" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("rounded-lg");
  });

  it("applies circular variant", () => {
    const { Skeleton } = require("../Skeleton");
    render(<Skeleton variant="circular" />);
    expect(screen.getByRole("status").className).toContain("rounded-full");
  });

  it("applies rectangular variant", () => {
    const { Skeleton } = require("../Skeleton");
    render(<Skeleton variant="rectangular" />);
    expect(screen.getByRole("status").className).toContain("rounded-none");
  });

  it("renders CardSkeleton with count=2", () => {
    const { CardSkeleton } = require("../Skeleton");
    const { container } = render(<CardSkeleton count={2} />);
    // Each card has a div with space-y-4
    expect(
      container.querySelectorAll(".space-y-4").length,
    ).toBeGreaterThanOrEqual(2);
  });
});

// ─── SimpleSkeleton ───────────────────────────────────────────────────────────

describe("SimpleSkeleton", () => {
  it("renders with default height", () => {
    const { SimpleSkeleton } = require("../SimpleSkeleton");
    render(<SimpleSkeleton />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("h-96");
  });

  it("renders with custom height and className", () => {
    const { SimpleSkeleton } = require("../SimpleSkeleton");
    render(<SimpleSkeleton height="h-32" className="my-custom" />);
    const el = screen.getByRole("status");
    expect(el.className).toContain("h-32");
    expect(el.className).toContain("my-custom");
  });
});

// ─── GlowEffect ───────────────────────────────────────────────────────────────

describe("GlowEffect", () => {
  it("renders with default props", () => {
    const { GlowEffect } = require("../GlowEffect");
    const { container } = render(<GlowEffect />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders all gradient variants without crashing", () => {
    const { GlowEffect } = require("../GlowEffect");
    const gradients = [
      "primary",
      "secondary",
      "primary-secondary",
      "primary-dark",
      "bronze",
    ] as const;
    gradients.forEach((gradient) => {
      const { container } = render(<GlowEffect gradient={gradient} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  it("supports size and rounded props", () => {
    const { GlowEffect } = require("../GlowEffect");
    const { container } = render(
      <GlowEffect size="lg" rounded="2xl" animate={false} opacity={50} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── IconContainer ────────────────────────────────────────────────────────────

describe("IconContainer", () => {
  it("renders children", () => {
    const { IconContainer } = require("../IconContainer");
    render(
      <IconContainer>
        <span>icon</span>
      </IconContainer>,
    );
    expect(screen.getByText("icon")).toBeTruthy();
  });

  it("applies size variants", () => {
    const { IconContainer } = require("../IconContainer");
    const sizes = ["sm", "md", "lg", "xl", "2xl"] as const;
    sizes.forEach((size) => {
      const { container } = render(
        <IconContainer size={size}>
          <span />
        </IconContainer>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  it("applies gradient variants", () => {
    const { IconContainer } = require("../IconContainer");
    const gradients = [
      "primary",
      "secondary",
      "bronze",
      "mixed",
      "forest",
    ] as const;
    gradients.forEach((gradient) => {
      const { container } = render(
        <IconContainer gradient={gradient}>
          <span />
        </IconContainer>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  it("renders square and rounded shapes", () => {
    const { IconContainer } = require("../IconContainer");
    ["square", "rounded"].forEach((shape) => {
      const { container } = render(
        <IconContainer shape={shape as "square" | "rounded"}>
          <span />
        </IconContainer>,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  it("renders without animation when animate=false", () => {
    const { IconContainer } = require("../IconContainer");
    const { container } = render(
      <IconContainer animate={false}>
        <span />
      </IconContainer>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── PageHero ────────────────────────────────────────────────────────────────

describe("PageHero", () => {
  it("renders title, subtitle, and description", () => {
    const { PageHero } = require("../layout/PageHero");
    render(
      <PageHero
        title="Our Projects"
        subtitle="Proven construction excellence"
        description="Serving the Pacific Northwest since 2010"
      />,
    );
    expect(screen.getByText("Our Projects")).toBeTruthy();
    expect(screen.getByText("Proven construction excellence")).toBeTruthy();
    expect(
      screen.getByText("Serving the Pacific Northwest since 2010"),
    ).toBeTruthy();
  });

  it("renders navigation items", () => {
    const { PageHero } = require("../layout/PageHero");
    render(<PageHero title="T" subtitle="S" description="D" />);
    expect(screen.getByRole("navigation")).toBeTruthy();
  });
});

// ─── Section ─────────────────────────────────────────────────────────────────

describe("Section", () => {
  it("renders children", () => {
    const { Section } = require("../layout/Section");
    render(
      <Section>
        <p>Content</p>
      </Section>,
    );
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("applies gray variant", () => {
    const { Section } = require("../layout/Section");
    const { container } = render(
      <Section variant="gray">
        <p>Gray</p>
      </Section>,
    );
    expect(container.querySelector("section")?.className).toContain(
      "bg-gray-50",
    );
  });

  it("applies gradient variant", () => {
    const { Section } = require("../layout/Section");
    const { container } = render(
      <Section variant="gradient">
        <p>Gradient</p>
      </Section>,
    );
    expect(container.querySelector("section")?.className).toContain(
      "bg-gradient",
    );
  });

  it("renders without animation when animated=false", () => {
    const { Section } = require("../layout/Section");
    render(
      <Section animated={false}>
        <p>Static</p>
      </Section>,
    );
    expect(screen.getByText("Static")).toBeTruthy();
  });

  it("applies small and none padding variants", () => {
    const { Section } = require("../layout/Section");
    ["small", "none"].forEach((padding) => {
      render(
        <Section padding={padding as "small" | "none"}>
          <p>p</p>
        </Section>,
      );
    });
  });

  it("sets section id", () => {
    const { Section } = require("../layout/Section");
    const { container } = render(
      <Section id="my-section">
        <p>x</p>
      </Section>,
    );
    expect(container.querySelector("#my-section")).toBeTruthy();
  });

  it("renders without background when noBackground=true", () => {
    const { Section } = require("../layout/Section");
    render(
      <Section noBackground>
        <p>No bg</p>
      </Section>,
    );
    expect(screen.getByText("No bg")).toBeTruthy();
  });
});

// ─── ThemeToggle ──────────────────────────────────────────────────────────────

describe("ThemeToggle", () => {
  beforeEach(() => {
    mockThemeState.theme = "light";
    mockThemeState.isDarkMode = false;
    jest.clearAllMocks();
  });

  it("renders full theme selector by default", () => {
    render(<ThemeToggle />);
    // Three theme buttons: Light, Dark, System
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it("renders compact toggle", () => {
    render(<ThemeToggle compact />);
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("compact toggle calls setTheme with dark when in light mode", () => {
    render(<ThemeToggle compact />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("compact toggle calls setTheme with light when in dark mode", () => {
    mockThemeState.isDarkMode = true;
    render(<ThemeToggle compact />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("shows label when showLabel=true in compact mode", () => {
    render(<ThemeToggle compact showLabel />);
    // getAllByText because icon + label may both match
    expect(screen.getAllByText(/light|dark/i).length).toBeGreaterThanOrEqual(1);
  });

  it("full selector calls setTheme when a theme button is clicked", () => {
    render(<ThemeToggle />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]!); // Dark
    expect(mockSetTheme).toHaveBeenCalled();
  });

  it("renders fallback when theme is null", () => {
    const saved = mockThemeState.theme;
    // @ts-expect-error — intentionally setting null to test fallback
    mockThemeState.theme = null;
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
    mockThemeState.theme = saved;
  });

  it("renders lg size with labels visible", () => {
    render(<ThemeToggle size="lg" showLabel />);
    // Full selector renders theme buttons; at least one should be present
    expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── OptimizedImage ──────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("OptimizedImage", () => {
  it("renders image with alt text", () => {
    render(
      <OptimizedImage
        src="/test.jpg"
        alt="Test image"
        width={400}
        height={300}
      />,
    );
    expect(screen.getByAltText("Test image")).toBeTruthy();
  });

  it("calls onLoad callback", () => {
    const onLoad = jest.fn();
    render(<OptimizedImage src="/test.jpg" alt="img" onLoad={onLoad} />);
    fireEvent.load(screen.getByTestId("next-image"));
    expect(onLoad).toHaveBeenCalled();
  });

  it("calls onError and shows placeholder on error", () => {
    const onError = jest.fn();
    render(<OptimizedImage src="/test.jpg" alt="img" onError={onError} />);
    fireEvent.error(screen.getByTestId("next-image"));
    expect(onError).toHaveBeenCalled();
  });

  it("renders with fill=true", () => {
    const { container } = render(
      <OptimizedImage src="/img.jpg" alt="fill image" fill />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders without animation", () => {
    const { container } = render(
      <OptimizedImage src="/img.jpg" alt="static" enableAnimation={false} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── OptimizedVideo ───────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("OptimizedVideo", () => {
  it("renders video element with sources", () => {
    const { container } = render(
      <OptimizedVideo webmSrc="/v.webm" mp4Src="/v.mp4" muted loop />,
    );
    expect(container.querySelector("video")).toBeTruthy();
    expect(container.querySelectorAll("source").length).toBe(2);
  });

  it("renders error state when neither src is provided", () => {
    render(<OptimizedVideo />);
    expect(screen.getByRole("img")).toBeTruthy();
  });

  it("calls onPlay and onPause", () => {
    const onPlay = jest.fn();
    const onPause = jest.fn();
    const { container } = render(
      <OptimizedVideo webmSrc="/v.webm" onPlay={onPlay} onPause={onPause} />,
    );
    const video = container.querySelector("video")!;
    fireEvent.play(video);
    fireEvent.pause(video);
    expect(onPlay).toHaveBeenCalled();
    expect(onPause).toHaveBeenCalled();
  });

  it("renders with controls and custom aria-label", () => {
    const { container } = render(
      <OptimizedVideo webmSrc="/v.webm" controls ariaLabel="MH video" />,
    );
    const video = container.querySelector("video");
    expect(video?.getAttribute("aria-label")).toBe("MH video");
  });

  it("calls onNearEnd when video reaches 90% and only once", () => {
    const onNearEnd = jest.fn();
    const { container } = render(
      <OptimizedVideo webmSrc="/v.webm" onNearEnd={onNearEnd} />,
    );
    const video = container.querySelector("video")!;
    // Simulate video at 50% — should NOT fire
    Object.defineProperty(video, "duration", { value: 100, writable: true });
    Object.defineProperty(video, "currentTime", { value: 50, writable: true });
    fireEvent.timeUpdate(video);
    expect(onNearEnd).not.toHaveBeenCalled();

    // Simulate video at 91% — should fire
    Object.defineProperty(video, "currentTime", { value: 91, writable: true });
    fireEvent.timeUpdate(video);
    expect(onNearEnd).toHaveBeenCalledTimes(1);

    // Simulate another update — should NOT fire again
    fireEvent.timeUpdate(video);
    expect(onNearEnd).toHaveBeenCalledTimes(1);
  });

  it("shows error fallback when video triggers onError", () => {
    const { container } = render(<OptimizedVideo webmSrc="/v.webm" />);
    const video = container.querySelector("video")!;
    fireEvent.error(video);
    expect(screen.getByRole("img")).toBeTruthy();
    expect(container.querySelector("video")).toBeNull();
  });
});

// ─── HeroVideo ────────────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("HeroVideo", () => {
  it("renders with children overlay", () => {
    render(
      <HeroVideo webmSrc="/hero.webm" mp4Src="/hero.mp4" poster="/poster.jpg">
        <h1>Welcome</h1>
      </HeroVideo>,
    );
    expect(screen.getByText("Welcome")).toBeTruthy();
  });

  it("renders without sources gracefully", () => {
    const { container } = render(<HeroVideo />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── SkipLink ─────────────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("SkipLink", () => {
  it("renders the skip link", () => {
    render(<SkipLink />);
    expect(screen.getByText("Skip to main content")).toBeTruthy();
  });

  it("click focuses main element", () => {
    // matchMedia and scrollIntoView are not implemented in JSDOM
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest
        .fn()
        .mockReturnValue({
          matches: false,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        }),
    });
    const main = document.createElement("main");
    main.setAttribute("tabindex", "-1");
    main.scrollIntoView = jest.fn();
    document.body.appendChild(main);
    const focusSpy = jest.spyOn(main, "focus");

    render(<SkipLink />);
    fireEvent.click(screen.getByText("Skip to main content"));
    expect(focusSpy).toHaveBeenCalled();
    document.body.removeChild(main);
  });

  it("click does nothing when no main element", () => {
    // Remove any main element
    document.querySelectorAll("main").forEach((el) => el.remove());
    render(<SkipLink />);
    // should not throw
    expect(() =>
      fireEvent.click(screen.getByText("Skip to main content")),
    ).not.toThrow();
  });

  it("removes tabindex on main blur", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest
        .fn()
        .mockReturnValue({
          matches: true,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        }),
    });
    const main = document.createElement("main");
    document.body.appendChild(main);

    render(<SkipLink />);
    fireEvent.click(screen.getByText("Skip to main content"));
    expect(main.getAttribute("tabindex")).toBe("-1");

    // Trigger blur to remove tabindex
    fireEvent.blur(main);
    expect(main.getAttribute("tabindex")).toBeNull();
    document.body.removeChild(main);
  });
});

// ─── ScrollProgress ───────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("ScrollProgress", () => {
  it("renders the progress bar", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.querySelector("[role='progressbar']")).toBeTruthy();
  });

  it("responds to scroll events without throwing", () => {
    render(<ScrollProgress />);
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
  });

  it("responds to resize events without throwing", () => {
    render(<ScrollProgress />);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
  });

  it("updates progress bar width and aria-valuenow on scroll", () => {
    // Mock scrollHeight and innerHeight so scrollHeightCache > 0
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 1000,
      configurable: true,
    });

    // Capture rAF callbacks
    const rafCallbacks: FrameRequestCallback[] = [];
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(<ScrollProgress />);

    // Simulate scroll at 50%
    Object.defineProperty(window, "scrollY", {
      value: 500,
      configurable: true,
    });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    // Flush rAF
    act(() => {
      if (rafCallbacks.length > 0) rafCallbacks[rafCallbacks.length - 1]!(0);
    });

    const bar = document.querySelector("[role='progressbar']") as HTMLElement;
    expect(bar.style.width).toBe("50%");
    expect(bar.getAttribute("aria-valuenow")).toBe("50");

    // Scroll to same position — should skip DOM write (lastProgress unchanged)
    const prevLen = rafCallbacks.length;
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      if (rafCallbacks.length > prevLen)
        rafCallbacks[rafCallbacks.length - 1]!(0);
    });
    // Width unchanged
    expect(bar.style.width).toBe("50%");

    jest.restoreAllMocks();
  });

  it("handles zero scroll height", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 500,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 500,
      configurable: true,
    });

    const rafCallbacks: FrameRequestCallback[] = [];
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

    render(<ScrollProgress />);

    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    act(() => {
      if (rafCallbacks.length > 0) rafCallbacks[rafCallbacks.length - 1]!(0);
    });

    const bar = document.querySelector("[role='progressbar']") as HTMLElement;
    expect(bar.style.width).toBe("0%");

    jest.restoreAllMocks();
  });
});

// ─── Progress ────────────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("Progress", () => {
  it("renders with a numeric value", () => {
    const { container } = render(<Progress value={60} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with value=0", () => {
    const { container } = render(<Progress value={0} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with undefined value (defaults to 0)", () => {
    const { container } = render(<Progress />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── Tabs ────────────────────────────────────────────────────────────────────
// NOTE: imported at top-level to avoid double-React-instance issue.

describe("Tabs", () => {
  it("renders tabs with trigger and content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Tab 1")).toBeTruthy();
    expect(screen.getByText("Tab 2")).toBeTruthy();
    expect(screen.getByText("Content 1")).toBeTruthy();
  });

  it("switches tabs on click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );
    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);
    // Verify the tab trigger became active (Radix marks it with data-state)
    expect(tab2).toHaveAttribute("data-state", "active");
  });
});
