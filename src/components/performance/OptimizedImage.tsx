/**
 * Optimized Image Component
 * High-performance image component with lazy loading, optimization, and performance tracking
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { logger } from "@/lib/utils/logger";
import Image from "next/image";
import { useLazyImage, usePerformanceTiming } from "@/lib/performance/hooks";
import { ImageOptimizer } from "@/lib/performance/performance-manager";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  // Performance tracking
  trackPerformance?: boolean;
  componentName?: string;
  // Lazy loading options
  lazy?: boolean;
  rootMargin?: string;
  threshold?: number;
  // Responsive options
  breakpoints?: Array<{ minWidth?: number; maxWidth?: number; vw: number }>;
  widths?: number[];
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes,
  fill = false,
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError,
  trackPerformance = true,
  componentName = "OptimizedImage",
  lazy = true,
  rootMargin = "50px",
  threshold = 0.1,
  breakpoints,
  widths = [320, 640, 768, 1024, 1280, 1536],
  ..._props
}: OptimizedImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const loadStartTime = useRef<number | undefined>(undefined);

  // Performance tracking
  const { trackInteraction } = usePerformanceTiming(componentName);

  // Lazy loading with performance tracking
  const {
    imgRef: _imgRef,
    loaded: _loaded,
    error: _error,
    inView,
  } = useLazyImage(src, {
    rootMargin: lazy ? rootMargin : "0px",
    threshold: lazy ? threshold : 0,
    onLoad: () => {
      if (loadStartTime.current && trackPerformance) {
        const loadTime = performance.now() - loadStartTime.current;
        logger.log(`Image ${src} loaded in ${loadTime.toFixed(2)}ms`);
      }
      setIsLoaded(true);
      onLoad?.();
    },
    onError: () => {
      setImageError(true);
      onError?.();
    },
  });

  // Generate responsive image attributes
  const _srcSet = ImageOptimizer.generateSrcSet(src, widths);
  const imageSizes =
    sizes ||
    (breakpoints
      ? ImageOptimizer.generateSizes(breakpoints)
      : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw");

  // Track load start time
  useEffect(() => {
    if (inView && !priority) {
      loadStartTime.current = performance.now();
    }
  }, [inView, priority]);

  // Preload critical images
  useEffect(() => {
    if (priority) {
      ImageOptimizer.preloadCriticalImages([src]);
      loadStartTime.current = performance.now();
    }
  }, [src, priority]);

  // Handle click interactions for performance tracking
  const handleClick = trackPerformance ? trackInteraction("click") : undefined;

  // Build image URL with optimization parameters
  const optimizedSrc = `${src}${src.includes("?") ? "&" : "?"}q=${quality}`;

  // Blur placeholder styles
  const blurStyle =
    placeholder === "blur" && blurDataURL
      ? {
          backgroundImage: `url(${blurDataURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {};

  // Container styles for fill mode
  const containerStyles = fill
    ? {
        position: "relative" as const,
        width: "100%",
        height: "100%",
      }
    : {};

  // Image styles
  const imageStyles = fill
    ? {
        position: "absolute" as const,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
      }
    : {};

  if (imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          fill ? "absolute inset-0" : "",
          className,
        )}
        style={fill ? imageStyles : { width, height }}
      >
        <svg
          className="w-8 h-8"
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

  const imageElement = (
    <Image
      src={!lazy || priority || inView ? optimizedSrc : src}
      alt={alt}
      width={!fill ? width || 500 : undefined}
      height={!fill ? height || 300 : undefined}
      sizes={!lazy || priority || inView ? imageSizes : undefined}
      priority={priority}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      fill={fill}
      className={cn(
        "transition-opacity duration-300",
        !isLoaded && placeholder === "blur" ? "opacity-0" : "",
        isLoaded ? "opacity-100" : "",
        fill ? "object-cover" : "",
        className,
      )}
      style={{
        ...imageStyles,
        ...blurStyle,
      }}
      onClick={handleClick}
      onLoad={() => {
        if (loadStartTime.current && trackPerformance) {
          const loadTime = performance.now() - loadStartTime.current;
          logger.log(`Image ${src} loaded in ${loadTime.toFixed(2)}ms`);
        }
        setIsLoaded(true);
        onLoad?.();
      }}
      onError={() => {
        setImageError(true);
        onError?.();
      }}
    />
  );

  if (fill) {
    return (
      <div style={containerStyles} className={cn("overflow-hidden", className)}>
        {placeholder === "blur" && blurDataURL && !isLoaded && (
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              ...blurStyle,
              opacity: isLoaded ? 0 : 1,
            }}
          />
        )}
        {imageElement}
      </div>
    );
  }

  return imageElement;
}

// HOC for automatic performance tracking
export function withImagePerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
) {
  return function PerformanceTrackedImage(
    props: P & { componentName?: string },
  ) {
    const { componentName = Component.displayName || Component.name, ...rest } =
      props;
    const { trackInteraction } = usePerformanceTiming(`${componentName}_Image`);

    return (
      <Component
        {...(rest as P)}
        trackPerformance={true}
        componentName={componentName}
        onLoad={() => {
          const endTracking = trackInteraction("load");
          endTracking();
        }}
      />
    );
  };
}

// Specialized components for common use cases
export const HeroImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    return (
      <OptimizedImage
        {...props}
        priority={true}
        lazy={false}
        quality={90}
        componentName="HeroImage"
        breakpoints={[
          { maxWidth: 768, vw: 100 },
          { minWidth: 769, vw: 50 },
        ]}
      />
    );
  },
);

export const ThumbnailImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    return (
      <OptimizedImage
        {...props}
        lazy={true}
        quality={60}
        componentName="ThumbnailImage"
        widths={[150, 300, 450]}
        breakpoints={[
          { maxWidth: 768, vw: 30 },
          { minWidth: 769, vw: 15 },
        ]}
      />
    );
  },
);

export const GalleryImage = withImagePerformanceTracking(
  (props: OptimizedImageProps) => {
    return (
      <OptimizedImage
        {...props}
        lazy={true}
        quality={75}
        componentName="GalleryImage"
        breakpoints={[
          { maxWidth: 640, vw: 100 },
          { minWidth: 641, maxWidth: 1024, vw: 50 },
          { minWidth: 1025, vw: 33 },
        ]}
      />
    );
  },
);

// Image preloader utility
export function preloadImages(imageSrcs: string[], quality = 75) {
  if (typeof window === "undefined") return;

  imageSrcs.forEach((src) => {
    const optimizedSrc = `${src}${src.includes("?") ? "&" : "?"}q=${quality}`;
    const img = new globalThis.Image();
    img.src = optimizedSrc;
  });
}

// Critical images preloader for above-the-fold content
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
