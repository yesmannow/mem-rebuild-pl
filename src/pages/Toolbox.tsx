import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import SkillsRadar from "../components/skills/SkillsRadar";
import ToolboxEcosystem from "../components/diagrams/ToolboxEcosystem";
import {
  ZapIcon,
  ShieldIcon,
  ActivityIcon,
  ServerIcon,
  TargetIcon,
  RepeatIcon,
  PaletteIcon,
  CreditCardIcon,
  ChevronDownIcon
} from "../components/icons/TechIcons";
import TechTooltip from "../components/tooltips/TechTooltip";
import Icon from "../components/Icon";
import { fadeInUp, staggerContainer, staggerItem } from "../utils/animations";
import { technicalCategories, technologyStacks } from "../data/toolbox";
import { getTechDescription } from "../data/techDescriptions";
import "./Toolbox.css";

const Toolbox: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  // Map technology names to icon slugs
  const getTechIconSlug = (techName: string): string => {
    const techMap: { [key: string]: string } = {
      'React': 'react',
      'Node.js': 'node',
      'TypeScript': 'typescript',
      'Tailwind CSS': 'tailwind',
      'Vite': 'vite',
      'Git/GitHub': 'github',
      'Python': 'python',
      'Flask': 'flask',
      'FastAPI': 'fastapi',
      'Docker': 'docker',
      'AWS': 'aws',
      'Azure': 'azure',
      'PostgreSQL': 'postgres',
      'MySQL': 'mysql',
      'Redis': 'redis',
      'GraphQL': 'graphql'
    };
    return techMap[techName] || 'react'; // fallback to react icon
  };

  const getIconForCategory = (title: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "Marketing Strategy & Planning": <TargetIcon className="w-5 h-5" />,
      "Marketing Automation & CRM": <RepeatIcon className="w-5 h-5" />,
      "Performance & Optimization": <ZapIcon className="w-5 h-5" />,
      "Security & Infrastructure": <ShieldIcon className="w-5 h-5" />,
      "Analytics & Conversion Tracking": <ActivityIcon className="w-5 h-5" />,
      "Server Administration & DevOps": <ServerIcon className="w-5 h-5" />,
      "Content & Creative": <PaletteIcon className="w-5 h-5" />,
      "E-commerce & Payments": <CreditCardIcon className="w-5 h-5" />
    };
    return iconMap[title] || <ZapIcon className="w-5 h-5" />;
  };

  return (
    <main className="toolbox-page">
      <AnimatedSection>
        <section className="toolbox-header">
          <motion.h1 variants={fadeInUp}>Skills & Tools</motion.h1>
          <motion.p className="lead" variants={fadeInUp}>
            A unique combination of marketing and technical skills. I'm proficient in marketing automation platforms
            (HubSpot, Marketo, Salesforce CRM), analytics tools (Google Analytics, Google Ads, Facebook Ads Manager),
            email automation (Zapier, FluentCRM), alongside programming languages and frameworks (HTML/CSS, JavaScript,
            Python, React, TypeScript). This dual expertise enables me to build complete marketing systems that
            drive measurable ROI.
          </motion.p>
        </section>
      </AnimatedSection>

      <SkillsRadar />

      <ToolboxEcosystem />

      <AnimatedSection delay={0.2}>
        <section className="technical-categories">
          <div className="section-intro">
            <h2>Core Technical Categories</h2>
            <p>Specialized expertise organized by technical discipline</p>
          </div>

          <div className="categories-list">
            {technicalCategories.map((category, index) => {
              const isExpanded = expandedCategory === index;
              return (
              <motion.div
                key={index}
                className={`category-card ${isExpanded ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="category-header"
                  onClick={() => toggleCategory(index)}
                  {...(isExpanded ? { 'aria-expanded': true } : { 'aria-expanded': false })}
                >
                  <div className="header-content">
                    <div className="icon-wrapper">
                      {getIconForCategory(category.title)}
                    </div>
                    <div className="text-content">
                      <h3>{category.title}</h3>
                      <p className="description">{category.description}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className={`chevron ${expandedCategory === index ? 'rotated' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="category-skills">
                        <div className="skills-grid">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skillIndex}
                              className="skill-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: skillIndex * 0.03 }}
                            >
                              <div className="skill-dot"></div>
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
        <section className="technology-stacks">
          <div className="section-intro">
            <h2>Technology Stacks</h2>
            <p>Comprehensive tool proficiency across development, analytics, and marketing platforms</p>
          </div>

          <motion.div
            className="stacks-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {technologyStacks.map((stack, index) => (
              <motion.div
                key={index}
                className="stack-card"
                variants={staggerItem}
                whileHover={{ scale: 1.05, translateY: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="stack-header">
                  <span className="stack-icon">{stack.icon}</span>
                  <h3>{stack.category}</h3>
                </div>
                <div className="stack-technologies">
                  {stack.technologies.map((tech, techIndex) => {
                    const techInfo = getTechDescription(tech);
                    return (
                      <div
                        key={techIndex}
                        className="tech-item"
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
        <section className="toolbox-cta">
          <h2>Want to see these skills in action?</h2>
          <p>Explore my case studies to see how I apply these technical capabilities to solve real business challenges.</p>
          <motion.a
            href="/case-studies"
            className="cta-button"
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