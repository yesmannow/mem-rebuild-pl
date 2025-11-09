import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  Code,
  FileText,
  ArrowUp,
} from 'lucide-react';
import { scrollToPosition, scrollToTop } from '../../utils/scroll';

interface NavItem {
  id: string;
  label: string;
  iconType: 'file' | 'briefcase' | 'code' | 'graduation' | 'award' | 'users';
}

const navItems: NavItem[] = [
  { id: 'summary', label: 'Summary', iconType: 'file' },
  { id: 'experience', label: 'Experience', iconType: 'briefcase' },
  { id: 'skills', label: 'Skills', iconType: 'code' },
  { id: 'education', label: 'Education', iconType: 'graduation' },
  { id: 'awards', label: 'Awards', iconType: 'award' },
  { id: 'testimonials', label: 'Testimonials', iconType: 'users' },
];

const getIcon = (type: NavItem['iconType']) => {
  switch (type) {
    case 'file':
      return <FileText size={16} />;
    case 'briefcase':
      return <Briefcase size={16} />;
    case 'code':
      return <Code size={16} />;
    case 'graduation':
      return <GraduationCap size={16} />;
    case 'award':
      return <Award size={16} />;
    case 'users':
      return <Users size={16} />;
    default:
      return <FileText size={16} />;
  }
};

const StickyNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Check which section is currently in view
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }

      // Show/hide navigation based on scroll position
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      scrollToPosition(offsetPosition, { duration: 0.8 });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
          {/* Progress Indicator */}
          <div className="absolute left-0 top-0 w-1 h-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
              style={{
                height: `${((navItems.findIndex(item => item.id === activeSection) + 1) / navItems.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Navigation Items */}
          <nav className="relative z-10">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`${activeSection === item.id ? 'text-blue-400' : 'text-gray-500'}`}>
                  {getIcon(item.iconType)}
                </div>
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-lg"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Mobile Sticky Navigation */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-around px-4 py-3 overflow-x-auto">
          {navItems.map(item => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 min-w-fit ${
                activeSection === item.id ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {getIcon(item.iconType)}
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => scrollToTop({ offset: 0, duration: 0.8 })}
        className="fixed bottom-8 right-8 lg:bottom-8 lg:right-32 z-50 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  );
};

export default StickyNavigation;
