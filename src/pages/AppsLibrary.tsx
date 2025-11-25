import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/seo/SEOHead';

const AppsLibrary: React.FC = () => {
  const apps = [
    {
      id: 'campaign-performance',
      title: 'Campaign Performance Visualizer',
      description: '3D interactive dashboard with real-time campaign analytics and particle effects',
      link: '/apps/campaign-performance',
      icon: '📊',
      features: ['3D Charts', 'Particle Effects', 'Real-Time Data', 'Magnetic Interactions'],
      color: 'from-brand-teal to-brand-orange',
    },
    {
      id: 'competitor-intelligence',
      title: 'Competitor Intelligence Hub',
      description: 'Live competitor analysis with web scraping and visual insights',
      link: '/apps/competitor-intelligence',
      icon: '🔎',
      features: ['Live Scraping', '3D Comparison Cards', 'SEO Analysis', 'Side-by-Side Comparison'],
      color: 'from-brand-orange to-brand-teal',
    },
    {
      id: 'lead-score-lab',
      title: 'Lead Score Lab',
      description: 'Gamified CRM simulator - Define scoring rules and watch lead temperature rise',
      link: '/apps/lead-lab',
      icon: '🌡️',
      features: ['Configurable Scoring Rules', 'Activity Log', 'Thermometer Visualizer', 'MQL/SQL Badges'],
      color: 'from-brand-teal to-brand-orange',
    },
    {
      id: 'link-architect',
      title: 'Link Architect',
      description: 'Director-grade tracking URL builder with data governance enforcement',
      link: '/apps/link-architect',
      icon: '🔗',
      features: ['UTM Builder', 'Auto-Validation', 'Quick Presets', 'One-Click Copy'],
      color: 'from-brand-orange to-brand-teal',
    },
    {
      id: 'seo-scanner',
      title: 'SEO Scanner',
      description: 'Edge audit tool for technical SEO analysis and metadata extraction',
      link: '/apps/seo-scanner',
      icon: '🔍',
      features: ['Title Tag Analysis', 'Meta Description Check', 'H1 Tag Audit', 'Health Score'],
      color: 'from-brand-teal to-brand-orange',
    },
    {
      id: 'growth-engine',
      title: 'The Growth Engine',
      description: 'ROI modeling & quote generation tools for sales enablement',
      link: '/apps/growth-engine',
      icon: '📈',
      features: ['ROI Calculator', 'Smart Quoter', 'Live Calculations', 'Email Integration'],
      color: 'from-brand-orange to-brand-teal',
    },
    {
      id: 'license-hub',
      title: 'License Hub',
      description: '50-state compliance database for continuing education requirements',
      link: '/apps/license-hub',
      icon: '📋',
      features: ['PT/OT/DC/AT Requirements', 'State-by-State Data', 'Board Links', 'CEU Tracking'],
      color: 'from-brand-teal to-brand-orange',
    },
    {
      id: 'clinical-compass',
      title: 'Clinical Compass',
      description: 'Logic-based treatment protocols and clinical reasoning tool',
      link: '/apps/clinical-compass',
      icon: '🧭',
      features: ['Multi-Step Wizard', 'Protocol Generation', 'Instrument Selection', 'Treatment Plans'],
      color: 'from-brand-orange to-brand-teal',
    },
  ];

  return (
    <>
      <SEOHead
        title="The Lab | BearCave Marketing"
        description="Interactive tools built for scale and compliance. Modern React applications ported from legacy HTML."
        keywords="interactive tools, React applications, business software, portfolio showcase"
      />
      <div className="min-h-screen bg-brand-dark py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Marketing Operations Suite</h1>
            <p className="text-xl text-brand-muted mb-2">
              Interactive tools built to solve specific marketing problems.
            </p>
            <p className="text-brand-muted">
              CRM logic, Data Integrity, and Technical SEO skills demonstrated through real-world utilities.
            </p>
          </motion.div>

          {/* Apps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={app.link}>
                  <div className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-8 border-2 border-transparent hover:border-brand-teal/20 transition-all h-full flex flex-col">
                    {/* Icon */}
                    <div className="text-6xl mb-4">{app.icon}</div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-brand-dark mb-3 group-hover:text-brand-teal transition-colors">
                      {app.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 flex-grow">{app.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {app.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-brand-dark">
                          <span className="text-brand-teal">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-2 text-brand-teal font-semibold group-hover:gap-4 transition-all">
                        <span>Explore Tool</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-brand-muted text-sm">
              These tools demonstrate modern React development, state management, and business-grade
              software architecture.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AppsLibrary;

