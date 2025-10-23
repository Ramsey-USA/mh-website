/**
 * Analytics Dashboard Constants and Types
 * Shared configuration and type definitions for analytics components
 */

// Dashboard Color Palette
export const COLORS = {
  primary: "#3B82F6",
  secondary: "#8B5CF6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#06B6D4",
  neutral: "#6B7280",
};

export const CHART_COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
];

// Dashboard Tab Configuration
export const DASHBOARD_TABS = [
  { value: "overview", label: "Overview", icon: "dashboard" },
  { value: "behavior", label: "User Behavior", icon: "people" },
  { value: "performance", label: "Performance", icon: "speed" },
  { value: "conversions", label: "Conversions", icon: "trending_up" },
  { value: "veterans", label: "Veterans", icon: "military_tech" },
  { value: "realtime", label: "Real-time", icon: "live_tv" },
];

// Shared Types
export interface DashboardData {
  [key: string]: any;
}

export interface ChartProps {
  data: any;
  className?: string;
}

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon?: string;
  description?: string;
}
