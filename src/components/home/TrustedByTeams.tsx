import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './TrustedByTeams.css';

const trustedProjects = [
  {
    number: '1',
    title: 'Project Alpha',
    description: 'Developed a scalable e-commerce platform that increased online sales by 40% and improved user experience across all devices.',
    tags: ['E-commerce', 'React', 'SEO'],
  },
  {
    number: '2',
    title: 'Marketing Campaign Redesign',
    description: 'Led a complete rebranding and digital marketing overhaul that resulted in 3x lead generation and 50% cost reduction per acquisition.',
    tags: ['Branding', 'Digital Marketing', 'Analytics'],
  },
  {
    number: '3',
    title: 'Enterprise System Integration',
    description: 'Architected and implemented a unified CRM and marketing automation system that streamlined operations and improved team productivity by 60%.',
    tags: ['CRM', 'Automation', 'Integration'],
  },
];

const TrustedByTeams: React.FC = () => {
  return (
    <section id="trusted" className="trusted-by-teams container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="trusted-by-teams__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Trusted by Teams Who Ship</h2>
        <p className="trusted-by-teams__description">
          I've had the privilege of collaborating with innovative teams and organizations, contributing to projects that deliver real impact.
        </p>
      </motion.div>

      <div className="trusted-by-teams__grid">
        {trustedProjects.map((project, index) => (
          <motion.div
            key={index}
            className="trusted-by-teams__card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="trusted-by-teams__number">{project.number}.</div>
            <h3 className="trusted-by-teams__title">{project.title}</h3>
            <p className="trusted-by-teams__description-text">{project.description}</p>
            <div className="trusted-by-teams__tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="chip">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustedByTeams;

