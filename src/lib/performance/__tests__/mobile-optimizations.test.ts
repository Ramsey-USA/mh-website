/**
 * Tests for lib/performance/mobile-optimizations.ts
 *
 * Covers: isMobileDevice, isSlowConnection, prefersReducedMotion, getAnimationConfig
 */

import {
  isMobileDevice,
  isSlowConnection,
  prefersReducedMotion,
  getAnimationConfig,
  getMobileImageConfig,
  shouldDeferComponent,
  getObserverOptions,
} from "../mobile-optimizations";

// ── isMobileDevice ────────────────────────────────────────────────────────────

describe("isMobileDevice()", () => {
  const originalUA = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUA,
      configurable: true,
    });
  });

  it("returns false for a desktop user-agent", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      configurable: true,
    });
    expect(isMobileDevice()).toBe(false);
  });

  it("returns true for an Android user-agent", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/90.0.4430.210 Mobile",
      configurable: true,
    });
    expect(isMobileDevice()).toBe(true);
  });

  it("returns true for an iPhone user-agent", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
      configurable: true,
    });
    expect(isMobileDevice()).toBe(true);
  });
});

// ── isSlowConnection ──────────────────────────────────────────────────────────

describe("isSlowConnection()", () => {
  it("returns false when navigator.connection is not available", () => {
    // jsdom does not expose navigator.connection
    expect(isSlowConnection()).toBe(false);
  });

  it("returns true when connection.effectiveType is 2g", () => {
    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "2g" },
      configurable: true,
      writable: true,
    });
    expect(isSlowConnection()).toBe(true);
    // Restore
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });

  it("returns true when connection.saveData is true", () => {
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
      writable: true,
    });
    expect(isSlowConnection()).toBe(true);
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });

  it("returns false for a fast connection", () => {
    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "4g", saveData: false },
      configurable: true,
      writable: true,
    });
    expect(isSlowConnection()).toBe(false);
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });
});

// ── prefersReducedMotion ──────────────────────────────────────────────────────

describe("prefersReducedMotion()", () => {
  it("returns false when matchMedia returns no-preference", () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    expect(prefersReducedMotion()).toBe(false);
  });

  it("returns true when matchMedia indicates reduced-motion preference", () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    expect(prefersReducedMotion()).toBe(true);
  });
});

// ── getAnimationConfig ────────────────────────────────────────────────────────

describe("getAnimationConfig()", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });

  it("returns enableAnimations:true for a desktop device with normal connection", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    const config = getAnimationConfig();
    expect(config.enableAnimations).toBe(true);
  });

  it("uses shorter duration and smaller stagger on mobile", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Linux; Android 11) Mobile",
      configurable: true,
    });
    const config = getAnimationConfig();
    expect(config.duration).toBe(0.4);
    expect(config.staggerDelay).toBe(0.05);
    expect(config.threshold).toBe(0.1);
  });

  it("uses longer duration and larger stagger on desktop", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    const config = getAnimationConfig();
    expect(config.duration).toBe(0.6);
    expect(config.staggerDelay).toBe(0.1);
    expect(config.threshold).toBe(0.2);
  });

  it("disables animations when user prefers reduced motion", () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });
    const config = getAnimationConfig();
    expect(config.enableAnimations).toBe(false);
  });
});

// ── getMobileImageConfig ──────────────────────────────────────────────────────

describe("getMobileImageConfig()", () => {
  const originalUA = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUA,
      configurable: true,
    });
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });
  });

  it("returns high quality, priority loading on desktop with fast connection", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    const config = getMobileImageConfig();
    expect(config.quality).toBe(85);
    expect(config.priority).toBe(true);
    expect(config.loading).toBe("eager");
  });

  it("returns medium quality and no priority on mobile device", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/90.0.4430.210 Mobile",
      configurable: true,
    });
    const config = getMobileImageConfig();
    expect(config.quality).toBe(75);
    expect(config.priority).toBe(false);
    expect(config.loading).toBe("eager");
  });

  it("returns low quality and lazy loading on slow connection", () => {
    Object.defineProperty(navigator, "connection", {
      value: { effectiveType: "2g" },
      configurable: true,
      writable: true,
    });
    const config = getMobileImageConfig();
    expect(config.quality).toBe(60);
    expect(config.loading).toBe("lazy");
  });
});

// ── shouldDeferComponent ──────────────────────────────────────────────────────

describe("shouldDeferComponent()", () => {
  const originalUA = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUA,
      configurable: true,
    });
    Object.defineProperty(navigator, "connection", {
      value: undefined,
      configurable: true,
    });
  });

  it("returns false on desktop with fast connection", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    expect(shouldDeferComponent()).toBe(false);
  });

  it("returns true on mobile device", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
      configurable: true,
    });
    expect(shouldDeferComponent()).toBe(true);
  });

  it("returns true on slow connection", () => {
    Object.defineProperty(navigator, "connection", {
      value: { saveData: true },
      configurable: true,
      writable: true,
    });
    expect(shouldDeferComponent()).toBe(true);
  });
});

// ── getObserverOptions ────────────────────────────────────────────────────────

describe("getObserverOptions()", () => {
  const originalUA = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, "userAgent", {
      value: originalUA,
      configurable: true,
    });
  });

  it("returns larger rootMargin and threshold on desktop", () => {
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      configurable: true,
    });
    const opts = getObserverOptions();
    expect(opts.rootMargin).toBe("100px");
    expect(opts.threshold).toBe(0.2);
  });

  it("returns smaller rootMargin and threshold on mobile", () => {
    Object.defineProperty(navigator, "userAgent", {
      value:
        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 Chrome/90.0.4430.210 Mobile",
      configurable: true,
    });
    const opts = getObserverOptions();
    expect(opts.rootMargin).toBe("50px");
    expect(opts.threshold).toBe(0.1);
  });
});
