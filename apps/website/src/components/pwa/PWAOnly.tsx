"use client";

import { useState, useEffect } from "react";
import { usePWA } from "@/hooks/usePWA";

interface PWAOnlyProps {
  /** Content to render only inside the installed PWA. */
  children: React.ReactNode;
  /**
   * Optional fallback rendered in the browser (non-installed) context.
   * Defaults to nothing.
   */
  fallback?: React.ReactNode;
}

/**
 * PWAOnly
 *
 * Renders `children` only when the page is running as an installed PWA
 * (standalone display mode). Shows `fallback` (default: nothing) otherwise.
 *
 * Safe for SSR — nothing is rendered until after client hydration, preventing
 * any mismatch between server HTML and installed-state detection.
 *
 * @example
 * // Show a section only in the installed app
 * <PWAOnly>
 *   <AppQuickActions />
 * </PWAOnly>
 *
 * @example
 * // Show install CTA in browser, quick-actions in PWA
 * <PWAOnly fallback={<InstallBanner />}>
 *   <AppQuickActions />
 * </PWAOnly>
 */
export function PWAOnly({ children, fallback = null }: PWAOnlyProps) {
  const [mounted, setMounted] = useState(false);
  const { isStandalone } = usePWA();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Suppress until hydrated to avoid SSR/client mismatch
  if (!mounted) return null;

  return isStandalone ? <>{children}</> : <>{fallback}</>;
}
