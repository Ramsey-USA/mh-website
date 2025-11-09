"use client";

import {
  useState,
  useRef,
  useCallback,
  type TouchEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

interface BeforeAfterSliderProps {
  /**
   * Before image URL
   */
  beforeImage: string;
  /**
   * After image URL
   */
  afterImage: string;
  /**
   * Alt text for before image
   */
  beforeAlt?: string;
  /**
   * After text for after image
   */
  afterAlt?: string;
  /**
   * Optional project title
   */
  title?: string;
  /**
   * Optional project description
   */
  description?: string;
  /**
   * Initial slider position (0-100)
   * @default 50
   */
  initialPosition?: number;
  /**
   * Show labels on images
   * @default true
   */
  showLabels?: boolean;
  /**
   * Custom className
   */
  className?: string;
  /**
   * Aspect ratio of images
   * @default "16/9"
   */
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
}

/**
 * BeforeAfterSlider Component
 *
 * Interactive image comparison slider with draggable divider.
 *
 * Features:
 * - Draggable divider (desktop)
 * - Touch-friendly swipe (mobile)
 * - Tap-to-toggle on mobile
 * - Keyboard accessible
 * - Before/After labels
 * - Responsive design
 *
 * @example
 * ```tsx
 * <BeforeAfterSlider
 *   beforeImage="/images/projects/before.jpg"
 *   afterImage="/images/projects/after.jpg"
 *   title="Commercial Renovation"
 *   description="Complete interior transformation"
 * />
 * ```
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  title,
  description,
  initialPosition = 50,
  showLabels = true,
  className = "",
  aspectRatio = "16/9",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate new position from mouse/touch event
  const calculatePosition = useCallback(
    (clientX: number): number => {
      if (!containerRef.current) return sliderPosition;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;

      // Clamp between 0 and 100
      return Math.min(Math.max(percentage, 0), 100);
    },
    [sliderPosition],
  );

  // Mouse events (desktop)
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const newPosition = calculatePosition(e.clientX);
      setSliderPosition(newPosition);
    },
    [isDragging, calculatePosition],
  );

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch events (mobile)
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      const newPosition = calculatePosition(touch.clientX);
      setSliderPosition(newPosition);
    },
    [isDragging, calculatePosition],
  );

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Click/tap to move slider (mobile-friendly)
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) return; // Don't handle if we're dragging
    const newPosition = calculatePosition(e.clientX);
    setSliderPosition(newPosition);
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  // Get aspect ratio class
  const aspectRatioClass = {
    "16/9": "aspect-video",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    "3/2": "aspect-[3/2]",
  }[aspectRatio];

  return (
    <FadeInWhenVisible>
      <div className={`w-full ${className}`}>
        {/* Title and Description */}
        {(title || description) && (
          <div className="mb-6 text-center">
            {title && (
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Image Comparison Container */}
        <div
          ref={containerRef}
          className={`relative ${aspectRatioClass} w-full overflow-hidden rounded-2xl shadow-2xl cursor-col-resize select-none border-4 border-gray-200 dark:border-gray-700`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="img"
          aria-label={`Before and after comparison: ${beforeAlt} to ${afterAlt}`}
        >
          {/* After Image (Full background) */}
          <div className="absolute inset-0">
            <Image
              src={afterImage}
              alt={afterAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            {showLabels && (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                AFTER
              </div>
            )}
          </div>

          {/* Before Image (Clipped by slider) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative w-full h-full">
              <Image
                src={beforeImage}
                alt={beforeAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              {showLabels && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg z-10">
                  BEFORE
                </div>
              )}
            </div>
          </div>

          {/* Slider Divider */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-col-resize z-20"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-0.5">
                <MaterialIcon
                  icon="chevron_left"
                  className="text-gray-700 dark:text-gray-300"
                />
                <MaterialIcon
                  icon="chevron_right"
                  className="text-gray-700 dark:text-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions (mobile-friendly) */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p className="hidden md:block">
            <MaterialIcon icon="mouse" size="sm" className="inline mr-1" />
            Drag the slider or click anywhere to compare
          </p>
          <p className="md:hidden">
            <MaterialIcon icon="touch_app" size="sm" className="inline mr-1" />
            Swipe or tap anywhere to compare
          </p>
        </div>
      </div>
    </FadeInWhenVisible>
  );
}
