import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import ParallaxSection from "../components/animations/ParallaxSection";
import MorphingBlob from "../components/animations/MorphingBlob";
import ClientLogos from "../components/clients/ClientLogos";
import TheGapDiagram from "../components/diagrams/TheGapDiagram";
import VennDiagram from "../components/diagrams/VennDiagram";
import { fadeInUp } from "../utils/animations";
import "./About.css";

interface TimelineNode {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  year: string;
}

const timelineNodes: TimelineNode[] = [
  {
    id: "launchpad",
    title: "The Launchpad",
    subtitle: "My First Marketing Position",
    content: "Learned to stretch marketing budgets while proving measurable ROI. Designed campaign visuals and implemented tracking systems that demonstrated marketing's impact through data-driven analytics.",
    year: "Early Career"
  },
  {
    id: "pike-medical",
    title: "Pike Medical Consultants",
    subtitle: "Healthcare Marketing & Digital Strategy",
    content: "Built two healthcare websites from scratch and implemented digital marketing campaigns that drove thousands of patient visits. Managed Google Ads and Meta Ads campaigns, designed brand assets from logos to billboards, and created an integrated patient acquisition system combining web, advertising, and CRM automation.",
    year: "Agency Experience"
  },
  {
    id: "graston-technique",
    title: "Graston Technique®",
    subtitle: "Enterprise Marketing Automation & Growth",
    content: "Developed and implemented a comprehensive marketing automation system with 400+ workflows using FluentCRM and custom integrations. Built AI-powered customer support that reduced support tickets by 70%. Optimized WooCommerce checkout flows that increased conversions by 40%. Managed multi-channel advertising campaigns (Google Ads, Meta Ads, LinkedIn Ads) with measurable ROI. Configured advanced analytics with Google Tag Manager and GA4 for comprehensive campaign tracking.",
    year: "Enterprise Role"
  },
  {
    id: "current-portfolio",
    title: "Current Portfolio",
    subtitle: "Marketing Strategist & Marketing Technologist",
    content: "I bridge marketing strategy and technical execution.\n\nSpecializing in marketing automation, CRM campaigns, SEO/SEM optimization, analytics-driven strategy, and cross-functional project management. I build custom marketing tools, implement campaign automation, and deliver solutions with documented ROI that serve 30,000+ users worldwide.\n\nFrom strategy to systems—I turn marketing goals into measurable results.",
    year: "Present"
  }
];

// Bio images for rotating gallery
const bioImages = [
  {
    src: "/images/bio/bio-photo.jpg",
    alt: "Jacob Darling - Professional portrait in cinematic lighting",
    variant: "hero"
  },
  {
    src: "/images/bio/241311036_10117555583372059_173429180650836298_n.webp",
    alt: "Jacob Darling - Casual outdoor portrait",
    variant: "casual"
  },
  {
    src: "/images/bio/Untitled-1 (Custom).png",
    alt: "Jacob Darling - Black and white portrait",
    variant: "monochrome"
  },
  {
    src: "/images/bio/1732967007485.jpg",
    alt: "Jacob Darling - Candid moment portrait",
    variant: "candid"
  }
];

