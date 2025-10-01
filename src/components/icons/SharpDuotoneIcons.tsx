// Sharp Duotone Icon System for MH Construction
// Custom implementation for consistent, modern iconography
'use client'

import React from 'react'

// Icon component props interface
interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

// Size mappings
const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
}

// Base icon component
const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 'md',
  className = '',
  primaryColor = 'currentColor',
  secondaryColor = 'currentColor',
  children,
}) => {
  const sizeClass = sizeClasses[size]

  return (
    <svg
      className={`${sizeClass} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={
        {
          '--icon-primary': primaryColor,
          '--icon-secondary': secondaryColor,
        } as React.CSSProperties
      }
    >
      {children}
    </svg>
  )
}

// Navigation Icons
export const MenuIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <rect
        x="3"
        y="6"
        width="18"
        height="2"
        fill="var(--icon-secondary)"
        rx="1"
      />
      <rect
        x="3"
        y="16"
        width="18"
        height="2"
        fill="var(--icon-secondary)"
        rx="1"
      />
    </g>
    <rect
      x="3"
      y="11"
      width="18"
      height="2"
      fill="var(--icon-primary)"
      rx="1"
    />
  </IconBase>
)

export const CloseIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M6 6L18 18"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    <path
      d="M18 6L6 18"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
)

export const ArrowRightIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M5 12H19"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    <path
      d="M12 5L19 12L12 19"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

// Contact & Communication Icons
export const PhoneIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M22 16.92V19.92C22.0011 20.2053 21.9441 20.4877 21.8325 20.7492C21.7209 21.0107 21.5573 21.2456 21.3508 21.4384C21.1444 21.6312 20.8999 21.7773 20.6323 21.8675C20.3647 21.9577 20.0806 21.9901 19.8 21.9625C16.7428 21.586 13.787 20.5341 11.19 18.8825C8.77382 17.3762 6.72533 15.3277 5.21999 12.9113C3.49997 10.2854 2.44818 7.29909 2.07999 4.21255C2.05243 3.93249 2.08467 3.64879 2.17443 3.38156C2.26419 3.11433 2.40984 2.87014 2.60199 2.66384C2.79414 2.45754 3.02844 2.29422 3.28928 2.18281C3.55012 2.0714 3.83187 2.01449 4.11599 2.01562H7.11599C7.59567 2.00762 8.06353 2.16708 8.43099 2.46375C8.79845 2.76042 9.04622 3.17293 9.11599 3.62755"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <path
      d="M9 4C9.53043 5.39749 10.3711 6.65368 11.4497 7.67033C12.5283 8.68699 13.8175 9.43106 15.24 9.83255"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const EmailIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M22 6L12 13L2 6"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
)

export const LocationIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <circle cx="12" cy="9" r="3" stroke="var(--icon-primary)" strokeWidth="2" />
  </IconBase>
)

// Business & Professional Icons
export const CheckIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M9 12L11 14L15 10"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const ToolsIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L10.3 4.7"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
      <path
        d="M9 12L12 15L20.7 6.3C21.1 5.9 21.1 5.3 20.7 4.9L19.1 3.3C18.7 2.9 18.1 2.9 17.7 3.3L9 12"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M3 21L9 15L12 18L6 24"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const HomeIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M9 22V12H15V22"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

// User & Authentication Icons
export const UserIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <circle cx="12" cy="8" r="3" stroke="var(--icon-primary)" strokeWidth="2" />
    <path
      d="M6 20C6 16 8 14 12 14S18 16 18 20"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
  </IconBase>
)

export const LogoutIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M16 17L21 12L16 7"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H9"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
)

// Construction & Project Icons
export const HammerIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M2 20H10V18C10 16.9 9.1 16 8 16H4C2.9 16 2 16.9 2 18V20Z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M14.5 9.5L20.5 3.5C21.3 2.7 21.3 1.3 20.5 0.5C19.7 -0.3 18.3 -0.3 17.5 0.5L11.5 6.5"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8.5 10.5L14.5 4.5L19.5 9.5L13.5 15.5L8.5 10.5Z"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const CalendarIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
  </IconBase>
)

// Military & Veteran Icons
export const ShieldIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M12 22S2 17 2 12V6L12 2L22 6V12C22 17 12 22 12 22Z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M9 12L11 14L15 10"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const StarIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <polygon
      points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
      fill="var(--icon-primary)"
      opacity="0.8"
    />
  </IconBase>
)

// Technology & Innovation Icons
export const BoltIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <polygon
        points="13,2 3,14 12,14 11,22 21,10 12,10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <polygon
      points="13,2 3,14 12,14 11,22 21,10 12,10"
      fill="var(--icon-primary)"
      opacity="0.6"
    />
  </IconBase>
)

export const CogIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M19.4 15A1.65 1.65 0 0 0 21 13.09A1.65 1.65 0 0 0 19.4 9L19.25 8.97A1.65 1.65 0 0 1 18.11 7.2L18.15 7A1.65 1.65 0 0 0 16.54 5.39A1.65 1.65 0 0 0 14.93 7L14.78 7.07A1.65 1.65 0 0 1 13 6.93L12.97 6.75A1.65 1.65 0 0 0 11.06 5.14A1.65 1.65 0 0 0 9.15 6.75L9.12 6.9A1.65 1.65 0 0 1 7.35 7.97L7.2 7.93A1.65 1.65 0 0 0 5.59 9.54A1.65 1.65 0 0 0 7.2 11.15L7.25 11.18A1.65 1.65 0 0 1 8.39 12.95L8.35 13.15A1.65 1.65 0 0 0 9.96 14.76A1.65 1.65 0 0 0 11.57 13.15L11.72 13.08A1.65 1.65 0 0 1 13.55 14.22L13.58 14.4A1.65 1.65 0 0 0 15.19 16.01A1.65 1.65 0 0 0 16.8 14.4L16.77 14.25A1.65 1.65 0 0 1 18.54 13.18L18.7 13.22A1.65 1.65 0 0 0 20.31 11.61A1.65 1.65 0 0 0 18.7 10L18.65 9.97A1.65 1.65 0 0 1 17.51 8.2L17.55 8A1.65 1.65 0 0 0 15.94 6.39A1.65 1.65 0 0 0 14.33 8"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
  </IconBase>
)

// Notification & Status Icons
export const BellIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M13.73 21A2 2 0 0 1 10.27 21"
      stroke="var(--icon-primary)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </IconBase>
)

export const SyncIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <polyline
        points="23,4 23,10 17,10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
      <polyline
        points="1,20 1,14 7,14"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
  </IconBase>
)

// Theme & Display Icons
export const SunIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <g stroke="var(--icon-primary)" strokeWidth="2" strokeLinecap="round">
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </g>
  </IconBase>
)

export const MoonIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"
      fill="var(--icon-primary)"
      opacity="0.6"
    />
  </IconBase>
)

export const DesktopIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.4">
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        ry="2"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="21"
        x2="16"
        y2="21"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <line
      x1="12"
      y1="17"
      x2="12"
      y2="21"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
  </IconBase>
)

// Social Media Icons
export const FacebookIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M14.8 20v-7.2h2.4l.4-2.8h-2.8V8.4c0-.8.2-1.4 1.4-1.4h1.4V4.4c-.2 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V10H8.8v2.8h2.9V20h3.1z"
      fill="var(--icon-primary)"
    />
  </IconBase>
)

export const InstagramIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        ry="5"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
    <circle cx="17.5" cy="6.5" r="1.5" fill="var(--icon-primary)" />
  </IconBase>
)

export const LinkedInIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        ry="2"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M6 8v12M10 8v12M10 12c0-2 1.5-3 3-3s3 1 3 3v8"
      stroke="var(--icon-primary)"
      strokeWidth="2"
    />
    <circle cx="6" cy="6" r="1" fill="var(--icon-primary)" />
  </IconBase>
)

export const TwitterIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M20 6.5c-.8.4-1.6.6-2.5.7.9-.5 1.6-1.4 1.9-2.4-.8.5-1.7.8-2.7 1-.8-.8-1.9-1.3-3.1-1.3-2.3 0-4.2 1.9-4.2 4.2 0 .3 0 .6.1.9-3.5-.2-6.6-1.9-8.7-4.4-.4.6-.6 1.4-.6 2.2 0 1.5.7 2.8 1.8 3.5-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.7 3.3 4.1-.3.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.8-5.1 1.8-.3 0-.7 0-1-.1 1.9 1.2 4.1 1.9 6.5 1.9 7.8 0 12.1-6.5 12.1-12.1v-.6c.8-.6 1.5-1.3 2.1-2.1z"
      fill="var(--icon-primary)"
    />
  </IconBase>
)

export const XIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <path
      d="M18.244 4.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 23.75H1.68l7.73-8.835L1.254 4.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 6.126H5.117z"
      fill="var(--icon-primary)"
    />
  </IconBase>
)

export const YouTubeIcon: React.FC<IconProps> = props => (
  <IconBase {...props}>
    <g opacity="0.3">
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        ry="2"
        stroke="var(--icon-secondary)"
        strokeWidth="2"
      />
    </g>
    <polygon points="10,9 15,12 10,15" fill="var(--icon-primary)" />
  </IconBase>
)

// Export all icons as a collection
export const SharpDuotoneIcons = {
  Menu: MenuIcon,
  Close: CloseIcon,
  ArrowRight: ArrowRightIcon,
  Phone: PhoneIcon,
  Email: EmailIcon,
  Location: LocationIcon,
  Check: CheckIcon,
  Tools: ToolsIcon,
  Home: HomeIcon,
  User: UserIcon,
  Logout: LogoutIcon,
  Hammer: HammerIcon,
  Calendar: CalendarIcon,
  Shield: ShieldIcon,
  Star: StarIcon,
  Bolt: BoltIcon,
  Cog: CogIcon,
  Bell: BellIcon,
  Sync: SyncIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  Desktop: DesktopIcon,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Twitter: TwitterIcon,
  X: XIcon,
  YouTube: YouTubeIcon,
}

export default SharpDuotoneIcons
