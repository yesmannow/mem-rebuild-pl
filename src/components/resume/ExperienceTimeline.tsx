import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Calendar, MapPin, TrendingUp, Code, Zap, Target, Award } from 'lucide-react';
import { companyThemes, motionVariants, initNarrativeMotion, cleanupNarrativeMotion } from '../../utils/narrativeMotion';
import resumeData from '../../data/resume.json';
import './ExperienceTimeline.css';

interface ExperienceTimelineProps {
  className?: string;
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ className = '' }) => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initNarrativeMotion();
    return () => cleanupNarrativeMotion();
  }, []);

  // Map company names to theme keys
  const getCompanyTheme = (companyName: string) => {
    const name = companyName.toLowerCase();
    if (name.includes('graston')) return 'graston';
    if (name.includes('pike')) return 'pike';
    return 'early-career';
  };

  // Extract metrics from achievements
  const extractMetrics = (achievements: string[]) => {
    const metrics: Array<{value: string, label: string, icon: React.ReactNode}> = [];

    achievements.forEach(achievement => {
      // Look for percentage increases
      const percentMatch = achievement.match(/(\d+)%/);
      if (percentMatch) {
        metrics.push({
          value: `+${percentMatch[1]}%`,
          label: achievement.includes('traffic') ? 'Traffic Growth' :
                 achievement.includes('cost') ? 'Cost Reduction' : 'Performance',
          icon: <TrendingUp className="w-4 h-4" />
        });
      }

      // Look for dollar amounts
      const dollarMatch = achievement.match(/\$(\d+[KM]?\+?)/);
      if (dollarMatch) {
        metrics.push({
          value: `$${dollarMatch[1]}`,
          label: achievement.includes('budget') ? 'Budget Managed' : 'Revenue Impact',
          icon: <Target className="w-4 h-4" />
        });
      }

      // Look for large numbers
      const numberMatch = achievement.match(/(\d{2,}[KM]?\+?)/);
      if (numberMatch && !percentMatch && !dollarMatch) {
        metrics.push({
          value: numberMatch[1],
          label: achievement.includes('contact') ? 'Contacts' :
                 achievement.includes('visit') ? 'Patient Visits' :
                 achievement.includes('workflow') ? 'Automations' : 'Results',
          icon: <Zap className="w-4 h-4" />
        });
      }
    });

    return metrics.slice(0, 3); // Limit to 3 metrics per job
  };

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={motionVariants.sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Building2 className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A cinematic progression through strategic growth, technical innovation, and transformative leadership —
            building systems that scale and strategies that deliver measurable impact.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative experience-timeline-container">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

          {resumeData.experience.map((job, index) => {
            const theme = companyThemes[getCompanyTheme(job.company)];
            const metrics = extractMetrics(job.achievements);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`experience-section timeline-section relative mb-32 ${isEven ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'}`}
                data-theme={getCompanyTheme(job.company)}
                id={`experience-${index}`}
                variants={motionVariants.sectionReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 z-10">
                  {/* eslint-disable-next-line react/no-inline-styles */}
                  <motion.div
                    className={`timeline-dot w-6 h-6 rounded-full border-4 border-white shadow-lg`}
                    style={{ '--timeline-dot-color': theme.primary } as React.CSSProperties}
                    data-timeline-index={index}
                    variants={motionVariants.timelineDot}
                    whileHover="active"
                  />
                </div>

                {/* Experience Card */}
                <motion.div
                  className={`relative ${isEven ? 'lg:mr-12' : 'lg:ml-12'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background with Company Theme */}
                  <div
                    className={`absolute inset-0 rounded-3xl opacity-10 bg-gradient-to-br ${theme.bgGradient}`}
                  />

                  {/* Main Content */}
                  <div className="relative bg-black/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12 hover:border-white/20 transition-all duration-500">

                    {/* Job Header */}
                    <div className="mb-8">
                      <motion.div
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">{job.role}</h3>
                          {/* eslint-disable-next-line react/no-inline-styles */}
                          <div className="flex items-center gap-3 text-xl font-semibold mb-3" style={{ '--company-primary-color': theme.primary } as React.CSSProperties}>
                            <Building2 className="w-5 h-5 company-icon" />
                            <span className="company-name">{job.company}</span>
                          </div>
                        </div>

                        <div className="text-gray-400 text-right">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{job.dates}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Job Summary */}
                      <motion.p
                        className="text-lg text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {job.summary}
                      </motion.p>
                    </div>

                    {/* Metrics Grid */}
                    {metrics.length > 0 && (
                      <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                        variants={motionVariants.staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {metrics.map((metric, idx) => (
                          /* eslint-disable-next-line react/no-inline-styles */
                          <motion.div
                            key={idx}
                            className="text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors duration-300"
                            variants={motionVariants.counterReveal}
                            whileHover={{ scale: 1.05, y: -5 }}
                            style={{ '--metric-accent-color': theme.accent, '--metric-primary-color': theme.primary } as React.CSSProperties}
                          >
                            <div className="flex items-center justify-center mb-3 metric-icon-container">
                              {metric.icon}
                            </div>
                            <div
                              className="metric-counter text-3xl font-bold mb-2 metric-value"
                              data-target={metric.value.replace(/[^\d]/g, '')}
                              data-suffix={metric.value.replace(/[\d]/g, '')}
                            >
                              {metric.value}
                            </div>
                            <p className="text-sm text-gray-400">{metric.label}</p>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {/* Achievements */}
                    <motion.div
                      className="mb-8"
                      variants={motionVariants.staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {/* eslint-disable-next-line react/no-inline-styles */}
                      <h4 className="text-lg font-semibold mb-6 flex items-center gap-3 achievement-heading" style={{ '--achievement-primary-color': theme.primary } as React.CSSProperties}>
                        <Award className="w-5 h-5" />
                        <span>Key Achievements</span>
                      </h4>

                      <div className="space-y-4">
                        {job.achievements.map((achievement, idx) => (
                          /* eslint-disable-next-line react/no-inline-styles */
                          <motion.div
                            key={idx}
                            className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors duration-300"
                            variants={motionVariants.staggerItem}
                            style={{ '--achievement-accent-color': theme.accent } as React.CSSProperties}
                          >
                            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 achievement-dot" />
                            <span className="text-gray-300 leading-relaxed">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    {job.technologies && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        {/* eslint-disable-next-line react/no-inline-styles */}
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-3 technologies-heading" style={{ '--technologies-primary-color': theme.primary } as React.CSSProperties}>
                          <Code className="w-5 h-5" />
                          <span>Technologies Used</span>
                        </h4>

                        <div className="flex flex-wrap gap-3">
                          {job.technologies.map((tech, idx) => (
                            /* eslint-disable-next-line react/no-inline-styles */
                            <motion.span
                              key={tech}
                              className="px-4 py-2 border rounded-full text-sm hover:scale-105 transition-transform duration-200 technology-badge"
                              style={{
                                '--technology-border-color': `${theme.primary}30`,
                                '--technology-bg-color': `${theme.primary}10`,
                                '--technology-text-color': theme.accent
                              } as React.CSSProperties}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + (idx * 0.05) }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
