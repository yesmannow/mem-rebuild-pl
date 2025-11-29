import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import SkillsRadar from '../components/skills/SkillsRadar';
import ToolboxEcosystem from '../components/diagrams/ToolboxEcosystem';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';
import { SkillProgressBar } from '../components/ui/SkillProgressBar';
import {
  ZapIcon,
  ShieldIcon,
  ActivityIcon,
  ServerIcon,
  TargetIcon,
  RepeatIcon,
  PaletteIcon,
  CreditCardIcon,
  ChevronDownIcon,
} from '../components/icons/TechIcons';
import TechTooltip from '../components/tooltips/TechTooltip';
import Icon from '../components/Icon';
import { fadeInUp, staggerContainer, staggerItem } from '../utils/animations';
import { technicalCategories, technologyStacks } from '../data/toolbox';
import { getTechDescription } from '../data/techDescriptions';

const Toolbox: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  // Map technology names to icon slugs
  const getTechIconSlug = (techName: string): string => {
    const techMap: { [key: string]: string } = {
      React: 'react',
      'Node.js': 'node',
      TypeScript: 'typescript',
      'Tailwind CSS': 'tailwind',
      Vite: 'vite',
      'Git/GitHub': 'github',
      Python: 'python',
      Flask: 'flask',
      FastAPI: 'fastapi',
      Docker: 'docker',
      AWS: 'aws',
      Azure: 'azure',
      PostgreSQL: 'postgres',
      MySQL: 'mysql',
      Redis: 'redis',
      GraphQL: 'graphql',
    };
    return techMap[techName] || 'react'; // fallback to react icon
  };

  const getIconForCategory = (title: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'Marketing Strategy & Planning': <TargetIcon className="w-5 h-5" />,
      'Marketing Automation & CRM': <RepeatIcon className="w-5 h-5" />,
      'Performance & Optimization': <ZapIcon className="w-5 h-5" />,
      'Security & Infrastructure': <ShieldIcon className="w-5 h-5" />,
      'Analytics & Conversion Tracking': <ActivityIcon className="w-5 h-5" />,
      'Server Administration & DevOps': <ServerIcon className="w-5 h-5" />,
      'Content & Creative': <PaletteIcon className="w-5 h-5" />,
      'E-commerce & Payments': <CreditCardIcon className="w-5 h-5" />,
    };
    return iconMap[title] || <ZapIcon className="w-5 h-5" />;
  };

  return (
    <main className="toolbox-page bg-[var(--ink-900)] text-[var(--parchment-050)] relative">
      <OceanBackgroundBeams className="opacity-25" />
      <AnimatedSection>
        <section className="toolbox-header container mx-auto px-6 py-12 relative z-10">
          <motion.h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight" variants={fadeInUp}>Skills & Tools</motion.h1>
          <motion.p className="lead mt-3 text-lg md:text-xl text-[var(--parchment-050)]/70 max-w-4xl" variants={fadeInUp}>
            A unique combination of marketing and technical skills. I'm proficient in marketing
            automation platforms (HubSpot, Marketo, Salesforce CRM), analytics tools (Google
            Analytics, Google Ads, Facebook Ads Manager), email automation (Zapier, FluentCRM),
            alongside programming languages and frameworks (HTML/CSS, JavaScript, Python, React,
            TypeScript). This dual expertise enables me to build complete marketing systems that
            drive measurable ROI.
          </motion.p>

          <motion.div
            className="intro-section mt-8 max-w-4xl mx-auto bg-[var(--ink-800)]/50 backdrop-blur-sm border border-[var(--ink-700)]/50 rounded-2xl p-6"
            variants={fadeInUp}
          >
            <p className="text-[var(--parchment-050)]/90 leading-relaxed mb-4">
              This is my technical arsenal—the tools, platforms, and technologies I use to build marketing systems
              that scale. From strategic planning tools to hands-on development frameworks, each category represents
              a different layer of the marketing technology stack. Hover over any technology to see detailed descriptions,
              and explore the ecosystem diagram to understand how these tools connect in real-world implementations.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-brand-teal/20 border border-brand-teal/30 rounded-full text-xs text-brand-teal font-mono">
                Marketing Automation
              </span>
              <span className="px-3 py-1 bg-brand-orange/20 border border-brand-orange/30 rounded-full text-xs text-brand-orange font-mono">
                Development Stack
              </span>
              <span className="px-3 py-1 bg-sky-400/20 border border-sky-400/30 rounded-full text-xs text-sky-300 font-mono">
                Analytics & Tracking
              </span>
              <span className="px-3 py-1 bg-purple-400/20 border border-purple-400/30 rounded-full text-xs text-purple-300 font-mono">
                Infrastructure
              </span>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      <SkillsRadar />

      {/* Top Skills Section with Progress Bars */}
      <AnimatedSection delay={0.15}>
        <section className="top-skills container mx-auto px-6 py-12">
          <div className="section-intro mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold">Core Competencies</h2>
            <p className="text-[var(--parchment-050)]/70">
              Years of hands-on experience with quantified proficiency levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Marketing Automation */}
            <div className="space-y-4">
              <SkillProgressBar
                skill="Marketing Automation"
                percentage={95}
                years={8}
                category="Expert"
                color="primary"
              />
              <SkillProgressBar
                skill="CRM Strategy & Implementation"
                percentage={90}
                years={7}
                category="Expert"
                color="primary"
              />
              <SkillProgressBar
                skill="Email Marketing"
                percentage={92}
                years={10}
                category="Expert"
                color="primary"
              />
            </div>

            {/* Analytics & Development */}
            <div className="space-y-4">
              <SkillProgressBar
                skill="Google Analytics & Tag Manager"
                percentage={90}
                years={8}
                category="Expert"
                color="secondary"
              />
              <SkillProgressBar
                skill="React & TypeScript"
                percentage={85}
                years={4}
                category="Advanced"
                color="secondary"
              />
              <SkillProgressBar
                skill="WordPress Development"
                percentage={95}
                years={12}
                category="Expert"
                color="secondary"
              />
            </div>

            {/* Paid Media & SEO */}
            <div className="space-y-4">
              <SkillProgressBar
                skill="Google Ads Management"
                percentage={88}
                years={6}
                category="Expert"
                color="accent"
              />
              <SkillProgressBar
                skill="Meta Ads (Facebook/Instagram)"
                percentage={85}
                years={5}
                category="Advanced"
                color="accent"
              />
              <SkillProgressBar
                skill="Technical SEO"
                percentage={90}
                years={8}
                category="Expert"
                color="accent"
              />
            </div>

            {/* Content & Strategy */}
            <div className="space-y-4">
              <SkillProgressBar
                skill="Content Strategy"
                percentage={92}
                years={12}
                category="Expert"
                color="primary"
              />
              <SkillProgressBar
                skill="Copywriting"
                percentage={88}
                years={10}
                category="Expert"
                color="primary"
              />
              <SkillProgressBar
                skill="Brand Development"
                percentage={85}
                years={8}
                category="Advanced"
                color="primary"
              />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <ToolboxEcosystem />

      <AnimatedSection delay={0.2}>
        <section className="technical-categories container mx-auto px-6 py-12">
          <div className="section-intro mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Core Technical Categories</h2>
            <p className="text-[var(--parchment-050)]/70">Specialized expertise organized by technical discipline</p>
          </div>

          <div className="categories-list grid gap-6">
            {technicalCategories.map((category, index) => {
              const isExpanded = expandedCategory === index;
              return (
                <motion.div
                  key={index}
                  className={`category-card ${isExpanded ? 'expanded' : ''} border border-[var(--ink-700)]/60 rounded-xl overflow-hidden bg-[var(--ink-800)]/40`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    className="category-header w-full flex items-center justify-between gap-4 px-4 py-3"
                    onClick={() => toggleCategory(index)}
                    {...(isExpanded ? { 'aria-expanded': "true" } : { 'aria-expanded': "false" })}
                  >
                    <div className="header-content flex items-start gap-3 text-left">
                      <div className="icon-wrapper text-[var(--signal-500)]">{getIconForCategory(category.title)}</div>
                      <div className="text-content">
                        <h3 className="font-semibold">{category.title}</h3>
                        <p className="description text-[var(--parchment-050)]/70">{category.description}</p>
                      </div>
                    </div>
                    <ChevronDownIcon
                      className={`chevron ${expandedCategory === index ? 'rotated' : ''} transition-transform`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="category-skills px-4 pb-4">
                          <div className="skills-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {category.skills.map((skill, skillIndex) => (
                              <motion.div
                                key={skillIndex}
                                className="skill-item flex items-center gap-2 text-[var(--parchment-050)]/80"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: skillIndex * 0.03 }}
                              >
                                <div className="skill-dot size-2 rounded-full bg-[var(--signal-500)]"></div>
                                <span>{skill}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="technology-stacks container mx-auto px-6 py-12">
          <div className="section-intro mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Technology Stacks</h2>
            <p className="text-[var(--parchment-050)]/70">
              Comprehensive tool proficiency across development, analytics, and marketing platforms
            </p>
          </div>

          <motion.div
            className="stacks-grid grid md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {technologyStacks.map((stack, index) => (
              <motion.div
                key={index}
                className="stack-card rounded-xl border border-[var(--ink-700)]/60 bg-[var(--ink-800)]/40 p-5"
                variants={staggerItem}
                whileHover={{ scale: 1.05, translateY: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="stack-header flex items-center gap-2 mb-3">
                  <span className="stack-icon text-[var(--signal-500)]">{stack.icon}</span>
                  <h3 className="font-semibold">{stack.category}</h3>
                </div>
                <div className="stack-technologies grid sm:grid-cols-2 gap-2">
                  {stack.technologies.map((tech, techIndex) => {
                    const techInfo = getTechDescription(tech);
                    return (
                      <div
                        key={techIndex}
                        className="tech-item flex items-center gap-2 text-[var(--parchment-050)]/80"
                        onMouseEnter={() => setHoveredTech(`${stack.category}-${techIndex}`)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        <Icon slug={getTechIconSlug(tech)} className="tech-icon w-4 h-4" />
                        <span>{tech}</span>
                        {techInfo && (
                          <TechTooltip
                            tech={tech}
                            description={techInfo.description}
                            usage={techInfo.usage}
                            show={hoveredTech === `${stack.category}-${techIndex}`}
                            position="top"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="toolbox-cta container mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Want to see these skills in action?</h2>
          <p className="text-[var(--parchment-050)]/70 mt-2">
            Explore my case studies to see how I apply these technical capabilities to solve real
            business challenges.
          </p>
          <motion.a
            href="/case-studies"
            className="cta-button inline-block mt-6 px-6 py-3 rounded-lg bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Case Studies →
          </motion.a>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default Toolbox;
