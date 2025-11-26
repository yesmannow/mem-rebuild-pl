import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Download, ExternalLink, ArrowRight } from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import TechProfile from '../components/TechProfile';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import SkillsRadar from '../components/ui/SkillsRadar';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import InteractiveSkillMatrix from '../components/ui/InteractiveSkillMatrix';
import AchievementUnlocks from '../components/ui/AchievementUnlocks';
import LiveMetricsDashboard from '../components/ui/LiveMetricsDashboard';

// Resume data structure
interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  summary: string;
  achievements: string[];
  relatedCaseStudyId?: string;
}

const experience: ExperienceItem[] = [
  {
    company: 'Graston Technique®',
    role: 'Marketing Director & System Architect',
    dates: '2023 – Present',
    location: 'Indianapolis, IN',
    summary:
      'Full-stack marketing leadership. Led a complete digital transformation, reducing support tickets by 70% via AI and increasing conversions by 40% through checkout innovation.',
    achievements: [
      'Reduced support tickets 70% via AI-powered assistant',
      'Built 400+ CRM automations connecting LearnDash, WooCommerce, and FluentCRM',
      'Architected provider directory with automated onboarding and revenue engine',
      'Optimized site performance with Cloudflare, LiteSpeed, and server-level tuning',
    ],
    relatedCaseStudyId: 'the-launchpad',
  },
  {
    company: 'Ultimate Technologies Group',
    role: 'Interim Director of Marketing',
    dates: '2023',
    location: 'Fishers, IN',
    summary:
      'Stabilized operations during transition. Streamlined lead generation workflows resulting in a 40% improvement in campaign production timelines.',
    achievements: [
      'Stabilized marketing operations during organizational transition',
      '40% faster campaign production through workflow optimization',
      'Improved Google Ads performance and lead quality',
      'Maintained brand consistency across all channels',
    ],
    relatedCaseStudyId: 'the-compass',
  },
  {
    company: 'Riley Bennett Egloff, LLP',
    role: 'Marketing Manager',
    dates: '2015 – 2023',
    location: 'Indianapolis, IN',
    summary:
      'Managed digital rebrand and SEO overhaul leading to a 35% increase in qualified client inquiries.',
    achievements: [
      '35% increase in qualified inquiries via SEO overhaul',
      'Led complete digital rebrand and website redesign',
      'Implemented marketing automation and CRM integration',
      'Managed content strategy and social media presence',
    ],
    relatedCaseStudyId: 'the-fortress',
  },
];

const education = [
  {
    degree: 'B.S. Business Administration',
    institution: 'Indiana University',
    year: '2009',
  },
];

