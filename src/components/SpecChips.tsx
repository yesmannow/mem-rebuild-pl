import React, { useState } from 'react';
import { motion } from 'framer-motion';

const specData = {
  typography: [
    { name: 'Helvetica Bold', size: '24px', usage: 'Headlines', sample: 'THE QUICK BROWN FOX' },
    { name: 'Helvetica Regular', size: '16px', usage: 'Body text', sample: 'The quick brown fox jumps over the lazy dog.' },
    { name: 'Helvetica Light', size: '14px', usage: 'Captions', sample: 'The quick brown fox jumps over the lazy dog.' }
  ],
  colors: [
    { name: 'IBM Blue', hex: '#0066CC', usage: 'Primary brand color' },
    { name: 'IBM Gray', hex: '#8C8C8C', usage: 'Secondary elements' },
    { name: 'IBM Red', hex: '#CC0000', usage: 'Accents and warnings' }
  ],
  grid: [
    { name: '8px Base Unit', description: 'All spacing and sizing based on 8px increments' },
    { name: '12 Column Grid', description: 'Flexible grid system for layouts' },
    { name: 'Baseline Grid', description: 'Text aligned to 4px baseline grid' }
  ],
  pictograms: [
    { name: 'Arrow', svg: '→', usage: 'Direction and navigation' },
    { name: 'Check', svg: '✓', usage: 'Success and completion' },
    { name: 'Gear', svg: '⚙', usage: 'Settings and configuration' }
  ]
};

const SpecChips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof specData>('typography');

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Spec Chips</h2>

      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        {Object.keys(specData).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as keyof typeof specData)}
            className={`px-6 py-2 mx-2 rounded-full font-medium transition-colors ${
              activeCategory === category
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Specs Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {specData[activeCategory].map((item, index) => (
          <motion.div
            key={`${activeCategory}-${index}`}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            {activeCategory === 'typography' && (
              <div>
                <h3 className="font-semibold mb-2">{(item as any).name}</h3>
                <p className="text-sm text-gray-600 mb-2">{(item as any).usage}</p>
                <div
                  className="font-mono text-gray-800 border rounded p-2"
                  style={{ fontSize: (item as any).size }}
                >
                  {(item as any).sample}
                </div>
              </div>
            )}

            {activeCategory === 'colors' && (
              <div>
                <div className="flex items-center mb-2">
                  <div
                    className="w-8 h-8 rounded mr-3 border"
                    style={{ backgroundColor: (item as any).hex }}
                  />
                  <div>
                    <h3 className="font-semibold">{(item as any).name}</h3>
                    <p className="text-xs text-gray-600">{(item as any).hex}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{(item as any).usage}</p>
              </div>
            )}

            {activeCategory === 'grid' && (
              <div>
                <h3 className="font-semibold mb-2">{(item as any).name}</h3>
                <p className="text-sm text-gray-600">{(item as any).description}</p>
                <div className="mt-4 bg-gray-100 rounded p-4">
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={`cell-${i}`} className="bg-amber-200 h-4 rounded-sm" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'pictograms' && (
              <div className="text-center">
                <div className="text-4xl mb-2">{(item as any).svg}</div>
                <h3 className="font-semibold mb-1">{(item as any).name}</h3>
                <p className="text-sm text-gray-600">{(item as any).usage}</p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SpecChips;