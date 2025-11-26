import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Globe, Code, Palette } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  website?: string;
  images?: string[];
  techStack?: string[];
  colors?: string[];
  category?: string;
  year?: string;
  featured?: boolean;
}

interface ProjectVaultProps {
  projects: Project[];
}

const ProjectVault: React.FC<ProjectVaultProps> = ({ projects }) => {
  return (
    <div className="project-vault grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXValue = (e.clientX - rect.left) / width - 0.5;
    const mouseYValue = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXValue);
    mouseY.set(mouseYValue);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Get primary image (screenshot or first image)
  const primaryImage = project.images?.[0] || `/images/side-projects/${project.slug}/screenshot.png`;
  const fallbackImage = `/images/side-projects/${project.slug}.svg`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
    >
      {/* Holographic Card */}
      <div className="relative h-full bg-brand-surface/50 border-2 border-brand-teal/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-brand-teal/50 transition-all duration-300">
        {/* Browser Window Frame */}
        <div className="relative h-64 overflow-hidden bg-brand-dark">
          {/* Browser Chrome */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-brand-dark/80 backdrop-blur-sm border-b border-brand-teal/20 px-3 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 h-6 bg-brand-surface/30 rounded text-xs px-2 flex items-center text-brand-muted truncate">
              {project.website || 'Loading...'}
            </div>
          </div>

          {/* Screenshot with Parallax Scroll Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              y: isHovered ? -20 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {!imageError ? (
              <img
                src={primaryImage}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-dark/50">
                <Globe size={48} className="text-brand-teal/30" />
              </div>
            )}
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ExternalLink size={20} />
                <span className="text-sm font-semibold">View Site</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-1">{project.title}</h3>
              {project.category && (
                <span className="text-xs text-brand-muted uppercase tracking-wide">
                  {project.category}
                </span>
              )}
            </div>
            {project.featured && (
              <span className="px-2 py-1 text-xs font-bold text-brand-orange bg-brand-orange/10 rounded">
                Featured
              </span>
            )}
          </div>

          {/* Tech Stack Badges */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 + idx * 0.05 }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-brand-teal/10 border border-brand-teal/20 rounded-full"
                >
                  <Code size={12} className="text-brand-teal" />
                  <span className="text-xs font-semibold text-brand-teal">{tech}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Color Palette */}
          {project.colors && project.colors.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Palette size={14} className="text-brand-muted" />
                <span className="text-xs text-brand-muted uppercase tracking-wide">Brand Colors</span>
              </div>
              <div className="flex gap-2">
                {project.colors.slice(0, 5).map((color, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + idx * 0.05 }}
                    className="w-8 h-8 rounded border-2 border-brand-teal/20 shadow-lg"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-brand-teal/10">
            {project.year && (
              <span className="text-xs text-brand-muted">{project.year}</span>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand-teal hover:text-brand-orange transition-colors flex items-center gap-1"
              >
                Visit Site
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Holographic Glow Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/10 via-transparent to-brand-orange/10 rounded-2xl" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectVault;

