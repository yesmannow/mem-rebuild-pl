import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Target, Zap, Shield, BarChart3, Server, Palette, CreditCard, 
  ChevronDown, Check, Star, TrendingUp, Code, Users, Wrench, Sparkles,
  ArrowRight, Filter, Grid3X3, List, ExternalLink
} from 'lucide-react';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { OceanRippleButton } from '../components/ui/OceanRippleButton';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import { BentoCard, BentoGrid } from '../components/ui/BentoGrid';
import Icon from '../components/Icon';
import { technicalCategories, technologyStacks } from '../data/toolbox';
import { getTechDescription } from '../data/techDescriptions';
import { getTechIconSlug } from '../utils/techIcons';
import { cn } from '../lib/utils';

// Hero stats showcasing expertise
const heroStats = [
  { label: 'Tools Mastered', number: 75, suffix: '+', icon: Wrench },
  { label: 'Years Experience', number: 15, suffix: '+', icon: TrendingUp },
  { label: 'Projects Delivered', number: 120, suffix: '+', icon: Target },
  { label: 'Certifications', number: 12, suffix: '+', icon: Star },
];

// Featured skills with enhanced details
const featuredSkills = [
  {
    title: 'Marketing Automation',
    description: 'Building scalable marketing systems that nurture leads and drive conversions on autopilot.',
    level: 95,
    years: 8,
    icon: Zap,
    color: 'brand-teal',
    tools: ['HubSpot', 'Marketo', 'ActiveCampaign', 'Zapier'],
  },
  {
    title: 'Analytics & Tracking',
    description: 'Deep expertise in data-driven decision making with comprehensive tracking implementations.',
    level: 92,
    years: 10,
    icon: BarChart3,
    color: 'brand-orange',
    tools: ['Google Analytics 4', 'Google Tag Manager', 'Mixpanel', 'Hotjar'],
  },
  {
    title: 'Full-Stack Development',
    description: 'From React frontends to Node.js backends, building complete web applications.',
    level: 88,
    years: 6,
    icon: Code,
    color: 'sky-400',
    tools: ['React', 'TypeScript', 'Node.js', 'WordPress'],
  },
  {
    title: 'CRM Strategy',
    description: 'Designing and implementing customer relationship management systems that scale.',
    level: 90,
    years: 8,
    icon: Users,
    color: 'purple-400',
    tools: ['Salesforce', 'HubSpot CRM', 'FluentCRM', 'Pipedrive'],
  },
];

// Category icons mapping
const categoryIcons: Record<string, typeof Target> = {
  'Marketing Strategy & Planning': Target,
  'Marketing Automation & CRM': Zap,
  'Performance & Optimization': TrendingUp,
  'Security & Infrastructure': Shield,
  'Analytics & Conversion Tracking': BarChart3,
  'Server Administration & DevOps': Server,
  'Content & Creative': Palette,
  'E-commerce & Payments': CreditCard,
};

