import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, FileText, Scale, Clock } from 'lucide-react';
import InteractiveMap from '../../components/tools/InteractiveMap';

const WorkersCompensationPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Defense',
      description: 'Representing employers and insurers in all aspects of workers\' compensation claims.',
    },
    {
      icon: FileText,
      title: 'Claims Management',
      description: 'Strategic guidance from initial filing through final resolution.',
    },
    {
      icon: Scale,
      title: 'Litigation Expertise',
      description: 'Experienced trial attorneys who achieve favorable outcomes.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Rapid response to urgent claims and emergency situations.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Workers' Compensation Law | RBE Law</title>
        <meta
          name="description"
          content="Expert workers' compensation defense for employers and insurers across Indiana. Navigate claims with confidence."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0a1a3a] dark:to-[#0e2650]">
        {/* Hero Section */}
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
                <Shield className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0a1a3a] dark:text-white mb-6">
                Workers' Compensation Law
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Protecting employers and insurers across Indiana with strategic defense 
                and comprehensive claims management.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white dark:bg-[#0e2650]/30 rounded-xl border border-gray-200 dark:border-[#3d7eff]/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3d7eff] to-[#0e2650] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a1a3a] dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16 px-6 bg-white/50 dark:bg-[#0e2650]/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-bold text-[#0a1a3a] dark:text-white mb-4">
                Statewide Coverage
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our attorneys are familiar with board members and court reporters 
                in all six Indiana Workers' Compensation Board districts.
              </p>
            </motion.div>
            <InteractiveMap />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="p-12 bg-gradient-to-br from-[#0e2650] to-[#3d7eff] rounded-2xl text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Protect Your Business?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our workers' compensation defense team is ready to help you navigate 
                complex claims and achieve favorable outcomes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-[#f3bd4f] text-[#0a1a3a] rounded-lg font-semibold hover:bg-[#f3bd4f]/90 transition-all shadow-lg hover:shadow-xl">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  Download Our Guide
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default WorkersCompensationPage;
