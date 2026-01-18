import React from 'react';
import { motion } from 'framer-motion';
import { Zap, FileText, TrendingUp, ArrowRight } from 'lucide-react';

interface ServiceModule {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const modules: ServiceModule[] = [
  {
    id: 'growthos',
    name: 'GrowthOS',
    tagline: 'CRM & Automation Architecture',
    description:
      'Complete marketing automation infrastructure. From CRM setup to workflow design, GrowthOS delivers scalable systems that run on autopilot.',
    icon: <Zap size={32} />,
    features: [
      'HubSpot/Salesforce Architecture',
      '400+ Automation Workflows',
      'Lead Scoring & Routing',
      'Revenue Attribution',
    ],
    color: 'brand-teal',
  },
  {
    id: 'content-api',
    name: 'Content_API',
    tagline: 'SEO & Content Systems',
    description:
      'Content production at scale. SEO-optimized content engines that rank, convert, and compound traffic over time.',
    icon: <FileText size={32} />,
    features: [
      'SEO Strategy & Implementation',
      'Content Calendar Systems',
      'Keyword Research & Optimization',
      'Performance Analytics',
    ],
    color: 'brand-orange',
  },
  {
    id: 'revops-engine',
    name: 'RevOps Engine',
    tagline: 'Analytics & Attribution',
    description:
      'Data-driven revenue operations. Custom analytics dashboards, attribution modeling, and performance tracking that connects marketing to revenue.',
    icon: <TrendingUp size={32} />,
    features: [
      'Custom Analytics Dashboards',
      'Multi-Touch Attribution',
      'ROI Tracking & Reporting',
      'Predictive Modeling',
    ],
    color: 'brand-teal',
  },
];

const ServiceModules: React.FC = () => {
  return (
    <div className="service-modules py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
          Productized Services
        </h2>
        <p className="text-lg text-brand-muted max-w-3xl mx-auto">
          Ready-to-deploy marketing systems. Each module is production-tested and designed to scale
          with your business.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Software Box Card */}
            <div className="relative h-full bg-brand-surface/50 border-2 border-brand-teal/20 rounded-2xl p-8 hover:border-brand-teal/50 transition-all duration-300 overflow-hidden">
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  module.color === 'brand-teal'
                    ? 'bg-gradient-to-br from-brand-teal/0 via-brand-teal/5 to-brand-teal/10'
                    : 'bg-gradient-to-br from-brand-orange/0 via-brand-orange/5 to-brand-orange/10'
                }`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl flex items-center justify-center transition-colors ${
                      module.color === 'brand-teal'
                        ? 'bg-brand-teal/20 text-brand-teal group-hover:bg-brand-teal/30'
                        : 'bg-brand-orange/20 text-brand-orange group-hover:bg-brand-orange/30'
                    }`}
                  >
                    {module.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-text mb-1">{module.name}</h3>
                    <p className="text-sm text-brand-muted font-medium">{module.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-muted mb-6 leading-relaxed">{module.description}</p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {module.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span
                        className={`mt-1 ${
                          module.color === 'brand-teal' ? 'text-brand-teal' : 'text-brand-orange'
                        }`}
                      >
                        ▸
                      </span>
                      <span className="text-brand-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-2 font-semibold text-sm group/btn ${
                    module.color === 'brand-teal' ? 'text-brand-teal' : 'text-brand-orange'
                  }`}
                >
                  <span>Learn More</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </motion.button>
              </div>

              {/* Decorative Corner */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity ${
                  module.color === 'brand-teal' ? 'bg-brand-teal/5' : 'bg-brand-orange/5'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-brand-muted mb-4">
          Need a custom solution? Let&apos;s build something specific to your needs.
        </p>
        <a
          href="mailto:hoosierdarling@gmail.com"
          className="inline-flex items-center gap-2 bg-brand-teal text-brand-dark px-6 py-3 rounded-lg font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(64,224,208,0.3)] hover:shadow-[0_0_25px_rgba(64,224,208,0.5)]"
        >
          Start a Conversation
          <ArrowRight size={20} />
        </a>
      </motion.div>
    </div>
  );
};

export default ServiceModules;
