// MH Construction Custom Icon System
// Built-in hover effects and brand-specific designs
'use client'

import React from 'react'

// Icon component props interface
interface MHIconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  color?: string
  hoverEffect?:
    | 'none'
    | 'scale'
    | 'rotate'
    | 'pulse'
    | 'slide'
    | 'glow'
    | 'bounce'
  variant?: 'default' | 'filled' | 'outline' | 'duotone'
}

// Size mappings optimized for MH branding
const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
}

// Hover effect classes
const hoverEffects = {
  none: '',
  scale: 'hover:scale-110 transition-transform duration-300',
  rotate: 'hover:rotate-12 transition-transform duration-300',
  pulse: 'hover:animate-pulse',
  slide: 'hover:translate-x-1 transition-transform duration-200',
  glow: 'hover:drop-shadow-lg hover:filter hover:brightness-110 transition-all duration-300',
  bounce: 'hover:animate-bounce',
}

// Base icon wrapper component
const IconWrapper: React.FC<MHIconProps & { children: React.ReactNode }> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
  hoverEffect = 'none',
  children,
}) => {
  const baseClasses = `${sizeClasses[size]} ${hoverEffects[hoverEffect]} ${className}`

  return (
    <svg
      className={baseClasses}
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {children}
    </svg>
  )
}

// Custom MH Construction Icons with brand-specific designs

// 1. MH Logo Icon (Custom geometric design)
export const MHLogoIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'glow'}>
    <rect
      x="3"
      y="3"
      width="6"
      height="18"
      rx="1"
      fill="currentColor"
      strokeWidth="0"
    />
    <rect
      x="15"
      y="3"
      width="6"
      height="18"
      rx="1"
      fill="currentColor"
      strokeWidth="0"
    />
    <rect
      x="9"
      y="8"
      width="6"
      height="8"
      rx="1"
      fill="currentColor"
      strokeWidth="0"
    />
    <path
      d="M3 8h6M15 8h6M9 12h6"
      stroke={props.color || '#386851'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 2. Construction Hammer (Enhanced design)
export const MHHammerIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'rotate'}>
    <path
      d="M6 6L18 18M8 8L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="4" y="4" width="4" height="4" rx="1" fill="currentColor" />
    <path
      d="M16 16L20 20M18 18L21 21"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 3. Blueprint/Plans Icon (Custom architectural design)
export const MHBlueprintIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'scale'}>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M8 8h8M8 12h6M8 16h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <rect
      x="14"
      y="14"
      width="4"
      height="4"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </IconWrapper>
)

// 4. Hard Hat/Safety Icon (Custom safety design)
export const MHHardHatIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'bounce'}>
    <path
      d="M7 14C7 10.686 9.686 8 13 8H11C7.686 8 5 10.686 5 14V16H19V14C19 10.686 16.314 8 13 8"
      fill="currentColor"
    />
    <ellipse
      cx="12"
      cy="16"
      rx="8"
      ry="2"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <circle cx="9" cy="12" r="1" fill="#386851" />
    <path
      d="M12 8V6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 5. Level/Precision Tool Icon
export const MHLevelIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'slide'}>
    <rect
      x="2"
      y="10"
      width="20"
      height="4"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path
      d="M8 12h1M15 12h1"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <path
      d="M6 8L6 16M18 8L18 16"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 6. Measuring Tape Icon
export const MHMeasureIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'pulse'}>
    <rect
      x="4"
      y="6"
      width="16"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M4 6L20 18"
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="2,2"
    />
    <circle cx="7" cy="9" r="1" fill="currentColor" />
    <path
      d="M10 15h7M10 12h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 7. Building/Structure Icon (Custom architectural)
export const MHBuildingIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'scale'}>
    <rect
      x="6"
      y="4"
      width="12"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="4"
      y="8"
      width="4"
      height="12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="16"
      y="12"
      width="4"
      height="8"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect x="8" y="8" width="2" height="2" fill="currentColor" />
    <rect x="12" y="8" width="2" height="2" fill="currentColor" />
    <rect x="8" y="12" width="2" height="2" fill="currentColor" />
    <rect x="12" y="12" width="2" height="2" fill="currentColor" />
    <rect x="10" y="16" width="2" height="4" fill="currentColor" />
  </IconWrapper>
)

