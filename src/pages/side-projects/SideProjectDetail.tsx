import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, Sparkles, Calendar, Palette, Code, TrendingUp } from 'lucide-react';
import { sideProjects } from '../../data/sideProjects';
import { DomeGallery, DomeGalleryImage } from '../../components/ui/DomeGallery';
import { SpotlightCard } from '../../components/ui/SpotlightCard';
import AnimatedGradientText from '../../components/ui/AnimatedGradientText';
import SectionDivider from '../../components/ui/SectionDivider';
import { OceanCountingNumber } from '../../components/ui/OceanCountingNumber';

/**
 * Side Project Detail Page
 *
 * Modern detail page matching Studio design with:
 * - Hero section with project image
 * - Image gallery using all images from project folder
 * - Challenge/Solution sections
 * - Impact metrics
 * - Stack and tags
 */
const SideProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projectImages, setProjectImages] = useState<DomeGalleryImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const project = sideProjects.find((p) => p.id === id);

  // Map project IDs to folder names
  const folderMap: Record<string, string> = {
    'primary-care-indy': 'Primarycare Indy',
    '317-bbq': '317 bbq',
    'taco-ninja': 'Taco Ninja',
    'perpetual-fitness': 'Perpetual Movement Fitness',
    'tbm-strategy': 'Tuohy Bailey & Moore LLP',
    'resq-organic': 'ResQ Organics',
    'behr-pet-essentials': 'Behr pet essentials',
    'black-letter': 'Black Letter',
    'primary-colours': 'Primary Colours',
    'circle-city': 'circle  city kicks',
    'clean-aesthetic': 'Clean Aesthetic',
    'hoosier-boy': 'Hoosierboy Barbershop',
    'urgent-care-indy': 'urgent care indy',
  };

  useEffect(() => {
    if (!project) return;

    const folderName = folderMap[project.id];
    if (!folderName) {
      setIsLoadingImages(false);
      return;
    }

    // Common image patterns for each project
    const imagePatterns: Record<string, string[]> = {
      'primary-care-indy': [
        '/images/projects/Primarycare Indy/Primary Care Logo with PMC.webp',
        '/images/projects/Primarycare Indy/online-doctor-consultation-instagram-post.webp',
        '/images/projects/Primarycare Indy/primarycare indy logo.webp',
      ],
      '317-bbq': [
        '/images/projects/317 bbq/317bbqlogo_wht.webp',
        '/images/projects/317 bbq/20231008_174703.webp',
        '/images/projects/317 bbq/20231008_175026.webp',
        '/images/projects/317 bbq/20231008_175109.webp',
        '/images/projects/317 bbq/20231008_175244.webp',
        '/images/projects/317 bbq/20231008_175510.webp',
        '/images/projects/317 bbq/20231008_175512.webp',
        '/images/projects/317 bbq/20231008_175650.webp',
        '/images/projects/317 bbq/20231008_175654.webp',
        '/images/projects/317 bbq/20231008_180910.webp',
        '/images/projects/317 bbq/20231008_181722.webp',
      ],
      'resq-organic': [
        '/images/projects/ResQ Organics/ResQ Organics for Pets.png',
        '/images/projects/ResQ Organics/cbd-for-pets-and-pet-skin-care.webp',
        '/images/projects/ResQ Organics/cbd-oil-for-pets.webp',
        '/images/projects/ResQ Organics/dog-dry-skin-remedy.webp',
        '/images/projects/ResQ Organics/skincare-for-dogs-and-cats.webp',
      ],
    };

    const images = imagePatterns[project.id] || [project.image];

    // Convert to DomeGalleryImage format
    const galleryImages: DomeGalleryImage[] = images.map((src, index) => ({
      id: `${project.id}-${index}`,
      src,
      alt: `${project.title} - Image ${index + 1}`,
      title: index === 0 ? project.title : `${project.title} - View ${index + 1}`,
      category: project.category,
    }));

    setProjectImages(galleryImages);
    setIsLoadingImages(false);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Project not found.</p>
          <Link
            to="/side-projects"
            className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-orange transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Side Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Side Projects</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Deep Slate Background - Matching Studio page */}
      <div className="min-h-screen bg-slate-900 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 pointer-events-none" />

        <main className="relative z-10 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Navigation */}
            <motion.nav
              className="mb-8 flex items-center gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors touch-target"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <Link
                to="/side-projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors touch-target"
              >
                All Projects
              </Link>
            </motion.nav>

            {/* Hero Section */}
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
                {/* Hero Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="relative p-6 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-xs font-semibold text-brand-teal">
                      {project.category}
                    </span>
                    {project.year && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                        <Calendar size={14} />
                        <span>{project.year}</span>
                      </div>
                    )}
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    <AnimatedGradientText text={project.title} className="text-4xl md:text-5xl lg:text-6xl font-bold" />
                  </h1>

                  <p className="text-lg text-slate-300 mb-6 max-w-3xl">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-full text-xs text-slate-300"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionDivider />

            {/* Challenge & Solution */}
            <motion.section
              className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <TrendingUp size={20} className="text-red-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">The Challenge</h2>
                </div>
                <p className="text-slate-300 leading-relaxed">{project.challenge}</p>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-teal/10 rounded-lg">
                    <Sparkles size={20} className="text-brand-teal" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">The Solution</h2>
                </div>
                <p className="text-slate-300 leading-relaxed">{project.solution}</p>
              </SpotlightCard>
            </motion.section>

            {/* Impact Metrics */}
            {project.impact && project.impact.length > 0 && (
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 text-center">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Impact</h2>
                  <p className="text-slate-400">Measurable results from this project</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.impact.map((metric, index) => (
                    <SpotlightCard key={index} className="p-6 text-center">
                      <div className="text-3xl font-bold text-brand-teal mb-2">{metric}</div>
                      <div className="text-sm text-slate-400 uppercase tracking-wide">Result</div>
                    </SpotlightCard>
                  ))}
                </div>
              </motion.section>
            )}

            <SectionDivider />

            {/* Image Gallery */}
            {projectImages.length > 0 && (
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Project Gallery</h2>
                  <p className="text-slate-400">Visual assets and deliverables from this project</p>
                </div>
                <DomeGallery
                  images={projectImages}
                  maxItems={projectImages.length}
                />
              </motion.section>
            )}

            <SectionDivider />

            {/* Stack & Tags */}
            <motion.section
              className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-orange/10 rounded-lg">
                    <Code size={20} className="text-brand-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Stack</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.stack || []).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-brand-teal/10 border border-brand-teal/30 rounded-full text-sm text-brand-teal"
                    >
                      {tech}
                    </span>
                  ))}
                  {(!project.stack || project.stack.length === 0) && (
                    <span className="px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-slate-300">
                      Custom Toolkit
                    </span>
                  )}
                </div>
              </SpotlightCard>

              <SpotlightCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-brand-teal/10 rounded-lg">
                    <Palette size={20} className="text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-full text-sm text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.section>

            {/* CTA */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SpotlightCard className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Interested in a similar build?</h3>
                <p className="text-slate-300 mb-6">Let&apos;s apply these playbooks to your brand.</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-orange/30 touch-target"
                >
                  Start a Conversation
                  <ExternalLink size={18} />
                </Link>
              </SpotlightCard>
            </motion.section>
          </div>
        </main>
      </div>
    </>
  );
};

export default SideProjectDetail;
