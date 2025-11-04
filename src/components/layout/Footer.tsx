import React from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import "./Footer.css";

const Footer: React.FC = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-brand">
        <Link
          to="/about"
          className="footer-profile-link"
        >
          <img
            src="/images/bio/241311036_10117555583372059_173429180650836298_n.webp"
            alt="Jacob Darling"
            className="footer-profile-image"
          />
          <div>
            <h3 className="footer-profile-title">Jacob Darling</h3>
            <p className="footer-profile-subtitle">Marketing Strategist & Systems Architect</p>
          </div>
        </Link>
      </div>
      <div className="footer-links">
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/case-studies">Case Studies</Link></li>
            <li><Link to="/applications">Applications</Link></li>
            <li><Link to="/design">Design</Link></li>
            <li><Link to="/photography">Photography</Link></li>
            <li><Link to="/toolbox">Toolbox</Link></li>
            <li><Link to="/resume">Résumé</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <ul>
            <li>
              <a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Icon slug="linkedin" className="footer-icon h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer" className="footer-link-with-icon">
                <Icon slug="github" className="footer-icon h-4 w-4" />
                <span>GitHub</span>
              </a>
            </li>
            <li><Link to="/contact">Contact Me</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 Jacob Darling. All rights reserved.</p>
      <p className="footer-quote">"Systems create freedom."</p>
    </div>
  </footer>
);

export default Footer;