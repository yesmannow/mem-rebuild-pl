import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, FileText, TrendingUp, Shield } from 'lucide-react';
import MarketTicker from '../../components/marketing/MarketTicker';

const BusinessLawPage: React.FC = () => {
  const services = [
    {
      icon: Briefcase,
      title: 'Corporate Governance',
      description: 'Board advisory, compliance, and shareholder agreements.',
    },
    {
      icon: FileText,
      title: 'Mergers & Acquisitions',
      description: 'Strategic guidance from due diligence through closing.',
    },
    {
      icon: TrendingUp,
      title: 'Business Formation',
      description: 'Entity selection, formation documents, and operating agreements.',
    },
    {
      icon: Shield,
      title: 'Contract Negotiation',
      description: 'Protecting your interests in commercial transactions.',
    },
  ];

  const stats = [
    { value: '$2.5B+', label: 'Transactions Closed' },
    { value: '500+', label: 'Business Clients' },
    { value: '40+', label: 'Years Experience' },
    { value: '15+', label: 'Industries Served' },
  ];

  return (
    <>
      <Helmet>
        <title>Business & Corporate Law | RBE Law</title>
        <meta
          name="description"
          content="Strategic business counsel for growing companies. M&A, corporate governance, and commercial transactions."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0a1a3a] dark:to-[#0e2650]">
        {/* Market Ticker */}
        <MarketTicker />

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
                <Briefcase className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0a1a3a] dark:text-white mb-6">
                Business & Corporate Law
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Strategic legal counsel for businesses at every stage—from startup 
                to exit and everything in between.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Stats Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white dark:bg-[#0e2650]/30 rounded-xl border border-gray-200 dark:border-[#3d7eff]/20 shadow-lg"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#3d7eff] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6 bg-white/50 dark:bg-[#0e2650]/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#0a1a3a] dark:text-white mb-4">
                Comprehensive Business Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                From formation to exit, we provide the legal infrastructure 
                your business needs to thrive.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white dark:bg-[#0e2650]/30 rounded-xl border border-gray-200 dark:border-[#3d7eff]/20 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3d7eff] to-[#0e2650] rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0a1a3a] dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
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
                Ready to Grow Your Business?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our business law team provides strategic counsel tailored to your 
                company's unique needs and growth trajectory.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-[#f3bd4f] text-[#0a1a3a] rounded-lg font-semibold hover:bg-[#f3bd4f]/90 transition-all shadow-lg hover:shadow-xl">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  View Our Services
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default BusinessLawPage;