const About: React.FC = () => {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleNode = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  // Rotating bio gallery effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bioImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="about-page">
      <AnimatedSection>
        <section className="about-intro">
          <motion.h1 variants={fadeInUp}>About Me</motion.h1>

          <motion.div className="intro-content" variants={fadeInUp}>
            <div className="bio-photo-wrapper">
              {/* Cinematic Rotating Bio Gallery */}
              <div className="bio-gallery bio-gallery-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={bioImages[currentImageIndex].src}
                    alt={bioImages[currentImageIndex].alt}
                    className="bio-photo"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "contrast(1.05) saturate(1.1) brightness(0.95)"
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                </AnimatePresence>

                {/* Image indicator dots */}
                <div className="bio-gallery-indicators">
                  {bioImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        border: "none",
                        background: index === currentImageIndex ? "#EC4899" : "rgba(255,255,255,0.5)",
                        cursor: "pointer"
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="intro-text">
              <p className="lead">
                Hello, I'm Jacob Darling—a Marketing Strategist & Systems Architect with over a decade of experience
                driving growth through data-driven marketing and innovative tech solutions. I specialize in marketing
                automation, CRM campaigns, SEO/SEM optimization, analytics-driven strategy, and cross-functional project
                management. My unique strength lies in bridging marketing strategy and technical execution, turning marketing
                goals into measurable results.
              </p>
              <p>
                <strong>Key Strengths:</strong> Campaign optimization, team leadership, data analysis, creative content
                development, marketing automation, and full-stack development. I'm passionate about leveraging AI and
                automation to improve marketing ROI, continuously learning new technologies, and building collaborative
                relationships with cross-functional teams.
              </p>
              <p>
                <strong>Proven Results:</strong> At Graston Technique®, I built a marketing automation system with 400+
                workflows that reduced support tickets by 70%, optimized checkout flows that increased conversions by 40%,
                and managed multi-channel advertising campaigns (Google Ads, Meta Ads, LinkedIn Ads) with measurable ROI.
                These are documented results from production systems serving 30,000+ practitioners worldwide.
              </p>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      <TheGapDiagram />

      <VennDiagram />

      <AnimatedSection delay={0.2}>
        <section className="philosophy-section">
          <h2>My Philosophy</h2>

          <div className="philosophy-quote">
            <blockquote>
              Strategy without architecture is a daydream; architecture without strategy is a machine with no purpose.
            </blockquote>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="icon">📊</div>
              <h3>Analytics-Driven Strategy</h3>
              <p>
                Every marketing decision is backed by data. I configure Google Tag Manager, GA4, and custom event tracking
                to measure campaign performance, conversion funnels, and ROI—ensuring every marketing dollar drives measurable results.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">🔄</div>
              <h3>Marketing Automation Excellence</h3>
              <p>
                I bridge marketing strategy and technical execution by building CRM workflows, email automation sequences,
                and campaign automation systems. At Graston Technique®, I developed 400+ marketing automations that reduced
                support workload by 70% while improving customer experience.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">🎯</div>
              <h3>Cross-Functional Campaign Management</h3>
              <p>
                I lead multi-channel marketing campaigns across Google Ads, Meta Ads, and LinkedIn Ads with cross-functional
                project management. My campaigns are designed for scalability, with proven results: 40% increase in checkout
                conversions, 30% improvement in lead conversion rates, and measurable ROI across all channels.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="timeline-section">
          <h2>Career Journey</h2>

          <div className="timeline">
            <div className="timeline-line"></div>

            {timelineNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="timeline-node"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-year">{node.year}</div>

                <button
                  onClick={() => toggleNode(node.id)}
                  className={`timeline-card ${expandedNode === node.id ? 'expanded' : ''}`}
                >
                  <div className="card-header">
                    <div>
                      <h3>{node.title}</h3>
                      <p className="subtitle">{node.subtitle}</p>
                    </div>
                    <svg
                      className="chevron"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <AnimatePresence mode="wait">
                    {expandedNode === node.id && (
                      <motion.div
                        className="card-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p>{node.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="volunteering-section">
          <h2>Community & Volunteer Work</h2>
          <p className="section-intro">
            Beyond professional work, I believe in giving back to the community through leadership,
            creative support, and strategic guidance. Whether leading homeowner associations,
            supporting local arts, or mentoring students, I apply the same systems-thinking
            and strategic approach to community initiatives.
          </p>

          <div className="volunteering-grid">
            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="volunteer-icon">🏛️</div>
              <h3>President</h3>
              <h4>School 80 Condominiums HOA</h4>
              <p className="volunteer-period">Oct 2019 - Present · 6+ years</p>
              <p className="volunteer-description">
                Lead governance, financial planning, and community relations for residential
                condominium association, applying strategic thinking to property management
                and community building.
              </p>
            </motion.div>

            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="volunteer-icon">🎨</div>
              <h3>Board Member & Marketing Lead</h3>
              <h4>Primary Colours</h4>
              <p className="volunteer-period">2017 - Present · 8+ years</p>
              <p className="volunteer-description">
                Design website and print materials for annual Installation Nation event.
                Served as Board Member (2018-2019) for this non-profit dedicated to connecting
                visual artists with their communities through exhibitions and cultural events.
              </p>
            </motion.div>

            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="volunteer-icon">👥</div>
              <h3>Board Member</h3>
              <h4>School 80 Condominiums HOA</h4>
              <p className="volunteer-period">2015 - 2019 · 4 years</p>
              <p className="volunteer-description">
                Served as board member before assuming presidency, contributing to strategic
                planning, community communications, and operational improvements.
              </p>
            </motion.div>

            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="volunteer-icon">🎓</div>
              <h3>Design Volunteer</h3>
              <h4>Frances W Parker IPS School 56</h4>
              <p className="volunteer-period">2017 · 2 months</p>
              <p className="volunteer-description">
                Designed 12 posters for the school's Situational VALUES project,
                creating visual materials to reinforce positive character development.
              </p>
            </motion.div>

            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="volunteer-icon">💼</div>
              <h3>Business Mentor</h3>
              <h4>SMART - Anti Bullying at School #96</h4>
              <p className="volunteer-period">2013 · 5 months</p>
              <p className="volunteer-description">
                Guided students in developing business and marketing plan for their
                anti-bullying program, teaching real-world strategy and planning skills.
              </p>
            </motion.div>

            <motion.div
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="volunteer-icon">⚽</div>
              <h3>Designer</h3>
              <h4>Eastwood Middle School Soccer Team</h4>
              <p className="volunteer-period">2017 - Present · 8+ years</p>
              <p className="volunteer-description">
                Design and print custom shirts for Eastwood Middle School women's soccer team,
                supporting youth athletics through visual identity.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <ClientLogos />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <section className="cta-section">
          <h2>Let's Build Something Together</h2>
          <p>
            Inspired by structured creativity and system automation, I bring a relentless work ethic
            and Indiana roots to every project.
          </p>
          <div className="cta-buttons">
            <Link to="/case-studies" className="btn-primary">
              See My Work →
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default About;