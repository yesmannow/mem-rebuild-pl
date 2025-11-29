import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import caseStudiesData from '../data/caseStudies.json';
import WaveDivider from './WaveDivider';
import GlyphOverlay from './GlyphOverlay';
import NoiseOverlay from './NoiseOverlay';

interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  metrics: string[];
}

const caseStudies: CaseStudy[] = caseStudiesData;

const CaseStudyExplorer: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const handleCaseStudySelect = (caseStudy: CaseStudy) => {
    setSelectedCaseStudy(caseStudy);
  };

  const handleCloseDetail = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-stone-50 to-amber-50 relative overflow-hidden">
      <WaveDivider />
      <GlyphOverlay />
      <NoiseOverlay />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Case Study Explorer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how strategic marketing transformed businesses. Select a case study to explore
            the challenges, solutions, and measurable results that drove success.
          </p>
        </motion.div>

        {/* Case Study Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => handleCaseStudySelect(caseStudy)}
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {caseStudy.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.metrics.slice(0, 2).map(metric => (
                    <span
                      key={metric}
                      className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Preview */}
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{caseStudy.problem}</p>
                <div className="flex items-center text-amber-600 font-medium text-sm">
                  <span>Explore Case Study</span>
                  <svg
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={handleCloseDetail}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-bold text-gray-900">{selectedCaseStudy.title}</h3>
                    <button
                      onClick={handleCloseDetail}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close case study details"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {selectedCaseStudy.metrics.map(metric => (
                      <span
                        key={metric}
                        className="px-4 py-2 bg-amber-100 text-amber-800 font-semibold rounded-full text-sm"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 space-y-8">
                  {/* Problem */}
                  <div>
                    <h4 className="text-xl font-semibold text-red-600 mb-3 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      The Challenge
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.problem}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h4 className="text-xl font-semibold text-blue-600 mb-3 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                      The Solution
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.solution}</p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h4 className="text-xl font-semibold text-green-600 mb-3 flex items-center">
                      <svg
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      The Results
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedCaseStudy.outcome}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudyExplorer;
