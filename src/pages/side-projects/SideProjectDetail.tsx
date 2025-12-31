import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag, Sparkles, Calendar, Palette, Code, TrendingUp } from 'lucide-react';
import { sideProjects } from '../../data/sideProjects';
import { DomeGallery, DomeGalleryImage } from '../../components/ui/DomeGallery';
import { SpotlightCard } from '../../components/ui/SpotlightCard';
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
    'piko-fg-music': 'Piko Fg Music',
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
      'piko-fg-music': [
        '/images/projects/Piko Fg Music/Site Images/Screenshot of Piko Artist Studio.jpg',
        '/images/projects/Piko Fg Music/Site Images/Screenshot of PIKO _ Pro DJ Console.jpg',
        '/images/projects/Piko Fg Music/Site Images/hero-bw.jpg',
        '/images/projects/Piko Fg Music/Site Images/hero-white.jpg',
        '/images/projects/Piko Fg Music/Site Images/graffiti-wall-2.jpg',
        '/images/projects/Piko Fg Music/Site Images/grunge-window.jpg',
        '/images/projects/Piko Fg Music/piko-logo.png',
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-creamsicle">{project.title}</span>
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

            {/* Piko Fg Music - Syndicate Dispatch: Real-Time Telemetry Logic */}
            {project.id === 'piko-fg-music' && (
              <motion.section
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SpotlightCard className="p-8 md:p-12 bg-[#050505] border-2 border-[#FFD700]" style={{ borderRadius: '0px' }}>
                  {/* Title with Industrial Styling */}
                  <div className="mb-8 text-center">
                    <motion.h2
                      className="text-3xl md:text-4xl font-black italic text-[#FFD700] mb-3 uppercase tracking-wider"
                      style={{
                        transform: 'skew(-12deg)',
                        fontFamily: '"Lexend", sans-serif',
                        textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      SYNDICATE DISPATCH
                    </motion.h2>
                    <p 
                      className="text-xs text-gray-400 font-mono uppercase tracking-widest"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      REAL-TIME TELEMETRY LOGIC
                    </p>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <p className="leading-relaxed mb-4">
                        The <span className="text-[#FFD700] font-semibold">Syndicate Dispatch</span> is the technical heart of the Studio Engine V3, 
                        manifested through the <span className="font-mono text-brand-teal">StudioMonitor</span> component. It serves as a real-time 
                        telemetry readout, providing producers with mission-critical feedback as they "crack" signals and command the mix.
                      </p>
                    </div>

                    {/* Tactical Communication Protocol */}
                    <div className="border-l-2 border-[#FFD700] pl-6">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Code size={20} className="text-[#FFD700]" />
                        Tactical Communication Protocol
                      </h3>
                      <p className="text-sm leading-relaxed mb-4">
                        The <span className="font-mono text-brand-teal">StudioMonitor</span> utilizes a specialized linguistic dictionary to reinforce 
                        the project's industrial narrative. Standard web interactions are translated into high-stakes tactical commands:
                      </p>
                      
                      <ul className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="text-[#FFD700] font-mono shrink-0">→</span>
                          <div>
                            <span className="font-semibold text-white">Signal Acquisition:</span> Loading a track is logged as{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              SIGNAL_ACQUIRED
                            </code> or{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              DECK_A_LOADED
                            </code>, transitioning the interface from idle to active unit tracking.
                          </div>
                        </li>
                        
                        <li className="flex gap-3">
                          <span className="text-[#FFD700] font-mono shrink-0">→</span>
                          <div>
                            <span className="font-semibold text-white">Decryption Narrative:</span> Instead of standard progress bars, the monitor 
                            outputs a sequence of "decryption" logs—such as{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              PREPARING_MASTER_STEMS
                            </code> and{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              DECRYPTING_SIGNAL_CHAIN
                            </code>—to simulate the technical effort required to isolate audio frequencies.
                          </div>
                        </li>
                        
                        <li className="flex gap-3">
                          <span className="text-[#FFD700] font-mono shrink-0">→</span>
                          <div>
                            <span className="font-semibold text-white">System Status:</span> The boot sequence provides a choreographed rollout, 
                            logging{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              SESSION_INITIALIZED
                            </code>,{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              NEURAL STEMS ONLINE
                            </code>, and{' '}
                            <code className="px-2 py-0.5 bg-black/50 border border-[#FFD700]/30 text-[#FFD700] font-mono text-xs" style={{ borderRadius: '0px' }}>
                              COMMAND THE MIX
                            </code> to ensure users feel they are entering a high-security vault.
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Signal Cracking Telemetry */}
                    <div className="border-l-2 border-brand-teal pl-6">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp size={20} className="text-brand-teal" />
                        "Signal Cracking" Telemetry
                      </h3>
                      <p className="text-sm leading-relaxed mb-4">
                        When a producer imports an "Unverified Signal" (user-uploaded file), the telemetry logic initiates a timed 
                        "cracking" sequence to build anticipation and simulate complex AI processing:
                      </p>
                      
                      <div className="space-y-2 text-sm font-mono bg-black/30 p-4" style={{ borderRadius: '0px', border: '1px solid #333' }}>
                        <div className="flex gap-3">
                          <span className="text-[#FFD700]">0.0s:</span>
                          <span>Immediate feedback with <span className="text-brand-teal">PREPARING_MASTER_STEMS</span> for the specific filename.</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-[#FFD700]">1.2s:</span>
                          <span>Announcement of specific frequency isolation: <span className="text-brand-teal">VOCALS | INSTRUMENTAL | BASS</span>.</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-[#FFD700]">2.5s:</span>
                          <span>Confirmation that audio processing pipeline is active with <span className="text-brand-teal">COMPRESSION_CHAIN_LIVE</span>.</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-[#FFD700]">3.5s:</span>
                          <span>Final session authorization: <span className="text-brand-teal">SESSION_READY</span>.</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Architecture */}
                    <div className="border-l-2 border-brand-orange pl-6">
                      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                        <Palette size={20} className="text-brand-orange" />
                        Technical Architecture
                      </h3>
                      <p className="text-sm leading-relaxed">
                        Built on a custom hook-based system, the <span className="font-mono text-brand-teal">useStudioMonitor</span> manages 
                        a persistent log stack that interfaces directly with the Audio Engine. This allows the monitor to react dynamically 
                        to audio events, such as logging{' '}
                        <code className="px-2 py-0.5 bg-black/50 border border-brand-teal/30 text-brand-teal font-mono text-xs" style={{ borderRadius: '0px' }}>
                          STUDIO_CORE: DECELERATING
                        </code> when a turntable-style tape stop effect is triggered, or confirming successful render completions with{' '}
                        <code className="px-2 py-0.5 bg-black/50 border border-brand-teal/30 text-brand-teal font-mono text-xs" style={{ borderRadius: '0px' }}>
                          MIX_RENDERED: DOWNLOAD_COMPLETE
                        </code>. The visual presentation remains strictly brutalist, featuring a{' '}
                        <span className="text-[#FFD700] font-semibold">Safety Yellow</span> and{' '}
                        <span className="text-gray-400 font-semibold">Industrial Chrome</span> palette that mirrors the aesthetic 
                        of professional field equipment.
                      </p>
                    </div>

                    {/* External Links */}
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-[#FFD700]/20">
                      <a
                        href="https://piko-artist-website.vercel.app/studio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-black font-bold uppercase tracking-wider hover:bg-white transition-colors"
                        style={{ borderRadius: '0px' }}
                      >
                        EXPERIENCE LIVE SITE
                        <ExternalLink size={18} />
                      </a>
                      <a
                        href="https://github.com/yesmannow/piko-artist-website-v3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FFD700] text-[#FFD700] font-bold uppercase tracking-wider hover:bg-[#FFD700] hover:text-black transition-colors"
                        style={{ borderRadius: '0px' }}
                      >
                        VIEW REPOSITORY
                        <Code size={18} />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
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
