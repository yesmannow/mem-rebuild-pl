import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Search, GitCompare } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';
import inspirationsData from '../../data/inspirations.json';
import brandIdentitiesData from '../../data/brand-identities.json';
import BrandDetailModal from './BrandDetailModal';
import BrandComparison from '../BrandComparison';

interface InspirationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  reflection: string;
  details: string;
  brandId?: string;
  sourceUrl?: string;
  year?: number;
  designer?: string;
}

interface InspirationExplorerProps {
  className?: string;
}

const InspirationExplorer: React.FC<InspirationExplorerProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Cast the imported data to the correct type
  const inspirations: InspirationItem[] = inspirationsData as InspirationItem[];
  const brandIdentities = (brandIdentitiesData as any).brands || [];

  // Get brand data for an inspiration item
  const getBrandData = (item: InspirationItem) => {
    if (!item.brandId) return null;
    return brandIdentities.find((b: any) => b.id === item.brandId) || null;
  };

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(inspirations.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [inspirations]);

  // Filter inspirations based on category and search
  const filteredInspirations = useMemo(() => {
    return inspirations.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reflection.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm, inspirations]);

  const handleItemClick = (item: InspirationItem) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandId) ? prev.filter(id => id !== brandId) : [...prev, brandId]
    );
  };

  const getComparisonBrands = () => {
    return inspirations.filter(item => selectedBrands.includes(item.id));
  };

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Inspiration Explorer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the sources that fuel my creativity and shape my design philosophy
          </p>
        </div>

        {/* Comparison Mode Toggle */}
        {selectedBrands.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GitCompare className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''} selected for
                  comparison
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm font-medium"
                >
                  Compare
                </button>
                <button
                  onClick={() => setSelectedBrands([])}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search inspirations..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all'
                      ? 'All Categories'
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredInspirations.map((item, index) => {
              const isSelected = selectedBrands.includes(item.id);
              const brandData = getBrandData(item);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-amber-500' : ''
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="inline-block px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.category}
                        </span>
                        {brandData && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleBrandToggle(item.id);
                            }}
                            className={`p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              isSelected
                                ? 'bg-amber-500 text-white'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            aria-label="Select for comparison"
                          >
                            <GitCompare className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h3>
                        {item.year && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                            {item.year}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-2">
                        {item.reflection}
                      </p>
                      {brandData && (
                        <div className="flex items-center gap-2 mt-3">
                          {brandData.designer && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              by {brandData.designer}
                            </span>
                          )}
                          {brandData.designPrinciples && brandData.designPrinciples.length > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              • {brandData.designPrinciples.length} principles
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredInspirations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No inspirations found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowComparison(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto p-8">
                <BrandComparison
                  brands={getComparisonBrands().map(item => ({
                    ...item,
                    ...getBrandData(item),
                  }))}
                  onClose={() => setShowComparison(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <BrandDetailModal
            item={selectedItem}
            brandData={getBrandData(selectedItem)}
            onClose={closeModal}
            onBrandClick={handleItemClick}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InspirationExplorer;
