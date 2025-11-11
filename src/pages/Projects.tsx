import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import { fadeInUp } from '../utils/animationVariants';
import { projects } from '../data/projects';
import FeaturedProjectsGrid from '../components/home/FeaturedProjectsGrid';
import type { FeaturedProjectCardProps } from '../components/home/FeaturedProjectCard';
import './Projects.css';

const Projects: React.FC = () => {
  // Map canonical dataset to FeaturedProjectCardProps, preferring featured items
  const featuredItems: FeaturedProjectCardProps[] = useMemo(() => {
    const featuredProjects = projects.filter(p => p.featured);
    const itemsToUse = featuredProjects.length > 0 ? featuredProjects : projects;

    return itemsToUse.map(project => ({
      slug: project.slug,
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags,
      link: project.link,
    }));
  }, []);

  return (
    <main className="projects-page">
      <AnimatedSection>
        <header className="projects-header">
          <TextReveal text="Web Development Projects" className="page-title" />
          <motion.p className="page-subtitle" variants={fadeInUp}>
            Professional websites built with WordPress, combining strategic design with technical
            execution
          </motion.p>
        </header>
      </AnimatedSection>

      {/* Projects Stats */}
      <AnimatedSection delay={0.1}>
        <div className="projects-stats">
          <div className="stat-item">
            <span className="stat-number">{featuredItems.length}</span>
            <span className="stat-label">Websites Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">WordPress</span>
            <span className="stat-label">Platform</span>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection delay={0.2}>
        <FeaturedProjectsGrid items={featuredItems} />
      </AnimatedSection>
    </main>
  );
};

export default Projects;
