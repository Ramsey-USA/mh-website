import { memo, type FC, type CSSProperties } from "react";

interface MaterialIconProps {
  icon: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  style?: CSSProperties;
  primaryColor?: string;
  interactive?: boolean; // Indicates if icon will animate/change
  /** Accessibility label for screen readers (when icon has semantic meaning) */
  ariaLabel?: string;
  /** Theme preset for military/veteran styling */
  theme?: "veteran" | "military" | "tactical" | "default";
}

// Enhanced size mappings to maximize container space (approximately 75-80% fill ratio)
// Using explicit pixel values that will be applied via inline styles for guaranteed rendering
const sizeMap = {
  xs: 20, // 20px - extra small, dense layouts
  sm: 24, // 24px - optimal for small buttons/containers
  md: 30, // 30px - balanced medium size
  lg: 36, // 36px - good for standard containers
  xl: 48, // 48px - maximizes 64px (w-16) containers
  "2xl": 60, // 60px - maximizes 80px (w-20) containers
  "3xl": 72, // 72px - maximizes 96px (w-24) containers
  "4xl": 96, // 96px - hero/large display sizes
  "5xl": 120, // 120px - extra large hero displays
};

// Military/veteran theme color mappings
const themeColors = {
  veteran: "text-bronze-300 dark:text-bronze-400", // Veteran recognition
  military: "text-brand-primary dark:text-brand-primary-light", // Military precision
  tactical: "text-blue-600 dark:text-blue-400", // Tactical/strategic
  default: "", // No theme color applied
};

const MaterialIconComponent: FC<MaterialIconProps> = ({
  icon,
  className = "",
  size = "md",
  style,
  primaryColor,
  interactive = false,
  ariaLabel,
  theme = "default",
}) => {
  // Apply theme color if specified
  const themeClass = theme !== "default" ? themeColors[theme] : "";

  // Apply primaryColor if provided and no color class in className or theme
  const hasColorClass =
    className.includes("text-") && !className.includes("text-[");
  const colorStyle =
    primaryColor && !hasColorClass && theme === "default"
      ? { color: primaryColor }
      : {};

  // Performance optimization: Add interactive class for icons that will animate
  const performanceClass = interactive ? "icon-interactive" : "icon-static";

  // Get the font size from the size map
  const fontSize = sizeMap[size];

  // Build final className
  const finalClassName = [
    "material-icons",
    "flex",
    "items-center",
    "justify-center",
    performanceClass,
    themeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={finalClassName}
      style={{
        userSelect: "none",
        lineHeight: 1,
        fontSize: `${fontSize}px`, // Apply font-size directly via inline style
        ...colorStyle,
        ...style,
      }}
      aria-hidden={ariaLabel ? "false" : "true"}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    >
      {icon}
    </span>
  );
};

// Memoize component to prevent unnecessary re-renders
// Only re-render if props actually change
export const MaterialIcon = memo(
  MaterialIconComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.icon === nextProps.icon &&
      prevProps.className === nextProps.className &&
      prevProps.size === nextProps.size &&
      prevProps.primaryColor === nextProps.primaryColor &&
      prevProps.interactive === nextProps.interactive &&
      prevProps.ariaLabel === nextProps.ariaLabel &&
      prevProps.theme === nextProps.theme &&
      JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)
    );
  },
);

MaterialIcon.displayName = "MaterialIcon";

export default MaterialIcon;
