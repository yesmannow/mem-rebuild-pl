import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { TrendingDown, Clock, Scale, Award } from 'lucide-react';
import { SimpleSection } from '../../components/ui/SimpleSection';
import TechBackdrop from '../../components/hero/TechBackdrop';
import { DistrictCourtMap } from '../../components/legal/DistrictCourtMap';

const LitigationPage: React.FC = () => {
  const metrics = [
    {
      label: 'Case Duration',
      value: '-40%',
      description: 'Reduction in average case duration',
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      label: 'Settlement Rate',
      value: '85%',
      description: 'Cases resolved through negotiation',
      icon: Scale,
      color: 'text-green-500',
    },
    {
      label: 'Trial Success',
      value: '92%',
      description: 'Favorable outcomes in litigated matters',
      icon: Award,
      color: 'text-purple-500',
    },
    {
      label: 'Cost Reduction',
      value: '-35%',
      description: 'Average reduction in litigation costs',
      icon: TrendingDown,
      color: 'text-orange-500',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Litigation & Trial Practice | RBE Law</title>
        <meta
          name="description"
          content="Experienced trial attorneys handling complex commercial litigation across Indiana."
        />
      </Helmet>

      {/* Hero Section */}
      <SimpleSection variant="default" padding="none" container={false} className="relative min-h-[60vh] flex items-center overflow-hidden">
        <TechBackdrop className="absolute inset-0" />
        <div className="relative z-10 w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Litigation & Trial Practice
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Proven trial attorneys delivering results in Indiana's most complex commercial disputes.
              </p>
            </motion.div>
          </div>
        </div>
      </SimpleSection>

      {/* Content Section */}
      <SimpleSection variant="default" padding="xl" animated>
        <div className="max-w-6xl mx-auto">

        {/* Practice Areas Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Practice Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Commercial Litigation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Complex business disputes, contract breaches, and shareholder conflicts. We handle matters from initial demand through trial and appeal.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Insurance Defense
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Professional liability, D&O, E&O, and general liability coverage disputes. Strategic defense protecting insurer interests.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Employment Litigation
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Discrimination claims, wage-and-hour disputes, and non-compete agreements. Comprehensive employment law representation.
              </p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Trial Excellence
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Over 200 successful jury verdicts and settlements across Indiana. Experienced trial attorneys ready for complex litigation.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive District Court Map */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            District Court Mapping
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Our litigation team has extensive experience in courts across all Indiana districts, with established relationships and local expertise.
          </p>
          <DistrictCourtMap />
        </section>
        </div>
      </SimpleSection>

      {/* Metrics Section - Full Width */}
      <SimpleSection variant="accent-teal" padding="lg" animated>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-text mb-8 text-center">
            Litigation Performance Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="glass-panel p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-4`} />
                <div className="text-4xl font-bold text-brand-turquoise mb-2">
                  {metric.value}
                </div>
                <p className="text-lg font-semibold text-brand-text mb-1">
                  {metric.label}
                </p>
                <p className="text-sm text-brand-muted">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </SimpleSection>
    </>
  );
};

export default LitigationPage;
