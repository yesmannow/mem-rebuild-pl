import React from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Code2, Search, Palette, Users, Server } from 'lucide-react';
import './MySkills.css';

const skills = [
  {
    icon: Zap,
    title: 'Marketing Automation',
    items: ['FluentCRM', 'HubSpot', 'Zapier', 'Automated Campaigns'],
    color: '#8b5cf6', // purple
  },
  {
    icon: BarChart3,
    title: 'Analytics & Optimization',
    items: ['GA4', 'Tag Manager', 'Data Visualization', 'A/B Testing'],
    color: '#3b82f6', // blue
  },
  {
    icon: Code2,
    title: 'Development & Systems',
    items: ['WordPress', 'React', 'JS', 'PHP', 'REST APIs'],
    color: '#10b981', // green
  },
  {
    icon: Search,
    title: 'SEO & Paid Media',
    items: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'Technical SEO'],
    color: '#f59e0b', // amber
  },
  {
    icon: Palette,
    title: 'Design & Content',
    items: ['Brand Systems', 'UI/UX', 'Copywriting', 'Content Strategy'],
    color: '#ec4899', // pink
  },
  {
    icon: Users,
    title: 'Leadership & Strategy',
    items: ['Cross-Functional Teams', 'Project Management', 'ROI Focus'],
    color: '#06b6d4', // cyan
  },
  {
    icon: Server,
    title: 'Infrastructure',
    items: ['Cloudflare', 'CI/CD', 'Security', 'CDN Optimization'],
    color: '#6366f1', // indigo
  },
];

const MySkills: React.FC = () => {
  return (
    <section id="skills" className="my-skills container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="my-skills__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Where Strategy Meets Stack</h2>
        <p className="my-skills__subheading">
          From first click to final sale — systems that scale, connect, and convert.
        </p>
      </motion.div>

      <div className="my-skills__grid">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <motion.div
              key={skill.title}
              className="my-skills__card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="my-skills__icon" style={{ backgroundColor: `${skill.color}20`, color: skill.color }}>
                <Icon size={32} />
              </div>
              <h3 className="my-skills__title">{skill.title}</h3>
              <ul className="my-skills__list">
                {skill.items.map((item, i) => (
                  <li key={i} className="my-skills__item">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MySkills;

