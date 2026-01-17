/**
 * CinematicTimeline - Center-Spine Cinematic Timeline
 * Vertical timeline with alternating left/right content cards
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MapPin, Calendar, ChevronDown, Sparkles, Code, CheckCircle2 } from 'lucide-react';
import TiltCard from '../ui/TiltCard';
import { MetricBadge } from './MetricBadge';
import type { ExperienceItem } from '../../types';
import './CinematicTimeline.css';

interface CinematicTimelineProps {
  experiences: ExperienceItem[];
  className?: string;
}

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ item, index, isExpanded, onToggle }) => {
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* Timeline Node - Data Node Style */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="relative w-5 h-5 rounded-full bg-brand-dark border-2 border-brand-turquoise ring-2 ring-brand-turquoise/30 shadow-[0_0_15px_rgba(64,224,208,0.6)]"
        >
          {/* Inner glow dot */}
          <div className="absolute inset-1 rounded-full bg-brand-turquoise/20" />
        </motion.div>
      </div>

      {/* Content Card */}
      <div
        className={`flex justify-center ${
          isEven
            ? 'md:justify-start md:pr-[50%]'
            : 'md:justify-end md:pl-[50%]'
        }`}
      >
        <div className={`w-full max-w-2xl ${isEven ? 'md:pr-12' : 'md:pl-12'} px-4 md:px-0`}>
          <TiltCard
            className="rounded-2xl overflow-hidden"
            maxTilt={8}
            scale={1.02}
          >
            <motion.div
              className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900 backdrop-blur-md border border-white/10 p-6 hover:border-brand-teal/30 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
              whileHover={{ boxShadow: '0 20px 40px rgba(64, 224, 208, 0.1)' }}
            >
              {/* Header */}
              <button
                onClick={onToggle}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{item.role}</h3>
                      <span className="text-brand-teal font-semibold">{item.company}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-muted mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-brand-teal" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-brand-teal" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <p className="text-brand-muted text-sm line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {item.keyAchievement && (
                        <MetricBadge value={item.keyAchievement} color="emerald" />
                      )}
                      {item.highlight && (
                        <MetricBadge value={item.highlight} color="emerald" />
                      )}
                      {/* Add additional metrics based on company */}
                      {item.id === 'graston' && (
                        <MetricBadge value="+400 Automations" color="teal" />
                      )}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown size={20} className="text-brand-teal" />
                  </motion.div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/5 space-y-6">
                      {/* Achievements */}
                      <div>
                        <h4 className="text-sm font-bold text-brand-teal uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Sparkles size={14} />
                          Key Achievements ({item.achievements.length})
                        </h4>
                        <ul className="space-y-3">
                          {item.achievements.map((achievement, achIdx) => (
                            <motion.li
                              key={achIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: achIdx * 0.05 }}
                              className="flex items-start gap-3 text-sm text-brand-muted"
                            >
                              <CheckCircle2 size={16} className="text-brand-teal flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      {item.techStack && item.techStack.length > 0 && (
                        <div>
                          <h4 className="text-sm font-bold text-brand-teal uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Code size={14} />
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.techStack.map((tech) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-teal/10 to-brand-teal/5 border border-brand-teal/30 text-xs font-semibold text-brand-teal backdrop-blur-sm hover:border-brand-teal/50 transition-all"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tech Stack Row - Always Visible */}
              {item.techStack && item.techStack.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-brand-muted font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {item.techStack.length > 8 && (
                      <span className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-md text-brand-muted font-medium">
                        +{item.techStack.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 via-transparent to-brand-orange/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </motion.div>
  );
};

export const CinematicTimeline: React.FC<CinematicTimelineProps> = ({
  experiences,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const updateScrollProgress = () => {
      if (!timelineRef.current || ticking) return;
      ticking = true;

      rafId = requestAnimationFrame(() => {
        const timeline = timelineRef.current;
        if (!timeline) {
          ticking = false;
          return;
        }

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;

        // Calculate scroll progress (0 to 1)
        const scrollStart = windowHeight * 0.8; // Start animating when 80% down viewport
        const scrollEnd = -timelineHeight;
        const scrollRange = scrollStart - scrollEnd;
        const currentScroll = windowHeight - timelineTop;
        const progress = Math.max(0, Math.min(1, (scrollStart - currentScroll) / scrollRange));

        setScrollProgress(progress);
        ticking = false;
      });
    };

    const calculatePathLength = () => {
      if (timelineRef.current) {
        const itemsContainer = timelineRef.current.querySelector('.space-y-12');
        if (itemsContainer) {
          const actualHeight = itemsContainer.scrollHeight;
          // Set path length based on actual content height
          setPathLength(actualHeight);
        }
      }
    };

    // Initial calculation
    setTimeout(() => {
      calculatePathLength();
      updateScrollProgress();
    }, 100);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', () => {
      calculatePathLength();
      updateScrollProgress();
    }, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', calculatePathLength);
    };
  }, [experiences, expandedItems]);

  // Calculate path coordinates for vertical line - use actual container height
  const pathD = `M 2 0 L 2 10000`; // Use large height, SVG will clip
  const strokeDashoffset = pathLength > 0 ? pathLength * (1 - scrollProgress) : 0;

  return (
    <div className={`cinematic-timeline ${className}`}>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-brand-text mb-2 flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-brand-teal to-brand-orange rounded-full" />
          Professional Experience
        </h2>
        <p className="text-brand-muted text-sm">
          Journey through 15+ years of strategic marketing and technical leadership
        </p>
      </div>

      <div className="relative" ref={timelineRef}>
        {/* SVG Path - Animated Spine Line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-0 pointer-events-none overflow-hidden">
          <svg
            width="4"
            height="100%"
            className="absolute top-0 left-0"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#40E0D0" stopOpacity="1" />
                <stop offset="100%" stopColor="#FF6B35" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d={pathD}
              stroke="url(#timeline-gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={pathLength > 0 ? pathLength : 1000}
              strokeDashoffset={strokeDashoffset}
              filter="url(#glow)"
              style={{
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />
          </svg>
        </div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {experiences.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isExpanded={expandedItems.has(item.id)}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
