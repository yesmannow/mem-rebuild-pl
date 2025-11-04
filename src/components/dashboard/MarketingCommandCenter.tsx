import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, Mail, Users, DollarSign, MousePointerClick } from "lucide-react";
import "./MarketingCommandCenter.css";

// Mock data for the dashboard
const generateMockData = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  return months.map((month, index) => ({
    month,
    CTR: 2.5 + Math.random() * 1.5,
    BounceRate: 45 - Math.random() * 10,
    Conversions: 120 + Math.random() * 80,
    Revenue: 50000 + Math.random() * 20000,
    EmailOpenRate: 25 + Math.random() * 15,
    EmailClickRate: 5 + Math.random() * 5
  }));
};

const channelData = [
  { name: "Google Ads", value: 45000, color: "#4285F4" },
  { name: "Meta Ads", value: 32000, color: "#1877F2" },
  { name: "Email", value: 28000, color: "#EA4335" },
  { name: "Organic", value: 15000, color: "#34A853" },
  { name: "LinkedIn", value: 8000, color: "#0A66C2" }
];

interface KPICardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({ label, value, change, trend, icon }) => {
  const [animatedValue, setAnimatedValue] = useState("0");
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(current.toFixed(1) + value.replace(/[0-9.]/g, ""));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={cardRef}
      className="kpi-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">{animatedValue}</div>
        <div className={`kpi-change ${trend}`}>
          {trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{change}</span>
        </div>
      </div>
    </motion.div>
  );
};

const MarketingCommandCenter: React.FC = () => {
  const [chartData] = useState(generateMockData());
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="marketing-command-center">
      <div className="dashboard-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Marketing Command Center</h2>
          <p>Real-time analytics dashboard showcasing marketing performance metrics and KPIs</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          <KPICard
            label="Click-Through Rate"
            value="3.8%"
            change="+12.5% vs last month"
            trend="up"
            icon={<MousePointerClick size={24} />}
          />
          <KPICard
            label="Bounce Rate"
            value="38.2%"
            change="-8.3% vs last month"
            trend="down"
            icon={<TrendingDown size={24} />}
          />
          <KPICard
            label="Email Open Rate"
            value="32.5%"
            change="+5.2% vs last month"
            trend="up"
            icon={<Mail size={24} />}
          />
          <KPICard
            label="Total Conversions"
            value="1,245"
            change="+18.7% vs last month"
            trend="up"
            icon={<Users size={24} />}
          />
          <KPICard
            label="Revenue"
            value="$145K"
            change="+22.4% vs last month"
            trend="up"
            icon={<DollarSign size={24} />}
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* CTR Trend Line Chart */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>CTR Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                />
                <Line
                  type="monotone"
                  dataKey="CTR"
                  stroke="#0ea5e9"
                  strokeWidth={3}
                  dot={{ fill: "#0ea5e9", r: 5 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bounce Rate Area Chart */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3>Bounce Rate Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                />
                <Area
                  type="monotone"
                  dataKey="BounceRate"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.3}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue by Channel Bar Chart */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Revenue by Channel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="value" animationDuration={1000}>
                  {channelData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Email Performance */}
          <motion.div
            className="chart-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3>Email Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "8px" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="EmailOpenRate"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Open Rate"
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="EmailClickRate"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Click Rate"
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketingCommandCenter;

