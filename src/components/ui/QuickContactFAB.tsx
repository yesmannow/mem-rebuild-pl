import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mail, Calendar, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickContactFABProps {
  className?: string;
}

const QuickContactFAB: React.FC<QuickContactFABProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show FAB after user scrolls past the first section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactOptions = [
    {
      icon: Mail,
      label: 'Email Me',
      href: 'mailto:hoosierdarling@gmail.com',
      color: 'bg-brand-teal',
      external: true,
    },
    {
      icon: Calendar,
      label: 'Book a Call',
      href: 'https://cal.com/jacob-darling',
      color: 'bg-brand-orange',
      external: true,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/jacobdarling',
      color: 'bg-sky-500',
      external: true,
    },
  ];

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col gap-3"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.label}
                href={option.href}
                target={option.external ? '_blank' : undefined}
                rel={option.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 whitespace-nowrap"
              >
                <span className="rounded-lg bg-slate-900/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white shadow-lg border border-white/10">
                  {option.label}
                </span>
                <span className={`p-3 rounded-full ${option.color} text-white shadow-lg hover:scale-110 transition-transform`}>
                  <option.icon size={20} />
                </span>
              </motion.a>
            ))}
            
            {/* Contact Page Link */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: contactOptions.length * 0.05 }}
            >
              <Link
                to="/contact"
                className="flex items-center gap-3 whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                <span className="rounded-lg bg-slate-900/90 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white shadow-lg border border-white/10">
                  Full Contact Form
                </span>
                <span className="p-3 rounded-full bg-gradient-to-r from-brand-teal to-brand-orange text-white shadow-lg hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all ${
          isOpen 
            ? 'bg-slate-800 text-white' 
            : 'bg-gradient-to-r from-brand-teal to-brand-orange text-white glow-teal'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
};

export default QuickContactFAB;
