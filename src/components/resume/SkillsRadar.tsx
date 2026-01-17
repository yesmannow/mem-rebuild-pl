import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Code, Zap, Filter } from 'lucide-react';
import type { SkillCategory } from '../../types';

interface SkillsRadarProps {
  categories: SkillCategory[];
  className?: string;
}

type CategoryFilter = 'all' | 'marketing-systems' | 'full-stack' | 'strategy';

const categoryMap: Record<string, CategoryFilter> = {
  'leadership': 'strategy',
  'strategy': 'strategy',
  'automation': 'marketing-systems',
  'analytics': 'marketing-systems',
  'development': 'full-stack',
  'tools': 'full-stack',
};

export const SkillsRadar: React.FC<SkillsRadarProps> = ({ categories, className = '' }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredCategories = useMemo(() => {
    if (activeFilter === 'all') return categories;
    return categories.filter(cat => categoryMap[cat.id] === activeFilter);
  }, [categories, activeFilter]);

  const getCategoryIcon = (id: string) => {
    if (id.includes('leadership') || id.includes('strategy')) return BarChart3;
    if (id.includes('development') || id.includes('tools')) return Code;
    return Zap;
  };

  const getCategoryColor = (accent?: string) => {
    switch (accent) {
      case 'teal':
        return 'bg-brand-teal/20 text-brand-teal border-brand-teal/30';
      case 'orange':
        return 'bg-brand-orange/20 text-brand-orange border-brand-orange/30';
      case 'blue':
        return 'bg-sky-400/20 text-sky-300 border-sky-400/30';
      default:
        return 'bg-brand-teal/20 text-brand-teal border-brand-teal/30';
    }
  };

  return (
    <div className={`skills-radar ${className}`}>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {([
          { value: 'all' as CategoryFilter, label: 'All Skills' },
          { value: 'marketing-systems' as CategoryFilter, label: 'Marketing Systems' },
          { value: 'full-stack' as CategoryFilter, label: 'Full Stack' },
          { value: 'strategy' as CategoryFilter, label: 'Strategy' },
        ]).map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeFilter === value
                ? 'bg-brand-teal text-brand-dark shadow-lg'
                : 'bg-slate-800/50 text-brand-muted hover:bg-slate-700/50 border border-slate-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredCategories.map((category, index) => {
            const Icon = getCategoryIcon(category.id);
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur p-6 hover:border-brand-teal/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category.accent)}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-text">{category.title}</h3>
                  <span className="ml-auto text-xs text-brand-muted bg-slate-800 px-2 py-1 rounded">
                    {category.items.length} skills
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.02 }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/50 text-sm text-brand-text border border-white/5 hover:border-brand-teal/30 hover:bg-brand-teal/10 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
