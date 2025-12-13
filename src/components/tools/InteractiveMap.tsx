import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, X, Phone, Mail } from 'lucide-react';

interface BoardMember {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

interface District {
  id: number;
  name: string;
  boardMembers: BoardMember[];
  courtReporters: BoardMember[];
  coordinates: { x: number; y: number };
}

const mockDistricts: District[] = [
  {
    id: 1,
    name: 'District 1 - Northern Indiana',
    boardMembers: [
      { name: 'Hon. Sarah Johnson', role: 'Board Chair', phone: '(555) 100-0001', email: 'sjohnson@wcb.in.gov' },
      { name: 'James Rodriguez', role: 'Employer Rep', phone: '(555) 100-0002' },
    ],
    courtReporters: [
      { name: 'Emily Chen', role: 'Senior Court Reporter', phone: '(555) 100-0010' },
    ],
    coordinates: { x: 45, y: 20 },
  },
  {
    id: 2,
    name: 'District 2 - Northeast Indiana',
    boardMembers: [
      { name: 'Hon. Michael Thompson', role: 'Board Chair', phone: '(555) 200-0001', email: 'mthompson@wcb.in.gov' },
      { name: 'Lisa Martinez', role: 'Employee Rep', phone: '(555) 200-0002' },
    ],
    courtReporters: [
      { name: 'David Wilson', role: 'Court Reporter', phone: '(555) 200-0010' },
    ],
    coordinates: { x: 75, y: 25 },
  },
  {
    id: 3,
    name: 'District 3 - Central Indiana',
    boardMembers: [
      { name: 'Hon. Patricia Williams', role: 'Board Chair', phone: '(555) 300-0001', email: 'pwilliams@wcb.in.gov' },
      { name: 'Robert Anderson', role: 'Employer Rep', phone: '(555) 300-0002' },
    ],
    courtReporters: [
      { name: 'Jennifer Lee', role: 'Senior Court Reporter', phone: '(555) 300-0010' },
    ],
    coordinates: { x: 50, y: 50 },
  },
  {
    id: 4,
    name: 'District 4 - Western Indiana',
    boardMembers: [
      { name: 'Hon. Christopher Davis', role: 'Board Chair', phone: '(555) 400-0001', email: 'cdavis@wcb.in.gov' },
      { name: 'Maria Garcia', role: 'Employee Rep', phone: '(555) 400-0002' },
    ],
    courtReporters: [
      { name: 'Thomas Brown', role: 'Court Reporter', phone: '(555) 400-0010' },
    ],
    coordinates: { x: 30, y: 55 },
  },
  {
    id: 5,
    name: 'District 5 - Southern Indiana',
    boardMembers: [
      { name: 'Hon. Angela Taylor', role: 'Board Chair', phone: '(555) 500-0001', email: 'ataylor@wcb.in.gov' },
      { name: 'Daniel Kim', role: 'Employer Rep', phone: '(555) 500-0002' },
    ],
    courtReporters: [
      { name: 'Sandra Miller', role: 'Senior Court Reporter', phone: '(555) 500-0010' },
    ],
    coordinates: { x: 45, y: 80 },
  },
  {
    id: 6,
    name: 'District 6 - Southeast Indiana',
    boardMembers: [
      { name: 'Hon. Kevin Martinez', role: 'Board Chair', phone: '(555) 600-0001', email: 'kmartinez@wcb.in.gov' },
      { name: 'Rachel Foster', role: 'Employee Rep', phone: '(555) 600-0002' },
    ],
    courtReporters: [
      { name: 'Brian Johnson', role: 'Court Reporter', phone: '(555) 600-0010' },
    ],
    coordinates: { x: 70, y: 75 },
  },
];

const InteractiveMap: React.FC = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#0a1a3a] dark:text-white mb-2">
          Indiana Workers' Compensation Board Districts
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Click on a district to view board members and court reporters
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-square bg-gradient-to-br from-[#0e2650] to-[#0a1a3a] rounded-2xl overflow-hidden shadow-2xl border border-[#3d7eff]/20">
            {/* SVG Map of Indiana (simplified) */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ filter: 'drop-shadow(0 0 20px rgba(61, 126, 255, 0.3))' }}
            >
              {/* Indiana outline (simplified) */}
              <path
                d="M 20,10 L 80,10 L 85,30 L 85,70 L 75,90 L 25,90 L 15,70 L 15,30 Z"
                fill="rgba(61, 126, 255, 0.1)"
                stroke="rgba(61, 126, 255, 0.5)"
                strokeWidth="0.5"
              />

