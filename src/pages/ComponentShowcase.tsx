import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import GlassCard from '../components/ui/GlassCard';
import SkillBadge from '../components/ui/SkillBadge';
import FloatingActionButton from '../components/ui/FloatingActionButton';
import ParallaxSection from '../components/ui/ParallaxSection';
import { Sparkles, Zap, Rocket } from 'lucide-react';

const ComponentShowcase: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Component Showcase | Jacob Darling Portfolio</title>
        <meta name="description" content="Interactive UI components showcase featuring modern design patterns and animations." />
      </Helmet>

      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Component Showcase
            </h1>
            <p className="text-xl text-neutral-300">
              Modern, interactive UI components built with React and Framer Motion
            </p>
          </motion.div>

          {/* Glass Cards Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Glass Card Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard className="p-6">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
                <p className="text-neutral-300">
                  Modern glassmorphism effect with backdrop blur and subtle gradients.
                </p>
              </GlassCard>

              <GlassCard className="p-6" blur="lg" gradient="from-blue-500/10 to-purple-500/5">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
                <p className="text-neutral-300">
                  Hardware-accelerated animations with smooth 60fps performance.
                </p>
              </GlassCard>

              <GlassCard className="p-6" blur="sm" gradient="from-green-500/10 to-emerald-500/5">
                <div className="text-3xl mb-3">♿</div>
                <h3 className="text-xl font-semibold text-white mb-2">Accessible</h3>
                <p className="text-neutral-300">
                  Respects reduced motion preferences and maintains WCAG contrast.
                </p>
              </GlassCard>
            </div>
          </section>

          {/* Skill Badges Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Skill Badges</h2>
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                <SkillBadge skill="React" icon="⚛️" level="expert" category="Frontend" />
                <SkillBadge skill="TypeScript" icon="📘" level="advanced" category="Language" />
                <SkillBadge skill="Framer Motion" icon="🎬" level="expert" category="Animation" />
                <SkillBadge skill="TailwindCSS" icon="🎨" level="advanced" category="Styling" />
                <SkillBadge skill="Vite" icon="⚡" level="intermediate" category="Build Tool" />
                <SkillBadge skill="Canvas API" icon="🎨" level="advanced" category="Graphics" />
                <SkillBadge skill="Web Performance" icon="🚀" level="expert" category="Optimization" />
                <SkillBadge skill="Accessibility" icon="♿" level="advanced" category="UX" />
              </div>
            </GlassCard>
          </section>

          {/* Parallax Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Parallax Effects</h2>
            <div className="space-y-12">
              <ParallaxSection speed={0.3}>
                <GlassCard className="p-8">
                  <div className="text-4xl mb-4">🌊</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Slow Parallax</h3>
                  <p className="text-neutral-300">
                    This card moves slower than the scroll speed, creating depth.
                  </p>
                </GlassCard>
              </ParallaxSection>

              <ParallaxSection speed={0.6}>
                <GlassCard className="p-8" gradient="from-purple-500/10 to-pink-500/5">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Fast Parallax</h3>
                  <p className="text-neutral-300">
                    This card moves faster, adding dynamic motion to the page.
                  </p>
                </GlassCard>
              </ParallaxSection>
            </div>
          </section>

          {/* Feature Grid */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Interactive Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassCard className="p-6">
                <Sparkles className="w-8 h-8 text-[#88ABF2] mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Particle Hero</h3>
                <p className="text-neutral-300 mb-4">
                  Interactive canvas-based particle system with mouse repulsion and connection lines.
                </p>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Dynamic particle generation</li>
                  <li>• Mouse interaction effects</li>
                  <li>• Smooth 60fps animations</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <Zap className="w-8 h-8 text-[#88ABF2] mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Gradient Mesh</h3>
                <p className="text-neutral-300 mb-4">
                  Animated gradient background using radial gradients and smooth transitions.
                </p>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Multiple color points</li>
                  <li>• Smooth movement patterns</li>
                  <li>• Customizable speed</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <Rocket className="w-8 h-8 text-[#88ABF2] mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Floating Action Button</h3>
                <p className="text-neutral-300 mb-4">
                  Magnetic FAB with smooth animations and hover tooltips for quick actions.
                </p>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Magnetic mouse tracking</li>
                  <li>• Smooth spring animations</li>
                  <li>• Multiple position options</li>
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <div className="text-3xl mb-3">✨</div>
                <h3 className="text-xl font-semibold text-white mb-2">Glassmorphism</h3>
                <p className="text-neutral-300 mb-4">
                  Modern glass effect with backdrop blur, subtle gradients, and elegant borders.
                </p>
                <ul className="text-sm text-neutral-400 space-y-1">
                  <li>• Backdrop blur support</li>
                  <li>• Customizable opacity</li>
                  <li>• Border glow on hover</li>
                </ul>
              </GlassCard>
            </div>
          </section>
        </div>

        {/* Demo Floating Action Button */}
        <FloatingActionButton
          icon={<Sparkles />}
          label="Explore Components"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          position="bottom-right"
        />
      </div>
    </>
  );
};

export default ComponentShowcase;
