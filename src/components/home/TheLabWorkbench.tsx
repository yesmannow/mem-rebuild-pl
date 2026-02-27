import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, TrendingUp, Mail, Share2, Zap, ArrowRight } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import { useTerminalFocus } from '../../hooks/useTerminalFocus';
import BrandBuilderDemo from './BrandBuilderDemo';
import DeviceStage from './DeviceStage';
import GlitchOverlay from './GlitchOverlay';

// ─── Tools registry ────────────────────────────────────────────────────────
interface Tool {
  id: string;
  label: string;
  icon: React.ReactNode;
  tag: string;
  color: string;
}

const TOOLS: Tool[] = [
  { id: 'brand-builder', label: 'Brand Builder', icon: <Palette size={16} />, tag: 'AI', color: '#a78bfa' },
  { id: 'marketing-simulator', label: 'Mkt Simulator', icon: <TrendingUp size={16} />, tag: 'LIVE', color: '#22d3ee' },
  { id: 'email-simulator', label: 'Email Studio', icon: <Mail size={16} />, tag: 'LIVE', color: '#60a5fa' },
  { id: 'social-simulator', label: 'Social Engine', icon: <Share2 size={16} />, tag: 'BETA', color: '#34d399' },
  { id: 'growth-engine', label: 'Growth Engine', icon: <Zap size={16} />, tag: 'PROD', color: '#fb923c' },
];

// ─── Stage content switcher ───────────────────────────────────────────────
interface StageContentProps {
  toolId: string;
  autoTrigger?: boolean;
  onTriggerConsumed?: () => void;
}

const StageContent: React.FC<StageContentProps> = ({ toolId, autoTrigger, onTriggerConsumed }) => {
  if (toolId === 'brand-builder') {
    return <BrandBuilderDemo autoTrigger={autoTrigger} onTriggerConsumed={onTriggerConsumed} />;
  }

  const tool = TOOLS.find((t) => t.id === toolId)!;
  // Use the new DeviceStage for all other tools, assigning a specific local video based on toolId
  const videoMap: Record<string, string> = {
    'marketing-simulator': '/videos/26492-360248642_medium.mp4',
    'email-simulator':     '/videos/31426-387059070_medium.mp4',
    'social-simulator':    '/videos/91564-629213919_medium.mp4',
    'growth-engine':       '/videos/138556-769988117_medium.mp4',
  };

  return (
    <DeviceStage
      color={tool.color}
      label={tool.label}
      videoUrl={videoMap[toolId] || videoMap['marketing-simulator']}
    />
  );
};

