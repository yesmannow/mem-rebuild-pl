import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Side projects data - you can move this to a separate data file later
const sideProjects = [
  {
    id: '317-bbq',
    name: '317 BBQ',
    subtitle: 'Brand Identity & Digital Presence',
    image: '/images/side-projects/317-bbq.svg',
    category: 'Brand Identity',
    description:
      'Complete brand identity system for Indianapolis BBQ restaurant including logo, signage, and digital assets.',
  },
  {
    id: 'rbe-consulting',
    name: 'RBE Consulting',
    subtitle: 'Professional Services Branding',
    image: '/images/side-projects/rbe-consulting.svg',
    category: 'Brand Identity',
    description:
      'Strategic brand development for business consulting firm with focus on trust and expertise.',
  },
  {
    id: 'pike-medical',
    name: 'Pike Medical',
    subtitle: 'Healthcare Marketing System',
    image: '/images/side-projects/pike-medical.svg',
    category: 'Web Design',
    description:
      'Comprehensive marketing system for medical consultants including patient acquisition workflows.',
  },
  {
    id: 'graston-dashboard',
    name: 'Graston Dashboard',
    subtitle: 'Clinical Decision Support',
    image: '/images/side-projects/graston-dashboard.svg',
    category: 'Web Application',
    description:
      'Interactive dashboard for healthcare practitioners with treatment protocols and patient management.',
  },
  {
    id: 'ultimate-technologies',
    name: 'Ultimate Technologies',
    subtitle: 'Technology Solutions Branding',
    image: '/images/side-projects/ultimate-technologies.svg',
    category: 'Brand Identity',
    description:
      'Modern brand identity for technology solutions provider with emphasis on innovation.',
  },
];

const SideProjects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % sideProjects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextProject = () => {
    setCurrentIndex(prev => (prev + 1) % sideProjects.length);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    setCurrentIndex(prev => (prev - 1 + sideProjects.length) % sideProjects.length);
    setIsAutoPlaying(false);
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Client Work & Experiments
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Applied design and branding work across diverse industries — from healthcare to
            hospitality, each project tells a unique story.
          </p>
        </motion.div>

        {/* Featured Carousel */}
        <div className="mb-16">
          <div
            ref={carouselRef}
            className="relative bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              {/* Project Image */}
              <div className="relative overflow-hidden bg-gray-800">
                <motion.img
                  key={currentIndex}
                  src={sideProjects[currentIndex].image}
                  alt={sideProjects[currentIndex].name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  onError={e => {
                    // Fallback for missing images
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23374151"/><text x="200" y="150" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="16">${sideProjects[currentIndex].name}</text></svg>`;
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
              </div>

              {/* Project Info */}
              <div className="p-8 flex flex-col justify-center">
                <motion.div
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="mb-4">
                    <span className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                      {sideProjects[currentIndex].category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-2">
                    {sideProjects[currentIndex].name}
                  </h3>

                  <p className="text-lg text-cyan-400 mb-4">
                    {sideProjects[currentIndex].subtitle}
                  </p>

                  <p className="text-gray-400 leading-relaxed mb-6">
                    {sideProjects[currentIndex].description}
                  </p>

                  <button className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300">
                    <span>View Project</span>
                    <ExternalLink size={16} />
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-6 left-6 flex items-center gap-4">
              <button
                onClick={prevProject}
                aria-label="Previous project"
                className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextProject}
                aria-label="Next project"
                className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 right-6 flex gap-2">
              {sideProjects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  aria-label={`Go to project ${index + 1}: ${project.name}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-cyan-400 w-8' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sideProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card group relative bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer"
              whileHover={{ y: -5 }}
            >
              {/* Project Image */}
              <div className="aspect-video bg-gray-800 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.currentTarget.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="%23374151"/><text x="150" y="100" text-anchor="middle" fill="%23ffffff" font-family="Arial" font-size="14">${project.name}</text></svg>`;
                  }}
                />
              </div>

              {/* Project Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="px-2 py-1 text-xs font-medium bg-pink-500/20 text-pink-300 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h4 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {project.name}
                </h4>

                <p className="text-sm text-gray-400 mt-1">{project.subtitle}</p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideProjects;
