/**
 * RepresentativeMattersGrid.tsx
 * 
 * A masonry grid component displaying representative legal matters with category filters.
 * Demonstrates "proof" through wins for Fortune 100 corporate clients.
 * 
 * Features:
 * - Masonry grid layout for visual interest
 * - Category filters (All, Construction, Litigation, etc.)
 * - Framer Motion animations
 * - Responsive design
 * - Accessible
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Scale, Briefcase, Award } from 'lucide-react';
import { 
  RepresentativeMatter, 
  getCategories, 
  filterByCategory 
} from '../../data/representativeMatters';

interface RepresentativeMattersGridProps {
  matters?: RepresentativeMatter[];
  showFilters?: boolean;
  columns?: number;
  className?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Construction':
      return <Building2 className="w-5 h-5" />;
    case 'Litigation':
      return <Scale className="w-5 h-5" />;
    case 'Corporate':
      return <Briefcase className="w-5 h-5" />;
    default:
      return <Award className="w-5 h-5" />;
  }
};

const RepresentativeMattersGrid: React.FC<RepresentativeMattersGridProps> = ({
  matters: initialMatters,
  showFilters = true,
  columns = 3,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = getCategories();
  
  // Get matters based on filter
  const displayMatters = selectedCategory === 'All' 
    ? initialMatters || filterByCategory('All')
    : filterByCategory(selectedCategory);

  // Grid column class mapping
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`representative-matters-grid ${className}`}>
      {/* Category Filters */}
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-brand-turquoise text-slate-900 shadow-lg shadow-brand-turquoise/30'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/70 border border-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={selectedCategory === category}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <motion.div 
        className="mb-6 text-center text-slate-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={selectedCategory}
      >
        Showing {displayMatters.length} {displayMatters.length === 1 ? 'matter' : 'matters'}
      </motion.div>

      {/* Matters Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          className={`grid grid-cols-1 ${columnClasses[columns as keyof typeof columnClasses]} gap-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {displayMatters.map((matter, index) => (
            <MatterCard 
              key={matter.id} 
              matter={matter} 
              index={index}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty State */}
      {displayMatters.length === 0 && (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-slate-400 text-lg">No matters found in this category.</p>
        </motion.div>
      )}
    </div>
  );
};

interface MatterCardProps {
  matter: RepresentativeMatter;
  index: number;
}

const MatterCard: React.FC<MatterCardProps> = ({ matter, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      className="matter-card group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-brand-turquoise/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -4 }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise/0 to-brand-turquoise/0 group-hover:from-brand-turquoise/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

      <div className="relative p-6 space-y-4">
        {/* Category Badge & Industry */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-turquoise">
            {getCategoryIcon(matter.category)}
            <span className="text-sm font-semibold">{matter.category}</span>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800/80 px-2 py-1 rounded">
            {matter.industry}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-brand-turquoise transition-colors duration-200 leading-tight">
          {matter.title}
        </h3>

        {/* Result */}
        <div className="bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-lg p-3">
          <p className="text-sm font-semibold text-brand-turquoise mb-1">Result</p>
          <p className="text-sm text-slate-200 leading-relaxed">{matter.result}</p>
        </div>

        {/* Description - Collapsible */}
        <div className="space-y-2">
          <motion.p 
            className={`text-sm text-slate-300 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}
          >
            {matter.description}
          </motion.p>
          {matter.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-brand-turquoise hover:text-brand-turquoise/80 font-medium transition-colors"
              aria-expanded={isExpanded}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Footer - Client & Year */}
        {(matter.client || matter.year) && (
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/50">
            {matter.client && <span>Client: {matter.client}</span>}
            {matter.year && <span>{matter.year}</span>}
          </div>
        )}

        {/* Tags */}
        {matter.tags && matter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {matter.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-slate-800/60 text-slate-400 rounded border border-slate-700/30"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default RepresentativeMattersGrid;
