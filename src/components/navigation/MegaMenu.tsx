import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Cpu, FileText, Folder, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { MainNavigationLink } from '../../data/navigation';
import { TechReveal } from '../animations/TechReveal';
import './MegaMenu.css';

interface MegaMenuProps {
  navLinks: MainNavigationLink[];
  isActive: (path: string) => boolean;
}

interface MenuItem {
  name: string;
  path: string;
  description: string;
  previewImage?: string;
  status?: 'LIVE' | 'ACTIVE' | 'ARCHIVED';
  category?: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

// Enriched menu data with preview information
const menuData: Record<string, MenuCategory[]> = {
  Projects: [
    {
      title: 'FEATURED',
      items: [
        {
          name: 'The Launchpad',
          path: '/case-studies/the-launchpad',
          description: 'Website redesign for increased engagement. Systems architecture overhaul with 180% engagement boost.',
          previewImage: '/images/case-studies/the-launchpad.webp',
          status: 'LIVE',
        },
        {
          name: 'The Conductor',
          path: '/case-studies/the-conductor',
          description: 'Marketing automation platform. Efficiency increased by 250%, saving 40 hours monthly.',
          previewImage: '/images/case-studies/the-conductor.webp',
          status: 'LIVE',
        },
        {
          name: 'The Fortress',
          path: '/case-studies/the-fortress',
          description: 'Cybersecurity infrastructure overhaul. Security score: 98/100, zero incidents.',
          previewImage: '/images/case-studies/the-fortress.webp',
          status: 'LIVE',
        },
        {
          name: 'RBE Law',
          path: '/case-studies/rbe-law-brand-and-digital',
          description: 'Law firm digital transformation. Client acquisition +145%, ROI 320%.',
          previewImage: '/images/case-studies/rbe-law.webp',
          status: 'LIVE',
        },
      ],
    },
    {
      title: 'QUICK_ACCESS',
      items: [
        {
          name: 'All Case Studies',
          path: '/case-studies',
          description: 'View complete portfolio of systems architecture projects.',
          status: 'ACTIVE',
        },
        {
          name: 'Technical Stack',
          path: '/case-studies?filter=technical',
          description: 'Technologies, frameworks, and implementation details.',
          status: 'ACTIVE',
        },
      ],
    },
  ],

  Ventures: [
    {
      title: 'FEATURED',
      items: [
        {
          name: '317 BBQ',
          path: '/side-projects/317-bbq',
          description: 'Modern restaurant website with online ordering system. Full-stack e-commerce solution.',
          previewImage: '/images/projects/317 bbq/20231008_174703.webp',
          status: 'LIVE',
        },
        {
          name: 'Piko Fg Music',
          path: '/side-projects/piko-fg-music',
          description: 'High-end industrial web experience with WASM-powered audio processing. Next.js + Three.js.',
          previewImage: '/images/projects/Piko Fg Music/pkfg logo.png',
          status: 'LIVE',
        },
      ],
    },
    {
      title: 'EXPLORE',
      items: [
        {
          name: 'All Ventures',
          path: '/side-projects',
          description: 'Browse all independent experiments and creative labs.',
          status: 'ACTIVE',
        },
      ],
    },
  ],

  'The Lab': [
    {
      title: 'TOOLS',
      items: [
        {
          name: 'Marketing Simulator',
          path: '/applications/marketing-simulator',
          description: 'Scenario planning & budget modeling engine. 6 tools, 8+ interactive charts.',
          status: 'LIVE',
        },
        {
          name: 'Brand Builder',
          path: '/apps/brand-builder',
          description: 'AI-powered identity & design system generator. 95% time saved, 5+ color schemes.',
          status: 'LIVE',
        },
        {
          name: 'Graston Growth Engine',
          path: '/applications/graston-growth-engine',
          description: 'Provider analytics hub & growth platform. 91% retention, $847K ARR.',
          status: 'LIVE',
        },
        {
          name: 'ROI Calculator',
          path: '/applications/roi-calculator',
          description: 'Real-time investment return modeling. +28% enrollment, -40% cycle time.',
          status: 'LIVE',
        },
      ],
    },
    {
      title: 'CATEGORIES',
      items: [
        {
          name: 'All Apps',
          path: '/apps',
          description: 'Browse complete application suite.',
          status: 'ACTIVE',
        },
        {
          name: 'Sales Tools',
          path: '/apps?category=Sales%20Tools',
          description: 'Revenue optimization & analytics.',
          status: 'ACTIVE',
        },
      ],
    },
  ],

  Studio: [
    {
      title: 'SERVICES',
      items: [
        {
          name: 'Brand Identity',
          path: '/studio?filter=brand',
          description: 'Logo design, color systems, typography. Complete visual identity packages.',
          status: 'ACTIVE',
        },
        {
          name: 'Visual Systems',
          path: '/studio?filter=systems',
          description: 'Design tokens, component libraries. Scalable design systems.',
          status: 'ACTIVE',
        },
        {
          name: 'UI/UX Design',
          path: '/studio?filter=ui',
          description: 'User interfaces and experiences. Human-centered design.',
          status: 'ACTIVE',
        },
      ],
    },
    {
      title: 'GALLERY',
      items: [
        {
          name: 'Studio Gallery',
          path: '/studio',
          description: 'Browse creative work and design portfolio.',
          status: 'ACTIVE',
        },
      ],
    },
  ],

  Resume: [
    {
      title: 'SECTIONS',
      items: [
        {
          name: 'Full Resume',
          path: '/resume',
          description: 'Professional background & experience. Systems Architect with 15+ years.',
          status: 'ACTIVE',
        },
        {
          name: 'Download PDF',
          path: '/resume?download=true',
          description: 'Get a copy for your records. Professional format.',
          status: 'ACTIVE',
        },
      ],
    },
  ],

  Contact: [
    {
      title: 'METHODS',
      items: [
        {
          name: 'Email',
          path: '/contact',
          description: 'hoosierdarling@gmail.com. Response time: 24-48 hours.',
          status: 'ACTIVE',
        },
        {
          name: 'LinkedIn',
          path: 'https://linkedin.com/in/jacobdarling',
          description: 'Connect on LinkedIn for professional networking.',
          status: 'ACTIVE',
        },
        {
          name: 'GitHub',
          path: 'https://github.com/JdarlingGT',
          description: 'View repositories and code contributions.',
          status: 'ACTIVE',
        },
      ],
    },
  ],
};

const MegaMenu: React.FC<MegaMenuProps> = ({ navLinks, isActive }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse spotlight tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    if (activeMenu && containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
      return () => {
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [activeMenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(name);
    setHoveredItem(null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setHoveredItem(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleItemHover = (item: MenuItem) => {
    setHoveredItem(item);
  };

  const getMenuData = (menuName: string): MenuCategory[] => {
    return menuData[menuName] || [];
  };

  return (
    <div ref={menuRef} className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
      {navLinks.map((link) => {
        const hasContent = menuData[link.name];
        const categories = getMenuData(link.name);

        return (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => hasContent && handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={link.path}
              className={`relative flex items-center gap-1.5 ${
                isActive(link.path)
                  ? 'text-white'
                  : 'text-brand-muted hover:text-brand-turquoise'
              } transition-all duration-300 font-semibold text-sm uppercase tracking-wider group py-2 px-2 lg:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md`}
              aria-expanded={activeMenu === link.name}
              aria-haspopup={hasContent ? 'true' : 'false'}
            >
              <span>{link.name}</span>
              {hasContent && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    activeMenu === link.name ? 'rotate-180' : ''
                  }`}
                />
              )}

              {/* Hover glow effect */}
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-0.5 transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-brand-turquoise shadow-[0_0_8px_rgba(64,224,208,0.5)]'
                    : 'bg-transparent group-hover:bg-brand-turquoise/20'
                }`}
              />
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === link.name && hasContent && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className="fixed left-0 right-0 top-[72px] mx-auto w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] max-w-6xl px-4 z-[200]"
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    maxHeight: 'calc(100vh - 100px)',
                  }}
                >
                  <div
                    ref={containerRef}
                    className="mega-menu-container bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative"
                    style={{
                      background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 224, 208, 0.1) 0%, transparent 70%), rgb(2, 6, 23)`,
                    }}
                  >
                    {/* Gradient accent bar */}
                    <div className="h-1 bg-brand-turquoise" />

                    {/* Menu content - 2 Column Grid */}
                    <div className="p-4 md:p-6 max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain custom-scrollbar">
                      <div className="grid grid-cols-[1fr_300px] gap-6">
                        {/* Left Column: File Tree Navigation */}
                        <div className="mega-menu-nav">
                          {categories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-6 last:mb-0">
                              <h3 className="text-xs uppercase tracking-widest text-brand-turquoise/70 mb-3 font-mono">
                                <TechReveal text={category.title} triggerOnMount={true} />
                              </h3>
                              <div className="space-y-1">
                                {category.items.map((item, itemIndex) => {
                                  const isExternal = item.path.startsWith('http');
                                  const linkContent = (
                                    <>
                                      <span className="mega-menu-prefix">|-</span>
                                      <span className="mega-menu-name">{item.name}</span>
                                      {hoveredItem?.path === item.path && (
                                        <span className="mega-menu-cursor">_</span>
                                      )}
                                    </>
                                  );

                                  return isExternal ? (
                                    <a
                                      key={itemIndex}
                                      href={item.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="mega-menu-link group"
                                      onMouseEnter={() => handleItemHover(item)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      {linkContent}
                                    </a>
                                  ) : (
                                    <Link
                                      key={itemIndex}
                                      to={item.path}
                                      className="mega-menu-link group"
                                      onMouseEnter={() => handleItemHover(item)}
                                      onMouseLeave={() => setHoveredItem(null)}
                                    >
                                      {linkContent}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Right Column: Preview Pane */}
                        <div className="mega-menu-preview">
                          {hoveredItem ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.15 }}
                              className="preview-card"
                            >
                              {hoveredItem.previewImage && (
                                <div className="preview-image">
                                  <img
                                    src={hoveredItem.previewImage}
                                    alt={hoveredItem.name}
                                    className="w-full h-32 object-cover rounded"
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <div className="preview-header">
                                <h4 className="preview-title font-mono">{hoveredItem.name}</h4>
                                {hoveredItem.status && (
                                  <span className={`preview-status status-${hoveredItem.status.toLowerCase()}`}>
                                    {hoveredItem.status}
                                  </span>
                                )}
                              </div>
                              <p className="preview-description">{hoveredItem.description}</p>
                              <div className="preview-action">
                                <ArrowRight size={14} />
                                <span className="text-xs">Navigate</span>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="preview-placeholder"
                            >
                              <Terminal size={32} className="text-brand-turquoise/30 mb-3" />
                              <p className="text-sm text-brand-muted font-mono">SELECT_MODULE</p>
                              <p className="text-xs text-brand-muted/60 mt-2">
                                Hover a link to preview
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom gradient */}
                    <div className="h-px bg-brand-turquoise/30" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default MegaMenu;
