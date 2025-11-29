import React from 'react';
import Logo from '../branding/Logo';
import SignalTape from '../home/SignalTape';

const Footer: React.FC = () => {
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

  return (
    <>
      {/* Signal Tape - Metrics marquee */}
      <SignalTape />

      <footer className="bg-[var(--ink-900)] text-[var(--parchment-050)] py-12 border-t border-[var(--ink-700)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Logo variant="lockup" size={32} tone="mono" />
            <p className="text-[var(--parchment-050)]/60 text-sm mt-4 font-body">
              Marketing systems that drive measurable growth.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors text-sm font-body"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[var(--parchment-050)]/60 hover:text-[var(--signal-500)] transition-colors text-sm font-body"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--ink-700)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--parchment-050)]/60 text-sm font-mono">
            © {currentYear} Jacob Darling · All systems engineered in Indianapolis
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="https://linkedin.com/in/jacobdarling"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/JdarlingGT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
