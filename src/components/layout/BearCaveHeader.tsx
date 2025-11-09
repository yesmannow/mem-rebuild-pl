import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./BearCaveHeader.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Applications", to: "/applications" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" }
];

export default function BearCaveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Link to="/contact" className="btn-primary bearcave-header__mobile-cta">
          Work With Me
        </Link>
      </nav>
    </header>
  );
}

