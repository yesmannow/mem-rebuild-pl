import React, { useState } from 'react';
import { motion } from 'framer-motion';

const hotspots = [
  { id: 'chair', x: 20, y: 30, title: 'Eames Molded Plastic Chair', description: 'Iconic design combining form and function' },
  { id: 'table', x: 60, y: 40, title: 'Eames Table', description: 'Modular table system for flexible arrangements' },
  { id: 'storage', x: 80, y: 60, title: 'Eames Storage Units', description: 'Organized storage with aesthetic appeal' },
  { id: 'house', x: 40, y: 70, title: 'Eames House', description: 'Case Study House #8, a design laboratory' }
];

const ArtifactExplorer: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Artifact Explorer: Eames Institute Launch Kit</h2>

      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          src="/images/artifacts/eames-kit.svg"
          alt="Eames Institute Launch Kit Layout"
          className="w-full h-auto"
        />

        {hotspots.map((hotspot) => (
          <motion.button
            key={hotspot.id}
            className="absolute w-6 h-6 bg-amber-600 rounded-full border-2 border-white shadow-lg hover:bg-amber-700 transition-colors"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Explore ${hotspot.title}`}
          >
            <span className="sr-only">{hotspot.title}</span>
          </motion.button>
        ))}

        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs"
          >
            {(() => {
              const hotspot = hotspots.find(h => h.id === activeHotspot);
              return hotspot ? (
                <>
                  <h3 className="font-semibold mb-2">{hotspot.title}</h3>
                  <p className="text-sm text-gray-600">{hotspot.description}</p>
                </>
              ) : null;
            })()}
          </motion.div>
        )}
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p>Click the hotspots to explore key Eames artifacts</p>
      </div>
    </div>
  );
};

export default ArtifactExplorer;