import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import InteractiveLogo from './InteractiveLogo';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Work', path: '/case-studies' },
    { name: 'Services', path: '/services' },
    { name: 'The Stack', path: '/tools' },
    { name: 'Bio', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed w-full z-[100] bg-brand-dark/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* BRANDING: Personal Identity - Living Logo */}
          <Link to="/" className="flex items-center">
            <InteractiveLogo size={40} showText={true} />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path) ? 'text-brand-teal' : 'text-brand-muted'
                } hover:text-brand-teal transition-colors font-medium text-sm uppercase tracking-wide`}
              >
                {link.name}
              </Link>
            ))}

            <a
              href="mailto:jacob@jacobdarling.com"
              className="bg-brand-teal text-brand-dark px-5 py-2.5 rounded-md font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(64,224,208,0.3)] hover:shadow-[0_0_25px_rgba(64,224,208,0.5)]"
            >
              Start Project
            </a>
          </div>

          {/* MOBILE: Only "Start Project" Button (No Hamburger Menu) */}
          <div className="md:hidden">
            <a
              href="mailto:jacob@jacobdarling.com"
              className="bg-brand-teal text-brand-dark px-4 py-2 rounded-md font-bold text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(64,224,208,0.3)]"
            >
              Start Project
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