const Toolbox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]));
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const filteredCategories = useMemo(() => {
    return technicalCategories
      .map((category, index) => ({ category, index }))
      .filter(({ category }) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
          category.title.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query) ||
          category.skills.some((skill) => skill.toLowerCase().includes(query))
        );
      });
  }, [searchQuery]);

  const filteredStacks = useMemo(() => {
    if (activeFilter === 'all') return technologyStacks;
    return technologyStacks.filter(
      (stack) => stack.category.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  const filterOptions = ['all', 'marketing', 'development', 'analytics', 'infrastructure'];

  return (
    <>
      <Helmet>
        <title>Skills & Toolbox | Jacob Darling - Marketing Technology Expert</title>
        <meta name="description" content="Explore my comprehensive toolkit spanning marketing automation, analytics, full-stack development, and CRM strategy. 15+ years of expertise driving measurable results." />
      </Helmet>

      <main className="min-h-screen bg-brand-dark text-brand-text relative overflow-hidden">
        {/* Aurora Background */}
        <OceanAuroraBackground className="opacity-30" />
        
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Marketing + Technology Expertise
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center max-w-4xl mx-auto mb-8"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-brand-creamsicle">
                  Skills & Toolbox
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-muted leading-relaxed max-w-3xl mx-auto">
                A unique fusion of <span className="text-brand-teal font-semibold">marketing strategy</span> and{' '}
                <span className="text-brand-orange font-semibold">technical development</span>. 
                I build complete marketing systems that drive measurable ROI—from automation workflows to 
                custom applications.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
            >
              {heroStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 to-brand-orange/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 text-center hover:border-brand-teal/40 transition-all duration-300">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-brand-teal" />
                    <div className="text-2xl sm:text-3xl font-bold text-brand-text">
                      <OceanCountingNumber end={stat.number} suffix={stat.suffix} duration={2} />
                    </div>
                    <div className="text-xs sm:text-sm text-brand-muted mt-1">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Featured Skills Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Core Competencies</h2>
              <p className="text-brand-muted max-w-2xl mx-auto">
                Quantified expertise across key disciplines with years of hands-on experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {featuredSkills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={cn(
                    "absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500",
                    skill.color === 'brand-teal' && "bg-brand-teal/20",
                    skill.color === 'brand-orange' && "bg-brand-orange/20",
                    skill.color === 'sky-400' && "bg-sky-400/20",
                    skill.color === 'purple-400' && "bg-purple-400/20",
                  )} />
                  <div className="relative bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-teal/40 transition-all duration-300 h-full">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn(
                        "p-3 rounded-xl",
                        skill.color === 'brand-teal' && "bg-brand-teal/20 text-brand-teal",
                        skill.color === 'brand-orange' && "bg-brand-orange/20 text-brand-orange",
                        skill.color === 'sky-400' && "bg-sky-400/20 text-sky-400",
                        skill.color === 'purple-400' && "bg-purple-400/20 text-purple-400",
                      )}>
                        <skill.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-brand-text">{skill.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            "text-sm font-medium",
                            skill.color === 'brand-teal' && "text-brand-teal",
                            skill.color === 'brand-orange' && "text-brand-orange",
                            skill.color === 'sky-400' && "text-sky-400",
                            skill.color === 'purple-400' && "text-purple-400",
                          )}>{skill.level}% Proficiency</span>
                          <span className="text-brand-muted text-sm">• {skill.years} years</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-brand-muted text-sm mb-4">{skill.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={cn(
                            "h-full rounded-full",
                            skill.color === 'brand-teal' && "bg-gradient-to-r from-brand-teal to-brand-teal/70",
                            skill.color === 'brand-orange' && "bg-gradient-to-r from-brand-orange to-brand-orange/70",
                            skill.color === 'sky-400' && "bg-gradient-to-r from-sky-400 to-sky-400/70",
                            skill.color === 'purple-400' && "bg-gradient-to-r from-purple-400 to-purple-400/70",
                          )}
                        />
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 text-xs font-medium bg-slate-800/80 text-brand-muted rounded-lg border border-white/5 hover:border-brand-teal/30 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stacks Section */}
        <section className="py-16 md:py-24 relative bg-slate-900/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technology Arsenal</h2>
              <p className="text-brand-muted max-w-2xl mx-auto">
                Comprehensive tool proficiency across development, analytics, and marketing platforms
              </p>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-6xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="w-4 h-4 text-brand-muted" />
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activeFilter === filter
                        ? "bg-brand-teal text-slate-900"
                        : "bg-slate-800/50 text-brand-muted hover:bg-slate-800 hover:text-brand-text"
                    )}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === 'grid' ? "bg-brand-teal text-slate-900" : "text-brand-muted hover:text-brand-text"
                  )}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-md transition-all",
                    viewMode === 'list' ? "bg-brand-teal text-slate-900" : "text-brand-muted hover:text-brand-text"
                  )}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Stacks Grid */}
            <div className={cn(
              "grid gap-4 max-w-6xl mx-auto",
              viewMode === 'grid' 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 md:grid-cols-2"
            )}>
              {filteredStacks.map((stack, index) => (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-brand-teal/40 transition-all duration-300 h-full">
                    {/* Stack Header */}
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-white/5">
                      <span className="text-2xl">{stack.icon}</span>
                      <h3 className="font-semibold text-brand-text text-sm">{stack.category}</h3>
                    </div>
                    
                    {/* Technologies */}
                    <div className={cn(
                      "flex gap-2",
                      viewMode === 'grid' ? "flex-wrap" : "flex-wrap"
                    )}>
                      {stack.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="group/tech flex items-center gap-1.5 px-2 py-1 bg-slate-800/60 rounded-md text-xs text-brand-muted hover:text-brand-teal hover:bg-slate-800 transition-all duration-200"
                        >
                          <Icon slug={getTechIconSlug(tech)} className="w-3 h-3 opacity-70 group-hover/tech:opacity-100" />
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Categories Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Expertise by Discipline</h2>
              <p className="text-brand-muted max-w-2xl mx-auto mb-6">
                Specialized expertise organized by technical discipline
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
                <input
                  type="text"
                  placeholder="Search skills or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-brand-text placeholder:text-brand-muted/60 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal/50 transition-all"
                />
              </div>
            </motion.div>

            {/* Categories Accordion */}
            <div className="max-w-4xl mx-auto space-y-3">
              {filteredCategories.map(({ category, index }) => {
                const isExpanded = expandedCategories.has(index);
                const IconComponent = categoryIcons[category.title] || Target;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className={cn(
                      "bg-slate-900/60 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300",
                      isExpanded 
                        ? "border-brand-teal/40 shadow-lg shadow-brand-teal/10" 
                        : "border-white/10 hover:border-brand-teal/20"
                    )}>
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(index)}
                        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left"
                        aria-expanded={isExpanded}
                      >
                        <div className={cn(
                          "p-3 rounded-xl transition-colors",
                          isExpanded 
                            ? "bg-brand-teal/20 text-brand-teal" 
                            : "bg-slate-800 text-brand-muted group-hover:text-brand-teal"
                        )}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-brand-text text-lg">{category.title}</h3>
                          <p className="text-brand-muted text-sm line-clamp-1">{category.description}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-slate-800 rounded-md text-xs text-brand-muted">
                            <Check className="w-3 h-3" />
                            {category.skills.length} skills
                          </span>
                          <ChevronDown className={cn(
                            "w-5 h-5 text-brand-muted transition-transform duration-300",
                            isExpanded && "rotate-180 text-brand-teal"
                          )} />
                        </div>
                      </button>

                      {/* Skills Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/5">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-4">
                                {category.skills.map((skill, skillIndex) => (
                                  <motion.div
                                    key={skillIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: skillIndex * 0.03 }}
                                    className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg text-sm text-brand-muted hover:text-brand-teal hover:bg-slate-800 transition-all cursor-default group/skill"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-teal/60 group-hover/skill:bg-brand-teal transition-colors" />
                                    <span>{skill}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-brand-teal/20 via-brand-orange/20 to-brand-teal/20 rounded-3xl blur-3xl opacity-50" />
              
              {/* Content Card */}
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Ready to collaborate?
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  See These Skills in Action
                </h2>
                <p className="text-brand-muted text-lg max-w-2xl mx-auto mb-8">
                  Explore my case studies to see how I apply these technical capabilities 
                  to solve real business challenges and drive measurable results.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <OceanRippleButton
                    asLink
                    href="/case-studies"
                    variant="primary"
                    size="lg"
                  >
                    View Case Studies
                    <ArrowRight className="w-5 h-5" />
                  </OceanRippleButton>
                  
                  <OceanRippleButton
                    asLink
                    href="/contact"
                    variant="outline"
                    size="lg"
                  >
                    Let's Connect
                    <ExternalLink className="w-4 h-4" />
                  </OceanRippleButton>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Toolbox;
