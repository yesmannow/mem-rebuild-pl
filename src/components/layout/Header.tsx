import React, { useRef, useEffect } from 'react';
import { useFloating, autoUpdate, offset, flip, shift, useClick, useDismiss, useInteractions, FloatingFocusManager } from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/ui';
import ThemeToggle from '../theme/ThemeToggle';
import './Header.css';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { mobileNavOpen, toggleMobileNav } = useUIStore();
  const [isMobile, setIsMobile] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);

  // Floating UI for mobile menu
  const { refs, floatingStyles, context } = useFloating({
    open: mobileNavOpen,
    onOpenChange: toggleMobileNav,
    placement: 'bottom-start',
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  // Detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced scroll behavior for sticky nav
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY ? 'down' : 'up';
      if (Math.abs(y - lastY) > 5) {
        setVisible(direction === 'up' || y < 50);
        setScrolled(y > 50);
        lastY = y;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileNavOpen) {
      toggleMobileNav();
    }
  }, [pathname]);

  const links = [
    { to: '/about', label: 'About' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/side-projects', label: 'Client Work' },
    { to: '/applications', label: 'Playground' },
    { to: '/design', label: 'Design' },
    { to: '/photography', label: 'Photography' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/brand-builder', label: 'Brand Builder' },
    { to: '/inspiration', label: 'Inspiration' },
    { to: '/toolbox', label: 'Toolbox' },
    { to: '/resume', label: 'Résumé' },
  ];

  return (
    <motion.header
      className={`sticky-nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <nav className="nav-container">
        {/* BRAND */}
        <Link to="/" className="nav-brand">
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 120 120"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 3, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          >
            <defs>
              <linearGradient id="navGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="55" stroke="url(#navGradient)" strokeWidth="3" fill="none" />
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontSize="28"
              fontWeight="bold"
              fill="url(#navGradient)"
              fontFamily="Inter, system-ui"
            >
              JD
            </text>
          </motion.svg>
          <span className="nav-brand-text">Jacob Darling</span>
        </Link>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${pathname === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="btn-primary nav-cta">
                Contact
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        )}

        {/* MOBILE TOGGLE */}
        {isMobile && (
          <div className="nav-mobile-controls">
            <ThemeToggle />
            <button
              ref={refs.setReference}
              {...getReferenceProps()}
              className="nav-mobile-toggle"
              aria-label="Toggle Menu"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE MENU with Floating UI */}
      {isMobile && mobileNavOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <motion.div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="nav-mobile-links">
              {links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => toggleMobileNav()}
                    className={`nav-link ${pathname === link.to ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="btn-primary"
                  onClick={() => toggleMobileNav()}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        </FloatingFocusManager>
      )}
    </motion.header>
  );
};

export default Header;