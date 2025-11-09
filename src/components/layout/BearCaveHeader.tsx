import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, FileText } from "lucide-react";
import "./BearCaveHeader.css";

// Navigation menu structure
const aboutMenuItems = [
  { label: "About Me", to: "/about", description: "My story and background" },
  { label: "Interactive Resume", to: "/resume", description: "View my resume" }
];

const workMenuItems = [
  { label: "Case Studies", to: "/case-studies", description: "Project case studies" },
  { label: "Side Projects", to: "/side-projects", description: "Personal projects" },
  { label: "Graphic Design", to: "/design", description: "Visual design portfolio" },
  { label: "Photography", to: "/photography", description: "Photo gallery" }
];

const toolsSkillsMenuItems = [
  { label: "Developer Builds", to: "/applications", description: "Custom tools & apps I build" },
  { label: "Toolbox", to: "/toolbox", description: "Skills and technologies" }
];

const inspirationMenuItems = [
  { label: "Brand Builder", to: "/brand-builder", description: "Brand identity builder" },
  { label: "Inspiration", to: "/inspiration", description: "Design inspiration" }
];

export default function BearCaveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutMenuOpen, setIsAboutMenuOpen] = useState(false);
  const [isWorkMenuOpen, setIsWorkMenuOpen] = useState(false);
  const [isToolsSkillsMenuOpen, setIsToolsSkillsMenuOpen] = useState(false);
  const [isInspirationMenuOpen, setIsInspirationMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const aboutMenuRef = useRef<HTMLDivElement>(null);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const toolsSkillsMenuRef = useRef<HTMLDivElement>(null);
  const inspirationMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsAboutMenuOpen(false);
    setIsWorkMenuOpen(false);
    setIsToolsSkillsMenuOpen(false);
    setIsInspirationMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutMenuRef.current && !aboutMenuRef.current.contains(event.target as Node)) {
        setIsAboutMenuOpen(false);
      }
      if (workMenuRef.current && !workMenuRef.current.contains(event.target as Node)) {
        setIsWorkMenuOpen(false);
      }
      if (toolsSkillsMenuRef.current && !toolsSkillsMenuRef.current.contains(event.target as Node)) {
        setIsToolsSkillsMenuOpen(false);
      }
      if (inspirationMenuRef.current && !inspirationMenuRef.current.contains(event.target as Node)) {
        setIsInspirationMenuOpen(false);
      }
    };

    if (isAboutMenuOpen || isWorkMenuOpen || isToolsSkillsMenuOpen || isInspirationMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAboutMenuOpen, isWorkMenuOpen, isToolsSkillsMenuOpen, isInspirationMenuOpen]);

  // Check if current page is in a dropdown menu
  const isAboutPage = aboutMenuItems.some(item => location.pathname === item.to);
  const isWorkPage = workMenuItems.some(item => location.pathname === item.to);
  const isToolsSkillsPage = toolsSkillsMenuItems.some(item => location.pathname === item.to);
  const isInspirationPage = inspirationMenuItems.some(item => location.pathname === item.to);

  return (
    <header className={`bearcave-header ${isScrolled ? "bearcave-header--scrolled" : ""}`}>
      <div className="bearcave-header__inner">
        <Link to="/" className="bearcave-header__brand" aria-label="Go to homepage">
          BearCave
        </Link>
        <nav className="bearcave-header__nav" aria-label="Primary navigation">
          {/* About Dropdown */}
          <div className="bearcave-header__dropdown" ref={aboutMenuRef}>
            <button
              className={`bearcave-header__dropdown-toggle ${isAboutPage ? "bearcave-header__link--active" : ""}`}
              onClick={() => setIsAboutMenuOpen(!isAboutMenuOpen)}
              aria-expanded={isAboutMenuOpen}
              aria-haspopup="true"
            >
              About
              <ChevronDown className={`bearcave-header__dropdown-icon ${isAboutMenuOpen ? "is-open" : ""}`} size={16} />
            </button>
            {isAboutMenuOpen && (
              <div className="bearcave-header__dropdown-menu">
                {aboutMenuItems.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`bearcave-header__dropdown-item ${location.pathname === item.to ? "is-active" : ""}`}
                    onClick={() => setIsAboutMenuOpen(false)}
                  >
                    <div className="bearcave-header__dropdown-item-label">{item.label}</div>
                    <div className="bearcave-header__dropdown-item-desc">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Work Dropdown */}
          <div className="bearcave-header__dropdown" ref={workMenuRef}>
            <button
              className={`bearcave-header__dropdown-toggle ${isWorkPage ? "bearcave-header__link--active" : ""}`}
              onClick={() => setIsWorkMenuOpen(!isWorkMenuOpen)}
              aria-expanded={isWorkMenuOpen}
              aria-haspopup="true"
            >
              Work
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

          {/* Tools/Skills Dropdown */}
          <div className="bearcave-header__dropdown" ref={toolsSkillsMenuRef}>
            <button
              className={`bearcave-header__dropdown-toggle ${isToolsSkillsPage ? "bearcave-header__link--active" : ""}`}
              onClick={() => setIsToolsSkillsMenuOpen(!isToolsSkillsMenuOpen)}
              aria-expanded={isToolsSkillsMenuOpen}
              aria-haspopup="true"
            >
              Tools/Skills
              <ChevronDown className={`bearcave-header__dropdown-icon ${isToolsSkillsMenuOpen ? "is-open" : ""}`} size={16} />
            </button>
            {isToolsSkillsMenuOpen && (
              <div className="bearcave-header__dropdown-menu">
                {toolsSkillsMenuItems.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`bearcave-header__dropdown-item ${location.pathname === item.to ? "is-active" : ""}`}
                    onClick={() => setIsToolsSkillsMenuOpen(false)}
                  >
                    <div className="bearcave-header__dropdown-item-label">{item.label}</div>
                    <div className="bearcave-header__dropdown-item-desc">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Inspiration Dropdown */}
          <div className="bearcave-header__dropdown" ref={inspirationMenuRef}>
            <button
              className={`bearcave-header__dropdown-toggle ${isInspirationPage ? "bearcave-header__link--active" : ""}`}
              onClick={() => setIsInspirationMenuOpen(!isInspirationMenuOpen)}
              aria-expanded={isInspirationMenuOpen}
              aria-haspopup="true"
            >
              Inspiration
              <ChevronDown className={`bearcave-header__dropdown-icon ${isInspirationMenuOpen ? "is-open" : ""}`} size={16} />
            </button>
            {isInspirationMenuOpen && (
              <div className="bearcave-header__dropdown-menu">
                {inspirationMenuItems.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`bearcave-header__dropdown-item ${location.pathname === item.to ? "is-active" : ""}`}
                    onClick={() => setIsInspirationMenuOpen(false)}
                  >
                    <div className="bearcave-header__dropdown-item-label">{item.label}</div>
                    <div className="bearcave-header__dropdown-item-desc">{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Link */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `bearcave-header__link ${isActive ? "bearcave-header__link--active" : ""}`
            }
          >
            Contact
          </NavLink>
        </nav>
        <div className="bearcave-header__cta">
          <Link to="/resume" className="btn-primary bearcave-header__resume-btn" aria-label="View Resume">
            <FileText size={18} />
            <span>View Resume</span>
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
        {/* Quick Action - View Resume */}
        <Link to="/resume" className="btn-primary bearcave-header__mobile-cta bearcave-header__mobile-resume">
          <FileText size={18} />
          <span>View Resume</span>
        </Link>

        {/* About Section */}
        <div className="bearcave-header__mobile-section">
          <div className="bearcave-header__mobile-section-title">About</div>
          {aboutMenuItems.map(item => (
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

        {/* Work Section */}
        <div className="bearcave-header__mobile-section">
          <div className="bearcave-header__mobile-section-title">Work</div>
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

        {/* Tools/Skills Section */}
        <div className="bearcave-header__mobile-section">
          <div className="bearcave-header__mobile-section-title">Tools/Skills</div>
          {toolsSkillsMenuItems.map(item => (
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

        {/* Inspiration Section */}
        <div className="bearcave-header__mobile-section">
          <div className="bearcave-header__mobile-section-title">Inspiration</div>
          {inspirationMenuItems.map(item => (
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

        {/* Contact */}
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `bearcave-header__mobile-link ${isActive ? "bearcave-header__mobile-link--active" : ""}`
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

