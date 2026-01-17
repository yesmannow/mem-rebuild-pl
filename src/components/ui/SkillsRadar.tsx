import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { Briefcase, BarChart3, Code, Palette, Users, Zap } from 'lucide-react';

// Skill categories with icons
const SKILL_CATEGORIES = [
  { name: 'Strategy', icon: Briefcase, tools: ['Go-to-market', 'Campaign Planning', 'ROI Analysis'] },
  { name: 'Analytics', icon: BarChart3, tools: ['GA4', 'GTM', 'Data Visualization', 'Attribution'] },
  { name: 'Engineering', icon: Code, tools: ['React', 'WordPress', 'PHP', 'JavaScript', 'APIs'] },
  { name: 'Creative', icon: Palette, tools: ['Brand Systems', 'UI/UX', 'Content Strategy', 'Design'] },
  { name: 'Leadership', icon: Users, tools: ['Team Building', 'Cross-functional', 'Project Management'] },
  { name: 'Automation', icon: Zap, tools: ['HubSpot', 'FluentCRM', 'Zapier', 'Workflows'] },
];

// CMO Layer - Business Value (High in Strategy/Leadership)
const cmoData = {
  Strategy: 95,
  Analytics: 85,
  Engineering: 70,
  Creative: 80,
  Leadership: 92,
  Automation: 75,
};

// Dev Layer - Technical Execution (High in Engineering/Automation)
const devData = {
  Strategy: 75,
  Analytics: 88,
  Engineering: 90,
  Creative: 70,
  Leadership: 80,
  Automation: 92,
};

// Combined - The "Unicorn" coverage
const combinedData = {
  Strategy: 95,
  Analytics: 88,
  Engineering: 90,
  Creative: 80,
  Leadership: 92,
  Automation: 92,
};

// Format data for Recharts
const formatData = () => {
  return SKILL_CATEGORIES.map(category => ({
    category: category.name,
    CMO: cmoData[category.name as keyof typeof cmoData],
    Dev: devData[category.name as keyof typeof devData],
    Combined: combinedData[category.name as keyof typeof combinedData],
  }));
};

interface SkillsRadarProps {
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export default function SkillsRadar({ showLegend = true, showTooltip = true, className = '' }: SkillsRadarProps) {
  const data = formatData();

  return (
    <div className={`skills-radar-container ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Chart */}
        <div className="bg-brand-dark/50 backdrop-blur-sm border border-brand-teal/20 rounded-xl p-6">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data}>
              <PolarGrid
                stroke="rgba(64, 224, 208, 0.2)"
                strokeWidth={1}
              />
              <PolarAngleAxis
                dataKey="category"
                tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                className="text-brand-muted"
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickCount={5}
              />

              {/* CMO Layer - Solid shape */}
              <Radar
                name="CMO Mode"
                dataKey="CMO"
                stroke="#fbbf24" // Gold
                fill="#fbbf24"
                fillOpacity={0.3}
                strokeWidth={2}
              />

              {/* Dev Layer - Wireframe */}
              <Radar
                name="Dev Mode"
                dataKey="Dev"
                stroke="#00ff41" // Neon Green
                fill="#00ff41"
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />

              {/* Combined Layer - Full coverage */}
              <Radar
                name="Hybrid (You)"
                dataKey="Combined"
                stroke="#40E0D0" // Brand Teal
                fill="#40E0D0"
                fillOpacity={0.15}
                strokeWidth={3}
              />

              {showTooltip && (
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    borderRadius: '8px',
                    color: '#f8fafc',
                  }}
                  labelStyle={{ color: '#40E0D0', fontWeight: 600 }}
                />
              )}

              {showLegend && (
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>{value}</span>
                  )}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Explanation */}
        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 p-4 bg-brand-dark/30 rounded-lg border border-brand-teal/10">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#fbbf24] mt-1.5" />
            <div>
              <p className="text-sm font-medium text-brand-text">CMO Layer (Business Value)</p>
              <p className="text-xs text-brand-muted mt-1">
                High in Strategy & Leadership - Executive decision-making and business impact
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-brand-dark/30 rounded-lg border border-brand-teal/10">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#00ff41] mt-1.5" />
            <div>
              <p className="text-sm font-medium text-brand-text">Dev Layer (Technical Execution)</p>
              <p className="text-xs text-brand-muted mt-1">
                High in Engineering & Automation - Hands-on technical implementation
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-brand-teal/10 rounded-lg border border-brand-teal/30">
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-teal mt-1.5" />
            <div>
              <p className="text-sm font-medium text-brand-text">Hybrid Coverage (The Unicorn)</p>
              <p className="text-xs text-brand-muted mt-1">
                Full-spectrum coverage across all six dimensions - This is why you're a "Unicorn" hire
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

