"use client";

import { BeforeAfterSlider as CanonicalBeforeAfterSlider } from "@/components/slider";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  title?: string;
  description?: string;
  initialPosition?: number;
  showLabels?: boolean;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2";
}

const aspectRatioToHeightClass: Record<
  NonNullable<BeforeAfterSliderProps["aspectRatio"]>,
  string
> = {
  "16/9": "h-[220px] sm:h-[320px] lg:h-[420px]",
  "4/3": "h-[260px] sm:h-[360px] lg:h-[460px]",
  "1/1": "h-[260px] sm:h-[420px] lg:h-[560px]",
  "3/2": "h-[240px] sm:h-[340px] lg:h-[440px]",
};

/**
 * Compatibility wrapper for the canonical BeforeAfterSlider.
 *
 * Prefer importing from "@/components/slider" for new code.
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
  return (
    <FadeInWhenVisible>
      <div className={className}>
        {title && (
          <h3 className="mb-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h3>
        )}

        {description && (
          <p className="mb-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {description}
          </p>
        )}

        <CanonicalBeforeAfterSlider
          beforeImage={beforeImage}
          afterImage={afterImage}
          beforeAlt={beforeAlt}
          afterAlt={afterAlt}
          initialPosition={initialPosition}
          showLabels={showLabels}
          height={aspectRatioToHeightClass[aspectRatio]}
          className="rounded-xl"
          {...(title ? { caption: title } : {})}
        />
      </div>
    </FadeInWhenVisible>
  );
}
