import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import './Portfolio.css';

const caseStudies = [
  {
    slug: 'healthcare-advertising-system',
    title: 'Healthcare Advertising System',
    summary: 'Designed a scalable, trust-first advertising framework for healthcare brand.',
    metrics: [
      { label: 'Patient Engagement', value: '+40%' },
      { label: 'Brand Recognition', value: '+65%' },
      { label: 'Campaign ROI', value: '3.2x' },
    ],
  },
  {
    slug: 'seasonal-promo-engine',
    title: 'Seasonal Promo Engine',
    summary: 'Built dynamic templates to optimize retail campaign cycles.',
    metrics: [
      { label: 'Sales Lift', value: '+35%' },
      { label: 'Production Efficiency', value: '+50%' },
      { label: 'Brand Consistency', value: '95%' },
    ],
  },
  {
    slug: 'brand-identity-systems',
    title: 'Brand Identity Systems',
    summary: 'Developed full visual identity systems for multi-sector clients.',
    metrics: [
      { label: 'Brand Launches', value: '12+' },
      { label: 'Market Visibility', value: '+45%' },
    ],
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="portfolio container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="portfolio__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Featured Case Studies</h2>
      </motion.div>

      <div className="portfolio__grid">
        {caseStudies.map((study, index) => (
          <motion.div
            key={study.slug}
            className="portfolio__card card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Link to={`/case-studies/${study.slug}`} className="portfolio__card-link">
              <h3 className="portfolio__card-title">{study.title}</h3>
              <p className="portfolio__card-summary">{study.summary}</p>
              <div className="portfolio__metrics">
                {study.metrics.map((metric, i) => (
                  <div key={i} className="portfolio__metric">
                    <div className="portfolio__metric-value">{metric.value}</div>
                    <div className="portfolio__metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="portfolio__footer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to="/case-studies" className="portfolio__view-all">
          <span>View Full Portfolio</span>
          <ExternalLink size={18} />
        </Link>
      </motion.div>
    </section>
  );
};

export default Portfolio;

