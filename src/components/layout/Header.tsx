import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollDir, setScrollDir] = useState("up");
  const [glow, setGlow] = useState(false);
  const { pathname } = useLocation();

  // detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll hide / reveal logic with better thresholds
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY ? "down" : "up";
      if (Math.abs(y - lastY) > 5) {
        setScrollDir(direction);
        setVisible(direction === "up" || y < 50);
        setGlow(direction === "up" && y > 100);
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
    { to: "/inspiration", label: "Inspiration" },
    { to: "/toolbox", label: "Toolbox" },
    { to: "/resume", label: "Résumé" },
  ];

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-500
        ${glow ? "bg-black/60 shadow-[0_0_25px_rgba(59,130,246,0.4)]" : "bg-black/30"}
      `}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.svg
            width="110"
            height="110"
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
          <span className="text-white font-semibold text-lg tracking-wide group-hover:text-blue-400 transition">
            Jacob Darling
          </span>
        </Link>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <ul className="hidden lg:flex items-center gap-6">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`transition hover:text-blue-400 ${
                    pathname === link.to ? "text-blue-400 underline" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-black rounded-full font-medium hover:scale-105 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        )}

        {/* MOBILE TOGGLE */}
        {isMobile && (
          <button
            className="text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black/95 border-t border-white/10"
          >
            <ul className="flex flex-col items-center gap-4 py-6 text-lg">
              {links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`transition ${
                      pathname === link.to ? "text-blue-400" : "text-white hover:text-blue-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-black rounded-full font-medium hover:scale-105 transition"
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