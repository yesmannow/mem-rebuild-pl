import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Charts/ResultChart.css';

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface ResultChartProps {
  data: DataPoint[];
  type?: 'line' | 'bar';
  dataKey?: string;
  color?: string;
  title?: string;
  height?: number;
}

const ResultChart: React.FC<ResultChartProps> = ({
  data,
  type = 'line',
  dataKey = 'value',
  color = '#3B82F6',
  title,
  height = 300,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="result-chart-empty">
        <p>No data available</p>
      </div>
    );
  }

  const ChartComponent = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <div className="result-chart-container">
      {title && <h3 className="result-chart-title">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bc-border)" />
          <XAxis
            dataKey="name"
            stroke="var(--bc-text-secondary)"
            style={{ fontSize: '0.875rem' }}
          />
          <YAxis stroke="var(--bc-text-secondary)" style={{ fontSize: '0.875rem' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bc-surface)',
              border: '1px solid var(--bc-border)',
              borderRadius: 'var(--bc-radius-lg)',
              color: 'var(--bc-text-primary)',
            }}
          />
          <Legend />
          <DataComponent
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            strokeWidth={2}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
