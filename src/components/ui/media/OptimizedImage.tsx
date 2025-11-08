"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import motion components to reduce bundle size
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false,
    loading: () => <div className="relative" />, // Fallback component
  },
);

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  onLoad?: () => void;
  onError?: () => void;
  enableAnimation?: boolean;
  blurDataURL?: string;
}

// Generate a simple blur data URL for placeholder
const generateBlurDataURL = (width = 400, height = 300): string => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#f3f4f6");
  gradient.addColorStop(0.5, "#e5e7eb");
  gradient.addColorStop(1, "#d1d5db");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
};

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  quality = 85,
  placeholder = "blur",
  onLoad,
  enableAnimation = true,
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  // Generate blur data URL if not provided
  const defaultBlurDataURL =
    blurDataURL ||
    (typeof window !== "undefined" ? generateBlurDataURL(width, height) : "");

  const imageProps = {
    src: hasError ? "/images/placeholder.jpg" : src,
    alt: alt || "Image", // Provide fallback alt text
    onLoad: handleLoad,
    onError: handleError,
    quality,
    placeholder,
    blurDataURL: defaultBlurDataURL,
    sizes,
    priority,
    className: `transition-opacity duration-500 ${
      isLoaded ? "opacity-100" : "opacity-0"
    } ${className}`,
    ...(fill ? { fill: true } : { width: width || 800, height: height || 600 }),
  };

  if (enableAnimation) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden"
      >
        <Image {...imageProps} alt={imageProps.alt} />
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}
      </MotionDiv>
    );
  }

  return (
    <div className="relative">
      <Image {...imageProps} alt={imageProps.alt} />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
    </div>
  );
}

// Specialized component for hero images
interface HeroImageProps
  extends Omit<OptimizedImageProps, "priority" | "sizes"> {
  overlay?: boolean;
  overlayClassName?: string;
}

export function HeroImage({
  overlay = false,
  overlayClassName = "bg-black/30",
  ...props
}: HeroImageProps) {
  return (
    <div className="relative">
      <OptimizedImage
        {...props}
        priority={true}
        sizes="100vw"
        className={`object-cover ${props.className || ""}`}
      />
      {overlay && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  );
}

// Specialized component for portfolio gallery
interface GalleryImageProps extends OptimizedImageProps {
  caption?: string;
  category?: string;
}

export function GalleryImage({
  caption,
  category,
  ...props
}: GalleryImageProps) {
  return (
    <MotionDiv
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-lg overflow-hidden cursor-pointer"
    >
      <OptimizedImage
        {...props}
        className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
          props.className || ""
        }`}
      />

      {/* Overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bottom-4 left-4 absolute text-white">
          {category && (
            <span className="inline-block bg-[#386851] mb-2 px-2 py-1 rounded font-semibold text-xs">
              {category}
            </span>
          )}
          {caption && <p className="font-medium text-sm">{caption}</p>}
        </div>
      </div>
    </MotionDiv>
  );
}

// Avatar component with fallback
interface AvatarImageProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

export function AvatarImage({
  src,
  alt,
  size = "md",
  fallback,
  className = "",
}: AvatarImageProps) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const handleError = () => setHasError(true);

  if (!src || hasError) {
    return (
      <div
        className={`${sizeClasses[size]} bg-[#386851]/20 rounded-full flex items-center justify-center ${className}`}
      >
        <span className="font-semibold text-[#386851] text-sm">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} relative rounded-full overflow-hidden ${className}`}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100px, 200px"
        onError={handleError}
      />
    </div>
  );
}
