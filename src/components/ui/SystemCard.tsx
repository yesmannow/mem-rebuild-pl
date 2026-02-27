import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  CircuitBoard,
  Rocket,
  ChevronDown,
  ChevronUp,
  Code2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { LabItem } from '../../types';
import TerminalBlock from './TerminalBlock';
import AppPreviewModal from './AppPreviewModal';

// Helper function to create a valid TypeScript identifier from a title
const toValidIdentifier = (title: string): string => {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove non-alphanumeric (except spaces)
    .replace(/\s+/g, '') // Remove all spaces
    .replace(/^[0-9]+/, ''); // Remove leading numbers if any
};

const isSameOriginUrl = (url?: string) => {
  if (!url || typeof window === 'undefined') return false;
  try {
    const resolved = new URL(url, window.location.origin);
    return resolved.origin === window.location.origin;
  } catch (err) {
    console.warn('Failed to resolve launch URL origin', err);
    return false;
  }
};

interface SystemCardProps {
  item: LabItem;
  index?: number;
}

const SystemCard: React.FC<SystemCardProps> = ({ item, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isApp = item.type === 'app';
  const launchUrl = item.liveUrl ?? item.link;
  const hasSeparateBuildLink =
    Boolean(item.liveUrl && item.link && item.liveUrl !== item.link);
  const isExternalLaunch = Boolean(launchUrl && launchUrl.startsWith('http'));
  const isSameOriginExternal = isExternalLaunch && isSameOriginUrl(launchUrl);
  // Don't show "View Build" for growth-engine
  const shouldShowViewBuild = hasSeparateBuildLink && item.id !== 'growth-engine';
  const borderColor = isApp ? 'border-[#FFA500]' : 'border-[#40E0D0]';
  const glowColor = isApp ? 'shadow-[0_0_30px_rgba(255,165,0,0.15)]' : 'shadow-[0_0_30px_rgba(64,224,208,0.15)]';
  const accentColor = isApp ? 'text-[#FFA500]' : 'text-[#40E0D0]';
  const badgeBg = isApp ? 'bg-[#FFA500]/10' : 'bg-[#40E0D0]/10';
  const launchButtonClasses = cn(
    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
    isApp
      ? 'bg-[#FFA500]/20 hover:bg-[#FFA500]/30 border border-[#FFA500]/50 text-[#FFA500]'
      : 'bg-[#40E0D0]/20 hover:bg-[#40E0D0]/30 border border-[#40E0D0]/50 text-[#40E0D0]'
  );
  const internalButtonClasses = cn(
    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
    'bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 hover:border-slate-600 text-brand-text'
  );

  const handleExpand = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsExpanded(!isExpanded);
    if (!isExpanded && item.command) {
      setShowTypewriter(true);
    }
  };

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      if (item.command) {
        setShowTypewriter(true);
      }
    }
  };

  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSameOriginExternal) {
      setShowModal(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      {/* Main Card Container with 3D flip capability */}
      <motion.div
        className="relative w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front Face */}
        <div
          className={cn(
            'relative rounded-2xl border border-white/10 p-6 backdrop-blur-xl transition-all duration-300',
            'bg-white/5 hover:bg-white/10',
            'hover:translate-y-[-4px] hover:shadow-xl',
            borderColor,
            glowColor,
            isFlipped && 'invisible',
            'cursor-pointer'
          )}
          style={{
            backfaceVisibility: 'hidden',
            backgroundImage: 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.8) 100%)',
          }}
          onClick={handleCardClick}
        >
          {/* Hover Grid Pattern */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(148,163,184,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(148,163,184,0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
            }}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Status Badge */}
              {isApp && (
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-green-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Live
                </span>
              )}
              <span className={cn('text-xs uppercase tracking-wider px-2 py-1 rounded-full', badgeBg, accentColor)}>
                {item.category}
              </span>
            </div>
            {/* Code Flip Button */}
            <button
              onClick={() => setIsFlipped(true)}
              className={cn(
                'p-2 rounded-lg transition-all duration-200',
                'bg-slate-800/50 hover:bg-slate-700/50',
                'border border-slate-700 hover:border-slate-600'
              )}
              title="View TypeScript Interface"
              aria-label="View TypeScript interface"
            >
              <Code2 size={16} className={accentColor} />
            </button>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-xl font-bold text-brand-text mb-1">{item.title}</h3>
          <p className="text-brand-muted text-sm mb-4">{item.tagline}</p>

          {/* Tech Stack Pills with Tooltips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.techStack.map((tech) => (
              <span
                key={tech.name}
                className="group relative px-2.5 py-1 text-xs rounded-full bg-slate-800/70 text-brand-muted border border-slate-700 cursor-help"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                {tech.name}
                {/* Tooltip */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-brand-text bg-slate-800 border border-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48 text-center pointer-events-none z-20 shadow-lg">
                  {tech.reason}
                </span>
              </span>
            ))}
          </div>

          {/* CLI Command for Tools */}
          {item.command && (
            <div className="mb-4">
              <TerminalBlock
                command={item.command}
                typewriter={showTypewriter}
                typewriterSpeed={30}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExpand}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700 hover:border-slate-600',
                'text-brand-text'
              )}
            >
              Examine Architecture
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {launchUrl && (
              isExternalLaunch ? (
                isSameOriginExternal ? (
                  <button onClick={handleLaunchClick} className={launchButtonClasses}>
                    Launch <ExternalLink size={14} />
                  </button>
                ) : (
                  <a
                    href={launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={launchButtonClasses}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Launch <ExternalLink size={14} />
                  </a>
                )
              ) : (
                <Link to={launchUrl} className={launchButtonClasses} onClick={(e) => e.stopPropagation()}>
                  Launch <ExternalLink size={14} />
                </Link>
              )
            )}

            {shouldShowViewBuild && item.link && (
              <Link to={item.link} className={internalButtonClasses} onClick={(e) => e.stopPropagation()}>
                View Build
              </Link>
            )}
          </div>

          {/* Expanded Architecture View */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  {/* 3-Column Schematic View */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                    {/* SVG Connecting Lines - Desktop Only */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
                      style={{ zIndex: 0 }}
                    >
                      <motion.line
                        x1="33%"
                        y1="50%"
                        x2="66%"
                        y2="50%"
                        stroke="rgba(148,163,184,0.3)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </svg>

                    {/* Challenge Column */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative z-10 p-4 rounded-xl bg-red-500/5 border border-red-500/20"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle size={18} className="text-red-400" />
                        <span className="text-xs uppercase tracking-wider text-red-400 font-semibold">
                          Challenge
                        </span>
                      </div>
                      <p className="text-sm text-brand-muted leading-relaxed">{item.context.problem}</p>
                    </motion.div>

                    {/* Architecture Column */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-10 p-4 rounded-xl bg-[#40E0D0]/5 border border-[#40E0D0]/20"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <CircuitBoard size={18} className="text-[#40E0D0]" />
                        <span className="text-xs uppercase tracking-wider text-[#40E0D0] font-semibold">
                          Architecture
                        </span>
                      </div>
                      <p className="text-sm text-brand-muted leading-relaxed">{item.context.solution}</p>
                    </motion.div>

                    {/* Impact Column */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative z-10 p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Rocket size={18} className="text-green-400" />
                        <span className="text-xs uppercase tracking-wider text-green-400 font-semibold">
                          Impact
                        </span>
                      </div>
                      <p className="text-sm text-brand-muted leading-relaxed">{item.context.impact}</p>
                    </motion.div>
                  </div>

                  {/* Additional Context */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <span className="text-xs uppercase tracking-wider text-brand-muted">Target Audience</span>
                      <p className="text-sm text-brand-text mt-1">{item.context.target}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
                      <span className="text-xs uppercase tracking-wider text-brand-muted">Operational Context</span>
                      <p className="text-sm text-brand-text mt-1">{item.context.usage}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Face - TypeScript Interface */}
        <div
          className={cn(
            'absolute inset-0 rounded-2xl border-2 p-6 backdrop-blur-xl',
            'bg-slate-900/90',
            borderColor,
            !isFlipped && 'invisible'
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-brand-muted">TypeScript Interface</span>
            <button
              onClick={() => setIsFlipped(false)}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors"
              aria-label="Close interface view"
            >
              <ChevronUp size={16} className="text-brand-text" />
            </button>
          </div>
          <pre
            className="text-xs leading-relaxed overflow-auto max-h-[300px] text-brand-muted"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            <code>
{`interface ${toValidIdentifier(item.title)} {
  id: '${item.id}';
  type: '${item.type}';
  category: '${item.category}';

  techStack: [
${item.techStack.map((t) => `    { name: '${t.name}' }`).join(',\n')}
  ];

  context: {
    problem: string;
    solution: string;
    impact: string;
    target: string;
    usage: string;
  };

  ${item.link ? `link: '${item.link}';` : `command: '${item.command}';`}
}`}
            </code>
          </pre>
        </div>
      </motion.div>

      {/* Pop-out Modal for External Links */}
      {showModal && isSameOriginExternal && launchUrl && (
        <AppPreviewModal
          url={launchUrl}
          title={item.title}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  );
};

export default SystemCard;
