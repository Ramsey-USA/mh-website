/**
 * WaVobBadge — Washington State Veteran Owned Business Certification Badge
 *
 * Displays the WA DVA Veteran Owned Business certification logo inside a
 * red-to-blue gradient border container. The gradient border is an approved
 * branding exception for Veteran Owned certification materials; it intentionally
 * uses U.S. patriotic colors (red #dc2626, blue #1d4ed8) outside the standard
 * MH brand palette. See docs/branding/standards/color-system.md §Veteran Owned
 * Badge Exception and .github/branding-exceptions.json for the formal record.
 *
 * The logo image does not have a transparent background, so it is placed inside
 * a white (light mode) / dark-gray (dark mode) inner container to prevent the
 * gradient from bleeding through.
 */

import Image from "next/image";
import { COMPANY_INFO } from "@/lib/constants/company";

type WaVobBadgeSize = "sm" | "md";

type WaVobBadgeProps = {
  /** Controls image height: sm = h-10 (40px), md = h-12 (48px). Defaults to md. */
  size?: WaVobBadgeSize;
  /** Additional class names applied to the outermost wrapper element. */
  className?: string;
};

const sizeMap: Record<WaVobBadgeSize, string> = {
  sm: "h-10 w-auto",
  md: "h-12 w-auto",
};

/**
 * Renders a clickable WA Veteran Owned Business badge with a patriotic
 * red-to-blue gradient border. Links to the WA DVA certification program page.
 */
export function WaVobBadge({
  size = "md",
  className = "",
}: Readonly<WaVobBadgeProps>) {
  return (
    /* Gradient border wrapper — patriotic red→blue, soft rounded corners */
    <a
      href={COMPANY_INFO.waVob.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={COMPANY_INFO.waVob.title}
      aria-label={`${COMPANY_INFO.waVob.alt} — click to verify certification`}
      className={`group inline-block rounded-xl bg-linear-to-br from-red-600 to-blue-700 p-0.75 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${className}`}
    >
      {/* Inner container — white bg on light mode, dark bg on dark mode, hides non-transparent logo bg */}
      <div className="flex items-center justify-center rounded-[10px] bg-white dark:bg-gray-800 overflow-hidden">
        <Image
          src={COMPANY_INFO.waVob.logo}
          alt={COMPANY_INFO.waVob.alt}
          width={160}
          height={80}
          className={`${sizeMap[size]} object-contain`}
          loading="lazy"
        />
      </div>
    </a>
  );
}
