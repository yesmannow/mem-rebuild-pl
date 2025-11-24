import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, Code, Package, Zap, Database, Settings, GitBranch } from 'lucide-react';
import AnimatedSection from '../components/animations/AnimatedSection';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';

interface Tool {
  name: string;
  category: 'CLI' | 'MCP Server' | 'Build Tool' | 'Content Generation' | 'Automation';
  description: string;
  technologies: string[];
  usage: string;
  outcomes: string[];
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: 'MCP Server',
    category: 'MCP Server',
    description: 'Express-based Model Context Protocol server with health monitoring, rate limiting, and safe filesystem operations for AI-powered development workflows.',
    technologies: ['Node.js', 'Express', 'JavaScript'],
    usage: `# Start the MCP server
npm run mcp:start

# Test server health
npm run mcp:test

# Monitor server metrics
npm run mcp:monitor`,
    outcomes: [
      'Real-time health monitoring with failure tracking',
      'Secure filesystem operations with path traversal protection',
      'Rate limiting and auth token support',
      'Rolling average response time metrics'
    ],
    icon: <Database className="w-6 h-6" />
  },
  {
    name: 'Scrape & Generate CLI',
    category: 'Content Generation',
    description: 'Automated content pipeline that scrapes design inspiration websites, uses Gemini AI for summarization, optimizes images with Sharp, and generates Markdown files with YAML frontmatter.',
    technologies: ['Node.js', 'Axios', 'Cheerio', 'Sharp', 'Gemini AI'],
    usage: `# Run content scraper
npm run generate:content

# Copy optimized assets
npm run copy:assets

# Full build with content generation
npm run build:full`,
    outcomes: [
      'Automated content extraction from design websites',
      '75-word AI-powered summaries via Gemini',
      'Image optimization: 600px width, 80% JPEG quality',
      'Markdown files with structured frontmatter'
    ],
    icon: <Zap className="w-6 h-6" />
  },
  {
    name: 'MCP CLI Wrapper',
    category: 'CLI',
    description: 'Command-line interface for managing MCP server operations, health checks, smoke tests, and repository audits with support for dry-run mode.',
    technologies: ['Node.js', 'ESM', 'Child Process'],
    usage: `# Start MCP server
node scripts/mcp-cli.js start

# Run health probe
node scripts/mcp-cli.js probe

# Run smoke tests
node scripts/mcp-cli.js smoke`,
    outcomes: [
      'Unified CLI for all MCP operations',
      'Health monitoring and smoke testing',
      'Repository audit capabilities',
      'Cross-platform compatibility'
    ],
    icon: <Terminal className="w-6 h-6" />
  },
  {
    name: 'Design Asset Scraper',
    category: 'Automation',
    description: 'Python-based MCP integration for extracting images and design components from websites with XPath selectors and CORS handling.',
    technologies: ['Python', 'Asyncio', 'MCP Protocol'],
    usage: `# Scrape images
npm run scrape:images

# Scrape design components
npm run scrape:design

# Scrape all assets
npm run scrape:all`,
    outcomes: [
      'Automated image extraction from target websites',
      'Design component discovery and download',
      'XPath-based element selection',
      'CORS-aware HTTP requests'
    ],
    icon: <Code className="w-6 h-6" />
  },
  {
    name: 'Icon Component Generator',
    category: 'Build Tool',
    description: 'Automated React component generation from SVG icons with TypeScript support, dry-run mode, and standardized naming conventions.',
    technologies: ['Node.js', 'React', 'TypeScript'],
    usage: `# Preview icon generation
npm run icon:generate-components

# Apply changes
npm run icon:generate-components:apply

# Audit existing icons
npm run icon:audit`,
    outcomes: [
      'Auto-generated React components from SVGs',
      'TypeScript definitions included',
      'Consistent naming and export patterns',
      'Import/export validation'
    ],
    icon: <Package className="w-6 h-6" />
  },
  {
    name: 'Color Refactoring Tool',
    category: 'Build Tool',
    description: 'Design system migration tool that consolidates raw color values into CSS custom properties and Tailwind classes across the entire codebase.',
    technologies: ['Node.js', 'AST Parsing', 'CSS'],
    usage: `# Preview color refactoring
npm run design:refactor-colors

# Apply color consolidation
npm run design:refactor-colors:apply

# Map colors to design system
npm run design:map-colors`,
    outcomes: [
      'Automated color token consolidation',
      'CSS custom property generation',
      'Tailwind class extraction',
      'Design system consistency enforcement'
    ],
    icon: <Settings className="w-6 h-6" />
  },
  {
    name: 'Enhanced Moodboard Generator',
    category: 'Content Generation',
    description: 'Intelligent moodboard creation system that generates brand inspiration boards, classifies design styles, and syncs metadata for the portfolio gallery.',
    technologies: ['Node.js', 'Image Processing', 'AI Classification'],
    usage: `# Generate enhanced moodboards
npm run generate:enhanced-moodboards

# Classify design styles
npm run classify:moodboards

# Sync inspiration index
npm run sync:inspiration`,
    outcomes: [
      'Automated brand moodboard creation',
      'AI-powered style classification',
      'Metadata synchronization',
      'Portfolio gallery integration'
    ],
    icon: <GitBranch className="w-6 h-6" />
  },
  {
    name: 'Image Build Pipeline',
    category: 'Build Tool',
    description: 'Comprehensive image processing pipeline with Sharp integration for optimization, format conversion, manifest generation, and MIME type validation.',
    technologies: ['Node.js', 'Sharp', 'ESM'],
    usage: `# Build image manifest
npm run images:build

# Normalize filenames
npm run images:normalize

# Optimize all images
npm run images:opt`,
    outcomes: [
      'Automated image optimization',
      'WebP/AVIF format conversion',
      'Image manifest for lazy loading',
      'MIME type validation'
    ],
    icon: <Package className="w-6 h-6" />
  }
];

const ToolsShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'CLI', 'MCP Server', 'Build Tool', 'Content Generation', 'Automation'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <main className="tools-showcase bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen relative">
      <OceanBackgroundBeams className="opacity-20" />
      
      {/* Hero Section */}
      <AnimatedSection>
        <section className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-turquoise/10 border border-turquoise/20 rounded-full mb-6">
              <Terminal className="w-4 h-4 text-turquoise" />
              <span className="text-sm font-medium text-turquoise">Developer Tools & Automation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              CLI Tools & MCP Servers
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
              A comprehensive toolkit of command-line utilities, automation scripts, and MCP servers 
              built to streamline portfolio development, content generation, and design system management.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search tools by name, technology, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent text-slate-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-turquoise text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Tools Grid */}
      <AnimatedSection delay={0.2}>
        <section className="container mx-auto px-6 pb-16 relative z-10">
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 overflow-hidden group"
              >
                {/* Tool Header */}
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-turquoise/10 rounded-lg text-turquoise group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {tool.name}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-creamsicle/10 text-creamsicle text-xs font-semibold rounded">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex flex-wrap gap-2">
                    {tool.technologies.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full border border-slate-200 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Usage */}
                <div className="p-6">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-turquoise" />
                    Usage
                  </h4>
                  <div className="relative group/code">
                    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{tool.usage}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(tool.usage)}
                      className="absolute top-2 right-2 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded opacity-0 group-hover/code:opacity-100 transition-opacity"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* Outcomes */}
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-creamsicle" />
                    Outcomes
                  </h4>
                  <ul className="space-y-2">
                    {tool.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="text-turquoise mt-1">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No tools found matching your search criteria.
              </p>
            </div>
          )}
        </section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={0.4}>
        <section className="container mx-auto px-6 pb-16 relative z-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-turquoise to-blue-500 rounded-2xl shadow-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center">Tool Ecosystem Stats</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{tools.length}</div>
                <div className="text-blue-100">Total Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {tools.filter(t => t.category === 'CLI').length}
                </div>
                <div className="text-blue-100">CLI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {new Set(tools.flatMap(t => t.technologies)).size}
                </div>
                <div className="text-blue-100">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  {tools.reduce((acc, t) => acc + t.outcomes.length, 0)}
                </div>
                <div className="text-blue-100">Key Outcomes</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default ToolsShowcase;
