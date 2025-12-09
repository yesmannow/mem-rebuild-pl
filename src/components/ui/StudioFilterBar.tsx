/**
 * StudioFilterBar - Advanced filtering component for Studio gallery
 * 
 * Features:
 * - Category filtering with animated pills
 * - Sort controls with smooth transitions
 * - Shuffle functionality
 * - Search capability
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Search, X, ChevronDown } from 'lucide-react';

export type SortOption = 'default' | 'title' | 'category' | 'date';

interface StudioFilterBarProps {
  activeCategory: string;
  categories: string[];
  onCategoryChange: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onShuffle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  accentColor: string;
}

const StudioFilterBar: React.FC<StudioFilterBarProps> = ({
  activeCategory,
  categories,
  onCategoryChange,
  sortBy,
  onSortChange,
  onShuffle,
  searchQuery,
  onSearchChange,
  accentColor,
}) => {
  const [showSortMenu, setShowSortMenu] = React.useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default Order' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'category', label: 'Category' },
    { value: 'date', label: 'Recently Added' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Sort';

  return (
    <div className="space-y-4 mb-8">
      {/* Top Row: Search and Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search 
            size={18} 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title..."
            className="w-full pl-10 pr-10 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-turquoise/50 focus:ring-2 focus:ring-brand-turquoise/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white hover:border-slate-600/50 transition-all group"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${showSortMenu ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {showSortMenu && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortMenu(false)}
                />
                
                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-20"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-brand-turquoise/20 text-brand-turquoise'
                          : 'text-slate-300 hover:bg-slate-700/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Shuffle Button */}
        <motion.button
          onClick={onShuffle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm text-white hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all group"
        >
          <Shuffle size={16} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Shuffle</span>
        </motion.button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          key="all"
          onClick={() => onCategoryChange('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === 'all'
              ? 'text-slate-900'
              : 'text-slate-400 hover:text-white bg-slate-800/30 border border-slate-700/50'
          }`}
          style={
            activeCategory === 'all'
              ? {
                  backgroundColor: accentColor,
                  boxShadow: `0 4px 20px ${accentColor}40`,
                }
              : {}
          }
        >
          All
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
              activeCategory === category
                ? 'text-slate-900'
                : 'text-slate-400 hover:text-white bg-slate-800/30 border border-slate-700/50'
            }`}
            style={
              activeCategory === category
                ? {
                    backgroundColor: accentColor,
                    boxShadow: `0 4px 20px ${accentColor}40`,
                  }
                : {}
            }
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Active Filters Display */}
      {(activeCategory !== 'all' || searchQuery || sortBy !== 'default') && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 text-xs text-slate-400"
        >
          <span>Active filters:</span>
          {activeCategory !== 'all' && (
            <span className="px-2 py-1 bg-slate-800/50 rounded-full">{activeCategory}</span>
          )}
          {searchQuery && (
            <span className="px-2 py-1 bg-slate-800/50 rounded-full">Search: &quot;{searchQuery}&quot;</span>
          )}
          {sortBy !== 'default' && (
            <span className="px-2 py-1 bg-slate-800/50 rounded-full">
              Sorted by {sortOptions.find(opt => opt.value === sortBy)?.label}
            </span>
          )}
          <button
            onClick={() => {
              onCategoryChange('all');
              onSearchChange('');
              onSortChange('default');
            }}
            className="ml-2 text-brand-orange hover:text-brand-creamsicle transition-colors"
          >
            Clear all
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default StudioFilterBar;
