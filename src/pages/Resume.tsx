import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Share2, Mail, ExternalLink, Eye, FileText, Sparkles, Zap } from "lucide-react";
import resumeData from "../data/resume.json";
import HeroIntro from "../components/resume/HeroIntro";
import Section from "../components/resume/Section";
import CTAButtons from "../components/resume/CTAButtons";
import ExperienceTimeline from "../components/resume/ExperienceTimeline";
import TimelineNavigation from "../components/resume/TimelineNavigation";
import AwardShowcase from "../components/awards/AwardShowcase";
import AwardsSection from "../components/resume/AwardsSection";
import LazyPDFDownload from "../components/resume/LazyPDFDownload";
import StickyNavigation from "../components/resume/StickyNavigation";
import SkillsWithProgress from "../components/resume/SkillsWithProgress";
import TestimonialsSection from "../components/resume/TestimonialsSection";
import { trackPortfolioEngagement, createTimeTracker } from "../utils/analytics";
import "./Resume.css";

const Resume: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("experience");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [cinematicMode, setCinematicMode] = useState(true);

  const { name, title, summary, contact, experience, skills, tools, education, communityLeadership, stats } = resumeData;

  // Track resume page view and time spent
  useEffect(() => {
    trackPortfolioEngagement.resumeView();
    const timeTracker = createTimeTracker('/resume');

    return () => {
      timeTracker.stop();
    };
  }, []);

  // Track section views
  useEffect(() => {
    trackPortfolioEngagement.resumeSectionView(activeSection);
  }, [activeSection]);

  const handlePDFGeneration = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => setIsGeneratingPDF(false), 2000);
  };

  const handleDownload = () => {
    // Legacy PDF download - will be replaced by dynamic PDF generation
    const legacyPDF = "/resume/Resume JD draft.pdf";
    window.open(legacyPDF, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Jacob Darling - Resume",
        text: "Check out Jacob Darling's resume - Marketing Strategist & Systems Architect",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Jacob Darling - Resume");
    const body = encodeURIComponent(`I'd like to share this resume with you:\n\n${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Cinematic Mode Toggle
  const toggleCinematicMode = () => {
    setCinematicMode(!cinematicMode);
  };

  if (cinematicMode) {
    return (
      <main className="bg-black text-white min-h-screen relative">
        {/* Cinematic Mode Toggle */}
        <motion.button
          onClick={toggleCinematicMode}
          className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye size={16} />
          <span className="text-sm">Classic View</span>
        </motion.button>

        {/* Hero Section */}
        <HeroIntro />

        {/* Sticky Navigation */}
        <StickyNavigation />

        {/* Main Content */}
        <div className="relative px-6 py-20 max-w-7xl mx-auto">
          {/* Professional Summary */}
          <Section title="Professional Summary" gradient="blue" delay={0.1}>
            <div id="summary" className="scroll-mt-32" />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                {summary}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex items-center justify-center gap-2 text-gray-400"
                >
                  <Mail size={16} />
                  <span>{contact.email}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center justify-center gap-2 text-gray-400"
                >
                  <span>{contact.location}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex items-center justify-center gap-2 text-gray-400"
                >
                  <ExternalLink size={16} />
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                    LinkedIn
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </Section>

          {/* CTA Buttons */}
          <CTAButtons />

          {/* Timeline Navigation */}
          <TimelineNavigation />

          {/* Cinematic Experience Timeline */}
          <div id="experience" className="scroll-mt-32" />
          <ExperienceTimeline />

          {/* Awards & Recognition */}
          <div id="awards" className="scroll-mt-32">
            <AwardShowcase />
          </div>

          {/* Skills & Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Section title="Core Skills" gradient="cyan" delay={0.3}>
              <div id="skills" className="scroll-mt-32" />
              <SkillsWithProgress />
            </Section>

            <Section title="Technologies & Tools" gradient="pink" delay={0.4}>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg text-center hover:bg-pink-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-sm text-gray-300">{tool}</span>
                  </motion.div>
                ))}
              </div>
            </Section>
          </div>

          {/* Education */}
          <Section title="Education" gradient="blue" delay={0.5}>
            <div id="education" className="scroll-mt-32" />
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden text-center p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl"
              >
                <img src="/images/education/iu-campus.svg" alt="Indiana University Campus" className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0" />
                <div className="relative z-10 flex flex-col items-center">
                    <img src="/images/education/iu-logo.svg" alt="Indiana University Logo" className="w-16 h-16 mb-4" />
                    <h3 className="text-xl font-bold text-blue-400 mb-2">{edu.degree}</h3>
                    <p className="text-lg text-gray-300 mb-2">{edu.institution}</p>
                    <p className="text-gray-400 mb-3">{edu.year}</p>
                    {edu.details && (
                      <p className="text-sm text-gray-400 italic">{edu.details}</p>
                    )}
                </div>
              </motion.div>
            ))}
          </Section>

          {/* Community Leadership */}
          <Section title="Community Leadership" gradient="purple" delay={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityLeadership.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-purple-400 mb-2">{role.role}</h3>
                  <p className="text-lg text-gray-300 mb-2">{role.organization}</p>
                  <p className="text-gray-400 mb-3">{role.dates}</p>
                  <p className="text-sm text-gray-400">{role.summary}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* 🏆 Gold Key Award Section */}
          <AwardsSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how my expertise in marketing strategy, system architecture, and technical leadership can drive your next project forward.
            </p>
            <CTAButtons />
          </motion.div>
        </div>
      </main>
    );
  }

  // Classic Resume View
  return (
    <main className="resume-page">
      {/* Cinematic Mode Toggle */}
      <motion.button
        onClick={toggleCinematicMode}
        className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Zap size={16} />
        <span className="text-sm">Cinematic Mode</span>
      </motion.button>

      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="resume-header">
          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {name}
          </motion.h1>
          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {title}
          </motion.p>
          <motion.p
            className="page-summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {summary}
          </motion.p>

          <motion.div
            className="resume-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <LazyPDFDownload
              isGeneratingPDF={isGeneratingPDF}
              setIsGeneratingPDF={setIsGeneratingPDF}
            />
            <motion.button
              className="action-btn secondary"
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
              Share
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={handleEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Email
            </motion.button>
          </motion.div>
        </header>
      </motion.section>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="resume-stats">
          <div className="stat-card">
            <motion.div
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {stats.experience}
            </motion.div>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="stat-card">
            <motion.div
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {stats.practitioners}
            </motion.div>
            <p className="stat-label">Practitioners Served</p>
          </div>
          <div className="stat-card">
            <motion.div
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {stats.caseStudies}
            </motion.div>
            <p className="stat-label">Case Studies</p>
          </div>
          <div className="stat-card">
            <motion.div
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              {stats.customApps}
            </motion.div>
            <p className="stat-label">Custom Apps Built</p>
          </div>
        </div>
      </motion.section>

      {/* Section Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="section-nav">
          {["experience", "skills", "tools", "education", "community"].map((section) => (
            <motion.button
              key={section}
              className={`section-btn ${activeSection === section ? "active" : ""}`}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section === "community" ? "Community Leadership" : section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      {activeSection === "experience" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="experience-section">
            <h2>Professional Experience</h2>
            {experience.map((job, index) => (
              <motion.div
                key={index}
                className="experience-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="job-header">
                  <div className="job-title-group">
                    <h3>{job.role}</h3>
                    <h4>{job.company}</h4>
                  </div>
                  <div className="job-meta">
                    <span className="period">{job.dates}</span>
                    <span className="location">{job.location}</span>
                  </div>
                </div>

                <p className="job-description">{job.summary}</p>

                <div className="achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {job.technologies && (
                  <div className="technologies">
                    <h5>Technologies Used:</h5>
                    <div className="tech-tags">
                      {job.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="skills-section">
            <h2>Core Skills</h2>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill}</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: "90%" }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Tools Section */}
      {activeSection === "tools" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="skills-section">
            <h2>Technologies & Tools</h2>
            <div className="tech-grid">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  className="tech-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="tech-name">{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Education Section */}
      {activeSection === "education" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="education-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{edu.degree}</h3>
                <h4>{edu.institution}</h4>
                <p className="edu-year">{edu.year}</p>
                {edu.details && <p className="edu-details">{edu.details}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Community Leadership Section */}
      {activeSection === "community" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="education-section">
            <h2>Community Leadership</h2>
            {communityLeadership.map((role, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{role.role}</h3>
                <h4>{role.organization}</h4>
                <p className="edu-year">{role.dates}</p>
                <p className="edu-details">{role.summary}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Download CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="resume-cta">
          <h3>Interested in working together?</h3>
          <p>Download my full resume or get in touch to discuss opportunities.</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Full Resume
            </motion.button>
            <Link to="/contact">
              <motion.button
                className="cta-btn secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                Contact Me
              </motion.button>
            </Link>
          </div>
          <motion.div
            className="cinematic-frame"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="gradient-border">
              <div className="frame-content">
                <FileText size={48} className="text-blue-400 mb-4" />
                <h4 className="text-xl font-semibold mb-2">Dynamic Resume System</h4>
                <p className="text-gray-400 text-sm mb-4">
                  This resume is powered by JSON data and generates a fresh PDF on every download.
                </p>
                <div className="contact-info">
                  <p className="text-sm text-gray-300">
                    <strong>Email:</strong> {contact.email}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Location:</strong> {contact.location}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Website:</strong> {contact.website}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Resume;
