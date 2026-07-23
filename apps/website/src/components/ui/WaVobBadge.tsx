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
import { getApprovedClaimOrFallback } from "@/lib/content/claims";

const waDesStatusClaimLabel = getApprovedClaimOrFallback({
  id: "wa_des_veteran_small_business_status",
  context: "trust-surface",
  fallback: "WA DES vendor detail verification",
});

type WaVobBadgeSize = "sm" | "md" | "lg" | "xl" | "fill";

type WaVobBadgeProps = {
  /** Controls image height: sm = h-10 (40px), md = h-12 (48px), lg = h-14 (56px), xl = h-20 (80px), fill = h-full (fills parent height). Defaults to md. */
  size?: WaVobBadgeSize;
  /** Additional class names applied to the outermost wrapper element. */
  className?: string;
  /** When false, renders only the logo without the decorative badge container. */
  framed?: boolean;
};

const sizeMap: Record<WaVobBadgeSize, string> = {
  sm: "h-10 w-auto",
  md: "h-12 w-auto",
  lg: "h-14 w-auto",
  xl: "h-20 w-auto",
  fill: "h-full w-full",
};

/**
 * Renders a clickable WA Veteran Owned Business badge with a patriotic
 * red-to-blue gradient border. Links to the WA DVA certification program page.
 */
export function WaVobBadge({
  size = "md",
  className = "",
  framed = true,
}: Readonly<WaVobBadgeProps>) {
  if (!framed) {
    return (
      <a
        href={COMPANY_INFO.waVob.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={waDesStatusClaimLabel}
        aria-label={`${COMPANY_INFO.waVob.alt} — ${waDesStatusClaimLabel}`}
        className={`inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${className}`}
      >
        <Image
          src={COMPANY_INFO.waVob.logo}
          alt={COMPANY_INFO.waVob.alt}
          width={160}
          height={80}
          className={`${sizeMap[size]} rounded-[18px] object-contain`}
          sizes="(max-width: 640px) 140px, 180px"
          loading="lazy"
        />
      </a>
    );
  }

  return (
    /* Gradient border wrapper — patriotic red→blue, soft rounded corners */
    <a
      href={COMPANY_INFO.waVob.verifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={waDesStatusClaimLabel}
      aria-label={`${COMPANY_INFO.waVob.alt} — ${waDesStatusClaimLabel}`}
      className={`group relative isolate inline-block overflow-hidden rounded-xl bg-linear-to-br from-red-600 via-red-500 to-blue-700 p-0.75 shadow-[0_10px_22px_-16px_rgba(220,38,38,0.9),0_14px_26px_-20px_rgba(29,78,216,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-16px_rgba(220,38,38,0.95),0_18px_30px_-20px_rgba(29,78,216,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/55 to-transparent opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"
      />
      {/* Inner container — white bg on light mode, dark bg on dark mode, hides non-transparent logo bg */}
      <div className="relative flex items-center justify-center overflow-hidden rounded-[10px] bg-white px-2 py-1 dark:bg-gray-800">
        <Image
          src={COMPANY_INFO.waVob.logo}
          alt={COMPANY_INFO.waVob.alt}
          width={160}
          height={80}
          className={`${sizeMap[size]} object-contain`}
          sizes="(max-width: 640px) 140px, 180px"
          loading="lazy"
        />
      </div>
    </a>
  );
}
