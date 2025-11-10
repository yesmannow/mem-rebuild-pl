import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Command,
  ExternalLink,
  Home,
  User,
  Briefcase,
  Camera,
  Palette,
  Code,
  Wrench,
  Lightbulb,
  Building2,
  Mail
} from 'lucide-react';
import CommandMenuToggle from '../command/CommandMenuToggle';

// Navigation data structure
const NAV_SECTIONS = [
  {
    label: 'About Me',
    to: '/about',
    icon: User,
    description: 'Learn about my journey and background'
  },
  {
    label: 'Work',
    icon: Briefcase,
    description: 'Explore my creative and technical projects',
    subItems: [
      {
        label: 'Case Studies',
        to: '/case-studies',
        icon: Briefcase,
        description: 'Deep-dive into problem-solving and results'
      },
      {
        label: 'Graphic Design',
        to: '/design',
        icon: Palette,
        description: 'Visual identity and brand systems'
      },
      {
        label: 'Photography',
        to: '/photography',
        icon: Camera,
        description: 'Visual storytelling and composition'
      },
      {
        label: 'Side Projects',
        to: '/side-projects',
        icon: Code,
        description: 'Experimental work and collaborations'
      }
    ]
  },
  {
    label: 'Tools/Skills',
    icon: Wrench,
    description: 'Technical expertise and development tools',
    subItems: [
      {
        label: 'Dev Builds',
        to: '/applications',
        icon: Code,
        description: 'Custom applications and interactive tools'
      },
      {
        label: 'Toolbox',
        to: '/toolbox',
        icon: Wrench,
        description: 'Frameworks, templates, and resources'
      }
    ]
  },
  {
    label: 'Inspiration',
    icon: Lightbulb,
    description: 'Curated design and brand inspiration',
    subItems: [
      {
        label: 'Inspiration',
        to: '/inspiration',
        icon: Lightbulb,
        description: 'Design references and creative influences'
      },
      {
        label: 'Brand Builder',
        to: '/brand-builder',
        icon: Building2,
        description: 'Interactive brand identity creation tool'
      },
      {
        label: 'Gallery',
        to: '/gallery',
        icon: Palette,
        description: 'Curated brand identity systems'
      }
    ]
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: Mail,
    description: 'Get in touch for collaborations'
  }
];

const QUICK_ACTIONS = [
  { label: 'View Resume', to: '/resume', cta: true },
  { label: 'Go to Home', to: '/', icon: Home }
];

interface NavItemProps {
  item: typeof NAV_SECTIONS[0];
  isActive: boolean;
  hoveredSection: string | null;
  onHover: (label: string | null) => void;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, hoveredSection, onHover, onClick }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const Icon = item.icon;
  const isHovered = hoveredSection === item.label;

  return (
    <li
      className="relative"
      onMouseEnter={() => hasSubItems && onHover(item.label)}
      onMouseLeave={() => hasSubItems && onHover(null)}
    >
      {hasSubItems ? (
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise/50 ${
            isActive
              ? 'text-turquoise bg-turquoise/10'
              : 'text-cave-text hover:text-turquoise hover:bg-turquoise/5'
          }`}
          onClick={onClick}
        >
          <Icon size={18} />
          <span className="font-medium">{item.label}</span>
          <ChevronDown
            size={16}
            className="transition-transform duration-200"
          />
        </button>
      ) : (
        <Link
          to={item.to!}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise/50 ${
            isActive
              ? 'text-turquoise bg-turquoise/10'
              : 'text-cave-text hover:text-turquoise hover:bg-turquoise/5'
          }`}
          onClick={onClick}
        >
          <Icon size={18} />
          <span className="font-medium">{item.label}</span>
        </Link>
      )}

      {/* Mega-nav dropdown */}
      <AnimatePresence>
        {hasSubItems && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-80 bg-cave-bg/95 backdrop-blur-md border border-cave-border rounded-xl shadow-xl p-4 z-50"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-turquoise mb-1">{item.label}</h3>
              <p className="text-sm text-cave-text/70">{item.description}</p>
            </div>
            <div className="space-y-2">
              {item.subItems!.map((subItem) => {
                const SubIcon = subItem.icon;
                return (
                  <Link
                    key={subItem.to}
                    to={subItem.to}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-turquoise/5 transition-colors duration-200 group"
                  >
                    <div className="mt-0.5">
                      <SubIcon size={16} className="text-turquoise" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-cave-text group-hover:text-turquoise transition-colors">
                        {subItem.label}
                      </div>
                      <div className="text-sm text-cave-text/60 mt-0.5">
                        {subItem.description}
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-cave-text/40 group-hover:text-turquoise/60 transition-colors" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default function MainNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu and mega-nav on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHoveredSection(null);
  }, [location.pathname]);

  // Handle escape key to close modals
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setHoveredSection(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        key="main-nav" // Ensure unique key to prevent duplicates
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cave-bg/90 backdrop-blur-md border-b border-cave-border shadow-lg'
            : 'bg-transparent'
        } py-4`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/images/logos/header-logo.png"
              alt="BearCave Marketing"
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center">
              {NAV_SECTIONS.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={!item.subItems && isActive(item.to!)}
                  hoveredSection={hoveredSection}
                  onHover={setHoveredSection}
                  onClick={() => setMobileMenuOpen(false)}
                />
              ))}
            </ul>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-cave-border">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise/50 ${
                    action.cta
                      ? 'bg-turquoise text-cave-bg hover:bg-turquoise/90 shadow-lg hover:shadow-turquoise/25'
                      : 'text-cave-text hover:text-turquoise hover:bg-turquoise/5'
                  }`}
                >
                  {action.label}
                </Link>
              ))}

              {/* Command Palette Trigger */}
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-cave-text/70 hover:text-turquoise hover:bg-turquoise/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-turquoise/50"
                aria-label="Open command palette"
              >
                <Search size={16} />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-cave-border rounded">
                  <Command size={12} />
                  K
                </kbd>
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 text-cave-text/70 hover:text-turquoise transition-colors"
              aria-label="Open command palette"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cave-text hover:text-turquoise transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-cave-bg/95 backdrop-blur-md border-b border-cave-border lg:hidden"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-6">
                {NAV_SECTIONS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="space-y-3">
                      <div className="flex items-center gap-3 text-turquoise">
                        <Icon size={20} />
                        <h3 className="text-lg font-semibold">{item.label}</h3>
                      </div>

                      {item.subItems ? (
                        <div className="pl-8 space-y-2">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            return (
                              <Link
                                key={subItem.to}
                                to={subItem.to}
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-3 rounded-lg text-cave-text/80 hover:text-turquoise hover:bg-turquoise/5 transition-all"
                              >
                                <SubIcon size={18} />
                                <div>
                                  <div className="font-medium">{subItem.label}</div>
                                  <div className="text-sm text-cave-text/60">{subItem.description}</div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <Link
                          to={item.to!}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block pl-8 py-2 text-cave-text/80 hover:text-turquoise transition-colors"
                        >
                          {item.description}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Quick Actions */}
                <div className="pt-4 border-t border-cave-border space-y-3">
                  {QUICK_ACTIONS.map((action) => (
                    <Link
                      key={action.to}
                      to={action.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                        action.cta
                          ? 'bg-turquoise text-cave-bg text-center'
                          : 'text-cave-text hover:text-turquoise hover:bg-turquoise/5'
                      }`}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Menu Toggle (Global Keyboard Handler) */}
      <CommandMenuToggle />
    </>
  );
}