import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import { fadeInUp } from '../utils/animationVariants';
import { projects } from '../data/projects';
import FeaturedProjectsGrid from '../components/home/FeaturedProjectsGrid';
import type { FeaturedProjectCardProps } from '../components/home/FeaturedProjectCard';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';
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
    <main className="projects-page relative">
      <OceanBackgroundBeams className="opacity-20" />
      <AnimatedSection>
        <header className="projects-header relative z-10">
          <TextReveal text="Web Development Projects" className="page-title" />
          <motion.p className="page-subtitle" variants={fadeInUp}>
            Professional websites built with WordPress, combining strategic design with technical
            execution
          </motion.p>

          <motion.div
            className="intro-section max-w-3xl mx-auto mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6"
            variants={fadeInUp}
          >
            <p className="text-slate-300 leading-relaxed mb-4">
              This collection showcases professional websites I've built for clients across various industries.
              Each project represents a complete solution—from initial strategy and design through development,
              optimization, and launch. These aren't just websites; they're marketing systems designed to convert
              visitors into customers, built on WordPress for flexibility and scalability.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-xs text-brand-teal">
                WordPress Development
              </span>
              <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-xs text-brand-orange">
                Custom Design
              </span>
              <span className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-xs text-slate-300">
                Performance Optimized
              </span>
            </div>
          </motion.div>
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
