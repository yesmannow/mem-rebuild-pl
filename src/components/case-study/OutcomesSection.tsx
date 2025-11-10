import React from 'react';
import { motion } from 'framer-motion';

export interface RichSection {
  paragraphs?: string[];
  bullets?: string[];
}

export interface OutcomesSectionProps {
  outcomes: string | RichSection;
  metrics: Array<{
    label: string;
    before?: string;
    after: string;
  }>;
  capabilities?: string[];
}

const renderContent = (content: string | RichSection) => {
  if (typeof content === 'string') {
    const paragraphs = content.split('\n\n').filter(p => p.trim());
    return (
      <>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="mb-4 text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </>
    );
  }

  return (
    <>
      {content.paragraphs?.map((para, idx) => (
        <p key={idx} className="mb-4 text-lg leading-relaxed">
          {para}
        </p>
      ))}
      {content.bullets && (
        <ul className="list-disc list-inside space-y-2 mb-4 text-lg">
          {content.bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )}
    </>
  );
};

const OutcomesSection: React.FC<OutcomesSectionProps> = ({
  outcomes,
  metrics,
  capabilities,
}) => {
  return (
    <motion.section
      className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900 dark:text-white">
          Outcomes
        </h2>

        {/* Outcomes narrative */}
        <div className="text-gray-700 dark:text-gray-300 mb-12">
          {renderContent(outcomes)}
        </div>

        {/* Metrics table */}
        {metrics.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Key Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Metric
                    </th>
                    {metrics.some(m => m.before) && (
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        Before
                      </th>
                    )}
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 dark:border-gray-800"
                    >
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                        {metric.label}
                      </td>
                      {metrics.some(m => m.before) && (
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {metric.before || '—'}
                        </td>
                      )}
                      <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                        {metric.after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Capabilities */}
        {capabilities && capabilities.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Capabilities Demonstrated
            </h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default OutcomesSection;

