import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

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
  highlights?: string[];
  className?: string;
  variant?: 'muted' | 'surface';
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
  highlights,
  className,
  variant = 'muted',
}) => {
  return (
    <motion.section
      className={cn(
        'py-16 md:py-20',
        variant === 'muted' && 'bg-gray-50 dark:bg-gray-900/50',
        variant === 'surface' && 'cs-panel',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black mb-8 text-white dark:text-white">
          Outcomes
        </h2>

        {/* Outcomes narrative */}
        <div className="text-gray-700 dark:text-gray-300 mb-12">
          {renderContent(outcomes)}
        </div>

        {highlights && highlights.length > 0 && (
          <div className="grid gap-4 mb-12 md:grid-cols-2">
            {highlights.map((highlight, idx) => (
              <motion.div
                key={highlight}
                className="rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-4 shadow-sm dark:border-slate-700/50 dark:bg-slate-900/60"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <p className="text-base font-semibold text-white dark:text-white">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Metrics table */}
        {metrics.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4 text-white dark:text-white">
              Key Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-white dark:text-white">
                      Metric
                    </th>
                    {metrics.some(m => m.before) && (
                      <th className="text-left py-3 px-4 font-semibold text-white dark:text-white">
                        Before
                      </th>
                    )}
                    <th className="text-left py-3 px-4 font-semibold text-white dark:text-white">
                      After
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((metric, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/10 dark:border-gray-800"
                    >
                      <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                        {metric.label}
                      </td>
                      {metrics.some(m => m.before) && (
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                          {metric.before || '—'}
                        </td>
                      )}
                      <td className="py-4 px-4 font-semibold text-white dark:text-white">
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
            <h3 className="text-xl font-bold mb-4 text-white dark:text-white">
              Capabilities Demonstrated
            </h3>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((capability, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/5 backdrop-blur-xl dark:bg-gray-800 text-white dark:text-white rounded-lg text-sm font-medium border border-white/10 dark:border-gray-700"
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

