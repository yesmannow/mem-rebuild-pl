import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import HeroIntro from '../components/resume/HeroIntro';
import Section from '../components/resume/Section';
import CTAButtons from '../components/resume/CTAButtons';
import { MapPin, Calendar, Building, Award, Code, Users, Briefcase } from 'lucide-react';

export default function CinematicResume() {
  const { name, title, summary, experience, skills, tools, education, contact } = resumeData;

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <HeroIntro />

      {/* Main Content */}
      <div className="relative px-6 py-20 max-w-7xl mx-auto">
        {/* Professional Summary */}
        <Section title="Professional Summary" gradient="blue" delay={0.1}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">{summary}</p>

            {/* Bio Photo Integration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse" />
                <img
                  src="/images/bio/bio-photo.jpg"
                  alt="Jacob Darling"
                  className="relative w-48 h-48 rounded-full border-4 border-white/20 shadow-2xl object-cover"
                />
              </div>
            </motion.div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <MapPin size={16} />
                <span>{contact.location}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <Building size={16} />
                <span>Marketing Director</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <Award size={16} />
                <span>15+ Years Experience</span>
              </motion.div>
            </div>
          </motion.div>
        </Section>

        {/* CTA Buttons */}
        <CTAButtons />

        {/* Professional Experience */}
        <Section
          title="Professional Experience"
          subtitle="Building systems that scale and strategies that deliver"
          gradient="purple"
          delay={0.2}
        >
          <div className="space-y-8">
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-gradient-to-b from-purple-500 to-pink-500"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />

                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                      <div className="flex items-center gap-2 text-purple-400 font-semibold">
                        <Building size={16} />
                        <span>{job.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mt-2 md:mt-0">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{job.dates}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{job.summary}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Award size={16} />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx}>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                            className="flex items-start gap-3 text-gray-300 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{achievement}</span>
                          </motion.div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  {job.technologies && (
                    <div>
                      <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                        <Code size={16} />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, idx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.02 }}
                            className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills & Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Skills */}
          <Section title="Core Skills" gradient="cyan" delay={0.3}>
            <div className="grid grid-cols-1 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors duration-300"
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Technologies & Tools */}
          <Section title="Technologies & Tools" gradient="pink" delay={0.4}>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg text-center hover:bg-pink-500/20 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-sm text-gray-300">{tool}</span>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        {/* Education */}
        <Section title="Education" gradient="blue" delay={0.5}>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
            >
              <h3 className="text-xl font-bold text-blue-400 mb-2">{edu.degree}</h3>
              <p className="text-lg text-gray-300 mb-2">{edu.institution}</p>
              <p className="text-gray-400 mb-3">{edu.year}</p>
              {edu.details && <p className="text-sm text-gray-400 italic">{edu.details}</p>}
            </motion.div>
          ))}
        </Section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center py-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how my expertise in marketing strategy, system architecture, and technical
            leadership can drive your next project forward.
          </p>
          <CTAButtons />
        </motion.div>
      </div>
    </main>
  );
}
