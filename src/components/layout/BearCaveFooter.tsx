import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterForm from '../newsletter/NewsletterForm';
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

export default function BearCaveFooter() {
  return (
    <footer className="bearcave-footer">
      <div className="bearcave-footer__inner">
        <div className="bearcave-footer__content">
          <div className="bearcave-footer__brand-section">
            <div className="bearcave-footer__brand">BearCave Marketing</div>
            <p className="bearcave-footer__tagline">
              Marketing systems that drive measurable growth
            </p>
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
        <div className="bearcave-footer__newsletter">
          <NewsletterForm />
        </div>
        <div className="bearcave-footer__meta">
          © {new Date().getFullYear()} Jacob Darling · All systems engineered in Indianapolis
        </div>
      </div>
    </footer>
  );
}
