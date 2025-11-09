import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BrandIdentity {
  id: string;
  title: string;
  category: string;
  image: string;
  brandId?: string;
}

interface RelatedBrandsProps {
  currentBrand: BrandIdentity;
  allBrands: BrandIdentity[];
  onBrandClick?: (brand: BrandIdentity) => void;
  className?: string;
}

const RelatedBrands: React.FC<RelatedBrandsProps> = ({
  currentBrand,
  allBrands,
  onBrandClick,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Find related brands based on category and shared characteristics
  const relatedBrands = useMemo(() => {
    return allBrands
      .filter(brand => brand.id !== currentBrand.id)
      .filter(brand => {
        // Same category
        if (brand.category === currentBrand.category) return true;
        // Similar categories (could be enhanced with more logic)
        const similarCategories: { [key: string]: string[] } = {
          'Design Systems': ['Branding', 'Institutional'],
          'Branding': ['Design Systems', 'Fashion'],
          'Fashion': ['Fashion Retail', 'Fashion & Accessories'],
          'Food & Beverage': ['Hospitality'],
        };
        return similarCategories[currentBrand.category]?.includes(brand.category);
      })
      .slice(0, isExpanded ? 6 : 3);
  }, [currentBrand, allBrands, isExpanded]);

  if (relatedBrands.length === 0) return null;

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Related Brands
        </h4>
        {relatedBrands.length > 3 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedBrands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => onBrandClick?.(brand)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  <img
                    src={brand.image}
                    alt={brand.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {brand.title}
                  </h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{brand.category}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBrands;

