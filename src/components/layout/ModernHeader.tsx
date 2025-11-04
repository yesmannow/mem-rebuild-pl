import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Briefcase,
  Palette,
  Wrench,
  FileText,
  ArrowRight,
  Mail
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { scrollToTop } from "../../utils/scroll";

const ModernHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [glow, setGlow] = useState(false);
  const { pathname } = useLocation();

  // Detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll hide / reveal logic with cinematic timing
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY ? "down" : "up";
      if (Math.abs(y - lastY) > 5) {
        setVisible(direction === "up" || y < 50);
        setGlow(direction === "up" && y > 100);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smooth scroll to top when logo is clicked
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Simplified navigation - fewer, more focused links
  const mainNav = [
    { to: "/about", label: "About", icon: <User className="w-4 h-4" /> },
    { to: "/case-studies", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
    { to: "/design", label: "Design", icon: <Palette className="w-4 h-4" /> },
    { to: "/toolbox", label: "Skills", icon: <Wrench className="w-4 h-4" /> },
  ];

  const quickActions = [
    { to: "/resume", label: "Resume", icon: <FileText className="w-4 h-4" />, primary: true },
    { to: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" />, primary: false },
  ];

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700
        ${glow
          ? "bg-black/80 backdrop-blur-xl border-b border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          : "bg-black/60 backdrop-blur-xl border-b border-white/10"
        }
      `}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* CINEMATIC LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={handleLogoClick}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 blur-xl scale-150" />

            {/* Main logo container */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-black via-gray-900 to-black border border-white/20 flex items-center justify-center">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full bg-black" />
              </div>

              {/* JD Text with gradient */}
              <span className="relative text-sm font-bold bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
                JD
              </span>
            </div>
          </motion.div>

          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-wide group-hover:text-blue-400 transition-colors duration-300">
              Jacob Darling
            </span>
            <span className="text-xs text-gray-400 -mt-1 group-hover:text-pink-400 transition-colors duration-300">
              Creative Technologist
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION - Simplified and Cinematic */}
        {!isMobile && (
          <div className="flex items-center gap-8">
            {/* Main Navigation */}
            <div className="flex items-center gap-6">
              {mainNav.map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group
                      ${pathname === item.to
                        ? "text-blue-400 bg-blue-500/10 border border-blue-500/20"
                        : "text-white/80 hover:text-blue-400 hover:bg-white/5 border border-transparent hover:border-white/10"
                      }
                    `}
                  >
                    <span className={`transition-colors duration-300 ${pathname === item.to ? "text-blue-400" : "text-white/60 group-hover:text-blue-400"}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Elegant separator */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              {quickActions.map((action) => (
                <motion.div
                  key={action.to}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={action.to}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group
                      ${action.primary
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                      }
                    `}
                  >
                    <span className={action.primary ? "text-white" : "text-white/80 group-hover:text-blue-400 transition-colors"}>
                      {action.icon}
                    </span>
                    <span>{action.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE TOGGLE - More Elegant */}
        {isMobile && (
          <motion.button
            className="relative w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={{ rotate: mobileOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        )}
      </nav>

      {/* MOBILE MENU - Redesigned for cinematic feel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8">
              {/* Main Navigation */}
              <div className="space-y-2 mb-8">
                {mainNav.map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group
                        ${pathname === item.to
                          ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                          : "hover:bg-white/5 text-white border border-transparent"
                        }
                      `}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                        ${pathname === item.to
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/10 text-white/60 group-hover:bg-blue-500/20 group-hover:text-blue-400"
                        }
                      `}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-400">
                          {item.to === "/about" && "My story & background"}
                          {item.to === "/case-studies" && "Project case studies"}
                          {item.to === "/design" && "Visual design work"}
                          {item.to === "/toolbox" && "Skills & technologies"}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all ml-auto" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (mainNav.length * 0.1) + (index * 0.1) }}
                  >
                    <Link
                      to={action.to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-center gap-3 w-full p-4 rounded-xl font-medium transition-all duration-300 group
                        ${action.primary
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg"
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30"
                        }
                      `}
                    >
                      <span className={action.primary ? "text-white" : "text-white/80 group-hover:text-blue-400"}>
                        {action.icon}
                      </span>
                      <span>{action.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default ModernHeader;
