import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, GitCompare, CheckCircle2 } from 'lucide-react';
import OptimizedImage from './common/OptimizedImage';
import BrandColorPalette from './inspiration/BrandColorPalette';
import TypographyShowcase from './inspiration/TypographyShowcase';

interface BrandIdentity {
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
  brandInfo?: any;
  designPrinciples?: string[];
  visualSpecs?: any;
  educationalContent?: any;
}

interface BrandComparisonProps {
  brands: BrandIdentity[];
  onClose?: () => void;
  className?: string;
}

const BrandComparison: React.FC<BrandComparisonProps> = ({ brands, onClose, className = '' }) => {
  const [selectedAspect, setSelectedAspect] = useState<'overview' | 'colors' | 'typography' | 'principles'>(
    'overview'
  );

  if (brands.length < 2) {
    return (
      <div className={`text-center py-8 text-gray-500 dark:text-gray-400 ${className}`}>
        Select at least 2 brands to compare
      </div>
    );
  }

  const findSimilarities = () => {
    const similarities: string[] = [];
    const allPrinciples = brands.map(b => b.designPrinciples || []).flat();
    const principleCounts: { [key: string]: number } = {};

    allPrinciples.forEach(principle => {
      principleCounts[principle] = (principleCounts[principle] || 0) + 1;
    });

    Object.entries(principleCounts).forEach(([principle, count]) => {
      if (count >= 2) {
        similarities.push(principle);
      }
    });

    return similarities;
  };

  const similarities = findSimilarities();

  return (
    <div className={`${className}`}>
      {onClose && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <GitCompare className="h-6 w-6" />
            Brand Comparison
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close comparison"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      )}

      {/* Similarities */}
      {similarities.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Shared Principles
          </h4>
          <div className="flex flex-wrap gap-2">
            {similarities.map((similarity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full"
              >
                {similarity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Aspect Selector */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'colors', label: 'Colors' },
          { id: 'typography', label: 'Typography' },
          { id: 'principles', label: 'Principles' },
        ].map(aspect => (
          <button
            key={aspect.id}
            onClick={() => setSelectedAspect(aspect.id as any)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              selectedAspect === aspect.id
                ? 'bg-amber-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {aspect.label}
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Brand Header */}
            <div className="relative h-32 overflow-hidden">
              <OptimizedImage
                src={brand.image}
                alt={brand.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h4 className="text-lg font-bold text-white mb-1">{brand.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full">
                    {brand.category}
                  </span>
                  {brand.year && (
                    <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">
                      {brand.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {selectedAspect === 'overview' && (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {brand.reflection}
                  </p>
                  {brand.designer && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Designer: <span className="font-medium">{brand.designer}</span>
                    </div>
                  )}
                </div>
              )}

              {selectedAspect === 'colors' && (
                <div>
                  {brand.brandInfo?.colors ? (
                    <BrandColorPalette colors={brand.brandInfo.colors} brandName={brand.title} />
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No color information available
                    </div>
                  )}
                </div>
              )}

              {selectedAspect === 'typography' && (
                <div>
                  {brand.brandInfo?.typography ? (
                    <TypographyShowcase
                      typography={brand.brandInfo.typography}
                      brandName={brand.title}
                    />
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No typography information available
                    </div>
                  )}
                </div>
              )}

              {selectedAspect === 'principles' && (
                <div>
                  {brand.designPrinciples && brand.designPrinciples.length > 0 ? (
                    <div className="space-y-2">
                      {brand.designPrinciples.map((principle, idx) => (
                        <div
                          key={idx}
                          className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-sm text-gray-900 dark:text-white"
                        >
                          {principle}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No principles available
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BrandComparison;

