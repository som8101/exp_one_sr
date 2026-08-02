"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface AnalyticsChartProps {
  data: {
    date: string;
    views: number;
  }[];
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  // Format the dates for the X-axis (e.g. "2023-10-01" -> "Oct 01")
  const formattedData = data.map(item => {
    const date = new Date(item.date);
    return {
      ...item,
      displayDate: date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={formattedData}>
        <XAxis
          dataKey="displayDate"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0,0,0,0.05)' }} 
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar
          dataKey="views"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
