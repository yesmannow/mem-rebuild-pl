import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  type: 'client' | 'event' | 'training';
  description: string;
  status?: string;
}

const locations: Location[] = [
  {
    id: 'indy',
    name: 'Indianapolis, IN',
    x: 60,
    y: 45,
    type: 'client',
    description: 'Graston Technique HQ - Primary Client',
    status: 'Active',
  },
  {
    id: 'chicago',
    name: 'Chicago, IL',
    x: 55,
    y: 40,
    type: 'event',
    description: 'Training Event: Sold Out',
    status: 'Completed',
  },
  {
    id: 'austin',
    name: 'Austin, TX',
    x: 45,
    y: 60,
    type: 'client',
    description: 'Ultimate Technologies - Interim Project',
    status: 'Completed',
  },
  {
    id: 'nyc',
    name: 'New York, NY',
    x: 75,
    y: 35,
    type: 'training',
    description: 'Marketing Automation Workshop',
    status: 'Upcoming',
  },
  {
    id: 'sf',
    name: 'San Francisco, CA',
    x: 15,
    y: 40,
    type: 'client',
    description: 'Remote Client Engagement',
    status: 'Active',
  },
];

const TheAtlas: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [pulses, setPulses] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Create pulsing effect for locations
    const interval = setInterval(() => {
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      setPulses((prev) => {
        const next = new Set(prev);
        next.add(randomLocation.id);
        setTimeout(() => {
          setPulses((current) => {
            const updated = new Set(current);
            updated.delete(randomLocation.id);
            return updated;
          });
        }, 1000);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (type: string, status?: string) => {
    if (status === 'Active') return 'text-green-400';
    if (status === 'Completed') return 'text-brand-teal';
    if (status === 'Upcoming') return 'text-brand-orange';
    return 'text-brand-teal';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'client':
        return '🏢';
      case 'event':
        return '🎯';
      case 'training':
        return '📚';
      default:
        return '📍';
    }
  };

  return (
    <div className="the-atlas relative p-8 bg-brand-surface/50 border border-brand-teal/20 rounded-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-text mb-2">Data Visualization Capabilities</h3>
        <p className="text-brand-muted text-sm">
          Interactive mapping and location-based data visualization
        </p>
      </div>

      <div className="relative bg-brand-dark/80 rounded-xl p-8 overflow-hidden border border-brand-teal/10">
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Simplified US Map Outline (SVG) */}
        <svg
          viewBox="0 0 800 500"
          className="w-full h-auto"
          style={{ minHeight: '400px' }}
        >
          {/* Simplified US Map Path */}
          <path
            d="M 100 150 L 200 120 L 300 130 L 400 140 L 500 150 L 600 160 L 700 170 L 750 200 L 700 250 L 650 300 L 600 350 L 500 380 L 400 390 L 300 380 L 200 350 L 150 300 L 120 250 L 100 200 Z"
            fill="rgba(15, 23, 42, 0.3)"
            stroke="rgba(64, 224, 208, 0.2)"
            strokeWidth="2"
          />

          {/* Location Markers */}
          {locations.map((location) => {
            const x = (location.x / 100) * 800;
            const y = (location.y / 100) * 500;
            const isPulsing = pulses.has(location.id);

            return (
              <g key={location.id}>
                {/* Pulsing Ring */}
                {isPulsing && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r="30"
                    fill="none"
                    stroke="rgba(64, 224, 208, 0.6)"
                    strokeWidth="2"
                    initial={{ scale: 0.5, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Location Pin */}
                <motion.g
                  onClick={() => setSelectedLocation(location)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#40E0D0"
                    className="drop-shadow-[0_0_8px_rgba(64,224,208,0.8)]"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#0F172A"
                  />
                </motion.g>
              </g>
            );
          })}
        </svg>

        {/* Location Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {locations.map((location) => {
            const left = `${location.x}%`;
            const top = `${location.y}%`;

            return (
              <motion.div
                key={`label-${location.id}`}
                className="absolute pointer-events-auto"
                style={{ left, top, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: locations.indexOf(location) * 0.1 }}
              >
                <div className="flex items-center gap-2 bg-brand-dark/90 border border-brand-teal/30 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-sm">{getTypeIcon(location.type)}</span>
                  <span className="text-xs font-semibold text-brand-text whitespace-nowrap">
                    {location.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Location Details Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-brand-surface border border-brand-teal/30 rounded-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 text-brand-muted hover:text-brand-text"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-brand-teal" />
                <div>
                  <h4 className="text-xl font-bold text-brand-text">{selectedLocation.name}</h4>
                  <div className={`text-sm font-semibold ${getStatusColor(selectedLocation.type, selectedLocation.status)}`}>
                    {selectedLocation.status || selectedLocation.type}
                  </div>
                </div>
              </div>
              <p className="text-brand-muted mb-4">{selectedLocation.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-brand-muted">Type:</span>
                <span className="text-brand-teal capitalize">{selectedLocation.type}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-teal" />
          <span className="text-brand-muted">Active Engagement</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <span className="text-brand-muted">Event</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">📚</span>
          <span className="text-brand-muted">Training</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🏢</span>
          <span className="text-brand-muted">Client HQ</span>
        </div>
      </div>
    </div>
  );
};

export default TheAtlas;

