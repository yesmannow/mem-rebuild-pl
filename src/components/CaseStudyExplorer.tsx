import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import caseStudiesData from '../data/caseStudies.json';
import GlyphOverlay from './GlyphOverlay';

interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics?: string[];
}

const caseStudies: CaseStudy[] = caseStudiesData;

const CaseStudyExplorer: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleSelectCaseStudy = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const handleBack = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <section className="py-16 bg-slate-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Interactive Case Study Explorer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped businesses overcome challenges and achieve remarkable results.
            Select a case study below to explore the journey from problem to solution.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {selectedCaseStudy ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <GlyphOverlay />
              <div className="bg-white rounded-lg shadow-lg p-8 relative z-10">
                <button
                  onClick={handleBack}
                  className="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500"
                  aria-label="Back to case studies"
                >
                  ← Back to Explorer
                </button>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {selectedCaseStudy.title}
                </h3>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-red-600 mb-3">The Challenge</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">Our Solution</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3">The Outcome</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.outcome}</p>
                  </div>

                  {selectedCaseStudy.metrics && selectedCaseStudy.metrics.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-purple-600 mb-3">Key Metrics</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedCaseStudy.metrics.map((metric) => (
                          <div key={metric} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-900 font-medium">{metric}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudies.map((caseStudy) => (
                  <motion.button
                    key={caseStudy.id}
                    className="p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white cursor-pointer relative text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectCaseStudy(caseStudy)}
                    aria-label={`View case study: ${caseStudy.title}`}
                  >
                    <div className="absolute top-4 right-4 text-2xl opacity-10">🐻</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 pr-8">
                      {caseStudy.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {caseStudy.problem}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {caseStudy.metrics?.slice(0, 2).map((metric) => (
                        <span
                          key={metric}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudyExplorer;