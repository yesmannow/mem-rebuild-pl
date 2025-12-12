/**
 * BusinessDevelopmentDemo.tsx
 * 
 * Demonstration page showcasing all three high-value Business Development components
 * for law firm presentations based on competitor research and 2025 corporate legal trends.
 * 
 * Components demonstrated:
 * 1. RepresentativeMattersGrid - Proof through wins for Fortune 100 clients
 * 2. IndustryHubLayout - Industry-specific microsites (Construction, Healthcare, Insurance)
 * 3. DEIStatsSection - DEI statistics for Fortune 500 RFPs
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { RepresentativeMattersGrid, DEIStatsSection, IndustryHubLayout } from '../components/business';
import { ChevronDown, ChevronUp } from 'lucide-react';

const BusinessDevelopmentDemo: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('matters');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('construction');

  const industries = [
    { slug: 'construction', name: 'Construction' },
    { slug: 'healthcare', name: 'Healthcare' },
    { slug: 'insurance', name: 'Insurance' },
    { slug: 'technology', name: 'Technology' },
    { slug: 'financial-services', name: 'Financial Services' },
    { slug: 'manufacturing', name: 'Manufacturing' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <>
      <Helmet>
        <title>Business Development Components Demo | Law Firm Showcase</title>
        <meta 
          name="description" 
          content="Demonstration of high-value law firm business development components: Representative Matters, Industry Hubs, and DEI Statistics." 
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-turquoise rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-creamsicle rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 bg-brand-turquoise/20 border border-brand-turquoise/30 rounded-full text-brand-turquoise text-sm font-semibold mb-6">
                Law Firm Business Development
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Modern Law Firm
                <span className="block text-brand-turquoise mt-2">Component Showcase</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8">
                Three production-ready components based on competitive research from 
                Barnes & Thornburg, Lewis Wagner, and 2025 corporate legal trends.
              </p>

              <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-turquoise" />
                  <span>Fortune 100 Client Proof</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-turquoise" />
                  <span>Industry Microsites</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-turquoise" />
                  <span>DEI Statistics</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Components Showcase */}
        <div className="max-w-7xl mx-auto px-4 pb-20 space-y-16">
          {/* Component 1: Representative Matters Grid */}
          <section className="space-y-6">
            <button
              onClick={() => toggleSection('matters')}
              className="w-full text-left"
              aria-expanded={expandedSection === 'matters'}
            >
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700/50 p-8 hover:border-brand-turquoise/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-brand-turquoise mb-2 uppercase tracking-wide">
                      Component #1
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      Representative Matters Grid
                    </h2>
                    <p className="text-lg text-slate-300 mb-4">
                      Showcase firm wins for Fortune 100 corporate clients with filterable masonry grid.
                      Demonstrates expertise through real results across practice areas.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Masonry Grid', 'Category Filters', 'Framer Motion', 'Responsive'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-full text-brand-turquoise text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedSection === 'matters' ? (
                      <ChevronUp className="w-6 h-6 text-brand-turquoise" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {expandedSection === 'matters' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-8"
              >
                <RepresentativeMattersGrid columns={3} />
              </motion.div>
            )}
          </section>

          {/* Component 2: Industry Hub Layout */}
          <section className="space-y-6">
            <button
              onClick={() => toggleSection('industry')}
              className="w-full text-left"
              aria-expanded={expandedSection === 'industry'}
            >
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700/50 p-8 hover:border-brand-turquoise/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-brand-turquoise mb-2 uppercase tracking-wide">
                      Component #2
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      Industry Hub Layout
                    </h2>
                    <p className="text-lg text-slate-300 mb-4">
                      Industry-specific microsites pulling related attorneys, news, and key contacts dynamically.
                      Perfect for Construction, Healthcare, Insurance, and other focused practice areas.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Dynamic Content', 'Related Attorneys', 'News Integration', 'Key Contact'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-full text-brand-turquoise text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedSection === 'industry' ? (
                      <ChevronUp className="w-6 h-6 text-brand-turquoise" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {expandedSection === 'industry' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-8 space-y-6"
              >
                {/* Industry Selector */}
                <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-700/50">
                  {industries.map((industry) => (
                    <button
                      key={industry.slug}
                      onClick={() => setSelectedIndustry(industry.slug)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedIndustry === industry.slug
                          ? 'bg-brand-turquoise text-slate-900'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {industry.name}
                    </button>
                  ))}
                </div>

                <IndustryHubLayout industrySlug={selectedIndustry} />
              </motion.div>
            )}
          </section>

          {/* Component 3: DEI Stats Section */}
          <section className="space-y-6">
            <button
              onClick={() => toggleSection('dei')}
              className="w-full text-left"
              aria-expanded={expandedSection === 'dei'}
            >
              <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700/50 p-8 hover:border-brand-turquoise/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-brand-turquoise mb-2 uppercase tracking-wide">
                      Component #3
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      DEI Statistics Section
                    </h2>
                    <p className="text-lg text-slate-300 mb-4">
                      Animated counters displaying firm statistics for Diversity, Experience, Culture, and Recognition.
                      Critical for Fortune 500 RFPs that mandate DEI standards.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Animated Counters', 'Scroll Trigger', 'WCAG Compliant', 'Fortune 500 RFPs'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-brand-turquoise/10 border border-brand-turquoise/30 rounded-full text-brand-turquoise text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedSection === 'dei' ? (
                      <ChevronUp className="w-6 h-6 text-brand-turquoise" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                </div>
              </div>
            </button>

            {expandedSection === 'dei' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/50 rounded-xl border border-slate-700/30 p-8"
              >
                <DEIStatsSection columns={4} />
              </motion.div>
            )}
          </section>
        </div>

        {/* Footer CTA */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <motion.div
            className="bg-gradient-to-br from-brand-turquoise/10 to-transparent border border-brand-turquoise/30 rounded-2xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Implement?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              These components are production-ready and follow best practices for modern law firm websites.
              Accessible, responsive, and optimized for Fortune 500 client presentations.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-brand-turquoise text-slate-900 font-bold rounded-lg hover:bg-brand-turquoise/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-slate-800 text-white font-bold rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download Code
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default BusinessDevelopmentDemo;
