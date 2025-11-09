import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import "./BearCaveHeader.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" }
];

const workMenuItems = [
  { label: "Graphic Design", to: "/design", description: "Visual design portfolio" },
  { label: "Photography", to: "/photography", description: "Photo gallery" },
  { label: "Case Studies", to: "/case-studies", description: "Project case studies" },
  { label: "Developer Tools", to: "/applications", description: "Custom tools & apps I build" }
];

export default function BearCaveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const workMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsWorkMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (workMenuRef.current && !workMenuRef.current.contains(event.target as Node)) {
        setIsWorkMenuOpen(false);
      }
    };

    if (isWorkMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWorkMenuOpen]);

  const isWorkPage = workMenuItems.some(item => location.pathname === item.to);

  return (
    <header className={`bearcave-header ${isScrolled ? "bearcave-header--scrolled" : ""}`}>
      <div className="bearcave-header__inner">
        <Link to="/" className="bearcave-header__brand" aria-label="Go to homepage">
          BearCave
        </Link>
        <nav className="bearcave-header__nav" aria-label="Primary navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `bearcave-header__link ${isActive ? "bearcave-header__link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {/* My Work Dropdown */}
          <div className="bearcave-header__dropdown" ref={workMenuRef}>
            <button
              className={`bearcave-header__dropdown-toggle ${isWorkPage ? "bearcave-header__link--active" : ""}`}
              onClick={() => setIsWorkMenuOpen(!isWorkMenuOpen)}
              aria-expanded={isWorkMenuOpen}
              aria-haspopup="true"
            >
              My Work
              <ChevronDown className={`bearcave-header__dropdown-icon ${isWorkMenuOpen ? "is-open" : ""}`} size={16} />
            </button>
            {isWorkMenuOpen && (
              <div className="bearcave-header__dropdown-menu">
                {workMenuItems.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`bearcave-header__dropdown-item ${location.pathname === item.to ? "is-active" : ""}`}
                    onClick={() => setIsWorkMenuOpen(false)}
                  >
                    <div className="bearcave-header__dropdown-item-label">{item.label}</div>
                    <div className="bearcave-header__dropdown-item-desc">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="bearcave-header__cta">
          <Link to="/contact" className="btn-primary" aria-label="Work with me">
            Work With Me
          </Link>
        </div>
        <button
          className={`bearcave-header__menu ${isMenuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(prev => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <nav
        className={`bearcave-header__mobile ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `bearcave-header__mobile-link ${isActive ? "bearcave-header__mobile-link--active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <div className="bearcave-header__mobile-section">
          <div className="bearcave-header__mobile-section-title">My Work</div>
          {workMenuItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `bearcave-header__mobile-link bearcave-header__mobile-link--sub ${isActive ? "bearcave-header__mobile-link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <Link to="/contact" className="btn-primary bearcave-header__mobile-cta">
          Work With Me
        </Link>
      </nav>
    </header>
  );
}

