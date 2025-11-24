import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Expertise', path: '/expertise' },
    { name: 'Tools & CLI', path: '/tools' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-brand-dark/90 backdrop-blur-sm border-b border-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* BRANDING: Personal Identity */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-brand-teal/10 rounded-lg flex items-center justify-center border border-brand-teal/20 group-hover:border-brand-teal transition-colors">
              <span className="text-brand-teal font-bold text-xl">JD</span>
            </div>
            <span className="text-brand-text font-bold text-lg tracking-tight group-hover:text-brand-teal transition-colors">
              Jacob Darling
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  location.pathname === link.path ? 'text-brand-teal' : 'text-brand-muted'
                } hover:text-brand-teal transition-colors font-medium text-sm uppercase tracking-wide`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="mailto:jacob@jacobdarling.com"
              className="bg-brand-teal text-brand-dark px-5 py-2.5 rounded-md font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(64,224,208,0.3)] hover:shadow-[0_0_25px_rgba(64,224,208,0.5)]"
            >
              Let's Talk
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-text">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-brand-surface border-t border-brand-muted/10">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-brand-text hover:text-brand-teal hover:bg-brand-dark rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

