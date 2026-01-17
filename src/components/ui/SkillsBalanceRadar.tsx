import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

// Skill balance data - showing the "Hybrid" nature
const skillBalanceData = [
  { skill: 'Strategy', value: 92 },
  { skill: 'Engineering', value: 88 },
  { skill: 'Design', value: 85 },
  { skill: 'Data', value: 90 },
];

interface SkillsBalanceRadarProps {
  className?: string;
}

export const SkillsBalanceRadar: React.FC<SkillsBalanceRadarProps> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`relative ${className}`}
    >
      <div className="bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-teal/40 transition-all duration-300">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold text-brand-text mb-1">Skill Balance</h3>
          <p className="text-xs text-brand-muted">The Hybrid Profile</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={skillBalanceData}>
            <PolarGrid
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={1}
            />
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: '#94a3b8',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-primary)'
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: 'rgba(148, 163, 184, 0.5)', fontSize: 10 }}
              tickCount={5}
              axisLine={false}
            />

            <Radar
              name="Proficiency"
              dataKey="value"
              stroke="#40E0D0"
              fill="#40E0D0"
              fillOpacity={0.25}
              strokeWidth={2.5}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(64, 224, 208, 0.3)',
                borderRadius: '8px',
                color: '#f8fafc',
                backdropFilter: 'blur(10px)',
              }}
              labelStyle={{
                color: '#40E0D0',
                fontWeight: 600,
                marginBottom: '4px'
              }}
              formatter={(value: number) => [`${value}%`, 'Proficiency']}
            />
          </RadarChart>
        </ResponsiveContainer>

        {/* Key Insight */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-xs text-brand-muted">
            <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span>Balanced expertise across all dimensions</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsBalanceRadar;
