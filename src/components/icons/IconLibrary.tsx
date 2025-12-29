/**
 * Strategic Icon Component Library
 * Pre-built icon components for commonly used icons across the application
 *
 * Benefits:
 * - Consistent sizing and styling
 * - Reduced repetition
 * - Better IntelliSense/autocomplete
 * - Easier maintenance
 * - Theme-aware variants
 *
 * Usage:
 * import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
 * <CheckCircleIcon size="lg" className="text-green-600" />
 */

import { MaterialIcon } from "./MaterialIcon";
import type { FC } from "react";

interface IconProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
  ariaLabel?: string;
}

// ===================================
// SUCCESS & CONFIRMATION ICONS
// ===================================

/** Check circle icon - Used 77 times (most common) */
export const CheckCircleIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="check_circle"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Simple check icon - Used 9 times */
export const CheckIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="check"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Verified badge icon - Used 26 times */
export const VerifiedIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="verified"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Verified user icon - Used 9 times */
export const VerifiedUserIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="verified_user"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// NAVIGATION & DIRECTION ICONS
// ===================================

/** Arrow forward icon - Used 56 times (2nd most common) */
export const ArrowForwardIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="arrow_forward"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Chevron right icon - Used 6 times */
export const ChevronRightIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="chevron_right"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Close icon - Used 15 times */
export const CloseIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="close"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Home icon - Used 6 times */
export const HomeIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="home"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// MILITARY & VETERAN ICONS
// ===================================

/** Military tech icon - Used 46 times (3rd most common) */
export const MilitaryTechIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="military_tech"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
    theme="veteran"
  />
);

/** Flag icon - Used 8 times */
export const FlagIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="flag"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
    theme="veteran"
  />
);

/** Shield icon - Used 6 times */
export const ShieldIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="shield"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
    theme="military"
  />
);

/** Workspace premium icon - Used 17 times */
export const WorkspacePremiumIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="workspace_premium"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
    theme="veteran"
  />
);

// ===================================
// COMMUNICATION ICONS
// ===================================

/** Phone icon - Used 24 times */
export const PhoneIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="phone"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Call icon - Used 12 times */
export const CallIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="call"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Email icon - Used 6 times */
export const EmailIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="email"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Mail icon - Used 8 times */
export const MailIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="mail"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Mark email read icon - Used 7 times */
export const MarkEmailReadIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="mark_email_read"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Forum/chat icon - Used 6 times */
export const ForumIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="forum"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// LOCATION & MAP ICONS
// ===================================

/** Location on icon - Used 11 times */
export const LocationOnIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="location_on"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Place icon - Used 7 times */
export const PlaceIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="place"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Map icon - Used 8 times */
export const MapIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="map"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// CONSTRUCTION & BUSINESS ICONS
// ===================================

/** Construction icon - Used 18 times */
export const ConstructionIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="construction"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Engineering icon - Used 6 times */
export const EngineeringIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="engineering"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Handshake icon - Used 20 times */
export const HandshakeIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="handshake"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Business icon - Used 6 times */
export const BusinessIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="business"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Account balance icon - Used 6 times */
export const AccountBalanceIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="account_balance"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// RATING & ACHIEVEMENT ICONS
// ===================================

/** Star icon - Used 23 times */
export const StarIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="star"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Stars icon - Used 9 times */
export const StarsIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="stars"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Emoji events/trophy icon - Used 7 times */
export const TrophyIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="emoji_events"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// TIME & SCHEDULING ICONS
// ===================================

/** Schedule icon - Used 11 times */
export const ScheduleIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="schedule"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Event/calendar icon - Used 12 times */
export const EventIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="event"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// PEOPLE & COMMUNITY ICONS
// ===================================

/** Groups icon - Used 9 times */
export const GroupsIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="groups"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Diversity icon - Used 8 times */
export const DiversityIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="diversity_3"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Work icon - Used 7 times */
export const WorkIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="work"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

// ===================================
// INFORMATION & UTILITY ICONS
// ===================================

/** Info icon - Used 13 times */
export const InfoIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="info"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Analytics icon - Used 6 times */
export const AnalyticsIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="analytics"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Download icon - Used 6 times */
export const DownloadIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="download"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Photo library icon - Used 14 times */
export const PhotoLibraryIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="photo_library"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** PDF icon - Used 5 times */
export const PdfIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="picture_as_pdf"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);

/** Install mobile/PWA icon - Used 6 times */
export const InstallMobileIcon: FC<IconProps> = ({
  size = "md",
  className = "",
  ariaLabel,
}) => (
  <MaterialIcon
    icon="install_mobile"
    size={size}
    className={className}
    {...(ariaLabel && { ariaLabel })}
  />
);
