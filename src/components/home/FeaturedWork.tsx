import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import './FeaturedWork.css';

const featuredWork = [
  {
    title: 'BearCave Marketing Portfolio',
    description: 'Full-stack marketing portfolio showcasing campaigns, case studies, and creative work',
    link: 'https://www.bearcavemarketing.com',
    metrics: ['30K+ reach', 'CTR +35%', 'Cost-per-lead ↓ 45%'],
    image: '/images/work/portfolio-preview.jpg',
  },
  {
    title: 'Marketing Campaigns',
    description: 'Award-winning campaigns across B2B and B2C sectors',
    link: '/case-studies',
    metrics: ['Award-winning', 'Multi-channel', 'Data-driven'],
    image: '/images/work/campaigns-preview.jpg',
  },
  {
    title: 'Landing Pages & CRO',
    description: 'High-converting landing pages and conversion optimization work',
    link: '/case-studies',
    metrics: ['+40% conversion', 'Mobile-first', 'A/B tested'],
    image: '/images/work/landing-pages-preview.jpg',
  },
];

const FeaturedWork: React.FC = () => {
  return (
    <section id="portfolio" className="featured-work container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="featured-work__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Featured Work</h2>
        <p className="section-subheading">
          A selection of marketing campaigns, landing pages, creative work, and digital experiences.
        </p>
      </motion.div>

      <div className="featured-work__grid">
        {featuredWork.map((work, index) => (
          <motion.div
            key={index}
            className="featured-work__card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="featured-work__image-wrapper">
              <img
                src={work.image}
                alt={work.title}
                className="featured-work__image"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="featured-work__overlay">
                <div className="featured-work__metrics">
                  {work.metrics.map((metric, i) => (
                    <span key={i} className="featured-work__metric">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="featured-work__content">
              <h3 className="featured-work__title">{work.title}</h3>
              <p className="featured-work__description">{work.description}</p>
              {work.link.startsWith('http') ? (
                <a
                  href={work.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="featured-work__link"
                >
                  View Project <ExternalLink size={16} />
                </a>
              ) : (
                <Link to={work.link} className="featured-work__link">
                  View Project <ExternalLink size={16} />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWork;
