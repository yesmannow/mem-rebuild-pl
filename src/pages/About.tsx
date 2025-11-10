import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import ParallaxSection from '../components/animations/ParallaxSection';
import MorphingBlob from '../components/animations/MorphingBlob';
import ClientLogos from '../components/clients/ClientLogos';
import TheGapDiagram from '../components/diagrams/TheGapDiagram';
import VennDiagram from '../components/diagrams/VennDiagram';
import AnchorNav from '../components/navigation/AnchorNav';
import { fadeInUp } from '../utils/animations';
import './About.css';

interface TimelineNode {
  id: string;
  title: string;
  period: string;
  headline: string;
  problem: string;
  strategy: string[];
  result: string[];
}

const timelineNodes: TimelineNode[] = [
  {
    id: 'launchpad',
    title: 'The Launchpad',
    period: 'Early Career',
    headline: 'Turning creative hustle into measurable marketing systems',
    problem:
      'I started in small creative shops where every dollar mattered. Campaigns were beautiful, but no one could prove they worked.',
    strategy: [
      'Built my first analytics stacks with GA, spreadsheets, and hand-coded dashboards to show impact',
      'Taught myself CMS development so I could launch updates without waiting on engineering',
      'Documented playbooks that linked creative decisions to measurable KPIs',
    ],
    result: [
      'Clients renewed because they could finally see which campaigns generated leads',
      'Earned the freedom to pitch bigger, systems-level ideas',
      'Set the foundation for every data-driven decision I make today',
    ],
  },
  {
    id: 'pike-medical',
    title: 'Pike Medical Consultants',
    period: 'Agency Experience',
    headline: 'Full-stack marketing for healthcare and clinical brands',
    problem:
      'Healthcare clients needed growth but had legacy systems and strict compliance guardrails. Marketing, sales, and patient experience lived in silos.',
    strategy: [
      'Rebuilt web experiences around conversion paths tied to patient outcomes',
      'Launched paid media programs with HIPAA-safe analytics and call tracking',
      'Stitched email, CRM, and field sales workflows so teams acted on the same signals',
    ],
    result: [
      'Generated thousands of patient visits for regional clinics',
      'Cut media waste by 32% while increasing appointment conversions',
      'Became the operator clients called when something mission-critical needed fixing',
    ],
  },
  {
    id: 'graston-technique',
    title: 'Graston Technique®',
    period: 'Enterprise Role',
    headline: 'Architecting the growth engine for a global education brand',
    problem:
      'A world-class education company ran on manual processes. Enrollment, ecommerce, support, and analytics spoke different languages.',
    strategy: [
      'Implemented 400+ automation workflows across FluentCRM, WooCommerce, and LearnDash',
      'Designed AI-assisted support that resolved 70% of inquiries instantly',
      'Built full-funnel analytics so leadership could see revenue, retention, and LTV in one place',
    ],
    result: [
      'Increased enrollments 38% year over year',
      'Eliminated redundant manual work and freed teams to focus on students',
      'Proved marketing ROI every week with instrumentation-grade dashboards',
    ],
  },
  {
    id: 'current-portfolio',
    title: 'Current Portfolio',
    period: 'Present',
    headline: 'Solo operator, systems architect, revenue engineer',
    problem:
      'Brands need a single person who can translate vision into a measurable system. That’s my lane.',
    strategy: [
      'Partner with founders, CMOs, and COOs to architect marketing systems end-to-end',
      'Design modular frameworks that blend product strategy, lifecycle, and analytics',
      'Ship documented, assistant-ready processes so teams can scale without me in every meeting',
    ],
    result: [
      'Operators trust me with their highest-stakes growth challenges',
      'Every build includes documentation, enablement, and measurable outcomes',
      'The BearCave portfolio keeps expanding with systems that create predictable pipeline',
    ],
  },
];

const communityRoles = [
  {
    icon: '🏛️',
    title: 'President',
    organization: 'School 80 Condos HOA',
    period: '2019 – Present',
    impact:
      'I lead governance, budgeting, and capital planning for a 70-unit community, implementing communication cadences and vendor scorecards that keep residents informed and projects on track.',
  },
  {
    icon: '🎨',
    title: 'Board Member & Marketing Lead',
    organization: 'Primary Colours',
    period: '2017 – Present',
    impact:
      'I design annual Installation Nation campaigns and steward the nonprofit’s digital presence, helping connect Indianapolis artists with new audiences.',
  },
  {
    icon: '👥',
    title: 'Board Member',
    organization: 'School 80 Condos HOA',
    period: '2015 – 2019',
    impact:
      'I built the operating cadence the board still uses today—budget dashboards, contractor RFP process, and resident communication systems.',
  },
  {
    icon: '🎓',
    title: 'Design Volunteer',
    organization: 'Frances W Parker IPS School 56',
    period: '2017',
    impact:
      'I created a 12-piece poster series for the Situational VALUES program, giving teachers visual tools to reinforce positive culture.',
  },
  {
    icon: '💼',
    title: 'Business Mentor',
    organization: 'SMART Anti-Bullying',
    period: '2013',
    impact:
      'I coached middle school students through building a business and marketing plan—introducing them to storytelling, positioning, and pitching.',
  },
  {
    icon: '⚽',
    title: 'Designer',
    organization: 'Eastwood Middle School Soccer',
    period: '2017 – Present',
    impact:
      'I design seasonal kits and supporter gear, using design to raise funds and create pride for the program.',
  },
];

