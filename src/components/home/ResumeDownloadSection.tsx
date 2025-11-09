import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, FileText } from 'lucide-react';
import { ROUTE_RESUME } from '../../lib/links';
import './ResumeDownloadSection.css';

const ResumeDownloadSection: React.FC = () => {
  return (
    <section id="resume" className="resume-download-section container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="resume-download-section__content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Download My Resume</h2>
        <p className="resume-download-section__description">
          ATS-ready, metrics-packed PDF with full experience, key wins, and technical proficiencies.
        </p>
        <ul className="resume-download-section__features">
          <li>Work History</li>
          <li>Campaign Metrics</li>
          <li>Tech Stack</li>
          <li>Certifications</li>
          <li>Strategic Roles</li>
        </ul>
        <div className="resume-download-section__buttons">
          <a
            href="/resume.pdf"
            download="Jacob-Darling-Resume.pdf"
            className="resume-download-section__button resume-download-section__button--primary"
          >
            <Download size={20} />
            <span>Download PDF Resume</span>
          </a>
          <Link
            to={ROUTE_RESUME}
            className="resume-download-section__button resume-download-section__button--secondary"
          >
            <FileText size={20} />
            <span>View Full Resume</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeDownloadSection;