const Resume: React.FC = () => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    // Open PDF in new tab or trigger download
    window.open('/resume.pdf', '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Jacob Darling - Resume | BearCave Marketing</title>
        <meta
          name="description"
          content="Marketing Director & System Architect with 15+ years of experience building revenue-driving marketing infrastructure."
        />
      </Helmet>

      <OceanAuroraBackground>
        <main className="min-h-screen relative z-10">
          {/* Holographic Header */}
          <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-12 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <TechProfile size="lg" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-brand-text text-center mb-4"
            >
              Jacob Darling
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-brand-muted text-center mb-12"
            >
              Marketing Director & System Architect
            </motion.p>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-teal mb-2">
                  <AnimatedCounter to={15} suffix="+" />
                </div>
                <div className="text-sm text-brand-muted uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-teal mb-2">
                  <AnimatedCounter to={30} suffix="k+" />
                </div>
                <div className="text-sm text-brand-muted uppercase tracking-wide">Users Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-brand-teal mb-2">
                  <AnimatedCounter to={400} suffix="+" />
                </div>
                <div className="text-sm text-brand-muted uppercase tracking-wide">Automations</div>
              </div>
            </motion.div>
          </section>

          {/* Evidence-Based Timeline */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-brand-text mb-12 text-center"
            >
              Career Journey
            </motion.h2>

            <div className="space-y-12 border-l-2 border-brand-teal/20 pl-8 ml-4">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                  onMouseEnter={() => setHoveredRole(exp.company)}
                  onMouseLeave={() => setHoveredRole(null)}
                >
                  {/* Timeline dot */}
                  <motion.span
                    className={`absolute -left-[41px] top-2 w-5 h-5 rounded-full border-4 border-brand-dark ${
                      index === 0 ? 'bg-brand-teal' : 'bg-brand-surface'
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                  />

                  <motion.div
                    className={`bg-brand-surface/50 border border-brand-teal/20 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${
                      hoveredRole === exp.company ? 'scale-105 border-brand-teal/40 shadow-lg' : ''
                    }`}
                  >
                    <div className="mb-4">
                      <div className="font-mono text-sm text-brand-teal mb-2">{exp.dates}</div>
                      <h3 className="text-2xl font-bold text-brand-text mb-1">{exp.role}</h3>
                      <div className="text-lg font-medium text-brand-orange mb-2">{exp.company}</div>
                      <div className="text-sm text-brand-muted">{exp.location}</div>
                    </div>

                    <p className="text-brand-muted mb-4">{exp.summary}</p>

                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, idx) => {
                        // Check if achievement mentions a case study
                        const hasCaseStudy = exp.relatedCaseStudyId && idx === 0;

                        return (
                          <li key={idx} className="text-brand-muted flex items-start gap-2">
                            <span className="text-brand-teal mt-1">▸</span>
                            <span>
                              {achievement}
                              {hasCaseStudy && (
                                <Link
                                  to={`/case-studies/${exp.relatedCaseStudyId}`}
                                  className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-brand-teal/10 border border-brand-teal/30 rounded text-brand-teal text-xs font-medium hover:bg-brand-teal/20 transition-all"
                                >
                                  View Proof
                                  <ExternalLink size={12} />
                                </Link>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Visualization */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">
                  Hybrid Skillset
                </h2>
                <p className="text-brand-muted text-lg mb-6">
                  The radar chart below visualizes my unique combination of strategic CMO-level thinking
                  and hands-on technical execution. This hybrid approach is what makes me a "Unicorn"
                  hire—able to bridge the gap between creative vision and technical implementation.
                </p>
                <p className="text-brand-muted">
                  Unlike traditional marketers who rely on agencies, or developers who lack business
                  acumen, I operate across all six dimensions: Strategy, Analytics, Engineering,
                  Creative, Leadership, and Automation.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SkillsRadar showLegend={true} showTooltip={true} />
              </motion.div>
            </div>

            {/* Interactive Skill Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              <InteractiveSkillMatrix />
            </motion.div>

            {/* Achievement Unlocks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-24"
            >
              <AchievementUnlocks />
            </motion.div>

            {/* Live Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <LiveMetricsDashboard />
            </motion.div>
          </section>

          {/* Education */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-brand-text mb-12 text-center"
            >
              Education
            </motion.h2>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-brand-surface/50 border border-brand-teal/20 rounded-xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-bold text-brand-text mb-2">{edu.degree}</h3>
                  <div className="text-brand-orange font-medium mb-1">{edu.institution}</div>
                  <div className="text-brand-muted">{edu.year}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-surface/50 border border-brand-teal/20 rounded-2xl p-12 text-center backdrop-blur-sm"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
                Let's Build Your Growth Engine
              </h2>
              <p className="text-brand-muted text-lg mb-8">
                Ready to transform your marketing systems? Let's discuss how I can help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-brand-teal text-brand-dark font-semibold rounded-lg hover:bg-brand-teal/90 transition-all flex items-center gap-2"
                >
                  Start a Conversation
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/case-studies"
                  className="px-6 py-3 bg-brand-surface border border-brand-teal/30 text-brand-text font-semibold rounded-lg hover:border-brand-teal/50 transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
          </section>
        </main>

        {/* Floating Download PDF Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={handleDownloadPDF}
          className="fixed bottom-8 right-8 z-50 p-4 bg-brand-teal text-brand-dark rounded-full shadow-lg hover:bg-brand-teal/90 transition-all flex items-center gap-2 group"
          aria-label="Download PDF Resume"
        >
          <Download size={24} />
          <span className="hidden md:block font-semibold">Download PDF</span>
        </motion.button>
      </OceanAuroraBackground>
    </>
  );
};

export default Resume;
