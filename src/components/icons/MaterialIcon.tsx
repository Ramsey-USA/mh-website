import { memo, type FC, type CSSProperties } from "react";

interface MaterialIconProps {
  icon: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  style?: CSSProperties;
  primaryColor?: string;
  interactive?: boolean; // Indicates if icon will animate/change
}

// Enhanced size mappings to maximize container space (approximately 75-80% fill ratio)
// Using explicit pixel values that will be applied via inline styles for guaranteed rendering
const sizeMap = {
  sm: 24, // 24px - optimal for small buttons/containers
  md: 30, // 30px - balanced medium size
  lg: 36, // 36px - good for standard containers
  xl: 48, // 48px - maximizes 64px (w-16) containers
  "2xl": 60, // 60px - maximizes 80px (w-20) containers
  "3xl": 72, // 72px - maximizes 96px (w-24) containers
  "4xl": 96, // 96px - hero/large display sizes
};

const MaterialIconComponent: FC<MaterialIconProps> = ({
  icon,
  className = "",
  size = "md",
  style,
  primaryColor,
  interactive = false,
}) => {
  // Apply primaryColor if provided and no color class in className
  const hasColorClass =
    className.includes("text-") && !className.includes("text-[");
  const colorStyle =
    primaryColor && !hasColorClass ? { color: primaryColor } : {};

  // Performance optimization: Add interactive class for icons that will animate
  const performanceClass = interactive ? "icon-interactive" : "icon-static";

  // Get the font size from the size map
  const fontSize = sizeMap[size];

  return (
    <span
      className={`material-icons flex items-center justify-center ${performanceClass} ${className}`}
      style={{
        userSelect: "none",
        lineHeight: 1,
        fontSize: `${fontSize}px`, // Apply font-size directly via inline style
        ...colorStyle,
        ...style,
      }}
      aria-hidden="true"
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
      JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)
    );
  },
);

MaterialIcon.displayName = "MaterialIcon";

export default MaterialIcon;
