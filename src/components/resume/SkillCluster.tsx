/**
 * SkillCluster - Horizontal Tab System with Masonry Animation
 * Tabs: Leadership, Strategy, Automation, Engineering
 * Uses framer-motion layout prop for physical shuffling animation
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Users, Target, Zap, Code } from 'lucide-react';
import { getTechIconPath } from '../../utils/techIcons';
import type { SkillCategory } from '../../types';

interface SkillClusterProps {
  categories: SkillCategory[];
  className?: string;
}

type TabType = 'leadership' | 'strategy' | 'automation' | 'engineering';

// Tab configuration
const tabs: Array<{ id: TabType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = [
  { id: 'leadership', label: 'Leadership', icon: Users },
  { id: 'strategy', label: 'Strategy', icon: Target },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'engineering', label: 'Engineering', icon: Code },
];

// Map skill categories to tabs
const categoryToTabMap: Record<string, TabType> = {
  leadership: 'leadership',
  strategy: 'strategy',
  automation: 'automation',
  development: 'engineering',
  analytics: 'automation', // Analytics goes to automation
  tools: 'engineering', // Tools goes to engineering
};

export const SkillCluster: React.FC<SkillClusterProps> = ({
  categories,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('leadership');

  // Group skills by tab
  const skillsByTab = useMemo(() => {
    const grouped: Record<TabType, string[]> = {
      leadership: [],
      strategy: [],
      automation: [],
      engineering: [],
    };

    categories.forEach((category) => {
      const tab = categoryToTabMap[category.id] || 'engineering';
      grouped[tab].push(...category.items);
    });

    // Remove duplicates
    Object.keys(grouped).forEach((tab) => {
      grouped[tab as TabType] = Array.from(new Set(grouped[tab as TabType]));
    });

    return grouped;
  }, [categories]);

  const activeSkills = skillsByTab[activeTab];

  // Extract tech name from skill string
  const extractTechNames = (skill: string): string[] => {
    const parenMatch = skill.match(/\(([^)]+)\)/);
    if (parenMatch) {
      return parenMatch[1].split(',').map((t) => t.trim());
    }
    const directTechNames = [
      'WordPress', 'JavaScript', 'React', 'HubSpot', 'FluentCRM', 'WP Fusion',
      'LearnDash', 'WooCommerce', 'Google Analytics', 'Google Tag Manager',
      'Mapbox', 'Cloudflare Workers', 'Cloudflare CDN', 'WP Rocket', 'LiteSpeed',
      'ACF Pro', 'FacetWP', 'Figma', 'Adobe Creative Suite', 'Canva', 'Photoshop',
      'Salesforce', 'GA4', 'GTM', 'Cloudflare'
    ];

    for (const techName of directTechNames) {
      if (skill === techName || skill.includes(techName)) {
        return [techName];
      }
    }
    return [];
  };

  const getSkillIcon = (skill: string): string | null => {
    const techNames = extractTechNames(skill);
    if (techNames.length > 0) {
      for (const techName of techNames) {
        const iconPath = getTechIconPath(techName);
        if (iconPath) return iconPath;
      }
    }
    return null;
  };

  const getDisplayName = (skill: string): string => {
    const techNames = extractTechNames(skill);
    if (techNames.length > 0) {
      return techNames[0];
    }
    return skill.length > 30 ? skill.substring(0, 30) + '...' : skill;
  };

  return (
    <div className={`skill-cluster ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-brand-text mb-2 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-teal to-brand-orange rounded-full" />
          Core Competencies
        </h2>
        <p className="text-brand-muted text-sm">
          Explore skills by category
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const skillCount = skillsByTab[tab.id].length;

          return (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20'
                  : 'bg-slate-800/50 text-brand-muted hover:bg-slate-800/70 hover:text-brand-text border border-white/10'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-700/50 text-brand-muted'
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
            {activeSkills.map((skill, index) => {
              const iconPath = getSkillIcon(skill);
              const displayName = getDisplayName(skill);

              return (
                <motion.div
                  key={`${activeTab}-${skill}`}
                  layoutId={`skill-${activeTab}-${skill}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 500, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    y: { duration: 0.2 },
                  }}
                  className="px-4 py-2 rounded-full bg-slate-800 border border-white/10 hover:border-brand-turquoise/50 hover:shadow-[0_0_12px_rgba(64,224,208,0.3)] transition-all flex items-center gap-2 group"
                >
                  {iconPath && (
                    <img
                      src={iconPath}
                      alt={`${displayName} icon`}
                      className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
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
    </div>
  );
};
