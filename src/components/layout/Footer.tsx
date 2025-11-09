import React from 'react';

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
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">BearCave</h3>
            <p className="text-gray-400 text-sm">
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
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
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
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
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
  );
};

export default Footer;