// ─── Main component ────────────────────────────────────────────────────────
const TheLabWorkbench: React.FC = () => {
  const [stageKey, setStageKey] = useState(0);
  const [pendingAutoTrigger, setPendingAutoTrigger] = useState(false);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isBooting, setIsBooting] = useState(false);
  const { runCommand, pushHistory, brandBuildTrigger, activeModuleId, setActiveModule } = useSystemStore();
  const sectionRef = useRef<HTMLElement>(null);

  // Derive activeTool: use activeModuleId if it matches a known tool, else fall back to first
  const activeTool = TOOLS.find((t) => t.id === activeModuleId)?.id ?? TOOLS[0].id;

  const labFocus = useTerminalFocus('MODULE ACTIVE: THE LAB // WORKBENCH ONLINE');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const scaleStage = useTransform(scrollYProgress, [0, 0.3], [0.94, 1]);
  const opacityStage = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // React to terminal 'generate brand' command via store
  const prevTrigger = useRef(0);
  useEffect(() => {
    if (brandBuildTrigger > prevTrigger.current) {
      prevTrigger.current = brandBuildTrigger;
      // Switch to brand-builder and fire auto-generate
      setActiveModule('brand-builder');
      setStageKey((k) => k + 1);
      setPendingAutoTrigger(true);
    }
  }, [brandBuildTrigger]);

  const selectTool = (toolId: string) => {
    if (toolId === activeTool || isBooting) return;

    // Trigger high-intensity glitch
    setIsBooting(true);

    setTimeout(() => {
      setActiveModule(toolId);
      setStageKey((k) => k + 1);
      setPendingAutoTrigger(false);
      runCommand(`mount ${toolId}`);
      pushHistory(`> TOOL LOADED: ${toolId.toUpperCase().replace(/-/g, ' ')}`);
      setIsBooting(false);
    }, 800);
  };

  const activeTint = TOOLS.find((t) => t.id === activeTool)?.color ?? '#22d3ee';

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 px-4"
      aria-label="The Lab Workbench"
      {...labFocus}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-500 mb-3">
            MODULE 02 // THE LAB
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            The{' '}
            <span className="font-mono" style={{ color: activeTint }}>
              Workbench
            </span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm max-w-xl">
            Select a module slot. Content loads into the Stage with a scanline transition.{' '}
            <span className="text-zinc-700">
              Type <span className="text-cyan-400/80">generate brand</span> in the terminal to trigger remotely.
            </span>
          </p>
        </motion.div>
      </div>

      {/* Workbench layout: icon rail + stage */}
      <motion.div
        style={{ scale: scaleStage, opacity: opacityStage }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[64px_1fr] gap-4"
      >
        {/* ── Icon-only Module Rail (left) ── */}
        <div
          className="glass-panel rounded-2xl p-2 flex flex-col items-center gap-1.5 md:min-h-[540px]"
          style={{ border: `1px solid ${activeTint}18` }}
        >
          {/* Rail header dot */}
          <div className="w-1.5 h-1.5 rounded-full mb-1 mt-1" style={{ backgroundColor: activeTint }} />

          {/* Icon buttons */}
          {TOOLS.map((tool) => {
            const isActive = activeTool === tool.id;
            const isHovered = hoveredTool === tool.id;
            return (
              <div key={tool.id} className="relative w-full flex justify-center">
                <motion.button
                  onClick={() => selectTool(tool.id)}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  whileTap={{ scale: 0.92 }}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150"
                  style={{
                    background: isActive ? `${tool.color}20` : isHovered ? `${tool.color}0e` : 'transparent',
                    border: isActive ? `1px solid ${tool.color}40` : '1px solid transparent',
                    color: isActive ? tool.color : '#52525b',
                  }}
                  aria-label={tool.label}
                >
                  {/* Active left-edge bar OR Cyan LED for inactive */}
                  {isActive ? (
                    <motion.div
                      layoutId="active-tool-bar"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                      style={{ backgroundColor: tool.color }}
                      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    />
                  ) : (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00F2FF]/40 shadow-[0_0_8px_#00F2FF]" />
                  )}
                  {tool.icon}
                </motion.button>

                {/* Tooltip — floats to the right */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                    >
                      <div
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                        style={{
                          background: 'rgba(9,9,11,0.95)',
                          border: `1px solid ${tool.color}30`,
                          boxShadow: `0 4px 16px rgba(0,0,0,0.4)`,
                        }}
                      >
                        <span className="text-[10px] font-mono font-semibold" style={{ color: tool.color }}>
                          {tool.label}
                        </span>
                        <span
                          className="text-[8px] font-mono px-1 py-0.5 rounded-full border"
                          style={{
                            color: tool.color,
                            borderColor: `${tool.color}40`,
                            background: `${tool.color}12`,
                          }}
                        >
                          {tool.tag}
                        </span>
                      </div>
                      {/* Arrow */}
                      <div
                        className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent"
                        style={{ borderRightColor: `${tool.color}30` }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Bottom rail footer */}
          <div className="mt-auto pt-2 border-t border-zinc-800/60 w-full flex flex-col items-center gap-1.5 pb-1">
            <span className="text-[8px] font-mono text-cyan-400 tabular-nums">
              {TOOLS.filter(t => t.tag === 'LIVE' || t.tag === 'PROD').length}↑
            </span>
            <Link
              to="/applications"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-700 hover:text-cyan-400 hover:bg-cyan-400/8 transition-colors"
              aria-label="All tools"
            >
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* ── Active Stage (right) ── */}
        <div
          className="glass-panel rounded-2xl overflow-hidden min-h-[540px] flex flex-col"
          style={{ border: `1px solid ${activeTint}18` }}
        >
          {/* Stage header bar */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{ borderColor: `${activeTint}15`, background: 'rgba(0,0,0,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] font-mono text-zinc-600">stage://</span>
              <motion.span
                key={activeTool}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="text-[10px] font-mono"
                style={{ color: activeTint }}
              >
                {activeTool}
              </motion.span>
            </div>
            <div className="flex items-center gap-2">
              {pendingAutoTrigger && (
                <motion.span
                  className="text-[9px] font-mono text-violet-400 uppercase tracking-widest"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  TERMINAL TRIGGER
                </motion.span>
              )}
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">READY</span>
            </div>
          </div>

          {/* Stage content with Glitch Overlay */}
          <div className="flex-1 p-5 overflow-y-auto relative bg-[#050507]">
            <GlitchOverlay isBooting={isBooting} />
            <AnimatePresence mode="wait">
              <motion.div
                key={stageKey}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: 0,
                }}
                exit={{ opacity: 0, filter: 'blur(4px)', y: -8 }}
                transition={{ duration: 0.4, type: 'tween', ease: 'easeOut' }}
                className="h-full relative z-10"
              >
                <StageContent
                  toolId={activeTool}
                  autoTrigger={pendingAutoTrigger}
                  onTriggerConsumed={() => setPendingAutoTrigger(false)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TheLabWorkbench;
