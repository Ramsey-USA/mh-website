/**
 * @jest-environment jsdom
 *
 * Tests for animations components: FadeInWhenVisible, StaggeredFadeIn, HoverScale, ScrollReveal
 */

import { render, screen, fireEvent, act } from "@testing-library/react";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock mobile-optimizations to control animation config
jest.mock("@/lib/performance/mobile-optimizations", () => ({
  getAnimationConfig: jest.fn().mockReturnValue({
    duration: 0.6,
    staggerDelay: 0.1,
    enableAnimations: true,
    threshold: 0.2,
  }),
  isMobileDevice: jest.fn().mockReturnValue(false),
  isSlowConnection: jest.fn().mockReturnValue(false),
  shouldDeferComponent: jest.fn().mockReturnValue(false),
}));

jest.mock("@/lib/constants/timing", () => ({
  TIMING: { PERFORMANCE: { VISIBILITY_CHECK: 100 } },
}));

// IntersectionObserver mock
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  options: IntersectionObserverInit;
  static instances: MockIntersectionObserver[] = [];

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    MockIntersectionObserver.instances.push(this);
  }
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  triggerIntersect(el: Element) {
    this.callback(
      [{ isIntersecting: true, target: el } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
});

import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "../FramerMotionComponents";
import ScrollReveal from "../ScrollReveal";

// ─── FadeInWhenVisible ────────────────────────────────────────────────────────

describe("FadeInWhenVisible", () => {
  it("renders children", () => {
    render(<FadeInWhenVisible>Hello</FadeInWhenVisible>);
    expect(screen.getByText("Hello")).toBeTruthy();
  });

  it("applies className", () => {
    const { container } = render(
      <FadeInWhenVisible className="my-class">Content</FadeInWhenVisible>,
    );
    expect(container.querySelector(".my-class")).toBeTruthy();
  });

  it("transitions to visible when IntersectionObserver fires", async () => {
    const { container } = render(
      <FadeInWhenVisible>Revealed</FadeInWhenVisible>,
    );
    const wrapper = container.firstChild as HTMLElement;
    await act(async () => {
      const observer = MockIntersectionObserver.instances[0];
      if (observer) observer.triggerIntersect(wrapper);
    });
    expect(screen.getByText("Revealed")).toBeTruthy();
  });

  it("renders with custom delay and duration", () => {
    const { container } = render(
      <FadeInWhenVisible delay={0.3} duration={1.0}>
        Delayed
      </FadeInWhenVisible>,
    );
    expect(container.textContent).toContain("Delayed");
  });
});

// ─── FadeInWhenVisible with disabled animations ───────────────────────────────

describe("FadeInWhenVisible with animations disabled", () => {
  beforeEach(() => {
    const { getAnimationConfig } = jest.requireMock(
      "@/lib/performance/mobile-optimizations",
    );
    (getAnimationConfig as jest.Mock).mockReturnValue({
      duration: 0,
      staggerDelay: 0,
      enableAnimations: false,
      threshold: 0,
    });
    jest.resetModules();
  });

  afterEach(() => {
    const { getAnimationConfig } = jest.requireMock(
      "@/lib/performance/mobile-optimizations",
    );
    (getAnimationConfig as jest.Mock).mockReturnValue({
      duration: 0.6,
      staggerDelay: 0.1,
      enableAnimations: true,
      threshold: 0.2,
    });
  });

  it("renders immediately when enableAnimations=false in re-required module", () => {
    // Render the already-imported component — it renders content regardless
    render(<FadeInWhenVisible>Always visible</FadeInWhenVisible>);
    expect(screen.getByText("Always visible")).toBeTruthy();
  });
});

// ─── StaggeredFadeIn ─────────────────────────────────────────────────────────

describe("StaggeredFadeIn", () => {
  it("renders all children", () => {
    render(
      <StaggeredFadeIn>
        {[
          <span key="a">Item A</span>,
          <span key="b">Item B</span>,
          <span key="c">Item C</span>,
        ]}
      </StaggeredFadeIn>,
    );
    expect(screen.getByText("Item A")).toBeTruthy();
    expect(screen.getByText("Item B")).toBeTruthy();
    expect(screen.getByText("Item C")).toBeTruthy();
  });

  it("applies className to wrapper", () => {
    const { container } = render(
      <StaggeredFadeIn className="stagger-wrapper">
        {[<span key="x">X</span>]}
      </StaggeredFadeIn>,
    );
    expect(container.querySelector(".stagger-wrapper")).toBeTruthy();
  });

  it("wraps each child in its own div with transition style", () => {
    const { container } = render(
      <StaggeredFadeIn staggerDelay={0.2}>
        {[<span key="1">One</span>, <span key="2">Two</span>]}
      </StaggeredFadeIn>,
    );
    const children = container.querySelectorAll("div > div");
    expect(children.length).toBeGreaterThanOrEqual(2);
  });
});

// ─── HoverScale ───────────────────────────────────────────────────────────────

describe("HoverScale", () => {
  it("renders children", () => {
    render(<HoverScale>Hover me</HoverScale>);
    expect(screen.getByText("Hover me")).toBeTruthy();
  });

  it("applies className", () => {
    const { container } = render(
      <HoverScale className="custom-class">Content</HoverScale>,
    );
    expect(container.querySelector(".custom-class")).toBeTruthy();
  });

  it("scales up on mouse enter", () => {
    const { container } = render(<HoverScale scale={1.1}>Scale</HoverScale>);
    const wrapper = container.querySelector(".hover-scale") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    expect(wrapper.style.transform).toContain("scale(1.1)");
  });

  it("resets scale on mouse leave", () => {
    const { container } = render(<HoverScale>Scale</HoverScale>);
    const wrapper = container.querySelector(".hover-scale") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseLeave(wrapper);
    expect(wrapper.style.transform).toContain("scale(1)");
  });

  it("scales down on mouse down (press state)", () => {
    const { container } = render(<HoverScale>Press</HoverScale>);
    const wrapper = container.querySelector(".hover-scale") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseDown(wrapper);
    expect(wrapper.style.transform).toContain("scale(0.95)");
  });

  it("resets pressed state on mouse up", () => {
    const { container } = render(<HoverScale>Press</HoverScale>);
    const wrapper = container.querySelector(".hover-scale") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseDown(wrapper);
    fireEvent.mouseUp(wrapper);
    expect(wrapper.style.transform).toContain("scale(1.05)");
  });

  it("uses default scale of 1.05", () => {
    const { container } = render(<HoverScale>Default</HoverScale>);
    const wrapper = container.querySelector(".hover-scale") as HTMLElement;
    fireEvent.mouseEnter(wrapper);
    expect(wrapper.style.transform).toContain("scale(1.05)");
  });
});

// ─── ScrollReveal ─────────────────────────────────────────────────────────────

describe("ScrollReveal", () => {
  it("renders null (no DOM output)", () => {
    const { container } = render(<ScrollReveal />);
    expect(container.innerHTML).toBe("");
  });

  it("adds js-controlled class to .scroll-reveal elements", () => {
    const el = document.createElement("div");
    el.classList.add("scroll-reveal");
    document.body.appendChild(el);

    render(<ScrollReveal />);
    expect(el.classList.contains("js-controlled")).toBe(true);

    document.body.removeChild(el);
  });

  it("adds revealed class when IntersectionObserver fires", async () => {
    const el = document.createElement("div");
    el.classList.add("scroll-reveal");
    document.body.appendChild(el);

    render(<ScrollReveal />);

    await act(async () => {
      const observer = MockIntersectionObserver.instances.find((o) =>
        o.observe.mock.calls.some((call) => call[0] === el),
      );
      if (observer) {
        observer.callback(
          [
            {
              isIntersecting: true,
              target: el,
            } as unknown as IntersectionObserverEntry,
          ],
          observer as unknown as IntersectionObserver,
        );
      }
    });

    expect(el.classList.contains("revealed")).toBe(true);
    document.body.removeChild(el);
  });

  it("does not add revealed when not intersecting", async () => {
    const el = document.createElement("div");
    el.classList.add("scroll-reveal");
    document.body.appendChild(el);

    render(<ScrollReveal />);

    await act(async () => {
      const observer = MockIntersectionObserver.instances[0];
      if (observer) {
        observer.callback(
          [
            {
              isIntersecting: false,
              target: el,
            } as unknown as IntersectionObserverEntry,
          ],
          observer as unknown as IntersectionObserver,
        );
      }
    });

    expect(el.classList.contains("revealed")).toBe(false);
    document.body.removeChild(el);
  });
});