// Bio images for rotating gallery
const bioImages = [
  {
    src: '/images/bio/bio-photo.jpg',
    alt: 'Jacob Darling - Professional portrait in cinematic lighting',
    variant: 'hero',
  },
  {
    src: '/images/bio/241311036_10117555583372059_173429180650836298_n.webp',
    alt: 'Jacob Darling - Casual outdoor portrait',
    variant: 'casual',
  },
  {
    src: '/images/bio/Untitled-1 (Custom).png',
    alt: 'Jacob Darling - Black and white portrait',
    variant: 'monochrome',
  },
  {
    src: '/images/bio/1732967007485.jpg',
    alt: 'Jacob Darling - Candid moment portrait',
    variant: 'candid',
  },
];

const About: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState<string>(timelineNodes[0].id);

  // Rotating bio gallery effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % bioImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const anchorItems = [
    { id: 'story', label: 'Story' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <main className="about-page">
      <AnchorNav anchors={anchorItems} />
      <AnimatedSection>
        <section id="story" className="about-intro">
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
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05) saturate(1.1) brightness(0.95)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Image indicator dots */}
                <div className="bio-gallery-indicators">
                  {bioImages.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: 'none',
                        background:
                          index === currentImageIndex ? '#EC4899' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
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
                Hello, I'm Jacob Darling—a Marketing Strategist & Systems Architect with over a
                decade of experience driving growth through data-driven marketing and innovative
                tech solutions. I specialize in marketing automation, CRM campaigns, SEO/SEM
                optimization, analytics-driven strategy, and cross-functional project management. My
                unique strength lies in bridging marketing strategy and technical execution, turning
                marketing goals into measurable results.
              </p>
              <p>
                <strong>Key Strengths:</strong> Campaign optimization, team leadership, data
                analysis, creative content development, marketing automation, and full-stack
                development. I'm passionate about leveraging AI and automation to improve marketing
                ROI, continuously learning new technologies, and building collaborative
                relationships with cross-functional teams.
              </p>
              <p>
                <strong>Proven Results:</strong> At Graston Technique®, I built a marketing
                automation system with 400+ workflows that reduced support tickets by 70%, optimized
                checkout flows that increased conversions by 40%, and managed multi-channel
                advertising campaigns (Google Ads, Meta Ads, LinkedIn Ads) with measurable ROI.
                These are documented results from production systems serving 30,000+ practitioners
                worldwide.
              </p>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      <TheGapDiagram />

      <VennDiagram />

      <AnimatedSection delay={0.2}>
        <section id="philosophy" className="philosophy-section">
          <h2>My Philosophy</h2>

          <div className="philosophy-quote">
            <blockquote>
              Strategy without architecture is a daydream; architecture without strategy is a
              machine with no purpose.
            </blockquote>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="icon">📊</div>
              <h3>Analytics-Driven Strategy</h3>
              <p>
                Every marketing decision is backed by data. I configure Google Tag Manager, GA4, and
                custom event tracking to measure campaign performance, conversion funnels, and
                ROI—ensuring every marketing dollar drives measurable results.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">🔄</div>
              <h3>Marketing Automation Excellence</h3>
              <p>
                I bridge marketing strategy and technical execution by building CRM workflows, email
                automation sequences, and campaign automation systems. At Graston Technique®, I
                developed 400+ marketing automations that reduced support workload by 70% while
                improving customer experience.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">🎯</div>
              <h3>Cross-Functional Campaign Management</h3>
              <p>
                I lead multi-channel marketing campaigns across Google Ads, Meta Ads, and LinkedIn
                Ads with cross-functional project management. My campaigns are designed for
                scalability, with proven results: 40% increase in checkout conversions, 30%
                improvement in lead conversion rates, and measurable ROI across all channels.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section id="timeline" className="career-timeline-section">
          <div className="timeline-intro">
            <h2>Career timeline</h2>
            <p>
              From early creative hustle to enterprise systems, every chapter sharpened how I
              architect marketing programs. Tap a milestone to see the problem I inherited, the
              strategy I executed, and the results that followed.
            </p>
          </div>
          <div className="timeline-cards">
            {timelineNodes.map(node => {
              const isOpen = activeTimeline === node.id;
              return (
                <motion.article
                  key={node.id}
                  className={`timeline-card ${isOpen ? 'is-open' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <button
                    className="timeline-card__header"
                    onClick={() => setActiveTimeline(isOpen ? '' : node.id)}
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls={`${node.id}-panel`}
                  >
                    <div>
                      <span className="timeline-card__period">{node.period}</span>
                      <h3>{node.title}</h3>
                    </div>
                    <span className="timeline-card__toggle" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <p className="timeline-card__headline">{node.headline}</p>
                  {isOpen && (
                    <div className="timeline-card__panel" id={`${node.id}-panel`}>
                      <div className="timeline-card__section">
                        <h4>The Challenge</h4>
                        <p>{node.problem}</p>
                      </div>
                      <div className="timeline-card__section">
                        <h4>The Strategy</h4>
                        <ul>
                          {node.strategy.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="timeline-card__section">
                        <h4>The Result</h4>
                        <ul>
                          {node.result.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section id="community" className="volunteering-section">
          <h2>Community & Volunteer Work</h2>
          <p className="section-intro">
            Beyond professional work, I believe in giving back to the community through leadership,
            creative support, and strategic guidance. Whether leading homeowner associations,
            supporting local arts, or mentoring students, I apply the same systems-thinking and
            strategic approach to community initiatives.
          </p>

          <div className="volunteering-grid">
            {communityRoles.map((role, index) => (
              <motion.div
                key={role.title + role.organization}
                className="volunteer-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <div className="volunteer-icon">{role.icon}</div>
                <h3>{role.title}</h3>
                <h4>{role.organization}</h4>
                <p className="volunteer-period">{role.period}</p>
                <p className="volunteer-description">{role.impact}</p>
              </motion.div>
            ))}
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
