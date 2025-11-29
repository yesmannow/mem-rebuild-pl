import React, { useState, useEffect } from 'react';
import { scrollToAnchor } from '../utils/scroll';

const navItems = [
  { id: 'home', label: 'Home', type: 'anchor' },
  { id: 'about', label: 'About', type: 'anchor' },
  { id: 'case-studies', label: 'Case Studies', type: 'anchor' },
  { id: 'resume', label: 'Resume', type: 'anchor' },
  { id: 'skills', label: 'Skills', type: 'anchor' },
  { id: 'testimonials', label: 'Testimonials', type: 'anchor' },
  { id: 'inspiration', label: 'Inspiration', type: 'page' },
  { id: 'contact', label: 'Contact', type: 'anchor' }
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems
        .filter(item => item.type === 'anchor')
        .map(item => item.id);

      let current = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'anchor') {
      scrollToAnchor(item.id, { offset: 80 });
    } else {
      window.location.href = `/${item.id}`;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="text-xl font-bold text-white">
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick(navItems[0]); }} className="hover:text-blue-400 transition-colors">
              Jacob Darling
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-400 ${
                  activeSection === item.id
                    ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
                    : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
