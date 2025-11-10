/**
 * Cost Breakdown Chart Component
 * Visual pie chart display for cost breakdown
 */

"use client";

import { useState } from "react";

interface CostBreakdownChartProps {
  breakdown: {
    materials: number;
    labor: number;
    permits: number;
    overhead: number;
    contingency: number;
  };
  totalCost: number;
}

export function CostBreakdownChart({
  breakdown,
  totalCost,
}: CostBreakdownChartProps) {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const breakdownItems = [
    {
      label: "Materials",
      amount: breakdown.materials,
      color: "#3B82F6", // blue-500
      hoverColor: "#2563EB", // blue-600
    },
    {
      label: "Labor",
      amount: breakdown.labor,
      color: "#10B981", // green-500
      hoverColor: "#059669", // green-600
    },
    {
      label: "Permits & Fees",
      amount: breakdown.permits,
      color: "#F59E0B", // yellow-500
      hoverColor: "#D97706", // yellow-600
    },
    {
      label: "Overhead",
      amount: breakdown.overhead,
      color: "#8B5CF6", // purple-500
      hoverColor: "#7C3AED", // purple-600
    },
    {
      label: "Contingency",
      amount: breakdown.contingency,
      color: "#EF4444", // red-500
      hoverColor: "#DC2626", // red-600
    },
  ];

  // Calculate percentages and cumulative angles for pie chart
  let currentAngle = -90; // Start from top
  const segments = breakdownItems.map((item) => {
    const percentage = (item.amount / totalCost) * 100;
    const angleSize = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSize;
    currentAngle = endAngle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle,
    };
  });

  // SVG Pie Chart
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    radius = 100,
    innerRadius = 0,
  ) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 120 + radius * Math.cos(startRad);
    const y1 = 120 + radius * Math.sin(startRad);
    const x2 = 120 + radius * Math.cos(endRad);
    const y2 = 120 + radius * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    if (innerRadius > 0) {
      // Donut chart
      const x3 = 120 + innerRadius * Math.cos(endRad);
      const y3 = 120 + innerRadius * Math.sin(endRad);
      const x4 = 120 + innerRadius * Math.cos(startRad);
      const y4 = 120 + innerRadius * Math.sin(startRad);

      return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;
    } else {
      // Regular pie
      return `M 120 120 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    }
  };

  return (
    <div className="space-y-6">
      {/* SVG Pie Chart */}
      <div className="flex justify-center">
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="transform transition-transform hover:scale-105"
        >
          {segments.map((segment, index) => (
            <g key={index}>
              <path
                d={createArcPath(segment.startAngle, segment.endAngle, 100, 40)}
                fill={
                  hoveredSegment === segment.label
                    ? segment.hoverColor
                    : segment.color
                }
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredSegment(segment.label)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  filter:
                    hoveredSegment === segment.label
                      ? "drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
                      : "none",
                }}
              />
            </g>
          ))}

          {/* Center text */}
          <text
            x="120"
            y="115"
            textAnchor="middle"
            className="fill-gray-700 text-xs font-semibold"
          >
            Total Cost
          </text>
          <text
            x="120"
            y="130"
            textAnchor="middle"
            className="fill-brand-primary text-lg font-bold"
          >
            {formatCurrency(totalCost)}
          </text>
        </svg>
      </div>

      {/* Legend with Interactive Hover */}
      <div className="space-y-2">
        {breakdownItems.map((item, index) => {
          const percentage = Math.round((item.amount / totalCost) * 100);
          const isHovered = hoveredSegment === item.label;

          return (
            <button
              key={index}
              type="button"
              className={`flex justify-between items-center p-3 rounded-lg transition-all cursor-pointer w-full text-left ${
                isHovered ? "bg-gray-100 shadow-sm" : "bg-white"
              }`}
              onMouseEnter={() => setHoveredSegment(item.label)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded w-4 h-4 transition-transform"
                  style={{
                    backgroundColor: isHovered ? item.hoverColor : item.color,
                    transform: isHovered ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span
                  className={`font-medium ${isHovered ? "text-brand-primary" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">{percentage}%</span>
                <span
                  className={`font-semibold ${isHovered ? "text-brand-primary" : "text-gray-900"}`}
                >
                  {formatCurrency(item.amount)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Helpful Explanation */}
      {hoveredSegment && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-900 text-sm">
            {hoveredSegment === "Materials" &&
              "Materials include lumber, concrete, fixtures, and all physical building components for your project."}
            {hoveredSegment === "Labor" &&
              "Labor costs cover skilled tradespeople including carpenters, electricians, plumbers, and project management."}
            {hoveredSegment === "Permits & Fees" &&
              "Permit costs include building permits, inspections, and regulatory compliance fees required by local authorities."}
            {hoveredSegment === "Overhead" &&
              "Overhead covers insurance, equipment, administrative costs, and general business operations."}
            {hoveredSegment === "Contingency" &&
              "Contingency reserve helps handle unexpected issues or changes that may arise during construction."}
          </p>
        </div>
      )}
    </div>
  );
}
