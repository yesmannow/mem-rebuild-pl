import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Search,
  Filter,
  X,
  Palette,
  Camera,
  Code,
  Layers,
  Grid3X3,
  List,
  SlidersHorizontal,
  Sparkles,
  Zap
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
}

interface AdvancedFilterSystemProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    tags: string[];
    viewMode: 'grid' | 'masonry' | 'list';
    sortBy: string;
  }) => void;
  totalItems: number;
  availableTags: string[];
}

const AdvancedFilterSystem: React.FC<AdvancedFilterSystemProps> = ({
  onFilterChange,
  totalItems,
  availableTags
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('grid');
  const [sortBy, setSortBy] = useState("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const categories: FilterOption[] = [
    { id: "All", label: "All", icon: Grid3X3, color: "from-gray-400 to-gray-600", count: totalItems },
    { id: "Design", label: "Design", icon: Palette, color: "from-purple-400 to-pink-400", count: Math.floor(totalItems * 0.4) },
    { id: "Photography", label: "Photography", icon: Camera, color: "from-blue-400 to-cyan-400", count: Math.floor(totalItems * 0.3) },
    { id: "Development", label: "Development", icon: Code, color: "from-green-400 to-emerald-400", count: Math.floor(totalItems * 0.2) },
    { id: "Projects", label: "Projects", icon: Layers, color: "from-orange-400 to-red-400", count: Math.floor(totalItems * 0.1) }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "alphabetical", label: "A-Z" },
    { value: "random", label: "Random" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(filterRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, filterRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    onFilterChange({
      search: searchQuery,
      category: activeCategory,
      tags: selectedTags,
      viewMode,
      sortBy
    });
  }, [searchQuery, activeCategory, selectedTags, viewMode, sortBy, onFilterChange]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setSelectedTags([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || activeCategory !== "All" || selectedTags.length > 0;

  return (
    <div ref={filterRef} className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search inspiration, colors, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300 text-lg"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {category.count}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* View Mode & Sort Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full p-1">
              {[
                { mode: 'grid' as const, icon: Grid3X3, label: 'Grid' },
                { mode: 'masonry' as const, icon: Layers, label: 'Masonry' },
                { mode: 'list' as const, icon: List, label: 'List' }
              ].map(({ mode, icon: Icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-purple-400 transition-all duration-300"
              title="Sort by"
              aria-label="Sort by"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-black">
                  {option.label}
                </option>
              ))}
            </select>

            {/* Advanced Filters Toggle */}
            <motion.button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`p-2 rounded-full transition-all duration-300 ${
                showAdvancedFilters
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              {/* Tag Filters */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Filter by Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.slice(0, 12).map((tag) => (
                    <motion.button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-xs transition-all duration-300 ${
                        selectedTags.includes(tag)
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 hover:bg-red-500/30 transition-all duration-300 text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-sm text-gray-400"
          >
            <Zap className="w-4 h-4" />
            <span>
              {searchQuery && `Search: "${searchQuery}"`}
              {activeCategory !== "All" && ` • Category: ${activeCategory}`}
              {selectedTags.length > 0 && ` • Tags: ${selectedTags.join(", ")}`}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdvancedFilterSystem;
