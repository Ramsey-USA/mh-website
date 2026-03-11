"use client";

import React from "react";
import {
  OptimizedImage as CanonicalOptimizedImage,
  HeroImage as CanonicalHeroImage,
  GalleryImage as CanonicalGalleryImage,
} from "@/components/ui/media/OptimizedImage";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
  priority?: boolean;
  quality?: number | `${number}`;
  sizes?: string;
  fill?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Legacy props kept for backward compatibility
  trackPerformance?: boolean;
  componentName?: string;
  lazy?: boolean;
  rootMargin?: string;
  threshold?: number;
  breakpoints?: Array<{ minWidth?: number; maxWidth?: number; vw: number }>;
  widths?: number[];
  enableAnimation?: boolean;
}

/**
 * Compatibility export for legacy performance image imports.
 *
 * Canonical image implementation lives in "@/components/ui/media/OptimizedImage".
 */
export function OptimizedImage({
  width,
  height,
  quality,
  ...props
}: OptimizedImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const numericProps = {
    ...(width !== undefined ? { width: Number(width) } : {}),
    ...(height !== undefined ? { height: Number(height) } : {}),
    ...(quality !== undefined ? { quality: Number(quality) } : {}),
  };

  return <CanonicalOptimizedImage {...props} {...numericProps} />;
}

// HOC preserved for API compatibility
export function withImagePerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function PerformanceTrackedImage(props: P) {
    return <Component {...props} />;
  };
}

// Specialized compatibility variants
export const HeroImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    const { width, height, quality, ...rest } = props;

    return (
      <CanonicalHeroImage
        {...rest}
        {...(width !== undefined ? { width: Number(width) } : {})}
        {...(height !== undefined ? { height: Number(height) } : {})}
        {...(quality !== undefined ? { quality: Number(quality) } : {})}
      />
    );
  },
);

export const ThumbnailImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    const { width, height, quality, sizes, enableAnimation, ...rest } = props;

    return (
      <CanonicalOptimizedImage
        {...rest}
        {...(width !== undefined ? { width: Number(width) } : {})}
        {...(height !== undefined ? { height: Number(height) } : {})}
        quality={quality !== undefined ? Number(quality) : 60}
        sizes={sizes || "(max-width: 768px) 30vw, 15vw"}
        enableAnimation={enableAnimation ?? false}
      />
    );
  },
);

export const GalleryImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    const { width, height, quality, sizes, enableAnimation, ...rest } = props;

    return (
      <CanonicalGalleryImage
        {...rest}
        {...(width !== undefined ? { width: Number(width) } : {})}
        {...(height !== undefined ? { height: Number(height) } : {})}
        quality={quality !== undefined ? Number(quality) : 75}
        sizes={
          sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        }
        enableAnimation={enableAnimation ?? true}
      />
    );
  },
);

export function preloadImages(imageSrcs: string[], quality = 75) {
  if (typeof window === "undefined") return;

  imageSrcs.forEach((src) => {
    const optimizedSrc = `${src}${src.includes("?") ? "&" : "?"}q=${quality}`;
    const img = new globalThis.Image();
    img.src = optimizedSrc;
  });
}

export function preloadCriticalImages(imageSrcs: string[]) {
  if (typeof window === "undefined") return;

  imageSrcs.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}
