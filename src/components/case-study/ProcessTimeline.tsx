import React from 'react';
import { motion, Easing } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

interface ProcessTimelineProps {
  phases: string[];
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ phases }) => {
  return (
    <motion.section
      className="process-timeline"
      style={{
        padding: '4rem 2rem',
        overflowX: 'auto',
      }}
    >
      <div style={{ display: 'flex', gap: '2rem' }}>
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            className="timeline-phase"
            style={{
              minWidth: '250px',
              padding: '1rem',
              background: 'var(--color-neutral-800)',
              color: 'white',
              borderRadius: '8px',
            }}
            {...castMotionProps(motionTokens.fadeIn)}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{phase}</h3>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProcessTimeline;
