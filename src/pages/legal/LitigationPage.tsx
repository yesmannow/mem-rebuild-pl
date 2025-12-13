import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Scale, FileText, Users, Award } from 'lucide-react';
import InteractiveMap from '../../components/tools/InteractiveMap';

const LitigationPage: React.FC = () => {
  const practiceAreas = [
    {
      icon: Scale,
      title: 'Commercial Litigation',
      description: 'Complex business disputes, contract breaches, and shareholder conflicts.',
    },
    {
      icon: FileText,
      title: 'Insurance Defense',
      description: 'Professional liability, D&O, E&O, and general liability coverage disputes.',
    },
    {
      icon: Users,
      title: 'Employment Litigation',
      description: 'Discrimination claims, wage-and-hour disputes, and non-compete agreements.',
    },
    {
      icon: Award,
      title: 'Trial Excellence',
      description: 'Over 200 successful jury verdicts and settlements across Indiana.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Litigation | RBE Law</title>
        <meta
          name="description"
          content="Experienced trial attorneys handling complex commercial litigation across Indiana."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0a1a3a] dark:to-[#0e2650]">
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e2650] via-[#3d7eff] to-[#0a1a3a] opacity-5" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="inline-block p-4 bg-gradient-to-br from-[#3d7eff] to-[#0e2650] rounded-2xl mb-6"
              >
                <Scale className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0a1a3a] dark:text-white mb-6">
                Litigation & Trial Practice
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Proven trial attorneys delivering results in Indiana's most complex disputes.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {practiceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white dark:bg-[#0e2650]/30 rounded-xl border border-gray-200 dark:border-[#3d7eff]/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3d7eff] to-[#0e2650] rounded-lg flex items-center justify-center mb-4">
                    <area.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a1a3a] dark:text-white mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-white/50 dark:bg-[#0e2650]/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-bold text-[#0a1a3a] dark:text-white mb-4">
                Deep Knowledge of Indiana Courts
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our litigation team has extensive experience in courts across all 
                Indiana districts, with established relationships and local expertise.
              </p>
            </motion.div>
            <InteractiveMap />
          </div>
        </section>

        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="p-12 bg-gradient-to-br from-[#0e2650] to-[#3d7eff] rounded-2xl text-white">
              <h2 className="text-3xl font-bold mb-4">
                Facing a Complex Dispute?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our trial attorneys are ready to fight for your interests in court 
                or at the negotiating table.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-[#f3bd4f] text-[#0a1a3a] rounded-lg font-semibold hover:bg-[#f3bd4f]/90 transition-all shadow-lg hover:shadow-xl">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  View Case Results
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default LitigationPage;
