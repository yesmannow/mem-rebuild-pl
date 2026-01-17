/**
 * MetricVisualizer Component
 *
 * Visualizes metrics using Recharts:
 * - RadialBarChart for percentage metrics (e.g., '+212%')
 * - Sparkline (LineChart) for count metrics (e.g., '85K')
 */

import React from 'react';
import { RadialBarChart, RadialBar, LineChart, Line, ResponsiveContainer } from 'recharts';
import './MetricVisualizer.css';

interface MetricVisualizerProps {
  label: string;
  value: string;
  accentColor?: string;
  className?: string;
}

/**
 * Parse numeric value from metric string
 */
function parseNumericValue(value: string): number {
  // Remove all non-numeric characters except decimal point and minus sign
  const cleaned = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Check if metric is a percentage
 */
function isPercentage(value: string): boolean {
  return value.includes('%');
}

/**
 * Generate sparkline data points
 */
function generateSparklineData(value: number, count: number = 12): number[] {
  const base = value * 0.3; // Start at 30% of value
  const step = (value - base) / count;
  const data: number[] = [];

  for (let i = 0; i < count; i++) {
    // Add some randomness for visual interest
    const randomVariation = (Math.random() - 0.5) * 0.1 * value;
    data.push(Math.max(0, base + step * i + randomVariation));
  }

  return data;
}

export const MetricVisualizer: React.FC<MetricVisualizerProps> = ({
  label,
  value,
  accentColor = '#40E0D0',
  className = '',
}) => {
  const numericValue = parseNumericValue(value);
  const isPercent = isPercentage(value);

  // For percentage, normalize to 0-100 range
  const percentageValue = isPercent ? Math.min(Math.abs(numericValue), 100) : 0;

  // For sparkline, generate data points
  const sparklineData = !isPercent
    ? generateSparklineData(Math.abs(numericValue)).map((val, idx) => ({ value: val, index: idx }))
    : [];

  if (isPercent) {
    // Radial Bar Chart for percentages
    // Create data with background (100%) and value
    const radialData = [
      {
        name: 'background',
        value: 100,
        fill: 'rgba(148, 163, 184, 0.1)',
      },
      {
        name: 'value',
        value: percentageValue,
        fill: accentColor,
      },
    ];

    return (
      <div className={`metric-visualizer metric-visualizer--radial ${className}`}>
        <div className="metric-visualizer__content">
          <div className="metric-visualizer__label">{label}</div>
          <div className="metric-visualizer__value" style={{ color: accentColor }}>
            {value}
          </div>
          <div className="metric-visualizer__chart">
            <ResponsiveContainer width="100%" height={120}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                barSize={12}
                data={radialData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  dataKey="value"
                  cornerRadius={6}
                  animationDuration={1500}
                  animationBegin={0}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  } else {
    // Sparkline for counts
    return (
      <div className={`metric-visualizer metric-visualizer--sparkline ${className}`}>
        <div className="metric-visualizer__content">
          <div className="metric-visualizer__label">{label}</div>
          <div className="metric-visualizer__value" style={{ color: accentColor }}>
            {value}
          </div>
          <div className="metric-visualizer__chart">
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={sparklineData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={accentColor}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1500}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
};

export default MetricVisualizer;
