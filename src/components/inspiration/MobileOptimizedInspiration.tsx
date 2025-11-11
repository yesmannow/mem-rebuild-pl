import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Search,
  Filter,
  X,
  Grid3X3,
  List,
  ChevronDown,
  ChevronUp,
  Menu,
  X as CloseIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MobileOptimizedInspirationProps {
  items: any[];
  onItemClick: (item: any, index: number) => void;
  onFilterChange: (filters: any) => void;
  availableTags: string[];
}

const MobileOptimizedInspiration: React.FC<MobileOptimizedInspirationProps> = ({
  items,
  onItemClick,
  onFilterChange,
  availableTags,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isScrolling, setIsScrolling] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'All', label: 'All', count: items.length },
    { id: 'Design', label: 'Design', count: Math.floor(items.length * 0.4) },
    { id: 'Photography', label: 'Photography', count: Math.floor(items.length * 0.3) },
    { id: 'Projects', label: 'Projects', count: Math.floor(items.length * 0.2) },
    { id: 'Personal', label: 'Personal', count: Math.floor(items.length * 0.1) },
  ];

  // Handle scroll performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Auto-focus search on mobile
  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  // Apply filters
  useEffect(() => {
    onFilterChange({
      search: searchQuery,
      category: selectedCategory,
      tags: selectedTags,
      viewMode,
    });
  }, [searchQuery, selectedCategory, selectedTags, viewMode, onFilterChange]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => (prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Header */}
      <div
        className={`sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${
          isScrolling ? 'py-2' : 'py-4'
        }`}
      >
        <div className="px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Inspiration</h1>

            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2 rounded-full text-white transition-colors ${
                  hasActiveFilters ? 'bg-purple-500' : 'bg-white/10 hover:bg-white/20'
                }`}
                aria-label="Filters"
              >
                <Filter className="w-5 h-5" />
              </button>

              {/* View Toggle */}
              <div className="flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400'
                  }`}
                  aria-label="Grid view"
                  title="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400'
                  }`}
                  aria-label="List view"
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchRef}
                    type="text"
                    placeholder="Search inspiration..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      title="Clear search"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            ref={filterRef}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col h-full">
              {/* Filter Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                  title="Close filters"
                  aria-label="Close filters"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{category.label}</span>
                        <span className="text-xs opacity-70">{category.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 10).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="p-4">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">
              {items.length} items
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </h2>
            {searchQuery && <p className="text-sm text-gray-400">Searching for "{searchQuery}"</p>}
          </div>
        </div>

        {/* Mobile Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              className={`group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer ${
                viewMode === 'list' ? 'flex items-center gap-3 p-3' : 'aspect-square'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onItemClick(item, index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {viewMode === 'list' ? (
                <>
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.category}</p>
                    {item.tags && (
                      <div className="flex gap-1 mt-1">
                        {item.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-white/10 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No inspiration found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOptimizedInspiration;
