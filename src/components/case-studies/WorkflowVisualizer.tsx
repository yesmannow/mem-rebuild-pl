import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WorkflowStep {
  id: string;
  label: string;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 'learndash',
    label: 'LearnDash',
    icon: '📚',
    position: { x: 0, y: 0 },
    connections: ['automator'],
  },
  {
    id: 'automator',
    label: 'Uncanny Automator',
    icon: '⚙️',
    position: { x: 200, y: 0 },
    connections: ['woocommerce', 'fluentcrm'],
  },
  {
    id: 'woocommerce',
    label: 'WooCommerce',
    icon: '🛒',
    position: { x: 400, y: -80 },
    connections: ['wp-fusion'],
  },
  {
    id: 'fluentcrm',
    label: 'FluentCRM',
    icon: '📧',
    position: { x: 400, y: 80 },
    connections: [],
  },
  {
    id: 'wp-fusion',
    label: 'WP Fusion',
    icon: '🔗',
    position: { x: 600, y: -80 },
    connections: ['fluentcrm'],
  },
];

const WorkflowVisualizer: React.FC = () => {
  const [activeSteps, setActiveSteps] = useState<Set<string>>(new Set());
  const [animationPhase, setAnimationPhase] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const phases = [
      ['learndash'],
      ['learndash', 'automator'],
      ['learndash', 'automator', 'woocommerce', 'fluentcrm'],
      ['learndash', 'automator', 'woocommerce', 'fluentcrm', 'wp-fusion'],
    ];

    const interval = setInterval(() => {
      setAnimationPhase(prev => {
        const nextPhase = (prev + 1) % phases.length;
        setActiveSteps(new Set(phases[nextPhase]));
        return nextPhase;
      });
    }, 2000);

    // Initial activation
    setActiveSteps(new Set(phases[0]));

    return () => clearInterval(interval);
  }, [isInView]);

  const isActive = (stepId: string) => activeSteps.has(stepId);

  const getConnectionPath = (from: WorkflowStep, toId: string) => {
    const to = workflowSteps.find(s => s.id === toId);
    if (!to) return '';

    const fromX = from.position.x + 60;
    const fromY = from.position.y + 40;
    const toX = to.position.x + 60;
    const toY = to.position.y + 40;

    // Create a curved path
    const midX = (fromX + toX) / 2;
    return `M ${fromX} ${fromY} Q ${midX} ${fromY} ${midX} ${(fromY + toY) / 2} T ${toX} ${toY}`;
  };

  return (
    <div className="p-8 bg-brand-surface/80 border border-brand-teal/20 rounded-2xl backdrop-blur-sm" ref={ref}>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand-teal mb-2">Automated Workflow</h3>
        <p className="text-brand-muted text-sm">60-Day Conversion Engine</p>
      </div>
      <div className="bg-[#0a0a0a] rounded-xl p-8 overflow-visible shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-auto overflow-visible"
        >
          {/* Connection lines */}
          {workflowSteps.map(step =>
            step.connections.map(connectionId => {
              const path = getConnectionPath(step, connectionId);
              const targetStep = workflowSteps.find(s => s.id === connectionId);
              const isPathActive = isActive(step.id) && targetStep && isActive(targetStep.id);

              return (
                <motion.path
                  key={`${step.id}-${connectionId}`}
                  d={path}
                  fill="none"
                  stroke={isPathActive ? '#40E0D0' : 'rgba(64, 224, 208, 0.2)'}
                  strokeWidth="2"
                  strokeDasharray={isPathActive ? '0' : '5,5'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isPathActive ? 1 : 0.3,
                    opacity: isPathActive ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.8 }}
                />
              );
            })
          )}

          {/* Flow animation */}
          {workflowSteps.map(step =>
            step.connections.map(connectionId => {
              const path = getConnectionPath(step, connectionId);
              const targetStep = workflowSteps.find(s => s.id === connectionId);
              const isPathActive = isActive(step.id) && targetStep && isActive(targetStep.id);

              if (!isPathActive) return null;

              return (
                <motion.circle
                  key={`flow-${step.id}-${connectionId}`}
                  r="4"
                  fill="#40E0D0"
                  initial={{ offsetDistance: '0%' }}
                  animate={{ offsetDistance: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    offsetPath: `path("${path}")`,
                    filter: 'drop-shadow(0 0 4px #40E0D0)',
                  }}
                />
              );
            })
          )}

          {/* Step nodes */}
          {workflowSteps.map(step => {
            const active = isActive(step.id);
            return (
              <g key={step.id} transform={`translate(${step.position.x}, ${step.position.y})`}>
                <motion.rect
                  x="0"
                  y="0"
                  width="120"
                  height="80"
                  rx="12"
                  fill={active ? 'rgba(64, 224, 208, 0.2)' : 'rgba(30, 41, 59, 0.5)'}
                  stroke={active ? '#40E0D0' : 'rgba(64, 224, 208, 0.3)'}
                  strokeWidth={active ? '2' : '1'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: active ? 1.05 : 1,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    filter: active ? 'drop-shadow(0 0 12px rgba(64, 224, 208, 0.5))' : 'none',
                  }}
                />
                <text
                  x="60"
                  y="35"
                  textAnchor="middle"
                  fontSize="24"
                  fill={active ? '#40E0D0' : 'rgba(64, 224, 208, 0.5)'}
                >
                  {step.icon}
                </text>
                <text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  fontSize="12"
                  fill={active ? '#f8fafc' : 'rgba(148, 163, 184, 0.7)'}
                  fontWeight={active ? '600' : '400'}
                >
                  {step.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-3 px-6 py-3 bg-brand-teal/10 border border-brand-teal/30 rounded-lg">
          <span className={`w-2.5 h-2.5 rounded-full transition-all ${
            isInView ? 'bg-brand-teal shadow-[0_0_8px_rgba(64,224,208,0.8)] animate-pulse' : 'bg-brand-teal/50'
          }`} />
          <span className="text-brand-muted text-sm">
            {animationPhase === 0 && 'Course Completion Detected'}
            {animationPhase === 1 && 'Automation Triggered'}
            {animationPhase === 2 && 'Profile & Trial Activated'}
            {animationPhase === 3 && 'Email Sequence Initiated'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkflowVisualizer;
