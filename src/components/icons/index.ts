/**
 * Icon Components
 * Centralized icon exports for the MH Construction website
 *
 * This provides two import options:
 *
 * 1. Base Components (flexible):
 *    import { MaterialIcon, AmericanFlag } from "@/components/icons";
 *    <MaterialIcon icon="construction" size="lg" />
 *
 * 2. Pre-built Icons (convenient, type-safe):
 *    import { CheckCircleIcon, PhoneIcon } from "@/components/icons";
 *    <CheckCircleIcon size="lg" className="text-green-600" />
 *
 * Pre-built icons include the 40+ most commonly used icons with:
 * - Consistent sizing and styling
 * - Theme-aware variants (veteran, military)
 * - Better IntelliSense support
 * - Reduced repetition
 */

// Base icon components
export { MaterialIcon } from "./MaterialIcon";
export { AmericanFlag } from "./AmericanFlag";

// Pre-built strategic icons (40+ most common icons)
export {
  // Success & Confirmation (most common)
  CheckCircleIcon,
  CheckIcon,
  VerifiedIcon,
  VerifiedUserIcon,

  // Navigation & Direction
  ArrowForwardIcon,
  ChevronRightIcon,
  CloseIcon,
  HomeIcon,

  // Military & Veteran (theme-aware)
  MilitaryTechIcon,
  FlagIcon,
  ShieldIcon,
  WorkspacePremiumIcon,

  // Communication
  PhoneIcon,
  CallIcon,
  EmailIcon,
  MailIcon,
  MarkEmailReadIcon,
  ForumIcon,

  // Location & Map
  LocationOnIcon,
  PlaceIcon,
  MapIcon,

  // Construction & Business
  ConstructionIcon,
  EngineeringIcon,
  HandshakeIcon,
  BusinessIcon,
  AccountBalanceIcon,

  // Rating & Achievement
  StarIcon,
  StarsIcon,
  TrophyIcon,

  // Time & Scheduling
  ScheduleIcon,
  EventIcon,

  // People & Community
  GroupsIcon,
  DiversityIcon,
  WorkIcon,

  // Information & Utility
  InfoIcon,
  AnalyticsIcon,
  DownloadIcon,
  PhotoLibraryIcon,
  PdfIcon,
  InstallMobileIcon,
} from "./IconLibrary";
