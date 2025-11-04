import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ManualViewerProps {
  brand: {
    title: string;
    assets: {
      manual?: string[];
      books?: string[];
      spreads?: string[];
    };
  };
}

const ManualViewer: React.FC<ManualViewerProps> = ({ brand }) => {
  const [currentSpread, setCurrentSpread] = useState(0);
  const [zoomedArea, setZoomedArea] = useState<{ x: number; y: number } | null>(null);

  // Get spreads from various possible asset keys
  const spreads = brand.assets.manual || brand.assets.books || brand.assets.spreads || [];

  const nextSpread = () => {
    setCurrentSpread((prev) => (prev + 1) % spreads.length);
    setZoomedArea(null);
  };

  const prevSpread = () => {
    setCurrentSpread((prev) => (prev - 1 + spreads.length) % spreads.length);
    setZoomedArea(null);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomedArea({ x, y });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">{brand.title} Manual Viewer</h3>

      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <motion.img
          key={currentSpread}
          src={spreads[currentSpread]}
          alt={`${brand.title} spread ${currentSpread + 1}`}
          className="w-full h-auto cursor-crosshair"
          onClick={handleImageClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {zoomedArea && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div
              className="absolute w-32 h-32 border-2 border-amber-600 bg-white bg-opacity-75 rounded-full flex items-center justify-center"
              style={{
                left: `${zoomedArea.x}%`,
                top: `${zoomedArea.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="text-xs font-medium">Zoom</span>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <button
          onClick={prevSpread}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Previous spread"
        >
          ‹
        </button>
        <button
          onClick={nextSpread}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          aria-label="Next spread"
        >
          ›
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {spreads.map((spread, index) => (
          <button
            key={spread}
            onClick={() => {
              setCurrentSpread(index);
              setZoomedArea(null);
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentSpread ? 'bg-amber-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to spread ${index + 1}`}
          />
        ))}
      </div>

      <p className="text-center text-gray-600 mt-4">
        Spread {currentSpread + 1} of {spreads.length}
      </p>
    </div>
  );
};

export default ManualViewer;