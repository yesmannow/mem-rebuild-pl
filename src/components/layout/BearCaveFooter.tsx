import React from "react";
import { Link } from "react-router-dom";
import NewsletterForm from "../newsletter/NewsletterForm";
import "./BearCaveFooter.css";

const footerNav = [
  { label: "Home", to: "/" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Applications", to: "/applications" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" }
];

export default function BearCaveFooter() {
  return (
    <footer className="bearcave-footer">
      <div className="bearcave-footer__inner">
        <div className="bearcave-footer__content">
          <div className="bearcave-footer__brand-section">
            <div className="bearcave-footer__brand">BearCave Marketing</div>
            <p className="bearcave-footer__tagline">Marketing systems that drive measurable growth</p>
          </div>
          <nav className="bearcave-footer__nav" aria-label="Footer navigation">
            {footerNav.map(item => (
              <Link key={item.to} to={item.to} className="bearcave-footer__link">
                {item.label}
              </Link>
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

