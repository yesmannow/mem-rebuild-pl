import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ClusterNode {
  id: string;
  label: string;
  tools?: string[];
  type: 'core' | 'satellite';
}

interface TopicClusterMapProps {
  tags: string[];
  technologies?: string[];
  color: string;
  title: string;
}

const W = 320;
const H = 200;
const CX = W / 2;
const CY = H / 2;
const CORE_R = 22;
const SAT_R = 12;
const ORBIT_R = 72;

function buildNodes(tags: string[], technologies: string[]): ClusterNode[] {
  const nodes: ClusterNode[] = [
    { id: 'core', label: 'CORE', type: 'core' },
  ];
  const satellites = tags.slice(0, 5);
  satellites.forEach((tag) => {
    const tools = technologies.filter((t) =>
      t.toLowerCase().includes(tag.split(' ')[0].toLowerCase()) ||
      tag.toLowerCase().includes(t.split(' ')[0].toLowerCase())
    );
    nodes.push({
      id: tag,
      label: tag.split(' ')[0].toUpperCase(),
      tools: tools.length ? tools : undefined,
      type: 'satellite',
    });
  });
  return nodes;
}

function getSatPos(i: number, total: number): { x: number; y: number } {
  const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
  return {
    x: CX + ORBIT_R * Math.cos(angle),
    y: CY + ORBIT_R * Math.sin(angle),
  };
}

const TopicClusterMap: React.FC<TopicClusterMapProps> = ({
  tags,
  technologies = [],
  color,
  title,
}) => {
  const svgRef      = useRef<SVGSVGElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [pulsePhase, setPulsePhase] = useState(0);

  const nodes      = buildNodes(tags, technologies);
  const satellites = nodes.filter((n) => n.type === 'satellite');

  // Gentle ambient pulse
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      setPulsePhase(((ts - start) % 3000) / 3000);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Scroll-driven scale: grow when cluster is centred, shrink when scrolling away
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Scale up as the cluster approaches the vertical centre of the viewport
      gsap.fromTo(
        el,
        { scale: 0.82, opacity: 0.55 },
        {
          scale: 1.18,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start:   'top 80%',
            end:     'center center',
            scrub:   0.6,
          },
        }
      );
      // Scale back down as it leaves the centre
      gsap.fromTo(
        el,
        { scale: 1.18, opacity: 1 },
        {
          scale: 0.82,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start:   'center center',
            end:     'bottom 20%',
            scrub:   0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const handleSatEnter = useCallback(
    (id: string, i: number) => {
      setHoveredId(id);
      const pos = getSatPos(i, satellites.length);
      setTooltipPos({ x: pos.x, y: pos.y });
    },
    [satellites.length]
  );

  const handleSatLeave = useCallback(() => setHoveredId(null), []);

  const hoveredNode = satellites.find((n) => n.id === hoveredId);

  return (
    <div
      ref={wrapperRef}
      className="topic-cluster"
      role="img"
      aria-label={`Topic cluster map for ${title}`}
      style={{ willChange: 'transform, opacity', transformOrigin: 'center center' }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="topic-cluster__svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`cg-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>

          {/* Pulse ring filter */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit ring */}
        <circle
          cx={CX}
          cy={CY}
          r={ORBIT_R}
          fill="none"
          stroke={`${color}18`}
          strokeWidth={1}
          strokeDasharray="3 5"
        />

        {/* Spokes */}
        {satellites.map((sat, i) => {
          const pos = getSatPos(i, satellites.length);
          return (
            <line
              key={`spoke-${sat.id}`}
              x1={CX}
              y1={CY}
              x2={pos.x}
              y2={pos.y}
              stroke={hoveredId === sat.id ? `${color}70` : `${color}28`}
              strokeWidth={hoveredId === sat.id ? 1.5 : 0.75}
              strokeDasharray={hoveredId === sat.id ? 'none' : '3 4'}
              style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
            />
          );
        })}

        {/* Core node */}
        <circle
          cx={CX}
          cy={CY}
          r={CORE_R + 8 * (0.5 + 0.5 * Math.sin(pulsePhase * Math.PI * 2))}
          fill={`url(#cg-${color.replace('#', '')})`}
        />
        <circle
          cx={CX}
          cy={CY}
          r={CORE_R}
          fill={`${color}18`}
          stroke={color}
          strokeWidth={1.5}
          filter="url(#node-glow)"
        />
        <text
          x={CX}
          y={CY + 4}
          textAnchor="middle"
          fontSize={7}
          fontFamily="'Geist Mono', ui-monospace, monospace"
          fontWeight="600"
          fill={color}
          letterSpacing="0.15em"
        >
          CORE
        </text>

        {/* Satellite nodes */}
        {satellites.map((sat, i) => {
          const pos = getSatPos(i, satellites.length);
          const isHovered = hoveredId === sat.id;
          const pOffset = ((pulsePhase + i / satellites.length) % 1);
          const pulseR = SAT_R + 5 * (0.5 + 0.5 * Math.sin(pOffset * Math.PI * 2));

          return (
            <g
              key={sat.id}
              onMouseEnter={() => handleSatEnter(sat.id, i)}
              onMouseLeave={handleSatLeave}
              style={{ cursor: 'default' }}
            >
              {/* pulse halo */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={pulseR}
                fill={`${color}${isHovered ? '22' : '0A'}`}
              />
              {/* node fill */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={SAT_R}
                fill={isHovered ? `${color}28` : `${color}10`}
                stroke={isHovered ? color : `${color}55`}
                strokeWidth={isHovered ? 1.5 : 0.8}
                filter={isHovered ? 'url(#node-glow)' : undefined}
                style={{ transition: 'stroke 0.18s, fill 0.18s' }}
              />
              <text
                x={pos.x}
                y={pos.y + 3.5}
                textAnchor="middle"
                fontSize={5}
                fontFamily="'Geist Mono', ui-monospace, monospace"
                fontWeight="600"
                fill={isHovered ? color : `${color}99`}
                style={{ transition: 'fill 0.18s' }}
              >
                {sat.label.slice(0, 6)}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredId && hoveredNode && (
          <motion.div
            className="topic-cluster__tooltip"
            style={{
              left: `${(tooltipPos.x / W) * 100}%`,
              top: `${(tooltipPos.y / H) * 100}%`,
              borderColor: `${color}35`,
              background: `rgba(5,5,7,0.92)`,
            }}
            initial={{ opacity: 0, scale: 0.85, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 4 }}
            transition={{ duration: 0.14 }}
          >
            <p className="topic-cluster__tooltip-tag" style={{ color }}>
              {hoveredNode.id}
            </p>
            {hoveredNode.tools && hoveredNode.tools.length > 0 && (
              <ul className="topic-cluster__tooltip-tools">
                {hoveredNode.tools.slice(0, 4).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            {(!hoveredNode.tools || hoveredNode.tools.length === 0) && (
              <p className="topic-cluster__tooltip-no-tools">Strategic focus area</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopicClusterMap;
