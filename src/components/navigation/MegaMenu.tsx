import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Sparkles, Code2, FileText, Download, Rocket, FlaskConical, Palette } from 'lucide-react';
import type { MainNavigationLink } from '../../data/navigation';

interface MegaMenuProps {
  navLinks: MainNavigationLink[];
  isActive: (path: string) => boolean;
}

interface MegaMenuContent {
  [key: string]: React.ReactNode;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ navLinks, isActive }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (name: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMenu(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Mega menu content for each navigation item
  const megaMenuContent: MegaMenuContent = {
    Projects: (
      <div className="grid grid-cols-3 gap-6">
        {/* Featured Case Studies */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <MegaMenuCard
            title="The Launchpad"
            description="Website redesign for increased engagement"
            link="/case-study/the-launchpad"
            stats={[
              { label: 'Engagement', value: '+180%' },
              { label: 'Conversion', value: '+92%' },
            ]}
            tag="Featured"
          />
          <MegaMenuCard
            title="The Conductor"
            description="Marketing automation platform"
            link="/case-study/the-conductor"
            stats={[
              { label: 'Efficiency', value: '+250%' },
              { label: 'Time Saved', value: '40 hrs/mo' },
            ]}
            tag="Popular"
          />
          <MegaMenuCard
            title="The Fortress"
            description="Cybersecurity infrastructure overhaul"
            link="/case-study/the-fortress"
            stats={[
              { label: 'Security Score', value: '98/100' },
              { label: 'Incidents', value: '-100%' },
            ]}
          />
          <MegaMenuCard
            title="RBE Law"
            description="Law firm digital transformation"
            link="/case-study/rbe-law"
            stats={[
              { label: 'Client Acquisition', value: '+145%' },
              { label: 'ROI', value: '320%' },
            ]}
          />
        </div>

        {/* Quick Links & Actions */}
        <div className="space-y-4">
          <QuickLink
            icon={Sparkles}
            title="All Case Studies"
            description="View complete portfolio"
            link="/case-studies"
          />
          <QuickLink
            icon={Code2}
            title="Technical Stack"
            description="Technologies & frameworks"
            link="/case-studies?filter=technical"
          />
          <QuickLink
            icon={FileText}
            title="Client Testimonials"
            description="Success stories & feedback"
            link="/case-studies?filter=testimonials"
          />
          
          <div className="mt-6 p-4 bg-gradient-to-br from-brand-turquoise/10 to-brand-creamsicle/10 rounded-lg border border-brand-turquoise/20">
            <p className="text-sm text-brand-muted mb-2">Portfolio Highlights</p>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-white">Total Projects</span>
                <span className="text-brand-turquoise font-bold">24+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Client Satisfaction</span>
                <span className="text-brand-turquoise font-bold">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Avg. ROI</span>
                <span className="text-brand-turquoise font-bold">285%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    Ventures: (
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <MegaMenuCard
            title="317 BBQ"
            description="Modern restaurant website with online ordering"
            image="/images/projects/317 bbq/20231008_174703.webp"
            link="/side-projects/317-bbq"
            tag="Featured"
            tags={['Web Dev', 'E-Commerce']}
          />
          <MegaMenuCard
            title="Russell Painting Co."
            description="Service business portfolio & quotes"
            image="/images/projects/Russell painting/Interior_sl.jpg"
            link="/side-projects/russell-painting"
            tags={['Portfolio', 'Forms']}
          />
        </div>
        <div className="space-y-4">
          <QuickLink
            icon={Rocket}
            title="All Ventures"
            description="Browse all side projects"
            link="/side-projects"
          />
          <div className="p-4 bg-gradient-to-br from-brand-creamsicle/10 to-brand-turquoise/10 rounded-lg border border-brand-creamsicle/20">
            <p className="text-sm font-semibold text-white mb-2">Why Ventures?</p>
            <p className="text-xs text-brand-muted leading-relaxed">
              Independent experiments showcase innovation, creativity, and diverse skill sets beyond client work.
            </p>
          </div>
        </div>
      </div>
    ),

    'The Lab': (
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          <ToolCard
            icon="🔧"
            title="CLI Workflow Tools"
            description="Command-line automation for productivity"
            tech="Node.js, Bash"
            link="/apps"
          />
          <ToolCard
            icon="📊"
            title="MCP Server Tools"
            description="Model Context Protocol integration"
            tech="TypeScript, Python"
            link="/apps"
          />
          <ToolCard
            icon="⚡"
            title="Build Automation"
            description="CI/CD pipelines and deployment scripts"
            tech="GitHub Actions, Vite"
            link="/apps"
          />
          <ToolCard
            icon="🎨"
            title="Content Generation"
            description="Automated content and asset creation"
            tech="AI/ML, Scripts"
            link="/apps"
          />
        </div>
        <div className="space-y-4">
          <QuickLink
            icon={FlaskConical}
            title="All Tools"
            description="Complete automation suite"
            link="/apps"
          />
          <div className="p-4 bg-gradient-to-br from-brand-teal/10 to-brand-creamsicle/10 rounded-lg border border-brand-teal/20">
            <p className="text-sm font-semibold text-white mb-2">Tech Philosophy</p>
            <p className="text-xs text-brand-muted leading-relaxed">
              Automate repetitive tasks, optimize workflows, and build intelligent systems for efficiency.
            </p>
          </div>
        </div>
      </div>
    ),

    Studio: (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <StudioCard
            title="Brand Identity"
            description="Logo design, color systems, typography"
            gradient="from-brand-turquoise/20 to-brand-creamsicle/20"
          />
          <StudioCard
            title="Visual Systems"
            description="Design tokens, component libraries"
            gradient="from-brand-creamsicle/20 to-brand-teal/20"
          />
          <StudioCard
            title="UI/UX Design"
            description="User interfaces and experiences"
            gradient="from-brand-teal/20 to-brand-turquoise/20"
          />
        </div>
        <div className="space-y-4">
          <QuickLink
            icon={Palette}
            title="Studio Gallery"
            description="Browse creative work"
            link="/studio"
          />
          <div className="p-4 bg-gradient-to-br from-brand-turquoise/10 to-brand-creamsicle/10 rounded-lg border border-brand-turquoise/20">
            <p className="text-sm font-semibold text-white mb-3">Design Principles</p>
            <ul className="text-xs text-brand-muted space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-brand-turquoise">•</span>
                <span>Form follows function</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-creamsicle">•</span>
                <span>Accessibility first</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand-teal">•</span>
                <span>Performance matters</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),

    Resume: (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Highlights</h4>
            <div className="space-y-3">
              <HighlightItem
                title="Systems Architect"
                description="15+ years building scalable solutions"
              />
              <HighlightItem
                title="Full-Stack Developer"
                description="React, TypeScript, Node.js, Python"
              />
              <HighlightItem
                title="DevOps Engineer"
                description="CI/CD, Docker, AWS, GitHub Actions"
              />
              <HighlightItem
                title="Legal Tech Expert"
                description="Law firm operations & automation"
              />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <Link
            to="/resume"
            className="flex items-center gap-3 p-4 bg-gradient-to-br from-brand-turquoise/20 to-brand-turquoise/5 rounded-lg border border-brand-turquoise/30 hover:border-brand-turquoise/50 transition-all group"
          >
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">View Full Resume</p>
              <p className="text-xs text-brand-muted">Professional background & experience</p>
            </div>
            <ArrowRight className="text-brand-turquoise group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          
          <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-br from-brand-creamsicle/20 to-brand-creamsicle/5 rounded-lg border border-brand-creamsicle/30 hover:border-brand-creamsicle/50 transition-all group">
            <Download className="text-brand-creamsicle" size={20} />
            <div className="flex-1 text-left">
              <p className="text-white font-semibold mb-1">Download PDF</p>
              <p className="text-xs text-brand-muted">Get a copy for your records</p>
            </div>
          </button>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-white/10">
            <p className="text-xs text-brand-muted mb-2">Core Technologies</p>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((tech) => (
                <span key={tech} className="px-2 py-0.5 bg-brand-turquoise/10 text-brand-turquoise text-xs rounded-full border border-brand-turquoise/20">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),

    Contact: (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-3">Let&apos;s Connect</h4>
            <p className="text-sm text-brand-muted mb-4">
              Available for consulting, collaboration, and new opportunities.
            </p>
          </div>
          
          <ContactMethod
            icon="📧"
            title="Email"
            value="hoosierdarling@gmail.com"
            link="mailto:hoosierdarling@gmail.com"
          />
          <ContactMethod
            icon="💼"
            title="LinkedIn"
            value="Connect on LinkedIn"
            link="https://linkedin.com/in/jacobdarling"
          />
          <ContactMethod
            icon="🐙"
            title="GitHub"
            value="View repositories"
            link="https://github.com/JdarlingGT"
          />
        </div>
        
        <div className="space-y-4">
          <Link
            to="/contact"
            className="block p-6 bg-gradient-to-br from-brand-turquoise/20 to-brand-creamsicle/20 rounded-lg border border-brand-turquoise/30 hover:border-brand-turquoise/50 transition-all group"
          >
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              Send a Message
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </h4>
            <p className="text-xs text-brand-muted mb-4">
              Use the contact form for project inquiries and collaboration opportunities.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-turquoise">
              <span>Response time: 24-48 hours</span>
            </div>
          </Link>

          <div className="p-4 bg-slate-800/50 rounded-lg border border-white/10">
            <p className="text-sm font-semibold text-white mb-2">Open to</p>
            <ul className="text-xs text-brand-muted space-y-1.5">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise"></span>
                Consulting engagements
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-creamsicle"></span>
                Full-time opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span>
                Speaking & workshops
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div ref={menuRef} className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const hasContent = megaMenuContent[link.name];
        
        return (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => hasContent && handleMouseEnter(link.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to={link.path}
              className={`relative flex items-center gap-2 ${
                isActive(link.path)
                  ? 'text-white scale-105'
                  : 'text-brand-muted hover:text-brand-turquoise'
              } transition-all duration-300 font-medium text-sm uppercase tracking-wide group py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md`}
              aria-expanded={activeMenu === link.name}
              aria-haspopup={hasContent ? 'true' : 'false'}
            >
              <Icon size={18} className="opacity-70" />
              <span>{link.name}</span>
              {hasContent && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    activeMenu === link.name ? 'rotate-180' : ''
                  }`}
                />
              )}
              
              {/* Hover glow effect */}
              <span
                className={`absolute -bottom-1 left-0 w-full h-px transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                    : 'bg-transparent group-hover:bg-brand-turquoise/50'
                }`}
              />
            </Link>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu === link.name && hasContent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="fixed left-0 right-0 top-[72px] mx-auto w-[calc(100vw-2rem)] md:w-[calc(100vw-4rem)] max-w-6xl px-4 z-[200]"
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    maxHeight: 'calc(100vh - 100px)',
                  }}
                >
                  <div className="bg-slate-900 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Gradient accent bar */}
                    <div className="h-1 bg-gradient-to-r from-brand-turquoise via-brand-creamsicle to-brand-teal" />
                    
                    {/* Menu content */}
                    <div className="p-4 md:p-6 max-h-[calc(100vh-140px)] overflow-y-auto overscroll-contain custom-scrollbar" role="menu" aria-label={`${link.name} menu`}>
                      {megaMenuContent[link.name]}
                    </div>

                    {/* Bottom gradient */}
                    <div className="h-px bg-gradient-to-r from-transparent via-brand-turquoise/30 to-transparent" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

// Helper Components

interface MegaMenuCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  tag?: string;
  tags?: string[];
  stats?: { label: string; value: string }[];
}

const MegaMenuCard: React.FC<MegaMenuCardProps> = ({
  title,
  description,
  image,
  link,
  tag,
  tags,
  stats,
}) => (
  <Link
    to={link}
    className="group relative overflow-hidden rounded-lg bg-slate-800/50 border border-white/5 hover:border-brand-turquoise/30 transition-all duration-300"
  >
    {image && (
      <div className="aspect-video overflow-hidden bg-slate-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    )}
    
    <div className="p-3">
      <div className="flex items-start justify-between mb-1.5">
        <h5 className="text-white font-semibold text-sm group-hover:text-brand-turquoise transition-colors">
          {title}
        </h5>
        {tag && (
          <span className="px-2 py-0.5 bg-brand-turquoise/10 text-brand-turquoise text-xs rounded-full border border-brand-turquoise/20">
            {tag}
          </span>
        )}
      </div>
      
      <p className="text-xs text-brand-muted mb-2 line-clamp-2">{description}</p>
      
      {stats && stats.length > 0 && (
        <div className="flex gap-3 mt-2 pt-2 border-t border-white/5">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <p className="text-xs text-brand-muted">{stat.label}</p>
              <p className="text-sm font-bold text-brand-turquoise">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 bg-white/5 text-brand-muted text-xs rounded"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
    
    {/* Hover arrow */}
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <ArrowRight className="text-brand-turquoise" size={16} />
    </div>
  </Link>
);

interface QuickLinkProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
  link: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 hover:border-brand-turquoise/30 transition-all group"
  >
    <div className="p-2 rounded-lg bg-brand-turquoise/10 text-brand-turquoise">
      <Icon size={18} />
    </div>
    <div className="flex-1">
      <p className="text-sm font-semibold text-white group-hover:text-brand-turquoise transition-colors">
        {title}
      </p>
      <p className="text-xs text-brand-muted">{description}</p>
    </div>
    <ArrowRight className="text-brand-muted group-hover:text-brand-turquoise group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" size={14} />
  </Link>
);

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  tech: string;
  link: string;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, tech, link }) => (
  <Link
    to={link}
    className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 hover:border-brand-teal/30 transition-all group"
  >
    <span className="text-2xl">{icon}</span>
    <div className="flex-1">
      <h5 className="text-sm font-semibold text-white group-hover:text-brand-teal transition-colors mb-1">
        {title}
      </h5>
      <p className="text-xs text-brand-muted mb-1">{description}</p>
      <p className="text-xs text-brand-teal/70 font-mono">{tech}</p>
    </div>
  </Link>
);

interface StudioCardProps {
  title: string;
  description: string;
  gradient: string;
}

const StudioCard: React.FC<StudioCardProps> = ({ title, description, gradient }) => (
  <div className={`p-4 rounded-lg bg-gradient-to-br ${gradient} border border-white/10 hover:border-white/20 transition-all`}>
    <h5 className="text-sm font-semibold text-white mb-1">{title}</h5>
    <p className="text-xs text-brand-muted">{description}</p>
  </div>
);

interface HighlightItemProps {
  title: string;
  description: string;
}

const HighlightItem: React.FC<HighlightItemProps> = ({ title, description }) => (
  <div className="flex items-start gap-2">
    <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise mt-1.5 flex-shrink-0" />
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="text-xs text-brand-muted">{description}</p>
    </div>
  </div>
);

interface ContactMethodProps {
  icon: string;
  title: string;
  value: string;
  link: string;
}

const ContactMethod: React.FC<ContactMethodProps> = ({ icon, title, value, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 border border-white/5 hover:border-brand-turquoise/30 transition-all group"
  >
    <span className="text-2xl">{icon}</span>
    <div className="flex-1">
      <p className="text-xs text-brand-muted">{title}</p>
      <p className="text-sm text-white group-hover:text-brand-turquoise transition-colors">
        {value}
      </p>
    </div>
    <ArrowRight className="text-brand-muted group-hover:text-brand-turquoise group-hover:translate-x-1 transition-all" size={14} />
  </a>
);

export default MegaMenu;
