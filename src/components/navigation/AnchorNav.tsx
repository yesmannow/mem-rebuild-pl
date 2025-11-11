import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import './AnchorNav.css';

interface AnchorItem {
  id: string;
  label: string;
}

interface AnchorNavProps {
  anchors: AnchorItem[];
  className?: string;
}

const AnchorNav: React.FC<AnchorNavProps> = ({ anchors, className = '' }) => {
  const [activeAnchor, setActiveAnchor] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header

      // Find the current section
      for (let i = anchors.length - 1; i >= 0; i--) {
        const element = document.getElementById(anchors[i].id);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveAnchor(anchors[i].id);
            break;
          }
        }
      }

      // Show/hide nav based on scroll position
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [anchors]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <motion.nav
      className={`anchor-nav ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="anchor-nav__list">
        {anchors.map(anchor => (
          <button
            key={anchor.id}
            onClick={() => scrollToSection(anchor.id)}
            className={`anchor-nav__item ${
              activeAnchor === anchor.id ? 'anchor-nav__item--active' : ''
            }`}
            aria-label={`Jump to ${anchor.label}`}
          >
            {anchor.label}
          </button>
        ))}
      </div>
      <button onClick={scrollToTop} className="anchor-nav__top" aria-label="Scroll to top">
        <ChevronUp size={18} />
      </button>
    </motion.nav>
  );
};

export default AnchorNav;
