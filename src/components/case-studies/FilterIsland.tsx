import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterIslandProps {
  categories: string[];
  activeFilter: string;
  searchTerm: string;
  onFilterChange: (cat: string) => void;
  onSearchChange: (term: string) => void;
  resultCount: number;
}

const FilterIsland: React.FC<FilterIslandProps> = ({
  categories,
  activeFilter,
  searchTerm,
  onFilterChange,
  onSearchChange,
  resultCount,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasActive = activeFilter !== 'All' || searchTerm.trim().length > 0;

  return (
    <motion.div
      className="filter-island"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── pill bar ── */}
      <div className="filter-island__bar">
        {/* search input */}
        <div className="filter-island__search">
          <Search size={13} className="filter-island__search-icon" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search…"
            className="filter-island__search-input"
            aria-label="Search case studies"
          />
          <AnimatePresence>
            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.12 }}
                onClick={() => onSearchChange('')}
                className="filter-island__search-clear"
                aria-label="Clear search"
              >
                <X size={11} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* divider */}
        <div className="filter-island__divider" aria-hidden="true" />

        {/* filter toggle */}
        <button
          className={`filter-island__toggle ${expanded ? 'active' : ''}`}
          onClick={() => setExpanded(v => !v)}
          aria-expanded={expanded}
          aria-label="Toggle category filters"
        >
          <SlidersHorizontal size={13} />
          <span>Filter</span>
          {hasActive && activeFilter !== 'All' && (
            <span className="filter-island__active-dot" aria-hidden="true" />
          )}
        </button>

        {/* result count */}
        <span className="filter-island__count" aria-live="polite">
          {resultCount} {resultCount === 1 ? 'study' : 'studies'}
        </span>

        {/* reset */}
        <AnimatePresence>
          {hasActive && (
            <motion.button
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => { onFilterChange('All'); onSearchChange(''); }}
              className="filter-island__reset"
              aria-label="Reset all filters"
            >
              <X size={11} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── category pills drawer ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="filter-island__drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="filter-island__pills">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`filter-island__pill ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => { onFilterChange(cat); setExpanded(false); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterIsland;
