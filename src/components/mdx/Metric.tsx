import React from 'react';

interface MetricProps {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

export default function Metric({ label, value, trend = 'neutral' }: MetricProps) {
  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }[trend];

  return (
    <div className="card p-6">
      <div className="text-sm opacity-70 mb-1">{label}</div>
      <div className="text-2xl md:text-3xl font-display flex items-center gap-2">
        <span>{value}</span>
        {trend !== 'neutral' && (
          <span className="text-[color:theme('colors.cave.ember')]">{trendIcon}</span>
        )}
      </div>
    </div>
  );
}