// 8. Veteran Star (Military pride design)
export const MHVeteranStarIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'glow'}>
    <path
      d="M12 2L15.09 8.26L22 9L17 14.74L18.18 21.02L12 17.27L5.82 21.02L7 14.74L2 9L8.91 8.26L12 2Z"
      fill="currentColor"
      stroke="#dc2626"
      strokeWidth="1"
    />
    <circle cx="12" cy="12" r="3" fill="#dc2626" fillOpacity="0.8" />
    <path
      d="M12 10v4M10 12h4"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </IconWrapper>
)

// 9. Quality Shield (Guarantee/quality assurance)
export const MHQualityShieldIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'pulse'}>
    <path
      d="M12 2L3 7V13C3 17.55 6.84 21.74 12 22C17.16 21.74 21 17.55 21 13V7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8" r="1" fill="#386851" />
  </IconWrapper>
)

// 10. Phone with Construction Theme
export const MHPhoneIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'bounce'}>
    <rect
      x="5"
      y="2"
      width="14"
      height="20"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="7"
      y="4"
      width="10"
      height="14"
      rx="1"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
    <path
      d="M9 6h6M9 8h4"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect x="10" y="10" width="4" height="2" rx="1" fill="#386851" />
  </IconWrapper>
)

// 11. Location Pin with MH Branding
export const MHLocationIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'bounce'}>
    <path
      d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="10" r="3" fill="currentColor" />
    <rect
      x="10"
      y="8"
      width="4"
      height="4"
      rx="1"
      fill="white"
      fillOpacity="0.8"
    />
    <path d="M11 9h2M11 11h2" stroke="#386851" strokeWidth="0.5" />
  </IconWrapper>
)

// 12. Email with Professional Touch
export const MHEmailIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'slide'}>
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M2 6L12 13L22 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 10L10 14M18 10L14 14"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <rect
      x="8"
      y="16"
      width="8"
      height="2"
      rx="1"
      fill="#386851"
      fillOpacity="0.6"
    />
  </IconWrapper>
)

// 13. Calendar with Construction Schedule
export const MHCalendarIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'scale'}>
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 2V6M8 2V6M3 10H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <rect x="7" y="14" width="2" height="2" fill="currentColor" />
    <rect x="11" y="14" width="2" height="2" fill="#386851" />
    <rect x="15" y="14" width="2" height="2" fill="currentColor" />
    <rect x="7" y="18" width="2" height="2" fill="currentColor" />
    <rect x="11" y="18" width="2" height="2" fill="currentColor" />
  </IconWrapper>
)

// 14. Arrow Right with Enhanced Movement
export const MHArrowRightIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'slide'}>
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="19"
      cy="12"
      r="2"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
  </IconWrapper>
)

// 15. Check Mark with Success Animation
export const MHCheckIcon: React.FC<MHIconProps> = props => (
  <IconWrapper {...props} hoverEffect={props.hoverEffect || 'scale'}>
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.1"
    />
    <path
      d="M8 12L11 15L16 9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" fill="#386851" fillOpacity="0.2" />
  </IconWrapper>
)

// Export collection for easy access
export const MHCustomIcons = {
  Logo: MHLogoIcon,
  Hammer: MHHammerIcon,
  Blueprint: MHBlueprintIcon,
  HardHat: MHHardHatIcon,
  Level: MHLevelIcon,
  Measure: MHMeasureIcon,
  Building: MHBuildingIcon,
  VeteranStar: MHVeteranStarIcon,
  QualityShield: MHQualityShieldIcon,
  Phone: MHPhoneIcon,
  Location: MHLocationIcon,
  Email: MHEmailIcon,
  Calendar: MHCalendarIcon,
  ArrowRight: MHArrowRightIcon,
  Check: MHCheckIcon,
}

export default MHCustomIcons
