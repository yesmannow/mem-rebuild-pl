import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface SkillCategory {
  name: string;
  color: string;
  skills: {
    name: string;
    level: number; // 1-5
    years?: number;
  }[];
}

interface InteractiveSkillsVisualizationProps {
  categories: SkillCategory[];
  className?: string;
}

/**
 * InteractiveSkillsVisualization - Modern skill display with bar charts and categories
 * Features hover effects, animations, and color-coded categories
 */
export const InteractiveSkillsVisualization: React.FC<InteractiveSkillsVisualizationProps> = ({
  categories,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const maxLevel = 5;

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <motion.button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-all duration-300',
            activeCategory === null
              ? 'bg-brand-teal text-white shadow-lg shadow-brand-teal/30'
              : 'bg-slate-800/50 text-brand-muted hover:bg-slate-800 hover:text-brand-text'
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Skills
        </motion.button>
        {categories.map((category, index) => (
          <motion.button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-all duration-300',
              activeCategory === category.name
                ? 'text-white shadow-lg'
                : 'bg-slate-800/50 text-brand-muted hover:bg-slate-800 hover:text-brand-text'
            )}
            style={{
              backgroundColor: activeCategory === category.name ? category.color : undefined,
              boxShadow: activeCategory === category.name ? `0 10px 30px ${category.color}30` : undefined,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories
          .filter((cat) => !activeCategory || cat.name === activeCategory)
          .map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="text-xl font-bold text-brand-text">{category.name}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => {
                  const percentage = (skill.level / maxLevel) * 100;

                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05, duration: 0.3 }}
                      className="group"
                    >
                      {/* Skill Name and Years */}
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-brand-text group-hover:text-brand-teal transition-colors">
                          {skill.name}
                        </span>
                        {skill.years && (
                          <span className="text-xs text-brand-muted">
                            {skill.years}+ years
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          style={{ backgroundColor: category.color }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                          transition={{
                            delay: catIndex * 0.1 + skillIndex * 0.05 + 0.2,
                            duration: 0.8,
                            ease: 'easeOut',
                          }}
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </motion.div>

                        {/* Level indicators */}
                        <div className="absolute inset-0 flex items-center justify-between px-1">
                          {Array.from({ length: maxLevel - 1 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-px h-full bg-slate-700/50"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Level Text */}
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-brand-muted">
                          Level {skill.level}/{maxLevel}
                        </span>
                        <span className="text-xs text-brand-muted">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default InteractiveSkillsVisualization;
