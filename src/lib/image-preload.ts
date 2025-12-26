/**
 * Image Preloading Utilities
 * Critical image preloading for better LCP
 */

/**
 * Preload critical images for better performance
 * Use in layout.tsx or page.tsx for above-the-fold images
 */
export function preloadImage(
  src: string,
  options?: {
    as?: "image";
    type?: "image/webp" | "image/avif" | "image/jpeg" | "image/png";
    fetchPriority?: "high" | "low" | "auto";
    imageSrcSet?: string;
    imageSizes?: string;
  },
) {
  if (typeof window === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = options?.as || "image";
  link.href = src;

  if (options?.type) {
    link.type = options.type;
  }

  if (options?.fetchPriority) {
    link.setAttribute("fetchpriority", options.fetchPriority);
  }

  if (options?.imageSrcSet) {
    link.setAttribute("imagesrcset", options.imageSrcSet);
  }

  if (options?.imageSizes) {
    link.setAttribute("imagesizes", options.imageSizes);
  }

  document.head.appendChild(link);
}

/**
 * Preload multiple critical images
 */
export function preloadImages(
  images: Array<{
    src: string;
    type?: "image/webp" | "image/avif" | "image/jpeg" | "image/png";
    fetchPriority?: "high" | "low" | "auto";
  }>,
) {
  images.forEach(({ src, type, fetchPriority }) => {
    const options: Parameters<typeof preloadImage>[1] = {};
    if (type) options.type = type;
    if (fetchPriority) options.fetchPriority = fetchPriority;
    preloadImage(src, options);
  });
}

/**
 * Generate Next.js Link component for image preloading
 * Use in app/layout.tsx or specific pages
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * export default function RootLayout() {
 *   return (
 *     <html>
 *       <head>
 *         {getImagePreloadLinks([
 *           { src: '/images/logo.png', priority: 'high' },
 *           { src: '/images/hero.jpg', priority: 'high' }
 *         ])}
 *       </head>
 *     </html>
 *   );
 * }
 * ```
 */
export function getImagePreloadLinks(
  images: Array<{
    src: string;
    type?: string;
    priority?: "high" | "low";
  }>,
) {
  return images.map((img, i) => ({
    rel: "preload",
    as: "image",
    href: img.src,
    ...(img.type && { type: img.type }),
    ...(img.priority && { fetchPriority: img.priority }),
    key: `preload-${i}`,
  }));
}

/**
 * Hook to preload images when component mounts
 */
export function useImagePreload(src: string | string[]) {
  if (typeof window === "undefined") return;

  const sources = Array.isArray(src) ? src : [src];
  sources.forEach((s) => preloadImage(s, { fetchPriority: "high" }));
}

/**
 * Lazy load images when they enter viewport
 * Returns whether image is in view
 */
export function useLazyLoadImage(
  ref: React.RefObject<HTMLElement>,
  threshold = 0.1,
) {
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "50px" },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return isInView;
}

// React import for hook
import React from "react";
