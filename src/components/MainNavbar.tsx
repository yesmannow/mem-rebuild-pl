import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { scrollToAnchor } from '../utils/scroll';
import './MainNavbar.css';

// Define nav structure in an array
const NAV_ITEMS = [
  {
    label: 'About Me',
    to: '/about',
  },
  {
    label: 'Work',
    subItems: [
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'Graphic Design', to: '/design' },
      { label: 'Photography', to: '/photography' },
      { label: 'Side Projects', to: '/side-projects' },
    ],
  },
  {
    label: 'Tools/Skills',
    subItems: [
      { label: 'Dev Builds', to: '/applications' },
      { label: 'Toolbox', to: '/toolbox' },
    ],
  },
  {
    label: 'Inspiration',
    subItems: [
      { label: 'Inspiration', to: '/inspiration' },
      { label: 'Brand Builder', to: '/brand-builder' },
      { label: 'Gallery', to: '/gallery' },
    ],
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];

// Home page anchor links
const HOME_ANCHORS = [
  { label: 'Home', anchor: 'home' },
  { label: 'About', anchor: 'about' },
  { label: 'Experience', anchor: 'experience' },
  { label: 'Portfolio', anchor: 'portfolio' },
  { label: 'Skills', anchor: 'skills' },
  { label: 'Testimonials', anchor: 'testimonials' },
  { label: 'Resume', anchor: 'resume' },
  { label: 'Contact', anchor: 'contact' },
];

export default function MainNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Listen to scroll position to change nav styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle anchor clicks on home page
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToAnchor(anchorId, { offset: 100 });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`main-navbar fixed w-full z-50 transition-all ${
    scrolled ? 'bg-[color:theme(\'colors.cave.bg\')]/80 backdrop-blur-xs shadow-md' : 'bg-transparent'
  } py-4`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[color:theme(colors.cave.ember)]"
        >
          BearCave
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex gap-8 items-center text-[color:theme(colors.cave.text)]">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => item.subItems && setOpenDropdown(item.label)}
              onMouseLeave={() => item.subItems && setOpenDropdown(null)}
            >
              {item.subItems ? (
                <>
                  <button
                    className="flex items-center gap-1 hover:text-[color:theme(colors.cave.ember)] transition focus:outline-none"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transform transition ${
                        openDropdown === item.label ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 bg-[color:theme(colors.cave.bg)] rounded-md shadow-lg border border-[color:theme(colors.cave.border)] px-4 py-2 space-y-2 min-w-[200px]"
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.to}>
                            <Link
                              to={sub.to}
                              className={`block px-2 py-1 hover:text-[color:theme(colors.cave.ember)] whitespace-nowrap transition ${
                                location.pathname === sub.to ? 'text-[color:theme(colors.cave.ember)]' : ''
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.to!}
                  className={`hover:text-[color:theme(colors.cave.ember)] transition ${
                    location.pathname === item.to ? 'text-[color:theme(colors.cave.ember)]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            {/* CTA Button */}
            <Link
              to="/resume"
              className="ml-4 inline-block bg-[color:theme(colors.cave.ember)] text-[color:theme(colors.cave.bg)] py-2 px-5 rounded-md font-medium hover:bg-[color:theme(colors.cave.ember)]/80 transition"
            >
              View Resume
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger & CTA */}
        <div className="lg:hidden flex items-center gap-4">
          <Link
            to="/resume"
            className="inline-block bg-[color:theme(colors.cave.ember)] text-[color:theme(colors.cave.bg)] py-2 px-4 rounded-md font-medium hover:bg-[color:theme(colors.cave.ember)]/80 transition text-sm"
          >
            Resume
          </Link>
          <button
            className="text-[color:theme(colors.cave.text)] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen ? "true" : "false"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[color:theme(colors.cave.bg)] border-t border-[color:theme(colors.cave.border)]"
          >
            <div className="container mx-auto px-6 py-4">
              {isHomePage ? (
                // Home page: Show anchor links
                <ul className="space-y-2">
                  {HOME_ANCHORS.map((item) => (
                    <li key={item.anchor}>
                      <a
                        href={`#${item.anchor}`}
                        onClick={(e) => handleAnchorClick(e, item.anchor)}
                        className="block py-2 text-[color:theme(colors.cave.text)] hover:text-[color:theme(colors.cave.ember)] transition"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                // Other pages: Show dropdown structure
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.label}>
                      {item.subItems ? (
                        <div className="space-y-1">
                          <div className="font-semibold text-[color:theme(colors.cave.ember)] py-2">
                            {item.label}
                          </div>
                          <ul className="pl-4 space-y-1">
                            {item.subItems.map((sub) => (
                              <li key={sub.to}>
                                <Link
                                  to={sub.to}
                                  className={`block py-1 text-[color:theme(colors.cave.text)] hover:text-[color:theme(colors.cave.ember)] transition ${
                                    location.pathname === sub.to ? 'text-[color:theme(colors.cave.ember)]' : ''
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link
                          to={item.to!}
                          className={`block py-2 text-[color:theme(colors.cave.text)] hover:text-[color:theme(colors.cave.ember)] transition ${
                            location.pathname === item.to ? 'text-[color:theme(colors.cave.ember)]' : ''
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
