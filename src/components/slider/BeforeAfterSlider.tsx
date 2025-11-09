"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface BeforeAfterSliderProps {
  /** Before image URL */
  beforeImage: string;
  /** After image URL */
  afterImage: string;
  /** Alt text for before image */
  beforeAlt?: string;
  /** Alt text for after image */
  afterAlt?: string;
  /** Optional caption */
  caption?: string;
  /** Initial divider position (0-100) */
  initialPosition?: number;
  /** Height of slider */
  height?: string;
  /** Show labels */
  showLabels?: boolean;
  /** Custom before label */
  beforeLabel?: string;
  /** Custom after label */
  afterLabel?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Before/After Slider Component
 *
 * Interactive image comparison slider with draggable divider.
 * Perfect for showcasing project transformations and construction progress.
 *
 * Features:
 * - Draggable divider with mouse and touch support
 * - Responsive design with Next.js Image optimization
 * - Hunter Green branding on divider and labels
 * - Smooth transitions and hover effects
 * - Keyboard accessible (arrow keys to adjust)
 * - Visual feedback with arrows and labels
 * - Mobile-friendly touch interactions
 *
 * @example
 * ```tsx
 * <BeforeAfterSlider
 *   beforeImage="/images/projects/before.jpg"
 *   afterImage="/images/projects/after.jpg"
 *   beforeAlt="Construction site before renovation"
 *   afterAlt="Completed modern facility"
 *   caption="Medical Center Expansion - 2024"
 *   initialPosition={50}
 * />
 * ```
 */
export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  caption,
  initialPosition = 50,
  height = "h-[400px] sm:h-[500px] lg:h-[600px]",
  showLabels = true,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch move
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    // Clamp between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  // Mouse handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  // Keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  // Add/remove event listeners
  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMoveEvent = (e: TouchEvent) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMoveEvent);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMoveEvent);
      document.addEventListener("touchend", handleTouchEnd);

      // Prevent text selection while dragging
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEvent);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMoveEvent);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Slider Container */}
      <div
        ref={containerRef}
        className={`relative ${height} overflow-hidden rounded-2xl shadow-2xl cursor-col-resize group`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
      >
        {/* After Image (Background - Full Width) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            priority
          />
          {showLabels && (
            <div className="top-4 right-4 absolute bg-brand-primary text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
              {afterLabel}
            </div>
          )}
        </div>

        {/* Before Image (Clipped - Variable Width) */}
        <div
          className="absolute inset-0 transition-none"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            priority
          />
          {showLabels && (
            <div className="top-4 left-4 absolute bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
              {beforeLabel}
            </div>
          )}
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-brand-primary shadow-lg transition-none z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl p-3 border-4 border-brand-primary rounded-full transition-all duration-300 group-hover:scale-110">
            <div className="flex items-center gap-1">
              <MaterialIcon
                icon="chevron_left"
                size="sm"
                className="text-brand-primary"
              />
              <MaterialIcon
                icon="chevron_right"
                size="sm"
                className="text-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Helper Text - Visible on Hover */}
        <div className="bottom-4 left-1/2 absolute opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg -translate-x-1/2 transition-opacity duration-300 pointer-events-none">
          <p className="font-medium text-center text-sm text-white whitespace-nowrap">
            <MaterialIcon icon="swipe" size="sm" className="inline mr-2" />
            Drag to compare
          </p>
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p className="text-center text-gray-700 text-sm dark:text-gray-300 leading-relaxed">
          {caption}
        </p>
      )}

      {/* Instructions for Screen Readers */}
      <div className="sr-only">
        Use arrow keys to adjust the slider position. Left arrow to show more
        before, right arrow to show more after.
      </div>
    </div>
  );
}

interface BeforeAfterGalleryProps {
  /** Array of before/after image pairs */
  slides: Array<{
    beforeImage: string;
    afterImage: string;
    beforeAlt?: string;
    afterAlt?: string;
    caption?: string;
  }>;
  /** Gallery title */
  title?: string;
  /** Gallery description */
  description?: string;
  /** Grid layout: single column or grid */
  layout?: "single" | "grid";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Before/After Gallery Component
 *
 * Displays multiple before/after sliders in a grid or single-column layout.
 * Perfect for project portfolios and case studies.
 *
 * @example
 * ```tsx
 * <BeforeAfterGallery
 *   title="Project Transformations"
 *   description="See the remarkable changes we've made"
 *   slides={[
 *     {
 *       beforeImage: "/before1.jpg",
 *       afterImage: "/after1.jpg",
 *       caption: "Reception Area Renovation"
 *     },
 *     // ... more slides
 *   ]}
 *   layout="grid"
 * />
 * ```
 */
export function BeforeAfterGallery({
  slides,
  title = "Before & After",
  description,
  layout = "single",
  className = "",
}: BeforeAfterGalleryProps) {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="text-center space-y-4">
          {title && (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                {title.split(" ")[0]}
              </span>
              <span className="block text-brand-primary">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          )}
          {description && (
            <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Sliders Grid */}
      <div
        className={`
        ${
          layout === "grid"
            ? "grid grid-cols-1 lg:grid-cols-2 gap-8"
            : "space-y-8 max-w-5xl mx-auto"
        }
      `}
      >
        {slides.map((slide, _index) => (
          <BeforeAfterSlider
            key={index}
            beforeImage={slide.beforeImage}
            afterImage={slide.afterImage}
            beforeAlt={slide.beforeAlt}
            afterAlt={slide.afterAlt}
            caption={slide.caption}
          />
        ))}
      </div>
    </div>
  );
}
