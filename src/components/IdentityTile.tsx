import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Brand {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  assets: {
    typography: string[];
    pictograms: string[];
    spreads: string[];
  };
  quotes: string[];
  links: string[];
}

interface IdentityTileProps {
  brand: Brand;
}

const IdentityTile: React.FC<IdentityTileProps> = ({ brand }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img src={brand.cover} alt={brand.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{brand.title}</h3>
          <p className="text-gray-600">{brand.tagline}</p>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center"
            >
              <div className="text-white text-center p-4">
                <p className="text-lg font-medium mb-2">Explore Identity</p>
                <p className="text-sm">Click to dive deep</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{brand.title}</h2>
                    <p className="text-gray-600">{brand.tagline}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                </div>

                <img
                  src={brand.cover}
                  alt={brand.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />

                {brand.quotes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Key Insights</h3>
                    <div className="space-y-2">
                      {brand.quotes.map(quote => (
                        <blockquote
                          key={quote}
                          className="text-gray-700 italic border-l-4 border-amber-600 pl-4"
                        >
                          "{quote}"
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}

                {brand.assets.spreads.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Manual Spreads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {brand.assets.spreads.map(spread => (
                        <img
                          key={spread}
                          src={spread}
                          alt={`${brand.title} spread`}
                          className="w-full rounded-lg shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {brand.links.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Learn More</h3>
                    <div className="space-y-2">
                      {brand.links.map(link => (
                        <a
                          key={link}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 underline"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IdentityTile;
