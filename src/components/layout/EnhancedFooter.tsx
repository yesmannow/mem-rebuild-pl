import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, ArrowUp } from 'lucide-react';
import AnimatedCaveLogo from '../branding/AnimatedCaveLogo';
import SignalTape from '../home/SignalTape';
import SystemLog from '../ui/SystemLog';
import { usePerformanceMetrics } from '../../hooks/usePerformanceMetrics';

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const metrics = usePerformanceMetrics();

  const footerLinks = {
    About: [
      { name: 'About Me', href: '/about' },
      { name: 'Resume', href: '/resume' },
    ],
    Work: [
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Projects', href: '/projects' },
    ],
    Connect: [
      { name: 'Contact', href: '/contact' },
      { name: 'LinkedIn', href: 'https://linkedin.com/in/jacobdarling', external: true },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Signal Tape - Metrics marquee */}
      <SignalTape />

      <footer className="relative bg-[var(--ink-900)] text-[var(--parchment-050)] border-t border-[var(--ink-700)] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03] blueprint-grid" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
            {/* Brand Section - Enhanced */}
            <motion.div
              className="col-span-1 md:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedCaveLogo variant="lockup" size={48} animated={true} />
              <p className="text-[var(--parchment-050)]/60 text-sm mt-6 font-body leading-relaxed max-w-sm">
                Marketing systems that drive measurable growth. From hypothesis to pipeline.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                <motion.a
                  href="https://linkedin.com/in/jacobdarling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--ink-700)] text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="https://github.com/JdarlingGT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--ink-700)] text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="/contact"
                  className="p-2 rounded-lg bg-[var(--ink-700)] text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Contact"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                className="col-span-1 md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <h4 className="font-display font-bold text-[var(--signal-500)] mb-4 text-lg">
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: categoryIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors text-sm font-body inline-flex items-center gap-1 group"
                        >
                          {link.name}
                          <motion.span
                            className="inline-block"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors text-sm font-body"
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter/CTA Section with System Log */}
            <motion.div
              className="col-span-1 md:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-display font-bold text-[var(--signal-500)] mb-4 text-lg">
                Let's Connect
              </h4>
              <p className="text-[var(--parchment-050)]/60 text-sm mb-4 font-body">
                Ready to build something amazing? Let's start a conversation.
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg hover:bg-[var(--signal-500)]/90 transition-colors font-body mb-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowUp size={16} className="rotate-45" />
              </motion.a>

              {/* System Log */}
              <SystemLog maxEntries={4} />
            </motion.div>
          </div>

          {/* Bottom Bar - System Status Style */}
          <motion.div
            className="border-t border-[var(--ink-700)] pt-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[var(--ink-700)]/50 backdrop-blur-sm rounded px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2 font-mono text-xs">
              {/* Left: Copyright */}
              <div className="text-[var(--parchment-050)]/60">
                © {currentYear} Jacob Darling
                <span className="text-[var(--parchment-050)]/40">|</span>
                <Link to="/privacy" className="hover:text-[var(--signal-500)] transition-colors">
                  Privacy
                </Link>
                <span className="text-[var(--parchment-050)]/40">|</span>
                <Link to="/terms" className="hover:text-[var(--signal-500)] transition-colors">
                  Terms
                </Link>
              </div>

              {/* Right: System Status with Live Metrics */}
              <div className="flex items-center gap-3 text-[var(--parchment-050)]/70 flex-wrap">
                {/* Status Indicator */}
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 rounded-full bg-green-500"
                    animate={{
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span>System: Operational</span>
                </div>

                <span className="text-[var(--parchment-050)]/40">|</span>

                {/* Performance Metrics */}
                <div className="flex items-center gap-1">
                  <span>⚡</span>
                  <span>Latency: {metrics.latency}ms</span>
                </div>
                {metrics.memory && (
                  <>
                    <span className="text-[var(--parchment-050)]/40">|</span>
                    <div className="flex items-center gap-1">
                      <span>💾</span>
                      <span>{metrics.memory.used}MB</span>
                    </div>
                  </>
                )}

                <span className="text-[var(--parchment-050)]/40">|</span>

                {/* Version */}
                <div className="flex items-center gap-1">
                  <span>⚡</span>
                  <span>v2.5.0</span>
                </div>

                <span className="text-[var(--parchment-050)]/40">|</span>

                {/* Location */}
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>Indianapolis</span>
                </div>

                {/* Scroll to Top Button */}
                <motion.button
                  onClick={scrollToTop}
                  className="ml-2 p-1.5 rounded bg-[var(--ink-900)] text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={14} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Status Bar */}
      <div className="bg-[var(--ink-900)] border-t border-[var(--ink-700)] text-slate-400 font-mono text-xs">
        <div className="container mx-auto px-4 md:px-8 py-2 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span>STATUS: OPERATIONAL</span>
          </div>
          <span className="uppercase tracking-wide">LATENCY: 24ms</span>
          <span className="uppercase tracking-wide">NODE: US-EAST-1</span>
          <span className="uppercase tracking-wide">BUILD: v2.4.0</span>
        </div>
      </div>
    </>
  );
};

export default EnhancedFooter;

