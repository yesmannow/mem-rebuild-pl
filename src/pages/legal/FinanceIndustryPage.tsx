import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building2, DollarSign, FileCheck, Users } from 'lucide-react';
import MarketTicker from '../../components/marketing/MarketTicker';

const FinanceIndustryPage: React.FC = () => {
  const services = [
    {
      icon: Building2,
      title: 'Bank Regulatory',
      description: 'Compliance, examinations, and enforcement defense for financial institutions.',
    },
    {
      icon: DollarSign,
      title: 'Securities Compliance',
      description: 'Investment adviser registration, custody rules, and SEC examinations.',
    },
    {
      icon: FileCheck,
      title: 'Fintech Partnerships',
      description: 'Structuring compliant bank-fintech relationships and BaaS arrangements.',
    },
    {
      icon: Users,
      title: 'M&A Advisory',
      description: 'Bank mergers, acquisitions, and regulatory approval processes.',
    },
  ];

  const industries = [
    'Community Banks',
    'Credit Unions',
    'Investment Advisers',
    'Broker-Dealers',
    'Fintech Companies',
    'Payment Processors',
    'Insurance Companies',
    'Private Equity Funds',
  ];

  return (
    <>
      <Helmet>
        <title>Financial Services Law | RBE Law</title>
        <meta
          name="description"
          content="Regulatory compliance and strategic counsel for banks, investment advisers, and fintech companies."
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
                <Building2 className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#0a1a3a] dark:text-white mb-6">
                Financial Services Law
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Navigate complex regulations with confidence. Expert counsel for banks, 
                investment advisers, and financial technology companies.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#0a1a3a] dark:text-white mb-4">
                Regulatory Expertise
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Deep knowledge of federal and state banking, securities, and 
                consumer financial protection laws.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white/5 backdrop-blur-xl dark:bg-[#0e2650]/30 rounded-xl border border-white/10 dark:border-[#3d7eff]/20 shadow-lg hover:shadow-xl transition-all"
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

        {/* Industries Served */}
        <section className="py-16 px-6 bg-white/50 dark:bg-[#0e2650]/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#0a1a3a] dark:text-white mb-4">
                Industries We Serve
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Specialized counsel for all sectors of the financial services industry
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-white/5 backdrop-blur-xl dark:bg-[#0e2650]/30 rounded-xl border border-white/10 dark:border-[#3d7eff]/20 text-center"
                >
                  <p className="text-sm font-medium text-[#0a1a3a] dark:text-white">
                    {industry}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-12 bg-gradient-to-br from-[#3d7eff]/10 to-[#f3bd4f]/10 rounded-2xl border border-[#3d7eff]/20">
              <blockquote className="text-2xl font-medium text-[#0a1a3a] dark:text-white text-center mb-6">
                "In an era of rapid regulatory change, RBE Law provides the strategic 
                guidance we need to stay compliant while pursuing growth opportunities."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-[#3d7eff]">Sarah Johnson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">CEO, Regional Bank</p>
              </div>
            </div>
          </motion.div>
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
                Navigate Regulatory Complexity
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Our financial services team combines deep regulatory knowledge with 
                practical business sense to help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-4 bg-[#f3bd4f] text-[#0a1a3a] rounded-lg font-semibold hover:bg-[#f3bd4f]/90 transition-all shadow-lg hover:shadow-xl">
                  Schedule Consultation
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20">
                  Download Compliance Guide
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default FinanceIndustryPage;
