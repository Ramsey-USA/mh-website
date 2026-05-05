"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SafetyBarChartProps {
  data: Array<{ name: string; count: number }>;
}

export function SafetyBarChart({ data }: SafetyBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 10 }} />
        <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
            color: "#f3f4f6",
          }}
        />
        <Bar dataKey="count" fill="#386851" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
