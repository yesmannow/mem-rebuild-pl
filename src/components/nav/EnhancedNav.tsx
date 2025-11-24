import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  Mail,
} from 'lucide-react';
import AnimatedCaveLogo from '../branding/AnimatedCaveLogo';
import CommandMenuToggle from '../command/CommandMenuToggle';

// Navigation data structure
const NAV_SECTIONS = [
  {
    label: 'About Me',
    to: '/about',
    icon: User,
    description: 'Learn about my journey and background',
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
        description: 'Deep-dive into problem-solving and results',
      },
      {
        label: 'Graphic Design',
        to: '/design',
        icon: Palette,
        description: 'Visual identity and brand systems',
      },
      {
        label: 'Photography',
        to: '/photography',
        icon: Camera,
        description: 'Visual storytelling and composition',
      },
      {
        label: 'Side Projects',
        to: '/side-projects',
        icon: Code,
        description: 'Experimental work and collaborations',
      },
    ],
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
        description: 'Custom applications and interactive tools',
      },
      {
        label: 'Demos',
        to: '/demos',
        icon: Code,
        description: 'Interactive demos and prototypes',
      },
      {
        label: 'Toolbox',
        to: '/toolbox',
        icon: Wrench,
        description: 'Frameworks, templates, and resources',
      },
    ],
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
        description: 'Design references and creative influences',
      },
      {
        label: 'Brand Builder',
        to: '/brand-builder',
        icon: Building2,
        description: 'Interactive brand identity creation tool',
      },
      {
        label: 'Gallery',
        to: '/gallery',
        icon: Palette,
        description: 'Curated brand identity systems',
      },
    ],
  },
  {
    label: 'Contact',
    to: '/contact',
    icon: Mail,
    description: 'Get in touch for collaborations',
  },
];

const QUICK_ACTIONS = [
  { label: 'View Resume', to: '/resume', cta: true },
  { label: 'Go to Home', to: '/', icon: Home },
];

interface NavItemProps {
  item: typeof NAV_SECTIONS[0];
  isActive: boolean;
  hoveredSection: string | null;
  onHover: (label: string | null) => void;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  hoveredSection,
  onHover,
  onClick,
}) => {
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
        <motion.button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--signal-500)]/50 ${
            isActive
              ? 'text-[var(--signal-500)] bg-[var(--signal-500)]/10'
              : 'text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5'
          }`}
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon size={18} />
          <span className="font-medium font-body">{item.label}</span>
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      ) : (
        <Link
          to={item.to!}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--signal-500)]/50 ${
            isActive
              ? 'text-[var(--signal-500)] bg-[var(--signal-500)]/10'
              : 'text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5'
          }`}
          onClick={onClick}
        >
          <Icon size={18} />
          <span className="font-medium font-body">{item.label}</span>
        </Link>
      )}

      {/* Enhanced Mega-nav dropdown */}
      <AnimatePresence>
        {hasSubItems && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
            className="absolute top-full left-0 mt-2 w-80 bg-[var(--ink-700)]/95 backdrop-blur-md border border-[var(--ink-700)] rounded-xl shadow-xl p-4 z-50"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 61, 0.1)',
            }}
          >
            <div className="mb-3 pb-3 border-b border-[var(--ink-700)]">
              <h3 className="text-lg font-display font-bold text-[var(--signal-500)] mb-1">
                {item.label}
              </h3>
              <p className="text-sm text-[var(--parchment-050)]/60 font-body">
                {item.description}
              </p>
            </div>
            <div className="space-y-2">
              {item.subItems!.map((subItem, index) => {
                const SubIcon = subItem.icon;
                return (
                  <motion.div
                    key={subItem.to}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={subItem.to}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--signal-500)]/10 transition-colors duration-200 group"
                    >
                      <div className="mt-0.5">
                        <SubIcon size={16} className="text-[var(--signal-500)]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[var(--parchment-050)] group-hover:text-[var(--signal-500)] transition-colors font-body">
                          {subItem.label}
                        </div>
                        <div className="text-sm text-[var(--parchment-050)]/60 mt-0.5 font-body">
                          {subItem.description}
                        </div>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-[var(--parchment-050)]/40 group-hover:text-[var(--signal-500)]/60 transition-colors"
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default function EnhancedNav() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(11, 16, 20, 0)', 'rgba(11, 16, 20, 0.95)']
  );
  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.1)']
  );

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
        key="enhanced-nav"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 py-4"
        style={{
          backgroundColor: scrolled ? undefined : 'transparent',
        }}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-md border-b"
          style={{
            backgroundColor: navBackground,
            borderColor: navBorder,
          }}
        />

        <div className="container mx-auto flex items-center justify-between px-6 relative z-10">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <AnimatedCaveLogo variant="lockup" size={scrolled ? 40 : 48} animated={true} />
            </motion.div>
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
            <div className="flex items-center gap-3 ml-6 pl-6 border-l border-[var(--ink-700)]">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.to}
                  to={action.to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--signal-500)]/50 ${
                    action.cta
                      ? 'bg-[var(--signal-500)] text-[var(--ink-900)] hover:bg-[var(--signal-500)]/90 shadow-lg hover:shadow-[var(--signal-500)]/25'
                      : 'text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5'
                  }`}
                >
                  {action.label}
                </Link>
              ))}

              {/* Command Palette Trigger */}
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--signal-500)]/50"
                aria-label="Open command palette"
              >
                <Search size={16} />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-[var(--ink-700)] rounded">
                  <Command size={12} />
                  K
                </kbd>
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              className="p-2 text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] transition-colors"
              aria-label="Open command palette"
            >
              <Search size={20} />
            </button>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--parchment-050)] hover:text-[var(--signal-500)] transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[var(--ink-900)]/95 backdrop-blur-md border-b border-[var(--ink-700)] lg:hidden"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-6">
                {NAV_SECTIONS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3 text-[var(--signal-500)]">
                        <Icon size={20} />
                        <h3 className="text-lg font-display font-bold">{item.label}</h3>
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
                                className="flex items-center gap-3 p-3 rounded-lg text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5 transition-all"
                              >
                                <SubIcon size={18} />
                                <div>
                                  <div className="font-medium font-body">{subItem.label}</div>
                                  <div className="text-sm text-[var(--parchment-050)]/60 font-body">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <Link
                          to={item.to!}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block pl-8 py-2 text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] transition-colors font-body"
                        >
                          {item.description}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                {/* Mobile Quick Actions */}
                <div className="pt-4 border-t border-[var(--ink-700)] space-y-3">
                  {QUICK_ACTIONS.map((action) => (
                    <Link
                      key={action.to}
                      to={action.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all font-body ${
                        action.cta
                          ? 'bg-[var(--signal-500)] text-[var(--ink-900)] text-center'
                          : 'text-[var(--parchment-050)] hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/5'
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

