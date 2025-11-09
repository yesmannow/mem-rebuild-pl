import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Download, Mail, ExternalLink, Users, TrendingUp, Zap, Shield, ChevronLeft, ChevronRight, Filter, Calendar, MapPin, Building2, Award, Code, GraduationCap, Quote } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import resumeData from "../data/resume.json";
import "../styles/bearcave-brand.css";
import "./Resume.css";

gsap.registerPlugin(ScrollTrigger);

const Resume: React.FC = () => {
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);
  const [showreelIndex, setShowreelIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const {
    name,
    title,
    intro,
    tagline,
    chips,
    contact,
    links,
    experience,
    skills,
    tools,
    education,
    communityLeadership,
    stats,
    metrics,
    testimonials,
    awards,
    showreel
  } = resumeData;

  // Extract unique years from experience
  const years = Array.from(new Set(
    experience.map(exp => {
      const match = exp.dates.match(/\d{4}/);
      return match ? match[0] : null;
    }).filter((year): year is string => year !== null)
  )).sort((a, b) => parseInt(b) - parseInt(a));

  // Group skills by category
  const skillCategories: { [key: string]: string[] } = {
    "Automation": skills.filter(s => s.toLowerCase().includes("automation") || s.toLowerCase().includes("crm")),
    "Analytics": skills.filter(s => s.toLowerCase().includes("analytics") || s.toLowerCase().includes("data") || s.toLowerCase().includes("attribution")),
    "Development": skills.filter(s => s.toLowerCase().includes("development") || s.toLowerCase().includes("code") || s.toLowerCase().includes("javascript") || s.toLowerCase().includes("react")),
    "Strategy": skills.filter(s => s.toLowerCase().includes("strategy") || s.toLowerCase().includes("leadership") || s.toLowerCase().includes("brand")),
    "Tools": tools
  };

  // GSAP Scroll Animations
  useEffect(() => {
    const sections = gsap.utils.toArray(".resume-section");

    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Timeline year tracking
    if (timelineRef.current) {
      experience.forEach((exp, index) => {
        const element = document.getElementById(`experience-${index}`);
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              const match = exp.dates.match(/\d{4}/);
              if (match && match[0]) setActiveYear(match[0]);
            },
            onEnterBack: () => {
              const match = exp.dates.match(/\d{4}/);
              if (match && match[0]) setActiveYear(match[0]);
            },
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
    };
  }, [experience]);

  // Auto-advance showreel
  useEffect(() => {
    const interval = setInterval(() => {
      setShowreelIndex((prev) => (prev + 1) % showreel.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showreel.length]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "users": return <Users size={24} />;
      case "trending": return <TrendingUp size={24} />;
      case "zap": return <Zap size={24} />;
      case "shield": return <Shield size={24} />;
      default: return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>{name} - Resume | BearCave Marketing</title>
        <meta name="description" content={`${title}. ${intro}`} />
        <meta property="og:title" content={`${name} - Resume`} />
        <meta property="og:description" content={intro} />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": name,
            "jobTitle": title,
            "url": links.website,
            "sameAs": [links.linkedin, links.github],
            "email": links.email,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": contact.location
            }
          })}
        </script>
      </Helmet>

      <main className="resume-page" id="resume-main">
        {/* Skip to content link */}
        <a href="#resume-content" className="skip-link">
          Skip to content
        </a>

        {/* Hero Section */}
        <section className="hero resume-hero" ref={heroRef} id="resume-hero">
          {/* Tech Background */}
          <div className="hero-bg">
            <div className="tech-grid" />
            <div className="gradient-overlay" />
          </div>

          <div className="hero-content" id="resume-content">
            <motion.h1
              className="hero-tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {name}
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {title}
            </motion.p>

            <motion.p
              className="hero-tagline-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {tagline}
            </motion.p>

            {/* Chips */}
            <motion.div
              className="hero-chips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {chips.map((chip, index) => (
                <span key={index} className="chip">
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <button className="btn-primary" onClick={handleDownloadPDF} aria-label="Download PDF resume">
                <Download size={20} />
                Download PDF
              </button>
              <Link to="/contact" className="btn-secondary">
                <Mail size={20} />
                Contact Me
              </Link>
            </motion.div>
          </div>

          {/* Animated Metrics Row */}
          <motion.div
            className="hero-metrics"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="metric-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="metric-icon">{getIcon(metric.icon)}</div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience Timeline */}
        <section className="resume-section experience-timeline-section" id="experience">
          <div className="container">
            <h2 className="section-heading">Career Journey</h2>
            <p className="section-subheading">
              A progression through strategic growth, technical innovation, and transformative leadership
            </p>

            <div className="timeline-wrapper" ref={timelineRef}>
              {/* Sticky Year Rail */}
              <div className="timeline-rail">
                {years.map((year) => (
                  <button
                    key={year}
                    className={`year-marker ${activeYear === year ? "active" : ""}`}
                    onClick={() => {
                      const expIndex = experience.findIndex(exp => exp.dates.includes(year));
                      if (expIndex !== -1) {
                        scrollToSection(`experience-${expIndex}`);
                      }
                    }}
                    aria-label={`Jump to ${year}`}
                  >
                    {year}
                  </button>
                ))}
              </div>

              {/* Experience Cards */}
              <div className="timeline-cards">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    id={`experience-${index}`}
                    className="card experience-card"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="experience-header">
                      <div>
                        <h3 className="experience-role">{exp.role}</h3>
                        <div className="experience-company">
                          <Building2 size={18} />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="experience-meta">
                        <div className="experience-date">
                          <Calendar size={16} />
                          <span>{exp.dates}</span>
                        </div>
                        <div className="experience-location">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="experience-summary">{exp.summary}</p>

                    {/* Impact Chips */}
                    <div className="impact-chips">
                      {exp.achievements.slice(0, 3).map((achievement, idx) => {
                        const match = achievement.match(/(\d+%|\d+K\+|\$\d+[KM]?)/);
                        if (match) {
                          return (
                            <span key={idx} className="chip impact-chip">
                              {match[1]}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    {/* Achievements (expandable) */}
                    <details className="achievements-details">
                      <summary className="achievements-summary">
                        <Award size={18} />
                        Key Achievements ({exp.achievements.length})
                      </summary>
                      <ul className="achievements-list">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </details>

                    {/* Technologies */}
                    {exp.technologies && (
                      <div className="technologies">
                        <Code size={18} />
                        <div className="tech-chips">
                          {exp.technologies.map((tech, idx) => (
                            <span key={idx} className="chip">{tech}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Matrix */}
        <section className="resume-section skills-section" id="skills">
          <div className="container">
            <h2 className="section-heading">Skills & Expertise</h2>
            <p className="section-subheading">
              A comprehensive toolkit spanning strategy, development, and automation
            </p>

            {/* Filter Toggles */}
            <div className="skill-filters">
              <button
                className={`chip filter-chip ${activeSkillFilter === null ? "active" : ""}`}
                onClick={() => setActiveSkillFilter(null)}
              >
                <Filter size={16} />
                All Skills
              </button>
              {Object.keys(skillCategories).map((category) => (
                <button
                  key={category}
                  className={`chip filter-chip ${activeSkillFilter === category ? "active" : ""}`}
                  onClick={() => setActiveSkillFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              {Object.entries(skillCategories).map(([category, items]) => {
                if (activeSkillFilter && activeSkillFilter !== category) return null;
                if (items.length === 0) return null;

                return (
                  <motion.div
                    key={category}
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="skill-category-title">{category}</h3>
                    <div className="skill-items">
                      {items.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="chip skill-chip"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Showreel Carousel */}
        {showreel && showreel.length > 0 && (
          <section className="resume-section showreel-section" id="showreel">
            <div className="container">
              <h2 className="section-heading">Featured Work</h2>
              <p className="section-subheading">
                A showcase of campaigns, dashboards, and systems I've built
              </p>

              <div className="showreel-carousel">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showreelIndex}
                    className="showreel-slide"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={showreel[showreelIndex].src}
                      alt={showreel[showreelIndex].title}
                      loading="lazy"
                    />
                    <div className="showreel-info">
                      <h3>{showreel[showreelIndex].title}</h3>
                      <p>{showreel[showreelIndex].description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <button
                  className="carousel-nav prev"
                  onClick={() => setShowreelIndex((prev) => (prev - 1 + showreel.length) % showreel.length)}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="carousel-nav next"
                  onClick={() => setShowreelIndex((prev) => (prev + 1) % showreel.length)}
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="carousel-indicators">
                  {showreel.map((_, idx) => (
                    <button
                      key={idx}
                      className={`indicator ${idx === showreelIndex ? "active" : ""}`}
                      onClick={() => setShowreelIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials + Metrics Panel */}
        <section className="resume-section testimonials-section" id="testimonials">
          <div className="container">
            <div className="testimonials-metrics-grid">
              {/* Testimonials */}
              <div className="testimonials-panel">
                <h2 className="section-heading">What Colleagues Say</h2>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={testimonialIndex}
                    className="testimonial-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote size={32} className="quote-icon" />
                    <p className="testimonial-quote">"{testimonials[testimonialIndex].quote}"</p>
                    <div className="testimonial-author">
                      <div>
                        <h4>{testimonials[testimonialIndex].name}</h4>
                        <p>{testimonials[testimonialIndex].role}</p>
                        {testimonials[testimonialIndex].company && (
                          <p className="testimonial-company">{testimonials[testimonialIndex].company}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Testimonial Navigation */}
                <div className="testimonial-nav">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      className={`testimonial-dot ${idx === testimonialIndex ? "active" : ""}`}
                      onClick={() => setTestimonialIndex(idx)}
                      aria-label={`View testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Metrics Panel */}
              <div className="metrics-panel">
                <h2 className="section-heading">Impact Metrics</h2>
                <div className="metrics-grid">
                  {metrics.map((metric, idx) => (
                    <motion.div
                      key={idx}
                      className="metric-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="metric-icon">{getIcon(metric.icon)}</div>
                      <div className="metric-value">{metric.value}</div>
                      <div className="metric-label">{metric.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Awards */}
        <section className="resume-section education-section" id="education">
          <div className="container">
            <div className="education-awards-grid">
              {/* Education */}
              <div>
                <h2 className="section-heading">
                  <GraduationCap size={32} />
                  Education
                </h2>
                {education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    className="card education-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3>{edu.degree}</h3>
                    <p className="education-institution">{edu.institution}</p>
                    <p className="education-year">{edu.year}</p>
                    {edu.details && <p className="education-details">{edu.details}</p>}
                  </motion.div>
                ))}
              </div>

              {/* Awards */}
              {awards && awards.length > 0 && (
                <div>
                  <h2 className="section-heading">
                    <Award size={32} />
                    Awards & Recognition
                  </h2>
                  {awards.map((award, idx) => (
                    <motion.div
                      key={idx}
                      className="card award-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h3>{award.title}</h3>
                      <p className="award-organization">{award.organization}</p>
                      <p className="award-year">{award.year}</p>
                      {award.description && <p className="award-description">{award.description}</p>}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="resume-section cta-banner-section">
          <div className="cta-banner">
            <h2 className="cta-heading">Let's build your growth engine.</h2>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">
                Work With Me
              </Link>
              <Link to="/case-studies" className="btn-secondary">
                See My Work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Resume;