              {/* District markers */}
              {mockDistricts.map((district) => (
                <g key={district.id}>
                  <motion.circle
                    cx={district.coordinates.x}
                    cy={district.coordinates.y}
                    r={hoveredDistrict === district.id ? 5 : 3}
                    fill={hoveredDistrict === district.id ? '#f3bd4f' : '#3d7eff'}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredDistrict(district.id)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                    onClick={() => setSelectedDistrict(district)}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.95 }}
                  />
                  {hoveredDistrict === district.id && (
                    <motion.g
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <rect
                        x={district.coordinates.x - 15}
                        y={district.coordinates.y - 20}
                        width="30"
                        height="12"
                        fill="#0a1a3a"
                        rx="2"
                        opacity="0.95"
                      />
                      <text
                        x={district.coordinates.x}
                        y={district.coordinates.y - 12}
                        textAnchor="middle"
                        fill="white"
                        fontSize="3"
                        fontWeight="bold"
                      >
                        District {district.id}
                      </text>
                    </motion.g>
                  )}
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-[#0a1a3a]/90 backdrop-blur-sm rounded-lg p-3 border border-[#3d7eff]/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 bg-[#3d7eff] rounded-full" />
                <span className="text-xs text-white">District Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#f3bd4f] rounded-full" />
                <span className="text-xs text-white">Hovered District</span>
              </div>
            </div>
          </div>
        </div>

        {/* District List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#0a1a3a] dark:text-white mb-3">
            All Districts
          </h3>
          {mockDistricts.map((district) => (
            <motion.button
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              onMouseEnter={() => setHoveredDistrict(district.id)}
              onMouseLeave={() => setHoveredDistrict(null)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                selectedDistrict?.id === district.id
                  ? 'bg-gradient-to-r from-[#3d7eff] to-[#0e2650] text-white shadow-lg'
                  : 'bg-white dark:bg-[#0e2650]/30 hover:bg-gray-50 dark:hover:bg-[#0e2650]/50 border border-gray-200 dark:border-[#3d7eff]/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">District {district.id}</p>
                  <p className="text-xs opacity-70 mt-1">{district.name}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {selectedDistrict && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSelectedDistrict(null)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white dark:bg-[#0a1a3a] shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#0e2650] to-[#3d7eff] p-6 flex items-start justify-between border-b border-[#3d7eff]/20 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    District {selectedDistrict.id}
                  </h2>
                  <p className="text-white/80 text-sm">{selectedDistrict.name}</p>
                </div>
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className="text-white/70 hover:text-white transition-colors p-2"
                  aria-label="Close panel"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Board Members */}
                <div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] dark:text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#3d7eff]" />
                    Board Members
                  </h3>
                  <div className="grid gap-4">
                    {selectedDistrict.boardMembers.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-[#3d7eff]/5 to-[#f3bd4f]/5 rounded-xl border border-[#3d7eff]/20"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3d7eff] to-[#0e2650] flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#0a1a3a] dark:text-white">{member.name}</h4>
                            <p className="text-sm text-[#3d7eff] font-medium">{member.role}</p>
                            {member.phone && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>{member.phone}</span>
                              </div>
                            )}
                            {member.email && (
                              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                <Mail className="w-4 h-4" />
                                <span>{member.email}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Court Reporters */}
                <div>
                  <h3 className="text-xl font-semibold text-[#0a1a3a] dark:text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#3d7eff]" />
                    Court Reporters
                  </h3>
                  <div className="grid gap-4">
                    {selectedDistrict.courtReporters.map((reporter, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (selectedDistrict.boardMembers.length + index) * 0.1 }}
                        className="p-4 bg-gradient-to-br from-[#3d7eff]/5 to-[#f3bd4f]/5 rounded-xl border border-[#3d7eff]/20"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f3bd4f] to-[#3d7eff] flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {reporter.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#0a1a3a] dark:text-white">{reporter.name}</h4>
                            <p className="text-sm text-[#f3bd4f] font-medium">{reporter.role}</p>
                            {reporter.phone && (
                              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" />
                                <span>{reporter.phone}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-6 bg-gradient-to-br from-[#0e2650] to-[#3d7eff] rounded-xl text-white"
                >
                  <h4 className="font-semibold text-lg mb-2">Need Legal Representation?</h4>
                  <p className="text-sm text-white/80 mb-4">
                    RBE Law has extensive experience representing clients in {selectedDistrict.name}. 
                    Contact us for a consultation.
                  </p>
                  <button className="bg-[#f3bd4f] text-[#0a1a3a] px-6 py-2 rounded-lg font-semibold hover:bg-[#f3bd4f]/90 transition-colors">
                    Schedule Consultation
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveMap;
