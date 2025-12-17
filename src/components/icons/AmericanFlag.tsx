"use client";

import { useState } from "react";

interface AmericanFlagProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: "w-8 h-6",
  md: "w-12 h-9",
  lg: "w-16 h-12",
  xl: "w-20 h-15",
  "2xl": "w-24 h-18",
  "3xl": "w-32 h-24",
  "4xl": "w-40 h-30",
  "5xl": "w-48 h-36",
};

/**
 * American Flag SVG Component
 * Features a proper American flag with 50 stars and 13 stripes
 * Includes optional wave animation for a dynamic patriotic effect
 */
export function AmericanFlag({
  size = "lg",
  className = "",
  animated = true,
}: AmericanFlagProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative inline-block ${sizeMap[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="img"
      aria-label="American Flag - Veteran-Owned Company"
    >
      <svg
        viewBox="0 0 190 100"
        className={`w-full h-full drop-shadow-lg ${
          animated && isHovered ? "animate-wave" : ""
        }`}
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }}
      >
        <defs>
          {/* Gradient for depth */}
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B22234" />
            <stop offset="100%" stopColor="#8B1A2B" />
          </linearGradient>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3C3B6E" />
            <stop offset="100%" stopColor="#2B2A52" />
          </linearGradient>
        </defs>

        {/* Red and White Stripes */}
        {[...Array(13)].map((_, i) => (
          <rect
            key={i}
            x="0"
            y={i * (100 / 13)}
            width="190"
            height={100 / 13}
            fill={i % 2 === 0 ? "url(#redGradient)" : "#FFFFFF"}
            className={animated ? "transition-all duration-300" : ""}
          />
        ))}

        {/* Blue Canton (Union) */}
        <rect
          x="0"
          y="0"
          width="76"
          height={100 * (7 / 13)}
          fill="url(#blueGradient)"
        />

        {/* 50 Stars arranged in 9 rows (staggered pattern) */}
        {/* Row 1: 6 stars */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={`row1-${i}`}
            cx={7 + i * 12.6}
            cy={4}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1}s` } : {}}
          />
        ))}
        {/* Row 2: 5 stars */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={`row2-${i}`}
            cx={13.3 + i * 12.6}
            cy={10}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 0.2}s` } : {}}
          />
        ))}
        {/* Row 3: 6 stars */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={`row3-${i}`}
            cx={7 + i * 12.6}
            cy={16}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 0.4}s` } : {}}
          />
        ))}
        {/* Row 4: 5 stars */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={`row4-${i}`}
            cx={13.3 + i * 12.6}
            cy={22}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 0.6}s` } : {}}
          />
        ))}
        {/* Row 5: 6 stars */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={`row5-${i}`}
            cx={7 + i * 12.6}
            cy={28}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 0.8}s` } : {}}
          />
        ))}
        {/* Row 6: 5 stars */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={`row6-${i}`}
            cx={13.3 + i * 12.6}
            cy={34}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 1.0}s` } : {}}
          />
        ))}
        {/* Row 7: 6 stars */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={`row7-${i}`}
            cx={7 + i * 12.6}
            cy={40}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 1.2}s` } : {}}
          />
        ))}
        {/* Row 8: 5 stars */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={`row8-${i}`}
            cx={13.3 + i * 12.6}
            cy={46}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 1.4}s` } : {}}
          />
        ))}
        {/* Row 9: 6 stars */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={`row9-${i}`}
            cx={7 + i * 12.6}
            cy={52}
            r="1.5"
            fill="#FFFFFF"
            className={animated ? "animate-twinkle" : ""}
            style={animated ? { animationDelay: `${i * 0.1 + 1.6}s` } : {}}
          />
        ))}
      </svg>
    </div>
  );
}
