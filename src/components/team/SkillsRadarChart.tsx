"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, type CSSProperties } from "react";

// Dynamically import Recharts components only when needed
const LazyRadarChart = dynamic(
  () => import("recharts").then((mod) => mod.RadarChart),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse text-gray-600">Loading chart...</div>
      </div>
    ),
  },
);

const LazyRadar = dynamic(() => import("recharts").then((mod) => mod.Radar), {
  ssr: false,
});

const LazyPolarGrid = dynamic(
  () => import("recharts").then((mod) => mod.PolarGrid),
  { ssr: false },
);

const LazyPolarAngleAxis = dynamic(
  () => import("recharts").then((mod) => mod.PolarAngleAxis),
  { ssr: false },
);

const LazyPolarRadiusAxis = dynamic(
  () => import("recharts").then((mod) => mod.PolarRadiusAxis),
  { ssr: false },
);

const LazyResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false },
);

const LazyTooltip = dynamic(
  () => import("recharts").then((mod) => mod.Tooltip),
  { ssr: false },
);

interface SkillData {
  subject: string;
  value: number;
  fullMark: number;
}

interface SkillsRadarChartProps {
  data: SkillData[];
  isDark?: boolean;
}

/**
 * Lazy-loaded Skills Radar Chart Component
 *
 * Uses dynamic imports to load Recharts library only when needed,
 * reducing initial bundle size by ~46 KiB.
 *
 * Chart is only rendered when visible in viewport (intersection observer).
 */
export function SkillsRadarChart({
  data,
  isDark = false,
}: SkillsRadarChartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Load slightly before visible
      },
    );

    observer.observe(chartRef);

    return () => observer.disconnect();
  }, [chartRef]);

  const chartColors = {
    stroke: isDark ? "#BD9264" : "#386851", // Bronze/brand colors
    fill: isDark ? "#BD9264" : "#386851",
    grid: isDark ? "#BD9264" : "#386851",
    gridOpacity: 0.3,
    text: isDark ? "#BD9264" : "#386851",
    axisText: isDark ? "#9ca3af" : "#6b7280",
  };

  return (
    <div
      ref={setChartRef}
      className="w-full h-[250px] sm:h-[280px] md:h-[300px]"
    >
      {isVisible ? (
        <LazyResponsiveContainer width="100%" height="100%">
          <LazyRadarChart data={data}>
            <LazyPolarGrid
              stroke={chartColors.grid}
              strokeOpacity={chartColors.gridOpacity}
            />
            <LazyPolarAngleAxis
              dataKey="subject"
              tick={{
                fill: chartColors.text,
                fontSize: 12,
                fontWeight: 600,
              }}
            />
            <LazyPolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: chartColors.axisText, fontSize: 10 }}
            />
            <LazyRadar
              name="Skills"
              dataKey="value"
              stroke={chartColors.stroke}
              fill={chartColors.fill}
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <LazyTooltip
              contentStyle={
                {
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: `2px solid ${isDark ? "rgba(189, 146, 100, 0.3)" : "rgba(56, 104, 81, 0.2)"}`,
                  borderRadius: "0.5rem",
                  color: chartColors.text,
                  padding: "0.75rem",
                } as CSSProperties
              }
            />
          </LazyRadarChart>
        </LazyResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="animate-pulse mb-2">
              <div className="w-16 h-16 mx-auto bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Loading skills chart...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
