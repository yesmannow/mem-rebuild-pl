/**
 * SkillCluster - Horizontal Tab System with Masonry Animation
 * Capability Engine: High-density skill canvas with tab-driven navigation
 * Uses framer-motion layout prop for physical shuffling animation
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Zap } from 'lucide-react';
import { getTechIconPath } from '../../utils/techIcons';
import { MouseSpotlight } from './MouseSpotlight';
import { SystemStatusTicker } from './SystemStatusTicker';
import type { SkillCategory } from '../../types';

interface SkillClusterProps {
  categories: SkillCategory[];
  className?: string;
}

export const SkillCluster: React.FC<SkillClusterProps> = ({
  categories,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(categories[0]?.title || '');

  // Logic Engine: Memoized category selection for performance
  const activeCategory = useMemo(
    () => categories.find((cat) => cat.title === activeTab),
    [categories, activeTab]
  );

  const activeSkills = activeCategory?.items || [];

  // Extract tech name from skill string for icon matching
  const extractTechName = (skill: string): string | null => {
    // Check for direct matches first
    const directMatch = getTechIconPath(skill);
    if (directMatch) return skill;

    // Check for tech names in parentheses
    const parenMatch = skill.match(/\(([^)]+)\)/);
    if (parenMatch) {
      const techName = parenMatch[1].split(',')[0].trim();
      if (getTechIconPath(techName)) return techName;
    }

    // Check if skill contains known tech names
    const knownTechs = [
      'WordPress', 'JavaScript', 'React', 'HubSpot', 'FluentCRM', 'WP Fusion',
      'LearnDash', 'WooCommerce', 'Google Analytics', 'Google Tag Manager',
      'Mapbox', 'Cloudflare Workers', 'Cloudflare CDN', 'WP Rocket', 'LiteSpeed',
      'ACF Pro', 'FacetWP', 'Figma', 'Adobe Creative Suite', 'Canva', 'Photoshop',
      'Salesforce', 'GA4', 'GTM', 'Cloudflare'
    ];

    for (const tech of knownTechs) {
      if (skill.includes(tech)) {
        return tech;
      }
    }

    return null;
  };

  const getSkillIcon = (skill: string): string | null => {
    const techName = extractTechName(skill);
    if (techName) {
      return getTechIconPath(techName) || null;
    }
    return null;
  };

  // Extract unique tools with icons for the tool grid
  const activeTools = useMemo(() => {
    const tools = new Map<string, string | null>();
    activeSkills.forEach((skill) => {
      const icon = getSkillIcon(skill);
      const techName = extractTechName(skill);
      if (icon && techName && !tools.has(techName)) {
        tools.set(techName, icon);
      }
    });
    return Array.from(tools.entries()).slice(0, 8);
  }, [activeSkills]);

  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 backdrop-blur shadow-[0_40px_120px_rgba(2,6,23,0.85)] ${className}`}>
      <MouseSpotlight intensity={0.35} size={520} className="absolute inset-0 opacity-70" />
      <div className="relative z-10 p-6 lg:p-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-brand-text mb-1 flex items-center gap-3">
              <span className="w-1 h-8 bg-gradient-to-b from-brand-teal to-brand-orange rounded-full" />
              Capability Engine
            </h2>
            <p className="text-sm text-brand-muted max-w-2xl">
              A high-density, tab-driven skill canvas that surfaces leadership, strategy, automation, and engineering tools with glassmorphism polish.
            </p>
          </div>
          <div className="text-right text-xs uppercase tracking-[0.5em] text-brand-muted">
            <SystemStatusTicker />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 rounded-2xl border border-white/5 bg-slate-900/30 p-3 backdrop-blur">
          {categories.map((category) => {
            const isActive = activeTab === category.title;
            const skillCount = category.items.length;

            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveTab(category.title)}
                whileHover={{ scale: isActive ? 1 : 1.04 }}
                whileTap={{ scale: isActive ? 1 : 0.96 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-brand-teal to-brand-orange text-white shadow-[0_15px_30px_rgba(64,224,208,0.25)] border border-transparent'
                    : 'bg-slate-900/60 text-brand-muted border border-white/5'
                }`}
              >
                <span>{category.title}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-brand-muted'
                }`}>
                  {skillCount}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Skills Grid - Masonry Layout with Layout Animation */}
        <LayoutGroup>
          <motion.div
            layout
            className="flex flex-wrap gap-3"
            initial={false}
          >
            <AnimatePresence mode="popLayout">
              {activeSkills.map((skill) => {
                const iconPath = getSkillIcon(skill);
                const displayName = skill.length > 40 ? skill.substring(0, 40) + '...' : skill;

                return (
                  <motion.div
                    key={`${activeTab}-${skill}`}
                    layoutId={`skill-${activeTab}-${skill}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85, y: -20 }}
                    transition={{
                      layout: { type: 'spring', stiffness: 400, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      y: { duration: 0.2 },
                    }}
                    className="px-4 py-2 rounded-full bg-slate-900/80 border border-white/10 hover:border-brand-teal/50 hover:shadow-[0_0_12px_rgba(64,224,208,0.35)] transition-all flex items-center gap-2 group shadow-[0_15px_40px_rgba(2,6,23,0.45)]"
                  >
                    {iconPath && (
                      <img
                        src={iconPath}
                        alt={`${displayName} icon`}
                        className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <span className="text-sm font-medium text-brand-text whitespace-nowrap">
                      {displayName}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {activeSkills.length === 0 && (
          <div className="text-center py-12 text-brand-muted">
            <p>No skills found in this category.</p>
          </div>
        )}

        {/* Tool Icons Grid */}
        {activeTools.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {activeTools.map(([name, iconPath]) => (
              <div
                key={`tool-${name}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-slate-900/60 border border-white/10 py-3 shadow-[0_15px_30px_rgba(2,6,23,0.6)]"
              >
                {iconPath ? (
                  <img
                    src={iconPath}
                    alt={name}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs uppercase text-brand-muted">
                    {name.charAt(0)}
                  </div>
                )}
                <span className="text-xs text-brand-muted uppercase tracking-[0.2em]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
