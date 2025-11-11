import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import './CareerHighlights.css';

const careerHighlights = [
  {
    id: 'graston',
    title: 'Marketing Director',
    company: 'Graston Technique®',
    location: 'Indianapolis, IN',
    period: 'Aug 2023 - Present',
    year: 2023,
    summary: 'Leads both marketing strategy and technical execution for a high-volume educational platform serving thousands of clinicians with continuing education and clinical tools.',
    achievements: [
      'Built integrated ecosystem with LearnDash LMS, WooCommerce, WP Fusion, Gravity Forms, Uncanny Automator, and FluentCRM',
      'Architected "Buy Now, Choose Later" credit system for training bundles and CEU Short access',
      'Built and deployed GPT-powered assistant connected via REST APIs for CEU rules, order lookups, and training suggestions',
      'Created 400+ automations using Uncanny Automator and WP Fusion',
      'Built provider analytics dashboards syncing GA4 data via GTM and Analytify',
      'Optimized site performance with WP Rocket, LiteSpeed, Cloudflare CDN, and comprehensive DevOps measures',
      'Manages cross-functional sprints with developers, designers, instructors, and marketing associates',
    ],
    tags: ['Strategy', 'Technical Leadership', 'Automation', 'SaaS', 'DevOps'],
  },
  {
    id: 'utg',
    title: 'Interim Director of Marketing',
    company: 'Ultimate Technologies Group',
    location: 'Fishers, IN',
    period: 'Mar 2023 - Jul 2023',
    year: 2023,
    summary: 'Led marketing communications, Google Ads campaigns, and strategic marketing initiatives during interim leadership period.',
    achievements: [
      'Managed marketing communications and brand strategy',
      'Optimized Google Ads campaigns and paid search performance',
      'Led strategic marketing planning and execution',
    ],
    tags: ['Strategy', 'Google Ads', 'Leadership'],
  },
  {
    id: 'rbe-manager',
    title: 'Marketing Manager',
    company: 'Riley Bennett Egloff, LLP',
    location: 'Indianapolis, IN',
    period: 'Jul 2022 - Mar 2023',
    year: 2022,
    summary: 'Designed, facilitated, and project managed production of firm marketing materials, including advertisements, brochures, publications, email campaigns, newsletters, and RBE magazines.',
    achievements: [
      'Led public relations and media relations process, identifying opportunities for publicity and thought leadership',
      'Built, designed, and maintained the RBE website with focus on speed, usability, and performance',
      'Designed and implemented direct email marketing campaigns with performance measurement and reporting',
      'Developed practice-specific business-development plans for individual attorneys',
      'Designed, built, and maintained social media presence with performance tracking',
    ],
    tags: ['PR', 'Content', 'Web Development', 'Email Marketing'],
  },
  {
    id: 'rbe-admin',
    title: 'Marketing Administrator',
    company: 'Riley Bennett Egloff, LLP',
    location: 'Greater Indianapolis',
    period: 'Jun 2015 - Nov 2022',
    year: 2015,
    summary: 'Managed content marketing initiatives, website content, social media platforms, graphic design, ad creation, firm-to-client communication, and brand development.',
    achievements: [
      'Managed comprehensive content marketing and website content strategy',
      'Developed and executed social media presence across multiple platforms',
      'Created graphic design and advertising materials',
      'Assisted in RFP responses and strategic marketing plan execution',
      'Managed business development plans for attorneys',
    ],
    tags: ['Content Marketing', 'Brand Development', 'Business Development'],
  },
  {
    id: 'deerfield',
    title: 'Marketing Coordinator',
    company: 'Deerfield Financial Advisors',
    location: 'Greater Indianapolis',
    period: 'Jun 2013 - Jun 2015',
    year: 2013,
    summary: 'Implemented marketing initiatives, campaigns, and strategies to promote services and brand name to prospects, existing clients, and professionals.',
    achievements: [
      'Planned and executed successful client seminars and events',
      'Maintained and developed copy for company website, email campaigns, and printed marketing materials',
      'Researched and implemented technology platforms that improved client services and efficiency',
      'Assisted Chief Compliance Officer in reviewing communications to meet FINRA and SEC standards',
    ],
    tags: ['Campaigns', 'Events', 'Compliance', 'Content'],
  },
  {
    id: 'pike',
    title: 'Marketing Coordinator',
    company: 'Pike Medical Consultants',
    location: 'Greater Indianapolis',
    period: 'Sep 2009 - Jun 2013',
    year: 2009,
    summary: 'Directed marketing activities including planning, budgeting, communication projects, advertising, brand awareness, website design, public relations, and event management.',
    achievements: [
      'Delivered an average of 45% growth in patient visits over three years',
      'Maintained consistent positive ROI on marketing initiatives',
      'Led development and implementation of marketing and advertising campaigns',
      'Implemented, monitored, and evaluated marketing communications strategy',
    ],
    tags: ['Campaigns', 'Events', 'PR', 'Growth'],
  },
  {
    id: 'orthoindy',
    title: 'Marketing Intern',
    company: 'OrthoIndy',
    location: 'Indianapolis, IN',
    period: '2006 - 2007',
    year: 2006,
    summary: 'Marketing intern role focused on medical device marketing and content creation.',
    achievements: [
      'Supported marketing initiatives for medical device products',
      'Created marketing content and materials',
      'Assisted with marketing campaigns and communications',
    ],
    tags: ['Medical Devices', 'Content Marketing'],
  },
];

