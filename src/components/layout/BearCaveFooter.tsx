import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
import './BearCaveFooter.css';

const footerNavSections = [
  {
    title: 'About',
    links: [
      { label: 'About Me', to: '/about' },
      { label: 'Interactive Resume', to: '/resume' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'Side Projects', to: '/side-projects' },
      { label: 'Graphic Design', to: '/design' },
      { label: 'Photography', to: '/photography' },
    ],
  },
  {
    title: 'Tools/Skills',
    links: [
      { label: 'Developer Builds', to: '/applications' },
      { label: 'Toolbox', to: '/toolbox' },
    ],
  },
  {
    title: 'Inspiration',
    links: [
      { label: 'Brand Builder', to: '/brand-builder' },
      { label: 'Inspiration', to: '/inspiration' },
    ],
  },
  {
    title: 'Connect',
    links: [{ label: 'Contact', to: '/contact' }],
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/jacobdarling',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/JdarlingGT',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:hoosierdarling@gmail.com',
  },
];

export default function BearCaveFooter() {
  return (
    <footer className="bearcave-footer">
      <div className="bearcave-footer__inner">
        <div className="bearcave-footer__content">
          <div className="bearcave-footer__brand-section">
            <div className="bearcave-footer__brand">BearCave Marketing</div>
            <p className="bearcave-footer__bio">
              I'm Jacob Darling—a marketing strategist and systems architect. I build marketing
              systems that turn brands into revenue engines.
            </p>
            <div className="bearcave-footer__social">
              {socialLinks.map(social => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="bearcave-footer__social-link"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          <nav className="bearcave-footer__nav" aria-label="Footer navigation">
            {footerNavSections.map(section => (
              <div key={section.title} className="bearcave-footer__nav-section">
                <h4 className="bearcave-footer__nav-title">{section.title}</h4>
                <ul className="bearcave-footer__nav-list">
                  {section.links.map(link => (
                    <li key={link.to}>
                      <Link to={link.to} className="bearcave-footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="bearcave-footer__meta">
          © {new Date().getFullYear()} Jacob Darling · All systems engineered in Indianapolis
        </div>
      </div>
    </footer>
  );
}
