/**
 * Mobile Performance Optimizations
 * Utilities and configurations specifically for improving mobile performance
 */

/**
 * Check if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

/**
 * Check if the connection is slow
 */
interface NetworkConnection {
  effectiveType?: string;
  saveData?: boolean;
}

export const isSlowConnection = (): boolean => {
  if (typeof navigator === "undefined" || !("connection" in navigator)) {
    return false;
  }

  const connection = (navigator as { connection?: NetworkConnection })
    .connection;
  return (
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g" ||
    connection?.saveData === true
  );
};

/**
 * Reduce motion preference check
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get optimized animation config based on device capabilities
 */
export const getAnimationConfig = () => {
  const mobile = isMobileDevice();
  const slowConnection = isSlowConnection();
  const reducedMotion = prefersReducedMotion();

  return {
    enableAnimations: !reducedMotion && !slowConnection,
    duration: mobile ? 0.4 : 0.6,
    staggerDelay: mobile ? 0.05 : 0.1,
    threshold: mobile ? 0.1 : 0.2,
  };
};

/**
 * Optimize images for mobile
 */
export const getMobileImageConfig = () => {
  const mobile = isMobileDevice();
  const slowConnection = isSlowConnection();

  return {
    quality: slowConnection ? 60 : mobile ? 75 : 85,
    priority: !mobile, // Don't prioritize on mobile to save bandwidth
    loading: slowConnection ? ("lazy" as const) : ("eager" as const),
  };
};

/**
 * Defer heavy component loading on mobile
 */
export const shouldDeferComponent = (): boolean => {
  return isMobileDevice() || isSlowConnection();
};

/**
 * Performance-aware intersection observer options
 */
export const getObserverOptions = () => {
  const mobile = isMobileDevice();

  return {
    rootMargin: mobile ? "50px" : "100px",
    threshold: mobile ? 0.1 : 0.2,
  };
};
