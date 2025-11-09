import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, ChevronDown } from 'lucide-react';
import BearCaveLogo from '../branding/BearCaveLogo';
import { scrollToAnchor } from '../../utils/scroll';
import './BearCaveHeader.css';

export default function BearCaveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Navigation items with dropdown structure
  const navItems = [
    {
      label: 'About Me',
      to: '/about',
    },
    {
      label: 'Work',
      dropdown: [
        { to: '/case-studies', label: 'Case Studies', description: 'Project case studies' },
        { to: '/design', label: 'Graphic Design', description: 'Visual design portfolio' },
        { to: '/photography', label: 'Photography', description: 'Photo gallery' },
        { to: '/side-projects', label: 'Side Projects', description: 'Personal projects' },
      ],
    },
    {
      label: 'Tools/Skills',
      dropdown: [
        { to: '/applications', label: 'Dev Builds', description: 'Developer tools & applications' },
        { to: '/toolbox', label: 'Toolbox', description: 'Frameworks & systems' },
      ],
    },
    {
      label: 'Inspiration',
      dropdown: [
        { to: '/inspiration', label: 'Inspiration', description: 'Design inspiration' },
        { to: '/brand-builder', label: 'Brand Builder', description: 'Brand identity builder' },
        { to: '/gallery', label: 'Gallery', description: 'Brand gallery' },
      ],
    },
    {
      label: 'Contact',
      to: '/contact',
    },
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Close mobile menu on anchor click
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollToAnchor(anchorId, { offset: 100 });
  };

  // Scroll detection for fade-in/out effect and active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for background change
      setIsScrolled(currentScrollY > 12);

      // Determine active section based on scroll position
      const sections = ['home', 'about', 'experience', 'portfolio', 'skills', 'testimonials', 'resume', 'contact'];
      const scrollPosition = currentScrollY + 150; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }

      // Scroll fade-in/out logic (only if not reduced motion)
      if (!prefersReducedMotion) {
        const scrollThreshold = 100;

        if (currentScrollY < scrollThreshold) {
          // Always visible at top
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
          // Scrolling down - fade out
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - fade in immediately
          setIsVisible(true);
        }
      } else {
        // Always visible if reduced motion
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, prefersReducedMotion]);

  // Only show anchor nav on homepage
  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`bearcave-header ${isScrolled ? 'bearcave-header--scrolled' : ''} ${isVisible ? 'bearcave-header--visible' : 'bearcave-header--hidden'}`}
      style={prefersReducedMotion ? {} : {
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <div className="bearcave-header__inner">
        <a
          href={isHomePage ? '#home' : '/'}
          className="bearcave-header__brand"
          aria-label="Go to homepage"
          onClick={isHomePage ? (e) => handleAnchorClick(e, 'home') : undefined}
        >
          <BearCaveLogo variant="icon" size={40} animated={false} />
          <span className="bearcave-header__brand-text">BEARCAVE</span>
        </a>
        {isHomePage ? (
          <nav className="bearcave-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="bearcave-header__dropdown"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                      setHoveredDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setHoveredDropdown(null);
                      }, 150);
                    }}
                  >
                    <Link
                      to={item.dropdown[0]?.to || '#'}
                      className={`bearcave-header__dropdown-toggle ${
                        item.dropdown.some(d => location.pathname === d.to || location.pathname.startsWith(d.to + '/'))
                          ? 'bearcave-header__link--active'
                          : ''
                      }`}
                      aria-expanded={hoveredDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`bearcave-header__dropdown-icon ${
                          hoveredDropdown === item.label ? 'is-open' : ''
                        }`}
                      />
                    </Link>
                    {hoveredDropdown === item.label && (
                      <div
                        className="bearcave-header__dropdown-menu"
                        onMouseEnter={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setHoveredDropdown(item.label);
                        }}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setHoveredDropdown(null);
                          }, 150);
                        }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.to}
                            to={dropdownItem.to}
                            className={`bearcave-header__dropdown-item ${
                              location.pathname === dropdownItem.to ? 'is-active' : ''
                            }`}
                          >
                            <div className="bearcave-header__dropdown-item-label">
                              {dropdownItem.label}
                            </div>
                            {dropdownItem.description && (
                              <div className="bearcave-header__dropdown-item-desc">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to || '#'}
                  className={`bearcave-header__link ${
                    location.pathname === item.to ? 'bearcave-header__link--active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : (
          <nav className="bearcave-header__nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="bearcave-header__dropdown"
                    onMouseEnter={() => {
                      if (dropdownTimeoutRef.current) {
                        clearTimeout(dropdownTimeoutRef.current);
                      }
                      setHoveredDropdown(item.label);
                    }}
                    onMouseLeave={() => {
                      dropdownTimeoutRef.current = setTimeout(() => {
                        setHoveredDropdown(null);
                      }, 150);
                    }}
                  >
                    <Link
                      to={item.dropdown[0]?.to || '#'}
                      className={`bearcave-header__dropdown-toggle ${
                        item.dropdown.some(d => location.pathname === d.to || location.pathname.startsWith(d.to + '/'))
                          ? 'bearcave-header__link--active'
                          : ''
                      }`}
                      aria-expanded={hoveredDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`bearcave-header__dropdown-icon ${
                          hoveredDropdown === item.label ? 'is-open' : ''
                        }`}
                      />
                    </Link>
                    {hoveredDropdown === item.label && (
                      <div
                        className="bearcave-header__dropdown-menu"
                        onMouseEnter={() => {
                          if (dropdownTimeoutRef.current) {
                            clearTimeout(dropdownTimeoutRef.current);
                          }
                          setHoveredDropdown(item.label);
                        }}
                        onMouseLeave={() => {
                          dropdownTimeoutRef.current = setTimeout(() => {
                            setHoveredDropdown(null);
                          }, 150);
                        }}
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.to}
                            to={dropdownItem.to}
                            className={`bearcave-header__dropdown-item ${
                              location.pathname === dropdownItem.to ? 'is-active' : ''
                            }`}
                          >
                            <div className="bearcave-header__dropdown-item-label">
                              {dropdownItem.label}
                            </div>
                            {dropdownItem.description && (
                              <div className="bearcave-header__dropdown-item-desc">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to || '#'}
                  className={`bearcave-header__link ${
                    location.pathname === item.to ? 'bearcave-header__link--active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
        <div className="bearcave-header__cta">
          {isHomePage ? (
            <a
              href="#resume"
              className="btn-primary bearcave-header__resume-btn"
              aria-label="View Resume"
              onClick={(e) => handleAnchorClick(e, 'resume')}
            >
              <FileText size={18} />
              <span>View Resume</span>
            </a>
          ) : (
            <Link
              to="/resume"
              className="btn-primary bearcave-header__resume-btn"
              aria-label="View Resume"
            >
              <FileText size={18} />
              <span>View Resume</span>
            </Link>
          )}
        </div>
        <button
          className={`bearcave-header__menu ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {isHomePage ? (
        <nav
          className={`bearcave-header__mobile ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {/* Quick Action - View Resume pinned at bottom */}
          <a
            href="#resume"
            className="btn-primary bearcave-header__mobile-cta bearcave-header__mobile-resume"
            onClick={(e) => handleAnchorClick(e, 'resume')}
          >
            <FileText size={18} />
            <span>View Resume</span>
          </a>

          {/* Flat nav items */}
          <a
            href="#home"
            className={`bearcave-header__mobile-link ${activeSection === 'home' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'home')}
          >
            Home
          </a>
          <a
            href="#about"
            className={`bearcave-header__mobile-link ${activeSection === 'about' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'about')}
          >
            About
          </a>
          <a
            href="#experience"
            className={`bearcave-header__mobile-link ${activeSection === 'experience' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'experience')}
          >
            Experience
          </a>
          <a
            href="#portfolio"
            className={`bearcave-header__mobile-link ${activeSection === 'portfolio' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'portfolio')}
          >
            Portfolio
          </a>
          <a
            href="#skills"
            className={`bearcave-header__mobile-link ${activeSection === 'skills' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'skills')}
          >
            Skills
          </a>
          <a
            href="#testimonials"
            className={`bearcave-header__mobile-link ${activeSection === 'testimonials' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'testimonials')}
          >
            Testimonials
          </a>
          <a
            href="#resume"
            className={`bearcave-header__mobile-link ${activeSection === 'resume' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'resume')}
          >
            Resume
          </a>
          <a
            href="#contact"
            className={`bearcave-header__mobile-link ${activeSection === 'contact' ? 'bearcave-header__mobile-link--active' : ''}`}
            onClick={(e) => handleAnchorClick(e, 'contact')}
          >
            Contact
          </a>
        </nav>
      ) : (
        <nav
          className={`bearcave-header__mobile ${isMenuOpen ? 'is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className="bearcave-header__mobile-dropdown">
                  <div className="bearcave-header__mobile-dropdown-header">{item.label}</div>
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.to}
                      to={dropdownItem.to}
                      className={`bearcave-header__mobile-link ${
                        location.pathname === dropdownItem.to ? 'bearcave-header__mobile-link--active' : ''
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.to || '#'}
                className={`bearcave-header__mobile-link ${
                  location.pathname === item.to ? 'bearcave-header__mobile-link--active' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
