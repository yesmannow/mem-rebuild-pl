import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, TrendingUp } from 'lucide-react';
import './Experience.css';

const experience = [
  {
    period: '2010 - Present',
    role: 'Marketing Strategist & Systems Architect',
    company: 'Independent',
    impact: ['16+ years building marketing systems', '400+ automation flows deployed', '30K+ users served'],
  },
  {
    period: '2008 - 2010',
    role: 'Marketing Manager',
    company: 'Various Organizations',
    impact: ['Led cross-functional teams', 'Launched 20+ campaigns', 'Increased conversion rates by 40%'],
  },
];

const credentials = [
  'Marketing Automation Certified',
  'Google Analytics Certified',
  'HubSpot Certified',
  'Salesforce Certified',
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="experience__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Experience & Credentials</h2>
        <p className="section-subheading">
          A compact timeline of impact and continuous learning.
        </p>
      </motion.div>

      <div className="experience__content">
        {/* Timeline */}
        <motion.div
          className="experience__timeline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {experience.map((item, index) => (
            <motion.div
              key={index}
              className="experience__timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="experience__timeline-marker">
                <Briefcase size={20} />
              </div>
              <div className="experience__timeline-content">
                <div className="experience__period">{item.period}</div>
                <h3 className="experience__role">{item.role}</h3>
                <div className="experience__company">{item.company}</div>
                <div className="experience__impact">
                  {item.impact.map((impact, i) => (
                    <span key={i} className="chip">
                      {impact}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Credentials */}
        <motion.div
          className="experience__credentials"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="card">
            <div className="experience__credentials-header">
              <Award size={24} />
              <h3>Credentials</h3>
            </div>
            <div className="experience__credentials-list">
              {credentials.map((credential, index) => (
                <div key={index} className="experience__credential-item">
                  <TrendingUp size={16} />
                  <span>{credential}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

