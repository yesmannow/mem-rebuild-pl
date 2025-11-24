import React from 'react';
import { motion } from 'framer-motion';

interface SkillBadgeProps {
  skill: string;
  icon?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
  delay?: number;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  icon,
  level = 'advanced',
  category,
  delay = 0,
}) => {
  const levelColors = {
    beginner: 'from-[#83c5be]/20 to-[#83c5be]/10 border-[#83c5be]/30 text-[#83c5be]',
    intermediate: 'from-[#83c5be]/20 to-[#006d77]/10 border-[#83c5be]/30 text-[#83c5be]',
    advanced: 'from-[#006d77]/20 to-[#006d77]/10 border-[#006d77]/30 text-[#006d77]',
    expert: 'from-[#006d77]/30 to-[#83c5be]/20 border-[#006d77]/40 text-[#006d77]',
  };

  const levelDots = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`
        group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl
        bg-gradient-to-br ${levelColors[level]}
        border backdrop-blur-sm
        transition-all duration-200
        cursor-default
      `}
    >
      {/* Icon */}
      {icon && (
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
      )}

      {/* Skill name */}
      <span className="font-medium text-sm">{skill}</span>

      {/* Level indicator dots */}
      <div className="flex gap-0.5 ml-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`
              w-1 h-1 rounded-full transition-all duration-200
              ${
                i < levelDots[level]
                  ? 'bg-current opacity-100'
                  : 'bg-current opacity-20'
              }
            `}
          />
        ))}
      </div>

      {/* Category tooltip */}
      {category && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 text-xs text-neutral-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {category}
        </div>
      )}

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default SkillBadge;
