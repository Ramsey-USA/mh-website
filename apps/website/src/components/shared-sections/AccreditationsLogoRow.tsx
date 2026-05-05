import { type ReactNode } from "react";
import { WaVobBadge } from "@/components/ui/WaVobBadge";
import { COMPANY_INFO } from "@/lib/constants/company";

interface AccreditationsLogoRowProps {
  /**
   * When false, omit the three chamber logos (Pasco, Richland, Tri-City).
   * Useful for compact credential bars. Defaults to true.
   */
  showChambers?: boolean;
  /** Additional className applied to the flex wrapper div */
  className?: string;
  /**
   * Extra badge/pill elements rendered after WaVobBadge.
   * Use for page-specific additions (SDVOSB, Safety Award, etc.)
   */
  children?: ReactNode;
}

/**
 * AccreditationsLogoRow — shared row of accreditation logos with correct
 * intrinsic dimensions and `decoding="async"` on every image to avoid CLS
 * and unblocking the main thread during image decode.
 *
 * Used on: About, Services, Allies, Careers, Veterans, Public-Sector,
 *          Contact, Locations pages.
 */
export function AccreditationsLogoRow({
  showChambers = true,
  className = "",
  children,
}: AccreditationsLogoRowProps) {
  const linkClass = "hover:opacity-80 transition-opacity";

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 ${className}`}
    >
      {/* BBB Accredited A+ */}
      <a
        href={COMPANY_INFO.bbb.sealClickUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="BBB Accredited Business - A+ Rating"
        className={linkClass}
      >
        {/* Light-mode seal — dimensions match the URL pattern (200×42) */}
        <img
          src={COMPANY_INFO.bbb.sealHorizontal}
          alt="BBB Accredited Business A+ Rating"
          width={200}
          height={42}
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto dark:hidden"
        />
        {/* Dark-mode seal */}
        <img
          src={COMPANY_INFO.bbb.sealHorizontalWhite}
          alt="BBB Accredited Business A+ Rating"
          width={200}
          height={42}
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto hidden dark:block"
        />
      </a>

      {/* AGC of Washington Member */}
      <a
        href="https://www.agcwa.com/"
        target="_blank"
        rel="noopener noreferrer"
        title="AGC of Washington Member"
        className={linkClass}
      >
        <img
          src="/images/logo/agc-member.webp"
          alt="AGC of Washington Member"
          width={405}
          height={427}
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto"
        />
      </a>

      {/* Travelers Insurance Partner */}
      <a
        href={COMPANY_INFO.travelers.website}
        target="_blank"
        rel="noopener noreferrer"
        title="Travelers Insurance - Auto & Bonding Partner"
        className={linkClass}
      >
        {/* Light-mode logo — intrinsic size 600×122 */}
        <img
          src={COMPANY_INFO.travelers.logo}
          alt="Travelers Insurance - Auto & Bonding Partner"
          width={600}
          height={122}
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto dark:hidden"
        />
        {/* Dark-mode logo */}
        <img
          src={COMPANY_INFO.travelers.logoWhite}
          alt="Travelers Insurance - Auto & Bonding Partner"
          width={600}
          height={122}
          loading="lazy"
          decoding="async"
          className="h-10 sm:h-12 w-auto hidden dark:block"
        />
      </a>

      {showChambers && (
        <>
          {/* Pasco Chamber of Commerce */}
          <a
            href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Pasco Chamber of Commerce Member"
            className={linkClass}
          >
            {/* Light-mode — 510×231 */}
            <img
              src={COMPANY_INFO.chambers.pasco.logo}
              alt="Pasco Chamber of Commerce Member"
              width={510}
              height={231}
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto dark:hidden"
            />
            {/* Dark-mode — 748×256 */}
            <img
              src={COMPANY_INFO.chambers.pasco.logoWhite}
              alt="Pasco Chamber of Commerce Member"
              width={748}
              height={256}
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto hidden dark:block"
            />
          </a>

          {/* Richland Chamber of Commerce */}
          <a
            href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Richland Chamber of Commerce Member"
            className={linkClass}
          >
            {/* 816×874 intrinsic — displayed at h-10/12 */}
            <img
              src={COMPANY_INFO.chambers.richland.logo}
              alt="Richland Chamber of Commerce Member"
              width={816}
              height={874}
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto"
            />
          </a>

          {/* Tri-City Regional Chamber of Commerce */}
          <a
            href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Tri-City Regional Chamber of Commerce Member"
            className={linkClass}
          >
            {/* 372×100 intrinsic */}
            <img
              src={COMPANY_INFO.chambers.triCityRegional.logo}
              alt="Tri-City Regional Chamber of Commerce Member"
              width={372}
              height={100}
              loading="lazy"
              decoding="async"
              className="h-10 sm:h-12 w-auto"
            />
          </a>
        </>
      )}

      {/* Washington State Veteran Owned Business */}
      <WaVobBadge />

      {/* Page-specific extra badges passed as children */}
      {children}
    </div>
  );
}
