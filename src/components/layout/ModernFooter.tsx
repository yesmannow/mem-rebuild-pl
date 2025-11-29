import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail,
  Linkedin,
  Github,
  ArrowUp,
  Briefcase,
  FlaskConical,
  Palette,
  User,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import ModernLogo from '../branding/ModernLogo';
import { SpotlightCard } from '../ui/SpotlightCard';

const ModernFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Work',
      icon: Briefcase,
      links: [
        { name: 'Case Studies', path: '/case-studies', description: 'Deep-dive problem solving' },
        { name: 'Projects', path: '/projects', description: 'Technical portfolio' },
      ],
    },
    {
      title: 'Explore',
      icon: Sparkles,
      links: [
        { name: 'The Lab', path: '/apps', description: 'Experimental tools' },
        { name: 'Studio', path: '/studio', description: 'Creative workspace' },
      ],
    },
    {
      title: 'About',
      icon: User,
      links: [
        { name: 'Bio', path: '/about', description: 'My story' },
        { name: 'Contact', path: '/contact', description: 'Get in touch' },
      ],
    },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/jacobdarling',
      icon: Linkedin,
      color: 'hover:text-[#0077b5]',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/JdarlingGT',
      icon: Github,
      color: 'hover:text-[#333]',
    },
    {
      name: 'Email',
      href: '/contact',
      icon: Mail,
      color: 'hover:text-[var(--signal-500)]',
    },
  ];

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-[var(--ink-900)] via-[var(--ink-900)] to-[#000] border-t border-[var(--ink-700)]/50 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--signal-500)]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#40E0D0]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(64, 224, 208, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(64, 224, 208, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-6 sm:mb-8 md:mb-12">
          {/* Brand Section */}
          <motion.div
            className="col-span-1 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="p-6 h-full">
              <ModernLogo size={48} showText={true} animated={true} />
              <motion.p
                className="text-[var(--parchment-050)]/70 text-sm mt-6 leading-relaxed max-w-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Marketing systems that drive measurable growth. From hypothesis to pipeline.
              </motion.p>

              {/* Social Links with Animation */}
              <div className="flex gap-2 sm:gap-3 mt-6 sm:mt-8">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`p-3 rounded-xl bg-[var(--ink-800)]/50 border border-[var(--ink-700)]/60 text-[var(--parchment-050)]/70 ${social.color} hover:border-[var(--signal-500)]/50 hover:bg-[var(--signal-500)]/10 transition-all duration-300 relative overflow-hidden group`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredLink(social.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                    aria-label={social.name}
                  >
                    <social.icon size={20} className="relative z-10" />
                    {/* Hover Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[var(--signal-500)]/20 to-[#40E0D0]/20 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredLink === social.name ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Navigation Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="col-span-1 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <SpotlightCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-[var(--signal-500)]/20 to-[#40E0D0]/20"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <section.icon className="w-5 h-5 text-[var(--signal-500)]" />
                  </motion.div>
                  <h4 className="font-bold text-lg text-white">
                    {section.title}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className="group flex items-start gap-3 text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-all duration-300"
                        onMouseEnter={() => setHoveredLink(link.path)}
                        onMouseLeave={() => setHoveredLink(null)}
                      >
                        <motion.span
                          className="mt-1 text-xs"
                          animate={{
                            x: hoveredLink === link.path ? 4 : 0,
                            opacity: hoveredLink === link.path ? 1 : 0.5,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                        <div className="flex-1">
                          <div className="font-medium text-sm group-hover:text-[var(--signal-500)] transition-colors">
                            {link.name}
                          </div>
                          <div className="text-xs text-[var(--parchment-050)]/40 mt-0.5">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}

          {/* CTA Section */}
          <motion.div
            className="col-span-1 lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SpotlightCard className="p-6 h-full bg-gradient-to-br from-[var(--ink-800)]/80 to-[var(--ink-900)]/80 border-[var(--signal-500)]/30">
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--signal-500)]/30 to-[#40E0D0]/30">
                  <Sparkles className="w-5 h-5 text-[var(--signal-500)]" />
                </div>
                <h4 className="font-bold text-lg text-white">Let&apos;s Connect</h4>
              </motion.div>

              <motion.p
                className="text-[var(--parchment-050)]/70 text-sm mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Ready to build something amazing? Let&apos;s start a conversation about your next project.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--signal-500)] to-[#40E0D0] text-[var(--ink-900)] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(255,165,0,0.4)] transition-all duration-300 overflow-hidden"
                  onMouseEnter={() => setHoveredLink('cta')}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="relative z-10">Get in Touch</span>
                  <motion.span
                    className="relative z-10"
                    animate={{
                      x: hoveredLink === 'cta' ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUp size={16} className="rotate-45" />
                  </motion.span>
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#40E0D0] to-[var(--signal-500)]"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredLink === 'cta' ? '0%' : '-100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            </SpotlightCard>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-[var(--ink-700)]/50 pt-8 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              className="text-[var(--parchment-050)]/60 text-sm font-mono"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span>© {currentYear} Jacob Darling</span>
              <span className="mx-2 text-[var(--parchment-050)]/30">•</span>
              <span>All rights reserved</span>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex items-center gap-4 text-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link
                to="/privacy"
                className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors font-mono text-xs"
              >
                Privacy
              </Link>
              <span className="text-[var(--parchment-050)]/30">•</span>
              <Link
                to="/terms"
                className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors font-mono text-xs"
              >
                Terms
              </Link>
              <span className="text-[var(--parchment-050)]/30">•</span>
              <motion.button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-[var(--ink-800)]/50 border border-[var(--ink-700)]/60 text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] hover:border-[var(--signal-500)]/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default ModernFooter;

