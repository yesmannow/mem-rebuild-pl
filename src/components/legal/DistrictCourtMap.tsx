import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Scale } from 'lucide-react';

interface District {
  id: string;
  name: string;
  location: string;
  cases: number;
  color: string;
  position: { x: number; y: number };
}

interface DistrictCourtMapProps {
  className?: string;
}

/**
 * DistrictCourtMap
 * Interactive visualization of district court coverage
 */
export const DistrictCourtMap: React.FC<DistrictCourtMapProps> = ({ className = '' }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts: District[] = [
    {
      id: 'northern',
      name: 'Northern District',
      location: 'South Bend, Fort Wayne',
      cases: 142,
      color: 'bg-blue-500',
      position: { x: 25, y: 20 },
    },
    {
      id: 'southern',
      name: 'Southern District',
      location: 'Indianapolis, Evansville',
      cases: 203,
      color: 'bg-green-500',
      position: { x: 50, y: 60 },
    },
    {
      id: 'central',
      name: 'Central District',
      location: 'Terre Haute, Bloomington',
      cases: 98,
      color: 'bg-purple-500',
      position: { x: 40, y: 45 },
    },
  ];

  const selectedData = districts.find(d => d.id === selectedDistrict);

  return (
    <div className={`district-court-map ${className}`}>
      <div className="relative bg-slate-100 dark:bg-slate-800 rounded-xl p-8 min-h-[400px]">
        {/* Map Container */}
        <div className="relative w-full h-[400px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-lg overflow-hidden">
          {/* Indiana State Outline (simplified) */}
          <svg
            viewBox="0 0 200 300"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Simplified Indiana shape */}
            <path
              d="M 50 50 L 150 50 L 160 100 L 150 200 L 100 250 L 50 200 Z"
              fill="rgba(148, 163, 184, 0.2)"
              stroke="rgba(148, 163, 184, 0.5)"
              strokeWidth="2"
            />
          </svg>

          {/* District Markers */}
          {districts.map(district => (
            <motion.button
              key={district.id}
              className={`absolute ${district.color} rounded-full p-3 shadow-lg hover:shadow-xl transition-all`}
              style={{
                left: `${district.position.x}%`,
                top: `${district.position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => setSelectedDistrict(district.id === selectedDistrict ? null : district.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: districts.indexOf(district) * 0.1 }}
            >
              <MapPin className="w-6 h-6 text-white" />
            </motion.button>
          ))}
        </div>

        {/* District Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {districts.map(district => (
            <motion.div
              key={district.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedDistrict === district.id
                  ? 'border-brand-turquoise bg-brand-turquoise/10'
                  : 'border-slate-300 dark:border-slate-700 bg-white/5 backdrop-blur-xl dark:bg-slate-900'
              }`}
              onClick={() => setSelectedDistrict(district.id === selectedDistrict ? null : district.id)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Building2 className={`w-5 h-5 ${selectedDistrict === district.id ? 'text-brand-turquoise' : 'text-slate-600 dark:text-slate-400'}`} />
                <h3 className="font-semibold text-slate-900 dark:text-white">{district.name}</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{district.location}</p>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {district.cases} cases
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected District Details */}
        <AnimatePresence>
          {selectedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-6 bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-lg"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {selectedData.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Our litigation team has extensive experience in {selectedData.location} courts, with established relationships and local expertise.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Active Cases</p>
                  <p className="text-2xl font-bold text-brand-turquoise">{selectedData.cases}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Success Rate</p>
                  <p className="text-2xl font-bold text-brand-turquoise">92%</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DistrictCourtMap;
