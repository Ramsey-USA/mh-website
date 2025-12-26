/**
 * Responsive Image Component with Advanced Optimization
 * Implements srcset, lazy loading, and modern formats
 */

"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  /** Responsive breakpoints for srcset generation */
  breakpoints?: number[];
  /** Whether to use lazy loading (default: true) */
  lazy?: boolean;
  /** Priority loading (LCP images) */
  priority?: boolean;
  /** Custom sizes attribute */
  sizes?: string;
  /** Loading strategy */
  loading?: "lazy" | "eager";
  /** Quality (1-100) */
  quality?: number;
}

/**
 * Generate responsive sizes string based on common breakpoints
 */
function generateSizes(breakpoints?: number[]): string {
  if (breakpoints && breakpoints.length > 0) {
    return breakpoints
      .map((bp, i) => {
        if (i === 0) return `(max-width: ${bp}px) 100vw`;
        const firstBp = breakpoints[0];
        if (!firstBp) return `(max-width: ${bp}px) 100vw`;
        return `(max-width: ${bp}px) ${Math.round((bp / firstBp) * 100)}vw`;
      })
      .join(", ");
  }

  // Default responsive sizes
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw";
}

/**
 * ResponsiveImage Component
 *
 * Features:
 * - Automatic WebP/AVIF conversion (via Next.js)
 * - Lazy loading by default
 * - Responsive srcset generation
 * - Optimized sizes attribute
 * - Loading states
 * - Error handling with fallback
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/images/project.jpg"
 *   alt="Construction project"
 *   width={800}
 *   height={600}
 *   priority={false}
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 * ```
 */
export function ResponsiveImage({
  src,
  alt,
  breakpoints,
  lazy = true,
  priority = false,
  sizes: customSizes,
  loading,
  quality = 80,
  className = "",
  onLoad,
  onError,
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate sizes attribute
  const sizes = customSizes || generateSizes(breakpoints);

  // Handle load complete
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    onLoad?.(e);
  };

  // Handle load error
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    setIsLoading(false);
    onError?.(e);
  };

  // Fallback for broken images
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={
          props.width && props.height
            ? {
                width: props.width,
                height: props.height,
              }
            : undefined
        }
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative ${isLoading ? "animate-pulse bg-gray-200 dark:bg-gray-700" : ""}`}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={loading || (lazy ? "lazy" : "eager")}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
}

/**
 * Hero Image Component
 * Optimized for above-the-fold hero images (LCP)
 */
export function HeroImage(
  props: Omit<ResponsiveImageProps, "priority" | "lazy" | "loading">,
) {
  return (
    <ResponsiveImage
      {...props}
      priority={true}
      lazy={false}
      loading="eager"
      quality={90}
      sizes="100vw"
    />
  );
}

/**
 * Thumbnail Image Component
 * Optimized for small images in grids/lists
 */
export function ThumbnailImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      quality={75}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    />
  );
}

/**
 * Gallery Image Component
 * Optimized for project galleries and portfolios
 */
export function GalleryImage(props: ResponsiveImageProps) {
  return (
    <ResponsiveImage
      {...props}
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  );
}
