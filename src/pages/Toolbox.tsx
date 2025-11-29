import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import AnimatedSection from '../components/animations/AnimatedSection';
import SkillsRadar from '../components/skills/SkillsRadar';
import ToolboxEcosystem from '../components/diagrams/ToolboxEcosystem';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';
import { SkillProgressBar } from '../components/ui/SkillProgressBar';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { TiltStackCard } from '../components/ui/TiltStackCard';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import { Search } from 'lucide-react';
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
import { getTechIconSlug } from '../utils/techIcons';

const Toolbox: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
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
          <motion.h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight" variants={fadeInUp}>
            <AnimatedGradientText text="Skills & Tools" className="text-4xl md:text-5xl font-display font-bold" />
          </motion.h1>
          <motion.p className="lead mt-3 text-lg md:text-xl text-[var(--parchment-050)]/70 max-w-4xl" variants={fadeInUp}>
            A unique combination of marketing and technical skills. I'm proficient in marketing
            automation platforms (HubSpot, Marketo, Salesforce CRM), analytics tools (Google
            Analytics, Google Ads, Facebook Ads Manager), email automation (Zapier, FluentCRM),
            alongside programming languages and frameworks (HTML/CSS, JavaScript, Python, React,
            TypeScript). This dual expertise enables me to build complete marketing systems that
            drive measurable ROI.
          </motion.p>

          <motion.div
            className="intro-section mt-6 sm:mt-8 max-w-4xl mx-auto bg-[var(--ink-800)]/50 backdrop-blur-sm border border-[var(--ink-700)]/50 rounded-xl sm:rounded-2xl p-4 sm:p-6"
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
            <p className="text-[var(--parchment-050)]/70 mb-4">Specialized expertise organized by technical discipline</p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--parchment-050)]/40" />
              <input
                type="text"
                placeholder="Search categories or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[var(--ink-800)]/50 border border-[var(--ink-700)]/60 rounded-lg text-[var(--parchment-050)] placeholder:text-[var(--parchment-050)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--signal-500)]/50 focus:border-[var(--signal-500)]/50 transition-all"
              />
            </div>
          </div>

          <div className="categories-list grid gap-6">
            {technicalCategories
              .map((category, originalIndex) => ({
                category,
                originalIndex,
              }))
              .filter(({ category }) => {
                if (!searchQuery) return true;
                const query = searchQuery.toLowerCase();
                return (
                  category.title.toLowerCase().includes(query) ||
                  category.description.toLowerCase().includes(query) ||
                  category.skills.some((skill) => skill.toLowerCase().includes(query))
                );
              })
              .map(({ category, originalIndex }, filteredIndex) => {
              const isExpanded = expandedCategory === originalIndex;
              return (
                <SpotlightCard
                  key={originalIndex}
                  className={`category-card ${isExpanded ? 'expanded' : ''} overflow-hidden`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: filteredIndex * 0.1 }}
                  >
                  <button
                    className="category-header w-full flex items-center justify-between gap-4 px-4 py-3"
                    onClick={() => toggleCategory(originalIndex)}
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
                      className={`chevron ${expandedCategory === originalIndex ? 'rotated' : ''} transition-transform`}
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
                                className="skill-item flex items-center gap-2 text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] transition-colors cursor-default"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: skillIndex * 0.03 }}
                                whileHover={{ scale: 1.05, x: 4 }}
                              >
                                <motion.div
                                  className="skill-dot size-2 rounded-full bg-[var(--signal-500)]"
                                  whileHover={{ scale: 1.5 }}
                                />
                                <span>{skill}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </motion.div>
                </SpotlightCard>
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
              <TiltStackCard
                key={index}
                icon={<span>{stack.icon}</span>}
                title={stack.category}
                technologies={stack.technologies}
                className="relative"
              >
                <div className="stack-technologies grid sm:grid-cols-2 gap-2">
                  {stack.technologies.map((tech, techIndex) => {
                    const techInfo = getTechDescription(tech);
                    return (
                      <motion.div
                        key={techIndex}
                        className="tech-item flex items-center gap-2 text-[var(--parchment-050)]/80 hover:text-[var(--signal-500)] transition-colors cursor-help"
                        onMouseEnter={() => setHoveredTech(`${stack.category}-${techIndex}`)}
                        onMouseLeave={() => setHoveredTech(null)}
                        whileHover={{ scale: 1.05, x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <Icon slug={getTechIconSlug(tech)} className="tech-icon w-4 h-4" />
                        </motion.div>
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
                      </motion.div>
                    );
                  })}
                </div>
              </TiltStackCard>
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
          <OceanRippleButton
            asLink
            href="/case-studies"
            variant="primary"
            size="lg"
            className="cta-button inline-block mt-6"
          >
            View Case Studies →
          </OceanRippleButton>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default Toolbox;