const CareerHighlights: React.FC = () => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const yearNavRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Extract unique years (sorted descending)
  const years = Array.from(new Set(careerHighlights.map(role => role.year))).sort((a, b) => b - a);

  // Track scroll position for sticky year nav and active year highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const section = sectionRef.current;
      const yearNav = yearNavRef.current;
      if (!section || !yearNav) return;

      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const headerHeight = 100; // Approximate header height

      // Make year nav sticky when section is in view
      if (sectionTop <= headerHeight && sectionBottom > headerHeight + yearNav.offsetHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      const timeline = timelineRef.current;
      if (!timeline) return;

      const viewportCenter = window.innerHeight / 2;

      // Find which card is closest to viewport center
      let closestCard: { year: number; distance: number } | null = null;

      careerHighlights.forEach(role => {
        const card = cardRefs.current[role.id];
        if (!card) return;

        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        const cardCenter = (cardTop + cardBottom) / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (
          cardTop <= viewportCenter &&
          cardBottom >= viewportCenter &&
          (!closestCard || distance < closestCard.distance)
        ) {
          closestCard = { year: role.year, distance };
        }
      });

      if (closestCard !== null) {
        // TODO: TypeScript narrowing issue - use type assertion for compatibility
        setActiveYear((closestCard as { year: number; distance: number }).year);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  const handleYearClick = (year: number) => {
    setIsScrolling(true);
    // Find the first role for this year (roles are already in chronological order)
    const role = careerHighlights.find(r => r.year === year);
    if (role) {
      const card = cardRefs.current[role.id];
      if (card) {
        const cardTop = card.getBoundingClientRect().top + window.pageYOffset;
        const offset = 150; // Account for header
        window.scrollTo({
          top: cardTop - offset,
          behavior: 'smooth',
        });
        setActiveYear(year);
      }
    }
    setTimeout(() => setIsScrolling(false), 1000);
  };

  return (
    <section ref={sectionRef} id="experience" className="career-highlights container-px mx-auto max-w-6xl py-16 md:py-24">
      <motion.div
        className="career-highlights__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-heading">Career Journey</h2>
      </motion.div>

      {/* Year Navigation - Sticky when scrolling */}
      <div
        ref={yearNavRef}
        className={`career-highlights__year-nav ${isSticky ? 'is-sticky' : ''}`}
      >
        {years.map(year => (
          <button
            key={year}
            className={`career-highlights__year-btn ${activeYear === year ? 'is-active' : ''}`}
            onClick={() => handleYearClick(year)}
            aria-label={`Jump to ${year}`}
          >
            {year}
          </button>
        ))}
      </div>

      <div ref={timelineRef} className="career-highlights__timeline">
        {careerHighlights.map((role, index) => (
          <motion.div
            key={role.id}
            ref={el => {
              cardRefs.current[role.id] = el;
            }}
            id={`role-${role.id}`}
            className={`career-highlights__card ${index % 2 === 0 ? 'career-highlights__card--left' : 'career-highlights__card--right'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="career-highlights__marker">
              <Briefcase size={20} />
            </div>
            <div className="career-highlights__content">
              <h3 className="career-highlights__title">{role.title}</h3>
              <div className="career-highlights__company">{role.company}</div>
              {role.location && <div className="career-highlights__location">{role.location}</div>}
              <div className="career-highlights__period">{role.period}</div>
              <p className="career-highlights__summary">{role.summary}</p>
              <div className="career-highlights__tags">
                {role.tags.map((tag, i) => (
                  <span key={i} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CareerHighlights;
