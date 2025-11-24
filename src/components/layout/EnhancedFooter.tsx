import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, ArrowUp } from 'lucide-react';
import AnimatedCaveLogo from '../branding/AnimatedCaveLogo';
import SignalTape from '../home/SignalTape';

const EnhancedFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="/contact"
                  className="p-2 rounded-lg bg-[var(--ink-700)] text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
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

            {/* Newsletter/CTA Section */}
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold rounded-lg hover:bg-[var(--signal-500)]/90 transition-colors font-body"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <ArrowUp size={16} className="rotate-45" />
              </motion.a>
            </motion.div>
          </div>

          {/* Bottom Bar - Enhanced */}
          <motion.div
            className="border-t border-[var(--ink-700)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-[var(--parchment-050)]/60 text-sm font-mono text-center md:text-left">
              © {currentYear} Jacob Darling · All systems engineered in Indianapolis
            </p>

            <div className="flex items-center gap-6">
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-[var(--ink-700)] text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] hover:bg-[var(--signal-500)]/10 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default EnhancedFooter;

