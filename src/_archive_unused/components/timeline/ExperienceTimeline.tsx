import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../animations/ScrollReveal';

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  location?: string;
  achievements: Array<{
    metric: string;
    description: string;
  }>;
  tools: string[];
  responsibilities?: string[];
}

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  showDownloadCTA?: boolean;
  className?: string;
}

/**
 * ExperienceTimeline - Animated vertical timeline with scroll triggers
 * 
 * Features:
 * - Vertical timeline with alternating left/right layout
 * - Scroll-triggered animations
 * - Key wins with metrics
 * - Tools and responsibilities
 * - Visual markers with Ocean Pearl colors
 * - Download Resume CTA
 */
const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  showDownloadCTA = true,
  className = '',
}) => {
  return (
    <section className={`experience-timeline relative py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-lg md:text-xl text-[var(--parchment-050)]/80 max-w-2xl mx-auto">
            16+ years driving growth through marketing systems, automation, and strategic execution
          </p>
        </motion.div>

        {/* Download CTA - Top */}
        {showDownloadCTA && (
          <ScrollReveal>
            <div className="flex justify-center mb-12">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg hover:bg-[var(--signal-500)]/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>
            </div>
          </ScrollReveal>
        )}

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--telemetry-400)]/40 via-[var(--signal-500)]/40 to-[var(--telemetry-400)]/40 hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <ScrollReveal key={exp.id} direction={isLeft ? 'right' : 'left'}>
                  <div
                    className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                      isLeft ? '' : 'md:grid-flow-dense'
                    }`}
                  >
                    {/* Content Side */}
                    <div className={isLeft ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}>
                      <div
                        className={`bg-[var(--ink-700)]/30 backdrop-blur-sm rounded-lg p-6 border border-[var(--ink-700)]/60 ${
                          isLeft ? 'md:ml-0' : 'md:mr-0'
                        }`}
                      >
                        {/* Header */}
                        <div className="mb-4">
                          <h3 className="font-display text-2xl font-bold text-[var(--parchment-050)] mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-[var(--signal-500)] font-semibold mb-1">
                            {exp.company}
                          </p>
                          <div className="flex flex-wrap gap-2 text-sm text-[var(--parchment-050)]/70">
                            <span>{exp.period}</span>
                            {exp.location && (
                              <>
                                <span>•</span>
                                <span>{exp.location}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Key Wins */}
                        {exp.achievements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-[var(--telemetry-400)] uppercase tracking-wide mb-3">
                              Key Wins
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-[var(--signal-500)] mt-1 flex-shrink-0">▸</span>
                                  <span className="text-[var(--parchment-050)]/90">
                                    <strong className="text-[var(--signal-500)]">{achievement.metric}:</strong>{' '}
                                    {achievement.description}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tools */}
                        {exp.tools.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-[var(--telemetry-400)] uppercase tracking-wide mb-2">
                              Tools & Technologies
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tools.map((tool, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-[var(--ink-800)]/50 rounded-full text-xs text-[var(--parchment-050)]/90 border border-[var(--ink-600)]/40"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Responsibilities */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--telemetry-400)] uppercase tracking-wide mb-2">
                              Key Responsibilities
                            </h4>
                            <ul className="text-sm text-[var(--parchment-050)]/80 space-y-1">
                              {exp.responsibilities.map((resp, idx) => (
                                <li key={idx}>• {resp}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Marker - Center */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-8 hidden md:block">
                      <motion.div
                        className="relative"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-[var(--signal-500)] border-4 border-[var(--ink-900)] relative z-10" />
                        <div className="absolute inset-0 w-6 h-6 rounded-full bg-[var(--signal-500)]/30 animate-ping" />
                      </motion.div>
                    </div>

                    {/* Empty Side (for grid balance) */}
                    <div className={isLeft ? 'hidden md:block md:col-start-2' : 'hidden md:block'} />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Download CTA - Bottom */}
        {showDownloadCTA && (
          <ScrollReveal>
            <div className="flex justify-center mt-16">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ink-700)]/50 text-[var(--parchment-050)] font-semibold rounded-lg border border-[var(--ink-700)]/60 hover:bg-[var(--ink-700)]/70 transition-all duration-300"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Full Resume
              </a>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
