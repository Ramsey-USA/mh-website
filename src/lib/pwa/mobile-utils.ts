/**
 * Mobile PWA Optimization Utilities
 * Handles mobile-specific optimizations, gestures, and app-like behavior
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { logger } from "@/lib/utils/logger";

export interface ViewportInfo {
  width: number;
  height: number;
  scale: number;
  orientation: "portrait" | "landscape";
  isTouch: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasNotch: boolean;
  safeAreaTop: number;
  safeAreaBottom: number;
}

export interface SwipeGesture {
  direction: "left" | "right" | "up" | "down";
  distance: number;
  velocity: number;
  duration: number;
}

/**
 * Viewport and device detection hook
 */
export function useViewport(): ViewportInfo {
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
    width: 0,
    height: 0,
    scale: 1,
    orientation: "portrait",
    isTouch: false,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    hasNotch: false,
    safeAreaTop: 0,
    safeAreaBottom: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = window.devicePixelRatio || 1;
      const orientation = width > height ? "landscape" : "portrait";

      // Device type detection
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isMobile = width <= 768 && isTouch;
      const isTablet = width > 768 && width <= 1024 && isTouch;
      const isDesktop = !isMobile && !isTablet;

      // Safe area detection (for devices with notches)
      const computedStyle = getComputedStyle(document.documentElement);
      const safeAreaTop = parseInt(
        computedStyle.getPropertyValue("--safe-area-inset-top") || "0",
        10
      );
      const safeAreaBottom = parseInt(
        computedStyle.getPropertyValue("--safe-area-inset-bottom") || "0",
        10
      );
      const hasNotch = safeAreaTop > 0 || safeAreaBottom > 0;

      setViewportInfo({
        width,
        height,
        scale,
        orientation,
        isTouch,
        isMobile,
        isTablet,
        isDesktop,
        hasNotch,
        safeAreaTop,
        safeAreaBottom,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  return viewportInfo;
}

/**
 * Swipe gesture detection hook
 */
export function useSwipeGesture(
  onSwipe?: (gesture: SwipeGesture) => void,
  options: {
    threshold?: number;
    velocityThreshold?: number;
    timeThreshold?: number;
  } = {}
) {
  const {
    threshold = 50,
    velocityThreshold = 0.3,
    timeThreshold = 300,
  } = options;

  const startPos = useRef<{ x: number; y: number; time: number } | null>(null);
  const [isGesturing, setIsGesturing] = useState(false);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    startPos.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    setIsGesturing(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!startPos.current) return;

      const touch = e.changedTouches[0];
      const endPos = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };

      const deltaX = endPos.x - startPos.current.x;
      const deltaY = endPos.y - startPos.current.y;
      const duration = endPos.time - startPos.current.time;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance / duration;

      // Check if gesture meets thresholds
      if (
        distance >= threshold &&
        velocity >= velocityThreshold &&
        duration <= timeThreshold
      ) {
        let direction: SwipeGesture["direction"];

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? "right" : "left";
        } else {
          direction = deltaY > 0 ? "down" : "up";
        }

        const gesture: SwipeGesture = {
          direction,
          distance,
          velocity,
          duration,
        };

        onSwipe?.(gesture);
      }

      startPos.current = null;
      setIsGesturing(false);
    },
    [onSwipe, threshold, velocityThreshold, timeThreshold]
  );

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);

  return { isGesturing };
}

/**
 * App-like navigation with swipe support
 */
export function useAppNavigation() {
  const [history, setHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  const navigate = useCallback(
    (path: string) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(path);
        return newHistory;
      });
      setCurrentIndex((prev) => prev + 1);
    },
    [currentIndex]
  );

  const goBack = useCallback(() => {
    if (canGoBack) {
      setCurrentIndex((prev) => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [canGoBack, history, currentIndex]);

  const goForward = useCallback(() => {
    if (canGoForward) {
      setCurrentIndex((prev) => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [canGoForward, history, currentIndex]);

  // Set up swipe navigation
  useSwipeGesture(
    (gesture) => {
      if (gesture.direction === "right" && canGoBack) {
        const path = goBack();
        if (path) window.history.pushState(null, "", path);
      } else if (gesture.direction === "left" && canGoForward) {
        const path = goForward();
        if (path) window.history.pushState(null, "", path);
      }
    },
    { threshold: 100, velocityThreshold: 0.5 }
  );

  return {
    history,
    currentIndex,
    canGoBack,
    canGoForward,
    navigate,
    goBack,
    goForward,
  };
}

/**
 * Pull-to-refresh functionality
 */
export function usePullToRefresh(
  onRefresh: () => Promise<void>,
  options: {
    threshold?: number;
    resistance?: number;
    enabled?: boolean;
  } = {}
) {
  const { threshold = 80, resistance = 2.5, enabled = true } = options;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef<number>(0);
  const isPulling = useRef<boolean>(false);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled || isRefreshing) return;

      // Only start if at top of page
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
        isPulling.current = true;
      }
    },
    [enabled, isRefreshing]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isPulling.current || !enabled) return;

      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY.current;

      if (deltaY > 0) {
        e.preventDefault();
        const distance = Math.min(deltaY / resistance, threshold * 1.5);
        setPullDistance(distance);
      }
    },
    [enabled, resistance, threshold]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling.current || !enabled) return;

    isPulling.current = false;

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        logger.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
  }, [enabled, pullDistance, threshold, isRefreshing, onRefresh]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    isRefreshing,
    pullDistance,
    progress: Math.min(pullDistance / threshold, 1),
  };
}

