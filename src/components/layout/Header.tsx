import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../theme/ThemeToggle";
import "./Header.css";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll behavior for sticky nav
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY ? "down" : "up";
      if (Math.abs(y - lastY) > 5) {
        setVisible(direction === "up" || y < 50);
        setScrolled(y > 50);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/about", label: "About" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/side-projects", label: "Client Work" },
    { to: "/applications", label: "Playground" },
    { to: "/design", label: "Design" },
    { to: "/photography", label: "Photography" },
    { to: "/gallery", label: "Gallery" },
    { to: "/brand-builder", label: "Brand Builder" },
    { to: "/inspiration", label: "Inspiration" },
    { to: "/toolbox", label: "Toolbox" },
    { to: "/resume", label: "Résumé" },
  ];

  return (
    <motion.header
      className={`sticky-nav ${scrolled ? "scrolled" : ""}`}
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
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
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
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
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${pathname === link.to ? "active" : ""}`}
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
              className="nav-mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="nav-mobile-menu"
          >
            <ul className="nav-mobile-links">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`nav-link ${pathname === link.to ? "active" : ""}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="btn-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
