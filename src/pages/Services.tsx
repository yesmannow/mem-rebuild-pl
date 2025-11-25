import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Code, Palette, TrendingUp, DollarSign, Target, Zap, Database, Globe, Type, Image, Video } from 'lucide-react';
import SkillsRadar from '../components/ui/SkillsRadar';

const Services: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const directorServices = [
    {
      icon: Briefcase,
      title: 'Fractional CMO',
      description: 'Strategic leadership on-demand. I step into your organization to set vision, build roadmaps, and align teams around measurable outcomes.',
      details: [
        'Marketing strategy & planning',
        'Team leadership & development',
        'Budget allocation & ROI optimization',
        'Stakeholder communication',
      ],
    },
    {
      icon: TrendingUp,
      title: 'GTM Strategy',
      description: 'Go-to-market frameworks that connect product, sales, and marketing into a unified growth engine.',
      details: [
        'Market positioning & messaging',
        'Channel strategy & mix modeling',
        'Pricing & packaging strategy',
        'Launch planning & execution',
      ],
    },
    {
      icon: DollarSign,
      title: 'Budget & P&L Management',
      description: 'Financial discipline meets marketing performance. I build budgets that scale with results and prove ROI at every level.',
      details: [
        'Marketing budget planning',
        'Cost per acquisition modeling',
        'Revenue attribution & forecasting',
        'P&L optimization strategies',
      ],
    },
  ];

  const technologistServices = [
    {
      icon: Zap,
      title: 'Marketing Automation',
      description: 'Build workflows that run themselves—from lead capture to revenue attribution, without manual intervention.',
      details: [
        'CRM workflow design',
        'Email automation sequences',
        'Lead scoring & routing',
        'Multi-channel campaign orchestration',
      ],
    },
    {
      icon: Database,
      title: 'CRM Architecture',
      description: 'Design scalable marketing architectures that connect your tools, data, and teams into a unified system.',
      details: [
        'HubSpot, Salesforce, & custom CRM setup',
        'Data architecture & integration',
        'Sales & marketing alignment',
        'Pipeline management systems',
      ],
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Full-stack marketing sites built for conversion. I code the systems that capture leads and attribute revenue.',
      details: [
        'React, Next.js, & modern frameworks',
        'Conversion-optimized landing pages',
        'E-commerce & checkout flows',
        'Performance & SEO optimization',
      ],
    },
  ];

  const creativeServices = [
    {
      icon: Type,
      title: 'Brand Voice',
      description: 'Messaging frameworks that resonate. I craft the words that connect your brand to your audience and drive action.',
      details: [
        'Brand messaging & positioning',
        'Content strategy & frameworks',
        'Copywriting & storytelling',
        'Voice & tone guidelines',
      ],
    },
    {
      icon: Image,
      title: 'Content Engines',
      description: 'Systems that produce content at scale. From blog posts to social campaigns, I build the workflows that keep your brand visible.',
      details: [
        'Content planning & calendars',
        'SEO-optimized content creation',
        'Social media strategy',
        'Content distribution systems',
      ],
    },
    {
      icon: Video,
      title: 'Visual Design',
      description: 'Design systems that scale. I create the visual language that makes your brand instantly recognizable across all touchpoints.',
      details: [
        'Brand identity & guidelines',
        'Web & digital design',
        'Campaign creative direction',
        'Design system architecture',
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Services | BearCave Marketing</title>
        <meta
          name="description"
          content="Deployable marketing systems. Fractional CMO leadership, marketing automation, CRM architecture, and creative direction for growth-focused brands."
        />
        <meta
          name="keywords"
          content="fractional CMO, marketing automation, CRM architecture, GTM strategy, marketing systems, growth operations"
        />
      </Helmet>

      <div className="min-h-screen bg-brand-dark pt-24 pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-brand-text mb-6"
            >
              Deployable Marketing Systems
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed"
            >
              From strategic leadership to technical execution, I build marketing systems that compound value. Each capability is production-tested and ready to deploy.
            </motion.p>
          </div>
        </section>

        {/* Skills Radar - The "Unicorn" Visualization */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                The Hybrid Skillset
              </h2>
              <p className="text-lg text-brand-muted max-w-3xl mx-auto">
                This is why you're a "Unicorn" hire. Full-spectrum coverage across Strategy, Analytics, Engineering, Creative, Leadership, and Automation.
              </p>
            </motion.div>
            <SkillsRadar />
          </div>
        </section>

        {/* Section 1: Director Strategy */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Director Strategy
              </h2>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Strategic leadership that sets vision, aligns teams, and drives measurable growth.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {directorServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-8 hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-lg bg-brand-teal/20 flex items-center justify-center mb-6 group-hover:bg-brand-teal/30 transition-colors">
                        <Icon className="w-8 h-8 text-brand-teal" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-3">{service.title}</h3>
                      <p className="text-brand-muted mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-brand-muted">
                            <span className="text-brand-teal mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 2: Technologist Execution */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Technologist Execution
              </h2>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Technical systems that automate workflows, connect data, and scale operations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technologistServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-8 hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-lg bg-brand-teal/20 flex items-center justify-center mb-6 group-hover:bg-brand-teal/30 transition-colors">
                        <Icon className="w-8 h-8 text-brand-teal" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-3">{service.title}</h3>
                      <p className="text-brand-muted mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-brand-muted">
                            <span className="text-brand-teal mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3: Creative Direction */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
                Creative Direction
              </h2>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Brand voice, content systems, and visual design that connect audiences to outcomes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {creativeServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-8 hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl" />
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-lg bg-brand-teal/20 flex items-center justify-center mb-6 group-hover:bg-brand-teal/30 transition-colors">
                        <Icon className="w-8 h-8 text-brand-teal" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-text mb-3">{service.title}</h3>
                      <p className="text-brand-muted mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-brand-muted">
                            <span className="text-brand-teal mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Services;
