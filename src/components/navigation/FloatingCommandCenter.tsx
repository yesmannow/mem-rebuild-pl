import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Command, Home, Briefcase, Rocket, FlaskConical, Palette, User, Mail, Terminal, Search, RotateCcw } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';
import ArchitectLogo from '../branding/ArchitectLogo';

// ─── Nav items ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     path: '/',             icon: Home,         module: 'home',     indicator: null },
  { id: 'projects', label: 'Projects', path: '/case-studies', icon: Briefcase,    module: 'lab',      indicator: 'sync' as const },
  { id: 'ventures', label: 'Ventures', path: '/side-projects', icon: Rocket,      module: 'ventures', indicator: null },
  { id: 'lab',      label: 'The Lab',  path: '/apps',          icon: FlaskConical, module: 'lab',      indicator: 'live' as const },
  { id: 'studio',   label: 'Studio',   path: '/studio',        icon: Palette,     module: 'studio',   indicator: null },
  { id: 'resume',   label: 'Resume',   path: '/resume',        icon: User,        module: 'resume',   indicator: null },
  { id: 'contact',  label: 'Contact',  path: '/contact',       icon: Mail,        module: 'contact',  indicator: null },
];

// ─── Lab hover-peek glassmorphic window ───────────────────────────────────
const LabHoverPeek: React.FC = () => {
  const { activeModule } = useSystemStore();
  const liveCount = 3;
  const protoCount = 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 rounded-xl overflow-hidden z-50 pointer-events-none"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(6,8,14,0.88)',
        border: '1px solid rgba(34,211,238,0.2)',
        boxShadow: '0 0 0 1px rgba(34,211,238,0.08), 0 16px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Cyan accent bar */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      <div className="p-3 space-y-2.5">
        <p className="text-[9px] font-mono uppercase tracking-[0.35em] text-cyan-400/60">
          THE LAB // LIVE STATUS
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-zinc-400">Prototypes Active</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400">{liveCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="text-[10px] font-mono text-zinc-400">In Development</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-violet-400">{protoCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-mono text-zinc-400">Active Module</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 truncate max-w-[80px]">
              {activeModule.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="pt-1.5 border-t border-white/5">
          <p className="text-[9px] font-mono text-zinc-700 text-center uppercase tracking-widest">
            hover to preview · click to enter
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Magnetic nav item ────────────────────────────────────────────────────
interface MagneticNavItemProps {
  item: typeof NAV_ITEMS[number];
  isActive: boolean;
  onClick: () => void;
}

const MagneticNavItem: React.FC<MagneticNavItemProps> = ({ item, isActive, onClick }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [peekOpen, setPeekOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = itemRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 60;
    if (dist < radius) {
      const pull = (1 - dist / radius) * 0.4;
      x.set(dx * pull);
      y.set(dy * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setPeekOpen(false);
  }, [x, y]);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const Icon = item.icon;
  const isLab = item.id === 'lab';
  const isProjects = item.id === 'projects';

  return (
    <div
      ref={itemRef}
      className="relative"
      onMouseEnter={() => isLab && setPeekOpen(true)}
    >
      {/* Sliding highlight anchor */}
      {isActive && (
        <motion.div
          layoutId="nav-highlight"
          className="absolute inset-0 rounded-lg"
          style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.25)' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      )}
      <motion.div style={{ x: springX, y: springY }}>
        <Link
          to={item.path}
          onClick={onClick}
          className="relative z-10 flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors duration-150 group"
          aria-current={isActive ? 'page' : undefined}
        >
          <Icon
            size={13}
            className="shrink-0 transition-colors duration-150"
            style={{ color: isActive ? '#22d3ee' : 'rgba(161,161,170,0.8)' }}
          />
          <span
            className="text-xs font-mono font-medium uppercase tracking-wider transition-colors duration-150 hidden lg:block"
            style={{ color: isActive ? '#22d3ee' : 'rgba(161,161,170,0.8)' }}
          >
            {item.label}
          </span>

          {/* Live indicator — green pulsing dot for The Lab */}
          {isLab && (
            <span className="relative flex h-1.5 w-1.5 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
          )}

          {/* Sync indicator — spinning icon for Projects */}
          {isProjects && (
            <RotateCcw
              size={9}
              className="ml-0.5 text-cyan-400/60 animate-spin"
              style={{ animationDuration: '3s' }}
            />
          )}

          {/* Hover glow */}
          {!isActive && (
            <span
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
          )}
        </Link>
      </motion.div>

      {/* Lab hover-peek */}
      <AnimatePresence>
        {isLab && peekOpen && <LabHoverPeek />}
      </AnimatePresence>
    </div>
  );
};

// ─── Command Palette ──────────────────────────────────────────────────────
const PALETTE_COMMANDS = [
  { label: 'Navigate → Home',         path: '/',              icon: Home,         shortcut: 'G H' },
  { label: 'Navigate → Projects',     path: '/case-studies',  icon: Briefcase,    shortcut: 'G P' },
  { label: 'Navigate → The Lab',      path: '/apps',          icon: FlaskConical, shortcut: 'G L' },
  { label: 'Navigate → Studio',       path: '/studio',        icon: Palette,      shortcut: 'G S' },
  { label: 'Navigate → Resume',       path: '/resume',        icon: User,         shortcut: 'G R' },
  { label: 'Navigate → Contact',      path: '/contact',       icon: Mail,         shortcut: 'G C' },
  { label: 'Navigate → War Room',     path: '/war-room',      icon: Terminal,     shortcut: 'G W' },
];

interface CommandPaletteOverlayProps {
  onClose: () => void;
}

const CommandPaletteOverlay: React.FC<CommandPaletteOverlayProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { pushHistory } = useSystemStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? PALETTE_COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : PALETTE_COMMANDS;

  const handleSelect = (path: string, label: string) => {
    pushHistory(`> PALETTE: ${label.toUpperCase()}`);
    window.location.href = path;
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-xl mx-4"
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(9,9,11,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 0 1px rgba(34,211,238,0.1), 0 32px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8">
            <Search size={16} className="text-zinc-500 shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands..."
              className="flex-1 bg-transparent text-sm font-mono text-white placeholder-zinc-600 outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
                if (e.key === 'Enter' && filtered.length > 0) {
                  handleSelect(filtered[0].path, filtered[0].label);
                }
              }}
            />
            <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="py-2 max-h-[360px] overflow-y-auto">
            <p className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
              NAVIGATION
            </p>
            {filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.path}
                  onClick={() => handleSelect(cmd.path, cmd.label)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-cyan-400/8 transition-colors duration-100 group"
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-cyan-400/30 transition-colors shrink-0">
                    <Icon size={13} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <span className="flex-1 text-left text-sm font-mono text-zinc-300 group-hover:text-white transition-colors">
                    {cmd.label}
                  </span>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/60 text-zinc-600 border border-zinc-700/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {cmd.shortcut}
                  </kbd>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-4 py-6 text-center text-sm font-mono text-zinc-600">
                No commands match &ldquo;{query}&rdquo;
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/8">
            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
              COMMAND CENTER // v1.0
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-700">
              <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700">↑↓</kbd> navigate
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Floating Pill ───────────────────────────────────────────────────
interface FloatingCommandCenterProps {
  /** Called by Layout when Cmd+K fires from an external source (e.g. MobileDock). */
  externalOpen?: boolean;
}

const FloatingCommandCenter: React.FC<FloatingCommandCenterProps> = () => {
  const location = useLocation();
  const { isCommandPaletteOpen, toggleCommandPalette, setCommandPalette, runCommand, shakeActive, triggerShake } = useSystemStore();

  // Live clock
  const [clock, setClock] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  });
  useEffect(() => {
    const tick = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleNavClick = (item: typeof NAV_ITEMS[number]) => {
    runCommand(`mount ${item.module}`);
    triggerShake();
  };

  // Cmd+K global listener — also shake on palette mount commands
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setCommandPalette(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCommandPaletteOpen, toggleCommandPalette, setCommandPalette]);

  // Pill hide-on-scroll-down behaviour
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setHidden(cur > lastY.current && cur > 120);
      lastY.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Floating pill ── */}
      <motion.nav
        aria-label="Global Command Center"
        className="fixed top-4 left-1/2 z-[200] hidden md:flex"
        style={{ x: '-50%' }}
        animate={
          shakeActive
            ? { x: ['-50%', 'calc(-50% - 4px)', 'calc(-50% + 4px)', 'calc(-50% - 2px)', 'calc(-50% + 2px)', '-50%'], y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }
            : { y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }
        }
        transition={
          shakeActive
            ? { type: 'tween', ease: 'easeInOut', duration: 0.5 }
            : { type: 'spring', stiffness: 100, damping: 20 }
        }
      >
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-full"
          style={{
            background: 'rgba(5,5,5,0.80)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            border: '1px solid rgba(6,182,212,0.20)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(6,182,212,0.06)',
          }}
        >
          {/* Logo mark */}
          <div className="flex items-center pr-2 mr-1 border-r border-white/10">
            <ArchitectLogo size="sm" showLabel={false} />
          </div>

          {/* Nav items with sliding highlight */}
          <div className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <MagneticNavItem
                key={item.id}
                item={item}
                isActive={isActive(item.path)}
                onClick={() => handleNavClick(item)}
              />
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-cyan-500/20 mx-1" />

          {/* System Status + Live Clock */}
          <Link
            to="/war-room"
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors duration-150 group"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
            aria-label="System Status: Online"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            {/* ONLINE label */}
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 hidden xl:block">
              ONLINE
            </span>
            {/* Divider */}
            <span className="w-px h-3 bg-emerald-500/20 hidden xl:block" />
            {/* Live clock */}
            <span className="text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors tabular-nums hidden xl:block">
              {clock}
            </span>
          </Link>

          {/* Cmd+K trigger */}
          <button
            onClick={toggleCommandPalette}
            className="flex items-center gap-1.5 ml-1 px-2.5 py-1.5 rounded-lg transition-all duration-150 group"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-label="Open command palette (Cmd+K)"
          >
            <Command size={12} className="text-zinc-500 group-hover:text-cyan-400 transition-colors" />
            <span className="text-[10px] font-mono text-zinc-600 group-hover:text-cyan-400 transition-colors hidden xl:block">
              K
            </span>
          </button>
        </div>
      </motion.nav>

      {/* ── Command Palette overlay ── */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <CommandPaletteOverlay onClose={() => setCommandPalette(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCommandCenter;
