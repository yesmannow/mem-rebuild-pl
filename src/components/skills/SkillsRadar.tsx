import React from 'react';
import { motion } from 'framer-motion';
import './SkillsRadar.css';

interface SkillCategory {
  name: string;
  shortName: string;
  level: number;
  description: string;
  icon: string;
  color: string;
}

const skillsData: SkillCategory[] = [
  {
    name: 'Marketing Strategy',
    shortName: 'Strategy',
    level: 94,
    description: 'Technical marketing strategy & systems thinking',
    icon: '🎯',
    color: '#84cc16',
  },
  {
    name: 'Performance Optimization',
    shortName: 'Performance',
    level: 95,
    description: 'Site speed optimization & Core Web Vitals',
    icon: '⚡',
    color: '#3b82f6',
  },
  {
    name: 'Security & Infrastructure',
    shortName: 'Security',
    level: 90,
    description: 'Infrastructure security & WAF implementation',
    icon: '🛡️',
    color: '#10b981',
  },
  {
    name: 'Analytics & Tracking',
    shortName: 'Analytics',
    level: 88,
    description: 'GA4, GTM & conversion tracking',
    icon: '📊',
    color: '#f59e0b',
  },
  {
    name: 'Server Administration',
    shortName: 'Server Admin',
    level: 85,
    description: 'Linux, Apache, PHP & MySQL management',
    icon: '🖥️',
    color: '#ef4444',
  },
  {
    name: 'Development',
    shortName: 'Development',
    level: 82,
    description: 'PHP, JavaScript & WordPress development',
    icon: '💻',
    color: '#8b5cf6',
  },
  {
    name: 'Database Management',
    shortName: 'Database',
    level: 80,
    description: 'SQL optimization & database design',
    icon: '💾',
    color: '#06b6d4',
  },
  {
    name: 'Marketing Technology',
    shortName: 'Marketing Tech',
    level: 92,
    description: 'CRM automation & ad platform integration',
    icon: '🔄',
    color: '#ec4899',
  },
];

const SkillsRadar: React.FC = () => {
  return (
    <section className="skills-radar-section">
      <div className="skills-radar-content">
        <div className="section-intro">
          <h2>Skill Proficiency Overview</h2>
          <p>A comprehensive view of my technical and strategic capabilities</p>
        </div>

        <div className="skills-visualization">
          {/* Radar Chart Representation */}
          <div className="radar-container">
            <div className="radar-chart">
              {/* Concentric circles */}
              <div className="radar-grid">
                <div className="radar-circle" style={{ width: '20%', height: '20%' }}></div>
                <div className="radar-circle" style={{ width: '40%', height: '40%' }}></div>
                <div className="radar-circle" style={{ width: '60%', height: '60%' }}></div>
                <div className="radar-circle" style={{ width: '80%', height: '80%' }}></div>
                <div className="radar-circle" style={{ width: '100%', height: '100%' }}></div>
              </div>

              {/* Axis lines */}
              <div className="radar-axes">
                {skillsData.map((_, index) => {
                  const angle = (index * 360) / skillsData.length;
                  return (
                    <div
                      key={index}
                      className="radar-axis"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    ></div>
                  );
                })}
              </div>

              {/* Data points */}
              <svg className="radar-svg" viewBox="0 0 200 200">
                <polygon
                  className="radar-polygon"
                  points={skillsData
                    .map((skill, index) => {
                      const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2;
                      const radius = (skill.level / 100) * 85;
                      const x = 100 + radius * Math.cos(angle);
                      const y = 100 + radius * Math.sin(angle);
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {skillsData.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / skillsData.length - Math.PI / 2;
                  const radius = (skill.level / 100) * 85;
                  const x = 100 + radius * Math.cos(angle);
                  const y = 100 + radius * Math.sin(angle);
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      className="radar-point"
                      style={{ fill: skill.color }}
                    />
                  );
                })}
              </svg>

              {/* Labels */}
              <div className="radar-labels">
                {skillsData.map((skill, index) => {
                  const angle = (index * 360) / skillsData.length;
                  const radian = ((angle - 90) * Math.PI) / 180;
                  const x = 50 + 55 * Math.cos(radian);
                  const y = 50 + 55 * Math.sin(radian);

                  return (
                    <div
                      key={index}
                      className="radar-label"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      <span className="label-icon">{skill.icon}</span>
                      <span className="label-text">{skill.shortName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Skill Cards with Progress Bars */}
          <div className="skills-list">
            <h4>Skill Categories</h4>
            <div className="skills-cards">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ translateX: 5 }}
                >
                  <div className="skill-card-content">
                    <div
                      className="skill-icon"
                      style={{
                        backgroundColor: `${skill.color}20`,
                        color: skill.color,
                      }}
                    >
                      {skill.icon}
                    </div>
                    <div className="skill-info">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-progress">
                        <div
                          className="skill-progress-bar"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: skill.color,
                          }}
                        ></div>
                      </div>
                      <p className="skill-description">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsRadar;
