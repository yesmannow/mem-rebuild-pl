import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import inspirations from '../data/inspirations.json';

interface Inspiration {
  id: string;
  title: string;
  category: string;
  image: string;
  reflection: string;
  details: string;
}

const InspirationExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInspiration, setSelectedInspiration] = useState<Inspiration | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(inspirations.map((insp: Inspiration) => insp.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredInspirations = useMemo(() => {
    if (selectedCategory === 'all') return inspirations;
    return inspirations.filter((insp: Inspiration) => insp.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Inspiration Explorer</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredInspirations.map((inspiration: Inspiration) => (
            <motion.div
              key={inspiration.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedInspiration(inspiration)}
            >
              <img
                src={inspiration.image}
                alt={inspiration.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{inspiration.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{inspiration.category}</p>
                <p className="text-gray-800">{inspiration.reflection}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedInspiration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedInspiration(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{selectedInspiration.title}</h3>
                <img
                  src={selectedInspiration.image}
                  alt={selectedInspiration.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">{selectedInspiration.category}</p>
                <p className="text-lg mb-4">{selectedInspiration.reflection}</p>
                <p className="text-gray-800">{selectedInspiration.details}</p>
                <button
                  onClick={() => setSelectedInspiration(null)}
                  className="mt-6 px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspirationExplorer;