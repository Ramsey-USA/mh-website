import { MaterialIcon } from "@/components/icons/MaterialIcon";

export type VendorPlatform =
  | "website"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x"
  | "google"
  | "yelp"
  | "maps";

interface VendorPlatformLinkProps {
  href: string;
  label: string;
  platform: VendorPlatform;
}

// Maps each platform to its Material Icon, hover gradient, and aria prefix
// Gradient classes must be fully static so Tailwind can pick them up at build time
const PLATFORM_CONFIG: Record<
  VendorPlatform,
  { icon: string; hoverClasses: string; ariaPrefix: string }
> = {
  website: {
    icon: "language",
    hoverClasses:
      "hover:from-[#2D6A4F] hover:via-[#40916C] hover:to-[#1B4332] hover:border-[#40916C] hover:shadow-[#40916C]/40",
    ariaPrefix: "Visit",
  },
  facebook: {
    icon: "thumb_up",
    hoverClasses:
      "hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0] hover:border-[#1877F2] hover:shadow-[#1877F2]/40",
    ariaPrefix: "Follow on Facebook",
  },
  instagram: {
    icon: "photo_camera",
    hoverClasses:
      "hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:border-[#E4405F] hover:shadow-[#E4405F]/40",
    ariaPrefix: "Follow on Instagram",
  },
  linkedin: {
    icon: "work",
    hoverClasses:
      "hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182] hover:border-[#0A66C2] hover:shadow-[#0A66C2]/40",
    ariaPrefix: "Connect on LinkedIn",
  },
  youtube: {
    icon: "play_circle",
    hoverClasses:
      "hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000] hover:border-[#FF0000] hover:shadow-[#FF0000]/40",
    ariaPrefix: "Watch on YouTube",
  },
  x: {
    icon: "close",
    hoverClasses:
      "hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000] hover:border-[#1D9BF0] hover:shadow-black/40",
    ariaPrefix: "Follow on X",
  },
  google: {
    icon: "rate_review",
    hoverClasses:
      "hover:from-[#4285F4] hover:via-[#EA4335] hover:to-[#FBBC05] hover:border-[#4285F4] hover:shadow-[#4285F4]/40",
    ariaPrefix: "View on Google",
  },
  yelp: {
    icon: "star",
    hoverClasses:
      "hover:from-[#D32323] hover:via-[#FF4444] hover:to-[#D32323] hover:border-[#D32323] hover:shadow-[#D32323]/40",
    ariaPrefix: "View on Yelp",
  },
  maps: {
    icon: "map",
    hoverClasses:
      "hover:from-[#34A853] hover:via-[#66BB6A] hover:to-[#2E7D32] hover:border-[#34A853] hover:shadow-[#34A853]/40",
    ariaPrefix: "View on Maps",
  },
};

export function VendorPlatformLink({
  href,
  label,
  platform,
}: VendorPlatformLinkProps) {
  const { icon, hoverClasses, ariaPrefix } = PLATFORM_CONFIG[platform];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ariaPrefix}: ${label} (opens in new tab)`}
      title={label}
      className={[
        "group flex justify-center items-center",
        "bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700",
        hoverClasses,
        "p-2.5 border border-gray-600 dark:border-gray-500",
        "rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation",
        "shadow-md",
      ].join(" ")}
    >
      <MaterialIcon
        icon={icon}
        size="sm"
        ariaLabel=""
        className="text-gray-300 group-hover:text-white transition-colors drop-shadow-lg"
      />
    </a>
  );
}
