import React from 'react';
import { motion } from 'framer-motion';
import brands from '../data/brands.json';

const SystemsTimeline: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Systems Lineage Timeline</h2>

      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-600 transform -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } flex-col`}
            >
              {/* Content */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl mr-4">
                      {/* Icon based on slug */}
                      {brand.slug.includes('ibm') && '💼'}
                      {brand.slug.includes('nasa') && '🚀'}
                      {brand.slug.includes('standards') && '📚'}
                      {brand.slug.includes('rail') && '🚂'}
                      {brand.slug.includes('sutherland') && '🖨️'}
                      {brand.slug.includes('eames') && '🏗️'}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{brand.title}</h3>
                      <p className="text-gray-600">{brand.tagline}</p>
                    </div>
                  </div>

                  {brand.quotes.length > 0 && (
                    <blockquote className="text-gray-700 italic border-l-4 border-amber-600 pl-4 mb-4">
                      "{brand.quotes[0]}"
                    </blockquote>
                  )}

                  <div className="text-sm text-gray-500">
                    {Object.keys(brand.assets).reduce(
                      (total, key) => total + (brand.assets as any)[key].length,
                      0
                    )}{' '}
                    assets • {brand.links.length} links
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="w-4 h-4 bg-amber-600 rounded-full border-4 border-white shadow-md hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemsTimeline;
