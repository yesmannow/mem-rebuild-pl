import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, GitBranch, Package, Zap, Shield, CheckCircle, Code, FileCode } from 'lucide-react';
import AnimatedSection from '../components/animations/AnimatedSection';
import { OceanBackgroundBeams } from '../components/ui/OceanBackgroundBeams';

const DevOpsPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'deployment' | 'guards' | 'metrics'>('architecture');

  return (
    <main className="devops-portfolio bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white min-h-screen relative">
      <OceanBackgroundBeams className="opacity-30" />
      
      {/* Hero Section */}
      <AnimatedSection>
        <section className="container mx-auto px-6 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-turquoise/20 border border-turquoise/30 rounded-full mb-6">
              <Server className="w-4 h-4 text-turquoise" />
              <span className="text-sm font-medium text-turquoise">DevOps & Infrastructure</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Deployment Architecture
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              A deep dive into the technical architecture, deployment strategies, and build optimizations 
              powering this portfolio—from dual base path logic to custom element guards.
            </p>
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Tab Navigation */}
      <AnimatedSection delay={0.1}>
        <section className="container mx-auto px-6 pb-8 relative z-10">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'architecture', label: 'Architecture', icon: <Code className="w-4 h-4" /> },
              { id: 'deployment', label: 'Deployment', icon: <GitBranch className="w-4 h-4" /> },
              { id: 'guards', label: 'Element Guards', icon: <Shield className="w-4 h-4" /> },
              { id: 'metrics', label: 'Bundle Metrics', icon: <Package className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-turquoise text-white shadow-lg scale-105'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Content Sections */}
      <AnimatedSection delay={0.2}>
        <section className="container mx-auto px-6 pb-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Architecture Tab */}
            {activeTab === 'architecture' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Code className="w-8 h-8 text-turquoise" />
                    Technical Architecture
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">Build Tool: Vite</h3>
                      <p className="text-slate-300 mb-4">
                        Lightning-fast development server with Hot Module Replacement (HMR), optimized builds, 
                        and intelligent code splitting. Vite leverages native ES modules for instant cold starts.
                      </p>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>React Fast Refresh with automatic JSX runtime</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Path aliases for clean imports (@, @components, @pages, etc.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>Rollup-based production builds with tree-shaking</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">Framework Stack</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <h4 className="font-semibold mb-2">Frontend</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• React 18 with TypeScript</li>
                            <li>• React Router v6 for routing</li>
                            <li>• Framer Motion for animations</li>
                            <li>• Tailwind CSS for styling</li>
                          </ul>
                        </div>
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <h4 className="font-semibold mb-2">Build Tools</h4>
                          <ul className="space-y-1 text-sm text-slate-300">
                            <li>• Vite 6.x for bundling</li>
                            <li>• TypeScript for type safety</li>
                            <li>• ESLint & Prettier for code quality</li>
                            <li>• Sharp for image optimization</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Deployment Tab */}
            {activeTab === 'deployment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <GitBranch className="w-8 h-8 text-turquoise" />
                    Dual Deployment Strategy
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-creamsicle mb-3">Base Path Configuration</h3>
                      <p className="text-slate-300 mb-4">
                        The portfolio supports deployment to both GitHub Pages (with subdirectory routing) 
                        and custom domains (with root-level routing) using environment-based base path logic.
                      </p>
                      
                      <div className="bg-slate-900 rounded-lg p-6 mb-4">
                        <div className="text-xs text-slate-400 mb-2">vite.config.js</div>
                        <pre className="text-sm text-slate-100 overflow-x-auto">
{`export default defineConfig({
  // Set base path for GitHub Pages deployment
  // Use '/' for root domain deployments (Vercel, Netlify, etc.)
  // Use repository name for GitHub Pages (e.g., '/mem-rebuild-pl/')
  base: process.env.GITHUB_PAGES === 'true' 
    ? \`/\${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'mem-rebuild-pl'}/\`
    : '/',
  // ... rest of config
});`}
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 p-6 rounded-lg border border-blue-700">
                          <h4 className="font-semibold text-blue-300 mb-3">GitHub Pages</h4>
                          <p className="text-sm text-slate-300 mb-3">
                            Deployed to subdirectory with automatic base path injection
                          </p>
                          <div className="space-y-2 text-xs text-slate-400">
                            <div><strong>Base:</strong> /mem-rebuild-pl/</div>
                            <div><strong>URL:</strong> username.github.io/mem-rebuild-pl/</div>
                            <div><strong>Build:</strong> GITHUB_PAGES=true npm run build</div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 p-6 rounded-lg border border-purple-700">
                          <h4 className="font-semibold text-purple-300 mb-3">Cloudflare Pages / Vercel</h4>
                          <p className="text-sm text-slate-300 mb-3">
                            Deployed to root domain with clean URLs
                          </p>
                          <div className="space-y-2 text-xs text-slate-400">
                            <div><strong>Base:</strong> /</div>
                            <div><strong>URL:</strong> yourdomain.com/</div>
                            <div><strong>Build:</strong> npm run build</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-creamsicle mb-3">CI/CD Pipeline</h3>
                      <div className="space-y-3">
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-turquoise/20 rounded-full flex items-center justify-center text-turquoise font-bold">1</div>
                            <h4 className="font-semibold">Pre-build Checks</h4>
                          </div>
                          <p className="text-sm text-slate-300 ml-11">
                            Type checking, linting, and image manifest generation
                          </p>
                        </div>
                        
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-turquoise/20 rounded-full flex items-center justify-center text-turquoise font-bold">2</div>
                            <h4 className="font-semibold">Build Process</h4>
                          </div>
                          <p className="text-sm text-slate-300 ml-11">
                            Vite production build with code splitting and optimization
                          </p>
                        </div>
                        
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 bg-turquoise/20 rounded-full flex items-center justify-center text-turquoise font-bold">3</div>
                            <h4 className="font-semibold">Deployment</h4>
                          </div>
                          <p className="text-sm text-slate-300 ml-11">
                            Automatic deployment to GitHub Pages or Cloudflare Pages on push
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Guards Tab */}
            {activeTab === 'guards' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="w-8 h-8 text-turquoise" />
                    Custom Element Guards
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">The Problem</h3>
                      <p className="text-slate-300 mb-4">
                        Custom elements (like TinyMCE's autosize textarea) can only be registered once. 
                        In development with Vite's HMR, hot module reloads attempt to re-register elements, 
                        causing <code className="px-2 py-1 bg-red-900/30 text-red-300 rounded">TypeError: Failed to execute 'define' on 'CustomElementRegistry'</code> errors.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">The Solution: defineCustomElementIfNeeded</h3>
                      <p className="text-slate-300 mb-4">
                        A guard function that checks if an element is already registered before attempting to define it.
                      </p>
                      
                      <div className="bg-slate-900 rounded-lg p-6 mb-4">
                        <div className="text-xs text-slate-400 mb-2">src/utils/defineCustomElementGuard.ts</div>
                        <pre className="text-sm text-slate-100 overflow-x-auto">
{`export function defineCustomElementIfNeeded(
  name: string,
  ctor: CustomElementConstructor,
  options?: ElementDefinitionOptions
): void {
  // 1. ENVIRONMENT CHECK: Ensure browser environment
  if (typeof window === 'undefined' || !('customElements' in window)) {
    return;
  }

  // 2. CORE PREVENTION: Check if NOT already defined
  if (!customElements.get(name)) {
    try {
      customElements.define(name, ctor, options);
    } catch (err) {
      // 3. RACE CONDITION HANDLING
      const error = err as Error;
      if (error?.message?.includes('has already been used')) {
        // Safe to ignore - another script registered it
        return;
      }
      throw err; // Re-throw real errors
    }
  }
}`}
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                          <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                            <span className="text-2xl">1️⃣</span>
                            Environment Check
                          </h4>
                          <p className="text-sm text-slate-300">
                            Prevents SSR errors by checking for browser globals
                          </p>
                        </div>
                        
                        <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                          <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                            <span className="text-2xl">2️⃣</span>
                            Registry Query
                          </h4>
                          <p className="text-sm text-slate-300">
                            Uses customElements.get() to check existing registrations
                          </p>
                        </div>
                        
                        <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                          <h4 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                            <span className="text-2xl">3️⃣</span>
                            Race Protection
                          </h4>
                          <p className="text-sm text-slate-300">
                            Catches and ignores duplicate registration errors
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-creamsicle mb-3">Usage Example</h3>
                      <div className="bg-slate-900 rounded-lg p-6">
                        <pre className="text-sm text-slate-100 overflow-x-auto">
{`import { defineCustomElementIfNeeded } from '@/utils/defineCustomElementGuard';

// Instead of:
// customElements.define('mce-autosize-textarea', AutosizeTextarea);

// Use:
defineCustomElementIfNeeded('mce-autosize-textarea', AutosizeTextarea);

// Benefits:
// ✓ No duplicate registration errors
// ✓ Works with Vite HMR
// ✓ SSR-safe
// ✓ Race condition protection`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Metrics Tab */}
            {activeTab === 'metrics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <Package className="w-8 h-8 text-turquoise" />
                    Bundle Optimization Metrics
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">Code Splitting Strategy</h3>
                      <p className="text-slate-300 mb-4">
                        Intelligent code splitting reduces initial load time by splitting vendor libraries 
                        and lazy-loading page components.
                      </p>
                      
                      <div className="bg-slate-900 rounded-lg p-6 mb-4">
                        <div className="text-xs text-slate-400 mb-2">vite.config.js - manualChunks</div>
                        <pre className="text-sm text-slate-100 overflow-x-auto">
{`manualChunks: {
  vendor: ['react', 'react-dom'],
  motion: ['framer-motion'],
  router: ['react-router-dom'],
}`}
                        </pre>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 p-6 rounded-lg border border-blue-700">
                          <div className="text-3xl font-bold text-blue-300 mb-2">~150KB</div>
                          <div className="text-sm text-slate-300">Vendor chunk (gzipped)</div>
                          <div className="text-xs text-slate-400 mt-2">React + React DOM</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 p-6 rounded-lg border border-purple-700">
                          <div className="text-3xl font-bold text-purple-300 mb-2">~80KB</div>
                          <div className="text-sm text-slate-300">Motion chunk (gzipped)</div>
                          <div className="text-xs text-slate-400 mt-2">Framer Motion</div>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-900/50 to-slate-900/50 p-6 rounded-lg border border-green-700">
                          <div className="text-3xl font-bold text-green-300 mb-2">~40KB</div>
                          <div className="text-sm text-slate-300">Router chunk (gzipped)</div>
                          <div className="text-xs text-slate-400 mt-2">React Router</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-turquoise mb-3">Lazy Loading & Route Splitting</h3>
                      <p className="text-slate-300 mb-4">
                        Each page is loaded on-demand, reducing the initial bundle size by ~70%.
                      </p>
                      
                      <div className="bg-slate-900 rounded-lg p-6">
                        <div className="text-xs text-slate-400 mb-2">src/router/AppRouter.tsx</div>
                        <pre className="text-sm text-slate-100 overflow-x-auto">
{`// Lazy load pages for code splitting
const Home = React.lazy(() => import('../pages/index'));
const CaseStudies = React.lazy(() => import('../pages/CaseStudies'));
const ToolsShowcase = React.lazy(() => import('../pages/ToolsShowcase'));

// Result: Each page becomes a separate chunk
// loaded only when the route is accessed`}
                        </pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-creamsicle mb-3">Build Analysis</h3>
                      <p className="text-slate-300 mb-4">
                        Run bundle analysis with the Rollup visualizer plugin:
                      </p>
                      
                      <div className="bg-slate-900 rounded-lg p-4">
                        <pre className="text-sm text-slate-100">
{`ANALYZE=true npm run build`}
                        </pre>
                      </div>

                      <div className="mt-4 space-y-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Opens interactive bundle visualization in browser</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Shows gzipped and brotli compressed sizes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Identifies optimization opportunities</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-creamsicle mb-3">Performance Targets</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <span className="text-slate-300">Total Initial Bundle (gzipped)</span>
                          <span className="font-bold text-green-400">&lt; 500KB</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <span className="text-slate-300">Largest Chunk Warning Limit</span>
                          <span className="font-bold text-yellow-400">1000KB</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                          <span className="text-slate-300">Lighthouse Performance Score</span>
                          <span className="font-bold text-green-400">&gt; 85</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* Technology Summary */}
      <AnimatedSection delay={0.3}>
        <section className="container mx-auto px-6 pb-16 relative z-10">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-turquoise via-blue-500 to-purple-500 rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Deployment Stack Summary</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center text-white">
                <Zap className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <div className="text-2xl font-bold mb-1">Vite 6</div>
                <div className="text-sm text-blue-100">Build Tool</div>
              </div>
              <div className="text-center text-white">
                <Server className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <div className="text-2xl font-bold mb-1">2 Targets</div>
                <div className="text-sm text-blue-100">GitHub + Cloudflare</div>
              </div>
              <div className="text-center text-white">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <div className="text-2xl font-bold mb-1">Guard Pattern</div>
                <div className="text-sm text-blue-100">Custom Elements</div>
              </div>
              <div className="text-center text-white">
                <FileCode className="w-12 h-12 mx-auto mb-3 opacity-90" />
                <div className="text-2xl font-bold mb-1">TypeScript</div>
                <div className="text-sm text-blue-100">Type Safety</div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default DevOpsPortfolio;
