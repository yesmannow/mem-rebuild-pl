import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Lightbulb, ArrowRight } from 'lucide-react';

interface BrandIdentity {
  id: string;
  title: string;
  category: string;
  designPrinciples?: string[];
  brandId?: string;
}

interface DesignPrinciplesExplorerProps {
  brands: BrandIdentity[];
  className?: string;
}

interface PrincipleWithBrands {
  principle: string;
  brands: string[];
  category: string;
}

const DesignPrinciplesExplorer: React.FC<DesignPrinciplesExplorerProps> = ({
  brands,
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract all unique principles with their associated brands
  const principlesWithBrands = useMemo(() => {
    const principleMap: { [key: string]: { brands: string[]; category: string } } = {};

    brands.forEach(brand => {
      if (brand.designPrinciples) {
        brand.designPrinciples.forEach(principle => {
          if (!principleMap[principle]) {
            principleMap[principle] = {
              brands: [],
              category: brand.category,
            };
          }
          if (!principleMap[principle].brands.includes(brand.title)) {
            principleMap[principle].brands.push(brand.title);
          }
        });
      }
    });

    return Object.entries(principleMap)
      .map(([principle, data]) => ({
        principle,
        brands: data.brands,
        category: data.category,
      }))
      .sort((a, b) => b.brands.length - a.brands.length);
  }, [brands]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(brands.map(b => b.category));
    return ['all', ...Array.from(cats)];
  }, [brands]);

  // Filter principles
  const filteredPrinciples = useMemo(() => {
    return principlesWithBrands.filter(p => {
      const matchesSearch =
        p.principle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [principlesWithBrands, searchTerm, selectedCategory]);

  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Lightbulb className="h-10 w-10 text-amber-500" />
            Design Principles Explorer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the design principles that guide these brands and find inspiration for your own work
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search principles or brands..."
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
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrinciples.map((item, index) => (
            <motion.div
              key={item.principle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.principle}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.brands.length} {item.brands.length === 1 ? 'brand' : 'brands'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Associated Brands */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Used by:
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.brands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-xs rounded-full"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply to Your Work */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition-colors">
                  Apply to your work
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPrinciples.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No principles found matching your criteria.
            </p>
          </div>
        )}

        {/* Summary Stats */}
        {filteredPrinciples.length > 0 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {filteredPrinciples.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Unique Principles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {new Set(filteredPrinciples.flatMap(p => p.brands)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Brands Represented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {Math.round(
                    filteredPrinciples.reduce((sum, p) => sum + p.brands.length, 0) /
                      filteredPrinciples.length
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Brands per Principle</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignPrinciplesExplorer;