/**
 * Native-like app bar with scroll behavior
 */
export function useAppBar(
  options: {
    hideOnScroll?: boolean;
    threshold?: number;
  } = {}
) {
  const { hideOnScroll = true, threshold = 10 } = options;
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      if (hideOnScroll) {
        if (currentScrollY > lastScrollY.current + threshold) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current - threshold) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideOnScroll, threshold]);

  return {
    isVisible,
    isScrolled,
  };
}

/**
 * Haptic feedback utilities
 */
export class HapticFeedback {
  static isSupported(): boolean {
    return "vibrate" in navigator;
  }

  static light(): void {
    if (this.isSupported()) {
      navigator.vibrate(10);
    }
  }

  static medium(): void {
    if (this.isSupported()) {
      navigator.vibrate(20);
    }
  }

  static heavy(): void {
    if (this.isSupported()) {
      navigator.vibrate(40);
    }
  }

  static success(): void {
    if (this.isSupported()) {
      navigator.vibrate([10, 10, 10]);
    }
  }

  static error(): void {
    if (this.isSupported()) {
      navigator.vibrate([20, 10, 20, 10, 20]);
    }
  }

  static warning(): void {
    if (this.isSupported()) {
      navigator.vibrate([15, 10, 15]);
    }
  }

  static notification(): void {
    if (this.isSupported()) {
      navigator.vibrate([5, 5, 5]);
    }
  }

  static custom(pattern: number[]): void {
    if (this.isSupported()) {
      navigator.vibrate(pattern);
    }
  }
}

/**
 * App-like loading states
 */
export function useAppLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);

  const startLoading = useCallback((text = "Loading...") => {
    setIsLoading(true);
    setLoadingText(text);
    setProgress(0);
  }, []);

  const updateProgress = useCallback((value: number, text?: string) => {
    setProgress(Math.max(0, Math.min(100, value)));
    if (text) setLoadingText(text);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingText("");
    setProgress(0);
  }, []);

  return {
    isLoading,
    loadingText,
    progress,
    startLoading,
    updateProgress,
    stopLoading,
  };
}

/**
 * Device orientation utilities
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState<{
    angle: number;
    type:
      | "portrait-primary"
      | "portrait-secondary"
      | "landscape-primary"
      | "landscape-secondary";
  }>({
    angle: 0,
    type: "portrait-primary",
  });

  useEffect(() => {
    const updateOrientation = () => {
      if ("screen" in window && "orientation" in window.screen) {
        const { angle, type } = window.screen.orientation;
        setOrientation({ angle, type: type as any });
      }
    };

    updateOrientation();
    window.addEventListener("orientationchange", updateOrientation);

    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, []);

  const lockOrientation = useCallback(async (orientation: string) => {
    if (
      "screen" in window &&
      "orientation" in window.screen &&
      "lock" in window.screen.orientation
    ) {
      try {
        await (window.screen.orientation as any).lock(orientation);
        return true;
      } catch (error) {
        logger.warn("Failed to lock orientation:", error);
        return false;
      }
    }
    return false;
  }, []);

  const unlockOrientation = useCallback(() => {
    if (
      "screen" in window &&
      "orientation" in window.screen &&
      "unlock" in window.screen.orientation
    ) {
      window.screen.orientation.unlock();
    }
  }, []);

  return {
    orientation,
    lockOrientation,
    unlockOrientation,
  };
}

/**
 * Native app-like status bar management
 */
export function useStatusBar() {
  const setStatusBarColor = useCallback(
    (color: string, luminance: "light" | "dark" = "dark") => {
      // Set theme-color meta tag
      let themeColorMeta = document.querySelector(
        'meta[name="theme-color"]'
      ) as HTMLMetaElement;
      if (!themeColorMeta) {
        themeColorMeta = document.createElement("meta");
        themeColorMeta.name = "theme-color";
        document.head.appendChild(themeColorMeta);
      }
      themeColorMeta.content = color;

      // Set status bar style for iOS
      let statusBarMeta = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]'
      ) as HTMLMetaElement;
      if (!statusBarMeta) {
        statusBarMeta = document.createElement("meta");
        statusBarMeta.name = "apple-mobile-web-app-status-bar-style";
        document.head.appendChild(statusBarMeta);
      }
      statusBarMeta.content =
        luminance === "light" ? "black-translucent" : "default";
    },
    []
  );

  return {
    setStatusBarColor,
  };
}
