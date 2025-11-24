import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import ParallaxSection from '../components/animations/ParallaxSection';
import MorphingBlob from '../components/animations/MorphingBlob';
import ClientLogos from '../components/clients/ClientLogos';
import TheGapDiagram from '../components/diagrams/TheGapDiagram';
import VennDiagram from '../components/diagrams/VennDiagram';
import AnchorNav from '../components/navigation/AnchorNav';
import { OceanWavyBackground } from '../components/ui/OceanWavyBackground';
import { GitHubStats } from '../components/github/GitHubStats';
import TechProfile from '../components/TechProfile';
import VerticalTimeline from '../components/timeline/VerticalTimeline';
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

const About: React.FC = () => {

  const anchorItems = [
    { id: 'story', label: 'Story' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20">
    <OceanWavyBackground
      className="about-page"
      containerClassName="min-h-full"
      speed="slow"
      waveOpacity={0.3}
      colors={['#006d77', '#83c5be', '#7ab5c2', '#ffddd2']}
    >
      <main className="relative z-10">
        <AnchorNav anchors={anchorItems} />
        <AnimatedSection>
          <section id="story" className="about-intro">
          <motion.h1 variants={fadeInUp}>About Me</motion.h1>

          <motion.div className="intro-content" variants={fadeInUp}>
            <div className="bio-photo-wrapper">
              {/* Holographic Tech Identity Card */}
              <TechProfile size="md" className="mx-auto" />
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

              {/* GitHub Activity Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8"
              >
                <GitHubStats username="yesmannow" theme="dark" />
              </motion.div>
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
          <div className="timeline-intro mb-12">
            <h2>Career timeline</h2>
            <p>
              From early creative hustle to enterprise systems, every chapter sharpened how I
              architect marketing programs. Scroll to see the problem I inherited, the
              strategy I executed, and the results that followed.
            </p>
          </div>
          <VerticalTimeline items={timelineNodes} />
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
    </OceanWavyBackground>
    </div>
  );
};

export default About;
