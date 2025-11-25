import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLicenseData, ProfessionType, LicenseData, StateLicenseData } from '../../data/licenseData';

const LicenseHub: React.FC = () => {
  const [activeProfession, setActiveProfession] = useState<ProfessionType>('pt');
  const [selectedState, setSelectedState] = useState<string>('');

  const professionLabels = {
    pt: 'Physical Therapy',
    ot: 'Occupational Therapy',
    dc: 'Chiropractic',
    at: 'Athletic Training',
  };

  const data = getLicenseData(activeProfession);
  const selectedStateData = selectedState ? (data[selectedState] as StateLicenseData | undefined) : null;

  const states = Object.keys(data).sort((a, b) =>
    data[a].stateName.localeCompare(data[b].stateName)
  );

  const getFieldLabel = (profession: ProfessionType): { col1: string; col2: string; col3: string } => {
    switch (profession) {
      case 'pt':
        return { col1: 'PT Requirements', col2: 'PTA Requirements', col3: 'State-Specific Notes' };
      case 'ot':
        return { col1: 'OT Requirements', col2: 'OTA Requirements', col3: 'State-Specific Notes' };
      case 'dc':
        return { col1: 'CEUs Required', col2: 'Renewal Cycle', col3: 'Renewal Details & Notes' };
      case 'at':
        return { col1: 'State Regulation Type', col2: 'State-Specific CEUs', col3: 'State-Specific Notes' };
      default:
        return { col1: 'Requirements', col2: 'Details', col3: 'Notes' };
    }
  };

  const getFieldValue = (profession: ProfessionType, stateData: StateLicenseData, field: 'col1' | 'col2' | 'col3'): string => {
    switch (profession) {
      case 'pt':
        return field === 'col1'
          ? stateData.ptHours || 'N/A'
          : field === 'col2'
          ? stateData.ptaHours || 'N/A'
          : stateData.notes || 'N/A';
      case 'ot':
        return field === 'col1'
          ? stateData.otHours || 'N/A'
          : field === 'col2'
          ? stateData.otaHours || 'N/A'
          : stateData.notes || 'N/A';
      case 'dc':
        return field === 'col1'
          ? stateData.totalHours || 'N/A'
          : field === 'col2'
          ? stateData.renewalCycle || 'N/A'
          : stateData.notes || 'N/A';
      case 'at':
        return field === 'col1'
          ? stateData.regulationType || 'N/A'
          : field === 'col2'
          ? stateData.stateSpecificHours || 'N/A'
          : stateData.notes || 'N/A';
      default:
        return 'N/A';
    }
  };

  const labels = getFieldLabel(activeProfession);

  return (
    <div className="min-h-screen bg-brand-dark py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">License Hub</h1>
          <p className="text-brand-muted text-lg">
            50-state compliance database for continuing education requirements
          </p>
        </motion.div>

        {/* Profession Tabs */}
        <div className="bg-brand-surface/10 rounded-xl p-2 mb-6 flex gap-2 flex-wrap">
          {(Object.keys(professionLabels) as ProfessionType[]).map((prof) => (
            <button
              key={prof}
              onClick={() => {
                setActiveProfession(prof);
                setSelectedState('');
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex-1 min-w-[150px] ${
                activeProfession === prof
                  ? 'bg-brand-teal text-brand-dark'
                  : 'text-brand-muted hover:text-white hover:bg-brand-surface/20'
              }`}
            >
              {professionLabels[prof]}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          key={activeProfession}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-surface rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-semibold text-brand-dark mb-2">
            {professionLabels[activeProfession]} State License Requirements
          </h2>
          <p className="text-gray-600 mb-6">
            Select your state to find CEU requirements.
          </p>

          {/* State Selector */}
          <div className="mb-6">
            <label htmlFor="stateSelector" className="block text-sm font-medium text-brand-dark mb-2">
              Select Your State:
            </label>
            <select
              id="stateSelector"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-brand-dark font-medium focus:outline-none focus:ring-2 focus:ring-brand-teal appearance-none pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' height='18' viewBox='0 0 24 24' width='18' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
              }}
            >
              <option value="">-- Select Your State --</option>
              {states.map((stateCode) => (
                <option key={stateCode} value={stateCode}>
                  {data[stateCode].stateName}
                </option>
              ))}
            </select>
          </div>

          {/* Results Display */}
          <AnimatePresence>
            {selectedStateData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-brand-dark mb-2">
                    {selectedStateData.boardName}
                  </h3>
                  <a
                    href={selectedStateData.boardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-teal font-semibold hover:underline"
                  >
                    Visit Official Board Website →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">{labels.col1}</h4>
                    <p className="text-lg font-bold text-brand-teal">
                      {getFieldValue(activeProfession, selectedStateData, 'col1')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">{labels.col2}</h4>
                    <p className="text-lg font-bold text-brand-teal">
                      {getFieldValue(activeProfession, selectedStateData, 'col2')}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-1">{labels.col3}</h4>
                    <p className="text-sm text-brand-dark leading-relaxed">
                      {getFieldValue(activeProfession, selectedStateData, 'col3')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-sm text-gray-500 text-center">
            It is the licensee's responsibility to verify all CEU requirements with their official
            state licensing board.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LicenseHub;

