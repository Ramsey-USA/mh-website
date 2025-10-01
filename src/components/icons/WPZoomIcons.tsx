// WPZoom Style Icons for MH Construction
// Using react-icons with clean, modern icon sets
'use client'

import React from 'react'
import {
  // Navigation & Actions
  HiMenuAlt3,
  HiX,
  HiArrowRight,

  // Contact & Communication
  HiPhone,
  HiMail,
  HiLocationMarker,

  // Business & Professional
  HiCheck,
  HiCog,
  HiHome,
  HiUser,
  HiLogout,

  // Construction & Projects
  HiTemplate,
  HiCalendar,

  // Military & Veteran Support
  HiShieldCheck,
  HiStar,

  // Technology & Innovation
  HiLightningBolt,

  // Notifications & Status
  HiBell,
  HiRefresh,

  // Theme & UI
  HiSun,
  HiMoon,
  HiDesktopComputer,
} from 'react-icons/hi'

import {
  // Social Media
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa'

// Icon component props interface
interface IconProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  color?: string
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

// Navigation & Actions
export const WPZoomMenuIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiMenuAlt3
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomCloseIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => <HiX className={`${sizeClasses[size]} ${className}`} style={{ color }} />

export const WPZoomArrowRightIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiArrowRight
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Contact & Communication
export const WPZoomPhoneIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiPhone className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomEmailIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiMail className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomLocationIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiLocationMarker
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Business & Professional
export const WPZoomCheckIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiCheck className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomToolsIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiCog className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomHomeIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiHome className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomUserIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiUser className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomLogoutIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiLogout className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

// Construction & Projects
export const WPZoomHammerIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiTemplate
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomCalendarIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiCalendar
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Military & Veteran Support
export const WPZoomShieldIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiShieldCheck
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomStarIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiStar className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

// Technology & Innovation
export const WPZoomBoltIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiLightningBolt
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomCogIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiCog className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

// Notifications & Status
export const WPZoomBellIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiBell className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomSyncIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiRefresh
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Social Media
export const WPZoomFacebookIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <FaFacebookF
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomInstagramIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <FaInstagram
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomLinkedInIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <FaLinkedinIn
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomTwitterIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <FaTwitter
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

export const WPZoomYouTubeIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <FaYoutube
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Theme & UI Icons
export const WPZoomSunIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiSun className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomMoonIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiMoon className={`${sizeClasses[size]} ${className}`} style={{ color }} />
)

export const WPZoomDesktopIcon: React.FC<IconProps> = ({
  size = 'md',
  className = '',
  color = 'currentColor',
}) => (
  <HiDesktopComputer
    className={`${sizeClasses[size]} ${className}`}
    style={{ color }}
  />
)

// Export all icons as a collection
export const WPZoomIcons = {
  Menu: WPZoomMenuIcon,
  Close: WPZoomCloseIcon,
  ArrowRight: WPZoomArrowRightIcon,
  Phone: WPZoomPhoneIcon,
  Email: WPZoomEmailIcon,
  Location: WPZoomLocationIcon,
  Check: WPZoomCheckIcon,
  Tools: WPZoomToolsIcon,
  Home: WPZoomHomeIcon,
  User: WPZoomUserIcon,
  Logout: WPZoomLogoutIcon,
  Hammer: WPZoomHammerIcon,
  Calendar: WPZoomCalendarIcon,
  Shield: WPZoomShieldIcon,
  Star: WPZoomStarIcon,
  Bolt: WPZoomBoltIcon,
  Cog: WPZoomCogIcon,
  Bell: WPZoomBellIcon,
  Sync: WPZoomSyncIcon,
  Facebook: WPZoomFacebookIcon,
  Instagram: WPZoomInstagramIcon,
  LinkedIn: WPZoomLinkedInIcon,
  Twitter: WPZoomTwitterIcon,
  YouTube: WPZoomYouTubeIcon,
  Sun: WPZoomSunIcon,
  Moon: WPZoomMoonIcon,
  Desktop: WPZoomDesktopIcon,
}

export default WPZoomIcons
