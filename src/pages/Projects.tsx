import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Code, Palette } from 'lucide-react';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import { fadeInUp } from '../utils/animationVariants';
import { projects } from '../data/projects';
import FeaturedProjectsGrid from '../components/home/FeaturedProjectsGrid';
import type { FeaturedProjectCardProps } from '../components/home/FeaturedProjectCard';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import MagneticCursor from '../components/ui/MagneticCursor';
import { ApiBackgroundImage } from '../components/ui/ApiBackgroundImage';
import './Projects.css';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'projects' | 'side-projects'>('projects');
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
      <MagneticCursor color="#40E0D0" enabled={true} />
      <OceanBackgroundBeams className="opacity-20" />
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <ApiBackgroundImage
          query="web development coding programming technology"
          source="pexels"
          overlayColor="dark"
          overlayOpacity={0.75}
          className="absolute inset-0"
          priority
        />
      </div>
      <AnimatedSection>
        <header className="projects-header relative z-10">
          {/* Toggle Switch */}
          <div className="flex justify-center mb-8">
            <SpotlightCard className="p-1 inline-flex">
              <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => {
                    setViewMode('projects');
                  }}
                  className={`px-6 py-2 rounded-md font-semibold text-sm transition-all touch-target ${
                    viewMode === 'projects'
                      ? 'bg-brand-teal text-brand-dark shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Code size={16} />
                    Web Projects
                  </span>
                </button>
                <button
                  onClick={() => {
                    setViewMode('side-projects');
                    navigate('/side-projects');
                  }}
                  className={`px-6 py-2 rounded-md font-semibold text-sm transition-all touch-target ${
                    viewMode === 'side-projects'
                      ? 'bg-brand-orange text-black shadow-lg'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Palette size={16} />
                    Side Projects
                  </span>
                </button>
              </div>
            </SpotlightCard>
          </div>

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
