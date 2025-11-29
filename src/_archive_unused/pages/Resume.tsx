import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Download,
  ExternalLink,
  ArrowRight,
  Building2,
  MapPin,
  Cpu,
  BarChart,
  Cloud,
  Palette,
} from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import TechProfile from '../components/TechProfile';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { resume as resumeData } from '../data/resume';

const skills = [
  {
    title: 'Automation & Systems',
    icon: Cpu,
    items: ['400+ automations built', 'Lifecycle orchestration', 'AI copilots & assistants'],
  },
  {
    title: 'Analytics & Growth',
    icon: BarChart,
    items: ['Attribution & dashboards', 'CRO & funnel testing', 'Campaign performance tuning'],
  },
  {
    title: 'Web & Cloud',
    icon: Cloud,
    items: ['WordPress + React builds', 'Cloudflare edge security', 'Serverless & API design'],
  },
  {
    title: 'Creative & UX',
    icon: Palette,
    items: ['Brand storytelling', 'Interactive UX flows', 'Content & SEO systems'],
  },
];

const Resume: React.FC = () => {
  const handleDownloadPDF = () => {
    window.open('/resume.pdf', '_blank');
  };

  const headlineMetrics = [
    { label: 'Years Experience', value: '15+' },
    { label: 'Users Served', value: '30K+' },
    { label: 'Automations', value: '400+' },
    { label: 'Support Tickets Reduced', value: '-70%' },
  ];

  return (
    <>
      <Helmet>
        <title>Jacob Darling - Cinematic Resume | BearCave Marketing</title>
        <meta
          name="description"
          content="Dual-Threat Marketing Director & Systems Architect. Cinematic, interactive career timeline for Jacob Darling."
        />
      </Helmet>

      <OceanAuroraBackground>
        <main className="min-h-screen relative z-10">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <TechProfile size="lg" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-brand-text mb-3"
            >
              {resumeData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-xl md:text-2xl text-brand-muted max-w-3xl"
            >
              {resumeData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-5xl"
            >
              {headlineMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-brand-surface/60 border border-brand-teal/20 rounded-2xl px-4 py-6 backdrop-blur-md shadow-soft-dark"
                >
                  <div className="text-3xl font-bold text-brand-teal mb-1">
                    <OceanCountingNumber to={parseFloat(metric.value)} suffix={metric.value.replace(/[0-9.-]/g, '')} />
                  </div>
                  <div className="text-sm uppercase tracking-[0.2em] text-brand-muted">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* Cinematic Career Timeline */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Cinematic Career Timeline</h2>
              <p className="text-brand-muted mt-3">Interactive journey — tap a role to expand impact metrics.</p>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-teal/0 via-brand-teal/70 to-brand-teal/0" />
              <div className="space-y-12">
                {resumeData.experience.map((exp, index) => {
                  const isLeft = index % 2 === 0;
                  const Icon = Building2;
                  const alignmentClasses = isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left';
                  const cardOffset = isLeft ? 'md:ml-0 md:mr-12' : 'md:mr-0 md:ml-12';
                  const connectorStyle = isLeft ? { right: '-34px' } : { left: '-34px' };
                  return (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className={`relative flex flex-col md:flex-row ${
                        isLeft ? 'md:justify-start' : 'md:justify-end'
                      }`}
                    >
                      <div className={`md:w-1/2 ${alignmentClasses}`}>
                        <div
                          className={`relative bg-brand-surface/60 border border-brand-teal/25 rounded-2xl p-6 shadow-soft-dark backdrop-blur-md ${cardOffset}`}
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center">
                              <Icon className="text-brand-teal" size={22} />
                            </div>
                            <div className="text-left">
                              <div className="text-xs uppercase tracking-[0.2em] text-brand-muted">{exp.dates}</div>
                              <h3 className="text-2xl font-bold text-brand-text">{exp.role}</h3>
                              <div className="text-brand-teal font-semibold">{exp.company}</div>
                              {exp.location && (
                                <div className="text-brand-muted text-sm flex items-center gap-1">
                                  <MapPin size={14} /> {exp.location}
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-brand-muted leading-relaxed mb-4">{exp.summary}</p>

                          <details className="achievements-details group">
                            <summary className="achievements-summary flex items-center gap-2">
                              Impact Metrics
                            </summary>
                            <ul className="achievements-list list-disc pl-5">
                              {exp.metrics.map((metric) => (
                                <li key={`${exp.company}-${metric.label}`}>
                                  <strong className="text-brand-text">{metric.value}</strong> — {metric.label}
                                </li>
                              ))}
                            </ul>
                          </details>

                          <div className="mt-4">
                            <div className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-2">Tech</div>
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="px-3 py-1 rounded-full text-xs bg-brand-teal/10 text-brand-text border border-brand-teal/20"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {exp.link && (
                            <div className="mt-4">
                              <Link
                                to={exp.link}
                                className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-light transition"
                              >
                                View related case study
                                <ExternalLink size={16} />
                              </Link>
                            </div>
                          )}

                          <span
                            className="hidden md:block absolute top-6 w-4 h-4 rounded-full bg-brand-teal shadow-lg shadow-brand-teal/40"
                            style={connectorStyle}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Skills */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Skills Snapshot</h2>
              <p className="text-brand-muted mt-3">Icon-driven view of the hybrid toolkit.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-brand-surface/60 border border-brand-teal/20 rounded-2xl p-6 backdrop-blur-md shadow-soft-dark"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-teal/10 border border-brand-teal/30 flex items-center justify-center">
                        <Icon className="text-brand-teal" size={20} />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-text">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-full text-xs bg-brand-teal/10 text-brand-text border border-brand-teal/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Education */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text">Education</h2>
            </div>
            <div className="space-y-6">
              {resumeData.education.map((edu) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-brand-surface/60 border border-brand-teal/20 rounded-2xl p-6 backdrop-blur-md shadow-soft-dark"
                >
                  <h3 className="text-xl font-bold text-brand-text">{edu.institution}</h3>
                  <p className="text-brand-teal font-semibold">{edu.degree}</p>
                  <p className="text-brand-muted text-sm">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-brand-surface/50 border border-brand-teal/20 rounded-2xl p-12 text-center backdrop-blur-sm"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">Let's Build Your Growth Engine</h2>
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
